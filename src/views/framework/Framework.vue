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
                    iframeText="Attach subitems from other sources to the selected item."
                    @select="select"
                    @deleteObject="deleteObject"
                    @removeObject="removeObject"
                    @exportObject="exportObject"
                    :isEditingContainer="isEditingContainer"
                    @editingThing="handleEditingContainer($event)">
                    <template v-slot:copyURL="slotProps">
                        <span v-if="slotProps.expandedProperty=='@id'">
                            <button
                                title="Copy URL to the clipboard."
                                v-clipboard="slotProps.expandedValue[0]['@value']">
                                <i class="fa fa-clipboard" />
                            </button>
                        </span>
                    </template>
                </Thing>
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
                    iframeText="Attach subitems from other sources to the selected item."
                    @select="select"
                    @deleteObject="deleteObject"
                    @removeObject="removeObject"
                    @exportObject="exportObject"
                    :isEditingContainer="isEditingContainer"
                    @editingContainer="handleEditingContainer($event)">
                    <template v-slot:copyURL="slotProps">
                        <span v-if="slotProps.expandedProperty=='@id'">
                            <button
                                title="Copy URL to the clipboard."
                                v-clipboard="slotProps.expandedValue[0]['@value']">
                                <i class="fa fa-clipboard" />
                            </button>
                        </span>
                    </template>
                </Hierarchy>
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
import tlaProfile from '@/mixins/tlaProfile.js';
export default {
    name: "Framework",
    props: {
        exportType: String,
        queryParams: Object,
        disallowEdits: Boolean,
        profileOverride: Object
    },
    mixins: [common, exports, competencyEdits, ctdlasnProfile, t3Profile, tlaProfile],
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
            isEditingContainer: false,
            config: null
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
            if (this.config) {
                return this.config.frameworkConfig;
            }
            if (this.$store.state.editor.t3Profile === true) {
                return this.t3FrameworkProfile;
            }
            if (this.queryParams.ceasnDataFields === "true") {
                return this.ctdlAsnFrameworkProfile;
            }
            if (this.queryParams.tlaProfile === "true") {
                return this.tlaFrameworkProfile;
            }
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Framework/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Framework URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name of the framework. One name per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Framework Name"}],
                    "heading": "General",
                    "onePerLanguage": "true"
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The description of the framework. One description per language"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}],
                    "heading": "General",
                    "onePerLanguage": "true"
                },
                "headings": ["Keys", "General"]
            };
        },
        competencyProfile: function() {
            if (this.config) {
                var profile = this.config.competencyConfig;
                if (this.config.levelsConfig) {
                    var me = this;
                    var key = EcObject.keys(this.config.levelsConfig);
                    key = key[0];
                    profile.secondaryProperties.push(key);
                    profile[key] = this.config.levelsConfig[key];
                    profile[key]["http://schema.org/rangeIncludes"] = [{"@id": "https://schema.cassproject.org/0.4/Level"}];
                    profile[key]["valuesIndexed"] = function() { return me.levels; };
                    profile[key]["noTextEditing"] = true;
                    profile[key]["add"] = function(selectedCompetency) { me.addLevel(selectedCompetency); };
                    profile[key]["remove"] = function(competency, levelId) { me.removeLevelFromFramework(levelId); };
                    profile[key]["save"] = function() { me.saveFramework(); };
                }
                if (this.config.relationshipConfig) {
                    var keys = EcObject.keys(this.config.relationshipConfig);
                    for (var i = 0; i < keys.length; i++) {
                        let key = keys[i];
                        var me = this;
                        profile.secondaryProperties.push(key);
                        profile[key] = this.config.relationshipConfig[key];
                        profile[key]["http://schema.org/rangeIncludes"] = [{"@id": "http://schema.org/URL"}];
                        profile[key]["valuesIndexed"] = function() { return me.relations[key]; };
                        profile[key]["noTextEditing"] = true;
                        profile[key]["add"] = "unsaved";
                        profile[key]["remove"] = function(source, target) { me.removeRelationFromFramework(source, key, target); };
                        profile[key]["save"] = function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, key, values); };
                        profile[key]["iframePath"] = me.$store.state.editor.iframeCompetencyPathInterframework;
                        profile[key]["iframeText"] = "Select competencies to align...";
                    }
                }
                return profile;
            }
            if (this.$store.state.editor.t3Profile === true) {
                return this.t3CompetencyProfile;
            }
            if (this.profileOverride) {
                return this.profileOverride;
            } else if (this.queryParams.ceasnDataFields === "true") {
                return this.ctdlAsnCompetencyProfile;
            } else if (this.queryParams.tlaProfile === "true") {
                return this.tlaCompetencyProfile;
            } else {
                var me = this;
                return {
                    "@id": {
                        "@id": "https://schema.cassproject.org/0.4/Competency/id",
                        "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                        "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "The URL of the competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "URL"}],
                        "readOnly": "true",
                        "max": 1,
                        "heading": "Keys"
                    },
                    "http://schema.org/name": {
                        "@id": "http://schema.org/name",
                        "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                        "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "The name of the competency. One name per language."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                        "heading": "General",
                        "onePerLanguage": "true"
                    },
                    "http://schema.org/description": {
                        "@id": "http://schema.org/description",
                        "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                        "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "The description of the competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}],
                        "heading": "General"
                    },
                    "https://schema.cassproject.org/0.4/scope": {
                        "@id": "https://schema.cassproject.org/0.4/scope",
                        "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                        "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "The scope of the competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Scope"}],
                        "heading": "General"
                    },
                    "https://schema.cassproject.org/0.4/Level": {
                        "@id": "https://schema.cassproject.org/0.4/Level",
                        "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                        "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [
                            {"@language": "en",
                                "@value":
                        "When an individual's performance in a competency can be measured, a level specifies milestones that an individual can reach, creating fine-grained distinction between the proficient and the adept."}
                        ],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Level"}],
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                        "valuesIndexed": function() { return me.levels; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency) { me.addLevel(selectedCompetency); },
                        "remove": function(competency, levelId) { me.removeLevelFromFramework(levelId); },
                        "save": function() { me.saveFramework(); },
                        "heading": "Connections"
                    },
                    "narrows": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A sub-competency relationship which has relevance to this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Narrows"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["narrows"]; },
                        "noTextEditing": "true",
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "narrows", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "narrows", target); },
                        "heading": "Connections"
                    },
                    "broadens": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Covers other relevant competencies not found in this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Broadens"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["broadens"]; },
                        "noTextEditing": "true",
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "broadens", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "broadens", target); },
                        "heading": "Connections"
                    },
                    "isEquivalentTo": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Represents same capability in all aspects to another competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Equivalent To"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["isEquivalentTo"]; },
                        "noTextEditing": "true",
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isEquivalentTo", target); },
                        "heading": "Connections"
                    },
                    "requires": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Another competency is prerequisite for this."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Requires"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["requires"]; },
                        "noTextEditing": "true",
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "requires", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "requires", target); },
                        "heading": "Connections"
                    },
                    "isEnabledBy": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A recommended option that speeds up acquisition of this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Enabled By"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["isEnabledBy"]; },
                        "noTextEditing": "true",
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEnabledBy", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isEnabledBy", target); },
                        "heading": "Connections"
                    },
                    "isRelatedTo": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "This competency has some degree of overlap with another."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Related To"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["isRelatedTo"]; },
                        "noTextEditing": "true",
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isRelatedTo", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isRelatedTo", target); },
                        "heading": "Connections"
                    },
                    "desires": {
                        "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Recommended, assumed, or expected competency not essential to acquisition of this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Desires"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["desires"]; },
                        "noTextEditing": "true",
                        "add": "unsaved",
                        "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "desires", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "desires", target); },
                        "heading": "Connections"
                    },
                    "headings": ["Keys", "General", "Connections"]
                };
            }
        }
    },
    components: {Hierarchy, Thing},
    created: function() {
        var me = this;
        // Set configuration
        if (this.framework.configuration) {
            var c = EcRepository.getBlocking(this.framework.configuration);
            if (c) {
                this.config = c;
            }
        }
        // To do: Check for personal default in browser storage
        this.repo.searchWithParams("@type:Configuration", {'size': 10000}, function(c) {
            if (c.isDefault === "true") {
                me.config = c;
            }
        }, function() {}, function() {});
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
            this.$store.commit('editor/iframeCompetencyPathIntraframework', path);
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
        handleEditingContainer: function(e) {
            if (e) {
                this.isEditingContainer = true;
            } else {
                this.isEditingContainer = false;
            }
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/framework.scss';


</style>