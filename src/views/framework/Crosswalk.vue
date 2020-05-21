<template>
    <div class="crosswalk section">
        <div class="container is-fluid">
            <div class="columns is-gapless is-paddiingless is-marginless is-multiline">
                <div class="column is-12 crosswalk__steps">
                    <div class="section">
                        <div class="container">
                            <div class="columns is-mobile">
                                <div
                                    class="column is-3"
                                    v-for="(item, index) in steps"
                                    :key="index">
                                    <div class="step-icon__wrapper has-text-centered">
                                        <div
                                            class="step-icon icon is-large has-text-white"
                                            :class="[{'has-background-primary': index === step}, { 'has-background-success': step > index}, { 'has-background-medium': step < index}]">
                                            <h3
                                                v-if="item.name === 'from'"
                                                class="has-text-white">
                                                A
                                            </h3>
                                            <h3
                                                v-if="item.name === 'to'"
                                                class="has-text-white">
                                                B
                                            </h3>
                                            <i
                                                v-if="item.name === 'align'"
                                                class="fa fa-network-wired" />
                                            <i
                                                v-if="item.name === 'review'"
                                                class="fa fa-check" />
                                        </div>
                                        <p class="label is-size-4 has-text-success has-text-centered">
                                            <span
                                                v-if="item.complete"
                                                class="icon">
                                                <i class="fa fa-check" />
                                            </span>
                                            <span :class="[{'has-text-primary has-text-bold': index === step}, { 'has-text-success': step > index}, { 'has-text-medium': step < index}]">
                                                {{ item.description }}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-12 crosswalk__title">
                    <div class="container">
                        <div class="is-flex">
                            <div class="crosswalk__title__title">
                                <h2 class="is-size-2 has-text-weight-bold is-inline">
                                    Framework Crosswalk:
                                </h2>
                                <h2
                                    v-if="step == 0"
                                    class="is-size-2 is-inline">
                                    select source framework
                                </h2>
                                <h2
                                    v-if="step == 1"
                                    class="is-size-2 is-inline">
                                    select target framework
                                </h2>
                                <h2
                                    v-if="step == 2"
                                    class="is-size-2 is-inline">
                                    create alignments
                                </h2>
                            </div>
                            <div
                                v-if="step == 2"
                                class="buttons crosswalk__title__buttons">
                                <div class="button is-outlined is-link">
                                    {{ alignmentsToSave.length }} alignments to save
                                </div>
                                <div
                                    v-if="workingAlignmentsTargets.length !== 0"
                                    @click="applyWorkingAlignmentChanges"
                                    class="button is-outlined is-primary">
                                    <span class="icon">
                                        <i class="fa fa-plus" />
                                    </span>
                                    <span>
                                        apply alignments changes TODO TAKE DELETIONS INTO ACCOUNT
                                    </span>
                                </div>
                                <div
                                    v-if="alignmentsToSave.length !== 0 && sourceState === 'ready'"
                                    @click="saveAlignments"
                                    class="button is-outlined is-primary">
                                    <span class="icon">
                                        <i class="fa fa-save" />
                                    </span>
                                    <span>
                                        save alignments
                                    </span>
                                </div>
                            </div>
                            <h2 v-if="step == 3">
                                Step 4: Review saved aligment
                            </h2>
                        </div>
                    </div>
                </div>
                <!-- step framework list for selecting a & b -->
                <transition
                    name="slide-fade">
                    <div
                        v-if="step === 0"
                        class="column is-12 crosswalk__list">
                        <div class="container">
                            <SearchBar
                                filterSet="basic"
                                searchType="framework" />
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
                <transition
                    v-if="step === 1"
                    name="slide-fade">
                    <div
                        class="column is-12 crosswalk__list">
                        <div class="container">
                            <SearchBar
                                filterSet="basic"
                                searchType="framework" />
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
                        <div class="columns">
                            <div
                                class="column is-6 has-text-centered"
                                v-if="!crosswalkSourceLoaded">
                                <span class="icon is-large">
                                    <i class="fa fa-spinner fa-2x fa-pulse" />
                                </span>
                            </div>
                            <div
                                v-show="crosswalkSourceLoaded"
                                class="column is-6 crosswalk__single-hierachy">
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
                                class="column is-6 crosswalk__single-hierachy"
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
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
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
        repo: window.repo,
        steps: [
            {
                name: 'from',
                description: 'select source framework',
                complete: false
            },
            {
                name: 'to',
                description: 'select target framework',
                complete: false
            },
            {
                name: 'align',
                description: 'create new alignments',
                complete: false
            },
            {
                name: 'review',
                description: 'save & review',
                complete: false
            }
        ]
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
        }
    },
    computed: {
        type: function() {
            return this.queryParams.concepts === 'true' ? "ConceptScheme" : "Framework";
        },
        paramObj: function() {
            let obj = {};
            obj.size = 20;
            var order = (this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword") ? "asc" : "desc";
            obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "long",  "missing" : "_last"}} ]';
            if (this.queryParams && ((this.queryParams.concepts !== "true" && this.queryParams.show === 'mine') ||
            (this.queryParams.concepts === "true" && this.queryParams.conceptShow === "mine"))) {
                obj.ownership = 'me';
            }
            return obj;
        },
        searchOptions: function() {
            let search = "";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.showMine || (this.queryParams && this.queryParams.concepts !== "true" && this.queryParams.show === "mine") ||
            (this.queryParams && this.queryParams.concepts === "true" && this.queryParams.conceptShow === "mine")) {
                search += " AND (";
                for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                    if (i !== 0) {
                        search += " OR ";
                    }
                    var id = EcIdentityManager.ids[i];
                    search += "@owner:\"" + id.ppk.toPk().toPem() + "\"";
                    search += " OR @owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
                }
                search += ")";
            }
            if (this.showNotMine) {
                search += " AND NOT (";
                for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                    if (i !== 0) {
                        search += " OR ";
                    }
                    var id = EcIdentityManager.ids[i];
                    search += "@owner:\"" + id.ppk.toPk().toPem() + "\"";
                    search += " OR @owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
                }
                search += ")";
            }
            return search;
        },
        ...mapState({
            step: state => state.crosswalk.step,
            sortResults: state => state.app.sortResults,
            quickFilters: state => state.app.quickFilters,
            filteredQuickFilters: state => state.app.filteredQuickFilters,
            frameworkSearchTerm: state => state.app.frameworkSearchTerm,
            showRightAside: state => state.app.showRightAside,
            frameworkSource: state => state.crosswalk.frameworkSource,
            frameworkTarget: state => state.crosswalk.frameworkTarget,
            frameworkSourceRelationships: state => state.crosswalk.frameworkSourceRelationships,
            frameworkTargetRelationships: state => state.crosswalk.frameworkTargetRelationships,
            relevantExistingAlignmentsMap: state => state.crosswalk.relevantExistingAlignmentsMap,
            workingAlignmentsSource: state => state.crosswalk.workingAlignmentsMap.source,
            workingAlignmentsTargets: state => state.crosswalk.workingAlignmentsMap.targets,
            workingAlignmentsType: state => state.crosswalk.workingAlignmentsMap.type,
            workingAlignmentsMap: state => state.crosswalk.workingAlignmentsMap,
            alignmentsToSave: state => state.crosswalk.alignmentsToSave,
            targetState: state => state.crosswalk.targetState,
            sourceState: state => state.crosswalk.sourceState,
            targetNodesToHighlight: state => state.crosswalk.targetNodesToHighlight
        })
    },
    methods: {
        genPartialIdPiece(compId) {
            if (compId.lastIndexOf("/") <= -1) return compId;
            return compId.substr(compId.lastIndexOf("/") + 1);
        },
        generateRelationId(relType, sourceId, targetId) {
            return 'crswlk' + '---' + this.genPartialIdPiece(sourceId) + '-' + relType + '-' + this.genPartialIdPiece(targetId);
        },
        generateAlignmentObjectsFromAlignmentToSaveObjects() {
            let ecaa = [];
            for (let ats of this.alignmentsToSave) {
                let eca = new EcAlignment();
                // eca.generateId(window.repo.selectedServer);
                eca.assignId(window.repo.selectedServer, this.generateRelationId(ats.type, ats.source, ats.target));
                this.addAllIdentityPksAsOwners(eca);
                eca.target = ats.target;
                eca.source = ats.source;
                eca.relationType = ats.type;
                ecaa.push(eca);
            }
            return ecaa;
        },
        saveAlignments: function() {
            // TODO expand on this...this is just a temporary thing to get some data in the system for development
            // let ecaa = this.generateAlignmentObjectsFromAlignmentToSaveObjects();
            // let fso = EcRepository.getBlocking(this.frameworkSource.shortId());
            // let fs = new EcFramework();
            // fs.copyFrom(fso);
            // let fto = EcRepository.getBlocking(this.frameworkTarget.shortId());
            // let ft = new EcFramework();
            // ft.copyFrom(fto);
            // for (let eca of ecaa) {
            //     fs.addRelation(eca.shortId());
            //     ft.addRelation(eca.shortId());
            // }
            // let repo = window.repo;
            // repo.multiput(ecaa,
            //     function(msg) {
            //         console.log('Alignments saved: ' + msg);
            //         fs.save(
            //             function(msg) {
            //                 console.log('Source framework saved: ' + msg);
            //             },
            //             function(msg) {
            //                 console.log('Source framework NOT SAVED: ' + msg);
            //             },
            //             window.repo
            //         );
            //         ft.save(
            //             function(msg) {
            //                 console.log('Source target saved: ' + msg);
            //             },
            //             function(msg) {
            //                 console.log('Source target NOT SAVED: ' + msg);
            //             },
            //             window.repo
            //         );
            //     },
            //     function(msg) {
            //         console.log('Alignments NOT SAVED: ' + msg);
            //     }
            // );
        },
        prepareToLoadCrosswalkTarget: function() {
            this.crosswalkSourceLoaded = true;
            setTimeout(() => {
                this.loadCrosswalkTarget = true;
            }, 2000);
        },
        // clearTempAlignment: function() {
        //     this.$store.commit('crosswalk/resetTempAlignment');
        // },
        applyWorkingAlignmentChanges: function() {
            // TODO implement
            alert('redo this: applyWorkingAlignmentChanges');
            // this.$store.commit('crosswalk/appendAlignmentsToSave', this.tempAlignment);
            // this.$store.commit('crosswalk/resetTempAlignment');
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

</style>
