<template>
    <div class="right-aside__filter-and-sort">
        <h3 class="title is-size-4">
            Filter and Sort
        </h3>
        <div class="filter-sort-section">
            <h3 class="filter-sort-header">
                Sort by
            </h3>
            <div
                v-for="option in sortResults"
                :key="option"
                class="field">
                <template v-if="option.enabled">
                    <input
                        class="is-checkradio"
                        :id="option.id"
                        type="radio"
                        v-model="sortBy"
                        :value="{id: option.id, label: option.label}"
                        name="sortResults">
                    <label
                        class="label"
                        :for="option.id">{{ option.label }}</label>
                </template>
            </div>
        </div>
        <div
            class="filter-sort-section"
            v-if="showQuickFilterHeading && !($store.getters['editor/conceptMode'] && !loggedIn)">
            <h3 class="filter-sort-header">
                Quick Filters
            </h3>
            <div
                v-for="option in quickFilters"
                :key="option"
                class="field">
                <template v-if="option.enabled">
                    <input
                        class="is-checkradio"
                        :id="option.id"
                        type="checkbox"
                        v-model="option.checked"
                        :name="option.id">
                    <label
                        class="label"
                        :for="option.id">{{ option.label }}</label>
                </template>
            </div>
        </div>
        <div
            class="filter-sort-section"
            v-if="!$store.getters['editor/conceptMode']">
            <h3 class="filter-sort-header">
                Apply search term to
            </h3>
            <div
                v-for="option in applySearchTo"
                :key="option"
                class="field">
                <template v-if="option.enabled">
                    <input
                        class="is-checkradio"
                        :id="option.id"
                        v-model="option.checked"
                        type="checkbox"
                        :name="option.id">
                    <label
                        class="label"
                        :for="option.id">{{ option.label }}</label>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterAndSort',
    data() {
        return {
            sortResults: [
                {
                    id: 'dateCreated',
                    label: 'created date',
                    enabled: true
                },
                {
                    id: 'lastEdited',
                    label: 'last modified',
                    enabled: true
                }
            ],
            quickFilters: [
                {
                    id: 'configMatchDefault',
                    checked: false,
                    label: 'Configuration matches default',
                    enabled: true
                },
                {
                    id: 'ownedByMe',
                    checked: false,
                    label: 'Owned by me',
                    enabled: true
                },
                {
                    id: 'notOwnedByMe',
                    checked: false,
                    label: 'Not owned by me',
                    enabled: true
                }

            ],
            applySearchTo: [
                {
                    id: 'frameworkName',
                    checked: false,
                    label: 'Framework name',
                    enabled: true
                },
                {
                    id: 'frameworkDescription',
                    checked: false,
                    label: 'Framework description',
                    enabled: true
                },
                {
                    id: 'competencyLabel',
                    checked: false,
                    label: 'Competency label',
                    enabled: false
                },
                {
                    id: 'competencyName',
                    checked: false,
                    label: 'Competency name',
                    enabled: true
                },
                {
                    id: 'competencyDescription',
                    checked: false,
                    label: 'Competency description',
                    enabled: true
                },
                {
                    id: 'ownerName',
                    checked: false,
                    label: 'Owner name',
                    enabled: true
                }
            ],
            showQuickFilterHeading: true
        };
    },
    computed: {
        sortBy: {
            get() {
                return this.$store.getters['app/sortResults'];
            },
            set(val) {
                this.$store.commit('app/sortResults', val);
            }
        },
        loggedIn: function() {
            return EcIdentityManager.ids && EcIdentityManager.ids.length;
        },
        searchByOwnerNameEnabled: function() {
            return this.$store.state.featuresEnabled.searchByOwnerNameEnabled;
        },
        configurationsEnabled: function() {
            return this.$store.state.featuresEnabled.configurationsEnabled;
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        }
    },
    mounted: function() {
        if (!this.searchByOwnerNameEnabled) {
            for (var i = 0; i < this.applySearchTo.length; i++) {
                if (this.applySearchTo[i].id === "ownerName") {
                    this.applySearchTo[i].enabled = false;
                }
            }
        }
        if (!this.loggedIn) {
            for (var i = 0; i < this.quickFilters.length; i++) {
                if (this.quickFilters[i].id !== "configMatchDefault") {
                    this.quickFilters[i].enabled = false;
                }
            }
        }
        if (this.$store.getters['editor/conceptMode'] || !this.configurationsEnabled) {
            for (var i = 0; i < this.quickFilters.length; i++) {
                if (this.quickFilters[i].id === "configMatchDefault") {
                    this.quickFilters[i].enabled = false;
                }
            }
        }
        let showFilters = false;
        for (var i = 0; i < this.quickFilters.length; i++) {
            if (this.quickFilters[i].enabled === true) {
                showFilters = true;
            }
        }
        this.showQuickFilterHeading = showFilters;
        if (this.queryParams.ceasnDataFields === 'true') {
            for (var i = 0; i < this.applySearchTo.length; i++) {
                if (this.applySearchTo[i].id === "competencyLabel") {
                    this.applySearchTo[i].enabled = true;
                } else if (this.applySearchTo[i].id === "competencyName") {
                    this.applySearchTo[i].label = "Competency text";
                } else if (this.applySearchTo[i].id === "competencyDescription") {
                    this.applySearchTo[i].label = "Competency comment";
                }
            }
        }
    },
    watch: {
        applySearchTo: {
            handler() {
                this.$store.commit('app/applySearchTo', this.applySearchTo);
            },
            deep: true

        },
        quickFilters: {
            handler() {
                appLog('watched');
                this.$store.commit('app/quickFilters', this.quickFilters);
            },
            deep: true
        }
    }
};
</script>

<style lang="scss">
.filter-sort-section {
    padding-top: .75rem;
}
.filter-sort-header {
    padding-bottom: .5rem;
    font-size: 1rem;
    font-weight: 600;
}
</style>