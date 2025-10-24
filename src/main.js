global.__dirname = '/';
process.cwd = () => '/';
crypto.getFips = () => false;
import "cassproject"; 
import { createApp } from 'vue';
// import VueProgressBar from 'vue-progressbar';
import App from './App.vue';
import './scss/theme.scss';
import './scss/styles.scss';
import router from './router';
import store from './stores/index.js';
import VueObserveVisibility from 'vue-observe-visibility';
import AsyncComputed from 'vue-async-computed'; 
import InfiniteLoading from "v3-infinite-loading";


import moment from 'moment';
global.moment = moment;

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
            if (config != null && config.headers != null && Object.values(config.headers).length === 0) {
                delete config.headers;
            }
            const response = await originalFetch(resource, config);
            // response interceptor here
            return response;
        } finally {
            PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
        }
    }
};


// const options = {
//     color: '#68C8DB',
//     failedColor: '#D74C44',
//     thickness: '5px',
//     transition: {
//         speed: '0.2s',
//         opacity: '0.6s',
//         termination: 300
//     },
//     autoRevert: true,
//     location: 'top',
//     inverse: false
// };

const app = global.app = createApp(App)

// app.use(VueProgressBar, options);
// app.use(require('vue-moment'));
// app.use(Vuex);
// app.use(Clipboard);
//Vue3 fix me;
// app.use(VueScrollTo, {
//     container: "#framework",
//     duration: 500,
//     easing: "ease",
//     offset: -150,
//     force: true,
//     cancelable: true,
//     onStart: false,
//     onDone: false,
//     onCancel: false,
//     x: false,
//     y: true
// });
// app.use(VueResource);
app.use(VueObserveVisibility);
app.use(AsyncComputed);
app.component("infinite-loading", InfiniteLoading);

// directive for clicking outside elements and performing an action
// add v-click-outside="method" to parent element to do something
app.directive('click-outside', {
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
EcRepository.cachingL2 = true;

app.config.productionTip = false;
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

app.use(router);
app.use(store);

window.app = app.mount('#app');
