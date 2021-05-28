<template>
    <div
        class="modal lode__thing-editing is-active">
        <div class="modal-background" />
        <div class="modal-card  has-text-dark">
            <header class="modal-card-head has-background-primary has-text-white">
                <!-- HEADINGS WRAPPER -->
                <p class="modal-card-title is-size-3 has-text-white">
                    <span
                        class="pr-2"
                        v-if="newFramework && shortType === 'Framework'">Create framework</span>
                    <span
                        class="pr-2"
                        v-else-if="newFramework && shortType === 'ConceptScheme'">
                        <span v-if="queryParams.ceasnDataFields === 'true'">
                            Create Concept Scheme
                        </span>
                        <span v-else>
                            Create Taxonomy
                        </span>
                    </span>
                    <span
                        class="pr-2"
                        v-else>Edit {{ shortType }}</span>
                    <span class="">
                        <span
                            title="Auto saving"
                            class="tag has-text-dark is-rounded is-medium-grey is-small">
                            <span
                                v-if="saved"
                                class="is-small export icon has-text-success">
                                <i class="fa fa-check" />
                            </span>
                            <span
                                v-if="saving"
                                class="is-small export icon has-text-primary">
                                <i class="fa fa-spinner fa-pulse" />
                            </span>
                            <span
                                v-if="errorSaving"
                                class="is-small export icon has-text-link">
                                <i class="fa fa-exclamation" />
                            </span>
                            <span v-if="saving">saving</span>
                            <span v-if="saved">{{ saved }}</span>
                            <span v-if="errorSaving">error saving</span>
                        </span>
                    </span>
                </p>
                <button
                    @click="closeWithoutSaving"
                    class="delete"
                    aria-label="close" />
            </header>
            <section
                v-if="!showAddPropertyContent"
                class="modal-card-body">
                <div
                    v-for="heading in headings"
                    :key="heading"
                    class="lode__thing-heading">
                    <label
                        v-if="displayHeading(heading)"
                        class="label is-large is-family-secondary">
                        {{ displayHeading(heading) }}
                    </label>
                    <!-- this is the primary / required properties -->
                    <template
                        v-if="showAlwaysProperties && alwaysProperties[heading]"
                        class=""
                        :class="{highlighted: highlighted}">
                        <Property
                            v-for="(value,key) in alwaysProperties[heading]"
                            :key="key"
                            :expandedThing="expandedThing"
                            :expandedProperty="key"
                            :schema="value"
                            @editing-property-event="handleEditingEvent($event)"
                            :canEdit="allowPropertyEdits(key)"
                            :profile="profile"
                            @select="select"
                            :editingThing="editingThing"
                            :validate="validate"
                            :view="view"
                            @validated="validated"
                            @invalid="validate=false; errorValidating=true;" />
                        <slot name="frameworkTags" />
                    </template>
                    <template v-else-if="showPossibleProperties && possibleProperties[heading]">
                        <!-- this is the secondary / contains properties -->
                        <Property
                            v-for="(value,key) in possibleProperties[heading]"
                            :key="key"
                            :expandedThing="expandedThing"
                            :expandedProperty="key"
                            :schema="value"
                            @editing-property-event="handleEditingEvent($event)"
                            :canEdit="allowPropertyEdits(key)"
                            :profile="profile"
                            @select="select"
                            :editingThing="editingThing"
                            :validate="validate"
                            :view="view"
                            @validated="validated"
                            @invalid="validate=false; errorValidating=true;" />
                    </template>
                    <template v-else-if="showViewProperties && viewProperties[heading]">
                        <!-- here we have the expandable / does not contain value for properties -->
                        <Property
                            v-for="(value,key) in viewProperties[heading]"
                            :key="key"
                            :expandedThing="expandedThing"
                            :expandedProperty="key"
                            :schema="value"
                            @editing-property-event="handleEditingEvent($event)"
                            :canEdit="allowPropertyEdits(key)"
                            :profile="profile"
                            @select="select"
                            :editingThing="editingThing"
                            :validate="validate"
                            :view="view"
                            @validated="validated"
                            @invalid="validate=false; errorValidating=true;" />
                    </template>
                </div>
            </section>
            <section
                class="modal-card-body"
                v-if="isSearching && showAddPropertyContent">
                <h4 class="is-size-4 subtitle">
                    Searching for <b>{{ addingPropertyLabel }}</b> property on <b>{{ nameOfSelectedCompetency }}</b>
                </h4>
                <Search
                    view="thing-editing"
                    :idsNotPermittedInSearch="idsNotPermittedInSearch" />
            </section>
            <section
                v-if="showAddPropertyContent && !isSearching"
                class="modal-card-body">
                <AddProperty
                    :profile="profile"
                    :errorMessage="errorMessage"
                    :expandedThing="expandedThing"
                    @is-searching="isSearching=true" />
            </section>
            <footer class="modal-card-foot has-background-light">
                <!-- bottom bar actions -->
                <div
                    class="buttons"
                    v-if="frameworkEditable || editingThing">
                    <div
                        :title="'Delete this ' + (shortType ? shortType.toLowerCase() : '')"
                        @click.stop="clickToDelete"
                        class="button is-outlined is-danger"
                        v-if="canEdit && !isSearching">
                        <template v-if="newFramework && shortType === 'Framework'">
                            <span
                                class="icon delete-thing">
                                <i
                                    class="fa fa-times"
                                    aria-hidden="true" />
                            </span>
                            <span>Cancel create new framework</span>
                        </template>
                        <template v-else-if="newFramework && shortType === 'ConceptScheme'">
                            <span
                                class="icon delete-thing">
                                <i
                                    class="fa fa-times"
                                    aria-hidden="true" />
                            </span>
                            <span v-if="queryParams.ceasnDataFields === 'true'">
                                Cancel Create Concept Scheme
                            </span>
                            <span v-else>
                                Cancel Create Taxonomy
                            </span>
                        </template>
                        <template v-else>
                            <span
                                class="icon is-danger delete-thing">
                                <i
                                    class="fa fa-trash"
                                    aria-hidden="true" />
                            </span>
                        </template>
                    </div>
                    <!-- remove object -->
                    <div
                        @click.stop="showModal('removeObject')"
                        class="button is-outlined is-warning"
                        title="Remove competency from framework"
                        v-if="frameworkEditable && shortType === 'Competency' && !newFramework && !isSearching">
                        <span
                            class="icon remove">
                            <i
                                class="fa fa-minus-circle"
                                aria-hidden="true" />
                        </span>
                    </div>
                    <!-- export -->
                    <div
                        v-if="!isSearching && shortType !== 'Level'"
                        @click.stop="showModal('export')"
                        :title="'Export ' + shortType"
                        class="button is-outlined is-info">
                        <span class="is-small export icon">
                            <i class="fa fa-file-export" />
                        </span>
                    </div>

                    <div
                        v-if="!showAddPropertyContent && (view === 'framework' || view === 'concept') && hasAdditionalProperty && !errorValidating"
                        @click="onClickToAddProperty"
                        class="button is-outlined is-primary">
                        <span class="icon">
                            <i class="fa fa-plus" />
                        </span>
                        <span>
                            Add property
                        </span>
                    </div>
                    <div
                        v-if="showAddPropertyContent"
                        @click="onCancelAddProperty"
                        class="button is-outlined is-dark">
                        <span
                            class="icon"
                            v-if="isSearching">
                            <i class="fa fa-arrow-left" />
                        </span>
                        <span
                            class="icon"
                            v-else>
                            <i class="fa fa-times" />
                        </span>
                        <span v-if="isSearching">
                            back
                        </span>
                        <span v-else>
                            cancel
                        </span>
                    </div>
                    <div
                        v-if="showAddPropertyContent && !isSearching"
                        @click="saveNewProperty"
                        class="button is-outlined is-primary">
                        <span class="icon">
                            <i class="fa fa-save" />
                        </span>
                        <span>
                            save property
                        </span>
                    </div>
                    <div
                        v-if="!showAddPropertyContent"
                        @click="doneEditing"
                        :disabled="disableDoneEditingButton"
                        title="Done editing"
                        class="button is-outlined is-dark">
                        <span class="export icon">
                            <i class="fa fa-check" />
                        </span>
                        <span>done</span>
                    </div>
                    <div
                        v-if="!showAddPropertyContent && $store.state.editor.newCompetency"
                        @click="saveAndAddAnother"
                        title="Done editing"
                        class="button is-outlined is-dark">
                        <span class="export icon">
                            <i class="fa fa-check" />
                        </span>
                        <span>save and add another</span>
                    </div>
                    <template v-if="isSearching">
                        <div
                            @click="addSelected"
                            title="Add Competency as Property"
                            class="button is-outlined is-primary">
                            <span class="icon">
                                <i class="fa fa-check" />
                            </span>
                            <span>Add Selected</span>
                        </div>
                    </template>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import Property from './Property.vue';
import AddProperty from './AddProperty.vue';
import Search from '@/components/framework/Search.vue';
// import SearchModal from '@/components/modalContent/SearchModal.vue';
import common from '@/mixins/common.js';
export default {
    // Thing represents a JSON-LD object. Does not have to be based on http://schema.org/Thing.
    name: 'ThingEditing',
    props: {
        // (Optional) Object that will be turned into the Thing during initialization.
        obj: Object,
        // (Optional) Expanded Object (if any) that will be turned into the ExpandedThing during initialization.
        children: Number,
        expandedObj: Object,
        // (Optional) URI/URL to an object to go fetch, in lieu of the above two.
        uri: String,
        // If the uri is specified, whether we should delay loading. (prevents infinite loops)
        clickToLoad: Boolean,
        // True if the parent isn't editable, this shouldn't be either. Overrides canEdit.
        parentNotEditable: Boolean,
        // Application profile used to constrain and respecify properties that are to be made editable.
        profile: Object,
        highlightList: Array,
        childrenExpanded: {
            type: Boolean,
            default: true
        },
        newFramework: Boolean,
        index: Number,
        frameworkEditable: Boolean,
        cantMoveUp: Boolean,
        cantMoveDown: Boolean,
        cantMoveRight: Boolean,
        cantMoveLeft: Boolean,
        editingNode: Boolean,
        properties: String,
        view: {
            type: String,
            default: 'framework'
        }
    },
    components: {
        Property,
        AddProperty,
        Search
        // SearchModal
    },
    mixins: [ common ],
    data: function() {
        return {
            showAddPropertyContent: false,
            isSearching: false,
            selectedMove: '',
            saving: false,
            saved: "saved",
            errorSaving: false,
            editingThing: true,
            editingClass: 'thing-editing',
            hoverClass: '',
            // After initialization and expansion, this will hold the fully expanded thing we're displaying/CRUDing.
            expandedThing: null,
            originalThing: null,
            // True if we are in the compacted (alwaysProperties) property display mode. In the middle of this and showPossible is all properties that we can view.
            showAlways: false,
            // True if we are in the fully expanded (possibleProperties) property display mode. Only relevant if we can edit the object.
            showPossible: true,
            uriAndNameOnly: false,
            name: null,
            skipConfigProperties: ["alwaysProperties", "headings", "primaryProperties", "secondaryProperties", "tertiaryProperties", "relationshipsHeading", "relationshipsPriority"],
            validate: false,
            validateCount: 0,
            repo: window.repo,
            doneValidating: false,
            doneSaving: false,
            errorMessage: [],
            idsNotPermittedInSearch: [],
            addAnother: false,
            disableDoneEditingButton: false,
            errorValidating: null
        };
    },
    created: function() {
        if (this.clickToLoad === false) { this.load(); }
    },
    mounted: function() {
        if (this.uri && this.$store.state.editor) {
            this.resolveNameFromUrl(this.uri);
        }
        var lastSaved = this.originalThing["schema:dateModified"];
        if (lastSaved) {
            this.saved = "last saved " + new Date(lastSaved).toLocaleString();
        }
        if (this.obj && this.obj.shortId() === this.changedObject) {
            this.$store.commit('editor/changedObject', null);
        }
    },
    beforeDestroy: function() {
        this.$store.commit('editor/selectedCompetency', null);
        this.$store.commit('lode/setAddingProperty', '');
        this.$store.commit('lode/setAddingValue', '');
        this.$store.commit('lode/setIsAddingProperty', false);
    },
    computed: {
        ...mapState({
            selectedCompetency: state => state.editor.selectedCompetency,
            framework: state => state.editor.framework,
            queryParams: state => state.editor.queryParams,
            addingProperty: state => state.lode.addingProperty,
            isSavingProperty: state => state.lode.isSavingProperty,
            isSavingThing: state => state.lode.isSavingThing,
            addingValue: state => state.lode.addingValue,
            addingRange: state => state.lode.addingRange,
            addingChecked: state => state.lode.addingChecked
        }),
        addingPropertyLabel: function() {
            if (this.addingProperty && this.profile && this.profile[this.addingProperty]) {
                return this.profile[this.addingProperty]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            }
            return this.addingProperty;
        },
        nameOfSelectedCompetency: function() {
            if (this.selectedCompetency && this.selectedCompetency.name) {
                if (this.selectedCompetency.getName) {
                    return this.selectedCompetency.getName();
                } else {
                    return Thing.getDisplayStringFrom(this.selectedCompetency.name);
                }
            } else if (this.selectedCompetency) {
                if (this.selectedCompetency["skos:prefLabel"]) {
                    return Thing.getDisplayStringFrom(this.selectedCompetency["skos:prefLabel"]);
                } else {
                    return Thing.getDisplayStringFrom(this.selectedCompetency["dcterms:title"]);
                }
            } else {
                return '';
            }
        },
        showAlwaysProperties: function() {
            if (this.showAlways === true &&
            this.expandedThing !== null && this.expandedThing !== undefined) {
                return true;
            } else {
                return false;
            }
        },
        showPossibleProperties: function() {
            if (this.showPossible === true &&
            this.expandedThing != null &&
            this.expandedThing !== undefined) {
                return true;
            } else {
                return false;
            }
        },
        showViewProperties: function() {
            if (this.expandedThing !== null &&
            this.expandedThing !== undefined) {
                return true;
            } else {
                return false;
            }
        },
        /*
         * TO DO: Make headings only returns one that have properties filled in
         * and are showing.
         * Currently I can get a blank list section for keys heading section
         */
        headings: function() {
            if (this.profile && this.profile["headings"] && this.profile["headings"].length !== 0) {
                return this.profile["headings"];
            } else {
                return [""];
            }
        },
        minimizeButtonClass: function() {
            if (this.showAlways === true && this.showPossible === false) {
                return 'is-text has-text-info ';
            } else {
                return 'is-text has-text-dark';
            }
        },
        allPropertiesButtonClass: function() {
            if (this.showAlways === false && this.showPossible === null) {
                return 'is-info has-text-white ';
            } else {
                return 'is-text has-text-dark';
            }
        },
        globalButtonClass: function() {
            if (this.showAlways === false && this.showPossible === true) {
                return 'is-info has-text-white ';
            } else {
                return 'is-text has-text-dark';
            }
        },
        // Get the fully qualified type of the thing. eg: http://schema.org/Person
        type: function() {
            if (this.expandedThing == null) {
                return null;
            }
            return this.expandedThing["@type"][0];
        },
        // Get the short (one word) type of the thing. eg: Person
        shortType: function() {
            if (this.expandedThing == null) {
                return null;
            }
            return this.expandedThing["@type"][0].split("/").pop();
        },
        // Get the canonical namespace/context prefix of the type. eg: http://schema.org/ -- WARNING: This is not the @context as specified by the Thing.
        context: function() {
            // TODO: Rename 'namespace' -- context is confusing.
            if (this.type) {
                var ary = this.type.split("/");
                ary.pop();
                return ary.join("/");
            }
            return null;
        },
        /*
         * True if the current client can edit this object.
         * shouldn't need this check here, since only Thing.vue will be able to enable edit
         */
        canEdit: function() {
            /*
             *if (this.parentNotEditable === true) {
             * return false;
             * }
             * if (this.originalThing && this.originalThing.canEditAny) {
             * return this.originalThing.canEditAny(EcIdentityManager.default.getMyPks());
             *}
             */
            return true;
        },
        // Fetches a map of fully qualified property identifiers to the full @graph property specifications.
        schema: function() {
            var schema = this.$store.state.lode.schemata[this.type];
            if (schema == null) {
                schema = this.$store.state.lode.schemata[this.context];
            }
            var result = {};
            if (schema !== null && schema !== undefined) {
                for (var i = 0; i < schema.length; i++) {
                    var r = schema[i];
                    result[r["@id"]] = r;
                }
            }
            return result;
        },
        // Map of fully qualified property ids to schema items that should always be shown (if available) at the top for any object.
        alwaysProperties: function() {
            var result = {};
            if (this.profile && this.profile["alwaysProperties"]) {
                return this.getPropertiesFromProfile(result, "alwaysProperties");
            } else if (this.profile && this.profile["primaryProperties"]) {
                return this.getPropertiesFromProfile(result, "primaryProperties");
            }
            var props = [
                "http://schema.org/name", "http://schema.org/description", "http://purl.org/dc/terms/title", "http://purl.org/dc/terms/description",
                "http://www.w3.org/2004/02/skos/core#prefLabel", "http://www.w3.org/2004/02/skos/core#definition"
            ];
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];

                if (this.profile == null || (this.profile != null && this.profile[prop] !== undefined)) {
                    if (this.schema[prop] != null) {
                        if (this.expandedThing[prop] != null && this.expandedThing[prop].length !== 0) {
                            var heading = "";
                            if (this.profile != null) {
                                if (this.profile[prop]["heading"]) {
                                    heading = this.profile[prop]["heading"];
                                }
                                if (result[heading] == null || result[heading] === undefined) {
                                    result[heading] = {};
                                }
                                result[heading][prop] = this.profile[prop];
                            } else {
                                if (result[heading] == null || result[heading] === undefined) {
                                    result[heading] = {};
                                }
                                result[heading][prop] = this.schema[prop];
                            }
                        }
                    }
                }
            }
            return result;
        },
        // Map of fully qualified property ids to schema items, limited to properties that have data in them, shown in the first level of breakout. Configurable via the profile property.
        viewProperties: function() {
            var result = {};
            for (var key in this.alwaysProperties) {
                result[key] = {};
                for (var key2 in this.alwaysProperties[key]) {
                    result[key][key2] = this.alwaysProperties[key][key2];
                }
            }
            if (this.profile && this.profile["secondaryProperties"]) {
                return this.getPropertiesFromProfile(result, "secondaryProperties");
            }
            for (var key in this.expandedThing) {
                if (key === "constructor") continue;
                if (key === "@id") continue;
                if (key === "@type") continue;
                if (key === "@context") continue;
                if (key.endsWith("owner")) continue;
                if (key.endsWith("reader")) continue;
                if (key.endsWith("signature")) continue;
                // If it doesn't exist in the profile, don't show it.
                if (this.profile != null && this.profile[key] === undefined) {
                    continue;
                }
                // If it doesn't exist in the data, don't show it.
                if (this.expandedThing[key] == null || this.expandedThing[key].length === 0) {
                    continue;
                }
                // If it does exist in the profile, use the schema from the profile.
                if (this.profile != null) {
                    var heading = "";
                    if (this.profile[key]["heading"]) {
                        heading = this.profile[key]["heading"];
                    }
                    if (result[heading] == null || result[heading] === undefined) {
                        result[heading] = {};
                    }
                    result[heading][key] = this.profile[key];
                    continue;
                }
                // If there is no profile, use the schema from the schema.
                if (this.schema[key] != null && this.schema[key] !== undefined) {
                    if (result[""] == null || result[""] === undefined) {
                        result[""] = {};
                    }
                    result[""][key] = this.schema[key];
                    continue;
                }
                // If it doesn't exist in the schema, use the 'schemaFallback'.
                if (result[""] == null || result[""] === undefined) {
                    result[""] = {};
                }
                result[""][key] = this.$store.state.lode.schemaFallback[key];
            }
            if (this.profile) {
                for (var key in this.profile) {
                    var heading = "";
                    if (this.profile[key]["heading"]) {
                        heading = this.profile[key]["heading"];
                    }
                    if (result[heading] == null && result[heading] === undefined) {
                        result[heading] = {};
                    }
                    if (this.profile[key]["valuesIndexed"]) {
                        var f = this.profile[key]["valuesIndexed"];
                        f = f();
                        if (f && f[this.obj.shortId()]) {
                            result[heading][key] = this.profile[key];
                        }
                    } else if (this.expandedThing[key] != null && this.expandedThing[key].length !== 0) {
                        result[heading][key] = this.profile[key];
                    }
                }
            }
            return result;
        },
        // Map of fully qualified property ids to schema items, unlimited, shown in the second level of breakout. Configurable via the profile property.
        possibleProperties: function() {
            var result = {};
            for (var key in this.viewProperties) {
                result[key] = {};
                for (var key2 in this.viewProperties[key]) {
                    result[key][key2] = this.viewProperties[key][key2];
                }
            }
            if (this.profile && this.profile["tertiaryProperties"]) {
                return this.getPropertiesFromProfile(result, "tertiaryProperties");
            }
            if (this.profile != null) {
                for (var key in this.profile) {
                    if (!EcArray.has(this.skipConfigProperties, key)) {
                        if (this.profile["headings"] && this.profile["headings"].length !== 0) {
                            var heading = this.profile[key]["heading"];
                            if (result[heading] == null || result[heading] === undefined) {
                                result[heading] = {};
                            }
                            result[heading][key] = this.profile[key];
                        } else {
                            if (result[""] == null || result[""] === undefined) {
                                result[""] = {};
                            }
                            result[""][key] = this.profile[key];
                        }
                    }
                }
            } else {
                for (var key in this.schema) {
                    if (key === "constructor") continue;
                    if (key === "@id") continue;
                    if (key === "@type") continue;
                    if (key === "@context") continue;
                    if (key.endsWith("owner")) continue;
                    if (key.endsWith("reader")) continue;
                    if (key.endsWith("signature")) continue;
                    if (this.profile != null && this.profile[key] === undefined) {
                        continue;
                    }
                    if (this.schema[key]["@type"] === undefined && this.schema[key]["http://schema.org/domainIncludes"] === undefined) {
                        continue;
                    }
                    if (this.schema[key]["@type"] != null && this.schema[key]["@type"][0].indexOf("Property") === -1) {
                        continue;
                    }
                    // If there is no profile, use the schema from the schema.
                    if (this.schema[key] != null && this.schema[key] !== undefined) {
                        if (result[""] == null || result[""] === undefined) {
                            result[""] = {};
                        }
                        result[""][key] = this.schema[key];
                        continue;
                    }
                    // If it doesn't exist in the schema, use the 'schemaFallback'.
                    if (result[""] == null || result[""] === undefined) {
                        result[""] = {};
                    }
                    result[""][key] = this.$store.state.lode.schemaFallback[key];
                }
            }
            return result;
        },
        // Attempt to get icons for types. Failed pretty miserably.
        iconClass: function() {
            return "fas fa-" + this.shortType.toLowerCase();
        },
        highlighted: function() {
            if (this.highlightList) {
                for (var i = 0; i < this.highlightList.length; i++) {
                    if (this.obj.shortId() === this.highlightList[i] || this.obj.id === this.highlightList[i]) {
                        return true;
                    }
                }
            }
            return false;
        },
        changedObject: function() {
            if (this.$store.state.editor) {
                return this.$store.state.editor.changedObject;
            }
            return null;
        },
        isAddingProperty: function() {
            return this.$store.getters['lode/isAddingProperty'];
        },
        // Returns true if profile has at least one additional available property
        hasAdditionalProperty: function() {
            if (this.profile) {
                for (var key in this.profile) {
                    if (!EcArray.has(this.skipConfigProperties, key)) {
                        if (this.profile[key]["readOnly"] === "true" || this.profile[key]["readOnly"] === true) {
                            continue;
                        }
                        // If one value is allowed for a property and it already exists, the user cannot add another. Only applies to single edit.
                        if (this.profile[key]["max"] === 1) {
                            // If the property is required then it is not additional
                            if (this.profile[key]["isRequired"] === "true" || this.profile[key]["isRequired"] === true) {
                                continue;
                            }
                            if (this.profile[key]["valuesIndexed"]) {
                                var f = this.profile[key]["valuesIndexed"];
                                f = f();
                                if (f && f[this.obj.shortId()]) {
                                    continue;
                                }
                            } else {
                                if (this.expandedThing && this.expandedThing[key] != null && this.expandedThing[key].length > 0) {
                                    continue;
                                }
                            }
                        }
                        return true;
                    }
                }
            }
            return false;
        }
    },
    methods: {
        onClickToAddProperty: function() {
            this.showAddPropertyContent = true;
            this.$store.commit('lode/setAddingProperty', '');
            this.$store.commit('lode/setAddingValue', '');
            this.$store.commit('lode/setIsAddingProperty', true);
        },
        onCancelAddProperty: function() {
            this.showAddPropertyContent = false;
            this.isSearching = false;
            this.$store.commit('lode/setIsAddingProperty', false);
            this.errorMessage = [];
            /* TO DO - clear property to add when cancel add property */
        },
        saveNewProperty: function() {
            // Validate input
            var property = this.addingProperty;
            var value = this.addingValue;
            var range = this.addingRange;
            this.errorMessage = [];
            this.errorMessage = [];
            var isResource = false;
            if (this.profile && this.profile[property] && this.profile[property]["resource"]) {
                isResource = true;
            }
            if (!property) {
                return this.errorMessage.push("Property type is required.");
            }
            if ((!value || (value !== null && value !== undefined && value["@value"] !== null && value["@value"] !== undefined && value["@value"].trim().length === 0)) &&
                (!this.addingChecked || this.addingChecked.length === 0)) {
                return this.errorMessage.push("Value is required to save.");
            }
            if (value && isResource) {
                // Name and value both required for a resource
                if (!value["@value"] || !value["name"]) {
                    return this.errorMessage.push("This property must have a URL and a name.");
                }
                if (value["@value"].indexOf("http") === -1) {
                    return this.errorMessage.push("This property must be a URL. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.");
                }
            }
            if (value && !isResource && range.length === 1 && (range[0] === "http://schema.org/URL" || range[0].toLowerCase().indexOf("concept") !== -1 ||
                range[0].toLowerCase().indexOf("competency") !== -1 || range[0].toLowerCase().indexOf("level") !== -1)) {
                if (value.indexOf("http") === -1) {
                    return this.errorMessage.push("This property must be a URL. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.");
                }
            }
            if (value && range[0].toLowerCase().indexOf("level") !== -1) {
                var level = EcLevel.getBlocking(value);
                if (!level) {
                    return this.errorMessage.push("This URL must be a Level that is already in the system.");
                }
            }
            if (value && range.length === 1 && range[0].toLowerCase().indexOf("langstring") !== -1) {
                if (value["@language"] == null || value["@language"] === undefined || value["@language"].trim().length === 0) {
                    return this.errorMessage.push("This field can only have one entry per language.");
                }
                if (this.profile && this.profile[property] && (this.profile[property]["onePerLanguage"] === 'true' || this.profile[property]["onePerLanguage"] === true) && this.expandedThing[property]) {
                    var languagesUsed = [];
                    for (var i = 0; i < this.expandedThing[property].length; i++) {
                        if (languagesUsed.includes(this.expandedThing[property][i]["@language"].toLowerCase())) {
                            return this.errorMessage.push("This field can only have one entry per language.");
                        }
                        languagesUsed.push(this.expandedThing[property][i]["@language"].toLowerCase());
                    }
                    // Check new value being added
                    if (languagesUsed.includes(value["@language"].toLowerCase())) {
                        return this.errorMessage.push("This field can only have one entry per language.");
                    }
                }
            }
            var initialValue;
            // Add and save
            if (this.profile && this.profile[property]["add"]) {
                var f = this.profile[property]["add"];
                if (f !== "checkedOptions") {
                    var shortId = EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]);
                    f(shortId, [value]);
                }
            } else {
                if (this.expandedThing[property]) {
                    initialValue = JSON.parse(JSON.stringify(this.expandedThing[property]));
                }
                this.add();
            }
            if (this.profile && this.profile[property]["save"]) {
                var f = this.profile[property]["save"];
                if (this.addingChecked && this.addingChecked.length > 0) {
                    f(this.expandedThing, this.addingChecked, this.profile[property]["options"]);
                } else {
                    f();
                }
            } else {
                if (initialValue) {
                    // Undo for other ways of adding are handled in profile
                    this.$store.commit('editor/addEditsToUndo',
                        {operation: "update", id: EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]), fieldChanged: [property], initialValue: [initialValue], changedValue: [this.expandedThing[property]], expandedProperty: true}
                    );
                }
                this.saveThing();
            }
            this.showAddPropertyContent = false;
            this.$store.commit('lode/setIsAddingProperty', false);
            this.$store.commit('lode/setAddingProperty', '');
            this.$store.commit('lode/setAddingValue', '');
        },
        handleMove: function(e) {
            appLog(e);
            let move = e.target.value;
            if (move === 'movedown') {
                this.moveDown();
            } else if (move === 'moveleft') {
                this.moveLeft();
            } else if (move === 'moveright') {
                this.moveRight();
            } else if (move === 'moveup') {
                this.moveUp();
            } else {
                appLog("error: move not allowed");
            }
            this.selectedMove = '';
        },
        /*
         * Show just the properties that
         * have values for this competency
         */
        showEnteredProperties: function() {
            appLog("showing entered properties");
            this.showAlways = false;
            this.showPossible = null;
        },
        /*
         * Show all available properties
         * even empty
         */
        showGlobal: function() {
            this.showAlways = false;
            this.showPossible = true;
        },
        emitExpandEvent: function(e) {
            appLog("expand", e.target);
            this.$emit('expand-event');
        },
        handleMouseOverThing: function() {
            this.hoverClass = 'showHoverItems';
        },
        handleMouseOutThing: function() {
            this.hoverClass = '';
        },
        /*
        Do not use plugin modal anymore, this has been updated for
        template based modals
        */
        showModal(val) {
            var me = this;
            if (val === 'deleteObject') {
                if (this.shortType === 'Competency') {
                    this.$store.commit('app/showModal', {component: 'DeleteCompetencyConfirm'});
                } else if (this.shortType === "Level") {
                    this.$store.commit('app/showModal', {component: 'DeleteLevelConfirm'});
                } else if (this.shortType === "Concept") {
                    this.$store.commit('app/showModal', {component: 'DeleteConceptConfirm'});
                } else if (this.shortType === "ConceptScheme") {
                    this.$store.commit('app/showModal', {component: 'DeleteConceptSchemeConfirm'});
                } else if (this.shortType === "Framework") {
                    this.$store.commit('app/showModal', {component: 'DeleteFrameworkConfirm'});
                } else if (this.shortType === "Directory") {
                    this.$store.commit('app/showModal', {component: 'DeleteDirectoryConfirm'});
                }
            } else {
                if (val === 'removeObject') {
                    this.$store.commit('editor/setItemToRemove', this.obj);
                    this.$store.commit('app/showModal', {component: 'RemoveCompetencyConfirm'});
                }
                if (val === 'export') {
                    this.$store.commit('editor/setItemToExport', this.obj);
                    this.$store.commit('app/showModal', {title: 'Export ' + this.shortType, component: 'ExportOptionsModal'});
                }
            }
        },
        load: function() {
            var me = this;
            me.clickToLoad = false;
            if (this.uri != null) {
                // If we have a uri, go get the data from the uri and continue loading.
                EcRepository.get(
                    this.uri,
                    function(t) {
                        me.originalThing = t;
                        if (!EcObject.isObject(t)) {
                            me.resolveNameFromUrl(me.uri);
                            me.uriAndNameOnly = true;
                        } else {
                            var allTypes = me.getAllTypes(t);
                            if (t.context != null && t.context !== undefined) {
                                allTypes.push(t.context);
                            }
                            new EcAsyncHelper().each(allTypes, function(type, callback) {
                                me.loadSchema(callback, type);
                            }, function() {
                                me.expand(t, function() {
                                });
                            });
                        }
                    },
                    function() {
                        me.resolveNameFromUrl(me.uri);
                        me.uriAndNameOnly = true;
                    }
                );
            } else {
                if (this.expandedObj != null && this.expandedObj !== undefined) {
                    // If we don't have an expandedObj provided, expand whatever is in obj and continue loading.
                    this.loadSchema(function() {
                        me.expandedThing = me.expandedObj;
                        if (me.$store.state.editor && (EcRemoteLinkedData.trimVersionFromUrl(me.expandedThing["@id"]) === me.$store.state.editor.newCompetency ||
                        EcRemoteLinkedData.trimVersionFromUrl(me.expandedThing["@id"]) === me.$store.state.editor.newFramework)) {
                            me.populateRequiredFields();
                        }
                    }, this.expandedObj["@type"][0]);
                } else {
                    me.originalThing = this.obj;
                    var allTypes = me.getAllTypes(this.obj);
                    if (this.obj.context != null && this.obj.context !== undefined) {
                        allTypes.push(this.obj.context);
                    }
                    new EcAsyncHelper().each(allTypes, function(type, callback) {
                        me.loadSchema(callback, type);
                    }, function() {
                        me.expand(me.obj, function() {
                        });
                    });
                }
            }
        },
        // Fleshes out the Thing object with empty containers for any possible field that can be edited, according to the schema. Permits reactivity of currently unused fields.
        reactify: function(o) {
            for (let key in o) {
                if (EcArray.isArray(o[key])) {
                    for (let item of o[key]) {
                        if (EcObject.isObject(item)) {
                            if (item["@type"] != null) {
                                this.reactify(item);
                            }
                        }
                    }
                }
            }
            var objectModel = null;
            var fullType = o["@type"];
            if (EcArray.isArray(fullType) && fullType.length > 0) fullType = fullType[0];
            var objectModel = this.$store.state.lode.objectModel[fullType];
            if (objectModel != null) {
                for (let key in objectModel) {
                    if (o[key] == null) {
                        o[key] = [];
                    }
                }
            }
            if (this.profile) {
                for (let key in this.profile) {
                    if (o[key] == null && !this.profile[key]["valuesIndexed"] && !EcArray.has(this.skipConfigProperties, key)) {
                        o[key] = [];
                    }
                }
            }
            return o;
        },
        // Performs a JSON-LD Processor 'expand' operation that disambiguates and attaches a namespace for each property. Places result in expandedThing. Does not use the schema, uses the @context of the thing.
        expand: function(o, after) {
            var me = this;
            var toExpand = JSON.parse(o.toJson());
            if (toExpand["@context"] != null && toExpand["@context"].startsWith("http://")) {
                toExpand["@context"] = toExpand["@context"].replace("http://", "https://");
            }
            if (toExpand["@context"] != null && toExpand["@context"].indexOf("skos") !== -1) {
                toExpand["@context"] = "https://schema.cassproject.org/0.4/skos/";
            }
            jsonld.expand(toExpand, function(err, expanded) {
                if (err == null) {
                    me.expandedThing = me.reactify(expanded[0]);
                    if (me.$store.state.editor && (EcRemoteLinkedData.trimVersionFromUrl(me.expandedThing["@id"]) === me.$store.state.editor.newCompetency ||
                    EcRemoteLinkedData.trimVersionFromUrl(me.expandedThing["@id"]) === me.$store.state.editor.newFramework)) {
                        me.populateRequiredFields();
                    }
                } else {
                    appError(err);
                }
            });
        },
        // Loads the schema (not the context!) for this object, if available and if it is where it should be (at the url of the fully qualified @type).
        loadSchema: function(after, type) {
            var me = this;
            if (type == null) type = this.type;
            if (type.startsWith("http://schema.org/")) {
                if (after != null) after();
                return;
            } else if (type.indexOf("ConceptScheme") !== -1) {
                type = "https://schema.cassproject.org/0.4/skos/ConceptScheme";
            } else if (type.indexOf("Concept") !== -1) {
                type = "https://schema.cassproject.org/0.4/skos/Concept";
            } else if (type.indexOf("skos") !== -1) {
                type = "https://schema.cassproject.org/0.4/skos";
            }
            if (this.$store.state.lode.schemata[type] === undefined && type.indexOf("EncryptedValue") === -1) {
                var augmentedType = type;
                augmentedType += (type.indexOf("schema.org") !== -1 ? ".jsonld" : "");
                EcRemote.getExpectingObject("", augmentedType, function(context) {
                    me.$store.commit('lode/rawSchemata', {id: type, obj: context});
                    jsonld.expand(context, function(err, expanded) {
                        if (err == null) {
                            me.$store.dispatch('lode/schemata', {id: type, obj: expanded});
                            if (after != null) after();
                        } else {
                            after();
                        }
                    });
                }, after);
            } else {
                if (after != null) after();
            }
        },
        // Add a piece of new data to a property. Invoked by child components, in order to add data (for reactivity reasons).
        add: function(passedInProp, passedInVal) {
            let property = passedInProp || this.addingProperty;
            let value = passedInVal || this.addingValue;
            if (value["@value"] == null || value["@value"] === undefined) {
                value = {"@value": value};
            }
            var me = this;
            new EcAsyncHelper().each(me.getAllTypes(value), function(type, callback) {
                me.loadSchema(callback, type);
            }, function() {
                if (me.expandedThing[property] === undefined || me.expandedThing[property] == null) {
                    me.expandedThing[property] = [];
                }
                if (!EcArray.isArray(me.expandedThing[property])) {
                    me.expandedThing[property] = [me.expandedThing[property]];
                }
                if (value["@value"] == null) {
                    jsonld.expand(JSON.parse(value.toJson()), function(err, expanded) {
                        if (err != null) {
                            appError(err);
                        } else {
                            me.expandedThing[property].push(me.reactify(expanded[0]));
                        }
                    });
                } else {
                    me.expandedThing[property].push(value);
                }
            });
        },
        // Removes a piece of data from a property. Invoked by child components, in order to remove data (for reactivity reasons).
        remove: function(property, index) {
            var initialValue = JSON.parse(JSON.stringify(this.expandedThing[property]));
            if (!EcArray.isArray(this.expandedThing[property])) {
                this.expandedThing[property] = [this.expandedThing[property]];
            }
            this.expandedThing[property].splice(index, 1);
            this.$store.commit('editor/addEditsToUndo',
                {operation: "update", id: EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]), fieldChanged: [property], initialValue: initialValue, changedValue: this.expandedThing[property], expandedProperty: true}
            );
            this.saveThing();
        },
        // Changes a piece of data. Invoked by child components, in order to change a piece of data to something else (for reactivity reasons).
        update: function(property, index, value, callback) {
            // reset errorValidating on change
            this.errorValidating = null;
            if (this.profile && this.profile[property] && this.profile[property]["update"]) {
                if (value["name"] && value["@value"]) {
                    var f = this.profile[property]["update"];
                    f(value);
                }
            } else if (index == null) {
                this.expandedThing[property] = value;
            } else {
                this.expandedThing[property][index] = value;
            }
            if (callback) {
                callback();
            }
        },
        // Saves this thing to the location specified by its @id.
        saveThing: function() {
            this.saving = true;
            this.doneSaving = false;
            this.saved = false;
            this.errorSaving = false;
            // TODO: If repo isn't defined, save to its @id location.
            var saver = this;
            var me = this;
            while (saver.expandedThing["@id"] == null || saver.expandedThing["@id"] === undefined) {
                saver = saver.$parent.$parent;
                if (saver.expandedThing == null) {
                    return "Could not save.";
                }
            }
            // When we save, we need to remove all the extreneous arrays that we added to support reactivity.
            jsonld.compact(this.stripEmptyArrays(this.expandedThing), this.$store.state.lode.rawSchemata[this.context], function(err, compacted) {
                if (err != null) {
                    appError(err);
                }
                if (compacted) {
                    compacted = me.turnFieldsBackIntoArrays(compacted);
                    var rld = new EcRemoteLinkedData();
                    rld.copyFrom(compacted);
                    rld.context = me.context;
                    delete rld["@context"];
                    if (me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[rld.id] !== true) {
                        rld = EcEncryptedValue.toEncryptedValue(rld);
                    }
                    rld["schema:dateModified"] = new Date().toISOString();
                    repo.saveTo(rld, function() {
                        me.doneSaving = true;
                        me.saving = false;
                        me.saved = "last saved " + new Date(rld["schema:dateModified"]).toLocaleString();
                        me.$store.commit('editor/changedObject', rld.shortId());
                        if (me.doneValidating) {
                            if (me.addAnother) {
                                me.$store.commit('editor/addAnother', true);
                                me.addAnother = false;
                            }
                            me.$emit('done-editing-node-event');
                        }
                        if (rld.type === "Framework") {
                            me.$store.commit('editor/framework', EcFramework.getBlocking(rld.shortId()));
                            me.spitEvent('viewChanged');
                        } else if (rld.type === "ConceptScheme") {
                            me.$store.commit('editor/framework', EcConceptScheme.getBlocking(rld.shortId()));
                            me.spitEvent('viewChanged');
                        }
                    }, function(err) {
                        appError(err);
                        me.errorSaving = true;
                    });
                }
            });
        },
        // Compact operation removes arrays when length is 1, but some fields need to be arrays in the data that's saved
        turnFieldsBackIntoArrays: function(rld) {
            var fields = [
                "owner", "reader", "signature", "competency", "level", "relation", "skos:hasTopConcept", "skos:narrower", "skos:broader", "skos:broadMatch", "skos:closeMatch",
                "skos:exactMatch", "skos:narrowMatch", "skos:related"
            ];
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (rld[field] && !EcArray.isArray(rld[field])) {
                    rld[field] = [rld[field]];
                }
            }
            return rld;
        },
        // Supports save() by removing reactify arrays.
        stripEmptyArrays(o) {
            // TODO: Investigate use of Vue.$set instead of reactification method.
            if (EcArray.isArray(o)) {
                if (o.length === 0) {
                    return null;
                }
                for (var i = 0; i < o.length; i++) {
                    o[i] = this.stripEmptyArrays(o[i]);
                    if (o[i] == null) {
                        o.splice(i--, 1);
                    }
                }
            } else if (EcObject.isObject(o)) {
                for (var key in o) {
                    var value = this.stripEmptyArrays(o[key]);
                    if (value == null) {
                        delete o[key];
                    }
                }
            }
            return o;
        },
        // Gets all the fully qualfied type names (qualified by the @context) of all the objects in this Thing.
        getAllTypes: function(o, context) {
            // TODO: Use canonical type identifiers from expandedThing, so that we don't rely on @context.
            var types = [];
            if (o != null && o.context != null) {
                context = o.context;
            }
            if (EcArray.isArray(o)) {
                for (var i = 0; i < o.length; i++) {
                    types = types.concat(this.getAllTypes(o[i], context));
                }
            } else if (EcObject.isObject(o)) {
                if (o.type != null) {
                    if (o.context == null) o.context = context;
                    types.push(o.context + (o.context.endsWith("/") ? "" : "/") + o.type);
                }
                if (o["@type"] != null) {
                    if (o["@context"] == null) o["@context"] = context;
                    // Avoid problem with CASE imports that have nested objected. Probably a better way to do this.
                    if (o["@type"].indexOf("schema:") === -1) {
                        types.push(o["@context"] + (o["@context"].endsWith("/") ? "" : "/") + o["@type"]);
                    }
                }
                for (var key in o) {
                    types = types.concat(this.getAllTypes(o[key], context));
                }
            }
            return types;
        },
        deleteObject: function(thing) {
            if (thing) {
                // Handles delete message passed through Property
                this.$emit('delete-object', thing);
            } else {
                // If not passed through, delete current thing.
                this.$emit('delete-object', this.originalThing);
            }
        },
        removeObject: function() {
            this.$emit('remove-object', this.originalThing);
        },
        resolveNameFromUrl: function(url) {
            var me = this;
            this.get(url, null, null, function(data) {
                var name = null;
                if (data) {
                    if (data[0] === "<") {
                        return;
                    }
                    data = JSON.parse(data);
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
                    name = Thing.getDisplayStringFrom(name);
                    // If still object, display value
                    if (EcObject.isObject(name)) {
                        var langs = Object.keys(name);
                        name = name[langs[0]];
                    }
                }
                me.name = name;
            }, function(error) {
                appLog(error);
            });
        },
        get: function(server, service, headers, success, failure) {
            var url = EcRemote.urlAppend(server, service);
            url = EcRemote.upgradeHttpToHttps(url);
            var xhr = null;
            if ((typeof httpStatus) === "undefined") {
                xhr = new XMLHttpRequest();
                xhr.open("GET", url, EcRemote.async);
                if (headers != null) {
                    var keys = EcObject.keys(headers);
                    for (var i = 0; i < keys.length; i++) {
                        xhr.setRequestHeader(keys[i], headers[keys[i]]);
                    }
                }
                var xhrx = xhr;
                xhr.onreadystatechange = function() {
                    if (xhrx.readyState === 4 && xhrx.status === 200) {
                        if (success != null) {
                            success(xhrx.responseText);
                        } else if (xhrx.readyState === 4) {
                            if (failure != null) {
                                failure(xhrx.responseText);
                            }
                        }
                    }
                };
            }
            if (xhr != null) {
                if (EcRemote.async) {
                    (xhr)["timeout"] = EcRemote.timeout;
                }
            }
            if ((typeof httpStatus) !== "undefined") {
                if (success != null) {
                    success(JSON.stringify(httpGet(url)));
                }
            } else {
                xhr.send();
            }
        },
        allowPropertyEdits: function(key) {
            if (key === "@id" || key === "ctid" || key === "registryURL") {
                return false;
            }
            if (this.profile && this.profile[key] && this.profile[key]["readOnly"] === true) {
                return false;
            }
            return this.canEdit;
        },
        moveUp: function() {
            this.$emit('move-up', this.originalThing.shortId(), this.index);
        },
        moveDown: function() {
            this.$emit('move-down', this.originalThing.shortId(), this.index);
        },
        moveRight: function() {
            this.$emit('move-right', this.originalThing.shortId(), this.index);
        },
        moveLeft: function() {
            this.$emit('move-left', this.originalThing.shortId(), this.index);
        },
        displayHeading: function(heading) {
            if (this.showAlways === true && this.showPossible === false) {
                if (this.alwaysProperties[heading] && EcObject.keys(this.alwaysProperties[heading]).length > 0) {
                    return heading;
                }
            } else if (this.showAlways === false && this.showPossible == null) {
                if (this.viewProperties[heading] && EcObject.keys(this.viewProperties[heading]).length > 0) {
                    return heading;
                }
            } else if (this.showPossible === true && EcObject.keys(this.possibleProperties[heading]).length > 0) {
                return heading;
            }
            return null;
        },
        select: function(key, checked) {
            this.$emit('select', key, checked);
        },
        getPropertiesFromProfile: function(result, type) {
            for (var i = 0; i < this.profile[type].length; i++) {
                var prop = this.profile[type][i];
                var heading = "";
                if (this.profile[prop]["heading"]) {
                    heading = this.profile[prop]["heading"];
                }
                if (result[heading] == null && result[heading] === undefined) {
                    result[heading] = {};
                }
                if (this.profile[prop]["valuesIndexed"]) {
                    var f = this.profile[prop]["valuesIndexed"];
                    f = f();
                    if (f && f[this.obj.shortId()]) {
                        result[heading][prop] = this.profile[prop];
                    }
                } else if (this.expandedThing && this.expandedThing[prop] != null && this.expandedThing[prop].length !== 0) {
                    result[heading][prop] = this.profile[prop];
                }
            }
            return result;
        },
        closeWithoutSaving: function() {
            if (this.newFramework) {
                return this.clickToDelete();
            }
            this.$emit('done-editing-node-event');
        },
        doneEditing: function() {
            this.disableDoneEditingButton = true;
            if (this.showAddPropertyContent === true) {
                return this.onCancelAddProperty();
            }
            // Tell child components to validate. Only emit done-editing-node-event when done.
            this.doneValidating = false;
            this.validate = true;
            this.errorValidating = null;
            // If object needs to be saved, this will be set to false in saveThing
            this.doneSaving = true;
            if (this.addAnother && this.doneValidating) {
                this.$store.commit('editor/addAnother', true);
                this.addAnother = false;
            }
        },
        saveAndAddAnother: function() {
            this.addAnother = true;
            this.doneEditing();
        },
        validated: function() {
            this.validateCount++;
            if (this.validateCount === this.$store.state.lode.numPropertyComponentsVisible[EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"])]) {
                this.doneValidating = true;
                this.validateCount = 0;
                if (this.doneSaving) {
                    if (this.addAnother) {
                        this.$store.commit('editor/addAnother', true);
                        this.addAnother = false;
                    }
                    this.$emit('done-editing-node-event');
                }
            }
        },
        populateRequiredFields: function() {
            for (var i in this.profile) {
                if (EcArray.has(this.skipConfigProperties, this.profile[i])) {
                    continue;
                }
                if (this.profile[i].valuesIndexed) {
                    continue;
                }
                if ((this.profile[i]["isRequired"] === "true" || this.profile[i]["isRequired"] === true) && this.expandedThing[i].length < 1) {
                    var range = this.profile[i]["http://schema.org/rangeIncludes"][0]["@id"];
                    if (range.toLowerCase().indexOf("langstring") !== -1) {
                        this.add(i, {"@language": this.$store.getters['editor/defaultLanguage'], "@value": ""});
                    } else {
                        this.add(i, {"@value": ""});
                    }
                }
            }
        },
        addSelected: function() {
            var ids = this.$store.getters['editor/selectedCompetenciesAsProperties'];
            var relationType = this.$store.state.editor.selectCompetencyRelation;
            if (this.$store.state.lode.searchType === "Concept" || relationType === "https://purl.org/ctdlasn/terms/knowledgeEmbodied" ||
            relationType === "https://purl.org/ctdlasn/terms/abilityEmbodied" || relationType === "https://purl.org/ctdlasn/terms/taskEmbodied" ||
            relationType === "https://purl.org/ctdlasn/terms/skillEmbodied") {
                this.attachUrlProperties(ids);
            } else if (this.$store.state.lode.searchType === "Competency") {
                this.addAlignments(ids, this.$store.state.editor.selectedCompetency, relationType);
            } else {
                for (var i = 0; i < ids.length; i++) {
                    this.addLevel(this.$store.getters['editor/selectedCompetency'].shortId(), [ids[i]]);
                }
            }
            this.isSearching = false;
            this.showAddPropertyContent = false;
        },
        attachUrlProperties: function(results) {
            var resource = this.$store.state.editor.framework;
            if (this.$store.state.editor.selectedCompetency != null) {
                resource = this.$store.state.editor.selectedCompetency;
            }
            for (var i = 0; i < results.length; i++) {
                var thing = EcRepository.getBlocking(results[i]);
                if (thing.isAny(new EcConcept().getTypes()) || thing.isAny(new EcCompetency().getTypes())) {
                    var relation = this.$store.state.editor.selectCompetencyRelation;
                    // Check if expanded version of property
                    if (relation.indexOf("http") !== -1) {
                        this.$store.commit('lode/setAddingProperty', relation);
                        this.$store.commit('lode/setAddingValue', {"@value": results[i]});
                        this.add();
                        this.saveThing();
                    } else {
                        if (!EcArray.isArray(resource[this.$store.state.editor.selectCompetencyRelation])) {
                            resource[this.$store.state.editor.selectCompetencyRelation] = [];
                        }
                        EcArray.setAdd(resource[this.$store.state.editor.selectCompetencyRelation], thing.shortId());
                    }
                }
            }
            resource["schema:dateModified"] = new Date().toISOString();
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[resource.id] !== true) {
                resource = EcEncryptedValue.toEncryptedValue(resource);
            }
            this.repo.saveTo(resource, function() {}, appError);
        },
        clickToDelete: function() {
            if (this.$store.getters['app/editDirectory']) {
                this.$store.commit('app/editDirectory', false);
                this.$store.commit('app/showModal', {component: 'DeleteDirectoryConfirm'});
            } else {
                this.$store.commit('editor/setItemToDelete', this.obj ? this.obj : this.originalThing);
                this.showModal('deleteObject');
            }
        }
    },
    watch: {
        addingProperty: function(value) {
            if (value) {
                this.errorMessage = [];
            }
        },
        isSavingThing: function(value) {
            if (value) {
                return this.saveThing();
            }
        },
        canEdit: function() {
            this.showAlways = true;
            this.showPossible = false;
        },
        changedObject: function() {
            if (!this.originalThing) { return; }
            if (this.shortType && this.changedObject === this.originalThing.shortId()) {
                var type = "Ec" + this.shortType;
                if (type) {
                    var thing = window[type].getBlocking(this.changedObject);
                    this.obj = thing;
                    if (this.clickToLoad === false) { this.load(); }
                }
                this.$store.commit('editor/changedObject', null);
            }
        },
        isAddingProperty: function() {
            if (this.isAddingProperty === false) {
                this.showAddPropertyContent = false;
            }
        },
        originalThing: function() {
            if (this.originalThing) {
                if (this.shortType === "Competency" || this.shortType === "Concept" || this.shortType === "Level") {
                    this.$store.commit('editor/selectedCompetency', this.originalThing);
                }
            }
        },
        isSearching: function() {
            if (this.isSearching) {
                let types = ["narrows", "broadens", "hasChild", "isChildOf"];
                if (EcArray.has(types, this.addingProperty)) {
                    let relations = this.$store.getters['editor/relations'];
                    for (let j = 0; j < types.length; j++) {
                        if (relations[types[j]] && relations[types[j]][this.obj.shortId()]) {
                            let ids = relations[types[j]][this.obj.shortId()];
                            if (ids) {
                                for (let i = 0; i < ids.length; i++) {
                                    this.idsNotPermittedInSearch.push(ids[i]["@id"]);
                                }
                            }
                        }
                    }
                }
            } else {
                this.idsNotPermittedInSearch = [];
            }
        },
        profile: function() {
            this.populateRequiredFields();
        },
        validate: function() {
            if (!this.validate) {
                this.disableDoneEditingButton = false;
                this.validateCount = 0;
            }
        }
    }
};
</script>


<style lang="scss">
    @import '@/scss/variables.scss';
</style>