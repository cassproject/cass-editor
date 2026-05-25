import { createRouter, createWebHashHistory } from 'vue-router';


export default createRouter({
    history: createWebHashHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                top: 100
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
            path: '/collections',
            name: 'collections',
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
            path: '/progressionLevels',
            name: 'progressionLevels',
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
            path: '/legacyLogin',
            name: 'legacyLogin',
            component: () => import('./views/login/LegacyLogin.vue')
        },
        {
            path: '/createAccount',
            name: 'createAccount',
            component: () => import('./views/login/CreateAccount.vue')
        },
        {
            path: '/configuration',
            name: 'configuration',
            components: {
                default: () => import('./views/ConfigurationEditor.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/users',
            name: 'users',
            components: {
                default: () => import('./views/usersGroups/UserGroupEditor.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/pluginManager',
            name: 'pluginManager',
            components: {
                default: () => import('./views/plugins/PluginManager.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/crosswalk',
            name: 'crosswalk',
            components: {
                default: () => import('./views/framework/Crosswalk.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/timeline',
            name: 'timeline',
            components: {
                default: () => import('./views/framework/Timeline.vue'),
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
            path: '/framework/:frameworkId?',
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
            path: '/pluginContainer',
            name: 'pluginContainer',
            components: {
                default: () => import('./views/plugins/PluginContainer.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/conceptScheme/:frameworkId?',
            name: 'conceptScheme',
            components: {
                default: () => import('./views/conceptScheme/ConceptScheme.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            path: '/progressionModel/:frameworkId?',
            name: 'progressionModel',
            components: {
                default: () => import('./views/progressionModel/ProgressionModel.vue'),
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
            path: '/directory',
            name: 'directory',
            components: {
                default: () => import('./views/directory/Directory.vue'),
                sidebar: () => import('./components/SideNav.vue'),
                topbar: () => import('./components/Topbar.vue')
            }
        },
        {
            // Catch-all for Vue Router 4
            path: '/:pathMatch(.*)*',
            redirect: '/403'
        }
    ]
});
