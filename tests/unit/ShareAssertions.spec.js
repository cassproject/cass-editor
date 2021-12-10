/* eslint-disable */

import {shallowMount, createLocalVue} from '@vue/test-utils';
import ShareAssertions from '@/components/modalContent/ShareAssertions.vue';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ShareAssertions', () => {
    let store;
    let mutations;
    let state;
    let getters;
    let actions;

    beforeEach(() => {

        jest.restoreAllMocks();

        global.EcIdentityManager = {
            default: {
                ids: [{
                    ppk: {
                        toPk: function() {
                            return {
                                toPem: function() {
                                    return 'somekey'
                                }
                            }
                        }
                    }
                }]
            }
        }

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
        };

        getters = {

        }

        actions = {

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

    it('renders share assertions modal', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });

        let thing = wrapper.find('.assertion-share-container');
        expect(thing.exists()).toBe(true);
    })

    it('displays the correct share subjects', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }]),
                filteredAvailableTargets: jest.fn().mockReturnValue([])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });

        let thing = wrapper.findAll('[data-id="share-assertions-subject-option"]');
        expect(thing.length).toBe(2);
    })

    it('selects all share subjects when clicked', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }]),
                filteredAvailableTargets: jest.fn().mockReturnValue([])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });

        let thing = wrapper.find('[data-id="share-assertions-select-all-subjects"]');
        expect(thing.exists()).toBe(true);
        await thing.trigger('click');
        expect(wrapper.vm.shareSubjects['123']).toBe(1);
        expect(wrapper.vm.shareSubjects['456']).toBe(1);   
    })

    it('deselects all share subjects', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }]),
                filteredAvailableTargets: jest.fn().mockReturnValue([])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    shareSubjects: {
                        '123': 1,
                        '456': 1
                    }
                };
            }
        });

        let thing = wrapper.find('[data-id="share-assertions-select-all-subjects"]');
        expect(thing.exists()).toBe(true);
        await thing.setChecked();
        await thing.trigger('click');
        expect(wrapper.vm.shareSubjects['123']).toBe(undefined);
        expect(wrapper.vm.shareSubjects['456']).toBe(undefined);
    })

    it('filters available subjects when searching', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([{
                owner: ['123'],
                getName: function() {
                    return 'person1'
                },
                email: 'email1'
            }, {
                owner: ['456'],
                getName: function() {
                    return 'person2'
                },
                email: 'email2'
            }])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableTargets: jest.fn().mockReturnValue([])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });
        await localVue.nextTick();
        expect(wrapper.vm.availablePersons.length).toBe(2);
        let thing = wrapper.findAll('[data-id="share-assertions-subject-option"]');
        expect(thing.length).toBe(2);

        let newThing = wrapper.find('[data-id="share-assertions-subject-search"]');
        await newThing.setValue('person2');
        expect(wrapper.vm.subjectFilter).toBe('person2');

        expect(wrapper.vm.availablePersons.length).toBe(2);

        thing = wrapper.findAll('[data-id="share-assertions-subject-option"]');
        expect(thing.length).toBe(1);
    })

    it('sets the subject when clicking the row', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }]),
                filteredAvailableTargets: jest.fn().mockReturnValue([])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });
        
        let thing = wrapper.find('[data-id="share-assertions-subject-option"]');
        await thing.trigger('click');
        expect(wrapper.vm.shareSubjects['123']).toBe(1);
        expect(wrapper.vm.shareSubjects['456']).toBe(undefined);
    })

    it('sets the subject when clicking the checkbox', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }]),
                filteredAvailableTargets: jest.fn().mockReturnValue([])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });
        
        let thing = wrapper.find('[data-id="share-assertions-subject-option"] input');
        await thing.trigger('click');
        expect(wrapper.vm.shareSubjects['123']).toBe(1);
        expect(wrapper.vm.shareSubjects['456']).toBe(undefined);
    })

    it('deselects the subject when clicking the row', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }]),
                filteredAvailableTargets: jest.fn().mockReturnValue([])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });
        
        let thing = wrapper.find('[data-id="share-assertions-subject-option"]');
        await thing.trigger('click');
        expect(wrapper.vm.shareSubjects['123']).toBe(1);
        expect(wrapper.vm.shareSubjects['456']).toBe(undefined);
    })

    it('deselects the subject when clicking the checkbox', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }]),
                filteredAvailableTargets: jest.fn().mockReturnValue([])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });
        
        let thing = wrapper.find('[data-id="share-assertions-subject-option"] input');
        await thing.trigger('click');
        expect(wrapper.vm.shareSubjects['123']).toBe(1);
        expect(wrapper.vm.shareSubjects['456']).toBe(undefined);
    })

    it('displays the correct share targets', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });

        let thing = wrapper.findAll('[data-id="share-assertions-target-option"]');
        expect(thing.length).toBe(2);
    })

    it('selects all share targets when clicked', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });

        let thing = wrapper.find('[data-id="share-assertions-select-all-targets"]');
        expect(thing.exists()).toBe(true);
        await thing.trigger('click');
        expect(wrapper.vm.shareTargets['123']).toBe(1);
        expect(wrapper.vm.shareTargets['456']).toBe(1);   
    })

    it('deselects all share targets', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    shareTargets: {
                        '123': 1,
                        '456': 1
                    }
                };
            }
        });

        let thing = wrapper.find('[data-id="share-assertions-select-all-targets"]');
        expect(thing.exists()).toBe(true);
        await thing.setChecked();
        await thing.trigger('click');
        expect(wrapper.vm.shareTargets['123']).toBe(undefined);
        expect(wrapper.vm.shareTargets['456']).toBe(undefined);
    })

    it('filters available targets when searching', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([{
                owner: ['123'],
                getName: function() {
                    return 'person1'
                },
                email: 'email1'
            }, {
                owner: ['456'],
                getName: function() {
                    return 'person2'
                },
                email: 'email2'
            }])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {

            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });
        await localVue.nextTick();
        expect(wrapper.vm.availablePersons.length).toBe(2);
        let thing = wrapper.findAll('[data-id="share-assertions-target-option"]');
        expect(thing.length).toBe(2);

        let newThing = wrapper.find('[data-id="share-assertions-target-search"]');
        await newThing.setValue('person2');
        expect(wrapper.vm.targetFilter).toBe('person2');

        expect(wrapper.vm.availablePersons.length).toBe(2);

        thing = wrapper.findAll('[data-id="share-assertions-target-option"]');
        expect(thing.length).toBe(1);
    })

    it('sets the target when clicking the row', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });
        
        let thing = wrapper.find('[data-id="share-assertions-target-option"]');
        await thing.trigger('click');
        expect(wrapper.vm.shareTargets['123']).toBe(1);
        expect(wrapper.vm.shareTargets['456']).toBe(undefined);
    })

    it('sets the target when clicking the checkbox', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });
        
        let thing = wrapper.find('[data-id="share-assertions-target-option"] input');
        await thing.trigger('click');
        expect(wrapper.vm.shareTargets['123']).toBe(1);
        expect(wrapper.vm.shareTargets['456']).toBe(undefined);
    })

    it('deselects the target when clicking the row', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });
        
        let thing = wrapper.find('[data-id="share-assertions-target-option"]');
        await thing.trigger('click');
        expect(wrapper.vm.shareTargets['123']).toBe(1);
        expect(wrapper.vm.shareTargets['456']).toBe(undefined);
    })

    it('deselects the target when clicking the checkbox', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([{
                    owner: ['123'],
                    getName: function() {
                        return 'person1'
                    },
                    email: 'email1'
                }, {
                    owner: ['456'],
                    getName: function() {
                        return 'person2'
                    },
                    email: 'email2'
                }])
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });
        
        let thing = wrapper.find('[data-id="share-assertions-target-option"] input');
        await thing.trigger('click');
        expect(wrapper.vm.shareTargets['123']).toBe(1);
        expect(wrapper.vm.shareTargets['456']).toBe(undefined);
    })

    it('share button is disabled when nothing is selected', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([]),
                notSelected: jest.fn().mockReturnValue(true)
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    
                };
            }
        });

        let thing = wrapper.find('[data-id="share-assertions-button"]');
        expect(thing.element.disabled).toBe(true);
    })

    it('share button is disabled when processing', async () => {
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([]),
                notSelected: jest.fn().mockReturnValue(false)
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {
                    isProcessing: true
                };
            }
        });

        let thing = wrapper.find('[data-id="share-assertions-button"]');
        expect(thing.element.disabled).toBe(true);
    })

    it('shares assertions when button is clicked', async () => {
        let shareAssertions = jest.spyOn(ShareAssertions.methods, 'shareAssertions').mockReturnValue({});
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        const wrapper = shallowMount(ShareAssertions, {
            localVue,
            store,
            computed: {
                filteredAvailableSubjects: jest.fn().mockReturnValue([]),
                filteredAvailableTargets: jest.fn().mockReturnValue([]),
                notSelected: jest.fn().mockReturnValue(false)
            },
            propsData: {
                queryParams: {},
                isActive: true
            },
            data() {
                return {

                };
            }
        });

        let thing = wrapper.find('[data-id="share-assertions-button"]');
        await thing.trigger('click');
        expect(shareAssertions).toHaveBeenCalledTimes(1);
    })
});
