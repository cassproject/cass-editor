<template>
    <div class="page-import container is-fluid is-marginless is-paddingless">
        <div class="columns is-multiline is-marginless is-gapless is-mobile">
            <div class="column is-narrow is-hidden-mobile">
                <!--- side bar -->
                <side-bar
                    type="import"
                    :method="method"
                    @updateUrl="updateUrl" />
                <!--- end side bar -->
            </div>
            <!--- main body section -->
            <div class="column has-background-white is-scrollable">
                <section class="section page-import-body">
                    <div class="container">
                        <div class="section">
                            <div class="columns is-mobile">
                                <div class="column is-narrow">
                                    <h1 class="title is-size-2">
                                        Import a framework
                                    </h1>
                                </div>
                                <div class="column">
                                    <p class="is-primary is-size-7" />
                                </div>
                            </div>
                            <p
                                v-if="status === 'Ready' && !file"
                                class="is-size-7">
                                Upload documents to transform into CaSS Competency Frameworks.
                            </p>
                            <p
                                v-if="importDetailsView"
                                class="is-size-7">
                                Success!  Your file competencies.  CaSS has detected details
                                about your framework and file.  Please review.
                                <br><br>
                                If these details look incorrect, please review your file, and
                                start over.
                            </p>
                            <p
                                v-if="importPreviewView"
                                class="is-size-7">
                                We've successfully imported a competency framework into the CaSS world.
                                Please review the name and descriptions of the imported competencies.
                                <br><br>
                                Here you can make edits to the names and descriptions, as well as drag
                                competencies to a different place in the hierarchy if there are discrepencies.
                                <br><br>
                                After making edits, "approve" the changes to view the imported competency details.
                            </p>
                        </div>
                        <div
                            v-if="framework && importPreviewView"
                            class="section">
                            <div class="columns is-mobile">
                                <div class="column is-6 has-text-centered">
                                    <span class="icon">
                                        <i class="far fa-hand-rock has-text-dark" />
                                    </span>
                                    <span class="is-size-7 has-text-weight-bold">
                                        Use your mouse to drag competencies
                                    </span>
                                </div>
                                <div class="column is-6 has-text-centered">
                                    <span>
                                        <span class="icon">
                                            <i class="far fa-edit has-text-black" />
                                        </span>
                                        <span class="is-size-7 has-text-weight-bold">
                                            Click the pencil icon to edit the basic details.
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- types of import for tabs -->
                        <div
                            v-if="!framework"
                            class="section is-large">
                            <div class="tile is-vertical has-background-light">
                                <div class="section is-medium">
                                    <!-- columns for tabs -->
                                    <div class="columns is-mobile">
                                        <div class="column">
                                            <div
                                                class="import-tab"
                                                :class="{ 'is-active-tab': method === 'file'}">
                                                <a @click="method = 'file';framework = null;status='';">
                                                    <i
                                                        class="fa fa-2x fa-file has-text-centered is-block"
                                                        aria-hidden="true" />
                                                    <div class="is-hidden-mobile is-block has-text-centered">
                                                        File Import
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div
                                                class="import-tab disabled"
                                                :class="{ 'is-active-tab': method === 'server'}">
                                                <a @click="switchToRemoteServerTab()">
                                                    <i
                                                        class="fa fa-2x fa-server is-block has-text-centered"
                                                        aria-hidden="true" />
                                                    <div class="is-hidden-mobile is-block has-text-centered">
                                                        Remote Server
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div
                                                class="import-tab disabled"
                                                :class="{ 'is-active-tab': method === 'text'}">
                                                <a @click="switchToPasteTextTab()">
                                                    <i
                                                        class="fa fa-2x fa-paste has-text-centered is-block"
                                                        aria-hidden="true" />
                                                    <div class="is-hidden-mobile is-block has-text-centered">
                                                        Paste Text
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div
                                                class="import-tab disabled"
                                                :class="{ 'is-active-tab': method === 'url'}">
                                                <a @click="switchToUrlSourceTab()">
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
                                        v-if="method=='file'">
                                        <drag-and-drop
                                            class="column is-12"
                                            v-if="!processingFile && !showErrors"
                                            @dragAndDropEmitFiles="onUploadFiles" />
                                        <div
                                            v-else-if="processingFile && !showErrors"
                                            class="column is-12">
                                            <span class="icon is-large">
                                                <i class="fa fa-spinner fa-pulse fa-2x" />
                                            </span>
                                            <div class="section">
                                                <p class="is-size-7">
                                                    {{ status }}
                                                </p>
                                            </div>
                                        </div>
                                        <!-- import errors -->
                                        <div
                                            v-else-if="showErrors"
                                            class="column is-12 has-text-warning">
                                            <ul>
                                                <li
                                                    class="is-size-7"
                                                    v-for="(error, index) in errors"
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
                                                            @click="cancelImport"
                                                            class="button is-primary">
                                                            Start over
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- appears to be part of an interstitial screen -->
                                    <div
                                        class="section is-hidden">
                                        <div v-if="importType=='csv'">
                                            <div>
                                                <label>Step 1: Name the framework.</label>
                                                <input v-model="importFrameworkName">
                                            </div>
                                            <div>
                                                <label>Step 2: Describe the framework (optional).</label>
                                                <input v-model="importFrameworkDescription">
                                            </div>
                                            <div>
                                                <label>Step 3: Select the Name column.</label>
                                                <select v-model="importCsvColumnName">
                                                    <option
                                                        v-for="(column, i) in csvColumns"
                                                        :key="i"
                                                        :value="column">
                                                        {{ column.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <label>Step 4: Select the Description column (optional).</label>
                                                <select v-model="importCsvColumnDescription">
                                                    <option>N/A</option>
                                                    <option
                                                        v-for="(column, i) in csvColumns"
                                                        :key="i"
                                                        :value="column">
                                                        {{ column.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <label>Step 5: Select the Scope column (optional).</label>
                                                <select v-model="importCsvColumnScope">
                                                    <option>N/A</option>
                                                    <option
                                                        v-for="(column, i) in csvColumns"
                                                        :key="i"
                                                        :value="column">
                                                        {{ column.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <label>Step 6: Select the ID column (optional). If chosen, this should be a URL from another CaSS system or a non-numeric ID.</label>
                                                <select v-model="importCsvColumnId">
                                                    <option>N/A</option>
                                                    <option
                                                        v-for="(column, i) in csvColumns"
                                                        :key="i"
                                                        :value="column">
                                                        {{ column.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <label>
                                                    Step 7: Select a relation file (optional).
                                                    The relation source/target must be in the
                                                    form of ID or Name, and the relation types
                                                    should be "requires", "desires", "narrows",
                                                    "isEnabledBy", "isRelatedTo", or "isEquivalentTo".
                                                </label>
                                                <input
                                                    type="file"
                                                    @change="analyzeCsvRelation">
                                            </div>
                                            <div v-if="csvRelationFile">
                                                <div>
                                                    <label>
                                                        Step 8: Select the Source column.
                                                    </label>
                                                    <select v-model="importCsvColumnSource">
                                                        <option
                                                            v-for="(column, i) in csvRelationColumns"
                                                            :key="i"
                                                            :value="column">
                                                            {{ column.name }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Step 9: Select the Relation Type column.</label>
                                                    <select v-model="importCsvColumnRelationType">
                                                        <option
                                                            v-for="(column, i) in csvRelationColumns"
                                                            :key="i"
                                                            :value="column">
                                                            {{ column.name }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Step 10: Select the Target column.</label>
                                                    <select v-model="importCsvColumnTarget">
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
                                        <div v-else-if="importType=='medbiq'">
                                            <div>
                                                <label>Step 1: Name the framework.</label>
                                                <input v-model="importFrameworkName">
                                            </div>
                                            <div>
                                                <label>Step 2: Describe the framework (optional).</label>
                                                <input v-model="importFrameworkDescription">
                                            </div>
                                        </div>
                                        <!--<button @click="importFromFile">
                                            Import
                                        </button>-->
                                    </div>
                                    <!-- server input -->
                                    <div
                                        class="section has-dashed-border"
                                        v-if="method=='server'">
                                        <center>
                                            <h1>Paste URL endpoint of server</h1>
                                            <input
                                                v-model="serverUrl"
                                                type="url">
                                            <button @click="connectToServer">
                                                Connect
                                            </button>
                                            <div>
                                                {{ status }}
                                            </div>
                                        </center>
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
                                    </div>
                                    <!-- text input -->
                                    <div
                                        class="section has-dashed-border"
                                        v-if="method=='text'">
                                        <center>
                                            <h1>Paste Text</h1>
                                            <textarea v-model="text" />
                                            <div>
                                                {{ status }}
                                                <button @click="parseText">
                                                    Import
                                                </button>
                                            </div>
                                        </center>
                                    </div>
                                    <!-- url input -->
                                    <div
                                        class="section has-dashed-border"
                                        v-if="method=='url'">
                                        <center>
                                            <h1>Paste URL of document</h1>
                                            <input
                                                v-model="url"
                                                type="url">
                                            <button @click="importFromUrl">
                                                Import
                                            </button>
                                            <div>
                                                {{ status }}
                                            </div>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="section import-details"
                            v-if="framework && importDetailsView">
                            <!-- interstitial screen will go here -->
                            <div class="import-details__section">
                                <h3 class="subtitle is-size-3 has-text-weight-normal">
                                    The following details were detected.
                                </h3>
                                <p class="is-size-6 has-text-weight-light">
                                    If these details don't look correct, please verify your file
                                    is correct and import again.
                                </p>
                                <ul class="is-size-6 detected-import-details">
                                    <li v-if="detailsDetected.columns > 0">
                                        <span class="icon has-text-success">
                                            <i class="fa fa-check-circle" />
                                        </span>
                                        CaSS detected <b>{{ detailsDetected.columns }}</b> columns
                                    </li>
                                    <li v-if="detailsDetected.rows > 0">
                                        <span class="icon has-text-success">
                                            <i class="fa fa-check-circle" />
                                        </span>
                                        CaSS detected <b>{{ detailsDetected.rows }}</b> rows
                                    </li>
                                    <li>
                                        <span class="icon has-text-success">
                                            <i class="fa fa-check-circle" />
                                        </span>
                                        CaSS detected <b>{{ detailsDetected.competencies }}</b> competencies in the imported framework
                                    </li>
                                    <li>
                                        <span class="icon has-text-success">
                                            <i class="fa fa-check-circle" />
                                        </span>
                                        CaSS detected a <b>{{ detailsDetected.fileType }}</b> file type
                                    </li>
                                    <li v-if="detailsDetected.headers">
                                        <span class="icon has-text-success">
                                            <i class="fa fa-check-circle" />
                                        </span>
                                        <b>Header rows detected</b>
                                    </li>
                                    <li class="is-size-7">
                                        If this information looks correct, "approve" to continue.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            v-if="framework && importPreviewView"
                            class="section import-preview">
                            <div class="tile is-vertical">
                                <Hierarchy
                                    v-if="framework"
                                    :container="framework"
                                    containerType="Framework"
                                    containerNodeProperty="competency"
                                    containerEdgeProperty="relation"
                                    nodeType="EcCompetency"
                                    :profile="previewProfile"
                                    :editable="true"
                                    edgeType="EcAlignment"
                                    edgeRelationProperty="relationType"
                                    edgeRelationLiteral="narrows"
                                    edgeSourceProperty="source"
                                    edgeTargetProperty="target"
                                    :repo="repo" />
                            </div>
                        </div>
                        <div
                            v-else-if="framework && importLightView"
                            class="section import-light">
                            <div class="tile is-vertical">
                                <Hierarchy
                                    v-if="framework"
                                    :container="framework"
                                    containerType="Framework"
                                    containerNodeProperty="competency"
                                    containerEdgeProperty="relation"
                                    nodeType="EcCompetency"
                                    :profile="postImportProfile"
                                    :editable="false"
                                    edgeType="EcAlignment"
                                    edgeRelationProperty="relationType"
                                    edgeRelationLiteral="narrows"
                                    edgeSourceProperty="source"
                                    edgeTargetProperty="target"
                                    :repo="repo" />
                            </div>
                        </div>
                        <div class="section">
                            <div class="columns is-gapless is-marginless is-mobile is-multiline">
                                <div class="column is-12">
                                    <!-- import details options -->
                                    <div
                                        v-if="importDetailsView"
                                        class="buttons is-right">
                                        <div
                                            @click="cancelImport"
                                            class="button is-light is-pulled-right is-light">
                                            <span>
                                                Cancel
                                            </span>
                                            <span class="icon">
                                                <i class="fa fa-times-circle" />
                                            </span>
                                        </div>
                                        <div
                                            @click="importDetailsAccept"
                                            class="button is-info is-pulled-right">
                                            <span>
                                                Accept Details & Edit
                                            </span>
                                            <span class="icon is-smalls">
                                                <span class="fa-stack">
                                                    <i class="fas fa-circle fa-stack-1x" />
                                                    <i class="fas has-text-info fa-caret-right fa-stack-1x caret-icon-overlay-fix" />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- import preview options -->
                                    <div
                                        v-else-if="importPreviewView"
                                        class="buttons is-right">
                                        <div
                                            @click="cancelImport"
                                            class="button is-light is-pulled-right">
                                            <span>cancel</span>
                                            <span class="icon">
                                                <i class="fa fa-times-circle" />
                                            </span>
                                        </div>
                                        <div
                                            @click="importPreviewAccept"
                                            class="button is-info is-pulled-right">
                                            <span>
                                                Approve Import & View
                                            </span>
                                            <span class="icon">
                                                <span class="fa-stack">
                                                    <i class="fas fa-circle fa-stack-1x" />
                                                    <i class="fas has-text-info fa-caret-right fa-stack-1x caret-icon-overlay-fix" />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    v-if="importLightView"
                                    class="column is-6">
                                    <div class="buttons is-left">
                                        <div
                                            class="button is-light is-pulled-right"
                                            @click="showModal('export')">
                                            <span>
                                                Export
                                            </span>
                                            <span class="icon">
                                                <i class="fa fa-download" />
                                            </span>
                                        </div>
                                        <router-link
                                            class="button is-light is-pulled-right"
                                            to="/">
                                            <span>
                                                Done
                                            </span>
                                            <span class="icon">
                                                <i class="fa fa-home" />
                                            </span>
                                        </router-link>
                                    </div>
                                </div>
                                <div
                                    v-if="importLightView"
                                    class="column is-6">
                                    <div
                                        class="buttons is-right">
                                        <div
                                            v-if="framework"
                                            @click="cancelImport"
                                            class="button is-info is-pulled-right">
                                            <span>import new framework</span>
                                            <span class="icon">
                                                <i class="fa fa-redo-alt" />
                                            </span>
                                        </div>
                                        <div
                                            v-if="framework"
                                            @click="openFramework"
                                            class="button is-info is-pulled-right">
                                            <span>open editor</span>
                                            <span class="icon">
                                                <i class="fa fa-edit" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import Hierarchy from '@/lode/components/lode/Hierarchy.vue';
import csvConceptExample from 'file-loader!../../../files/Concept Scheme Example.csv';
import csvConceptTemplate from 'file-loader!../../../files/Concept Scheme Template.csv';
import ctdlAsnJsonldConcepts from 'file-loader!../../../files/ConnectingCredentialsLevels.jsonld';
import common from '@/mixins/common.js';
import dragAndDrop from './../../components/DragAndDrop.vue';
import sideBar from './../../components/SideBar.vue';
import exports from '@/mixins/exports.js';

export default {
    name: "Import",
    props: {
        queryParams: Object
    },
    mixins: [common, exports],
    components: {Hierarchy, dragAndDrop, sideBar},
    data: function() {
        return {
            detailsDetected: {
                rows: 0,
                columns: 0,
                headers: false,
                competencies: 0,
                format: 'Department of Labor',
                fileType: ''
            },
            errors: [],
            showErrors: false,
            importPreviewView: false,
            importLightView: false,
            importDetailsView: false,
            processingFile: false,
            processingSuccess: false,
            showCassCsv: false,
            method: "file",
            file: null,
            serverUrl: null,
            text: "",
            framework: null,
            url: null,
            repo: window.repo,
            status: "Ready",
            statusType: 'info',
            csvConceptExampleFile: csvConceptExample,
            csvConceptTemplateFile: csvConceptTemplate,
            ctdlAsnJsonldConceptsFile: ctdlAsnJsonldConcepts,
            competencyCount: 0,
            importType: null,
            importFrameworkName: null,
            importFrameworkDescription: null,
            importCsvColumnName: null,
            importCsvColumnDescription: "N/A",
            importCsvColumnScope: "N/A",
            importCsvColumnId: "N/A",
            importCsvColumnSource: null,
            importCsvColumnRelationType: null,
            importCsvColumnTarget: null,
            csvColumns: [],
            csvRelationFile: null,
            csvRelationColumns: [],
            relationCount: 0,
            caseDocs: [],
            caseCancel: false,
            frameworkExportOptions: [
                {name: "Achievement Standards Network (RDF+JSON)", value: "asn"},
                {name: "CASS (JSON-LD)", value: "jsonld"},
                {name: "CASS (RDF Quads)", value: "rdfQuads"},
                {name: "CASS (RDF+JSON)", value: "rdfJson"},
                {name: "CASS (RDF+XML)", value: "rdfXml"},
                {name: "CASS (Turtle)", value: "turtle"},
                {name: "Credential Engine ASN (JSON-LD)", value: "ctdlasnJsonld"},
                {name: "Credential Engine ASN (CSV)", value: "ctdlasnCsv"},
                {name: "Table (CSV)", value: "csv"},
                {name: "IMS Global CASE (JSON)", value: "case"}
            ]
        };
    },
    computed: {
        /*
         * depending on where we are in the import cycle,
         * utilize a different profile to display required
         * fields to the user
         */
        importProfile: function() {
            let profile;
            if (this.importPreviewView === true) {
                profile = this.previewProfile;
            } else {
                profile = this.postImportProfile;
            }
            return profile;
        },
        isUrl: function() {
            if (this.method === 'url') {
                return true;
            } else {
                return false;
            }
        },
        isFile: function() {
            if (this.method === 'file') {
                return true;
            } else {
                return false;
            }
        },
        isText: function() {
            if (this.method === 'text') {
                return true;
            } else {
                return false;
            }
        },
        isServer: function() {
            if (this.method === 'server') {
                return true;
            } else {
                return false;
            }
        },
        postImportProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "ID"}]
                },
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Name of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}]
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Description of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                },
                "@type": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/type",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The type of the object."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Type"}]
                },
                "https://schema.cassproject.org/0.4/Competency/scope": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/scope",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Scope in which the competency may be applied. e.g. Underwater."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Scope"}]
                },
                "@context": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/context",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The context of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Context"}]
                },
                "https://schema.cassproject.org/0.4/Level": {
                    "@id": "https://schema.cassproject.org/0.4/Level",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value":
                        "When an individual's performance in a competency can be measured, a level specifies milestones that an individual can reach, creating fine-grained distinction between the proficient and the adept."}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Level"}],
                    "valuesIndexed": function() {
                        var levels = {};
                        if (!me.framework.level) {
                            return null;
                        }
                        for (var i = 0; i < me.framework.level.length; i++) {
                            var level = EcLevel.getBlocking(me.framework.level[i]);
                            var comp = level.competency;
                            levels[comp] = level;
                        }
                        return levels;
                    }
                },
                "alwaysProperties": ["@id", "http://schema.org/name", "@type", "https://schema.cassproject.org/0.4/Competency/scope", "@context", "https://schema.cassproject.org/0.4/Level"]
            };
        },
        previewProfile: function() {
            var me = this;
            return {
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Name of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}]
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Description of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                }
            };
        }
    },
    watch: {
        text: function(newText, oldText) {
            var me = this;
            TabStructuredImport.importCompetencies(
                newText,
                this.repo.selectedServer,
                EcIdentityManager.ids[0],
                function(competencies, relations) {
                    me.status = competencies.length + " competencies and " + relations.length + " relations.";
                    me.status = "info";
                    var f = new EcFramework();
                    me.framework = null;
                    for (var i = 0; i < competencies.length; i++) {
                        EcRepository.cache[competencies[i].shortId()] = competencies[i];
                        f.addCompetency(competencies[i].shortId());
                    }
                    for (var i = 0; i < relations.length; i++) {
                        EcRepository.cache[relations[i].shortId()] = relations[i];
                        f.addRelation(relations[i].shortId());
                    }
                    me.$nextTick(function() { me.framework = f; });
                }, function(status) {
                    me.status = status;
                },
                console.error,
                this.repo,
                true);
        }
    },
    methods: {
        showModal(val) {
            let params = {};
            if (val === 'export') {
                params = {
                    type: val,
                    selectedExportOption: '',
                    title: "Export framework",
                    exportOptions: this.frameworkExportOptions,
                    text: "Select a file format to export your framework. Files download locally.",
                    onConfirm: (e) => {
                        return this.exportObject(e);
                    }
                };
            }
            // reveal modal
            this.$modal.show(params);
        },
        // pulled over from Thing.vue in LODE - should be different for this case
        exportObject: function(type) {
            var guid;
            if (EcRepository.shouldTryUrl(this.framework.id) === false) {
                guid = EcCrypto.md5(this.framework.id);
            } else {
                guid = this.framework.getGuid();
            }
            var link = this.repo.selectedServer + "data/" + guid;
            if (type === "asn") {
                this.exportAsn(link);
            } else if (type === "jsonld") {
                this.exportJsonld(link);
            } else if (type === "rdfQuads") {
                this.exportRdfQuads(link);
            } else if (type === "rdfJson") {
                this.exportRdfJson(link);
            } else if (type === "rdfXml") {
                this.exportRdfXml(link);
            } else if (type === "turtle") {
                this.exportTurtle(link);
            } else if (type === "ctdlasnJsonld") {
                this.exportCtdlasnJsonld(link);
            } else if (type === "ctdlasnCsv") {
                this.exportCtdlasnCsv(link);
            } else if (type === "csv") {
                this.exportCsv();
            } else if (type === "case") {
                this.exportCasePackages(guid);
            }
        },
        switchToRemoteServerTab: function() {

            /*
             * this.method = 'server';
             * this.framework = null;
             * this.status='';
             */
        },
        switchToPasteTextTab: function() {

            /*
             * this.method = 'text';
             * this.framework = null;
             * thi.status='';
             */
        },
        switchToUrlSourceTab: function() {

            /*
             * this.method = 'url';
             * this.framework = null;
             * thi.status='';
             */
        },
        unsupportedFile: function(val) {
            let fileType = val;
            this.statusType = "error";
            this.status = "File type " + fileType + " is unsupported in this workflow";
            this.errors.push(this.status);
            this.showErrors = true;
            this.processingFile = false;
        },
        /* Event from Sidebar component */
        updateUrl(url) {
            if (this.method === "url") {
                this.url = url;
            } else if (this.method === "server") {
                this.serverUrl = url;
            }
        },
        /* When an import is "successful" */
        importSuccess: function() {
            this.status = "Competency detected";
            this.importDetailsView = true;
            this.importPreviewView = false;
            this.importLightView = false;
        },
        /*
         * from the interstital screen the user accepts
         * the displayed details
         */
        importDetailsAccept: function() {
            this.status = "Edit and approve";
            this.importDetailsView = false;
            this.importPreviewView = true;
        },
        /*
         * after editing preview the user can accept the preview
         * displaying the uneditable framework for review
         * displays the appropriate profile of information requested by client
         */
        importPreviewAccept: function() {
            this.status = "Import complete!";
            this.importLightView = true;
            this.importPreviewView = false;
            /*
             * TO DO: Make sure all competency properties are in a non-editable state
             * or ensure state does not crossover from here
             */
        },
        cancelImport: function() {
            /*
             * TO DO: properly cancel import, leaving the screen in a state
             * in which they are capable of importing a new framwork
             * clear all files and framework states
             * this does not completely work
             */
            this.importDetailsView = false;
            this.importLightView = false;
            this.previewProfile = false;
            this.errors = [];
            this.showErrors = false;
            this.framework = null;
            this.file = null;
            this.processingFile = false;
            this.processingSuccess = false;
            this.status = "Ready";
        },
        onUploadFiles: function(value) {
            this.file = value;
            this.fileChange(this.file);
        },
        openFramework: function() {
            if (this.queryParams.concepts === "true") {
                this.$store.commit('framework', this.framework);
                this.$router.push({name: "conceptScheme", params: {frameworkId: this.framework.shortId()}});
            } else {
                this.$store.commit('framework', this.framework);
                this.$router.push({name: "framework", params: {frameworkId: this.framework.shortId()}});
            }
        },
        fileChange: function(e) {
            this.processingFile = true;
            this.processingSuccess = false;
            this.analyzeImportFile();
            this.importType = null;
            this.firstImport = true;
        },
        analyzeImportFile: function() {
            var me = this;
            var file = this.file[0];
            if (file.name.endsWith(".csv")) {
                this.unsupportedFile('csv');
            } else if (file.name.endsWith(".csv")) {
                CTDLASNCSVImport.analyzeFile(file, function(frameworkCount, competencyCount) {
                    me.importType = "ctdlasncsv";
                    me.status = "Import " + frameworkCount + " frameworks and " + competencyCount + " competencies.";
                }, function(errorMsg) {
                    CSVImport.analyzeFile(file, function(data) {
                        me.importType = "csv";
                        me.importFrameworkName = file.name.replace(".csv", "");
                        for (var i = 0; i < data[0].length; i++) {
                            let column = {};
                            column.name = data[0][i];
                            column.index = i;
                            me.csvColumns.push(column);
                            if (column.name.toLowerCase().indexOf("name") !== -1) {
                                me.importCsvColumnName = column;
                            }
                            if (column.name.toLowerCase().indexOf("description") !== -1) {
                                me.importCsvColumnDescription = column;
                            }
                            if (column.name.toLowerCase().indexOf("scope") !== -1) {
                                me.importCsvColumnScope = column;
                            }
                            if (column.name.toLowerCase().indexOf("id") !== -1) {
                                me.importCsvColumnId = column;
                            }
                        }
                        me.processingFile = false;
                        me.status = (me.competencyCount = (data.length - 1)) + " Competencies Detected.";
                    }, function(error) {
                        me.statusType = "error";
                        me.status = error;
                    });
                });
            } else if (file.name.endsWith(".json") || file.name.endsWith(".jsonld")) {
                // Try JSON-LD first, checks for @graph
                this.analyzeJsonLdFramework(file, function(data, ctdlasn) {
                    var invalid = false;
                    if (ctdlasn === "ctdlasnConcept") {
                        me.status = "Concept Schemes must be imported in the concept scheme editor.";
                        invalid = true;
                    } else {
                        me.importType = "ctdlasnjsonld";
                        me.status = "1 Framework and " + (EcObject.keys(data).length - 1) + " Competencies Detected.";
                    }
                    me.competencyCount = EcObject.keys(data).length;
                    if (!invalid && (ctdlasn === "ctdlasn" || ctdlasn === "ctdlasnConcept")) {
                        // Do nothing
                    } else if (!invalid) {
                        me.status = "Context is not CTDL-ASN";
                    }
                }, function(error) {
                    var error = error;
                    // If JSON-LD doesn't work, try JSON
                    ASNImport.analyzeFile(file, function(data) {
                        me.importType = "asn";
                        me.status = "1 Framework and " + EcObject.keys(data).length + " Competencies Detected.";
                        me.competencyCount = EcObject.keys(data).length;
                    }, function(error) {
                        me.status = error;
                    });
                });
            } else if (file.name.endsWith(".xml")) {
                MedbiqImport.analyzeFile(file, function(data) {
                    me.importType = "medbiq";
                    me.importFrameworkName = file.name.replace(".xml", "");
                    me.status = "1 Framework and " + EcObject.keys(data).length + " Competencies Detected.";
                    me.competencyCount = EcObject.keys(data).length;
                }, function(error) {
                    me.statusType = "error";
                    me.status = error;
                });
            } else if (file.name.endsWith(".pdf")) {
                me.importType = "pdf";
                me.firstImport = false;
                me.detailsDetected.fileType = "pdf";
                me.status = "File selected.";
            } else if (file.name.endsWith(".docx")) {
                me.importType = "pdf";
                me.detailsDetected.fileType = "docx";
                me.firstImport = false;
                me.status = "File selected.";
            }
            if (!me.firstImport) {
                me.importFromFile();
            }
        },
        analyzeCsvRelation: function(e) {
            this.csvRelationFile = this.file[0];
            let me = this;
            CSVImport.analyzeFile(this.csvRelationFile, function(data) {
                for (var i = 0; i < data[0].length; i++) {
                    let column = {};
                    column.name = data[0][i];
                    column.index = i;
                    me.csvRelationColumns.push(column);
                    if (column.name.toLowerCase().indexOf("source") !== -1) {
                        me.importCsvColumnSource = column;
                    }
                    if (column.name.toLowerCase().indexOf("origin") !== -1) {
                        me.importCsvColumnSource = column;
                    }
                    if (column.name.toLowerCase().indexOf("type") !== -1) {
                        me.importCsvColumnRelationType = column;
                    }
                    if (column.name.toLowerCase().indexOf("target") !== -1) {
                        me.importCsvColumnTarget = column;
                    }
                    if (column.name.toLowerCase().indexOf("destination") !== -1) {
                        me.importCsvColumnTarget = column;
                    }
                }
                me.relationCount = (data.length - 1);
            }, function(error) {
                me.statusType = "error";
                me.status = error;
            });
        },
        analyzeJsonLdFramework: function(file, success, failure) {
            if (file == null) {
                failure("No file to analyze");
                return;
            }
            if ((file)["name"] == null) {
                failure("Invalid file");
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                var result = ((e)["target"])["result"];
                var jsonObj = JSON.parse(result);
                if (jsonObj["@graph"]) {
                    if (jsonObj["@context"] === "http://credreg.net/ctdlasn/schema/context/json" || jsonObj["@context"] === "http://credreg.net/ctdl/schema/context/json" ||
                        jsonObj["@context"] === "https://credreg.net/ctdlasn/schema/context/json" || jsonObj["@context"] === "https://credreg.net/ctdl/schema/context/json") {
                        if (jsonObj["@graph"][0]["@type"].indexOf("Concept") !== -1) {
                            success(jsonObj["@graph"], "ctdlasnConcept");
                        } else {
                            success(jsonObj["@graph"], "ctdlasn");
                        }
                    } else {
                        success(jsonObj["@graph"], null);
                    }
                } else {
                    failure("Invalid file");
                }
            };
            reader.readAsText(file, "UTF-8");
        },
        importMedbiq: function() {
            var identity = EcIdentityManager.ids[0];
            var f = new EcFramework();
            if (identity != null) { f.addOwner(identity.ppk.toPk()); }
            if (this.queryParams.newObjectEndpoint != null) {
                f.generateShortId(this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint);
            } else {
                f.generateId(this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint);
            }
            f["schema:dateCreated"] = new Date().toISOString();
            f.setName(this.importFrameworkName);
            f.setDescription(this.importFrameworkDescription);
            let me = this;
            MedbiqImport.importCompetencies(this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint, identity, function(competencies) {
                for (var i = 0; i < competencies.length; i++) {
                    f.addCompetency(competencies[i].shortId());
                }
                me.repo.saveTo(f, function(success) {
                    me.file.splice(0, 1);
                    if (me.file.length > 0) {
                        me.firstImport = false;
                        me.analyzeImportFile();
                    } else {
                        me.framework = f;
                        me.spitEvent("importFinished", f.shortId(), "importPage");
                    }
                }, function(failure) {
                    me.statusType = "error";
                    me.status = failure;
                });
            },
            function(failure) {
                me.statusType = "error";
                me.status = failure;
            },
            function(increment) {
                me.status = increment.competencies + "/" + me.competencyCount + " competencies imported.";
            }, me.repo);
        },
        importAsn: function() {
            var identity = EcIdentityManager.ids[0];
            let me = this;
            ASNImport.importCompetencies(this.repo.selectedServer, identity, true, function(competencies, f) {
                me.file.splice(0, 1);
                if (me.file.length > 0) {
                    me.firstImport = false;
                    me.analyzeImportFile();
                } else {
                    me.framework = f;
                    me.spitEvent("importFinished", f.shortId(), "importPage");
                }
            },
            function(failure) {
                me.statusType = "error";
                me.status = failure;
            },
            function(increment) {
                me.statusType = "info";
                me.status = increment.competencies + "/" + me.competencyCount + " competencies imported.";
            }, me.repo);
        },
        importCtdlAsnCsv: function() {
            let ceo = null;
            if (EcIdentityManager.ids.length > 0) { ceo = EcIdentityManager.ids[0]; }
            let me = this;
            CTDLASNCSVImport.importFrameworksAndCompetencies(me.repo, me.file[0], function(frameworks, competencies, relations) {
                if (me.queryParams.ceasnDataFields === true) {
                    for (var i = 0; i < frameworks.length; i++) {
                        if (frameworks[i]["schema:inLanguage"] == null || frameworks[i]["schema:inLanguage"] === undefined) {
                            /*
                             * me.setDefaultLanguage();
                             * frameworks[i]["schema:inLanguage"] = defaultLanguage;
                             */
                        }
                    }
                }
                var all = frameworks.concat(competencies).concat(relations);
                me.statusType = "info";
                me.status = "Saving " + all.length + " objects.";
                me.repo.multiput(all, function() {
                    for (var i = 0; i < frameworks.length; i++) {
                        me.framework = frameworks[i];
                        me.importSuccess();
                        me.spitEvent("importFinished", frameworks[i].shortId(), "importPage");
                    }
                    me.file.splice(0, 1);
                    if (me.file.length > 0) {
                        me.firstImport = false;
                        me.analyzeImportFile();
                    }
                }, function(failure) {
                    me.statusType = "error";
                    me.status = failure;
                });
            }, function(failure) {
                me.statusType = "error";
                me.status = failure;
            }, ceo);
        },
        importPdf: function() {
            var me = this;
            var formData = new FormData();
            formData.append(me.file[0].name, me.file[0]);
            EcRemote.postExpectingObject(
                "https://t3.cassproject.org/service/parse/",
                "docx",
                formData,
                function(d) {
                    var toSave = [];
                    var f = new EcFramework();
                    f.setName(d.name);
                    f.setDescription(d.description);
                    f.assignId(me.repo.selectedServer, me.file[0].name);
                    f.competency = [];
                    f.relation = [];
                    toSave.push(f);
                    console.log(d);
                    console.log(JSON.parse(f.toJson()));
                    var cs = {};
                    if (!d.competencies) {
                        me.showErrors = true;
                        me.status = "Error importing competencies.";
                        me.statusType = "error";
                        me.errors.push("Error importing competencies, no competencies found in file.");
                        me.processingFile = false;
                        return;
                    }
                    me.detailsDetected.competencies = d.competencies.length;
                    for (var i = 0; i < d.competencies.length; i++) {
                        var c = new EcCompetency();
                        c.assignId(me.repo.selectedServer, d.competencies[i].id);
                        cs[d.competencies[i].id] = c.shortId();
                        if (d.competencies[i].name != null) { c.setName(d.competencies[i].name.trim()); }
                        if (d.competencies[i].name !== d.competencies[i].description && d.competencies[i].description) { c.setDescription(d.competencies[i].description.trim()); }
                        f.competency.push(c.shortId());
                        toSave.push(c);
                    }
                    for (var i = 0; i < d.relation.length; i++) {
                        var c = new EcAlignment();
                        c.assignId(me.repo.selectedServer, d.relation[i].source + "_" + d.relation[i].relationType + "_" + d.relation[i].target);
                        c.source = cs[d.relation[i].source];
                        c.target = cs[d.relation[i].target];
                        c.relationType = d.relation[i].relationType;
                        if (c.source !== undefined && c.target !== undefined) {
                            f.relation.push(c.shortId());
                            toSave.push(c);
                        } else {
                            console.log(JSON.parse(c.toJson()));
                        }
                    }
                    me.repo.multiput(toSave, function() {
                        me.framework = f;
                        me.status = "";
                        me.importSuccess();
                    }, console.error);
                    me.statusType = "info";
                    me.status = "Writing Framework to CaSS...";
                }, console.error);
            me.statusType = "info";
            me.status = "Importing Framework...";
        },
        importCsv: function() {
            var file = this.file[0];
            var relations = this.csvRelationFile;
            var identity = EcIdentityManager.ids[0];
            var endpoint = this.queryParams.newObjectEndpoint == null ? this.repo.selectedServer : this.queryParams.newObjectEndpoint;

            var f = new EcFramework();
            if (identity != null) { f.addOwner(identity.ppk.toPk()); }
            if (this.queryParams.newObjectEndpoint !== null) {
                f.generateShortId(endpoint);
            } else {
                f.generateId(endpoint);
            }
            f["schema:dateCreated"] = new Date().toISOString();
            f.setName(this.importFrameworkName);
            f.setDescription(this.importFrameworkDescription);
            let me = this;
            CSVImport.importCompetencies(
                file,
                endpoint,
                identity,
                this.importCsvColumnName.index,
                this.importCsvColumnDescription.index,
                this.importCsvColumnScope.index,
                this.importCsvColumnId.index,
                relations,
                this.importCsvColumnSource.index,
                this.importCsvColumnRelationType.index,
                this.importCsvColumnTarget.index,
                function(competencies, alignments) {
                    f.competency = [];
                    f.relation = [];
                    for (var i = 0; i < competencies.length; i++) {
                        f.competency.push(competencies[i].shortId());
                    }
                    for (var i = 0; i < alignments.length; i++) {
                        f.relation.push(alignments[i].shortId());
                    }
                    repo.saveTo(f, function(success) {
                        me.file.splice(0, 1);
                        if (me.file.length > 0) {
                            me.firstImport = false;
                            me.analyzeImportFile();
                        } else {
                            me.framework = f;
                            me.importSuccess();
                            me.spitEvent("importFinished", f.shortId(), "importPage");
                        }
                    }, function(failure) {
                        me.statusType = "error";
                        me.status = failure;
                    });
                },
                function(failure) {
                    me.statusType = "error";
                    me.status = failure;
                },
                function(increment) {
                    if (increment.relations != null && increment.relations !== undefined) {
                        me.statusType = "info";
                        me.status = (increment.relations + "/" + me.relationCount + " relations imported.");
                    } else if (increment.competencies != null && increment.competencies !== undefined) {
                        me.statusType = "info";
                        me.status = (increment.competencies + "/" + me.competencyCount + " competencies imported.");
                    } else {
                        me.statusType = "info";
                        me.status = "Importing...";
                    }
                }, false, me.repo);
        },
        importJsonLd: function(data) {
            var formData = new FormData();
            if (data != null && data !== undefined) {
                formData.append('data', JSON.stringify(data));
            } else {
                var file = this.file[0];
                formData.append('file', file);
            }
            var identity = EcIdentityManager.ids[0];
            if (identity != null) { formData.append('owner', identity.ppk.toPk().toPem()); }
            let me = this;
            me.framework = null;
            EcRemote.postInner(this.repo.selectedServer, "ctdlasn", formData, null, function(data) {
                if (data.indexOf("ctdlasn") !== -1) {
                    var data1 = data.substring(0, data.indexOf("ctdlasn"));
                    var data2 = data.substring(data.indexOf("ctdlasn") + 7);
                    data = data1 + "data" + data2;
                }
                me.framework = EcFramework.getBlocking(data);
                if (me.framework == null) {
                    me.framework = EcConceptScheme.getBlocking(data);
                }
                me.importSuccess();
                me.spitEvent("importFinished", me.framework.shortId(), "importPage");
                if (me.file != null) {
                    me.file.splice(0, 1);
                }
                if (me.file.length > 0) {
                    me.firstImport = false;
                    me.analyzeImportFile();
                }
            }, function(failure) {
                me.statusType = "error";
                me.status = "Import failed. Check your import file for any errors.";
                console.log(failure.statusText);
            });
            me.statusType = "info";
            me.status = "Importing Framework";
        },
        importFromFile: function() {
            if (this.importType === "csv") {
                // temporarily fail on csv
                this.unsupportedFile('csv');
                // this.importCsv();
            } else if (this.importType === "ctdlasncsv") {
                this.unsupportedFile('ctdlasncsv');
                // this.importCtdlAsnCsv();
            } else if (this.importType === "ctdlasnjsonld") {
                this.unsupportedFile('ctdlasnjsonld');
                // this.importJsonLd();
            } else if (this.importType === "asn") {
                this.unsupportedFile('asn');
                // this.importAsn();
            } else if (this.importType === "pdf") {
                this.importPdf();
            } else if (this.importType === "medbiq") {
                this.unsupportedFile('medbiq');
                // this.importMedbiq();
            }
        },
        connectToServer: function() {
            this.caseDocs.splice(0, this.caseDocs.length);
            // To do: add import from CaSS Server
            this.caseDetectEndpoint();
        },
        caseDetectEndpoint: function() {
            var me = this;
            if (!this.serverUrl.endsWith("/")) {
                this.serverUrl += "/";
            }
            this.get(this.serverUrl, "ims/case/v1p0/CFDocuments", {"Accept": "application/json"}, function(success) {
                me.caseGetDocsSuccess(success);
            }, function(failure) {
                me.caseGetServerSide();
            });
        },
        caseGetDocsSuccess: function(result) {
            result = JSON.parse(result);
            if (result.CFDocuments == null) {
                me.statusType = "error";
                this.status = "No frameworks found. Please check the URL and try again.";
            } else {
                this.status = result.CFDocuments.length + " frameworks detected.";
                for (var i = 0; i < result.CFDocuments.length; i++) {
                    var doc = result.CFDocuments[i];
                    var obj = {};
                    obj.name = doc.title;
                    obj.id = doc.uri;
                    obj.identifier = doc.identifier;
                    obj.loading = false;
                    obj.success = false;
                    obj.error = false;
                    obj.checked = false;
                    this.caseDocs.push(obj);
                }
                this.caseCancel = false;
            }
        },
        caseGetServerSide: function() {
            var me = this;
            EcRemote.getExpectingString(this.repo.selectedServer, "ims/case/getDocs?url=" + this.serverUrl, function(success) {
                me.caseGetDocsSuccess(success);
            }, function(failure) {
                me.statusType = "error";
                me.status = "No frameworks found. Please check the URL and try again.";
            });
        },
        importCase: function() {
            for (var i = this.caseDocs.length - 1; i >= 0; i--) {
                if (!this.caseDocs[i].checked) {
                    this.caseDocs.splice(i, 1);
                } else if (this.caseDocs[i].success === false && this.caseDocs[i].error === false) {
                    this.caseDocs[i].loading = true;
                }
            }
            if (!this.caseCancel) {
                let lis = 0;
                let firstIndex = null;
                for (var i = 0; i < this.caseDocs.length; i++) {
                    if (this.caseDocs[i].loading === true) {
                        lis++;
                        if (firstIndex == null) {
                            firstIndex = i;
                        }
                    }
                }
                if (lis === 0) {
                    this.statusType = "success";
                    this.status = "Import finished.";
                } else {
                    var me = this;
                    var id = this.caseDocs[firstIndex].id;
                    var uuid = this.caseDocs[firstIndex].identifier;

                    var identity = EcIdentityManager.ids[0];
                    var formData = new FormData();
                    if (identity != null) { formData.append('owner', identity.ppk.toPk().toPem()); }
                    EcRemote.postInner(this.repo.selectedServer, "ims/case/harvest?caseEndpoint=" + this.serverUrl + "&dId=" + uuid, formData, null, function(success) {
                        me.caseDocs[firstIndex].loading = false;
                        me.caseDocs[firstIndex].success = true;
                        EcFramework.get(id, function(f) {
                            me.framework = f;
                            me.spitEvent("importFinished", f.shortId(), "importPage");
                        }, console.error);
                        me.importCase();
                    }, function(failure) {
                        me.caseDocs[firstIndex].loading = false;
                        me.caseDocs[firstIndex].error = true;
                        me.importCase();
                    });
                }
            }// if not canceled
        },
        cancelCase: function() {
            this.caseCancel = true;
            var first = null;
            for (var i = 0; i < this.caseDocs.length; i++) {
                if (this.caseDocs[i].loading === true) {
                    if (first == null) {
                        first = i;
                    } else {
                        this.caseDocs[i].loading = false;
                        this.caseDocs[i].error = true;
                    }
                }
            }
            this.status = "Import Canceled.";
        },
        parseText: function() {
        },
        importFromUrl: function() {
            let me = this;
            EcRemote.getExpectingString(this.url, null, function(result) {
                result = JSON.parse(result);
                var graph = result["@graph"];
                if (graph != null) {
                    me.importJsonLd(result);
                } else {
                    me.statusType = "error";
                    me.status = "URL must have an '@graph' field at the top level.";
                    return;
                }
                if (graph[0]["@type"].indexOf("Concept") !== -1) {
                    me.status = "Competency Editor cannot be used to import concept schemes.";
                }
            }, function(failure) {
                if (!failure) {
                    me.statusType = "error";
                    me.status = "Import Error";
                } else {
                    me.statusType = "error";
                    me.status = failure;
                }
            });
        },
        mounted: function() {

        }
    }
};
</script>

<style lang="scss">
    @import './../../variables.scss';
</style>