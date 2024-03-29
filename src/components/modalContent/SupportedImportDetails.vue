<template>
    <modal-template
        :active="true">
        <template slot="modal-header">
            Supported Import Files & Formats
        </template>
        <template slot="modal-body">
            <div class="tabs">
                <ul>
                    <li
                        :class="[tab === 'csv' ? 'is-active' : '', '']">
                        <button @click="newTab = 'csv'">
                            CSV
                        </button>
                    </li>
                    <li
                        v-if="!conceptMode && !progressionMode"
                        :class="[tab === 'html' ? 'is-active' : '', '']">
                        <button @click="newTab = 'html'">
                            HTML
                        </button>
                    </li>
                    <li
                        v-if="!conceptMode && !progressionMode"
                        :class="[tab === 'xml' ? 'is-active' : '', '']">
                        <button @click="newTab = 'xml'">
                            XML
                        </button>
                    </li>
                    <li

                        :class="[tab === 'json' ? 'is-active' : '', '']">
                        <button @click="newTab = 'json'">
                            JSON
                        </button>
                    </li>
                    <li
                        v-if="!conceptMode && !progressionMode"
                        :class="[tab === 'pdf' ? 'is-active' : '', '']">
                        <button @click="newTab = 'pdf'">
                            PDF
                        </button>
                    </li>
                    <li

                        v-if="!conceptMode && !progressionMode"
                        :class="[tab === 'docx' ? 'is-active' : '', '']">
                        <button @click="newTab = 'docx'">
                            DOCX
                        </button>
                    </li>
                </ul>
            </div>
            <!-- DOCX -->
            <div
                v-if="tab === 'docx'"
                class="section">
                <h3 class="title has-text-weight-bold is-size-2">
                    WORD/DOCX
                    <span class="icon is-pulled-right has-text-warning has-text-link">
                        <i class="fa fa-exclamation-circle" />
                    </span>
                </h3>
                <p>
                    CaSS experimentally supports the import of frameworks in DOCX document formats.  Because DOCX files come in many shapes and sizes there may be defects when importing frameworks.  The import interface allows you to review and make changes to the detected framework before importing.
                </p>
                <div
                    v-if="false"
                    class="buttons is-right">
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> Template</span>
                    </div>
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> Examples</span>
                    </div>
                </div>
            </div>
            <!-- HTML -->
            <div
                v-if="tab === 'html'"
                class="section">
                <h3 class="title has-text-weight-bold is-size-2">
                    HTML
                    <span class="icon is-pulled-right has-text-warning has-text-link">
                        <i class="fa fa-exclamation-circle" />
                    </span>
                </h3>
                <p>
                    CaSS experimentally supports the import of frameworks in HTML document formats.  Because HTML files come in many shapes and sizes there may be defects when importing frameworks.  The import interface allows you to review and make changes to the detected framework before importing.
                </p>
                <div
                    v-if="false"
                    class="buttons is-right">
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> Template</span>
                    </div>
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> Examples</span>
                    </div>
                </div>
            </div>
            <!-- PDF -->
            <div
                v-if="tab === 'pdf'"
                class="section">
                <h3 class="title has-text-weight-bold is-size-2">
                    PDF
                    <span class="icon is-pulled-right has-text-warning has-text-link">
                        <i class="fa fa-exclamation-circle" />
                    </span>
                </h3>
                <p>
                    CaSS experimentally supports the import of frameworks in PDF document format.  Because PDF files come in many shapes and sizes there may be deviances when importing frameworks.  The import interface allows you to review and make changes to the detected framework before importing.
                </p>
                <div
                    v-if="false"
                    class="buttons is-right">
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Template</span>
                    </div>
                    <div class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> Examples</span>
                    </div>
                </div>
            </div>
            <!-- CSV -->
            <div
                class="section"
                v-if="tab === 'csv' && !conceptMode && !progressionMode">
                <h2 class="title has-text-weight-bold is-size-2">
                    CSV
                    <span class="icon is-pulled-right has-text-success">
                        <i class="fa fa-check-circle" />
                    </span>
                </h2>
                <p>
                    CSV file imports are supported with CaSS.  In order to upload competencies as CSV files, your framework CSV files need to be formatted in a CaSS readable format.
                </p>
                <h5 class="header is-size-4 has-text-weight-bold">
                    CaSS Formatted
                </h5>
                <p>
                    For this import, you can use one or two CSVs. The first (required) CSV describes the competencies to include in a new framework. The second (optional) CSV describes the relations between the competencies found in the first framework.
                    Each row in the first CSV will represent one competency, and each row in the second CSV will represent one relation between two competencies. The relations can be between competencies found in the first CSV, competencies found in other frameworks, or a mixture of the two.
                    You can select the columns to use to describe the id, name, description, and other fields.
                </p>
                <div class="buttons is-right">
                    <a
                        :href="csvExampleCompetenciesFile"
                        target="_blank"
                        download="CAP Software Engineering - Competencies.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Competencies Example</span>
                    </a>
                    <a
                        :href="csvTemplateCompetenciesFile"
                        target="_blank"
                        download="Template - Competencies.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Competencies Template</span>
                    </a>
                    <a
                        :href="csvExampleRelationsFile"
                        target="_blank"
                        download="CAP Software Engineering - Relations.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Relations Example</span>
                    </a>
                    <a
                        :href="csvTemplateRelationsFile"
                        target="_blank"
                        download="Template - Relations.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Relations Template</span>
                    </a>
                </div>
                <h5 class="header is-size-4 has-text-weight-bold">
                    CTDL-ASN Formatted
                </h5>
                <p>
                    For this import, you use one CSV. Each row in the CSV will represent one object, whether that be a competency, or a competency framework. Particular fields will be used to determine hierarchy.
                    Using this format, you can import several frameworks, each with their own competencies. Competencies may not be shared across frameworks, and each competency may only have one parent.
                    It is also important that the rows be sequenced correctly, with competency frameworks appearing before the competencies inside of them, and for a parent to be in a row above a child of that parent.
                    Any field with multiple values must be formatted as entry 1|entry 2.
                </p>
                <div class="buttons is-right">
                    <a
                        :href="ctdlAsnCsvExampleFile"
                        target="_blank"
                        download="Example of a Mininum Data Competency Framework Upload - HIST 101, SURVEY OF AMERICAN HISTORY I.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Example - Minimum</span>
                    </a>
                    <a
                        :href="ctdlAsnCsvTemplateFile"
                        target="_blank"
                        download="Template of a Mininum Data Competency Framework.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Template - Minimum</span>
                    </a>
                    <a
                        :href="ctdlAsnCsvBenchmarkExampleFile"
                        target="_blank"
                        download="Example of a Benchmark Competency Framework - DOLWorkCharacteristicsDownloadfromCaSSAug25_2021.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Example - Benchmark</span>
                    </a>
                    <a
                        :href="ctdlAsnCsvBenchmarkTemplateFile"
                        target="_blank"
                        download="Template of a Benchmark Competency Framework.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Template - Benchmark</span>
                    </a>
                </div>
            </div>
            <!-- CSV Concepts -->
            <div
                class="section"
                v-if="tab === 'csv' && (conceptMode || progressionMode)">
                <h2 class="title has-text-weight-bold is-size-2">
                    CSV
                    <span class="icon is-pulled-right has-text-success">
                        <i class="fa fa-check-circle" />
                    </span>
                </h2>
                <p>
                    CSV file imports are supported with CaSS.  In order to upload {{ queryParams.ceasnDataFields === 'true' ? 'concept schemes' : 'taxonomies' }} as CSV files your {{ queryParams.ceasnDataFields === 'true' ? 'concept scheme' : 'taxonomy' }} CSV files need to be formatted in a CaSS readable format.
                </p>
                <h5 class="header is-size-4 has-text-weight-bold">
                    CTDL-ASN Formatted
                </h5>
                <p>
                    For this import, you use one CSV. Each row in the CSV will represent one object, whether that be a concept, or a {{ queryParams.ceasnDataFields === 'true' ? 'concept scheme' : 'taxonomy' }}. Particular fields will be used to determine hierarchy.
                    Using this format, you can import several {{ queryParams.ceasnDataFields === 'true' ? 'concept schemes' : 'taxonomies' }}, each with their own concepts. Concepts may not be shared across {{ queryParams.ceasnDataFields === 'true' ? 'schemes' : 'taxonomies' }}, and each concept may only have one parent.
                    It is also important that any field with multiple values be formatted exactly as in the sample file, e.g. entry 1|entry 2.
                </p>
                <div class="buttons is-right">
                    <a
                        :href="csvConceptExampleFile"
                        target="_blank"
                        download="Concept Scheme Example.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Example</span>
                    </a>
                    <a
                        :href="csvConceptTemplateFile"
                        target="_blank"
                        download="Concept Scheme Template.csv"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Template</span>
                    </a>
                </div>
            </div>
            <!-- XML -->
            <div
                class="section"
                v-if="tab === 'xml'">
                <h2 class="title has-text-weight-bold is-size-2">
                    XML
                    <span class="icon is-pulled-right has-text-success">
                        <i class="fa fa-check-circle" />
                    </span>
                </h2>
                <p>
                    At this time CaSS supports XML imports in the Medbiquitous XML format.
                </p>
                <h5 class="header is-size-4 has-text-weight-bold">
                    Medbiquitous XML
                </h5>
                <p>
                    Medbiquitous is a standards body that includes medical competencies as one of their XML based formats.
                    Using this format, you can import competencies exported from a system that exports Medbiquitous formatted XML.
                </p>
                <div class="buttons is-right">
                    <a
                        :href="medbiquitousFile"
                        target="_blank"
                        download="educational_achievement_sample_1June2012.xml"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span> Example</span>
                    </a>
                </div>
            </div>
            <!-- JSON -->
            <div
                class="section"
                v-if="tab === 'json' && !conceptMode && !progressionMode">
                <h2 class="title has-text-weight-bold is-size-2">
                    JSON
                    <span class="icon is-pulled-right has-text-success">
                        <i class="fa fa-check-circle" />
                    </span>
                </h2>
                <p>CaSS supports importing frameworks from JSON files in the below listed two formats.</p>
                <h5 class="header is-size-4 has-text-weight-bold">
                    Achievement Standards Network RDF+JSON
                </h5>
                <p>
                    The Achievement Standards Network set of standards, or ASN standard for short, is a legacy standard used primarily by achievementstandards.org to transmit state standards and other national and organizational standards.
                    Using this format, you can import competencies exported from achievementstandards.org and other systems in an RDF JSON format.
                </p>
                <div class="buttons is-right">
                    <a
                        :href="asnRdfJsonFile"
                        target="_blank"
                        download="D2695955.json"
                        class="button is-small is-outlined is-primary">
                        <span
                            title=""
                            class="icon">
                            <i class="fa fa-download" />
                        </span>
                        <span>Example</span>
                    </a>
                </div>
                <h5 class="header is-size-4 has-text-weight-bold">
                    CTDL-ASN formatted JSON-LD
                </h5>
                <p>
                    For this import, you use one JSON-LD file that includes a graph of the framework and all of its competencies.
                    Using this format, you can import a framework and competencies from a system that exports CTDL-ASN formatted JSON-LD.
                    If you wish to edit the framework after importing this file type, please be sure you are signed in.
                </p>
                <div class="buttons is-right">
                    <a
                        :href="ctdlAsnJsonldFile"
                        target="_blank"
                        download="DQP.jsonld"
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
            <!-- JSON Concepts -->
            <div
                class="section"
                v-if="tab === 'json' && (conceptMode || progressionMode)">
                <h2 class="title has-text-weight-bold is-size-2">
                    JSON
                    <span class="icon is-pulled-right has-text-success">
                        <i class="fa fa-check-circle" />
                    </span>
                </h2>
                <p>CaSS supports importing {{ queryParams.ceasnDataFields === 'true' ? 'concept schemes' : 'taxonomies' }} from JSON files in the below listed format.</p>
                <h5 class="header is-size-4 has-text-weight-bold">
                    CTDL-ASN formatted JSON-LD
                </h5>
                <p>
                    For this import, you use one JSON-LD file that includes a graph of the {{ queryParams.ceasnDataFields === 'true' ? 'concept scheme' : 'taxonomy' }} and all of its concepts.
                    Using this format, you can import a {{ queryParams.ceasnDataFields === 'true' ? 'concept scheme' : 'taxonomy' }} and concepts from a system that exports CTDL-ASN formatted JSON-LD.
                </p>
                <div class="buttons is-right">
                    <a
                        :href="ctdlAsnJsonldConceptsFile"
                        target="_blank"
                        download="ConnectingCredentialsLevels.jsonld"
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
        </template>
        <template slot="modal-foot">
            <div
                @click="$store.commit('app/closeModal')"
                class="buttons is-right">
                <button class="button is-primary is-large is-outlined">
                    Back to import screen
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';
import ctdlAsnCsvExample from 'file-loader!../../../files/Example of a Mininum Data Competency Framework Upload - HIST 101, SURVEY OF AMERICAN HISTORY I.csv';
import ctdlAsnCsvTemplate from 'file-loader!../../../files/Template of a Mininum Data Competency Framework.csv';
import ctdlAsnCsvBenchmarkExample from 'file-loader!../../../files/Example of a Benchmark Competency Framework - DOLWorkCharacteristicsDownloadfromCaSSAug25_2021.csv';
import ctdlAsnCsvBenchmarkTemplate from 'file-loader!../../../files/Template of a Benchmark Competency Framework.csv';
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
    components: {
        ModalTemplate
    },
    data() {
        return {
            newTab: '',
            ctdlAsnCsvExampleFile: ctdlAsnCsvExample,
            ctdlAsnCsvTemplateFile: ctdlAsnCsvTemplate,
            ctdlAsnCsvBenchmarkExampleFile: ctdlAsnCsvBenchmarkExample,
            ctdlAsnCsvBenchmarkTemplateFile: ctdlAsnCsvBenchmarkTemplate,
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
        },
        conceptMode: function() {
            return this.$store.getters['editor/conceptMode'];
        },
        progressionMode: function() {
            return this.$store.getters['editor/progressionMode'];
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        }
    }
};
</script>

<style lang="scss">
.modal-card {
    .header  {
        padding-top: 1.5rem;
        padding-bottom: .5rem;
    }
    .buttons {
        width: 100%;
        padding-top: .5rem;
    }
}

</style>