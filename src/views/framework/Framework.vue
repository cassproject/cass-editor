<template>
    <div class="page-framework">
        <div class="container">
            <div class="section">
                <Thing
                    :obj="framework"
                    :repo="repo"
                    :parentNotEditable="queryParams.view==='true'"
                    :profile="frameworkProfile" />
                <span
                    class="tag is-info has-text-white"
                    v-if="framework.competency && framework.competency.length == 1">{{ framework.competency.length }} item</span>
                <span
                    class="tag is-info has-text-white"
                    v-else-if="framework.competency && framework.competency.length > 1">{{ framework.competency.length }} items</span>
                <span
                    class="tag is-info has-text-white"
                    v-if="timestamp"
                    :title="new Date(timestamp)">Last modified {{ lastModified }}</span>
                <span
                    class="tag is-info has-text-white"
                    v-if="framework['schema:dateCreated']"
                    :title="new Date(framework['schema:dateCreated'])">Created {{ $moment(framework['schema:dateCreated']).fromNow() }}</span>
                <span
                    class="tag is-info has-text-white"
                    v-if="framework['Approved']"
                    :title="framework['Approved']">Approved</span>
                <span
                    class="tag is-info has-text-white"
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
                    :editable="disallowEdits !== true && queryParams.view !== 'true'"
                    :repo="repo"
                    :queryParams="queryParams"
                    :exportOptions="competencyExportOptions"
                    :highlightList="highlightCompetency"
                    :selectMode="selectButtonText != null"
                    :selectAll="selectAll"
                    :profile="competencyProfile" />
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
        queryParams: Object,
        disallowEdits: Boolean,
        profileOverride: Object
    },
    mixins: [common],
    data: function() {
        return {
            repo: window.repo,
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
            ],
            highlightCompetency: null,
            selectButtonText: null,
            selectAllButton: false,
            selectAll: false,
            selectedArray: [],
            frameworkProfile: {
                "http://schema.org/name": {
                    ...this.$store.state.lode.schemataLookup["https://schema.cassproject.org/0.4/"]["http://schema.org/name"],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Name of the competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "name"}]
                },
                "http://schema.org/description": {
                    ...this.$store.state.lode.schemataLookup["https://schema.cassproject.org/0.4/"]["http://schema.org/description"],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Description of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "description"}]
                }
            }
        };
    },
    computed: {
        framework: function() {
            return this.$store.state.editor.framework;
        },
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
        },
        commonPathIframe: function() {
            var path = "&iframeRoot=" + (this.queryParams.editorRoot ? this.queryParams.editorRoot : "");
            path += "&origin=" + window.location.origin;
            path += this.queryParams.server ? "&server=" + this.queryParams.server : "";
            path += this.queryParams.newObjectEndpoint ? "&newObjectEndpoint=" + this.queryParams.newObjectEndpoint : "";
            path += this.queryParams.ceasnDataFields ? "&ceasnDataFields=" + this.queryParams.ceasnDataFields : "";
            path += this.queryParams.webSocketOverride ? "&webSocketOverride=" + this.queryParams.webSocketOverride : "";
            path += this.queryParams.inherit ? "&inherit=" + this.queryParams.inherit : "";
            path += this.queryParams.css ? "&css=" + this.queryParams.css : "";
            path += this.queryParams.selectVerbose ? "&selectVerbose=" + this.queryParams.selectVerbose : "";
            path += this.queryParams.selectExport ? "&selectExport=" + this.queryParams.selectExport : "";
            path += this.queryParams.user ? "&user=" + this.queryParams.user : "";
            return path;
        },
        iframeCompetencyPathInterframework: function() {
            var path = this.queryParams.editorRoot ? this.queryParams.editorRoot : "";
            path += "/?select=Align with...&view=true&back=true";
            path += this.commonPathIframe;
            return path;
        },
        competencyProfile: function() {
            if (this.profileOverride) {
                return this.profileOverride;
            } else {
                var me = this;
                return {
                    "http://schema.org/name": {
                        ...this.$store.state.lode.schemataLookup["https://schema.cassproject.org/0.4/"]["http://schema.org/name"],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Name of the competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}]
                    },
                    "http://schema.org/description": {
                        ...this.$store.state.lode.schemataLookup["https://schema.cassproject.org/0.4/"]["http://schema.org/description"],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Description of the competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                    },
                    "https://schema.cassproject.org/0.4/Competency/scope": {
                        ...this.$store.state.lode.schemataLookup["https://schema.cassproject.org/0.4/"]["https://schema.cassproject.org/0.4/Competency/scope"],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Scope in which the competency may be applied. e.g. Underwater."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Scope"}]
                    },
                    "https://schema.cassproject.org/0.4/Level": {
                        ...this.$store.state.lode.schemataLookup["https://schema.cassproject.org/0.4/"]["https://schema.cassproject.org/0.4/Level"],
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                        "valuesIndexed": function() { return me.levels; },
                        "noTextEditing": true,
                        "iframePath": me.iframeCompetencyPathInterframework,
                        "iframeText": "Select levels to align...",
                        "add": function(selectedCompetency) { me.addLevel(selectedCompetency); },
                        "remove": function(competency, levelId) { me.removeLevelFromFramework(levelId); },
                        "save": function() { me.saveFramework(); }
                    },
                    "narrows": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A sub-competency relationship which has relevance to this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Narrows"}],
                        "iframePath": this.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["narrows"]; },
                        "noTextEditing": true,
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "narrows", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "narrows", target); }
                    }
                };
            }
        },
        levels: function() {
            var levels = {};
            if (!this.framework.level) {
                return null;
            }
            for (var i = 0; i < this.framework.level.length; i++) {
                var level = EcLevel.getBlocking(this.framework.level[i]);
                var comp = level.competency;
                if (!EcArray.isArray(levels[comp])) {
                    levels[comp] = [];
                }
                levels[comp].push(level);
            }
            return levels;
        },
        relations: function() {
            var relations = {};
            for (var i = 0; i < this.framework.relation.length; i++) {
                var a = EcAlignment.getBlocking(this.framework.relation[i]);
                if (!relations[a.relationType]) {
                    relations[a.relationType] = {};
                }
                if (!relations[a.relationType][a.source]) {
                    relations[a.relationType][a.source] = [];
                }
                relations[a.relationType][a.source].push(a.target);
                if (a.relationType === "narrows") {
                    if (!relations["broadens"]) {
                        relations["broadens"] = {};
                    }
                    if (!relations["broadens"][a.target]) {
                        relations["broadens"][a.target] = [];
                    }
                    relations["broadens"][a.target].push(a.source);
                }
            }
            return relations;
        }
    },
    components: {Hierarchy, Thing},
    created: function() {
        this.refreshPage();
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
        },
        shortId: function() {
            this.refreshPage();
        }
    },
    methods: {
        refreshPage: function() {
            if (EcRepository.shouldTryUrl(this.framework.id) === false) {
                this.frameworkExportGuid = EcCrypto.md5(this.framework.id);
            } else {
                this.frameworkExportGuid = this.framework.getGuid();
            }
            this.frameworkExportLink = this.repo.selectedServer + "data/" + this.frameworkExportGuid;
            this.setDefaultLanguage();
            this.highlightCompetency = [];
            if (this.queryParams.highlightCompetency) {
                if (!EcArray.isArray(this.queryParams.highlightCompetency)) {
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
        },
        select: function(id, checked) {
            if (checked) {
                EcArray.setAdd(this.selectedArray, id);
            } else {
                EcArray.setRemove(this.selectedArray, id);
            }
        },
        addRelationsToFramework: function(selectedCompetency, property, values) {
            this.$parent.addAlignments(values, selectedCompetency, property);
        },
        removeRelationFromFramework: function(source, property, target) {
            var me = this;
            new EcAsyncHelper().each(this.framework.relation, function(relation, callback) {
                EcAlignment.get(relation, function(r) {
                    if (r.source === source && r.target === target && r.relationType === property) {
                        me.framework.removeRelation(r.shortId());
                        me.conditionalDelete(r.shortId());
                        callback();
                    }
                    callback();
                }, callback);
            }, function() {
                var framework = me.framework;
                me.$store.commit('framework', framework);
                if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                me.repo.saveTo(framework, function() {}, console.error);
            });
        },
        addLevel: function(selectedCompetency) {
            var c = new EcLevel();
            if (this.queryParams.newObjectEndpoint != null) {
                c.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                c.generateId(this.repo.selectedServer);
            }
            c["schema:dateCreated"] = new Date().toISOString();
            this.framework.addLevel(c.id);
            if (EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            c.name = "New Level";
            c.competency = selectedCompetency;
            if (this.queryParams.private === "true") {
                c = EcEncryptedValue.toEncryptedValue(c);
                if (EcEncryptedValue.encryptOnSaveMap[this.framework.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
            }
            this.repo.saveTo(c, function() {}, console.error);
        },
        saveFramework: function() {
            this.framework["schema:dateModified"] = new Date().toISOString();
            var framework = this.framework;
            if (this.queryParams.private === "true" && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, function() {}, console.error);
        },
        removeLevelFromFramework: function(levelId) {
            this.framework.removeLevel(levelId);
            this.conditionalDelete(levelId);
            this.saveFramework();
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
        .e-Property-text{
            font-size:larger;
        }
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