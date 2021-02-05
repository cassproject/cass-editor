<template>
    <div
        id="import-from-text"
        class="columns is-mobile">
        <div class="column is-12">
            <div class="container py-6">
                <slot name="import-text-title">
                    <p>No import type selected</p>
                </slot>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <ImportTabs />
                    </div>
                    <div class="column is-12">
                        <h3 class="title is-size-3 has-text-weight-medium">
                            <span
                                class="button is-pulled-right is-large is-primary is-outlined mr-4"
                                :disabled="!importFrameworkName || !importText || importFrameworkName.trim().length === 0"
                                @click="$store.commit('app/importStatus', 'parseText')">
                                Import
                            </span>
                        </h3>
                    </div>
                    <div
                        class="column"
                        :class="importText !== '' ? 'is-6' :'is-12'">
                        <!-- text input -->
                        <div
                            class="import-by-text-form">
                            <h3 class="label is-size-4">
                                Import by text form
                            </h3>
                            <div class="field">
                                <label class="label">
                                    Framework name
                                </label>
                                <div class="control">
                                    <input
                                        class="input"
                                        v-model="importFrameworkName"
                                        placeholder="Framework Name">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">
                                    Paste Text
                                </label>
                                <div class="control">
                                    <textarea
                                        placeholder="Start typing or paste your text here..."
                                        @keypress="handleKeydown($event)"
                                        class="textarea import-text-textarea"
                                        v-model="rawImportText" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-6">
                        <slot name="import-framework" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ImportTabs from '@/components/import/ImportTabs';
import imports from '@/mixins/import.js';
import common from '@/mixins/common.js';

export default {
    name: 'ImportText',
    props: {
    },
    components: {
        ImportTabs
    },
    mixins: [ imports, common ],
    data() {
        return {
            rawImportText: ''
        };
    },
    methods: {
        handleKeydown: function(e) {
        }
    },
    computed: {
        importInfoVisible: function() {
            return this.$store.getters['app/showRightAside'];
        },
        importText() {
            // remove characters first
            return this.rawImportText;
        },
        text: function() {
            return this.$store.getters['app/importText'];
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        },
        importFrameworkName: {
            get: function() {
                return this.$store.getters['app/importFrameworkName'];
            },
            set: function(val) {
                return this.$store.commit('app/importFrameworkName', val);
            }
        },
        importFrameworkDescription: function() {
            return this.$store.getters['app/importFrameworkDescription'];
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        conceptMode: function() {
            return this.$store.getters['editor/conceptMode'];
        },
        importErrors: function() {
            return this.$store.getters['app/importErrors'];
        },
        importFramework: function() {
            return this.$store.getters['app/importFramework'];
        },
        importType: function() {
            return this.$store.getters['app/importType'];
        },
        importTransition: function() {
            return this.$store.getters['app/importTransition'];
        }
    }
};
</script>