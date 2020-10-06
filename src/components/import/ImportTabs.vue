<!--ImportTabs.vue
    Displays options for importing a framework
    Components:
        DragAndDrop.vue
        Container which accepts drag and dropped files
-->
<template>
    <!-- import drop area and tabs -->
    <div
        id="import-bottom-section"
        class="container">
        <!-- types of import for tabs -->
        <div
            v-if="!importFramework || (importFramework && importType === 'text')"
            class="py-4">
            <div class="tile is-vertical">
                <div class="section is-medium">
                    <!-- columns for tabs -->
                    <div class="columns is-multiline is-mobile">
                        <!-- file -->
                        <div class="column">
                            <div
                                class="import-tab"
                                :class="{ 'is-active-tab': importType === 'file'}">
                                <a @click="$store.commit('app/importType', 'file')">
                                    <i
                                        class="fa fa-2x fa-file has-text-centered is-block"
                                        aria-hidden="true" />
                                    <div class="is-hidden-mobile is-block has-text-centered">
                                        File Import
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- server tab -->
                        <div
                            class="column"
                            v-if="!conceptMode">
                            <div
                                class="import-tab"
                                :class="{ 'is-active-tab': importType === 'server'}">
                                <a @click="$store.commit('app/importType', 'server')">
                                    <i
                                        class="fa fa-2x fa-server is-block has-text-centered"
                                        aria-hidden="true" />
                                    <div class="is-hidden-mobile is-block has-text-centered">
                                        Remote Server
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- text tab -->
                        <div
                            class="column"
                            v-if="!conceptMode">
                            <div
                                class="import-tab"
                                :class="{ 'is-active-tab': importType === 'text'}">
                                <a @click="$store.commit('app/importType', 'text')">
                                    <i
                                        class="fa fa-2x fa-paste has-text-centered is-block"
                                        aria-hidden="true" />
                                    <div class="is-hidden-mobile is-block has-text-centered">
                                        Paste Text
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- url tab -->
                        <div
                            class="column"
                            v-if="!conceptMode">
                            <div
                                class="import-tab"
                                :class="{ 'is-active-tab': importType === 'url'}">
                                <a @click="$store.commit('app/importType', 'url')">
                                    <i
                                        class="fa fa-link has-text-centered is-block fa-2x"
                                        aria-hidden="true" />
                                    <div class="is-hidden-mobile is-block has-text-centered">
                                        URL Source
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import dragAndDrop from './../../components/import/DragAndDrop.vue';
import imports from '@/mixins/import.js';

export default {
    name: 'ImportTabs',
    components: {
        // dragAndDrop
    },
    mixins: [ imports ],
    props: {
        csvColumns: {
            default: function() { return []; },
            type: Array
        },
        csvRelationColumns: {
            default: function() { return []; },
            type: Array
        },
        csvRelationFile: {
            default: null,
            type: File
        },
        importCsvColumnSource: {
            default: function() { return {}; },
            type: Object
        },
        importCsvColumnRelationType: {
            default: function() { return {}; },
            type: Object
        },
        importCsvColumnTarget: {
            default: function() { return {}; },
            type: Object
        }
    },
    data() {
        return {
            csvImportDetails: {
                name: {
                    label: 'Name the framework',
                    value: this.importFrameworkName,
                    type: 'string'
                },
                description: {
                    label: 'Describe the framework (optional)',
                    value: this.importFrameworkDescription,
                    type: 'string'
                },
                nameColumn: {
                    label: 'Select the Name column',
                    value: this.$store.getters['app/importNameColumn'],
                    type: 'column'
                },
                descriptionColumn: {
                    label: 'Select the Description column (optional)',
                    value: this.$store.getters['app/importDescriptionColumn'],
                    type: 'column'
                },
                scopeColumn: {
                    label: 'Select the Scope column (optional)',
                    value: this.$store.getters['app/importScopeColumn'],
                    type: 'column'
                },
                idColumn: {
                    label: 'Select the ID column (optional). If chosen, this should be a URL from another CaSS system or a non-numeric ID',
                    value: this.$store.getters['app/importIdColumn'],
                    type: 'column'
                },
                relationFile: {
                    label: `Select a relation file (optional).
                                The relation source/target must be in the
                                form of ID or Name, and the relation types
                                should be "requires", "desires", "narrows",
                                "isEnabledBy", "isRelatedTo", or "isEquivalentTo`,
                    value: '',
                    type: 'file'
                }
            },
            csvRelationDetails: {
                sourceColumn: {
                    label: 'Select the Source column',
                    type: 'column',
                    value: this.$store.getters['app/importSourceColumn'],
                    array: this.importCsvColumnSource
                },
                relationColumn: {
                    label: 'Select the Relation Type column.',
                    type: 'column',
                    value: this.$store.getters['app/importRelationColumn'],
                    array: this.importColumnRelationType
                },
                targetColumn: {
                    label: 'Select the Target column.',
                    type: 'column',
                    value: this.$store.getters['app/importTargetColumn'],
                    array: this.importColumnTarget
                }
            },
            medbiqDetails: {
                name: {
                    label: 'Name the framework',
                    value: this.importFrameworkName,
                    type: 'string'
                },
                description: {
                    label: 'Describe the framework (optional)',
                    value: this.importFrameworkDescription,
                    type: 'string'
                }
            }
        };
    },
    watch: {
        importNameColumn: function() {
            this.csvImportDetails.nameColumn.value = this.importNameColumn;
        },
        importDescriptionColumn: function() {
            this.csvImportDetails.descriptionColumn.value = this.importDescriptionColumn;
        },
        importScopeColumn: function() {
            this.csvImportDetails.scopeColumn.value = this.importScopeColumn;
        },
        importIdColumn: function() {
            this.csvImportDetails.idColumn.value = this.importIdColumn;
        },
        importSourceColumn: function() {
            this.csvRelationDetails.sourceColumn.value = this.importSourceColumn;
        },
        importRelationColumn: function() {
            this.csvRelationDetails.relationColumn.value = this.importRelationColumn;
        },
        importTargetColumn: function() {
            this.csvRelationDetails.targetColumn.value = this.importTargetColumn;
        },
        importFrameworkName: function() {
            if (this.importFileType === "medbiq") {
                this.medbiqDetails.name.value = this.importFrameworkName;
            } else if (this.importFileType === "csv") {
                this.csvImportDetails.name.value = this.importFrameworkName;
            }
        },
        importFrameworkDescription: function() {
            if (this.importFileType === "medbiq") {
                this.medbiqDetails.description.value = this.importFrameworkDescription;
            } else if (this.importFileType === "csv") {
                this.csvImportDetails.description.value = this.importFrameworkDescription;
            }
        }
    },
    methods: {
        importCaseDocs: function() {
            this.$emit('importCase', this.caseDocs);
            this.$store.commit('app/importTransition', 'importingCaseFrameworks');
        },
        importFromUrl: function() {
            this.$store.commit('app/importStatus', 'importFromUrl');
            this.$store.commit('app/importTransition', 'importingFromUrl');
        },
        showImportModal: function(type) {
            let modalObject = {
                component: 'SupportedImportDetails',
                documentContent: type
            };
            this.$store.commit('app/showModal', modalObject);
        },
        importFromFile: function() {
            // import.vue watches for framework and file to be defined
            this.$store.commit('app/importType', 'file');
            this.$store.commit('app/importFramework', null);
            this.$store.commit('app/importTransition', 'upload');
        }
    },
    computed: {
        conceptMode: function() {
            return this.$store.getters['editor/conceptMode'];
        },
        importText: {
            get() {
                return this.$store.getters['app/importText'];
            },
            set(text) {
                this.$store.commit('app/importText', text);
            }
        },
        importServerUrl: {
            get() {
                return this.$store.getters['app/importServerUrl'];
            },
            set(url) {
                this.$store.commit('app/importServerUrl', url);
            }
        },
        importUrl: {
            get() {
                return this.$store.getters['app/importUrl'];
            },
            set(url) {
                this.$store.commit('app/importUrl', url);
            }
        },
        importErrors: function() {
            return this.$store.getters['app/importErrors'];
        },
        importFile: function() {
            return this.$store.getters['app/importFiles'];
        },
        importTransition: function() {
            return this.$store.getters['app/importTransition'];
        },
        importType: function() {
            return this.$store.getters['app/importType'];
        },
        importFileType: function() {
            return this.$store.getters['app/importFileType'];
        },
        importFramework: function() {
            return this.$store.getters['app/importFramework'];
        },
        importFrameworkName: {
            get: function() {
                return this.$store.getters['app/importFrameworkName'];
            },
            set: function(val) {
                this.$store.commit('app/importFrameworkName', val);
            }
        },
        importFrameworkDescription: function() {
            return this.$store.getters['app/importFrameworkDescription'];
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        },
        importNameColumn: function() {
            return this.$store.getters['app/importNameColumn'];
        },
        importDescriptionColumn: function() {
            return this.$store.getters['app/importDescriptionColumn'];
        },
        importScopeColumn: function() {
            return this.$store.getters['app/importScopeColumn'];
        },
        importIdColumn: function() {
            return this.$store.getters['app/importIdColumn'];
        },
        importSourceColumn: function() {
            return this.$store.getters['app/importSourceColumn'];
        },
        importRelationColumn: function() {
            return this.$store.getters['app/importRelationColumn'];
        },
        importTargetColumn: function() {
            return this.$store.getters['app/importTargetColumn'];
        }
    }
};
</script>

<style>
.is-vcentered {
    display: flex;
}

.remote-server {
    min-height: 300px;
}
</style>