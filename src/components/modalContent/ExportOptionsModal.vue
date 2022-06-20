<template>
    <modal-template
        type="primary"
        @close="closeModal"
        size="small"
        :active="true">
        <template slot="modal-header">
            {{ title || 'Export' }}
        </template>
        <template slot="modal-body">
            <section>
                <div
                    class="field">
                    <div class="control">
                        <div class="select is-primary is-fullwidth">
                            <select v-model="selectedExportOption">
                                <option
                                    selected
                                    value>
                                    Select an option
                                </option>
                                <option
                                    v-for="(option, index) in exportOptions"
                                    :value="option.value"
                                    :key="index">
                                    {{ option.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <template slot="modal-foot">
            <button
                class="button is-outlined is-dark"
                @click="closeModal">
                <span>
                    Cancel
                </span>
                <span class="icon">
                    <i class="fa fa-times-circle" />
                </span>
            </button>
            <button
                class="export-confirm button is-outlined is-info"
                :disabled="working"
                @click="confirm">
                <span>
                    Export file
                </span>
                <span class="icon">
                    <i class="fa fa-download" />
                </span>
            </button>
        </template>
    </modal-template>
</template>
<script>
import ModalTemplate from './ModalTemplate.vue';
import saveAs from 'file-saver';
export default {
    name: 'ExportOptionsModal',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    components: {
        ModalTemplate
    },
    data() {
        return {
            selectedExportOption: '',
            repo: window.repo,
            working: false
        };
    },
    computed: {
        obj() {
            return this.$store.getters['editor/itemToExport'];
        },
        exportOptions() {
            if (this.objType.indexOf("conceptscheme") !== -1) {
                return [
                    {name: "CASS (JSON-LD)", value: "jsonld"},
                    {name: "CaSS (RDF Quads)", value: "rdfQuads"},
                    {name: "CaSS (RDF+XML)", value: "rdfXml"},
                    {name: "CaSS (Turtle)", value: "turtle"},
                    {name: "Credential Engine ASN (JSON-LD)", value: "ctdlasnJsonld"}
                ];
            } else if (this.objType.indexOf("concept") !== -1) {
                return [
                    {name: "SKOS (JSON-LD)", value: "jsonld"},
                    {name: "SKOS (RDF Quads)", value: "rdfQuads"},
                    {name: "SKOS (RDF+XML)", value: "rdfXml"},
                    {name: "SKOS (Turtle)", value: "turtle"}
                ];
            } else if (this.objType.indexOf("framework") !== -1) {
                return [
                    {name: "Achievement Standards Network (RDF+XML)", value: "asn"},
                    {name: "CASS (JSON-LD)", value: "jsonld"},
                    {name: "CASS (RDF Quads)", value: "rdfQuads"},
                    {name: "CASS (RDF+XML)", value: "rdfXml"},
                    {name: "CASS (Turtle)", value: "turtle"},
                    {name: "Credential Engine ASN (JSON-LD)", value: "ctdlasnJsonld"},
                    {name: "Credential Engine ASN (CSV)", value: "ctdlasnCsv"},
                    {name: "Table (CSV)", value: "csv"},
                    {name: "IMS Global CASE (JSON)", value: "case"},
                    {name: "Shareable Competency Definitions (JSON)", value: "scd"}
                ];
            } else if (this.objType.indexOf("competency") !== -1) {
                return [
                    {name: "CASS (JSON-LD)", value: "jsonld"},
                    {name: "CASS (RDF Quads)", value: "rdfQuads"},
                    {name: "CASS (RDF+XML)", value: "rdfXml"},
                    {name: "CASS (Turtle)", value: "turtle"},
                    {name: "Credential Engine ASN (JSON-LD)", value: "ctdlasnJsonld"},
                    {name: "IMS Global CASE (JSON)", value: "case"},
                    {name: "Shareable Competency Definitions (JSON)", value: "scd"}
                ];
            } else {
                return [];
            }
        },
        objType() {
            return this.obj.type.toLowerCase();
        }
    },
    mounted() {
    },
    methods: {
        async confirm() {
            this.working = true;
            await this.exportObject();
            this.working = false;
        },
        closeModal() {
            this.$store.commit('app/closeModal');
        },
        exportObject: async function() {
            if (this.objType.indexOf("conceptscheme") !== -1) {
                await this.exportScheme();
            } else if (this.objType.indexOf("concept") !== -1) {
                await this.exportConcept();
            } else if (this.objType.indexOf("framework") !== -1) {
                await this.exportFramework();
            } else if (this.objType.indexOf("competency") !== -1) {
                await this.exportCompetency();
            }
        },
        exportConcept: async function() {
            let exportType = this.selectedExportOption;
            let concept = this.obj;
            var guid;
            if (EcRepository.shouldTryUrl(concept.id) === false && concept.id.indexOf(this.repo.selectedServer) === -1) {
                guid = EcCrypto.md5(concept.shortId());
            } else {
                guid = concept.getGuid();
            }
            var link = this.repo.selectedServer + "data/" + guid;
            if (exportType === "jsonld") {
                await this.exportJsonld(link);
            } else if (exportType === "rdfQuads") {
                await this.exportRdfQuads(link);
            } else if (exportType === "rdfXml") {
                await this.exportRdfXml(link);
            } else if (exportType === "turtle") {
                await this.exportTurtle(link);
            }
        },
        exportScheme: async function() {
            let schemeExportGuid = null;
            if (EcRepository.shouldTryUrl(this.obj.id) === false && this.obj.id.indexOf(this.repo.selectedServer) === -1) {
                schemeExportGuid = EcCrypto.md5(this.obj.shortId());
            } else {
                schemeExportGuid = this.obj.getGuid();
            }
            let schemeExportLink = this.repo.selectedServer + "data/" + schemeExportGuid;
            let exportType = this.selectedExportOption;
            if (exportType === "jsonld") {
                await this.exportJsonld(schemeExportLink);
            } else if (exportType === "rdfQuads") {
                await this.exportRdfQuads(schemeExportLink);
            } else if (exportType === "rdfXml") {
                await this.exportRdfXml(schemeExportLink);
            } else if (exportType === "turtle") {
                await this.exportTurtle(schemeExportLink);
            } else if (exportType === "ctdlasnJsonld") {
                await this.exportCtdlasnJsonld(schemeExportLink);
            }
        },
        exportCompetency: async function() {
            let exportType = this.selectedExportOption;
            let selectedCompetency = this.obj;
            var guid;
            if (EcRepository.shouldTryUrl(selectedCompetency.id) === false && selectedCompetency.id.indexOf(this.repo.selectedServer) === -1) {
                guid = EcCrypto.md5(selectedCompetency.shortId());
            } else {
                guid = selectedCompetency.getGuid();
            }
            var link = this.repo.selectedServer + "data/" + guid;
            if (exportType === "jsonld") {
                await this.exportJsonld(link);
            } else if (exportType === "rdfQuads") {
                await this.exportRdfQuads(link);
            } else if (exportType === "rdfXml") {
                await this.exportRdfXml(link);
            } else if (exportType === "turtle") {
                await this.exportTurtle(link);
            } else if (exportType === "ctdlasnJsonld") {
                await this.exportCtdlasnJsonld(link);
            } else if (exportType === "case") {
                await this.exportCaseItems(guid);
            } else if (exportType === "scd") {
                await this.exportScd(link);
            }
        },
        exportFramework: async function() {
            let exportType = this.selectedExportOption;
            let frameworkExportGuid = null;
            if (EcRepository.shouldTryUrl(this.obj.id) === false && this.obj.id.indexOf(this.repo.selectedServer) === -1) {
                frameworkExportGuid = EcCrypto.md5(this.obj.shortId());
            } else {
                frameworkExportGuid = this.obj.getGuid();
            }
            let frameworkExportLink = this.repo.selectedServer + "data/" + frameworkExportGuid;
            if (exportType === "asn") {
                await this.exportAsn(frameworkExportLink);
            } else if (exportType === "jsonld") {
                await this.exportJsonld(frameworkExportLink);
            } else if (exportType === "rdfQuads") {
                await this.exportRdfQuads(frameworkExportLink);
            } else if (exportType === "rdfXml") {
                await this.exportRdfXml(frameworkExportLink);
            } else if (exportType === "turtle") {
                await this.exportTurtle(frameworkExportLink);
            } else if (exportType === "ctdlasnJsonld") {
                await this.exportCtdlasnJsonld(frameworkExportLink);
            } else if (exportType === "ctdlasnCsv") {
                await this.exportCtdlasnCsv(frameworkExportLink);
            } else if (exportType === "csv") {
                await this.exportCsv();
            } else if (exportType === "case") {
                await this.exportCasePackages(frameworkExportGuid);
            } else if (exportType === "scd") {
                await this.exportScd(frameworkExportLink);
            }
        },
        exportAsn: async function(link) {
            window.open(link.replace("/data/", "/asn/"), '_blank');
        },
        exportJsonld: async function(link) {
            window.open(link, '_blank');
        },
        exportRdfQuads: async function(link) {
            let fileName;
            if (this.objType.indexOf("conceptscheme") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["dcterms:title"]);
            } else if (this.objType.indexOf("concept") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["skos:prefLabel"]);
            } else {
                fileName = this.obj.getName();
            }
            try {
                let success = await this.get(link, null, {"Accept": "text/n4"});
                await this.download(fileName + ".n4", success);
            } catch (e) {
                appLog(e);
            }
        },
        exportRdfXml: async function(link) {
            let fileName;
            if (this.objType.indexOf("conceptscheme") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["dcterms:title"]);
            } else if (this.objType.indexOf("concept") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["skos:prefLabel"]);
            } else {
                fileName = this.obj.getName();
            }
            try {
                let success = await this.get(link, null, {"Accept": "application/rdf+xml"});
                await this.download(fileName + ".rdf.xml", success);
            } catch (e) {
                appLog(e);
            }
        },
        exportTurtle: async function(link) {
            let fileName;
            if (this.objType.indexOf("conceptscheme") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["dcterms:title"]);
            } else if (this.objType.indexOf("concept") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["skos:prefLabel"]);
            } else {
                fileName = this.obj.getName();
            }
            try {
                let success = await this.get(link, null, {"Accept": "text/turtle"});
                await this.download(fileName + ".turtle", success);
            } catch (e) {
                appLog(e);
            }
        },
        exportCtdlasnJsonld: function(link) {
            window.open(link.replace("/data/", "/ceasn/"), '_blank');
        },
        exportScd: function(link) {
            window.open(link.replace("/data/", "/scd/"), '_blank');
        },
        exportCtdlasnCsv: async function(link) {
            var me = this;
            try {
                let success = await EcRemote.getExpectingString(link.replace("/data/", "/ceasn/"), null);
                CSVExport.exportCTDLASN(success, me.obj.getName());
            } catch (e) {
                appLog(e);
            }
        },
        exportCsv: function() {
            CSVExport.exportFramework(this.obj.id, appLog, appLog);
        },
        exportCasePackages: function(guid) {
            window.open(this.repo.selectedServer + "ims/case/v1p0/CFPackages/" + guid, '_blank');
        },
        exportCaseItems: function(guid) {
            window.open(this.repo.selectedServer + "ims/case/v1p0/CFItems/" + guid, '_blank');
        },
        download: function(fileName, data) {
            var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            saveAs(blob, fileName);
        },
        get: async function(server, service, headers, success, failure) {
            return this.$store.dispatch('editor/getThing', {
                server: server,
                service: service,
                headers: headers,
                success: success,
                failure: failure
            });
        }
    }
};
</script>