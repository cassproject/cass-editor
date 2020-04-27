<template>
    <div>
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
                        v-model="option.checked"
                        :value="true"
                        :name="option.id">
                    <label :for="option.id">{{ option.label }}</label>
                </template>
            </div>
        </div>
        <div class="section">
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
        <div class="section">
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
                    checked: false,
                    label: 'created date',
                    enabled: true
                },
                {
                    id: 'datePublished',
                    checked: false,
                    label: 'published date',
                    enabled: true
                },
                {
                    id: 'lastEdited',
                    checked: false,
                    label: 'last edited',
                    enabled: true
                },
                {
                    id: 'configMatchDefault',
                    checked: false,
                    label: 'Configuration matches default',
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
                    id: 'publishedByMe',
                    checked: false,
                    label: 'Published by me',
                    enabled: true
                },
                {
                    id: 'authoredByMe',
                    checked: false,
                    label: 'Authored by me',
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
                    label: 'Competency name',
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
    mounted: function() {

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
                console.log('watched');
                this.$store.commit('app/quickFilters', this.quickFilters);
            },
            deep: true
        },
        sortResults: {
            handler() {
                this.$store.commit('app/sortResults', this.sortResults);
            },
            deep: true
        }
    }
};
</script>