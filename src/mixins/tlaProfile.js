export default {
    computed: {
        tlaFrameworkProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Framework/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Framework URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name of the framework. One name per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Framework Name"}],
                    "heading": "General",
                    "onePerLanguage": "true"
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The description of the framework. One description per language"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}],
                    "heading": "General",
                    "onePerLanguage": "true"
                },
                "http://schema.org/creator": {
                    "@id": "http://schema.org/creator",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value": `The primary entity responsible for making this competency or competency framework. For example: 
                            https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/. One entity per line.`}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Creator"}],
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/publisherName": {
                    "@id": "https://purl.org/ctdlasn/terms/publisherName",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Name of the agent responsible for making this entity available."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publisher Name"}],
                    "heading": "General"
                },
                "http://schema.org/publisher": {
                    "@id": "http://schema.org/publisher",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The entity responsible for making this competency framework available. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publisher"}],
                    "heading": "General"
                },
                "http://schema.org/inLanguage": {
                    "@id": "http://schema.org/inLanguage",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The primary language used in or by this competency framework or competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "In Language"}],
                    "heading": "General"
                },
                "http://schema.org/keywords": {
                    "@id": "http://schema.org/keywords",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual frameworks contextually. One concept per line."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Keywords"}],
                    "heading": "Tagging"
                },
                "https://purl.org/ctdlasn/terms/conceptTerm": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Terms"}],
                    "heading": "Tagging"
                },
                "https://purl.org/ctdlasn/terms/derivedFrom": {
                    "@id": "https://purl.org/ctdlasn/terms/derivedFrom",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value": `A third party version of the entity being referenced that has been modified in meaning through editing, extension, or refinement.
                            For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.`}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Derived From"}],
                    "max": 1,
                    "heading": "Connections"
                },
                "https://purl.org/ctdlasn/terms/isVersionOf": {
                    "@id": "https://purl.org/ctdlasn/terms/isVersionOf",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A related competency framework of which this competency framework is a version, edition, or adaptation."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Version Of"}],
                    "max": 1,
                    "heading": "Connections"
                },
                "http://purl.org/dc/elements/1.1/source": {
                    "@id": "http://purl.org/dc/elements/1.1/source",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value": `A URI to the original competency framework which this competency framework is based on or derived from.
                            For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.`}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Source"}],
                    "heading": "Connections"
                },
                "https://purl.org/ctdlasn/terms/educationLevelType": {
                    "@id": "https://purl.org/ctdlasn/terms/educationLevelType",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [
                            {"@language": "en",
                                "@value": `A general statement describing the education or training context.
                                Alternatively, a more specific statement of the location of the audience in terms of its progression through an education or training context.`}
                        ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Education Level Type"}],
                    "heading": "Context"
                },
                "http://schema.org/validFrom": {
                    "@id": "http://schema.org/validFrom",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2001/XMLSchema#dateTime"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Beginning date of validity of this competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Valid From"}],
                    "max": 1,
                    "heading": "Context"
                },
                "http://schema.org/validThrough": {
                    "@id": "http://schema.org/validThrough",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2001/XMLSchema#dateTime"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "End date of validity of this competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Valid Until"}],
                    "max": 1,
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/publicationStatusType": {
                    "@id": "https://purl.org/ctdlasn/terms/publicationStatusType",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Publication status of the source competency framework. The original framework may be drafted, published, or depreciated outside of this system."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publication Status"}],
                    "options": [
                        {display: "Draft", val: "http://credreg.net/ctdlasn/vocabs/publicationStatus/Draft"},
                        {display: "Published", val: "http://credreg.net/ctdlasn/vocabs/publicationStatus/Published"},
                        {display: "Deprecated", val: "http://credreg.net/ctdlasn/vocabs/publicationStatus/Deprecated"}
                    ],
                    "max": 1,
                    "heading": "Context"
                },
                "http://schema.org/identifier": {
                    "@id": "http://schema.org/identifier",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An alternative URI by which this competency or competency framework is identified. For example, https://sandbox.credentialengineregistry.org/."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Identifier"}],
                    "heading": "Context"
                },
                "http://schema.org/copyrightYear": {
                    "@id": "http://schema.org/copyrightYear",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://purl.org/dc/terms/date"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Year of a statement of copyright for this competency framework, such as 2017."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Year Copyrighted"}],
                    "max": 1,
                    "heading": "Rights"
                },
                "http://schema.org/license": {
                    "@id": "http://schema.org/license",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A legal document giving official permission to do something with this competency framework. For example, https://sandbox.credentialengineregistry.org/"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "License"}],
                    "max": 1,
                    "heading": "Rights"
                },
                "http://purl.org/dc/elements/1.1/rights": {
                    "@id": "http://purl.org/dc/elements/1.1/rights",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Information about rights held in and over this competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rights"}],
                    "max": 1,
                    "heading": "Rights"
                },
                "http://schema.org/copyrightHolder": {
                    "@id": "http://schema.org/copyrightHolder",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The agent owning or managing rights over this competency framework. For example, https://credentialengineregistry.org/"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rights Holder"}],
                    "max": 1,
                    "heading": "Rights"
                },
                "headings": ["Keys", "General", "Tagging", "Connections", "Context", "Rights"]
            };
        },
        tlaCompetencyProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name of the competency. One name per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "heading": "General",
                    "onePerLanguage": "true"
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The description of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}],
                    "heading": "General"
                },
                "https://schema.cassproject.org/0.4/scope": {
                    "@id": "https://schema.cassproject.org/0.4/scope",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The scope of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Scope"}],
                    "heading": "General"
                },
                "https://schema.cassproject.org/0.4/Level": {
                    "@id": "https://schema.cassproject.org/0.4/Level",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value":
                    "When an individual's performance in a competency can be measured, a level specifies milestones that an individual can reach, creating fine-grained distinction between the proficient and the adept."}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Level"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                    "valuesIndexed": function() { return me.levels; },
                    "noTextEditing": "true",
                    "add": function(selectedCompetency) { me.addLevel(selectedCompetency); },
                    "remove": function(competency, levelId) { me.removeLevelFromFramework(levelId); },
                    "save": function() { me.saveFramework(); },
                    "heading": "General"
                },
                "http://purl.org/dc/terms/type": {
                    "@id": "http://purl.org/dc/terms/type",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The textual label identifying the category of the competency as designated by the promulgating body. One label per line. One label per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Type"}],
                    "onePerLanguage": "true",
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/educationLevelType": {
                    "@id": "https://purl.org/ctdlasn/terms/educationLevelType",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [
                            {"@language": "en",
                                "@value":
                                `A general statement describing the education or training context. Alternatively, a more specific statement of the location of the audience in terms of its progression 
                                through an education or training context.`}
                        ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Education Level"}],
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/listId": {
                    "@id": "https://purl.org/ctdlasn/terms/listID",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An alphanumeric string indicating this competency's position in a list of competencies at the same level in some arbitrary hierarchy."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "List ID"}],
                    "max": 1,
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/codedNotation": {
                    "@id": "https://purl.org/ctdlasn/terms/codedNotation",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An alphanumeric notation or ID code identifying this competency in common use among end-users."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Coded Notation"}],
                    "max": 1,
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/derivedFrom": {
                    "@id": "https://purl.org/ctdlasn/terms/derivedFrom",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value":
                            "The URI of a competency from which this competency has been derived. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.  One entity per line."}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Derived From"}],
                    "max": 1,
                    "heading": "Context"
                },
                "http://schema.org/identifier": {
                    "@id": "http://schema.org/identifier",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An alternative URI by which this competency framework or competency is identified. For example, https://sandbox.credentialengineregistry.org/. One URI per line."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Identifier"}],
                    "heading": "Context"
                },
                "http://schema.org/keywords": {
                    "@id": "http://schema.org/keywords",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual competencies contextually. One concept per line."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Keywords"}],
                    "heading": "Tagging"
                },
                "https://purl.org/ctdlasn/terms/conceptTerm": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Terms"}],
                    "heading": "Tagging"
                },
                "https://purl.org/ctdlasn/terms/complexityLevel": {
                    "@id": "https://purl.org/ctdlasn/terms/complexityLevel",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "The expected performance level of a learner or professional as defined by a competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Complexity Level"}],
                    "heading": "Scales"
                },
                "https://purl.org/ctdlasn/terms/weight": {
                    "@id": "https://purl.org/ctdlasn/terms/weight",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An asserted measurement of the weight, degree, percent, or strength of a recommendation, requirement, or comparison."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Weight"}],
                    "max": 1,
                    "heading": "Scales"
                },
                "narrows": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A sub-competency relationship which has relevance to this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Narrows"}],
                    "valuesIndexed": function() { return me.relations["narrows"]; },
                    "noTextEditing": "true",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "narrows", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "narrows", target); },
                    "heading": "Connections"
                },
                "broadens": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Covers other relevant competencies not found in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Broadens"}],
                    "valuesIndexed": function() { return me.relations["broadens"]; },
                    "noTextEditing": "true",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "broadens", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "broadens", target); },
                    "heading": "Connections"
                },
                "isEquivalentTo": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Represents same capability in all aspects to another competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Equivalent To"}],
                    "valuesIndexed": function() { return me.relations["isEquivalentTo"]; },
                    "noTextEditing": "true",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "isEquivalentTo", target); },
                    "heading": "Connections"
                },
                "requires": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Another competency is prerequisite for this."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Requires"}],
                    "valuesIndexed": function() { return me.relations["requires"]; },
                    "noTextEditing": "true",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "requires", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "requires", target); },
                    "heading": "Connections"
                },
                "isEnabledBy": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A recommended option that speeds up acquisition of this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Enabled By"}],
                    "valuesIndexed": function() { return me.relations["isEnabledBy"]; },
                    "noTextEditing": "true",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEnabledBy", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "isEnabledBy", target); },
                    "heading": "Connections"
                },
                "isRelatedTo": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "This competency has some degree of overlap with another."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Related To"}],
                    "valuesIndexed": function() { return me.relations["isRelatedTo"]; },
                    "noTextEditing": "true",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isRelatedTo", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "isRelatedTo", target); },
                    "heading": "Connections"
                },
                "desires": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Recommended, assumed, or expected competency not essential to acquisition of this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Desires"}],
                    "valuesIndexed": function() { return me.relations["desires"]; },
                    "noTextEditing": "true",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "desires", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "desires", target); },
                    "heading": "Connections"
                },
                "headings": ["Keys", "General", "Context", "Tagging", "Scales", "Connections"]
            };
        }
    }
};