<template>
    <div class="page-framework">
        <div class="container">
            <div class="section is-paddingless">
                <Thing
                    :obj="framework"
                    :repo="repo"
                    :parentNotEditable="queryParams.view==='true'"
                    :profile="frameworkProfile"
                    :iframePath="$store.state.editor.iframeCompetencyPathInterframework"
                    iframeText="Attach subitems from other sources to the selected item." />
                <span class="actions">
                    <span
                        class="tag is-info has-text-white"
                        v-if="framework.competency && framework.competency.length == 1">
                        {{ framework.competency.length }} item
                    </span>
                    <span
                        class="tag is-info has-text-white"
                        v-else-if="framework.competency && framework.competency.length > 1">
                        {{ framework.competency.length }} items
                    </span>
                    <span
                        class="tag is-info has-text-white"
                        v-if="timestamp"
                        :title="new Date(timestamp)">
                        Last modified {{ lastModified }}
                    </span>
                    <span
                        class="tag is-info has-text-white"
                        v-if="framework['schema:dateCreated']"
                        :title="new Date(framework['schema:dateCreated'])">
                        Created {{ $moment(framework['schema:dateCreated']).fromNow() }}
                    </span>
                    <span
                        class="tag is-info has-text-white"
                        v-if="framework['Approved']"
                        :title="framework['Approved']">
                        Approved
                    </span>
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
                </span>
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
                    :profile="competencyProfile"
                    :iframePath="$store.state.editor.iframeCompetencyPathInterframework"
                    iframeText="Attach subitems from other sources to the selected item." />
            </div>
        </div>
    </div>
</template>
<script>
import Thing from '@/lode/components/lode/Thing.vue';
import Hierarchy from '@/lode/components/lode/Hierarchy.vue';
import common from '@/mixins/common.js';
import exports from '@/mixins/exports.js';
import competencyEdits from '@/mixins/competencyEdits.js';
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';
import t3Profile from '@/mixins/t3Profile.js';
export default {
    name: "Framework",
    props: {
        exportType: String,
        queryParams: Object,
        disallowEdits: Boolean,
        profileOverride: Object
    },
    mixins: [common, exports, competencyEdits, ctdlasnProfile, t3Profile],
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
            selectedArray: []
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
        frameworkProfile: function() {
            if (this.$store.state.editor.t3Profile === true) {
                return this.t3FrameworkProfile;
            }
            if (this.queryParams.ceasnDataFields === "true") {
                return this.ctdlAsnFrameworkProfile;
            }
            return {
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Name of the competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "name"}]
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Description of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "description"}]
                }
            };
        },
        competencyProfile: function() {
            if (this.$store.state.editor.t3Profile === true) {
                return this.t3CompetencyProfile;
            }
            if (this.profileOverride) {
                return this.profileOverride;
            } else if (this.queryParams.ceasnDataFields === "true") {
                return this.ctdlAsnCompetencyProfile;
            } else {
                var me = this;
                return {
                    "http://schema.org/name": {
                        "@id": "http://schema.org/name",
                        "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                        "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                        "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Name of the competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}]
                    },
                    "http://schema.org/description": {
                        "@id": "http://schema.org/description",
                        "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                        "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                        "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Description of the competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                    },
                    "https://schema.cassproject.org/0.4/Competency/scope": {
                        "@id": "https://schema.cassproject.org/0.4/Competency/scope",
                        "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                        "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Scope in which the competency may be applied. e.g. Underwater."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Scope"}]
                    },
                    "https://schema.cassproject.org/0.4/Level": {
                        "@id": "https://schema.cassproject.org/0.4/Level",
                        "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                        "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [
                            {"@language": "en",
                                "@value":
                        "When an individual's performance in a competency can be measured, a level specifies milestones that an individual can reach, creating fine-grained distinction between the proficient and the adept."}
                        ],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Level"}],
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                        "valuesIndexed": function() { return me.levels; },
                        "noTextEditing": true,
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
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
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["narrows"]; },
                        "noTextEditing": true,
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "narrows", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "narrows", target); }
                    },
                    "broadens": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Covers other relevant competencies not found in this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Broadens"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["broadens"]; },
                        "noTextEditing": true,
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "broadens", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "broadens", target); }
                    },
                    "isEquivalentTo": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Represents same capability in all aspects to another competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Equivalent To"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["isEquivalentTo"]; },
                        "noTextEditing": true,
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isEquivalentTo", target); }
                    },
                    "requires": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Another competency is prerequisite for this."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Requires"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["requires"]; },
                        "noTextEditing": true,
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "requires", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "requires", target); }
                    },
                    "isEnabledBy": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A recommended option that speeds up acquisition of this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Enabled By"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["isEnabledBy"]; },
                        "noTextEditing": true,
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEnabledBy", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isEnabledBy", target); }
                    },
                    "isRelatedTo": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "This competency has some degree of overlap with another."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Related To"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["isRelatedTo"]; },
                        "noTextEditing": true,
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isRelatedTo", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isRelatedTo", target); }
                    },
                    "desires": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Recommended, assumed, or expected competency not essential to acquisition of this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Desires"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["desires"]; },
                        "noTextEditing": true,
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "desires", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "desires", target); }
                    }
                };
            }
        }
    },
    components: {Hierarchy, Thing},
    created: function() {
        this.refreshPage();
    },
    watch: {
        exportType: function() {
            if (this.exportType === "asn") {
                this.exportAsn(this.frameworkExportLink);
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
                this.exportCtdlasnCsv(this.frameworkExportLink);
            } else if (this.exportType === "csv") {
                this.exportCsv();
            } else if (this.exportType === "case") {
                this.exportCasePackages(guid);
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
            var path = this.queryParams.editorRoot ? this.queryParams.editorRoot : "/";
            path += "cass-editor/?select=Align with...&view=true&back=true&frameworkId=" + this.framework.shortId();
            path += this.$store.state.editor.commonPathIframe;
            this.$store.commit('iframeCompetencyPathIntraframework', path);
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
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/framework.scss';


</style>