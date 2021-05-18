<template>
    <div class="lode__hierarchy">
        <div
            class="hierarchy-buttons">
            <div class="columns is-gapless is-paddingless is-mobile is-marginless is-paddingless">
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
                        <i class="fa fa-circle is-size-7 has-text-light" />
                    </div>
                    <div
                        v-if="selectButtonText"
                        @click="$emit('select-button-click', selectedArray)"
                        class="button is-outlined is-primary">
                        {{ selectButtonText }}
                    </div>
                </div>
                <!-- CONTROLS FOR SELECT: ENABLED MULTI EDIT  -->
                <div class="column is-narrow">
                    <div
                        v-if="(canEdit && view !== 'importPreview' && view !== 'importLight' && view !== 'crosswalk') || queryParams.select || view === 'competencySearch'"
                        class="pl-2 check-radio-all-column">
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
                </div>
                <!-- CROSSWALK CHANGE FRAMEWORK BUTTONS -->
                <div
                    class="crosswalk-buttons column is-fullwidth"
                    v-if="view === 'crosswalk'">
                    <div class="buttons is-right">
                        <div
                            @click="filterHierarchy('showAligned')"
                            title="show aligned only"
                            class="button is-small is-outlined is-primary"
                            :class="{'is-focused': filter === 'showAligned'}">
                            <span class="icon">
                                <i class="fa fa-link" />
                            </span>
                        </div>
                        <div
                            @click="filterHierarchy('showUnaligned')"
                            title="show unaligned only"
                            class="button is-small is-outlined is-primary"
                            :class="{'is-focused': filter === 'showUnaligned'}">
                            <span class="icon">
                                <i class="fa fa-unlink" />
                            </span>
                        </div>
                        <div
                            @click="filterHierarchy('showAll')"
                            title="show all"
                            class="button is-outlined is-small is-primary"
                            :class="{'is-focused': filter === 'showAll'}">
                            <span class="icon">
                                <i class="fa fa-list-alt" />
                            </span>
                        </div>
                        <button
                            @click="changeFrameworkSource"
                            title="change source"
                            v-if="subview === 'crosswalkSource' && alignmentsToSave.length === 0"
                            class="button is-small is-outlined is-dark">
                            <span class="icon">
                                <i class="fa fa-exchange-alt" />
                            </span>
                        </button>
                        <button
                            @click="changeFrameworkTarget"
                            title="change target"
                            v-else-if="subview === 'crosswalkTarget' && alignmentsToSave.length === 0"
                            class="button is-small is-outlined is-dark">
                            <span class="icon">
                                <i class="fa fa-exchange-alt" />
                            </span>
                        </button>
                    </div>
                </div>
                <!-- MULTI EDIT BUTTONS -->
                <div
                    class="column is-narrow"
                    v-if="view !== 'crosswalk' && view !== 'competencySearch'">
                    <div
                        class="buttons">
                        <div
                            v-if="multipleSelected && view !== 'import' && canEdit"
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
                                {{ addCompetencyOrChildText }}
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
                            class="button is-outlined is-primary ">
                            <span class="icon">
                                <i class="fa fa-plus" />
                            </span>
                            <span>
                                create new
                            </span>
                        </div>
                        <div
                            v-if="addingNode"
                            @click="clickToSearch"
                            class="button is-outlined is-primary ">
                            <span class="icon">
                                <i class="fa fa-search" />
                            </span>
                            <span>search competencies</span>
                        </div>
                        <div
                            v-if="view === 'framework' || view === 'concept'"
                            :disabled="!canCopyOrCut"
                            title="Copy competency"
                            :class="canCopyOrCut ? 'is-primary' : 'is-disabled'"
                            class="button is-outlined"
                            @click="copyClick">
                            <span class="icon">
                                <i class="fa fa-copy" />
                            </span>
                        </div>
                        <div
                            v-if="view === 'framework' || view === 'concept'"
                            title="Cut competency"
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
                            title="Paste competency">
                            <span class="icon">
                                <i class="fa fa-paste" />
                            </span>
                        </div>
                        <div
                            v-if="view === 'framework' || view === 'concept'"
                            :disabled="!clipboardContainsItem"
                            class="button is-outlined "
                            @click="clearClipboard"
                            :class="clipboardContainsItem? 'is-danger' : 'is-disabled'"
                            title="Clear clipboard">
                            <span class="icon">
                                <i class="fas fa-clipboard" />
                            </span>
                        </div>
                    </div>
                </div>
                <!-- IMPORT WORKFLOW BUTTONS -->
                <div
                    class="column"
                    v-if="view === 'importPreview' || view === 'importLight'">
                    <div class="buttons is-right">
                        <!-- import details options -->
                        <div
                            class="buttons is-small is-right">
                            <!-- cancel button -->
                            <div
                                @click="cancelImport"
                                class=" button is-light is-small is-pulled-right is-dark is-outlined">
                                <span>
                                    Cancel
                                </span>
                                <span class="icon">
                                    <i class="fa fa-times-circle" />
                                </span>
                            </div>
                            <!-- export -->
                            <div
                                v-if="view === 'importLight' && (importType !== 'text' || (importType === 'text' && importStatus === 'Competency detected'))"
                                class="button is-small is-dark is-outlined is-pulled-right"
                                @click="showModal('export')">
                                <span>
                                    Export
                                </span>
                                <span class="icon">
                                    <i class="fa fa-download" />
                                </span>
                            </div>
                            <!--  start over -->
                            <div
                                v-if="view === 'importLight' && (importType !== 'text' || (importType === 'text' && importStatus === 'Competency detected'))"
                                @click="$store.dispatch('app/clearImport')"
                                class="button is-small is-dark is-outlined is-pulled-right">
                                <span>
                                    import again
                                </span>
                                <span class="icon">
                                    <i class="fa fa-redo-alt" />
                                </span>
                            </div>
                            <!-- open in editor -->
                            <div
                                v-if="view === 'importLight' && (importType !== 'text' || (importType === 'text' && importStatus === 'Competency detected'))"
                                @click="openFramework"
                                class="button is-small is-dark is-outlined is-pulled-right">
                                <span>view in editor</span>
                                <span class="icon">
                                    <i class="fa fa-edit" />
                                </span>
                            </div>
                            <!--  accept preview -->
                            <div
                                @click="$store.commit('app/importTransition', 'light')"
                                v-if="view === 'importPreview'"
                                class="button  is-small is-primary is-outlined is-pulled-right">
                                <span>
                                    done editing
                                </span>
                                <span class="icon">
                                    <i class="fa fa-arrow-right" />
                                </span>
                            </div>
                            <!--  home -->
                            <router-link
                                v-if="view === 'importLight' && (importType !== 'text' || (importType === 'text' && importStatus === 'Competency detected'))"
                                class="button is-small is-primary is-outlined is -pulled-right"
                                to="/">
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
                <!-- list complete item is required class
                    transition groups don't play nice with nested  -->
                <!--<transition-group
                    type="transition"
                    :name="!dragging ? 'flip-list' : null">-->
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
                    :exportOptions="exportOptions"
                    :highlightList="highlightList"
                    :selectAll="selectAll"
                    :newFramework="newFramework"
                    :index="index"
                    :parentStructure="hierarchy"
                    :parent="container"
                    :frameworkEditable="canEdit"
                    :filter="filter"
                    :selectedArray="selectedArray"
                    @begin-drag="beginDrag"
                    @move="move"
                    @select="select"
                    @add="add"
                    @delete-object="deleteObject"
                    @remove-object="removeObject"
                    @export-object="exportObject"
                    @draggable-check="onDraggableCheck"
                    :properties="properties"
                    :expandAll="expanded==true"
                    :parentChecked="false"
                    :shiftKey="shiftKey"
                    :arrowKey="arrowKey"
                    :largeNumberOfItems="hasLargeNumberOfItems" />

            <!--</transition-group>-->
            </draggable>
        </template>
    </div>
</template>
<script>
import exports from '@/mixins/exports.js';
import common from '@/mixins/common.js';
import saveAs from 'file-saver';

var hierarchyTimeout;
export default {
    name: 'Hierarchy',
    mixins: [ exports, common ],
    props: {
        container: Object,
        containerType: String,
        containerTypeGet: String,
        containerNodeProperty: String,
        containerEdgeProperty: String,
        nodeType: String,
        edgeType: String,
        edgeRelationProperty: String,
        edgeSourceProperty: String,
        edgeTargetProperty: String,
        edgeRelationLiteral: String,
        viewOnly: Boolean,
        repo: Object,
        profile: Object,
        exportOptions: Array,
        highlightList: Array,
        newFramework: Boolean,
        properties: String,
        view: {
            type: String,
            default: 'framework'
        },
        subview: {
            type: String,
            default: ''
        }
    },
    data: function() {
        return {
            LARGE_NUMBER_OF_ITEMS: 200,
            filter: 'showAll',
            dragIcon: 'fa-arrows-alt',
            dragOptions: {
                delay: 0,
                scroll: true,
                disabled: false,
                emptyInsertThreshold: 5,
                swapThreshold: 0.25,
                invertSwap: true,
                invertedSwapThreshold: 0.25,
                animation: 0,
                ghostClass: 'ghost-drag',
                chosenClass: 'chosen-drag',
                dragClass: 'drag',
                scrollSensitivity: 30,
                scrollSpeed: 5,
                forceFallback: true
            },
            multipleSelected: false,
            addingNode: false,
            structure: [],
            once: true,
            dragging: false,
            controlOnStart: false,
            selectAll: false,
            selectedArray: [],
            selectButtonText: null,
            expanded: true,
            showAligned: false,
            isDraggable: true,
            frameworkExportOptions: [
                {name: "Achievement Standards Network (RDF+JSON)", value: "asn"},
                {name: "CASS (JSON-LD)", value: "jsonld"},
                {name: "CASS (RDF Quads)", value: "rdfQuads"},
                {name: "CASS (RDF+JSON)", value: "rdfJson"},
                {name: "CASS (RDF+XML)", value: "rdfXml"},
                {name: "CASS (Turtle)", value: "turtle"},
                {name: "Credential Engine ASN (JSON-LD)", value: "ctdlasnJsonld"},
                {name: "Credential Engine ASN (CSV)", value: "ctdlasnCsv"},
                {name: "Table (CSV)", value: "csv"},
                {name: "IMS Global CASE (JSON)", value: "case"}
            ],
            shiftKey: false,
            arrowKey: null,
            addCompetencyOrChildText: "Add Competency"
        };
    },
    components: {
        HierarchyNode: () => import('./HierarchyNode.vue'),
        draggable: () => import('vuedraggable')},
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
                this.addingNode = false;
            }
            if (this.selectedArray.length === 1) {
                this.addCompetencyOrChildText = "Add Child";
            } else {
                this.addCompetencyOrChildText = "Add Competency";
            }
            this.$emit('selected-array', this.selectedArray);
        },
        addAnother: function(val) {
            if (val) {
                this.onClickCreateNew();
                this.$store.commit('editor/addAnother', false);
            }
        }
    },
    computed: {
        canCopyOrCut: function() {
            if (this.selectedArray && this.selectedArray.length === 1) {
                return true;
            } else {
                return false;
            }
        },
        clipboardContainsItem: function() {
            if ((this.$store.getters['editor/copyId'] !== null || this.$store.getters['editor/cutId'] !== null)) {
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
        alignmentsToSave() {
            if (this.$store.getters['crosswalk/alignmentsToSave']) {
                return this.$store.getters['crosswalk/alignmentsToSave'];
            } else {
                return [];
            }
        },
        showAddComments() {
            if (this.$store.getters['editor/queryParams'].concepts === "true") {
                return false;
            }
            return this.$store.state.app.canAddComments;
        },
        importType: function() {
            return this.$store.getters['app/importType'];
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        },
        importTransition: function() {
            return this.$store.getters['app/importTransition'];
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
            if (this.container[this.containerNodeProperty] != null) { precache = precache.concat(this.container[this.containerNodeProperty]); }
            if (this.container[this.containerEdgeProperty] != null) { precache = precache.concat(this.container[this.containerEdgeProperty]); }
            if (precache.length > 0) {
                this.repo.multiget(precache, function(success) {
                    me.computeHierarchy();
                }, appError, appLog);
            } else {
                me.computeHierarchy();
            }
            return this.structure;
        },
        // True if the current client can edit this object.
        canEdit: function() {
            if (this.viewOnly === true) {
                return false;
            }
            return this.container.canEditAny(EcIdentityManager.getMyPks());
        },
        hasLargeNumberOfItems: function() {
            if (this.container == null) {
                return false;
            }
            return (this.container.competency && this.container.competency.length >= this.LARGE_NUMBER_OF_ITEMS);
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
        if (this.hasLargeNumberOfItems) {
            this.expanded = false;
        }
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    },
    beforeDestroy: function() {
        window.removeEventListener('keyup', this.keyup);
        window.removeEventListener('keydown', this.keydown);
    },
    methods: {
        clearClipboard: function() {
            this.$store.commit('editor/copyId', null);
            this.$store.commit('editor/cutId', null);
            this.$store.commit('editor/paste', false);
        },
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
            if (e.key.indexOf("Arrow") !== -1 && !e.shiftKey) {
                if (e.key === "ArrowLeft") {
                    this.expanded = false;
                } else if (e.key === "ArrowRight") {
                    this.expanded = true;
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
        showModal(val, data) {
            let params = {};
            if (val === 'export') {
                params = {
                    type: val,
                    selectedExportOption: '',
                    title: "Export framework",
                    exportOptions: this.frameworkExportOptions,
                    text: "Select a file format to export your framework. Files download locally.",
                    onConfirm: (e) => {
                        return this.exportObject(e);
                    }
                };
            }
            // reveal modal
            this.$modal.show(params);
        },
        openFramework: function() {
            var f = EcFramework.getBlocking(this.container.shortId());
            this.$store.commit('editor/framework', f);
            this.$router.push({name: "framework", params: {frameworkId: this.container.id}});
        },
        changeFrameworkTarget: function() {
            this.$store.commit('crosswalk/step', 1);
        },
        changeFrameworkSource: function() {
            this.$store.commit('crosswalk/step', 0);
        },
        filterHierarchy: function(typeOfFilter) {
            // mightnot need val if I can watch something else for css updates on buttons
            this.filter = typeOfFilter;
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
        computeHierarchy: function() {
            var me = this;
            var r = {};
            var top = {};
            this.structure = [];
            if (this.container == null) { return r; }
            if (this.container[this.containerNodeProperty] !== null && this.container[this.containerNodeProperty] !== undefined) {
                for (var i = 0; i < this.container[this.containerNodeProperty].length; i++) {
                    let c = window[this.nodeType].getBlocking(this.container[this.containerNodeProperty][i]);
                    if (c == null) {
                        c = EcRepository.getBlocking(this.container[this.containerNodeProperty][i]);
                        if (c.encryptedType && c.encryptedType.toLowerCase() === this.containerNodeProperty) {
                            let encryptedType = "Ec" + c.encryptedType;
                            let v = new EcEncryptedValue();
                            v.copyFrom(c);
                            c = new window[encryptedType]();
                            c.copyFrom(v.decryptIntoObject());
                        }
                    }
                    if (c !== null) {
                        r[this.container[this.containerNodeProperty][i]] = r[c.shortId()] = top[c.shortId()] = c;
                    }
                }
            }
            if (this.container[this.containerEdgeProperty] != null && this.container[this.containerEdgeProperty] !== undefined) {
                for (var i = 0; i < this.container[this.containerEdgeProperty].length; i++) {
                    var a = null;
                    a = window[this.edgeType].getBlocking(this.container[this.containerEdgeProperty][i]);
                    if (a != null) {
                        if (a[this.edgeRelationProperty] === this.edgeRelationLiteral) {
                            if (r[a[this.edgeTargetProperty]] == null) continue;
                            if (r[a[this.edgeSourceProperty]] == null) continue;
                            if (r[a[this.edgeTargetProperty]]._children == null) { r[a[this.edgeTargetProperty]]._children = []; }
                            r[a[this.edgeTargetProperty]]._children.push(r[a[this.edgeSourceProperty]]);
                            delete top[a[this.edgeSourceProperty]];
                        }
                    } else {
                        appLog("Hierarchy: Could not find edge: " + this.container[this.containerEdgeProperty][i]);
                    }
                }
            }
            if (this.container[this.containerNodeProperty] != null) {
                for (var i = 0; i < this.container[this.containerNodeProperty].length; i++) {
                    if (!r[this.container[this.containerNodeProperty][i]] || r[this.container[this.containerNodeProperty][i]]._children == null) continue;
                    r[this.container[this.containerNodeProperty][i]]._children.sort(function(a, b) {
                        return me.container[me.containerNodeProperty].indexOf(a.shortId()) - me.container[me.containerNodeProperty].indexOf(b.shortId());
                    });
                }
            }
            this.structure.splice(0, this.structure.length);
            var keys = EcObject.keys(top);
            for (var i = 0; i < keys.length; i++) { this.structure.push(top[keys[i]]); }
            this.structure.sort(function(a, b) {
                return me.container[me.containerNodeProperty].indexOf(a.shortId()) - me.container[me.containerNodeProperty].indexOf(b.shortId());
            });
            this.packChildren(this.structure);
            this.deleteUnderscore(this.structure);
            this.once = false;
        },
        packChildren: function(item) {
            if (item == null) return;
            for (var i = 0; i < item.length; i++) {
                if (!item[i].obj) {
                    item[i] = {
                        obj: item[i],
                        children: item[i]._children === undefined ? [] : item[i]._children
                    };
                }
            }
            for (var i = 0; i < item.length; i++) {
                this.packChildren(item[i].children);
            }
        },
        deleteUnderscore: function(item) {
            if (item == null) return;
            for (var i = 0; i < item.length; i++) {
                delete item[i].obj._children;
                this.deleteUnderscore(item[i].children);
            }
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
            var plusup = 0;
            if (this.shiftKey) {
                this.controlOnStart = true;
            }
            if (foo.from.id === foo.to.id) {
                if (foo.newIndex < this.hierarchy.length) {
                    toId = this.hierarchy[foo.newIndex].obj.shortId();
                }
                plusup = 1;
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
                !this.controlOnStart, plusup);
        },
        // fromId is the id of the object you're moving. toId is the id of the object that will be immediately below this object after the move, at the same level of hierarchy.
        move: function(fromId, toId, fromContainerId, toContainerId, removeOldRelations, plusup) {
            this.once = true;
            var me = this;
            var initialCompetencies = me.container[me.containerNodeProperty] ? me.container[me.containerNodeProperty].slice() : null;
            var initialRelations = me.container[me.containerEdgeProperty] ? me.container[me.containerEdgeProperty].slice() : null;
            var addedEdges = [];
            if (!EcArray.isArray(me.container[me.containerEdgeProperty])) {
                me.container[me.containerEdgeProperty] = [];
            }
            if (fromId !== toId) {
                var fromIndex = this.container[this.containerNodeProperty].indexOf(fromId);
                appLog(fromIndex);
                this.container[this.containerNodeProperty].splice(fromIndex, 1);
                var toIndex = null;
                if (toId == null || toId === undefined) {
                    toIndex = -1;
                } else {
                    toIndex = this.container[this.containerNodeProperty].indexOf(toId);
                }
                appLog(toIndex);
                if (plusup > 0 && fromIndex <= toIndex) { toIndex += plusup; }
                if (plusup < 0 && fromIndex < toIndex) { toIndex += plusup; }
                if (toIndex === -1) {
                    this.container[this.containerNodeProperty].push(fromId);
                } else {
                    this.container[this.containerNodeProperty].splice(toIndex, 0, fromId);
                }
            }
            if (fromContainerId !== toContainerId) {
                var source = window[this.nodeType].getBlocking(fromId);
                var target = window[this.nodeType].getBlocking(toContainerId);
                if (removeOldRelations === true && fromId !== toContainerId) {
                    for (var i = 0; i < this.container[this.containerEdgeProperty].length; i++) {
                        var a = window[this.edgeType].getBlocking(this.container[this.containerEdgeProperty][i]);
                        if (a == null) { continue; }
                        if (a[this.edgeRelationProperty] === this.edgeRelationLiteral) {
                            if (a[this.edgeTargetProperty] == null) continue;
                            if (a[this.edgeSourceProperty] == null) continue;
                            if (a[this.edgeSourceProperty] !== fromId && (this.$store.getters['editor/cutId'] && a[this.edgeTargetProperty] !== fromId)) continue;
                            appLog("Identified edge to remove: ", JSON.parse(a.toJson()));
                            this.container[this.containerEdgeProperty].splice(i--, 1);
                        }
                    }
                }
                if (toContainerId != null && toContainerId !== "") {
                    var a = new window[this.edgeType]();
                    if (EcIdentityManager.ids != null && EcIdentityManager.ids.length > 0) {
                        a.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                    }
                    if (this.container.owner && this.container.owner.length > 0) {
                        for (var j = 0; j < this.container.owner.length; j++) {
                            var owner = this.container.owner[j];
                            a.addOwner(EcPk.fromPem(owner));
                        }
                    }
                    if (this.container.reader && this.container.reader.length > 0) {
                        for (var j = 0; j < this.container.reader.length; j++) {
                            var reader = this.container.reader[j];
                            a.addReader(EcPk.fromPem(reader));
                        }
                    }
                    if (target != null && target !== undefined && source.shortId() !== target.shortId()) {
                        if (me.queryParams && me.queryParams.newObjectEndpoint) {
                            a.generateShortId(this.queryParams.newObjectEndpoint);
                        } else {
                            a.assignId(me.repo.selectedServer, EcCrypto.md5(source.shortId()) + "_" + this.edgeRelationLiteral + "_" + EcCrypto.md5(target.shortId()));
                        }
                        a.source = source.shortId();
                        a.target = target.shortId();
                        a.relationType = this.edgeRelationLiteral;
                        this.container[this.containerEdgeProperty].push(a.shortId());
                        addedEdges.push(a.shortId());
                        appLog("Added edge: ", JSON.parse(a.toJson()));
                        if (this.$store.state.editor && this.$store.state.editor.private === true) {
                            a = EcEncryptedValue.toEncryptedValue(a);
                        }
                        this.repo.saveTo(a, appLog, appError);
                    }
                }
            }
            var stripped = this.stripEmptyArrays(this.container);
            var edits = [];
            for (var i = 0; i < addedEdges.length; i++) {
                edits.push({operation: "addNew", id: addedEdges[i]});
            }
            edits.push(
                {operation: "update", id: me.container.shortId(), fieldChanged: ["competency", "relation"], initialValue: [initialCompetencies, initialRelations], changedValue: [this.container.competency, this.container.relation]}
            );
            me.$store.commit('editor/addEditsToUndo', edits);
            stripped["schema:dateModified"] = new Date().toISOString();
            if (this.$store.state.editor && this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[stripped.id] !== true) {
                stripped = EcEncryptedValue.toEncryptedValue(stripped);
            }
            this.repo.saveTo(stripped, appLog, appError);
            this.dragging = false;
        },
        add: function(containerId, previousSibling) {
            var me = this;
            var c = new window[this.nodeType]();
            var initialCompetencies = this.container.competency ? this.container.competency.slice() : null;
            var initialRelations = this.container.relation ? this.container.relation.slice() : null;
            if (this.queryParams) {
                if (this.queryParams.newObjectEndpoint != null) {
                    c.generateShortId(this.queryParams.newObjectEndpoint);
                } else {
                    c.generateId(this.repo.selectedServer);
                }
            } else {
                c.generateId(this.repo.selectedServer);
            }
            if (EcIdentityManager.ids != null && EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
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
                    c.addReader(EcPk.fromPem(reader));
                }
            }
            if (!EcArray.isArray(me.container[me.containerNodeProperty])) {
                me.container[me.containerNodeProperty] = [];
            }
            if (previousSibling == null || previousSibling === undefined) {
                this.container[this.containerNodeProperty].push(c.shortId());
            } else {
                // Insert immediately after the sibling
                var index = this.container[this.containerNodeProperty].indexOf(previousSibling);
                this.container[this.containerNodeProperty].splice(index + 1, 0, c.shortId());
            }
            me.$store.commit('editor/addEditsToUndo', [
                {operation: "addNew", id: c.shortId()},
                {operation: "update", id: me.container.shortId(), fieldChanged: ["competency"], initialValue: [initialCompetencies], changedValue: [this.container.competency]}
            ]);
            var nodeType = this.nodeType;
            if (this.nodeType.indexOf("Ec") === 0) {
                nodeType = this.nodeType.substring(2);
            }
            if (this.$store.state.editor && this.$store.state.editor.defaultLanguage) {
                c.name = {"@language": this.$store.state.editor.defaultLanguage, "@value": "New " + nodeType};
            } else {
                c.name = "New " + nodeType;
            }
            c["schema:dateCreated"] = new Date().toISOString();
            c["schema:dateModified"] = new Date().toISOString();
            this.container["schema:dateModified"] = new Date().toISOString();
            appLog("Added node: ", JSON.parse(c.toJson()));
            if (this.$store.state.editor) {
                this.$store.commit("editor/newCompetency", c.shortId());
            }
            if (this.$store.state.editor && this.$store.state.editor.private === true) {
                c = EcEncryptedValue.toEncryptedValue(c);
            }
            this.repo.saveTo(c, function() {
                if (containerId === me.container.shortId()) {
                    var toSave = me.container;
                    toSave["schema:dateModified"] = new Date().toISOString();
                    if (me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true) {
                        toSave = EcEncryptedValue.toEncryptedValue(me.container);
                    }
                    me.repo.saveTo(me.stripEmptyArrays(toSave), function() {
                        me.once = true;
                    }, appError);
                } else {
                    var a = new window[me.edgeType]();
                    if (EcIdentityManager.ids != null && EcIdentityManager.ids.length > 0) {
                        a.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                    }
                    if (me.container.owner && me.container.owner.length > 0) {
                        for (var j = 0; j < me.container.owner.length; j++) {
                            var owner = me.container.owner[j];
                            a.addOwner(EcPk.fromPem(owner));
                        }
                    }
                    if (me.container.reader && me.container.reader.length > 0) {
                        for (var j = 0; j < me.container.reader.length; j++) {
                            var reader = me.container.reader[j];
                            a.addReader(EcPk.fromPem(reader));
                        }
                    }
                    if (me.queryParams && me.queryParams.newObjectEndpoint) {
                        a.generateShortId(me.queryParams.newObjectEndpoint);
                    } else {
                        a.assignId(me.repo.selectedServer, EcCrypto.md5(c.shortId()) + "_" + me.edgeRelationLiteral + "_" + EcCrypto.md5(containerId));
                    }
                    a.source = c.shortId();
                    a.target = containerId;
                    if (a.source !== a.target) {
                        a.relationType = me.edgeRelationLiteral;
                        if (!EcArray.isArray(me.container[me.containerEdgeProperty])) {
                            me.container[me.containerEdgeProperty] = [];
                        }
                        me.container[me.containerEdgeProperty].push(a.shortId());
                        appLog("Added edge: ", JSON.parse(a.toJson()));
                        me.$store.commit('editor/addEditsToUndo', [
                            {operation: "addNew", id: c.shortId()},
                            {operation: "update", id: me.container.shortId(), fieldChanged: ["competency", "relation"], initialValue: [initialCompetencies, initialRelations], changedValue: [me.container.competency, me.container.relation]}
                        ]);
                        var toSave = me.container;
                        toSave["schema:dateModified"] = new Date().toISOString();
                        if (me.$store.state.editor && me.$store.state.editor.private === true) {
                            a = EcEncryptedValue.toEncryptedValue(a);
                            if (EcEncryptedValue.encryptOnSaveMap[me.container.id] !== true) {
                                toSave = EcEncryptedValue.toEncryptedValue(me.container);
                            }
                        }
                        me.repo.saveTo(a, function() {
                            me.repo.saveTo(me.stripEmptyArrays(toSave), function() {
                                me.once = true;
                            }, appError);
                        }, appError);
                    }
                }
            }, appError);
        },
        // Supports save() by removing reactify arrays.
        stripEmptyArrays(o) {
            // TODO: Investigate use of Vue.$set instead of reactification method.
            if (EcArray.isArray(o)) {
                if (o.length === 0) {
                    return null;
                }
                for (var i = 0; i < o.length; i++) {
                    o[i] = this.stripEmptyArrays(o[i]);
                    if (o[i] == null) {
                        o.splice(i--, 1);
                    }
                }
            } else if (EcObject.isObject(o)) {
                for (var key in o) {
                    var value = this.stripEmptyArrays(o[key]);
                    if (value == null) {
                        delete o[key];
                    }
                }
            }
            return o;
        },
        select: function(objId, checked) {
            if (checked) {
                EcArray.setAdd(this.selectedArray, objId);
            } else {
                EcArray.setRemove(this.selectedArray, objId);
            }
        },
        deleteObject: function(thing) {
            this.$emit('delete-object', thing);
        },
        removeObject: function(thing) {
            this.$emit('remove-object', thing);
        },
        exportObject: function(thing, type) {
            this.$emit('export-object', thing, type);
        },
        onDraggableCheck: function(checked) {
            this.isDraggable = checked;
        },
        clickToSearch: function() {
            let selected = null;
            if (this.selectedArray && this.selectedArray.length === 1) {
                selected = EcRepository.getBlocking(this.selectedArray[0]);
            }
            this.$store.commit('editor/selectedCompetency', selected);
            var payload = {
                selectedCompetency: selected,
                searchType: 'Competency',
                copyOrLink: true,
                component: 'SearchModal'
            };
            this.$emit('search-things', payload);
            this.$store.commit('lode/competencySearchModalOpen', true);
            this.$store.commit('lode/searchType', "Competency");
            this.$store.commit('lode/copyOrLink', true);
        },
        cancelImport: function() {
            this.deleteObject(this.container);
            this.$store.dispatch('app/clearImport');
        },
        onClickCreateNew: function() {
            let parent = this.container.shortId();
            if (this.selectedArray.length === 1) {
                parent = this.selectedArray[0];
            }
            this.add(parent, null);
            this.addingNode = false;
        },
        deleteSelected: function() {
            let item = EcRepository.getBlocking(this.selectedArray[0]);
            this.deleteObject(item);
            this.selectedArray.splice(0, this.selectedArray.length);
        }
    }
};
</script>


<style lang="scss">
    @import '@/scss/variables.scss';


</style>