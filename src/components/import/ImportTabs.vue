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
            class="section is-large">
            <div class="tile is-vertical has-background-light">
                <div class="section is-medium">
                    <!-- columns for tabs -->
                    <div class="columns is-mobile">
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
                            v-if="q.concepts !== 'true'">
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
                            v-if="q.concepts !== 'true'">
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
                            v-if="q.concepts !== 'true'">
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
                    <div
                        class="columns"
                        v-if="importType === 'file'">
                        <div class="column is-12">
                            <div class="buttons is-centered">
                                <div
                                    @click="showImportModal('pdf')"
                                    class="button is-outlined is-warning is-small"
                                    v-if="q.concepts !== 'true'">
                                    <span
                                        title="PDF files are experimentally supported. Click to learn more."
                                        class="icon">
                                        <i class="fa fa-exclamation" />
                                    </span>
                                    <span>PDF</span>
                                </div>
                                <div
                                    @click="showImportModal('docx')"
                                    class="button is-outlined is-warning is-small"
                                    v-if="q.concepts !== 'true'">
                                    <span
                                        title="Word documents and Docx files are experimental. Click to learn more."
                                        class="icon">
                                        <i class="fa fa-exclamation" />
                                    </span>
                                    <span>DOCX/WORD</span>
                                </div>
                                <div
                                    @click="showImportModal('csv')"
                                    class="button is-outlined is-success is-small">
                                    <span
                                        title="CSV files are supported, click to learn more."
                                        class="icon is-pulled-right">
                                        <i class="fa fa-check" />
                                    </span>
                                    <span>CSV</span>
                                </div>
                                <div
                                    @click="showImportModal('xml')"
                                    class="button is-outlined is-success is-small"
                                    v-if="q.concepts !== 'true'">
                                    <span
                                        title="XML files are supported, click to learn more."
                                        class="icon is-pulled-right">
                                        <i class="fa fa-check" />
                                    </span>
                                    <span>XML</span>
                                </div>
                                <div
                                    @click="showImportModal('json')"
                                    class="button is-outlined is-success is-small">
                                    <span
                                        title="JSON files are supported, click to learn more."
                                        class="icon is-pulled-right">
                                        <i class="fa fa-check" />
                                    </span>
                                    <span>JSON</span>
                                </div>
                                <div
                                    @click="showImportModal('html')"
                                    class="button is-outlined is-success is-small"
                                    v-if="q.concepts !== 'true'">
                                    <span
                                        title="html files are fully supported at this time"
                                        class="icon is-pulled-right">
                                        <i class="fa fa-check" />
                                    </span>
                                    <span>HTML</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- file input -->
                    <div
                        class="has-dashed-border columns is-vcentered has-text-centered"
                        id="drop-area"
                        v-if="importType=='file'">
                        <drag-and-drop
                            class="column is-12"
                            v-if="importTransition === 'upload'"
                            @clearFiles="clearFiles" />
                        <div
                            v-else-if="(importTransition === 'process' || importTransition === 'info') && importErrors.length === 0"
                            class="column">
                            <div class="section">
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
                        class="section">
                        <template v-if="importFileType == 'csv' && importType == 'file'">
                            <div
                                v-for="item in csvImportDetails"
                                :key="item"
                                class="field">
                                <label class="label is-size-5">
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
                                            @change="$emit('analyzeCsvRelation', $event)">
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
                                        <label class="label is-size-5">
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
                        </template>
                        <!-- HANDLE MEDBIQ -->
                        <template v-else-if="importFileType =='medbiq' && importType == 'file'">
                            <div
                                v-for="item in medbiqDetails"
                                :key="item"
                                class="field">
                                <label class="label is-size-5">
                                    {{ item.label }}
                                </label>
                                <div class="control">
                                    <input
                                        v-if="item.type === 'string'"
                                        class="input"
                                        v-model="item.value">
                                </div>
                            </div>
                        </template>
                        <!-- handle non pdf imports -->
                        <div
                            v-if="importType === 'file' && importTransition === 'info'"
                            class="buttons is-right">
                            <div
                                class="button is-pulled-right is-outlined is-dark"
                                v-if="importFile && importType === 'file' && importFileType!=='pdf'"
                                @click="resetImport">
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
                    <!-- server input -->
                    <div
                        class="section"
                        v-if="importType=='server'">
                        <h3 class="title is-size-3 has-text-weight-medium">
                            Import from remote server
                        </h3>
                        <div
                            v-for="item in serverDetails"
                            :key="item"
                            class="field">
                            <label class="label is-size-5">
                                {{ item.label }}
                            </label>
                            <div class="field is-grouped">
                                <div class="control is-expanded">
                                    <input
                                        class="input"
                                        v-model="importServerUrl"
                                        type="url">
                                </div>
                                <div class="control">
                                    <div
                                        class="button is-pulled-right is-outlined is-primary"
                                        @click="$store.commit('app/importTransition', 'connectToServer')">
                                        <span class="icon">
                                            <i class="fas fa-network-wired" />
                                        </span>
                                        <span>
                                            connect
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- HANDLE CASE DOCS -->
                        <div
                            class="section"
                            v-if="caseDocs.length">
                            <h3 class="subtitle has-text-weight-medium is-size-4">
                                Found Frameworks
                            </h3>
                            <div
                                class="field"
                                v-for="doc in caseDocs"
                                :key="doc.id">
                                <input
                                    class="is-checkradio"
                                    type="checkbox"
                                    :checked="doc.checked"
                                    :id="'check' + doc.id"
                                    :name="'check' + doc.id"
                                    v-model="doc.checked"
                                    v-if="!doc.loading && !doc.success && !doc.error">
                                <i
                                    class="fa fa-circle-notch fa-spin"
                                    v-if="doc.loading" />
                                <i
                                    class="fa fa-check"
                                    v-else-if="doc.success" />
                                <i
                                    class="fa fa-exclamation-triangle"
                                    v-else-if="doc.error" />
                                <label
                                    class="label"
                                    :for="'check' + doc.id">{{ doc.name }}</label>
                            </div>
                            <div class="buttons is-right">
                                <div
                                    class="button is-outlined is-dark"
                                    @click="resetImport">
                                    Cancel
                                </div>
                                <div
                                    class="button is-outlined is-primary"
                                    @click="$emit('importCase', caseDocs)">
                                    Import
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- text input -->
                    <div
                        class="section"
                        v-if="importType=='text'">
                        <h3 class="title is-size-3 has-text-weight-medium">
                            Import framework as text
                        </h3>
                        <div class="field">
                            <label class="label is-size-5">
                                Framework name
                            </label>
                        </div>
                        <div class="control">
                            <input
                                class="input"
                                v-model="importFrameworkName"
                                placeholder="Framework Name">
                        </div>
                        <div class="field">
                            <label class="label is-size-5">
                                Paste Text
                            </label>
                            <div class="control">
                                <textarea
                                    class="textarea"
                                    v-model="importText" />
                            </div>
                        </div>
                        <div class="field">
                            <button
                                class="button is-pulled-right is-primary is-outlined"
                                @click="$store.commit('app/importStatus', 'parseText')">
                                Import
                            </button>
                        </div>
                    </div>
                    <!-- url input -->
                    <div
                        class="section"
                        v-if="importType=='url'">
                        <h3 class="title is-size-3 has-text-weight-medium">
                            Import framework from url source
                        </h3>
                        <div class="field">
                            <label class="label is-size-5">
                                Paste URL of document
                            </label>
                            <div class="field is-grouped">
                                <div class="control is-expanded">
                                    <input
                                        class="input"
                                        v-model="importUrl"
                                        type="url">
                                </div>
                                <div class="control">
                                    <div
                                        class="button is-outlined is-primary"
                                        @click="$store.commit('app/importStatus', 'importFromUrl')">
                                        <span class="file-icon">
                                            <i class="fas fa-upload" />
                                        </span>
                                        <span>
                                            Import
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dragAndDrop from './../../components/import/DragAndDrop.vue';

export default {
    name: 'ImportTabs',
    components: {dragAndDrop},
    props: {
        caseDocs: {
            default: function() { return []; },
            type: Array
        },
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
            },
            serverDetails: [
                {
                    label: 'Paste URL endpoint of server'
                }
            ]
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
        showImportModal: function(type) {
            let modalObject = {
                component: 'SupportedImportDetails',
                documentContent: type
            };
            this.$store.commit('app/showModal', modalObject);
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
        },
        importFromFile: function() {
            // import.vue watches for framework and file to be defined
            this.$store.commit('app/importType', 'file');
            this.$store.commit('app/importFramework', null);
            this.$store.commit('app/importTransition', 'upload');
        },
        clearFiles: function() {
            this.$store.commit('app/clearImportFiles');
        },
        resetImport: function() {
            this.$store.commit('app/resetImport');
        }
    },
    computed: {
        q: function() {
            return this.$store.getters['editor/queryParams'];
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
</style>