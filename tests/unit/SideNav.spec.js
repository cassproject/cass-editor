/* eslint-disable */

import {shallowMount, createLocalVue} from '@vue/test-utils';
import SideNav from '@/components/SideNav.vue';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('SideNav', () => {
    let store;
    let mutations;
    let state;
    let getters;
    let actions;

    beforeEach(() => {

        jest.restoreAllMocks();

        store = new Vuex.Store({
            modules: {
                editor: {
                    namespaced: true,
                    mutations: {
                        framework: jest.fn(),
                        organization: jest.fn(),
                        selectedCompetency: jest.fn(),
                        defaultLanguage: jest.fn(),
                        webSocketBackoffIncrease: jest.fn(),
                        private: jest.fn(),
                        selectCompetencyRelation: jest.fn(),
                        selectingCompetencies: jest.fn(),
                        newCompetency: jest.fn(),
                        t3Profile: jest.fn(),
                        changedObject: jest.fn(),
                        loggedOnPerson: jest.fn(),
                    },
                    getters: {

                    },
                    actions: {
                        refreshDirectories: jest.fn()
                    },
                    state: {
                        
                    }
                },
                app: {
                    namespaced: true,
                    mutations: {
                        
                    },
                    getters: {
                        curatedPlugins: jest.fn(() => [])
                    },
                    actions: {

                    },
                    state: {

                    }
                }
            }
        });
    });

    it('renders sidenav', async () => {
        const wrapper = shallowMount(SideNav, {
            localVue,
            store,
            computed: {
                loginEnabled: function() {
                    return true;
                },
                crosswalkEnabled: function() {
                    return true;
                },
                userManagementEnabled: function() {
                    return true;
                },
                configurationsEnabled: function() {
                    return true;
                },
                pluginsEnabled: function() {
                    return true;
                },
                pluginLastUpdate: function() {
                    return true;
                },
                directoryList: function() {
                    return true;
                },
                isLoggedOn: function() {
                    return true;
                },
                displayName: function() {
                    return 'name';
                },
                currentRoute: function() {
                    return '';
                },
                loggedOnPerson: function() {
                    return 'person';
                },
                myTopLevelDirectories: function() {
                    return [];
                }
            },
            propsData: {
                showSideNav: true
            },
            data() {
                return {
                    queryParams: {} 
                };
            }
        });

        let thing = wrapper.find('#app-side-nav-bar');
        expect(thing.exists()).toBe(true);
    })

    it('renders the assertion section when logged in and assertion are not disabled', async () => {
        const wrapper = shallowMount(SideNav, {
            localVue,
            store,
            computed: {
                loginEnabled: function() {
                    return true;
                },
                crosswalkEnabled: function() {
                    return true;
                },
                userManagementEnabled: function() {
                    return true;
                },
                configurationsEnabled: function() {
                    return true;
                },
                pluginsEnabled: function() {
                    return true;
                },
                pluginLastUpdate: function() {
                    return true;
                },
                directoryList: function() {
                    return true;
                },
                isLoggedOn: function() {
                    return true;
                },
                displayName: function() {
                    return 'name';
                },
                currentRoute: function() {
                    return '';
                },
                loggedOnPerson: function() {
                    return 'person';
                },
                myTopLevelDirectories: function() {
                    return [];
                }
            },
            propsData: {
                showSideNav: true
            },
            data() {
                return {
                    queryParams: {} 
                };
            }
        });

        let thing = wrapper.find('[data-id="side-nav-assertions-section"]');
        expect(thing.exists()).toBe(true);
    })

    it('does not show assertions section if assertions are disabled', async () => {
        const wrapper = shallowMount(SideNav, {
            localVue,
            store,
            computed: {
                loginEnabled: function() {
                    return true;
                },
                crosswalkEnabled: function() {
                    return true;
                },
                userManagementEnabled: function() {
                    return true;
                },
                configurationsEnabled: function() {
                    return true;
                },
                pluginsEnabled: function() {
                    return true;
                },
                pluginLastUpdate: function() {
                    return true;
                },
                directoryList: function() {
                    return true;
                },
                isLoggedOn: function() {
                    return true;
                },
                displayName: function() {
                    return 'name';
                },
                currentRoute: function() {
                    return '';
                },
                loggedOnPerson: function() {
                    return 'person';
                },
                myTopLevelDirectories: function() {
                    return [];
                }
            },
            propsData: {
                showSideNav: true
            },
            data() {
                return {
                    queryParams: {
                        disableAssertions: 'true'
                    } 
                };
            }
        });

        let thing = wrapper.find('[data-id="side-nav-assertions-section"]');
        expect(thing.exists()).toBe(false);
    })

    it('does not show assertions section if not logged in', async () => {
        const wrapper = shallowMount(SideNav, {
            localVue,
            store,
            computed: {
                loginEnabled: function() {
                    return true;
                },
                crosswalkEnabled: function() {
                    return true;
                },
                userManagementEnabled: function() {
                    return true;
                },
                configurationsEnabled: function() {
                    return true;
                },
                pluginsEnabled: function() {
                    return true;
                },
                pluginLastUpdate: function() {
                    return true;
                },
                directoryList: function() {
                    return true;
                },
                isLoggedOn: function() {
                    return false;
                },
                displayName: function() {
                    return 'name';
                },
                currentRoute: function() {
                    return '';
                },
                loggedOnPerson: function() {
                    return 'person';
                },
                myTopLevelDirectories: function() {
                    return [];
                }
            },
            propsData: {
                showSideNav: true
            },
            data() {
                return {
                    queryParams: {} 
                };
            }
        });

        let thing = wrapper.find('[data-id="side-nav-assertions-section"]');
        expect(thing.exists()).toBe(false);
    })

    it('open share assertion modal when button is clicked', async () => {
        let shareAssertions = jest.spyOn(SideNav.methods, 'shareAssertions').mockReturnValue({});
        const wrapper = shallowMount(SideNav, {
            localVue,
            store,
            computed: {
                loginEnabled: function() {
                    return true;
                },
                crosswalkEnabled: function() {
                    return true;
                },
                userManagementEnabled: function() {
                    return true;
                },
                configurationsEnabled: function() {
                    return true;
                },
                pluginsEnabled: function() {
                    return true;
                },
                pluginLastUpdate: function() {
                    return true;
                },
                directoryList: function() {
                    return true;
                },
                isLoggedOn: function() {
                    return true;
                },
                displayName: function() {
                    return 'name';
                },
                currentRoute: function() {
                    return '';
                },
                loggedOnPerson: function() {
                    return 'person';
                },
                myTopLevelDirectories: function() {
                    return [];
                }
            },
            propsData: {
                showSideNav: true
            },
            data() {
                return {
                    queryParams: {} 
                };
            }
        });

        let thing = wrapper.find('[data-id="share-assertions-button"]');
        await thing.trigger('click');
        expect(shareAssertions).toHaveBeenCalledTimes(1);
    })
});
