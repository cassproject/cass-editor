<!--
    SearchBar.vue is a component which can be added anywhere a List.vue
    is displaying a list of objects from a cass repository.

    Props:
        searchType:
            allFilters: Includes button to open the right side panel for managing filtered
            search options
            lightSearch: Includes a light version of filters
                            Owned by me
                            Owned by someone
                            Sort by last date modified
-->
<template>
    <div class="cass--search-bar">
        <div
            class="field is-grouped">
            <p
                class="control is-expanded"
                :class="{'has-icons-right': searchTerm === ''}">
                <input
                    class="input"
                    ref="text"
                    type="search"
                    v-model="searchTerm"
                    :disabled="isFirstSearchProcessing"
                    :placeholder="'Search for ' + (searchType === 'Competency' ? 'competencie' : searchType)+ 's...'"
                    @input="updateSearchTerm(searchTerm)"
                    id="search-bar-input" />
                <span
                    v-if="searchTerm === ''"
                    class="icon is-small is-right">
                    <i class="fas fa-search" />
                </span>
            </p>
            <!-- filter option button opens side bar -->
            <div
                v-if="filterSet === 'all'"
                class="control">
                <div
                    @click="clearAllFilters()"
                    id="clear-all-filters-button"
                    title="Clear filters"
                    class="button is-dark is-outlined">
                    <span class="icon clear-filters">
                        <i class="fas fa-filter fa-stack-1x" />
                        <i class="fas fa-slash fa-stack-1x fa-lg has-text-danger" />
                    </span>
                </div>
            </div>
            <div
                class="control"
                v-if="filterSet === 'all'">
                <div
                    class="button is-outlined is-dark"
                    title="Filters"
                    @click="$store.commit('app/showRightAside', 'FilterAndSort')"
                    id="open-filters-side-bar-button">
                    <span class="icon">
                        <i class="fa fa-filter" />
                    </span>
                </div>
            </div>
        </div>
        <!-- to do connect basic filters to list results -->
        <div v-if="filterSet === 'basic'">
            <div class="field is-grouped">
                <div
                    class="field"
                    v-if="loggedIn">
                    <input
                        v-model="basicFilter"
                        :disabled="isFirstSearchProcessing"
                        class="is-checkradio"
                        value="ownedByMe"
                        id="ownedByMe"
                        type="checkbox"
                        name="filterOwnedByMe">
                    <label for="ownedByMe">
                        Owned by me
                    </label>
                </div>
                <div class="field">
                    <input
                        v-model="basicSort"
                        :disabled="isFirstSearchProcessing"
                        class="is-checkradio"
                        value=""
                        id="alphabeticalSort"
                        type="radio"
                        name="alphabeticalSort"
                        checked="checked">
                    <label for="alphabeticalSort">
                        Alphabetical
                    </label>
                    <input
                        v-model="basicSort"
                        :disabled="isFirstSearchProcessing"
                        class="is-checkradio"
                        value="lastEdited"
                        id="lastDateModifiedSort"
                        type="radio"
                        name="lastDateModifiedSort">
                    <label for="lastDateModifiedSort">
                        Date modified
                    </label>
                </div>
                <div
                    class="field"
                    v-if="allowShowFrameworks">
                    <input
                        v-model="searchFrameworks"
                        :disabled="isFirstSearchProcessing"
                        class="is-checkradio"
                        value="searchFrameworks"
                        id="searchFrameworks"
                        type="checkbox"
                        name="filtersearchFrameworks">
                    <label for="searchFrameworks">
                        Show Frameworks
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "@/stores/index.js"
import { map } from "lodash";
import {mapState} from "pinia";
export default {
    name: 'SearchBar',
    props: {
        ownedByMe: {
            type: Boolean,
            default: true
        },
        view: {
            type: String,
            default: ''
        },
        searchType: {
            type: String,
            default: ''
        },
        filterSet: {
            type: String,
            default: ''
        },
        allowShowFrameworks: {
            type: Boolean,
            default: false
        },
        setFocus: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            searchTerm: '',
            basicSort: '',
            basicFilter: this.ownedByMe
        };
    },
    watch: {
        setFocus: function() {
            this.$nextTick(() => this.$refs['text'].focus());
        },
        storeSearchTerm: function() {
            this.searchTerm = this.storeSearchTerm;
        },
        basicSort: function(val) {
            console.log(val);
            store.app().sortResults({id: val});
        },
        basicFilter: function(val) {
            this.setOwnedByMe(val);
        }
    },
    mounted: function() {
        this.setOwnedByMe(this.ownedByMe);
        let searchTerm = this.searchTerm;
        if (searchTerm && searchTerm.length > 0) {
            this.searchTerm = searchTerm;
        }
    },
    methods: {
        clearAllFilters: function() {
            store.app().clearSearchFilters();
            this.clearSortBy();
            this.showMine = false;
            this.showNotMine = false;
        },
        clearSortBy: function() {
            store.app().sortResults([]);
            this.sortBy = (this.conceptMode === true || this.progressionMode === true) ? "dcterms:title.keyword" : "name.keyword";
        },
        removeFilter: function(filterType, val) {
            let storeCaller = 'app/' + filterType;
            let filterArray = this.app()[storeCaller];
            let objIndex = filterArray.findIndex(obj => obj.id === val.id);
            filterArray[objIndex].checked = false;
            store.app()[`set${filterType}`](filterArray);
        },
        setOwnedByMe(val) {
            const filter = {
                id: 'ownedByMe',
                checked: val
            };
            store.app().setSingleQuickFilter(filter);
        },
        updateSearchTerm: function(e) {
            store.app().setSearchTerm(e);
        }
    },
    computed: {
        ...mapState(store.editor, {
            queryParams: state => state.queryParams,
            conceptMode: state => state.conceptMode,
            progressionMode: state => state.progressionMode,
            firstSearchProcessing: state => state.firstSearchProcessing
        }),
        ...mapState(store.app, {
            applySearchTo: state => state.applySearchTo,
            sortResults: state => state.sortResults,
            searchTerm: state => state.searchTerm,
            searchFrameworksInCompetencySearch: state => state.searchFrameworksInCompetencySearch
        }),
        type: function() {
            return (this.conceptMode === true || this.progressionMode === true) ? "ConceptScheme" : "Framework";
        },
        filteredSearchTo: function() {
            let filterValues = this.applySearchTo.filter(item => item.checked === true);
            console.log('filtered value', filterValues);
            return filterValues;
        },
        loggedIn: function() {
            return EcIdentityManager.default.ids?.length > 0;
        },
        storeSearchTerm: function() {
            return this.searchTerm;
        },
        searchFrameworks: {
            get() {
                return this.searchFrameworksInCompetencySearch;
            },
            set(val) {
                store.app().setSearchFrameworksInCompetencySearch(val);
            }
        },
        isFirstSearchProcessing: function() {
            return this.firstSearchProcessing;
        }
    }
};
</script>

<style lang="scss">
.cass--search-bar {
    width: 100%;
}
</style>

