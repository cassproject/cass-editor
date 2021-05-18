<template>
    <modal-template
        type="primary"
        @close="closeModal"
        size="small"
        :active="true">
        <template slot="modal-header">
            Confirm Remove Comeptency
        </template>
        <template slot="modal-body">
            <section>
                <b>
                    Removing a competency safely removes the item from this framework.
                </b>
                The competency will still be discoverable via search and will remain in other frameworks
                it may be a part of.
            </section>
        </template>
        <template slot="modal-foot">
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
export default {
    name: 'DeleteConceptConfirm',
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
            return this.$store.getters['editor/itemToRemove'];
        }
    },
    mounted() {
    },
    methods: {
        removeItem() {
            let item = this.$store.getters['editor/itemToDelete'];
            this.removeObject(item);
            this.closeModal();
            this.$store.commit('editor/itemToDelete', {});
        },
        closeModal() {
            this.$store.commit('app/closeModal');
            this.$store.commit('editor/setItemToDelete', {});
        }
    }
};
</script>