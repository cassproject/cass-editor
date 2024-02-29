(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d21ecda"],{

/***/ "d6b4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1da1");


/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    tlaFrameworkProfile: function tlaFrameworkProfile() {
      var me = this;
      return {
        "@id": {
          "@id": "https://schema.cassproject.org/0.4/Framework/id",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The URL of the framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Framework URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "http://schema.org/name": {
          "@id": "http://schema.org/name",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The name of the framework. One name per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Framework Name"
          }],
          "heading": "General",
          "isRequired": "true",
          "onePerLanguage": "true"
        },
        "http://schema.org/description": {
          "@id": "http://schema.org/description",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The description of the framework. One description per language"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Description"
          }],
          "heading": "General",
          "onePerLanguage": "true"
        },
        "http://schema.org/creator": {
          "@id": "http://schema.org/creator",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The primary entity responsible for making this competency or competency framework. For example: \n                            https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/. One entity per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Creator"
          }],
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/publisherName": {
          "@id": "https://purl.org/ctdlasn/terms/publisherName",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Name of the agent responsible for making this entity available."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publisher Name"
          }],
          "heading": "General"
        },
        "http://schema.org/publisher": {
          "@id": "http://schema.org/publisher",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The entity responsible for making this competency framework available. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publisher"
          }],
          "heading": "General"
        },
        "http://schema.org/inLanguage": {
          "@id": "http://schema.org/inLanguage",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The primary language used in or by this competency framework or competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "In Language"
          }],
          "heading": "General"
        },
        "http://schema.org/keywords": {
          "@id": "http://schema.org/keywords",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual frameworks contextually. One concept per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Keywords"
          }],
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/conceptTerm": {
          "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Concept Terms"
          }],
          "noTextEditing": "true",
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/derivedFrom": {
          "@id": "https://purl.org/ctdlasn/terms/derivedFrom",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A third party version of the entity being referenced that has been modified in meaning through editing, extension, or refinement.\n                            For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Derived From"
          }],
          "max": 1,
          "heading": "Relations"
        },
        "https://purl.org/ctdlasn/terms/isVersionOf": {
          "@id": "https://purl.org/ctdlasn/terms/isVersionOf",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A related competency framework of which this competency framework is a version, edition, or adaptation."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Version Of"
          }],
          "max": 1,
          "heading": "Relations"
        },
        "http://purl.org/dc/elements/1.1/source": {
          "@id": "http://purl.org/dc/elements/1.1/source",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A URI to the original competency framework which this competency framework is based on or derived from.\n                            For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Source"
          }],
          "heading": "Relations"
        },
        "https://purl.org/ctdlasn/terms/educationLevelType": {
          "@id": "https://purl.org/ctdlasn/terms/educationLevelType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A general statement describing the education or training context.\n                                Alternatively, a more specific statement of the location of the audience in terms of its progression through an education or training context."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Education Level Type"
          }],
          "noTextEditing": "true",
          "heading": "Context"
        },
        "http://schema.org/validFrom": {
          "@id": "http://schema.org/validFrom",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#dateTime"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Beginning date of validity of this competency framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Valid From"
          }],
          "max": 1,
          "heading": "Context"
        },
        "http://schema.org/validThrough": {
          "@id": "http://schema.org/validThrough",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2001/XMLSchema#dateTime"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "End date of validity of this competency framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Valid Until"
          }],
          "max": 1,
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/publicationStatusType": {
          "@id": "https://purl.org/ctdlasn/terms/publicationStatusType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Publication status of the source competency framework. The original framework may be drafted, published, or depreciated outside of this system."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Publication Status"
          }],
          "options": [{
            display: "Draft",
            val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Draft"
          }, {
            display: "Published",
            val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Published"
          }, {
            display: "Deprecated",
            val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Deprecated"
          }],
          "max": 1,
          "heading": "Context"
        },
        "http://schema.org/identifier": {
          "@id": "http://schema.org/identifier",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An alternative URI by which this competency or competency framework is identified. For example, https://sandbox.credentialengineregistry.org/."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Identifier"
          }],
          "heading": "Context"
        },
        "http://schema.org/copyrightYear": {
          "@id": "http://schema.org/copyrightYear",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://purl.org/dc/terms/date"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Date of a statement of copyright for this resource."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Date Copyrighted"
          }],
          "max": 1,
          "heading": "Rights"
        },
        "http://schema.org/license": {
          "@id": "http://schema.org/license",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A legal document giving official permission to do something with this competency framework. For example, https://sandbox.credentialengineregistry.org/"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "License"
          }],
          "max": 1,
          "heading": "Rights"
        },
        "http://purl.org/dc/elements/1.1/rights": {
          "@id": "http://purl.org/dc/elements/1.1/rights",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Information about rights held in and over this competency framework."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Rights"
          }],
          "max": 1,
          "heading": "Rights"
        },
        "http://schema.org/copyrightHolder": {
          "@id": "http://schema.org/copyrightHolder",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Framework"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The agent owning or managing rights over this competency framework. For example, https://credentialengineregistry.org/"
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Rights Holder"
          }],
          "max": 1,
          "heading": "Rights"
        },
        "headings": ["Keys", "General", "Tagging", "Relations", "Context", "Rights"],
        "primaryProperties": ["@id", "http://schema.org/name", "http://schema.org/description"],
        "secondaryProperties": ["http://schema.org/creator", "https://purl.org/ctdlasn/terms/publisherName", "http://schema.org/publisher", "http://schema.org/inLanguage", "http://schema.org/keywords", "https://purl.org/ctdlasn/terms/conceptTerm", "https://purl.org/ctdlasn/terms/derivedFrom", "https://purl.org/ctdlasn/terms/isVersionOf", "http://purl.org/dc/elements/1.1/source", "https://purl.org/ctdlasn/terms/educationLevelType"],
        "tertiaryProperties": ["http://schema.org/validFrom", "http://schema.org/validThrough", "https://purl.org/ctdlasn/terms/publicationStatusType", "http://schema.org/identifier", "http://schema.org/copyrightYear", "http://schema.org/license", "http://purl.org/dc/elements/1.1/rights", "http://schema.org/copyrightHolder"]
      };
    },
    tlaCompetencyProfile: function tlaCompetencyProfile() {
      var me = this;
      return {
        "@id": {
          "@id": "https://schema.cassproject.org/0.4/Competency/id",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The URL of the competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "URL"
          }],
          "readOnly": "true",
          "max": 1,
          "heading": "Keys"
        },
        "http://schema.org/name": {
          "@id": "http://schema.org/name",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The name of the competency. One name per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Name"
          }],
          "heading": "General",
          "isRequired": "true",
          "onePerLanguage": "true"
        },
        "http://schema.org/description": {
          "@id": "http://schema.org/description",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The description of the competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Description"
          }],
          "heading": "General"
        },
        "https://schema.cassproject.org/0.4/scope": {
          "@id": "https://schema.cassproject.org/0.4/scope",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The scope of the competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Scope"
          }],
          "heading": "General"
        },
        "https://schema.cassproject.org/0.4/Level": {
          "@id": "https://schema.cassproject.org/0.4/Level",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "When an individual's performance in a competency can be measured, a level specifies milestones that an individual can reach, creating fine-grained distinction between the proficient and the adept."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Level"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Level"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.levels;
          },
          "noTextEditing": "true",
          "add": function add(selectedCompetency) {
            me.addLevel(selectedCompetency);
          },
          "remove": function remove(competency, levelId) {
            me.removeLevelFromFramework(levelId);
          },
          "save": function save() {
            me.saveFramework();
          },
          "heading": "General"
        },
        "http://purl.org/dc/terms/type": {
          "@id": "http://purl.org/dc/terms/type",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The textual label identifying the category of the competency as designated by the promulgating body. One label per line. One label per language."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Type"
          }],
          "onePerLanguage": "true",
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/educationLevelType": {
          "@id": "https://purl.org/ctdlasn/terms/educationLevelType",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A general statement describing the education or training context. Alternatively, a more specific statement of the location of the audience in terms of its progression \n                                through an education or training context."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Education Level"
          }],
          "noTextEditing": "true",
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/listID": {
          "@id": "https://purl.org/ctdlasn/terms/listID",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An alphanumeric string indicating this competency's position in a list of competencies at the same level in some arbitrary hierarchy."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "List ID"
          }],
          "max": 1,
          "heading": "General"
        },
        "https://purl.org/ctdlasn/terms/codedNotation": {
          "@id": "https://purl.org/ctdlasn/terms/codedNotation",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An alphanumeric notation or ID code identifying this competency in common use among end-users."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Coded Notation"
          }],
          "max": 1,
          "heading": "Context"
        },
        "https://purl.org/ctdlasn/terms/derivedFrom": {
          "@id": "https://purl.org/ctdlasn/terms/derivedFrom",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The URI of a competency from which this competency has been derived. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.  One entity per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Derived From"
          }],
          "max": 1,
          "heading": "Context"
        },
        "http://schema.org/identifier": {
          "@id": "http://schema.org/identifier",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/URL"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An alternative URI by which this competency framework or competency is identified. For example, https://sandbox.credentialengineregistry.org/. One URI per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Identifier"
          }],
          "heading": "Context"
        },
        "http://schema.org/keywords": {
          "@id": "http://schema.org/keywords",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://www.w3.org/2000/01/rdf-schema#langString"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual competencies contextually. One concept per line."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Keywords"
          }],
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/conceptTerm": {
          "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Concept Terms"
          }],
          "noTextEditing": "true",
          "heading": "Tagging"
        },
        "https://purl.org/ctdlasn/terms/complexityLevel": {
          "@id": "https://purl.org/ctdlasn/terms/complexityLevel",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/skos/Concept"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "The expected performance level of a learner or professional as defined by a competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Complexity Level"
          }],
          "noTextEditing": "true",
          "heading": "Scales"
        },
        "https://purl.org/ctdlasn/terms/weight": {
          "@id": "https://purl.org/ctdlasn/terms/weight",
          "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
          "http://schema.org/domainIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://schema.org/rangeIncludes": [{
            "@id": "http://schema.org/Text"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "An asserted measurement of the weight, degree, percent, or strength of a recommendation, requirement, or comparison."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Weight"
          }],
          "max": 1,
          "heading": "Scales"
        },
        "narrows": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A sub-competency relationship which has relevance to this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Narrows"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["narrows"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "narrows", values);
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            function add(_x, _x2) {
              return _add.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee2(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return me.removeRelationFromFramework(source, "narrows", target);
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            function remove(_x3, _x4) {
              return _remove.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "broadens": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Covers other relevant competencies not found in this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Broadens"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["broadens"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee3(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "broadens", values);
                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            function add(_x5, _x6) {
              return _add2.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee4(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return me.removeRelationFromFramework(source, "broadens", target);
                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            function remove(_x7, _x8) {
              return _remove2.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "isEquivalentTo": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Represents same capability in all aspects to another competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Equivalent To"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["isEquivalentTo"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee5(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values);
                  case 2:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            function add(_x9, _x10) {
              return _add3.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee6(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return me.removeRelationFromFramework(source, "isEquivalentTo", target);
                  case 2:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            function remove(_x11, _x12) {
              return _remove3.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "requires": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Another competency is prerequisite for this."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Requires"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["requires"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee7(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "requires", values);
                  case 2:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }));
            function add(_x13, _x14) {
              return _add4.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee8(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return me.removeRelationFromFramework(source, "requires", target);
                  case 2:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            function remove(_x15, _x16) {
              return _remove4.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "isEnabledBy": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "A recommended option that speeds up acquisition of this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Is Enabled By"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["isEnabledBy"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee9(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "isEnabledBy", values);
                  case 2:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }));
            function add(_x17, _x18) {
              return _add5.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee10(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return me.removeRelationFromFramework(source, "isEnabledBy", target);
                  case 2:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            function remove(_x19, _x20) {
              return _remove5.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "isRelatedTo": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "This competency has some degree of overlap with another."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Is Related To"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["isRelatedTo"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee11(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "isRelatedTo", values);
                  case 2:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11);
            }));
            function add(_x21, _x22) {
              return _add6.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee12(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.next = 2;
                    return me.removeRelationFromFramework(source, "isRelatedTo", target);
                  case 2:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12);
            }));
            function remove(_x23, _x24) {
              return _remove6.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "desires": {
          "http://schema.org/rangeIncludes": [{
            "@id": "https://schema.cassproject.org/0.4/Competency"
          }],
          "http://www.w3.org/2000/01/rdf-schema#comment": [{
            "@language": "en",
            "@value": "Recommended, assumed, or expected competency not essential to acquisition of this competency."
          }],
          "http://www.w3.org/2000/01/rdf-schema#label": [{
            "@language": "en",
            "@value": "Desires"
          }],
          "valuesIndexed": function valuesIndexed() {
            return me.relations["desires"];
          },
          "noTextEditing": "true",
          "add": function () {
            var _add7 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee13(selectedCompetency, values) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return me.addRelationsToFramework(selectedCompetency, "desires", values);
                  case 2:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13);
            }));
            function add(_x25, _x26) {
              return _add7.apply(this, arguments);
            }
            return add;
          }(),
          "save": function save() {},
          "remove": function () {
            var _remove7 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().mark(function _callee14(source, target) {
              return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().wrap(function _callee14$(_context14) {
                while (1) switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.next = 2;
                    return me.removeRelationFromFramework(source, "desires", target);
                  case 2:
                  case "end":
                    return _context14.stop();
                }
              }, _callee14);
            }));
            function remove(_x27, _x28) {
              return _remove7.apply(this, arguments);
            }
            return remove;
          }(),
          "heading": "Relations"
        },
        "headings": ["Keys", "General", "Context", "Tagging", "Scales", "Relations"],
        "primaryProperties": ["@id", "http://schema.org/name", "http://schema.org/description"],
        "secondaryProperties": ["https://schema.cassproject.org/0.4/scope", "https://schema.cassproject.org/0.4/Level", "http://purl.org/dc/terms/type", "https://purl.org/ctdlasn/terms/educationLevelType", "https://purl.org/ctdlasn/terms/listID", "https://purl.org/ctdlasn/terms/codedNotation", "https://purl.org/ctdlasn/terms/derivedFrom", "http://schema.org/identifier", "http://schema.org/keywords", "https://purl.org/ctdlasn/terms/conceptTerm", "https://purl.org/ctdlasn/terms/complexityLevel", "https://purl.org/ctdlasn/terms/weight"],
        "tertiaryProperties": ["narrows", "broadens", "isEquivalentTo", "requires", "isEnabledBy", "isRelatedTo", "desires"]
      };
    }
  }
});

/***/ })

}]);
//# sourceMappingURL=chunk-2d21ecda.9a480e8e.js.map