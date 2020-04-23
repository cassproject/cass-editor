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
        class="section">
        <!-- types of import for tabs -->
        <div
            v-if="!importFramework || (importFramework && importType === 'text')"
            class="section is-large">
            <div class="tile is-vertical has-background-lightest">
                <div class="section is-medium">
                    <!-- columns for tabs -->
                    <div class="columns is-mobile">
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
                    <!-- file input -->
                    <div
                        class="has-dashed-border columns"
                        id="drop-area"
                        v-if="importType=='file' && importFileType !== 'csv'">
                        <drag-and-drop
                            class="column is-12"
                            v-if="importTransition === 'upload'"
                            @clearFiles="onClearFiles" />
                        <div
                            v-else-if="importTransition === 'process' && importErrors.length === 0"
                            class="column is-12">
                            <span
                                class="icon is-large"
                                v-if="importTransition === 'process'">
                                <i class="fa fa-spinner fa-pulse fa-2x" />
                            </span>
                            <div class="section">
                                <p
                                    v-if="importTransition !== 'process'"
                                    class="is-size-7">
                                    {{ importStatus }}
                                </p>
                                <p
                                    v-if="importTransition === 'process'"
                                    class="is-size-7">
                                    {{ importStatus }}
                                </p>
                            </div>
                        </div>
                        <!-- import errors -->
                        <div
                            v-else-if="importErrors.length > 0"
                            class="column is-12 has-text-warning">
                            <ul>
                                <li
                                    class="is-size-7"
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
                                <div class="columns">
                                    <div class="column is-4">
                                        <div
                                            @click="cancelImport()"
                                            class="button is-primary">
                                            Start over
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- HANDLE CSV INPUTS -->
                    <div
                        class="section">
                        <template v-if="importFileType == 'csv'">
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
                                    <select
                                        class="select"
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
                                <div
                                    v-else-if="item.type === 'file'"
                                    class="control">
                                    <input
                                        class="input"
                                        type="file"
                                        @change="$emit('analyzeCsvRelation', $event)">
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
                            </template>
                        </template>
                        <!-- HANDLE MEDBIQ -->
                        <template v-else-if="importFileType =='medbiq'">
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
                        <div class="control">
                            <div
                                class="button is-pulled-right is-outlined is-primary"
                                v-if="importFile && importFileType!=='pdf'"
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
                        class="section has-dashed-border"
                        v-if="importType=='server'">
                        <div
                            v-for="item in serverDetails"
                            :key="item"
                            class="field">
                            <label class="label is-size-5">
                                {{ item.label }}
                            </label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="item.value"
                                    @change="$store.commit('app/importServerUrl', serverUrl)"
                                    type="url">
                            </div>
                        </div>
                        <div class="field">
                            <div
                                class="button is-pulled-right is-outlined is-primary"
                                @click="$store.commit('app/importStatus', 'connectToServer')">
                                <span class="icon">
                                    <i class="fas fa-network-wired" />
                                </span>
                                <span>
                                    connect
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- HANDLE CASE DOCS -->
                    <div v-if="caseDocs.length">
                        <ul>
                            <li
                                v-for="doc in caseDocs"
                                :key="doc.id">
                                <input
                                    type="checkbox"
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
                                {{ doc.name }}
                            </li>
                        </ul>
                        <button @click="importCase">
                            Import
                        </button>
                        <button @click="cancelCase">
                            Cancel
                        </button>
                    </div>
                    <!-- text input -->
                    <div
                        class="section has-dashed-border"
                        v-if="importType=='text'">
                        <div class="field">
                            <label class="label is-size-5">
                                Framework name
                            </label>
                        </div>
                        <div class="control">
                            <input
                                class="input"
                                @change="$store.commit('app/importFrameworkName')"
                                v-model="importFrameworkName"
                                placeholder="Framework Name">
                        </div>
                        <div class="field">
                            <label class="label is-size-5">
                                Paste Text
                            </label>
                            <div class="control">
                                <textarea
                                    @change="$store.commit('app/importFrameworkText')"
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
                        class="section has-dashed-border"
                        v-if="importType=='url'">
                        <div class="field">
                            <label class="label is-size-5">
                                Paste URL of document
                            </label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="importServerUrl"
                                    type="url">
                            </div>
                            <button @click="$store.commit('app/importStatus', 'importFromUrl')">
                                Import
                            </button>
                            <div>
                                {{ importStatus }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dragAndDrop from './../../components/DragAndDrop.vue';

export default {
    name: 'ImportTabs',
    components: {dragAndDrop},
    props: {
        q: Object,
        caseDocs: Array,
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
                    value: '',
                    type: 'string'
                },
                description: {
                    label: 'Describe the framework (optional)',
                    value: '',
                    type: 'string'
                },
                nameColumn: {
                    label: 'Select the Name column',
                    value: '',
                    type: 'column'
                },
                descriptionColumn: {
                    label: 'Select the Description column (optional)',
                    value: '',
                    type: 'column'
                },
                scopeColumn: {
                    label: 'Select the Scope column (optional)',
                    value: '',
                    type: 'column'
                },
                idColumn: {
                    label: 'Select the ID column (optional). If chosen, this should be a URL from another CaSS system or a non-numeric ID',
                    value: '',
                    type: 'column'
                },
                relationFile: {
                    label: `Step 7: Select a relation file (optional).
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
                    value: '',
                    array: this.importCsvColumnSource
                },
                relationColumn: {
                    label: 'Select the Relation Type column.',
                    type: 'column',
                    value: '',
                    array: this.importColumnRelationType
                },
                targetColumn: {
                    label: 'Select the Target column.',
                    type: 'column',
                    value: '',
                    array: this.importColumnTarget
                }
            },
            medbiqDetails: [
                {
                    label: 'Select the framework',
                    value: '',
                    type: 'string'
                },
                {
                    label: 'Describe the framework (optional)',
                    value: '',
                    type: 'string'
                }
            ],
            serverDetails: [
                {
                    label: 'Paste URL endpoint of server',
                    value: ''

                }
            ]
        };
    },
    methods: {
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
            }
        },
        importFromFile: function() {
            // import.vue watches for framework and file to be defined
            this.$store.commit('app/importType', 'file');
            this.$store.commit('app/importFramework', null);
            this.$store.commit('app/importTransition', 'upload');
        },
        onClearFiles: function() {
            this.$store.commit('app/clearImportfiles');
        }
    },
    computed: {
        importDetails: function() {
            if (importFileType === 'medbiq') {
                return this.medbiqDetails;
            } else if (importType === 'server') {
                return this.serverDetails;
            }
        },
        importText: function() {
            return this.$store.getters['app/importText'];
        },
        importServerUrl: function() {
            return this.$store.getters['app/importServerUrl'];
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
                this.$store.commit('app/importFrameworkName');
            }
        },
        importFrameworkDescription: function() {
            return this.$store.getters['app/importFrameworkDescription'];
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        }
    }
};
</script>