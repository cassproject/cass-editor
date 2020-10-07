<template>
    <div
        id="import-from-file"
        class="columns">
        <div class="column is-12">
            <div class="section">
                <slot name="import-file-title">
                    <p>Nothing send from import.vue</p>
                </slot>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <ImportTabs />
                    </div>
                    <div
                        v-if="importTransition === 'process' || importTransition === 'upload'"
                        class="column is-12">
                        <!-- file input -->
                        <div
                            class="has-dashed-border columns is-vcentered has-text-centered"
                            id="drop-area">
                            <drag-and-drop
                                class="column is-12"
                                v-if="importTransition === 'upload'"
                                @clearFiles="clearFiles" />
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
        <RightAside :allowClose="false">
            <template slot="right-aside-content">
                <div class="section">
                    <h2 class="title is-size-4">
                        Import From a File
                    </h2>
                    <p class="has-text-weight-bold">
                        Supported File Types
                    </p>
                    <!-- IMPORT SUPPORT -->
                    <div
                        class="columns pt-4 is-multiline">
                        <div class="column is-narrow">
                            <div
                                @click="showImportModal('pdf')"
                                class="button is-outlined is-warning is-small"
                                v-if="!conceptMode">
                                <span
                                    title="PDF files are experimentally supported. Click to learn more."
                                    class="icon">
                                    <i class="fa fa-exclamation" />
                                </span>
                                <span>PDF</span>
                            </div>
                        </div>
                        <div class="column is-narrow">
                            <div
                                @click="showImportModal('docx')"
                                class="button is-outlined is-warning is-small"
                                v-if="!conceptMode">
                                <span
                                    title="Word documents and Docx files are experimental. Click to learn more."
                                    class="icon">
                                    <i class="fa fa-exclamation" />
                                </span>
                                <span>DOCX/WORD</span>
                            </div>
                        </div>
                        <div class="column is-narrow">
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
                        </div>
                        <div class="column is-narrow">
                            <div
                                @click="showImportModal('xml')"
                                class="button is-outlined is-success is-small"
                                v-if="!conceptMode">
                                <span
                                    title="XML files are supported, click to learn more."
                                    class="icon is-pulled-right">
                                    <i class="fa fa-check" />
                                </span>
                                <span>XML</span>
                            </div>
                        </div>
                        <div class="column is-narrow">
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
                        </div>
                        <div class="column is-narrow">
                            <div
                                @click="showImportModal('html')"
                                class="button is-outlined is-success is-small"
                                v-if="!conceptMode">
                                <span
                                    title="html files are fully supported at this time"
                                    class="icon is-pulled-right">
                                    <i class="fa fa-check" />
                                </span>
                                <span>HTML</span>
                            </div>
                        </div>
                    </div>
                    <br>
                    <p class="has-text-weight-bold">
                        Steps to import from file
                    </p>
                    <ul class="cat__bullet-list is-size-6">
                        <li>
                            Cick inside the “Files to Upload” box or drag and drop a file inside the dashed box.
                        </li>
                        <li>
                            Once your file has been uploaded, CaSS will detect a competency framework from the file and display details about your framework.
                        </li>
                        <li>
                            If the details are correct, click “Accept and Review” to review and edit your framework.
                        </li>
                        <li>
                            An editable preview of your framework will be available. When you are done making changes, click “Done Editing”.
                        </li>
                        <li>
                            An uneditable preview of your framework will display, your fraemwork is now in CaSS!
                        </li>
                        <li>
                            click "done" to navigate to the framework in the editor where you can continue editing as well as export to a variety of formats.
                        </li>
                        <li>
                            If your framework is not detected by CaSS or not imported properly, let us know at <a href="mailto:cass@eduworks.com?subject=File+to+Improve+CaSS+Importer">cass@eduworks.com</a> and we will look into the inquiry and provide a response.
                        </li>
                    </ul>
                </div>
            </template>
        </RightAside>
    </div>
</template>

<script>
import ImportTabs from '@/components/import/ImportTabs';
import DragAndDrop from '@/components/import/DragAndDrop';
import imports from '@/mixins/import';
import RightAside from '@/components/framework/RightAside';

export default {
    name: 'ImportFile',
    components: {
        ImportTabs,
        DragAndDrop,
        RightAside
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
    computed: {
        importErrors: function() {
            return this.$store.getters['app/importErrors'];
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        }
    },
    methods: {
        clearFiles: function() {
            this.$store.commit('app/clearImportFiles');
        },
        importFileType: function() {
            return this.$store.getters['app/importFileType'];
        },
        importType: function() {
            return this.$store.getters['app/importType'];
        }
    }
};
</script>