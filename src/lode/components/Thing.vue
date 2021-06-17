<template>
    <div
        class="lode__thing"
        :class="[
            editingClass,
            {'highlighted': highlighted},
            {'show-all': filter === 'showAll'},
            {'show-aligned': filter === 'showAligned'},
            {'show-unaligned': filter === 'showUnaligned'}]">
        <slot name="thingIcon" />
        <div :class="shortType !== 'Framework' && shortType !== 'Concept' ? 'container' : 'container is-fluid is-paddingless is-marginless'">
            <!--
                click to load handles relationships, resources, and levels
                TO DO should be translated to a MODAL -->
            <span
                v-if="clickToLoad"
                :title="name ? name : uri "
                class="click-to-load">
                <span
                    class="tag is-size-7 is-light"
                    :class="[{ 'is-link' : competencyAsPropertyIsExternal }, {'is-primary': !competencyAsPropertyIsExternal}]">{{ competencyAsPropertyType }}</span>
                <span
                    class="thing-as-property__text"
                    :class="competencyAsPropertyClass">
                    {{ name ? name : uri }}
                </span>
                <div
                    @click="goToCompetencyWithinThisFramework()"
                    v-if="!competencyAsPropertyIsExternal && thingAsPropertyModalObject.type !== 'Level'"
                    class="button  is-small is-outlined is-primary">
                    <span class="has-text-weight-bold">scroll to</span>
                    <span
                        class="icon is-small">
                        <i class="fa fa-external-link-alt" />
                    </span>
                </div>
                <button
                    @click="clickShowDetails"
                    class="button  is-small is-outlined is-link"
                    v-if="thingAsPropertyModalObject.objectType === 'Competency' || thingAsPropertyModalObject.objectType === 'Concept' || thingAsPropertyModalObject.objectType === 'Level'">
                    <span class="has-text-weight-bold">details</span>
                    <span
                        class="icon is-small">
                        <i class="fa fa-info" />
                    </span>
                </button>
            </span>
            <span
                class="thing-as-property__text"
                :class="competencyAsPropertyClass"
                v-else-if="uriAndNameOnly"
                :title="name ? name : uri">
                {{ name ? name : uri }}
            </span>
            <div
                v-else-if="expandedThing"
                :class="['lode__' + shortType, hoverClass, {'highlighted': highlighted}]">
                <!-- buttons that show on hover -->
                <!-- only show these on framework and concept scheme objects
                    otherwise displayed in hierarchy node alongside drag icon -->
                <div
                    class="hierarchy-item__buttons"
                    v-if="shortType === 'ConceptScheme' || shortType === 'Framework' && view !== 'crosswalk'">
                    <div
                        v-if="view !== 'crosswalk' && canEdit"
                        class="edit-button button is-small is-text has-text-primary"
                        @click="editNode()">
                        <div class="icon is-small">
                            <i class="fa fa-edit is-size-5" />
                        </div>
                    </div>
                    <div
                        v-if="showAddComments && view === 'framework'"
                        class="comment-button">
                        <div
                            class="button is-text has-text-primary is-small"
                            @click="handleClickAddComment">
                            <div class="icon is-small">
                                <i class="fa fa-comment-medical is-size-5" />
                            </div>
                        </div>
                    </div>
                </div>
                <a
                    v-if="expandedThing['@id']"
                    class="lode__type">
                    <span
                        :title="type"
                        v-if="shortType">
                        {{ shortType }}
                    </span>
                </a>
                <span
                    v-else-if="shortType"
                    class="lode__type"
                    :title="type">{{ shortType }}</span>
                <slot />
                <div
                    class="headings-group"
                    :class="{'highlighted': highlighted}">
                    <div
                        v-for="heading in headings"
                        :key="heading"
                        class="lode__thing-heading">
                        <!-- this is the primary / required properties -->
                        <template
                            v-if="showAlwaysProperties && alwaysProperties[heading]">
                            <Property
                                v-for="(value,key) in alwaysProperties[heading]"
                                :key="key"
                                :expandedThing="expandedThing"
                                :expandedProperty="key"
                                :schema="value"
                                @editing-property-event="handleEditingEvent($event)"
                                :editingThing="editingThing"
                                :canEdit="false"
                                :profile="profile"
                                @select="select" />
                            <slot name="frameworkTags" />
                        </template>
                        <template
                            v-else-if="showPossibleProperties && possibleProperties[heading]">
                            <!-- this is the secondary / contains properties -->
                            <Property
                                v-for="(value,key) in possibleProperties[heading]"
                                :key="key"
                                :expandedThing="expandedThing"
                                :expandedProperty="key"
                                :schema="value"
                                @editing-property-event="handleEditingEvent($event)"
                                :editingThing="editingThing"
                                :canEdit="allowPropertyEdits(key)"
                                :profile="profile"
                                @select="select" />
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
                                :editingThing="editingThing"
                                :canEdit="allowPropertyEdits(key)"
                                :profile="profile"
                                @select="select" />
                        </template>
                    </div>
                </div>
                <!-- informational sots here -->
                <slot name="frameworkDetails" />
            </div>
        </div>
    </div>
</template>
<script>

export default {
    // Thing represents a JSON-LD object. Does not have to be based on http://schema.org/Thing.
    name: 'Thing',
    props: {
        expandInModal: {
            type: Boolean,
            default: false
        },
        competencyAsPropertyType: {
            type: String,
            default: ''
        },
        // Level vs Competency
        competencyAsPropertyObjectType: {
            type: String,
            default: ''
        },
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
        cantMoveUp: Boolean,
        cantMoveDown: Boolean,
        cantMoveRight: Boolean,
        cantMoveLeft: Boolean,
        properties: String,
        editingNode: Boolean,
        containerType: String,
        view: {
            type: String,
            default: 'framework'
        },
        subview: {
            type: String,
            default: ''
        },
        filter: {
            type: String,
            default: 'showAll'
        }
    },
    components: {
        Property: () => import('./Property.vue')
    },
    data: function() {
        return {
            editingThing: false,
            editingClass: '',
            hoverClass: '',
            // After initialization and expansion, this will hold the fully expanded thing we're displaying/CRUDing.
            expandedThing: null,
            originalThing: null,
            // True if we are in the compacted (alwaysProperties) property display mode. In the middle of this and showPossible is all properties that we can view.
            showAlways: true,
            // True if we are in the fully expanded (possibleProperties) property display mode. Only relevant if we can edit the object.
            showPossible: false,
            uriAndNameOnly: false,
            name: null,
            skipConfigProperties: ["alwaysProperties", "headings", "primaryProperties", "secondaryProperties", "tertiaryProperties", "relationshipsHeading", "relationshipsPriority"]
        };
    },
    created: function() {
        if (this.clickToLoad === false) { this.load(); }
    },
    mounted: function() {
        if (this.expandInModal) {
            this.load();
        }
        if (this.uri && this.$store.state.editor) {
            this.resolveNameFromUrl(this.uri);
        }
        if (this.properties === "secondary") {
            this.showAlways = false;
            this.showPossible = null;
        } else if (this.properties === "tertiary") {
            this.showAlways = false;
            this.showPossible = true;
        }
    },
    computed: {
        thingAsPropertyModalObject: function() {
            appLog("this parent", this.$parent.$parent.obj.name);
            appLog("Expanded thing: ", this.expandedThing);
            var name = this.$parent.$parent.obj.name;
            if (!name) {
                name = this.$parent.$parent.obj["skos:prefLabel"];
            }
            let object = {
                component: 'Single',
                uri: this.uri,
                type: this.competencyAsPropertyType,
                objectType: this.competencyAsPropertyObjectType,
                parentName: name,
                canEdit: this.canEdit
            };
            return object;
        },
        framework: function() {
            return this.$store.getters['editor/framework'];
        },
        thingAsPropertyIcon: function() {
            let type;
            if (this.competencyAsPropertyObjectType === "Level") {
                type = 'level';
            } else if (this.competencyAsPropertyType !== '') {
                type = this.competencyAsPropertyType;
            } else {
                type = this.shortType;
            }
            let icon;
            if (type === 'narrows') {
                icon = 'fa fa-less-than';
            } else if (type === 'is enabled by') {
                icon = 'fa fa-toggle-on';
            } else if (type === 'broadens') {
                icon = 'fa fa-less-than';
            } else if (type === 'is equivalent to') {
                icon = 'fa fa-equals';
            } else if (type === 'desires') {
                icon = 'fa fa-crosshairs';
            } else if (type === 'requires') {
                icon = 'fa fa-asterisk';
            } else if (type === 'Level' || type === 'level' || this.objectType === "Level" || this.objectType === 'level') {
                icon = 'fa fa-layer-group';
            } else if (type === 'is related to') {
                icon = 'fa fa-sync';
            } else if (type === 'similar to') {
                icon = 'fa fa-tilde';
            } else {
                icon = "fa fa-link";
            }
            return icon;
        },
        showAddComments() {
            if (this.$store.getters['editor/queryParams'].concepts === "true") {
                return false;
            }
            return this.$store.state.app.canAddComments;
        },
        competencyAsPropertyClass: function() {
            if (this.competencyAsPropertyIsExternal) {
                return 'competency-as-property';
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
            if (this.showAlways === false && this.showPossible === null && this.expandedThing !== null &&
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
        /*
            Check to see if the current thing as property is in the framework object
            This included relations, levels, and maybe schemas later?
        */
        competencyAsPropertyIsExternal: function() {
            let external = true;
            if (this.framework) {
                if (this.objectType === 'Level' && this.framework.level) {
                    for (let i = 0; i < this.framework.level.length; i++) {
                        if (this.framework.level[i] === this.uri) {
                            external = false;
                            return external;
                        }
                    }
                } else if (this.framework.competency) {
                    for (let i = 0; i < this.framework.competency.length; i++) {
                        if (this.framework.competency[i] === this.uri) {
                            external = false;
                            return external;
                        }
                    }
                }
            }
            return external;
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
            var ary = this.type.split("/");
            ary.pop();
            return ary.join("/");
        },
        // True if the current client can edit this object.
        canEdit: function() {
            if (this.parentNotEditable === true) {
                return false;
            }
            if (this.originalThing && this.originalThing.canEditAny) {
                return this.originalThing.canEditAny(EcIdentityManager.default.getMyPks());
            }
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
                        if (this.expandedThing[prop] != null && this.expandedThing[prop].length === 0) {
                            if (prop === "http://schema.org/name" || prop === "http://purl.org/dc/terms/title" || prop === "http://www.w3.org/2004/02/skos/core#prefLabel") {
                                this.setUnknownName(prop);
                            }
                        }
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
        }
    },
    methods: {
        clickShowDetails() {
            this.$store.commit('app/showModal', this.thingAsPropertyModalObject);
        },
        goToCompetencyWithinThisFramework: function() {
            // Scroll to competency
            this.$scrollTo("#scroll-" + this.uri.split('/').pop());
        },
        handleClickAddComment: function() {
            this.$store.commit('editor/setAddCommentAboutId', EcRemoteLinkedData.trimVersionFromUrl(this.expandedThing["@id"]));
            this.$store.commit('editor/setAddCommentType', 'new');
            this.$store.commit('app/showModal', {component: 'AddComment'});
        },
        editNode: function() {
            this.$emit('edit-node-event', true);
        },
        handleEditingEvent: function(e) {
            if (e) {
                /*
                     * hide all edit options
                     * could probably make uneditable entirely
                     * but this helps remove the options
                     * should only be able to edit one thing at a time
                     * without an intended use case for editing multiple things
                     * at a time
                     */
                this.editingClass = 'editing-competency';
                this.editingThing = true;
                this.$emit('editing-thing', true);
            } else {
                this.editingClass = '';
                this.editingThing = false;
                this.$emit('editing-thing', false);
            }
        },
        /*
             * Show just the properties that
             * have values for this competency
             */
        showEnteredProperties: function() {
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
            this.$emit('expand-event');
        },
        load: function() {
            var me = this;
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
                    }, this.expandedObj["@type"][0]);
                } else if (this.obj) {
                    me.originalThing = this.obj;
                    var allTypes = me.getAllTypes(this.obj);
                    if (this.obj.context != null && this.obj.context !== undefined) {
                        allTypes.push(this.obj.context);
                    }
                    new EcAsyncHelper().each(allTypes, function(type, callback) {
                        // delay enough for the schema to load from App so not every Thing component has to do this
                        setTimeout(() => {
                            me.loadSchema(callback, type);
                        }, 1000);
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
        add: function(property, value) {
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
            if (!EcArray.isArray(this.expandedThing[property])) {
                this.expandedThing[property] = [this.expandedThing[property]];
            }
            this.expandedThing[property].splice(index, 1);
            this.save();
        },
        // Changes a piece of data. Invoked by child components, in order to change a piece of data to something else (for reactivity reasons).
        update: function(property, index, value) {
            if (index == null) {
                this.expandedThing[property] = value;
            } else {
                this.expandedThing[property][index] = value;
            }
        },
        // Saves this thing to the location specified by its @id.
        save: function() {
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
            jsonld.compact(this.stripEmptyArrays(this.expandedThing), this.$store.state.lode.rawSchemata[this.context], async function(err, compacted) {
                if (err != null) {
                    appError(err);
                }
                if (compacted) {
                    var rld = new EcRemoteLinkedData();
                    rld.copyFrom(compacted);
                    rld.context = me.context;
                    if (rld.signature && !EcArray.isArray(rld.signature)) {
                        rld.signature = [rld.signature];
                    }
                    delete rld["@context"];
                    if (rld.owner && !EcArray.isArray(rld.owner)) {
                        rld.owner = [rld.owner];
                    }
                    if (me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[rld.id] !== true) {
                        rld = await EcEncryptedValue.toEncryptedValue(rld);
                    }
                    repo.saveTo(rld, appLog, appError);
                }
            });
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
        removeObject: function() {
            this.$emit('remove-object', this.originalThing);
        },
        resolveNameFromUrl: function(url) {
            var me = this;
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
                me.name = name;
            }, function(failure) {
                // If not in repo, do an XML HTTP Request
                me.get(url, null, null, function(data) {
                    var name = null;
                    if (data && data[0] !== "<") {
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
                        name = schema.Thing.getDisplayStringFrom(name);
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
            });
        },
        get: function(server, service, headers, success, failure) {
            var url = EcRemote.urlAppend(server, service);
            url = EcRemote.upgradeHttpToHttps(url);
            var xhr = null;
            if ((typeof httpStatus) === "undefined") {
                xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
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
                (xhr)["timeout"] = EcRemote.timeout;
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
                if (this.$store.getters['editor/conceptMode'] && (prop === "http://www.w3.org/2004/02/skos/core#broader" || prop === "http://www.w3.org/2004/02/skos/core#narrower")) {
                    continue;
                }
                if (this.profile[prop]["valuesIndexed"]) {
                    if (this.$store.state.editor.queryParams.ceasnDataFields === "true" && (prop === "hasChild" || prop === "isChildOf")) {
                        continue;
                    } else if (this.$store.state.editor.queryParams.ceasnDataFields !== "true" && (prop === "narrows" || prop === "broadens")) {
                        continue;
                    }
                    var f = this.profile[prop]["valuesIndexed"];
                    f = f();
                    if (f && f[this.obj.shortId()]) {
                        result[heading][prop] = this.profile[prop];
                    }
                } else if (this.expandedThing[prop] != null && this.expandedThing[prop].length !== 0) {
                    result[heading][prop] = this.profile[prop];
                }
            }
            return result;
        },
        setUnknownName: function(prop) {
            this.expandedThing[prop] = [{"@value": "Unknown name"}];
        }
    },
    watch: {
        canEdit: function() {
            this.showAlways = true;
            this.showPossible = false;
        },
        changedObject: async function() {
            if (this.changedObject && this.view === "importLight") {
                this.load();
                this.$store.commit('editor/changedObject', null);
            } else if (this.changedObject && (this.changedObject === this.uri || (this.originalThing && this.changedObject === this.originalThing.shortId()))) {
                if (this.uri) {
                    this.resolveNameFromUrl(this.uri);
                }
                var type = "Ec" + (this.obj ? this.obj.type : this.shortType);
                if (type === "EcEncryptedValue") {
                    let encryptedType = "Ec" + this.obj.encryptedType;
                    let encryptedThing = await EcRepository.get(this.changedObject);
                    let v = new EcEncryptedValue();
                    v.copyFrom(encryptedThing);
                    let returnObject = new window[encryptedType]();
                    returnObject.copyFrom(await v.decryptIntoObject());
                    this.obj = returnObject;
                    this.load();
                } else if (type && window[type] && window[type].get) {
                    let thing = await window[type].get(this.changedObject);
                    this.obj = thing;
                    this.load();
                } else if (type && window[type]) {
                    appLog("Can't get type: " + type);
                }
                this.$store.commit('editor/changedObject', null);
            }
        },
        properties: function() {
            if (this.properties === "primary") {
                this.showAlways = true;
                this.showPossible = false;
            } else if (this.properties === "secondary") {
                this.showAlways = false;
                this.showPossible = null;
            } else if (this.properties === "tertiary") {
                this.showAlways = false;
                this.showPossible = true;
            }
        },
        obj: function() {
            if (this.obj && this.obj.shortId() !== this.originalThing.shortId()) {
                this.load();
            }
        }
    }
};
</script>
