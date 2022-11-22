<!--
This component is displays a ui for searchin for compencies and selecting them
this component can be dropped into a card element such as DynamicModel.vue
with some adjustments to the modal-card classes to just card, this could be
placed anywhere in a structured html element such as a <section> or a <div>
-->
<template>
    <div
        class="columns is-multiline">
        <div
            class="column is-12"
            v-if="!selectedFramework">
            <SearchBar
                filterSet="basic"
                :allowShowFrameworks="allowShowFrameworks"
                :searchType="searchType" />
        </div>
        <div
            v-if="!selectedFramework"
            class="column is-12">
            <List
                v-if="$store.state.lode.competencySearchModalOpen"
                :type="searchTypeToPassToList"
                view="search"
                :parent="parent"
                :repo="repo"
                :click="select"
                :searchOptions="searchOptions"
                :paramObj="paramObj"
                :disallowEdits="true"
                :selectingCompetency="true"
                :selected="selectedIds"
                :displayFirst="displayFirst"
                :idsNotPermittedInSearch="idsNotPermittedInSearch" />
        </div>
        <div
            v-if="selectedFramework && !hierarchyLoaded">
            <span class="icon is-large">
                <i class="fa fa-spinner fa-2x fa-pulse" />
            </span>
        </div>
        <div v-show="hierarchyLoaded">
            <Thing
                :parent="parent"
                v-if="selectedFramework"
                :obj="selectedFramework"
                :repo="repo"
                :view="view"
                :expandInModal="true" />
            <Hierarchy
                v-if="selectedFramework"
                :parent="parent"
                :container="selectedFramework"
                view="competencySearch"
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
                :viewOnly="true"
                :repo="repo"
                :highlightList="null"
                @done-loading-nodes="hierarchyLoaded = true"
                properties="primary"
                @selected-array="selectedArrayEvent" />
        </div>
    </div>
</template>

<script>
import List from '@/lode/components/List.vue';
import Hierarchy from '@/lode/components/Hierarchy.vue';
import Thing from '@/lode/components/Thing.vue';
import common from '@/mixins/common.js';
import {mapState} from 'vuex';
import SearchBar from '@/components/framework/SearchBar.vue';
export default {
    name: 'CompetencySearch',
    props: {
        parent: {
            type: String,
            default: ''
        },
        isActive: Boolean,
        view: {
            type: String,
            default: 'modal'
        },
        idsNotPermittedInSearch: {
            type: Array,
            default: null
        },
        allowShowFrameworks: {
            type: Boolean,
            default: false
        },
        clearFramework: {
            type: Boolean,
            default: false
        },
        typesPermittedInSearch: {
            type: Array,
            default: null
        }
    },
    components: {List, SearchBar, Hierarchy, Thing},
    mixins: [common],
    data() {
        return {
            repo: window.repo,
            selectedIds: [],
            displayFirst: [],
            showMine: false,
            sortBy: null,
            selectedFramework: null,
            hierarchyLoaded: false
        };
    },
    created: function() {
        this.sortBy = (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true || this.searchType === "Concept") ? "skos:prefLabel.keyword" : "name.keyword";
        this.$store.commit('app/searchTerm', "");
    },
    beforeDestroy: function() {
        this.$store.commit('app/searchTerm', "");
    },
    computed: {
        ...mapState({
            selectedCompetency: state => state.editor.selectedCompetency,
            framework: state => state.editor.framework,
            queryParams: state => state.editor.queryParams,
            addingProperty: state => state.lode.addingProperty
        }),
        nameOfSelectedCompetency: function() {
            if (this.selectedCompetency && this.selectedCompetency.name) {
                return this.selectedCompetency.getName();
            } else if (this.selectedCompetency) {
                return schema.Thing.getDisplayStringFrom(this.selectedCompetency["skos:prefLabel"]);
            } else {
                return '';
            }
        },
        copyOrLink: function() {
            return this.$store.state.lode.copyOrLink;
        },
        frameworkName: function() {
            if (this.framework) {
                return this.framework.getName();
            } else {
                return '';
            }
        },
        searchOptions: function() {
            let search = "";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            /* var searchTerm = this.$store.getters['app/searchTerm'];
            if (!searchTerm || searchTerm.length === 0) {
                if (this.$store.getters['editor/conceptMode'] !== true) {
                    search += " AND (name NOT \"\")";
                }
            }*/
            if (this.searchType === 'DirectLink') {
                search += " AND @type:Competency";
                if (this.typesPermittedInSearch && this.typesPermittedInSearch.length > 0) {
                    search += " AND ((dcterms\\:type:" + this.typesPermittedInSearch[0] + ")";
                    for (let i = 1; i < this.typesPermittedInSearch.length; i++) {
                        search += " OR (dcterms\\:type:" + this.typesPermittedInSearch[i] + ")";
                    }
                    search += ")";
                }
            }
            if (this.$store.getters['editor/progressionMode'] === true) {
                // If searching for precedes or precededBy in a progression, restrict results to the progression model
                if (this.addingProperty.includes('precede') !== -1) {
                    search += " AND (ceasn\\:inProgressionModel:\"" + this.selectedCompetency["ceasn:inProgressionModel"] + "\")";
                }
            }
            if (this.showMine || (this.queryParams && this.$store.getters['editor/conceptMode'] !== true && this.$store.getters['editor/progressionMode'] !== true && this.queryParams.show === "mine") ||
                (this.queryParams && (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) && this.queryParams.conceptShow === "mine")) {
                if (EcIdentityManager.default.ids.length > 0) {
                    search += " AND (";
                    for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
                        if (i !== 0) {
                            search += " OR ";
                        }
                        var id = EcIdentityManager.default.ids[i];
                        search += "\\*owner:\"" + id.ppk.toPk().toPem() + "\"";
                        search += " OR \\*owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
                    }
                    search += ")";
                }
            }
            return search;
        },
        paramObj: function() {
            let obj = {};
            obj.size = 20;
            var searchTerm = this.$store.getters['app/searchTerm'];
            if (!searchTerm || searchTerm.length === 0) {
                var order = (this.sortBy === "name.keyword" || this.sortBy === "skos:prefLabel.keyword") ? "asc" : "desc";
                let type = (this.sortBy === "name.keyword" || this.sortBy === "skos:prefLabel.keyword") ? "text" : "date";
                obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "' + type + '",  "missing" : "_last"}} ]';
            } else {
                delete obj.sort;
            }
            if (EcIdentityManager.default.ids.length > 0 && this.queryParams && ((this.$store.getters['editor/conceptMode'] !== true && this.$store.getters['editor/progressionMode'] !== true && this.queryParams.show === 'mine') ||
                ((this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) && this.queryParams.conceptShow === "mine"))) {
                obj.ownership = 'me';
            }
            return obj;
        },
        searchType: function() {
            return this.$store.state.lode.searchType;
        },
        sortResults: function() {
            return this.$store.getters['app/sortResults'];
        },
        quickFilters: function() {
            return this.$store.getters['app/quickFilters'];
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
        searchFrameworksInCompetencySearch: function() {
            return this.$store.getters['app/searchFrameworksInCompetencySearch'];
        },
        searchTypeToPassToList: function() {
            if (this.searchType === "Competency" && this.searchFrameworksInCompetencySearch) {
                return "Framework";
            } else if (this.searchType === "DirectLink") {
                return "Competency";
            } else {
                return this.searchType;
            }
        }
    },
    mounted: async function() {
        this.displayFirst.splice(0, this.displayFirst.length);
        this.$store.commit('app/searchTerm', "");
        if (!this.copyOrLink && this.searchType === "Competency" && this.framework.competency) {
            for (var i = 0; i < this.framework.competency.length; i++) {
                if (this.framework.competency[i] !== this.selectedCompetency.shortId()) {
                    if (!this.idsNotPermittedInSearch || this.idsNotPermittedInSearch.length === 0 || !EcArray.has(this.idsNotPermittedInSearch, this.framework.competency[i])) {
                        var comp = await EcRepository.get(this.framework.competency[i]);
                        if (comp) {
                            this.displayFirst.push(comp);
                        }
                    }
                }
            }
        }
        if (this.searchType === "Level" && this.framework.level) {
            for (var i = 0; i < this.framework.level.length; i++) {
                var comp = await EcRepository.get(this.framework.level[i]);
                if (comp) {
                    this.displayFirst.push(comp);
                }
            }
        }
    },
    methods: {
        resetModal: function() {
            this.$store.commit('app/closeModal');
            this.selectedIds = [];
        },
        selectedArrayEvent: async function(ary) {
            this.selectedIds = ary;
            if (!this.copyOrLink || this.searchType === "Level") {
                this.$store.commit('editor/selectedCompetenciesAsProperties', this.selectedIds);
            }
            if (this.queryParams.selectRelations === "true" && this.framework.relation) {
                for (var i = 0; i < this.framework.relation.length; i++) {
                    var relation = await EcAlignment.get(this.framework.relation[i]);
                    if (EcArray.has(selectedArray, relation.target)) {
                        if (this.queryParams.selectVerbose === "true") {
                            ary.push(JSON.parse((rld).toJson()));
                        } else {
                            ary.push(relation.shortId());
                        }
                    }
                }
            }
        },
        select: function(competency) {
            if (competency.type === "Framework") {
                return this.selectFramework(competency);
            }
            if (!EcArray.has(this.selectedIds, competency.shortId())) {
                this.selectedIds.push(competency.shortId());
            } else {
                EcArray.setRemove(this.selectedIds, competency.shortId());
            }
            if (!this.copyOrLink || this.searchType === "Level" || this.searchType === "DirectLink") {
                this.$store.commit('editor/selectedCompetenciesAsProperties', this.selectedIds);
            }
        },
        selectFramework: function(framework) {
            this.selectedFramework = framework;
            this.$emit('selectFramework', framework);
        },
        addNewlinesToId: function(pem) {
            // Begin public key line
            pem = pem.substring(0, 26) + "\n" + pem.substring(26);
            var length = pem.length;
            var start = 27;
            while (start + 64 < length) {
                pem = pem.substring(0, start + 64) + "\n" + pem.substring(start + 64);
                start += 65;
                length++;
            }
            // End public key line
            pem = pem.substring(0, length - 24) + "\n" + pem.substring(length - 24);
            return pem;
        }
    },
    watch: {
        sortResults: function() {
            if (this.sortResults.id === "lastEdited") {
                this.sortBy = "schema:dateModified";
                this.displayFirst.splice(0, this.displayFirst.length);
            } else {
                this.sortBy = (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true || this.searchType === "Concept") ? "skos:prefLabel.keyword" : "name.keyword";
                this.displayFirst.splice(0, this.displayFirst.length);
            }
        },
        filteredQuickFilters: function() {
            this.showMine = false;
            for (var i = 0; i < this.filteredQuickFilters.length; i++) {
                if (this.filteredQuickFilters[i].id === "ownedByMe") {
                    this.showMine = true;
                    this.displayFirst.splice(0, this.displayFirst.length);
                }
            }
        },
        selectedIds(newVal) {
            if (this.parent === 'search-modal') {
                this.$emit('setSelectedIds', newVal);
            }
        },
        clearFramework() {
            if (this.clearFramework) {
                this.selectFramework(null);
            }
        }
    }
};
</script>


<style lang="scss">
    @import '@/scss/frameworks.scss';
.search-modal,
.modal.lode__thing-editing {
    .breadcrumb {
        padding-left: .125rem;
    }
    .lode__type {
        display: none;
    }
    .competency-search{
        .thing {
            padding: .125rem .25rem !important;
        }
        .thing .list-thing:hover {
            background-color: none;
        }
        .Thing__heading {
            padding-left: .25rem !important;
            margin-right: 2rem;
        }
        .edit-button {
            display: none;
        }

        .list-ul__item:hover {
            padding-top: .5rem;
            background-color: var(--light-color);
        }
        .list-ul__item {
            margin-top: .25rem;
            border-radius: 3px;
            padding: .5rem;
        }
    }
    .property-section {
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
    }

    .cass--list {
        .list-ul {
            .list-ul__item {
                padding: .5rem .25rem;
                .search-selection__add-icon {
                    visibility: hidden;
                }
                .search-selection__icon,
                .search-selection__add-icon
                {
                    float: right;
                    right: 16px;
                    display: flex;
                    height: 100%;
                    align-content: center;
                    .icon {
                        height: 100%;
                        padding-right: 16px;
                    }
                }
            }
            .list-ul__item:hover {
                background-color: rgba($light, .5);
                .lode__Competency .search-selection__add-icon {
                    visibility: visible !important;
                }
            }
        }
    }

}


</style>