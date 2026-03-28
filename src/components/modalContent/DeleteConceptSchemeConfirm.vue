<template>
    <modal-template
        type="danger"
        @close="closeModal"
        size="small"
        :active="true">
        <template #modal-header>
            Confirm Delete {{ type }}
        </template>
        <template #modal-body>
            <section>
                <b>
                    Warning! This action is permanent.
                </b>
            </section>
        </template>
        <template #modal-foot>
            <button
                @click="deleteItem()"
                id="delete-concept-scheme-confirm-delete-button"
                class="is-danger is-outlined button">
                Delete {{ type }}
            </button>
            <button
                @click="closeModal()"
                id="delete-concept-scheme-confirm-cancel-button"
                class="is-dark button">
                Cancel
            </button>
        </template>
    </modal-template>
</template>
<script>
import store from '@/stores/index.js';
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
            return store.editor().itemToDelete;
        },
        type() {
            if (store.queryParams().ceasnDataFields === 'true') {
                return "Concept Scheme";
            }
            return 'Taxonomy';
        }
    },
    methods: {
        deleteItem() {
            this.deleteObject(this.obj);
            this.closeModal();
            store.editor().setItemToDelete({});
        },
        closeModal() {
            store.app().closeModal();
            store.editor().setItemToDelete({});
        },
        deleteObject: function(thing) {
            console.log("deleting " + thing.id);
            var me = this;
            // delete scheme
            var framework = this.obj;
            this.repo.deleteRegistered(framework, function(success) {
                me.spitEvent("frameworkDeleted", framework.shortId(), "editFrameworkSection");
                // Delete the framework, delete all non-used stuff.
                EcConcept.search(me.repo, "(skos\\:inScheme:\"" + framework.shortId() + "\") OR (ceasn\\:inProgressionModel:\"" + framework.shortId() + "\")", function(concepts) {
                    for (var i = 0; i < concepts.length; i++) {
                        me.repo.deleteRegistered(concepts[i], console.log, console.error);
                    }
                }, console.error);
                store.editor().setFramework(null);
                me.$router.push({name: "concepts"});
            }, console.log);
        }
    }
};
</script>