<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title">
                <span class="title has-text-white">
                    Supported Import Types
                </span>
                <br><span class="subtitle has-text-white has-text-weight-medium">
                    Supported Import Files & Formats
                </span>
            </p>
            <button
                class="delete"
                @click="$store.commit('app/closeModal')"
                aria-label="close" />
        </header>
        <section class="modal-card-body">
            <div class="tabs">
                <ul>
                    <li
                        @click="newTab = 'csv'"
                        :class="[tab === 'csv' ? 'is-active' : '', '']">
                        <a>CSV</a>
                    </li>
                    <li
                        @click="newTab = 'html'"
                        :class="[tab === 'html' ? 'is-active' : '', '']">
                        <a>HTML</a>
                    </li>
                    <li
                        @click="newTab = 'xml'"
                        :class="[tab === 'xml' ? 'is-active' : '', '']">
                        <a>XML</a>
                    </li>
                    <li
                        @click="newTab = 'json'"
                        :class="[tab === 'json' ? 'is-active' : '', '']">
                        <a>JSON</a>
                    </li>
                    <li
                        @click="newTab = 'pdf'"
                        :class="[tab === 'pdf' ? 'is-active' : '', '']">
                        <a>PDF</a>
                    </li>
                    <li
                        @click="newTab = 'docx'"
                        :class="[tab === 'docx' ? 'is-active' : '', '']">
                        <a>DOCX</a>
                    </li>
                </ul>
            </div>
            <div
                v-if="tab === 'docx'"
                class="section">
                <h3 class=" has-text-weight-bold is-size-3">
                    DOCX
                </h3>
                <p>
                    DOCX File imports are experimental in cass.
                </p>
                <div class="buttons is-right">
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> template</span>
                    </div>
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> examples</span>
                    </div>
                </div>
            </div>
            <div
                v-if="tab === 'html'"
                class="section">
                <h3 class=" has-text-weight-bold is-size-3">
                    HTML
                </h3>
                <p>
                    DOCX File imports are experimental in cass.
                </p>
                <div class="buttons is-right">
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> template</span>
                    </div>
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> examples</span>
                    </div>
                </div>
            </div>
            <div
                v-if="tab === 'pdf'"
                class="section">
                <h3 class=" has-text-weight-bold is-size-3">
                    PDF
                </h3>
                <p>
                    DOCX File imports are experimental in cass.
                </p>
                <div class="buttons is-right">
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>template</span>
                    </div>
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> examples</span>
                    </div>
                </div>
            </div>
            <div
                class="section"
                v-if="tab === 'csv'">
                <h2 class=" has-text-weight-bold is-size-2">
                    CSV
                </h2>
                <p>
                    CSV file imports are supported with CaSS.  In order to upload competencies as CSV files your framework CSV files need to be formatted in a CaSS readable format.
                </p>
                <br>
                <h5 class="title is-size-4 has-text-weight-bold">
                    CaSS Formatted
                </h5>
                <p>
                    For this import, you can use one or two CSVs. The first (required) CSV describes the competencies to include in a new framework. The second (optional) CSV describes the relations between the competencies found in the first framework.
                    Each row in the first CSV will represent one competency, and each row in the second CSV will represent one relation between two competencies. The relations can be between competencies found in the first CSV, competencies found in other frameworks, or a mixture of the two.
                    You can select the columns to use to describe the id, name, description, and other fields.
                </p>
                <div class="buttons is-right">
                    <a
                        href="csvConceptExampleFile"
                        target="_blank"
                        download="csvConceptExampleFile.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>example</span>
                    </a>
                    <a
                        href="csvConceptTemplateFile"
                        target="_blank"
                        download="csvConceptTemplateFile.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>template</span>
                    </a>
                </div>
                <h5 class="title is-size-4 has-text-weight-bold">
                    CTDL-ASN Formatted
                </h5>
                <p>
                    For this import, you use one CSV. Each row in the CSV will represent one object, whether that be a competency, or a competency framework. Particular fields will be used to determine hierarchy.
                    Using this format, you can import several frameworks, each with their own competencies. Competencies may not be shared across frameworks, and each competency may only have one parent.
                    It is also important that the rows be sequenced correctly, with competency frameworks appearing before the competencies inside of them, and for a parent to be in a row above a child of that parent.
                    Any field with multiple values must be formatted as entry 1|entry 2.
                </p>
                <br>
                <div class="buttons is-right">
                    <a
                        href="ctdlAsnCsvExample"
                        target="_blank"
                        download="ctdlAsnCsvExample.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Single File Example</span>
                    </a>
                    <a
                        href="ctdlAsnCsvTemplate"
                        target="_blank"
                        download="ctdlAsnCsvTemplate.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Single File Template</span>
                    </a>
                </div>
                <div class="buttons is-right">
                    <a
                        href="csvExampleCompetencies"
                        target="_blank"
                        download="csvExampleCompetencies.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Competencies Example</span>
                    </a>
                    <a
                        href="csvTemplateCompetencies"
                        target="_blank"
                        download="csvTemplateCompetencies.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Competencies Template</span>
                    </a>
                    <a
                        href="csvExampleRelations"
                        target="_blank"
                        download="csvExampleRelations.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Relations Example</span>
                    </a>
                    <a
                        href="csvTemplateRelations"
                        target="_blank"
                        download="csvTemplateRelations.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Relations Template</span>
                    </a>
                </div>
            </div>
            <div
                class="section"
                v-if="tab === 'xml'">
                <h2 class=" has-text-weight-bold is-size-2">
                    XML
                </h2>
                <p>
                    At this time CaSS supports XML imports in the Medbiquitous XML format.
                </p>
                <br>
                <h5 class="title is-size-4 has-text-weight-bold">
                    Medbiquitous XML
                </h5>
                <p>
                    Medbiquitous is a standards body that includes medical competencies as one of their XML based formats.
                    Using this format, you can import competencies exported from a system that exports Medbiquitous formatted XML.
                </p>
                <div class="buttons is-right">
                    <a
                        href="medbiquitousFile"
                        target="_blank"
                        download="medbiquitousFile.xml"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> example</span>
                    </a>
                </div>
            </div>
            <div
                class="section"
                v-if="tab === 'json'">
                <h2 class=" has-text-weight-bold is-size-2">
                    JSON
                </h2>
                <p />
                <br>
                <h5 class="title is-size-4 has-text-weight-bold">
                    Achievement Standards Network RDF+JSON
                </h5>
                <p>
                    The Achievement Standards Network set of standards, or ASN standard for short, is a legacy standard used primarily by achievementstandards.org to transmit state standards and other national and organizational standards.
                    Using this format, you can import competencies exported from achievementstandards.org and other systems in an RDF JSON format.
                </p>
                <div class="buttons is-right">
                    <a
                        href="asnRdfJsonFile"
                        target="_blank"
                        download="asnRdfJsonFile.json"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Example</span>
                    </a>
                </div>
                <h5 class="title is-size-4 has-text-weight-bold">
                    CTDL-ASN formatted JSON-LD
                </h5>
                <p>
                    For this import, you use one JSON-LD file that includes a graph of the framework and all of its competencies.
                    Using this format, you can import a framework and competencies from a system that exports CTDL-ASN formatted JSON-LD.
                </p>
                <div class="buttons is-right">
                    <a
                        href="ctdlAsnJsonldFile"
                        target="_blank"
                        download="ctdlAsnJsonld.jsonld"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Example</span>
                    </a>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <div
                @click="$store.commit('app/closeModal')"
                class="buttons is-right">
                <div class="button is-primary is-large is-outlined">
                    Done
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
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
    name: 'SupportedImportDetails',
    props: {
        initialTab: {
            type: String
        }
    },
    data() {
        return {
            newTab: '',
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
    computed: {
        modal: function() {
            return this.$store.getters['app/dynamicModalContent'];
        },
        content: function() {
            return this.modal.documentContent;
        },
        tab: function() {
            if (this.newTab !== '') {
                return this.newTab;
            } else {
                return this.content;
            }
        }
    }
};
</script>