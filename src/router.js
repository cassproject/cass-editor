import Vue from 'vue';
import Router from 'vue-router';

import About from './views/About.vue';
import Test from './lode/views/Test.vue';
import Frameworks from './views/framework/Frameworks.vue';
import Framework from './views/framework/Framework.vue';

Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'frameworks',
            component: Frameworks
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/framework',
            name: 'framework',
            component: Framework
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        }
    ]
});
