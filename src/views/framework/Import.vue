<template>
    <div class="import-page">
        <aside class="menu is-info">
            <div
                class="menu-header"
                v-if="method=='file'">
                Supported File Types
            </div>
            <div
                class="menu-header"
                v-if="method=='server'">
                Supported Servers
            </div>
            <div
                class="menu-header"
                v-if="method=='text'">
                How to format text
            </div>
            <div
                class="menu-header"
                v-if="method=='url'">
                Supported URL Imports
            </div>
            <div
                class="menu-item"
                v-if="method=='file'">
                <h1>CaSS formatted CSV</h1>
                <h2>
                    For this import, you can use one or two CSVs.
                    The first (required) CSV describes the competencies to include in a new framework.
                    The second (optional) CSV describes the relations between the competencies found in the first framework.
                    <br>
                    Each row in the first CSV will represent one competency,
                    and each row in the second CSV will represent one relation between two competencies.
                    The relations can be between competencies found in the first CSV,
                    competencies found in other frameworks, or a mixture of the two.
                    <br>
                    You can select the columns to use to describe the id, name, description, and other fields.
                </h2>
                <a
                    :href="csvExampleCompetenciesFile"
                    download="CAP Software Engineering - Competencies.csv">Example - Competencies <i class="fa fa-download" /></a>
                <a
                    :href="csvExampleRelationsFile"
                    download="CAP Software Engineering - Relations.csv">Example - Relations <i class="fa fa-download" /></a>
                <a
                    class=""
                    :href="csvTemplateCompetenciesFile"
                    download="Template - Competencies.csv">Template - Competencies <i class="fa fa-download" /></a>
                <a
                    class=""
                    :href="csvTemplateRelationsFile"
                    download="Template - Relations.csv">Template - Relations <i class="fa fa-download" /></a>
            </div>
            <div
                class="menu-item"
                v-if="method=='file'">
                <h1>CTDL-ASN formatted CSV</h1>
                <h2>
                    For this import, you use one CSV.
                    Each row in the CSV will represent one object, whether that be a competency, or a competency framework.
                    Particular fields will be used to determine hierarchy.
                    <br>
                    Using this format, you can import several frameworks, each with their own competencies.
                    Competencies may not be shared across frameworks, and each competency may only have one parent.
                    <br>
                    It is also important that the rows be sequenced correctly,
                    with competency frameworks appearing before the competencies inside of them,
                    and for a parent to be in a row above a child of that parent.
                    <br>
                    Any field with multiple values must be formatted as entry 1|entry 2.
                </h2>
                <a
                    class="right"
                    :href="ctdlAsnCsvTemplateFile"
                    download="CTDL-ASN.ONET.template.csv">Template <i class="fa fa-download" /></a>
                <a
                    :href="ctdlAsnCsvExampleFile"
                    download="CTDL-ASN.ONET.example.csv">Example <i class="fa fa-download" /></a>
            </div>
            <div
                class="menu-item"
                v-if="method=='file'">
                <h1>Medbiquitous XML</h1>
                <h2>
                    Medbiquitous is a standards body that includes medical competencies as one of their XML based formats.
                    <br>
                    Using this format, you can import competencies exported from a system that exports Medbiquitous formatted XML.
                </h2>
                <a
                    :href="medbiquitousFile"
                    download="educational_achievement_sample_1June2012.xml">Example <i class="fa fa-download" /></a>
            </div>
            <div
                class="menu-item"
                v-if="method=='file'">
                <h1>Achievement Standards Network RDF+JSON</h1>
                <h2>
                    The Achievement Standards Network set of standards, or ASN standard for short,
                    is a legacy standard used primarily by achievementstandards.org to transmit
                    state standards and other national and organizational standards.
                    <br>
                    Using this format,
                    you can import competencies exported from achievementstandards.org and other systems in an RDF JSON format.
                </h2>
                <a
                    :href="asnRdfJsonFile"
                    download="D2695955.json">Example <i class="fa fa-download" /></a>
            </div>
            <div
                class="menu-item"
                v-if="method=='file'">
                <h1>CTDL-ASN formatted JSON-LD</h1>
                <h2>
                    For this import, you use one JSON-LD file that includes a graph of the framework and all of its competencies.
                    <br>
                    Using this format, you can import a framework and competencies from a system that exports CTDL-ASN formatted JSON-LD.
                </h2>
                <a
                    :href="ctdlAsnJsonldFile"
                    download="DQP.jsonld">Example <i class="fa fa-download" /></a>
            </div>
            <div
                class="menu-item"
                v-if="method=='server'">
                <h1>CaSS Server</h1>
                <h2>
                    If you know the URL of a CaSS Repository,
                    you can import frameworks from that repository.
                    <br>
                    This import maintains the URLs of the Competency Frameworks and does not change any of the data.
                    <br>
                    After entering the endpoint below, you can select which frameworks you would like to import.
                </h2>
                <a @click="serverUrl='https://sandbox.cassproject.org/'">Example: CaSS Sandbox <i class="fa fa-link" /></a>
            </div>
            <div
                class="menu-item"
                v-if="method=='server'">
                <h1>IMS CASE Server</h1>
                <h2>
                    If you know the URL of a IMS CASE Repository, such as OpenSalt,
                    you can import published frameworks from that repository.
                    <br>
                    This import maintains the URLs of the CASE frameworks and changes both the format
                    and schema used to store the CASE frameworks in CaSS, but does not change any of the data.
                    <br>
                    After entering the endpoint below, you can select which frameworks you would like to import.
                </h2>
                <a @click="serverUrl='https://opensalt.net'">Example: OpenSalt.net <i class="fa fa-link" /></a>
            </div>
            <div
                class="menu-item"
                v-if="method=='url'">
                <h1>CTDL-ASN JSON-LD Graphs</h1>
                <h2>
                    If you know the URL of a CTDL-ASN JSON-LD graph, you can import published frameworks by URL.
                    <br>
                    This import maintains the URLs of the original frameworks and changes both the format and
                    schema used to store the CTDL-ASN frameworks in CaSS, but does not change any of the data.
                    Please note that the Technology Skills framework below is very large and will take a long time to import.
                </h2>
                <a @click="url='https://www.onetcenter.org/ctdlasn/graph/ce-07c257d6-9119-11e8-b852-782bcb5df6ac'">Example: O*NET Abilities <i class="fa fa-link" /></a>
                <a @click="url='https://www.onetcenter.org/ctdlasn/graph/ce-07c25f74-9119-11e8-b852-782bcb5df6ac'">Example: O*NET Basic Skills <i class="fa fa-link" /></a>
                <a @click="url='https://www.onetcenter.org/ctdlasn/graph/ce-07c264d7-9119-11e8-b852-782bcb5df6ac'">Example: O*NET Cross-Functional Skills <i class="fa fa-link" /></a>
                <a @click="url='https://www.onetcenter.org/ctdlasn/graph/ce-07c27a0f-9119-11e8-b852-782bcb5df6ac'">Example: O*NET Knowledge <i class="fa fa-link" /></a>
                <a @click="url='https://www.onetcenter.org/ctdlasn/graph/ce-9fab4187-d8e7-11e9-8250-782bcb5df6ac'">Example: O*NET Technology Skills <i class="fa fa-link" /></a>
            </div>
            <div
                class="menu-item"
                v-if="method=='text'">
                <h2>
                    To enter a framework using text: Copy and paste or start writing in the box here. Use spaces to indicate indenture.
                    <br>
                    eg:
                    <pre>
First Level
 Second Level
     Third Level
 Second Level
                    </pre>
                </h2>
                <a
                    @click="text='First Level\n Second Level\n     Third Level\n Second Level'">Example <i class="fa fa-quote-right" /></a>
            </div>
        </aside>
        <div class="main">
            <div class="task-controls section">
                <div class="tabs is-small is-boxed">
                    <ul>
                        <li :class="{ 'is-active': method === 'file'}">
                            <a @click="method = 'file';framework = null;status='';">
                                <span class="icon is-small"><i
                                    class="fas fa-file"
                                    aria-hidden="true" /></span>
                                <span>File Import</span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': method === 'server'}">
                            <a @click="method = 'server';framework = null;status='';">
                                <span class="icon is-small">
                                    <i
                                        class="fa fa-server"
                                        aria-hidden="true" />
                                </span>
                                <span>Remote Server</span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': method === 'text'}">
                            <a @click="method = 'text';framework = null;status='';">
                                <span class="icon is-small">
                                    <i
                                        class="fas fa-paste"
                                        aria-hidden="true" />
                                </span>
                                <span>Paste Text</span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': method === 'url'}">
                            <a @click="method = 'url';framework = null;status='';">
                                <span class="icon is-small">
                                    <i
                                        class="fas fa-link"
                                        aria-hidden="true" />
                                </span>
                                <span>URL</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                class="section-import section-file"
                v-if="method=='file'">
                <center>
                    <h1>Drop file or click to select.</h1>
                </center>
                <input
                    type="file"
                    ref="fileInput"
                    @change="fileChange"
                    multiple>
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
                        <label>Step 7: Select a relation file (optional).
                            The relation source/target must be in the form of ID or Name, and the relation types should be "requires", "desires", "narrows", "isEnabledBy", "isRelatedTo", or "isEquivalentTo".</label>
                        <input
                            type="file"
                            @change="analyzeCsvRelation">
                    </div>
                    <div v-if="csvRelationFile">
                        <div>
                            <label>Step 8: Select the Source column.</label>
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
                <button @click="importFromFile">
                    Import
                </button>
                <center>
                    <div>
                        {{ status }}
                    </div>
                </center>
            </div>
            <div
                class="section-import section-server"
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
            <div
                class="section-import section-text"
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
            <div
                class="section-import section-url"
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
                editable="false"
                :repo="repo" />
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
export default {
    name: "Import",
    props: {
        queryParams: Object
    },
    mixins: [common],
    components: {Hierarchy},
    data: function() {
        return {
            method: "file",
            file: null,
            serverUrl: null,
            text: "",
            framework: null,
            url: null,
            repo: window.repo,
            status: "Ready.",
            ctdlAsnCsvExampleFile: ctdlAsnCsvExample,
            ctdlAsnCsvTemplateFile: ctdlAsnCsvTemplate,
            csvExampleCompetenciesFile: csvExampleCompetencies,
            csvExampleRelationsFile: csvExampleRelations,
            csvTemplateCompetenciesFile: csvTemplateCompetencies,
            csvTemplateRelationsFile: csvTemplateRelations,
            csvConceptExampleFile: csvConceptExample,
            csvConceptTemplateFile: csvConceptTemplate,
            ctdlAsnJsonldConceptsFile: ctdlAsnJsonldConcepts,
            ctdlAsnJsonldFile: ctdlAsnJsonld,
            asnRdfJsonFile: asnRdfJson,
            medbiquitousFile: medbiquitous,
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
            caseCancel: false
        };
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
    methods:
    {
        fileChange: function(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                this.file = null;
            } else {
                this.file = [];
                for (let i = 0; i < files.length; i++) {
                    this.file[i] = files[i];
                }
                this.analyzeImportFile();
            }
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
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                this.csvRelationFile = null;
            } else {
                this.csvRelationFile = files[0];
            }
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
                "http://ec2-52-10-142-111.us-west-2.compute.amazonaws.com:8080/tp3Demo2/api/custom/",
                "t3demo",
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
                    me.status = "Writing Framework to CaSS.";
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
        }
    }
};
</script>

<style lang="scss">
.import-page{
    .menu-item{
        display:block;
        border-radius: 1rem;
        margin-top:1rem;
        margin-right:1rem;
        padding:.25rem;
        padding-left:1rem;
        small{
            display:block;
        }
        a{
            display:block;
            font-size:.9rem;
            color:black;
            font-weight:bold;
        }
    }
    .menu-header{
        display:block;
        font-size:x-large;
        margin-top:1rem;
        margin-right:1rem;
        padding:.25rem;
        padding-left:1rem;
    }
    aside{
        width:405px;
        float:left;
        height:calc(100vh - 60px);
        h1{
            font-weight:bold;
            font-size:1.05rem;
        }
        h2{
            font-size:.8rem;
            text-align: justify;
            text-justify: inter-word;
            br{
                margin: 10px;
                display:block;
                content: " ";
            }
        }
        small{
            font-weight:bold;
            font-size:.8rem;
        }
        overflow-y:scroll;
    }
    .main{
        margin-left:420px;
    }

    .right{float:right;}

    .section-import{
        h1{
            font-size:x-large;
        }
        padding-bottom:0px;
    }

    .section-file{
        input[type=file]:first-of-type{
            width:100%;
            display:block;
            border:1px dashed black;
            border-radius:1rem;
            padding:100px;
            padding-left:calc(50% - 100px);
        }
    }

    .section-server{
        input{
            width:30rem;
        }
    }
    .section-text{
        textarea{
            width:30rem;
            height:10rem;
            display:block;
        }
    }
    .section-url{
        input{
            width:30rem;
        }
    }
    .e-Thing-always-ul .e-name{
        label{
            display:none;
        }
    }

    .e-Thing-always-ul .e-description{
        label{
            display:none;
        }
        font-size:.8rem;
    }

    .e-Competency{
        a {display:none;}
        >.expand{float:right;}
        >.compact{float:right;}
        >.delete-thing{float:right;}
    }
    .e-HierarchyNode{
        >ul{padding-left:1rem;}
        >.icon{
            width:0px;
            height:0px;
            line-height:0px;
            display:block;
            position:relative;
            left:-.5rem;
            top:-2rem;
        }
    }
}
</style>