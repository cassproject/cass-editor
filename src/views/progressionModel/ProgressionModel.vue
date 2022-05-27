<template>
    <div id="concept">
        <RightAside v-if="showRightAside" />
        <!-- begin framework -->
        <div class="framework-content">
            <FrameworkEditorToolbar
                :properties="properties"
                @change-properties="changeProperties"
                @show-export-modal="onOpenExportModal" />
            <div class="framework-wrapper">
                <draggable
                    v-bind="dragOptions"
                    v-model="frameworkDrag"
                    tag="ul"
                    id="framework_drag"
                    :disabled="canEdit !== true"
                    :group="{ name: 'test' }"
                    handle=".handle">
                    <Component
                        :class="dynamicThingComponent === 'Thing' ? parentObjectClass: ''"
                        :is="dynamicThingComponent"
                        :id="'scroll-' + framework.shortId().split('/').pop()"
                        :obj="framework"
                        :repo="repo"
                        view="concept"
                        :newFramework="newFramework"
                        :parentNotEditable="queryParams.view==='true'"
                        :profile="conceptSchemeProfile"
                        @edit-node-event="onEditNode()"
                        @done-editing-node-event="onDoneEditingNode()"
                        :properties="properties">
                        <div class="lode__framework__info-bar">
                            <span
                                class="tag is-medium-grey has-text-dark"
                                v-if="timestamp"
                                :title="new Date(timestamp)">
                                Last modified {{ lastModified }}
                            </span>
                            <span
                                class="tag is-medium-grey has-text-dark"
                                v-if="framework['schema:dateCreated']"
                                :title="new Date(framework['schema:dateCreated'])">
                                Created {{ $moment(framework['schema:dateCreated']).format("MMM D YYYY") }}
                            </span>
                            <span
                                class="tag is-medium-grey has-text-dark"
                                v-if="framework['Approved']"
                                :title="framework['Approved']">
                                Approved
                            </span>
                            <span
                                class="tag is-medium-grey has-text-dark"
                                v-if="framework['Published']"
                                :title="framework['Published']">
                                Published
                            </span>
                        </div>
                    </Component>
                </draggable>
                <ProgressionHierarchy
                    :container="framework"
                    containerType="ConceptScheme"
                    containerTypeGet="EcConceptScheme"
                    :viewOnly="queryParams.view === 'true'"
                    :repo="repo"
                    view="progression"
                    :highlightList="highlightCompetency"
                    :profile="conceptProfile"
                    @edit-multiple-event="onEditMultiple"
                    @search-things="handleSearch($event)"
                    @select-button-click="onSelectButtonClick"
                    :properties="properties"
                    @selected-array="selectedArrayEvent"
                    :doneDragging="doneDragging" />
            </div>
        </div>
        <div
            v-if="scrolled"
            class="extra-space-for-scroll" />
    </div>
</template>
<script>
import debounce from 'lodash/debounce';
import common from '@/mixins/common.js';
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';

export default {
    name: "ProgressionModel",
    mixins: [common, ctdlasnProfile],
    data: function() {
        return {
            scrolled: false,
            parentObjectClass: 'parent-object',
            showVersionHistory: false,
            showEditMultiple: false,
            showClipboardSuccessModal: false,
            repo: window.repo,
            highlightCompetency: null,
            editingFramework: false,
            properties: "primary",
            config: null,
            selectedArray: [],
            editsToUndo: [],
            dragOptions: {
                scroll: true,
                swapThreshold: 0.75,
                disabled: false,
                emptyInsertThreshold: 36,
                animation: 0,
                ghostClass: 'ghost-drag',
                chosenClass: 'chosen-drag',
                dragClass: 'drag',
                scrollSensitivity: 30,
                scrollSpeed: 5,
                forceFallback: true
            },
            frameworkDrag: [],
            doneDragging: false
        };
    },
    computed: {
        newFramework: function() {
            return this.$store.getters['editor/newFramework'] === this.framework.shortId();
        },
        showRightAside: function() {
            return this.$store.getters['app/showRightAside'];
        },
        dynamicThingComponent: function() {
            if (this.editingFramework || (this.$store.getters['editor/newFramework'] === this.framework.shortId())) {
                return 'ThingEditing';
            } else {
                return 'Thing';
            }
        },
        framework: function() {
            return this.$store.getters['editor/framework'];
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        timestamp: function() {
            if (this.framework.getTimestamp()) {
                return this.framework.getTimestamp();
            } else if (this.framework["schema:dateModified"]) {
                return this.framework["schema:dateModified"];
            } else {
                return null;
            }
        },
        lastModified: function() {
            if (this.framework == null) return "Unknown.";
            if (this.timestamp) {
                return this.$moment(this.timestamp).format("MMM D YYYY");
            } else {
                return null;
            }
        },
        shortId: function() {
            if (this.framework) {
                return this.framework.shortId();
            } else {
                return null;
            }
        },
        loggedIn: function() {
            if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
                return true;
            }
            return false;
        },
        conceptSchemeProfile: function() {
            if (this.queryParams.ceasnDataFields === "true") {
                return this.ctdlAsnConceptSchemeProfile;
            }
            return {
                "http://purl.org/dc/terms/title": {
                    "@id": "http://purl.org/dc/terms/title",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name or title of this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Title"}],
                    "heading": "General",
                    "onePerLanguage": "true",
                    "isRequired": "true"
                },
                "http://purl.org/dc/terms/description": {
                    "@id": "http://purl.org/dc/terms/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A short description of this resource. One definition per language"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}],
                    "heading": "General",
                    "onePerLanguage": "true"
                },
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/ConceptScheme/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the concept scheme. If imported from another source, the URL of the concept scheme from which this one originates."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Canonical URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "http://purl.org/dc/terms/creator": {
                    "@id": "http://purl.org/dc/terms/creator",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/URL"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "An entity primarily responsible for making this resource. For example, https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/. One entity per line."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Creator"}],
                    "heading": "General"
                },
                "http://purl.org/dc/terms/publisher": {
                    "@id": "http://purl.org/dc/terms/publisher",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/URL"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "An agent responsible for making this entity available. For example, https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publisher"}],
                    "max": 1,
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/publisherName": {
                    "@id": "https://purl.org/ctdlasn/terms/publisherName",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/Text"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Name of an agent responsible for making this resource available. One name per line."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publisher Name"}],
                    "max": 1,
                    "heading": "General"
                },
                "http://purl.org/dc/terms/language": {
                    "@id": "http://purl.org/dc/terms/language",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/Text"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "The primary language used in or by this resource. One language per line."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Language"}],
                    "heading": "General"
                },
                "http://purl.org/dc/elements/1.1/source": {
                    "@id": "http://purl.org/dc/elements/1.1/source",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/URL"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "A URI to the original resource which this resource is based on or derived from. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Source"}],
                    "heading": "General",
                    "max": 1
                },
                "headings": ["General", "Keys"],
                "primaryProperties": [
                    "http://purl.org/dc/terms/title",
                    "http://purl.org/dc/terms/description"
                ],
                "secondaryProperties": [
                    "@id",
                    "http://purl.org/dc/terms/creator",
                    "http://purl.org/dc/terms/publisher",
                    "https://purl.org/ctdlasn/terms/publisherName",
                    "http://purl.org/dc/terms/language",
                    "http://purl.org/dc/elements/1.1/source"
                ],
                "tertiaryProperties": []
            };
        },
        conceptProfile: function() {
            if (this.queryParams.ceasnDataFields === "true") {
                return this.ctdlAsnConceptProfile;
            }
            return {
                "http://www.w3.org/2004/02/skos/core#prefLabel": {
                    "@id": "http://www.w3.org/2004/02/skos/core#prefLabel",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Preferred language-tagged label representing this concept. One label per language."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Preferred Label"}],
                    "heading": "General",
                    "onePerLanguage": "true",
                    "isRequired": "true"
                },
                "http://www.w3.org/2004/02/skos/core#definition": {
                    "@id": "http://www.w3.org/2004/02/skos/core#definition",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Supplies a complete explanation of the intended meaning of a concept. One definition per language."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Definition"}],
                    "heading": "General",
                    "onePerLanguage": "true"
                },
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Concept/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Concept"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the concept. If imported from another source, the URL of the concept from which this one originates."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Canonical URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "http://www.w3.org/2004/02/skos/core#notation": {
                    "@id": "http://www.w3.org/2004/02/skos/core#notation",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/Text"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Alphanumeric notation or ID code as defined by the promulgating body to identify this resource."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Notation"}],
                    "heading": "General"
                },
                "http://www.w3.org/2004/02/skos/core#altLabel": {
                    "@id": "http://www.w3.org/2004/02/skos/core#altLabel",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Non-preferred label for the concept used to relate a concept synonym to the preferred label."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Alternative Label"}],
                    "heading": "Other Labels"
                },
                "http://www.w3.org/2004/02/skos/core#hiddenLabel": {
                    "@id": "http://www.w3.org/2004/02/skos/core#hiddenLabel",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Label not intended for public presentation but to assist applications in disambiguating searcher intent - e.g., hidden labels can be used for common misspelling or a colloquial expression."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Hidden Label"}],
                    "heading": "Other Labels"
                },
                "http://www.w3.org/2004/02/skos/core#note": {
                    "@id": "http://www.w3.org/2004/02/skos/core#note",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Annotations to the concept for purposes of general documentation."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Note"}],
                    "heading": "Documentation"
                },
                "http://www.w3.org/2004/02/skos/core#broader": {
                    "@id": "http://www.w3.org/2004/02/skos/core#broader",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Concept that is broader in some way than this concept."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Broader"}],
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#narrower": {
                    "@id": "http://www.w3.org/2004/02/skos/core#narrower",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Concept that is narrower in some way than this concept."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Narrower"}],
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#broadMatch": {
                    "@id": "http://www.w3.org/2004/02/skos/core#broadMatch",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Assertion indicates that the referenced concept is broader in some way than this concept."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Broad Match"}],
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#closeMatch": {
                    "@id": "http://www.w3.org/2004/02/skos/core#closeMatch",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Assertion indicates that two concepts are sufficiently similar that they can be used interchangeably."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Close Match"}],
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#exactMatch": {
                    "@id": "http://www.w3.org/2004/02/skos/core#exactMatch",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Indicates semantic similarity denoting an even higher degree of closeness than Close Match."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Exact Match"}],
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#narrowMatch": {
                    "@id": "http://www.w3.org/2004/02/skos/core#narrowMatch",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Assertion indicates that the referenced concept is narrower in some way than this concept."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Narrow Match"}],
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#related": {
                    "@id": "http://www.w3.org/2004/02/skos/core#related",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "URL of an associatively related concept."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Related"}],
                    "heading": "Connections"
                },
                "headings": ["General", "Other Labels", "Documentation", "Connections", "Keys"],
                "primaryProperties": [
                    "http://www.w3.org/2004/02/skos/core#prefLabel",
                    "http://www.w3.org/2004/02/skos/core#definition",
                    "http://www.w3.org/2004/02/skos/core#notation"
                ],
                "secondaryProperties": [
                    "@id",
                    "http://www.w3.org/2004/02/skos/core#altLabel",
                    "http://www.w3.org/2004/02/skos/core#hiddenLabel",
                    "http://www.w3.org/2004/02/skos/core#note",
                    "http://www.w3.org/2004/02/skos/core#broader",
                    "http://www.w3.org/2004/02/skos/core#narrower"
                ],
                "tertiaryProperties": [
                    "http://www.w3.org/2004/02/skos/core#broadMatch",
                    "http://www.w3.org/2004/02/skos/core#closeMatch",
                    "http://www.w3.org/2004/02/skos/core#exactMatch",
                    "http://www.w3.org/2004/02/skos/core#narrowMatch",
                    "http://www.w3.org/2004/02/skos/core#related"
                ]
            };
        },
        canEdit: function() {
            if (this.queryParams.view === 'true') {
                return false;
            }
            return this.framework.canEditAny(EcIdentityManager.default.getMyPks());
        }
    },
    components: {
        Thing: () => import('@/lode/components/Thing.vue'),
        ThingEditing: () => import('@/lode/components/ThingEditing.vue'),
        FrameworkEditorToolbar: () => import('@/components/framework/EditorToolbar.vue'),
        RightAside: () => import('@/components/framework/RightAside.vue'),
        ProgressionHierarchy: () => import('./ProgressionHierarchy.vue'),
        draggable: () => import('vuedraggable')
    },
    created: function() {
        if (this.framework !== null) {
            this.refreshPage();
            this.spitEvent('viewChanged');
        }
    },
    mounted: function() {
        if (!this.framework) {
            this.$router.push({name: "frameworks"});
        }
        let documentBody = document.getElementById('concept');
        documentBody.addEventListener('scroll', debounce(this.scrollFunction, 20, {'immediate': true}));
        if (this.queryParams.ceasnDataFields === 'true') {
            this.getConceptCtids();
            this.getConceptRegistryUrls();
        }
    },
    beforeDestroy() {
    },
    watch: {
        shortId: function() {
            this.refreshPage();
        },
        frameworkDrag: function() {
            if (this.frameworkDrag.length > 0) {
                let id = EcRemoteLinkedData.trimVersionFromUrl(this.frameworkDrag[0].obj.id);
                this.moveToTopLevel(id);
                this.frameworkDrag = [];
                this.doneDragging = true;
            }
        }
    },
    methods: {
        scrollFunction(e) {
            let documentObject = document.getElementsByClassName('parent-object');
            let scrollValue = e.target.scrollTop;
            if (scrollValue > 0) {
                this.parentObjectClass = 'parent-object scrolled';
                this.scrolled = true;
            } else {
                this.parentObjectClass = 'parent-object';
                this.scrolled = false;
            }
        },
        handleSearch: function(e) {
            this.$store.commit('app/showModal', e);
        },
        onCancelEditMultiple: function() {
            this.showEditMultiple = false;
        },
        onEditMultiple: function() {
            this.showEditMultiple = true;
            var payload = {
                profile: this.conceptProfile,
                selectedCompetencies: this.selectedArray,
                component: 'MultiEdit'
            };
            this.$store.commit('app/showModal', payload);
        },
        onEditNode: function() {
            this.editingFramework = true;
        },
        onDoneEditingNode: async function() {
            this.$store.commit('editor/framework', await EcRepository.get(this.framework.shortId()));
            this.$store.commit('editor/newFramework', null);
            this.editingFramework = false;
        },
        selectedArrayEvent: function(ary) {
            this.selectedArray = ary;
        },
        refreshPage: function() {
            if (!this.framework) {
                appLog("no framework to refresh");
                return;
            }
            this.setDefaultLanguage();
            this.highlightCompetency = [];
            if (this.queryParams.highlightCompetency) {
                if (!EcArray.isArray(highlightCompetency)) {
                    this.highlightCompetency = [this.queryParams.highlightCompetency];
                } else {
                    this.highlightCompetency = this.queryParams.highlightCompetency;
                }
            }
        },
        getDisplayStringFrom: function(n) {
            if (n != null && EcArray.isArray(n)) {
                if ((n).length > 0) {
                    n = (n)[0];
                }
            }
            if (n != null && EcObject.isObject(n) && (n)["@value"]) {
                return (n)["@value"];
            }
            return n;
        },
        onOpenExportModal() {
            this.$store.commit('editor/setItemToExport', this.framework);
            this.$store.commit('app/showModal', {component: 'ExportOptionsModal', title: 'Export Concept Scheme'});
        },
        changeProperties: function(type) {
            this.properties = type;
        },
        onSelectButtonClick: function(ids) {
            this.selectButton(ids);
        },
        moveToTopLevel: async function(id) {
            let me = this;
            let concept = await EcConcept.get(id);
            if (concept["skos:broader"]) {
                if (!EcArray.isArray(concept["skos:broader"])) {
                    concept["skos:broader"] = [concept["skos:broader"]];
                }
                let parent = await EcConcept.get(concept["skos:broader"][0]);
                let fromIndex = parent["skos:narrower"].indexOf(id);
                parent["skos:narrower"].splice(fromIndex, 1);
                repo.saveTo(parent, function() {}, function() {});
                delete concept["skos:broader"];
            }
            this.framework["skos:hasTopConcept"].push(id);
            concept["skos:topConceptOf"] = this.framework.shortId();
            repo.saveTo(concept, function() {
                repo.saveTo(me.framework, function() {
                    me.refreshPage();
                }, function() {});
            }, function() {});
        }
    }
};
</script>

<style lang="scss">
    @import '@/scss/framework.scss';

</style>