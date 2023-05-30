<template>
    <div
        class="lode__hierarchy"
        :class="{'is-dragging': dragging}">
        <div
            class="hierarchy-buttons columns is-gapless is-paddingless is-mobile is-marginless is-paddingless">
            <!-- CONTROLS FOR SELECT: ENABLED MULTI EDIT  -->
            <div
                v-if="(canEdit && view !== 'import') || queryParams.select"
                id="check-radio-all-column"
                class="column is-narrow">
                <div
                    class="field">
                    <input
                        class="is-checkradio"
                        id="selectAllCheckbox"
                        type="checkbox"
                        name="selectAllCheckbox"
                        v-model="selectAll">
                    <label for="selectAllCheckbox" />
                </div>
            </div>
            <!-- CONTROLS FOR EXPAND  -->
            <div class="column is-narrow">
                <div
                    v-if="expanded"
                    class="icon is-vcentered"
                    @click="expanded=false">
                    <i class="fa fa-caret-down has-text-primary is-size-2" />
                </div>
                <div
                    v-else-if="!expanded"
                    class="icon is-vcentered"
                    @click="expanded=true">
                    <i class="fa fa-caret-right has-text-primary is-size-2" />
                </div>
                <div
                    v-else
                    class="icon is-vcentered">
                    <i class="fa fa-circle is-size-6 has-text-light" />
                </div>
                <div
                    v-if="selectButtonText"
                    @click="$emit('select-button-click', selectedArray)"
                    class="button is-outlined is-primary">
                    {{ selectButtonText }}
                </div>
            </div>
            <!-- MULTI EDIT BUTTONS -->
            <div class="column is-narrow">
                <div
                    class="buttons">
                    <div
                        v-if="multipleSelected && !addingNode && view !== 'import' && canEdit"
                        @click="$emit('edit-multiple-event')"
                        class="button is-outlined is-primary">
                        <span class="icon">
                            <i class="fa fa-cog" />
                        </span>
                        <span>
                            Edit multiple
                        </span>
                    </div>
                    <!-- if multiple are selected allow for edit multiple -->
                    <div
                        @click="addingNode = true;"
                        v-if="!addingNode && canEdit && !multipleSelected"
                        class="button is-outlined is-primary">
                        <span class="icon">
                            <i class="fa fa-plus-circle" />
                        </span>
                        <span>
                            {{ addProgressionModelOrLevelText }}
                        </span>
                    </div>
                    <!-- delete item -->
                    <div
                        v-if="!addingNode && canEdit && !multipleSelected && canCopyOrCut"
                        @click="deleteSelected"
                        class="button is-outlined is-danger">
                        <span class="icon">
                            <i class="fa fa-plus-circle" />
                        </span>
                        <span>
                            delete item
                        </span>
                    </div>
                    <div
                        v-if="addingNode"
                        @click="addingNode = false;"
                        class="button is-outlined is-dark ">
                        <span class="icon">
                            <i class="fa fa-times" />
                        </span>
                        <span>cancel</span>
                    </div>
                    <div
                        v-if="addingNode"
                        @click="onClickCreateNew"
                        :class="{'is-loading': loading}"
                        class="button is-outlined is-primary ">
                        <span class="icon">
                            <i class="fa fa-plus" />
                        </span>
                        <span>
                            create new
                        </span>
                    </div>
                    <div
                        v-if="view === 'framework' || view === 'concept'"
                        title="Cut progression level"
                        :disabled="!canCopyOrCut"
                        class="button is-outlined"
                        :class="canCopyOrCut ? 'is-primary' : 'is-disabled'"
                        @click="cutClick">
                        <span class="icon">
                            <i class="fas handle fa-cut" />
                        </span>
                    </div>
                    <div
                        v-if="view === 'framework' || view === 'concept'"
                        :disabled="!canPaste"
                        class="button is-outlined "
                        @click="pasteClick"
                        :class="canPaste ? 'is-primary' : 'is-disabled'"
                        title="Paste progression level">
                        <span class="icon">
                            <i class="fa fa-paste" />
                        </span>
                    </div>
                    <div
                        v-if="view === 'concept'"
                        @click="computeHierarchy(true)"
                        class="button is-outlined is-primary "
                        title="Reorder by Precedence">
                        <span>
                            reorder by precedence
                        </span>
                    </div>
                    <div
                        v-if="view === 'concept'"
                        @click="setPrecedence"
                        class="button is-outlined is-primary "
                        title="Set Precedence">
                        <span>
                            set precedence by order
                        </span>
                    </div>
                </div>
            </div>
            <!-- IMPORT WORKFLOW BUTTONS -->
            <div
                class="column"
                v-if="view === 'import'">
                <div class="buttons is-right">
                    <!-- import details options -->
                    <div
                        class="buttons is-right">
                        <!-- cancel button -->
                        <div
                            @click="cancelImport"
                            class=" button is-light is-pulled-right is-dark is-outlined">
                            <span>
                                Cancel
                            </span>
                            <span class="icon">
                                <i class="fa fa-times-circle" />
                            </span>
                        </div>
                        <!--  start over -->
                        <div
                            @click="$store.dispatch('app/clearImport')"
                            class="button is-dark is-outlined is-pulled-right">
                            <span>
                                import again
                            </span>
                            <span class="icon">
                                <i class="fa fa-redo-alt" />
                            </span>
                        </div>
                        <!-- open in editor -->
                        <div
                            @click="openFramework"
                            class="button is-dark is-outlined is-pulled-right">
                            <span>view in editor</span>
                            <span class="icon">
                                <i class="fa fa-edit" />
                            </span>
                        </div>
                        <!--  home -->
                        <router-link
                            class="button is-primary is-outlined is -pulled-right"
                            :to="{path: '/progressionLevels', query: queryParams}">
                            <span>
                                Done
                            </span>
                            <span class="icon">
                                <i class="fa fa-home" />
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <template
            v-if="hierarchy">
            <draggable
                v-bind="dragOptions"
                v-model="hierarchy"
                tag="ul"
                class="lode__hierarchy-ul"
                :disabled="canEdit !== true || !isDraggable"
                :group="{ name: 'test' }"
                @start="beginDrag"
                handle=".handle"
                @end="endDrag">
                <HierarchyNode
                    :depth="1"
                    :view="view"
                    @create-new-node-event="onCreateNewNode"
                    :subview="subview"
                    @mounting-node="handleMountingNode"
                    v-for="(item, index) in hierarchy"
                    :key="item.obj.id"
                    :obj="item.obj"
                    class="lode__hierarchy-li"
                    :dragging="dragging"
                    :canEdit="canEdit"
                    :hasChild="item.children"
                    :profile="profile"
                    :highlightList="highlightList"
                    :selectAll="selectAll"
                    :newFramework="newFramework"
                    :index="index"
                    :frameworkEditable="canEdit"
                    :selectedArray="selectedArray"
                    @add="add"
                    @begin-drag="beginDrag"
                    @move="move"
                    @select="select"
                    :parentStructure="hierarchy"
                    :parent="container"
                    @draggable-check="onDraggableCheck"
                    :properties="properties"
                    :expandAll="expanded==true"
                    :propagateParentChecked="parent"
                    :shiftKey="shiftKey"
                    :arrowKey="arrowKey" />
            </draggable>
        </template>
    </div>
</template>
<script>

import common from '@/mixins/common.js';
import competencyEdits from '@/mixins/competencyEdits.js';
var hierarchyTimeout;
export default {
    name: 'ProgressionHierarchy',
    props: {
        container: Object,
        containerType: String,
        repo: Object,
        profile: Object,
        highlightList: Array,
        selectMode: Boolean,
        selectAll: Boolean,
        containerTypeGet: String,
        viewOnly: Boolean,
        newFramework: Boolean,
        properties: String,
        view: {
            type: String,
            default: 'framework'
        },
        subview: {
            type: String,
            default: ''
        },
        doneDragging: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            structure: [],
            once: true,
            dragging: false,
            controlOnStart: false,
            filter: 'showAll',
            dragIcon: 'fa-arrows-alt',
            dragOptions: {
                delay: 100,
                disabled: false,
                ghostClass: 'ghost-drag',
                chosenClass: 'chosen-drag',
                dragClass: 'drag',
                scrollSensitivity: 200,
                forceFallback: true
            },
            multipleSelected: false,
            addingNode: false,
            selectedArray: [],
            selectButtonText: null,
            expanded: true,
            isDraggable: true,
            shiftKey: false,
            arrowKey: null,
            addProgressionModelOrLevelText: "Add Level",
            loading: false
        };
    },
    components: {
        HierarchyNode: () => import('@/lode/components/HierarchyNode.vue'),
        draggable: () => import('vuedraggable')
    },
    mixins: [common, competencyEdits],
    computed: {
        canCopyOrCut: function() {
            if (this.selectedArray && this.selectedArray.length === 1) {
                return true;
            } else {
                return false;
            }
        },
        canPaste: function() {
            if ((this.$store.getters['editor/copyId'] !== null || this.$store.getters['editor/cutId'] !== null) && this.$store.getters['editor/nodeInFocus'] !== null) {
                return true;
            } else {
                return false;
            }
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        addAnother: function() {
            return this.$store.getters['editor/addAnother'];
        },
        hierarchy: function() {
            var me = this;
            if (this.container == null) return null;
            if (!this.once) return this.structure;
            appLog("Computing hierarchy.");
            var precache = [];
            if (this.container["skos:hasTopConcept"] != null) { precache = precache.concat(this.container["skos:hasTopConcept"]); }
            if (precache.length > 0) {
                this.repo.multiget(precache, function(success) {
                    me.computeHierarchy(false);
                }, appError);
            } else {
                me.computeHierarchy(false);
            }
            return this.structure;
        },
        // True if the current client can edit this object.
        canEdit: function() {
            if (this.viewOnly === true) {
                return false;
            }
            return this.canEditAny(this.container);
        },
        recomputeHierarchy: function() {
            return this.$store.getters['editor/recomputeHierarchy'];
        },
        framework() {
            return this.$store.getters['editor/framework'];
        }
    },
    watch: {
        container: {
            handler() {
                this.once = true;
            },
            deep: true
        },
        selectedArray: function() {
            if (this.selectedArray.length > 1) {
                this.multipleSelected = true;
            } else {
                this.multipleSelected = false;
            }
            if (this.selectedArray.length === 1) {
                this.addProgressionModelOrLevelText = "Add Level";
            } else {
                this.addProgressionMaddProgressionModelOrLevelTextodelOrChildText = "Add Progression Model";
            }
            this.$emit('selected-array', this.selectedArray);
        },
        recomputeHierarchy: function() {
            if (this.recomputeHierarchy) {
                this.once = true;
                this.$store.commit('editor/recomputeHierarchy', false);
            }
        },
        doneDragging: function() {
            if (this.doneDragging) {
                this.dragging = false;
            }
        },
        addAnother: function(val) {
            if (val) {
                this.onClickCreateNew();
                this.$store.commit('editor/addAnother', false);
            }
        }
    },
    mounted: function() {
        if (this.queryParams) {
            if (this.queryParams.singleSelect) {
                this.selectButtonText = this.queryParams.singleSelect;
            }
            if (this.queryParams.select) {
                if (this.queryParams.select !== "" && this.queryParams.select !== "select") {
                    this.selectButtonText = this.queryParams.select;
                }
            }
        }
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    },
    beforeDestroy: function() {
        window.removeEventListener('keyup', this.keyup);
        window.removeEventListener('keydown', this.keydown);
    },
    methods: {
        cutClick: function() {
            if (this.selectedArray && this.selectedArray.length === 1) {
                this.$store.commit('editor/cutId', this.selectedArray[0]);
            }
            this.$store.commit('editor/copyId', null);
            this.$store.commit('editor/paste', false);
        },
        copyClick: function() {
            if (this.selectedArray && this.selectedArray.length === 1) {
                this.$store.commit('editor/copyId', this.selectedArray[0]);
            }
            this.$store.commit('editor/cutId', null);
            this.$store.commit('editor/paste', false);
        },
        pasteClick: function() {
            this.$store.commit('editor/paste', true);
        },
        keydown(e) {
            if (this.canEdit) {
                if (e.shiftKey) {
                    this.shiftKey = true;
                }
                if (e.key.indexOf("Arrow") !== -1 && e.shiftKey) {
                    this.arrowKey = e.key;
                }
                if (e.key === "x" && e.ctrlKey) {
                    if (this.selectedArray && this.selectedArray.length === 1) {
                        this.$store.commit('editor/cutId', this.selectedArray[0]);
                    }
                    this.$store.commit('editor/copyId', null);
                    this.$store.commit('editor/paste', false);
                }
                if (e.key === "c" && e.ctrlKey) {
                    if (this.selectedArray && this.selectedArray.length === 1) {
                        this.$store.commit('editor/copyId', this.selectedArray[0]);
                    }
                    this.$store.commit('editor/cutId', null);
                    this.$store.commit('editor/paste', false);
                }
                if (e.key === "v" && e.ctrlKey) {
                    this.$store.commit('editor/paste', true);
                }
            }
        },
        keyup(e) {
            if (!e.shiftKey) {
                this.shiftKey = false;
            }
            if (e.key.indexOf("Arrow") !== -1) {
                this.arrowKey = null;
            }
        },
        onCreateNewNode: function(parentId, previousSiblingId) {
            this.add(parentId, previousSiblingId);
        },
        /*
         * when a child node is mounted it emits an event
         * and a timeout is started
         */
        handleMountingNode: function() {
            this.startTime();
        },
        /*
         * each mount resets the timeout
         * if the timeout length is met (no new nodes)
         * the done loading event is triggered
         */
        startTime: function() {
            hierarchyTimeout = setTimeout(() => {
                this.$emit('done-loading-nodes');
            }, 1000);
        },
        removePrecedence: async function() {
            return new Promise(async(resolve) => {
                let structure = [];
                if (this.container == null) { return r; }
                if (this.container["skos:hasTopConcept"] !== null && this.container["skos:hasTopConcept"] !== undefined) {
                    if (this.container["ceterms:precedes"] || this.container["ceterms:precededBy"]) {
                        if (this.container["ceterms:precedes"]) delete this.container["ceterms:precedes"];
                        if (this.container["ceterms:precededBy"]) delete this.container["ceterms:precededBy"];
                        await this.saveObject(this.container);
                    }
                    for (var i = 0; i < this.container["skos:hasTopConcept"].length; i++) {
                        var c = await EcConcept.get(this.container["skos:hasTopConcept"][i]);
                        if (c) {
                            if (c["ceterms:precedes"] || c["ceterms:precededBy"]) {
                                if (c["ceterms:precedes"]) delete c["ceterms:precedes"];
                                if (c["ceterms:precededBy"]) delete c["ceterms:precededBy"];
                                await this.saveObject(c);
                            }
                            structure.push({"obj": c, "children": []});
                            if (c["skos:narrower"]) {
                                await this.addChildren(structure, c, i, true);
                            }
                        }
                    }
                }

                this.structure = structure;
                resolve();
            });
        },
        setPrecedence: async function() {
            await this.removePrecedence();

            let structure = this.structure;
            await this.setPrecedes(structure);
            await this.setPrecededBy(structure);

            this.structure = structure;
        },
        computeHierarchy: async function(setOrder) {
            let structure = [];
            if (this.container == null) { return r; }
            if (this.container["skos:hasTopConcept"] !== null && this.container["skos:hasTopConcept"] !== undefined) {
                for (var i = 0; i < this.container["skos:hasTopConcept"].length; i++) {
                    var c = await EcConcept.get(this.container["skos:hasTopConcept"][i]);
                    if (c) {
                        structure.push({"obj": c, "children": []});
                        if (c["skos:narrower"]) {
                            await this.addChildren(structure, c, i, false);
                        }
                    }
                }
            }

            if (setOrder) {
                await this.reorder(structure, "ceterms:precedes");
                await this.reorder(structure, "ceterms:precededBy");
            }

            this.structure = structure;
            this.once = false;
        },
        printPrettyStructure(structure) {
            let output = "[";
            for (let i = 0; i < structure.length; i++) {
                if (structure[i].obj) {
                    output += structure[i].obj["skos:prefLabel"]["@value"] + ((i === structure.length - 1) && !(structure[i].children && structure[i].children.length > 0) ? "" : ", ");
                }
                if (structure[i].children.length > 0) {
                    for (let j = 0; j < structure[i].children.length; j++) {
                        if (structure[i].children[j]) {
                            let children = structure[i].children;
                            output += (j === 0 ? "(" : "") + children[j].obj["skos:prefLabel"]["@value"] + (j === structure[i].children.length - 1 ? ")" : ", ");
                            output += (j === structure[i].children.length - 1 ? (i === structure.length - 1 ? "]" : ", ") : "");
                            if (children[j].children.length > 0) {
                                for (let k = 0; k < children[j].children.length; k++) {
                                    if (children[j].children[k]) {
                                        output += (k === 0 ? "(" : "") + children[j].children[k].obj["skos:prefLabel"]["@value"] + (k === children[j].children.length - 1 ? ")" : ", ");
                                        output += (k === children[j].children.length - 1 ? (j === children.length - 1 ? "]" : ", ") : "");
                                    }
                                }
                            }
                        }
                    }
                } else {
                    output += (i === structure.length - 1 ? "]" : "");
                }
            }
            return output;
        },
        addChildren: async function(structure, c, i, deletePrecedence) {
            return new Promise(async(resolve) => {
                for (var j = 0; j < c["skos:narrower"].length; j++) {
                    var subC = await EcConcept.get(c["skos:narrower"][j]);
                    if (deletePrecedence &&
                        (subC["ceterms:precedes"] || subC["ceterms:precededBy"])) {
                        if (subC["ceterms:precedes"]) delete subC["ceterms:precedes"];
                        if (subC["ceterms:precededBy"]) delete subC["ceterms:precededBy"];
                        await this.saveObject(subC);
                    }
                    structure[i].children.push({"obj": subC, "children": []});
                    if (subC && subC["skos:narrower"]) {
                        await this.addChildren(structure[i].children, subC, j, deletePrecedence);
                    }
                }
                resolve();
            });
        },
        reorder: async function(unorderedStructure, property) {
            return new Promise(async(resolve) => {
                let changesMade = true;
                let numChangesMade = 0; // Prevents endless loop when model properties are inconsistent
                if (unorderedStructure == null) {
                    return;
                }
                if (unorderedStructure !== null && unorderedStructure.length) {
                    while (changesMade && (numChangesMade < 100)) {
                        changesMade = false;
                        let i;
                        if (property === "ceterms:precedes") {
                            i = 0;
                        } else {
                            i = unorderedStructure.length - 1;
                        }
                        let next = unorderedStructure[i];
                        while (next) {
                            var c = unorderedStructure[i].obj;
                            if (c) {
                                if (unorderedStructure[i].children) {
                                    if (await this.reorderChildren(unorderedStructure, unorderedStructure[i].children, property)) {
                                        numChangesMade++;
                                        changesMade = true;
                                    }
                                }
                                if (c[property]) {
                                    var c2 = await EcConcept.get(c[property]);
                                    if (await this.setProrgressionOrder(unorderedStructure, c, c2, property)) {
                                        numChangesMade++;
                                        changesMade = true;
                                    }
                                }
                                if (property === "ceterms:precedes") {
                                    if (i < unorderedStructure.length - 1) {
                                        i++;
                                        next = unorderedStructure[i];
                                    } else {
                                        next = undefined;
                                    }
                                } else {
                                    if (i > 0) {
                                        i--;
                                        next = unorderedStructure[i];
                                    } else {
                                        next = undefined;
                                    }
                                }
                            }
                        }
                    }
                }
                resolve();
            });
        },
        reorderChildren: async function(unorderedStructure, children, property) {
            return new Promise(async(resolve) => {
                let changesMade = false;
                let childChangesMade = true;
                let numChildChangesMade = 0; // Prevents endless loop when model properties are inconsistent
                while (childChangesMade && (numChildChangesMade < 100)) {
                    childChangesMade = false;
                    let j;
                    if (property === "ceterms:precedes") {
                        j = 0;
                    } else {
                        j = children.length - 1;
                    }
                    let next = children[j];
                    while (next) {
                        let subC1 = children[j].obj;
                        if (subC1) {
                            if (subC1["skos:narrower"]) {
                                if (await this.reorderChildren(unorderedStructure, children[j].children, property)) {
                                    changesMade = true;
                                    numChildChangesMade++;
                                    childChangesMade = true;
                                }
                            }
                            if (subC1[property]) {
                                let subC2 = await EcConcept.get(subC1[property]);
                                if (await this.setProrgressionOrder(unorderedStructure, subC1, subC2, property)) {
                                    changesMade = true;
                                    numChildChangesMade++;
                                    childChangesMade = true;
                                }
                            }
                        }

                        if (property === "ceterms:precedes") {
                            if (j < children.length - 1) {
                                j++;
                                next = children[j];
                            } else {
                                next = undefined;
                            }
                        } else {
                            if (j > 0) {
                                j--;
                                next = children[j];
                            } else {
                                next = undefined;
                            }
                        }
                    }
                }
                resolve(changesMade);
            });
        },
        setProrgressionOrder: async function(structure, node1, node2, property) {
            // If the nodes are not at the same level in the hierarchy, then find the ancestor that IS
            //  at the same level. Once the two sibling nodes are found, switch positions in the array.
            let sibling = await this.findSiblingOfNode(node1, node2);
            if (sibling !== null) {
                // Set the order of the progression levels
                let parentStructure = await this.findSubStructure(structure, node1);
                if (!parentStructure) {
                    // This condition should never be reached.
                    appLog('Error: No parent structure found');
                    return false;
                }
                let node1Index = await parentStructure.findIndex(item => EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node1.id));
                let node2Index = await parentStructure.findIndex(item => EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id));
                node2 = ({"obj": parentStructure[node2Index].obj, "children": parentStructure[node2Index].children});
                if (property === "ceterms:precedes") {
                    if (node1Index + 1 === node2Index) {
                        // Nodes are already in order
                        return false;
                    }
                    parentStructure.splice(node2Index, 1);
                    node1Index = await parentStructure.findIndex(item => EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node1.id));
                    parentStructure.splice(node1Index + 1, 0, node2);
                } else {
                    if (node2Index + 1 === node1Index) {
                        // Nodes are already in order
                        return false;
                    }
                    parentStructure.splice(node2Index, 1);
                    node1Index = await parentStructure.findIndex(item => EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node1.id));
                    parentStructure.splice(node1Index, 0, node2);
                }
                return true;
            } else {
                sibling = await this.findSiblingOfNode(node2, node1);
                if (sibling !== null) {
                    // Set the order of the progression levels
                    let parentStructure = await this.findSubStructure(structure, node2);
                    if (!parentStructure) {
                        // This condition should never be reached.
                        appLog('Error: No parent structure found');
                        return false;
                    }
                    let node1Index = await parentStructure.findIndex(item => EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id));
                    let node2Index = await parentStructure.findIndex(item => EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(node2.id));
                    if ((node1Index < 0) || (node1Index >= parentStructure.length) ||
                        (node2Index < 0) || (node2Index >= parentStructure.length)) {
                        appLog('Node index not found');
                        return false;
                    }
                    node2 = ({"obj": parentStructure[node2Index].obj, "children": parentStructure[node2Index].children});
                    if (property === "ceterms:precedes") {
                        if (node1Index + 1 === node2Index) {
                            // Nodes are already in order
                            return false;
                        }
                        parentStructure.splice(node2Index, 1);
                        node1Index = await parentStructure.findIndex(item => EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id));
                        parentStructure.splice(node1Index + 1, 0, node2);
                    } else {
                        if (node2Index + 1 === node1Index) {
                            // Nodes are already in order
                            return false;
                        }
                        parentStructure.splice(node2Index, 1);
                        node1Index = await parentStructure.findIndex(item => EcRemoteLinkedData.trimVersionFromUrl(item.obj ? item.obj.id : item.id) === EcRemoteLinkedData.trimVersionFromUrl(sibling.id));
                        parentStructure.splice(node1Index, 0, node2);
                    }
                    return true;
                } else {
                    // If no sibling is found, then the common ancestor is higher up in the hierarchy.
                    //  Search again with the node parent.
                    if (node1["skos:broader"]) {
                        let nodeParent = await EcConcept.get(EcRemoteLinkedData.trimVersionFromUrl(node1["skos:broader"]).toString());
                        return (this.setProrgressionOrder(structure, nodeParent, node2, property));
                    } else {
                        // This condition should never be reached.
                        appLog('Error: No common ancestry found');
                        return false;
                    }
                }
            }
        },
        findSiblingOfNode: async function(node, nibling) {
            return new Promise(async(resolve) => {
                let nodeParent = null;
                let niblingParent = null;

                if (node["skos:broader"]) {
                    nodeParent = EcRemoteLinkedData.trimVersionFromUrl(node["skos:broader"]);
                }
                if (nibling["skos:broader"]) {
                    niblingParent = EcRemoteLinkedData.trimVersionFromUrl(nibling["skos:broader"]);
                }
                if (niblingParent && nodeParent && (niblingParent.toString() === nodeParent.toString())) {
                    // Nibling is a sibling of node
                    resolve(nibling);
                } else if (!node["skos:broader"] && !nibling["skos:broader"]) {
                    // Nibling and node are at the top of the hierarchy amd are therefore siblings
                    resolve(nibling);
                } else if (!nibling["skos:broader"]) {
                    // Nibling is at the top of the hierarchy and is therefore higher up than node
                    resolve(null);
                } else {
                    // Find the ancestor of nibling that is the sibling of node
                    let niblingAncestor = await EcConcept.get(niblingParent.toString());
                    resolve(await this.findSiblingOfNode(node, niblingAncestor));
                }
            });
        },
        findSubStructure: async function(structure, node) {
            return new Promise(async(resolve) => {
                if (!node["skos:broader"]) {
                    // Parent node is at the top of the container
                    resolve(structure);
                    return;
                }
                let parentId = null;
                if (node["skos:broader"].length && node["skos:broader"].length > 0) {
                    parentId = node["skos:broader"][0];
                } else {
                    parentId = node["skos:broader"];
                }

                for (var i = 0; i < structure.length; i++) {
                    if (structure[i].children) {
                        if (EcRemoteLinkedData.trimVersionFromUrl(structure[i].obj.id) === parentId) {
                            resolve(structure[i].children);
                            return;
                        } else {
                            // If this level is not the parent, of the target node, then go deeper...
                            let subStructure = await this.findSubStructure(structure[i].children, node);
                            if (subStructure) {
                                resolve(subStructure);
                                return;
                            }
                        }
                    }
                }
                resolve(null);
            });
        },
        // WARNING: The Daemon of OBO lingers in these here drag and move methods. The library moves the objects, and OBO will then come get you!
        beginDrag: function(event) {
            this.dragging = true;
            if (event !== undefined) {
                this.controlOnStart = event.originalEvent.ctrlKey || event.originalEvent.shiftKey;
            }
        },
        endDrag: function(foo) {
            if (foo.to.id === 'framework_drag') {
                this.dragging = false;
                return;
            }
            appLog(foo.oldIndex, foo.newIndex);
            var toId = null;
            var toLast = false;
            if (this.shiftKey) {
                this.controlOnStart = true;
            }
            if (foo.from.id === foo.to.id) {
                if (foo.newIndex + 1 < this.hierarchy.length) {
                    toId = this.hierarchy[foo.newIndex + 1].obj.shortId();
                } else if (foo.newIndex === this.hierarchy.length - 1) {
                    toLast = true;
                }
            } else {
                if (foo.to.children[foo.newIndex] === undefined) {
                    toId = foo.to.id;
                } else {
                    if (foo.newIndex + 1 < foo.to.children.length) {
                        toId = foo.to.children[foo.newIndex + 1].id;
                    }
                }
            }
            this.move(
                this.hierarchy[foo.oldIndex].obj.shortId(),
                toId,
                foo.from.id,
                foo.to.id,
                !this.controlOnStart, toLast);
        },
        setPrecedes: async function(container) {
            return new Promise(async(resolve) => {
                // container received should be an array - each array element containing and array of children and EcConcept obj.
                if (container === null || container.length <= 0) {
                    resolve(false);
                }
                for (let i = 0; i < container.length; i++) {
                    if (container[i]) {
                        if (container[i].children && container[i].children.length > 0) {
                            if (container[i].obj["ceterms:precedes"]) {
                                delete container[i].obj["ceterms:precedes"];
                                await this.saveObject(container[i].obj);
                            }
                            await this.setChildrenPrecedes(container, container[i].children);
                        } else {
                            // leaf node - add precedes property
                            if (i === container.length - 1) {
                                // precedes level at another stage of the hierarchy
                                let precedes = await this.findPrecedes(container, EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                                container[i].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(precedes);
                                await this.saveObject(container[i].obj);
                            } else {
                                if (container[i + 1].children && container[i + 1].children.length > 0) {
                                    let precedes = await this.findChildrenPrecedes(container[i + 1].children, container[i].obj.id, true);
                                    if (precedes !== null) {
                                        container[i].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(precedes);
                                        await this.saveObject(container[i].obj);
                                    }
                                } else {
                                    container[i].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(container[i + 1].obj.id);
                                    await this.saveObject(container[i].obj);
                                }
                            }
                        }
                    }
                }
                resolve(true);
            });
        },
        setChildrenPrecedes: async function(container, subContainer) {
            return new Promise(async(resolve) => {
                // container and subContainer received should both be an array - each array element containing and array of children and EcConcept obj.
                for (let j = 0; j < subContainer.length; j++) {
                    if (subContainer[j]) {
                        if (subContainer[j].children && subContainer[j].children.length > 0) {
                            if (subContainer[j].obj["ceterms:precedes"]) {
                                delete subContainer[j].obj["ceterms:precedes"];
                                await this.saveObject(subContainer[j].obj);
                            }
                            await this.setChildrenPrecedes(container, subContainer[j].children);
                        } else {
                            // leaf node - add precedes property
                            if (j === subContainer.length - 1) {
                                // precedes level at another stage of the hierarchy
                                let precedes = await this.findPrecedes(container, EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                                if (precedes !== null) {
                                    subContainer[j].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(precedes);
                                    await this.saveObject(subContainer[j].obj);
                                }
                            } else {
                                if (subContainer[j + 1].children && subContainer[j + 1].children.length > 0) {
                                    let precedes = await this.findChildrenPrecedes(subContainer[j + 1].children, subContainer[j].obj.id, true);
                                    if (precedes !== null) {
                                        subContainer[j].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(precedes);
                                        await this.saveObject(subContainer[j].obj);
                                    }
                                } else {
                                    subContainer[j].obj["ceterms:precedes"] = EcRemoteLinkedData.trimVersionFromUrl(subContainer[j + 1].obj.id);
                                    await this.saveObject(subContainer[j].obj);
                                }
                            }
                        }
                    }
                }
                resolve();
            });
        },
        findPrecedes: async function(container, sourceNodeId) {
            return new Promise(async(resolve) => {
                // container received should be an array - each array element containing and array of children and EcConcept obj.
                // Assumes sourceNodeId is a leaf node
                let foundSourceNode = false;
                if (container === null) { return null; }
                // if (EcRemoteLinkedData.trimVersionFromUrl(container.obj.id) === sourceNodeId) { return null; }
                for (let i = 0; i < container.length; i++) {
                    if (!foundSourceNode && (EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id) === sourceNodeId)) {
                        foundSourceNode = true;
                    } else {
                        if (container[i].children && container[i].children.length > 0) {
                            let precedes = await this.findChildrenPrecedes(container[i].children, sourceNodeId, foundSourceNode);
                            if (precedes) {
                                if (precedes === sourceNodeId) {
                                    foundSourceNode = true;
                                } else {
                                    resolve(precedes);
                                }
                            }
                        } else {
                            if (foundSourceNode) {
                                // Source node has already been found. That means that this is the closeest leaf node
                                resolve(EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                            }
                        }
                    }
                }
                resolve(null);
            });
        },
        findChildrenPrecedes: async function(subContainer, sourceNodeId, foundSourceNode) {
            return new Promise(async(resolve) => {
                // subContainer received should be an array - each array element containing and array of children and EcConcept obj.
                let foundChildSourceNode = foundSourceNode;
                if (subContainer === null) { return null; }
                for (let j = 0; j < subContainer.length; j++) {
                    if (!foundChildSourceNode && (EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id) === sourceNodeId)) {
                        foundChildSourceNode = true;
                    } else {
                        if (subContainer[j].children && subContainer[j].children.length > 0) {
                            let precedes = await this.findChildrenPrecedes(subContainer[j].children, sourceNodeId, foundSourceNode);
                            if (precedes) {
                                if (precedes === sourceNodeId) {
                                    foundChildSourceNode = true;
                                } else {
                                    resolve(precedes);
                                }
                            }
                        } else {
                            if (foundChildSourceNode) {
                                // Source node has already been found. That means that this is the closeest leaf node
                                resolve(EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                            }
                        }
                    }
                }
                if (foundChildSourceNode) {
                    resolve(sourceNodeId);
                } else {
                    resolve(null);
                }
            });
        },
        setPrecededBy: async function(container) {
            return new Promise(async(resolve) => {
                // container received should be an array - each array element containing and array of children and EcConcept obj.
                if (container === null || container.length <= 0) {
                    resolve(false);
                }
                for (let i = container.length - 1; i >= 0; i--) {
                    if (container[i]) {
                        if (container[i].children && container[i].children.length > 0) {
                            if (container[i].obj["ceterms:precededBy"]) {
                                delete container[i].obj["ceterms:precededBy"];
                                await this.saveObject(container[i].obj);
                            }
                            await this.setChildrenPrecededBy(container, container[i].children, i);
                        } else {
                            // leaf node - add precededBy property
                            if (i === 0) {
                                // precededBy level at another stage of the hierarchy
                                let precededBy = await this.findPrecededBy(container, EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                                if (precededBy !== null) {
                                    container[i].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(precededBy);
                                    await this.saveObject(container[i].obj);
                                }
                            } else {
                                if (container[i - 1].children && container[i - 1].children.length > 0) {
                                    let precededBy = await this.findChildrenPrecededBy(container[i - 1].children, container[i].obj.id, true);
                                    if (precededBy !== null) {
                                        container[i].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(precededBy);
                                        await this.saveObject(container[i].obj);
                                    }
                                } else {
                                    container[i].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(container[i - 1].obj.id);
                                    await this.saveObject(container[i].obj);
                                }
                            }
                        }
                    }
                }
                resolve(true);
            });
        },
        setChildrenPrecededBy: async function(container, subContainer) {
            return new Promise(async(resolve) => {
                // container and subContainer received should both be an array - each array element containing and array of children and EcConcept obj.
                for (let j = subContainer.length - 1; j >= 0; j--) {
                    if (subContainer[j]) {
                        if (subContainer[j].children && subContainer[j].children.length > 0) {
                            if (subContainer[j].obj["ceterms:precededBy"]) {
                                delete subContainer[j].obj["ceterms:precededBy"];
                                await this.saveObject(subContainer[j].obj);
                            }
                            await this.setChildrenPrecededBy(container, subContainer[j].children);
                        } else {
                            // leaf node - add precededBy property
                            if (j === 0) {
                                // precededBy level at another stage of the hierarchy
                                let precededBy = await this.findPrecededBy(container, EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                                if (precededBy !== null) {
                                    subContainer[j].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(precededBy);
                                    await this.saveObject(subContainer[j].obj);
                                }
                            } else {
                                if (subContainer[j - 1].children && subContainer[j - 1].children.length > 0) {
                                    let precededBy = await this.findChildrenPrecededBy(subContainer[j - 1].children, subContainer[j].obj.id, true);
                                    if (precededBy !== null) {
                                        subContainer[j].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(precededBy);
                                        await this.saveObject(subContainer[j].obj);
                                    }
                                } else {
                                    subContainer[j].obj["ceterms:precededBy"] = EcRemoteLinkedData.trimVersionFromUrl(subContainer[j - 1].obj.id);
                                    await this.saveObject(subContainer[j].obj);
                                }
                            }
                        }
                    }
                }
                resolve();
            });
        },
        findPrecededBy: async function(container, sourceNodeId) {
            return new Promise(async(resolve) => {
                // container received should be an array - each array element containing and array of children and EcConcept obj.
                // Assumes sourceNodeId is a leaf node
                let foundSourceNode = false;
                if (container === null) { return null; }
                for (let i = container.length - 1; i >= 0; i--) {
                    if (!foundSourceNode && (EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id) === sourceNodeId)) {
                        foundSourceNode = true;
                    } else {
                        if (container[i].children && container[i].children.length > 0) {
                            let precededBy = await this.findChildrenPrecededBy(container[i].children, sourceNodeId, foundSourceNode);
                            if (precededBy) {
                                if (precededBy === sourceNodeId) {
                                    foundSourceNode = true;
                                } else {
                                    resolve(precededBy);
                                }
                            }
                        } else {
                            if (foundSourceNode) {
                                // Source node has already been found. That means that this is the closeest leaf node
                                resolve(EcRemoteLinkedData.trimVersionFromUrl(container[i].obj.id));
                            }
                        }
                    }
                }
                resolve(null);
            });
        },
        findChildrenPrecededBy: async function(subContainer, sourceNodeId, foundSourceNode) {
            return new Promise(async(resolve) => {
                // subContainer received should be an array - each array element containing and array of children and EcConcept obj.
                let foundChildSourceNode = foundSourceNode;
                if (subContainer === null) { return null; }
                for (let j = subContainer.length - 1; j >= 0; j--) {
                    if (!foundChildSourceNode && (EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id) === sourceNodeId)) {
                        foundChildSourceNode = true;
                    } else {
                        if (subContainer[j].children && subContainer[j].children.length > 0) {
                            let precededBy = await this.findChildrenPrecededBy(subContainer[j].children, sourceNodeId, foundSourceNode);
                            if (precededBy) {
                                if (precededBy === sourceNodeId) {
                                    foundChildSourceNode = true;
                                } else {
                                    resolve(precededBy);
                                }
                            }
                        } else {
                            if (foundChildSourceNode) {
                                // Source node has already been found. That means that this is the closeest leaf node
                                resolve(EcRemoteLinkedData.trimVersionFromUrl(subContainer[j].obj.id));
                            }
                        }
                    }
                }
                if (foundChildSourceNode) {
                    resolve(sourceNodeId);
                } else {
                    resolve(null);
                }
            });
        },
        saveObject: async function(obj) {
            return new Promise(async(resolve) => {
                this.repo.saveTo(obj, function() {
                    resolve();
                }, appError);
            });
        },
        move: async function(fromId, toId, fromContainerId, toContainerId, removeOldRelations, toLast) {
            this.once = true;
            var me = this;
            if (fromContainerId === toContainerId) {
                var container = toContainerId ? await EcRepository.get(toContainerId) : this.container;
                var property = "skos:narrower";
                if (container.type === "ConceptScheme") {
                    container = this.container;
                    property = "skos:hasTopConcept";
                }
                var initialValue = container[property] ? container[property].slice() : null;
                var fromIndex = container[property].indexOf(fromId);
                container[property].splice(fromIndex, 1);
                if (toId == null || toId === undefined) {
                    if (!EcArray.isArray(container[property])) {
                        container[property] = [];
                    }
                    container[property].push(fromId);
                } else {
                    if (toLast) {
                        container[property].push(fromId);
                    } else {
                        var toIndex = container[property].indexOf(toId);
                        container[property].splice(toIndex, 0, fromId);
                    }
                }
                me.$store.commit('editor/addEditsToUndo', [{operation: "update", id: container.shortId(), fieldChanged: [property], initialValue: [initialValue]}]);
                container["schema:dateModified"] = new Date().toISOString();
                if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[container.id] !== true) {
                    container = await EcEncryptedValue.toEncryptedValue(container);
                }
                this.repo.saveTo(container, function() {
                    me.computeHierarchy(false);
                }, appError);
            } else {
                var moveComp = await EcConcept.get(fromId);
                var fromContainer = fromContainerId ? await EcRepository.get(fromContainerId) : this.container;
                var fromProperty = "skos:narrower";
                var fromProperty2 = "skos:broader";
                var toContainer = toContainerId ? await EcRepository.get(toContainerId) : this.container;
                var toProperty = "skos:narrower";
                var toProperty2 = "skos:broader";
                if (fromContainer.type === "ConceptScheme") {
                    fromContainer = this.container;
                    fromProperty = "skos:hasTopConcept";
                    fromProperty2 = "skos:topConceptOf";
                }
                if (toContainer.type === "ConceptScheme") {
                    toContainer = this.container;
                    toProperty = "skos:hasTopConcept";
                    toProperty2 = "skos:topConceptOf";
                }
                var fromIndex = fromContainer[fromProperty].indexOf(fromId);
                var fromPropInitialValue = fromContainer[fromProperty].slice();
                var fromProp2InitialValue = moveComp[fromProperty2] ? moveComp[fromProperty2].slice() : null;
                var toPropInitialValue = toContainer[toProperty] ? toContainer[toProperty].slice() : null;
                var toProp2InitialValue = moveComp[toProperty2] ? moveComp[toProperty2].slice() : null;
                if (removeOldRelations) {
                    fromContainer[fromProperty].splice(fromIndex, 1);
                }
                if (fromContainerId && moveComp[fromProperty2]) {
                    if (removeOldRelations) {
                        EcArray.setRemove(moveComp[fromProperty2], fromContainerId);
                    }
                    if (moveComp[fromProperty2].length === 0) {
                        delete moveComp[fromProperty2];
                    }
                } else {
                    delete moveComp[fromProperty2];
                }
                fromContainer["schema:dateModified"] = new Date().toISOString();
                if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[fromContainer.id] !== true) {
                    fromContainer = await EcEncryptedValue.toEncryptedValue(fromContainer);
                }
                this.repo.saveTo(fromContainer, async function() {
                    if (toId == null || toId === undefined) {
                        if (!EcArray.isArray(toContainer[toProperty])) {
                            toContainer[toProperty] = [];
                        }
                        toContainer[toProperty].push(fromId);
                    } else {
                        var toIndex = toContainer[toProperty].indexOf(toId);
                        toContainer[toProperty].splice(toIndex, 0, fromId);
                    }
                    if (toContainer.type === "ConceptScheme") {
                        moveComp[toProperty2] = toContainerId;
                    } else {
                        if (!EcArray.isArray(moveComp[toProperty2])) {
                            moveComp[toProperty2] = [];
                        }
                        if (toContainerId) {
                            moveComp[toProperty2].push(toContainerId);
                        }
                    }
                    me.$store.commit('editor/addEditsToUndo', [
                        {operation: "update", id: fromContainer.shortId(), fieldChanged: [fromProperty], initialValue: [fromPropInitialValue]},
                        {operation: "update", id: toContainer.shortId(), fieldChanged: [toProperty], initialValue: [toPropInitialValue]},
                        {operation: "update", id: moveComp.shortId(), fieldChanged: [fromProperty2, toProperty2], initialValue: [fromProp2InitialValue, toProp2InitialValue]}
                    ]);
                    toContainer["schema:dateModified"] = new Date().toISOString();
                    moveComp["schema:dateModified"] = new Date().toISOString();
                    if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[toContainer.id] !== true) {
                        toContainer = await EcEncryptedValue.toEncryptedValue(toContainer);
                    }
                    if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[moveComp.id] !== true) {
                        moveComp = await EcEncryptedValue.toEncryptedValue(moveComp);
                    }
                    me.repo.saveTo(toContainer, function() {
                        me.repo.saveTo(moveComp, appLog, appError);
                        me.computeHierarchy(false);
                    }, appLog);
                }, appError);
            }
            this.dragging = false;
        },
        add: async function(containerId, previousSibling) {
            var me = this;
            var c = new EcConcept();
            if (this.queryParams.newObjectEndpoint) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                c.generateId(this.repo.selectedServer);
            }
            c["subType"] = 'Progression';
            c["schema:dateCreated"] = new Date().toISOString();
            c["schema:dateModified"] = new Date().toISOString();
            if (EcIdentityManager.default.ids != null && EcIdentityManager.default.ids.length > 0) {
                c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            if (this.container.owner && this.container.owner.length > 0) {
                for (var j = 0; j < this.container.owner.length; j++) {
                    var owner = this.container.owner[j];
                    c.addOwner(EcPk.fromPem(owner));
                }
            }
            if (this.container.reader && this.container.reader.length > 0) {
                for (var j = 0; j < this.container.reader.length; j++) {
                    var reader = this.container.reader[j];
                    r.addReader(EcPk.fromPem(reader));
                }
            }
            this.setDefaultLanguage();
            c["skos:prefLabel"] = {"@language": this.$store.state.editor.defaultLanguage, "@value": "New Progression Level"};
            c["ceasn:inProgressionModel"] = this.container.shortId();
            if (containerId === this.container.shortId()) {
                var initialValue = this.container["skos:hasTopConcept"] ? this.container["skos:hasTopConcept"].slice() : null;
                if (!EcArray.isArray(this.container["skos:hasTopConcept"])) {
                    this.container["skos:hasTopConcept"] = [];
                }
                if (previousSibling == null || previousSibling === undefined) {
                    this.container["skos:hasTopConcept"].push(c.shortId());
                } else {
                    // Insert immediately after the sibling
                    var index = this.container["skos:hasTopConcept"].indexOf(previousSibling);
                    this.container["skos:hasTopConcept"].splice(index + 1, 0, c.shortId());
                }
                c["skos:topConceptOf"] = this.container.shortId();
                me.$store.commit('editor/addEditsToUndo', [
                    {operation: "addNew", id: c.shortId()},
                    {operation: "update", id: this.container.shortId(), fieldChanged: ["skos:hasTopConcept"], initialValue: [initialValue]}
                ]);
                this.container["schema:dateModified"] = new Date().toISOString();
                c["schema:dateModified"] = new Date().toISOString();
                if (this.$store.state.editor.private === true) {
                    c = await EcEncryptedValue.toEncryptedValue(c);
                    if (EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true) {
                        me.container = await EcEncryptedValue.toEncryptedValue(me.container);
                    }
                }

                try {
                    await this.repo.multiput([c, me.container]);
                    me.once = true;
                } catch (e) {
                    appError(e);
                }
            } else {
                c["skos:broader"] = [containerId];
                var parent = await EcConcept.get(containerId);
                var initialValue = parent["skos:narrower"] ? parent["skos:narrower"].slice() : null;
                if (!EcArray.isArray(parent["skos:narrower"])) {
                    parent["skos:narrower"] = [];
                }
                if (previousSibling == null || previousSibling === undefined) {
                    parent["skos:narrower"].push(c.shortId());
                } else {
                    // Insert immediately after the sibling
                    var index = parent["skos:narrower"].indexOf(previousSibling);
                    parent["skos:narrower"].splice(index + 1, 0, c.shortId());
                }
                me.$store.commit('editor/addEditsToUndo', [
                    {operation: "addNew", id: c.shortId()},
                    {operation: "update", id: parent.shortId(), fieldChanged: ["skos:narrower"], initialValue: [initialValue]}
                ]);
                this.container["schema:dateModified"] = new Date().toISOString();
                c["schema:dateModified"] = new Date().toISOString();
                parent["schema:dateModified"] = new Date().toISOString();
                if (this.$store.state.editor.private === true) {
                    c = await EcEncryptedValue.toEncryptedValue(c);
                    if (EcEncryptedValue.encryptOnSaveMap[parent.id] !== true) {
                        parent = await EcEncryptedValue.toEncryptedValue(parent);
                    }
                    if (EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true) {
                        me.container = await EcEncryptedValue.toEncryptedValue(me.container);
                    }
                }
                try {
                    await this.repo.multiput([c, parent, me.container]);
                    me.once = true;
                } catch (e) {
                    appError(e);
                }
            }
            this.$store.commit("editor/newCompetency", c.shortId());
            appLog("Added node: ", JSON.parse(c.toJson()));
        },
        select: function(objId, checked) {
            if (checked) {
                EcArray.setAdd(this.selectedArray, objId);
            } else {
                EcArray.setRemove(this.selectedArray, objId);
            }
        },
        onDraggableCheck: function(checked) {
            this.isDraggable = checked;
        },
        cancelImport: function() {
            this.deleteObject(this.container);
            this.$store.dispatch('app/clearImport');
        },
        openFramework: async function() {
            var f = await EcConceptScheme.get(this.container.shortId());
            this.$store.commit('editor/framework', f);
            this.$router.push({name: "progressionModel", params: {frameworkId: this.container.id}});
        },
        onClickCreateNew: async function() {
            let parent = this.container.shortId();
            if (this.selectedArray.length === 1) {
                parent = this.selectedArray[0];
            }

            this.loading = true;
            try {
                await this.add(parent, null);
            } catch (e) {
                appError(e);
            }
            this.loading = false;

            this.addingNode = false;
        },
        deleteSelected: async function() {
            let item = await EcRepository.get(this.selectedArray[0]);
            this.deleteLevel(item);
            this.selectedArray.splice(0, this.selectedArray.length);
        },
        deleteLevel: function(thing) {
            appLog("deleting " + thing.id);
            this.deleteLevelInner(thing);
            this.framework["schema:dateModified"] = new Date().toISOString();
            this.$store.commit('editor/selectedCompetency', null);
        },
        deleteLevelInner: async function(c) {
            var me = this;
            let editsToUndo = [];
            if (c["skos:broader"] != null) {
                for (var i = 0; i < c["skos:broader"].length; i++) {
                    try {
                        let level = await EcConcept.get(c["skos:broader"][i]);
                        var initialValue = level["skos:narrower"].slice();
                        EcArray.setRemove(level["skos:narrower"], c.shortId());
                        level["schema:dateModified"] = new Date().toISOString();
                        editsToUndo.push({operation: "update", id: level.shortId(), fieldChanged: ["skos:narrower"], initialValue: [initialValue]});
                        if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[level.id] !== true) {
                            level = await EcEncryptedValue.toEncryptedValue(level);
                        }
                        await repo.saveTo(level);
                        me.$store.commit('editor/framework', me.framework);
                    } catch (e) {
                        appError(e);
                    }
                }
            }
            if (c["skos:narrower"] != null) {
                for (var i = 0; i < c["skos:narrower"].length; i++) {
                    try {
                        let level = await EcConcept.get(c["skos:narrower"][i]);
                        me.deleteLevelInner(level);
                    } catch (e) {
                        appError(e);
                    }
                }
            }
            if (c["skos:topConceptOf"] != null) {
                try {
                    var initialValue = this.framework["skos:hasTopConcept"].slice();
                    EcArray.setRemove(this.framework["skos:hasTopConcept"], c.shortId());
                    editsToUndo.push({operation: "update", id: this.framework.shortId(), fieldChanged: ["skos:hasTopConcept"], initialValue: [initialValue]});
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
            this.spitEvent("levelDeleted", c.shortId(), "editFrameworkPage");
            editsToUndo.push({operation: "delete", obj: c});
            repo.deleteRegistered(c, function() {
                me.$store.commit('editor/framework', me.framework);
                me.$store.commit('editor/addEditsToUndo', JSON.parse(JSON.stringify(editsToUndo)));
                editsToUndo.splice(0, editsToUndo.length);
            }, appError);
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';


</style>