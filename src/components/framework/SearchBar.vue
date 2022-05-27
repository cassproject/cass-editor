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
                    @input="updateSearchTerm(searchTerm)">
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
                    @click="$store.commit('app/showRightAside', 'FilterAndSort')">
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
export default {
    name: 'SearchBar',
    props: {
        ownedByMe: {
            type: Boolean,
            default: false
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
            basicFilter: ''
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
            appLog(val);
            this.$store.commit("app/sortResults", {id: val});
        },
        basicFilter: function(val) {
            appLog(val);
            var filter;
            if (val === true) {
                filter = {
                    id: 'ownedByMe',
                    checked: true
                };
            } else {
                filter = {
                    id: 'ownedByMe',
                    checked: false
                };
            }
            this.$store.commit("app/quickFilters", [filter]);
        }
    },
    mounted: function() {
        if (this.ownedByMe) {
            this.basicFilter = true;
        }
        let searchTerm = this.$store.getters['app/searchTerm'];
        if (searchTerm && searchTerm.length > 0) {
            this.searchTerm = searchTerm;
        }
    },
    methods: {
        clearAllFilters: function() {
            this.$store.commit('app/clearSearchFilters');
            this.clearSortBy();
            this.showMine = false;
            this.showNotMine = false;
        },
        clearSortBy: function() {
            this.$store.commit('app/sortResults', []);
            this.sortBy = (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) ? "dcterms:title.keyword" : "name.keyword";
        },
        removeFilter: function(filterType, val) {
            let storeCaller = 'app/' + filterType;
            let filterArray = this.$store.getters[storeCaller];
            let objIndex = filterArray.findIndex(obj => obj.id === val.id);
            filterArray[objIndex].checked = false;
            this.$store.commit(storeCaller, filterArray);
        },
        updateSearchTerm: function(e) {
            this.$store.commit('app/searchTerm', e);
        }
    },
    computed: {
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        type: function() {
            return (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) ? "ConceptScheme" : "Framework";
        },
        applySearchTo: function() {
            return this.$store.getters['app/applySearchTo'];
        },
        filteredSearchTo: function() {
            let filterValues = this.applySearchTo.filter(item => item.checked === true);
            appLog('filtered value', filterValues);
            return filterValues;
        },
        quickFilters: function() {
            return this.$store.getters['app/quickFilters'];
        },
        filteredQuickFilters: function() {
            let filterValues = this.quickFilters.filter(item => item.checked === true);
            appLog('filtered value', filterValues);
            return filterValues;
        },
        sortResults: function() {
            return this.$store.getters['app/sortResults'];
        },
        loggedIn: function() {
            if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
                return true;
            }
            return false;
        },
        storeSearchTerm: function() {
            return this.$store.getters['app/searchTerm'];
        },
        searchFrameworks: {
            get() {
                return this.$store.getters['app/searchFrameworksInCompetencySearch'];
            },
            set(val) {
                this.$store.commit("app/searchFrameworksInCompetencySearch", val);
            }
        },
        isFirstSearchProcessing: function() {
            return this.$store.getters['editor/firstSearchProcessing'];
        }
    }
};
</script>

<style lang="scss">
.cass--search-bar {
    width: 100%;
}
</style>

