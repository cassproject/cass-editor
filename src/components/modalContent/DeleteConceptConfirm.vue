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
export default {
    name: 'DeleteConceptConfirm',
    components: {
        ModalTemplate
    },
    mixins: [common],
    computed: {
        obj() {
            return this.$store.getters['editor/itemToDelete'];
        },
        framework() {
            return this.$store.getters['editor/framework'];
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
            this.$store.commit('app/closeModal');
            this.$store.commit('editor/setItemToDelete', {});
        },
        deleteObject: function(thing) {
            appLog("deleting " + thing.id);
            this.deleteConceptInner(thing);

            this.framework["schema:dateModified"] = new Date().toISOString();
            this.$store.commit('editor/selectedCompetency', null);
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
                        if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[concept.id] !== true) {
                            concept = await EcEncryptedValue.toEncryptedValue(concept);
                        }
                        await repo.saveTo(concept);
                        me.$store.commit('editor/framework', me.framework);
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
                    if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                        framework = await EcEncryptedValue.toEncryptedValue(framework);
                    }
                    await repo.saveTo(framework);
                    me.$store.commit('editor/framework', me.framework);
                } catch (e) {
                    appError(e);
                }
            }
            this.spitEvent("conceptDeleted", c.shortId(), "editFrameworkPage");
            me.editsToUndo.push({operation: "delete", obj: c});
            repo.deleteRegistered(c, function() {
                me.$store.commit('editor/framework', me.framework);
                me.$store.commit('editor/addEditsToUndo', JSON.parse(JSON.stringify(me.editsToUndo)));
                me.editsToUndo.splice(0, me.editsToUndo.length);
            }, appError);
        }
    }
};
</script>