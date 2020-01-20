<template>
    <div class="page-framework">
        <div class="container">
            <div class="section">
                <Thing
                    :obj="framework"
                    :repo="repo"
                    :parentNotEditable="queryParams.view==='true'" />
                <span
                    class="info-tag"
                    v-if="framework.competency.length == 1">{{ framework.competency.length }} item</span>
                <span
                    class="info-tag"
                    v-else-if="framework.competency.length > 1">{{ framework.competency.length }} items</span>
                <span
                    class="info-tag"
                    v-if="timestamp"
                    :title="new Date(timestamp)">Last modified {{ lastModified }}</span>
                <span
                    class="info-tag"
                    v-if="framework['schema:dateCreated']"
                    :title="new Date(framework['schema:dateCreated'])">Created {{ $moment(framework['schema:dateCreated']).fromNow() }}</span>
                <span
                    class="info-tag"
                    v-if="framework['Approved']"
                    :title="framework['Approved']">Approved</span>
                <span
                    class="info-tag"
                    v-if="framework['Published']"
                    :title="framework['Published']">Published</span>
                <hr>
                <Hierarchy
                    :container="framework"
                    containerType="Framework"
                    containerTypeGet="EcFramework"
                    containerNodeProperty="competency"
                    containerEdgeProperty="relation"
                    nodeType="EcCompetency"
                    edgeType="EcAlignment"
                    edgeRelationProperty="relationType"
                    edgeRelationLiteral="narrows"
                    edgeSourceProperty="source"
                    edgeTargetProperty="target"
                    :editable="queryParams.view !== 'true'"
                    :repo="repo"
                    :queryParams="queryParams"
                    :exportOptions="competencyExportOptions" />
            </div>
        </div>
    </div>
</template>
<script>
import Thing from '@/lode/components/lode/Thing.vue';
import Hierarchy from '@/lode/components/lode/Hierarchy.vue';
import saveAs from 'file-saver';
import common from '@/mixins/common.js';
export default {
    name: "Framework",
    props: {
        exportType: String,
        queryParams: Object
    },
    mixins: [common],
    data: function() {
        return {
            repo: window.repo,
            framework: null,
            frameworkExportLink: null,
            frameworkExportGuid: null,
            competencyExportOptions: [
                {name: "CASS (JSON-LD)", value: "jsonld"},
                {name: "CASS (RDF Quads)", value: "rdfQuads"},
                {name: "CASS (RDF+JSON)", value: "rdfJson"},
                {name: "CASS (RDF+XML)", value: "rdfXml"},
                {name: "CASS (Turtle)", value: "turtle"},
                {name: "Credential Engine ASN (JSON-LD)", value: "ctdlasnJsonld"},
                {name: "IMS Global CASE (JSON)", value: "case"}
            ]
        };
    },
    computed: {
        timestamp: function() {
            if (this.framework.getTimestamp()) {
                return this.framework.getTimestamp();
            } else if (this.framework["schema:dateModified"]) {
                return this.framework["schema:dateModified"];
            } else {
                return null;
            }
        },
        lastModified: function() {
            if (this.framework == null) return "Unknown.";
            if (this.timestamp) {
                return this.$moment(this.timestamp).fromNow();
            } else {
                return null;
            }
        }
    },
    components: {Hierarchy, Thing},
    created: function() {
        this.framework = this.$store.state.editor.framework;
        if (EcRepository.shouldTryUrl(this.framework.id) === false) {
            this.frameworkExportGuid = EcCrypto.md5(this.framework.id);
        } else {
            this.frameworkExportGuid = this.framework.getGuid();
        }
        this.frameworkExportLink = this.repo.selectedServer + "data/" + this.frameworkExportGuid;
        this.setDefaultLanguage();
    },
    watch: {
        exportType: function() {
            if (this.exportType === "asn") {
                this.exportAsn();
            } else if (this.exportType === "jsonld") {
                this.exportJsonld(this.frameworkExportLink);
            } else if (this.exportType === "rdfQuads") {
                this.exportRdfQuads(this.frameworkExportLink);
            } else if (this.exportType === "rdfJson") {
                this.exportRdfJson(this.frameworkExportLink);
            } else if (this.exportType === "rdfXml") {
                this.exportRdfXml(this.frameworkExportLink);
            } else if (this.exportType === "turtle") {
                this.exportTurtle(this.frameworkExportLink);
            } else if (this.exportType === "ctdlasnJsonld") {
                this.exportCtdlasnJsonld(this.frameworkExportLink);
            } else if (this.exportType === "ctdlasnCsv") {
                this.exportCtdlasnCsv();
            } else if (this.exportType === "csv") {
                this.exportCsv();
            } else if (this.exportType === "case") {
                this.exportCasePackages();
            }
        }
    },
    methods: {
        download: function(fileName, data) {
            var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            saveAs(blob, fileName);
        },
        exportAsn: function() {
            window.open(this.frameworkExportLink.replace("/data/", "/asn/"), '_blank');
        },
        exportJsonld: function(link) {
            window.open(link, '_blank');
        },
        exportRdfQuads: function(link) {
            var fileName = this.framework.getName();
            var me = this;
            this.get(link, null, {"Accept": "text/n4"}, function(success) {
                me.download(fileName + ".n4", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportRdfJson: function(link) {
            var fileName = this.framework.getName();
            var me = this;
            this.get(link, null, {"Accept": "application/rdf+json"}, function(success) {
                me.download(fileName + ".rdf.json", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportRdfXml: function(link) {
            var fileName = this.framework.getName();
            var me = this;
            this.get(link, null, {"Accept": "application/rdf+xml"}, function(success) {
                me.download(fileName + ".rdf.xml", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportTurtle: function(link) {
            var fileName = this.framework.getName();
            var me = this;
            this.get(link, null, {"Accept": "text/turtle"}, function(success) {
                me.download(fileName + ".turtle", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportCtdlasnJsonld: function(link) {
            window.open(link.replace("/data/", "/ceasn/"), '_blank');
        },
        exportCtdlasnCsv: function() {
            var me = this;
            EcRemote.getExpectingString(this.frameworkExportLink.replace("/data/", "/ceasn/"), null, function(success) {
                CSVExport.exportCTDLASN(JSON.parse(success), me.framework.getName());
            }, function(error) {
                console.log(error);
            });
        },
        exportCsv: function() {
            CSVExport.exportFramework(this.framework.id, console.log, console.log);
        },
        exportCasePackages: function() {
            window.open(this.repo.selectedServer + "ims/case/v1p0/CFPackages/" + this.frameworkExportGuid, '_blank');
        },
        exportCaseItems: function(guid) {
            window.open(this.repo.selectedServer + "ims/case/v1p0/CFItems/" + guid, '_blank');
        },
        removeObject: function(thing) {
            // Remove from container but don't delete
            console.log("removing " + thing.id);
            var me = this;
            this.framework["schema:dateModified"] = new Date().toISOString();
            this.framework.removeCompetency(thing.shortId(), function() {
                var framework = me.framework;
                if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[f.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                repo.saveTo(framework, function() {
                    me.confirmDialog = false;
                    me.$store.commit('framework', me.framework);
                }, console.error);
            }, console.log);
        },
        deleteObject: function(thing) {
            console.log("deleting " + thing.id);
            var me = this;
            if (thing.shortId() === this.framework.shortId()) {
                // delete framework
                var framework = this.framework;
                this.repo.deleteRegistered(framework, function(success) {
                    me.spitEvent("frameworkDeleted", framework.shortId(), "editFrameworkSection");
                    // Delete the framework, delete all non-used stuff.
                    if (framework.competency != null) {
                        for (var i = 0; i < framework.competency.length; i++) {
                            me.conditionalDelete(framework.competency[i]);
                        }
                    }
                    if (framework.relation != null) {
                        for (var i = 0; i < framework.relation.length; i++) {
                            me.conditionalDelete(framework.relation[i]);
                        }
                    }
                    if (framework.level != null) {
                        for (var i = 0; i < framework.level.length; i++) {
                            me.conditionalDelete(framework.level[i]);
                        }
                    }
                    me.$store.commit('framework', null);
                    me.$router.push({name: "frameworks"});
                }, console.log);
            } else {
                // Delete competency and relations
                this.$store.commit('selectedCompetency', thing);
                this.framework["schema:dateModified"] = new Date().toISOString();
                this.framework.removeCompetency(thing.shortId(), function() {
                    me.framework.removeLevel(thing.shortId());
                    me.conditionalDelete(thing.shortId());
                    me.spitEvent("competencyDeleted", thing.shortId(), "editFrameworkSection");
                    me.$store.commit('selectedCompetency', null);
                    var framework = me.framework;
                    if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[me.framework.id] !== true) {
                        framework = EcEncryptedValue.toEncryptedValue(framework);
                    }
                    me.repo.saveTo(framework, function() {
                        me.$store.commit('framework', me.framework);
                    }, console.error);
                }, console.log);
            }
        },
        exportObject: function(selectedCompetency, exportType) {
            var guid;
            if (EcRepository.shouldTryUrl(selectedCompetency.id) === false) {
                guid = EcCrypto.md5(selectedCompetency.id);
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
        }
    }
};
</script>

<style lang="scss">

.page-framework{
    .e-Thing-ul{

        margin-top:0px;
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

    .e-Framework{
        ul{margin-left:0px;}
        a {display:none;}
        >.expand{float:right;position:relative;top:.5rem;}
        >.compact{float:right;position:relative;top:.5rem;}
        >.editable{float:right;position:relative;top:.5rem;}
        >.delete-thing{float:right;position:relative;top:.5rem;}
        .e-Property-text{font-size:larger;}
    }

    .e-Competency{
        a {display:none;}
        >.expand{float:right;}
        >.compact{float:right;}
        >.editable {float:right;}
        >.delete-thing {float:right;}
        >.remove {float:right;}
        >.export {float:right;}
    }
    .e-HierarchyNode{
        >ul{
            padding-left:1rem;
            >div{
                border:1px dashed whitesmoke;
            }
        }
        >.icon{
            width:0px;
            height:0px;
            margin:0px;
            line-height:0px;
            display:block;
            position:relative;
            left:-.5rem;
            top:-2rem;
        }
        padding-left:1rem;
    }
    .dragging{
        div{
            border:1px dashed gray !important;
            .drag-footer::before{
                content:'' !important
            }
            .drag-footer{
            }
        }
    }
}

</style>