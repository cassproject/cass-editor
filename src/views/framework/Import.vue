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
                <a class="right" :href="csvTemplateCompetenciesFile" download='Template - Competencies.csv'>Template - Competencies <i class="fa fa-download" /></a>
                <a :href="csvExampleCompetenciesFile" download='CAP Software Engineering - Competencies.csv'>Example - Competencies <i class="fa fa-download" /></a>
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
                <a class="right" :href="ctdlAsnCsvTemplateFile" download='CTDL-ASN.ONET.template.csv'>Template <i class="fa fa-download" /></a>
                <a :href="ctdlAsnCsvExampleFile" download='CTDL-ASN.ONET.example.csv'>Example <i class="fa fa-download" /></a>
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
                <a :href="medbiquitousFile" download='educational_achievement_sample_1June2012.xml'>Example <i class="fa fa-download" /></a>
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
                <a :href="asnRdfJsonFile" download='D2695955.json'>Example <i class="fa fa-download" /></a>
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
                <a :href="ctdlAsnJsonldFile" download='DQP.jsonld'>Example <i class="fa fa-download" /></a>
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
                            <a @click="method = 'file'">
                                <span class="icon is-small"><i
                                    class="fas fa-file"
                                    aria-hidden="true" /></span>
                                <span>File Import</span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': method === 'server'}">
                            <a @click="method = 'server'">
                                <span class="icon is-small">
                                    <i
                                        class="fa fa-server"
                                        aria-hidden="true" />
                                </span>
                                <span>Remote Server</span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': method === 'text'}">
                            <a @click="method = 'text'">
                                <span class="icon is-small">
                                    <i
                                        class="fas fa-paste"
                                        aria-hidden="true" />
                                </span>
                                <span>Paste Text</span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': method === 'url'}">
                            <a @click="method = 'url'">
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
                    type="file">
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
                <Hierarchy
                    v-if="framework"
                    :container="framework"
                    containerType="Framework"
                    containerNodeProperty="competency"
                    containerEdgeProperty="relation"
                    nodeType="Competency"
                    edgeType="Relation"
                    edgeRelationProperty="relationType"
                    edgeRelationLiteral="narrows"
                    edgeSourceProperty="source"
                    edgeTargetProperty="target"
                    editable="false"
                    :repo="repo" />
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
                        Check
                    </button>
                    <div>
                        {{ status }}
                    </div>
                </center>
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
export default {
    name: "Import",
    props: {
    },
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
            medbiquitousFile: medbiquitous
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
                    me.$nextTick(function() { this.framework = f; });
                    for (var i = 0; i < competencies.length; i++) {
                        EcRepository.cache[competencies[i].shortId()] = competencies[i];
                        f.addCompetency(competencies[i].shortId());
                    }
                    for (var i = 0; i < relations.length; i++) {
                        EcRepository.cache[relations[i].shortId()] = relations[i];
                        f.addRelation(relations[i].shortId());
                    }
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
        importFromFile: function() {

        },
        connectToServer: function() {

        },
        parseText: function() {
        },
        importFromUrl: function() {

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
        input{
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