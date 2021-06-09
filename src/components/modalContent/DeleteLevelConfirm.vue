<template>
    <modal-template
        type="danger"
        @close="closeModal"
        size="small"
        :active="true">
        <template slot="modal-header">
            Confirm Delete Level
        </template>
        <template slot="modal-body">
            <section>
                <b>
                    Warning! This action deletes all instances of this level.
                </b>
            </section>
            <p class="help is-danger">
                This action will remove the level from <b>{{ numFrameworks }}</b> frameworks.
            </p>
        </template>
        <template slot="modal-foot">
            <button
                @click="deleteItem()"
                class="is-danger is-outlined button">
                Delete Level
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
    name: 'DeleteLevelConfirm',
    mixins: [competencyEdits],
    components: {
        ModalTemplate
    },
    data() {
        return {
            numFrameworks: 0
        };
    },
    computed: {
        obj() {
            return this.$store.getters['editor/itemToDelete'];
        }
    },
    mounted() {
        this.getNums();
    },
    methods: {
        getNums() {
            let me = this;
            repo.search("@type:Framework AND level:\"" + this.obj.shortId() + "\"", function(level) {}, function(levels) {
                me.numFrameworks = levels.length;
            }, function() {});
        },
        deleteItem() {
            this.deleteObject(this.obj);
            this.closeModal();
            this.$store.commit('editor/setItemToDelete', {});
        },
        closeModal() {
            this.$store.commit('app/closeModal');
            this.$store.commit('editor/setItemToDelete', {});
        }
    }
};
</script>