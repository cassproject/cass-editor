<template>
    <modal-template
        type="info"
        @close="closeModal"
        size="small"
        :active="true">
        <template slot="modal-header">
            Confirm Remove Property
        </template>
        <template slot="modal-body">
            <section>
                Are you sure you'd like to remove this property?
            </section>
        </template>
        <template slot="modal-foot">
            <button
                @click="removeItem()"
                class="is-danger is-outlined button">
                Confirm Remove Property
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
    name: 'RemovePropertyConfirm',
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
        // TO DO
        // UPDATE to remove, current method is in Thing.vue line 912 ish
        removeItem() {
            // let item = this.$store.getters['editor/itemToRemove'];
            // this.removeObject(item);
            // this.closeModal();
            this.$store.commit('editor/setItemToRemove', {});
        },
        closeModal() {
            this.$store.commit('app/closeModal');
            this.$store.commit('editor/setItemToRemove', {});
        }
    }
};
</script>