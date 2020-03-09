<template>
    <div>
        <!-- custom property details modal -->
        <div
            class="modal"
            :class="[{'is-active': showCustomPropertyDetails}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="subtitle is-size-3 modal-card-title">
                        {{ customPropertyModalTitle }}
                        <button
                            class="delete is-pulled-right"
                            aria-label="close"
                            @click="closeCustomPropertyModal">
                        </button>
                    </p>
                </header>
                <div class="modal-card-body has-text-dark">
                    <label>Context: </label>
                    <div v-if="readOnly || !customPropertyIsNew">
                        {{ customPropertyContext }}
                    </div>
                    <div v-if="!readOnly && customPropertyIsNew">
                        <select v-model="customPropertyContext">
                            <option value="https://schema.cassproject.org/0.4/">https://schema.cassproject.org/0.4/</option>
                            <option value="https://purl.org/ctdlasn/terms/">https://purl.org/ctdlasn/terms/</option>
                            <option value="http://www.w3.org/1999/02/22-rdf-syntax-ns#">http://www.w3.org/1999/02/22-rdf-syntax-ns#</option>
                            <option value="http://www.w3.org/2000/01/rdf-schema#">http://www.w3.org/2000/01/rdf-schema#</option>
                            <option value="https://schema.cassproject.org/0.4/">https://schema.cassproject.org/0.4/</option>
                            <option value="https://schema.cassproject.org/kbac/0.4/">https://schema.cassproject.org/kbac/0.4/</option>
                            <option value="http://schema.eduworks.com/general/0.3/">http://schema.eduworks.com/general/0.3/</option>
                            <option value="http://schema.org/">http://schema.org/</option>
                            <option value="http://purl.org/ASN/schema/core/">http://purl.org/ASN/schema/core/</option>
                            <option value="http://purl.org/dc/elements/1.1/">http://purl.org/dc/elements/1.1/</option>
                            <option value="http://purl.org/gem/qualifiers/">http://purl.org/gem/qualifiers/</option>
                            <option value="http://www.loc.gov/loc.terms/relators/">http://www.loc.gov/loc.terms/relators/</option>
                            <option value="http://purl.org/dc/terms/">http://purl.org/dc/terms/</option>
                            <option value="http://www.w3.org/2004/02/skos/core#">http://www.w3.org/2004/02/skos/core#</option>
                        </select>
                    </div>
                    <label>Range/Type: </label>
                    <div v-if="readOnly || !customPropertyIsNew">
                        {{ customPropertyRangeReadable }}
                    </div>
                    <div v-if="!readOnly && customPropertyIsNew">
                        <select v-model="customPropertyRange">
                            <option value="http://www.w3.org/2000/01/rdf-schema#langString">Lang-String</option>
                            <option value="http://schema.org/URL">URL</option>
                            <option value="http://schema.org/Text">Text</option>
                            <option value="http://www.w3.org/2001/XMLSchema#dateTime">Date-Time</option>
                            <option value="http://purl.org/dc/terms/date">Date</option>
                            <option value="https://schema.cassproject.org/0.4/skos/Concept">SKOS Concept</option>
                        </select>
                    </div>
                    <label>Property Name (only alphanumerics permitted): </label>
                    <div v-if="readOnly || !customPropertyIsNew">
                        {{ customPropertyPropertyName }}
                    </div>
                    <div v-if="!readOnly && customPropertyIsNew">
                        <input type="text" v-model="customPropertyPropertyName" @change="simplifyCustomPropertyName">
                    </div>
                    <label>Label: </label>
                    <div v-if="readOnly">
                        {{ customPropertyLabel }}
                    </div>
                    <div v-if="!readOnly">
                        <input type="text" v-model="customPropertyLabel">
                    </div>
                    <label>Description: </label>
                    <div v-if="readOnly">
                        {{ customPropertyDescription }}
                    </div>
                    <div v-if="!readOnly">
                        <input type="text" v-model="customPropertyDescription">
                    </div>
                    <label>Is Required: </label>
                    <div v-if="readOnly">
                        {{ customPropertyRequired }}
                    </div>
                    <div v-if="!readOnly">
                        <select v-model="customPropertyRequired">
                            <option :value="true">true</option>
                            <option :value="false">false</option>
                        </select>
                    </div>
                    <label>Priority: </label>
                    <div v-if="readOnly">
                        {{ customPropertyPriority }}
                    </div>
                    <div v-if="!readOnly">
                        <select v-model="customPropertyPriority">
                            <option value="primary">primary</option>
                            <option value="secondary">secondary</option>
                            <option value="tertiary">tertiary</option>
                        </select>
                    </div>
                    <div v-if="shouldAllowCustomPropertyPermittedValues">
                        <br>
                        <label>Permitted Values (Optional): </label>
                        <p v-if="!readOnly">Leave this section empty to allow any values for this property</p>
                        <button v-if="!readOnly" @click="addCustomPropertyPermittedValue">Add</button>
                        <div class="columns" v-if="customPropertyPermittedValues.length > 0">
                            <div class="column is-5 listHdr">display</div>
                            <div class="column is-5 listHdr">value</div>
                            <div class="column is-2"></div>
                        </div>
                        <div class="columns is-multiline" v-for="(ev,idx) in customPropertyPermittedValues">
                            <div class="column is-5">
                                <p v-if="readOnly">{{ ev.display }}</p>
                                <input v-if="!readOnly" type="text" v-model="ev.display">
                            </div>
                            <div class="column is-5">
                                <p v-if="readOnly">{{ ev.value }}</p>
                                <input v-if="!readOnly" type="text" v-model="ev.value">
                            </div>
                            <div class="column is-2">
                                <button v-if="!readOnly" @click="deleteCustomPropertyPermittedValue(idx)">delete</button>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div v-if="!readOnly">
                        <button @click="applyCustomPropertyEdits">Apply</button>
                        <button @click="closeCustomPropertyModal">Cancel</button>
                    </div>
                    <div v-if="customPropertyInvalid">
                        <p>Property is invalid:</p>
                        <p v-if="customPropertyPropertyNameExists">*Property name is already in use</p>
                        <p v-if="customPropertyPropertyNameInvalid">*Property name is required</p>
                        <p v-if="customPropertyLabelInvalid">*Label is required</p>
                        <p v-if="customPropertyPropertyNameInvalid">*Description is required</p>
                    </div>
                </div>
            </div>
        </div>
        <label>Name: </label>
        <div v-if="readOnly">
            {{ config.name }}
        </div>
        <div v-if="!readOnly">
            <input type="text" v-model="config.name">
        </div>
        <br>
        <label>Description: </label>
        <div v-if="readOnly">
            {{ config.description }}
        </div>
        <div v-if="!readOnly">
            <input type="text" v-model="config.description">
        </div>
        <br>
        <br>
        <!-- ************************************** Framework Properties ************************************************ -->
        <h5>Framework Properties</h5>
        <div class="columns">
            <div class="column is-2 listHdr">property</div>
            <div class="column is-2 listHdr">label</div>
            <div class="column is-4 listHdr">description</div>
            <div class="column is-1 listHdr">required</div>
            <div class="column is-2 listHdr">priority</div>
            <div class="column is-1 listHdr"></div>
        </div>
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
            @change="updateFrameworkCompetencyProperty">
        </FrameworkCompetencyPropertyListItem>
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
            @change="updateFrameworkCompetencyProperty">
        </FrameworkCompetencyPropertyListItem>
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
            @change="updateFrameworkCompetencyProperty">
        </FrameworkCompetencyPropertyListItem>
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
            :propertyIndex="idx"
            @change="updateFrameworkCompetencyProperty"
            @manage="manageCustomFrameworkCompetencyProperty"
            @delete="deleteCustomFrameworkCompetencyProperty">
        </FrameworkCompetencyPropertyListItem>
        <div v-if="!readOnly">
            <button @click="addCustomFrameworkProperty">add custom framework property</button>
        </div>
        <br>
        <br>
        <!-- ************************************** Competency Properties ************************************************ -->
        <h5>Competency Properties</h5>
        <div class="columns">
            <div class="column is-2 listHdr">property</div>
            <div class="column is-2 listHdr">label</div>
            <div class="column is-4 listHdr">description</div>
            <div class="column is-1 listHdr">required</div>
            <div class="column is-2 listHdr">priority</div>
            <div class="column is-1 listHdr"></div>
        </div>
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
            @change="updateFrameworkCompetencyProperty">
        </FrameworkCompetencyPropertyListItem>
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
            @change="updateFrameworkCompetencyProperty">
        </FrameworkCompetencyPropertyListItem>
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
            @change="updateFrameworkCompetencyProperty">
        </FrameworkCompetencyPropertyListItem>
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
            @change="updateFrameworkCompetencyProperty">
        </FrameworkCompetencyPropertyListItem>
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
            :propertyIndex="idx"
            @change="updateFrameworkCompetencyProperty"
            @manage="manageCustomFrameworkCompetencyProperty"
            @delete="deleteCustomFrameworkCompetencyProperty">
        </FrameworkCompetencyPropertyListItem>
        <div v-if="!readOnly">
            <button @click="addCustomCompetencyProperty">add custom competency property</button>
        </div>
        <br>
        <br>
        <!-- ************************************** Competency Type Enforcement ************************************************ -->
        <h5>Competency Type Enforcement (optional)</h5>
        <p v-if="!readOnly">Leave this section empty to allow competencies of any type</p>
        <div v-if="readOnly">
            {{ config.compEnforceTypes }}
        </div>
        <div v-if="!readOnly ">
            <select v-model="config.compEnforceTypes" @change="checkEnforceTypesChange">
                <option :value="true">true</option>
                <option :value="false">false</option>
            </select>
        </div>
        <div v-if="config.compEnforceTypes">
            <button v-if="!readOnly" @click="addCompetencyEnforcedTypeDataHolder">add enforced type</button>
            <div class="columns">
                <div class="column is-2 listHdr">type</div>
                <div class="column is-4 listHdr">description</div>
                <div class="column is-2"></div>
            </div>
            <div
                class="columns"
                v-for="(et,idx) in config.compEnforcedTypes">
                <div class="column is-2">
                    <p v-if="readOnly">{{ et.typeName }}</p>
                    <input v-if="!readOnly" type="text" v-model="et.typeName">
                </div>
                <div class="column is-4">
                    <p v-if="readOnly">{{ et.description }}</p>
                    <input v-if="!readOnly" type="text" v-model="et.description">
                </div>
                <div class="column is-2">
                    <button v-if="!readOnly" @click="deleteCompetencyEnforcedType(idx)">delete</button>
                </div>
            </div>
        </div>
        <br>
        <br>
        <!-- ************************************** Allow Levels ************************************************ -->
        <h5>Allow Levels?</h5>
        <div v-if="readOnly">
            {{ config.compAllowLevels }}
        </div>
        <div v-if="!readOnly ">
            <select v-model="config.compAllowLevels">
                <option :value="true">true</option>
                <option :value="false">false</option>
            </select>
        </div>
        <br>
        <br>
        <!-- ************************************** Competency Relationships ************************************************ -->
        <h5>Competency Relationships</h5>
        <div class="columns">
            <div class="column is-2 listHdr">relationship</div>
            <div class="column is-2 listHdr">label</div>
            <div class="column is-2 listHdr">enabled</div>
        </div>
        <RelationshipListItem
            v-for="(relObj, relKey) in this.config.relationships"
            :relationship="relKey"
            :label="relObj.label"
            :enabled="relObj.enabled"
            :readOnly="readOnly"
            @change="updateRelationshipProperty">
        </RelationshipListItem>
        <br>
        <br>
        <!-- ************************************** Resource Alignments ************************************************ -->
        <h5>Resource Alignment</h5>
        <div class="columns">
            <div class="column is-2 listHdr">alignment</div>
            <div class="column is-2 listHdr">enabled</div>
        </div>
        <div class="columns">
            <div class="column is-2">teaches</div>
            <div class="column is-2">
                <div v-if="readOnly">{{ config.alignments.teaches }}</div>
                <div v-if="!readOnly">
                    <select v-model="config.alignments.teaches">
                        <option :value="true">true</option>
                        <option :value="false">false</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-2">assesses</div>
            <div class="column is-2">
                <div v-if="readOnly">{{ config.alignments.assesses }}</div>
                <div v-if="!readOnly">
                    <select v-model="config.alignments.assesses">
                        <option :value="true">true</option>
                        <option :value="false">false</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-2">requires</div>
            <div class="column is-2">
                <div v-if="readOnly">{{ config.alignments.requires }}</div>
                <div v-if="!readOnly">
                    <select v-model="config.alignments.requires">
                        <option :value="true">true</option>
                        <option :value="false">false</option>
                    </select>
                </div>
            </div>
        </div>
        <br>
        <br>
        <!-- ************************************** Actions ************************************************ -->
        <div v-if="!readOnly">
            <button @click="validateCurrentConfigAndEmitSave">save</button><button @click="$emit('cancel')">cancel</button>
        </div>
        <div v-if="readOnly">
            <button @click="$emit('back')">back</button>
        </div>
    </div>
</template>

<script>
import FrameworkCompetencyPropertyListItem from "./FrameworkCompetencyPropertyListItem";
import RelationshipListItem from "./RelationshipListItem";

export default {
    name: 'configurationDetails',
    props: {
        config: {
            type: Object
        },
        readOnly: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        DEFAULT_CUSTOM_PROPERTY_CONTEXT: 'https://schema.cassproject.org/0.4/',
        DEFAULT_CUSTOM_PROPERTY_RANGE: 'http://schema.org/Text',
        showCustomPropertyDetails: false,
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
        customPropertyDescriptionInvalid: false
    }),
    components: {
        FrameworkCompetencyPropertyListItem,
        RelationshipListItem
    },
    methods: {
        validateCurrentConfigAndEmitSave() {
            // TODO validate name and description
            // TODO validate enforced type values
            // TODO validate relationship values
            this.$emit('save');
        },
        deleteCompetencyEnforcedType(etIndex) {
            this.config.compEnforcedTypes =
                this.config.compEnforcedTypes.slice(0, etIndex).concat(this.config.compEnforcedTypes.slice(etIndex + 1, this.config.compEnforcedTypes.length));
        },
        addCompetencyEnforcedTypeDataHolder() {
            let cef = {};
            cef.typeName = '';
            cef.description = '';
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
            this.showCustomPropertyDetails = false;
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
            this.showCustomPropertyDetails = true;
        },
        addCustomCompetencyProperty: function() {
            this.initCustomPropertyDataHoldersAsNewProperty();
            this.customPropertyModalTitle = "New Competency Property";
            this.customPropertyParent = "competency";
            this.showCustomPropertyDetails = true;
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
            this.showCustomPropertyDetails = true;
        },
        manageCustomCompetencyProperty: function(propertyIdx) {
            this.initCustomPropertyDataHoldersAsExistingProperty('competency', this.config.compCustomProperties[propertyIdx]);
            this.customPropertyModalTitle = "Manage Competency Property";
            this.showCustomPropertyDetails = true;
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
        }
    }
};
</script>

<style lang="scss" scoped>
    h3 {
        font-size: 2rem;
        padding-bottom: 1rem;
    }
    h4 {
        font-size: 1.6rem;
        padding-bottom: 1rem;
    }
    h5 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
    .listHdr {
        font-weight: bold;
    }
</style>

