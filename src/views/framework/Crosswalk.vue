<template>
    <div class="crosswalk section">
        <div class="container is-fluid">
            <div class="columns is-multiline">
                <div class="column is-12 crosswalk__steps">
                    <div class="section">
                        <div class="container">
                            <h2 class="title is-size-1">
                                Framework Crosswalk
                            </h2>
                            <div class="columns is-mobile">
                                <div
                                    class="column is-3"
                                    v-for="(step, index) in steps"
                                    :key="index">
                                    <div class="step-icon__wrapper has-text-centered">
                                        <div
                                            class="step-icon icon is-large has-text-white"
                                            :class="[{'has-background-grey': step.complete === false}, { 'has-background-success': step.complete}]">
                                            <h3
                                                v-if="step.name === 'from'"
                                                class="has-text-white">
                                                A
                                            </h3>
                                            <h3
                                                v-if="step.name === 'to'"
                                                class="has-text-white">
                                                A
                                            </h3>
                                            <i
                                                v-if="step.name === 'align'"
                                                class="fa fa-network-wired" />
                                            <i
                                                v-if="step.name === 'review'"
                                                class="fa fa-check" />
                                        </div>
                                        <p class="label is-size-4 has-text-primary has-text-centered">
                                            <span
                                                v-if="step.complete"
                                                class="icon">
                                                <i class="fa fa-check" />
                                            </span>
                                            <span :class="[{'has-text-grey': step.complete === false}, { 'has-text-success': step.complete}]">
                                                {{ step.description }}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-12 crosswalk__feedback">
                    <div class="container">
                        <div v-if="step == 0">
                            <h2 class="title is-size-2">
                                Step 1: Choose a framework source for your alignment
                            </h2>
                        </div>
                        <div v-if="step == 1">
                           <h2 class="title is-size-2">
                                Step 2: Choose a framework target for your alignment
                            </h2>
                        </div>
                        <div v-if="step == 2" class="columns is-mobile">
                            <div class="column">
                                <h2 class="title is-size-2">
                                Step 3: Create alignments
                            </h2>
                            </div>
                            <div class="column">
                                <div class="buttons is-right">
                                    <div class="button is-large is-outlined is-dark">
                                        {{ tempAlignments.length }} alignments to save
                                    </div>
                                    <div @click="clearTempAlignment" v-if="competencyTargets.length !== 0" class="button is-large is-outlined is-dark">
                                        clear current alignment
                                    </div>
                                    <div v-if="competencyTargets.length !== 0" @click="addTempAlignmentsToAlignmentList" class="button is-large is-outlined is-primary">
                                        add current alignments
                                    </div>
                                     <div v-if="tempAlignments.length !== 0 && competencyTargets === []" class="button is-large is-outlined is-primary">
                                        <span class="icon">
                                            <i class="fa fa-save"/>
                                        </span>
                                        <span>save alignments</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div v-if="step == 3">
                            Step 4: Review saved aligment 
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
                            <SearchBar searchType="framework" />
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
                            <SearchBar searchType="framework" />
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
                            <div class="column crosswalk__single-hierachy">
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
                                    @doneLoadingNodes="loadFrameworkTarget = true"
                                    properties="primary" />
                            </div>
                            <div class="column crosswalk__single-hierachy" v-if="loadFrameworkTarget">
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

export default {
    name: 'FrameworkCrosswalk',
    data: () => ({
        view: 'crosswalk',
        repo: window.repo,
        loadFrameworkTarget: false,
        steps: [
            {
                name: 'from',
                description: 'Select framework to align from',
                complete: false
            },
            {
                name: 'to',
                description: 'Select framework to align to',
                complete: false
            },
            {
                name: 'align',
                description: 'Add alignments between frameworks',
                complete: false
            },
            {
                name: 'review',
                description: 'Save alignment and review',
                complete: false
            }
        ]
    }),
    mixins: [common],
    props: {
        queryParams: {
            type: Object,
            default: () => { return {};}
        }
    },
    components: {
        List,
        SearchBar,
        Hierarchy
    },
    mounted() {
        this.$store.commit('crosswalk/resetCrosswalk');
    },
    watch: {
        competencyTargets: function(val) {
            console.log("val is: ", val);
        },
        step: function(val) {
            console.log("step, ", val);
            console.log("steps, ", this.steps);
            if (val === 0) {
                this.steps[0].complete = false;
                this.steps[1].complete = false;
                this.steps[2].complete = false;
                this.steps[3].complete = false;
            } else if (val === 1) {
                this.steps[0].complete = true;
                this.steps[1].complete = false;
                this.steps[2].complete = false;
                this.steps[3].complete = false;
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
            competencySource: state => state.crosswalk.tempAlignment.source,
            competencyTargets: state => state.crosswalk.tempAlignment.targets,
            alignmentType: state => state.crosswalk.tempAlignment.type,
            tempAlignment: state => state.crosswalk.tempAlignment,
            tempAlignments: state => state.crosswalk.tempAlignments,
            targetState: state => state.crosswalk.targetState,
            sourceState: state => state.crosswalk.sourceState
        })
    },
    methods: {
        clearTempAlignment: function() {
            this.$store.commit('crosswalk/resetTempAlignment');
        },
        addTempAlignmentsToAlignmentList: function() {
            this.$store.commit('crosswalk/addAlignmentToAlignmentsArray', this.tempAlignment);
            this.$store.commit('crosswalk/resetTempAlignment');
        },
        frameworkClickSource: function(framework) {
            var me = this;
            /* Should we exclude framework A from framework B options */
            EcFramework.get(framework.id, function(success) {
                me.$store.commit('crosswalk/frameworkSource', success);
                if(me.frameworkTarget) {
                    me.$store.commit('crosswalk/step', 2);
                } else {
                    me.$store.commit('crosswalk/step', 1);
                }
            }, console.error);
            this.$store.commit('app/searchTerm', '');
        },
        frameworkClickTarget: function(framework) {
            var me = this;
            /* Should we exclude framework A from framework B options */
            EcFramework.get(framework.id, function(success) {
                me.$store.commit('crosswalk/frameworkTarget', success);
                me.$store.commit('crosswalk/step', 2);
            }, console.error);
            this.$store.commit('app/searchTerm', '');
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/crosswalk.scss';

</style>
