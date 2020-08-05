<template>
    <div
        id="crosswalk"
        class="crosswalk section has-background-white">
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': crosswalkSaveBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <div class="container is-fluid">
            <div class="crosswalk-column is-gapless is-paddiingless is-marginless is-multiline">
                <!-- steps -->
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
                        <p class="step-details is-hidden-touch">
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
                <!-- buttons -->
                <div
                    v-if="step===2"
                    class="crosswalk__buttons">
                    <div class="container">
                        <h2 class="title is-size-1">
                            Crosswalk:
                            <span
                                v-if="alignmentsToSave.length > 0"
                                class="is-size-6 is-dark tag">
                                adding {{ alignmentsToSave.length }}
                            </span>
                            <span
                                v-if="alignmentsToDelete.length > 0"
                                class="tag is-size-6 is-dark">
                                removing {{ alignmentsToDelete.length }}
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
                <!-- search -->
                <div
                    class="crosswalk__search column is-8 is-offset-2"
                    v-if="step < 2 ">
                    <div class="container">
                        <SearchBar
                            view="crosswalk"
                            filterSet="basic"
                            :ownedByMe="setSearchToOnlyShowOwned"
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
                                :disallowEdits="true"
                                :filterToEditable="true" />
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
                                class="column is-6 source">
                                <Thing
                                    :obj="frameworkSource"
                                    :repo="repo"
                                    :view="view" />
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
                                class="column is-6 target"
                                v-if="loadCrosswalkTarget">
                                <Thing
                                    :obj="frameworkTarget"
                                    :repo="repo"
                                    :view="view" />
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
                                    {{ alignmentsToSave.length }} alignment<span v-if="alignmentsToSave.length > 1">s</span> ready to add
                                </p>
                                <p
                                    class="has-text-centered"
                                    v-if="alignmentsToDelete.length > 0">
                                    {{ alignmentsToDelete.length }} alignment<span v-if="alignmentsToDelete.length > 1">s</span> ready to remove
                                </p>
                            </div>
                            <div class="section">
                                <h4 class="title is-size-2 has-text-centered">
                                    Choose which framework to apply alignments
                                </h4>
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
                                    class="button is-outlined is-dark"
                                    @click="returnToCrosswalkEditing">
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
import Thing from '@/lode/components/lode/Thing.vue';
import SearchBar from '@/components/framework/SearchBar.vue';
import common from '@/mixins/common.js';
import {cassUtil} from '@/mixins/cassUtil.js';
import t3Profile from '@/mixins/t3Profile.js';
import tlaProfile from '@/mixins/tlaProfile.js';
import ctdlProfile from '@/mixins/ctdlasnProfile.js';

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
    mixins: [common, cassUtil, t3Profile, tlaProfile, ctdlProfile],
    props: {
        queryParams: {
            type: Object,
            default: () => { return {}; }
        }
    },
    components: {
        List,
        SearchBar,
        Hierarchy,
        Thing
    },
    mounted() {
        this.$store.commit('crosswalk/resetCrosswalk');
        this.$store.commit('crosswalk/resetCrosswalkFrameworks');
        this.$store.commit('app/searchTerm', "");
    },
    beforeDestroy: function() {
        this.$store.commit('crosswalk/resetCrosswalk');
        this.$store.commit('crosswalk/resetCrosswalkFrameworks');
        this.$store.commit('app/clearSearchFilters');
        this.$store.commit('app/searchTerm', "");
    },
    watch: {
        step: function(val) {
            appLog("step, ", val);
            appLog("steps, ", this.steps);
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
        queryParamsComputed: function() {
            return this.$store.getters['editor/queryParams'];
        },
        setSearchToOnlyShowOwned: function() {
            if (this.step === 0) {
                return true;
            } else {
                return false;
            }
        },
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
                        search += "\\*owner:\"" + id.ppk.toPk().toPem() + "\"";
                    }
                    search += ")";
                }
            }
            return search;
        },
        filteredQuickFilters: function() {
            if (this.quickFilters) {
                let filterValues = this.quickFilters.filter(item => item.checked === true);
                appLog('filtered value', filterValues);
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
            targetNodesToHighlight: state => state.crosswalk.targetNodesToHighlight,
            enabledRelationshipTypes: state => state.crosswalk.enabledRelationshipTypes
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
        returnToCrosswalkEditing: function() {
            this.$store.commit('crosswalk/step', 2);
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
                appLog("New crosswalk alignment: " + ata.shortId());
                this.addAllIdentityPksAsOwners(ata);
            }
            this.$store.commit('crosswalk/alignmentsToSave', ats);
        },
        handleSaveTargetFrameworkSuccess: function() {
            this.alignmentsSaved = true;
            this.crosswalkSaveBusy = false;
        },
        handleSaveTargetFrameworkFailed: function() {
            appLog("Failed to save target framework for crosswalk: " + msg);
            this.crosswalkSaveBusy = false;
        },
        saveTargetFramework: function() {
            if (this.isObjectOwnerless(this.targetFrameworkSaving) || this.doesAnyIdentityOwnObject(this.targetFrameworkSaving)) {
                appLog("Saving target framework for crosswalk...");
                this.targetFrameworkSaving.save(this.handleSaveTargetFrameworkSuccess, this.handleSaveTargetFrameworkFailed, this.repo);
            } else {
                this.alignmentsSaved = true;
                this.crosswalkSaveBusy = false;
            }
        },
        handleSaveSourceFrameworkFailed: function(msg) {
            appLog("Failed to save source framework for crosswalk: " + msg);
            this.crosswalkSaveBusy = false;
        },
        saveSourceFrameworkAndGo: function() {
            if (this.isObjectOwnerless(this.sourceFrameworkSaving) || this.doesAnyIdentityOwnObject(this.sourceFrameworkSaving)) {
                appLog("Saving source framework for crosswalk...");
                this.sourceFrameworkSaving.save(this.saveTargetFramework, this.handleSaveSourceFrameworkFailed, this.repo);
            } else this.saveTargetFramework();
        },
        saveFrameworks: function() {
            appLog("Saving frameworks for crosswalk...");
            this.saveSourceFrameworkAndGo();
        },
        checkDeleteAlignments: function() {
            this.numAlignmentsDeleted += 1;
            if (this.numAlignmentsDeleted >= this.numAlignmentsToDelete) this.saveFrameworks();
            else this.deleteAlignmentToRemove(this.numAlignmentsDeleted);
        },
        handleDeleteAlignmentFailed: function(msg) {
            appLog("Failed to remove crosswalk alignment: " + msg);
            this.checkDeleteAlignments();
        },
        deleteAlignmentToRemove: function(atrIdx) {
            appLog("Deleting crosswalk alignment to remove: " + atrIdx);
            let atr = this.alignmentsToDelete[atrIdx];
            this.repo.deleteRegistered(atr, this.checkDeleteAlignments, this.handleDeleteAlignmentFailed);
        },
        deleteAlignmentsToRemoveAndGo: function() {
            if (this.alignmentsToDelete.length > 0) {
                appLog("Deleting crosswalk alignments to remove...");
                this.deleteAlignmentToRemove(0);
            } else this.saveFrameworks();
        },
        handleSaveAlignmentsToAddSuccess: function() {
            appLog("New crosswalk alignments added");
            this.deleteAlignmentsToRemoveAndGo();
        },
        handleSaveAlignmentsToAddFailed: function(msg) {
            appLog("Failed to add crosswalk alignments: " + msg);
            this.crosswalkSaveBusy = false;
        },
        saveAlignmentsToAddAndGo: function() {
            let ats = this.alignmentsToSave;
            if (ats.length > 0) {
                appLog("Saving crosswalk alignments to add...");
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
            appLog("Building framework target relationship list...");
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
                        appError("buildFrameworkTargetRelationships failed: " + msg);
                    }
                );
            } else this.handleBuildFrameworkTargetRelationshipsSuccess([]);
        },
        handleBuildFrameworkSourceRelationshipsSuccess(ecrlda) {
            appLog("Building framework source relationship list...");
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
                        appError("buildFrameworkSourceRelationships failed: " + msg);
                    }
                );
            } else this.handleBuildFrameworkSourceRelationshipsSuccess([]);
        },
        getLabelForRelationship: function(relObject, defaultLabel) {
            try {
                if (relObject && relObject["http://www.w3.org/2000/01/rdf-schema#label"] && relObject["http://www.w3.org/2000/01/rdf-schema#label"][0] &&
                    relObject["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"]) {
                    return relObject["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                } else return defaultLabel;
            } catch (e) {
                return defaultLabel;
            }
        },
        getFallbackEnabledRelationshipTypes: function() {
            appLog("Returning fallback relationship types for crosswalk");
            let fallbackRelTypes = [];
            fallbackRelTypes.push({relationship: 'narrows', label: 'narrows'});
            fallbackRelTypes.push({relationship: 'broadens', label: 'broadens'});
            fallbackRelTypes.push({relationship: 'isEquivalentTo', label: 'is equivalent to'});
            fallbackRelTypes.push({relationship: 'desires', label: 'desires'});
            fallbackRelTypes.push({relationship: 'requires', label: 'requires'});
            fallbackRelTypes.push({relationship: 'isRelatedTo', label: 'is related to'});
            return fallbackRelTypes;
        },
        getEnabledRelationshipTypesFromObject: function(relationshipContainerObj) {
            try {
                if (relationshipContainerObj) {
                    appLog("Determining relationship types for crosswalk");
                    let enabledRelTypes = [];
                    if (relationshipContainerObj.isEnabledBy) enabledRelTypes.push({relationship: 'isEnabledBy', label: this.getLabelForRelationship(relationshipContainerObj.isEnabledBy, 'is enabled by')});
                    if (relationshipContainerObj.requires) enabledRelTypes.push({relationship: 'requires', label: this.getLabelForRelationship(relationshipContainerObj.requires, 'requires')});
                    if (relationshipContainerObj.desires) enabledRelTypes.push({relationship: 'desires', label: this.getLabelForRelationship(relationshipContainerObj.desires, 'desires')});
                    if (relationshipContainerObj.narrows) enabledRelTypes.push({relationship: 'narrows', label: this.getLabelForRelationship(relationshipContainerObj.narrows, 'narrows')});
                    if (relationshipContainerObj.isRelatedTo) enabledRelTypes.push({relationship: 'isRelatedTo', label: this.getLabelForRelationship(relationshipContainerObj.isRelatedTo, 'is related to')});
                    if (relationshipContainerObj.isEquivalentTo) enabledRelTypes.push({relationship: 'isEquivalentTo', label: this.getLabelForRelationship(relationshipContainerObj.isEquivalentTo, 'is equivalent to')});
                    if (relationshipContainerObj.broadens) enabledRelTypes.push({relationship: 'broadens', label: this.getLabelForRelationship(relationshipContainerObj.broadens, 'broadens')});
                    if (relationshipContainerObj.majorRelated) enabledRelTypes.push({relationship: 'majorRelated', label: this.getLabelForRelationship(relationshipContainerObj.majorRelated, 'is majorly related to')});
                    if (relationshipContainerObj.minorRelated) enabledRelTypes.push({relationship: 'minorRelated', label: this.getLabelForRelationship(relationshipContainerObj.minorRelated, 'is minorly related to')});
                    if (relationshipContainerObj.isSimilarTo) enabledRelTypes.push({relationship: 'isSimilarTo', label: this.getLabelForRelationship(relationshipContainerObj.isSimilarTo, 'is similar to')});
                    if (relationshipContainerObj.isPartiallySameAs) enabledRelTypes.push({relationship: 'isPartiallySameAs', label: this.getLabelForRelationship(relationshipContainerObj.isPartiallySameAs, 'is partially the same as')});
                    if (relationshipContainerObj.enables) enabledRelTypes.push({relationship: 'enables', label: this.getLabelForRelationship(relationshipContainerObj.enables, 'enables')});
                    if (relationshipContainerObj.hasChild) enabledRelTypes.push({relationship: 'hasChild', label: this.getLabelForRelationship(relationshipContainerObj.hasChild, 'has child')});
                    if (relationshipContainerObj.isChildOf) enabledRelTypes.push({relationship: 'isChildOf', label: this.getLabelForRelationship(relationshipContainerObj.isChildOf, 'is child of')});
                    return enabledRelTypes;
                } else return this.getFallbackEnabledRelationshipTypes();
            } catch (e) {
                return this.getFallbackEnabledRelationshipTypes();
            }
        },
        setEnabledRelationshipTypesFromT3ProfileConfig: function() {
            appLog('Using T3 configuration for enabled relationship types');
            let ert = this.getEnabledRelationshipTypesFromObject(this.t3CompetencyProfile);
            this.$store.commit('crosswalk/enabledRelationshipTypes', ert);
            this.$store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
        },
        setEnabledRelationshipTypesFromCeasnProfileConfig: function() {
            appLog('Using CEASN configuration for enabled relationship types');
            let ert = this.getEnabledRelationshipTypesFromObject(this.ctdlAsnCompetencyProfile);
            this.$store.commit('crosswalk/enabledRelationshipTypes', ert);
            this.$store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
        },
        setEnabledRelationshipTypesFromTlaProfileConfig: function() {
            appLog('Using TLA configuration for enabled relationship types');
            let ert = this.getEnabledRelationshipTypesFromObject(this.tlaCompetencyProfile);
            this.$store.commit('crosswalk/enabledRelationshipTypes', ert);
            this.$store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
        },
        setEnabledRelationshipListFromCatConfigObj: function(configObj) {
            if (!configObj || !configObj.relationshipConfig) {
                let ert = this.getFallbackEnabledRelationshipTypes();
                this.$store.commit('crosswalk/enabledRelationshipTypes', ert);
                this.$store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
            } else {
                let ert = this.getEnabledRelationshipTypesFromObject(configObj.relationshipConfig);
                this.$store.commit('crosswalk/enabledRelationshipTypes', ert);
                this.$store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
            }
        },
        setEnabledRelationshipTypesFromOtherConfig: function() {
            if (this.frameworkSource.configuration) {
                appLog('Using framework configuration for enabled relationship types...');
                let c = EcRepository.getBlocking(this.frameworkSource.configuration);
                this.setEnabledRelationshipListFromCatConfigObj(c);
            } else if (this.getDefaultBrowserConfigId() && !this.getDefaultBrowserConfigId().trim().equals('')) {
                appLog('Using browser configuration for enabled relationship types...');
                let c = EcRepository.getBlocking(this.getDefaultBrowserConfigId());
                this.setEnabledRelationshipListFromCatConfigObj(c);
            } else {
                let me = this;
                window.repo.searchWithParams("@type:Configuration", {'size': 10000}, null,
                    function(ca) {
                        let found = false;
                        for (let c of ca) {
                            if (c.isDefault === "true") {
                                appLog('Using instance default configuration for enabled relationship types');
                                me.setEnabledRelationshipListFromCatConfigObj(c);
                                found = true;
                                break;
                            }
                        }
                        if (!found) me.setEnabledRelationshipListFromCatConfigObj(null);
                    }, function() {
                        me.setEnabledRelationshipListFromCatConfigObj(null);
                    });
            }
        },
        determineEnabledRelationshipTypesFromSourceConfiguration: function() {
            if (this.$store.state.editor.t3Profile === true) this.setEnabledRelationshipTypesFromT3ProfileConfig();
            else if (this.queryParamsComputed.ceasnDataFields === "true") this.setEnabledRelationshipTypesFromCeasnProfileConfig();
            else if (this.queryParamsComputed.tlaProfile === "true") this.setEnabledRelationshipTypesFromTlaProfileConfig();
            else this.setEnabledRelationshipTypesFromOtherConfig();
        },
        frameworkClickSource: function(framework) {
            let me = this;
            this.$store.commit('crosswalk/resetFrameworkSourceRelationships');
            /* Should we exclude framework A from framework B options */
            EcFramework.get(framework.id, function(success) {
                me.$store.commit('crosswalk/frameworkSource', success);
                me.determineEnabledRelationshipTypesFromSourceConfiguration();
                me.buildFrameworkSourceRelationships();
            }, appError);
            this.$store.commit('app/searchTerm', '');
        },
        frameworkClickTarget: function(framework) {
            var me = this;
            this.$store.commit('crosswalk/resetFrameworkTargetRelationships');
            /* Should we exclude framework A from framework B options */
            EcFramework.get(framework.id, function(success) {
                me.$store.commit('crosswalk/frameworkTarget', success);
                me.buildFrameworkTargetRelationships();
            }, appError);
            this.$store.commit('app/searchTerm', '');
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/crosswalk.scss';
    @import './../../scss/framework.scss';
    h4 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
</style>

