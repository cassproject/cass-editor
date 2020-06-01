import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                offset: {x: 0, y: -100}
            };
        }
    },
    routes: [
        {
            path: '/',
            name: 'welcome',
            components: {
                default: () => import('./views/Welcome.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            },
            alias: '/cass-editor/'
        },
        {
            path: '/frameworks',
            name: 'frameworks',
            components: {
                default: () => import('./views/framework/Frameworks.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/concepts',
            name: 'concepts',
            components: {
                default: () => import('./views/framework/Frameworks.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/login/Login.vue')
        },
        {
            path: '/config',
            name: 'configuration',
            components: {
                default: () => import('./views/configuration/ConfigurationEditor'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/userGroup',
            name: 'usergroup',
            components: {
                default: () => import('./views/usersGroups/UserGroupEditor'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/crosswalk',
            name: 'crosswalk',
            components: {
                default: () => import('./views/framework/Crosswalk'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/about',
            name: 'about',
            components: {
                default: () => import('./views/About.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/framework',
            name: 'framework',
            components: {
                default: () => import('./views/framework/Framework.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/import',
            name: 'import',
            components: {
                default: () => import('./views/framework/Import.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/organizations',
            name: 'organizations',
            components: {
                default: () => import('./views/organization/Organizations.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/organization',
            name: 'organization',
            components: {
                default: () => import('./views/organization/Organization.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('./lode/views/Test.vue')
        },
        {
            path: '/conceptScheme',
            name: 'conceptScheme',
            components: {
                default: () => import('./views/conceptScheme/ConceptScheme.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/403',
            name: 'Forbidden',
            component: () => import('./views/Forbidden.vue')
        },
        {
            path: '/500',
            name: 'InternalError',
            component: () => import('./views/InternalError.vue')
        },
        {
            path: '/*',
            name: 'NotFound',
            component: () => import('./views/NotFound.vue')
        }
    ]
});
