import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router.js';

// Styles
import './scss/theme.scss';
import './scss/styles.scss';

// NProgress (replaces vue-progressbar)
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.08
});

// cassproject and globals
import 'cassproject';
import { v4 as uuidv4 } from 'uuid';
import jsonld from 'jsonld';

globalThis.jsonld = jsonld;

// UUID compatibility shim for pure-uuid usage patterns
// pure-uuid was used as: new UUID(4).format() or new UUID(4).toString()
class UUIDCompat {
    constructor() {
        this.id = uuidv4();
    }
    format() {
        return this.id;
    }
    toString() {
        return this.id;
    }
}
globalThis.UUID = UUIDCompat;

// Global fetch interceptor (framework-agnostic, preserved from original)
const { fetch: originalFetch } = globalThis;

let PENDING_REQUESTS = 0;
const MAX_REQUESTS_COUNT = 10;
const INTERVAL_MS = 10;

globalThis.fetch = async (...args) => {
    let [resource, config] = args;
    if (PENDING_REQUESTS >= MAX_REQUESTS_COUNT) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(globalThis.fetch(...args));
            }, INTERVAL_MS);
        });
    } else {
        PENDING_REQUESTS++;
        try {
            if (config != null && config.headers != null && Object.values(config.headers).length === 0) {
                delete config.headers;
            }
            const response = await originalFetch(resource, config);
            return response;
        } finally {
            PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
        }
    }
};

// EcRepository caching (cassproject globals, available after import)
if (typeof EcRepository !== 'undefined') {
    EcRepository.caching = true;
    EcRepository.cachingL2 = true;
}

// Logging utilities
globalThis.appLog = function (...args) {
    if (import.meta.env.DEV) {
        console.log(...args);
    }
};

globalThis.appError = function (x) {
    if (import.meta.env.DEV) {
        console.error(x);
    }
};

// Query params utility
var queryParams = function () {
    if (window.document.location.search == null) { return {}; }
    var hashSplit = (window.document.location.search.split("?"));
    if (hashSplit.length > 1) {
        var o = {};
        var paramString = hashSplit[1];
        var parts = (paramString).split("&");
        for (var i = 0; i < parts.length; i++) {
            if (o[parts[i].split("=")[0]]) {
                // Allow multiple values
                o[parts[i].split("=")[0]] = [o[parts[i].split("=")[0]]];
                o[parts[i].split("=")[0]].push(decodeURIComponent(parts[i].replace(parts[i].split("=")[0] + "=", "")));
            } else {
                o[parts[i].split("=")[0]] = decodeURIComponent(parts[i].replace(parts[i].split("=")[0] + "=", ""));
            }
        }
        return o;
    }
    return {};
};
window.queryParams = queryParams();

// Create Vue 3 app
const app = createApp(App);

// Pinia state management
app.use(createPinia());

// Vue Router
app.use(router);

// Global properties (replacing Vue.use() plugin patterns)
// NProgress is available globally via import, but we add a convenience property
// matching the old vue-progressbar API: this.$Progress.start/finish/fail
app.config.globalProperties.$Progress = {
    start() { NProgress.start(); },
    finish() { NProgress.done(); },
    fail() { NProgress.done(); },
    set(n) { NProgress.set(n / 100); },
    increase(n) { NProgress.inc(n / 100); },
    hide() { NProgress.done(); }
};

// ScrollTo utility (replacing vue-scrollto plugin)
// Provides this.$scrollTo(element, duration, options) compatibility
app.config.globalProperties.$scrollTo = function (target, duration, options) {
    let el;
    if (typeof target === 'string') {
        el = document.querySelector(target);
    } else {
        el = target;
    }
    if (el) {
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            ...options
        });
    }
};

// Custom directive: v-click-outside
// Updated from Vue 2 bind/unbind to Vue 3 mounted/unmounted hooks
app.directive('click-outside', {
    mounted(el, binding) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    }
});

// Custom directive: v-observe-visibility (replacing vue-observe-visibility)
// Uses IntersectionObserver API
app.directive('observe-visibility', {
    mounted(el, binding) {
        const options = typeof binding.value === 'function'
            ? { callback: binding.value }
            : binding.value || {};

        const callback = options.callback || binding.value;
        const once = options.once || false;
        const observerOptions = {
            root: options.root || null,
            rootMargin: options.rootMargin || '0px',
            threshold: options.threshold || 0
        };

        el._observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (typeof callback === 'function') {
                    callback(entry.isIntersecting, entry);
                    if (once && entry.isIntersecting && el._observer) {
                        el._observer.disconnect();
                        delete el._observer;
                    }
                }
            });
        }, observerOptions);

        el._observer.observe(el);
    },
    unmounted(el) {
        if (el._observer) {
            el._observer.disconnect();
            delete el._observer;
        }
    }
});

// Custom directive: v-clipboard (replacing vue-clipboard2)
// Usage: v-clipboard="textOrFunction" v-clipboard:success="onSuccess" v-clipboard:error="onError"
app.directive('clipboard', {
    mounted(el, binding) {
        if (binding.arg === 'success') {
            el._clipboardSuccess = binding.value;
        } else if (binding.arg === 'error') {
            el._clipboardError = binding.value;
        } else {
            el._clipboardValue = binding.value;
            el.addEventListener('click', el._clipboardHandler = async function () {
                try {
                    let text = typeof el._clipboardValue === 'function' ? el._clipboardValue() : el._clipboardValue;
                    await navigator.clipboard.writeText(text);
                    if (el._clipboardSuccess) {
                        el._clipboardSuccess({ text, trigger: el });
                    }
                } catch (err) {
                    if (el._clipboardError) {
                        el._clipboardError(err);
                    }
                }
            });
        }
    },
    updated(el, binding) {
        if (binding.arg === 'success') {
            el._clipboardSuccess = binding.value;
        } else if (binding.arg === 'error') {
            el._clipboardError = binding.value;
        } else {
            el._clipboardValue = binding.value;
        }
    },
    unmounted(el) {
        if (el._clipboardHandler) {
            el.removeEventListener('click', el._clipboardHandler);
            delete el._clipboardHandler;
        }
        delete el._clipboardValue;
        delete el._clipboardSuccess;
        delete el._clipboardError;
    }
});

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
app.config.globalProperties.$moment = dayjs;

// Warn handler (ported from Vue 2 Vue.config.warnHandler)
app.config.warnHandler = function (msg, vm, trace) {
    if (msg === 'Invalid prop: type check failed for prop "clickToLoad". Expected Boolean, got String with value "true".') return;
    if (msg === 'Avoid using non-primitive value as key, use string/number value instead.') return;
    if (msg === "Duplicate keys detected: '[object Object]'. This may cause an update error.") return;
    appError(("[Vue warn]: " + msg + trace));
};

// Mount the app
window.app = app.mount('#app');
