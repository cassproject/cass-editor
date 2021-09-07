<template>
    <div class="">
        <!-- busy modal-->
        <modal-template
            size="small"
            type="dark"
            :canClose="false"
            :header="false"
            @close="configDetailsBusy = false"
            :active="configDetailsBusy">
            <template slot="modal-header">
                Processing
            </template>
            <template slot="modal-body">
                <div class="has-text-centered has-text-link">
                    <div class="icon is-large has-text-centered has-text-link">
                        <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                    </div>
                </div>
            </template>
        </modal-template>
        <!-- modal for managing relationships
            modal should show separate lists using a :show="type=TypeString" for the various categorized types
            only selected items will show up in main list  -->
        <modal-template
            @close="showManageRelationshipsModal = false"
            :active="showManageRelationshipsModal">
            <template slot="modal-header">
                Manage relationship types
            </template>
            <template slot="modal-body">
                <div class="section">
                    <div class="columns is-multiline">
                        <div class="column is-12">
                            <h3 class="header is-size-4">
                                CaSS Default Relationships
                            </h3>

                            <div class="table-container">
                                <table class="table is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>
                                                <abbr title="unique relationship ID">
                                                    relationship</abbr>
                                            </th>
                                            <th>
                                                <abbr title="label displayed in form inputs">
                                                    display label</abbr>
                                            </th>
                                            <th>
                                                <abbr title="if enabled shows up in property options">
                                                    enabled</abbr>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RelationshipListItem
                                            v-for="(relObj, relKey) in this.config.relationships"
                                            v-show="isCassRelation(relKey)"
                                            :key="relKey + 'managecass'"
                                            :relationship="relKey"
                                            :label="relObj.label"
                                            :enabled="relObj.enabled"
                                            :readOnly="readOnly"
                                            scope="managecass"
                                            @change="updateRelationshipProperty" />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="column is-12">
                            <h3 class="header is-size-4">
                                Achievement Standards Network Relationships
                            </h3>
                            <div class="table-container">
                                <table class="table is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>
                                                <abbr title="unique relationship ID">
                                                    relationship</abbr>
                                            </th>
                                            <th>
                                                <abbr title="label displayed in form inputs">
                                                    display label</abbr>
                                            </th>
                                            <th>
                                                <abbr title="if enabled shows up in property options">
                                                    enabled</abbr>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RelationshipListItem
                                            v-for="(relObj, relKey) in this.config.relationships"
                                            v-show="isAsnRelation(relKey)"
                                            :key="relKey + 'manageasn'"
                                            :relationship="relKey"
                                            :label="relObj.label"
                                            :enabled="relObj.enabled"
                                            :readOnly="readOnly"
                                            scope="manageasn"
                                            @change="updateRelationshipProperty" />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="column is-12">
                            <h3 class="header is-size-4">
                                GEMQ
                            </h3>
                            <div class="table-container">
                                <table class="table is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>
                                                <abbr title="unique relationship ID">
                                                    relationship</abbr>
                                            </th>
                                            <th>
                                                <abbr title="label displayed on form inputs">
                                                    display label</abbr>
                                            </th>
                                            <th>
                                                <abbr title="if enabled shows up in property options">
                                                    enabled</abbr>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RelationshipListItem
                                            v-for="(relObj, relKey) in this.config.relationships"
                                            v-show="isGemqRelation(relKey)"
                                            :key="relKey + 'managegemq'"
                                            :relationship="relKey"
                                            :label="relObj.label"
                                            :enabled="relObj.enabled"
                                            :readOnly="readOnly"
                                            scope="managegemq"
                                            @change="updateRelationshipProperty" />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="column is-12">
                            <h3 class="header is-size-4">
                                Other
                            </h3>
                            <div class="table-container">
                                <table class="table is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>
                                                <abbr title="unique relationship ID">
                                                    relationship</abbr>
                                            </th>
                                            <th>
                                                <abbr title="label displayed on form inputs">
                                                    display label</abbr>
                                            </th>
                                            <th>
                                                <abbr title="if enabled shows up in property options">
                                                    enabled</abbr>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RelationshipListItem
                                            v-for="(relObj, relKey) in this.config.relationships"
                                            v-show="isOtherRelation(relKey)"
                                            :key="relKey + 'manageother'"
                                            :relationship="relKey"
                                            :label="relObj.label"
                                            :enabled="relObj.enabled"
                                            :readOnly="readOnly"
                                            scope="manageother"
                                            @change="updateRelationshipProperty" />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="modal-foot">
                <div
                    class="button is-primary is-outlined"
                    @click="hideManageRelations">
                    ok
                </div>
            </template>
        </modal-template>
        <!-- permission entities search modal -->
        <modal-template
            @close="showSelectPermissionEntitiesModal = false"
            :active="showSelectPermissionEntitiesModal">
            <template slot="modal-header">
                {{ permissionEntitySelectionTitle }}
            </template>
            <template slot="modal-body">
                <div class="field">
                    <input
                        type="text"
                        class="input"
                        v-model="permissionEntitiesFilter"
                        placeholder="user/group filter">
                </div>
                <div class="table-container">
                    <table class="table is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th />
                                <th>name</th>
                                <th>email</th>
                                <th>type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(pe, index) in filteredPermissionEntities"
                                :key="index">
                                <th>
                                    <div class="checkbox">
                                        <input
                                            :id="pe.pk"
                                            :value="pe.pk"
                                            name="pe.name"
                                            type="checkbox"
                                            v-model="selectedPermissionEntities">
                                    </div>
                                </th>
                                <td>{{ pe.name }}</td>
                                <td>{{ pe.email }}</td>
                                <td>
                                    <i
                                        v-if="pe.type.equalsIgnoreCase('person')"
                                        class="fa fa-user"
                                        title="user" />
                                    <i
                                        v-if="pe.type.equalsIgnoreCase('group')"
                                        class="fa fa-users"
                                        title="group" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <template slot="modal-foot">
                <div
                    class="buttons is-spaced"
                    v-if="!readOnly">
                    <button
                        class="button is-outlined is-dark"
                        @click="closeSelectPermissionEntitiesModal">
                        <span class="icon">
                            <i class="fa fa-times" />
                        </span>
                        <span>
                            cancel
                        </span>
                    </button>
                    <button
                        class="button is-outlined is-primary"
                        @click="applySelectPermissionEntities">
                        <span class="icon">
                            <i class="fa fa-save" />
                        </span>
                        <span>
                            apply
                        </span>
                    </button>
                </div>
            </template>
        </modal-template>
        <!-- level search modal -->
        <modal-template
            @close="showSelectLevelModal = false"
            :active="showSelectLevelModal">
            <template slot="modal-header">
                {{ levelSelectionModalTitle }}
            </template>
            <template slot="modal-body">
                <div
                    ref="levelsModal">
                    <div class="field">
                        <div
                            v-if="!showAddNewLevelSection"
                            class="control">
                            <label class="label">Available Levels:</label>
                            <input
                                class="input"
                                type="text"
                                v-model="selectedLevelFilter"
                                placeholder="level filter">
                        </div>
                    </div>
                    <div v-if="showAddNewLevelSection">
                        <h4 class="header is-size-3">
                            Add Level
                        </h4>
                        <div class="field-group">
                            <div class="field">
                                <label class="label">Name:</label>
                                <div class="control">
                                    <input
                                        class="input"
                                        type="text"
                                        v-model="newLevelName">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Description: </label>
                                <div
                                    class="control"
                                    v-if="!readOnly">
                                    <input
                                        class="input"
                                        type="text"
                                        v-model="newLevelDescription">
                                </div>
                            </div>
                            <div
                                class="field has-text-danger"
                                v-if="levelInvalid">
                                <div class="label has-text-danger">
                                    Please correct the following errors:
                                </div>
                                <div
                                    class="is-size-6"
                                    v-if="levelNameInvalid">
                                    Level name is required
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="table-container">
                            <table class="table is-hoverable is-fullwidth">
                                <thead>
                                    <th />
                                    <th>
                                        name
                                    </th>
                                    <th>
                                        description
                                    </th>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(lvl, index) in filteredLevels"
                                        :key="index">
                                        <th>
                                            <div class="checkbox">
                                                <input
                                                    :id="lvl.shortId()"
                                                    :value="lvl.shortId()"
                                                    name="lvl.shortId()"
                                                    type="checkbox"
                                                    v-model="selectedLevels">
                                            </div>
                                        </th>
                                        <td>
                                            {{ lvl.getName() }}
                                        </td>
                                        <td>
                                            {{ lvl.description }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <template
                    v-if="!showAddNewLevelSection"
                    slot="modal-foot">
                    <div
                        class="buttons is-spaced"
                        v-if="!readOnly">
                        <button
                            class="button is-outlined is-dark"
                            @click="closeSelectLevelModal">
                            cancel
                        </button>
                        <button
                            class="button is-outlined is-primary"
                            @click="showAddNewLevel">
                            <span class="icon">
                                <i class="fa fa-plus" />
                            </span>
                            <span>add level</span>
                        </button>
                        <button
                            class="button is-outlined is-primary"
                            @click="applySelectLevels">
                            <span class="icon">
                                <i class="fa fa-save" />
                            </span>
                            <span>
                                apply selected
                            </span>
                        </button>
                    </div>
                </template>
                <template
                    slot="modal-foot"
                    v-if="showAddNewLevelSection">
                    <div
                        class="buttons is-spaced"
                        v-if="!readOnly && !savingLevelBusy">
                        <button
                            class="button is-outlined"
                            @click="cancelAddNewLevel">
                            <span class="icon">
                                <i class="fa fa-save" />
                            </span>
                            <span>
                                cancel
                            </span>
                        </button>
                        <button
                            class="button is-outlined"
                            @click="saveAddNewLevel">
                            <span class="icon">
                                <i class="fa fa-save" />
                            </span>
                            <span>
                                save new level
                            </span>
                        </button>
                    </div>
                </template>
            </template>
        </modal-template>
        <!-- custom property details modal -->
        <modal-template
            @close="showCustomPropertyDetailsModal = false"
            :active="showCustomPropertyDetailsModal">
            <template slot="modal-header">
                {{ customPropertyModalTitle }}
            </template>
            <template slot="modal-body">
                <div class="title">
                    {{ customPropertyPropertyName }}
                </div>
                <div class="subtitle">
                    Control how {{ customPropertyPropertyName }} is displayed and modified within your CASS instance.
                </div>
                <div class="field">
                    <label class="label">Context </label>
                    <p class="description">
                        If you are unsure, keep the default.
                    </p>
                    <div
                        class="field"
                        v-if="readOnly || !customPropertyIsNew">
                        {{ customPropertyContext }}
                    </div>
                    <div
                        class="control"
                        v-if="!readOnly && customPropertyIsNew">
                        <div class="select is-fullwidth">
                            <select v-model="customPropertyContext">
                                <option
                                    title="https://schema.cassproject.org/0.4/ (default)"
                                    value="https://schema.cassproject.org/0.4/">
                                    CaSS v4.0 (default)
                                </option>
                                <option
                                    title="https://purl.org/ctdlasn/terms/"
                                    value="https://purl.org/ctdlasn/terms/">
                                    CTDL-ASN
                                </option>
                                <option
                                    title="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                                    value="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                                    RDF Semantic Web Standards 1999
                                </option>
                                <option
                                    title="http://www.w3.org/2000/01/rdf-schema#"
                                    value="http://www.w3.org/2000/01/rdf-schema#">
                                    RDF Semantic Web Standards 2000
                                </option>
                                <option
                                    title="https://schema.cassproject.org/kbac/0.4/"
                                    value="https://schema.cassproject.org/kbac/0.4/">
                                    Key Based Authorization and Control
                                </option>
                                <option
                                    title="http://schema.eduworks.com/general/0.3/"
                                    value="http://schema.eduworks.com/general/0.3/">
                                    Eduworks v3.0
                                </option>
                                <option
                                    title="http://schema.org/"
                                    value="http://schema.org/">
                                    Schema.org
                                </option>
                                <option
                                    title="http://purl.org/ASN/schema/core/"
                                    value="http://purl.org/ASN/schema/core/">
                                    Achievements Standard Network
                                </option>
                                <option
                                    title="http://purl.org/dc/elements/1.1/"
                                    value="http://purl.org/dc/elements/1.1/">
                                    DCMI Elements v1.1
                                </option>
                                <option
                                    title="http://purl.org/gem/qualifiers/"
                                    value="http://purl.org/gem/qualifiers/">
                                    Gem v2.0
                                </option>
                                <option
                                    title="http://www.loc.gov/loc.terms/relators/"
                                    value="http://www.loc.gov/loc.terms/relators/">
                                    Relators Scheme
                                </option>
                                <option
                                    title="http://purl.org/dc/terms/"
                                    value="http://purl.org/dc/terms/">
                                    DCMI Terms
                                </option>
                                <option
                                    title="http://www.w3.org/2004/02/skos/core#"
                                    value="http://www.w3.org/2004/02/skos/core#">
                                    Simple Knowledge Organization System
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="control">
                            <label class="label">Range/Type: </label>
                            <div class="control">
                                <div v-if="readOnly || !customPropertyIsNew">
                                    {{ customPropertyRangeReadable }}
                                </div>
                                <div
                                    class="select"
                                    v-if="!readOnly && customPropertyIsNew">
                                    <select v-model="customPropertyRange">
                                        <option value="http://www.w3.org/2000/01/rdf-schema#langString">
                                            Lang-String
                                        </option>
                                        <option value="http://schema.org/URL">
                                            URL
                                        </option>
                                        <option value="http://schema.org/Text">
                                            Text
                                        </option>
                                        <option value="http://www.w3.org/2001/XMLSchema#dateTime">
                                            Date-Time
                                        </option>
                                        <option value="http://purl.org/dc/terms/date">
                                            Date
                                        </option>
                                        <option value="https://schema.cassproject.org/0.4/skos/Concept">
                                            SKOS Concept
                                        </option>
                                        <option value="https://schema.cassproject.org/0.4/Competency">
                                            Competency
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="column">
                        <div class="control">
                            <label
                                class="label"
                                title="priority in which the custom property is displayed in form inputs">Display Priority: </label>
                            <div v-if="readOnly">
                                {{ customPropertyPriority }}
                            </div>
                            <div
                                class="control"
                                v-if="!readOnly">
                                <div class="select">
                                    <select v-model="customPropertyPriority">
                                        <option value="primary">
                                            primary
                                        </option>
                                        <option value="secondary">
                                            secondary
                                        </option>
                                        <option value="tertiary">
                                            tertiary
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">Required </label>
                            <div class="control is-size-3">
                                <input
                                    :disabled="readOnly"
                                    v-model="customPropertyRequired"
                                    id="customPropertyRequiredSwitch"
                                    type="checkbox"
                                    name="customPropertyRequiredSwitch"
                                    class="switch"
                                    checked="checked">
                                <label for="customPropertyRequiredSwitch" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">
                        Unique Property Identifier<span v-if="customPropertyIsNew"> (only alphanumerics permitted)</span>
                    </label>
                    <div v-if="readOnly || !customPropertyIsNew">
                        {{ customPropertyPropertyName }}
                    </div>
                    <div
                        class="control"
                        v-if="!readOnly && customPropertyIsNew">
                        <input
                            class="input"
                            type="text"
                            v-model="customPropertyPropertyName"
                            @change="simplifyCustomPropertyName">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Display Label</label>
                    <div v-if="readOnly">
                        {{ customPropertyLabel }}
                    </div>
                    <div
                        class="control"
                        v-if="!readOnly">
                        <input
                            class="input"
                            type="text"
                            v-model="customPropertyLabel">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Description</label>
                    <div v-if="readOnly">
                        {{ customPropertyDescription }}
                    </div>
                    <div
                        class="control"
                        v-if="!readOnly">
                        <input
                            class="input"
                            type="text"
                            v-model="customPropertyDescription">
                    </div>
                </div>
                <div class="field">
                    <label
                        class="label"
                        title="category (if any) under which the custom property is displayed in form inputs">
                        Display Category
                    </label>
                    <div v-if="readOnly">
                        {{ customPropertyHeading }}
                    </div>
                    <div
                        class="control"
                        v-if="!readOnly">
                        <input
                            class="input"
                            type="text"
                            v-model="customPropertyHeading">
                    </div>
                </div>
                <div class="field">
                    <label class="label">
                        Allow Multiple Instances of Field
                    </label>
                    <div class="control">
                        <input
                            :disabled="readOnly"
                            v-model="customPropertyAllowMultiples"
                            id="customPropertyAllowMultiplesSwitch"
                            type="checkbox"
                            name="customPropertyAllowMultiplesSwitch"
                            class="switch"
                            checked="checked">
                        <label for="customPropertyAllowMultiplesSwitch" />
                    </div>
                </div>
                <!-- had to put the v-if on all of these elements for some reason or it wouldn't work...f'in vue man -->
                <div
                    class="field"
                    v-if="shouldAllowOnePerLangChoice">
                    <label
                        class="label"
                        v-if="shouldAllowOnePerLangChoice">
                        One Entry Per Language
                    </label>
                    <div
                        class="control"
                        v-if="shouldAllowOnePerLangChoice">
                        <input
                            :disabled="readOnly"
                            v-if="shouldAllowOnePerLangChoice"
                            v-model="customPropertyOnePerLanguage"
                            id="customPropertyOnePerLanguageSwitch"
                            type="checkbox"
                            name="customPropertyOnePerLanguageSwitch"
                            class="switch"
                            checked="checked">
                        <label
                            for="customPropertyOnePerLanguageSwitch"
                            v-if="shouldAllowOnePerLangChoice" />
                    </div>
                </div>
                <div
                    class="box py-4 px-4"
                    v-if="shouldAllowCustomPropertyPermittedValues">
                    <div class="field">
                        <div class="columns">
                            <div class="column">
                                <label class="label">Limit values </label>
                            </div>
                            <div class="column is-narrow">
                                <div class="control">
                                    <input
                                        :disabled="readOnly"
                                        v-model="customPropertyValuesLimited"
                                        id="customPropertyValuesLimited"
                                        type="checkbox"
                                        name="customPropertyValuesLimited"
                                        class="switch"
                                        checked="checked">
                                    <label for="customPropertyValuesLimited" />
                                </div>
                            </div>
                        </div>
                        <p
                            v-if="!customPropertyValuesLimited && !readOnly"
                            class="description">
                            Limit values disabled, any values allowed. To limit, turn on limit values.
                        </p>
                        <p
                            v-if="customPropertyValuesLimited && !readOnly"
                            class="description">
                            Values limited to only those listed below. To allow any, turn off limit values.
                        </p>
                    </div>
                    <div
                        class="table-container"
                        v-if="customPropertyPermittedValues.length > 0 && customPropertyValuesLimited">
                        <table class="table is-hoverable is-fullwidth">
                            <thead>
                                <th>display label</th>
                                <th>field value</th>
                                <th />
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(ev,idx) in customPropertyPermittedValues"
                                    :key="idx">
                                    <th>
                                        <p
                                            v-if="readOnly">
                                            {{ ev.display }}
                                        </p>
                                        <div
                                            v-if="!readOnly"
                                            class="control">
                                            <input
                                                class="input"

                                                type="text"
                                                v-model="ev.display">
                                        </div>
                                    </th>
                                    <td>
                                        <p
                                            v-if="readOnly">
                                            {{ ev.value }}
                                        </p>
                                        <div class="control">
                                            <input
                                                v-if="!readOnly"
                                                type="text"
                                                class="input "
                                                v-model="ev.value">
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            class="button is-outlined is-danger is-outlined "
                                            v-if="!readOnly"
                                            @click="deleteCustomPropertyPermittedValue(idx)">
                                            <span class="icon">
                                                <i class="fa fa-trash" />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else-if="customPropertyValuesLimited">
                        No values entered.
                    </div>
                    <div class="buttons is-right">
                        <button
                            class="button is-outlined  is-primary"
                            v-if="!readOnly && customPropertyValuesLimited"
                            @click="addCustomPropertyPermittedValue">
                            <span class="icon">
                                <i class="fa fa-plus" />
                            </span>
                            <span>add</span>
                        </button>
                    </div>
                </div>
                <div
                    class="box py-4 px-4"
                    v-if="shouldAllowCustomPropertyPermittedConcepts">
                    <div class="field">
                        <div class="columns">
                            <div class="column">
                                <label class="label">Limit concepts </label>
                            </div>
                            <div class="column is-narrow">
                                <div class="control">
                                    <input
                                        :disabled="readOnly"
                                        v-model="customPropertyConceptsLimited"
                                        id="customPropertyConceptsLimited"
                                        type="checkbox"
                                        name="customPropertyConceptsLimited"
                                        class="switch"
                                        checked="checked">
                                    <label for="customPropertyConceptsLimited" />
                                </div>
                            </div>
                        </div>
                        <p
                            v-if="!customPropertyConceptsLimited && !readOnly"
                            class="description">
                            Limit concepts disabled, any concepts allowed. To limit, turn on limit concepts.
                        </p>
                        <p
                            v-if="customPropertyConceptsLimited && !readOnly"
                            class="description">
                            Concepts limited to only the taxonomies listed below. To allow any, turn off limit concepts.
                        </p>
                    </div>
                    <div
                        class="table-container"
                        v-if="customPropertyAvailableConcepts.length > 0 && customPropertyConceptsLimited">
                        <div
                            v-if="customPropertyPermittedConcepts.length > 0"
                            class="tags are-medium">
                            <span
                                v-for="(concept, index) in customPropertyPermittedConcepts"
                                :key="index"
                                class="tag is-light">
                                <span :title="concept.value">{{ concept.display }}</span>
                                <button
                                    @click="removeConcept(index)"
                                    title="Remove"
                                    class="delete is-small" />
                            </span>
                        </div>
                        <div class="field is-grouped">
                            <div class="control is-expanded share auto-complete__control">
                                <input
                                    @blur="closeAutoComplete"
                                    type="search"
                                    placeholder="search"
                                    class="input share is-fullwidth"
                                    v-model="search"
                                    @input="filterConcepts">
                                <div
                                    v-show="isOpenAutocomplete"
                                    class="auto">
                                    <ul>
                                        <li
                                            v-for="(result, i) in filteredConcepts"
                                            :key="i"
                                            @mousedown="selectConcept(result)">
                                            {{ result.display }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="box py-4 px-4"
                    v-if="shouldAllowCustomPropertyPermittedTypes">
                    <div class="field">
                        <div class="columns">
                            <div class="column">
                                <label class="label">Limit by type </label>
                            </div>
                            <div class="column is-narrow">
                                <div class="control">
                                    <input
                                        :disabled="readOnly"
                                        v-model="customPropertyTypesLimited"
                                        id="customPropertyTypesLimited"
                                        type="checkbox"
                                        name="customPropertyTypesLimited"
                                        class="switch"
                                        checked="checked">
                                    <label for="customPropertyTypesLimited" />
                                </div>
                            </div>
                        </div>
                        <p
                            v-if="!customPropertyTypesLimited && !readOnly"
                            class="description">
                            Limit by type disabled, any type of competency allowed. To limit, turn on limit by type.
                        </p>
                        <p
                            v-if="customPropertyTypesLimited && !readOnly"
                            class="description">
                            Competencies limited to only the types listed below. To allow any, turn off limit by type.
                        </p>
                    </div>
                    <div
                        class="table-container"
                        v-if="(customPropertyAvailableTypes.length > 0) && customPropertyTypesLimited">
                        <div
                            v-if="customPropertyPermittedTypes.length > 0"
                            class="tags are-medium">
                            <span
                                v-for="(type, index) in customPropertyPermittedTypes"
                                :key="index"
                                class="tag is-light">
                                <span :title="type.value">{{ type.display }}</span>
                                <button
                                    @click="removeType(index)"
                                    title="Remove"
                                    class="delete is-small" />
                            </span>
                        </div>
                        <div class="field is-grouped">
                            <div class="control is-expanded share auto-complete__control">
                                <input
                                    @blur="closeAutoComplete"
                                    type="search"
                                    placeholder="search"
                                    class="input share is-fullwidth"
                                    v-model="search"
                                    @input="filterTypes">
                                <div
                                    v-show="isOpenAutocomplete"
                                    class="auto">
                                    <ul>
                                        <li
                                            v-for="(result, i) in filteredTypes"
                                            :key="i"
                                            @mousedown="selectType(result)">
                                            {{ result.display }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="(customPropertyAvailableTypes.length <= 0) && customPropertyTypesLimited">
                        No types available to choose from. Add restricted competency types in the configuration.
                    </div>
                </div>
                <br>
                <div
                    class="field has-text-danger"
                    v-if="customPropertyInvalid">
                    <div class="label has-text-danger">
                        Please correct the following errors:
                    </div>
                    <div
                        class="is-size-6"
                        v-if="customPropertyPropertyNameExists">
                        Property name is already in use
                    </div>
                    <div
                        class="is-size-6"
                        v-if="customPropertyPropertyNameInvalid">
                        Property name is required
                    </div>
                    <div
                        class="is-size-6"
                        v-if="customPropertyLabelInvalid">
                        Label is required
                    </div>
                    <div
                        class="is-size-6"
                        v-if="customPropertyDescriptionInvalid">
                        Description is required
                    </div>
                </div>
            </template>
            <template slot="modal-foot">
                <div
                    class="buttons is-spaced"
                    v-if="!readOnly">
                    <button
                        class="button is-outlined is-dark"
                        @click="closeCustomPropertyModal">
                        <span class="icon">
                            <i class="fa fa-times" />
                        </span>
                        <span>
                            cancel
                        </span>
                    </button>
                    <button
                        class="button is-outlined is-primary"
                        @click="applyCustomPropertyEdits">
                        <span class="icon">
                            <i class="fa fa-save" />
                        </span>
                        <span>
                            apply new property
                        </span>
                    </button>
                </div>
            </template>
        </modal-template>
        <!-- begin panel -->
        <div class="columns">
            <div class="column is-3">
                <nav :class="panelClass">
                    <p class="panel-heading">
                        Sections
                    </p>
                    <a
                        class="panel-block"
                        :class="{'is-active': tab === 'general'}"
                        @click="tab ='general'">
                        <span class="panel-icon">
                            <i
                                class="fas fa-list-alt"
                                aria-hidden="true" />
                        </span>
                        General Details
                    </a>
                    <a
                        class="panel-block"
                        :class="{'is-active': tab === 'framework'}"
                        @click="tab ='framework'">
                        <span class="panel-icon">
                            <i
                                class="fas fa-list-alt"
                                aria-hidden="true" />
                        </span>
                        Framework Settings
                    </a>
                    <div
                        class="sub-list"
                        v-if="tab === 'framework'">
                        <a
                            class="panel-block is-active"
                            @click="$scrollTo('#framework-properties', '400', scrollOptions)">
                            <span class="panel-icon">
                                <i
                                    class="fas fa-circle"
                                    aria-hidden="true" />
                            </span>
                            Properties
                        </a>
                    </div>
                    <a
                        :class="{'is-active': tab === 'competency'}"
                        class="panel-block"
                        @click="tab = 'competency'">
                        <span class="panel-icon">
                            <i
                                class="fas fa-list-alt"
                                aria-hidden="true" />
                        </span>
                        Competency Settings
                    </a>
                    <div
                        class="sub-list"
                        v-if="tab === 'competency'">
                        <a
                            class="panel-block is-active"
                            :class="{'is-active': tab === 'framework'}"
                            @click="$scrollTo('#competency-properties', '400', scrollOptions)">
                            <span class="panel-icon">
                                <i
                                    class="fas fa-circle"
                                    aria-hidden="true" />
                            </span>
                            Properties
                        </a>
                        <a
                            class="panel-block is-active"
                            :class="{'is-active': tab === 'framework'}"
                            @click="$scrollTo('#enforce-competency-types', '400', scrollOptions)">
                            <span class="panel-icon">
                                <i
                                    class="fas fa-circle"
                                    aria-hidden="true" />
                            </span>
                            Restricted Types
                        </a>
                        <a
                            class="panel-block is-active"
                            :class="{'is-active': tab === 'framework'}"
                            @click="$scrollTo('#allow-levels', '400', scrollOptions)">
                            <span class="panel-icon">
                                <i
                                    class="fas fa-circle"
                                    aria-hidden="true" />
                            </span>
                            Allow Levels
                        </a>
                    </div>
                    <a
                        @click="tab = 'relationships'"
                        :class="{'is-active': tab === 'relationships'}"
                        class="panel-block">
                        <span class="panel-icon">
                            <i
                                class="fas fa-network-wired"
                                aria-hidden="true" />
                        </span>
                        Competency Relationships
                    </a>
                    <div
                        class="sub-list"
                        v-if="tab === 'relationships'">
                        <a
                            class="panel-block is-active"
                            @click="$scrollTo('#relationship-display-category', '400', scrollOptions)">
                            <span class="panel-icon">
                                <i
                                    class="fas fa-circle"
                                    aria-hidden="true" />
                            </span>
                            Category
                        </a>
                        <a
                            class="panel-block is-active"
                            @click="$scrollTo('#relationship-display-priority', '400', scrollOptions)">
                            <span class="panel-icon">
                                <i
                                    class="fas fa-circle"
                                    aria-hidden="true" />
                            </span>
                            Display Priority
                        </a>
                        <a
                            class="panel-block is-active"
                            @click="$scrollTo('#relationship-types', '400', scrollOptions)">
                            <span class="panel-icon">
                                <i
                                    class="fas fa-circle"
                                    aria-hidden="true" />
                            </span>
                            Relationship Types
                        </a>
                    </div>
                    <a
                        @click="tab = 'alignments'"
                        :class="{'is-active': tab === 'alignments'}"
                        class="panel-block">
                        <span class="panel-icon">
                            <i
                                class="fas fa-book"
                                aria-hidden="true" />
                        </span>
                        Resource Alignments
                    </a>
                    <div
                        v-if="tab === 'alignments'"
                        class="sub-list">
                        <a
                            class="panel-block is-active"
                            @click="$scrollTo('#alignment-types', '400', scrollOptions)">
                            <span class="panel-icon">
                                <i
                                    class="fas fa-circle"
                                    aria-hidden="true" />
                            </span>
                            alignment types
                        </a>
                    </div>
                    <a
                        @click="tab = 'users'"
                        :class="{'is-active': tab === 'users'}"
                        class="panel-block">
                        <span class="panel-icon">
                            <i
                                class="fas fa-users"
                                aria-hidden="true" />
                        </span>
                        Users
                    </a>
                    <div
                        class="sub-list"
                        v-if="tab === 'users'">
                        <a
                            class="panel-block is-active"
                            @click="$scrollTo('#default-owners', '400', scrollOptions)">
                            <span class="panel-icon">
                                <i
                                    class="fas fa-list-alt"
                                    aria-hidden="true" />
                            </span>
                            Default owners
                        </a>
                        <a
                            class="panel-block is-active"
                            @click="$scrollTo('#default-readers', '400', scrollOptions)">
                            <span class="panel-icon">
                                <i
                                    class="fas fa-list-alt"
                                    aria-hidden="true" />
                            </span>
                            Default readers
                        </a>
                    </div>
                    <a
                        class="panel-block"
                        v-if="readOnly">
                        <div
                            class="buttons is-fullwidth is-right">
                            <div
                                class="button is-outlined is-primary"
                                @click="$emit('back')">
                                back
                            </div>
                        </div>
                    </a>
                    <div
                        class="panel-block"
                        v-if="!readOnly">
                        <div
                            class="button is-fullwidth is-outlined is-dark"
                            @click="$emit('cancel')">
                            <span class="icon">
                                <i class="fa fa-arrow-left" />
                            </span>
                            <span>cancel</span>
                        </div>
                    </div>
                    <div
                        class="panel-block"
                        v-if="!readOnly">
                        <div
                            class="button is-fullwidth  is-outlined is-primary"
                            @click="validateCurrentConfigAndEmitSave">
                            <span class="icon">
                                <i class="fa fa-save" />
                            </span><span>save configuration</span>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="column is-9">
                <!-- CONFIGURATION DETAILS BODY CONTENT -->
                <div
                    class="px-4 mb-6"
                    v-if="tab === 'general'">
                    <div class="container">
                        <div
                            class="section box py-4 px-4"
                            id="configuration-details">
                            <h3 class="is-size-3 title">
                                General details
                            </h3>
                            <div class="field">
                                <label class="label">Name</label>
                                <div v-if="readOnly">
                                    {{ config.name }}
                                </div>
                                <div
                                    v-if="!readOnly"
                                    class="control">
                                    <input
                                        type="text "
                                        class="input"
                                        v-model="config.name">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Description </label>
                                <div v-if="readOnly">
                                    {{ config.description }}
                                </div>
                                <div
                                    class="control"
                                    v-if="!readOnly">
                                    <input
                                        type="text "
                                        class="input"
                                        v-model="config.description">
                                </div>
                            </div>
                            <!--<div class="is-default">
                                <div
                                    v-if="readOnly"
                                    class="is-default__badge has-text-centered">
                                    {{ config.isDefault }}
                                    <span class="icon has-text-primary">
                                        <i class="fa fa-check" />
                                    </span>
                                    <label class="label">default</label>
                                </div>
                                    {{ config.isDefault }}
                                    <div class="field">
                                        <input :disabled="defaultConfigId && defaultConfigId.equals(config.id) && !readOnly" v-model="config.isDefault" :id="config.id + 'instanceDefaultSwitch'" type="checkbox" :name="config.id + 'instanceDefaultSwitch'" class="switch is-outlined">
                                        <label :for="config.id + 'instanceDefaultSwitch'">Is browser default</label>
                                    </div>
                                        class="field"
                                        v-if="!defaultConfigId || defaultConfigId.equals(config.id)">
                                        <input
                                            v-model="config.isDefault"
                                            class="is-checkradio is-rtl is-large"
                                            id="is-default"
                                            type="checkbox"
                                            name="is-default">
                                        <label for="is-default">is default</label>
                                    </div>
                            </div>-->
                            <div class="field is-grouped">
                                <div class="control is-ltr is-expanded">
                                    <input
                                        :disabled="isSetInstanceDisabled"
                                        v-model="config.isDefault"
                                        :id="config.id + 'instanceDefaultSwitch'"
                                        type="checkbox"
                                        :name="config.id + 'instanceDefaultSwitch'"
                                        class="switch is-outlined"
                                        :class="{ 'is-primary': config.isDefault }">
                                    <label :for="config.id + 'instanceDefaultSwitch'">Instance default</label>
                                </div>
                                <div class="control is-expanded">
                                    <input
                                        v-model="isBrowserDefault"
                                        id="browserDefaultSwitch"
                                        type="checkbox"
                                        name="browserDefaultSwitch"
                                        class="switch is-outlined">
                                    <label for="browserDefaultSwitch">Browser default</label>
                                </div>
                            <!--<div
                                    class="button is-outlined is-primary"
                                    @click="$emit('setBrowserDefault', config.id)">
                                    <span class="icon">
                                        <i class="fa fa-save" />
                                    </span>
                                    <span>set as browser default</span>
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ************************************** Framework Properties ************************************************ -->
                <div
                    class="px-4 mb-6"
                    v-show="tab === 'framework' || tab === 'general'"
                    id="framework-properties">
                    <h5 class="title is-size-3">
                        Framework Configuration
                    </h5>
                    <p class="subtitle">
                        Framework properties are the values that can be added, edited, and deleted
                        for framework objects. Minimum framework properties are <b>id</b>, <b>name</b>, and <b>description</b>.
                        Properties added here will be displayed in the framework object at the top of
                        the framework editor view.
                    </p>
                    <div class="table-container box py-4 px-4">
                        <h5 class="is-size-4 title">
                            Framework properties
                            <div
                                v-if="!readOnly"
                                class="button is-family-primary is-outlined is-pulled-right  is-primary"
                                @click="addCustomFrameworkProperty">
                                <span class="icon">
                                    <i class="fa fa-plus" />
                                </span>
                                <span>
                                    add custom framework property
                                </span>
                            </div>
                        </h5>
                        <p class="subtitle">
                            Manage framework property settings here.  Change how properties are displayed and labeled in the editor.
                        </p>
                        <table class="table is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th><abbr title="unique property ID">property</abbr></th>
                                    <th><abbr title="label to be displayed in form inputs">display label</abbr></th>
                                    <th><abbr title="description of this property">description</abbr></th>
                                    <th><abbr title="category (if any) under which the field is displayed in form inputs">display category</abbr></th>
                                    <th><abbr title="required">required</abbr></th>
                                    <th><abbr title="priority in which the field is displayed in form inputs">display priority</abbr></th>
                                    <th><abbr title="manage" /><i class="fa fa-cog" /></th>
                                    <th><abbr title="delete" /><i class="fa fa-trash" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <FrameworkCompetencyPropertyListItem
                                    propertyParent="framework"
                                    property="id"
                                    :label="config.fwkIdLabel"
                                    :description="config.fwkIdDescription"
                                    :required="true"
                                    :priority="config.fwkIdPriorty"
                                    :heading="config.fwkIdHeading"
                                    :custom="false"
                                    :readOnly="readOnly"
                                    :enforceRequired="true"
                                    :enforcePrimary="false"
                                    @change="updateFrameworkCompetencyProperty" />
                                <FrameworkCompetencyPropertyListItem
                                    propertyParent="framework"
                                    property="name"
                                    :label="config.fwkNameLabel"
                                    :description="config.fwkNameDescription"
                                    :required="true"
                                    priority="primary"
                                    :heading="config.fwkNameHeading"
                                    :custom="false"
                                    :readOnly="readOnly"
                                    :enforceRequired="true"
                                    :enforcePrimary="true"
                                    @change="updateFrameworkCompetencyProperty" />
                                <FrameworkCompetencyPropertyListItem
                                    propertyParent="framework"
                                    property="description"
                                    :label="config.fwkDescLabel"
                                    :description="config.fwkDescDescription"
                                    :required="config.fwkDescRequired"
                                    :priority="config.fwkDescPriority"
                                    :heading="config.fwkDescHeading"
                                    :custom="false"
                                    :readOnly="readOnly"
                                    :enforceRequired="false"
                                    :enforcePrimary="false"
                                    @change="updateFrameworkCompetencyProperty" />
                                <FrameworkCompetencyPropertyListItem
                                    v-for="(prop,idx) in config.fwkCustomProperties"
                                    :key="prop.propertyName + '_' + prop.label + '_' + prop.description + '_' + prop.required + '_' + prop.priority + '_' +prop.heading"
                                    propertyParent="framework"
                                    :property="prop.propertyName"
                                    :label="prop.label"
                                    :description="prop.description"
                                    :required="prop.required"
                                    :priority="prop.priority"
                                    :heading="prop.heading"
                                    :custom="true"
                                    :readOnly="readOnly"
                                    :enforceRequired="false"
                                    :enforcePrimary="false"
                                    :propertyIndex="idx"
                                    @change="updateFrameworkCompetencyProperty"
                                    @manage="manageCustomFrameworkCompetencyProperty"
                                    @delete="deleteCustomFrameworkCompetencyProperty" />
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- ************************************** Competency Properties ************************************************ -->
                <div
                    class="px-4"
                    v-show="tab === 'competency' || tab === 'general'">
                    <h5 class="is-size-3 title">
                        Competency Configuration
                    </h5>
                    <p class="subtitle">
                        Competency properties are the values that can be added, edited, and deleted
                        for competency objects. Default competency properties are <b>id</b>, <b>name</b>, <b>description</b>,
                        and <b>type</b>. Properties added here will be available when editing competency level objects
                        in the framework editor.
                    </p>
                    <div
                        class="table-container box py-4 px-4"
                        id="competency-properties">
                        <h4 class="is-size-4 title">
                            Competency Properties
                            <span
                                v-if="!readOnly"
                                class="button is-family-primary is-outlined is-pulled-right is-primary"
                                @click="addCustomCompetencyProperty">
                                <span class="icon">
                                    <i class="fa fa-plus" />
                                </span>
                                <span>
                                    add custom competency property
                                </span>
                            </span>
                        </h4>
                        <p class="subtitle">
                            Manage availability and display of competency properties in the editor.
                        </p>
                        <table class="table is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th><abbr title="unique property ID">property</abbr></th>
                                    <th><abbr title="label to be displayed in form inputs">display label</abbr></th>
                                    <th><abbr title="description of the property">description</abbr></th>
                                    <th><abbr title="category (if any) under which the field is displayed in form inputs">display category</abbr></th>
                                    <th><abbr title="required">required</abbr></th>
                                    <th><abbr title="priority in which the field is displayed in form inputs">display priority</abbr></th>
                                    <th><abbr title="manage"><i class="fa fa-cog" /></abbr></th>
                                    <th><abbr title="delete"><i class="fa fa-trash" /></abbr></th>
                                </tr>
                            </thead>
                            <tbody>
                                <FrameworkCompetencyPropertyListItem
                                    propertyParent="competency"
                                    property="id"
                                    :label="config.compIdLabel"
                                    :description="config.compIdDescription"
                                    :required="true"
                                    :priority="config.compIdPriorty"
                                    :heading="config.compIdHeading"
                                    :custom="false"
                                    :readOnly="readOnly"
                                    :enforceRequired="true"
                                    :enforcePrimary="false"
                                    @change="updateFrameworkCompetencyProperty" />
                                <FrameworkCompetencyPropertyListItem
                                    propertyParent="competency"
                                    property="name"
                                    :label="config.compNameLabel"
                                    :description="config.compNameDescription"
                                    :required="true"
                                    priority="primary"
                                    :heading="config.compNameHeading"
                                    :custom="false"
                                    :readOnly="readOnly"
                                    :enforceRequired="true"
                                    :enforcePrimary="true"
                                    @change="updateFrameworkCompetencyProperty" />
                                <FrameworkCompetencyPropertyListItem
                                    propertyParent="competency"
                                    property="description"
                                    :label="config.compDescLabel"
                                    :description="config.compDescDescription"
                                    :required="config.compDescRequired"
                                    :priority="config.compDescPriority"
                                    :heading="config.compDescHeading"
                                    :custom="false"
                                    :readOnly="readOnly"
                                    :enforceRequired="false"
                                    :enforcePrimary="false"
                                    @change="updateFrameworkCompetencyProperty" />
                                <FrameworkCompetencyPropertyListItem
                                    propertyParent="competency"
                                    property="type"
                                    :label="config.compTypeLabel"
                                    :description="config.compTypeDescription"
                                    :required="config.compTypeRequired"
                                    :priority="config.compTypePriority"
                                    :heading="config.compTypeHeading"
                                    :custom="false"
                                    :readOnly="readOnly"
                                    :enforceRequired="false"
                                    :enforcePrimary="false"
                                    @change="updateFrameworkCompetencyProperty" />
                                <FrameworkCompetencyPropertyListItem
                                    v-for="(prop,idx) in config.compCustomProperties"
                                    :key="prop.propertyName + '_' + prop.label + '_' + prop.description + '_' + prop.required + '_' + prop.priority + '_' +prop.heading"
                                    propertyParent="competency"
                                    :property="prop.propertyName"
                                    :label="prop.label"
                                    :description="prop.description"
                                    :required="prop.required"
                                    :priority="prop.priority"
                                    :heading="prop.heading"
                                    :custom="true"
                                    :readOnly="readOnly"
                                    :enforceRequired="false"
                                    :enforcePrimary="false"
                                    :propertyIndex="idx"
                                    @change="updateFrameworkCompetencyProperty"
                                    @manage="manageCustomFrameworkCompetencyProperty"
                                    @delete="deleteCustomFrameworkCompetencyProperty" />
                            </tbody>
                        </table>
                    </div>
                </div>
                <div
                    class="px-4 py-4 mb-6"
                    v-if="tab === 'competency' || tab === 'general'">
                    <!-- ************************************** Competency Type Enforcement ************************************************ -->
                    <div
                        class="section box py-4 px-4"
                        id="enforce-competency-types">
                        <div class="columns is-multiline is-mobile">
                            <div class="column">
                                <h5 class="is-size-3 title">
                                    Restrict competency types
                                </h5>
                            </div>
                            <div class="column is-narrow">
                                <div
                                    class="field">
                                    <input
                                        :disabled="readOnly"
                                        @change="checkEnforceTypesChange"
                                        v-model="config.compEnforceTypes"
                                        id="enforceTypesSwitch"
                                        type="checkbox"
                                        name="enforceTypesSwitch"
                                        class="switch is-outlined">
                                    <label for="enforceTypesSwitch" />
                                </div>
                            </div>
                            <div class="column is-12">
                                <p
                                    class="description"
                                    v-if="!readOnly && config.compEnforceTypes">
                                    Competency types limited to the below table presets. If table is left blank, this feature will be turned off on save.
                                </p>
                                <p
                                    class="description"
                                    v-if="!readOnly && !config.compEnforceTypes">
                                    Competency types are not defined, any text field can be entered for competency types. Restrict to limit types.
                                </p>
                            </div>
                        </div>
                        <div
                            v-if="config.compEnforceTypes"
                            class="table-container">
                            <h4 class="is-size-4 title">
                                Permitted values
                                <span
                                    v-if="config.compEnforceTypes && !readOnly"
                                    class="button is-family-primary is-outlined is-pulled-right is-primary "
                                    @click="addCompetencyEnforcedTypeDataHolder">
                                    <span class="icon">
                                        <i class="fa fa-plus" />
                                    </span>
                                    <span>add type</span>
                                </span>
                            </h4>
                            <table class="table is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>
                                            display label
                                        </th>
                                        <th>
                                            field value
                                        </th>
                                        <th> <i class="fa fa-trash" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(et,idx) in config.compEnforcedTypes"
                                        :key="idx">
                                        <th>
                                            <label
                                                class="label"
                                                v-if="readOnly">
                                                {{ et.display }}
                                            </label>
                                            <input
                                                class="input "
                                                v-if="!readOnly"
                                                type="text"
                                                v-model="et.display">
                                        </th>
                                        <td>
                                            <p v-if="readOnly">
                                                {{ et.value }}
                                            </p>
                                            <input
                                                class="input "
                                                v-if="!readOnly"
                                                type="text"
                                                v-model="et.value">
                                        </td>
                                        <td>
                                            <div
                                                class="button is-outlined is-danger "
                                                v-if="!readOnly"
                                                @click="deleteCompetencyEnforcedType(idx)">
                                                <span class="icon">
                                                    <i class="fa fa-trash" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- ************************************** Allow Levels ************************************************ -->
                    <div
                        class="section box py-4 px-4"
                        id="allow-levels">
                        <!-- ************************************** Allow Levels ************************************************ -->
                        <div class="columns is-multiline">
                            <div class="column">
                                <h5 class="is-size-3 title">
                                    Allow Levels
                                </h5>
                            </div>
                            <div class="column is-narrow">
                                <div class="column is-narrow">
                                    <div
                                        class="field">
                                        <input
                                            :disabled="readOnly"
                                            v-model="config.compAllowLevels"
                                            id="allowLevelsSwitch"
                                            type="checkbox"
                                            name="allowLevelsSwitch"
                                            class="switch is-outlined">
                                        <label for="allowLevelsSwitch" />
                                    </div>
                                </div>
                            </div>
                            <div class="column is-12">
                                <p class="description">
                                    Levels can provide an additional context to define and categorize competencies
                                    within frameworks. Levels can include text strings such as "beginner", "intermediate",
                                    "advanced", or any other text string.
                                </p>
                            </div>
                        </div>
                        <div
                            class="field is-horizontal"
                            v-if="config.compAllowLevels">
                            <div class="field-label">
                                <label class="label">
                                    Display label
                                </label>
                            </div>
                            <div class="field-body">
                                <div class="field is-expanded">
                                    <div v-if="readOnly">
                                        {{ config.levelLabel }}
                                    </div>
                                    <div v-if="!readOnly">
                                        <input
                                            class="input"
                                            type="text"
                                            v-model="config.levelLabel">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="config.compAllowLevels"
                            class="field is-horizontal">
                            <div class="field-label">
                                <label class="label">
                                    Description
                                </label>
                            </div>
                            <div class="field-body">
                                <div class="field is-expanded">
                                    <div v-if="readOnly">
                                        {{ config.levelDescription }}
                                    </div>
                                    <div v-if="!readOnly">
                                        <input
                                            class="input "
                                            type="text"
                                            v-model="config.levelDescription">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="config.compAllowLevels"
                            class="field is-horizontal"
                            id="relationship-display-category">
                            <div class="field-label">
                                <label
                                    class="label"
                                    title="category (if any) under which levels are displayed in form inputs">
                                    Display category
                                </label>
                            </div>
                            <div class="field-body">
                                <div class="field is-expanded">
                                    <div v-if="readOnly">
                                        {{ config.levelHeading }}
                                    </div>
                                    <div v-if="!readOnly">
                                        <input
                                            class="input "
                                            type="text"
                                            v-model="config.levelHeading">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="field is-horizontal"
                            id="relationship-display-priority"
                            v-if="config.compAllowLevels">
                            <div class="field-label">
                                <label
                                    class="label"
                                    title="priority in which levels are displayed in form inputs">level display priority: </label>
                            </div>
                            <div class="field-body">
                                <div class="field is-expanded">
                                    <div v-if="readOnly">
                                        {{ config.levelPriority }}
                                    </div>
                                    <div
                                        v-if="!readOnly"
                                        class="select">
                                        <select v-model="config.levelPriority">
                                            <option value="primary">
                                                primary
                                            </option>
                                            <option value="secondary">
                                                secondary
                                            </option>
                                            <option value="tertiary">
                                                tertiary
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ************************************** Enforce Levels ************************************************ -->
                        <div
                            v-if="config.compAllowLevels && tab === 'competency' || tab === 'general'"
                            class=""
                            id="enforce-level-values">
                            <div class="field is-horizontal">
                                <div class="field-label">
                                    <label class="label">
                                        Restrict Level Values
                                    </label>
                                </div>
                                <div class="field-body">
                                    <div
                                        class="field is-expanded">
                                        <input
                                            :disabled="readOnly"
                                            v-model="config.enforceLevelValues"
                                            id="enforceLevelsSwitch"
                                            type="checkbox"
                                            name="enforceLevelsSwitch"
                                            class="switch is-outlined">
                                        <label for="enforceLevelsSwitch" />
                                        <p
                                            v-if="config.enforceLevelValues"
                                            class="help">
                                            RESTRICTED. Levels property values in the framework
                                            editor will be limited to the values in the table
                                            below.
                                        </p>
                                        <p
                                            v-if="!config.enforceLevelValues"
                                            class="help">
                                            Not restricted, any text string can be input in the
                                            framework editor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-if="config.enforceLevelValues"
                                class="table-container box py-4 px-4">
                                <h4 class="is-size-4 title">
                                    Permitted values
                                    <span
                                        class="button is-outlined is-family-primary is-primary is-pulled-right"
                                        v-if="config.enforceLevelValues && !readOnly"
                                        @click="showSelectLevelsModal">
                                        <span class="icon">
                                            <i class="fa fa-cog" />
                                        </span>
                                        <span>manage levels</span>
                                    </span>
                                </h4>
                                <table class="table is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>
                                                name
                                            </th>
                                            <th>
                                                description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="lvlId in localEnforcedLevelValues"
                                            :key="lvlId">
                                            <th class="control">
                                                <p>{{ getLevelNameById(lvlId) }}</p>
                                            </th>
                                            <td>
                                                <p>{{ getLevelDescById(lvlId) }}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ************************************** Competency Relationships ************************************************ -->
                <div
                    class="px-4 mb-6"
                    v-if="tab === 'relationships' || tab === 'general'"
                    id="competency-relationships">
                    <h5 class="title is-size-3">
                        Competency Relationships Configuration
                    </h5>
                    <p class="subtitle">
                        Relationships can be added as properties on competencies to define how competencies
                        within a framework or between two different frameworks relate to each other. Enabled
                        relationships will be available in the property drop down when editing competencies in the framework editor.
                    </p>
                    <div
                        class="box py-4 px-4"
                        id="relationship-display-category">
                        <h4 class="is-size-4 title">
                            Display options
                        </h4>
                        <p class="subtitle">
                            Change when and how your relationships are displayed in framework view and edit modes.
                        </p>
                        <div class="field is-horizontal">
                            <div class="field-label">
                                <label
                                    class="label"
                                    title="category (if any) under which relationships are displayed in form inputs">
                                    Display category
                                </label>
                            </div>
                            <div class="field-body">
                                <div class="field is-expanded">
                                    <div
                                        v-if="readOnly"
                                        class="control is-expanded">
                                        {{ config.relationshipsHeading }}
                                    </div>
                                    <div
                                        v-if="!readOnly"
                                        class="control is-expanded">
                                        <input
                                            class="input "
                                            type="text"
                                            v-model="config.relationshipsHeading">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- relationships display property -->
                        <div
                            class="field is-horizontal"
                            id="relationship-display-category">
                            <div class="field-label">
                                <label
                                    class="label"
                                    title="priority in which relationships are displayed in form inputs">
                                    relationships display priority
                                </label>
                            </div>
                            <div class="field-body">
                                <div class="field is-expanded">
                                    <div
                                        v-if="readOnly"
                                        class="control">
                                        {{ config.relationshipsPriority }}
                                    </div>
                                    <div class="control">
                                        <div
                                            v-if="!readOnly"
                                            class="select">
                                            <select v-model="config.relationshipsPriority">
                                                <option value="primary">
                                                    primary
                                                </option>
                                                <option value="secondary">
                                                    secondary
                                                </option>
                                                <option value="tertiary">
                                                    tertiary
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--- list of selected relationships -->
                    <div
                        class="table-container box py-4"
                        id="relationship-types">
                        <h4 class="is-size-4 title">
                            Relationship types
                            <div
                                @click="showManageRelations()"
                                class="button is-family-primary is-pulled-right is-primary is-outlined">
                                <span class="icon">
                                    <i class="fa fa-cog" />
                                </span>
                                <span>manage relationships</span>
                            </div>
                        </h4>
                        <p class="subtitle">
                            Only enabled relationships will display in the table below. Manage configurations to add new relationship options.
                        </p>
                        <table class="table is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th>
                                        <abbr title="unique relationship ID">
                                            relationship</abbr>
                                    </th>
                                    <th>
                                        <abbr title="label displayed on form inputs">
                                            display label</abbr>
                                    </th>
                                    <th>
                                        <abbr title="if enabled shows up in property options">
                                            enabled</abbr>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <RelationshipListItem
                                    v-for="(relObj, relKey) in this.config.relationships"
                                    :key="relObj.label + relObj.enabled"
                                    v-show="relObj.enabled"
                                    :relationship="relKey"
                                    :label="relObj.label"
                                    :enabled="relObj.enabled"
                                    :readOnly="readOnly"
                                    scope="list"
                                    @change="updateRelationshipProperty" />
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- resource alignment -->
                <div
                    class="px-4 mb-6"
                    v-if="tab === 'alignments' || tab === 'general'"
                    id="resource-alignments">
                    <!-- ************************************** Resource Alignments ************************************************ -->
                    <h5 class="title is-size-3">
                        Resource Alignment Configuration
                    </h5>
                    <p class="subtitle">
                        Alignments terms are used to map resources such as learning material, courses, and other
                        content to competencies in CAT. If enabled, the alignment type property will show up in
                        the framework editor when aligning competencies to resources.
                    </p>
                    <div
                        class="table-container box py-4 px-4"
                        id="alignment-types">
                        <h4 class="is-size-4 title">
                            Alignment types
                        </h4>
                        <table class="table is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th>
                                        <abbr title="unique alignment ID">
                                            alignment</abbr>
                                    </th>
                                    <th>
                                        <abbr title="description of the relationship">
                                            description</abbr>
                                    </th>
                                    <th>
                                        <abbr title="if enabled will appear as an option in the framework editor">
                                            enabled</abbr>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        teaches
                                    </th>
                                    <td>
                                        The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term.
                                    </td>
                                    <td>
                                        <div class="field">
                                            <div class="control is-size-3">
                                                <input
                                                    :disabled="readOnly"
                                                    v-model="config.alignments.teaches"
                                                    id="teachesSwitch"
                                                    type="checkbox"
                                                    name="teachesSwitch"
                                                    class="switch is-outlined">
                                                <label for="teachesSwitch" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        assesses
                                    </th>
                                    <td>
                                        The learning resource being described may be used to assess the competency being referenced.
                                    </td>
                                    <td>
                                        <div class="field">
                                            <div class="control is-size-3">
                                                <input
                                                    :disabled="readOnly"
                                                    v-model="config.alignments.assesses"
                                                    id="assessesSwitch"
                                                    type="checkbox"
                                                    name="assessesSwitch"
                                                    class="switch is-outlined">
                                                <label for="assessesSwitch" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        requires
                                    </th>
                                    <td>
                                        The competency being referenced is required in order for effective outcome of the learning resource being described.
                                    </td>
                                    <td>
                                        <div class="field">
                                            <div class="control is-size-3">
                                                <input
                                                    :disabled="readOnly"
                                                    v-model="config.alignments.requires"
                                                    id="requiresSwitch"
                                                    type="checkbox"
                                                    name="requiresSwitch"
                                                    class="switch is-outlined">
                                                <label for="requiresSwitch" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        desires
                                    </th>
                                    <td>
                                        Knowledge of the learning resource being described is desired by the competency being referenced.
                                    </td>
                                    <td>
                                        <div class="field">
                                            <div class="control is-size-3">
                                                <input
                                                    :disabled="readOnly"
                                                    v-model="config.alignments.desires"
                                                    id="desiresSwitch"
                                                    type="checkbox"
                                                    name="desiresSwitch"
                                                    class="switch is-outlined">
                                                <label for="desiresSwitch" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- default owners -->
                <div
                    class="px-4"
                    v-if="tab === 'users' || tab === 'general'">
                    <h3 class="is-size-3 title">
                        User Configuration
                    </h3>
                    <p class="subtitle">
                        Manage the default owners, and readers of frameworks you author and import.
                    </p>
                    <div
                        class="section box py-4 px-4"
                        id="default-owners">
                        <!-- ************************************** Default Owners ************************************************ -->
                        <h5 class="title is-size-4">
                            Default Owners
                        </h5>
                        <p class="subtitle">
                            Owners can edit, delete, comment, as well as manage access on frameworks.
                        </p>
                        <div
                            v-if="localDefaultOwners.length > 0"
                            class="table-container">
                            <table class="table is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>
                                            name
                                        </th>
                                        <th>
                                            email
                                        </th>
                                        <th>
                                            type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="pk in localDefaultOwners"
                                        :key="pk">
                                        <th class="control">
                                            <p>{{ getPermissionEntityName(pk) }}</p>
                                        </th>
                                        <td>
                                            <p>{{ getPermissionEntityEmail(pk) }}</p>
                                        </td>
                                        <td>
                                            <i
                                                v-if="getPermissionEntityType(pk).equalsIgnoreCase('person')"
                                                class="fa fa-user"
                                                title="user" />
                                            <i
                                                v-if="getPermissionEntityType(pk).equalsIgnoreCase('group')"
                                                class="fa fa-users"
                                                title="group" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div
                            v-else
                            class="has-text-right has-text-small">
                            No default owners added.
                        </div>
                        <div class="buttons is-right">
                            <div
                                class="button is-outlined is-primary "
                                v-if="!readOnly"
                                @click="openSelectPermissionEntitiesModal('owner')">
                                <span class="icon">
                                    <i class="fa fa-cog" />
                                </span><span>manage default owners</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="section box py-4 px-4"
                        id="default-readers">
                        <!-- ************************************** Default Readers ************************************************ -->
                        <div class="container">
                            <h5 class="title is-size-4">
                                Default Readers
                            </h5>
                            <p class="subtitle">
                                Readers can read and comment on frameworks.
                            </p>
                            <div
                                v-if="localDefaultReaders.length > 0"
                                class="table-container">
                                <table class="table is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>
                                                name
                                            </th>
                                            <th>
                                                email
                                            </th>
                                            <th>
                                                type
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="pk in localDefaultReaders"
                                            :key="pk">
                                            <th class="control">
                                                <p>{{ getPermissionEntityName(pk) }}</p>
                                            </th>
                                            <td>
                                                <p>{{ getPermissionEntityEmail(pk) }}</p>
                                            </td>
                                            <td>
                                                <i
                                                    v-if="getPermissionEntityType(pk).equalsIgnoreCase('person')"
                                                    class="fa fa-user"
                                                    title="user" />
                                                <i
                                                    v-if="getPermissionEntityType(pk).equalsIgnoreCase('group')"
                                                    class="fa fa-users"
                                                    title="group" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div
                                v-else
                                class="has-text-right has-text-small">
                                No default readers added.
                            </div>
                            <div class="buttons is-right">
                                <div
                                    class="button is-outlined is-primary "
                                    v-if="!readOnly"
                                    @click="openSelectPermissionEntitiesModal('reader')">
                                    <span class="icon">
                                        <i class="fa fa-cog" />
                                    </span>
                                    <span>manage default readers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="section"
                        id="default-commenters"
                        v-if="showDefaultCommenters">
                        <!-- ************************************** Default Commenters ************************************************ -->
                        <h5 class="header is-size-3">
                            Default Commenters
                        </h5>
                        <p class="description">
                            Commenters can read and comment on frameworks.
                        </p>
                        <div
                            v-if="localDefaultCommenters.length > 0"
                            class="table-container">
                            <table class="table is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>
                                            name
                                        </th>
                                        <th>
                                            email
                                        </th>
                                        <th>
                                            type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="pk in localDefaultCommenters"
                                        :key="pk">
                                        <th class="control">
                                            <p>{{ getPermissionEntityName(pk) }}</p>
                                        </th>
                                        <td>
                                            <p>{{ getPermissionEntityEmail(pk) }}</p>
                                        </td>
                                        <td>
                                            <i
                                                v-if="getPermissionEntityType(pk).equalsIgnoreCase('person')"
                                                class="fa fa-user"
                                                title="user" />
                                            <i
                                                v-if="getPermissionEntityType(pk).equalsIgnoreCase('group')"
                                                class="fa fa-users"
                                                title="group" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div
                            v-else
                            class="has-text-right has-text-small">
                            No default commenters added.
                        </div>
                        <div class="buttons is-right">
                            <div
                                class="button is-outlined is-primary "
                                v-if="!readOnly"
                                @click="openSelectPermissionEntitiesModal('commenter')">
                                <span class="icon">
                                    <i class="fa fa-cog" />
                                </span>
                                <span>manage default commenters</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ************************************** Validation ************************************************ -->
                <div class="section">
                    <div v-if="configInvalid">
                        <p>Configuration is invalid:</p>
                        <p v-if="configNameInvalid">
                            *Configuration name is required
                        </p>
                        <p v-if="configDescriptionInvalid">
                            *Configuration description is required
                        </p>
                        <p v-if="configEnforcedTypesInvalid">
                            *Enforced types must have a display label and field value
                        </p>
                        <p v-if="configRelationshipsInvalid">
                            *Enabled relationships must have a display label
                        </p>
                        <p v-if="configFrameworkIdLabelInvalid">
                            *Framework ID display label is required
                        </p>
                        <p v-if="configFrameworkIdDescriptionInvalid">
                            *Framework ID description is required
                        </p>
                        <p v-if="configFrameworkNameLabelInvalid">
                            *Framework Name display label is required
                        </p>
                        <p v-if="configFrameworkNameDescriptionInvalid">
                            *Framework Name description is required
                        </p>
                        <p v-if="configFrameworkDescLabelInvalid">
                            *Framework Description display label is required
                        </p>
                        <p v-if="configFrameworkDescDescriptionInvalid">
                            *Framework Description description is required
                        </p>
                        <p v-if="configCompetencyIdLabelInvalid">
                            *Competency ID display label required
                        </p>
                        <p v-if="configCompetencyIdDescriptionInvalid">
                            *Competency ID description is required
                        </p>
                        <p v-if="configCompetencyNameLabelInvalid">
                            *Competency Name display label is required
                        </p>
                        <p v-if="configCompetencyNameDescriptionInvalid">
                            *Competency Name description is required
                        </p>
                        <p v-if="configCompetencyDescLabelInvalid">
                            *Competency Description display label is required
                        </p>
                        <p v-if="configCompetencyDescDescriptionInvalid">
                            *Competency Description description is required
                        </p>
                        <p v-if="configCompetencyTypeLabelInvalid">
                            *Competency Type display label is required
                        </p>
                        <p v-if="configCompetencyTypeDescriptionInvalid">
                            *Competency Type description is required
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FrameworkCompetencyPropertyListItem from "./FrameworkCompetencyPropertyListItem";
import RelationshipListItem from "./RelationshipListItem";
import ModalTemplate from '@/components/modalContent/ModalTemplate.vue';
import {cassUtil} from '../../mixins/cassUtil';
import {mapGetters} from 'vuex';

export default {
    mixins: [cassUtil],
    name: 'ConfigurationDetails',
    props: {
        config: {
            type: Object
        },
        readOnly: {
            type: Boolean,
            default: true
        },
        defaultConfigId: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            scrollOptions: {
                container: '#configuration',
                easing: 'linear',
                duration: 300,
                offset: 40
            },
            panelClass: 'panel',
            defaultBrowserConfigId: '',
            showDefaultCommenters: false,
            customPropertyValuesLimited: false,
            customPropertyTypesLimited: false,
            customPropertyConceptsLimited: false,
            showManageRelationshipsModal: false,
            tab: 'general',
            configDetailsBusy: false,
            configInvalid: false,
            configNameInvalid: false,
            configDescriptionInvalid: false,
            configEnforcedTypesInvalid: false,
            configRelationshipsInvalid: false,
            configFrameworkIdLabelInvalid: false,
            configFrameworkIdDescriptionInvalid: false,
            configFrameworkNameLabelInvalid: false,
            configFrameworkNameDescriptionInvalid: false,
            configFrameworkDescLabelInvalid: false,
            configFrameworkDescDescriptionInvalid: false,
            configCompetencyIdLabelInvalid: false,
            configCompetencyIdDescriptionInvalid: false,
            configCompetencyNameLabelInvalid: false,
            configCompetencyNameDescriptionInvalid: false,
            configCompetencyDescLabelInvalid: false,
            configCompetencyDescDescriptionInvalid: false,
            configCompetencyTypeLabelInvalid: false,
            configCompetencyTypeDescriptionInvalid: false,
            showCustomPropertyDetailsModal: false,
            customPropertyModalTitle: '',
            customPropertyParent: '',
            customPropertyIsNew: true,
            customPropertyContext: '',
            customPropertyPropertyName: '',
            customPropertyRange: '',
            customPropertyDescription: '',
            customPropertyLabel: '',
            customPropertyPriority: '',
            customPropertyRequired: false,
            customPropertyHeading: '',
            customPropertyAllowMultiples: false,
            customPropertyOnePerLanguage: true,
            customPropertyPermittedValues: [],
            customPropertyPermittedTypes: [],
            customPropertyPermittedConcepts: [],
            customPropertyInvalid: false,
            customPropertyPropertyNameExists: false,
            customPropertyPropertyNameInvalid: false,
            customPropertyLabelInvalid: false,
            customPropertyDescriptionInvalid: false,
            levelSelectionModalTitle: '',
            showAddNewLevelSection: false,
            newLevelName: '',
            newLevelDescription: '',
            savingLevelBusy: false,
            showSelectLevelModal: false,
            selectedLevelFilter: '',
            selectedLevels: [],
            levelList: [],
            personList: [],
            groupList: [],
            showSelectPermissionEntitiesModal: false,
            permissionEntityList: [],
            selectedPermissionEntities: [],
            permissionEntitiesFilter: '',
            permissionEntitySelectionMode: '',
            permissionEntitySelectionTitle: '',
            levelInvalid: false,
            levelNameInvalid: false,
            localEnforcedLevelValues: this.config.enforcedLevelValues,
            localDefaultOwners: this.config.defaultOwners,
            localDefaultReaders: this.config.defaultReaders,
            localDefaultCommenters: this.config.defaultCommenters,
            cassRelations: ['isEnabledBy', 'narrows', 'broadens', 'requires', 'desires', 'isEquivalentTo', 'isRelatedTo', 'enables'],
            asnRelations: ['majorRelated', 'minorRelated'],
            gemqRelations: ['hasChild', 'isChildOf'],
            filteredConcepts: [],
            filteredTypes: [],
            search: "",
            isOpenAutocomplete: false,
            conceptToAdd: null
        };
    },
    components: {
        FrameworkCompetencyPropertyListItem,
        RelationshipListItem,
        ModalTemplate
    },
    methods: {
        showManageRelations: function() {
            this.showManageRelationshipsModal = true;
        },
        hideManageRelations: function() {
            this.showManageRelationshipsModal = false;
        },
        getPermissionEntityEmail(pk) {
            let pe = this.getPermissionEntityByPk(pk);
            if (pe) return pe.email;
            else return 'unknown user/group email';
        },
        getPermissionEntityType(pk) {
            let pe = this.getPermissionEntityByPk(pk);
            if (pe) return pe.type;
            else return 'unknown type';
        },
        getPermissionEntityName(pk) {
            let pe = this.getPermissionEntityByPk(pk);
            if (pe) return pe.name;
            else return 'unknown user/group name';
        },
        getPermissionEntityByPk(pk) {
            for (let pe of this.permissionEntityList) {
                if (pe.pk.equals(pk)) return pe;
            }
        },
        applySelectPermissionEntities() {
            if (this.permissionEntitySelectionMode.equalsIgnoreCase('owner')) this.localDefaultOwners = this.selectedPermissionEntities;
            else if (this.permissionEntitySelectionMode.equalsIgnoreCase('reader')) this.localDefaultReaders = this.selectedPermissionEntities;
            else if (this.permissionEntitySelectionMode.equalsIgnoreCase('commenter')) this.localDefaultCommenters = this.selectedPermissionEntities;
            this.closeSelectPermissionEntitiesModal();
        },
        closeSelectPermissionEntitiesModal() {
            this.permissionEntitySelectionTitle = '';
            this.selectedPermissionEntities = [];
            this.permissionEntitiesFilter = '';
            this.showSelectPermissionEntitiesModal = false;
        },
        openSelectPermissionEntitiesModal(pesMode) {
            this.permissionEntitySelectionMode = pesMode;
            if (this.permissionEntitySelectionMode.equalsIgnoreCase('owner')) {
                this.selectedPermissionEntities = this.localDefaultOwners;
                this.permissionEntitySelectionTitle = 'Select Default Owners';
            } else if (this.permissionEntitySelectionMode.equalsIgnoreCase('reader')) {
                this.selectedPermissionEntities = this.localDefaultReaders;
                this.permissionEntitySelectionTitle = 'Select Default Readers';
            } else if (this.permissionEntitySelectionMode.equalsIgnoreCase('commenter')) {
                this.selectedPermissionEntities = this.localDefaultCommenters;
                this.permissionEntitySelectionTitle = 'Select Default Commenters';
            }
            this.showSelectPermissionEntitiesModal = true;
        },
        setAllValidationsChecksToValid() {
            this.levelInvalid = false;
            this.levelNameInvalid = false;
        },
        validateLevelFields() {
            this.setAllValidationsChecksToValid();
            if (!this.newLevelName || this.newLevelName.trim().equals('')) {
                this.levelInvalid = true;
                this.levelNameInvalid = true;
            }
        },
        setDataFieldsFromAddLevelToSelectLevel() {
            this.setAllValidationsChecksToValid();
            this.levelSelectionModalTitle = 'Select Enforced Levels';
            this.newLevelName = '';
            this.newLevelDescription = '';
            this.savingLevelBusy = false;
            this.showAddNewLevelSection = false;
        },
        buildLevelListForLevelSaveSuccess(ecla) {
            if (ecla && ecla.length > 0) {
                this.levelList = ecla;
                this.sortLevelList();
            } else this.levelList = [];
            this.setDataFieldsFromAddLevelToSelectLevel();
        },
        buildLevelListForLevelSaveFailure(msg) {
            appLog("Level search failure: " + msg);
            this.configDetailsBusy = false;
        },
        createAndSaveNewLevelSuccess() {
            let paramObj = {};
            paramObj.size = this.LEVEL_SEARCH_SIZE;
            EcLevel.search(window.repo, '', this.buildLevelListForLevelSaveSuccess, this.buildLevelListForLevelSaveFailure, paramObj);
        },
        createAndSaveNewLevelFailure(msg) {
            appLog('Failed to save new level: ' + msg);
            this.setDataFieldsFromAddLevelToSelectLevel();
        },
        createAndSaveNewLevel() {
            let ecl = new EcLevel();
            ecl.generateId(window.repo.selectedServer);
            // this.addAllIdentityPksAsOwners(ecl);
            ecl.name = this.newLevelName.trim();
            if (this.newLevelDescription && !this.newLevelDescription.trim().equals('')) ecl.description = this.newLevelDescription.trim();
            EcRepository.save(ecl, this.createAndSaveNewLevelSuccess, this.createAndSaveNewLevelFailure);
        },
        saveAddNewLevel() {
            this.validateLevelFields();
            if (!this.levelInvalid) {
                this.savingLevelBusy = true;
                this.selectedLevelFilter = '';
                this.createAndSaveNewLevel();
            }
        },
        cancelAddNewLevel() {
            this.setDataFieldsFromAddLevelToSelectLevel();
        },
        showAddNewLevel() {
            this.setAllValidationsChecksToValid();
            this.levelSelectionModalTitle = 'Add New Level';
            this.newLevelName = '';
            this.newLevelDescription = '';
            this.savingLevelBusy = false;
            this.showAddNewLevelSection = true;
            this.$refs.levelsModal.scrollTop = 0;
        },
        closeSelectLevelModal() {
            this.levelSelectionModalTitle = '';
            this.selectedLevels = [];
            this.selectedLevelFilter = '';
            this.newLevelName = '';
            this.newLevelDescription = '';
            this.savingLevelBusy = false;
            this.showAddNewLevelSection = false;
            this.showSelectLevelModal = false;
        },
        applySelectLevels() {
            this.localEnforcedLevelValues = this.selectedLevels;
            this.closeSelectLevelModal();
        },
        showSelectLevelsModal() {
            this.selectedLevels = this.localEnforcedLevelValues;
            this.sortLevelList();
            this.levelSelectionModalTitle = 'Select Enforced Levels';
            this.showAddNewLevelSection = false;
            this.showSelectLevelModal = true;
        },
        getLevelNameById(levelId) {
            let lvl = this.getLevelById(levelId);
            if (!lvl) return 'Unknown';
            else return lvl.getName();
        },
        getLevelDescById(levelId) {
            let lvl = this.getLevelById(levelId);
            if (!lvl) return 'Unknown';
            else return lvl.getDescription();
        },
        getLevelById(levelId) {
            for (let lvl of this.levelList) {
                if (lvl.shortId().equals(levelId)) {
                    return lvl;
                }
            }
            return null;
        },
        setAllConfigValidationsChecksToValid() {
            this.configInvalid = false;
            this.configNameInvalid = false;
            this.configDescriptionInvalid = false;
            this.configEnforcedTypesInvalid = false;
            this.configRelationshipsInvalid = false;
            this.configFrameworkIdLabelInvalid = false;
            this.configFrameworkIdDescriptionInvalid = false;
            this.configFrameworkNameLabelInvalid = false;
            this.configFrameworkNameDescriptionInvalid = false;
            this.configFrameworkDescLabelInvalid = false;
            this.configFrameworkDescDescriptionInvalid = false;
            this.configCompetencyIdLabelInvalid = false;
            this.configCompetencyIdDescriptionInvalid = false;
            this.configCompetencyNameLabelInvalid = false;
            this.configCompetencyNameDescriptionInvalid = false;
            this.configCompetencyDescLabelInvalid = false;
            this.configCompetencyDescDescriptionInvalid = false;
            this.configCompetencyTypeLabelInvalid = false;
            this.configCompetencyTypeDescriptionInvalid = false;
        },
        validateConfigRelationships() {
            let configRelationships = Object.keys(this.config.relationships);
            for (let cr of configRelationships) {
                let relObj = this.config.relationships[cr];
                if (relObj.enabled && (!relObj.label || relObj.label.trim().equals(''))) {
                    this.configInvalid = true;
                    this.configRelationshipsInvalid = true;
                    break;
                }
            }
        },
        validateConfigEnforcedTypes() {
            if (this.config.compEnforceTypes) {
                if (!this.config.compEnforcedTypes || this.config.compEnforcedTypes.length <= 0) {
                    this.configInvalid = true;
                    this.configEnforcedTypesInvalid = true;
                    return;
                }
                for (let et of this.config.compEnforcedTypes) {
                    if (!et.display || et.display.trim().equals('') || !et.value || et.value.trim().equals('')) {
                        this.configInvalid = true;
                        this.configEnforcedTypesInvalid = true;
                        break;
                    }
                }
            }
        },
        validateStaticPropertyFields() {
            if (!this.config.fwkIdLabel || this.config.fwkIdLabel.trim().equals('')) {
                this.configInvalid = true;
                this.configFrameworkIdLabelInvalid = true;
            }
            if (!this.config.fwkIdDescription || this.config.fwkIdDescription.trim().equals('')) {
                this.configInvalid = true;
                this.configFrameworkIdDescriptionInvalid = true;
            }
            if (!this.config.fwkNameLabel || this.config.fwkNameLabel.trim().equals('')) {
                this.configInvalid = true;
                this.configFrameworkNameLabelInvalid = true;
            }
            if (!this.config.fwkNameDescription || this.config.fwkNameDescription.trim().equals('')) {
                this.configInvalid = true;
                this.configFrameworkNameDescriptionInvalid = true;
            }
            if (!this.config.fwkDescLabel || this.config.fwkDescLabel.trim().equals('')) {
                this.configInvalid = true;
                this.configFrameworkDescLabelInvalid = true;
            }
            if (!this.config.fwkDescDescription || this.config.fwkDescDescription.trim().equals('')) {
                this.configInvalid = true;
                this.configFrameworkDescDescriptionInvalid = true;
            }
            if (!this.config.compIdLabel || this.config.compIdLabel.trim().equals('')) {
                this.configInvalid = true;
                this.configCompetencyIdLabelInvalid = true;
            }
            if (!this.config.compIdDescription || this.config.compIdDescription.trim().equals('')) {
                this.configInvalid = true;
                this.configCompetencyIdDescriptionInvalid = true;
            }
            if (!this.config.compNameLabel || this.config.compNameLabel.trim().equals('')) {
                this.configInvalid = true;
                this.configCompetencyNameLabelInvalid = true;
            }
            if (!this.config.compNameDescription || this.config.compNameDescription.trim().equals('')) {
                this.configInvalid = true;
                this.configCompetencyNameDescriptionInvalid = true;
            }
            if (!this.config.compDescLabel || this.config.compDescLabel.trim().equals('')) {
                this.configInvalid = true;
                this.configCompetencyDescLabelInvalid = true;
            }
            if (!this.config.compDescDescription || this.config.compDescDescription.trim().equals('')) {
                this.configInvalid = true;
                this.configCompetencyDescDescriptionInvalid = true;
            }
            if (!this.config.compTypeLabel || this.config.compTypeLabel.trim().equals('')) {
                this.configInvalid = true;
                this.configCompetencyTypeLabelInvalid = true;
            }
            if (!this.config.compTypeDescription || this.config.compTypeDescription.trim().equals('')) {
                this.configInvalid = true;
                this.configCompetencyTypeDescriptionInvalid = true;
            }
        },
        validateConfigFields() {
            this.setAllConfigValidationsChecksToValid();
            if (!this.config.name || this.config.name.trim().equals('')) {
                this.configInvalid = true;
                this.configNameInvalid = true;
            }
            if (!this.config.description || this.config.description.trim().equals('')) {
                this.configInvalid = true;
                this.configDescriptionInvalid = true;
            }
            this.validateConfigEnforcedTypes();
            this.validateConfigRelationships();
            this.validateStaticPropertyFields();
        },
        validateCurrentConfigAndEmitSave() {
            this.validateConfigFields();
            if (!this.configInvalid) {
                this.$emit('save', this.localEnforcedLevelValues, this.localDefaultOwners, this.localDefaultReaders, this.localDefaultCommenters);
            }
        },
        deleteCompetencyEnforcedType(etIndex) {
            this.config.compEnforcedTypes =
                this.config.compEnforcedTypes.slice(0, etIndex).concat(this.config.compEnforcedTypes.slice(etIndex + 1, this.config.compEnforcedTypes.length));
        },
        addCompetencyEnforcedTypeDataHolder() {
            let cef = {};
            cef.display = '';
            cef.value = '';
            this.config.compEnforcedTypes.push(cef);
        },
        checkEnforceTypesChange() {
            if (this.config.compEnforceTypes) {
                if (!this.config.compEnforcedTypes) this.config.compEnforcedTypes = [];
                if (this.config.compEnforcedTypes.length <= 0) this.addCompetencyEnforcedTypeDataHolder();
            }
        },
        getCustomProperty(propertyParent, propertyName) {
            let customProperties = [];
            if (propertyParent.equals('framework')) customProperties = this.config.fwkCustomProperties;
            else if (propertyParent.equals('competency')) customProperties = this.config.compCustomProperties;
            else return null;
            for (let prop of customProperties) {
                if (prop.propertyName && prop.propertyName.equals(propertyName)) return prop;
            }
            return null;
        },
        doesCustomPropertyPropertyNameExist(propertyParent, propertyNameToCheck) {
            if (propertyNameToCheck.equals('id') || propertyNameToCheck.equals('name') || propertyNameToCheck.equals('description')) return true;
            else if (propertyParent.equals('competency') && propertyNameToCheck.equals('type')) return true;
            else {
                let prop = this.getCustomProperty(propertyParent, propertyNameToCheck);
                if (!prop) return false;
                else return true;
            }
        },
        setAllCustomPropertyValidationsChecksToValid() {
            this.customPropertyInvalid = false;
            this.customPropertyPropertyNameExists = false;
            this.customPropertyPropertyNameInvalid = false;
            this.customPropertyLabelInvalid = false;
            this.customPropertyDescriptionInvalid = false;
        },
        validateCustomPropertyFields() {
            this.setAllCustomPropertyValidationsChecksToValid();
            if (!this.customPropertyPropertyName || this.customPropertyPropertyName.trim().equals('')) {
                this.customPropertyInvalid = true;
                this.customPropertyPropertyNameInvalid = true;
            } else if (this.customPropertyIsNew && this.doesCustomPropertyPropertyNameExist(this.customPropertyParent, this.customPropertyPropertyName)) {
                this.customPropertyInvalid = true;
                this.customPropertyPropertyNameExists = true;
            }
            if (!this.customPropertyLabel || this.customPropertyLabel.trim().equals('')) {
                this.customPropertyInvalid = true;
                this.customPropertyLabelInvalid = true;
            }
            if (!this.customPropertyDescription || this.customPropertyDescription.trim().equals('')) {
                this.customPropertyInvalid = true;
                this.customPropertyDescriptionInvalid = true;
            }
        },
        addNewCustomPropertyToConfig() {
            let newProp = {};
            newProp.context = this.customPropertyContext;
            newProp.propertyName = this.customPropertyPropertyName;
            newProp.range = this.customPropertyRange;
            newProp.description = this.customPropertyDescription;
            newProp.label = this.customPropertyLabel;
            newProp.priority = this.customPropertyPriority;
            newProp.required = this.customPropertyRequired;
            newProp.heading = this.customPropertyHeading;
            newProp.allowMultiples = this.customPropertyAllowMultiples;
            newProp.onePerLanguage = this.customPropertyOnePerLanguage;
            if (this.shouldAllowCustomPropertyPermittedValues) newProp.permittedValues = this.customPropertyPermittedValues;
            else newProp.permittedValues = [];
            if (this.shouldAllowCustomPropertyPermittedTypes) {
                newProp.isDirectLink = true;
                newProp.permittedTypes = this.customPropertyPermittedTypes;
            } else {
                newProp.isDirectLink = false;
                newProp.permittedTypes = [];
            }
            if (this.shouldAllowCustomPropertyPermittedConcepts) newProp.permittedConcepts = this.customPropertyPermittedConcepts;
            else newProp.permittedConcepts = [];
            if (this.customPropertyParent.equals('framework')) this.config.fwkCustomProperties.push(newProp);
            else if (this.customPropertyParent.equals('competency')) this.config.compCustomProperties.push(newProp);
        },
        updateExistingConfigCustomProperty() {
            let propToUpdate = this.getCustomProperty(this.customPropertyParent, this.customPropertyPropertyName);
            if (!propToUpdate) appLog('!!!!Could not find existing custom property to update');
            else {
                propToUpdate.description = this.customPropertyDescription;
                propToUpdate.label = this.customPropertyLabel;
                propToUpdate.priority = this.customPropertyPriority;
                propToUpdate.required = this.customPropertyRequired;
                propToUpdate.heading = this.customPropertyHeading;
                propToUpdate.allowMultiples = this.customPropertyAllowMultiples;
                propToUpdate.onePerLanguage = this.customPropertyOnePerLanguage;
                if (this.shouldAllowCustomPropertyPermittedValues) propToUpdate.permittedValues = this.customPropertyPermittedValues;
                else propToUpdate.permittedValues = [];
                if (this.shouldAllowCustomPropertyPermittedTypes) {
                    propToUpdate.permittedTypes = this.customPropertyPermittedTypes;
                    propToUpdate.isDirectLink = true;
                } else {
                    propToUpdate.permittedTypes = [];
                    propToUpdate.isDirectLink = false;
                }
                if (this.shouldAllowCustomPropertyPermittedConcepts) propToUpdate.permittedConcepts = this.customPropertyPermittedConcepts;
                else propToUpdate.permittedConcepts = [];
            }
        },
        trimCustomPropertyPermittedValues() {
            let trimmedPermittedValues = [];
            for (let pv of this.customPropertyPermittedValues) {
                if ((pv.display && (pv.display.trim().length > 0)) && (pv.value && (pv.value.trim().length > 0))) {
                    pv.display = pv.display.trim();
                    pv.value = pv.value.trim();
                    trimmedPermittedValues.push(pv);
                }
            }
            this.customPropertyPermittedValues = trimmedPermittedValues;
        },
        applyCustomPropertyEdits() {
            this.validateCustomPropertyFields();
            if (!this.customPropertyInvalid) {
                this.trimCustomPropertyPermittedValues();
                if (this.customPropertyIsNew) this.addNewCustomPropertyToConfig();
                else this.updateExistingConfigCustomProperty();
                this.closeCustomPropertyModal();
            }
        },
        deleteCustomPropertyPermittedValue(idx) {
            this.customPropertyPermittedValues =
                this.customPropertyPermittedValues.slice(0, idx).concat(this.customPropertyPermittedValues.slice(idx + 1, this.customPropertyPermittedValues.length));
        },
        deleteCustomPropertyPermittedType(idx) {
            this.customPropertyPermittedTypes =
                this.customPropertyPermittedTypes.slice(0, idx).concat(this.customPropertyPermittedTypes.slice(idx + 1, this.customPropertyPermittedTypes.length));
        },
        deleteCustomPropertyPermittedConcept(idx) {
            this.customPropertyPermittedConcepts =
                this.customPropertyPermittedConcepts.slice(0, idx).concat(this.customPropertyPermittedConcepts.slice(idx + 1, this.customPropertyPermittedConcepts.length));
        },
        addCustomPropertyPermittedValue() {
            let pv = {};
            pv.display = '';
            pv.value = '';
            this.customPropertyPermittedValues.push(pv);
        },
        addCustomPropertyPermittedType() {
            let pv = {};
            pv.display = '';
            pv.value = '';
            this.customPropertyPermittedTypes.push(pv);
        },
        simplifyCustomPropertyName() {
            this.customPropertyPropertyName = this.customPropertyPropertyName.replace(/[^0-9a-z]/gi, '');
        },
        reInitCustomPropertyDataHolders() {
            this.customPropertyParent = '';
            this.customPropertyIsNew = true;
            this.customPropertyContext = '';
            this.customPropertyPropertyName = '';
            this.customPropertyRange = '';
            this.customPropertyDescription = '';
            this.customPropertyLabel = '';
            this.customPropertyPriority = '';
            this.customPropertyRequired = false;
            this.customPropertyHeading = '';
            this.customPropertyAllowMultiples = false;
            this.customPropertyOnePerLanguage = true;
            this.customPropertyPermittedValues = [];
            this.customPropertyPermittedTypes = [];
            this.customPropertyPermittedConcepts = [];
            this.customPropertyInvalid = false;
            this.customPropertyPropertyNameExists = false;
            this.customPropertyPropertyNameInvalid = false;
            this.customPropertyLabelInvalid = false;
            this.customPropertyDescriptionInvalid = false;
        },
        closeCustomPropertyModal: function() {
            this.reInitCustomPropertyDataHolders();
            this.customPropertyModalTitle = '';
            this.showCustomPropertyDetailsModal = false;
        },
        initCustomPropertyDataHoldersAsNewProperty() {
            this.reInitCustomPropertyDataHolders();
            this.customPropertyIsNew = true;
            this.customPropertyContext = this.DEFAULT_CUSTOM_PROPERTY_CONTEXT;
            this.customPropertyRange = this.DEFAULT_CUSTOM_PROPERTY_RANGE;
            this.customPropertyPriority = 'primary';
        },
        addCustomFrameworkProperty: function() {
            this.initCustomPropertyDataHoldersAsNewProperty();
            this.customPropertyModalTitle = "New Framework Property";
            this.customPropertyParent = "framework";
            this.showCustomPropertyDetailsModal = true;
        },
        addCustomCompetencyProperty: function() {
            this.initCustomPropertyDataHoldersAsNewProperty();
            this.customPropertyModalTitle = "New Competency Property";
            this.customPropertyParent = "competency";
            this.showCustomPropertyDetailsModal = true;
        },
        generateCopyOfCustomPropertyPermittedValues(prop) {
            let permittedValuesCopy = [];
            if (prop.permittedValues && prop.permittedValues.length > 0) {
                for (let pv of prop.permittedValues) {
                    let cpv = {};
                    cpv.display = pv.display;
                    cpv.value = pv.value;
                    permittedValuesCopy.push(cpv);
                }
            }
            return permittedValuesCopy;
        },
        generateCopyOfCustomPropertyPermittedTypes(prop) {
            let permittedTypesCopy = [];
            if (prop.permittedTypes && prop.permittedTypes.length > 0) {
                for (let pv of prop.permittedTypes) {
                    let cpv = {};
                    cpv.display = pv.display;
                    cpv.value = pv.value;
                    permittedTypesCopy.push(cpv);
                }
            }
            return permittedTypesCopy;
        },
        generateCopyOfCustomPropertyPermittedConcepts(prop) {
            let permittedConceptsCopy = [];
            if (prop.permittedConcepts && prop.permittedConcepts.length > 0) {
                for (let pv of prop.permittedConcepts) {
                    let cpv = {};
                    cpv.display = pv.display;
                    cpv.value = pv.value;
                    permittedConceptsCopy.push(cpv);
                }
            }
            return permittedConceptsCopy;
        },
        initCustomPropertyDataHoldersAsExistingProperty(propertyParent, prop) {
            this.reInitCustomPropertyDataHolders();
            this.search = '';
            this.customPropertyParent = propertyParent;
            this.customPropertyIsNew = false;
            this.customPropertyContext = prop.context;
            this.customPropertyPropertyName = prop.propertyName;
            this.customPropertyRange = prop.range;
            this.customPropertyDescription = prop.description;
            this.customPropertyLabel = prop.label;
            this.customPropertyPriority = prop.priority;
            this.customPropertyRequired = prop.required;
            this.customPropertyHeading = prop.heading;
            this.customPropertyAllowMultiples = prop.allowMultiples;
            this.customPropertyOnePerLanguage = prop.onePerLanguage;
            this.customPropertyPermittedValues = this.generateCopyOfCustomPropertyPermittedValues(prop);
            this.customPropertyPermittedConcepts = this.generateCopyOfCustomPropertyPermittedConcepts(prop);
            if (this.customPropertyPermittedValues.length > 0) this.customPropertyValuesLimited = true;
            else this.customPropertyValuesLimited = false;
            this.customPropertyPermittedTypes = this.generateCopyOfCustomPropertyPermittedTypes(prop);
            if (this.customPropertyPermittedTypes.length > 0) this.customPropertyValuesTypes = true;
            else this.customPropertyTypesLimited = false;
            if (this.customPropertyPermittedConcepts.length > 0) {
                this.customPropertyConceptsLimited = true;
            } else this.customPropertyConceptsLimited = false;
        },
        manageCustomFrameworkProperty: function(propertyIdx) {
            this.initCustomPropertyDataHoldersAsExistingProperty('framework', this.config.fwkCustomProperties[propertyIdx]);
            this.customPropertyModalTitle = "Manage Framework Property";
            this.showCustomPropertyDetailsModal = true;
        },
        manageCustomCompetencyProperty: function(propertyIdx) {
            this.initCustomPropertyDataHoldersAsExistingProperty('competency', this.config.compCustomProperties[propertyIdx]);
            this.customPropertyModalTitle = "Manage Competency Property";
            this.showCustomPropertyDetailsModal = true;
        },
        manageCustomFrameworkCompetencyProperty: function(propertyParent, propertyIdx) {
            if (propertyParent.equals('framework')) this.manageCustomFrameworkProperty(propertyIdx);
            else if (propertyParent.equals('competency')) this.manageCustomCompetencyProperty(propertyIdx);
        },
        deleteCustomFrameworkCompetencyProperty: function(propertyParent, propertyIdx) {
            let customPropertyList;
            if (propertyParent.equals('framework')) customPropertyList = this.config.fwkCustomProperties;
            else if (propertyParent.equals('competency')) customPropertyList = this.config.compCustomProperties;
            customPropertyList = customPropertyList.slice(0, propertyIdx).concat(customPropertyList.slice(propertyIdx + 1, customPropertyList.length));
            if (propertyParent.equals('framework')) this.config.fwkCustomProperties = customPropertyList;
            else if (propertyParent.equals('competency')) this.config.compCustomProperties = customPropertyList;
        },
        updateFrameworkIdProperty: function(field, newValue) {
            if (field.equals("label")) this.config.fwkIdLabel = newValue;
            else if (field.equals("description")) this.config.fwkIdDescription = newValue;
            else if (field.equals("priority")) this.config.fwkIdPriorty = newValue;
            else if (field.equals("heading")) this.config.fwkIdHeading = newValue;
        },
        updateFrameworkNameProperty: function(field, newValue) {
            if (field.equals("label")) this.config.fwkNameLabel = newValue;
            else if (field.equals("description")) this.config.fwkNameDescription = newValue;
            else if (field.equals("heading")) this.config.fwkNameHeading = newValue;
        },
        updateFrameworkDescriptionProperty: function(field, newValue) {
            if (field.equals("label")) this.config.fwkDescLabel = newValue;
            else if (field.equals("description")) this.config.fwkDescDescription = newValue;
            else if (field.equals("priority")) this.config.fwkDescPriority = newValue;
            else if (field.equals("required")) this.config.fwkDescRequired = newValue;
            else if (field.equals("heading")) this.config.fwkDescHeading = newValue;
        },
        updateFrameworkCustomProperty: function(propertyName, field, newValue) {
            let propToUpdate = this.getCustomProperty('framework', propertyName);
            if (field.equals("label")) propToUpdate.label = newValue;
            else if (field.equals("description")) propToUpdate.description = newValue;
            else if (field.equals("priority")) propToUpdate.priority = newValue;
            else if (field.equals("required")) propToUpdate.required = newValue;
            else if (field.equals("heading")) propToUpdate.heading = newValue;
        },
        updateFrameworkProperty: function(propertyName, field, newValue) {
            if (propertyName.equals("id")) this.updateFrameworkIdProperty(field, newValue);
            else if (propertyName.equals("name")) this.updateFrameworkNameProperty(field, newValue);
            else if (propertyName.equals("description")) this.updateFrameworkDescriptionProperty(field, newValue);
            else this.updateFrameworkCustomProperty(propertyName, field, newValue);
        },
        updateCompetencyIdProperty: function(field, newValue) {
            if (field.equals("label")) this.config.compIdLabel = newValue;
            else if (field.equals("description")) this.config.compIdDescription = newValue;
            else if (field.equals("priority")) this.config.compIdPriorty = newValue;
            else if (field.equals("heading")) this.config.compIdHeading = newValue;
        },
        updateCompetencyNameProperty: function(field, newValue) {
            if (field.equals("label")) this.config.compNameLabel = newValue;
            else if (field.equals("description")) this.config.compNameDescription = newValue;
            else if (field.equals("heading")) this.config.compNameHeading = newValue;
        },
        updateCompetencyDescriptionProperty: function(field, newValue) {
            if (field.equals("label")) this.config.compDescLabel = newValue;
            else if (field.equals("description")) this.config.compDescDescription = newValue;
            else if (field.equals("priority")) this.config.compDescPriority = newValue;
            else if (field.equals("required")) this.config.compDescRequired = newValue;
            else if (field.equals("heading")) this.config.compDescHeading = newValue;
        },
        updateCompetencyTypeProperty: function(field, newValue) {
            if (field.equals("label")) this.config.compTypeLabel = newValue;
            else if (field.equals("description")) this.config.compTypeDescription = newValue;
            else if (field.equals("priority")) this.config.compTypePriority = newValue;
            else if (field.equals("required")) this.config.compTypeRequired = newValue;
            else if (field.equals("heading")) this.config.compTypeHeading = newValue;
        },
        updateCompetencyCustomProperty: function(propertyName, field, newValue) {
            let propToUpdate = this.getCustomProperty('competency', propertyName);
            if (field.equals("label")) propToUpdate.label = newValue;
            else if (field.equals("description")) propToUpdate.description = newValue;
            else if (field.equals("priority")) propToUpdate.priority = newValue;
            else if (field.equals("required")) propToUpdate.required = newValue;
            else if (field.equals("heading")) propToUpdate.heading = newValue;
        },
        updateCompetencyProperty: function(propertyName, field, newValue) {
            if (propertyName.equals("id")) this.updateCompetencyIdProperty(field, newValue);
            else if (propertyName.equals("name")) this.updateCompetencyNameProperty(field, newValue);
            else if (propertyName.equals("description")) this.updateCompetencyDescriptionProperty(field, newValue);
            else if (propertyName.equals("type")) this.updateCompetencyTypeProperty(field, newValue);
            else this.updateCompetencyCustomProperty(propertyName, field, newValue);
        },
        updateFrameworkCompetencyProperty: function(propertyParent, propertyName, field, newValue) {
            if (propertyParent.equals('framework')) this.updateFrameworkProperty(propertyName, field, newValue);
            else if (propertyParent.equals('competency')) this.updateCompetencyProperty(propertyName, field, newValue);
        },
        updateRelationshipProperty: function(relationship, field, newValue) {
            this.config.relationships[relationship][field] = newValue;
        },
        sortLevelList() {
            let me = this;
            this.levelList.sort(function(l1, l2) {
                let l1Enforced = me.localEnforcedLevelValues.includes(l1.shortId());
                let l2Enforced = me.localEnforcedLevelValues.includes(l2.shortId());
                if (l1Enforced !== l2Enforced) {
                    if (l2Enforced) return 1;
                    else return -1;
                } else {
                    let l1Owned = me.doesAnyIdentityOwnObject(l1);
                    let l2Owned = me.doesAnyIdentityOwnObject(l2);
                    if (l1Owned !== l2Owned) {
                        if (l2Owned) return 1;
                        else return -1;
                    } else {
                        if (l1.getName() > l2.getName()) return 1;
                        else if (l2.getName() > l1.getName()) return -1;
                        else return 0;
                    }
                }
            });
        },
        addPersonsToPermissionEntityList() {
            for (let p of this.personList) {
                let pEcPk = this.getPersonEcPk(p);
                if (pEcPk) {
                    let pe = {};
                    pe.pk = pEcPk.toPem();
                    pe.name = p.getName();
                    pe.email = p.email;
                    pe.type = 'Person';
                    this.permissionEntityList.push(pe);
                }
            }
        },
        async addGroupsToPermissionEntityList() {
            for (let g of this.groupList) {
                let gEcPk = await this.getOrganizationEcPk(g);
                if (gEcPk) {
                    let pe = {};
                    pe.pk = gEcPk.toPem();
                    pe.name = g.getName();
                    pe.email = 'n/a';
                    pe.type = 'Group';
                    this.permissionEntityList.push(pe);
                }
            }
        },
        sortPersonList() {
            this.personList.sort(function(p1, p2) {
                if (p1.getName() > p2.getName()) return 1;
                else if (p2.getName() > p1.getName()) return -1;
                else return 0;
            });
        },
        sortGroupList() {
            this.groupList.sort(function(g1, g2) {
                if (g1.getName() > g2.getName()) return 1;
                else if (g2.getName() > g1.getName()) return -1;
                else return 0;
            });
        },
        async fetchGroupListForPermissionEntitySuccess(ecoa) {
            this.groupList = ecoa;
            this.sortGroupList();
            await this.addGroupsToPermissionEntityList();
            this.configDetailsBusy = false;
        },
        fetchGroupListForPermissionEntityFailure(msg) {
            appLog("Group search failure: " + msg);
            this.configDetailsBusy = false;
        },
        fetchPersonListForPermissionEntitySuccess(ecpa) {
            this.personList = ecpa;
            this.sortPersonList();
            this.addPersonsToPermissionEntityList();
            this.configDetailsBusy = true;
            let paramObj = {};
            paramObj.size = this.GROUP_SEARCH_SIZE;
            EcOrganization.search(window.repo, '', this.fetchGroupListForPermissionEntitySuccess, this.fetchGroupListForPermissionEntityFailure, paramObj);
        },
        fetchPersonListForPermissionEntityFailure(msg) {
            appLog("Person search failure: " + msg);
            this.configDetailsBusy = false;
        },
        initializePermissionEntityList() {
            this.personList = [];
            this.groupList = [];
            this.permissionEntityList = [];
            this.configDetailsBusy = true;
            let paramObj = {};
            paramObj.size = this.PERSON_SEARCH_SIZE;
            EcPerson.search(window.repo, '', this.fetchPersonListForPermissionEntitySuccess, this.fetchPersonListForPermissionEntityFailure, paramObj);
        },
        initializeLevelListSuccess(ecla) {
            if (ecla && ecla.length > 0) {
                this.levelList = ecla;
                this.sortLevelList();
            } else this.levelList = [];
            // this.configDetailsBusy = false;
            this.initializePermissionEntityList();
        },
        initializeLevelListFailure(msg) {
            appLog("Level search failure: " + msg);
            this.configDetailsBusy = false;
            // this.initializePermissionEntityList();
        },
        initializeDataLists() {
            this.configDetailsBusy = true;
            let paramObj = {};
            paramObj.size = this.LEVEL_SEARCH_SIZE;
            EcLevel.search(window.repo, '', this.initializeLevelListSuccess, this.initializeLevelListFailure, paramObj);
        },
        isCassRelation: function(relType) {
            return this.cassRelations.includes(relType);
        },
        isAsnRelation: function(relType) {
            return this.asnRelations.includes(relType);
        },
        isGemqRelation: function(relType) {
            return this.gemqRelations.includes(relType);
        },
        isOtherRelation: function(relType) {
            return !(this.cassRelations.includes(relType) || this.asnRelations.includes(relType) || this.gemqRelations.includes(relType));
        },
        filterTypes: function() {
            this.filteredTypes = [];
            this.isOpenAutocomplete = true;
            this.filteredTypes = this.customPropertyAvailableTypes.filter(item => item.display.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
        },
        selectType: function(type) {
            // Check for duplicates
            if (!this.customPropertyPermittedTypes.some(e => e.value === type.value)) {
                this.customPropertyPermittedTypes.push(type);
            }
            this.search = '';
            this.isOpenAutocomplete = false;
        },
        filterConcepts: function() {
            this.isOpenAutocomplete = true;
            this.filteredConcepts = this.customPropertyAvailableConcepts.filter(item => item.display.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
        },
        selectConcept: function(concept) {
            // Check for duplicates
            if (!this.customPropertyPermittedConcepts.some(e => e.value === concept.value)) {
                this.customPropertyPermittedConcepts.push(concept);
            }
            this.search = '';
            this.isOpenAutocomplete = false;
        },
        removeType: function(index) {
            this.customPropertyPermittedTypes.splice(index, 1);
        },
        removeConcept: function(index) {
            this.customPropertyPermittedConcepts.splice(index, 1);
        },
        closeAutoComplete: function() {
            this.isOpenAutocomplete = false;
        }
    },
    computed: {
        ...mapGetters({
            LANG_STRING_RANGE: 'configuration/LANG_STRING_RANGE',
            CONFIG_SEARCH_SIZE: 'configuration/CONFIG_SEARCH_SIZE',
            DEFAULT_CONFIGURATION_TYPE: 'configuration/DEFAULT_CONFIGURATION_TYPE',
            DEFAULT_CONFIGURATION_CONTEXT: 'configuration/DEFAULT_CONFIGURATION_CONTEXT',
            LANG_STRING_TYPE: 'configuration/LANG_STRING_TYPE',
            DEFAULT_HEADING: 'configuration/DEFAULT_HEADING',
            LEVEL_SEARCH_SIZE: 'configuration/LEVEL_SEARCH_SIZE',
            GROUP_SEARCH_SIZE: 'configuration/GROUP_SEARCH_SIZE',
            PERSON_SEARCH_SIZE: 'configuration/PERSON_SEARCH_SIZE',
            DEFAULT_CUSTOM_PROPERTY_CONTEXT: 'configuration/DEFAULT_CUSTOM_PROPERTY_CONTEXT',
            DEFAULT_CUSTOM_PROPERTY_RANGE: 'configuration/DEFAULT_CUSTOM_PROPERTY_RANGE'
        }),
        currentConfig: {
            get() {
                return this.$store.getters['configuration/currentConfig'];
            },
            set(val) {
                this.$store.commit('configuration/setCurrentConfig', val);
            }
        },
        customPropertyAvailableConcepts: {
            get() {
                return this.$store.getters['configuration/availableConcepts'];
            },
            set(val) {
                this.$store.commit('configuration/availableConcepts', val);
            }
        },
        customPropertyAvailableTypes: {
            get() {
                return this.$store.getters['configuration/availableTypes'];
            },
            set(val) {
                this.$store.commit('configuration/availableTypes', val);
            }
        },
        isSetInstanceDisabled() {
            if (!this.defaultConfigId) { // if there is no default instance set
                return false;
            } else if (this.defaultConfigId === this.config.is && !this.readOnly) {
                return false;
            } else {
                return true;
            }
        },
        isBrowserDefault: {
            get() {
                if (this.config && (this.defaultBrowserConfigId === this.config.id)) {
                    return true;
                } else {
                    return false;
                }
            },
            set(val) {
                appLog("val", val);
                if (val) {
                    this.$emit('set-browser-default', this.config.id);
                } else {
                    this.$emit('remove-browser-default-config');
                }
            }
        },
        customPropertyRangeReadable: function() {
            if (this.customPropertyRange.equals('http://www.w3.org/2000/01/rdf-schema#langString')) return 'Lang-String';
            else if (this.customPropertyRange.equals('http://schema.org/URL')) return 'URL';
            else if (this.customPropertyRange.equals('http://schema.org/Text')) return 'Text';
            else if (this.customPropertyRange.equals('http://www.w3.org/2001/XMLSchema#dateTime')) return 'Date-Time';
            else if (this.customPropertyRange.equals('http://purl.org/dc/terms/date')) return 'Date';
            else if (this.customPropertyRange.equals('https://schema.cassproject.org/0.4/skos/Concept')) return 'SKOS Concept';
            else if (this.customPropertyRange.equals('https://schema.cassproject.org/0.4/Competency')) return 'Competency';
            else return 'Unknown';
        },
        shouldAllowCustomPropertyPermittedValues: function() {
            if (this.customPropertyRange.equals('http://schema.org/Text')) return true;
            else return false;
        },
        shouldAllowCustomPropertyPermittedTypes: function() {
            if (this.customPropertyRange.equals('https://schema.cassproject.org/0.4/Competency')) return true;
            else return false;
        },
        shouldAllowCustomPropertyPermittedConcepts: function() {
            if (this.customPropertyRange.equals('https://schema.cassproject.org/0.4/skos/Concept')) return true;
            else return false;
        },
        shouldAllowOnePerLangChoice: function() {
            if (this.customPropertyRange.equals(this.LANG_STRING_RANGE)) return true;
            else return false;
        },
        filteredLevels() {
            if (!this.levelList || this.levelList.length <= 0) return [];
            else {
                return this.levelList.filter(level => {
                    return ((level.getName() && level.getName().toLowerCase().indexOf(this.selectedLevelFilter.toLowerCase()) > -1));
                });
            }
        },
        filteredPermissionEntities() {
            if (!this.permissionEntityList || this.permissionEntityList.length <= 0) return [];
            else {
                return this.permissionEntityList.filter(pe => {
                    return ((pe.name && pe.name.toLowerCase().indexOf(this.permissionEntitiesFilter.toLowerCase()) > -1));
                });
            }
        }
    },
    mounted() {
        this.initializeDataLists();
        this.defaultBrowserConfigId = this.getDefaultBrowserConfigId();
    }
};
</script>


<style lang="scss" scoped>
    @import '@/scss/variables.scss';

    #configuration-details {
        transform: translateX(0);
    }
    .is-default {
        position: fixed;
        top: 16px;
        right: 16px;
        width: 150px;
    }
    h3 {
        font-size: $size-3;
        padding-bottom: 1rem;
    }
    h4 {
        font-size:$size-4;
        padding-bottom: 1rem;
    }
    h5 {
        font-size: $size-5;
        padding-bottom: .5rem;
    }
    .listHdr {
        font-weight: bold;
    }
    .selectBox {
        min-height: 20rem;
        max-height: 20rem;
        overflow: auto;
    }
    .description {
        padding-bottom: .75rem;
        font-size: $size-6;
    }
    .sub-list {
        padding-left: .75rem;
    }
    .panel {
        top: 0;
        position: sticky;
    }
    .auto {
        ul {
            // z-index: 10;
            min-height: 40px;
            border-radius: 6px;
            max-height: 120px;
            background-color: white;
            overflow-y: scroll;
            color: $dark;
            border: solid 1px rgba($dark, 0.2);
            li {
                padding: 0.125rem 0.25rem;
                z-index: 10;
                background-color: white;
            }
            li:hover {
                background-color: $link;
                color: white;
                cursor: pointer;
            }
        }
    }
</style>

