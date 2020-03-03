import Vue from 'vue';
import Router from 'vue-router';

import About from './views/About.vue';
import Test from './lode/views/Test.vue';
import Frameworks from './views/framework/Frameworks.vue';
import Framework from './views/framework/Framework.vue';
import Organizations from './views/organization/Organizations.vue';
import Organization from './views/organization/Organization.vue';
import Import from './views/framework/Import.vue';
import ConceptScheme from './views/conceptScheme/ConceptScheme.vue';
import NotFound from './views/404.vue';
import InternalError from './views/500.vue';
import Forbidden from './views/403.vue';

Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'frameworks',
            component: Frameworks,
            alias: '/cass-editor/'
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
            path: '/import',
            name: 'import',
            component: Import
        },
        {
            path: '/organizations',
            name: 'organizations',
            component: Organizations
        },
        {
            path: '/organization',
            name: 'organization',
            component: Organization
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        },
        {
            path: '/conceptScheme',
            name: 'conceptScheme',
            component: ConceptScheme
        },
        {
            path: '/403',
            name: '403',
            component: Forbidden
        },
        {
            path: '/500',
            name: '500',
            component: InternalError
        },
        {
            path: '/*',
            name: '404',
            component: NotFound
        }
    ]
});
