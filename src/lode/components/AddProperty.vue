<template>
    <div>
        <!-- create new level input name modal -->
        <modal-template
            :active="createNewLevelNameModal"
            @close="closeNewLevelNameModal">
            <template slot="modal-header">
                Create New Level
            </template>
            <template slot="modal-body">
                <div
                    class="field">
                    <div class="label">
                        <label>Name of new level</label>
                    </div>
                    <div class="control">
                        <div class="control">
                            <input
                                id="new-level-name-input"
                                class="input"
                                placeholder="Name of new level"
                                v-model="newLevelName">
                        </div>
                    </div>
                </div>
            </template>
            <template slot="modal-foot">
                <button
                    id="add-new-level-button"
                    @click="addNewLevel"
                    class="is-outlined button">
                    Create
                </button>
                <button
                    id="cancel-new-level-button"
                    @click="closeNewLevelNameModal"
                    class="is-dark button">
                    Cancel
                </button>
            </template>
        </modal-template>
        <div class="">
            <div class="px-1">
                <h2 class="title is-size-2 has-text-weight-light">
                    Adding property
                </h2>
                <p
                    class="subtitle is-size-5"
                    v-if="selectedPropertyToAdd === ''">
                    Select a property from one of the following groups.
                </p>
                <p
                    class="subtitle is-size-5"
                    v-else-if="selectedPropertyToAdd !== '' && !selectedPropertyToAddIsTextValue">
                    When adding relationships or levels, you can
                    either search for existing relationships/levels or
                    add one via url. Choose one.
                </p>
            </div>
            <div
                class="py-4 px-1"
                v-if="selectedPropertyToAdd !== ''">
                <p
                    v-if="selectedPropertyToAdd !== ''"
                    class="title is-size-3 has-text-weight-normal">
                    {{ selectedPropertyToAdd.label }}
                    <span
                        id="add-property-back-button"
                        @click="selectedPropertyToAdd = ''; addRelationBy = '';"

                        class="button is-pulled-right is-text has-text-primary">
                        <span class="icon">
                            <i class="fa fa-arrow-left" />
                        </span>
                        <span>back</span>
                    </span>
                </p>
                <!-- text property input -->
                <div
                    v-if="(selectedPropertyToAddIsTextValue || addRelationBy === 'url') && !selectedPropertyToAddIsVersionIdentifier"
                    class="add-property-field">
                    <!-- if it is a text input type, show the following -->
                    <div class="add-property__input-type">
                        <div class="add-property__select-type">
                            <div class="field is-expanded">
                                <!-- if options -->
                                <template v-if="checkedOptions && profile && profile[selectedPropertyToAdd.value] && profile[selectedPropertyToAdd.value]['options']">
                                    <p class="subtitle is-size-6">
                                        Choose one or more of the following levels.
                                    </p>
                                    <div
                                        class="field"
                                        v-for="each in optionsArray"
                                        :key="each">
                                        <input
                                            type="checkbox"
                                            class="is-checkradio"
                                            v-model="checkedOptions"
                                            :value="each.val"
                                            :name="each.val"
                                            :id="each.val">
                                        <label
                                            class="label"
                                            :for="each.val">
                                            {{ each.name }}
                                        </label>
                                    </div>
                                </template>
                                <PropertyString
                                    v-else
                                    index="null"
                                    :expandedProperty="selectedPropertyToAdd.value"
                                    :langString="selectedPropertyToAddIsLangString"
                                    :range="selectedPropertyRange"
                                    :newProperty="true"
                                    :profile="profile"
                                    :addSingle="true"
                                    :valueFromSearching="selectedPropertyToAddValue"
                                    :options="(profile && profile[selectedPropertyToAdd.value] && profile[selectedPropertyToAdd.value]['options']) ? profile[selectedPropertyToAdd.value]['options'] : null" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Version Identifier input - special handling for complex object -->
                <div
                    v-else-if="selectedPropertyToAddIsVersionIdentifier"
                    class="add-property-field">
                    <div class="add-property__input-type">
                        <div class="add-property__select-type">
                            <div class="field is-expanded">
                                <h3 class="subtitle is-6">
                                    {{ editingVersionIdentifierIndex >= 0 ? 'Edit Version Identifier' : 'Enter Version Identifier Information' }}
                                </h3>
                                
                                <!-- Display existing version identifiers -->
                                <div v-if="versionIdentifiers.length > 0"
                                    class="field">
                                    <label class="label">Current Version Identifiers</label>
                                    <div class="box"
                                        v-for="(identifier, index) in versionIdentifiers"
                                        :key="index"
                                        :class="{ 'has-background-info-light': editingVersionIdentifierIndex === index }">
                                        <div class="columns is-vcentered">
                                            <div class="column">
                                                <p><strong>Value:</strong> {{ identifier.identifierValue }}</p>
                                                <p><strong>Name:</strong> {{ identifier.identifierName['@value'] }}</p>
                                                <p><strong>Type:</strong> {{ identifier.identifierType }}</p>
                                            </div>
                                            <div class="column is-narrow">
                                                <div class="buttons">
                                                    <button 
                                                        class="button is-small is-info" 
                                                        id="edit-version-identifier-button"
                                                        @click="editVersionIdentifier(index)"
                                                        :disabled="editingVersionIdentifierIndex >= 0 && editingVersionIdentifierIndex !== index">
                                                        {{ editingVersionIdentifierIndex === index ? 'Editing...' : 'Edit' }}
                                                    </button>
                                                    <button 
                                                        id="remove-version-identifier-button"
                                                        class="button is-small is-danger" 
                                                        @click="removeVersionIdentifier(index)"
                                                        :disabled="editingVersionIdentifierIndex >= 0">
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Reused form for both adding and editing -->
                                <div class="field">
                                    <label class="label">Identifier Value Code</label>
                                    <div class="control">
                                        <input 
                                            id="version-identifier-value-input"
                                            class="input" 
                                            v-model="versionIdentifierData.identifierValue">
                                    </div>
                                </div>
                                
                                <div class="field">
                                    <label class="label">Identifier Type Name</label>
                                    <PropertyString
                                        :key="tempKey"
                                        ref="identifierNameInput"
                                        index="null"
                                        expandedProperty="identifierName"
                                        :langString="true"
                                        :range="['http://www.w3.org/2000/01/rdf-schema#langString']"
                                        :newProperty="true"
                                        :profile="profile"
                                        :addSingle="true"
                                        :options="null"
                                        :overrideUpdate="true"
                                        :propertyValue="versionIdentifierData.identifierName"
                                        :customProperty="true"
                                        @updatePropertyString="updateVersionIdentifierName" />
                                </div>
                                
                                <div class="field">
                                    <label class="label">Identifier Type</label>
                                    <div class="control">
                                        <input 
                                            id="version-identifier-type-input"
                                            class="input" 
                                            v-model="versionIdentifierData.identifierType">
                                    </div>
                                </div>
                                
                                <div class="field is-grouped">
                                    <div class="control">
                                        <button 
                                            class="button is-primary" 
                                            id="add-version-identifier-button"
                                            @click="editingVersionIdentifierIndex >= 0 ? saveVersionIdentifierEdit() : addVersionIdentifier()"
                                            :disabled="!canAddVersionIdentifier">
                                            {{ editingVersionIdentifierIndex >= 0 ? 'Save Changes' : 'Add Version Identifier' }}
                                        </button>
                                    </div>
                                    <div class="control"
                                        v-if="editingVersionIdentifierIndex >= 0">
                                        <button 
                                            class="button" 
                                            id="cancel-version-identifier-edit-button"
                                            @click="cancelVersionIdentifierEdit()">
                                            Cancel Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- non text value input: create new, search, or url -->
                <div
                    v-else-if="selectedPropertyToAdd !== '' && !selectedPropertyToAddIsTextValue"
                    class="add-property__field">
                    <div class="buttons is-left">
                        <div
                            id="add-new-level-button"
                            v-if="selectedPropertyRange && selectedPropertyRange[0].toLowerCase().indexOf('level') !== -1 && !editingMultipleCompetencies"
                            @click="getNewLevelName"
                            type="text"
                            class="button is-outlined is-primary">
                            <span class="icon">
                                <i class="fa fa-plus" />
                            </span>
                            <span>
                                create new Level
                            </span>
                        </div>
                        <!-- add by limited concept -->
                        <div
                            v-if="(limitedConcepts.length > 0) && !(addRelationBy === 'url')">
                            <PropertyString
                                index="null"
                                :expandedProperty="selectedPropertyToAdd.value"
                                :langString="selectedPropertyToAddIsLangString"
                                :range="selectedPropertyRange"
                                :newProperty="true"
                                :profile="profile"
                                :addSingle="true"
                                :valueFromSearching="selectedPropertyToAddValue"
                                :options="limitedConcepts" />
                        </div>
                        <!-- add by url -->
                        <div
                            id="add-by-url-button"
                            v-if="!(limitedConcepts.length > 0)"
                            @click="addRelationBy = 'url'"
                            type="text"
                            class="button is-outlined is-primary">
                            <span>
                                Add {{ selectedPropertyToAdd.label }} by url
                            </span>
                            <span class="icon">
                                <i class="fa fa-link" />
                            </span>
                        </div>
                        <!-- add by search -->
                        <div
                            id="add-by-search-button"
                            v-if="!(limitedConcepts.length > 0)"
                            @click="search"
                            type="button"
                            class="button is-outlined is-primary">
                            <span>
                                Search for {{ selectedPropertyToAdd.label }} to add
                            </span>
                            <span class="icon">
                                <i class="fa fa-search" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- select property to add -->
            <div class="">
                <div class="columns my-2">
                    <div class="column is-6">
                        <div
                            class="buttons"
                            v-if="selectedPropertyToAdd === ''">
                            <div
                                id="filter-all-button"
                                class="button is-small"
                                :class="filterProperties === 'all' ? 'is-primary' : ''"
                                @click="filterProperties = 'all'">
                                all
                            </div>
                            <div
                                id="filter-resources-button"
                                class="button is-small"
                                :class="filterProperties === 'relationships' ? 'is-primary' : ''"
                                @click="filterProperties = 'relationships'">
                                relationships
                            </div>
                            <div
                                id="filter-general-button"
                                class="button is-small"
                                :class="filterProperties === 'general' ? 'is-primary' : ''"
                                @click="filterProperties = 'general'">
                                general
                            </div>
                        </div>
                    </div>
                    <div class="column is-6">
                        <div
                            class="buttons is-right"
                            v-if="selectedPropertyToAdd === ''">
                            <div
                                id="filter-list-button"
                                class="button is-small"
                                :class="propertyView === 'list' ? 'is-primary' : ''"
                                @click="propertyView = 'list'">
                                <span class="icon"><i class="fa fa-list-alt" /></span>
                            </div>
                            <div
                                id="filter-grid-button"
                                class="button is-small"
                                :class="propertyView === 'grid' ? 'is-primary' : ''"
                                @click="propertyView = 'grid'">
                                <span class="icon"><i class="fa fa-th" /></span>
                            </div>
                        </div>
                    </div>
                </div>
                <template
                    v-if="selectedPropertyToAdd === ''">
                    <div class="columns is-multiline property-columns px-1">
                        <div
                            class="column is-12 slide px-4"
                            :class="{ 'collapsed': !showGeneral}">
                            <div class="columns is-mobile is-multiline">
                                <div
                                    :id="option.label"
                                    v-for="option in showProperties"
                                    :key="option"
                                    class="column property"
                                    :class="propertyView === 'grid' ? 'is-3' : 'is-12'">
                                    <div
                                        id="property-option"
                                        @click="selectedPropertyToAdd = option"
                                        class="property-button"
                                        :title="option.description"
                                        :class="{'selected': option === selectedPropertyToAdd}">
                                        <p class="has-text-weight-semibold is-size-6">
                                            {{ option.label }}
                                        </p>
                                        <p class="is-size-7 property-description">
                                            {{ option.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <p class="help is-danger">
                    {{ errorMessage[0] }}
                </p>
            </div>
            <div
                class="px-1"
                v-if="$store.state.featuresEnabled.configurationsEnabled">
                <p class="subtitle">
                    Note: Property options are determined by your <router-link
                        id="configuration-settings-link"
                        target="_blank"
                        :to="{path: '/configuration', query: queryParams}">
                        configuration settings.
                    </router-link> If a property is unavailable to you here, please refer to your
                    configuration settings or contact your administrator.
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import ModalTemplate from '@/components/modalContent/ModalTemplate.vue';
import PropertyString from './PropertyString.vue';


export default {
    name: 'AddProperty',
    props: {
        profile: Object,
        expandedThing: Object,
        editingMultipleCompetencies: Boolean,
        // When adding multiple competencies, need to know which element of array to update
        idx: Number,
        addedPropertiesAndValuesFromSearching: Object,
        errorMessage: {
            type: Array,
            default: function() { return []; }
        }
    },
    components: {
        ModalTemplate,
        PropertyString
    },
    data: function() {
        return {
            filterProperties: 'all',
            propertyView: 'list',
            showGeneral: true,
            showRelationships: true,
            showResources: true,
            addRelationBy: '',
            selectedPropertyToAdd: '',
            selectedPropertyRange: null,
            selectedPropertyToAddIsLangString: false,
            selectedPropertyToAddValue: null,
            checkedOptions: null,
            skipConfigProperties: ["alwaysProperties", "headings", "primaryProperties", "secondaryProperties", "tertiaryProperties", "relationshipsHeading", "relationshipsPriority"],
            optionsArray: [],
            limitedTypes: [],
            limitedConcepts: [],
            createNewLevelNameModal: false,
            newLevelName: '',
            versionIdentifiers: [],
            versionIdentifierData: {
                identifierValue: '',
                identifierName: {},
                identifierType: ''
            },
            tempKey: 0,
            editingVersionIdentifierIndex: -1
        };
    },
    mounted: function() {
        if (this.editingMultipleCompetencies && this.addedPropertiesAndValuesFromSearching.value.length) {
            this.selectedPropertyToAdd = this.addedPropertiesAndValuesFromSearching.property;
            this.selectedPropertyToAddValue = this.addedPropertiesAndValuesFromSearching.value;
            this.addRelationBy = "url";
        }
    },
    computed: {
        canAddVersionIdentifier() {
            return this.versionIdentifierData.identifierValue && 
                this.versionIdentifierData.identifierName && this.versionIdentifierData.identifierName['@value'];
        },
        queryParams() {
            return this.$store.getters['editor/queryParams'];
        },
        showProperties() {
            let properties = this.allProperties;
            if (this.filterProperties === 'all') {
                properties = this.allProperties;
            } else if (this.filterProperties === 'relationships') {
                properties = this.relationshipProperties;
            } else if (this.filterProperties === 'general') {
                properties = this.generalProperties;
            }
            return properties;
        },
        allProperties() {
            let newArray = [];
            this.propertyOptions.forEach(function(element) {
                newArray.push(element);
            });
            return newArray;
        },
        generalProperties() {
            let newArray = [];
            this.propertyOptions.forEach(function(element) {
                if (element.type !== 'relationship' && element.type !== 'resource') {
                    newArray.push(element);
                }
            });
            return newArray;
        },
        relationshipProperties() {
            let newArray = [];
            this.propertyOptions.forEach(function(element) {
                if (element.type === 'relationship') {
                    newArray.push(element);
                }
            });
            return newArray;
        },
        resourceProperties() {
            let newArray = [];
            this.propertyOptions.forEach(function(element) {
                if (element.type === 'resource') {
                    newArray.push(element);
                }
            });
            return newArray;
        },
        // A list of all available properties for the current configuration
        propertyOptions: function() {
            var options = [];
            if (this.profile) {
                for (var key in this.profile) {
                    if (!EcArray.has(this.skipConfigProperties, key)) {
                        if (this.profile[key]["readOnly"] === "true" || this.profile[key]["readOnly"] === true) {
                            continue;
                        }
                        // If one value is allowed for a property and it already exists, the user cannot add another. Only applies to single edit.
                        if (!this.editingMultipleCompetencies && this.profile[key]["max"] === 1) {
                            if (this.profile[key]["valuesIndexed"]) {
                                var f = this.profile[key]["valuesIndexed"];
                                f = f();
                                if (f && f[this.obj.shortId()]) {
                                    continue;
                                }
                            } else {
                                if (this.expandedThing[key] != null && this.expandedThing[key].length > 0) {
                                    continue;
                                }
                            }
                        }
                        var label = this.profile[key]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                        var description = this.profile[key]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
                        var type = "property";
                        if (this.profile[key]["http://schema.org/rangeIncludes"][0]["@id"].toLowerCase().indexOf("competency") !== -1 || this.profile[key]["http://schema.org/rangeIncludes"][0]["@id"].toLowerCase().indexOf("concept") !== -1) {
                            if (!(this.profile[key]["isDirectLink"] && (this.profile[key]["isDirectLink"] === 'true' || this.profile[key]["isDirectLink"] === true))) {
                                type = "relationship";
                            }
                        } else if (this.profile[key]["http://schema.org/rangeIncludes"][0]["@id"].toLowerCase().indexOf("level") !== -1) {
                            type = "level";
                        }
                        if (this.profile[key]["resource"] === true) {
                            type = "resource";
                        }
                        options.push({"value": key, "label": label, "description": description, "type": type});
                    }
                }
            }
            return options;
        },
        selectedPropertyToAddIsTextValue: function() {
            let property = this.selectedPropertyToAdd["value"] ? this.selectedPropertyToAdd["value"] : "";
            var range;
            if (this.profile && this.profile[property]) {
                range = this.profile[property]["http://schema.org/rangeIncludes"][0]["@id"];
            }
            if (!range) {
                return false;
            }
            if (range.toLowerCase().indexOf("competency") !== -1 || range.toLowerCase().indexOf("concept") !== -1) {
                return false;
            }
            if (range.toLowerCase().indexOf("level") !== -1 && this.profile[property]["add"] !== "checkedOptions") {
                return false;
            }
            if (range.toLowerCase().indexOf("https://purl.org/ctdl/terms/IdentifierValue") !== -1) {
                return false;
            }
            let urlProperties = [
                "https://purl.org/ctdlasn/terms/knowledgeEmbodied",
                "https://purl.org/ctdlasn/terms/skillEmbodied",
                "https://purl.org/ctdlasn/terms/taskEmbodied",
                "https://purl.org/ctdlasn/terms/abilityEmbodied",
                "https://purl.org/ctdlasn/terms/comprisedOf",
                "https://purl.org/ctdlasn/terms/derivedFrom",
                "https://purl.org/ctdlasn/terms/inferredCompetency",
                "https://purl.org/ctdlasn/terms/isVersionOf",
                "https://purl.org/ctdlasn/terms/alignTo",
                "https://purl.org/ctdlasn/terms/alignFrom"
            ];
            if (urlProperties.includes(property)) {
                return false;
            }
            return true;
        },
        selectedPropertyToAddIsVersionIdentifier: function() {
            let property = this.selectedPropertyToAdd["value"] ? this.selectedPropertyToAdd["value"] : "";
            return property === "https://purl.org/ctdl/terms/versionIdentifier";
        }
    },
    methods: {
        updatePropertyString: function(input, index) {
            this.selectedPropertyToAddValue = input;
            this.$emit('property-string-updated', this.selectedPropertyToAdd, input, this.selectedPropertyRange, this.idx);
        },
        closeNewLevelNameModal: function() {
            this.createNewLevelNameModal = false;
        },
        getNewLevelName: function() {
            this.createNewLevelNameModal = true;
        },
        addNewLevel: function() {
            this.createNewLevelNameModal = false;
            var f = this.profile[this.selectedPropertyToAdd.value]["add"];
            var shortId = EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]);
            f(shortId, this.newLevelName);
        },
        removeValueAtIndex: function() {
            this.$store.commit('lode/removeAddingValueAtIndex', this.idx);
        },
        search: async function() {
            this.addRelationBy = 'search';
            this.$emit('is-searching', true);
            if (this.selectedPropertyRange[0].toLowerCase().indexOf("conceptscheme") !== -1) {
                this.$store.commit('lode/searchType', "ConceptScheme");
                this.$store.commit('lode/copyOrLink', false);
            } else if (this.selectedPropertyRange[0].toLowerCase().indexOf("concept") !== -1) {
                this.$store.commit('lode/searchType', "Concept");
                this.$store.commit('lode/copyOrLink', false);
            } else if (this.selectedPropertyRange[0].toLowerCase().indexOf("level") !== -1) {
                this.$store.commit('lode/searchType', "Level");
                this.$store.commit('lode/copyOrLink', true);
            } else if (this.profile[this.selectedPropertyToAdd.value]["isDirectLink"] && (this.profile[this.selectedPropertyToAdd.value]["isDirectLink"] === 'true' || this.profile[this.selectedPropertyToAdd.value]["isDirectLink"] === true)) {
                this.$store.commit('lode/searchType', "DirectLink");
                this.$store.commit('lode/copyOrLink', true);
            } else {
                this.$store.commit('lode/searchType', "Competency");
                this.$store.commit('lode/copyOrLink', false);
            }
            if (this.$store.state.editor) {
                var selected = this.expandedThing ? await EcRepository.get(EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"])) : null;
                this.$store.commit('editor/selectedCompetency', selected);
                this.$store.commit('editor/selectCompetencyRelation', this.selectedPropertyToAdd.value);
            }
            this.$store.commit('lode/competencySearchModalOpen', true);
        },
        async addConceptInner(conceptUri) {
            EcConcept.get(conceptUri).then((concept) => {
                this.limitedConcepts.push({
                    display: EcRemoteLinkedData.getDisplayStringFrom(concept['skos:prefLabel']),
                    val: conceptUri
                });
                if (concept['skos:narrower'] != null) {
                    for (let i = 0; i < concept['skos:narrower'].length; i++) {
                        this.addConceptInner(concept['skos:narrower'][i]);
                    }
                }
            });
        },
        editVersionIdentifier(index) {
            this.editingVersionIdentifierIndex = index;
            const identifier = this.versionIdentifiers[index];
            
            // Populate the form with existing data
            this.versionIdentifierData = {
                identifierValue: identifier.identifierValue,
                identifierName: {...identifier.identifierName},
                identifierType: identifier.identifierType
            };
            
            // Force PropertyString component to re-render with new data
            this.tempKey++;
        },
        saveVersionIdentifierEdit() {
            if (this.canAddVersionIdentifier && this.editingVersionIdentifierIndex >= 0) {
                // Update the existing identifier
                this.versionIdentifiers[this.editingVersionIdentifierIndex] = {...this.versionIdentifierData};
                this.cancelVersionIdentifierEdit();
            }
        },
        cancelVersionIdentifierEdit() {
            this.editingVersionIdentifierIndex = -1;
            // Clear the form
            this.clearVersionIdentifierForm();
        },
        // Modify existing addVersionIdentifier to handle edit mode
        addVersionIdentifier() {
            if (this.canAddVersionIdentifier) {
                if (this.editingVersionIdentifierIndex >= 0) {
                    // This is actually an edit save
                    this.saveVersionIdentifierEdit();
                } else {
                    // Original add logic
                    this.versionIdentifiers.push({...this.versionIdentifierData});
                    this.clearVersionIdentifierForm();
                }
            }
            this.emitVersionIdentifiers();
        },
        removeVersionIdentifier(index) {
            this.versionIdentifiers.splice(index, 1);
            this.emitVersionIdentifiers();
        },
        clearVersionIdentifierForm() {
            this.versionIdentifierData = {
                identifierValue: '',
                identifierName: {},
                identifierType: ''
            };
            
            this.tempKey = Date.now();
        },
        updateVersionIdentifierName(value) {
            this.versionIdentifierData.identifierName = value;
        },
        emitVersionIdentifiers() {
            const versionId = this.versionIdentifiers.map((x) => {
                return {
                    "https://purl.org/ctdl/terms/identifierValueCode": x.identifierValue,
                    "https://purl.org/ctdl/terms/identifierTypeName": x.identifierName,
                    "https://purl.org/ctdl/terms/identifierType": x.identifierType
                };
            });
            // Emit the value through the property-string-updated event
            this.updatePropertyString(versionId);
        }
    },
    watch: {
        selectedPropertyToAdd: async function() {
            this.selectedPropertyToAddIsLangString = false;
            this.limitedTypes = [];
            this.limitedConcepts = [];
            this.$store.commit('lode/setAddingValues', []);
            if (this.profile && this.profile[this.selectedPropertyToAdd.value]) {
                var range = [];
                var ary = this.profile[this.selectedPropertyToAdd.value]["http://schema.org/rangeIncludes"];
                if (ary != null || ary !== undefined) {
                    for (var i = 0; i < ary.length; i++) {
                        range.push(ary[i]["@id"]);
                        if (ary[i]["@id"] === "http://www.w3.org/2000/01/rdf-schema#langString") {
                            this.selectedPropertyToAddIsLangString = true;
                        }
                    }
                }
                this.selectedPropertyRange = range;
                this.$store.commit('lode/setAddingProperty', this.selectedPropertyToAdd.value);
            }
            if (this.selectedPropertyToAdd.value && this.selectedPropertyToAdd.value.toLowerCase().indexOf('level') !== -1 && this.profile && this.profile[this.selectedPropertyToAdd.value] && this.profile[this.selectedPropertyToAdd.value]['options']) {
                this.checkedOptions = [];
            } else {
                this.checkedOptions = null;
            }
            if (this.profile && this.profile[this.selectedPropertyToAdd.value] && this.profile[this.selectedPropertyToAdd.value]['options']) {
                if (this.profile[this.selectedPropertyToAdd.value]["isDirectLink"] && (this.profile[this.selectedPropertyToAdd.value]["isDirectLink"] === 'true' || this.profile[this.selectedPropertyToAdd.value]["isDirectLink"] === true)) {
                    const options = this.profile[this.selectedPropertyToAdd.value]['options'];
                    options.forEach((option) => {
                        this.limitedTypes.push(option);
                    });
                } else if (this.profile[this.selectedPropertyToAdd.value]["http://schema.org/rangeIncludes"][0]["@id"] === "https://schema.cassproject.org/0.4/skos/Concept") {
                    for (let i = 0; i < this.profile[this.selectedPropertyToAdd.value]['options'].length; i++) {
                        await EcConceptScheme.get(this.profile[this.selectedPropertyToAdd.value]['options'][i].val).then((scheme) => {
                            if (scheme) {
                                scheme['skos:hasTopConcept'].forEach((conceptUri) => {
                                    this.addConceptInner(conceptUri);
                                });
                            }
                        });
                    }
                } else if (this.checkedOptions) {
                    for (let i = 0; i < this.profile[this.selectedPropertyToAdd.value]['options'].length; i++) {
                        let option = this.profile[this.selectedPropertyToAdd.value]['options'][i];
                        option.name = (await EcRepository.get(option.val)).name;
                        this.optionsArray.push(option);
                    }
                }
            }
        },
        checkedOptions: function() {
            this.$store.commit('lode/setAddingChecked', this.checkedOptions);
            this.updatePropertyString(this.checkedOptions);
            // this.$emit('checkedOptions', this.checkedOptions);
        },
        selectedPropertyToAddValue: function() {
            this.$store.commit('lode/addToAddingValues', this.selectedPropertyToAddValue);
        },
        selectedPropertyRange: function() {
            this.$store.commit('lode/setAddingRange', this.selectedPropertyRange);
        },
        addedPropertiesAndValuesFromSearching: function() {
            if (this.editingMultipleCompetencies && this.addedPropertiesAndValuesFromSearching.value.length) {
                this.selectedPropertyToAdd = this.addedPropertiesAndValuesFromSearching.property;
                this.selectedPropertyToAddValue = this.addedPropertiesAndValuesFromSearching.value;
                this.addRelationBy = "url";
            }
        }
    }
};
</script>

<style lang="scss">
    @import '@/scss/variables.scss';
#resource-properties,
#general-properties,
#relationship-properties {
    margin-top: 1rem;
    padding-bottom: 1rem;
}
.add-property-field {
}
.column.property {
    .property-button {
        border: solid 1px $primary;
        padding: .125rem .5rem;
        color: $primary;
        border-radius: .25rem;
        cursor: pointer;
        .property-description {
            text-align: left;
            padding-left: .25rem;
            font-size: $size-6;
            width: 100%;
            display: inline-block;
            direction: ltr;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;

        }
    }
    .property-button.selected {
        background-color: $light;
        color: $dark;
        cursor: none;
    }
    .property-button:hover {
        box-shadow: $two-dp;
        background-color: $primary;
        color: $white;
    }
     .property-button.selected:hover {
        box-shadow: none;
        cursor: not-allowed;
    }
}
.slide-leave-active,
.slide-enter-active  {
  transition: all .6s ease;
}
.slide {
    border: 1px solid rgba(black, .3);
    border-radius: 1rem;
    padding-bottom: 1rem !important;
    max-height: 300px;
    overflow-y: auto;
    transition: all .5s ease;
}
.slide.collapsed {
    padding-bottom: 0rem !important;
    max-height: 0px;
    overflow: hidden;
    .columns {
        height: 0px;
        overflow: hidden;
    }
}
.slide-enter {
    max-height: 0px;
}
.slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  max-height: 0px;
}

</style>