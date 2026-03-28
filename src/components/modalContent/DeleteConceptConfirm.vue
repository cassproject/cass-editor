<template>
    <modal-template
        type="danger"
        @close="closeModal"
        size="small"
        :active="true">
        <template #modal-header>
            Confirm Delete Concept
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
                id="delete-concept-confirm-delete-button"
                class="is-danger is-outlined button">
                Delete Concept
            </button>
            <button
                @click="closeModal()"
                id="delete-concept-confirm-cancel-button"
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
    name: 'DeleteConceptConfirm',
    components: {
        ModalTemplate
    },
    mixins: [common],
    computed: {
        obj() {
            return store.editor().itemToDelete;
        },
        framework() {
            return store.editor().framework;
        }
    },
    data() {
        return {
            editsToUndo: []
        };
    },
    methods: {
        deleteItem() {
            this.deleteObject(this.obj);
            this.closeModal();
        },
        closeModal() {
            store.app().closeModal();
            store.editor().setItemToDelete({});
        },
        deleteObject: function(thing) {
            console.log("deleting " + thing.id);
            this.deleteConceptInner(thing);

            this.framework["schema:dateModified"] = new Date().toISOString();
            store.editor().setSelectedCompetency(null);
        },
        deleteConceptInner: async function(c) {
            var me = this;
            if (c["skos:broader"] != null) {
                for (var i = 0; i < c["skos:broader"].length; i++) {
                    try {
                        let concept = await EcConcept.get(c["skos:broader"][i]);
                        var initialValue = concept["skos:narrower"].slice();
                        EcArray.setRemove(concept["skos:narrower"], c.shortId());
                        concept["schema:dateModified"] = new Date().toISOString();
                        me.editsToUndo.push({operation: "update", id: concept.shortId(), fieldChanged: ["skos:narrower"], initialValue: [initialValue]});
                        if (store.editor().private === true && EcEncryptedValue.encryptOnSaveMap[concept.id] !== true) {
                            concept = await EcEncryptedValue.toEncryptedValue(concept);
                        }
                        await repo.saveTo(concept);
                        store.editor().setFramework(me.framework);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            if (c["skos:narrower"] != null) {
                for (var i = 0; i < c["skos:narrower"].length; i++) {
                    try {
                        let concept = await EcConcept.get(c["skos:narrower"][i]);
                        me.deleteConceptInner(concept);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            if (c["skos:topConceptOf"] != null) {
                try {
                    var initialValue = this.framework["skos:hasTopConcept"].slice();
                    EcArray.setRemove(this.framework["skos:hasTopConcept"], c.shortId());
                    me.editsToUndo.push({operation: "update", id: this.framework.shortId(), fieldChanged: ["skos:hasTopConcept"], initialValue: [initialValue]});
                    var framework = this.framework;
                    framework["schema:dateModified"] = new Date().toISOString();
                    if (store.editor().private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                        framework = await EcEncryptedValue.toEncryptedValue(framework);
                    }
                    await repo.saveTo(framework);
                    store.editor().setFramework(me.framework);
                } catch (e) {
                    console.error(e);
                }
            }
            this.spitEvent("conceptDeleted", c.shortId(), "editFrameworkPage");
            me.editsToUndo.push({operation: "delete", obj: c});
            repo.deleteRegistered(c, function() {
                store.editor().setFramework(me.framework);
                store.editor().addEditsToUndo(JSON.parse(JSON.stringify(me.editsToUndo)));
                me.editsToUndo.splice(0, me.editsToUndo.length);
            }, console.error);
        }
    }
};
</script>