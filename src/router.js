import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);
export default new Router({
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
            path: '/configuration',
            name: 'configuration',
            components: {
                default: () => import('./views/configuration/ConfigurationEditor'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/users',
            name: 'users',
            components: {
                default: () => import('./views/usersGroups/UserGroupEditor'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/pluginManager',
            name: 'pluginManager',
            components: {
                default: () => import('./views/plugins/PluginManager'),
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
            path: '/pluginContainer',
            name: 'pluginContainer',
            components: {
                default: () => import('./views/plugins/PluginContainer.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
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
            path: '/vlrc',
            name: 'vlrc',
            component: () => import('./legacy/VlrcIframe.vue')
        },
        {
            path: '/gap-analysis',
            name: 'gap-analysis',
            component: () => import('./legacy/GapAnalysisIframe.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('./legacy/ProfileIframe.vue')
        },
        {
            path: '/viewer',
            name: 'viewer',
            component: () => import('./legacy/ViewerIframe.vue')
        }
    ]
});
