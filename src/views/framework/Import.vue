<template>
    <div class="container is-fluid is-marginless is-paddingless">
        <div class="columns is-multiline is-marginless is-gapless is-mobile">
            <div class="column is-narrow is-hidden-mobile">
                <!--- side bar -->
                <side-bar
                    type="import"
                    :method="method" />
                <!--- end side bar -->
            </div>
            <!--- main body section -->
            <div class="column has-background-white is-scrollable">
                <section class="section">
                    <div class="container">
                        <div class="section">
                            <div class="columns is-mobile">
                                <div class="column is-narrow">
                                    <h1 class="title is-size-2">
                                        Import a framework
                                    </h1>
                                </div>
                                <div class="column">
                                    <p class="is-primary is-size-7">
                                        {{ status }}
                                    </p>
                                </div>
                            </div>
                            <p class="is-size-7">
                                Below is a preview of your Competency Framework, from this screen
                                you can edit names and descriptions, rearrange hierarchy. After
                                accepting the preview, you will gain access to the full editor to further
                                modify the imported competency framework.
                            </p>
                        </div>
                        <div class="is-hidden section">
                            <div class="columns is-mobile">
                                <div class="column is-6">
                                    <span class="icon">
                                        <i class="fas fa-hand has-text-black" />
                                    </span>
                                    <span class="is-size-7">
                                        Use your mouse to drag competencies
                                    </span>
                                </div>
                                <div class="column is-6">
                                    <span>
                                        <span class="icon">
                                            <i class="far fa-pencil has-text-black" />
                                        </span>
                                        <span class="is-size-7">
                                            Click the pencil button to edit
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
                                                class="import-tab"
                                                :class="{ 'is-active-tab': method === 'server'}">
                                                <a @click="method = 'server';framework = null;status='';">
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
                                                class="import-tab"
                                                :class="{ 'is-active-tab': method === 'text'}">
                                                <a @click="method = 'text';framework = null;status='';">
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
                                                class="import-tab"
                                                :class="{ 'is-active-tab': method === 'url'}">
                                                <a @click="method = 'url';framework = null;status='';">
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
                                            v-if="!processingFile"
                                            @dragAndDropEmitFiles="onUploadFiles" />
                                        <div
                                            v-if="processingFile"
                                            class="column is-12">
                                            <span class="icon is-large">
                                                <i class="fa fa-spinner fa-pulse fa-2x" />
                                            </span>
                                        </div>
                                    </div>
                                    <!-- appears to be part of an interstitial screen -->
                                    <div
                                        class="section">
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
                                    <!-- sever input -->
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
                            v-if="framework"
                            class="section"
                            id="framework-container">
                            <div class="tile is-vertical">
                                <Hierarchy
                                    v-if="framework"
                                    :container="framework"
                                    containerType="Framework"
                                    containerNodeProperty="competency"
                                    containerEdgeProperty="relation"
                                    nodeType="EcCompetency"
                                    edgeType="EcAlignment"
                                    edgeRelationProperty="relationType"
                                    edgeRelationLiteral="narrows"
                                    edgeSourceProperty="source"
                                    edgeTargetProperty="target"
                                    editable="true"
                                    :repo="repo" />
                            </div>
                        </div>
                        <div class="section">
                            <div class="columns is-mobile">
                                <div class="column is-12">
                                    <div class="buttons is-right">
                                        <div
                                            @click="cancelCase"
                                            class="button is-light is-pulled-right">
                                            <span class="icon">
                                                <i class="fas fa-undo-alt" />
                                            </span>
                                            <span>cancel</span>
                                        </div>
                                        <div
                                            @click="resetImport"
                                            class="button is-light is-pulled-right">
                                            <span class="icon">
                                                <i class="fas fa-undo-alt" />
                                            </span>
                                            <span>start over</span>
                                        </div>
                                        <div
                                            v-if="framework"
                                            @click="openFramework"
                                            class="button is-primary is-pulled-right">
                                            <span class="icon">
                                                <i class="fa fa-edit" />
                                            </span>
                                            <span>open editor</span>
                                        </div>
                                        <div
                                            v-if="framework"
                                            @click="openFramework"
                                            class="button is-primary is-pulled-right">
                                            <span class="icon">
                                                <i class="fa fa-edit" />
                                            </span>
                                            <span>open editor</span>
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
import ctdlAsnCsvExample from 'file-loader!../../../files/CTDL-ASN.ONET.example.csv';
import ctdlAsnCsvTemplate from 'file-loader!../../../files/CTDL-ASN.ONET.template.csv';
import csvExampleCompetencies from 'file-loader!../../../files/CAP Software Engineering - Competencies.csv';
import csvExampleRelations from 'file-loader!../../../files/CAP Software Engineering - Relations.csv';
import csvTemplateCompetencies from 'file-loader!../../../files/Template - Competencies.csv';
import csvTemplateRelations from 'file-loader!../../../files/Template - Relations.csv';
import csvConceptExample from 'file-loader!../../../files/Concept Scheme Example.csv';
import csvConceptTemplate from 'file-loader!../../../files/Concept Scheme Template.csv';
import ctdlAsnJsonldConcepts from 'file-loader!../../../files/ConnectingCredentialsLevels.jsonld';
import ctdlAsnJsonld from 'file-loader!../../../files/DQP.jsonld';
import asnRdfJson from 'file-loader!../../../files/D2695955';
import medbiquitous from 'file-loader!../../../files/educational_achievement_sample_1June2012.xml';
import common from '@/mixins/common.js';
import dragAndDrop from './../../components/DragAndDrop.vue';
import sideBar from './../../components/SideBar.vue';

export default {
    name: "Import",
    props: {
        queryParams: Object
    },
    mixins: [common],
    components: {Hierarchy, dragAndDrop, sideBar},
    data: function() {
        return {
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
            status: "Ready.",
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
            supportedFileTypes: [
                {
                    type: 'CaSS formatted CSV',
                    examples: [
                        {
                            name: 'Competencies',
                            id: 'cassCsvExComp',
                            location: csvExampleCompetencies,
                            download: 'CAP Software Engineering - Competencies.csv'
                        },
                        {
                            name: 'Relations',
                            id: 'cassCsvExRel',
                            location: csvExampleRelations,
                            download: 'CAP Software Engineering - Relations.csv'
                        }
                    ],
                    templates: [
                        {
                            name: 'Competencies',
                            id: 'cassCsvTemlComp',
                            location: csvTemplateCompetencies,
                            download: 'Template - Competencies.csv'
                        },
                        {
                            name: 'Relations',
                            id: 'cassCsvTempRel',
                            location: csvTemplateRelations,
                            download: 'Template - Relations.csv'
                        }
                    ],
                    showDescription: false,
                    description: `
                            For this import, you can use one or two CSVs.
                            The first (required) CSV describes the competencies to include in a new framework.
                            The second (optional) CSV describes the relations between the competencies found in the first framework.
                            </p><p class="content-body">
                            Each row in the first CSV will represent one competency,
                            and each row in the second CSV will represent one relation between two competencies.
                            The relations can be between competencies found in the first CSV,
                            competencies found in other frameworks, or a mixture of the two.
                            </p><p class="content-body">
                            You can select the columns to use to describe the id, name,
                            description, and other fields.`
                },
                {
                    type: 'CTDL-ASN formatted CSV',
                    examples: [
                        {
                            name: 'Example',
                            id: 'ctdlEx',
                            location: ctdlAsnCsvExample,
                            download: 'CTDL-ASN.ONET.example.csv'
                        }
                    ],
                    templates: [
                        {
                            name: 'Template',
                            id: 'ctdTempl',
                            location: ctdlAsnCsvTemplate,
                            download: 'CTDL-ASN.ONET.template.csv'
                        }
                    ],
                    showDescription: false,
                    description: `
                        For this import, you use one CSV.
                        Each row in the CSV will represent one object, whether
                        that be a competency, or a competency framework.
                        Particular fields will be used to determine hierarchy.
                        </p><p class="content-body">
                        Using this format, you can import several frameworks,
                        each with their own competencies.
                        </p><p>Competencies may not be shared across frameworks, and
                        each competency may only have one parent.
                        </p><p class="content-body">
                        It is also important that the rows be sequenced correctly,
                        with competency frameworks appearing before the competencies
                        inside of them,and for a parent to be in a row above
                        a child of that parent.
                        </p><p class="content-body">
                        Any field with multiple values must be formatted as entry
                        1|entry 2.`
                },
                {
                    type: 'Medbiquitous XML',
                    examples: [
                        {
                            name: 'example',
                            id: 'medXmlEx',
                            location: medbiquitous,
                            download: 'educational_achievement_sample_1June2012.xml'
                        }
                    ],
                    templates: [],
                    showDescription: false,
                    description: `
                        Medbiquitous is a standards body that includes medical
                        competencies as one of their XML based formats.
                        </p><p class="content-body">
                        Using this format, you can import competencies exported
                        from a system that exports Medbiquitous formatted XML.`
                },
                {
                    type: 'Achievement Standards Network RDF+JSON',
                    examples: [
                        {
                            name: 'Example',
                            id: 'asnrdEx',
                            location: asnRdfJson,
                            download: 'D2695955.json'
                        }
                    ],
                    templates: [],
                    showDescription: false,
                    description: `
                        The Achievement Standards Network set of standards, or ASN
                        standard for short, is a legacy standard used primarily by
                        achievementstandards.org to transmit state standards and
                        other national and organizational standards.
                        </p><p class="content-body">
                        Using this format,you can import competencies exported from
                        achievementstandards.org and other systems in an RDF JSON
                        format.`
                },
                {
                    type: 'CTDL-ASN formatted JSON-LD',
                    examples: [
                        {
                            name: 'Example',
                            id: 'ctdlJsonTemp',
                            location: ctdlAsnJsonld,
                            download: 'DQP.jsonld'
                        }
                    ],
                    templates: [],
                    showDescription: false,
                    description: `
                        For this import, you use one JSON-LD file that includes a
                        graph of the framework and all of its competencies.
                        </p><p class="content-body">
                        Using this format, you can import a framework and
                        competencies from a system that exports CTDL-ASN formatted
                        JSON-LD.`
                }
            ],
            supportedServer: [
                {
                    type: 'CaSS Server',
                    examples: [
                        {
                            name: 'Example: CaSS Sandbox',
                            id: 'cassSandbox',
                            location: "https://sandbox.cassproject.org/"
                        }
                    ],
                    showDescription: false,
                    description: `
                     If you know the URL of a CaSS Repository,
                    you can import frameworks from that repository.
                    </p><p class="content-body">
                    This import maintains the URLs of the Competency Frameworks
                    and does not change any of the data.
                    </p><p class="content-body">
                    After entering the endpoint below, you can select which
                    frameworks you would like to import.`
                },
                {
                    type: 'IMS CASE Server',
                    examples: [
                        {
                            name: 'Example: OpenSalt.net',
                            id: 'imsCaseServer',
                            location: "https://opensalt.net"
                        }
                    ],
                    showDescription: false,
                    description: `
                     If you know the URL of a IMS CASE Repository, such as OpenSalt, 
                     you can import published frameworks from that repository.
                     <br>
                     This import maintains the URLs of the CASE frameworks and changes both the format 
                     and schema used to store the CASE frameworks in CaSS, but does not change any of the data.
                     <br>
                     After entering the endpoint below, you can select which frameworks you would like to import.`
                }
            ],
            supportedUrl: [
                {
                    type: 'CTDL-ASN JSON-LD Graphs',
                    examples: [
                        {
                            name: 'Example: O*NET Abilities',
                            id: 'onetAbilities',
                            location: "https://www.onetcenter.org/ctdlasn/graph/ce-07c257d6-9119-11e8-b852-782bcb5df6ac"
                        },
                        {
                            name: 'Example: O*NET Basic Skills',
                            id: 'onetBasicSkills',
                            location: "https://www.onetcenter.org/ctdlasn/graph/ce-07c25f74-9119-11e8-b852-782bcb5df6ac"
                        },
                        {
                            name: 'Example: O*NET Cross-Functional Skills',
                            id: 'onetCrossFunctionalSkills',
                            location: "https://www.onetcenter.org/ctdlasn/graph/ce-07c264d7-9119-11e8-b852-782bcb5df6ac"
                        },
                        {
                            name: 'Example: O*NET Knowledge',
                            id: 'onetKnowledge',
                            location: "https://www.onetcenter.org/ctdlasn/graph/ce-07c27a0f-9119-11e8-b852-782bcb5df6ac"
                        },
                        {
                            name: 'Example: O*NET Technology Skills',
                            id: 'onetTechnologySkills',
                            location: "https://www.onetcenter.org/ctdlasn/graph/ce-9fab4187-d8e7-11e9-8250-782bcb5df6ac"
                        }
                    ],
                    showDescription: false,
                    description: `
                     If you know the URL of a CTDL-ASN JSON-LD graph, you can import published frameworks by URL.
                     <br>
                     This import maintains the URLs of the original frameworks and changes both the format and
                     schema used to store the CTDL-ASN frameworks in CaSS, but does not change any of the data.
                     Please note that the Technology Skills framework below is very large and will take a long time to import.`
                }
            ]
        };
    },
    computed: {
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
        resetImport: function(value) {
            this.framework = null;
            this.file = null;
            this.processingFile = false;
            this.processingSuccess = false;
            this.$refs.dragAndDrop.fileChange();
            this.status = "Ready.";
        },
        onUploadFiles: function(value) {
            this.file = value;
            this.fileChange(this.file);
        },
        openFramework: function() {
            var me = this;
            if (this.queryParams.concepts === "true") {
                EcConceptScheme.get(me.framework.id, function(success) {
                    me.$store.commit('framework', success);
                    me.$router.push({name: "conceptScheme", params: {frameworkId: me.framework.id}});
                }, console.error);
            } else {
                EcFramework.get(me.framework.id, function(success) {
                    me.$store.commit('framework', success);
                    me.$router.push({name: "framework", params: {frameworkId: me.framework.id}});
                }, console.error);
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
                        me.status = (me.competencyCount = (data.length - 1)) + " Competencies Detected.";
                    }, function(error) {
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
                    me.status = error;
                });
            } else if (file.name.endsWith(".pdf")) {
                me.importType = "pdf";
                me.status = "File selected.";
            } else if (file.name.endsWith(".docx")) {
                me.importType = "pdf";
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
                    me.status = failure;
                });
            },
            function(failure) {
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
                me.status = failure;
            },
            function(increment) {
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
                me.status = "Saving " + all.length + " objects.";
                me.repo.multiput(all, function() {
                    for (var i = 0; i < frameworks.length; i++) {
                        me.framework = frameworks[i];
                        me.status = "Import Finished.";
                        me.spitEvent("importFinished", frameworks[i].shortId(), "importPage");
                    }
                    me.file.splice(0, 1);
                    if (me.file.length > 0) {
                        me.firstImport = false;
                        me.analyzeImportFile();
                    }
                }, function(failure) {
                    me.status = failure;
                });
            }, function(failure) {
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
                    f.assignId(me.repo.selectedServer, me.file.name);
                    f.competency = [];
                    f.relation = [];
                    toSave.push(f);
                    console.log(d);
                    console.log(JSON.parse(f.toJson()));
                    var cs = {};
                    for (var i = 0; i < d.competencies.length; i++) {
                        var c = new EcCompetency();
                        c.assignId(me.repo.selectedServer, d.competencies[i].id);
                        cs[d.competencies[i].id] = c.shortId();
                        if (d.competencies[i].name != null) { c.setName(d.competencies[i].name.trim()); }
                        if (d.competencies[i].name !== d.competencies[i].description) { c.setDescription(d.competencies[i].description.trim()); }
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
                    }, console.error);
                    me.status = "Writing Framework to CaSS...";
                }, console.error);
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
                            me.status = "Import Finished.";
                            me.spitEvent("importFinished", f.shortId(), "importPage");
                        }
                    }, function(failure) {
                        me.status = failure;
                    });
                },
                function(failure) {
                    me.status = failure;
                },
                function(increment) {
                    if (increment.relations != null && increment.relations !== undefined) {
                        me.status = (increment.relations + "/" + me.relationCount + " relations imported.");
                    } else if (increment.competencies != null && increment.competencies !== undefined) {
                        me.status = (increment.competencies + "/" + me.competencyCount + " competencies imported.");
                    } else {
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
                me.status = "Import Finished.";
                me.spitEvent("importFinished", me.framework.shortId(), "importPage");
                if (me.file != null) {
                    me.file.splice(0, 1);
                }
                if (me.file.length > 0) {
                    me.firstImport = false;
                    me.analyzeImportFile();
                }
            }, function(failure) {
                me.status = "Import failed. Check your import file for any errors.";
                console.log(failure.statusText);
            });
            me.status = "Importing Framework";
        },
        importFromFile: function() {
            if (this.importType === "csv") {
                this.importCsv();
            } else if (this.importType === "ctdlasncsv") {
                this.importCtdlAsnCsv();
            } else if (this.importType === "ctdlasnjsonld") {
                this.importJsonLd();
            } else if (this.importType === "asn") {
                this.importAsn();
            } else if (this.importType === "pdf") {
                this.importPdf();
            } else if (this.importType === "medbiq") {
                this.importMedbiq();
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
            if (result.CFDocuments == null) { this.status = "No frameworks found. Please check the URL and try again."; } else {
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
                    me.status = "URL must have an '@graph' field at the top level.";
                    return;
                }
                if (graph[0]["@type"].indexOf("Concept") !== -1) {
                    me.status = "Competency Editor cannot be used to import concept schemes.";
                }
            }, function(failure) {
                if (!failure) {
                    me.status = "Import Error";
                } else {
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
#drop-area {
    height: auto;
    margin: 0px;
    padding: 0px;
    width: auto;
    .column {
        height: auto;
    }
}
.menu {
    overflow-y: scroll;
    height: 100vh;
    padding: 1rem;
    width: 300px;
}
.scrollable-section {
    overflow-y: scroll;
    height: 100vh;
}
.menu-list_list-item {
    list-style-type: none;
    padding: .5rem 0em;
}
.menu-list_list-subitem {
    list-style-type: none;
    padding: .25rem 0em;
}
.buttons {
    margin-right: 0em !important;
    margin: 0em !important;
    :not(:last-child) {
    }
    a:first {
        padding-left: 0em !important;
        margin-left: 0em !important;
    }
}
.content-body-wrapper {
    padding: .5em 0em;
    .content-body {
        padding-top: .25rem;
        :last {
            padding-bottom: 1em;
        }
    }
}
.menu-list a {
    padding: .5em .5em .5em 0em;
}

 .drag-file-area {
    width:100%;
    display:block;
    border:2px dashed $black;
    border-radius:1rem;
    padding:100px;
    margin: auto;

}
.import-tab {
    margin-top: -40px;
    height: 100px;
    color: $dark;
    width: 100%;
    max-width: 100px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
    align-items: center;
    font-size: .7rem;
    border-radius: 100px;
    background-color: transparent;
   i {
     color: $dark;
   }
   div {
       color: $dark;
   }
}
.is-active-tab{
  background-color: $light;
  color: $secondary;
  i {
      color: $secondary;
  }
  div {
      color: $secondary;
  }
}
.tile {
    border-radius: 1rem;
}
#framework-container {
    min-height: 400px;
    max-height:68vh;
    overflow-y: scroll;
    border: 2px solid $black;
    border-radius: 1rem;
}
</style>