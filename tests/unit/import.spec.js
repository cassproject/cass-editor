/* eslint-disable */

import {shallowMount, mount, createLocalVue} from '@vue/test-utils';
import Import from '@/views/framework/Import.vue';
import DragAndDrop from '@/components/DragAndDrop.vue';
import VueCommon from '@/mixins/common.js';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.mixin(VueCommon);

describe('Import.vue', () => {
    let store;
    let mutations;
    let state;

    beforeEach(() => {
        state = {
            framework: null,
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

    it('Renders Import page when Import.vue is mounted ', () => {
        const wrapper = shallowMount(Import, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                };
            }
        });
        appLog("state is: ", mutations.editor);
        let importPage = wrapper.find('#import-page');
        expect(importPage.exists()).toBe(true);
    });
    it('Drag and drop component exists when mounted Import.vue is mounted', () => {
        const wrapper = mount(Import, {
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
    it('Import.vue contains correct files after drag and drop event', () => {
        const wrapper = shallowMount(Import, {
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
    it('TO DO - If Framework Exists shows pop up on import', () => {
        const wrapper = shallowMount(Import, {
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
        const wrapper = shallowMount(Import, {
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
    it('TO DO - If framework imported show import details', () => {
        const wrapper = shallowMount(Import, {
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
        const wrapper = shallowMount(Import, {
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
        const wrapper = shallowMount(Import, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            }
        });
    });
    it('TO DO - If framework details and preview approved, shows light view', () => {
        const wrapper = shallowMount(Import, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            }
        });
    });
    it('TO DO - If Framework lightview is non-editable', () => {
        const wrapper = shallowMount(Import, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            }
        });
    });
    it('TO DO - No drag if not checked', () => {
        const wrapper = shallowMount(Import, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            }
        });
    });
    it('TO DO - Can drag if checked', () => {
        const wrapper = shallowMount(Import, {
            store,
            localVue,
            propsData: {
                queryParams: {}
            }
        });
    });
});
