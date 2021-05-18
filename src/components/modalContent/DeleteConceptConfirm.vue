<template>
    <modal-template
        type="danger"
        @close="closeModal"
        size="small"
        :active="true">
        <template slot="modal-header">
            Confirm Delete Concept
        </template>
        <template slot="modal-body">
            <section>
                <b>
                    Warning! This action is permanent.
                </b>
            </section>
        </template>
        <template slot="modal-foot">
            <button
                @click="deleteItem()"
                class="is-danger is-outlined button">
                Delete Competency
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
            numFrameworks: 0,
            numRelationships: 0
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
            repo.search("@type:Framework AND competency:\"" + this.obj.shortId() + "\"", function(f) {}, function(fs) {
                me.numFrameworks = fs.length;
                repo.search("@type:Relation AND (source:\"" + me.obj.shortId() + "\" OR target:\"" + me.obj.shortId() + "\")", function(r) {}, function(rs) {
                    me.numRelationships = rs.length;
                }, function() {});
            }, function() {});
        },
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