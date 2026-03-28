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
                                @click="store.app().setImportStatus('parseText')"
                                id="import-text-import-button">
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
                                        id="import-framework-name-input"
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
                                        v-model="rawImportText"
                                        id="import-text-paste-textarea" />
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
import store from '@/stores/index.js';
import ImportTabs from '@/components/import/ImportTabs.vue';
import imports from '@/mixins/import.js';
import common from '@/mixins/common.js';

export default {
    name: 'ImportText',
    setup() {
        return { store };
    },
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
            return store.app().showRightAside;
        },
        importText() {
            // remove characters first
            return this.rawImportText;
        },
        text: function() {
            return store.app().importText;
        },
        importStatus: function() {
            return store.app().importStatus;
        },
        importFrameworkName: {
            get: function() {
                return store.app().importFrameworkName;
            },
            set: function(val) {
                return store.app().setImportFrameworkName(val);
            }
        },
        importFrameworkDescription: function() {
            return store.app().importFrameworkDescription;
        },
        queryParams: function() {
            return store.editor().queryParams;
        },
        conceptMode: function() {
            return store.editor().conceptMode;
        },
        progressionMode: function() {
            return store.editor().progressionMode;
        },
        importErrors: function() {
            return store.app().importErrors;
        },
        importFramework: function() {
            return store.app().importFramework;
        },
        importType: function() {
            return store.app().importType;
        },
        importTransition: function() {
            return store.app().importTransition;
        }
    }
};
</script>