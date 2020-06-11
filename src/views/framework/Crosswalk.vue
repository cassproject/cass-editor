<template>
    <div class="crosswalk section">
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': crosswalkSaveBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-3x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <div class="container is-fluid">
            <div class="crosswalk-column is-gapless is-paddiingless is-marginless is-multiline">
                <div class="crosswalk__steps">
                    <div
                        class="step-item"
                        :class="[{'complete': item.complete}, {'current': index === step}]"
                        v-for="(item, index) in steps"
                        :key="index">
                        <div
                            class="step-marker"
                            :class="[{'has-background-primary': index === step}, { 'has-background-success': step > index}, { 'has-background-medium': step < index}]">
                            <span
                                v-if="item.name === 'from'"
                                class="has-text-white">
                                A
                            </span>
                            <span
                                v-if="item.name === 'to'"
                                class="has-text-white">
                                B
                            </span>
                            <i
                                v-if="item.name === 'align'"
                                class="fa fa-network-wired" />
                            <i
                                v-if="item.name === 'review'"
                                class="fa fa-check" />
                        </div>
                        <p class="step-details">
                            <span
                                v-if="item.complete"
                                class="icon has-text-success">
                                <i class="fa fa-check" />
                            </span>
                            <span :class="[{'has-text-primary has-text-weight-bold': index === step}, { 'has-text-success': step > index}, { 'has-text-medium': step < index}]">
                                {{ item.description }}
                            </span>
                        </p>
                    </div>
                </div>
                <div
                    v-if="step===2"
                    class="crosswalk__buttons">
                    <div class="container">
                        <h2 class="title is-size-1">
                            Crosswalk:
                            <span
                                v-if="alignmentsToSave.length > 0"
                                class="is-size-2 is-outlined is-dark">
                                {{ alignmentsToSave.length }} alignment<span v-if="alignmentsToSave.length >1">s</span> ready to save
                            </span>
                            <span
                                v-if="alignmentsToDelete.length > 0"
                                class="button is-outlined is-pulled-right  is-warning">
                                {{ alignmentsToDelete.length }} alignments to remove
                            </span>

                            <span
                                v-if="workingAlignmentsChanged"
                                @click="applyWorkingAlignmentChanges"
                                class="button is-pulled-right is-outlined is-primary">
                                <span class="icon">
                                    <i class="fa fa-plus" />
                                </span>
                                <span>
                                    apply alignments
                                </span>
                            </span>
                            <span
                                v-if="(alignmentsToSave.length > 0 || alignmentsToDelete.length > 0) && sourceState === 'ready'"
                                @click="goToSummaryAndSave"
                                class="button  is-pulled-right is-outlined is-primary">
                                <span class="icon">
                                    <i class="fa fa-arrow-right" />
                                </span>
                                <span>
                                    save & review
                                </span>
                            </span>
                        </h2>
                    </div>
                </div>
                <div
                    class="crosswalk__search column is-6 is-offset-3"
                    v-if="step < 2">
                    <div class="container">
                        <SearchBar
                            view="crosswalk"
                            filterSet="basic"
                            searchType="framework" />
                    </div>
                </div>
                <!-- step framework list for selecting a & b -->
                <transition
                    name="slide-fade">
                    <div
                        v-if="step === 0"
                        class="column is-12 crosswalk__list">
                        <div class="container">
                            <List
                                :type="type"
                                :repo="repo"
                                :view="view"
                                :click="frameworkClickSource"
                                :searchOptions="searchOptions"
                                :paramObj="paramObj"
                                :disallowEdits="true" />
                        </div>
                    </div>
                </transition>
                <!-- step framework list for selecting a & b -->
                <transition
                    v-if="step === 1"
                    name="slide-fade">
                    <div
                        class="column is-12 crosswalk__list">
                        <div class="container">
                            <List
                                :type="type"
                                :repo="repo"
                                :view="view"
                                :click="frameworkClickTarget"
                                :searchOptions="searchOptions"
                                :paramObj="paramObj"
                                :disallowEdits="true" />
                        </div>
                    </div>
                </transition>
                <!-- double hierarchy view -->
                <transition
                    name="slide-fade">
                    <div
                        v-if="step === 2"
                        class="column is-12 crosswalk__double-hierarchy">
                        <div class="columns is-mobile crosswalk__double-heirarchy__column">
                            <div
                                class="column is-6 has-text-centered"
                                v-if="!crosswalkSourceLoaded">
                                <span class="icon is-large">
                                    <i class="fa fa-spinner fa-2x fa-pulse" />
                                </span>
                            </div>
                            <div
                                v-show="crosswalkSourceLoaded"
                                class="column is-6">
                                <Hierarchy
                                    :container="frameworkSource"
                                    view="crosswalk"
                                    subview="crosswalkSource"
                                    containerType="Framework"
                                    containerTypeGet="EcFramework"
                                    containerNodeProperty="competency"
                                    containerEdgeProperty="relation"
                                    nodeType="EcCompetency"
                                    edgeType="EcAlignment"
                                    edgeRelationProperty="relationType"
                                    edgeRelationLiteral="narrows"
                                    edgeSourceProperty="source"
                                    edgeTargetProperty="target"
                                    :viewOnly="queryParams.view === 'true'"
                                    :repo="repo"
                                    :queryParams="queryParams"
                                    :exportOptions="[]"
                                    :highlightList="null"
                                    @searchThings="handleSearch($event)"
                                    @doneLoadingNodes="prepareToLoadCrosswalkTarget"
                                    properties="primary" />
                            </div>
                            <div
                                class="column is-6 has-text-centered"
                                v-if="!loadCrosswalkTarget">
                                <span class="icon is-large">
                                    <i class="fa fa-spinner fa-2x fa-pulse" />
                                </span>
                            </div>
                            <div
                                class="column is-6"
                                v-if="loadCrosswalkTarget">
                                <Hierarchy
                                    :container="frameworkTarget"
                                    view="crosswalk"
                                    subview="crosswalkTarget"
                                    containerType="Framework"
                                    containerTypeGet="EcFramework"
                                    containerNodeProperty="competency"
                                    containerEdgeProperty="relation"
                                    nodeType="EcCompetency"
                                    edgeType="EcAlignment"
                                    edgeRelationProperty="relationType"
                                    edgeRelationLiteral="narrows"
                                    edgeSourceProperty="source"
                                    edgeTargetProperty="target"
                                    :viewOnly="queryParams.view === 'true'"
                                    :repo="repo"
                                    :queryParams="queryParams"
                                    :exportOptions="[]"
                                    :highlightList="null"
                                    @searchThings="handleSearch($event)"
                                    properties="primary" />
                            </div>
                        </div>
                    </div>
                </transition>
                <transition
                    v-if="step === 3"
                    name="slide-fade">
                    <div class="is-narrow crosswalk__summary">
                        <div
                            class="box"
                            v-if="!alignmentsSaved">
                            <div class="section">
                                <h4 class="title is-size-2 has-text-centered">
                                    Crosswalk Alignment Summary
                                </h4>
                                <p
                                    class="has-text-centered"
                                    v-if="alignmentsToSave.length > 0">
                                    {{ alignmentsToSave.length }} alignment<span v-if="alignmentsToSave.length">s</span> ready to add
                                </p>
                                <p v-if="alignmentsToDelete.length > 0">
                                    {{ alignmentsToDelete.length }} Number of alignment<span v-if="alignmentsToDelete.length">s</span> to remove
                                </p>
                            </div>
                            <div class="section">
                                <label class="label is-size-3 has-text-centered">
                                    Choose which framework to save to
                                </label>
                                <div
                                    v-if="canSaveToSourceFramework"
                                    class="field has-text-centered">
                                    <input
                                        title="You do not have permission to save to this framework"
                                        :disabled="!canSaveToSourceFramework"
                                        v-model="saveToSourceFramework"
                                        class="is-checkradio"
                                        id="saveToSourceFramework"
                                        type="checkbox"
                                        name="saveToSourceFramework">
                                    <label
                                        class="label"
                                        for="saveToSourceFramework">{{ frameworkSource.getName() }}</label>
                                </div>
                                <div
                                    v-if="canSaveToTargetFramework"
                                    class="field has-text-centered">
                                    <input
                                        title="You do not have permission to save to this framework"
                                        :disabled="!canSaveToTargetFramework"
                                        v-model="saveToTargetFramework"
                                        class="is-checkradio"
                                        id="saveToTargetFramework"
                                        type="checkbox"
                                        name="saveToTargetFramework">
                                    <label
                                        class="label"
                                        for="saveToTargetFramework">{{ frameworkTarget.getName() }}</label>
                                </div>
                            </div>
                            <div
                                style="margin-top: 3rem"
                                class="buttons is-spaced"
                                v-if="saveToSourceFramework || saveToTargetFramework">
                                <div
                                    class="button is-outlined is-dark">
                                    <span class="icon">
                                        <i class="fa fa-arrow-left" />
                                    </span>
                                    <span>
                                        continue editing
                                    </span>
                                </div>
                                <div
                                    class="button is-outlined is-primary"
                                    @click="saveAlignments">
                                    <span class="icon">
                                        <i class="fa fa-save" />
                                    </span>
                                    <span>
                                        save alignments
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="container has-text-centered"
                            v-if="alignmentsSaved">
                            <h4><i class="fa fa-check" /> Alignments saved</h4>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import List from '@/lode/components/lode/List.vue';
import Hierarchy from '@/lode/components/lode/Hierarchy.vue';
import SearchBar from '@/components/framework/SearchBar.vue';
import common from '@/mixins/common.js';
import {cassUtil} from '@/mixins/cassUtil.js';

export default {
    name: 'FrameworkCrosswalk',
    data: () => ({
        view: 'crosswalk',
        loadCrosswalkTarget: false,
        crosswalkSourceLoaded: false,
        canSaveToSourceFramework: false,
        saveToSourceFramework: false,
        canSaveToTargetFramework: false,
        saveToTargetFramework: false,
        alignmentsSaved: false,
        crosswalkSaveBusy: false,
        numAlignmentsToDelete: 0,
        numAlignmentsDeleted: 0,
        sourceFrameworkSaving: null,
        targetFrameworkSaving: null,
        repo: window.repo,
        steps: [
            {
                name: 'from',
                description: 'select source',
                complete: false
            },
            {
                name: 'to',
                description: 'select target',
                complete: false
            },
            {
                name: 'align',
                description: 'align frameworks',
                complete: false
            },
            {
                name: 'review',
                description: 'save & review',
                complete: false
            }
        ],
        sortBy: "name.keyword",
        showMine: false
    }),
    mixins: [common, cassUtil],
    props: {
        queryParams: {
            type: Object,
            default: () => { return {}; }
        }
    },
    components: {
        List,
        SearchBar,
        Hierarchy
    },
    mounted() {
        this.$store.commit('crosswalk/resetCrosswalk');
        this.$store.commit('crosswalk/resetCrosswalkFrameworks');
    },
    beforeDestroy: function() {
        this.$store.commit('crosswalk/resetCrosswalk');
        this.$store.commit('crosswalk/resetCrosswalkFrameworks');
    },
    watch: {
        step: function(val) {
            console.log("step, ", val);
            console.log("steps, ", this.steps);
            if (val === 0) {
                this.steps[0].complete = false;
                this.steps[1].complete = false;
                this.steps[2].complete = false;
                this.steps[3].complete = false;
                this.$store.commit('crosswalk/resetFrameworkSourceRelationships');
                this.$store.commit('crosswalk/resetCrosswalkAlignmentsAndState');
            } else if (val === 1) {
                this.steps[0].complete = true;
                this.steps[1].complete = false;
                this.steps[2].complete = false;
                this.steps[3].complete = false;
                this.$store.commit('crosswalk/resetFrameworkTargetRelationships');
                this.$store.commit('crosswalk/resetCrosswalkAlignmentsAndState');
            } else if (val === 2) {
                this.steps[0].complete = true;
                this.steps[1].complete = true;
                this.steps[2].complete = false;
                this.steps[3].complete = false;
            } else if (val === 3) {
                this.steps[0].complete = true;
                this.steps[1].complete = true;
                this.steps[2].complete = true;
                this.steps[3].complete = false;
            } else if (val === 4) {
                this.steps[0].complete = true;
                this.steps[1].complete = true;
                this.steps[2].complete = true;
                this.steps[3].complete = true;
            }
        },
        sortResults: function() {
            if (this.sortResults.id === "lastEdited") {
                this.sortBy = "schema:dateModified";
            } else {
                this.sortBy = "name.keyword";
            }
        },
        filteredQuickFilters: function() {
            this.showMine = false;
            for (var i = 0; i < this.filteredQuickFilters.length; i++) {
                if (this.filteredQuickFilters[i].id === "ownedByMe") {
                    this.showMine = true;
                }
            }
        }
    },
    computed: {
        type: function() {
            return "Framework";
        },
        paramObj: function() {
            let obj = {};
            obj.size = 20;
            var order = (this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword") ? "asc" : "desc";
            obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "long",  "missing" : "_last"}} ]';
            if (this.queryParams && this.queryParams.show === 'mine') {
                obj.ownership = 'me';
            }
            return obj;
        },
        searchOptions: function() {
            let search = "";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.showMine || (this.queryParams && this.queryParams.show === "mine")) {
                if (EcIdentityManager.ids.length > 0) {
                    search += " AND (";
                    for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                        if (i !== 0) {
                            search += " OR ";
                        }
                        var id = EcIdentityManager.ids[i];
                        search += "@owner:\"" + id.ppk.toPk().toPem() + "\"";
                    }
                    search += ")";
                }
            }
            return search;
        },
        filteredQuickFilters: function() {
            if (this.quickFilters) {
                let filterValues = this.quickFilters.filter(item => item.checked === true);
                console.log('filtered value', filterValues);
                return filterValues;
            } else {
                return [];
            }
        },
        ...mapState({
            step: state => state.crosswalk.step,
            frameworkSearchTerm: state => state.app.frameworkSearchTerm,
            showRightAside: state => state.app.showRightAside,
            frameworkSource: state => state.crosswalk.frameworkSource,
            frameworkTarget: state => state.crosswalk.frameworkTarget,
            frameworkSourceRelationships: state => state.crosswalk.frameworkSourceRelationships,
            frameworkTargetRelationships: state => state.crosswalk.frameworkTargetRelationships,
            relevantExistingAlignmentsMap: state => state.crosswalk.relevantExistingAlignmentsMap,
            workingAlignmentsSource: state => state.crosswalk.workingAlignmentsMap.source,
            workingAlignmentsTargets: state => state.crosswalk.workingAlignmentsMap.targets,
            workingAlignmentsInitialTargets: state => state.crosswalk.workingAlignmentsMap.initialTargets,
            workingAlignmentsRemovedTargets: state => state.crosswalk.workingAlignmentsMap.removedTargets,
            workingAlignmentsChanged: state => state.crosswalk.workingAlignmentsMap.changed,
            workingAlignmentsType: state => state.crosswalk.workingAlignmentsMap.type,
            workingAlignmentsMap: state => state.crosswalk.workingAlignmentsMap,
            alignmentsToSave: state => state.crosswalk.alignmentsToSave,
            alignmentsToDelete: state => state.crosswalk.alignmentsToDelete,
            targetState: state => state.crosswalk.targetState,
            sourceState: state => state.crosswalk.sourceState,
            targetNodesToHighlight: state => state.crosswalk.targetNodesToHighlight
        }),
        ...mapGetters({
            sortResults: 'app/sortResults',
            quickFilters: 'app/quickFilters'
        })
    },
    methods: {
        determineAbilityToSaveToFrameworks: function() {
            if (this.isObjectOwnerless(this.frameworkSource) || this.doesAnyIdentityOwnObject(this.frameworkSource)) {
                this.canSaveToSourceFramework = true;
                this.saveToSourceFramework = true;
            } else {
                this.canSaveToSourceFramework = false;
                this.saveToSourceFramework = false;
            }
            if (this.isObjectOwnerless(this.frameworkTarget) || this.doesAnyIdentityOwnObject(this.frameworkTarget)) {
                this.canSaveToTargetFramework = true;
                this.saveToTargetFramework = true;
            } else {
                this.canSaveToTargetFramework = false;
                this.saveToTargetFramework = false;
            }
        },
        goToSummaryAndSave: function() {
            this.alignmentsSaved = false;
            this.crosswalkSaveBusy = false;
            this.determineAbilityToSaveToFrameworks();
            this.$store.commit('crosswalk/step', 3);
        },
        addRelationshipsToFrameworks: function() {
            let ats = this.alignmentsToSave;
            for (let ata of ats) {
                if (this.saveToSourceFramework) this.sourceFrameworkSaving.addRelation(ata.shortId());
                if (this.saveToTargetFramework) this.targetFrameworkSaving.addRelation(ata.shortId());
            }
        },
        removeRelationshipsFromFrameworks: function() {
            let atd = this.alignmentsToDelete;
            for (let atr of atd) {
                if (atr.id && atr.shortId()) {
                    this.sourceFrameworkSaving.removeRelation(atr.shortId());
                    this.targetFrameworkSaving.removeRelation(atr.shortId());
                }
            }
        },
        generateRelationId(relType, sourceId, targetId) {
            return 'crswlk' + '-' + Date.now() + '---' + this.genPartialIdPiece(sourceId) + '-' + relType + '-' + this.genPartialIdPiece(targetId);
        },
        addIdsAndOwnersToNewRelationships: function() {
            let ats = this.alignmentsToSave;
            for (let ata of ats) {
                ata.assignId(window.repo.selectedServer, this.generateRelationId(ata.relationType, ata.source, ata.target));
                console.log("New crosswalk alignment: " + ata.shortId());
                this.addAllIdentityPksAsOwners(ata);
            }
            this.$store.commit('crosswalk/alignmentsToSave', ats);
        },
        handleSaveTargetFrameworkSuccess: function() {
            this.alignmentsSaved = true;
            this.crosswalkSaveBusy = false;
        },
        handleSaveTargetFrameworkFailed: function() {
            console.log("Failed to save target framework for crosswalk: " + msg);
            this.crosswalkSaveBusy = false;
        },
        saveTargetFramework: function() {
            if (this.isObjectOwnerless(this.targetFrameworkSaving) || this.doesAnyIdentityOwnObject(this.targetFrameworkSaving)) {
                console.log("Saving target framework for crosswalk...");
                this.targetFrameworkSaving.save(this.handleSaveTargetFrameworkSuccess, this.handleSaveTargetFrameworkFailed, this.repo);
            } else {
                this.alignmentsSaved = true;
                this.crosswalkSaveBusy = false;
            }
        },
        handleSaveSourceFrameworkFailed: function(msg) {
            console.log("Failed to save source framework for crosswalk: " + msg);
            this.crosswalkSaveBusy = false;
        },
        saveSourceFrameworkAndGo: function() {
            if (this.isObjectOwnerless(this.sourceFrameworkSaving) || this.doesAnyIdentityOwnObject(this.sourceFrameworkSaving)) {
                console.log("Saving source framework for crosswalk...");
                this.sourceFrameworkSaving.save(this.saveTargetFramework, this.handleSaveSourceFrameworkFailed, this.repo);
            } else this.saveTargetFramework();
        },
        saveFrameworks: function() {
            console.log("Saving frameworks for crosswalk...");
            this.saveSourceFrameworkAndGo();
        },
        checkDeleteAlignments: function() {
            this.numAlignmentsDeleted += 1;
            if (this.numAlignmentsDeleted >= this.numAlignmentsToDelete) this.saveFrameworks();
            else this.deleteAlignmentToRemove(this.numAlignmentsDeleted);
        },
        handleDeleteAlignmentFailed: function(msg) {
            console.log("Failed to remove crosswalk alignment: " + msg);
            this.checkDeleteAlignments();
        },
        deleteAlignmentToRemove: function(atrIdx) {
            console.log("Deleting crosswalk alignment to remove: " + atrIdx);
            let atr = this.alignmentsToDelete[atrIdx];
            this.repo.deleteRegistered(atr, this.checkDeleteAlignments, this.handleDeleteAlignmentFailed);
        },
        deleteAlignmentsToRemoveAndGo: function() {
            if (this.alignmentsToDelete.length > 0) {
                console.log("Deleting crosswalk alignments to remove...");
                this.deleteAlignmentToRemove(0);
            } else this.saveFrameworks();
        },
        handleSaveAlignmentsToAddSuccess: function() {
            console.log("New crosswalk alignments added");
            this.deleteAlignmentsToRemoveAndGo();
        },
        handleSaveAlignmentsToAddFailed: function(msg) {
            console.log("Failed to add crosswalk alignments: " + msg);
            this.crosswalkSaveBusy = false;
        },
        saveAlignmentsToAddAndGo: function() {
            let ats = this.alignmentsToSave;
            if (ats.length > 0) {
                console.log("Saving crosswalk alignments to add...");
                this.repo.multiput(ats, this.handleSaveAlignmentsToAddSuccess, this.handleSaveAlignmentsToAddFailed);
            } else this.deleteAlignmentsToRemoveAndGo();
        },
        saveAlignments: function() {
            if (this.saveToSourceFramework || this.saveToTargetFramework) {
                this.crosswalkSaveBusy = true;
                this.numAlignmentsToDelete = this.alignmentsToDelete.length;
                this.numAlignmentsDeleted = 0;
                this.sourceFrameworkSaving = this.frameworkSource;
                this.targetFrameworkSaving = this.frameworkTarget;
                this.addIdsAndOwnersToNewRelationships();
                this.addRelationshipsToFrameworks();
                this.removeRelationshipsFromFrameworks();
                this.saveAlignmentsToAddAndGo();
            } else {
                this.alignmentsSaved = true;
            }
        },
        prepareToLoadCrosswalkTarget: function() {
            this.crosswalkSourceLoaded = true;
            setTimeout(() => {
                this.loadCrosswalkTarget = true;
            }, 2000);
        },
        getEcAlignmentObjectFromRelevantAlignmentsMap(source, target, type) {
            let ret = null;
            if (this.relevantExistingAlignmentsMap[source]) {
                if (this.relevantExistingAlignmentsMap[source][type]) {
                    if (this.relevantExistingAlignmentsMap[source][type][target]) {
                        ret = this.relevantExistingAlignmentsMap[source][type][target];
                    }
                }
            }
            return ret;
        },
        applyRemovedWorkingAlignmentChanges: function() {
            for (let wart of this.workingAlignmentsRemovedTargets) {
                let ecaObj = this.getEcAlignmentObjectFromRelevantAlignmentsMap(this.workingAlignmentsSource, wart, this.workingAlignmentsType);
                if (ecaObj && ecaObj.id && ecaObj.id.trim() !== '') this.$store.commit('crosswalk/appendAlignmentsToDelete', ecaObj);
                let alignProps = {};
                alignProps.source = this.workingAlignmentsSource;
                alignProps.target = wart;
                alignProps.type = this.workingAlignmentsType;
                this.$store.commit('crosswalk/removeAlignmentFromRelevantAlignmentsMap', alignProps);
                this.$store.commit('crosswalk/removeAlignmentFromAlignmentsToSave', alignProps);
            }
        },
        getAndRemoveEcAlignmentObjectFromAlignmentsToDelete(alignProps) {
            let ret = null;
            for (let a of this.alignmentsToDelete) {
                if (a.source === alignProps.source && a.target === alignProps.target && a.relationType === alignProps.type) {
                    ret = a;
                }
            }
            if (ret) this.$store.commit('crosswalk/removeAlignmentFromAlignmentsToDelete', alignProps);
            return ret;
        },
        genPartialIdPiece(compId) {
            if (compId.lastIndexOf("/") <= -1) return compId;
            return compId.substr(compId.lastIndexOf("/") + 1);
        },
        generateAlignmentObjectFromAlignProps(alignProps) {
            let eca = new EcAlignment();
            this.addAllIdentityPksAsOwners(eca);
            // leave the id blank for now
            // eca.assignId(window.repo.selectedServer, this.generateRelationId(alignProps.type, alignProps.source, alignProps.target));
            eca.target = alignProps.target;
            eca.source = alignProps.source;
            eca.relationType = alignProps.type;
            return eca;
        },
        applyAddedWorkingAlignmentChanges: function() {
            let newTargets = this.workingAlignmentsTargets.filter(x => !this.workingAlignmentsInitialTargets.includes(x));
            for (let nt of newTargets) {
                let alignProps = {};
                alignProps.source = this.workingAlignmentsSource;
                alignProps.target = nt;
                alignProps.type = this.workingAlignmentsType;
                let ecaObj = this.getAndRemoveEcAlignmentObjectFromAlignmentsToDelete(alignProps);
                if (!ecaObj) ecaObj = this.generateAlignmentObjectFromAlignProps(alignProps);
                if (!ecaObj.id || ecaObj.id.trim() === '') this.$store.commit('crosswalk/appendAlignmentsToSave', ecaObj);
                this.$store.commit('crosswalk/addAlignmentToRelevantAlignmentsMap', ecaObj);
            }
        },
        applyWorkingAlignmentChanges: function() {
            if (this.workingAlignmentsChanged) {
                this.applyRemovedWorkingAlignmentChanges();
                this.applyAddedWorkingAlignmentChanges();
                this.$store.commit('crosswalk/relevantExistingAlignmentsMapLastUpdate', Date.now());
                this.$store.commit('crosswalk/populateAlignedCompetenciesList');
            }
            this.$store.commit('crosswalk/sourceState', 'ready');
            this.$store.commit('crosswalk/resetWorkingAlignmentsMap');
        },
        addRelationshipListToRelevantAlignments(relArray, processedRelationshipIds, relAlignmentMap) {
            for (let r of relArray) {
                if (!processedRelationshipIds.includes(r.shortId)) {
                    processedRelationshipIds.push(r.shortId());
                    if (this.frameworkSource.competency.includes(r.source) && this.frameworkTarget.competency.includes(r.target)) {
                        if (!relAlignmentMap[r.source]) relAlignmentMap[r.source] = {};
                        if (!relAlignmentMap[r.source][r.relationType]) relAlignmentMap[r.source][r.relationType] = {};
                        if (!relAlignmentMap[r.source][r.relationType][r.target]) relAlignmentMap[r.source][r.relationType][r.target] = r;
                    }
                }
            }
        },
        buildRelevantAlignmentsMap() {
            let processedRelationshipIds = [];
            let relAlignmentMap = {};
            if (this.frameworkSourceRelationships && this.frameworkTargetRelationships) {
                this.addRelationshipListToRelevantAlignments(this.frameworkSourceRelationships, processedRelationshipIds, relAlignmentMap);
                this.addRelationshipListToRelevantAlignments(this.frameworkTargetRelationships, processedRelationshipIds, relAlignmentMap);
            }
            this.$store.commit('crosswalk/relevantExistingAlignmentsMap', relAlignmentMap);
            this.$store.commit('crosswalk/populateAlignedCompetenciesList');
        },
        handleBuildFrameworkTargetRelationshipsSuccess(ecrlda) {
            console.log("Building framework target relationship list...");
            this.$store.commit('crosswalk/frameworkTargetRelationships', this.buildEcAlignmentsFromRemoteLinkedData(ecrlda));
            this.buildRelevantAlignmentsMap();
            this.$store.commit('crosswalk/step', 2);
        },
        buildFrameworkTargetRelationships() {
            let repo = window.repo;
            if (this.frameworkTarget.relation && this.frameworkTarget.relation.length > 0) {
                let me = this;
                repo.multiget(this.frameworkTarget.relation,
                    me.handleBuildFrameworkTargetRelationshipsSuccess,
                    function(msg) {
                        console.error("buildFrameworkTargetRelationships failed: " + msg);
                    }
                );
            } else this.handleBuildFrameworkTargetRelationshipsSuccess([]);
        },
        handleBuildFrameworkSourceRelationshipsSuccess(ecrlda) {
            console.log("Building framework source relationship list...");
            this.$store.commit('crosswalk/frameworkSourceRelationships', this.buildEcAlignmentsFromRemoteLinkedData(ecrlda));
            this.buildRelevantAlignmentsMap();
            if (this.frameworkTarget) this.$store.commit('crosswalk/step', 2);
            else this.$store.commit('crosswalk/step', 1);
        },
        buildFrameworkSourceRelationships() {
            let repo = window.repo;
            if (this.frameworkSource.relation && this.frameworkSource.relation.length > 0) {
                let me = this;
                repo.multiget(this.frameworkSource.relation,
                    me.handleBuildFrameworkSourceRelationshipsSuccess,
                    function(msg) {
                        console.error("buildFrameworkSourceRelationships failed: " + msg);
                    }
                );
            } else this.handleBuildFrameworkSourceRelationshipsSuccess([]);
        },
        frameworkClickSource: function(framework) {
            var me = this;
            this.$store.commit('crosswalk/resetFrameworkSourceRelationships');
            /* Should we exclude framework A from framework B options */
            EcFramework.get(framework.id, function(success) {
                me.$store.commit('crosswalk/frameworkSource', success);
                me.buildFrameworkSourceRelationships();
            }, console.error);
            this.$store.commit('app/searchTerm', '');
        },
        frameworkClickTarget: function(framework) {
            var me = this;
            this.$store.commit('crosswalk/resetFrameworkTargetRelationships');
            /* Should we exclude framework A from framework B options */
            EcFramework.get(framework.id, function(success) {
                me.$store.commit('crosswalk/frameworkTarget', success);
                me.buildFrameworkTargetRelationships();
            }, console.error);
            this.$store.commit('app/searchTerm', '');
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/crosswalk.scss';
    h4 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
</style>

