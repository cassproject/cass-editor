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
                                            v-model="item.value"
                                            @change="updateColumn(item)">
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
                            v-if="(importType === 'file' && importTransition === 'info') || importAllowCancel"
                            class="buttons is-right">
                            <div
                                class="button is-pulled-right is-outlined is-dark"
                                v-if="(importFile && importType === 'file' && importFileType!=='pdf') || importAllowCancel"
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
                                v-if="(importFile && importType === 'file' && importFileType!=='pdf') && !importAllowCancel"
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
        progressionMode: {
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
            optionImportFrameworkName: this.$store.getters['app/importFrameworkName'],
            optionImportFrameworkDescription: this.$store.getters['app/importFrameworkDescription'],
            optionImportNameColumn: this.$store.getters['app/importNameColumn'],
            optionImportDescriptionColumn: this.$store.getters['app/importDescriptionColumn'],
            optionImportScopeColumn: this.$store.getters['app/importScopeColumn'],
            optionImportIdColumn: this.$store.getters['app/importIdColumn']
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
                    id: 'name',
                    label: 'Name the framework',
                    value: this.optionImportFrameworkName,
                    type: 'string'
                },
                description: {
                    id: 'description',
                    label: 'Describe the framework (optional)',
                    value: this.optionImportFrameworkDescription,
                    type: 'string'
                },
                nameColumn: {
                    id: 'nameColumn',
                    label: 'Select the Name column',
                    value: this.optionImportNameColumn,
                    type: 'column'
                },
                descriptionColumn: {
                    id: 'descriptionColumn',
                    label: 'Select the Description column (optional)',
                    value: this.optionImportDescriptionColumn,
                    type: 'column'
                },
                scopeColumn: {
                    id: 'scopeColumn',
                    label: 'Select the Scope column (optional)',
                    value: this.optionImportScopeColumn,
                    type: 'column'
                },
                idColumn: {
                    id: 'idColumn',
                    label: 'Select the ID column (optional). If chosen, this should be a URL from another CaSS system or a non-numeric ID',
                    value: this.optionImportIdColumn,
                    type: 'column'
                },
                relationFile: {
                    id: 'relationFile',
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
        importAllowCancel: function() {
            return this.$store.getters['app/importAllowCancel'];
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
        importFrameworkName: function() {
            return this.$store.getters['app/importFrameworkName'];
        },
        importFrameworkDescription: function() {
            return this.$store.getters['app/importFrameworkDescription'];
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
                this.$store.commit('app/importFrameworkName', this.optionImportFrameworkName);
                this.$store.commit('app/importFrameworkDescription', this.optionImportFrameworkDescription);
                this.$store.commit('app/importNameColumn', this.optionImportNameColumn);
                this.$store.commit('app/importDescriptionColumn', this.optionImportDescriptionColumn);
                this.$store.commit('app/importScopeColumn', this.optionImportScopeColumn);
                this.$store.commit('app/importIdColumn', this.optionImportIdColumn);
                this.$store.commit('app/importSourceColumn', this.csvRelationDetails.sourceColumn.value);
                this.$store.commit('app/importTargetColumn', this.csvRelationDetails.targetColumn.value);
                this.$store.commit('app/importRelationColumn', this.csvRelationDetails.relationColumn.value);
                this.$store.commit('app/importTransition', 'uploadCsv');
            } else if (this.importFileType === 'medbiq') {
                this.$store.commit('app/importFrameworkName', this.optionImportFrameworkName);
                this.$store.commit('app/importFrameworkDescription', this.optionImportFrameworkDescription);
                this.$store.commit('app/importTransition', 'uploadMedbiq');
            } else if (this.importFileType !== 'pdf') {
                this.$store.commit('app/importTransition', 'uploadOtherNonPdf');
            }
        },
        updateColumn(column) {
            if (column.id) {
                if (column.id === 'name') {
                    this.optionImportFrameworkName = column.value;
                } else if (column.id === 'description') {
                    this.optionImportFrameworkDescription = column.value;
                } else if (column.id === 'nameColumn') {
                    this.optionImportNameColumn = column.value;
                } else if (column.id === 'descriptionColumn') {
                    this.optionImportDescriptionColumn = column.value;
                } else if (column.id === 'scopeColumn') {
                    this.optionImportScopeColumn = column.value;
                } else if (column.id === 'idColumn') {
                    this.optionImportIdColumn = column.value;
                }
            }
        }
    },
    watch: {
        importNameColumn: function() {
            this.optionImportNameColumn = this.importNameColumn;
        },
        importDescriptionColumn: function() {
            this.optionImportDescriptionColumn = this.importDescriptionColumn;
        },
        importScopeColumn: function() {
            this.optionImportScopeColumn = this.importScopeColumn;
        },
        importIdColumn: function() {
            this.optionImportIdColumn = this.importIdColumn;
        },
        importFrameworkName: function() {
            this.optionImportFrameworkName = this.importFrameworkName;
        },
        importFrameworkDescription: function() {
            this.optionImportFrameworkDescription = this.importFrameworkDescription;
        },
        importSourceColumn: function() {
            this.csvRelationDetails.sourceColumn.value = this.importSourceColumn;
        },
        importRelationColumn: function() {
            this.csvRelationDetails.relationColumn.value = this.importRelationColumn;
        },
        importTargetColumn: function() {
            this.csvRelationDetails.targetColumn.value = this.importTargetColumn;
        }
    }
};
</script>