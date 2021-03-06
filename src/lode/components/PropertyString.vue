<template>
    <div class="property-string">
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
        <!-- language modifier -->
        <div
            class="field is-grouped"
            v-if="showLanguage">
            <p
                v-if="showLanguage"
                class="control is-expanded">
                <!-- to do match to property name -->
                <textarea
                    ref="textarea"
                    class="textarea is-expanded "
                    rows="1"
                    v-model="computedText"
                    @blur="blur" />
            </p>
            <div
                class="control is-narrow auto-complete__control">
                <input
                    v-if="showLanguage"
                    ref="language"
                    class="input is-narrow"
                    v-model="search"
                    @input="onSearchChange"
                    @blur="blur">
                <span class="auto-complete">
                    <ul v-show="isOpen">
                        <li
                            v-for="(result, i) in filtered"
                            :key="i"
                            @mousedown="setLanguage(result)">
                            {{ result.display }}
                        </li>
                    </ul>
                </span>
            </div>
            <div
                class="control is-narrow">
                <div
                    @click="showModal('remove')"
                    v-if="!addSingle"
                    class="button is-text has-text-danger">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span>
                </div>
            </div>
        </div>
        <!-- in language field autocomplete -->
        <div
            class="field is-grouped"
            v-if="inLanguageField">
            <div
                class="control is-expanded auto-complete__control">
                <label
                    class="label">Value</label>
                <textarea
                    ref="language"
                    class="textarea is-expanded "
                    rows="1"
                    v-model="search"
                    @input="onSearchChange"
                    @blur="blur" />
                <span class="auto-complete">
                    <ul v-show="isOpen">
                        <li
                            v-for="(result, i) in filtered"
                            :key="i"
                            @mousedown="setInLanguage(result)">
                            {{ result.display }}
                        </li>
                    </ul>
                </span>
            </div>
            <div
                class="control is-narrow">
                <label class="label is-transparent">delete</label>
                <div
                    @click="showModal('remove')"
                    v-if="!addSingle"
                    class="button is-text has-text-danger">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span>
                </div>
            </div>
        </div>
        <!-- resource -->
        <div
            class="field"
            v-if="isResource">
            <div class="property">
                {{ computedResourceId }}
            </div>
        </div>
        <div
            class="field"
            v-if="isResource">
            <div
                class="control">
                <label class="label">Resource Name</label>
                <textarea
                    class="textarea is-expanded "
                    rows="1"
                    v-model="computedResourceName"
                    @blur="blur" />
            </div>
        </div>
        <!-- timestamp -->
        <label
            class="label"
            v-if="range[0] === 'http://www.w3.org/2001/XMLSchema#dateTime'">date/time</label>
        <input
            v-if="range[0] === 'http://www.w3.org/2001/XMLSchema#dateTime'"
            class="input is-small is-fullwidth date-time"
            v-model="computedText"
            type="datetime-local"
            @blur="blur">
        <label
            class="label"
            v-if="options">options</label>
        <span
            class="select is-small"
            v-if="options">
            <select
                v-model="computedText"
                @blur="blur">
                <option
                    v-for="item in options"
                    :key="item"
                    :value="item.val">
                    {{ item.display }}
                </option>
            </select>
        </span>
        <div
            class="field is-grouped"
            v-if="!showLanguage && !inLanguageField">
            <div class="control is-expanded">
                <label
                    v-if="isResource"
                    class="label">url</label>
                <textarea
                    v-if="!showLanguage"
                    ref="textarea"
                    class="textarea is-expanded "
                    rows="1"
                    v-model="computedText"
                    @blur="blur" />
            </div>
            <div
                class="control is-narrow delete-property-button"
                v-if="!addSingle && view !== 'single'">
                <!--<label><br></label>-->
                <div
                    @click="showModal('remove')"
                    class="button is-small is-text has-text-danger is-pulled-right">
                    <i class="fa fa-times" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModalTemplate from '@/components/modalContent/ModalTemplate.vue';
const languagesFile = require('../ietf-language-tags_json.json');
export default {
    name: 'PropertyString',
    props: {
        expandedThing: Object,
        expandedProperty: String,
        expandedValue: Array,
        schema: Object,
        index: null,
        langString: null,
        range: null,
        options: null,
        newProperty: Boolean,
        profile: Object,
        // True if adding a single property
        addSingle: Boolean,
        valueFromSearching: null,
        view: {
            type: String,
            default: ''
        }
    },
    components: {
        ModalTemplate
    },
    created: function() {
    },
    data: function() {
        var property;
        if (this.newProperty === true) {
            property = "";
        } else {
            property = this.expandedThing[this.expandedProperty];
        }
        if (EcArray.isArray(property)) {
            return {
                text: this.expandedThing[this.expandedProperty][this.index],
                indexInternal: this.index,
                isOpen: false,
                search: "",
                languages: [],
                filtered: [],
                isResource: false,
                removePropertyConfirmModal: false
            };
        } else {
            return {
                text: property,
                indexInternal: null,
                isOpen: false,
                search: "",
                languages: [],
                filtered: [],
                isResource: false,
                removePropertyConfirmModal: false
            };
        }
    },
    mounted: function() {
        this.search = this.computedLanguage;
        if (this.computedLanguage || this.langString || this.inLanguageField) {
            for (var i = 0; i < languagesFile.length; i++) {
                var tag = {};
                tag.tag = languagesFile[i].subtag;
                tag.display = languagesFile[i].description;
                this.languages.push(tag);
            }
            if (this.inLanguageField && !this.newProperty) {
                this.search = this.computedText;
            }
            if (this.newProperty === true) {
                this.text = {};
                if (this.$store.state.editor) {
                    if (this.inLanguageField) {
                        this.computedText = this.$store.state.editor.defaultLanguage;
                        this.search = this.computedText;
                    } else {
                        this.computedLanguage = this.$store.state.editor.defaultLanguage;
                        this.search = this.computedLanguage;
                    }
                }
            }
        } else if (this.newProperty === true && this.range[0] === "http://schema.org/Text" && !this.options) {
            this.text = {};
        }
        if (this.valueFromSearching) {
            this.text = this.valueFromSearching;
        }
        if (this.profile && this.profile[this.expandedProperty] && this.profile[this.expandedProperty]["resource"]) {
            this.isResource = true;
            if (this.expandedValue) {
                this.text = this.expandedValue[this.index];
            } else {
                this.text = {};
            }
        }
    },
    computed: {
        showLanguage: function() {
            if (this.computedLanguage || this.langString) {
                return true;
            } else {
                return false;
            }
        },
        inLanguageField: function() {
            if (this.expandedProperty && this.expandedProperty.toLowerCase().indexOf("language") !== -1 && this.range && this.range[0] && this.range[0].toLowerCase().indexOf("text") !== -1) {
                return true;
            } else {
                return false;
            }
        },
        computedText: {
            get: function() {
                if (EcObject.isObject(this.text)) {
                    if (this.text["@value"] === undefined) {
                        return null;
                    }
                    if (this.range[0] === 'http://www.w3.org/2001/XMLSchema#dateTime' && this.text["@value"].length > 16) {
                        return this.text["@value"].substr(0, 16);
                    }
                    return this.text["@value"];
                }
                return this.text;
            },
            set: function(value) {
                if (EcObject.isObject(this.text)) {
                    this.text["@value"] = value.trim();
                } else {
                    this.text = value.trim();
                }
            }
        },
        computedLanguage: {
            get: function() {
                if (EcObject.isObject(this.text)) {
                    if (this.text["@language"] === undefined) {
                        return null;
                    }
                    return this.text["@language"];
                }
                return null;
            },
            set: function(value) {
                if (EcObject.isObject(this.text)) {
                    this.text["@language"] = value;
                }
            }
        },
        computedResourceName: {
            get: function() {
                if (EcObject.isObject(this.text)) {
                    if (this.text["name"] === undefined) {
                        return null;
                    }
                    return this.text["name"];
                }
                return null;
            },
            set: function(value) {
                if (EcObject.isObject(this.text)) {
                    this.text["name"] = value;
                }
            }
        },
        computedResourceId: function() {
            if (this.isResource && EcObject.isObject(this.text) && this.text["@id"]) {
                return this.text["@id"];
            }
            return null;
        }
    },
    watch: {
        text: function(newValue, oldValue) {
        },
        expandedValue: function() {
            // Make sure language is set if property is set by template with no language.
            if (this.text["@language"] && !this.expandedValue[this.index]["@language"]) {
                this.blur();
            }
        }
    },
    methods: {
        blur: function() {
            this.$parent.updatePropertyString(this.text, this.indexInternal);
            this.isOpen = false;
        },
        onSearchChange: function() {
            if (this.search.length >= 2) {
                this.isOpen = true;
                this.filterResults();
            }
        },
        filterResults: function() {
            this.filtered = this.languages.filter(item => item.display.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
        },
        setLanguage: function(language) {
            this.computedLanguage = language.tag;
            this.search = language.display;
            this.isOpen = false;
            this.blur();
        },
        setInLanguage: function(language) {
            this.computedText = language.tag;
            this.search = language.display;
            this.isOpen = false;
            this.blur();
        },
        showModal(val) {
            let expandedValue;
            let me = this;
            if (this.expandedThing) {
                expandedValue = this.expandedThing[this.expandedProperty];
            }
            if (val === 'remove') {
                if (expandedValue && this.profile && this.profile[this.expandedProperty] && (this.profile[this.expandedProperty]["isRequired"] === 'true' || this.profile[this.expandedProperty]["isRequired"] === true)) {
                    if (expandedValue.length === 1 || (expandedValue["@value"] && expandedValue["@value"].trim().length === 1)) {
                        this.$store.commit('app/showModal', {component: 'RequiredPropertyModal'});
                        return;
                    }
                }
                if (!this.newProperty) {
                    this.removePropertyConfirmModal = true;
                } else {
                    return me.$emit('remove');
                }
            }
            if (val === 'required') {
                this.$store.commit('app/showModal', {component: 'RequiredPropertyModal'});
            }
        },
        clickConfirmRemove: function() {
            this.$emit('remove');
            this.removePropertyConfirmModal = false;
        },
        closeModal: function() {
            this.removePropertyConfirmModal = false;
        }
    }
};
</script>

<style>
.label.is-transparent {
    color: transparent;
}
</style>