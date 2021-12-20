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
                            {{ addConceptOrChildText }}
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
                            :to="{path: '/concepts', query: queryParams}">
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
                    :parentChecked="false"
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
    name: 'ConceptHierarchy',
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
            addConceptOrChildText: "Add Concept"
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
                    me.computeHierarchy();
                }, appError);
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
            return this.container.canEditAny(EcIdentityManager.default.getMyPks());
        },
        recomputeHierarchy: function() {
            return this.$store.getters['editor/recomputeHierarchy'];
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
                this.addConceptOrChildText = "Add Child";
            } else {
                this.addConceptOrChildText = "Add Concept";
            }
            this.$emit('selected-array', this.selectedArray);
        },
        // Concepts can't just depend on fields on the container object like frameworks can for reactivity
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
        computeHierarchy: async function() {
            let structure = [];
            if (this.container == null) { return r; }
            if (this.container["skos:hasTopConcept"] !== null && this.container["skos:hasTopConcept"] !== undefined) {
                for (var i = 0; i < this.container["skos:hasTopConcept"].length; i++) {
                    var c = await EcConcept.get(this.container["skos:hasTopConcept"][i]);
                    if (c) {
                        structure.push({"obj": c, "children": []});
                        if (c["skos:narrower"]) {
                            this.addChildren(structure, c, i);
                        }
                    }
                }
            }
            this.structure = structure;
            this.once = false;
        },
        addChildren: async function(structure, c, i) {
            for (var j = 0; j < c["skos:narrower"].length; j++) {
                var subC = await EcConcept.get(c["skos:narrower"][j]);
                structure[i].children.push({"obj": subC, "children": []});
                if (subC && subC["skos:narrower"]) {
                    this.addChildren(structure[i].children, subC, j);
                }
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
                    me.computeHierarchy();
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
                        me.computeHierarchy();
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
            c["skos:prefLabel"] = {"@language": this.$store.state.editor.defaultLanguage, "@value": "New Concept"};
            c["skos:inScheme"] = this.container.shortId();
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
                this.repo.saveTo(c, function() {
                    me.repo.saveTo(me.container, function() {
                        me.once = true;
                    }, appError);
                }, appError);
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
                this.repo.saveTo(c, function() {
                    me.repo.saveTo(parent, function() {
                        me.repo.saveTo(me.container, function() {
                            me.once = true;
                        }, appError);
                    }, appError);
                }, appError);
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
            this.$router.push({name: "conceptScheme", params: {frameworkId: this.container.id}});
        },
        onClickCreateNew: function() {
            let parent = this.container.shortId();
            if (this.selectedArray.length === 1) {
                parent = this.selectedArray[0];
            }
            this.add(parent, null);
            this.addingNode = false;
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';


</style>