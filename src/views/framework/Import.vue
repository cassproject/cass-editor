<!--Import.vue is a wrapper for our import tool
    Components:
        ImportDetails.vue
        If part of the import workflow,
        this component is used as a first step after successful
        framework detection to display minimum information for
        acceptance of an import. This display can be skipped
        by setting the importTranistion to preview rather than
        detail after import.

        Each import type text, url, server, and file has it's own
        section with a unique component and template that contains the
        hierarchy objects from output.

        ImportTabs.vue
        the container for import options,
        currently contains file, server, text, and  remote server

        Hierarchy.vue
        Component (Thing/ThingEditing)
-->
<template>
    <div
        id="import"
        class="has-background-white">
        <!--- main body section -->
        <!-- top section import information -->
        <div class="container is-fluid import-container">
            <!-- import file -->
            <ImportFile
                :importFile="importFile"
                :conceptMode="conceptMode"
                :importTransition="importTransition"
                v-if="importType === 'file'">
                <template slot="import-file-title">
                    <h1
                        class="title is-size-1 has-text-black">
                        <span v-if="conceptMode && queryParams.ceasnDataFields === 'true'">
                            Import a concept scheme
                        </span>
                        <span v-else-if="conceptMode">
                            Import a taxonomy
                        </span>
                        <span v-else>Import a framework</span>
                    </h1>
                    <h2 class="subtitle">
                        Import from file
                    </h2>
                </template>
                <!-- import from file gets three parts, details, preview, and light view -->
                <template slot="import-framework">
                    <!-- import details -->
                    <ImportDetails
                        :detailsDetected="detailsDetected"
                        v-if="importTransition === 'detail'"
                        @deleteObject="deleteObject" />
                    <!-- import preview -->
                    <div
                        v-if="importFramework && importTransition === 'preview'"
                        class="import-preview">
                        <!-- loading section -- dummy content to show while loading dome elemnts -->
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
                                </ul>
                                <li />
                                <li />
                                <ul>
                                    <li />
                                    <li />
                                </ul>
                            </ul>
                        </div>
                        <Component
                            :is="dynamicThing"
                            @editNodeEvent="onEditNode"
                            @doneEditingNodeEvent="onDoneEditingNode"
                            :class="[{'is-hidden': !hierarchyIsdoneLoading}, parentObjectClass]"
                            :obj="changedObj ? changedObj : importFramework"
                            :repo="repo"
                            class="framework-title"
                            :profile="containerProfile"
                            properties="tertiary" />
                        <Hierarchy
                            :class="{'is-hidden': !hierarchyIsdoneLoading}"
                            view="importPreview"
                            v-if="importFramework && !conceptMode"
                            @doneLoadingNodes="handleDoneLoading"
                            @searchThings="handleSearch($event)"
                            @editMultipleEvent="onEditMultiple"
                            :container="importFramework"
                            containerType="Framework"
                            containerNodeProperty="competency"
                            containerEdgeProperty="relation"
                            nodeType="EcCompetency"
                            :profile="hierarchyProfile"
                            :viewOnly="false"
                            :isDraggable="true"
                            edgeType="EcAlignment"
                            edgeRelationProperty="relationType"
                            edgeRelationLiteral="narrows"
                            edgeSourceProperty="source"
                            edgeTargetProperty="target"
                            :repo="repo"
                            @selectedArray="selectedArrayEvent"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            @exportObject="exportObject"
                            :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                        <ConceptHierarchy
                            :class="{'is-hidden': !hierarchyIsdoneLoading}"
                            view="import"
                            v-if="importFramework && conceptMode"
                            @doneLoadingNodes="handleDoneLoading"
                            @searchThings="handleSearch($event)"
                            @editMultipleEvent="onEditMultiple"
                            :container="importFramework"
                            containerType="ConceptScheme"
                            :viewOnly="false"
                            :isDraggable="true"
                            :repo="repo"
                            @selectedArray="selectedArrayEvent"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            :profile="ctdlAsnConceptProfile"
                            properties="tertiary" />
                    </div>
                    <!-- import light view -->
                    <div
                        v-else-if="importFramework && importTransition === 'light'"
                        class="import-light">
                        <Component
                            :is="dynamicThing"
                            :class="parentObjectClass"
                            :editingNode="editingNode"
                            @doneEditingNodeEvent="onDoneEditingNode"
                            :obj="changedObj ? changedObj : importFramework"
                            :parentNotEditable="true"
                            class="framework-title"
                            :profile="containerProfile"
                            properties="tertiary" />
                        <Hierarchy
                            v-if="importFramework && !conceptMode"
                            view="importLight"
                            :container="importFramework"
                            containerType="Framework"
                            containerNodeProperty="competency"
                            containerEdgeProperty="relation"
                            nodeType="EcCompetency"
                            :profile="hierarchyProfile"
                            :editable="false"
                            :viewOnly="true"
                            edgeType="EcAlignment"
                            edgeRelationProperty="relationType"
                            edgeRelationLiteral="narrows"
                            edgeSourceProperty="source"
                            edgeTargetProperty="target"
                            :repo="repo"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            @exportObject="exportObject"
                            :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                        <ConceptHierarchy
                            :class="{'is-hidden': !hierarchyIsdoneLoading}"
                            view="import"
                            v-if="importFramework && conceptMode"
                            :container="importFramework"
                            containerType="ConceptScheme"
                            :viewOnly="true"
                            :repo="repo"
                            @selectedArray="selectedArrayEvent"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            :profile="ctdlAsnConceptProfile"
                            properties="tertiary" />
                    </div>
                </template>
            </ImportFile>
            <!-- import from server -->
            <ImportServer
                :conceptMode="conceptMode"
                :importTransition="importTransition"
                @importCase="handleImportFromTabs($event)"
                v-if="importType === 'server'">
                <template slot="import-server-title">
                    <h1
                        class="title is-size-1 has-text-black">
                        <span v-if="conceptMode && queryParams.ceasnDataFields === 'true'">
                            Import a concept scheme
                        </span>
                        <span v-else-if="conceptMode">
                            Import a taxonomy
                        </span>
                        <span v-else>Import a framework</span>
                    </h1>
                    <h2 class="subtitle">
                        Import from remote server
                    </h2>
                </template>
                <template slot="import-framework">
                    <!-- import preview -->
                    <div
                        v-if="importFramework && importTransition === 'preview'"
                        class="import-preview">
                        <!-- loading section -- dummy content to show while loading dome elemnts -->
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
                                </ul>
                                <li />
                                <li />
                                <ul>
                                    <li />
                                    <li />
                                </ul>
                            </ul>
                        </div>
                        <Component
                            :is="dynamicThing"
                            @editNodeEvent="onEditNode"
                            @doneEditingNodeEvent="onDoneEditingNode"
                            :class="[{'is-hidden': !hierarchyIsdoneLoading}, parentObjectClass]"
                            :obj="changedObj ? changedObj : importFramework"
                            :repo="repo"
                            class="framework-title"
                            :profile="containerProfile"
                            properties="tertiary" />
                        <Hierarchy
                            :class="{'is-hidden': !hierarchyIsdoneLoading}"
                            view="importPreview"
                            v-if="importFramework && !conceptMode"
                            @doneLoadingNodes="handleDoneLoading"
                            @searchThings="handleSearch($event)"
                            @editMultipleEvent="onEditMultiple"
                            :container="importFramework"
                            containerType="Framework"
                            containerNodeProperty="competency"
                            containerEdgeProperty="relation"
                            nodeType="EcCompetency"
                            :profile="hierarchyProfile"
                            :viewOnly="false"
                            :isDraggable="true"
                            edgeType="EcAlignment"
                            edgeRelationProperty="relationType"
                            edgeRelationLiteral="narrows"
                            edgeSourceProperty="source"
                            edgeTargetProperty="target"
                            :repo="repo"
                            @selectedArray="selectedArrayEvent"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            @exportObject="exportObject"
                            :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                        <ConceptHierarchy
                            :class="{'is-hidden': !hierarchyIsdoneLoading}"
                            view="import"
                            v-if="importFramework && conceptMode"
                            @doneLoadingNodes="handleDoneLoading"
                            @searchThings="handleSearch($event)"
                            @editMultipleEvent="onEditMultiple"
                            :container="importFramework"
                            containerType="ConceptScheme"
                            :viewOnly="false"
                            :isDraggable="true"
                            :repo="repo"
                            @selectedArray="selectedArrayEvent"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            :profile="ctdlAsnConceptProfile"
                            properties="tertiary" />
                    </div>
                    <!-- import light view -->
                    <div
                        v-else-if="importFramework && importTransition === 'light'"
                        class="import-light">
                        <Component
                            :is="dynamicThing"
                            :class="parentObjectClass"
                            :editingNode="editingNode"
                            @doneEditingNodeEvent="onDoneEditingNode"
                            :obj="changedObj ? changedObj : importFramework"
                            :parentNotEditable="true"
                            class="framework-title"
                            :profile="containerProfile"
                            properties="tertiary" />
                        <Hierarchy
                            v-if="importFramework && !conceptMode"
                            view="importLight"
                            :container="importFramework"
                            containerType="Framework"
                            containerNodeProperty="competency"
                            containerEdgeProperty="relation"
                            nodeType="EcCompetency"
                            :profile="hierarchyProfile"
                            :editable="false"
                            :viewOnly="true"
                            edgeType="EcAlignment"
                            edgeRelationProperty="relationType"
                            edgeRelationLiteral="narrows"
                            edgeSourceProperty="source"
                            edgeTargetProperty="target"
                            :repo="repo"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            @exportObject="exportObject"
                            :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                        <ConceptHierarchy
                            :class="{'is-hidden': !hierarchyIsdoneLoading}"
                            view="import"
                            v-if="importFramework && conceptMode"
                            :container="importFramework"
                            containerType="ConceptScheme"
                            :viewOnly="true"
                            :repo="repo"
                            @selectedArray="selectedArrayEvent"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            :profile="ctdlAsnConceptProfile"
                            properties="tertiary" />
                    </div>
                </template>
            </ImportServer>
            <ImportUrl
                :conceptMode="conceptMode"
                :importTransition="importTransition"
                v-if="importType === 'url'">
                <template slot="import-url-title">
                    <h1
                        class="title is-size-1 has-text-black">
                        <span v-if="conceptMode && queryParams.ceasnDataFields === 'true'">
                            Import a concept scheme
                        </span>
                        <span v-else-if="conceptMode">
                            Import a taxonomy
                        </span>
                        <span v-else>Import from a URL source</span>
                    </h1>
                    <h2 class="subtitle">
                        Import from URL source
                    </h2>
                </template>
                <template slot="import-framework">
                    <!-- import preview -->
                    <div
                        v-if="importFramework && importTransition === 'preview'"
                        class="import-preview">
                        <!-- loading section -- dummy content to show while loading dome elemnts -->
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
                                </ul>
                                <li />
                                <li />
                                <ul>
                                    <li />
                                    <li />
                                </ul>
                            </ul>
                        </div>
                        <Component
                            :is="dynamicThing"
                            @editNodeEvent="onEditNode"
                            @doneEditingNodeEvent="onDoneEditingNode"
                            :class="[{'is-hidden': !hierarchyIsdoneLoading}, parentObjectClass]"
                            :obj="changedObj ? changedObj : importFramework"
                            :repo="repo"
                            class="framework-title"
                            :profile="containerProfile"
                            properties="tertiary" />
                        <Hierarchy
                            :class="{'is-hidden': !hierarchyIsdoneLoading}"
                            view="importPreview"
                            v-if="importFramework && !conceptMode"
                            @doneLoadingNodes="handleDoneLoading"
                            @searchThings="handleSearch($event)"
                            @editMultipleEvent="onEditMultiple"
                            :container="importFramework"
                            containerType="Framework"
                            containerNodeProperty="competency"
                            containerEdgeProperty="relation"
                            nodeType="EcCompetency"
                            :profile="hierarchyProfile"
                            :viewOnly="false"
                            :isDraggable="true"
                            edgeType="EcAlignment"
                            edgeRelationProperty="relationType"
                            edgeRelationLiteral="narrows"
                            edgeSourceProperty="source"
                            edgeTargetProperty="target"
                            :repo="repo"
                            @selectedArray="selectedArrayEvent"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            @exportObject="exportObject"
                            :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                        <ConceptHierarchy
                            :class="{'is-hidden': !hierarchyIsdoneLoading}"
                            view="import"
                            v-if="importFramework && conceptMode"
                            @doneLoadingNodes="handleDoneLoading"
                            @searchThings="handleSearch($event)"
                            @editMultipleEvent="onEditMultiple"
                            :container="importFramework"
                            containerType="ConceptScheme"
                            :viewOnly="false"
                            :isDraggable="true"
                            :repo="repo"
                            @selectedArray="selectedArrayEvent"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            :profile="ctdlAsnConceptProfile"
                            properties="tertiary" />
                    </div>
                    <!-- import light view -->
                    <div
                        v-else-if="importFramework && importTransition === 'light'"
                        class="import-light">
                        <Component
                            :is="dynamicThing"
                            :class="parentObjectClass"
                            :editingNode="editingNode"
                            @doneEditingNodeEvent="onDoneEditingNode"
                            :obj="changedObj ? changedObj : importFramework"
                            :parentNotEditable="true"
                            class="framework-title"
                            :profile="containerProfile"
                            properties="tertiary" />
                        <Hierarchy
                            v-if="importFramework && !conceptMode"
                            view="importLight"
                            :container="importFramework"
                            containerType="Framework"
                            containerNodeProperty="competency"
                            containerEdgeProperty="relation"
                            nodeType="EcCompetency"
                            :profile="hierarchyProfile"
                            :editable="false"
                            :viewOnly="true"
                            edgeType="EcAlignment"
                            edgeRelationProperty="relationType"
                            edgeRelationLiteral="narrows"
                            edgeSourceProperty="source"
                            edgeTargetProperty="target"
                            :repo="repo"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            @exportObject="exportObject"
                            :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                        <ConceptHierarchy
                            :class="{'is-hidden': !hierarchyIsdoneLoading}"
                            view="import"
                            v-if="importFramework && conceptMode"
                            :container="importFramework"
                            containerType="ConceptScheme"
                            :viewOnly="true"
                            :repo="repo"
                            @selectedArray="selectedArrayEvent"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            :profile="ctdlAsnConceptProfile"
                            properties="tertiary" />
                    </div>
                </template>
            </ImportUrl>
            <ImportText
                :conceptMode="conceptMode"
                :importTransition="importTransition"
                v-if="importType === 'text'">
                <template slot="import-text-title">
                    <h1
                        class="title is-size-1 has-text-black">
                        <span v-if="conceptMode && queryParams.ceasnDataFields === 'true'">
                            Import a concept scheme
                        </span>
                        <span v-else-if="conceptMode">
                            Import a taxonomy
                        </span>
                        <span v-else>Import a framework</span>
                    </h1>
                    <h2 class="subtitle">
                        Import from text
                    </h2>
                </template>
                <template slot="import-framework">
                    <!-- import light view -->
                    <div
                        v-if="importFramework && importTransition === 'light'"
                        class="import-light">
                        <Component
                            :is="dynamicThing"
                            :class="parentObjectClass"
                            :editingNode="editingNode"
                            @doneEditingNodeEvent="onDoneEditingNode"
                            :obj="changedObj ? changedObj : importFramework"
                            :parentNotEditable="true"
                            class="framework-title"
                            :profile="containerProfile"
                            properties="tertiary" />
                        <Hierarchy
                            v-if="importFramework && !conceptMode"
                            view="importLight"
                            :container="importFramework"
                            containerType="Framework"
                            containerNodeProperty="competency"
                            containerEdgeProperty="relation"
                            nodeType="EcCompetency"
                            :profile="hierarchyProfile"
                            :editable="false"
                            :viewOnly="true"
                            edgeType="EcAlignment"
                            edgeRelationProperty="relationType"
                            edgeRelationLiteral="narrows"
                            edgeSourceProperty="source"
                            edgeTargetProperty="target"
                            :repo="repo"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            @exportObject="exportObject"
                            :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                        <ConceptHierarchy
                            :class="{'is-hidden': !hierarchyIsdoneLoading}"
                            view="import"
                            v-if="importFramework && conceptMode"
                            :container="importFramework"
                            containerType="ConceptScheme"
                            :viewOnly="true"
                            :repo="repo"
                            @selectedArray="selectedArrayEvent"
                            :newFramework="true"
                            @deleteObject="deleteObject"
                            :profile="ctdlAsnConceptProfile"
                            properties="tertiary" />
                    </div>
                </template>
            </ImportText>
            <!-- import tabs
            <ImportTabs
                v-if="!importFramework ||(importFramework && importType==='text')"
                :caseDocs="caseDocs"
                :csvRelationFile="csvRelationFile"
                :csvRelationColumns="csvRelationColumns"
                :importCsvColumnSource="importCsvColumnSource"
                :importCsvColumnRelationType="importCsvColumnRelationType"
                :importCsvColumnTarget="importCsvColumnTarget"
                :csvColumns="csvColumns"
                @analyzeCsvRelation="analyzeCsvRelation($event)"
                @importCase="handleImportFromTabs($event)"
                @deleteObject="deleteObject" />
            import details -->
            <!--<ImportDetails
                :detailsDetected="detailsDetected"
                v-if="importTransition === 'detail'"
                @deleteObject="deleteObject" />-->
            <!-- import preview
            <div
                v-if="importFramework && importTransition === 'preview'"
                class="import-preview">
                -- loading section -- dummy content to show while loading dome elemnts
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
                        </ul>
                        <li />
                        <li />
                        <ul>
                            <li />
                            <li />
                        </ul>
                    </ul>
                </div>
                <Component
                    :is="dynamicThing"
                    @editNodeEvent="onEditNode"
                    @doneEditingNodeEvent="onDoneEditingNode"
                    :class="[{'is-hidden': !hierarchyIsdoneLoading}, parentObjectClass]"
                    :obj="changedObj ? changedObj : importFramework"
                    :repo="repo"
                    class="framework-title"
                    :profile="containerProfile"
                    properties="tertiary" />
                <Hierarchy
                    :class="{'is-hidden': !hierarchyIsdoneLoading}"
                    view="importPreview"
                    v-if="importFramework && !conceptMode"
                    @doneLoadingNodes="handleDoneLoading"
                    @searchThings="handleSearch($event)"
                    @editMultipleEvent="onEditMultiple"
                    :container="importFramework"
                    containerType="Framework"
                    containerNodeProperty="competency"
                    containerEdgeProperty="relation"
                    nodeType="EcCompetency"
                    :profile="hierarchyProfile"
                    :viewOnly="false"
                    :isDraggable="true"
                    edgeType="EcAlignment"
                    edgeRelationProperty="relationType"
                    edgeRelationLiteral="narrows"
                    edgeSourceProperty="source"
                    edgeTargetProperty="target"
                    :repo="repo"
                    @selectedArray="selectedArrayEvent"
                    :newFramework="true"
                    @deleteObject="deleteObject"
                    @exportObject="exportObject"
                    :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                <ConceptHierarchy
                    :class="{'is-hidden': !hierarchyIsdoneLoading}"
                    view="import"
                    v-if="importFramework && conceptMode"
                    @doneLoadingNodes="handleDoneLoading"
                    @searchThings="handleSearch($event)"
                    @editMultipleEvent="onEditMultiple"
                    :container="importFramework"
                    containerType="ConceptScheme"
                    :viewOnly="false"
                    :isDraggable="true"
                    :repo="repo"
                    @selectedArray="selectedArrayEvent"
                    :newFramework="true"
                    @deleteObject="deleteObject"
                    :profile="ctdlAsnConceptProfile"
                    properties="tertiary" />
            </div>-->
            <!-- import light view
            <div
                v-else-if="importFramework && importTransition === 'light'"
                class="import-light">
                <Component
                    :is="dynamicThing"
                    :class="parentObjectClass"
                    :editingNode="editingNode"
                    @doneEditingNodeEvent="onDoneEditingNode"
                    :obj="changedObj ? changedObj : importFramework"
                    :parentNotEditable="true"
                    class="framework-title"
                    :profile="containerProfile"
                    properties="tertiary" />
                <Hierarchy
                    v-if="importFramework && !conceptMode"
                    view="importLight"
                    :container="importFramework"
                    containerType="Framework"
                    containerNodeProperty="competency"
                    containerEdgeProperty="relation"
                    nodeType="EcCompetency"
                    :profile="hierarchyProfile"
                    :editable="false"
                    :viewOnly="true"
                    edgeType="EcAlignment"
                    edgeRelationProperty="relationType"
                    edgeRelationLiteral="narrows"
                    edgeSourceProperty="source"
                    edgeTargetProperty="target"
                    :repo="repo"
                    :newFramework="true"
                    @deleteObject="deleteObject"
                    @exportObject="exportObject"
                    :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                <ConceptHierarchy
                    :class="{'is-hidden': !hierarchyIsdoneLoading}"
                    view="import"
                    v-if="importFramework && conceptMode"
                    :container="importFramework"
                    containerType="ConceptScheme"
                    :viewOnly="true"
                    :repo="repo"
                    @selectedArray="selectedArrayEvent"
                    :newFramework="true"
                    @deleteObject="deleteObject"
                    :profile="ctdlAsnConceptProfile"
                    properties="tertiary" />
            </div>-->
        </div>
    </div>
</template>

<script>
import ImportFile from '@/components/import/ImportFile.vue';
import ImportServer from '@/components/import/ImportServer.vue';
import ImportUrl from '@/components/import/ImportUrl.vue';
import ImportText from '@/components/import/ImportText.vue';
import debounce from 'lodash/debounce';
import Hierarchy from '@/lode/components/lode/Hierarchy.vue';
import common from '@/mixins/common.js';
import competencyEdits from '@/mixins/competencyEdits.js';
import t3Profile from '@/mixins/t3Profile.js';
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';
import Thing from '@/lode/components/lode/Thing.vue';
import ThingEditing from '@/lode/components/lode/ThingEditing.vue';
import ImportTabs from '@/components/import/ImportTabs.vue';
import ImportDetails from '@/components/import/ImportDetails.vue';
import ConceptHierarchy from '@/views/conceptScheme/ConceptHierarchy.vue';
import getLevelsAndRelations from '@/mixins/getLevelsAndRelations.js';
import exports from '@/mixins/exports.js';
import imports from '@/mixins/import.js';
export default {
    name: "Import",
    mixins: [
        common,
        competencyEdits,
        t3Profile,
        ctdlasnProfile,
        exports,
        getLevelsAndRelations,
        imports
    ],
    components: {
        Hierarchy,
        Thing,
        ThingEditing,
        ImportTabs,
        ImportDetails,
        ConceptHierarchy,
        ImportFile,
        ImportServer,
        ImportUrl,
        ImportText
    },
    data: function() {
        return {
            parentObjectClass: 'parent-object',
            editingNode: false,
            hierarchyIsdoneLoading: false,
            frameworkBusy: true,
            detailsDetected: {
                rows: 0,
                columns: 0,
                headers: false,
                competencies: 0,
                format: 'Department of Labor',
                fileType: ''
            },
            repo: window.repo,
            competencyCount: 0,
            csvColumns: [],
            csvRelationFile: null,
            csvRelationColumns: [],
            relationCount: 0,
            caseDocs: [],
            caseCancel: false,
            selectedArray: [],
            frameworkExportOptions: [
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
            ],
            changedObj: null
        };
    },
    computed: {
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        conceptMode: function() {
            return this.$store.getters['editor/conceptMode'];
        },
        showImportActions: function() {
            if (this.importTransition === 'detail' ||
            this.importTransition === 'preview' ||
            this.importTransition === 'light') {
                return true;
            } else {
                return false;
            }
        },
        importServerUrl: function() {
            return this.$store.getters['app/importServerUrl'];
        },
        importUrl: function() {
            return this.$store.getters['app/importUrl'];
        },
        importErrors: function() {
            return this.$store.getters['app/importErrors'];
        },
        importFile: function() {
            return this.$store.getters['app/importFiles'];
        },
        importTransition: function() {
            return this.$store.getters['app/importTransition'];
        },
        importType: function() {
            return this.$store.getters['app/importType'];
        },
        importFileType: function() {
            return this.$store.getters['app/importFileType'];
        },
        importFramework: function() {
            return this.$store.getters['app/importFramework'];
        },
        importFrameworkName: {
            get: function() {
                return this.$store.getters['app/importFrameworkName'];
            },
            set: function(val) {
                return this.$store.commit('app/importFrameworkName', val);
            }
        },
        importFrameworkDescription: function() {
            return this.$store.getters['app/importFrameworkDescription'];
        },
        dynamicThing: function() {
            if (this.editingNode) {
                return 'ThingEditing';
            } else {
                return 'Thing';
            }
        },
        frameworkSize: function() {
            if (this.conceptMode) {
                return null;
            }
            if (this.importFramework && this.importFramework.competency) {
                return this.importFramework.competency.length;
            } else {
                return 0;
            }
        },
        isT3Import: function() {
            if (this.importFileType === 'pdf') {
                return true;
            }
            return false;
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        },
        importCsvColumnName: {
            get() {
                return this.$store.getters['app/importNameColumn'];
            },
            set(val) {
                this.$store.commit('app/importNameColumn', val);
            }
        },
        importCsvColumnDescription: {
            get() {
                return this.$store.getters['app/importDescriptionColumn'];
            },
            set(val) {
                this.$store.commit('app/importDescriptionColumn', val);
            }
        },
        importCsvColumnScope: {
            get() {
                return this.$store.getters['app/importScopeColumn'];
            },
            set(val) {
                this.$store.commit('app/importScopeColumn', val);
            }
        },
        importCsvColumnId: {
            get() {
                return this.$store.getters['app/importIdColumn'];
            },
            set(val) {
                this.$store.commit('app/importIdColumn', val);
            }
        },
        importCsvColumnSource: {
            get() {
                return this.$store.getters['app/importSourceColumn'];
            },
            set(val) {
                this.$store.commit('app/importSourceColumn', val);
            }
        },
        importCsvColumnRelationType: {
            get() {
                return this.$store.getters['app/importRelationColumn'];
            },
            set(val) {
                this.$store.commit('app/importRelationColumn', val);
            }
        },
        importCsvColumnTarget: {
            get() {
                return this.$store.getters['app/importTargetColumn'];
            },
            set(val) {
                this.$store.commit('app/importTargetColumn', val);
            }
        },
        firstImport: {
            get() {
                return this.$store.getters['app/firstImport'];
            },
            set(val) {
                this.$store.commit('app/firstImport', val);
            }
        },
        text: function() {
            return this.$store.getters['app/importText'];
        },
        containerProfile: function() {
            if (this.conceptMode) {
                return ctdlAsnConceptSchemeProfile;
            }
            if (this.isT3Import) {
                return this.t3FrameworkProfile;
            } else if (this.queryParams.ceasnDataFields === 'true') {
                return this.ctdlAsnFrameworkProfile;
            }
            return this.t3FrameworkProfile;
        },
        hierarchyProfile: function() {
            if (this.conceptMode) {
                return ctdlAsnConceptProfile;
            }
            if (this.isT3Import) {
                return this.t3CompetencyProfile;
            } else if (this.queryParams.ceasnDataFields === 'true') {
                return this.ctdlAsnCompetencyProfile;
            }
            return this.t3CompetencyProfile;
        }
    },
    created: function() {
        this.$store.commit('editor/framework', null);
        this.spitEvent('viewChanged');
    },
    beforeDestroy: function() {
        this.clearImport();
    },
    mounted: function() {
        this.clearImport();
        let documentBody = document.getElementById('import');
        documentBody.addEventListener('scroll', debounce(this.scrollFunction, 100, {'leading': true}));
    }
};
</script>

<style lang="scss">
    @import './../../scss/import.scss';

</style>