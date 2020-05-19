<template>
    <div id="page-framework">
        <RightAside v-if="showRightAside" />
        <!-- begin framework -->
        <div class="">
            <FrameworkEditorToolbar
                @changeProperties="changeProperties"
                @openExportModalEvent="onOpenExportModal" />
            <div class="framework-wrapper">
                <Component
                    :is="dynamicThingComponent"
                    :id="'scroll-' + framework.shortId().split('/').pop()"
                    :obj="changedObj ? changedObj : framework"
                    :repo="repo"
                    :parentNotEditable="queryParams.view==='true'"
                    @deleteObject="deleteObject"
                    :profile="conceptSchemeProfile"
                    @editNodeEvent="onEditNode()"
                    @doneEditingNodeEvent="onDoneEditingNode()"
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
                            Created {{ $moment(framework['schema:dateCreated']).fromNow() }}
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
                        <span v-if="loggedIn">
                            Make private
                            <input
                                type="checkbox"
                                v-model="privateFramework">
                        </span>
                    </div>
                </Component>
                <ConceptHierarchy
                    :container="framework"
                    containerType="ConceptScheme"
                    containerTypeGet="EcConceptScheme"
                    :viewOnly="queryParams.view === 'true'"
                    :repo="repo"
                    :exportOptions="conceptExportOptions"
                    :highlightList="highlightCompetency"
                    :profile="conceptProfile"
                    @deleteObject="deleteObject"
                    @exportObject="exportObject"
                    @editMultipleEvent="onEditMultiple"
                    @searchThings="handleSearch($event)"
                    @selectButtonClick="onSelectButtonClick"
                    :properties="properties"
                    @selectedArray="selectedArrayEvent" />
            </div>
        </div>
    </div>
</template>
<script>

import saveAs from 'file-saver';
import common from '@/mixins/common.js';
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';

export default {
    name: "ConceptScheme",
    mixins: [common, ctdlasnProfile],
    data: function() {
        return {
            showVersionHistory: false,
            showEditMultiple: false,
            showClipboardSuccessModal: false,
            repo: window.repo,
            schemeExportLink: null,
            schemeExportGuid: null,
            conceptExportOptions: [
                {name: "SKOS (JSON-LD)", value: "jsonld"},
                {name: "SKOS (RDF Quads)", value: "rdfQuads"},
                {name: "SKOS (RDF+JSON)", value: "rdfJson"},
                {name: "SKOS (RDF+XML)", value: "rdfXml"},
                {name: "SKOS (Turtle)", value: "turtle"}
            ],
            conceptSchemeExportOptions: [
                {name: "Achievement Standards Network (RDF+JSON)", value: "asn"},
                {name: "CASS (JSON-LD)", value: "jsonld"},
                {name: "CaSS (RDF Quads)", value: "rdfQuads"},
                {name: "CaSS (RDF+JSON)", value: "rdfJson"},
                {name: "CaSS (RDF+XML)", value: "rdfXml"},
                {name: "CaSS (Turtle)", value: "turtle"},
                {name: "Credential Engine ASN (JSON-LD)", value: "ctdlasnJsonld"}
            ],
            highlightCompetency: null,
            editingFramework: false,
            properties: "primary",
            config: null,
            privateFramework: false,
            selectedArray: [],
            changedObj: null
        };
    },
    computed: {
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
                return this.$moment(this.timestamp).fromNow();
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
            if (EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
                return true;
            }
            return false;
        },
        conceptSchemeProfile: function() {
            if (this.queryParams.ceasnDataFields === "true") {
                return this.ctdlAsnConceptSchemeProfile;
            }
            return {
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
                    "onePerLanguage": "true"
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
                "http://purl.org/dc/terms/creator": {
                    "@id": "http://purl.org/dc/terms/creator",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/URL"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "An entity primarily responsible for making this resource. For example, https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/. One entity per line."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Creator"
                    },
                    "heading": "General"
                },
                "http://purl.org/dc/terms/publisher": {
                    "@id": "http://purl.org/dc/terms/publisher",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/URL"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "An agent responsible for making this entity available. For example, https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Publisher"
                    },
                    "max": 1,
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/publisherName": {
                    "@id": "https://purl.org/ctdlasn/terms/publisherName",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/Text"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Name of an agent responsible for making this resource available. One name per line."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Publisher Name"
                    },
                    "max": 1,
                    "heading": "General"
                },
                "http://purl.org/dc/terms/language": {
                    "@id": "http://purl.org/dc/terms/language",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/Text"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "The primary language used in or by this resource. One language per line."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Language"
                    },
                    "heading": "General"
                },
                "http://purl.org/dc/elements/1.1/source": {
                    "@id": "http://purl.org/dc/elements/1.1/source",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/URL"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "A URI to the original resource which this resource is based on or derived from. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Source"
                    },
                    "heading": "General",
                    "max": 1
                },
                "headings": ["Keys", "General"]
            };
        },
        conceptProfile: function() {
            if (this.queryParams.ceasnDataFields === "true") {
                return this.ctdlAsnConceptProfile;
            }
            return {
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
                "http://www.w3.org/2004/02/skos/core#prefLabel": {
                    "@id": "http://www.w3.org/2004/02/skos/core#prefLabel",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Preferred language-tagged label representing this concept. One label per language."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Preferred Label"
                    },
                    "heading": "General",
                    "onePerLanguage": "true",
                    "required": "true"
                },
                "http://www.w3.org/2004/02/skos/core#definition": {
                    "@id": "http://www.w3.org/2004/02/skos/core#definition",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Supplies a complete explanation of the intended meaning of a concept. One definition per language."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Definition"
                    },
                    "heading": "General",
                    "onePerLanguage": "true"
                },
                "http://www.w3.org/2004/02/skos/core#notation": {
                    "@id": "http://www.w3.org/2004/02/skos/core#notation",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://schema.org/Text"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Alphanumeric notation or ID code as defined by the promulgating body to identify this resource."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Notation"
                    },
                    "heading": "General"
                },
                "http://www.w3.org/2004/02/skos/core#altLabel": {
                    "@id": "http://www.w3.org/2004/02/skos/core#altLabel",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Non-preferred label for the concept used to relate a concept synonym to the preferred label."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Alternative Label"
                    },
                    "heading": "Other Labels"
                },
                "http://www.w3.org/2004/02/skos/core#hiddenLabel": {
                    "@id": "http://www.w3.org/2004/02/skos/core#hiddenLabel",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Label not intended for public presentation but to assist applications in disambiguating searcher intent - e.g., hidden labels can be used for common misspelling or a colloquial expression."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Hidden Label"
                    },
                    "heading": "Other Labels"
                },
                "http://www.w3.org/2004/02/skos/core#note": {
                    "@id": "http://www.w3.org/2004/02/skos/core#note",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Annotations to the concept for purposes of general documentation."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Note"
                    },
                    "heading": "Documentation"
                },
                "http://www.w3.org/2004/02/skos/core#changeNote": {
                    "@id": "http://www.w3.org/2004/02/skos/core#changeNote",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Text describing a significant change to the concept."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Change Note"
                    },
                    "heading": "Documentation"
                },
                "http://www.w3.org/2004/02/skos/core#broader": {
                    "@id": "http://www.w3.org/2004/02/skos/core#broader",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Concept that is broader in some way than this concept."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Broader"
                    },
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#narrower": {
                    "@id": "http://www.w3.org/2004/02/skos/core#narrower",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Concept that is narrower in some way than this concept."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Narrower"
                    },
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#broadMatch": {
                    "@id": "http://www.w3.org/2004/02/skos/core#broadMatch",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Assertion indicates that the referenced concept is broader in some way than this concept."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Broad Match"
                    },
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#closeMatch": {
                    "@id": "http://www.w3.org/2004/02/skos/core#closeMatch",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Assertion indicates that two concepts are sufficiently similar that they can be used interchangeably."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Close Match"
                    },
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#exactMatch": {
                    "@id": "http://www.w3.org/2004/02/skos/core#exactMatch",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Indicates semantic similarity denoting an even higher degree of closeness than Close Match."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Exact Match"
                    },
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#narrowMatch": {
                    "@id": "http://www.w3.org/2004/02/skos/core#narrowMatch",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "Assertion indicates that the referenced concept is narrower in some way than this concept."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Narrow Match"
                    },
                    "heading": "Connections"
                },
                "http://www.w3.org/2004/02/skos/core#related": {
                    "@id": "http://www.w3.org/2004/02/skos/core#related",
                    "@type": "http://www.w3.org/2000/01/rdf-schema#Property",
                    "http://schema.org/domainIncludes": {
                        "@id": "http://schema.cassproject.org/0.4/skos/Concept"
                    },
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": {
                        "@language": "en",
                        "@value": "URL of an associatively related concept."
                    },
                    "http://www.w3.org/2000/01/rdf-schema#label": {
                        "@language": "en",
                        "@value": "Related"
                    },
                    "heading": "Connections"
                },
                "headings": ["Keys", "General", "Other Labels", "Documentation", "Connections"]
            };
        }
    },
    components: {
        Thing: () => import('@/lode/components/lode/Thing.vue'),
        ThingEditing: () => import('@/lode/components/lode/ThingEditing.vue'),
        FrameworkEditorToolbar: () => import('@/components/framework/EditorToolbar.vue'),
        RightAside: () => import('@/components/framework/RightAside.vue'),
        ConceptHierarchy: () => import('./ConceptHierarchy.vue')
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
        } else {
            this.checkIsPrivate();
        }
    },
    watch: {
        shortId: function() {
            this.refreshPage();
        },
        privateFramework: function() {
            var me = this;
            var framework = this.framework;
            if (this.privateFramework === true) {
                this.$store.commit('editor/private', true);
                var cs = new EcConceptScheme();
                cs.copyFrom(framework);
                cs.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                var name = cs["dcterms:title"];
                cs["schema:dateModified"] = new Date().toISOString();
                cs = EcEncryptedValue.toEncryptedValue(cs);
                cs["dcterms:title"] = name;
                me.repo.saveTo(cs, function() {
                    if (framework["skos:hasTopConcept"]) {
                        me.encryptConcepts(framework);
                    }
                }, console.error);
            } else {
                this.$store.commit('editor/private', false);
                framework = EcEncryptedValue.toEncryptedValue(framework);
                var cs = new EcConceptScheme();
                cs.copyFrom(framework.decryptIntoObject());
                delete cs.reader;
                framework = cs;
                EcEncryptedValue.encryptOnSave(cs.id, false);
                cs["schema:dateModified"] = new Date().toISOString();
                me.repo.saveTo(cs, function() {
                    if (cs["skos:hasTopConcept"]) {
                        me.decryptConcepts(cs);
                    }
                }, console.error);
            }
        }
    },
    methods: {
        handleSearch: function(e) {
            this.$store.commit('app/showModal', e);
        },
        checkIsPrivate: function() {
            if (EcRepository.getBlocking(this.framework.id)) {
                if (EcRepository.getBlocking(this.framework.id).type === "EncryptedValue") {
                    this.privateFramework = true;
                } else {
                    this.privateFramework = false;
                }
            }
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
        onDoneEditingNode: function() {
            this.changedObj = EcRepository.getBlocking(this.framework.shortId());
            this.$store.commit('editor/newFramework', null);
            this.editingFramework = false;
        },
        selectedArrayEvent: function(ary) {
            this.selectedArray = ary;
        },
        refreshPage: function() {
            if (!this.framework) {
                console.log("no framework to refresh");
                return;
            }
            if (EcRepository.shouldTryUrl(this.framework.id) === false) {
                this.schemeExportGuid = EcCrypto.md5(this.framework.id);
            } else {
                this.schemeExportGuid = this.framework.getGuid();
            }
            this.schemeExportLink = this.repo.selectedServer + "data/" + this.schemeExportGuid;
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
        download: function(fileName, data) {
            var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            saveAs(blob, fileName);
        },
        exportJsonld: function(link) {
            window.open(link, '_blank');
        },
        exportRdfQuads: function(link) {
            var fileName = this.getDisplayStringFrom(this.framework["dcterms:title"]);
            var me = this;
            this.get(link, null, {"Accept": "text/n4"}, function(success) {
                me.download(fileName + ".n4", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportRdfJson: function(link) {
            var fileName = this.getDisplayStringFrom(this.framework["dcterms:title"]);
            var me = this;
            this.get(link, null, {"Accept": "application/rdf+json"}, function(success) {
                me.download(fileName + ".rdf.json", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportRdfXml: function(link) {
            var fileName = this.getDisplayStringFrom(this.framework["dcterms:title"]);
            var me = this;
            this.get(link, null, {"Accept": "application/rdf+xml"}, function(success) {
                me.download(fileName + ".rdf.xml", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportTurtle: function(link) {
            var fileName = this.getDisplayStringFrom(this.framework["dcterms:title"]);
            var me = this;
            this.get(link, null, {"Accept": "text/turtle"}, function(success) {
                me.download(fileName + ".turtle", success);
            }, function(failure) {
                console.log(failure);
            });
        },
        exportCtdlasnJsonld: function(link) {
            window.open(link.replace("/data/", "/ceasn/"), '_blank');
        },
        getDisplayStringFrom: function(n) {
            if (n != null && EcArray.isArray(n)) {
                if ((n).length > 0) {
                    n = (n)[0];
                }
            }
            if (n != null && EcObject.isObject(n) && (n).hasOwnProperty("@value")) {
                return (n)["@value"];
            }
            return n;
        },
        deleteObject: function(thing) {
            console.log("deleting " + thing.id);
            var me = this;
            if (thing.shortId() === this.framework.shortId()) {
                // delete scheme
                var framework = this.framework;
                this.repo.deleteRegistered(framework, function(success) {
                    me.spitEvent("frameworkDeleted", framework.shortId(), "editFrameworkSection");
                    // Delete the framework, delete all non-used stuff.
                    EcConcept.search(me.repo, "skos\\:inScheme:\"" + framework.shortId() + "\"", function(concepts) {
                        for (var i = 0; i < concepts.length; i++) {
                            me.repo.deleteRegistered(concepts[i], console.log, console.error);
                        }
                    }, console.error);
                    me.$store.commit('editor/framework', null);
                    me.$router.push({name: "frameworks"});
                }, console.log);
            } else {
                // Delete concept and fields
                this.deleteConceptInner(thing);
                this.spitEvent("conceptDeleted", thing.shortId(), "editFrameworkPage");

                this.framework["schema:dateModified"] = new Date().toISOString();
                this.$store.commit('editor/selectedCompetency', null);
            }
        },
        deleteConceptInner: function(c) {
            var me = this;
            if (c["skos:broader"] != null) {
                for (var i = 0; i < c["skos:broader"].length; i++) {
                    EcConcept.get(c["skos:broader"][i], function(concept) {
                        EcArray.setRemove(concept["skos:narrower"], c.shortId());
                        concept["schema:dateModified"] = new Date().toISOString();
                        if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[concept.id] !== true) {
                            concept = EcEncryptedValue.toEncryptedValue(concept);
                        }
                        repo.saveTo(concept, function() {
                            me.$store.commit('editor/framework', me.framework);
                        }, console.error);
                    }, console.error);
                }
            }
            if (c["skos:narrower"] != null) {
                for (var i = 0; i < c["skos:narrower"].length; i++) {
                    EcConcept.get(c["skos:narrower"][i], function(concept) {
                        me.deleteConceptInner(concept);
                    }, console.error);
                }
            }
            if (c["skos:topConceptOf"] != null) {
                EcArray.setRemove(this.framework["skos:hasTopConcept"], c.shortId());
                var framework = this.framework;
                framework["schema:dateModified"] = new Date().toISOString();
                if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                repo.saveTo(framework, function() {
                    me.$store.commit('editor/framework', me.framework);
                }, console.error);
            }
            repo.deleteRegistered(c, function() {
                me.$store.commit('editor/framework', me.framework);
            }, console.error);
        },
        exportObject: function(concept, exportType) {
            var guid;
            if (EcRepository.shouldTryUrl(concept.id) === false) {
                guid = EcCrypto.md5(concept.id);
            } else {
                guid = concept.getGuid();
            }
            var link = this.repo.selectedServer + "data/" + guid;
            if (exportType === "jsonld") {
                this.exportJsonld(link);
            } else if (exportType === "rdfQuads") {
                this.exportRdfQuads(link);
            } else if (exportType === "rdfJson") {
                this.exportRdfJson(link);
            } else if (exportType === "rdfXml") {
                this.exportRdfXml(link);
            } else if (exportType === "turtle") {
                this.exportTurtle(link);
            }
        },
        exportScheme: function(exportType) {
            if (exportType === "jsonld") {
                this.exportJsonld(this.schemeExportLink);
            } else if (exportType === "rdfQuads") {
                this.exportRdfQuads(this.schemeExportLink);
            } else if (exportType === "rdfJson") {
                this.exportRdfJson(this.schemeExportLink);
            } else if (exportType === "rdfXml") {
                this.exportRdfXml(this.schemeExportLink);
            } else if (exportType === "turtle") {
                this.exportTurtle(this.schemeExportLink);
            } else if (exportType === "ctdlasnJsonld") {
                this.exportCtdlasnJsonld(this.schemeExportLink);
            }
        },
        encryptConcepts: function(c) {
            var toSave = [];
            var me = this;
            var concepts = c["skos:hasTopConcept"] ? c["skos:hasTopConcept"] : c["skos:narrower"];
            new EcAsyncHelper().each(concepts, function(conceptId, done) {
                EcRepository.get(conceptId, function(concept) {
                    concept.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                    concept["schema:dateModified"] = new Date().toISOString();
                    if (concept["skos:narrower"] && concept["skos:narrower"].length > 0) {
                        me.encryptConcepts(concept);
                    }
                    if (EcEncryptedValue.encryptOnSaveMap[concept.id] !== true) {
                        concept = EcEncryptedValue.toEncryptedValue(concept);
                    }
                    toSave.push(concept);
                    done();
                }, done);
            }, function(conceptIds) {
                for (var i = 0; i < toSave.length; i++) {
                    me.repo.saveTo(toSave[i], function() {}, console.error);
                }
            });
        },
        decryptConcepts: function(c) {
            var me = this;
            var concepts = c["skos:hasTopConcept"] ? c["skos:hasTopConcept"] : c["skos:narrower"];
            new EcAsyncHelper().each(concepts, function(conceptId, done) {
                EcRepository.get(conceptId, function(concept) {
                    var v;
                    if (concept.isAny(new EcEncryptedValue().getTypes())) {
                        v = new EcEncryptedValue();
                        v.copyFrom(concept);
                    } else {
                        v = EcEncryptedValue.toEncryptedValue(concept);
                    }
                    concept = new EcConcept();
                    concept.copyFrom(v.decryptIntoObject());
                    delete concept.reader;
                    EcEncryptedValue.encryptOnSave(concept.id, false);
                    if (concept["skos:narrower"]) {
                        me.decryptConcepts(concept);
                    }
                    concept["schema:dateModified"] = new Date().toISOString();
                    me.repo.saveTo(concept, done, done);
                }, done);
            }, function(conceptIds) {
            });
        },
        onOpenExportModal() {
            let params = {};
            var me = this;
            console.log("options", typeof me.conceptSchemeExportOptions);
            params = {
                type: "export",
                selectedExportOption: '',
                title: "Export Concept Scheme",
                exportOptions: me.conceptSchemeExportOptions,
                text: "Select a file format to export your concept scheme. Files download locally.",
                onConfirm: (e) => {
                    return me.exportScheme(e);
                }
            };
            // reveal modal
            this.$modal.show(params);
        },
        changeProperties: function(type) {
            this.properties = type;
        },
        onSelectButtonClick: function(ids) {
            this.selectButton(ids);
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/framework.scss';
    
</style>