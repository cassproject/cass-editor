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
                class="is-danger is-outlined button">
                Delete Concept
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
import { useAppStore } from '@/stores/app';
import { useEditorStore } from '@/stores/editor';
export default {
    name: 'DeleteConceptConfirm',
    components: {
        ModalTemplate
    },
    mixins: [common],
    computed: {
        obj() {
            return this.useEditorStore().itemToDelete;
        },
        framework() {
            return this.useEditorStore().framework;
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
            useAppStore().closeModal();
            useEditorStore().setItemToDelete({});
        },
        deleteObject: function(thing) {
            appLog("deleting " + thing.id);
            this.deleteConceptInner(thing);

            this.framework["schema:dateModified"] = new Date().toISOString();
            useEditorStore().setSelectedCompetency(null);
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
                        if (useEditorStore().private === true && EcEncryptedValue.encryptOnSaveMap[concept.id] !== true) {
                            concept = await EcEncryptedValue.toEncryptedValue(concept);
                        }
                        await repo.saveTo(concept);
                        useEditorStore().setFramework(me.framework);
                    } catch (e) {
                        appError(e);
                    }
                }
            }
            if (c["skos:narrower"] != null) {
                for (var i = 0; i < c["skos:narrower"].length; i++) {
                    try {
                        let concept = await EcConcept.get(c["skos:narrower"][i]);
                        me.deleteConceptInner(concept);
                    } catch (e) {
                        appError(e);
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
                    if (useEditorStore().private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                        framework = await EcEncryptedValue.toEncryptedValue(framework);
                    }
                    await repo.saveTo(framework);
                    useEditorStore().setFramework(me.framework);
                } catch (e) {
                    appError(e);
                }
            }
            this.spitEvent("conceptDeleted", c.shortId(), "editFrameworkPage");
            me.editsToUndo.push({operation: "delete", obj: c});
            repo.deleteRegistered(c, function() {
                useEditorStore().setFramework(me.framework);
                useEditorStore().addEditsToUndo(JSON.parse(JSON.stringify(me.editsToUndo)));
                me.editsToUndo.splice(0, me.editsToUndo.length);
            }, appError);
        }
    }
};
</script>