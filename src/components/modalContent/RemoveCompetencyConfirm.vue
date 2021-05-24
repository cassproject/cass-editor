<template>
    <modal-template
        type="primary"
        @close="closeModal"
        size="small"
        :active="true">
        <template slot="modal-header">
            Confirm Remove Competency
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
            return this.$store.getters['editor/itemToRemove'];
        },
        framework() {
            return this.$store.getters['editor/framework'];
        }
    },
    mounted() {
    },
    methods: {
        removeItem() {
            this.removeObject(this.obj);
            this.closeModal();
            this.$store.commit('editor/setItemToRemove', {});
        },
        closeModal() {
            this.$store.commit('app/closeModal');
            this.$store.commit('editor/setItemToRemove', {});
        }
    }
};
</script>