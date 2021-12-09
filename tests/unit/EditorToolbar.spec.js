/* eslint-disable */

import {shallowMount, createLocalVue} from '@vue/test-utils';
import EditorToolbar from '@/components/framework/EditorToolbar.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

var defaultComputed = {};

describe('Editor Toolbar', () => {
    let store;
    let mutations;
    let state;
    let getters;
    let actions;

    beforeEach(() => {
        jest.restoreAllMocks();

        defaultComputed = {
            showAddComments: function() {
                return true;
            },
            showViewComments: function() {
                return true;
            },
            canEditFramework: function() {
                return true;
            },
            loggedIn: function() {
                return true;
            },
            configuration: function() {
                return {}
            },
            canExport: function() {
                return true;
            },
            configurationsEnabled: function() {
                return true;
            },
            shareEnabled: function() {
                return true;
            },
            userManagementEnabled: function() {
                return true;
            },
            showUserManagementIcon: function() {
                return true;
            },
            directoryId: function() {
                return '';
            },
            managingAssertions: function() {
                return false;
            },
            queryParams: function() {
                return {}
            }
        }

        jest.spyOn(EditorToolbar.methods, 'checkIsPrivate').mockReturnValue({});

        state = {

        };

        mutations = {
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
            setManageAssertions: jest.fn(),
            setPeople: jest.fn(),
            setPropertyLevel: jest.fn()
        };

        getters = {
            setPropertyLevel: jest.fn()
        }

        actions = {
            searchForAssertions: jest.fn()
        }

        store = new Vuex.Store({
            modules: {
                editor: {
                    namespaced: true,
                    mutations,
                    getters,
                    actions,
                    state
                }
            }
        });
    });

    it('Shows manage assertions button when it is allowed to', () => {
        defaultComputed.canManageAssertions = function() {
            return true;
        }
        const wrapper = shallowMount(EditorToolbar, {
            localVue,
            store,
            computed: defaultComputed,
            methods: {
                getConfigurationName: jest.fn()
            },
            data() {
                return {
                };
            }
        });
        let thing = wrapper.find('#manageAssertionsButton');
        expect(thing.exists()).toBe(true);
    });

    it('Hides the manage assertions button when it is supposed to', () => {
        defaultComputed.canManageAssertions = function() {
            return false;
        }

        const wrapper = shallowMount(EditorToolbar, {
            localVue,
            store,
            computed: defaultComputed,
            methods: {
                getConfigurationName: jest.fn()
            },
            data() {
                return {
                };
            }
        });
        let thing = wrapper.find('#manageAssertionsButton');
        expect(thing.exists()).toBe(false);
    })

    it('Prevents managing assertions when not logged in', () => {
        defaultComputed.loggedIn = function() {
            return false;
        }
        const wrapper = shallowMount(EditorToolbar, {
            localVue,
            store,
            computed: defaultComputed,
            methods: {
                getConfigurationName: jest.fn()
            },
            data() {
                return {
                };
            }
        });
        let thing = wrapper.find('#manageAssertionsButton');
        expect(thing.exists()).toBe(false);
    })

    it('Prevents managing assertions when query param is set', () => {
        defaultComputed.queryParams = function() {
            return {
                disableAssertions: 'true'
            }
        }
        const wrapper = shallowMount(EditorToolbar, {
            localVue,
            store,
            computed: defaultComputed,
            methods: {
                getConfigurationName: jest.fn()
            },
            data() {
                return {
                };
            }
        });
        let thing = wrapper.find('#manageAssertionsButton');
        expect(thing.exists()).toBe(false);
    })

    it('Prevents managing assertions when both not logged in and query param is set', () => {
        defaultComputed.loggedIn = function() {
            return false;
        }
        defaultComputed.queryParams = function() {
            return {
                disableAssertions: 'true'
            }
        }
        const wrapper = shallowMount(EditorToolbar, {
            localVue,
            store,
            computed: defaultComputed,
            methods: {
                getConfigurationName: jest.fn()
            },
            data() {
                return {
                };
            }
        });
        let thing = wrapper.find('#manageAssertionsButton');
        expect(thing.exists()).toBe(false);
    })

    it('enables assertion management when button is clicked', async () => {
        let manageAssertions = jest.spyOn(EditorToolbar.methods, 'manageAssertions');
        global.EcPerson = {
            search: jest.fn().mockReturnValue(new Promise((resolve) => {resolve([{name: 'name', owner: ['key']}])}))
        }
        defaultComputed.canManageAssertions = function() {
            return true;
        }
        const wrapper = shallowMount(EditorToolbar, {
            localVue,
            store,
            computed: defaultComputed,
            methods: {
                getConfigurationName: jest.fn()
            },
            data() {
                return {
                };
            }
        });
        let thing = wrapper.find('#manageAssertionsButton');
        await thing.trigger('click');
        expect(manageAssertions).toHaveBeenCalled();
        expect(global.EcPerson.search).toHaveBeenCalled();
        expect(actions.searchForAssertions).toHaveBeenCalled();
        expect(mutations.setManageAssertions).toHaveBeenCalledWith({}, true);
    })

    it('disables assertion management when button is clicked and is currently managing assertions', async () => {
        let manageAssertions = jest.spyOn(EditorToolbar.methods, 'manageAssertions');
        defaultComputed.canManageAssertions = function() {
            return true;
        }
        const wrapper = shallowMount(EditorToolbar, {
            localVue,
            store,
            computed: defaultComputed,
            methods: {
                getConfigurationName: jest.fn()
            },
            data() {
                return {
                    managingAssertions: true
                };
            }
        });
        let thing = wrapper.find('#manageAssertionsButton');
        await thing.trigger('click');
        expect(manageAssertions).toHaveBeenCalled();
        expect(mutations.setManageAssertions).toHaveBeenCalledWith({}, false);
    })

});
