<template>
    <li
        :class="[isPotentialCrosswalkTarget ? crosswalkTargetClass : '', editingNodeClass
        ]"
        v-cloak
        :id="obj.shortId()">
        <div
            class="lode__hierarchy-item columns is-paddingless is-gapless is-marginless is-mobile is-multiline"
            :class="[
                subview,
                {'is-selected-competency-source': isSelectedWorkingAlignmentsSource},
                { 'is-selected-competency-target': isInWorkingAlignmentsTargets},
                isCrosswalkAligned,
                {'show-aligned': filter === 'showAligned'},
                {'show-unaligned': filter === 'showUnaligned'},
                {'show-all': filter === 'showAll'},
                { 'is-focused': isItemFocused},
                { 'is-selected': checked},
                { 'is-highlighted': highlighted},
                { 'is-copied': isItemCopied},
                { 'is-cut': isItemCut},
                { 'can-paste': canPaste},
                { 'target-enabled': sourceState === 'selectTargets'}]">
            <!-- begins node itself, starting with check and expand -->
            <div
                class="column is-12"
                :id="obj.shortId() === newCompetency ? 'scroll-newCompetency' : null">
                <div class="section is-paddingless">
                    <div class="columns is-paddingless is-gapless is-marginless is-mobile is-multiline">
                        <!-- CONTROLS FOR EXPAND -->
                        <div class="expand-column column is-narrow is-vcentered">
                            <div
                                v-if="!collapse && hasChild.length > 0"
                                @click="onExpandEvent()"
                                class="icon is-vcentered">
                                <i
                                    class="fa fa-caret-down has-text-primary is-size-2"
                                    :class="{'is-size-4': view === 'crosswalk'}" />
                            </div>
                            <div
                                v-else-if="hasChild.length > 0"
                                @click="onExpandEvent()"
                                class="icon is-vcentered">
                                <i
                                    class="fa fa-caret-right has-text-primary is-size-2"
                                    :class="{'is-size-4': view === 'crosswalk'}" />
                            </div>
                            <div
                                v-else
                                class="icon is-vcentered is-transparent">
                                <i class="fa fa-circle has-text-white is-size-7" />
                            </div>
                        </div>
                        <!-- CONTROLS FOR SELECT -->
                        <div
                            class="check-radio-column column is-narrow is-vcentered">
                            <div
                                v-if="(canEdit && view !== 'crosswalk' && view !== 'importPreview' && view !== 'importLight' && hierarchyEnabled) || queryParams.select || view === 'competencySearch'"
                                class="field">
                                <input
                                    class="is-checkradio"
                                    @focus="focusHierarchyItem()"
                                    tabindex="0"
                                    @blur="unfocusHierarchyItem()"
                                    :class="{'is-focused': isItemFocused}"
                                    :id="obj.shortId() + 'checkbox'"
                                    type="checkbox"
                                    @input="checkForDblClick"
                                    :name="obj.shortId() + 'checkbox'"
                                    v-model="checked">
                                <label :for="obj.shortId() + 'checkbox'" />
                            </div>
                        </div>
                        <!-- end controls for select and expand -->
                        <div class="column full-column constrain-column">
                            <component
                                :filter="filter"
                                :is="dynamicThing"
                                :view="view"
                                :style="{ transform: indent, width: calcWidth }"
                                :subview="subview"
                                :id="'scroll-' + obj.shortId().split('/').pop()"
                                :obj="changedObj ? changedObj : obj"
                                :uri="obj.shortId()"
                                @expand-event="onExpandEvent()"
                                @edit-node-event="onEditNode()"
                                @done-editing-node-event="onDoneEditingNode()"
                                @addNode="onAddNodeEvent()"
                                :parentNotEditable="!canEdit"
                                :profile="profile"
                                :childrenExpanded="childrenExpanded"
                                :children="this.hasChild.length"
                                :highlightList="highlightList"
                                class="list-complete-item"
                                :class="newThingClass"
                                :newFramework="newFramework"
                                :index="index"
                                @move-up="moveUp"
                                @move-down="moveDown"
                                @move-right="moveRight"
                                @move-left="moveLeft"
                                :frameworkEditable="frameworkEditable"
                                @select="select"
                                @remove-object="removeObject"
                                :editingNode="editingNode"
                                :cantMoveUp="cantMoveUp"
                                :cantMoveDown="cantMoveDown"
                                :cantMoveRight="cantMoveRight"
                                :cantMoveLeft="cantMoveLeft"
                                :properties="properties"
                                :containerSubType="containerSubType"
                                :canEditAssertions="canEditAssertions"
                                @set-checkbox="setCheckbox">
                                <div class="hierarchy-item__buttons">
                                    <div
                                        v-if="view !== 'crosswalk' && canEditThing"
                                        @click="onEditNode()"
                                        class="edit-button button is-text  is-small has-text-primary">
                                        <div class="icon ">
                                            <i class="fa fa-edit " />
                                        </div>
                                    </div>
                                    <div
                                        v-if="canEdit && view !== 'crosswalk' && hierarchyEnabled"
                                        class="handle-button button is-text  is-small has-text-primary">
                                        <span class="icon">
                                            <i class="fas handle fa-arrows-alt" />
                                            <i class="fas handle fa-arrows-alt" />
                                        </span>
                                    </div>
                                    <div
                                        v-if="showAddComments && view !== 'crosswalk' && view !== 'search'"
                                        @click="handleClickAddComment"
                                        class=" comment-button button is-text  is-small has-text-primary">
                                        <div class="icon">
                                            <i class="fa fa-comment-medical" />
                                        </div>
                                    </div>
                                </div>
                            </component>
                        </div>
                    </div>
                </div>
            </div>
            <!-- CROSSWALK EXISTING ALIGNMENTS -->
            <div
                v-show="sourceState === 'ready'"
                v-if="(view === 'crosswalk' && subview === 'crosswalkSource') && sourceAlignmentCountByType.length > 0"
                class="column is-12 crosswalk-tags">
                <span
                    v-for="(sac, idx) in sourceAlignmentCountByType"
                    :key="idx"
                    class="tag is-small is-link crosswalk__align_link"
                    :title="crosswalkOptions[sac.alignType].label"
                    @click="setRelationTypeByLinkClick(sac.alignType)">
                    <!--<i :class="crosswalkOptions[sac.alignType].icon" />-->
                    <span>{{ crosswalkOptions[sac.alignType].label }}</span>
                    <span style="margin-left: .5rem">{{ sac.alignCount }}</span>
                </span>
            </div>
            <!--- end existing alignments -->
            <!-- CROSSWALK BUTTONS -->
            <div
                v-if="view === 'crosswalk' && subview === 'crosswalkSource'"
                class="crosswalk-buttons__source">
                <div
                    @click="setWorkingAlignmentsSource"
                    :disabled="sourceState !== 'ready'"
                    class="button is-outlined is-small is-primary crosswalk-buttons__source__create">
                    <span class="icon">
                        <i class="fa fa-plus" />
                    </span>
                    <span>add</span>
                </div>
                <div
                    v-show="sourceState === 'selectType' && isSelectedWorkingAlignmentsSource && workingAlignmentsType ===''"
                    class="field is-grouped has-background-primary crosswalk-select-field">
                    <div class="control">
                        <div class="select is-small is-primary has-text-primary crosswalk-buttons__source__select">
                            <select
                                ref="alignmentOptions"
                                @blur="ifNoWorkingAlignmentsTypeRemoveSourceCompetency"
                                v-model="workingAlignmentsType">
                                <option value>
                                    relation
                                </option>
                                <option
                                    v-for="(option, index) in crosswalkOptionsArray"
                                    :key="index"
                                    :value="option.type">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div
                    class="field"
                    v-if="sourceState === 'selectTargets' && isSelectedWorkingAlignmentsSource">
                    <p class="control">
                        <span
                            :title="crosswalkOptions[workingAlignmentsType].label "
                            class="tag is-small is-fullwidth is-link crosswalk-buttons__source__type">
                            <span class="has-text-weight-bold">{{ crosswalkOptions[workingAlignmentsType].label }}</span>
                            <button
                                @click="removeSourceCompetency"
                                class="delete is-small" />
                        </span>
                    </p>
                </div>
            </div>
            <div
                v-if="view === 'crosswalk' && subview === 'crosswalkTarget' && sourceState === 'selectTargets'"
                class="crosswalk-buttons__target">
                <div
                    v-show="!isInWorkingAlignmentsTargets"
                    @click="addToWorkingAlignmentsTargets(obj.shortId())"
                    class="button  is-fullwidth is-small is-text has-text-primary">
                    <span
                        class="icon">
                        <i class="fa fa-plus" />
                    </span>
                </div>
                <div
                    v-show="isInWorkingAlignmentsTargets"
                    @click="removeFromWorkingAlignmentsTargets(obj.shortId())"
                    class="button is-fullwidth is-small  is-text has-text-link">
                    <span
                        class="icon">
                        <i class="fa fa-check" />
                    </span>
                </div>
            </div>
            <!--- end crosswalk buttons -->
            <!-- ADD NODE SECTION below every object should be an option to insert a node -->
            <div
                v-if="view !== 'crosswalk' && canEdit && false"
                class="add-node-section">
                <div
                    v-if="!addingNode"
                    class="add-new-node__line"
                    title="Add competency"
                    @click="addingNode = true;">
                    <hr>
                    <div class="button is-small is-outlined is-primary">
                        <span class="icon">
                            <i class="fa fa-plus-circle" />
                        </span>
                        <span> add item </span>
                    </div>
                    <hr>
                </div>
                <div
                    v-else
                    class="add-node__options">
                    <div class="buttons is-centered">
                        <div
                            @click="$store.commit('lode/competencySearchModalOpen', false); addingNode = false;"
                            class="button is-outlined is-small is-dark ">
                            <span class="icon">
                                <i class="fa fa-times" />
                            </span>
                            <span>cancel</span>
                        </div>
                        <div
                            v-if="!hasChild.length"
                            @click="$emit('create-new-node-event', parent.shortId(), obj.shortId()); addingNode = false;"
                            class="button is-outlined is-small is-primary ">
                            <span class="icon">
                                <i class="fa fa-plus" />
                            </span>
                            <span>
                                create new
                            </span>
                        </div>
                        <div
                            v-else
                            @click="$emit('create-new-node-event', obj.shortId()); addingNode = false;"
                            class="button is-outlined is-small is-primary ">
                            <span class="icon">
                                <i class="fa fa-plus" />
                            </span>
                            <span>
                                create new
                            </span>
                        </div>
                        <div
                            v-if="obj && obj.type !== 'Concept'"
                            @click="clickToSearch"
                            class="button is-outlined is-small is-primary ">
                            <span class="icon">
                                <i class="fa fa-search" />
                            </span>
                            <span>search</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template>
            <draggable
                v-if="!collapse && hierarchyEnabled"
                :id="obj.shortId()"
                v-bind="dragOptions"
                v-model="hasChild"
                :group="{ name: 'test' }"
                handle=".handle"
                tag="ul"
                :class="[(dragging == true ? ' dragging' : ''), {'no-child': hasChild.length === 0}]"
                class="lode__hierarchy-sub-ul"
                :disabled="canEdit != true || !isDraggable"
                @start="beginDrag"
                @end="endDrag">
                <!--<transition-group
                    type="transition"
                    :name="!dragging ? 'flip-list' : null">-->
                <HierarchyNode
                    :depth="depth + 1"
                    :view="view"
                    :filter="filter"
                    :subview="subview"
                    v-for="(item, i) in hasChild"
                    @create-new-node-event="onCreateNewNode"
                    :key="item.obj.id"
                    class="lode__hierarchy-sub-li"
                    :obj="item.obj"
                    :hasChild="item.children"
                    :dragging="dragging"
                    :canEdit="canEdit"
                    :profile="profile"
                    :highlightList="highlightList"
                    :selectAll="selectAll"
                    :newFramework="newFramework"
                    :index="i"
                    :parentStructure="hasChild"
                    :parent="obj"
                    :frameworkEditable="frameworkEditable"
                    :selectedArray="selectedArray"
                    @begin-drag="beginDrag"
                    @move="move"
                    @select="select"
                    @add="add"
                    @remove-object="removeObject"
                    :properties="properties"
                    :parentChecked="checked"
                    :parentHighlighted="parentHighlighted ? parentHighlighted : checked"
                    :propagateParentChecked="propagateChecked === 'parent' ? propagateParentChecked : propagateChecked"
                    :shiftKey="shiftKey"
                    :arrowKey="arrowKey"
                    :largeNumberOfItems="largeNumberOfItems"
                    :expandAll="expandAll"
                    :containerSubType="containerSubType"
                    :canEditAssertions="canEditAssertions" />
                <!--</transition-group>-->
            </draggable>
        </template>
    </li>
</template>
<script>
import {mapState} from 'vuex';
import common from '@/mixins/common.js';

export default {
    name: "HierarchyNode",
    mixins: [ common ],
    props: {
        depth: Number,
        obj: Object,
        filter: {
            type: String,
            default: 'showAll'
        },
        hasChild: Array,
        canEdit: Boolean,
        dragging: Boolean,
        profile: Object,
        highlightList: Array,
        selectAll: Boolean,
        newFramework: Boolean,
        index: Number,
        parentStructure: Array,
        parent: Object,
        frameworkEditable: Boolean,
        properties: String,
        expandAll: Boolean,
        parentChecked: Boolean,
        parentHighlighted: Boolean,
        propagateParentChecked: String,
        view: {
            type: String,
            default: 'framework'
        },
        subview: {
            type: String,
            default: ''
        },
        selectedArray: Array,
        shiftKey: {
            type: Boolean,
            default: false
        },
        arrowKey: String,
        largeNumberOfItems: Boolean,
        hierarchyEnabled: {
            type: Boolean,
            default: true
        },
        containerSubType: String,
        canEditAssertions: Boolean
    },
    components: {
        ThingEditing: () => import('./ThingEditing.vue'),
        Thing: () => import('./Thing.vue'),
        draggable: () => import('vuedraggable')
    },
    data: function() {
        return {
            crosswalkOptions: {},
            crosswalkOptionsArray: [],
            dragOptions: {
                scroll: true,
                delay: 0,
                swapThreshold: 0.25,
                emptyInsertThreshold: 4,
                invertedSwapThreshold: 0.25,
                invertSwap: true,
                disabled: false,
                animation: 0,
                ghostClass: 'ghost-drag',
                chosenClass: 'chosen-drag',
                dragClass: 'drag',
                scrollSensitivity: 30,
                scrollSpeed: 5,
                forceFallback: true
            },
            isDraggable: true,
            addingNode: false,
            editingNode: false,
            collapse: true,
            controlOnStart: false,
            checked: false,
            childrenExpanded: false,
            // Needed to update the obj prop passed to the dynamic Thing/ThingEditing component on change to the object
            changedObj: null,
            crosswalkTargetClass: '',
            sourceAlignmentCountByType: {},
            isItemFocused: false,
            isItemCut: false,
            isItemCopied: false,
            canPaste: false, // needs trigger that something has been copied or cut
            canEditInCollection: false,
            checkBoxDblClick: 0,
            propagateChecked: 'parent'
        };
    },
    computed: {
        indent() {
            return `translate(${(this.depth * 16 - 16)}px)`;
        },
        calcWidth() {
            return `calc(100% - ${(this.depth * 16 - 16)}px) !important`;
        },
        ...mapState({
            workingAlignmentsSource: state => state.crosswalk.workingAlignmentsMap.source,
            workingAlignmentsTargets: state => state.crosswalk.workingAlignmentsMap.targets,
            relevantExistingAlignmentsMap: state => state.crosswalk.relevantExistingAlignmentsMap,
            relevantExistingAlignmentsMapLastUpdate: state => state.crosswalk.relevantExistingAlignmentsMapLastUpdate,
            enabledRelationshipTypes: state => state.crosswalk.enabledRelationshipTypes,
            enabledRelationshipTypesLastUpdate: state => state.crosswalk.enabledRelationshipTypesLastUpdate,
            alignedCompetenciesList: state => state.crosswalk.alignedCompetenciesList,
            targetState: state => state.crosswalk.targetState,
            sourceState: state => state.crosswalk.sourceState,
            targetNodesToHighlight: state => state.crosswalk.targetNodesToHighlight,
            cutId: state => state.editor.cutId,
            copyId: state => state.editor.copyId,
            paste: state => state.editor.paste,
            queryParams: state => state.editor.queryParams,
            newCompetency: state => state.editor.newCompetency,
            conceptMode: state => state.editor.conceptMode,
            progressionMode: state => state.editor.progressionMode
        }),
        showAddComments() {
            if (this.$store.getters['editor/queryParams'].concepts === "true" || this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) {
                return false;
            }
            return this.$store.state.app.canAddComments;
        },
        workingAlignmentsType: {
            get: function() {
                return this.$store.getters['crosswalk/workingAlignmentsType'];
            },
            set: function(value) {
                this.$store.commit('crosswalk/workingAlignmentsType', value);
            }
        },
        isPotentialCrosswalkTarget: function() {
            return (this.view === 'crosswalk' && this.subview === 'crosswalkTarget');
        },
        isSelectedWorkingAlignmentsSource: function() {
            if (this.workingAlignmentsSource === this.obj.shortId() && this.subview === 'crosswalkSource') return true;
            else return false;
        },
        isInWorkingAlignmentsTargets: function() {
            if (!this.workingAlignmentsTargets) return false;
            if (this.subview === 'crosswalkTarget' && this.workingAlignmentsTargets.includes(this.obj.shortId())) return true;
            else return false;
        },
        isCrosswalkAligned: function() {
            if (this.view === 'crosswalk') {
                if (this.alignedCompetenciesList.includes(this.obj.shortId())) {
                    return 'is-crosswalk-aligned';
                } else {
                    return 'not-crosswalk-aligned';
                }
            } else {
                return 'not-crosswalk-aligned';
            }
        },
        /*
         * Dynamic thing is a computed value that <component>
         * observes in order to decide which thing structure to load
         * if editingNode is set to true
         * we should load the ThingEditing vue template
         * otherwise viewing,  we can add to this later
         */
        dynamicThing: function() {
            if (this.editingNode || this.newThingClass === 'new-thing') {
                return 'ThingEditing';
            } else {
                return 'Thing';
            }
        },
        newThingClass: function() {
            if (this.$store.state.editor) {
                if (this.obj.shortId() === this.newCompetency) {
                    return 'new-thing';
                }
            }
            return '';
        },
        cantMoveUp: function() {
            if (this.index - 1 < 0) {
                return true;
            }
            return false;
        },
        cantMoveDown: function() {
            if (this.index + 1 >= this.parentStructure.length) {
                return true;
            }
            return false;
        },
        cantMoveRight: function() {
            if (this.index - 1 < 0) {
                return true;
            }
            return false;
        },
        cantMoveLeft: function() {
            if (this.parent.type === "Framework") {
                return true;
            }
            return false;
        },
        editingNodeClass: function() {
            if (this.editingNode) {
                return 'editing-thing';
            } else {
                return '';
            }
        },
        canEditThing: function() {
            if (this.canEdit === false) {
                return false;
            }
            if (this.containerSubType === 'Collection') {
                return this.canEditInCollection;
            }
            if (this.obj) {
                return this.canEditAny(this.obj);
            }
            return true;
        },
        highlighted: function() {
            // Removing this functionality for now. Going to replace with a fade.
            // if (this.parentHighlighted) {
            //     return true;
            // } else {
            //     return this.checked;
            // }
            return false;
        }
    },
    // used to help the parent know when nodes stop rendering
    mounted() {
        this.$emit('mounting-node');
        appLog("hierarchyNode.vue is mounted");
        this.collapse = this.largeNumberOfItems;
        if (this.expandAll) {
            this.collapse = false;
        }
        if (!this.collapse) {
            this.childrenExpanded = true;
        }
        if (this.view === 'crosswalk' && this.subview === 'crosswalkSource') {
            this.buildCrosswalkOptions();
            this.calculateSourceAlignmentCountByType();
        }
        if (this.selectAll) {
            this.checked = this.selectAll;
        }
        if ((this.propagateParentChecked === 'parent') && !this.newCompetency) {
            this.checked = this.parentChecked;
        }
        if (this.selectedArray && this.selectedArray.length) {
            if (EcArray.has(this.selectedArray, this.obj.shortId())) {
                this.checked = true;
            }
        }
        if (this.containerSubType === 'Collection') {
            this.getCanEditInCollection();
        }
    },
    methods: {
        setCheckbox: function() {
            if (this.view === 'framework') {
                this.checked = !this.checked;
                this.propagateChecked = 'false';
            }
        },
        checkForDblClick: function() {
            if (this.view === 'framework') {
                // Select all children on double click. PropagateChecked exists on each node and can be set to true, false, or parent.
                // It is set to parent by default, indicating that the node should take on the value of the parentPropagateChecked.
                // If this node's checkbox is changed, then propagateChecked takes on the value of false to select only itself and
                // true to select itself and all children. The behavior is the same for checking and unchecking the box.
                // A watch exists on PropagateCheck to return the value back to parent.
                this.checkBoxDblClick++;
                setTimeout(() => {
                    if (this.checkBoxDblClick > 1) {
                        this.checkBoxDblClick = 0;
                        this.checked = !this.checked;
                        this.propagateChecked = 'true';
                    } else if (this.checkBoxDblClick === 1) {
                        this.checkBoxDblClick = 0;
                        this.propagateChecked = 'false';
                    } else {
                        this.propagateChecked = 'parent';
                    }
                }, 500);
            }
        },
        focusHierarchyItem: function() {
            appLog("tab");
            this.isItemFocused = true;
        },
        unfocusHierarchyItem: function() {
            this.isItemFocused = false;
        },
        ifNoWorkingAlignmentsTypeRemoveSourceCompetency() {
            if (!this.workingAlignmentsType) {
                this.removeSourceCompetency();
            }
        },
        handleClickAddComment: function() {
            appLog("object is: ", this.obj.shortId());
            this.$store.commit('editor/setAddCommentAboutId', this.obj.shortId());
            this.$store.commit('editor/setAddCommentType', 'new');
            this.$store.commit('app/showModal', {component: 'AddComment'});
        },
        calculateSourceAlignmentCountByType: function() {
            if (!this.relevantExistingAlignmentsMap[this.obj.shortId()]) this.sourceAlignmentCountByType = [];
            else {
                let sourceAlignments = this.relevantExistingAlignmentsMap[this.obj.shortId()];
                if (!sourceAlignments) this.sourceAlignmentCountByType = [];
                else {
                    let sacbt = [];
                    let alignTypes = Object.keys(sourceAlignments);
                    for (let at of alignTypes) {
                        if (this.crosswalkOptions[at]) {
                            let sa = {};
                            sa.alignType = at;
                            sa.alignCount = Object.keys(sourceAlignments[at]).length;
                            if (sa.alignCount > 0) sacbt.push(sa);
                        }
                    }
                    this.sourceAlignmentCountByType = sacbt;
                }
            }
        },
        removeSourceCompetency: function() {
            this.$store.commit('crosswalk/sourceState', 'ready');
            this.$store.commit('crosswalk/resetWorkingAlignmentsMap');
        },
        removeFromWorkingAlignmentsTargets: function(id) {
            this.$store.commit('crosswalk/removeWorkingAlignmentsTarget', id);
        },
        addToWorkingAlignmentsTargets: function(id) {
            this.$store.commit('crosswalk/addWorkingAlignmentsTarget', id);
        },
        setWorkingAlignmentsSource: function() {
            if (this.sourceState === 'ready') {
                this.$store.commit('crosswalk/workingAlignmentsSource', this.obj.shortId());
                this.$store.commit('crosswalk/sourceState', 'selectType');
                // keep me, auto focuses on select so clicking off without interaction
                // follows the $blur rule and removes the selection
                this.$nextTick(() => {
                    this.$refs.alignmentOptions.focus();
                });
            }
        },
        setRelationTypeByLinkClick: function(type) {
            this.$store.commit('crosswalk/workingAlignmentsSource', this.obj.shortId());
            this.$store.commit('crosswalk/workingAlignmentsType', type);
            // this.$store.commit('crosswalk/sourceState', 'selectTargets');
        },
        buildCrosswalkOptions: function() {
            this.crosswalkOptions = {};
            this.crosswalkOptionsArray = [];
            for (let er of this.enabledRelationshipTypes) {
                let co = {};
                co.type = er.relationship;
                co.label = er.label;
                this.crosswalkOptions[er.relationship] = co;
                this.crosswalkOptionsArray.push(co);
            }
        },
        onEditNode: function() {
            this.editingNode = true;
        },
        onDoneEditingNode: async function() {
            this.editingNode = false;
            if (this.obj.shortId() === this.newCompetency) {
                if (this.view.indexOf('import') !== -1) {
                    let options = {
                        container: "#import",
                        easing: "ease",
                        offset: -150,
                        force: true,
                        cancelable: true,
                        onStart: false,
                        onDone: false,
                        onCancel: false,
                        x: false,
                        y: true
                    };
                    this.$scrollTo("#scroll-newCompetency", 500, options);
                } else if (this.conceptMode || this.progressionMode) {
                    let options = {
                        container: "#concept",
                        easing: "ease",
                        offset: -150,
                        force: true,
                        cancelable: true,
                        onStart: false,
                        onDone: false,
                        onCancel: false,
                        x: false,
                        y: true
                    };
                    this.$scrollTo("#scroll-newCompetency", 500, options);
                } else {
                    this.$scrollTo("#scroll-newCompetency");
                }
            }
            if (this.$store.state.editor) {
                this.$store.commit('editor/newCompetency', null);
                this.$store.commit('editor/recomputeHierarchy', true);
            }
            // Update the obj prop passed to Thing/ThingEditing so edits are reflected
            this.changedObj = await EcRepository.get(this.obj.shortId());
        },
        onAddNodeEvent: function() {
            this.add(this.obj.shortId());
        },
        onExpandEvent: function() {
            this.collapseIfPossible();
            this.childrenExpanded = !this.childrenExpanded;
        },
        collapseIfPossible: function() {
            if (this.hasChild.length > 0) {
                this.collapse = !this.collapse;
            }
        },
        // WARNING: The Daemon of OBO lingers in these here drag and move methods. The library moves the objects, and OBO will then come get you!
        beginDrag: function(event) {
            if (event !== undefined) {
                this.controlOnStart = event.originalEvent.ctrlKey || event.originalEvent.shiftKey;
            }
            this.$emit('begin-drag');
        },
        endDrag: function(foo) {
            if (foo.to.id === 'framework_drag') {
                return;
            }
            appLog(foo.oldIndex, foo.newIndex);
            var toId = null;
            var plusup = 0;
            if (this.shiftKey) {
                this.controlOnStart = true;
            }
            if (foo.from.id === foo.to.id) {
                if (foo.newIndex + 1 < this.hasChild.length) {
                    toId = this.hasChild[foo.newIndex + 1].obj.shortId();
                }
            } else {
                if (foo.to.children[foo.newIndex] === undefined) {
                    toId = foo.to.id;
                } else {
                    if (foo.to.id === "") {
                        if (foo.newIndex < foo.to.children.length) {
                            toId = foo.to.children[foo.newIndex].id;
                        }
                    } else {
                        if (foo.newIndex + 1 < foo.to.children.length) {
                            toId = foo.to.children[foo.newIndex + 1].id;
                        }
                    }
                }
            }
            this.move(
                foo.clone.id,
                toId,
                foo.from.id,
                foo.to.id,
                !this.controlOnStart, plusup);
        },
        move: function(fromId, toId, fromContainerId, toContainerId, removeOldRelations, plusup) {
            this.$emit('move', fromId, toId, fromContainerId, toContainerId, removeOldRelations, plusup);
        },
        moveUp: function(thingId, index) {
            if (this.cantMoveUp) {
                return;
            }
            var fromId = thingId;
            var parent = this.parent.shortId();
            var toId = this.parentStructure[index - 1].obj.shortId();
            this.move(fromId, toId, parent, parent, true, 0);
        },
        moveDown: function(thingId, index) {
            if (this.cantMoveDown) {
                return;
            }
            var toId = null;
            var fromId = thingId;
            var parent = this.parent.shortId();
            if (index + 2 !== this.parentStructure.length) {
                var toId = this.parentStructure[index + 2].obj.shortId();
            }
            this.move(fromId, toId, parent, parent, true, 0);
        },
        moveRight: function(thingId, index) {
            if (this.cantMoveRight) {
                return;
            }
            var fromId = thingId;
            var toId = null;
            var fromContainerId = this.parent.shortId();
            var toContainerId = this.parentStructure[index - 1].obj.shortId();
            this.move(fromId, toId, fromContainerId, toContainerId, true, 0);
        },
        moveLeft: function(thingId, index) {
            if (this.cantMoveLeft) {
                return;
            }
            var fromId = thingId;
            var fromContainerId = this.parent.shortId();
            var toId = null;
            var toContainerId = this.$parent.$parent.parent.shortId();
            // If attempting to move this to top level, then set toContainerId to null and toId equal to fromId to indicate top level
            if (toContainerId.includes('Framework') || (this.parent["ceasn:isTopChildOf"] && this.parent["ceasn:isTopChildOf"].includes(toContainerId))) {
                toContainerId = '';
                toId = fromId;
            }
            this.move(fromId, toId, fromContainerId, toContainerId, true, 0);
        },
        add: function(containerId) {
            this.$emit('add', containerId);
        },
        select: function(objId, checked) {
            this.$emit('select', objId, checked);
        },
        removeObject: function(thing) {
            this.$emit('remove-object', thing);
        },
        onCreateNewNode: function(parentId, previousSiblingId) {
            this.$emit('create-new-node-event', parentId, previousSiblingId);
        },
        clickToSearch: function() {
            this.$store.commit('lode/competencySearchModalOpen', true);
            this.$store.commit('app/showModal', {component: 'SearchModal'});
            this.$store.commit('lode/searchType', "Competency");
            this.$store.commit('lode/copyOrLink', true);
            if (this.$store.state.editor) {
                this.$store.commit('editor/selectedCompetency', this.obj);
            }
        },
        async getCanEditInCollection() {
            let frameworks = await EcFramework.search(repo, 'competency:"' + this.obj.shortId() + '" AND NOT subType:Collection');
            if (frameworks && frameworks.length > 0) {
                this.canEditInCollection = false;
            } else {
                this.canEditInCollection = true;
            }
        },
        selectChild: function(obj, selected) {
            if (obj.obj) {
                this.$emit('select', obj.obj.shortId(), selected);
                if (obj.children) {
                    for (let child of obj.children) {
                        this.selectChild(child, selected);
                    }
                }
            }
        }
    },
    watch: {
        propagateChecked: function() {
            setTimeout(() => {
                this.propagateChecked = 'parent';
            }, 1000);
        },
        relevantExistingAlignmentsMapLastUpdate: function() {
            // this is bobo but it works...screw you vue!!!
            if (this.view === 'crosswalk' && this.subview === 'crosswalkSource') {
                this.calculateSourceAlignmentCountByType();
            }
        },
        enabledRelationshipTypesLastUpdate: function() {
            // this is bobo but it works...screw you vue!!!
            if (this.view === 'crosswalk' && this.subview === 'crosswalkSource') {
                this.buildCrosswalkOptions();
            }
        },
        // this doesn't work...nor does a regular watcher on relevantExistingAlignmentsMap..wtf vue???
        // relevantExistingAlignmentsMap: {
        //     handler(val) {
        //         appLog("WATCH relevantExistingAlignmentsMap !!!!!!");
        //         if (this.view === 'crosswalk' && this.subview === 'crosswalkSource') {
        //             this.calculateSourceAlignmentCountByType();
        //         }
        //     },
        //     deep: true
        // },
        targetNodesToHighlight: function() {
            if (this.view === 'crosswalk' && this.subview === 'crosswalkTarget') {
                if (this.obj && this.targetNodesToHighlight.includes(this.obj.shortId())) {
                    this.crosswalkTargetClass = 'has-background-primary';
                } else this.crosswalkTargetClass = '';
            } else this.crosswalkTargetClass = '';
        },
        workingAlignmentsType: function(val) {
            // This was getting spammed a lot...added extra check
            if (val !== '' && (this.obj.shortId() === this.workingAlignmentsSource)) {
                this.$store.commit('crosswalk/sourceState', 'selectTargets');
                this.$store.commit('crosswalk/targetState', 'ready');
                this.$store.commit('crosswalk/populateWorkingAlignmentMap');
            }
        },
        checked: function() {
            // Select event propagates up multiple components.
            this.$emit('select', this.obj.shortId(), this.checked);
            // If this node has hidden children (not expanded), then emit a selet signal for those as well
            if (!this.childrenExpanded) {
                for (let child of this.hasChild) {
                    this.selectChild(child, this.checked);
                }
            }
            if (!this.checked) {
                this.unfocusHierarchyItem();
            }
        },
        selectAll: function() {
            this.checked = this.selectAll;
        },
        expandAll: function() {
            if (this.expandAll === true) {
                if (this.hasChild.length > 0) {
                    this.collapse = false;
                }
                this.childrenExpanded = true;
            } else {
                // Otherwise collapse all
                if (this.hasChild.length > 0) {
                    this.collapse = true;
                }
                this.childrenExpanded = false;
            }
        },
        parentChecked: function() {
            if (!this.newCompetency) {
                if (this.view === 'framework') {
                    if (this.propagateParentChecked === 'true') {
                        this.checked = this.parentChecked;
                    }
                } else {
                    this.checked = this.parentChecked;
                }
            }
        },
        arrowKey: function() {
            // If this is the only node selected and the arrow key changes, move item.
            if (this.view !== "crosswalk" && this.checked && this.selectedArray && this.selectedArray.length === 1) {
                let thingId = this.obj.shortId();
                let index = this.index;
                if (this.arrowKey === "ArrowLeft") {
                    this.moveLeft(thingId, index);
                } else if (this.arrowKey === "ArrowRight") {
                    this.moveRight(thingId, index);
                } else if (this.arrowKey === "ArrowUp") {
                    this.moveUp(thingId, index);
                } else if (this.arrowKey === "ArrowDown") {
                    this.moveDown(thingId, index);
                }
            }
        },
        cutId: function() {
            if (this.cutId === this.obj.shortId()) {
                // operation is permitted
                if (this.obj.type === "Competency" || (this.obj.type === "Concept" && this.canEditThing)) {
                    this.isItemCut = true;
                    this.$store.commit('editor/cutOrCopyContainerId', this.parent.shortId());
                } else {
                    this.$store.commit('editor/cutId', null);
                }
            } else {
                this.isItemCut = false;
            }
        },
        copyId: function() {
            if (this.copyId === this.obj.shortId()) {
                if (this.obj.type === "Competency" || (this.obj.type === "Concept" && this.canEditThing)) {
                    this.isItemCopied = true;
                    this.$store.commit('editor/cutOrCopyContainerId', this.parent.shortId());
                } else {
                    this.$store.commit('editor/copyId', null);
                }
            } else {
                this.isItemCopied = false;
            }
        },
        isItemFocused: function() {
            if (this.isItemFocused && ((this.copyId && this.copyId !== this.obj.shortId()) || (this.cutId && this.cutId !== this.obj.shortId())) &&
                (this.obj.type === "Competency" || (this.obj.type === "Concept" && this.canEditThing))) {
                this.canPaste = true;
                this.$store.commit('editor/nodeInFocus', this.obj.shortId());
            } else {
                this.canPaste = false;
                if (this.$store.getters['editor/nodeInFocus'] === this.obj.shortId() && !this.copyId && !this.cutId) {
                    this.$store.commit('editor/nodeInFocus', null);
                }
            }
        },
        paste: function() {
            var nodeToPasteUnder = this.$store.getters['editor/nodeInFocus'];
            if (this.paste && nodeToPasteUnder === this.obj.shortId() && (this.obj.type === "Competency" || (this.obj.type === "Concept" && this.canEditThing))) {
                this.move(this.cutId ? this.cutId : this.copyId, null, this.$store.getters['editor/cutOrCopyContainerId'], this.obj.shortId(), this.cutId !== null, 0);
                this.$store.commit('editor/cutId', null);
                this.$store.commit('editor/copyId', null);
                this.$store.commit('editor/paste', false);
                this.$store.commit('editor/cutOrCopyContainerId', null);
                this.$store.commit('editor/nodeInFocus', null);
            }
        },
        selectedArray: function() {
            if (this.selectedArray && this.selectedArray.length) {
                if (EcArray.has(this.selectedArray, this.obj.shortId())) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
            } else {
                this.checked = false;
            }
        }
    }
};
</script>

<style lang="scss">
    @import '@/scss/variables.scss';
</style>