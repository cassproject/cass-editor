/* eslint-disable */

import {shallowMount, mount, createLocalVue} from '@vue/test-utils';
import Framework from '@/views/framework/Framework.vue';
import VueCommon from '@/mixins/common.js';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

localVue.mixin(VueCommon);

const router = new VueRouter();


describe('Framework.vue', () => {
    let store;
    let mutations;
    let state;

    beforeEach(() => {
        state = {
            framework: {
                "ceasn:educationLevelType":
                "https://dev.cassproject.org/api/data/schema.cassproject.org.0.3.skos.Concept/f9e9be8f-f98c-4b2f-b9f7-eee48a0bfba3",
                "validThrough": "2020-02-21T05:00:00.000Z",
                "competency": [],
                "level": ["https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Level/656ae60b-9318-4346-8a49-345ded742994", "https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Level/2ce8af3d-ffdf-4316-b51d-4c634a610f9d", "https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Level/f1ef9004-87be-4c28-81db-6ab90136f9c0", "https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Level/14ee2de4-cab9-4a19-8c6c-6d73d5028242", "https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Level/7c7bb599-e165-4883-8db2-950a5f675c32", "https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Level/348fc0f7-91f8-43fb-9119-11b339eb3824", "https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Level/ba606923-ce3b-404f-b606-ad26244bec47", "https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Level/2de3d04e-18ea-4e26-af13-f8decb0070c5", "https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Level/a0db426e-91e6-4140-b2ed-7c6da77cd9f3"],
                "type": "Framework",
                "ceasn:conceptTerm": ["http://term", "https://dev.cassproject.org/api/data/schema.cassproject.org.0.3.skos.Concept/1f9bdade-d527-4e97-af5d-80be43a5484a", "http://term2"],
                "ceasn:derivedFrom": "http://derived",
                "description": ["desc!", "d"],
                "schema:dateCreated": "2019-10-21T19:33:06.912Z",
                "validFrom": "2020-02-14T05:00:00.000Z",
                "context": "https://schema.cassproject.org/0.4",
                "version": 1583434012092,
                "ceasn:publicationStatusType": "http://credreg.net/ctdlasn/vocabs/publicationStatus/Draft",
                "relation": [],
                "schema:inLanguage": ["fr"],
                "schema:dateModified": "2020-03-05T18:46:52.091Z",
                "name": ["102 - Competencies", "102", "102"],
                "id": "https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Framework/551fd5da-9a6a-4eb9-9129-1ac101525d18/1583768904129",
                "owner": null,
                "signature": null,
                "reader": null
            },
            organization: null,
            selectedCompetency: null,
            defaultLanguage: null,
            webSocketBackoff: 100,
            selectCompetencyRelation: null,
            selectingCompetencies: false,
            private: false,
            newCompetency: null,
            t3Profile: false,
            changedObject: null,
            loggedOnPerson: {}
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
            loggedOnPerson: jest.fn()
        };

        store = new Vuex.Store({
            modules: {
                editor: {
                    namespaced: true,
                    mutations,
                    state
                }
            }
        });
    });

    it('Renders Framework page when Framework.vue is mounted ', () => {
        global.EcRepository = jest.fn();
        global.EcRepository.getBlocking = jest.fn(function() {
            return null;
        });
        const wrapper = shallowMount(Framework, {
            localVue,
            router,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                };
            }
        });
    });
    /*
    it('Drag and drop component exists when mounted Framework.vue is mounted', () => {
        const wrapper = mount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    framework: null
                };
            }
        });
        let dragAndDrop = wrapper.find('#drag-and-drop');
        expect(dragAndDrop.exists()).toBe(true);
    });
    it('Drag and drop files returns files array after upload', () => {
        const wrapper = shallowMount(DragAndDrop, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    framework: null
                };
            }
        });
        const event = {
            target: {
                files: [
                    {
                        name: 'testing.docx',
                        size: 50000,
                        type: 'doc'
                    }
                ]
            }
        };
        wrapper.vm.fileChange(event);
        expect(wrapper.vm.files).toEqual(event.target.files);
    });
    it('Process files button is enabled when file exists', async() => {
        const localThis = {
            files: [
                {
                    name: 'testing.docx',
                    size: 50000,
                    type: 'doc'
                }
            ]
        };
        expect(DragAndDrop.computed.uploadDisabled.call(localThis)).toBe(false);
    });
    it('Emits drag and drop emit files on upload', async() => {
        const wrapper = shallowMount(DragAndDrop, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    framework: null
                };
            }
        });
        wrapper.vm.upload();
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().dragAndDropEmitFiles).toBeTruthy();
    });
    it('Framework.vue contains correct files after drag and drop event', () => {
        const wrapper = shallowMount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    framework: null,
                    file: [
                        {
                            name: 'testing.docx',
                            size: 50000,
                            type: 'doc'
                        }
                    ]
                };
            }
        });

        const files = [
            {
                name: 'testing.docx',
                size: 50000,
                type: 'doc'
            }
        ];

        wrapper.vm.$emit('dragAndDropEmitFiles', files);
        expect(wrapper.vm.file).toStrictEqual(files);
    });
    it('TO DO - If Framework Exists shows pop up on Framework', () => {
        const wrapper = shallowMount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    framework: null
                };
            }
        });
    });
    it('TO DO - If framework exists and new name chose, new framework was created', () => {
        const wrapper = shallowMount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    framework: null
                };
            }
        });
    });
    it('TO DO - If framework Frameworked show Framework details', () => {
        const wrapper = shallowMount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    framework: null
                };
            }
        });
    });
    it('TO DO - If framework details approved shows framework preview', () => {
        const wrapper = shallowMount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                    framework: null
                };
            }
        });
    });
    it('TO DO - Framework lightview is editable', () => {
        const wrapper = shallowMount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            }
        });
    });
    it('TO DO - If framework details and preview approved, shows light view', () => {
        const wrapper = shallowMount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            }
        });
    });
    it('TO DO - If Framework lightview is non-editable', () => {
        const wrapper = shallowMount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            }
        });
    });
    it('TO DO - No drag if not checked', () => {
        const wrapper = shallowMount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            }
        });
    });
    it('TO DO - Can drag if checked', () => {
        const wrapper = shallowMount(Framework, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            }
        });
    });*/
});
