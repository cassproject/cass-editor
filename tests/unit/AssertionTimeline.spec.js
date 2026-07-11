import {shallowMount} from '@vue/test-utils';
import {createTestingPinia} from '@pinia/testing';
import AssertionTimeline from '@/lode/components/AssertionTimeline.vue';

// Mounts the component with a testing Pinia whose editor store is seeded
// with the given state overrides.
function mountWithEditorState(editorState) {
    return shallowMount(AssertionTimeline, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                        editor: editorState
                    }
                })
            ]
        }
    });
}

describe('assertion-timeline', () => {
    it('Renders Assertion Timeline loading page while assertions are being searched', () => {
        const wrapper = mountWithEditorState({assertions: [], searchingAssertions: true});
        expect(wrapper.find('#loadingAssertionTimeline').exists()).toBe(true);
        expect(wrapper.find('.timeline').exists()).toBe(false);
    });

    it('Renders Assertion Timeline page when AssertionTimeline.vue is mounted with assertions', () => {
        const wrapper = mountWithEditorState({assertions: [], searchingAssertions: false});
        expect(wrapper.find('.timeline').exists()).toBe(true);
    });

    it('Renders no assertions message when assertions array is empty', () => {
        const wrapper = mountWithEditorState({assertions: [], searchingAssertions: false});
        expect(wrapper.find('#noAssertionsMessage').exists()).toBe(true);
    });

    it('Does not render no assertions message when there are assertions', () => {
        const wrapper = mountWithEditorState({
            assertions: [{
                id: 'http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393851023',
                assertionDateDecrypted: 1638393851023
            }],
            searchingAssertions: false
        });
        expect(wrapper.find('#noAssertionsMessage').exists()).toBe(false);
    });
});
