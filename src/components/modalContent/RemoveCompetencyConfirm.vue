<template>
    <modal-template
        type="primary"
        @close="closeModal"
        size="small"
        :active="true">
        <template #modal-header>
            Confirm Remove Competency
        </template>
        <template #modal-body>
            <section>
                <b>
                    Removing a competency safely removes the item from this framework.
                </b>
                The competency will still be discoverable via search and will remain in other frameworks
                it may be a part of.
            </section>
        </template>
        <template #modal-foot>
            <button
                @click="removeItem()"
                class="is-danger is-outlined button">
                Remove Competency
            </button>
            <button
                @click="closeModal()"
                class="is-dark button">
                Cancel
            </button>
        </template>
    </modal-template>
</template>
<script>
import ModalTemplate from './ModalTemplate.vue';
import competencyEdits from '@/mixins/competencyEdits.js';
import { useAppStore } from '@/stores/app';
import { useEditorStore } from '@/stores/editor';
export default {
    name: 'RemoveCompetencyConfirm',
    mixins: [competencyEdits],
    components: {
        ModalTemplate
    },
    data() {
        return {
        };
    },
    computed: {
        obj() {
            return this.useEditorStore().itemToRemove;
        },
        framework() {
            return this.useEditorStore().framework;
        }
    },
    mounted() {
    },
    methods: {
        removeItem() {
            this.removeObject(this.obj);
            this.closeModal();
            useEditorStore().setItemToRemove({});
        },
        closeModal() {
            useAppStore().closeModal();
            useEditorStore().setItemToRemove({});
        }
    }
};
</script>