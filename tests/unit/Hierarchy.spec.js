/* eslint-disable */

import {shallowMount, createLocalVue} from '@vue/test-utils';
import Hierarchy from '@/lode/components/Hierarchy.vue';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Hierarchy', () => {
    let store;
    let mutations;
    let state;
    let getters;
    let actions;

    let defaultData;
    let defaultProps; 

    beforeEach(() => {

        jest.restoreAllMocks();

        defaultData = {
            LARGE_NUMBER_OF_ITEMS:200,
            addCompetencyOrChildText:"Add Competency",
            addingNode:false,
            arrowKey:null,
            availablePersons:Array[0],
            controlOnStart:false,
            dragIcon:"fa-arrows-alt",
            dragging:false,
            expanded:true,
            filter:"showAll",
            isDraggable:true,
            multipleSelected:false,
            once:false,
            personFilter:"",
            selectAll:false,
            selectButtonText:null,
            selectedArray:Array[0],
            selectedSubject:null,
            shiftKey:false,
            showAligned:false
        }

        defaultProps = {
            container: {
                _delete: jest.fn(),
                competency: [],
                context: '123',
                id: '123',
                level: [],
                name: {
                    '@language': 'en',
                    '@value': 'test'
                },
                owner: [],
                relation: [],
                'schema:dateCreated': "2020-04-30T16:53:07.393Z",
                'schema:dateModified': "2020-05-04T20:00:58.417Z",
                type: "Framework"
            },
            containerEdgeProperty:"relation",
            containerNodeProperty:"competency",
            containerType:"Framework",
            containerTypeGet:"EcFramework",
            edgeRelationLiteral:"narrows",
            edgeRelationProperty:"relationType",
            edgeSourceProperty:"source",
            edgeTargetProperty:"target",
            edgeType:"EcAlignment",
            highlightList: [],
            newFramework: false,
            nodeType:"EcCompetency",
            properties:"primary",
            scrolled:false,
            subview:"",
            view:"framework",
            viewOnly:false,
            canEditAssertions:true
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

    it('Shows the subject select section when manage assertions is enabled', () => {
        jest.spyOn(Hierarchy.methods, 'computeHierarchy').mockReturnValue({});
        const wrapper = shallowMount(Hierarchy, {
            localVue,
            store,
            propsData: defaultProps,
            methods: {
                getSubjectInfo: jest.fn(),
                move: jest.fn(),
                add: jest.fn()
            },
            computed: {
                managingAssertions: function() {
                    return true;
                },
                canEdit: function() {
                    return true;
                },
                filteredAvailablePersons: function() {
                    return [];
                }
            },
            data() {
                return defaultData;
            }
        });
        let thing = wrapper.find('.assertion-subject-select');
        expect(thing.exists()).toBe(true);
    });

    it('does not show the subject select section when manage assertions is not enabled', () => {
        jest.spyOn(Hierarchy.methods, 'computeHierarchy').mockReturnValue({});
        const wrapper = shallowMount(Hierarchy, {
            localVue,
            store,
            propsData: defaultProps,
            methods: {
                getSubjectInfo: jest.fn(),
                move: jest.fn(),
                add: jest.fn()
            },
            computed: {
                managingAssertions: function() {
                    return false;
                },
                canEdit: function() {
                    return true;
                },
                filteredAvailablePersons: function() {
                    return [];
                }
            },
            data() {
                return defaultData;
            }
        });
        let thing = wrapper.find('.assertion-subject-select');
        expect(thing.exists()).toBe(false);
    });

    it('opens subject select when button is clicked', async () => {
        let openSelectSubjectModal = jest.spyOn(Hierarchy.methods, 'openSelectSubjectModal');
        let showModal = jest.spyOn(Hierarchy.methods, 'showModal').mockReturnValue({});
        jest.spyOn(Hierarchy.methods, 'computeHierarchy').mockReturnValue({});
        global.EcPerson = {
            search: jest.fn().mockResolvedValue([])
        }
        defaultData.selectedSubject = 'myself';
        const wrapper = shallowMount(Hierarchy, {
            localVue,
            store,
            propsData: defaultProps,
            methods: {
                getSubjectInfo: jest.fn(),
                move: jest.fn(),
                add: jest.fn()
            },
            computed: {
                managingAssertions: function() {
                    return true;
                },
                canEdit: function() {
                    return true;
                },
                filteredAvailablePersons: function() {
                    return [];
                }
            },
            data() {
                return defaultData;
            }
        });
        let thing = wrapper.find('.assertion-subject-select-button');
        await thing.trigger('click');
        await flushPromises();
        expect(openSelectSubjectModal).toHaveBeenCalled();
        expect(global.EcPerson.search).toHaveBeenCalled();
        expect(showModal).toHaveBeenCalledWith('subject');
    })
});
