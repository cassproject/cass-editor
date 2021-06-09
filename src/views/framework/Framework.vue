<template>
    <div
        ref="framework"
        id="framework">
        <main-layout
            :rightActive="showRightAside"
            :simple="true">
            <!-- begin framework -->
            <template slot="top">
                <FrameworkEditorToolbar
                    :properties="properties"
                    @show-export-modal="onOpenExportModal"
                    @change-properties="changeProperties" />
            </template>
            <template slot="body">
                <div
                    class="framework-content"
                    id="framework-content">
                    <div class="framework-body columns is-multiline is-gapless is-paddingless is-marginless">
                        <div class="column is-12">
                            <!-- loading section -- dummy content to show while loading dome elemnts -->
                            <div
                                class="container is-paddingless">
                                <draggable
                                    v-bind="dragOptions"
                                    v-model="frameworkDrag"
                                    tag="div"
                                    id="framework_drag"
                                    :disabled="canEdit !== true"
                                    :group="{ name: 'test' }"
                                    handle=".handle">
                                    <Component
                                        :class="[dynamicThingComponent === 'Thing' ? parentObjectClass: '']"
                                        :is="dynamicThingComponent"
                                        :id="'scroll-' + framework.shortId().split('/').pop()"
                                        :obj="framework"
                                        :repo="repo"
                                        :newFramework="newFramework"
                                        :parentNotEditable="queryParams.view==='true'"
                                        :profile="frameworkProfile"
                                        @remove-object="removeObject"
                                        @edit-node-event="onEditNode()"
                                        @done-editing-node-event="onDoneEditingNode()"
                                        :properties="properties">
                                        <template #frameworkDetails>
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
                                                    Created {{ $moment(framework['schema:dateCreated']).format("MMM D YYYY") }}
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
                                        </template>
                                    </Component>
                                </draggable>
                                <div
                                    class="section"
                                    v-if="!hierarchyIsdoneLoading">
                                    <ul class="processing-list">
                                        <li />
                                        <li />
                                        <ul>
                                            <li />
                                            <li />
                                            <li />
                                            <ul>
                                                <li />
                                                <li />
                                                <li />
                                                <ul>
                                                    <li />
                                                    <li />
                                                </ul>
                                            </ul>
                                        </ul>
                                        <li />
                                        <li />
                                        <ul>
                                            <li />
                                            <li />
                                        </ul>
                                    </ul>
                                </div>
                                <Hierarchy
                                    :class="{'is-hidden': !hierarchyIsdoneLoading}"
                                    :container="framework"
                                    :scrolled="scrolled"
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
                                    :highlightList="highlightCompetency"
                                    :profile="competencyProfile"
                                    :newFramework="newFramework"
                                    @edit-multiple-event="onEditMultiple"
                                    @remove-object="removeObject"
                                    @search-things="handleSearch($event)"
                                    @select-button-click="onSelectButtonClick"
                                    :properties="properties"
                                    @selected-array="selectedArrayEvent"
                                    @done-loading-nodes="preloadRelations" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="right">
                <RightAside v-if="showRightAside" />
            </template>
            <div
                v-if="scrolled"
                class="extra-space-for-scroll" />
        </main-layout>
    </div>
</template>
<script>
import MainLayout from '@/layouts/MainLayout.vue';
import common from '@/mixins/common.js';
import getLevelsAndRelations from '@/mixins/getLevelsAndRelations.js';
import competencyEdits from '@/mixins/competencyEdits.js';
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';
import t3Profile from '@/mixins/t3Profile.js';
import tlaProfile from '@/mixins/tlaProfile.js';
import debounce from 'lodash/debounce';

export default {
    name: "Framework",
    props: {
        profileOverride: Object
    },
    components: {
        MainLayout,
        FrameworkButtons: () => import('@/components/FrameworkButtons.vue'),
        Hierarchy: () => import('@/lode/components/Hierarchy.vue'),
        Thing: () => import('@/lode/components/Thing.vue'),
        ThingEditing: () => import('@/lode/components/ThingEditing.vue'),
        FrameworkEditorToolbar: () => import('@/components/framework/EditorToolbar.vue'),
        RightAside: () => import('@/components/framework/RightAside.vue'),
        draggable: () => import('vuedraggable')
    },
    mixins: [common, competencyEdits, ctdlasnProfile, t3Profile, tlaProfile, getLevelsAndRelations],
    data: function() {
        return {
            ulListClass: '',
            scrolled: false,
            hierarchyIsdoneLoading: false,
            parentObjectClass: 'parent-object',
            showVersionHistory: false,
            showEditMultiple: false,
            showClipboardSuccessModal: false,
            showComments: false,
            repo: window.repo,
            highlightCompetency: null,
            editingFramework: false,
            properties: "primary",
            config: null,
            selectedArray: [],
            configSetOnFramework: false,
            gotInitialLevelsRelationsAndAlignments: false,
            dragOptions: {
                scroll: true,
                delay: 0,
                swapThreshold: 0.25,
                emptyInsertThreshold: 4,
                invertedSwapThreshold: 0.25,
                invertSwap: true,
                disabled: false,
                animation: 0,
                ghostClass: 'ghost-drag',
                chosenClass: 'chosen-drag',
                dragClass: 'drag',
                scrollSensitivity: 30,
                scrollSpeed: 5,
                forceFallback: true
            },
            frameworkDrag: [],
            configHasAlignments: false,
            configHasLevels: false
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
            if (this.editingFramework || (this.framework && this.$store.getters['editor/newFramework'] === this.framework.shortId())) {
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
                return this.$moment(this.timestamp).format("MMM D YYYY");
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
                    "isRequired": "true",
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
                "headings": ["General", "Keys"],
                "primaryProperties": [
                    "http://schema.org/name",
                    "http://schema.org/description"
                ],
                "secondaryProperties": ["@id"],
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
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.configHasLevels = true;
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
                var relationshipsHeading = null;
                if (this.config.relationshipConfig) {
                    var keys = EcObject.keys(this.config.relationshipConfig);
                    var relationshipsPriority;
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
                if (this.config.alignConfig) {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.configHasAlignments = true;
                    var keys = EcObject.keys(this.config.alignConfig);
                    for (let i = 0; i < this.config.alignConfig.length; i++) {
                        let key = this.config.alignConfig[i] + " (resource)";
                        let me = this;
                        profile["tertiaryProperties"].push(key);
                        profile[key] = {};
                        profile[key]["@id"] = key;
                        profile[key]["@type"] = ["http://www.w3.org/2000/01/rdf-schema#Property"];
                        profile[key]["http://schema.org/rangeIncludes"] = [{"@id": "http://schema.org/URL"}];
                        profile[key]["http://www.w3.org/2000/01/rdf-schema#label"] = [{"@language": "en", "@value": key}];
                        profile[key]["http://www.w3.org/2000/01/rdf-schema#comment"] = [{"@language": "en", "@value": key}];
                        profile[key]["valuesIndexed"] = function() { return me.alignments[key]; };
                        profile[key]["remove"] = function(competency, id) { return me.removeResourceAlignment(id); };
                        profile[key]["add"] = function(selectedCompetencyId, values) { return me.addResourceAlignments(selectedCompetencyId, key, values); };
                        profile[key]["save"] = function() {};
                        profile[key]["update"] = function(value) { return me.updateResourceAlignments(key, value); };
                        if (relationshipsHeading) {
                            profile[key]["heading"] = relationshipsHeading;
                        }
                        profile[key]["resource"] = true;
                    }
                }
                return profile;
            }
            if (this.profileOverride) {
                return this.profileOverride;
            } else {
                var me = this;
                return {
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
                        "isRequired": "true",
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
                    "headings": ["General", "Connections", "Keys"],
                    "primaryProperties": [
                        "http://schema.org/name",
                        "http://schema.org/description"
                    ],
                    "secondaryProperties": [
                        "@id",
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
            return this.$store.getters['editor/framework'] ? this.$store.getters['editor/framework'].configuration : null;
        },
        canEdit: function() {
            if (this.queryParams.view === 'true') {
                return false;
            }
            return this.framework.canEditAny(EcIdentityManager.getMyPks());
        }
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
        }
        this.$store.commit('app/objForShareModal', this.object);
        let documentBody = document.getElementsByClassName('cass--main-layout--body')[0];
        documentBody.addEventListener('scroll', debounce(this.scrollFunction, 20, {'immediate': true}));
        if (!this.framework.competency || this.framework.competency.length === 0) {
            this.hierarchyIsdoneLoading = true;
        }
    },
    beforeDestroy() {
        if (this.queryParams && this.queryParams.private !== 'true') {
            this.$store.commit('editor/private', false);
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
        },
        frameworkDrag: function() {
            if (this.frameworkDrag.length > 0) {
                let id = EcRemoteLinkedData.trimVersionFromUrl(this.frameworkDrag[0].obj.id);
                this.moveToTopLevel(id);
                this.frameworkDrag = [];
            }
        },
        configHasLevels: function() {
            this.gotInitialLevelsRelationsAndAlignments = false;
            this.preloadRelations();
        }
    },
    methods: {
        handleDoneLoading: function() {
            appLog("done loading");
            this.hierarchyIsdoneLoading = true;
        },
        scrollFunction(e) {
            let documentObject = document.getElementsByClassName('parent-object');
            let scrollValue = e.target.scrollTop;
            if (scrollValue > 0) {
                this.parentObjectClass = 'parent-object scrolled';
                this.scrolled = true;
            } else {
                this.parentObjectClass = 'parent-object';
                this.scrolled = false;
            }
        },
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
        changeProperties: function(type) {
            this.properties = type;
        },
        onSelectButtonClick: function(ids) {
            this.selectButton(ids);
        },
        onOpenExportModal() {
            this.$store.commit('editor/setItemToExport', this.framework);
            this.$store.commit('app/showModal', {title: 'Export Framework', component: 'ExportOptionsModal'});
        },
        // Speed up load of secondary properties
        preloadRelations: function() {
            this.handleDoneLoading();
            if (!this.gotInitialLevelsRelationsAndAlignments) {
                if (this.configHasLevels) {
                    this.updateLevels();
                }
                this.updateRelations();
                if (this.configHasAlignments) {
                    this.updateAlignments();
                }
                this.gotInitialLevelsRelationsAndAlignments = true;
            }
        },
        addResourceAlignments: function(selectedCompetencyId, alignmentType, values) {
            let me = this;
            alignmentType = alignmentType.substring(0, alignmentType.indexOf(' '));
            for (let i = 0; i < values.length; i++) {
                let c = new CreativeWork();
                c.generateId(this.repo.selectedServer);
                c.name = values[i]["name"];
                c.url = values[i]["@value"];
                c.educationalAlignment = new AlignmentObject();
                c.educationalAlignment.targetUrl = selectedCompetencyId;
                c.educationalAlignment.alignmentType = alignmentType;
                if (EcIdentityManager.ids.length > 0) {
                    c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                this.repo.saveTo(c, function() {
                    let edits = [{operation: "addNew", id: c.shortId()}];
                    me.$store.commit('editor/addEditsToUndo', edits);
                    me.$store.commit('editor/refreshAlignments', true);
                }, appError);
            }
        },
        updateResourceAlignments: function(alignmentType, value) {
            let me = this;
            if (value["name"] && value["@value"]) {
                var c = EcRepository.getBlocking(value["@id"]);
                let initialName = c.name;
                let initialUrl = c.url;
                c.name = value["name"];
                c.url = value["@value"];
                this.repo.saveTo(c, function() {
                    let edits = [{operation: "update", id: c.shortId(), fieldChanged: ["name", "url"], initialValue: [initialName, initialUrl], changedValue: [c.name, c.url]}];
                    me.$store.commit('editor/addEditsToUndo', edits);
                    me.$store.commit('editor/refreshAlignments', true);
                }, appError);
            }
        },
        removeResourceAlignment: function(resourceId) {
            let c = EcRepository.getBlocking(resourceId);
            let me = this;
            this.repo.deleteRegistered(c, function() {
                me.$store.commit('editor/addEditsToUndo', [{operation: "delete", obj: c}]);
                me.$store.commit('editor/refreshAlignments', true);
            }, appError);
        },
        moveToTopLevel: function(id) {
            var me = this;
            for (var i = 0; i < this.framework.relation.length; i++) {
                var a = EcAlignment.getBlocking(this.framework.relation[i]);
                if (a == null) { continue; }
                if (a.relationType === "narrows") {
                    if (a.target == null) continue;
                    if (a.source == null) continue;
                    if (a.source !== id) continue;
                    appLog("Identified edge to remove: ", JSON.parse(a.toJson()));
                    this.framework.relation.splice(i--, 1);
                }
                repo.saveTo(this.framework, function() {
                    me.once = true;
                }, function() {});
            }
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/framework.scss';

</style>