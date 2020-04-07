<template>
    <div id="page-framework">
        <!-- competency search -->
        <CompetencySearch
            :isActive="$store.state.lode.competencySearchModalOpen" />
        <!--
            share modal manages users who have access to
            the framework
        -->
        <ShareModal
            :isActive="showShareModal"
            @closeShareModalEvent="onCloseShareModal()" />
        <!--
            Editing multiple competencies are one time utilizes
            a modal to do so, rather than one of the competencies.
            This will ensure it is clear what the user is editing.
        -->
        <EditMultipleCompetencies
            v-if="showEditMultiple"
            :showEditMultiple="showEditMultiple"
            @cancelEditMultipleEvent="onCancelEditMultiple"
            @EditMultipleEvent="onEditMultiple"
            :profile="competencyProfile"
            @editMultipleCompetencies="onEditMultipleCompetencies"
            :selectedCompetencies="selectedArray" />
        <!--
            Comments are served in an aside in
            Comments.vue template
        -->
        <Comments
            @closeCommentsEvent="onCloseComments()"
            v-if="showComments" />
        <!--
            FrameworkToolbar.vue enables management options on the framework
            such as sharing, exporting, comment, rolling back versions
        -->


        <!-- begin framework -->
        <div class="container">
            <FrameworkEditorToolbar
                @openCommentsEvent="onOpenComments()"
                @openShareModalEvent="onOpenShareModal()"
                @changeProperties="changeProperties"
                @openExportModalEvent="onOpenExportModal()" />
            <div class="section">
                <Component
                    :is="dynamicThingComponent"
                    :obj="framework"
                    :repo="repo"
                    :parentNotEditable="queryParams.view==='true'"
                    :profile="frameworkProfile"
                    :iframePath="$store.state.editor.iframeCompetencyPathInterframework"
                    iframeText="Attach subitems from other sources to the selected item."
                    @deleteObject="deleteObject"
                    @removeObject="removeObject"
                    @editNodeEvent="onEditNode()"
                    @doneEditingNodeEvent="onDoneEditingNode()"
                    :properties="properties" />
                <div class="info-bar">
                    <span
                        class="is-info has-text-white"
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
                    <span v-if="loggedIn">
                        Make private
                        <input
                            type="checkbox"
                            v-model="privateFramework">
                    </span>
                </div>
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
                    :viewOnly="queryParams.view === 'true'"
                    :repo="repo"
                    :queryParams="queryParams"
                    :exportOptions="competencyExportOptions"
                    :highlightList="highlightCompetency"
                    :profile="competencyProfile"
                    :iframePath="$store.state.editor.iframeCompetencyPathInterframework"
                    iframeText="Attach subitems from other sources to the selected item."
                    @deleteObject="deleteObject"
                    @editMultipleEvent="onEditMultiple"
                    @removeObject="removeObject"
                    @exportObject="exportObject"
                    @selectButtonClick="onSelectButtonClick"
                    :properties="properties"
                    @selectedArray="selectedArrayEvent" />
            </div>
        </div>
    </div>
</template>
<script>
import Thing from '@/lode/components/lode/Thing.vue';
import ThingEditing from '@/lode/components/lode/ThingEditing.vue';
import Hierarchy from '@/lode/components/lode/Hierarchy.vue';
import common from '@/mixins/common.js';
import exports from '@/mixins/exports.js';
import competencyEdits from '@/mixins/competencyEdits.js';
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';
import t3Profile from '@/mixins/t3Profile.js';
import tlaProfile from '@/mixins/tlaProfile.js';
import ShareModal from './ShareModal.vue';
import FrameworkEditorToolbar from './EditorToolbar.vue';
import Comments from './Comments.vue';
import EditMultipleCompetencies from './EditMultipleCompetencies.vue';
import CompetencySearch from './CompetencySearch.vue';

export default {
    name: "Framework",
    props: {
        queryParams: Object,
        profileOverride: Object
    },
    mixins: [common, exports, competencyEdits, ctdlasnProfile, t3Profile, tlaProfile],
    data: function() {
        return {
            showEditMultiple: false,
            showClipboardSuccessModal: false,
            showComments: false,
            showShareModal: false,
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
            frameworkExportOptions: [
                {name: "Achievement Standards Network (RDF+JSON)", value: "asn"},
                {name: "CASS (JSON-LD)", value: "jsonld"},
                {name: "CaSS (RDF Quads)", value: "rdfQuads"},
                {name: "CaSS (RDF+JSON)", value: "rdfJson"},
                {name: "CaSS (RDF+XML)", value: "rdfXml"},
                {name: "CaSS (Turtle)", value: "turtle"},
                {name: "Credential Engine ASN (JSON-LD)", value: "ctdlasnJsonld"},
                {name: "Credential Engine ASN (CSV)", value: "ctdlasnCsv"},
                {name: "Table (CSV)", value: "csv"},
                {name: "IMS Global CASE (JSON)", value: "case"}
            ],
            highlightCompetency: null,
            editingFramework: false,
            properties: "primary",
            config: null,
            privateFramework: false,
            selectedArray: []
        };
    },
    computed: {
        dynamicThingComponent: function() {
            if (this.editingFramework) {
                return 'ThingEditing';
            } else {
                return 'Thing';
            }
        },
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
        loggedIn: function() {
            if (EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
                return true;
            }
            return false;
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
                    if (!profile[key]["options"]) {
                        profile[key]["noTextEditing"] = 'true';
                        profile[key]["add"] = function(selectedCompetency, levelId) { me.addLevel(selectedCompetency, levelId); };
                        profile[key]["save"] = function() { me.saveFramework(); };
                        profile[key]["remove"] = function(competency, levelId) { me.removeLevelFromFramework(levelId); };
                    } else {
                        profile[key]["add"] = "checkedOptions";
                        profile[key]["save"] = function(selectedCompetency, checkedOptions, allOptions) { me.saveCheckedLevels(selectedCompetency, checkedOptions, allOptions); };
                    }
                }
                if (this.config.relationshipConfig) {
                    var keys = EcObject.keys(this.config.relationshipConfig);
                    for (var i = 0; i < keys.length; i++) {
                        let key = keys[i];
                        var me = this;
                        profile.secondaryProperties.push(key);
                        profile[key] = this.config.relationshipConfig[key];
                        profile[key]["http://schema.org/rangeIncludes"] = [{"@id": "https://schema.cassproject.org/0.4/Competency"}];
                        profile[key]["valuesIndexed"] = function() { return me.relations[key]; };
                        profile[key]["noTextEditing"] = 'true';
                        profile[key]["remove"] = function(source, target) { me.removeRelationFromFramework(source, key, target); };
                        profile[key]["add"] = function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, key, values); };
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
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A sub-competency relationship which has relevance to this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Narrows"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["narrows"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "narrows", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "narrows", target); },
                        "heading": "Connections"
                    },
                    "broadens": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Covers other relevant competencies not found in this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Broadens"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["broadens"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "broadens", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "broadens", target); },
                        "heading": "Connections"
                    },
                    "isEquivalentTo": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Represents same capability in all aspects to another competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Equivalent To"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["isEquivalentTo"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isEquivalentTo", target); },
                        "heading": "Connections"
                    },
                    "requires": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Another competency is prerequisite for this."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Requires"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["requires"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "requires", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "requires", target); },
                        "heading": "Connections"
                    },
                    "isEnabledBy": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A recommended option that speeds up acquisition of this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Enabled By"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["isEnabledBy"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEnabledBy", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isEnabledBy", target); },
                        "heading": "Connections"
                    },
                    "isRelatedTo": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "This competency has some degree of overlap with another."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Related To"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["isRelatedTo"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isRelatedTo", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isRelatedTo", target); },
                        "heading": "Connections"
                    },
                    "desires": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Recommended, assumed, or expected competency not essential to acquisition of this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Desires"}],
                        "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                        "iframeText": "Select competencies to align...",
                        "valuesIndexed": function() { return me.relations["desires"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "desires", values); },
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "desires", target); },
                        "heading": "Connections"
                    },
                    "headings": ["Keys", "General", "Connections"]
                };
            }
        }
    },
    components: {
        Hierarchy,
        Thing,
        ThingEditing,
        FrameworkEditorToolbar,
        ShareModal,
        Comments,
        EditMultipleCompetencies,
        CompetencySearch
    },
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
        this.spitEvent('viewChanged');
    },
    mounted: function() {
        if (!this.framework) {
            this.$router.push({name: "frameworks"});
        }
        if (EcRepository.getBlocking(this.framework.id).type === "EncryptedValue") {
            this.privateFramework = true;
        }
    },
    watch: {
        shortId: function() {
            this.refreshPage();
        },
        privateFramework: function() {
            var me = this;
            var framework = this.framework;
            if (this.privateFramework === true) {
                this.$store.commit('editor/private', true);
                if (framework.competency && framework.competency.length > 0) {
                    new EcAsyncHelper().each(framework.competency, function(competencyId, done) {
                        EcCompetency.get(competencyId, function(c) {
                            if (c.canEditAny(EcIdentityManager.getMyPks())) {
                                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                                c = EcEncryptedValue.toEncryptedValue(c);
                                me.repo.saveTo(c, done, done);
                            } else {
                                done();
                            }
                        }, done);
                    }, function(competencyIds) {
                        if (framework.relation && framework.relation.length > 0) {
                            new EcAsyncHelper().each(framework.relation, function(relationId, done) {
                                EcAlignment.get(relationId, function(r) {
                                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                                    r = EcEncryptedValue.toEncryptedValue(r);
                                    me.repo.saveTo(r, done, done);
                                }, done);
                            }, function(relationIds) {
                                me.encryptFramework(framework);
                            });
                        } else {
                            me.encryptFramework(framework);
                        }
                    });
                } else {
                    me.encryptFramework(framework);
                }
            } else {
                this.$store.commit('editor/private', false);
                framework = EcEncryptedValue.toEncryptedValue(framework);
                var f = new EcFramework();
                f.copyFrom(framework.decryptIntoObject());
                EcEncryptedValue.encryptOnSave(f.id, false);
                me.repo.saveTo(f, function() {}, console.error);
                framework = f;
                if (framework.competency && framework.competency.length > 0) {
                    new EcAsyncHelper().each(framework.competency, function(competencyId, done) {
                        EcRepository.get(competencyId, function(c) {
                            var v;
                            if (c.canEditAny(EcIdentityManager.getMyPks())) {
                                if (c.isAny(new EcEncryptedValue().getTypes())) {
                                    v = new EcEncryptedValue();
                                    v.copyFrom(c);
                                } else {
                                    v = EcEncryptedValue.toEncryptedValue(c);
                                }
                                c = new EcCompetency();
                                c.copyFrom(v.decryptIntoObject());
                                EcEncryptedValue.encryptOnSave(c.id, false);
                                me.repo.saveTo(c, done, done);
                            } else {
                                done();
                            }
                        }, done);
                    }, function(competencyIds) {
                        if (framework.relation && framework.relation.length > 0) {
                            new EcAsyncHelper().each(framework.relation, function(relationId, done) {
                                EcRepository.get(relationId, function(r) {
                                    var v;
                                    if (r.isAny(new EcEncryptedValue().getTypes())) {
                                        v = new EcEncryptedValue();
                                        v.copyFrom(r);
                                    } else {
                                        v = EcEncryptedValue.toEncryptedValue(r);
                                    }
                                    r = new EcAlignment();
                                    r.copyFrom(v.decryptIntoObject());
                                    EcEncryptedValue.encryptOnSave(r.id, false);
                                    me.repo.saveTo(r, done, done);
                                }, done);
                            }, function(relationIds) {
                            });
                        }
                    });
                }
            }
        }
    },
    methods: {
        onEditMultipleCompetencies: function() {
            this.showEditMultiple = true;
        },
        onCancelEditMultiple: function() {
            this.showEditMultiple = false;
        },
        onEditMultiple: function() {
            this.showEditMultiple = true;
        },
        onEditNode: function() {
            this.editingFramework = true;
        },
        onDoneEditingNode: function() {
            this.editingFramework = false;
        },
        onOpenComments: function() {
            this.showComments = true;
        },
        onCloseComments: function() {
            this.showComments = false;
        },
        onCloseShareModal: function() {
            this.showShareModal = false;
        },
        onOpenShareModal: function() {
            this.showShareModal = true;
        },
        selectedArrayEvent: function(ary) {
            this.selectedArray = ary;
        },
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
        exportFramework: function(exportType) {
            if (exportType === "asn") {
                this.exportAsn(this.frameworkExportLink);
            } else if (exportType === "jsonld") {
                this.exportJsonld(this.frameworkExportLink);
            } else if (exportType === "rdfQuads") {
                this.exportRdfQuads(this.frameworkExportLink);
            } else if (exportType === "rdfJson") {
                this.exportRdfJson(this.frameworkExportLink);
            } else if (exportType === "rdfXml") {
                this.exportRdfXml(this.frameworkExportLink);
            } else if (exportType === "turtle") {
                this.exportTurtle(this.frameworkExportLink);
            } else if (exportType === "ctdlasnJsonld") {
                this.exportCtdlasnJsonld(this.frameworkExportLink);
            } else if (exportType === "ctdlasnCsv") {
                this.exportCtdlasnCsv(this.frameworkExportLink);
            } else if (exportType === "csv") {
                this.exportCsv();
            } else if (exportType === "case") {
                this.exportCasePackages(guid);
            }
        },
        changeProperties: function(type) {
            this.properties = type;
        },
        encryptFramework: function(framework) {
            var f = new EcFramework();
            f.copyFrom(framework);
            f.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            f = EcEncryptedValue.toEncryptedValue(f);
            this.repo.saveTo(f, function() {}, console.error);
        },
        onSelectButtonClick: function(ids) {
            this.selectButton(ids);
        },
        onOpenExportModal() {
            let params = {};
            var me = this;
            console.log("options", typeof me.frameworkExportOptions);
            params = {
                type: "export",
                selectedExportOption: '',
                title: "Export Framework",
                exportOptions: me.frameworkExportOptions,
                text: "Select a file format to export your framework. Files download locally.",
                onConfirm: (e) => {
                    return me.exportFramework(e);
                }
            };
            // reveal modal
            this.$modal.show(params);
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/framework.scss';

</style>