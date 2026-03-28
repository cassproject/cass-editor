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
                                <div
                                    id="import-status"
                                    class="section">
                                    <p
                                        class="is-size-6">
                                        {{ importStatus }}
                                    </p>
                                </div>
                            </div>
                            <!-- import errors -->
                            <div
                                v-else-if="importErrors.length > 0"
                                class="column has-text-danger import-errors-container">
                                <p class="has-text-weight-bold mb-2">
                                    {{ importErrors.length }} error(s) found:
                                </p>
                                <div class="import-errors-list">
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
                                    </ul>
                                </div>
                                <div class="section">
                                    <div class="buttons is-centered">
                                        <div
                                            @click="cancelImport()"
                                            id="import-file-start-over-button"
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
                                        v-model="item.value"
                                        :id="item.id + '-input'"
                                        @change="updateColumn(item)">
                                </div>
                                <div
                                    v-else-if="item.type === 'column'"
                                    class="control">
                                    <div class="select is-smal">
                                        <select
                                            v-model="item.value"
                                            :id="item.id + '-select'"
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
                                            :id="item.id + '-file-input'"
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
                                            <select 
                                                :id="item.label.replace(/ /g, '-') + '-select'"
                                                v-model="item.value">
                                                <option
                                                    value
                                                    selected>
                                                    n/a
                                                </option>
                                                <option
                                                    v-for="(column, i) in csvRelationColumns"
                                                    :key="i"
                                                    :id="'import-csv-relation-' + item.label.replace(/ /g, '-') + '-option-' + i"
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
                                        :id="item.label.replace(/ /g, '-') + '-input'"
                                        v-model="item.value">
                                </div>
                            </div>
                        </div>
                        <!-- handle duplicates -->
                        <div v-if="duplicateSets.length > 0">
                            <div
                                class="has-text-danger">
                                <br>
                                Found {{ duplicateSets.length }} instance{{ duplicateSets.length > 1 ? 's' : '' }} of duplicate competencies with different CTIDs.
                                <br>
                                For each instance, choose whether to upload all or select a single CTID.
                            </div>
                            <br>
                            <div v-for="(set, i) in duplicateSets">
                                <div class="has-text-weight-bold">
                                    {{ set.competencyText }}
                                </div>
                                <div v-if="set.codedNotation">
                                    {{ "ceasn:codedNotation: " + set.codedNotation }}
                                </div>
                                <div>
                                    {{ set.lines }}
                                </div>
                                <br />
                                <div class="control">
                                    <label for="select-ctid">select CTID </label>
                                    <select
                                        id="select-ctid"
                                        name="CTIDs"
                                        v-model="selectedDuplicateOption[i]">
                                        <option
                                            v-for="duplicate in set.duplicates"
                                            :value="duplicate.ctid">
                                            {{ duplicate.ctid }}
                                        </option>
                                    </select>
                                </div>
                                <br>
                            </div>
                        </div>
                        <!-- handle non pdf imports -->
                        <div
                            v-if="(importType === 'file' && importTransition === 'info') || importAllowCancel"
                            class="buttons is-right">
                            <div
                                class="button is-pulled-right is-outlined is-dark"
                                v-if="(importFile && importType === 'file' && importFileType!=='pdf') || importAllowCancel"
                                @click="cancelImport"
                                id="import-file-cancel-button">
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
                                @click="prepareToImportNonPdf"
                                id="import-file-import-button">
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
import store from '@/stores/index.js';
import ImportTabs from '@/components/import/ImportTabs.vue';
import DragAndDrop from '@/components/import/DragAndDrop.vue';
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
            optionImportFrameworkName: store.app().importFrameworkName,
            optionImportFrameworkDescription: store.app().importFrameworkDescription,
            optionImportNameColumn: store.app().importNameColumn,
            optionImportDescriptionColumn: store.app().importDescriptionColumn,
            optionImportScopeColumn: store.app().importScopeColumn,
            optionImportIdColumn: store.app().importIdColumn,
            selectedDuplicateOption: [],
            duplicateSets: []
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
                                should be "requires", "desires", "narrows", "implies", "isImpliedBy",
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
            return store.app().importAllowCancel;
        },
        importInfoVisible: function() {
            return store.app().showRightAside;
        },
        importErrors: function() {
            return store.app().importErrors;
        },
        importStatus: function() {
            return store.app().importStatus;
        },
        importFileType: function() {
            return store.app().importFileType;
        },
        importType: function() {
            return store.app().importType;
        },
        importFrameworkName: function() {
            return store.app().importFrameworkName;
        },
        importFrameworkDescription: function() {
            return store.app().importFrameworkDescription;
        },
        importNameColumn: function() {
            return store.app().importNameColumn;
        },
        importDescriptionColumn: function() {
            return store.app().importDescriptionColumn;
        },
        importScopeColumn: function() {
            return store.app().importScopeColumn;
        },
        importIdColumn: function() {
            return store.app().importIdColumn;
        },
        importDuplicates: function() {
            return store.app().importDuplicates;
        },
        importSourceColumn: {
            get() {
                return store.app().importSourceColumn;
            },
            set(val) {
                store.app().setImportSourceColumn(val);
            }
        },
        importRelationColumn: {
            get() {
                return store.app().importRelationColumn;
            },
            set(val) {
                store.app().setImportRelationColumn(val);
            }
        },
        importTargetColumn: {
            get() {
                return store.app().importTargetColumn;
            },
            set(val) {
                store.app().setImportTargetColumn(val);
            }
        },
        csvColumns: function() {
            return store.app().csvColumns;
        },
        csvRelationColumns: function() {
            return store.app().csvRelationColumns;
        },
        csvRelationFile: function() {
            return store.app().csvRelationFile;
        }
    },
    methods: {
        cancelImport: function() {
            store.app().clearImport();
        },
        clearFiles: function() {
            store.app().clearImportFiles();
        },
        prepareToImportNonPdf: function() {
            let scrollOptions = {
                container: "#import",
                easing: "ease",
                offset: -150,
                force: true,
                cancelable: true,
                onStart: false,
                onDone: false,
                onCancel: false,
                x: false,
                y: true
            };
            this.updateDuplicateSkips();
            if (this.importFileType === 'csv') {
                // prepare csv
                store.app().setImportFrameworkName(this.optionImportFrameworkName);
                store.app().setImportFrameworkDescription(this.optionImportFrameworkDescription);
                store.app().setImportNameColumn(this.optionImportNameColumn);
                store.app().setImportDescriptionColumn(this.optionImportDescriptionColumn);
                store.app().setImportScopeColumn(this.optionImportScopeColumn);
                store.app().setImportIdColumn(this.optionImportIdColumn);
                store.app().setImportSourceColumn(this.csvRelationDetails.sourceColumn.value);
                store.app().setImportTargetColumn(this.csvRelationDetails.targetColumn.value);
                store.app().setImportRelationColumn(this.csvRelationDetails.relationColumn.value);
                store.app().setImportTransition('uploadCsv');
                this.$scrollTo('#import-status', 500, scrollOptions);
            } else if (this.importFileType === 'medbiq') {
                store.app().setImportFrameworkName(this.optionImportFrameworkName);
                store.app().setImportFrameworkDescription(this.optionImportFrameworkDescription);
                store.app().setImportTransition('uploadMedbiq');
                this.$scrollTo('#import-status', 500, scrollOptions);
            } else if (this.importFileType !== 'pdf') {
                store.app().setImportTransition('uploadOtherNonPdf');
                this.$scrollTo('#import-status', 500, scrollOptions);
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
        },
        findDuplicateSets: function() {
            // Separate duplicates by competencyText and codedNotation
            this.duplicateSets = [];
            const duplicates = store.app().importDuplicates;
            duplicates.forEach((duplicate) => {
                const foundIndex = this.duplicateSets.findIndex((set) => (set.competencyText === duplicate.competencyText) && (set.codedNotation === duplicate.codedNotation));
                if (foundIndex >= 0) {
                    this.duplicateSets[foundIndex].lines += ', ' + duplicate.line;
                    this.duplicateSets[foundIndex].duplicates.push({
                        ctid: duplicate.ctid,
                        id: duplicate.id
                    });
                } else {
                    this.duplicateSets.push({
                        competencyText: duplicate.competencyText,
                        codedNotation: duplicate.codedNotation,
                        lines: 'Lines ' + duplicate.line,
                        duplicates: [
                            {
                                ctid: 'upload all'
                            },
                            {
                                ctid: duplicate.ctid
                            }
                        ]
                    });
                }
            });
            this.selectedDuplicateOption = [];
            this.duplicateSets.forEach(() => {
                this.selectedDuplicateOption.push('upload all');
            });
        },
        updateDuplicateSkips: function() {
            let skip = [];
            this.selectedDuplicateOption.forEach((set, i) => {
                if (set !== 'upload all') {
                    this.duplicateSets[i].duplicates.forEach((duplicate) => {
                        if (duplicate.ctid !== set && !duplicate.ctid.includes('upload all')) {
                            skip.push({
                                ctid: duplicate.ctid,
                                replaceWith: set});
                        }
                    });
                }
            });
            this.duplicateSets = [];
            store.app().setImportSkip(skip);
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
        },
        importDuplicates: function() {
            this.findDuplicateSets();
        }
    }
};
</script>

<style scoped>
.import-errors-container {
    display: flex;
    flex-direction: column;
    max-height: 60vh;
    padding: 1rem;
}

.import-errors-list {
    flex: 1;
    overflow-y: auto;
    max-height: 40vh;
    padding-right: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid rgba(255, 0, 0, 0.2);
    border-radius: 4px;
    padding: 0.5rem;
}

.import-errors-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.import-errors-list li {
    padding: 0.25rem 0;
    border-bottom: 1px solid rgba(255, 0, 0, 0.1);
}

.import-errors-list li:last-child {
    border-bottom: none;
}
</style>