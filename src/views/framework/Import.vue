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
    <main-layout
        :rightActive="importInfoVisible"
        :simple="true"
        :class=" importInfoVisible ? 'right-side-open' : ''">
        <template #top>
            <div
                class="container"
                style="line-height: 38px;">
                <div
                    class="breadcrumb is-medium"
                    aria-label="breadcrumbs has-text-dark">
                    <ul>
                        <li>
                            <router-link to="frameworks">
                                CaSS
                            </router-link>
                        </li>
                        <li>
                            <a href="#">Import</a>
                        </li>
                    </ul>
                </div>
            </div>
        </template>
        <template #body>
            <div
                id="import">
                <!--- main body section -->
                <!-- top section import information -->
                <div class="container">
                    <div class="section">
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
                                    <span
                                        @click="showRightAside"
                                        class="button is-outlined is-primary is-pulled-right">
                                        <span class="icon">
                                            <i class="fa fa-exclamation-circle" />
                                        </span>
                                        <span>
                                            info
                                        </span>
                                    </span>
                                </h1>
                            </template>
                            <!-- import from file gets three parts, details, preview, and light view -->
                            <template slot="import-framework">
                                <!-- import details -->
                                <ImportDetails
                                    :detailsDetected="detailsDetected"
                                    v-if="importTransition === 'detail'" />
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
                                        @edit-node-event="onEditNode"
                                        @done-editing-node-event="onDoneEditingNode"
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
                                        @done-loading-nodes="handleDoneLoading"
                                        @search-things="handleSearch($event)"
                                        @edit-multiple-event="onEditMultiple"
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
                                        @selected-array="selectedArrayEvent"
                                        :newFramework="true"
                                        :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                                    <ConceptHierarchy
                                        :class="{'is-hidden': !hierarchyIsdoneLoading}"
                                        view="import"
                                        v-if="importFramework && conceptMode"
                                        @done-loading-nodes="handleDoneLoading"
                                        @search-things="handleSearch($event)"
                                        @edit-multiple-event="onEditMultiple"
                                        :container="importFramework"
                                        containerType="ConceptScheme"
                                        :viewOnly="false"
                                        :isDraggable="true"
                                        :repo="repo"
                                        @selected-array="selectedArrayEvent"
                                        :newFramework="true"
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
                                        @done-editing-node-event="onDoneEditingNode"
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
                                        :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                                    <ConceptHierarchy
                                        :class="{'is-hidden': !hierarchyIsdoneLoading}"
                                        view="import"
                                        v-if="importFramework && conceptMode"
                                        :container="importFramework"
                                        containerType="ConceptScheme"
                                        :viewOnly="true"
                                        :repo="repo"
                                        @selected-array="selectedArrayEvent"
                                        :newFramework="true"
                                        :profile="ctdlAsnConceptProfile"
                                        properties="tertiary" />
                                </div>
                            </template>
                        </ImportFile>
                        <!-- import from server -->
                        <ImportServer
                            :conceptMode="conceptMode"
                            :importTransition="importTransition"
                            @import-case="handleImportFromTabs($event)"
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
                                    <span
                                        @click="showRightAside"
                                        class="button is-outlined is-primary is-pulled-right">
                                        <span class="icon">
                                            <i class="fa fa-exclamation-circle" />
                                        </span>
                                        <span>
                                            info
                                        </span>
                                    </span>
                                </h1>
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
                                        @edit-node-event="onEditNode"
                                        @done-editing-node-event="onDoneEditingNode"
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
                                        @done-loading-nodes="handleDoneLoading"
                                        @search-things="handleSearch($event)"
                                        @edit-multiple-event="onEditMultiple"
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
                                        @selected-array="selectedArrayEvent"
                                        :newFramework="true"
                                        :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                                    <ConceptHierarchy
                                        :class="{'is-hidden': !hierarchyIsdoneLoading}"
                                        view="import"
                                        v-if="importFramework && conceptMode"
                                        @done-loading-nodes="handleDoneLoading"
                                        @search-things="handleSearch($event)"
                                        @edit-multiple-event="onEditMultiple"
                                        :container="importFramework"
                                        containerType="ConceptScheme"
                                        :viewOnly="false"
                                        :isDraggable="true"
                                        :repo="repo"
                                        @selected-array="selectedArrayEvent"
                                        :newFramework="true"
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
                                        @done-editing-node-event="onDoneEditingNode"
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
                                        :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                                    <ConceptHierarchy
                                        :class="{'is-hidden': !hierarchyIsdoneLoading}"
                                        view="import"
                                        v-if="importFramework && conceptMode"
                                        :container="importFramework"
                                        containerType="ConceptScheme"
                                        :viewOnly="true"
                                        :repo="repo"
                                        @selected-array="selectedArrayEvent"
                                        :newFramework="true"
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
                                    <span v-else>Import a framework</span>
                                    <span
                                        @click="showRightAside"
                                        class="button is-outlined is-primary is-pulled-right">
                                        <span class="icon">
                                            <i class="fa fa-exclamation-circle" />
                                        </span>
                                        <span>
                                            info
                                        </span>
                                    </span>
                                </h1>
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
                                        @edit-node-event="onEditNode"
                                        @done-editing-node-event="onDoneEditingNode"
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
                                        @done-loading-nodes="handleDoneLoading"
                                        @search-things="handleSearch($event)"
                                        @edit-multiple-event="onEditMultiple"
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
                                        @selected-array="selectedArrayEvent"
                                        :newFramework="true"
                                        :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                                    <ConceptHierarchy
                                        :class="{'is-hidden': !hierarchyIsdoneLoading}"
                                        view="import"
                                        v-if="importFramework && conceptMode"
                                        @done-loading-nodes="handleDoneLoading"
                                        @search-things="handleSearch($event)"
                                        @edit-multiple-event="onEditMultiple"
                                        :container="importFramework"
                                        containerType="ConceptScheme"
                                        :viewOnly="false"
                                        :isDraggable="true"
                                        :repo="repo"
                                        @selected-array="selectedArrayEvent"
                                        :newFramework="true"
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
                                        @done-editing-node-event="onDoneEditingNode"
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
                                        :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                                    <ConceptHierarchy
                                        :class="{'is-hidden': !hierarchyIsdoneLoading}"
                                        view="import"
                                        v-if="importFramework && conceptMode"
                                        :container="importFramework"
                                        containerType="ConceptScheme"
                                        :viewOnly="true"
                                        :repo="repo"
                                        @selected-array="selectedArrayEvent"
                                        :newFramework="true"
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
                                    <span
                                        @click="showRightAside"
                                        class="button is-outlined is-primary is-pulled-right">
                                        <span class="icon">
                                            <i class="fa fa-exclamation-circle" />
                                        </span>
                                        <span>
                                            info
                                        </span>
                                    </span>
                                </h1>
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
                                        @done-editing-node-event="onDoneEditingNode"
                                        :obj="changedObj ? changedObj : importFramework"
                                        :parentNotEditable="true"
                                        class="framework-title"
                                        :profile="containerProfile"
                                        properties="tertiary"
                                        view="importLight" />
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
                                        :properties="importType === 'text' ? 'primary' : 'tertiary'" />
                                    <ConceptHierarchy
                                        :class="{'is-hidden': !hierarchyIsdoneLoading}"
                                        view="import"
                                        v-if="importFramework && conceptMode"
                                        :container="importFramework"
                                        containerType="ConceptScheme"
                                        :viewOnly="true"
                                        :repo="repo"
                                        @selected-array="selectedArrayEvent"
                                        :newFramework="true"
                                        :profile="ctdlAsnConceptProfile"
                                        properties="tertiary" />
                                </div>
                            </template>
                        </ImportText>
                    </div>
                </div>
            </div>
        </template>
        <template slot="right">
            <RightAside v-if="showRightAside && importType === 'file'">
                <template slot="right-aside-content">
                    <div class="cass--right-aside--content">
                        <div class="section">
                            <h2 class="title is-size-4">
                                Import From a File
                            </h2>
                            <p class="has-text-weight-bold">
                                Supported File Types
                            </p>
                            <!-- IMPORT SUPPORT -->
                            <div
                                class="columns pt-4 is-multiline">
                                <div class="column is-narrow">
                                    <div
                                        @click="showImportModal('pdf')"
                                        class="button is-outlined is-warning is-small"
                                        v-if="!conceptMode">
                                        <span
                                            title="PDF files are experimentally supported. Click to learn more."
                                            class="icon">
                                            <i class="fa fa-exclamation" />
                                        </span>
                                        <span>PDF</span>
                                    </div>
                                </div>
                                <div class="column is-narrow">
                                    <div
                                        @click="showImportModal('docx')"
                                        class="button is-outlined is-warning is-small"
                                        v-if="!conceptMode">
                                        <span
                                            title="Word documents and Docx files are experimental. Click to learn more."
                                            class="icon">
                                            <i class="fa fa-exclamation" />
                                        </span>
                                        <span>DOCX/WORD</span>
                                    </div>
                                </div>
                                <div class="column is-narrow">
                                    <div
                                        @click="showImportModal('html')"
                                        class="button is-outlined is-warning is-small"
                                        v-if="!conceptMode">
                                        <span
                                            title="HTML files are experimentally supported. Click to learn more."
                                            class="icon is-pulled-right">
                                            <i class="fa fa-exclamation" />
                                        </span>
                                        <span>HTML</span>
                                    </div>
                                </div>
                                <div class="column is-narrow">
                                    <div
                                        @click="showImportModal('csv')"
                                        class="button is-outlined is-success is-small">
                                        <span
                                            title="CSV files are supported, click to learn more."
                                            class="icon is-pulled-right">
                                            <i class="fa fa-check" />
                                        </span>
                                        <span>CSV</span>
                                    </div>
                                </div>
                                <div class="column is-narrow">
                                    <div
                                        @click="showImportModal('xml')"
                                        class="button is-outlined is-success is-small"
                                        v-if="!conceptMode">
                                        <span
                                            title="XML files are supported, click to learn more."
                                            class="icon is-pulled-right">
                                            <i class="fa fa-check" />
                                        </span>
                                        <span>XML</span>
                                    </div>
                                </div>
                                <div class="column is-narrow">
                                    <div
                                        @click="showImportModal('json')"
                                        class="button is-outlined is-success is-small">
                                        <span
                                            title="JSON files are supported, click to learn more."
                                            class="icon is-pulled-right">
                                            <i class="fa fa-check" />
                                        </span>
                                        <span>JSON</span>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <p class="has-text-weight-bold">
                                Steps to import from file
                            </p>
                            <ul
                                class="cat__bullet-list is-size-6"
                                v-if="!conceptMode">
                                <li>
                                    Click inside the “Files to Upload” box or drag and drop a file inside the dashed box.
                                </li>
                                <li>
                                    Once your file has been uploaded, CaSS will detect a competency framework from the file and display details about your framework.
                                </li>
                                <li>
                                    If the details are correct, click “Accept and Review” to review and edit your framework.
                                </li>
                                <li>
                                    An editable preview of your framework will be available. When you are done making changes, click “Done Editing”.
                                </li>
                                <li>
                                    An uneditable preview of your framework will display, your framework is now in CaSS!
                                </li>
                                <li>
                                    click "done" to navigate to the framework in the editor where you can continue editing as well as export to a variety of formats.
                                </li>
                                <li>
                                    If your framework is not detected by CaSS or not imported properly, let us know at <a href="mailto:cass@eduworks.com?subject=File+to+Improve+CaSS+Importer">cass@eduworks.com</a> and we will look into the inquiry and provide a response.
                                </li>
                            </ul>
                            <ul
                                class="cat__bullet-list is-size-6"
                                v-else>
                                <li>
                                    Click inside the “Files to Upload” box or drag and drop a file inside the dashed box.
                                </li>
                                <li>
                                    Once your file has been uploaded, CaSS will detect a {{ taxonomyTerminology }} from the file and display details about your {{ taxonomyTerminology }}.
                                </li>
                                <li>
                                    If the details are correct, click “Import” to review and edit your {{ taxonomyTerminology }}.
                                </li>
                                <li>
                                    A preview of your {{ taxonomyTerminology }} will display, your {{ taxonomyTerminology }} is now in CaSS!
                                </li>
                                <li>
                                    click "done" to navigate to the {{ taxonomyTerminology }} in the editor where you can continue editing as well as export to a variety of formats.
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
            </RightAside>
            <!-- list description for right panel -->
            <RightAside v-if="showRightAside && importType === 'server'">
                <template slot="right-aside-content">
                    <div class="cass--right-aside--content">
                        <div class="section">
                            <h2 class="title is-size-4">
                                Remote Server Import
                            </h2>
                            <!--v-else-if="importType=='server' && !conceptMode"-->
                            <p class="has-text-weight-bold">
                                If you know the URL of a IMS CASE Repository, such as OpenSalt, you can import published frameworks from that repository.
                            </p>
                            <br>
                            <ul class="cat__bullet-list">
                                <li class="is-size-6">
                                    A CASE framework cannot be imported if it uses API Key authentication.
                                </li>
                                <li class="is-size-6">
                                    This import maintains the URLs of the CASE frameworks and changes both the format and schema used to store the CASE frameworks in CaSS, but does not change any of the data.
                                </li>
                                <li class="is-size-6">
                                    After entering the endpoint below, you can select which frameworks you would like to import.
                                </li>
                                <li class="is-size-6">
                                    If you wish to edit the frameworks after importing, please be sure you are signed in.
                                </li>
                            </ul>
                            <br>
                            <p class="has-text-weight-bold">
                                If you know the URL of another CaSS Repository, you can import frameworks from that repository.
                            </p>
                            <br>
                            <ul class="cat__bullet-list">
                                <li class="is-size-6">
                                    This import maintains the URLs of the CaSS frameworks but does not change any of the data besides the owner. If you are logged in, you will have ownership of the newly imported framework and be able to edit it.
                                </li>
                                <li class="is-size-6">
                                    After entering the endpoint below, you can select which frameworks you would like to import.
                                </li>
                                <li class="is-size-6">
                                    If the other repository has directories, these will appear at the top of the list. You can click on a directory to view and select frameworks within it.
                                </li>
                                <li class="is-size-6">
                                    Use the search bar to find particular frameworks or directories.
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
            </RightAside>
            <RightAside v-if="showRightAside && importType === 'text'">
                <template slot="right-aside-content">
                    <div class="cass--right-aside--content">
                        <div class="section">
                            <h2 class="title is-size-4">
                                Paste Text
                            </h2>
                            <!--v-else-if="importType=='text' && !conceptMode"-->
                            <p class="is-size-6">
                                If you have a list of competency names, you can organize them into a new framework by pasting here.
                            </p>
                            <br>
                            <p class="has-text-weight-bold">
                                Instructions
                            </p>
                            <ul class="cat__bullet-list is-size-6">
                                <li>
                                    Copy and paste from a document or start typing in the text area.
                                </li>
                                <li>
                                    Give your framework a name.
                                </li>
                                <li>
                                    List each competency on a separate line.
                                </li>
                                <li>
                                    1 space indicates one level of indentation in the hierarchy.
                                </li>
                                <li>
                                    To the right of the text box, you will see a preview of the hierarchy you are creating and can make any needed adjustments before importing.
                                </li>
                                <li>
                                    Once you are done select the import button to complete the immport process and view the framework in the editor.
                                </li>
                            </ul>
                            <p
                                v-if="importTransition === 'light' && importType !== 'text'"
                                class="is-size-6">
                                <span class="has-text-success has-text-weight-bold">
                                    Your import is complete!
                                </span>
                            </p>
                        </div>
                    </div>
                </template>
            </RightAside>
            <RightAside v-if="showRightAside && importType === 'url'">
                <template slot="right-aside-content">
                    <div class="cass--right-aside--content">
                        <div class="section">
                            <h2 class="title is-size-4">
                                Import From URL Source
                            </h2>
                            <!--v-else-if="importType=='url' && !conceptMode">-->
                            <p class="is-size-6 pb-4">
                                If you know the URL of a CTDL-ASN JSON-LD graph, you can import published frameworks by URL.
                            </p>
                            <p class="has-text-weight-bold">
                                URL Import Instructions
                            </p>
                            <ul class="cat__bullet-list is-size-6">
                                <li>
                                    This import maintains the URLs of the original frameworks and changes both the format and schema used to store the CTDL-ASN frameworks in CaSS, but does not change any of the data.
                                </li>
                                <li>
                                    If you wish to edit the framework after importing by URL, please be sure you are signed in.
                                </li>
                                <li>
                                    <b>Please note that the Technology Skills framework in the URL Import Examples is very large and will take a long time to import.</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
            </RightAside>
        </template>
    </main-layout>
</template>

<script>
import RightAside from '@/components/framework/RightAside';
import MainLayout from './../../layouts/MainLayout.vue';
import ImportFile from '@/components/import/ImportFile.vue';
import ImportServer from '@/components/import/ImportServer.vue';
import ImportUrl from '@/components/import/ImportUrl.vue';
import ImportText from '@/components/import/ImportText.vue';
import debounce from 'lodash/debounce';
import Hierarchy from '@/lode/components/Hierarchy.vue';
import common from '@/mixins/common.js';
import competencyEdits from '@/mixins/competencyEdits.js';
import t3Profile from '@/mixins/t3Profile.js';
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';
import Thing from '@/lode/components/Thing.vue';
import ThingEditing from '@/lode/components/ThingEditing.vue';
import ImportTabs from '@/components/import/ImportTabs.vue';
import ImportDetails from '@/components/import/ImportDetails.vue';
import ConceptHierarchy from '@/views/conceptScheme/ConceptHierarchy.vue';
import getLevelsAndRelations from '@/mixins/getLevelsAndRelations.js';
import imports from '@/mixins/import.js';
export default {
    name: "Import",
    mixins: [
        common,
        competencyEdits,
        t3Profile,
        ctdlasnProfile,
        getLevelsAndRelations,
        imports
    ],
    components: {
        RightAside,
        MainLayout,
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
            relationCount: 0,
            caseCancel: false,
            selectedArray: [],
            changedObj: null
        };
    },
    computed: {
        importInfoVisible: function() {
            return this.$store.getters['app/showRightAside'];
        },
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
        isT3Import: function() {
            if (this.importFileType === 'pdf') {
                return true;
            }
            return false;
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        },
        csvColumns: {
            get() {
                return this.$store.getters['app/csvColumns'];
            },
            set(val) {
                this.$store.commit('app/csvColumns', val);
            }
        },
        csvRelationColumns: {
            get() {
                return this.$store.getters['app/csvRelationColumns'];
            },
            set(val) {
                this.$store.commit('app/csvRelationColumns', val);
            }
        },
        csvRelationFile: function() {
            return this.$store.getters['app/csvRelationFile'];
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
                return this.ctdlAsnConceptSchemeProfile;
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
                return this.ctdlAsnConceptProfile;
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
        this.$store.commit('app/showRightAside');
        let documentBody = document.getElementById('import');
        documentBody.addEventListener('scroll', debounce(this.scrollFunction, 100, {'leading': true}));
    },
    watch: {
        importStatus: function(val, oldVal) {
            if (val === oldVal) {
                return;
            }
            if (val === 'connectToServer') {
                this.connectToServer();
            } else if (val === 'importFromUrl') {
                this.importFromUrl();
            } else if (val === 'parseText') {
                this.parseText();
            }
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/import.scss';

</style>