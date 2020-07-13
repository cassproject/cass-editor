<template>
    <div id="framework">
        <RightAside v-if="showRightAside" />
        <!-- begin framework -->
        <div class="framework-content">
            <div class="framework-body columns is-multiline is-gapless is-paddingless is-marginless">
                <FrameworkEditorToolbar
                    @showExportModal="onOpenExportModal"
                    @changeProperties="changeProperties"
                    :selectedArray="selectedArray" />
                <div class="column is-12">
                    <div class="container">
                        <Component
                            :is="dynamicThingComponent"
                            :id="'scroll-' + framework.shortId().split('/').pop()"
                            :obj="framework"
                            :repo="repo"
                            :newFramework="newFramework"
                            :parentNotEditable="queryParams.view==='true'"
                            :profile="frameworkProfile"
                            @deleteObject="deleteObject"
                            @removeObject="removeObject"
                            @editNodeEvent="onEditNode()"
                            @doneEditingNodeEvent="onDoneEditingNode()"
                            :properties="properties">
                            <div class="lode__framework__info-bar">
                                <span
                                    class="tag is-medium-grey has-text-dark"
                                    v-if="framework.competency && framework.competency.length == 1">
                                    {{ framework.competency.length }} item
                                </span>
                                <span
                                    class="tag is-medium-grey has-text-dark"
                                    v-else-if="framework.competency && framework.competency.length > 1">
                                    {{ framework.competency.length }} items
                                </span>
                                <span
                                    class="tag is-medium-grey has-text-dark"
                                    v-if="timestamp"
                                    :title="new Date(timestamp)">
                                    Last modified {{ lastModified }}
                                </span>
                                <span
                                    class="tag is-medium-grey has-text-dark"
                                    v-if="framework['schema:dateCreated']"
                                    :title="new Date(framework['schema:dateCreated'])">
                                    Created {{ $moment(framework['schema:dateCreated']).fromNow() }}
                                </span>
                                <span
                                    class="tag is-medium-grey has-text-dark"
                                    v-if="framework['Approved']"
                                    :title="framework['Approved']">
                                    Approved
                                </span>
                                <span
                                    class="tag is-medium-grey has-text-dark"
                                    v-if="framework['Published']"
                                    :title="framework['Published']">Published</span>
                            </div>
                        </Component>
                    </div>
                </div>
                <div class="column is-12">
                    <div class="container">
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
                            :exportOptions="competencyExportOptions"
                            :highlightList="highlightCompetency"
                            :profile="competencyProfile"
                            :newFramework="newFramework"
                            @deleteObject="deleteObject"
                            @editMultipleEvent="onEditMultiple"
                            @removeObject="removeObject"
                            @exportObject="exportObject"
                            @searchThings="handleSearch($event)"
                            @selectButtonClick="onSelectButtonClick"
                            :properties="properties"
                            @selectedArray="selectedArrayEvent"
                            @doneLoadingNodes="preloadRelations" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '@/mixins/common.js';
import getLevelsAndRelations from '@/mixins/getLevelsAndRelations.js';
import exports from '@/mixins/exports.js';
import competencyEdits from '@/mixins/competencyEdits.js';
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';
import t3Profile from '@/mixins/t3Profile.js';
import tlaProfile from '@/mixins/tlaProfile.js';
import saveAs from 'file-saver';

export default {
    name: "Framework",
    props: {
        profileOverride: Object
    },
    mixins: [common, exports, competencyEdits, ctdlasnProfile, t3Profile, tlaProfile, getLevelsAndRelations],
    data: function() {
        return {
            showVersionHistory: false,
            showEditMultiple: false,
            showClipboardSuccessModal: false,
            showComments: false,
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
            selectedArray: [],
            configSetOnFramework: false
        };
    },
    computed: {
        newFramework: function() {
            return this.$store.getters['editor/newFramework'] === this.framework.shortId();
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        showRightAside: function() {
            return this.$store.getters['app/showRightAside'];
        },
        dynamicThingComponent: function() {
            if (this.editingFramework || (this.$store.getters['editor/newFramework'] === this.framework.shortId())) {
                return 'ThingEditing';
            } else {
                return 'Thing';
            }
        },
        framework: function() {
            return this.$store.getters['editor/framework'];
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
            if (this.framework) {
                return this.framework.shortId();
            } else {
                return null;
            }
        },
        loggedIn: function() {
            if (EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
                return true;
            }
            return false;
        },
        commentScrollTo: function() {
            return this.$store.getters['editor/commentScrollTo'];
        },
        frameworkProfile: function() {
            if (this.$store.state.editor.t3Profile === true) {
                return this.t3FrameworkProfile;
            }
            if (this.queryParams.ceasnDataFields === "true" && ((this.config && !this.configSetOnFramework) || !this.config)) {
                return this.ctdlAsnFrameworkProfile;
            }
            if (this.queryParams.tlaProfile === "true" && ((this.config && !this.configSetOnFramework) || !this.config)) {
                return this.tlaFrameworkProfile;
            }
            if (this.config) {
                return this.config.frameworkConfig;
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
                "headings": ["Keys", "General"],
                "primaryProperties": [
                    "@id",
                    "http://schema.org/name",
                    "http://schema.org/description"
                ],
                "secondaryProperties": [],
                "tertiaryProperties": []
            };
        },
        competencyProfile: function() {
            if (this.$store.state.editor.t3Profile === true) {
                return this.t3CompetencyProfile;
            }
            if (this.queryParams.ceasnDataFields === "true" && ((this.config && !this.configSetOnFramework) || !this.config)) {
                return this.ctdlAsnCompetencyProfile;
            }
            if (this.queryParams.tlaProfile === "true" && ((this.config && !this.configSetOnFramework) || !this.config)) {
                return this.tlaCompetencyProfile;
            }
            if (this.config) {
                var profile = JSON.parse(JSON.stringify(this.config.competencyConfig));
                var compKeys = EcObject.keys(profile);
                for (var i = 0; i < compKeys.length; i++) {
                    let key = compKeys[i];
                    if (profile[key] && profile[key]["http://schema.org/rangeIncludes"] && profile[key]["http://schema.org/rangeIncludes"][0]["@id"] === "https://schema.cassproject.org/0.4/skos/Concept") {
                        profile[key]["noTextEditing"] = 'true';
                    }
                }
                if (this.config.levelsConfig) {
                    var me = this;
                    var key = EcObject.keys(this.config.levelsConfig);
                    key = key[0];
                    profile.secondaryProperties.push(key);
                    profile[key] = JSON.parse(JSON.stringify(this.config.levelsConfig[key]));
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
                    var relationshipsPriority;
                    var relationshipsHeading = null;
                    if (profile["relationshipsPriority"] && profile["relationshipsPriority"].length > 0) {
                        relationshipsPriority = profile["relationshipsPriority"] + "Properties";
                    } else {
                        relationshipsPriority = "secondaryProperties";
                    }
                    if (profile["relationshipsHeading"] && profile["relationshipsHeading"].length > 0) {
                        if (profile["headings"] && !EcArray.has(profile["headings"], profile["relationshipsHeading"])) {
                            profile["headings"].push(profile["relationshipsHeading"]);
                        }
                        relationshipsHeading = profile["relationshipsHeading"];
                    }
                    for (var i = 0; i < keys.length; i++) {
                        let key = keys[i];
                        var me = this;
                        profile[relationshipsPriority].push(key);
                        profile[key] = JSON.parse(JSON.stringify(this.config.relationshipConfig[key]));
                        profile[key]["http://schema.org/rangeIncludes"] = [{"@id": "https://schema.cassproject.org/0.4/Competency"}];
                        profile[key]["valuesIndexed"] = function() { return me.relations[key]; };
                        profile[key]["noTextEditing"] = 'true';
                        profile[key]["remove"] = function(source, target) { me.removeRelationFromFramework(source, key, target); };
                        profile[key]["add"] = function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, key, values); };
                        profile[key]["save"] = function() {};
                        if (relationshipsHeading) {
                            profile[key]["heading"] = relationshipsHeading;
                        }
                    }
                }
                return profile;
            }
            if (this.profileOverride) {
                return this.profileOverride;
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
                        "valuesIndexed": function() { return me.relations["narrows"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "narrows", values); },
                        "save": function() {},
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "narrows", target); },
                        "heading": "Connections"
                    },
                    "broadens": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Covers other relevant competencies not found in this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Broadens"}],
                        "valuesIndexed": function() { return me.relations["broadens"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "broadens", values); },
                        "save": function() {},
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "broadens", target); },
                        "heading": "Connections"
                    },
                    "isEquivalentTo": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Represents same capability in all aspects to another competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Equivalent To"}],
                        "valuesIndexed": function() { return me.relations["isEquivalentTo"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values); },
                        "save": function() {},
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isEquivalentTo", target); },
                        "heading": "Connections"
                    },
                    "requires": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Another competency is prerequisite for this."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Requires"}],
                        "valuesIndexed": function() { return me.relations["requires"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "requires", values); },
                        "save": function() {},
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "requires", target); },
                        "heading": "Connections"
                    },
                    "isEnabledBy": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A recommended option that speeds up acquisition of this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Enabled By"}],
                        "valuesIndexed": function() { return me.relations["isEnabledBy"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEnabledBy", values); },
                        "save": function() {},
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isEnabledBy", target); },
                        "heading": "Connections"
                    },
                    "isRelatedTo": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "This competency has some degree of overlap with another."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Related To"}],
                        "valuesIndexed": function() { return me.relations["isRelatedTo"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isRelatedTo", values); },
                        "save": function() {},
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "isRelatedTo", target); },
                        "heading": "Connections"
                    },
                    "desires": {
                        "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                        "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Recommended, assumed, or expected competency not essential to acquisition of this competency."}],
                        "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Desires"}],
                        "valuesIndexed": function() { return me.relations["desires"]; },
                        "noTextEditing": "true",
                        "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "desires", values); },
                        "save": function() {},
                        "remove": function(source, target) { me.removeRelationFromFramework(source, "desires", target); },
                        "heading": "Connections"
                    },
                    "headings": ["Keys", "General", "Connections"],
                    "primaryProperties": [
                        "@id",
                        "http://schema.org/name",
                        "http://schema.org/description"
                    ],
                    "secondaryProperties": [
                        "https://schema.cassproject.org/0.4/scope",
                        "https://schema.cassproject.org/0.4/Level"
                    ],
                    "tertiaryProperties": [
                        "narrows",
                        "broadens",
                        "isEquivalentTo",
                        "requires",
                        "isEnabledBy",
                        "isRelatedTo",
                        "desires"
                    ]
                };
            }
        },
        defaultFrameworkConfiguration: function() {
            return this.$store.getters['editor/framework'].configuration;
        }
    },
    components: {
        Hierarchy: () => import('@/lode/components/lode/Hierarchy.vue'),
        Thing: () => import('@/lode/components/lode/Thing.vue'),
        ThingEditing: () => import('@/lode/components/lode/ThingEditing.vue'),
        FrameworkEditorToolbar: () => import('@/components/framework/EditorToolbar.vue'),
        RightAside: () => import('@/components/framework/RightAside.vue')
    },
    created: function() {
        // Set configuration create() happens before mount, make sure framework exists in case
        // the page was being refreshed and no longer exists.
        if (this.framework !== null) {
            this.getConfiguration();
            this.refreshPage();
            this.spitEvent('viewChanged');
        }
    },
    mounted: function() {
        if (!this.framework) {
            this.$router.push({name: "frameworks"});
        } else {
            this.updateLevels();
            this.updateRelations();
        }
    },
    watch: {
        shortId: function() {
            this.refreshPage();
        },
        config: function() {
            this.$store.commit('editor/configuration', this.config);
        },
        commentScrollTo: function() {
            this.$scrollTo(this.commentScrollTo.scrollId);
        },
        defaultFrameworkConfiguration: function() {
            this.getConfiguration();
        }
    },
    methods: {
        handleSearch: function(e) {
            this.$store.commit('app/showModal', e);
        },
        getConfiguration: function() {
            var me = this;
            if (this.framework.configuration) {
                var c = EcRepository.getBlocking(this.framework.configuration);
                appLog("c is: ", c);
                if (c) {
                    appLog("c is: ", c);
                    this.config = c;
                    this.configSetOnFramework = true;
                }
                appLog("c is: ", c);
            }
            if (!this.config && localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")) {
                // If no framework configuration, use browser default
                var c = EcRepository.getBlocking(localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId"));
                if (c) {
                    this.config = c;
                }
            }
            if (!this.config) {
                this.repo.searchWithParams("@type:Configuration", {'size': 10000}, function(c) {
                    if (c.isDefault === "true") {
                        me.config = c;
                    }
                }, function() {}, function() {});
            }
        },
        onCancelEditMultiple: function() {
            this.showEditMultiple = false;
        },
        onEditMultiple: function() {
            this.showEditMultiple = true;
            var payload = {
                profile: this.competencyProfile,
                selectedCompetencies: this.selectedArray,
                component: 'MultiEdit'
            };
            this.$store.commit('app/showModal', payload);
        },
        onEditNode: function() {
            this.editingFramework = true;
        },
        onDoneEditingNode: function() {
            this.$store.commit('editor/framework', EcRepository.getBlocking(this.framework.shortId()));
            this.$store.commit('editor/newFramework', null);
            this.editingFramework = false;
        },
        onOpenComments: function() {
            this.showComments = true;
        },
        onCloseComments: function() {
            this.showComments = false;
        },
        selectedArrayEvent: function(ary) {
            this.selectedArray = ary;
        },
        refreshPage: function() {
            if (!this.framework) {
                appLog("no framework to refresh");
                return;
            }
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
                this.exportCasePackages(this.frameworkExportGuid);
            }
        },
        changeProperties: function(type) {
            this.properties = type;
        },
        onSelectButtonClick: function(ids) {
            this.selectButton(ids);
        },
        onOpenExportModal() {
            let params = {};
            var me = this;
            appLog("options", typeof me.frameworkExportOptions);
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
        },
        // Speed up load of secondary properties
        preloadRelations: function() {
            var relation = this.relations;
            var level = this.levels;
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/framework.scss';

</style>