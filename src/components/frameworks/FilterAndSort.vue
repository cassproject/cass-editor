<template>
    <div class="right-aside__filter-and-sort">
        <h3 class="title is-size-3">
            Filter and Sort
        </h3>
        <div class="section">
            <h3 class="title is-size-4">
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
                    <label :for="option.id">{{ option.label }}</label>
                </template>
            </div>
        </div>
        <div
            class="section"
            v-if="!($store.getters['editor/conceptMode'] && !loggedIn)">
            <h3 class="title is-size-4">
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
                    <label :for="option.id">{{ option.label }}</label>
                </template>
            </div>
        </div>
        <div
            class="section"
            v-if="!$store.getters['editor/conceptMode']">
            <h3 class="title is-size-4">
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
                    <label :for="option.id">{{ option.label }}</label>
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
                    label: 'last edited',
                    enabled: true
                }
            ],
            quickFilters: [
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
                },
                {
                    id: 'configMatchDefault',
                    checked: false,
                    label: 'Configuration matches default',
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
            ]
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
        }
    },
    mounted: function() {
        if (!this.loggedIn) {
            for (var i = 0; i < this.quickFilters.length; i++) {
                if (this.quickFilters[i].id !== "configMatchDefault") {
                    this.quickFilters[i].enabled = false;
                }
            }
        }
        if (this.$store.getters['editor/conceptMode']) {
            for (var i = 0; i < this.quickFilters.length; i++) {
                if (this.quickFilters[i].id === "configMatchDefault") {
                    this.quickFilters[i].enabled = false;
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