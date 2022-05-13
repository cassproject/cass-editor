<!--
Property.vue is utilized by Thing.vue
Cycling through a list of properties to be displayed
either displays their input ThingEditing.vue
or their display values Thing.vue
TO DO MAYBE: Separate out property by editing or not.
-->
<template>
    <div
        v-observe-visibility="visibilityChanged"
        v-if="expandedThing"
        :class="['lode__Property lode__' + shortTypeAsClass, editingPropertyClass,
                 { 'has-value': expandedValue}
        ]">
        <!-- remove property confirm modal -->
        <modal-template
            :active="removePropertyConfirmModal"
            @close="closeModal">
            <template slot="modal-header">
                Confirm Remove Property
            </template>
            <template slot="modal-body">
                <section>
                    Are you sure you'd like to remove this property?
                </section>
            </template>
            <template slot="modal-foot">
                <button
                    @click="clickConfirmRemove"
                    class="is-danger is-outlined button">
                    Confirm Remove Property
                </button>
                <button
                    @click="closeModal"
                    class="is-dark button">
                    Cancel
                </button>
            </template>
        </modal-template>
        <!-- begin values -->
        <template
            v-if="expandedValue && show">
            <div
                v-for="(item,index) in expandedValue"
                :key="index"
                class="property-section">
                <template v-if="editingProperty">
                    <label
                        v-if="index === 0"
                        class="label is-medium"
                        :title="comment">
                        {{ displayLabel }}{{ isRequired ? "*" : "" }}
                        <i
                            v-if="comment"
                            :title="comment"
                            class="fa fa-info-circle has-text-dark"
                            aria-hidden="true" />
                    </label>
                </template>
                <!-- properties that are relations, levels, and click to load -->
                <template
                    v-if="!editingProperty && isLink(item) && expandedProperty != '@id' && expandedProperty != 'registryURL'">
                    <Component
                        :is="dynamicThing"
                        :uri="item['@id'] || item['@value']"
                        :clickToLoad="true"
                        class="lode__property"
                        :competencyAsPropertyType="displayLabel"
                        :competencyAsPropertyObjectType="objectType"
                        :parentNotEditable="!canEdit"
                        :profile="childProfile" />
                    <div
                        class="editing-property"
                        v-if="editingProperty">
                        <div class="control">
                            <label><br></label>
                            <div
                                @click="showModal('remove', item)"
                                class="button is-text has-text-danger">
                                <i class="fa fa-times" />
                            </div>
                        </div>
                    </div>
                </template>
                <!-- non text fields load a component-->
                <div
                    v-else-if="!isText(item)"
                    class="non-text-field">
                    <Component
                        :is="dynamicThing"
                        :expandedObj="item"
                        :competencyAsPropertyType="shortType"
                        :competencyAsPropertyObjectType="objectType"
                        :parentNotEditable="!canEdit"
                        :profile="childProfile" />
                    <div
                        class="field delete-property-button"
                        v-if="editingProperty">
                        <div class="control">
                            <label><br></label>
                            <div
                                @click="showModal('remove', item)"
                                class="button is-outlined has-text-danger">
                                <i class="fa fa-times" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- read only link properties -->
                <div
                    class="read-only__link"
                    v-else-if="profile && profile[expandedProperty] && isLink(item) && (profile[expandedProperty]['noTextEditing'] === 'true' || profile[expandedProperty]['readOnly'] === 'true'
                        || profile[expandedProperty]['noTextEditing'] === true || profile[expandedProperty]['readOnly'] === true)">
                    <label v-if="editingThing"> {{ expandedValueNames[index] }} </label>
                    <div class="field is-grouped">
                        <span
                            class="tag is-size-7 is-light"
                            v-if="!editingProperty">{{ displayLabel }}</span>
                        <p class="control">
                            <span
                                class="icon"
                                title="Copy URL to the clipboard."
                                v-clipboard="getURL(item)"
                                v-clipboard:success="clipboardSuccess"
                                v-clipboard:error="clipboardError">
                                <i
                                    v-if="showClipboardSuccessMessage"
                                    class="fa fa-check has-text-success" />
                                <i
                                    v-else
                                    class="fa fa-copy has-text-primary"
                                    name="copyURL"
                                    :expandedProperty="expandedProperty"
                                    :expandedValue="expandedValue" />
                            </span>
                        </p>
                        <a
                            :title="item['@id'] || item['@value']"
                            class="control is-expanded is-id">
                            {{ item['@id'] || item['@value'] }}
                        </a>
                        <div
                            class="control"
                            v-if="editingProperty">
                            <div
                                :disabled="shortType === 'id'"
                                @click="showModal('remove', index)"
                                class="button disabled is-text has-text-danger">
                                <i class="fa fa-times" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- non editable string -->
                <div
                    class="editing-string__read-only"
                    v-else-if="editingProperty && typeof(item) === 'String' && profile && profile[expandedProperty] && (profile[expandedProperty]['noTextEditing'] === 'true'
                        || profile[expandedProperty]['readOnly'] === 'true' || profile[expandedProperty]['noTextEditing'] === true || profile[expandedProperty]['readOnly'] === true)">
                    <div class="field">
                        <div class="control">
                            <div class="uneditable">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="editingProperty"
                        class="field delete-property-button">
                        <div class="control">
                            <label><br></label>
                            <div
                                @click="showModal('remove', item)"
                                class="button is-text has-text-danger">
                                <i class="fa fa-times" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- non editable not string -->
                <div
                    class="editing-non-string__read-only"
                    v-else-if="editingProperty && profile && profile[expandedProperty] && (profile[expandedProperty]['noTextEditing'] === 'true'
                        || profile[expandedProperty]['readOnly'] === 'true' || profile[expandedProperty]['noTextEditing'] === true || profile[expandedProperty]['readOnly'] === true)">
                    <div class="field">
                        <div class="control">
                            <div class="uneditable">
                                {{ item["@value"] }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- concept taxonomy -->
                <div
                    v-else-if="range && range.length > 0 && range[0].toLowerCase().indexOf('concept') !== -1">
                    <div
                        v-if="editingProperty && limitedConcepts.length > 0">
                        <PropertyString
                            :index="index"
                            :expandedProperty="expandedProperty"
                            :expandedThing="expandedThing"
                            :expandedValue="expandedValue"
                            :langString="langString"
                            :range="range"
                            :view="view"
                            :options="limitedConcepts"
                            :profile="profile"
                            @remove="remove(item)" />
                    </div>
                    <div
                        v-else>
                        <div class="field is-grouped">
                            <span
                                class="tag is-size-7 is-light"
                                v-if="!editingProperty">{{ displayLabel }}</span>
                            <p class="control">
                                <span
                                    class="icon"
                                    title="Copy URL to the clipboard."
                                    v-clipboard="getURL(item)"
                                    v-clipboard:success="clipboardSuccess"
                                    v-clipboard:error="clipboardError">
                                    <i
                                        v-if="showClipboardSuccessMessage"
                                        class="fa fa-check has-text-success" />
                                    <i
                                        v-else
                                        class="fa fa-copy has-text-primary"
                                        name="copyURL"
                                        :expandedProperty="expandedProperty"
                                        :expandedValue="expandedValue" />
                                </span>
                            </p>
                            <a
                                :title="item['@id'] || item['@value']"
                                class="control is-expanded is-id">
                                {{ item['@id'] || item['@value'] }}
                            </a>
                            <div
                                class="control"
                                v-if="editingProperty">
                                <div
                                    :disabled="shortType === 'id'"
                                    @click="showModal('remove', index)"
                                    class="button disabled is-text has-text-danger">
                                    <i class="fa fa-times" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- competency direct link with options limited by type -->
                <div
                    v-else-if="profile && profile[expandedProperty] && profile[expandedProperty]['isDirectLink'] && (profile[expandedProperty]['isDirectLink'] === 'true' || profile[expandedProperty]['isDirectLink'] === true)">
                    <div class="field is-grouped">
                        <span
                            class="tag is-size-7 is-light"
                            v-if="!editingProperty">{{ displayLabel }}</span>
                        <p class="control">
                            <span
                                class="icon"
                                title="Copy URL to the clipboard."
                                v-clipboard="getURL(item)"
                                v-clipboard:success="clipboardSuccess"
                                v-clipboard:error="clipboardError">
                                <i
                                    v-if="showClipboardSuccessMessage"
                                    class="fa fa-check has-text-success" />
                                <i
                                    v-else
                                    class="fa fa-copy has-text-primary"
                                    name="copyURL"
                                    :expandedProperty="expandedProperty"
                                    :expandedValue="expandedValue" />
                            </span>
                        </p>
                        <a
                            :title="item['@id'] || item['@value']"
                            class="control is-expanded is-id">
                            {{ item['@id'] || item['@value'] }}
                        </a>
                        <div
                            class="control"
                            v-if="editingProperty">
                            <div
                                :disabled="shortType === 'id'"
                                @click="showModal('remove', index)"
                                class="button disabled is-text has-text-danger">
                                <i class="fa fa-times" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- propertystring components -->
                <div
                    class="property"
                    v-else-if="editingProperty && !checkedOptions && !(limitedConcepts.length > 0) && !(limitedTypes.length > 0)">
                    <PropertyString
                        :index="index"
                        :expandedProperty="expandedProperty"
                        :expandedThing="expandedThing"
                        :expandedValue="expandedValue"
                        :langString="langString"
                        :range="range"
                        :view="view"
                        :options="(profile && profile[expandedProperty] && profile[expandedProperty]['options']) ? profile[expandedProperty]['options'] : null"
                        :profile="profile"
                        @remove="remove(item)" />
                </div>
                <!-- text view has language -->
                <div
                    class="expanded-view__has-language"
                    v-else-if="isObject(expandedValue[index]) && expandedValue[index]['@language']">
                    <span
                        class="tag is-size-7 is-light"
                        v-if="expandedProperty !== 'http://schema.org/name' && expandedProperty !== 'dcterms:title' && expandedProperty !== 'skos:prefLabel'">{{ displayLabel }}</span>
                    <span class="language">
                        {{ expandedValue[index]["@language"] + ": " }}
                    </span>
                    <span
                        :title="expandedValue[index]['@value']"
                        class="value">
                        {{ expandedValue[index]["@value"] }}
                    </span>
                </div>
                <!-- text view doesn't have language -->
                <div
                    class="expanded-view-property"
                    v-else-if="isObject(expandedValue[index])">
                    <div
                        class="property"
                        :title="expandedValue[index]['@value']">
                        <template v-if="type && type.includes('resource')">
                            <span class="tag is-light is-link">{{ type }}</span>
                            <a
                                class="custom-link is-size-6 external"
                                title="Open resource in new window"
                                :href="expandedValue[index]['@value']"
                                target="_blank">{{ expandedValue[index]["@value"] }}</a>
                        </template>
                        <template v-else>
                            <span
                                class="tag is-size-7 is-light"
                                v-if="expandedProperty !== 'http://schema.org/name' && expandedProperty !== 'dcterms:title' && expandedProperty !== 'skos:prefLabel'">{{ displayLabel }}</span>
                            {{ expandedValue[index]["@value"] }}
                        </template>
                    </div>
                </div>
                <div
                    class="unexpanded-property"
                    v-else>
                    <span class="tag is-size-7 is-light">{{ displayLabel }}</span>
                    <div class="property">
                        {{ expandedValue[index] }}
                    </div>
                </div>
            </div>
            <template v-if="editingProperty && checkedOptions && show && profile && profile[expandedProperty] && profile[expandedProperty]['options']">
                <div
                    v-for="each in optionsArray"
                    :key="each"
                    class="field">
                    <input
                        type="checkbox"
                        class="is-checkradio"
                        v-model="checkedOptions"
                        :value="each.val"
                        :name="each.val"
                        :id="each.val">
                    <label :for="each.val">
                        {{ each.name }}
                    </label>
                </div>
            </template>
            <p
                class="help is-danger"
                v-if="errorValidating">
                {{ errorValidating }}
            </p>
        </template>
        <template
            v-else>
            <div class="property-value">
                <div
                    class="add-property-button"
                    v-if="canEdit">
                    <button
                        v-if="range.length == 0 && addOrSearch !== 'search'"
                        class="button is-small is-link has-text-info"
                        :title="'Add New '+ displayLabel"
                        @click.stop="add('string'); startEditing();">
                        <span class="icon">
                            <i
                                class="fa fa-plus has-text-info"
                                aria-hidden="true" />
                        </span>
                        <span>
                            Add {{ displayLabel }}
                        </span>
                    </button>
                    <button
                        v-for="(targetType) in range"
                        :key="targetType"
                        v-else-if="addOrSearch !== 'search'"
                        class="button is-small is-text has-text-info"
                        @click.stop="add(targetType); startEditing();"
                        :title="'Add New '+ displayLabel">
                        <span class="icon has-text-dark">
                            <i
                                class="fa fa-plus has-text-info"
                                aria-hidden="true" />
                        </span>
                        <span>
                            Add {{ displayLabel }}
                        </span>
                    </button>
                </div>
            </div>
            <p class="help is-danger">
                {{ errorMessage[0] }}
            </p>
        </template>
    </div>
</template>
<script>
import '@/scss/property.scss';
import ModalTemplate from '@/components/modalContent/ModalTemplate.vue';

export default {
    // Property represents one property of a Thing.
    name: 'Property',
    props: {
        // The expandedThing that we're a property of.
        expandedThing: Object,
        // Our fully qualified property id (relative to this.expandedThing)
        expandedProperty: String,
        // The schema segment that describes us.
        schema: Object,
        // Whether the thing is editable by the current user.
        canEdit: Boolean,
        // Application profile, to pass along to the Thing children we have.
        profile: Object,
        editingThing: Boolean,
        validate: Boolean,
        errorMessage: {
            type: Array,
            default: function() { return []; }
        },
        view: {
            type: String,
            default: ''
        }
    },
    data: function() {
        return {
            clickToLoad: true,
            showClipboardSuccessMessage: false,
            // True if we are in edit mode.
            show: true,
            langString: false,
            addOrSearch: null,
            checkedOptions: null,
            initialValue: null,
            expandedValueNames: [],
            optionsArray: [],
            limitedTypes: [],
            limitedConcepts: [],
            errorValidating: null,
            removePropertyConfirmModal: false,
            propertyToRemove: null,
            expandedValue: []
        };
    },
    components: {
        // Circular references require this trick.
        Thing: () => import('./Thing.vue'),
        ThingEditing: () => import('./ThingEditing.vue'),
        // Property editing box for String type things. Should be one of these for each value type.
        PropertyString: () => import('./PropertyString.vue'),
        ModalTemplate
    },
    created: function() {
        var me = this;
        if (this.editingThing) {
            if (this.range.length === 1 && this.range[0].toLowerCase().indexOf("langstring") !== -1) {
                this.getExpandedValue();
                this.langString = true;
                for (var i = 0; i < this.expandedValue.length; i++) {
                    if (!this.expandedValue[i]["@language"]) {
                        this.$parent.update(this.expandedProperty, i, {"@language": this.$store.state.editor.defaultLanguage, "@value": this.expandedValue[i]["@value"]}, function() {
                            me.stopEditing();
                        });
                    }
                }
            }
            this.$store.commit('lode/incrementNumPropertyComponents', EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]));
        }
    },
    mounted: async function() {
        this.limitedType = [];
        if (this.range && this.range.length > 0 && this.range[0].toLowerCase().indexOf("level") !== -1 && this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]['options']) {
            this.checkedOptions = [];
            if (this.expandedValue.length > 0) {
                for (var i = 0; i < this.expandedValue.length; i++) {
                    this.checkedOptions.push(this.expandedValue[i]["@id"]);
                }
            }
        }
        if (this.range && this.range.length > 0 && this.range[0].toLowerCase().indexOf("concept") !== -1 && this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]['options']) {
            for (let i = 0; i < this.profile[this.expandedProperty]['options'].length; i++) {
                await EcConceptScheme.get(this.profile[this.expandedProperty]['options'][i].val).then((scheme) => {
                    if (scheme) {
                        scheme['skos:hasTopConcept'].forEach((conceptUri) => {
                            this.addConceptInner(conceptUri);
                        });
                    }
                });
            }
        }
        if (this.expandedThing[this.expandedProperty]) {
            this.initialValue = JSON.parse(JSON.stringify(this.expandedThing[this.expandedProperty]));
        } else {
            this.initialValue = null;
        }
        // show competency as property names
        if (this.objectType === 'Competency' || this.objectType === "Concept" || this.objectType === "Level") {
            this.expandedValueNames = [];
            for (let i = 0; i < this.expandedValue.length; i++) {
                let item = this.expandedValue[i];
                let url = this.getURL(item);
                this.resolveNameFromUrl(url);
            }
        }
        if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]['options'] && this.checkedOptions) {
            for (let i = 0; i < this.profile[this.expandedProperty]['options'].length; i++) {
                let option = this.profile[this.expandedProperty]['options'][i];
                option.name = (await EcRepository.get(option.val)).name;
                this.optionsArray.push(option);
            }
        }
        if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["isDirectLink"] && (this.profile[this.expandedProperty]["isDirectLink"] === 'true' || this.profile[this.expandedProperty]["isDirectLink"] === true)) {
            if (this.profile[this.expandedProperty]['options']) {
                const options = this.profile[this.expandedProperty]['options'];
                options.forEach((option) => {
                    this.limitedTypes.push(option);
                });
            }
        }
    },
    destroyed: function() {
        if (this.editingThing) {
            this.$store.commit('lode/decrementNumPropertyComponents', EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]));
        }
    },
    computed: {
        shortTypeAsClass: function() {
            if (this.objectType === "Level") {
                return this.objectType;
            }
            if (this.expandedProperty === "http://schema.org/name") {
                return "name";
            }
            return this.shortType.replace(/ /g, "_");
        },
        dynamicThing: function() {
            if (this.editingProperty) {
                return 'ThingEditing';
            } else {
                return 'Thing';
            }
        },
        isCompetency: function() {
            if (this.expandedThing["@type"][0].includes('Competency')) {
                return true;
            } else {
                return false;
            }
        },
        editingProperty: function() {
            return this.editingThing;
        },
        editingPropertyClass: function() {
            if (this.editingProperty) {
                return 'editing';
            } else {
                return '';
            }
        },
        childProfile: function() {
            var isFunction = function(obj) {
                return !!(obj && obj.constructor && obj.call && obj.apply);
            };
            if (this.schema == null) return null;
            var p = this.schema.profile;
            if (isFunction(p)) {
                p = p();
            }
            return p;
        },
        // Display label for the property.
        displayLabel: function() {
            // Look in schema first
            if (this.schema != null && this.schema["http://www.w3.org/2000/01/rdf-schema#label"] != null &&
            !EcArray.isArray(this.schema["http://www.w3.org/2000/01/rdf-schema#label"]) &&
            !EcObject.isObject(this.schema["http://www.w3.org/2000/01/rdf-schema#label"])) {
                return this.schema["http://www.w3.org/2000/01/rdf-schema#label"];
            }
            if (this.schema != null && this.schema["http://www.w3.org/2000/01/rdf-schema#label"] != null &&
            EcArray.isArray(this.schema["http://www.w3.org/2000/01/rdf-schema#label"]) &&
            EcObject.isObject(this.schema["http://www.w3.org/2000/01/rdf-schema#label"][0])) {
                return this.schema["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            }
            if (this.schema != null && this.schema["http://www.w3.org/2000/01/rdf-schema#label"] != null &&
            EcObject.isObject(this.schema["http://www.w3.org/2000/01/rdf-schema#label"])) {
                return this.schema["http://www.w3.org/2000/01/rdf-schema#label"]["@value"];
            }

            // Make something up from the property name.
            var property = this.expandedProperty.split("/").pop();
            return property.replace(/([A-Z]+)/g, function(m) {
                return " " + m;
            }).toLowerCase().trim().replace(/(^| )(\w)/g, function(x) {
                return x.toUpperCase();
            });
        },
        // Description of the property, for hover or information hovers.
        comment: function() {
            if (this.schema == null) return null;
            if (this.schema['http://www.w3.org/2000/01/rdf-schema#comment'] == null) return null;
            if (this.schema['http://www.w3.org/2000/01/rdf-schema#comment'][0] == null) return null;
            return this.schema['http://www.w3.org/2000/01/rdf-schema#comment'][0]['@value'];
        },
        // The fully qualified property id.
        type: function() {
            if (this.schema == null) {
                if (this.expandedThing == null) {
                    return null;
                }
                return this.expandedThing["@type"][0];
            }
            return this.schema["@id"];
        },
        // The shortened (one word) property id.
        shortType: function() {
            if (!this.type) {
                return this.displayLabel;
            }
            var short = this.type.split("/").pop();
            if (short.indexOf("core#") !== -1) {
                short = this.type.split("#").pop();
            }
            return short;
        },
        // The namespace of the property id.
        context: function() {
            var ary = this.type.split("/");
            ary.pop();
            return ary.join("/");
        },
        // The permitted list of types that can go into this property.
        range: function() {
            // TODO: Inheritance tree
            if (this.schema == null) return [];
            var results = [];
            var ary = this.schema["http://schema.org/rangeIncludes"];
            if (ary != null || ary !== undefined) {
                for (var i = 0; i < ary.length; i++) {
                    results.push(ary[i]["@id"]);
                }
            }
            return results;
        },
        // Checks cardinality of the property and doesn't allow user to add more than one value when max is 1
        canAdd: function() {
            if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["max"] === 1) {
                if (this.expandedValue.length === 1) {
                    return false;
                }
            }
            if (!this.editingProperty) {
                return false;
            }
            return this.canEdit;
        },
        // Used to remove click event when item should not be edited. Necessary because of event propagation and nested components.
        clickHandler: function() {
            if (this.canEdit) {
                return "click";
            } else {
                return null;
            }
        },
        objectType: function() {
            if (this.range && this.range[0] && this.range[0].toLowerCase().indexOf('level') !== -1) {
                return "Level";
            } else if (this.range && this.range[0] && this.range[0].toLowerCase().indexOf('concept') !== -1) {
                return "Concept";
            } else if (this.range && this.range[0] && this.range[0].toLowerCase().indexOf('competency') !== -1) {
                return "Competency";
            } else {
                return "";
            }
        },
        isRequired: function() {
            if (this.profile && this.profile[this.expandedProperty] && (this.profile[this.expandedProperty]["isRequired"] === 'true' || this.profile[this.expandedProperty]["isRequired"] === true)) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
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
        resolveNameFromUrl: function(url) {
            let me = this;
            // Try repo first to use cache if possible
            EcRepository.get(url, function(success) {
                var name = success.name;
                if (!name) {
                    name = success["skos:prefLabel"];
                }
                name = schema.Thing.getDisplayStringFrom(name);
                // If still object, display value
                if (EcObject.isObject(name)) {
                    var langs = Object.keys(name);
                    name = name[langs[0]];
                }
                me.expandedValueNames.push(name);
            }, function(failure) {
                me.get(url, null, null, function(data) {
                    var name = null;
                    if (data) {
                        if (data[0] === "<") {
                            return;
                        }
                        if (data['ceterms:name']) {
                            name = data['ceterms:name'];
                        } else if (data['ceasn:competencyText']) {
                            name = data['ceasn:competencyText'];
                        } else if (data['name']) {
                            name = data['name'];
                        } else if (data['schema:name']) {
                            name = data['schema:name'];
                        } else if (data['title']) {
                            name = data['title'];
                        } else if (data['skos:prefLabel']) {
                            name = data['skos:prefLabel'];
                        } else if (data['title']) {
                            name = data['title'];
                        } else if (data['@graph'] && data['@graph'][0]) {
                            if (data['@graph'][0]['ceterms:name']) {
                                name = data['@graph'][0]['ceterms:name'];
                            } else if (data['@graph'][0]['name']) {
                                name = data['@graph'][0]['name'];
                            } else if (data['@graph'][0]['schema:name']) {
                                name = data['@graph'][0]['schema:name'];
                            } else if (data['@graph'][0]['title']) {
                                name = data['@graph'][0]['title'];
                            } else if (data['@graph'][0]['skos:prefLabel']) {
                                name = data['@graph'][0]['skos:prefLabel'];
                            }
                        }
                        // If it's a langstring
                        name = schema.Thing.getDisplayStringFrom(name);
                        // If still object, display value
                        if (EcObject.isObject(name)) {
                            var langs = Object.keys(name);
                            name = name[langs[0]];
                        }
                    }
                    me.expandedValueNames.push(name);
                }, function(error) {
                    appLog(error);
                });
            });
        },
        get: function(server, service, headers, success, failure) {
            this.$store.dispatch('editor/getThing', {
                server: server,
                service: service,
                headers: headers,
                success: success,
                failure: failure
            });
        },
        clipboardSuccess: function() {
            let self = this;
            this.showClipboardSuccessMessage = true;
            setTimeout(() => {
                self.showClipboardSuccessMessage = false;
            }, 2000);
        },
        clipboardError: function() {
            this.$emit('clipboard-error-event');
        },
        stopEditing: function() {
            if (this.isRequired) {
                if (this.expandedValue.length === 0 || (this.expandedValue[0]["@value"] != null && this.expandedValue[0]["@value"] !== undefined && this.expandedValue[0]["@value"].trim().length === 0)) {
                    this.showModal("required");
                    return;
                }
            }
            if (this.range.length === 1 && (this.range[0] === "http://schema.org/URL" || this.range[0] === "https://schema.cassproject.org/0.4/skos/Concept")) {
                for (var i = 0; i < this.expandedValue.length; i++) {
                    if (this.expandedValue[i]["@value"] && this.expandedValue[i]["@value"].indexOf("http") === -1) {
                        return this.showModal("urlOnly");
                    } else if (this.expandedValue[i]["@id"] && this.expandedValue[i]["@id"].indexOf("http") === -1) {
                        return this.showModal("urlOnly");
                    }
                }
            }
            if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["resource"] === true) {
                for (var i = 0; i < this.expandedValue.length; i++) {
                    if (!this.expandedValue[i]["name"] || !this.expandedValue[i]["@value"] || this.expandedValue[i]["@value"].indexOf("http") === -1) {
                        return this.showModal("nameAndUrlRequired");
                    }
                }
            }
            this.addOrSearch = null;
            if (this.range.length === 1 && this.range[0].toLowerCase().indexOf("langstring") !== -1) {
                for (var i = 0; i < this.expandedValue.length; i++) {
                    if (this.expandedValue[i]["@language"] == null || this.expandedValue[i]["@language"] === undefined || this.expandedValue[i]["@language"].trim().length === 0) {
                        return this.showModal("langRequired");
                    }
                }
                if (this.profile && this.profile[this.expandedProperty] && (this.profile[this.expandedProperty]["onePerLanguage"] === 'true' || this.profile[this.expandedProperty]["onePerLanguage"] === true)) {
                    var languagesUsed = [];
                    for (var i = 0; i < this.expandedValue.length; i++) {
                        if (languagesUsed.includes(this.expandedValue[i]["@language"].toLowerCase())) {
                            return this.showModal("onePerLanguage");
                        }
                        languagesUsed.push(this.expandedValue[i]["@language"].toLowerCase());
                    }
                }
            }
            for (var i = this.expandedValue.length - 1; i >= 0; i--) {
                if (this.expandedValue[i] === null || (this.expandedValue[i]["@value"] !== null && this.expandedValue[i]["@value"] !== undefined && this.expandedValue[i]["@value"].length === 0) || this.expandedValue[i].length === 0) {
                    this.expandedValue.splice(i, 1);
                }
            }
            this.save();
            if (this.validate) {
                this.$emit('validated', true);
            }
        },
        startEditing: function() {
            if (this.canEdit && !this.editingProperty) {
                this.editingProperty = true;
                this.editingPropertyClass = "editing";
                this.$emit('editing-property-event', true);
            }
            if (this.range.length === 1 && this.range[0].toLowerCase().indexOf("langstring") !== -1) {
                this.langString = true;
                for (var i = 0; i < this.expandedValue.length; i++) {
                    if (!this.expandedValue[i]["@language"]) {
                        this.update({"@language": this.$store.state.editor.defaultLanguage, "@value": this.expandedValue[i]["@value"]}, i);
                    }
                }
            }
        },
        /*
         * initialize modal with params this depends on
         * ./plugins/modalPlugin.js;
         * and ./components/CassModal.vue;
         * can further breakout if we decide to use vuex // plugin is global
         */
        showModal(val, item) {
            let params = {};
            if (val === 'remove') {
                if (this.profile && this.profile[this.expandedProperty] && (this.profile[this.expandedProperty]["isRequired"] === 'true' || this.profile[this.expandedProperty]["isRequired"] === true)) {
                    if (this.expandedValue.length === 1 || (this.expandedValue["@value"] && this.expandedValue["@value"].trim().length === 1)) {
                        this.showModal("required");
                        this.$store.commit('app/showModal', {component: 'RequiredPropertyModal'});
                        return;
                    }
                }
                this.removePropertyConfirmModal = true;
                this.propertyToRemove = item;
                return;
            }
            this.$emit('invalid', true);
            if (val === 'required') {
                params = {
                    type: val,
                    title: "Required property",
                    text: this.displayLabel + " is required. Please enter a value."
                };
            }
            if (val === "urlOnly") {
                params = {
                    type: val,
                    title: "URL Required",
                    text: this.displayLabel + " must be a URL. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
                };
            }
            if (val === "nameAndUrlRequired") {
                params = {
                    type: val,
                    title: "Name and URL Required",
                    text: this.displayLabel + " must have a name and a URL."
                };
            }
            if (val === "langRequired") {
                params = {
                    type: val,
                    title: "Language Required",
                    text: this.displayLabel + " must have a language."
                };
            }
            if (val === "onePerLanguage") {
                params = {
                    type: val,
                    title: "One value per language",
                    text: this.displayLabel + " can only have one entry per language."
                };
            }
            this.errorValidating = params.text;
        },
        clickConfirmRemove: function() {
            this.remove(this.propertyToRemove);
            this.propertyToRemove = null;
            this.removePropertyConfirmModal = false;
        },
        closeModal: function() {
            this.propertyToRemove = null;
            this.removePropertyConfirmModal = false;
        },
        add: async function(type) {
            if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["add"]) {
                this.addOrSearch = "add";
                var f = this.profile[this.expandedProperty]["add"];
                if (f === "checkedOptions") {
                    // eslint-disable-next-line no-useless-return
                    return;
                } else {
                    var shortId = EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]);
                    await f(shortId);
                    this.getExpandedValue();
                }
            } else if (type.toLowerCase().indexOf("langstring") !== -1) {
                this.addOrSearch = "add";
                var lang = "";
                if (this.$store.state.editor) {
                    lang = this.$store.state.editor.defaultLanguage;
                }
                this.$parent.add(this.expandedProperty, {"@language": lang, "@value": ""});
                this.langString = true;
            } else if (type.toLowerCase().indexOf("string") !== -1 || type.toLowerCase().indexOf("url") !== -1 || type.toLowerCase().indexOf("text") !== -1 ||
                type.toLowerCase().indexOf("date") !== -1 || type.toLowerCase().indexOf("concept") !== -1) {
                this.addOrSearch = "add";
                this.$parent.add(this.expandedProperty, {"@value": ""});
            } else {
                this.addOrSearch = "add";
                var rld = new EcRemoteLinkedData();
                rld.context = this.context;
                rld.type = type.split("/").pop();
                this.$parent.add(this.expandedProperty, rld);
            }
        },
        remove: async function(index) {
            if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["remove"]) {
                var f = this.profile[this.expandedProperty]["remove"];
                var value;
                if (EcObject.isObject(index)) {
                    value = index["@id"];
                } else {
                    value = EcObject.isObject(this.expandedValue[index]) ? this.expandedValue[index]["@id"] : this.expandedValue[index];
                }
                await f(EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]), value);
                this.getExpandedValue();
            } else {
                this.$parent.remove(this.expandedProperty, index);
            }
        },
        updatePropertyString(input, index) {
            this.update(input, index);
        },
        update: function(input, index) {
            var me = this;
            this.errorValidating = null;
            if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["resource"] === true) {
                for (var i = 0; i < this.expandedValue.length; i++) {
                    if (!input.name || !input["@value"] || input["@value"].indexOf("http") === -1) {
                        return this.showModal("nameAndUrlRequired");
                    }
                }
            }
            this.$parent.update(this.expandedProperty, index, input, function() {
                me.stopEditing();
            });
        },
        isText: function(type) {
            if (type == null || type === undefined) return null;
            if (type["@value"] != null && type["@value"] !== undefined) {
                return true;
            }
            if (type["@type"] !== undefined && type["@type"] !== null) {
                if (type["@type"][0].toLowerCase().indexOf("text") !== -1) { return true; }
                if (type["@type"][0].toLowerCase().indexOf("url") !== -1) { return true; }
                if (type["@type"][0].toLowerCase().indexOf("concept") !== -1) { return true; }
                if (type["@type"][0].toLowerCase().indexOf("string") !== -1) { return true; }
            }
            if (type["@id"] != null && type["@id"] !== undefined) { return true; }
            return false;
        },
        isLink: function(type) {
            if (EcObject.keys(type).length === 1) {
                if (type["@id"] != null && type["@id"] !== undefined) {
                    return true;
                } else if (type["@value"] && type["@value"].indexOf("http") === 0) {
                    return true;
                }
            }
            return false;
        },
        save: function() {
            if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["save"]) {
                var f = this.profile[this.expandedProperty]["save"];
                if (this.checkedOptions) {
                    f(this.expandedThing, this.checkedOptions, this.profile[this.expandedProperty]["options"]);
                }
            } else {
                if (this.expandedProperty.indexOf('@') === -1 && !this.validate) {
                    var changed = false;
                    for (var i = 0; i < this.expandedValue.length; i++) {
                        if (this.initialValue) {
                            if (this.expandedValue[i]["@id"] !== this.initialValue[i]["@id"] || this.expandedValue[i]["@value"] !== this.initialValue[i]["@value"] || this.expandedValue[i]["@language"] !== this.initialValue[i]["@language"]) {
                                changed = true;
                                break;
                            }
                        }
                    }
                    if (changed) {
                        this.$store.commit('editor/addEditsToUndo',
                            {operation: "update", id: EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]), fieldChanged: [this.expandedProperty], initialValue: this.initialValue, changedValue: this.expandedValue, expandedProperty: true}
                        );
                        this.$parent.saveThing();
                    }
                }
            }
        },
        isObject: function(k) { return EcObject.isObject(k); },
        getURL: function(item) {
            if (item['@value']) {
                return item['@value'];
            } else if (item['@id']) {
                return item['@id'];
            }
        },
        getExpandedValue: async function() {
            var expanded = this.expandedThing[this.expandedProperty];
            if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["valuesIndexed"]) {
                expanded = [];
                var f = this.profile[this.expandedProperty]["valuesIndexed"];
                f = f();
                var shortId = EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]);
                if (f && f[shortId]) {
                    this.expandedValue = f[shortId];
                    return;
                }
                this.expandedValue = [];
                return;
            }
            if (this.expandedProperty.charAt(0) === '@') {
                if (this.expandedProperty === "@id") {
                    expanded = [{"@value": EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing[this.expandedProperty])}];
                } else {
                    expanded = [{"@value": this.expandedThing[this.expandedProperty]}];
                }
            }
            this.expandedValue = expanded;
        },
        visibilityChanged: function(isVisible, entry) {
            if (isVisible) {
                this.getExpandedValue();
            }
        }
    },
    watch: {
        canEdit: function() {
            if (this.canEdit === false) {
                this.editingProperty = false;
            }
        },
        validate: function() {
            if (this.validate) {
                this.errorValidating = null;
                this.stopEditing();
            }
        },
        checkedOptions: function() {
            this.save();
        }
    }
};
</script>
<style lang="scss">
    @import '@/scss/variables.scss';

</style>