<template>
    <aside
        class="menu has-background-primary has-text-white">
        <div
            class="menu-label is-size-3"
            v-if="method=='file'">
            Supported File Types
        </div>
        <div
            class="menu-label"
            v-if="method=='server'">
            Supported Servers
        </div>
        <div
            class="menu-label"
            v-if="method=='text'">
            How to format text
        </div>
        <div
            class="menu-header"
            v-if="method=='url'">
            Supported URL Imports
        </div>
        <div
            v-if="method=='file'"
            class="menu-list">
            <li
                class="menu-list_list-item"
                v-for="(supportedType, index) in supportedFiles"
                :key="index">
                <h1 class="is-size-6 has-text-weight-medium">
                    {{ supportedType.type }}
                    <span
                        @click="supportedType.showDescription = !supportedType.showDescription"
                        class="icon is-pulled-right">
                        <i class="fa fa-info-circle" />
                    </span>
                </h1>
                <p
                    class="is-size-7 content-body-wrapper"
                    v-if="supportedType.showDescription"
                    v-html="supportedType.description" />
                <div class="menu-list_list-subitem">
                    <h5
                        class="is-size-7 has-text-weight-bold"
                        v-if="supportedType.examples.length > 0">
                        Examples
                    </h5>
                    <div class="buttons is-left">
                        <a
                            class="button has-text-link is-size-7 is-small is-text"
                            v-for="(example) in supportedType.examples"
                            :key="example.id"
                            :href="example.location"
                            :download="example.download">
                            <span>
                                {{ example.name }}
                            </span>
                            <span class="icon">
                                <i class="fa fa-download" />
                            </span>
                        </a>
                    </div>
                </div>
                <div class="menu-list_list-subitem">
                    <h5
                        class="is-size-7 has-text-weight-bold"
                        v-if="supportedType.templates.length > 0">
                        Templates
                    </h5>
                    <div class="buttons is-left">
                        <a
                            class="button has-text-link is-size-7 is-small is-text"
                            v-for="(template) in supportedType.templates"
                            :key="template.id"
                            :href="template.location"
                            :download="template.download">
                            <span>
                                {{ template.name }}
                            </span>
                            <span class="icon">
                                <i class="fa fa-download" />
                            </span>
                        </a>
                    </div>
                </div>
            </li>
        </div>
        <div
            v-else-if="method=='server'"
            class="menu-list">
            <li
                class="menu-list_list-item"
                v-for="(supportedType, index) in supportedServer"
                :key="index">
                <h1 class="is-size-6 has-text-weight-medium">
                    {{ supportedType.type }}
                    <span
                        @click="supportedType.showDescription = !supportedType.showDescription"
                        class="icon is-pulled-right">
                        <i class="fa fa-info-circle" />
                    </span>
                </h1>
                <p
                    class="is-size-7 content-body-wrapper"
                    v-if="supportedType.showDescription"
                    v-html="supportedType.description" />
                <div class="menu-list_list-subitem">
                    <h5
                        class="is-size-7 has-text-weight-bold"
                        v-if="supportedType.examples.length > 0">
                        Examples
                    </h5>
                    <div class="buttons is-left">
                        <a
                            class="button has-text-link is-size-7 is-small is-text"
                            v-for="(example) in supportedType.examples"
                            :key="example.id"
                            @click="serverUrl=example.location">
                            <span>
                                {{ example.name }}
                            </span>
                        </a>
                    </div>
                </div>
            </li>
        </div>
        <div
            v-else-if="method=='url'"
            class="menu-list">
            <li
                class="menu-list_list-item"
                v-for="(supportedType, index) in supportedUrl"
                :key="index">
                <h1 class="is-size-6 has-text-weight-medium">
                    {{ supportedType.type }}
                    <span
                        @click="supportedType.showDescription = !supportedType.showDescription"
                        class="icon is-pulled-right">
                        <i class="fa fa-info-circle" />
                    </span>
                </h1>
                <p
                    class="is-size-7 content-body-wrapper"
                    v-if="supportedType.showDescription"
                    v-html="supportedType.description" />
                <div class="menu-list_list-subitem">
                    <h5
                        class="is-size-7 has-text-weight-bold"
                        v-if="supportedType.examples.length > 0">
                        Examples
                    </h5>
                    <div class="buttons is-left">
                        <a
                            class="button has-text-link is-size-7 is-small is-text"
                            v-for="(example) in supportedType.examples"
                            :key="example.id"
                            @click="url=example.location">
                            <span>
                                {{ example.name }}
                            </span>
                        </a>
                    </div>
                </div>
            </li>
        </div>
        <div
            v-else-if="method=='text'"
            class="menu-list">
            <li
                class="menu-list_list-item">
                <p
                    class="is-size-7 content-body-wrapper">
                    To enter a framework using text: Copy and paste or start writing in the box here. Use spaces to indicate indenture.
                    <br>
                    eg:
                    <pre>
                        First Level
                            Second Level
                            Third Level
                            Second Level
                    </pre>
                </p>
                <div class="buttons is-left">
                    <a
                        class="button has-text-link is-size-7 is-small is-text"
                        @click="text='First Level\n Second Level\n  Third Level\n Second Level'">
                        <span>
                            Example
                        </span>
                    </a>
                </div>
            </li>
        </div>
    </aside>
</template>

<script>

import ctdlAsnCsvExample from 'file-loader!../../files/CTDL-ASN.ONET.example.csv';
import ctdlAsnCsvTemplate from 'file-loader!../../files/CTDL-ASN.ONET.template.csv';
import csvExampleCompetencies from 'file-loader!../../files/CAP Software Engineering - Competencies.csv';
import csvExampleRelations from 'file-loader!../../files/CAP Software Engineering - Relations.csv';
import csvTemplateCompetencies from 'file-loader!../../files/Template - Competencies.csv';
import csvTemplateRelations from 'file-loader!../../files/Template - Relations.csv';
import ctdlAsnJsonld from 'file-loader!../../files/DQP.jsonld';
import asnRdfJson from 'file-loader!../../files/D2695955';
import medbiquitous from 'file-loader!../../files/educational_achievement_sample_1June2012.xml';
import csvConceptExample from 'file-loader!../../files/Concept Scheme Example.csv';
import csvConceptTemplate from 'file-loader!../../files/Concept Scheme Template.csv';
import ctdlAsnJsonldConcepts from 'file-loader!../../files/ConnectingCredentialsLevels.jsonld';
export default {
    name: 'SideBar',
    props: {
        method: {
            default: ''
        },
        queryParams: Object
    },
    data() {
        return {
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
            supportedConceptFileTypes: [
                {
                    type: 'CTDL-ASN formatted CSV',
                    examples: [
                        {
                            name: 'Example',
                            id: 'ctdlConceptEx',
                            location: csvConceptExample,
                            download: 'Concept Scheme Example.csv'
                        }
                    ],
                    templates: [
                        {
                            name: 'Template',
                            id: 'ctdlConceptTempl',
                            location: csvConceptTemplate,
                            download: 'Concept Scheme Template.csv'
                        }
                    ],
                    showDescription: false,
                    description: `
                        For this import, you use one CSV. Each row in the CSV
                        will represent one object, whether that be a concept, or
                        a concept scheme. Particular fields will be used to determine hierarchy.
                        </p><p class="content-body">
                        Using this format, you can import several concept schemes, each with
                        their own concepts. Concepts may not be shared across schemes, and each
                        concept may only have one parent.
                        </p><p class="content-body">
                        It is also important that any field with multiple values be formatted
                        exactly as in the sample file, e.g. entry 1|entry 2.`
                },
                {
                    type: 'CTDL-ASN formatted JSON-LD',
                    examples: [
                        {
                            name: 'Example',
                            id: 'ctdlJsonConceptTemp',
                            location: ctdlAsnJsonldConcepts,
                            download: 'ConnectingCredentialsLevels.json'
                        }
                    ],
                    templates: [],
                    showDescription: false,
                    description: `
                        For this import, you use one JSON-LD file that includes a graph of the
                        concept scheme and all of its concepts.
                        </p><p class="content-body">
                        Using this format, you can import a concept scheme and concepts from a
                        system that exports CTDL-ASN formatted JSON-LD.`
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
            ],
            serverUrl: null,
            url: null
        };
    },
    watch: {
        serverUrl: function() {
            this.$emit('updateUrl', this.serverUrl);
        },
        url: function() {
            this.$emit('updateUrl', this.url);
        }
    },
    computed: {
        supportedFiles: function() {
            return this.queryParams.concepts === 'true' ? this.supportedConceptFileTypes : this.supportedFileTypes;
        }
    }
};
</script>
<style>
</style>