<template>
    <div class="page-framework">
        <Thing
            :obj="framework"
            :repo="repo"
            :parentNotEditable="queryParams.view==='true'"
            @deleteObject="deleteObject"
            @exportObject="exportObject"
            @select="select"
            :isEditingContainer="isEditingContainer"
            :profile="conceptSchemeProfile"
            @editingThing="handleEditingContainer($event)">
            <template v-slot:copyURL="slotProps">
                <span v-if="slotProps.expandedProperty=='@id'">
                    <button
                        title="Copy URL to the clipboard."
                        v-clipboard="slotProps.expandedValue[0]['@value']">
                        <i class="fa fa-clipboard" />
                    </button>
                </span>
            </template>
        </Thing>
        <span
            class="info-tag"
            v-if="timestamp"
            :title="new Date(timestamp)">Last modified {{ lastModified }}</span>
        <span
            class="info-tag"
            v-if="framework['schema:dateCreated']"
            :title="new Date(framework['schema:dateCreated'])">Created {{ $moment(framework['schema:dateCreated']).fromNow() }}</span>
        <span
            class="info-tag"
            v-if="framework['Approved']"
            :title="framework['Approved']">Approved</span>
        <span
            class="info-tag"
            v-if="framework['Published']"
            :title="framework['Published']">Published</span>
        <button
            v-if="selectAllButton"
            @click="selectAll=!selectAll">
            Select All
        </button>
        <button
            v-if="selectButtonText"
            @click="selectButton">
            {{ selectButtonText }}
        </button>
        <span v-if="loggedIn">
            Make private
            <input
                type="checkbox"
                v-model="privateFramework">
        </span>
        <hr>
        <ConceptHierarchy
            :container="framework"
            containerType="ConceptScheme"
            :editable="queryParams.view !== 'true'"
            :repo="repo"
            :queryParams="queryParams"
            :exportOptions="conceptExportOptions"
            :highlightList="highlightCompetency"
            :selectMode="selectButtonText != null"
            :selectAll="selectAll"
            :profile="conceptProfile"
            @deleteObject="deleteObject"
            @exportObject="exportObject"
            @select="select"
            :isEditingContainer="isEditingContainer"
            @editingContainer="handleEditingContainer($event)">
            <template v-slot:copyURL="slotProps">
                <span v-if="slotProps.expandedProperty=='@id'">
                    <button
                        title="Copy URL to the clipboard."
                        v-clipboard="slotProps.expandedValue[0]['@value']">
                        <i class="fa fa-clipboard" />
                    </button>
                </span>
            </template>
        </ConceptHierarchy>
    </div>
</template>
<script>
import Thing from '@/lode/components/lode/Thing.vue';
import ConceptHierarchy from './ConceptHierarchy.vue';
import saveAs from 'file-saver';
import common from '@/mixins/common.js';
import ctdlasnProfile from '@/mixins/ctdlasnProfile.js';
export default {
    name: "ConceptScheme",
    props: {
        exportType: String,
        queryParams: Object
    },
    mixins: [common, ctdlasnProfile],
    data: function() {
        return {
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
            highlightCompetency: null,
            selectButtonText: null,
            selectAllButton: false,
            selectAll: false,
            selectedArray: [],
            isEditingContainer: false,
            privateFramework: false
        };
    },
    computed: {
        framework: function() {
            return this.$store.state.editor.framework;
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
            return this.$store.state.editor.framework.shortId();
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
    components: {Thing, ConceptHierarchy},
    created: function() {
        this.refreshPage();
        this.spitEvent('viewChanged');
    },
    mounted: function() {
        if (EcRepository.getBlocking(this.framework.id).type === "EncryptedValue") {
            this.privateFramework = true;
        }
    },
    watch: {
        exportType: function() {
            if (this.exportType === "jsonld") {
                this.exportJsonld(this.schemeExportLink);
            } else if (this.exportType === "rdfQuads") {
                this.exportRdfQuads(this.schemeExportLink);
            } else if (this.exportType === "rdfJson") {
                this.exportRdfJson(this.schemeExportLink);
            } else if (this.exportType === "rdfXml") {
                this.exportRdfXml(this.schemeExportLink);
            } else if (this.exportType === "turtle") {
                this.exportTurtle(this.schemeExportLink);
            } else if (this.exportType === "ctdlasnJsonld") {
                this.exportCtdlasnJsonld(this.schemeExportLink);
            }
        },
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
                framework = cs;
                EcEncryptedValue.encryptOnSave(cs.id, false);
                me.repo.saveTo(cs, function() {
                    if (cs["skos:hasTopConcept"]) {
                        me.decryptConcepts(cs);
                    }
                }, console.error);
            }
        }
    },
    methods: {
        refreshPage: function() {
            this.framework = this.$store.state.editor.framework;
            if (EcRepository.shouldTryUrl(this.framework.id) === false) {
                this.schemeExportGuid = EcCrypto.md5(this.framework.id);
            } else {
                this.schemeExportGuid = this.framework.getGuid();
            }
            this.schemeExportLink = this.repo.selectedServer + "data/" + this.schemeExportGuid;
            this.highlightCompetency = [];
            if (this.queryParams.highlightCompetency) {
                if (!EcArray.isArray(highlightCompetency)) {
                    this.highlightCompetency = [this.queryParams.highlightCompetency];
                } else {
                    this.highlightCompetency = this.queryParams.highlightCompetency;
                }
            }
            if (this.queryParams.singleSelect) {
                this.selectButtonText = this.queryParams.singleSelect;
            }
            if (this.queryParams.select) {
                if (this.queryParams.select !== "" && this.queryParams.select !== "select") {
                    this.selectButtonText = this.queryParams.select;
                }
                this.selectAllButton = true;
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
        select: function(id, checked) {
            if (checked) {
                EcArray.setAdd(this.selectedArray, id);
            } else {
                EcArray.setRemove(this.selectedArray, id);
            }
        },
        handleEditingContainer: function(e) {
            if (e) {
                this.isEditingContainer = true;
            } else {
                this.isEditingContainer = false;
            }
        },
        encryptConcepts: function(c) {
            var toSave = [];
            var me = this;
            var concepts = c["skos:hasTopConcept"] ? c["skos:hasTopConcept"] : c["skos:narrower"];
            new EcAsyncHelper().each(concepts, function(conceptId, done) {
                EcRepository.get(conceptId, function(concept) {
                    concept.addOwner(EcIdentityManager.ids[0].ppk.toPk());
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
                    EcEncryptedValue.encryptOnSave(concept.id, false);
                    if (concept["skos:narrower"]) {
                        me.decryptConcepts(concept);
                    }
                    me.repo.saveTo(concept, done, done);
                }, done);
            }, function(conceptIds) {
            });
        }
    }
};
</script>

<style lang="scss" scoped>

.page-framework{
    .e-Thing-ul{

        margin-top:0px;
    }
    .e-Thing-always-ul .e-title, .e-Thing-always-ul .e-prefLabel{
        label{
            display:none;
        }
    }

    .e-Thing-always-ul .e-description, .e-Thing-always-ul .e-definition{
        label{
            display:none;
        }
        font-size:.8rem;
    }

    .e-ConceptScheme{
        ul{
            margin-left:0px;
        }
        a {
            display:none;
        }
        >.expand{

            }
        >.compact{
        }
        >.editable{
        }
        >.delete-thing{
        }
        .e-Property-text{
            font-size:larger;
        }
    }

    .e-Concept{
        a {display:none;}
        >.expand{
        }
        >.compact{
        }
        >.editable {
        }
        >.delete-thing {
        }
        >.export {
        }
    }
    .e-HierarchyNode{
        >ul{
            padding-left:1rem;
            >div{
                border:1px dashed whitesmoke;
            }
        }
        >.icon{
            width:0px;
            height:0px;
            margin:0px;
            line-height:0px;
            display:block;
            position:relative;
            left:-.5rem;
            top:-2rem;
        }
        .highlighted{
            background-color:yellow;
        }
        padding-left:1rem;
    }
    .dragging{
        div{
            border:1px dashed gray !important;
            .drag-footer::before{
                content:'' !important
            }
            .drag-footer{
            }
        }
    }
}

</style>