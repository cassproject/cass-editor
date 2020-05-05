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
                                            :class="[{'has-background-primary': step.complete === false}, { 'has-background-success': step.complete}]">
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
                                            </span> {{ step.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- step framework list for selecting a & b -->
                <div
                    v-if="step === 0 || step === 1"
                    class="column is-12 crosswalk__list">
                    <div class="section">
                        <SearchBar searchType="framework" />
                        <List
                            :type="type"
                            :repo="repo"
                            :click="frameworkClick"
                            :searchOptions="searchOptions"
                            :paramObj="paramObj"
                            :disallowEdits="true" />
                    </div>
                </div>
                <!-- double hierarchy view -->
                <div
                    v-if="step === 2"
                    class="column is-12 crosswalk__double-hierarchy">
                    <div class="columns">
                        <div class="column is-6 crosswalk__single-hierachy">
                            <Hierarchy
                                :container="frameworkA"
                                view="crosswalk"
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
                        <div class="column is-6 crosswalk__single-hierachy">
                            <Hierarchy
                                :container="frameworkB"
                                view="crosswalk"
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
                    <!-- side by side view -->
                </div>
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
        repo: window.repo,
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
        queryParams: Object
    },
    components: {
        List,
        SearchBar,
        Hierarchy
    },
    mounted() {
        this.$store.commit('crosswalk/step', 0);
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
            frameworkA: state => state.crosswalk.frameworkA,
            frameworkB: state => state.crosswalk.frameworkB
        })
    },
    methods: {
        frameworkClick: function(framework) {
            var me = this;
            if (this.step === 0) {
                EcFramework.get(framework.id, function(success) {
                    me.$store.commit('crosswalk/frameworkA', success);
                    me.$store.commit('crosswalk/step', 1);
                }, console.error);
            } else {
                if (this.step === 1) {
                    /* Should we exclude framework A from framework B options */
                    EcFramework.get(framework.id, function(success) {
                        me.$store.commit('crosswalk/frameworkB', success);
                        me.$store.commit('crosswalk/step', 2);
                    }, console.error);
                }
            }
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/crosswalk.scss';
.crosswalk {
    height: calc(100vh - 52px);
    overflow: hidden;
    .step-icon__wrapper {
        padding: .25rem;
    }
    .step-icon.icon {
        border-radius: 100% !important;
    }
    .crosswalk__steps {
        height: 18vh;
    }
    .crosswalk__list {
        overflow: scroll;
        height: calc(95vh - 52px);
    };
    .crosswalk__double-hierarchy {
        height: 80vh;
        .columns {
            height: 100%;
            margin: .25rem;
        };
        overflow: hidden;
        .crosswalk__single-hierachy {
            padding: 2rem;
            overflow: scroll;
            height: 100%;
        }
    }
}
</style>
