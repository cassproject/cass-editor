<template>
    <div class="section">
        <div class="field">
            <p class="control has-icons-right">
                <input
                    class="input is-large"
                    ref="text"
                    :placeholder="'Search for ' + (searchType === 'competency' ? 'competencie' : searchType)+ 's...'"
                    @change="updateSearchTerm($event)"
                    @keyup.enter="updateSearchTerm($event)">
                <span
                    class="icon is-small is-right">
                    <i class="fas fa-search" />
                </span>
            </p>
        </div>
        <!-- filter option button opens side bar -->
        <div
            v-if="searchType === 'framework'"
            class="buttons is-right">
            <div
                @click="clearAllFilters()"
                class="button is-dark is-outlined">
                clear filters
            </div>
            <div
                class="button is-primary is-outlined"
                @click="$store.commit('app/showRightAside', 'FilterAndSort')">
                filter options
            </div>
        </div>
        <div
            v-if="searchType==='framework'"
            class="section">
            <span
                v-for="filter in filteredQuickFilters"
                :key="filter"
                class="tag is-dark">
                {{ filter.label }}
                <button
                    @click="removeFilter('quickFilters', filter)"
                    class="delete is-small" />
            </span>
            <template class="">
                <span
                    v-if="sortResults.label"
                    class="tag is-dark">
                    {{ sortResults.label }}
                    <button
                        @click="clearSortBy"
                        class="delete is-small" />
                </span>
            </template>
            <template class="section">
                <span
                    v-for="filter in filteredSearchTo"
                    :key="filter"
                    class="tag is-dark">
                    {{ filter.label }}
                    <button
                        @click="removeFilter('applySearchTo', filter)"
                        class="delete is-small" />
                </span>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        searchType: {
            type: String,
            default: ''
        },
        queryParams: {
            type: Object,
            default: function() { return {}; }
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
            this.sortBy = this.queryParams.concepts === 'true' ? "dcterms:title.keyword" : "name.keyword";
        },
        removeFilter: function(filterType, val) {
            let storeCaller = 'app/' + filterType;
            let filterArray = this.$store.getters[storeCaller];
            let objIndex = filterArray.findIndex(obj => obj.id === val.id);
            filterArray[objIndex].checked = false;
            this.$store.commit(storeCaller, filterArray);
        },
        updateSearchTerm: function(e) {
            this.$store.commit('app/searchTerm', e.target.value);
        }
    },
    computed: {
        type: function() {
            return this.queryParams.concepts === 'true' ? "ConceptScheme" : "Framework";
        },
        applySearchTo: function() {
            return this.$store.getters['app/applySearchTo'];
        },
        filteredSearchTo: function() {
            let filterValues = this.applySearchTo.filter(item => item.checked === true);
            console.log('filtered value', filterValues);
            return filterValues;
        },
        quickFilters: function() {
            return this.$store.getters['app/quickFilters'];
        },
        filteredQuickFilters: function() {
            let filterValues = this.quickFilters.filter(item => item.checked === true);
            console.log('filtered value', filterValues);
            return filterValues;
        },
        sortResults: function() {
            return this.$store.getters['app/sortResults'];
        }
    }
};
</script>

