<template>
    <div
        id="import-from-file"
        class="columns is-mobile">
        <div class="column is-12">
            <div class="container py-6">
                <slot name="import-file-title">
                    <p>Nothing send from import.vue</p>
                </slot>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <ImportTabs />
                    </div>
                    <div
                        v-if="importTransition === 'process' || importTransition === 'upload' || importTransition === 'info'"
                        class="column is-12">
                        <!-- file input -->
                        <div
                            class="has-dashed-border columns is-vcentered has-text-centered"
                            id="drop-area">
                            <drag-and-drop
                                class="column is-12"
                                v-if="importTransition === 'upload'"
                                @clear-files="clearFiles" />
                            <div
                                v-else-if="(importTransition === 'process' || importTransition === 'info') && importErrors.length === 0"
                                class="column">
                                <div class="section has-text-centered">
                                    <span
                                        class="icon is-large"
                                        v-if="importTransition === 'process'">
                                        <i class="fa fa-spinner fa-pulse fa-2x" />
                                    </span>
                                </div>
                                <div class="section">
                                    <p
                                        class="is-size-6">
                                        {{ importStatus }}
                                    </p>
                                </div>
                            </div>
                            <!-- import errors -->
                            <div
                                v-else-if="importErrors.length > 0"
                                class="column has-text-danger">
                                <ul>
                                    <li
                                        class="is-size-6"
                                        v-for="(error, index) in importErrors"
                                        :key="index">
                                        <span class="">
                                            <span class="icon">
                                                <i class="fa fa-times" />
                                            </span>
                                            {{ error }}
                                        </span>
                                    </li>
                                    <li />
                                </ul>
                                <div class="section">
                                    <div class="buttons is-centered">
                                        <div
                                            @click="resetImport()"
                                            class="button is-primary">
                                            <span class="icon">
                                                <i class="fa fa-redo" />
                                            </span>
                                            <span>start over</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- HANDLE CSV INPUTS -->
                        <div
                            v-if="importFileType == 'csv' && importType == 'file'"
                            class="section csv-input">
                            <div
                                v-for="item in csvImportDetails"
                                :key="item"
                                class="field">
                                <label class="label">
                                    {{ item.label }}
                                </label>
                                <div
                                    v-if="item.type === 'string'"
                                    class="control">
                                    <input
                                        class="input"
                                        v-model="item.value">
                                </div>
                                <div
                                    v-else-if="item.type === 'column'"
                                    class="control">
                                    <div class="select is-smal">
                                        <select
                                            v-model="item.value">
                                            <option
                                                value
                                                selected>
                                                N/A
                                            </option>
                                            <option
                                                v-for="(column, i) in csvColumns"
                                                :key="i"
                                                :value="column">
                                                {{ column.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div
                                    v-else-if="item.type === 'file'"
                                    class="file is-primary">
                                    <label class="file-label">
                                        <input
                                            class="file-input"
                                            type="file"
                                            name="relation-file"
                                            @change="analyzeCsvRelation">
                                        <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fas fa-upload" />
                                            </span>
                                            <span class="file-label">
                                                Choose a file…
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <!-- IF RELATIONAL FILE, GATHER DETAILS -->
                            <template v-if="csvRelationFile">
                                <div
                                    v-for="item in csvRelationDetails"
                                    :key="item"
                                    class="field">
                                    <div class="field">
                                        <label class="label">
                                            {{ item.label }}
                                        </label>
                                        <div class="select is-small">
                                            <select v-model="item.value">
                                                <option
                                                    value
                                                    selected>
                                                    n/a
                                                </option>
                                                <option
                                                    v-for="(column, i) in csvRelationColumns"
                                                    :key="i"
                                                    :value="column">
                                                    {{ column.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <!-- HANDLE MEDBIQ -->
                        <div v-else-if="importFileType =='medbiq' && importType == 'file'">
                            <div
                                v-for="item in medbiqDetails"
                                :key="item"
                                class="field">
                                <label class="label">
                                    {{ item.label }}
                                </label>
                                <div class="control">
                                    <input
                                        v-if="item.type === 'string'"
                                        class="input"
                                        v-model="item.value">
                                </div>
                            </div>
                        </div>
                        <!-- handle non pdf imports -->
                        <div
                            v-if="importType === 'file' && importTransition === 'info'"
                            class="buttons is-right">
                            <div
                                class="button is-pulled-right is-outlined is-dark"
                                v-if="importFile && importType === 'file' && importFileType!=='pdf'"
                                @click="cancelImport">
                                <span class="icon">
                                    <i class="fas fa-times" />
                                </span>
                                <span>
                                    Cancel
                                </span>
                            </div>
                            <div
                                class="button is-pulled-right is-outlined is-primary"
                                v-if="importFile && importType === 'file' && importFileType!=='pdf'"
                                @click="prepareToImportNonPdf">
                                <span class="icon">
                                    <i class="fas fa-upload" />
                                </span>
                                <span>
                                    Import
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="column is-12">
                        <slot name="import-framework" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ImportTabs from '@/components/import/ImportTabs';
import DragAndDrop from '@/components/import/DragAndDrop';
import imports from '@/mixins/import';

export default {
    name: 'ImportFile',
    components: {
        ImportTabs,
        DragAndDrop
    },
    mixins: [ imports ],
    props: {
        conceptMode: {
            type: Boolean,
            default: false
        },
        importFile: {
            type: Array,
            default: () => { return []; }
        },
        importTransition: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        };
    },
    computed: {
        medbiqDetails: function() {
            return {
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
            };
        },
        csvImportDetails: function() {
            return {
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
                    value: this.importNameColumn,
                    type: 'column'
                },
                descriptionColumn: {
                    label: 'Select the Description column (optional)',
                    value: this.importDescriptionColumn,
                    type: 'column'
                },
                scopeColumn: {
                    label: 'Select the Scope column (optional)',
                    value: this.importScopeColumn,
                    type: 'column'
                },
                idColumn: {
                    label: 'Select the ID column (optional). If chosen, this should be a URL from another CaSS system or a non-numeric ID',
                    value: this.importIdColumn,
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
            };
        },
        csvRelationDetails: function() {
            return {
                sourceColumn: {
                    label: 'Select the Source column',
                    type: 'column',
                    value: this.importSourceColumn
                },
                relationColumn: {
                    label: 'Select the Relation Type column.',
                    type: 'column',
                    value: this.importRelationColumn
                },
                targetColumn: {
                    label: 'Select the Target column.',
                    type: 'column',
                    value: this.importTargetColumn
                }
            };
        },
        importInfoVisible: function() {
            return this.$store.getters['app/showRightAside'];
        },
        importErrors: function() {
            return this.$store.getters['app/importErrors'];
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        },
        importFileType: function() {
            return this.$store.getters['app/importFileType'];
        },
        importType: function() {
            return this.$store.getters['app/importType'];
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
        importNameColumn: {
            get() {
                return this.$store.getters['app/importNameColumn'];
            },
            set(val) {
                this.$store.commit('app/importNameColumn', val);
            }
        },
        importDescriptionColumn: {
            get() {
                return this.$store.getters['app/importDescriptionColumn'];
            },
            set(val) {
                this.$store.commit('app/importDescriptionColumn', val);
            }
        },
        importScopeColumn: {
            get() {
                return this.$store.getters['app/importScopeColumn'];
            },
            set(val) {
                this.$store.commit('app/importScopeColumn', val);
            }
        },
        importIdColumn: {
            get() {
                return this.$store.getters['app/importIdColumn'];
            },
            set(val) {
                this.$store.commit('app/importIdColumn', val);
            }
        },
        importSourceColumn: {
            get() {
                return this.$store.getters['app/importSourceColumn'];
            },
            set(val) {
                this.$store.commit('app/importSourceColumn', val);
            }
        },
        importRelationColumn: {
            get() {
                return this.$store.getters['app/importRelationColumn'];
            },
            set(val) {
                this.$store.commit('app/importRelationColumn', val);
            }
        },
        importTargetColumn: {
            get() {
                return this.$store.getters['app/importTargetColumn'];
            },
            set(val) {
                this.$store.commit('app/importTargetColumn', val);
            }
        },
        csvColumns: function() {
            return this.$store.getters['app/csvColumns'];
        },
        csvRelationColumns: function() {
            return this.$store.getters['app/csvRelationColumns'];
        },
        csvRelationFile: function() {
            return this.$store.getters['app/csvRelationFile'];
        }
    },
    methods: {
        clearFiles: function() {
            this.$store.commit('app/clearImportFiles');
        },
        prepareToImportNonPdf: function() {
            if (this.importFileType === 'csv') {
                // prepare csv
                // frameworkName
                this.$store.commit('app/importFrameworkName', this.csvImportDetails.name.value);
                this.$store.commit('app/importFrameworkDescription', this.csvImportDetails.description.value);
                this.$store.commit('app/importNameColumn', this.csvImportDetails.nameColumn.value);
                this.$store.commit('app/importDescriptionColumn', this.csvImportDetails.descriptionColumn.value);
                this.$store.commit('app/importScopeColumn', this.csvImportDetails.scopeColumn.value);
                this.$store.commit('app/importIdColumn', this.csvImportDetails.idColumn.value);
                this.$store.commit('app/importSourceColumn', this.csvRelationDetails.sourceColumn.value);
                this.$store.commit('app/importTargetColumn', this.csvRelationDetails.targetColumn.value);
                this.$store.commit('app/importRelationColumn', this.csvRelationDetails.relationColumn.value);
                // frameworkDescription
                this.$store.commit('app/importTransition', 'uploadCsv');
            } else if (this.importFileType === 'medbiq') {
                this.$store.commit('app/importFrameworkName', this.csvImportDetails.name.value);
                this.$store.commit('app/importFrameworkDescription', this.csvImportDetails.description.value);
                this.$store.commit('app/importTransition', 'uploadMedbiq');
            } else if (this.importFileType !== 'pdf') {
                this.$store.commit('app/importTransition', 'uploadOtherNonPdf');
            }
        }
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
    }
};
</script>