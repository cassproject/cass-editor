<template>
    <modal-template
        type="danger"
        @close="closeModal"
        size="small"
        :active="true">
        <template slot="modal-header">
            Confirm Delete {{ type }}
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
                Delete {{ type }}
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
import common from '@/mixins/common.js';
export default {
    name: 'DeleteConceptSchemeConfirm',
    components: {
        ModalTemplate
    },
    mixins: [common],
    data() {
        return {
            repo: window.repo
        };
    },
    computed: {
        obj() {
            return this.$store.getters['editor/itemToDelete'];
        },
        type() {
            if (this.$store.getters['queryParams/ceasnDataFields'] === 'true') {
                return "Concept Scheme";
            }
            return 'Taxonomy';
        }
    },
    methods: {
        deleteItem() {
            this.deleteObject(this.obj);
            this.closeModal();
            this.$store.commit('editor/setItemToDelete', {});
        },
        closeModal() {
            this.$store.commit('app/closeModal');
            this.$store.commit('editor/setItemToDelete', {});
        },
        deleteObject: function(thing) {
            appLog("deleting " + thing.id);
            var me = this;
            // delete scheme
            var framework = this.obj;
            this.repo.deleteRegistered(framework, function(success) {
                me.spitEvent("frameworkDeleted", framework.shortId(), "editFrameworkSection");
                // Delete the framework, delete all non-used stuff.
                EcConcept.search(me.repo, "skos\\:inScheme:\"" + framework.shortId() + "\"", function(concepts) {
                    for (var i = 0; i < concepts.length; i++) {
                        me.repo.deleteRegistered(concepts[i], appLog, appError);
                    }
                }, appError);
                me.$store.commit('editor/framework', null);
                me.$router.push({name: "concepts"});
            }, appLog);
        }
    }
};
</script>