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
                id="remove-competency-confirm-remove-button"
                class="is-danger is-outlined button">
                Remove Competency
            </button>
            <button
                @click="closeModal()"
                id="remove-competency-confirm-cancel-button"
                class="is-dark button">
                Cancel
            </button>
        </template>
    </modal-template>
</template>
<script>
import store from '@/stores/index.js';
import ModalTemplate from './ModalTemplate.vue';
import competencyEdits from '@/mixins/competencyEdits.js';
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
            return store.editor().itemToRemove;
        },
        framework() {
            return store.editor().framework;
        }
    },
    mounted() {
    },
    methods: {
        removeItem() {
            this.removeObject(this.obj);
            this.closeModal();
            store.editor().setItemToRemove({});
        },
        closeModal() {
            store.app().setCloseModal();
            store.editor().setItemToRemove({});
        }
    }
};
</script>