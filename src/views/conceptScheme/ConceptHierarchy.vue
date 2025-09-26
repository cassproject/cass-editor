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
                        :disabled="!canCopyOrCut"
                        title="Copy concept"
                        :class="canCopyOrCut ? 'is-primary' : 'is-disabled'"
                        class="button is-outlined"
                        @click="copyClick">
                        <span class="icon">
                            <i class="fa fa-copy" />
                        </span>
                    </div>
                    <div
                        v-if="view === 'framework' || view === 'concept'"
                        title="Cut concept"
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
                        title="Paste concept">
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
                    propagateParentChecked="false"
                    :shiftKey="shiftKey"
                    :arrowKey="arrowKey"
                    :largeNumberOfItems="hasLargeNumberOfItems" />
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
            hasLargeNumberOfItems: false,
            isDraggable: true,
            shiftKey: false,
            arrowKey: null,
            addConceptOrChildText: "Add Concept",
            loading: false
        };
    },
    components: {
        HierarchyNode: () => import('@/lode/components/HierarchyNode.vue'),
        draggable: () => import('vuedraggable')
    },
    mixins: [common, competencyEdits],
    computed: {
        processedContainer: function() {
            if (this.container == null) return null;
            let container = this.container;
            if (container["skos:hasTopConcept"] != null) {
                if (!Array.isArray(container["skos:hasTopConcept"])) {
                    container["skos:hasTopConcept"] = [container["skos:hasTopConcept"]];
                }
            }
            return container;
        },
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
            if (this.processedContainer == null) return null;
            if (!this.once) return this.structure;
            appLog("Computing hierarchy.");
            var precache = [];
            appLog(this.processedContainer);
            if (this.processedContainer["skos:hasTopConcept"] != null) {
                precache = precache.concat(this.processedContainer["skos:hasTopConcept"]);
            }
            if (precache.length > 0) {
                if (this.processedContainer["skos:hasTopConcept"] != null) {
                    EcConcept.search(this.repo, "skos\\:inScheme:\"" + this.processedContainer.shortId() + "\"", function(results) {
                        if (results.length > 200) {
                            me.hasLargeNumberOfItems = true;
                        }
                        if (me.hasLargeNumberOfItems) {
                            me.expanded = false;
                        }
                        me.repo.multiget(precache, function(success) {
                            me.computeHierarchy();
                        }, appError);
                    }, null, {size: 10000});
                } else {
                    this.repo.multiget(precache, function(success) {
                        me.computeHierarchy();
                    }, appError);
                }
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
            return this.canEditAny(this.processedContainer);
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
            let allChildrenIds = new Set(); // Track all nodes that are children
            
            if (this.processedContainer == null) { return r; }
            if (this.processedContainer["skos:hasTopConcept"] !== null && this.processedContainer["skos:hasTopConcept"] !== undefined) {
                // First pass - collect all children IDs from both narrower and broader relationships
                for (var i = 0; i < this.processedContainer["skos:hasTopConcept"].length; i++) {
                    var c = await EcConcept.get(this.processedContainer["skos:hasTopConcept"][i]);
                    if (c && c["skos:narrower"]) {
                        for (var j = 0; j < c["skos:narrower"].length; j++) {
                            allChildrenIds.add(c["skos:narrower"][j]);
                        }
                    }
                }
                
                // Additional pass to include broader relationships
                for (var i = 0; i < this.processedContainer["skos:hasTopConcept"].length; i++) {
                    var conceptId = this.processedContainer["skos:hasTopConcept"][i];
                    var topConcept = await EcConcept.get(conceptId);
                    
                    // Check all concepts in the scheme for broader relationships pointing to this concept
                    if (this.processedContainer["skos:hasTopConcept"]) {
                        for (var j = 0; j < this.processedContainer["skos:hasTopConcept"].length; j++) {
                            if (i === j) continue; // Skip self
                            
                            var otherConceptId = this.processedContainer["skos:hasTopConcept"][j];
                            var otherConcept = await EcConcept.get(otherConceptId);
                            
                            if (otherConcept && otherConcept["skos:broader"]) {
                                let broaderRefs = Array.isArray(otherConcept["skos:broader"]) 
                                    ? otherConcept["skos:broader"] 
                                    : [otherConcept["skos:broader"]];
                                    
                                if (broaderRefs.includes(conceptId)) {
                                    // This concept is broader than otherConcept, so otherConcept is a child
                                    allChildrenIds.add(otherConceptId);
                                    
                                    // Ensure narrower relationship exists in parent concept
                                    if (!topConcept["skos:narrower"]) {
                                        topConcept["skos:narrower"] = [];
                                    }
                                    if (!topConcept["skos:narrower"].includes(otherConceptId)) {
                                        topConcept["skos:narrower"].push(otherConceptId);
                                    }
                                }
                            }
                        }
                    }
                }
                // Second pass - only add nodes that aren't children of other nodes
                for (var i = 0; i < this.processedContainer["skos:hasTopConcept"].length; i++) {
                    var c = await EcConcept.get(this.processedContainer["skos:hasTopConcept"][i]);
                    if (c) {
                        // Only add this node if it's not a child of another node
                        if (!allChildrenIds.has(this.processedContainer["skos:hasTopConcept"][i])) {
                            structure.push({"obj": c, "children": []});
                            if (c["skos:narrower"]) {
                                await this.addChildren(structure, c, structure.length - 1);
                            }
                        }
                    }
                }
            }
            this.structure = structure;
            this.once = false;
        },
        addChildren: async function(structure, c, parentIndex) {
            if (!structure[parentIndex]) {
                appError(`Structure at index ${parentIndex} is undefined`);
                return;
            }
            if (!structure[parentIndex].children) {
                structure[parentIndex].children = [];
            }
            if (!c["skos:narrower"]) return;
            for (var j = 0; j < c["skos:narrower"].length; j++) {
                var subC = await EcConcept.get(c["skos:narrower"][j]);
                if (subC) {
                    // Add this child node regardless of whether it appears elsewhere
                    let childIndex = structure[parentIndex].children.length;
                    structure[parentIndex].children.push({"obj": subC, "children": []});
                    if (subC["skos:narrower"]) {
                        // Use the correct index of the newly added child
                        await this.addChildren(
                            structure[parentIndex].children,
                            subC,
                            childIndex
                        );
                    }
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
            
            // Debug logging to track the move operation
            appLog("Moving concept", {
                fromId: fromId,
                toId: toId,
                fromContainerId: fromContainerId,
                toContainerId: toContainerId,
                removeOldRelations: removeOldRelations,
                toLast: toLast
            });
            
            // Get the concept being moved
            var movingConcept = await EcConcept.get(fromId);
            if (!movingConcept) {
                appError("Cannot find concept to move: " + fromId);
                return;
            }
            
            // Determine if containers are ConceptSchemes or Concepts
            var fromContainer = fromContainerId ? await EcRepository.get(fromContainerId) : this.processedContainer;
            var toContainer = toContainerId ? await EcRepository.get(toContainerId) : this.processedContainer;
            
            var isFromConceptScheme = fromContainer.type === "ConceptScheme";
            var isToConceptScheme = toContainer.type === "ConceptScheme";
            
            // Use the actual concept scheme if needed
            if (isFromConceptScheme) {
                fromContainer = this.processedContainer;
            }
            if (isToConceptScheme) {
                toContainer = this.processedContainer;
            }
            
            // Determine property names based on container types
            var fromProperty = isFromConceptScheme ? "skos:hasTopConcept" : "skos:narrower";
            var fromInverseProperty = isFromConceptScheme ? "skos:topConceptOf" : "skos:broader";
            var toProperty = isToConceptScheme ? "skos:hasTopConcept" : "skos:narrower";
            var toInverseProperty = isToConceptScheme ? "skos:topConceptOf" : "skos:broader";
            
            // Store initial values for undo
            var fromPropInitialValue = fromContainer[fromProperty] ? fromContainer[fromProperty].slice() : null;
            var toPropInitialValue = toContainer[toProperty] ? toContainer[toProperty].slice() : null;
            
            var conceptFromInverseInitialValue = null;
            var conceptToInverseInitialValue = null;
            
            if (movingConcept[fromInverseProperty]) {
                conceptFromInverseInitialValue = Array.isArray(movingConcept[fromInverseProperty]) 
                    ? movingConcept[fromInverseProperty].slice() 
                    : movingConcept[fromInverseProperty];
            }
            
            if (movingConcept[toInverseProperty]) {
                conceptToInverseInitialValue = Array.isArray(movingConcept[toInverseProperty]) 
                    ? movingConcept[toInverseProperty].slice() 
                    : movingConcept[toInverseProperty];
            }
            
            // Create objects to track for saving
            var objectsToSave = [movingConcept];
            
            // Remove from old container if needed
            if (removeOldRelations) {
                var fromIndex = fromContainer[fromProperty].indexOf(fromId);
                if (fromIndex !== -1) {
                    fromContainer[fromProperty].splice(fromIndex, 1);
                    
                    // Add to objects to save if changed
                    if (!objectsToSave.includes(fromContainer)) {
                        objectsToSave.push(fromContainer);
                    }
                }
                
                // Update inverse relationship in the concept
                if (isFromConceptScheme) {
                    // If it was a top concept, remove the topConceptOf relationship
                    delete movingConcept[fromInverseProperty];
                } else {
                    // Otherwise handle the broader relationship
                    if (Array.isArray(movingConcept[fromInverseProperty])) {
                        // Remove the specific broader reference
                        EcArray.setRemove(movingConcept[fromInverseProperty], fromContainerId);
                        
                        // If no broader concepts remain and we're moving to the concept scheme,
                        // check if it should be a root-level concept
                        if (movingConcept[fromInverseProperty].length === 0 && isToConceptScheme) {
                            delete movingConcept[fromInverseProperty];
                        }
                    } else if (movingConcept[fromInverseProperty] === fromContainerId) {
                        // If it's a direct reference, remove it
                        delete movingConcept[fromInverseProperty];
                    }
                }
            }
            
            // When moving to the concept scheme, we need to handle root-level duplication
            if (isToConceptScheme) {
                // If it's already a top concept, don't add it again
                if (toContainer[toProperty] && toContainer[toProperty].includes(fromId)) {
                    // Concept is already at root level, no need to add again
                    appLog("Concept is already a top concept, not adding again");
                } else {
                    // Add to concept scheme
                    if (!toContainer[toProperty]) {
                        toContainer[toProperty] = [];
                    }
                    
                    if (toId === null || toId === undefined || toLast) {
                        toContainer[toProperty].push(fromId);
                    } else {
                        var toIndex = toContainer[toProperty].indexOf(toId);
                        if (toIndex !== -1) {
                            toContainer[toProperty].splice(toIndex, 0, fromId);
                        } else {
                            toContainer[toProperty].push(fromId);
                        }
                    }
                    
                    // Set topConceptOf relationship
                    movingConcept[toInverseProperty] = toContainerId;
                    
                    // Add to objects to save
                    if (!objectsToSave.includes(toContainer)) {
                        objectsToSave.push(toContainer);
                    }
                }
            } else {
                // Moving to another concept
                if (!toContainer[toProperty]) {
                    toContainer[toProperty] = [];
                }
                
                // Add to the narrower property of the target container
                if (toId === null || toId === undefined || toLast) {
                    if (!toContainer[toProperty].includes(fromId)) {
                        toContainer[toProperty].push(fromId);
                    }
                } else {
                    var toIndex = toContainer[toProperty].indexOf(toId);
                    if (toIndex !== -1) {
                        toContainer[toProperty].splice(toIndex, 0, fromId);
                    } else {
                        toContainer[toProperty].push(fromId);
                    }
                }
                
                // Update broader relationship in the concept
                if (!movingConcept[toInverseProperty]) {
                    movingConcept[toInverseProperty] = [];
                } else if (!Array.isArray(movingConcept[toInverseProperty])) {
                    movingConcept[toInverseProperty] = [movingConcept[toInverseProperty]];
                }
                
                if (toContainerId && !movingConcept[toInverseProperty].includes(toContainerId)) {
                    movingConcept[toInverseProperty].push(toContainerId);
                }
                
                // Add to objects to save
                if (!objectsToSave.includes(toContainer)) {
                    objectsToSave.push(toContainer);
                }
            }
            
            // Update modification timestamps and prepare for saving
            for (let i = 0; i < objectsToSave.length; i++) {
                objectsToSave[i]["schema:dateModified"] = new Date().toISOString();
                
                // Handle encryption if needed
                if (me.$store.state.editor.private === true && 
                    EcEncryptedValue.encryptOnSaveMap[objectsToSave[i].id] !== true) {
                    objectsToSave[i] = await EcEncryptedValue.toEncryptedValue(objectsToSave[i]);
                }
            }
            
            // Track changes for undo
            me.$store.commit('editor/addEditsToUndo', [
                {operation: "update", id: fromContainer.shortId(), fieldChanged: [fromProperty], initialValue: [fromPropInitialValue]},
                {operation: "update", id: toContainer.shortId(), fieldChanged: [toProperty], initialValue: [toPropInitialValue]},
                {
                    operation: "update",
                    id: movingConcept.shortId(),
                    fieldChanged: [fromInverseProperty, toInverseProperty], 
                    initialValue: [conceptFromInverseInitialValue, conceptToInverseInitialValue]
                }
            ]);
            
            // Save all objects
            try {
                await me.repo.multiput(objectsToSave, function() {
                    appLog("Move complete", {
                        concept: movingConcept.shortId(),
                        objectsSaved: objectsToSave.map(o => o.shortId())
                    });
                    me.computeHierarchy();
                }, appError);
            } catch (e) {
                appError("Error saving changes:", e);
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
            if (this.processedContainer.owner && this.processedContainer.owner.length > 0) {
                for (var j = 0; j < this.processedContainer.owner.length; j++) {
                    var owner = this.processedContainer.owner[j];
                    c.addOwner(EcPk.fromPem(owner));
                }
            }
            if (this.processedContainer.reader && this.processedContainer.reader.length > 0) {
                for (var j = 0; j < this.processedContainer.reader.length; j++) {
                    var reader = this.processedContainer.reader[j];
                    r.addReader(EcPk.fromPem(reader));
                }
            }
            this.setDefaultLanguage();
            c["skos:prefLabel"] = {"@language": this.$store.state.editor.defaultLanguage, "@value": "New Concept"};
            c["skos:inScheme"] = this.processedContainer.shortId();
            if (containerId === this.processedContainer.shortId()) {
                var initialValue = this.processedContainer["skos:hasTopConcept"] ? this.processedContainer["skos:hasTopConcept"].slice() : null;
                if (!EcArray.isArray(this.processedContainer["skos:hasTopConcept"])) {
                    this.processedContainer["skos:hasTopConcept"] = [];
                }
                if (previousSibling == null || previousSibling === undefined) {
                    this.processedContainer["skos:hasTopConcept"].push(c.shortId());
                } else {
                    // Insert immediately after the sibling
                    var index = this.processedContainer["skos:hasTopConcept"].indexOf(previousSibling);
                    this.processedContainer["skos:hasTopConcept"].splice(index + 1, 0, c.shortId());
                }
                c["skos:topConceptOf"] = this.processedContainer.shortId();
                me.$store.commit('editor/addEditsToUndo', [
                    {operation: "addNew", id: c.shortId()},
                    {operation: "update", id: this.processedContainer.shortId(), fieldChanged: ["skos:hasTopConcept"], initialValue: [initialValue]}
                ]);
                this.processedContainer["schema:dateModified"] = new Date().toISOString();
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
                this.processedContainer["schema:dateModified"] = new Date().toISOString();
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
            this.deleteObject(this.processedContainer);
            this.$store.dispatch('app/clearImport');
        },
        openFramework: async function() {
            var f = await EcConceptScheme.get(this.processedContainer.shortId());
            this.$store.commit('editor/framework', f);
            this.$router.push({name: "conceptScheme", params: {frameworkId: this.processedContainer.id}});
        },
        onClickCreateNew: async function() {
            let parent = this.processedContainer.shortId();
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
            this.deleteConcept(item);
            this.selectedArray.splice(0, this.selectedArray.length);
        },
        deleteConcept: function(thing) {
            appLog("deleting " + thing.id);
            this.deleteConceptInner(thing);

            this.framework["schema:dateModified"] = new Date().toISOString();
            this.$store.commit('editor/selectedCompetency', null);
        },
        deleteConceptInner: async function(c) {
            var me = this;
            let editsToUndo = [];
            if (c["skos:broader"] != null) {
                for (var i = 0; i < c["skos:broader"].length; i++) {
                    try {
                        let concept = await EcConcept.get(c["skos:broader"][i]);
                        var initialValue = concept["skos:narrower"].slice();
                        EcArray.setRemove(concept["skos:narrower"], c.shortId());
                        concept["schema:dateModified"] = new Date().toISOString();
                        editsToUndo.push({operation: "update", id: concept.shortId(), fieldChanged: ["skos:narrower"], initialValue: [initialValue]});
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
            this.spitEvent("conceptDeleted", c.shortId(), "editFrameworkPage");
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