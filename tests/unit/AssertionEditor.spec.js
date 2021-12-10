/* eslint-disable */

import {shallowMount, createLocalVue} from '@vue/test-utils';
import AssertionEditor from '@/lode/components/AssertionEditor.vue';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AssertionEditor', () => {
    let store;
    let mutations;
    let state;
    let getters;
    let actions;

    beforeEach(() => {

        jest.restoreAllMocks();

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
            assertions: function() {

            }
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

    it('renders assertion editor and initializes', () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('.assertions-group');
        expect(initAssertions).toHaveBeenCalledTimes(1);
        expect(thing.exists()).toBe(true);
    })

    it('generates positive assertions when the button is clicked', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        let handleCanClick = jest.spyOn(AssertionEditor.methods, 'handleCanClick').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('[data-id="positiveAssertionButton"]');
        await thing.trigger('click');
        expect(handleCanClick).toHaveBeenCalledTimes(1);
    })

    it('generates negative assertions when the button is clicked', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        let handleCannotClick = jest.spyOn(AssertionEditor.methods, 'handleCannotClick').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('[data-id="negativeAssertionButton"]');
        await thing.trigger('click');
        expect(handleCannotClick).toHaveBeenCalledTimes(1);
    })

    it('does not show the add badge button if there is not a positive assertion', () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('[data-id="badgeButton"]');
        expect(thing.exists()).toBe(false);
    })

    it('shows the add badge button if there is a positive assertion', () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('[data-id="badgeButton"]');
        expect(thing.exists()).toBe(true);
    })

    it('shows the remove badge button if a badge exists', () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                badgeExists: function() {
                    return true;
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('[data-id="badgeButton"]');
        expect(thing.text()).toBe('- Remove Badge');
    })

    it('adds a badge when the button is clicked', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        let handleBadgeclick = jest.spyOn(AssertionEditor.methods, 'handleBadgeClick').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('[data-id="badgeButton"]');
        await thing.trigger('click');
        expect(handleBadgeclick).toHaveBeenCalledTimes(1);
    })

    it('shows the view badge button if a badge exists', () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                badgeExists: function() {
                    return true;
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('[data-id="viewBadgeButton"]');
        expect(thing.exists()).toBe(true);
    })

    it('views the badge when the button is clicked', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        let viewBadge = jest.spyOn(AssertionEditor.methods, 'viewBadge').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                badgeExists: function() {
                    return true;
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('[data-id="viewBadgeButton"]');
        await thing.trigger('click');
        expect(viewBadge).toHaveBeenCalledTimes(1);
    })

    it('does not show the evidence input when assertions does not exist', () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                assertionExists: function() {
                    return false;
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('.assertions-input > input');
        expect(thing.exists()).toBe(false);
    })

    it('shows the evidence input when assertion exists', () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                assertionExists: function() {
                    return true;
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('.assertions-input > input');
        expect(thing.exists()).toBe(true);
    })

    it('saves the evidence when submitted', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        let handleEvidenceAssertion = jest.spyOn(AssertionEditor.methods, 'handleEvidenceAssertion').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                assertionExists: function() {
                    return true;
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: null,
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });
        let thing = wrapper.find('.assertions-input > input');
        await thing.setValue('some evidence');
        expect(thing.element.value).toBe('some evidence');
        expect(wrapper.vm.assertionText).toBe('some evidence');
        await thing.trigger('keyup.enter');
        expect(handleEvidenceAssertion).toHaveBeenCalledTimes(1);
    })

    it('displays evidence when available and assertion exists', () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                assertionExists: function() {
                    return true;
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        url: 'https://google.com',
                        text: 'did this',
                        original: 'thing1'
                    }, {
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });

        let thing = wrapper.find('.assertions-evidence');
        expect(thing.exists()).toBe(true);

        let newThing = wrapper.find('[data-id="evidenceElement"] > a');
        expect(newThing.exists()).toBe(true);
        expect(newThing.element.href).toBe('https://google.com/');
        expect(newThing.text()).toBe('did this');

        let otherThing = wrapper.find('[data-id="evidenceElement"] > span');
        expect(otherThing.exists()).toBe(true);
        expect(otherThing.text()).toBe('some evidence');
    })

    it('removes evidence when the button is clicked', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        let handleUnevidenceAssertion = jest.spyOn(AssertionEditor.methods, 'handleUnevidenceAssertion').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                assertionExists: function() {
                    return true;
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null // TODO
                };
            }
        });

        let thing = wrapper.find('[data-id="removeEvidenceButton"]');
        expect(thing.exists()).toBe(true);
        await thing.trigger('click');
        expect(handleUnevidenceAssertion).toHaveBeenCalledTimes(1);
    })

    it('re-initializes if the subject changes', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                assertionExists: function() {
                    return true;
                },
                subject: function() {
                    return this.test;
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null, // TODO
                    test: '1'
                };
            }
        });
        wrapper.setData({test: '2'});
        await localVue.nextTick();
        expect(initAssertions).toHaveBeenCalledTimes(2);
    })

    it('computed: badgeExists', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: true,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null
                };
            }
        });
        expect(wrapper.vm.badgeExists).toBe(false);
        wrapper.setData({badge: true});
        await localVue.nextTick();
        expect(wrapper.vm.badgeExists).toBe(true);
    })

    it('computed: assertionExists', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null
                };
            }
        });

        expect(wrapper.vm.assertionExists).toBe(false);
        wrapper.setData({canAssertion: true});
        await localVue.nextTick();
        expect(wrapper.vm.assertionExists).toBe(true);

        wrapper.setData({canAssertion: false, cannotAssertion: true});
        await localVue.nextTick();
        expect(wrapper.vm.assertionExists).toBe(true);
    })

    it('computed: otherClaimsPhrase', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                subject: function() {
                    return this.testSubject
                },
                me: function() {
                    return this.testMe
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null,
                    testSubject: 'test1',
                    testMe: 'test1'
                };
            }
        });

        expect(wrapper.vm.otherClaimsPhrase).toBe('Others have made claims about you. Click to expand.');
        wrapper.setData({testSubject: 'test2'});
        await localVue.nextTick();
        expect(wrapper.vm.otherClaimsPhrase).toBe('Others have made claims about them. Click to expand.');
    })

    it('computed: reasonPlaceholder', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                subject: function() {
                    return this.testSubject
                },
                me: function() {
                    return this.testMe
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null,
                    testSubject: 'test1',
                    testMe: 'test1'
                };
            }
        });

        expect(wrapper.vm.reasonPlaceholder).toBe('do this because I...');
        wrapper.setData({testSubject: 'test2'});
        await localVue.nextTick();
        expect(wrapper.vm.reasonPlaceholder).toBe('do this because they...');
    })

    it('computed: canButtonText', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                subject: function() {
                    return this.testSubject
                },
                me: function() {
                    return this.testMe
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null,
                    testSubject: 'test1',
                    testMe: 'test1'
                };
            }
        });

        expect(wrapper.vm.canButtonText).toBe('I can');
        wrapper.setData({testSubject: 'test2'});
        await localVue.nextTick();
        expect(wrapper.vm.canButtonText).toBe('They can');
    })

    it('computed: canButtonText', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            computed: {
                subject: function() {
                    return this.testSubject
                },
                me: function() {
                    return this.testMe
                }
            },
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null,
                    testSubject: 'test1',
                    testMe: 'test1'
                };
            }
        });

        expect(wrapper.vm.cantButtonText).toBe("I can't");
        wrapper.setData({testSubject: 'test2'});
        await localVue.nextTick();
        expect(wrapper.vm.cantButtonText).toBe("They can't");
    })

    it('computed: canButtonIcon', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null
                };
            }
        });

        expect(wrapper.vm.canButtonIcon).toBe('far fa-circle');
        wrapper.setData({canAssertion: true});
        await localVue.nextTick();
        expect(wrapper.vm.canButtonIcon).toBe('far fa-check-circle');
    })

    it('computed: cantButtonIcon', async () => {
        let initAssertions = jest.spyOn(AssertionEditor.methods, 'initAssertions').mockReturnValue({});
        const wrapper = shallowMount(AssertionEditor, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    loading: false,
                    canAssertion: false,
                    cannotAssertion: false,
                    assertionText: '',
                    badge: false,
                    badgeLink: null,
                    repo: window.repo,
                    competentStateEah: null,
                    evidence: null,
                    evidenceExplanation: [{
                        text: 'some evidence',
                        original: 'thing2'
                    }],
                    assertionsByOthers: [],
                    iconAssertion: true,
                    subjectPerson: null
                };
            }
        });

        expect(wrapper.vm.cantButtonIcon).toBe('far fa-square');
        wrapper.setData({cannotAssertion: true});
        await localVue.nextTick();
        expect(wrapper.vm.cantButtonIcon).toBe('far fa-check-square');
    })
});
