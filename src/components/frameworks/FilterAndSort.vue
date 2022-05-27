<template>
    <div class="cass--right-aside--content">
        <div class="section">
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
                            :disabled="isFirstSearchProcessing"
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
                v-if="showQuickFilterHeading && !($store.getters['editor/conceptMode'] && !loggedIn) && !($store.getters['editor/progressionMode'] && !loggedIn)">
                <h3 class="filter-sort-header">
                    Quick Filters
                </h3>
                <div
                    v-for="option in quickFilters"
                    v-show="!hideOwnershipFilters || !option.id.includes('ByMe')"
                    :key="option"
                    class="field">
                    <template v-if="option.enabled">
                        <input
                            class="is-checkradio"
                            :disabled="isFirstSearchProcessing"
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
                v-if="!$store.getters['editor/conceptMode'] && !$store.getters['editor/progressionMode']">
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
                            :disabled="isFirstSearchProcessing"
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
    </div>
</template>

<script>
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';
import tlaProfile from '@/mixins/tlaProfile.js';
import {cassUtil} from '@/mixins/cassUtil.js';

export default {
    name: 'FilterAndSort',
    data() {
        return {
            sortResults: [
                {
                    id: 'alphabetical',
                    label: 'alphabetical',
                    enabled: true
                },
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
            frameworkPropertiesApplySearchTo: [],
            competencyPropertiesApplySearchTo: [],
            otherPropertiesApplySearchTo: [],
            showQuickFilterHeading: true,
            frameworkConfig: null,
            configPropertiesToIgnore: ["@id", "headings", "primaryProperties", "secondaryProperties", "tertiaryProperties", "ctid"],
            searchTermsFromRawSchemata: {}
        };
    },
    mixins: [ctdlasnProfile, tlaProfile, cassUtil],
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
            return EcIdentityManager.default.ids && EcIdentityManager.default.ids.length;
        },
        searchByOwnerNameEnabled: function() {
            return this.$store.state.featuresEnabled.searchByOwnerNameEnabled;
        },
        configurationsEnabled: function() {
            return this.$store.state.featuresEnabled.configurationsEnabled;
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        hideOwnershipFilters: function() {
            return this.queryParams.show === 'mine';
        },
        applySearchTo: function() {
            return this.frameworkPropertiesApplySearchTo.concat(this.competencyPropertiesApplySearchTo).concat(this.otherPropertiesApplySearchTo);
        },
        conceptMode: function() {
            return this.$store.getters['editor/conceptMode'];
        },
        progressionMode: function() {
            return this.$store.getters['editor/progressionMode'];
        },
        isFirstSearchProcessing: function() {
            return this.$store.getters['editor/firstSearchProcessing'];
        }
    },
    mounted: function() {
        if (!this.conceptMode && !this.progressionMode) {
            this.setSearchTermsFromRawSchemata();
            this.getFrameworkConfig();
            this.setOtherPropertiesApplySearchTo();
            this.setCompetencyPropertiesApplySearchTo();
        }
        if (!this.loggedIn) {
            for (var i = 0; i < this.quickFilters.length; i++) {
                if (this.quickFilters[i].id !== "configMatchDefault") {
                    this.quickFilters[i].enabled = false;
                }
            }
        }
        if (this.conceptMode || this.progressionMode || !this.configurationsEnabled) {
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
        },
        frameworkConfig: function() {
            if (this.frameworkConfig) {
                this.setFrameworkPropertiesApplySearchTo();
            }
        }
    },
    methods: {
        getFrameworkConfig: async function() {
            if (this.queryParams.ceasnDataFields === "true") {
                this.frameworkConfig = this.ctdlAsnFrameworkProfile;
            } else if (this.queryParams.tlaProfile === "true") {
                this.frameworkConfig = this.tlaFrameworkProfile;
            } else if (this.getDefaultBrowserConfigId() && !this.getDefaultBrowserConfigId().trim().equals('')) {
                let c = await EcRepository.get(this.getDefaultBrowserConfigId());
                this.frameworkConfig = c.frameworkConfig;
            } else {
                let me = this;
                window.repo.searchWithParams("@type:Configuration", {'size': 10000}, null,
                    function(ca) {
                        let found = false;
                        for (let c of ca) {
                            if (c.isDefault === "true" || c.isDefault === true) {
                                me.frameworkConfig = c.frameworkConfig;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            me.setDefaultFrameworkSearchTerms();
                        }
                    }, function() {
                        me.setDefaultFrameworkSearchTerms();
                    });
            }
        },
        setFrameworkPropertiesApplySearchTo: function() {
            let keys = EcObject.keys(this.frameworkConfig);
            let properties = [];
            for (let prop of keys) {
                if (EcArray.has(this.configPropertiesToIgnore, prop)) {
                    continue;
                }
                if (this.frameworkConfig[prop]["http://schema.org/rangeIncludes"][0]["@id"] !== "http://www.w3.org/2000/01/rdf-schema#langString" &&
                    this.frameworkConfig[prop]["http://schema.org/rangeIncludes"][0]["@id"] !== "http://schema.org/Text") {
                    continue;
                }
                let label = this.frameworkConfig[prop]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                let id = "";
                if (prop === "http://schema.org/name") {
                    id = "frameworkName";
                } else if (prop === "http://schema.org/description") {
                    id = "frameworkDescription";
                } else {
                    id = this.getSearchTermForProperty(prop);
                }
                properties.push(
                    {
                        id: id,
                        checked: false,
                        label: label,
                        enabled: true
                    }
                );
            }
            this.frameworkPropertiesApplySearchTo = properties;
        },
        setSearchTermsFromRawSchemata: function() {
            // Used to figure out prefixes to use when searching from the full property URL in the configuration
            let context = this.$store.state.lode.rawSchemata["https://schema.cassproject.org/0.4"]["@context"];
            let keys = EcObject.keys(context);
            for (let key of keys) {
                if (EcObject.isObject(context[key])) {
                    continue;
                }
                this.searchTermsFromRawSchemata[context[key]] = key;
            }
        },
        getSearchTermForProperty: function(prop) {
            let keys = EcObject.keys(this.searchTermsFromRawSchemata);
            let shortProp;
            for (let key of keys) {
                if (prop.indexOf(key) !== -1) {
                    if (key === "https://schema.cassproject.org/0.4/") {
                        shortProp = prop.replace(key, "");
                    } else {
                        shortProp = prop.replace(key, this.searchTermsFromRawSchemata[key] + "\\:");
                    }
                }
            }
            return shortProp;
        },
        setDefaultFrameworkSearchTerms: function() {
            this.frameworkPropertiesApplySearchTo = [
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
                }
            ];
        },
        setOtherPropertiesApplySearchTo: function() {
            this.otherPropertiesApplySearchTo = [
                {
                    id: 'directoryName',
                    checked: false,
                    label: 'Directory name',
                    enabled: true
                },
                {
                    id: 'directoryDescription',
                    checked: false,
                    label: 'Directory description',
                    enabled: true
                }
            ];
            if (this.searchByOwnerNameEnabled) {
                this.otherPropertiesApplySearchTo.push(
                    {
                        id: 'ownerName',
                        checked: false,
                        label: 'Owner name',
                        enabled: true
                    }
                );
            }
        },
        setCompetencyPropertiesApplySearchTo: function() {
            if (this.queryParams.ceasnDataFields === 'true') {
                this.competencyPropertiesApplySearchTo = [
                    {
                        id: 'competencyLabel',
                        checked: false,
                        label: 'Competency label',
                        enabled: true
                    },
                    {
                        id: 'competencyName',
                        checked: false,
                        label: 'Competency text',
                        enabled: true
                    },
                    {
                        id: 'competencyDescription',
                        checked: false,
                        label: 'Competency comment',
                        enabled: true
                    }
                ];
            } else {
                this.competencyPropertiesApplySearchTo = [
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
                    }
                ];
            }
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