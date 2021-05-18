<template>
    <modal-template
        type="danger"
        @close="closeModal"
        size="small"
        :active="true">
        <template slot="modal-header">
            Confirm Delete Framework
        </template>
        <template slot="modal-body">
            <section>
                <b>
                    Warning! This action is not reversable.
                </b>
            </section>
            <p class="help is-danger">
                This action will delete {{ obj.name }} and all of its contents.
            </p>
        </template>
        <template slot="modal-foot">
            <button
                @click="deleteItem()"
                class="is-danger is-outlined button">
                Delete Framework
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
    name: 'DeleteFrameworkConfirm',
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
            return this.$store.getters['editor/itemToDelete'];
        }
    },
    mounted() {
    },
    methods: {
        deleteItem() {
            let item = this.$store.getters['editor/itemToDelete'];
            this.deleteObject(item);
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