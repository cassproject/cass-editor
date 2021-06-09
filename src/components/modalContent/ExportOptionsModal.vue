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
            repo: window.repo
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
                    {name: "CaSS (RDF+JSON)", value: "rdfJson"},
                    {name: "CaSS (RDF+XML)", value: "rdfXml"},
                    {name: "CaSS (Turtle)", value: "turtle"},
                    {name: "Credential Engine ASN (JSON-LD)", value: "ctdlasnJsonld"}
                ];
            } else if (this.objType.indexOf("concept") !== -1) {
                return [
                    {name: "SKOS (JSON-LD)", value: "jsonld"},
                    {name: "SKOS (RDF Quads)", value: "rdfQuads"},
                    {name: "SKOS (RDF+JSON)", value: "rdfJson"},
                    {name: "SKOS (RDF+XML)", value: "rdfXml"},
                    {name: "SKOS (Turtle)", value: "turtle"}
                ];
            } else if (this.objType.indexOf("framework") !== -1) {
                return [
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
                ];
            } else if (this.objType.indexOf("competency") !== -1) {
                return [
                    {name: "CASS (JSON-LD)", value: "jsonld"},
                    {name: "CASS (RDF Quads)", value: "rdfQuads"},
                    {name: "CASS (RDF+JSON)", value: "rdfJson"},
                    {name: "CASS (RDF+XML)", value: "rdfXml"},
                    {name: "CASS (Turtle)", value: "turtle"},
                    {name: "Credential Engine ASN (JSON-LD)", value: "ctdlasnJsonld"},
                    {name: "IMS Global CASE (JSON)", value: "case"}
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
        confirm() {
            this.exportObject();
        },
        closeModal() {
            this.$store.commit('app/closeModal');
        },
        exportObject: function() {
            if (this.objType.indexOf("conceptscheme") !== -1) {
                this.exportScheme();
            } else if (this.objType.indexOf("concept") !== -1) {
                this.exportConcept();
            } else if (this.objType.indexOf("framework") !== -1) {
                this.exportFramework();
            } else if (this.objType.indexOf("competency") !== -1) {
                this.exportCompetency();
            }
        },
        exportConcept: function() {
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
                this.exportJsonld(link);
            } else if (exportType === "rdfQuads") {
                this.exportRdfQuads(link);
            } else if (exportType === "rdfJson") {
                this.exportRdfJson(link);
            } else if (exportType === "rdfXml") {
                this.exportRdfXml(link);
            } else if (exportType === "turtle") {
                this.exportTurtle(link);
            }
        },
        exportScheme: function() {
            let schemeExportGuid = null;
            if (EcRepository.shouldTryUrl(this.obj.id) === false && this.obj.id.indexOf(this.repo.selectedServer) === -1) {
                schemeExportGuid = EcCrypto.md5(this.obj.shortId());
            } else {
                schemeExportGuid = this.obj.getGuid();
            }
            let schemeExportLink = this.repo.selectedServer + "data/" + schemeExportGuid;
            let exportType = this.selectedExportOption;
            if (exportType === "jsonld") {
                this.exportJsonld(schemeExportLink);
            } else if (exportType === "rdfQuads") {
                this.exportRdfQuads(schemeExportLink);
            } else if (exportType === "rdfJson") {
                this.exportRdfJson(schemeExportLink);
            } else if (exportType === "rdfXml") {
                this.exportRdfXml(schemeExportLink);
            } else if (exportType === "turtle") {
                this.exportTurtle(schemeExportLink);
            } else if (exportType === "ctdlasnJsonld") {
                this.exportCtdlasnJsonld(schemeExportLink);
            }
        },
        exportCompetency: function() {
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
                this.exportJsonld(link);
            } else if (exportType === "rdfQuads") {
                this.exportRdfQuads(link);
            } else if (exportType === "rdfJson") {
                this.exportRdfJson(link);
            } else if (exportType === "rdfXml") {
                this.exportRdfXml(link);
            } else if (exportType === "turtle") {
                this.exportTurtle(link);
            } else if (exportType === "ctdlasnJsonld") {
                this.exportCtdlasnJsonld(link);
            } else if (exportType === "case") {
                this.exportCaseItems(guid);
            }
        },
        exportFramework: function() {
            let exportType = this.selectedExportOption;
            let frameworkExportGuid = null;
            if (EcRepository.shouldTryUrl(this.obj.id) === false && this.obj.id.indexOf(this.repo.selectedServer) === -1) {
                frameworkExportGuid = EcCrypto.md5(this.obj.shortId());
            } else {
                frameworkExportGuid = this.obj.getGuid();
            }
            let frameworkExportLink = this.repo.selectedServer + "data/" + frameworkExportGuid;
            if (exportType === "asn") {
                this.exportAsn(frameworkExportLink);
            } else if (exportType === "jsonld") {
                this.exportJsonld(frameworkExportLink);
            } else if (exportType === "rdfQuads") {
                this.exportRdfQuads(frameworkExportLink);
            } else if (exportType === "rdfJson") {
                this.exportRdfJson(frameworkExportLink);
            } else if (exportType === "rdfXml") {
                this.exportRdfXml(frameworkExportLink);
            } else if (exportType === "turtle") {
                this.exportTurtle(frameworkExportLink);
            } else if (exportType === "ctdlasnJsonld") {
                this.exportCtdlasnJsonld(frameworkExportLink);
            } else if (exportType === "ctdlasnCsv") {
                this.exportCtdlasnCsv(frameworkExportLink);
            } else if (exportType === "csv") {
                this.exportCsv();
            } else if (exportType === "case") {
                this.exportCasePackages(frameworkExportGuid);
            }
        },
        exportAsn: function(link) {
            window.open(link.replace("/data/", "/asn/"), '_blank');
        },
        exportJsonld: function(link) {
            window.open(link, '_blank');
        },
        exportRdfQuads: function(link) {
            let fileName;
            if (this.objType.indexOf("conceptscheme") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["dcterms:title"]);
            } else if (this.objType.indexOf("concept") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["skos:prefLabel"]);
            } else {
                fileName = this.obj.getName();
            }
            let me = this;
            this.get(link, null, {"Accept": "text/n4"}, function(success) {
                me.download(fileName + ".n4", success);
            }, function(failure) {
                appLog(failure);
            });
        },
        exportRdfJson: function(link) {
            let fileName;
            if (this.objType.indexOf("conceptscheme") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["dcterms:title"]);
            } else if (this.objType.indexOf("concept") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["skos:prefLabel"]);
            } else {
                fileName = this.obj.getName();
            }
            let me = this;
            this.get(link, null, {"Accept": "application/rdf+json"}, function(success) {
                me.download(fileName + ".rdf.json", success);
            }, function(failure) {
                appLog(failure);
            });
        },
        exportRdfXml: function(link) {
            let fileName;
            if (this.objType.indexOf("conceptscheme") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["dcterms:title"]);
            } else if (this.objType.indexOf("concept") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["skos:prefLabel"]);
            } else {
                fileName = this.obj.getName();
            }
            let me = this;
            this.get(link, null, {"Accept": "application/rdf+xml"}, function(success) {
                me.download(fileName + ".rdf.xml", success);
            }, function(failure) {
                appLog(failure);
            });
        },
        exportTurtle: function(link) {
            let fileName;
            if (this.objType.indexOf("conceptscheme") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["dcterms:title"]);
            } else if (this.objType.indexOf("concept") !== -1) {
                fileName = schema.Thing.getDisplayStringFrom(this.obj["skos:prefLabel"]);
            } else {
                fileName = this.obj.getName();
            }
            var me = this;
            this.get(link, null, {"Accept": "text/turtle"}, function(success) {
                me.download(fileName + ".turtle", success);
            }, function(failure) {
                appLog(failure);
            });
        },
        exportCtdlasnJsonld: function(link) {
            window.open(link.replace("/data/", "/ceasn/"), '_blank');
        },
        exportCtdlasnCsv: function(link) {
            var me = this;
            EcRemote.getExpectingString(link.replace("/data/", "/ceasn/"), null, function(success) {
                CSVExport.exportCTDLASN(JSON.parse(success), me.obj.getName());
            }, function(error) {
                appLog(error);
            });
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
        get: function(server, service, headers, success, failure) {
            var url = EcRemote.urlAppend(server, service);
            url = EcRemote.upgradeHttpToHttps(url);
            var xhr = null;
            if ((typeof httpStatus) === "undefined") {
                xhr = new XMLHttpRequest();
                xhr.open("GET", url, EcRemote.async);
                if (headers != null) {
                    var keys = EcObject.keys(headers);
                    for (var i = 0; i < keys.length; i++) {
                        xhr.setRequestHeader(keys[i], headers[keys[i]]);
                    }
                }
                var xhrx = xhr;
                xhr.onreadystatechange = function() {
                    if (xhrx.readyState === 4 && xhrx.status === 200) {
                        if (success != null) {
                            success(xhrx.responseText);
                        } else if (xhrx.readyState === 4) {
                            if (failure != null) {
                                failure(xhrx.status + " " + xhrx.responseText);
                            }
                        }
                    }
                };
                xhr.onload = function() {
                    if (xhr.status !== 200) {
                        failure(xhr.status);
                    }
                };
                xhr.onerror = function() {
                    failure("Failed while sending request.");
                };
            }
            if (xhr != null) {
                if (EcRemote.async) {
                    (xhr)["timeout"] = EcRemote.timeout;
                }
            }
            if ((typeof httpStatus) !== "undefined") {
                if (success != null) {
                    success(JSON.stringify(httpGet(url)));
                }
            } else {
                xhr.send();
            }
        }
    }
};
</script>