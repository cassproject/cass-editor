<template>
    <div class="">
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': configDetailsBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-3x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <!-- permission entities search modal -->
        <div
            class="modal"
            :class="[{'is-active': showSelectPermissionEntitiesModal}]">
            <div class="modal-background" />
            <div class="modal-card">
                <header class="modal-card-head has-background-primary">
                    <p class="modal-card-title has-text-white">
                        {{ permissionEntitySelectionTitle }}
                        <button
                            class="delete is-pulled-right"
                            aria-label="close"
                            @click="closeSelectPermissionEntitiesModal" />
                    </p>
                </header>
                <div class="modal-card-body has-text-dark">
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
                </div>
                <footer class="modal-card-foot has-background-light">
                    <div
                        class="buttons"
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
                </footer>
            </div>
        </div>
        <!-- level search modal -->
        <div
            class="modal"
            :class="[{'is-active': showSelectLevelModal}]">
            <div class="modal-background" />
            <div class="modal-card">
                <header class="modal-card-head has-background-primary">
                    <p class="has-text-white modal-card-title">
                        {{ levelSelectionModalTitle }}
                        <button
                            class="delete is-pulled-right"
                            aria-label="close"
                            @click="closeSelectLevelModal" />
                    </p>
                </header>
                <div
                    ref="levelsModal"
                    class="modal-card-body has-text-dark">
                    <div class="field">
                        <div
                            v-if="!showAddNewLevelSection"
                            class="control">
                            <label class="label">Available Levels:</label>
                            <input
                                class="input is-small"
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
                                    class="is-size-7"
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
                <footer
                    v-if="!showAddNewLevelSection"
                    class="modal-card-foot has-background-light">
                    <div
                        class="buttons"
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
                </footer>
                <footer
                    v-if="showAddNewLevelSection"
                    class="modal-card-foot has-background-light">
                    <div
                        class="buttons"
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
                </footer>
            </div>
        </div>
        <!-- custom property details modal -->
        <div
            class="modal"
            :class="[{'is-active': showCustomPropertyDetailsModal}]">
            <div class="modal-background" />
            <div class="modal-card">
                <header class="modal-card-head has-background-primary">
                    <p class="has-text-white modal-card-title">
                        {{ customPropertyModalTitle }}
                        <button
                            class="delete is-pulled-right"
                            aria-label="close"
                            @click="closeCustomPropertyModal" />
                    </p>
                </header>
                <div class="modal-card-body has-text-dark">
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
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="control">
                                <label class="label">Priority: </label>
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
                                <div class="control">
                                    <input
                                        :disabled="readOnly"
                                        v-model="customPropertyRequired"
                                        id="customPropertyRequiredSwitch"
                                        type="checkbox"
                                        name="customPropertyRequiredSwitch"
                                        class="switch is-large"
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
                        <label class="label">Label</label>
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

                    <div
                        class="box"
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
                                            class="switch is-large"
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
                                    <th>display</th>
                                    <th>value</th>
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
                                                    class="input is-small"

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
                                                    class="input is-small"
                                                    v-model="ev.value">
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                class="button is-outlined is-danger is-outlined is-small"
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
                                class="button is-outlined is-small is-primary"
                                v-if="!readOnly && customPropertyValuesLimited"
                                @click="addCustomPropertyPermittedValue">
                                <span class="icon">
                                    <i class="fa fa-plus" />
                                </span>
                                <span>add</span>
                            </button>
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
                            class="is-size-7"
                            v-if="customPropertyPropertyNameExists">
                            Property name is already in use
                        </div>
                        <div
                            class="is-size-7"
                            v-if="customPropertyPropertyNameInvalid">
                            Property name is required
                        </div>
                        <div
                            class="is-size-7"
                            v-if="customPropertyLabelInvalid">
                            Label is required
                        </div>
                        <div
                            class="is-size-7"
                            v-if="customPropertyDescriptionInvalid">
                            Description is required
                        </div>
                    </div>
                </div>
                <footer class="modal-card-foot has-background-light">
                    <div
                        class="buttons"
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
                                apply new framework property
                            </span>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
        <!-- CONFIGURATION DETAILS BODY CONTENT -->
        <div
            class="section box"
            id="configuration-details">
            <div class="field">
                <label class="label">Name</label>
                <div v-if="readOnly">
                    {{ config.name }}
                </div>
                <div
                    v-if="!readOnly"
                    class="control">
                    <input
                        type="text is-small"
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
                        type="text is-small"
                        class="input"
                        v-model="config.description">
                </div>
            </div>
            <div class="is-default">
                <div
                    v-if="readOnly"
                    class="is-default__badge has-text-centered">
                    <!-- {{ config.isDefault }} -->
                    <span class="icon has-text-primary">
                        <i class="fa fa-check" />
                    </span>
                    <label class="label">default</label>
                </div>
                <div
                    class="is-default__input"
                    v-if="defaultConfigId && defaultConfigId.equals(config.id) && !readOnly">
                    <!--{{ config.isDefault }}-->
                    <div
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
                </div>
            </div>
            <div class="buttons is-right">
                <div
                    class="button is-outlined is-primary"
                    @click="$emit('setBrowserDefault', config.id)">
                    <span class="icon">
                        <i class="fa fa-save" />
                    </span>
                    <span>set as browser default</span>
                </div>
            </div>
        </div>
        <div class="tabs">
            <ul>
                <li
                    @click="tab ='framework'"
                    :class="{'is-active': tab === 'framework'}">
                    <a>Framework</a>
                </li>
                <li
                    @click="tab = 'competency'"
                    :class="{'is-active': tab === 'competency'}">
                    <a>Competency</a>
                </li>
                <li
                    @click="tab = 'relationships'"
                    :class="{'is-active': tab === 'relationships'}">
                    <a>Relationships</a>
                </li>
                <li
                    @click="tab = 'alignments'"
                    :class="{'is-active': tab === 'alignments'}">
                    <a>Alignments</a>
                </li>
                <li
                    @click="tab = 'users'"
                    :class="{'is-active': tab === 'users'}">
                    <a>Users</a>
                </li>
            </ul>
        </div>
        <!-- ************************************** Framework Properties ************************************************ -->
        <div
            class="section"
            v-if="tab === 'framework'"
            id="framework-properties">
            <h5 class="header is-size-3">
                Framework Properties
            </h5>
            <p class="description">
                Framework properties are the values that can be added, edited, and deleted
                for framework objects. Minimum framework properties are <b>id</b>, <b>name</b>, and <b>description</b>.
                Properties added here will be displayed in the framework object at the top of
                the framework editor view.
            </p>
            <div class="table-container">
                <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th><abbr title="unique property ID">property</abbr></th>
                            <th><abbr title="label to be displayed in form inputs">label</abbr></th>
                            <th><abbr title="description of this property">description</abbr></th>
                            <th><abbr title="required">required</abbr></th>
                            <th><abbr title="priority">priority</abbr></th>
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
                            :custom="false"
                            :readOnly="readOnly"
                            :enforceRequired="false"
                            :enforcePrimary="false"
                            @change="updateFrameworkCompetencyProperty" />
                        <FrameworkCompetencyPropertyListItem
                            v-for="(prop,idx) in config.fwkCustomProperties"
                            :key="prop.propertyName + '_' + prop.label + '_' + prop.description + '_' + prop.required + '_' + prop.priority"
                            propertyParent="framework"
                            :property="prop.propertyName"
                            :label="prop.label"
                            :description="prop.description"
                            :required="prop.required"
                            :priority="prop.priority"
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
            <div
                class="buttons is-right"
                v-if="!readOnly">
                <div
                    class="button is-outlined is-small is-primary"
                    @click="addCustomFrameworkProperty">
                    <span class="icon">
                        <i class="fa fa-plus" />
                    </span>
                    <span>
                        add custom framework property
                    </span>
                </div>
            </div>
        </div>
        <!-- ************************************** Competency Properties ************************************************ -->
        <div
            class="section"
            v-else-if="tab === 'competency'"
            id="competency-properties">
            <h5 class="is-size-3">
                Competency Properties
            </h5>
            <p class="description">
                Competency properties are the values that can be added, edited, and deleted
                for competency objects. Default competency properties are <b>id</b>, <b>name</b>, and <b>description</b>,
                and <b>type</b>. Properties added here will be be available when editing competency level objects
                in the framework editor.
            </p>
            <div class="table-container">
                <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th><abbr title="unique property ID">property</abbr></th>
                            <th><abbr title="label to be displayed in form inputs">label</abbr></th>
                            <th><abbr title="description of the property">description</abbr></th>
                            <th><abbr title="required">required</abbr></th>
                            <th><abbr title="priorities correlate to view levels in the editor">priority</abbr></th>
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
                            :custom="false"
                            :readOnly="readOnly"
                            :enforceRequired="false"
                            :enforcePrimary="false"
                            @change="updateFrameworkCompetencyProperty" />
                        <FrameworkCompetencyPropertyListItem
                            v-for="(prop,idx) in config.compCustomProperties"
                            :key="prop.propertyName + '_' + prop.label + '_' + prop.description + '_' + prop.required + '_' + prop.priority"
                            propertyParent="competency"
                            :property="prop.propertyName"
                            :label="prop.label"
                            :description="prop.description"
                            :required="prop.required"
                            :priority="prop.priority"
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
            <div
                class="buttons is-right"
                v-if="!readOnly">
                <div
                    class="button is-outlined is-small is-primary"
                    @click="addCustomCompetencyProperty">
                    <span class="icon">
                        <i class="fa fa-plus" />
                    </span>
                    <span>
                        add custom competency property
                    </span>
                </div>
            </div>
        </div>
        <div
            class="section"
            v-if="tab === 'competency'">
            <h4 class="header is-size-3">
                Optional Competency Property Settings
            </h4>
            <!-- ************************************** Competency Type Enforcement ************************************************ -->
            <div
                class="section box"
                id="enforce-competency-types">
                <div class="columns is-multiline is-mobile">
                    <div class="column">
                        <h5 class="is-size-3">
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
                                class="switch">
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
                    <table class="table is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>
                                    label
                                </th>
                                <th>
                                    value
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
                                        class="input is-small"
                                        v-if="!readOnly"
                                        type="text"
                                        v-model="et.display">
                                </th>
                                <td>
                                    <p v-if="readOnly">
                                        {{ et.value }}
                                    </p>
                                    <input
                                        class="input is-small"
                                        v-if="!readOnly"
                                        type="text"
                                        v-model="et.value">
                                </td>
                                <td>
                                    <div
                                        class="button is-outlined is-small"
                                        v-if="!readOnly"
                                        @click="deleteCompetencyEnforcedType(idx)">
                                        delete
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    class="buttons is-right"
                    v-if="config.compEnforceTypes">
                    <div
                        class="button is-outlined is-primary is-small"
                        v-if="!readOnly"
                        @click="addCompetencyEnforcedTypeDataHolder">
                        <span class="icon">
                            <i class="fa fa-plus" />
                        </span>
                        <span>add type</span>
                    </div>
                </div>
            </div>
            <!-- ************************************** Allow Levels ************************************************ -->
            <div
                class="section box"
                id="allow-levels">
                <!-- ************************************** Allow Levels ************************************************ -->
                <div class="columns is-multiline">
                    <div class="column">
                        <h5>Allow Levels</h5>
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
                                    class="switch">
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
                    class="field"
                    v-if="config.compAllowLevels">
                    <label class="label">level label: </label>
                    <div v-if="readOnly">
                        {{ config.levelLabel }}
                    </div>
                    <div v-if="!readOnly">
                        <input
                            class="input is-small"
                            type="text"
                            v-model="config.levelLabel">
                    </div>
                </div>
                <div
                    v-if="config.compAllowLevels"
                    class="field">
                    <label class="label">level description: </label>
                    <div v-if="readOnly">
                        {{ config.levelDescription }}
                    </div>
                    <div v-if="!readOnly">
                        <input
                            class="input is-small"
                            type="text"
                            v-model="config.levelDescription">
                    </div>
                </div>
                <!-- ************************************** Enforce Levels ************************************************ -->
                <div
                    v-if="config.compAllowLevels && tab === 'competency'"
                    class=""
                    id="enforce-level-values">
                    <div class="columns is-multiline is-mobile">
                        <div class="column">
                            <h5>Restrict Level Values</h5>
                        </div>
                        <div class="column is-narrow">
                            <div
                                class="field">
                                <input
                                    :disabled="readOnly"
                                    v-model="config.enforceLevelValues"
                                    id="enforceLevelsSwitch"
                                    type="checkbox"
                                    name="enforceLevelsSwitch"
                                    class="switch">
                                <label for="enforceLevelsSwitch" />
                            </div>
                        </div>
                        <div class="column is-12">
                            <p
                                v-if="config.enforceLevelValues"
                                class="description">
                                Levels are restricting. Levels property values in the framework
                                editor will be limited to the values in the below
                                table.
                            </p>
                            <p
                                v-if="!config.enforceLevelValues"
                                class="description">
                                Levels are not restricted, any text string can be input in the
                                framework editor. If no values are input in the table below
                                this option will be turned off.
                            </p>
                        </div>
                    </div>
                    <div
                        v-if="config.enforceLevelValues"
                        class="table-container">
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
                    <div
                        class="buttons is-right"
                        v-if="config.enforceLevelValues">
                        <div
                            class="button is-outlined is-primary is-small"
                            @click="showSelectLevelsModal">
                            <span class="icon">
                                <i class="fa fa-cog" />
                            </span>
                            <span>manage levels</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ************************************** Competency Relationships ************************************************ -->
        <div
            class="section"
            v-if="tab === 'relationships'"
            id="competency-relationships">
            <h5 class="header is-size-3">
                Competency Relationships
            </h5>
            <p class="description">
                Relationship can be added as properties on competencies to define how competencies
                within a framework or between two different frameworks relate to eachother. Enabled
                relationships will be available in the property drop down when editing competencies in the framework editor.
            </p>
            <!-- modal for managing relationships
                modal should show separate lists using a :show="type=TypeString" for the various categorized types
                only selected items will show up in main list  -->
            <div
                v-if="showManageRelationshipsModal"
                class="modal is-active has-background-white">
                <div class="modal-background" />
                <div class="modal-card has-background-white">
                    <header class="modal-card-head has-text-white has-background-primary">
                        <p class="modal-card-title">
                            Manage relationship types
                        </p>
                        <button
                            class="delete is-pulled-right"
                            aria-label="close"
                            @click="showManageRelationshipsModal = false" />
                    </header>
                    <section class="modal-card-body">
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
                                                label</abbr>
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
                                        :key="relKey"
                                        :relationship="relKey"
                                        :label="relObj.label"
                                        :enabled="relObj.enabled"
                                        :readOnly="readOnly"
                                        @change="updateRelationshipProperty" />
                                </tbody>
                            </table>
                        </div>
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
                                                label</abbr>
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
                                        :key="relKey"
                                        :relationship="relKey"
                                        :label="relObj.label"
                                        :enabled="relObj.enabled"
                                        :readOnly="readOnly"
                                        @change="updateRelationshipProperty" />
                                </tbody>
                            </table>
                        </div>
                        <h3 class="header is-size-4">
                            CEMQ
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
                                                label</abbr>
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
                                        :key="relKey"
                                        :relationship="relKey"
                                        :label="relObj.label"
                                        :enabled="relObj.enabled"
                                        :readOnly="readOnly"
                                        @change="updateRelationshipProperty" />
                                </tbody>
                            </table>
                        </div>
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
                                                label</abbr>
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
                                        :key="relKey"
                                        :relationship="relKey"
                                        :label="relObj.label"
                                        :enabled="relObj.enabled"
                                        :readOnly="readOnly"
                                        @change="updateRelationshipProperty" />
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <div class="button is-primary is-outlined">
                            apply
                        </div>
                    </footer>
                </div>
            </div>
            <!--- list of selected relationships -->
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
                                    label</abbr>
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
                            :key="relKey"
                            v-show="relObj.enabled"
                            :relationship="relKey"
                            :label="relObj.label"
                            :enabled="relObj.enabled"
                            :readOnly="readOnly"
                            @change="updateRelationshipProperty" />
                    </tbody>
                </table>
            </div>
            <div class="buttons is-right">
                <div
                    @click="showManageRelations()"
                    class="button is-small is-primary is-outlined">
                    <span class="icon">
                        <i class="fa fa-cog" />
                    </span>
                    <span>manage relationships</span>
                </div>
            </div>
        </div>
        <!-- resource alignment -->
        <div
            class="section"
            v-if="tab === 'alignments'"
            id="resource-alignments">
            <!-- ************************************** Resource Alignments ************************************************ -->
            <h5 class="header is-size-3">
                Resource Alignment
            </h5>
            <p class="description">
                Alignments terms are used to map resources such as learning material, courses, and other
                content to competencies in CAT. If enabled, the alignment type property will show up in
                the framework editor when aligning comeptencies to resources.
            </p>
            <div class="table-container">
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
                                    <input
                                        :disabled="readOnly"
                                        v-model="config.alignments.teaches"
                                        id="teachesSwitch"
                                        type="checkbox"
                                        name="teachesSwitch"
                                        class="switch">
                                    <label for="teachesSwitch" />
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
                                    <input
                                        :disabled="readOnly"
                                        v-model="config.alignments.assesses"
                                        id="assessesSwitch"
                                        type="checkbox"
                                        name="assessesSwitch"
                                        class="switch">
                                    <label for="assessesSwitch" />
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
                                    <input
                                        :disabled="readOnly"
                                        v-model="config.alignments.requires"
                                        id="requiresSwitch"
                                        type="checkbox"
                                        name="requiresSwitch"
                                        class="switch">
                                    <label for="requiresSwitch" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- default owners -->
        <template v-if="tab === 'users'">
            <div
                class="section"
                id="default-owners">
                <!-- ************************************** Default Owners ************************************************ -->
                <h5 class="header is-size-3">
                    Default Owners
                </h5>
                <p class="description">
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
                        class="button is-outlined is-primary is-small"
                        v-if="!readOnly"
                        @click="openSelectPermissionEntitiesModal('owner')">
                        <span class="icon">
                            <i class="fa fa-cog" />
                        </span><span>manage default owners</span>
                    </div>
                </div>
            </div>
            <div
                class="section"
                id="default-readers">
                <!-- ************************************** Default Readers ************************************************ -->
                <h5 class="header is-size-3">
                    Default Readers
                </h5>
                <p class="description">
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
                        class="button is-outlined is-primary is-small"
                        v-if="!readOnly"
                        @click="openSelectPermissionEntitiesModal('reader')">
                        <span class="icon">
                            <i class="fa fa-cog" />
                        </span>
                        <span>manage default readers</span>
                    </div>
                </div>
            </div>
            <div
                class="section"
                id="default-commenters">
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
                        class="button is-outlined is-primary is-small"
                        v-if="!readOnly"
                        @click="openSelectPermissionEntitiesModal('commenter')">
                        <span class="icon">
                            <i class="fa fa-cog" />
                        </span>
                        <span>manage default commenters</span>
                    </div>
                </div>
            </div>
        </template>
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
                    *Enforced types must have a label and value
                </p>
                <p v-if="configRelationshipsInvalid">
                    *Enabled relationships must have a label
                </p>
                <p v-if="configFrameworkIdLabelInvalid">
                    *Framework ID Label is required
                </p>
                <p v-if="configFrameworkIdDescriptionInvalid">
                    *Framework ID Description is required
                </p>
                <p v-if="configFrameworkNameLabelInvalid">
                    *Framework Name Label is required
                </p>
                <p v-if="configFrameworkNameDescriptionInvalid">
                    *Framework Name Description is required
                </p>
                <p v-if="configFrameworkDescLabelInvalid">
                    *Framework Description Label is required
                </p>
                <p v-if="configFrameworkDescDescriptionInvalid">
                    *Framework Description Description is required
                </p>
                <p v-if="configCompetencyIdLabelInvalid">
                    *Competency ID Label required
                </p>
                <p v-if="configCompetencyIdDescriptionInvalid">
                    *Competency ID Description is required
                </p>
                <p v-if="configCompetencyNameLabelInvalid">
                    *Competency Name Label is required
                </p>
                <p v-if="configCompetencyNameDescriptionInvalid">
                    *Competency Name Description is required
                </p>
                <p v-if="configCompetencyDescLabelInvalid">
                    *Competency Description Label is required
                </p>
                <p v-if="configCompetencyDescDescriptionInvalid">
                    *Competency Description Description is required
                </p>
                <p v-if="configCompetencyTypeLabelInvalid">
                    *Competency Type Label is required
                </p>
                <p v-if="configCompetencyTypeDescriptionInvalid">
                    *Competency Type Description is required
                </p>
            </div>
        </div>
        <!-- ************************************** Actions ************************************************ -->
        <div class="section">
            <div
                class="buttons is-right"
                v-if="!readOnly">
                <div
                    class="button is-outlined is-dark"
                    @click="$emit('cancel')">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span>
                    <span>cancel</span>
                </div>
                <div
                    class="button is-outlined is-primary"
                    @click="validateCurrentConfigAndEmitSave">
                    <span class="icon">
                        <i class="fa fa-save" />
                    </span><span>save</span>
                </div>
            </div>
            <div
                class="buttons is-right"
                v-if="readOnly">
                <div
                    class="button is-outlined is-primary"
                    @click="$emit('back')">
                    back
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FrameworkCompetencyPropertyListItem from "./FrameworkCompetencyPropertyListItem";
import RelationshipListItem from "./RelationshipListItem";
import {cassUtil} from '../../mixins/cassUtil';

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
            customPropertyValuesLimited: false,
            showManageRelationshipsModal: false,
            tab: 'framework',
            LEVEL_SEARCH_SIZE: 10000,
            GROUP_SEARCH_SIZE: 10000,
            PERSON_SEARCH_SIZE: 10000,
            DEFAULT_CUSTOM_PROPERTY_CONTEXT: 'https://schema.cassproject.org/0.4/',
            DEFAULT_CUSTOM_PROPERTY_RANGE: 'http://schema.org/Text',
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
            customPropertyPermittedValues: [],
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
            localDefaultCommenters: this.config.defaultCommenters
        };
    },
    components: {
        FrameworkCompetencyPropertyListItem,
        RelationshipListItem
    },
    methods: {
        showManageRelations: function() {
            this.showManageRelationshipsModal = true;
        },
        getPermissionEntityEmail(pk) {
            let pe = this.getPermissionEntityByPk(pk);
            if (pe) return pe.email;
            else return 'unknown';
        },
        getPermissionEntityType(pk) {
            let pe = this.getPermissionEntityByPk(pk);
            if (pe) return pe.type;
            else return 'unknown';
        },
        getPermissionEntityName(pk) {
            let pe = this.getPermissionEntityByPk(pk);
            if (pe) return pe.name;
            else return 'unknown';
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
            console.log("Level search failure: " + msg);
            this.configDetailsBusy = false;
        },
        createAndSaveNewLevelSuccess() {
            let paramObj = {};
            paramObj.size = this.LEVEL_SEARCH_SIZE;
            EcLevel.search(window.repo, '', this.buildLevelListForLevelSaveSuccess, this.buildLevelListForLevelSaveFailure, paramObj);
        },
        createAndSaveNewLevelFailure(msg) {
            console.log('Failed to save new level: ' + msg);
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
            if (this.shouldAllowCustomPropertyPermittedValues) newProp.permittedValues = this.customPropertyPermittedValues;
            else newProp.permittedValues = [];
            if (this.customPropertyParent.equals('framework')) this.config.fwkCustomProperties.push(newProp);
            else if (this.customPropertyParent.equals('competency')) this.config.compCustomProperties.push(newProp);
        },
        updateExistingConfigCustomProperty() {
            let propToUpdate = this.getCustomProperty(this.customPropertyParent, this.customPropertyPropertyName);
            if (!propToUpdate) console.log('!!!!Could not find existing custom property to update');
            else {
                propToUpdate.description = this.customPropertyDescription;
                propToUpdate.label = this.customPropertyLabel;
                propToUpdate.priority = this.customPropertyPriority;
                propToUpdate.required = this.customPropertyRequired;
                if (this.shouldAllowCustomPropertyPermittedValues) propToUpdate.permittedValues = this.customPropertyPermittedValues;
                else propToUpdate.permittedValues = [];
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
        addCustomPropertyPermittedValue() {
            let pv = {};
            pv.display = '';
            pv.value = '';
            this.customPropertyPermittedValues.push(pv);
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
            this.customPropertyPermittedValues = [];
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
        initCustomPropertyDataHoldersAsExistingProperty(propertyParent, prop) {
            this.reInitCustomPropertyDataHolders();
            this.customPropertyParent = propertyParent;
            this.customPropertyIsNew = false;
            this.customPropertyContext = prop.context;
            this.customPropertyPropertyName = prop.propertyName;
            this.customPropertyRange = prop.range;
            this.customPropertyDescription = prop.description;
            this.customPropertyLabel = prop.label;
            this.customPropertyPriority = prop.priority;
            this.customPropertyRequired = prop.required;
            this.customPropertyPermittedValues = this.generateCopyOfCustomPropertyPermittedValues(prop);
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
        },
        updateFrameworkNameProperty: function(field, newValue) {
            if (field.equals("label")) this.config.fwkNameLabel = newValue;
            else if (field.equals("description")) this.config.fwkNameDescription = newValue;
        },
        updateFrameworkDescriptionProperty: function(field, newValue) {
            if (field.equals("label")) this.config.fwkDescLabel = newValue;
            else if (field.equals("description")) this.config.fwkDescDescription = newValue;
            else if (field.equals("priority")) this.config.fwkDescPriority = newValue;
            else if (field.equals("required")) this.config.fwkDescRequired = newValue;
        },
        updateFrameworkCustomProperty: function(propertyName, field, newValue) {
            let propToUpdate = this.getCustomProperty('framework', propertyName);
            if (field.equals("label")) propToUpdate.label = newValue;
            else if (field.equals("description")) propToUpdate.description = newValue;
            else if (field.equals("priority")) propToUpdate.priority = newValue;
            else if (field.equals("required")) propToUpdate.required = newValue;
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
        },
        updateCompetencyNameProperty: function(field, newValue) {
            if (field.equals("label")) this.config.compNameLabel = newValue;
            else if (field.equals("description")) this.config.compNameDescription = newValue;
        },
        updateCompetencyDescriptionProperty: function(field, newValue) {
            if (field.equals("label")) this.config.compDescLabel = newValue;
            else if (field.equals("description")) this.config.compDescDescription = newValue;
            else if (field.equals("priority")) this.config.compDescPriority = newValue;
            else if (field.equals("required")) this.config.compDescRequired = newValue;
        },
        updateCompetencyTypeProperty: function(field, newValue) {
            if (field.equals("label")) this.config.compTypeLabel = newValue;
            else if (field.equals("description")) this.config.compTypeDescription = newValue;
            else if (field.equals("priority")) this.config.compTypePriority = newValue;
            else if (field.equals("required")) this.config.compTypeRequired = newValue;
        },
        updateCompetencyCustomProperty: function(propertyName, field, newValue) {
            let propToUpdate = this.getCustomProperty('competency', propertyName);
            if (field.equals("label")) propToUpdate.label = newValue;
            else if (field.equals("description")) propToUpdate.description = newValue;
            else if (field.equals("priority")) propToUpdate.priority = newValue;
            else if (field.equals("required")) propToUpdate.required = newValue;
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
        addGroupsToPermissionEntityList() {
            for (let g of this.groupList) {
                let gEcPk = this.getOrganizationEcPk(g);
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
        fetchGroupListForPermissionEntitySuccess(ecoa) {
            this.groupList = ecoa;
            this.sortGroupList();
            this.addGroupsToPermissionEntityList();
            this.configDetailsBusy = false;
        },
        fetchGroupListForPermissionEntityFailure(msg) {
            console.log("Group search failure: " + msg);
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
            console.log("Person search failure: " + msg);
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
            console.log("Level search failure: " + msg);
            this.configDetailsBusy = false;
            // this.initializePermissionEntityList();
        },
        initializeDataLists() {
            this.configDetailsBusy = true;
            let paramObj = {};
            paramObj.size = this.LEVEL_SEARCH_SIZE;
            EcLevel.search(window.repo, '', this.initializeLevelListSuccess, this.initializeLevelListFailure, paramObj);
        }
    },
    computed: {
        customPropertyRangeReadable: function() {
            if (this.customPropertyRange.equals('http://www.w3.org/2000/01/rdf-schema#langString')) return 'Lang-String';
            else if (this.customPropertyRange.equals('http://schema.org/URL')) return 'URL';
            else if (this.customPropertyRange.equals('http://schema.org/Text')) return 'Text';
            else if (this.customPropertyRange.equals('http://www.w3.org/2001/XMLSchema#dateTime')) return 'Date-Time';
            else if (this.customPropertyRange.equals('http://purl.org/dc/terms/date')) return 'Date';
            else if (this.customPropertyRange.equals('https://schema.cassproject.org/0.4/skos/Concept')) return 'SKOS Concept';
            else return 'Unknown';
        },
        shouldAllowCustomPropertyPermittedValues: function() {
            if (this.customPropertyRange.equals('http://schema.org/Text')) return true;
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
        font-size: $is-size-3;
        padding-bottom: 1rem;
    }
    h4 {
        font-size:$is-size-4;
        padding-bottom: 1rem;
    }
    h5 {
        font-size: $is-size-5;
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
        font-size: $is-size-7;
    }
</style>

