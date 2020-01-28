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
                v-for="(supportedType, index) in supportedFileTypes"
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
                            download="example.download">
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
    </aside>
</template>

<script>
export default {
    name: 'SideBar',
    props: {
        method: {
            default: ''
        }
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
                            location: 'file-loader!../../../files/CAP Software Engineering - Competencies.csv',
                            download: 'CAP Software Engineering - Competencies.csv'
                        },
                        {
                            name: 'Relations',
                            id: 'cassCsvExRel',
                            location: 'file-loader!../../../files/CAP Software Engineering - Relations.csv',
                            download: 'CAP Software Engineering - Relations.csv'
                        }
                    ],
                    templates: [
                        {
                            name: 'Competencies',
                            id: 'cassCsvTemlComp',
                            location: 'file-loader!../../../files/Template - Competencies.csv',
                            download: 'Template - Competencies.csv'
                        },
                        {
                            name: 'Relations',
                            id: 'cassCsvTempRel',
                            location: 'file-loader!../../../files/Template - Relations.csv',
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
                            location: 'file-loader!../../../files/CTDL-ASN.ONET.example.csv',
                            download: 'CTDL-ASN.ONET.example.csv'
                        }
                    ],
                    templates: [
                        {
                            name: 'Template',
                            id: 'ctdTempl',
                            location: 'file-loader!../../../files/CTDL-ASN.ONET.template.csv',
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
                            location: 'file-loader!../../../files/educational_achievement_sample_1June2012.xml',
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
                            location: 'file-loader!../../../files/D2695955',
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
                            location: 'file-loader!../../../files/DQP.jsonld',
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
                },
                {
                    type: 'CaSS Server',
                    examples: [
                        {
                            name: 'Example: CaSS Sandbox',
                            id: 'cassSandbox',
                            location: "serverUrl='https://sandbox.cassproject.org/'",
                            download: ''
                        }
                    ],
                    templates: [],
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
                }
            ],
            supportedServer: [
                {
                    name: 'supportedFileTypes',
                    description: `
                    
                    `
                }
            ]
        };
    }
};
</script>
<style>
</style>