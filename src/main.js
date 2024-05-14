import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import App from './App.vue';
import './scss/theme.scss';
import './scss/styles.scss';
import router from './router';
import Vuex from 'vuex';
import Clipboard from 'v-clipboard';
import store from './store/index.js';
import InfiniteLoading from 'vue-infinite-loading';
import VueResource from 'vue-resource';

import VueObserveVisibility from 'vue-observe-visibility';
import AsyncComputed from 'vue-async-computed';

var VueScrollTo = require('vue-scrollto');

const {fetch: originalFetch} = global;

let PENDING_REQUESTS = 0;
const MAX_REQUESTS_COUNT = 10;
const INTERVAL_MS = 10;

global.fetch = async(...args) => {
    let [resource, config] = args;
    // request interceptor here
    if (PENDING_REQUESTS >= MAX_REQUESTS_COUNT) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(global.fetch(...args));
            }, INTERVAL_MS);
        });
    } else {
        PENDING_REQUESTS++;
        try {
            const response = await originalFetch(resource, config);
            // response interceptor here
            return response;
        } finally {
            PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
        }
    }
};


require("cassproject");
global.UUID = require('pure-uuid');

const options = {
    color: '#68C8DB',
    failedColor: '#D74C44',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
};

Vue.use(VueProgressBar, options);
Vue.use(require('vue-moment'));
Vue.use(Vuex);
Vue.use(Clipboard);
Vue.use(VueScrollTo, {
    container: "#framework",
    duration: 500,
    easing: "ease",
    offset: -150,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
});
Vue.use(InfiniteLoading);
Vue.use(VueResource);
Vue.use(VueObserveVisibility);
Vue.use(AsyncComputed);

// directive for clicking outside elements and performing an action
// add v-click-outside="method" to parent element to do something
Vue.directive('click-outside', {
    bind: function(element, binding, vnode) {
        element.clickOutsideEvent = function(event) {
            if (!(element === event.target || element.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', element.clickOutsideEvent);
    },
    unbind: function(element) {
        document.body.removeEventListener('click', element.clickOutsideEvent);
    }
});

EcRepository.caching = true;

Vue.config.productionTip = false;
// Vue.config.silent = true;
Vue.config.warnHandler = function(msg, vm, trace) {
    if (msg === 'Invalid prop: type check failed for prop "clickToLoad". Expected Boolean, got String with value "true".') return;
    if (msg === 'Avoid using non-primitive value as key, use string/number value instead.') return;
    if (msg === "Duplicate keys detected: '[object Object]'. This may cause an update error.") return;
    appError(("[Vue warn]: " + msg + trace));
    // `trace` is the component hierarchy trace
};

global.appLog = function(x) {
    /* eslint-disable no-console */
    if (process.env.NODE_ENV !== 'production') {
        // console.trace(x);
        console.log(x);
    }
    /* eslint-enable no-console */
};

global.appError = function(x) {
    /* eslint-disable no-console */
    if (process.env.NODE_ENV !== 'production') {
        console.error(x);
    }
    /* eslint-enable no-console */
};

var queryParams = function() {
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

window.app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
