<template>
    <div class="page-framework">
        <Thing
            :obj="framework"
            :repo="repo"
            :parentNotEditable="queryParams.view==='true'" />
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
        <button
            v-if="selectAllButton"
            @click="selectAll=!selectAll">
            Select All
        </button>
        <button
            v-if="selectButtonText"
            @click="selectButton">
            {{ selectButtonText }}
        </button>
        <hr>
        <ConceptHierarchy
            :container="framework"
            containerType="ConceptScheme"
            :editable="queryParams.view !== 'true'"
            :repo="repo"
            :queryParams="queryParams"
            :exportOptions="conceptExportOptions"
            :highlightList="highlightCompetency"
            :selectMode="selectButtonText != null"
            :selectAll="selectAll" />
    </div>
</template>
<script>
import Thing from '@/lode/components/lode/Thing.vue';
import ConceptHierarchy from './ConceptHierarchy.vue';
import saveAs from 'file-saver';
import common from '@/mixins/common.js';
export default {
    name: "ConceptScheme",
    props: {
        exportType: String,
        queryParams: Object
    },
    mixins: [common],
    data: function() {
        return {
            repo: window.repo,
            framework: null,
            schemeExportLink: null,
            schemeExportGuid: null,
            conceptExportOptions: [
                {name: "SKOS (JSON-LD)", value: "jsonld"},
                {name: "SKOS (RDF Quads)", value: "rdfQuads"},
                {name: "SKOS (RDF+JSON)", value: "rdfJson"},
                {name: "SKOS (RDF+XML)", value: "rdfXml"},
                {name: "SKOS (Turtle)", value: "turtle"}
            ],
            highlightCompetency: null,
            selectButtonText: null,
            selectAllButton: false,
            selectAll: false,
            selectedArray: []
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
        },
        shortId: function() {
            return this.$store.state.editor.framework.shortId();
        }
    },
    components: {Thing, ConceptHierarchy},
    created: function() {
        this.refreshPage();
    },
    watch: {
        exportType: function() {
            if (this.exportType === "jsonld") {
                this.exportJsonld(this.schemeExportLink);
            } else if (this.exportType === "rdfQuads") {
                this.exportRdfQuads(this.schemeExportLink);
            } else if (this.exportType === "rdfJson") {
                this.exportRdfJson(this.schemeExportLink);
            } else if (this.exportType === "rdfXml") {
                this.exportRdfXml(this.schemeExportLink);
            } else if (this.exportType === "turtle") {
                this.exportTurtle(this.schemeExportLink);
            } else if (this.exportType === "ctdlasnJsonld") {
                this.exportCtdlasnJsonld(this.schemeExportLink);
            }
        },
        shortId: function() {
            this.refreshPage();
        }
    },
    methods: {
        refreshPage: function() {
            this.framework = this.$store.state.editor.framework;
            if (EcRepository.shouldTryUrl(this.framework.id) === false) {
                this.schemeExportGuid = EcCrypto.md5(this.framework.id);
            } else {
                this.schemeExportGuid = this.framework.getGuid();
            }
            this.schemeExportLink = this.repo.selectedServer + "data/" + this.schemeExportGuid;
            this.highlightCompetency = [];
            if (this.queryParams.highlightCompetency) {
                if (!EcArray.isArray(highlightCompetency)) {
                    this.highlightCompetency = [this.queryParams.highlightCompetency];
                } else {
                    this.highlightCompetency = this.queryParams.highlightCompetency;
                }
            }
            if (this.queryParams.singleSelect) {
                this.selectButtonText = this.queryParams.singleSelect;
            }
            if (this.queryParams.select) {
                if (this.queryParams.select !== "" && this.queryParams.select !== "select") {
                    this.selectButtonText = this.queryParams.select;
                }
                this.selectAllButton = true;
            }
        },
        download: function(fileName, data) {
            var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            saveAs(blob, fileName);
        },
        exportJsonld: function(link) {
            window.open(link, '_blank');
        },
        exportRdfQuads: function(link) {
            var fileName = this.getDisplayStringFrom(this.framework["dcterms:title"]);
            var me = this;
            this.get(link, null, {"Accept": "text/n4"}, function(success) {
                me.download(fileName + ".n4", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportRdfJson: function(link) {
            var fileName = this.getDisplayStringFrom(this.framework["dcterms:title"]);
            var me = this;
            this.get(link, null, {"Accept": "application/rdf+json"}, function(success) {
                me.download(fileName + ".rdf.json", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportRdfXml: function(link) {
            var fileName = this.getDisplayStringFrom(this.framework["dcterms:title"]);
            var me = this;
            this.get(link, null, {"Accept": "application/rdf+xml"}, function(success) {
                me.download(fileName + ".rdf.xml", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportTurtle: function(link) {
            var fileName = this.getDisplayStringFrom(this.framework["dcterms:title"]);
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
        getDisplayStringFrom: function(n) {
            if (n != null && EcArray.isArray(n)) {
                if ((n).length > 0) {
                    n = (n)[0];
                }
            }
            if (n != null && EcObject.isObject(n) && (n).hasOwnProperty("@value")) {
                return (n)["@value"];
            }
            return n;
        },
        deleteObject: function(thing) {
            console.log("deleting " + thing.id);
            var me = this;
            if (thing.shortId() === this.framework.shortId()) {
                // delete scheme
                var framework = this.framework;
                this.repo.deleteRegistered(framework, function(success) {
                    me.spitEvent("frameworkDeleted", framework.shortId(), "editFrameworkSection");
                    // Delete the framework, delete all non-used stuff.
                    EcConcept.search(me.repo, "skos\\:inScheme:\"" + framework.shortId() + "\"", function(concepts) {
                        for (var i = 0; i < concepts.length; i++) {
                            me.repo.deleteRegistered(concepts[i], console.log, console.error);
                        }
                    }, console.error);
                    me.$store.commit('framework', null);
                    me.$router.push({name: "frameworks"});
                }, console.log);
            } else {
                // Delete concept and fields
                this.deleteConceptInner(thing);
                this.spitEvent("conceptDeleted", thing.shortId(), "editFrameworkPage");

                this.framework["schema:dateModified"] = new Date().toISOString();
                this.$store.commit('selectedCompetency', null);
            }
        },
        deleteConceptInner: function(c) {
            var me = this;
            if (c["skos:broader"] != null) {
                for (var i = 0; i < c["skos:broader"].length; i++) {
                    EcConcept.get(c["skos:broader"][i], function(concept) {
                        EcArray.setRemove(concept["skos:narrower"], c.shortId());
                        if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[concept.id] !== true) {
                            concept = EcEncryptedValue.toEncryptedValue(concept);
                        }
                        repo.saveTo(concept, function() {
                            me.$store.commit('framework', me.framework);
                        }, console.error);
                    }, console.error);
                }
            }
            if (c["skos:narrower"] != null) {
                for (var i = 0; i < c["skos:narrower"].length; i++) {
                    EcConcept.get(c["skos:narrower"][i], function(concept) {
                        me.deleteConceptInner(concept);
                    }, console.error);
                }
            }
            if (c["skos:topConceptOf"] != null) {
                EcArray.setRemove(this.framework["skos:hasTopConcept"], c.shortId());
                var framework = this.framework;
                if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                repo.saveTo(framework, function() {
                    me.$store.commit('framework', me.framework);
                }, console.error);
            }
            repo.deleteRegistered(c, function() {
                me.$store.commit('framework', me.framework);
            }, console.error);
        },
        exportObject: function(concept, exportType) {
            var guid;
            if (EcRepository.shouldTryUrl(concept.id) === false) {
                guid = EcCrypto.md5(concept.id);
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
        select: function(id, checked) {
            if (checked) {
                EcArray.setAdd(this.selectedArray, id);
            } else {
                EcArray.setRemove(this.selectedArray, id);
            }
        }
    }
};
</script>

<style lang="scss" scoped>

.page-framework{
    .e-Thing-ul{

        margin-top:0px;
    }
    .e-Thing-always-ul .e-title, .e-Thing-always-ul .e-prefLabel{
        label{
            display:none;
        }
    }

    .e-Thing-always-ul .e-description, .e-Thing-always-ul .e-definition{
        label{
            display:none;
        }
        font-size:.8rem;
    }

    .e-ConceptScheme{
        ul{
            margin-left:0px;
        }
        a {
            display:none;
        }
        >.expand{

            }
        >.compact{
        }
        >.editable{
        }
        >.delete-thing{
        }
        .e-Property-text{
            font-size:larger;
        }
    }

    .e-Concept{
        a {display:none;}
        >.expand{
        }
        >.compact{
        }
        >.editable {
        }
        >.delete-thing {
        }
        >.export {
        }
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
        .highlighted{
            background-color:yellow;
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