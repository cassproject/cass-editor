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
                default: () => import(/* webpackChunkName: "welcome" */ './views/Welcome.vue'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            },
            alias: '/cass-editor/'
        },
        {
            path: '/frameworks',
            name: 'frameworks',
            components: {
                default: () => import(/* webpackChunkName: "frameworks" */ './views/framework/Frameworks.vue'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/concepts',
            name: 'concepts',
            components: {
                default: () => import(/* webpackChunkName: "frameworks" */ './views/framework/Frameworks.vue'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ './views/login/Login.vue')
        },
        {
            path: '/legacyLogin',
            name: 'legacyLogin',
            component: () => import(/* webpackChunkName: "login" */ './views/login/LegacyLogin.vue')
        },
        {
            path: '/configuration',
            name: 'configuration',
            components: {
                default: () => import(/* webpackChunkName: "configurationEditor" */ './views/configuration/ConfigurationEditor'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/users',
            name: 'users',
            components: {
                default: () => import(/* webpackChunkName: "userGroupEditor" */ './views/usersGroups/UserGroupEditor'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        // {
        //     path: '/users-and-groups',
        //     name: 'users-and-groups',
        //     components: {
        //         default: () => import('./views/usersGroups/UsersAndGroups.vue'),
        //         sidebar: () => import('./components/SideNav.vue'),
        //         topbar: () => import('./components/Topbar.vue')
        //     }
        // },
        {
            path: '/pluginManager',
            name: 'pluginManager',
            components: {
                default: () => import(/* webpackChunkName: "pluginManager" */ './views/plugins/PluginManager'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/crosswalk',
            name: 'crosswalk',
            components: {
                default: () => import(/* webpackChunkName: "crosswalk" */ './views/framework/Crosswalk'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/about',
            name: 'about',
            components: {
                default: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/framework',
            name: 'framework',
            components: {
                default: () => import(/* webpackChunkName: "framework" */ './views/framework/Framework.vue'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/import',
            name: 'import',
            components: {
                default: () => import(/* webpackChunkName: "import" */ './views/framework/Import.vue'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/organizations',
            name: 'organizations',
            components: {
                default: () => import(/* webpackChunkName: "organizations" */ './views/organization/Organizations.vue'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/organization',
            name: 'organization',
            components: {
                default: () => import(/* webpackChunkName: "organization" */ './views/organization/Organization.vue'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/test',
            name: 'test',
            component: () => import(/* webpackChunkName: "test" */ './lode/views/Test.vue')
        },
        {
            path: '/pluginContainer',
            name: 'pluginContainer',
            components: {
                default: () => import(/* webpackChunkName: "pluginContainer" */ './views/plugins/PluginContainer.vue'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/conceptScheme',
            name: 'conceptScheme',
            components: {
                default: () => import(/* webpackChunkName: "conceptScheme" */ './views/conceptScheme/ConceptScheme.vue'),
                sidebar: () => import(/* webpackChunkName: "sidenav" */ './components/SideNav.vue'),
                topbar: () => import(/* webpackChunkName: "topbar" */ './components/Topbar.vue')
            }
        },
        {
            path: '/403',
            name: 'Forbidden',
            component: () => import(/* webpackChunkName: "forbidden" */ './views/Forbidden.vue')
        },
        {
            path: '/500',
            name: 'InternalError',
            component: () => import(/* webpackChunkName: "internalError" */ './views/InternalError.vue')
        },
        {
            path: '/vlrc',
            name: 'vlrc',
            component: () => import(/* webpackChunkName: "vlrc" */ './legacy/VlrcIframe.vue')
        },
        {
            path: '/gap-analysis',
            name: 'gap-analysis',
            component: () => import(/* webpackChunkName: "gapAnalysis" */ './legacy/GapAnalysisIframe.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import(/* webpackChunkName: "profile" */ './legacy/ProfileIframe.vue')
        },
        {
            path: '/viewer',
            name: 'viewer',
            component: () => import(/* webpackChunkName: "viewer" */ './legacy/ViewerIframe.vue')
        },
        {
            path: '/directory',
            name: 'directory',
            components: {
                default: () => import('./views/directory/Directory.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        }
    ]
});
