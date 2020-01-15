<template>
    <div class="page-framework">
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
            :queryParams="queryParams" />
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
            exportLink: null,
            exportGuid: null
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
            this.exportGuid = EcCrypto.md5(this.framework.id);
        } else {
            this.exportGuid = this.framework.getGuid();
        }
        this.exportLink = this.repo.selectedServer + "data/" + this.exportGuid;
        this.setDefaultLanguage();
    },
    watch: {
        exportType: function() {
            if (this.exportType === "asn") {
                this.exportAsn();
            } else if (this.exportType === "jsonld") {
                this.exportJsonld();
            } else if (this.exportType === "rdfQuads") {
                this.exportRdfQuads();
            } else if (this.exportType === "rdfJson") {
                this.exportRdfJson();
            } else if (this.exportType === "rdfXml") {
                this.exportRdfXml();
            } else if (this.exportType === "turtle") {
                this.exportTurtle();
            } else if (this.exportType === "ctdlasnJsonld") {
                this.exportCtdlasnJsonld();
            } else if (this.exportType === "ctdlasnCsv") {
                this.exportCtdlasnCsv();
            } else if (this.exportType === "csv") {
                this.exportCsv();
            } else if (this.exportType === "case") {
                this.exportCase();
            }
        }
    },
    methods: {
        download: function(fileName, data) {
            var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            saveAs(blob, fileName);
        },
        exportAsn: function() {
            window.open(this.exportLink.replace("/data/", "/asn/"), '_blank');
        },
        exportJsonld: function() {
            window.open(this.exportLink, '_blank');
        },
        exportRdfQuads: function() {
            var fileName = this.framework.getName();
            var me = this;
            this.get(this.exportLink, null, {"Accept": "text/n4"}, function(success) {
                me.download(fileName + ".n4", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportRdfJson: function() {
            var fileName = this.framework.getName();
            var me = this;
            this.get(this.exportLink, null, {"Accept": "application/rdf+json"}, function(success) {
                me.download(fileName + ".rdf.json", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportRdfXml: function() {
            var fileName = this.framework.getName();
            var me = this;
            this.get(this.exportLink, null, {"Accept": "application/rdf+xml"}, function(success) {
                me.download(fileName + ".rdf.xml", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportTurtle: function() {
            var fileName = this.framework.getName();
            var me = this;
            this.get(this.exportLink, null, {"Accept": "text/turtle"}, function(success) {
                me.download(fileName + ".turtle", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportCtdlasnJsonld: function() {
            window.open(this.exportLink.replace("/data/", "/ceasn/"), '_blank');
        },
        exportCtdlasnCsv: function() {
            var me = this;
            EcRemote.getExpectingString(this.exportLink.replace("/data/", "/ceasn/"), null, function(success) {
                CSVExport.exportCTDLASN(JSON.parse(success), me.framework.getName());
            }, function(error) {
                console.log(error);
            });
        },
        exportCsv: function() {
            CSVExport.exportFramework(this.framework.id, console.log, console.log);
        },
        exportCase: function() {
            window.open(this.repo.selectedServer + "ims/case/v1p0/CFPackages/" + this.exportGuid, '_blank');
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
        .e-Property-text{font-size:larger;}
    }

    .e-Competency{
        a {display:none;}
        >.expand{float:right;}
        >.compact{float:right;}
        >.editable {float:right;}
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