export default {
    computed: {
        ctdlAsnFrameworkProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Canonical URL"}],
                    "noTextEditing": true,
                    "max": 1
                },
                "registryURL": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Credential Registry URL"}],
                    "noTextEditing": true,
                    "valuesIndexed": function() { return me.registryURLs; },
                    "thingKey": "registryURL",
                    "max": 1
                },
                "ctid": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "CTID"}],
                    "noTextEditing": true,
                    "valuesIndexed": function() { return me.ctids; },
                    "thingKey": "ctid",
                    "max": 1
                },
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name or title of this competency framework. One name or title per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name*"}],
                    "required": true,
                    "onePerLanguage": true
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A short description of this framework. One description per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}],
                    "onePerLanguage": true
                },
                "http://schema.org/creator": {
                    "@id": "http://schema.org/creator",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value": `The primary entity responsible for making this competency or competency framework. For example: 
                            https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/. One entity per line.`}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Creator"}],
                    "thingKey": "schema:creator"
                },
                "https://purl.org/ctdlasn/terms/publisherName": {
                    "@id": "https://purl.org/ctdlasn/terms/publisherName",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Name of the agent responsible for making this entity available."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publisher Name"}],
                    "thingKey": "ceasn:publisherName"
                },
                "http://schema.org/publisher": {
                    "@id": "http://schema.org/publisher",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The entity responsible for making this competency framework available. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publisher"}],
                    "thingKey": "schema:publisher"
                },
                "http://schema.org/inLanguage": {
                    "@id": "http://schema.org/publisher",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The primary language used in or by this competency framework or competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "In Language*"}],
                    "required": true,
                    "thingKey": "schema:inLanguage"
                },
                "http://schema.org/keywords": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptKeyword",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual frameworks contextually. One concept per line."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Keyword"}],
                    "thingKey": "schema:keywords"
                },
                "https://purl.org/ctdlasn/terms/conceptTerm": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Term"}],
                    "thingKey": "ceasn:conceptTerm",
                    "iframePath": me.$store.state.editor.iframeConceptPath,
                    "iframeText": "Select concepts to attach..."
                },
                "https://purl.org/ctdlasn/terms/derivedFrom": {
                    "@id": "https://purl.org/ctdlasn/terms/derivedFrom",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value": `A third party version of the entity being referenced that has been modified in meaning through editing, extension, or refinement.
                            For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.`}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Derived From"}],
                    "thingKey": "ceasn:derivedFrom",
                    "max": 1
                },
                "https://purl.org/ctdlasn/terms/isVersionOf": {
                    "@id": "https://purl.org/ctdlasn/terms/isVersionOf",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A related competency framework of which this competency framework is a version, edition, or adaptation."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Version Of"}],
                    "thingKey": "ceasn:isVersionOf",
                    "max": 1
                },
                "http://purl.org/dc/elements/1.1/source": {
                    "@id": "http://purl.org/dc/elements/1.1/source",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value": `A URI to the original competency framework which this competency framework is based on or derived from.
                            For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.`}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Source Framework"}],
                    "thingKey": "dc:source"
                },
                "https://purl.org/ctdlasn/terms/educationLevelType": {
                    "@id": "https://purl.org/ctdlasn/terms/educationLevelType",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [
                            {"@language": "en",
                                "@value": `A general statement describing the education or training context.
                                Alternatively, a more specific statement of the location of the audience in terms of its progression through an education or training context.`}
                        ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Education Level Type"}],
                    "thingKey": "ceasn:educationLevelType",
                    "iframePath": me.$store.state.editor.iframeConceptPath,
                    "iframeText": "Select concepts to attach..."
                },
                "http://schema.org/validFrom": {
                    "@id": "https://purl.org/ctdlasn/terms/validFrom",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2001/XMLSchema#dateTime"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Beginning date of validity of this competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Date Valid From"}],
                    "max": 1
                },
                "http://schema.org/validThrough": {
                    "@id": "https://purl.org/ctdlasn/terms/validThrough",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2001/XMLSchema#dateTime"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "End date of validity of this competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Date Valid Until"}],
                    "max": 1
                },
                "https://purl.org/ctdlasn/terms/publicationStatusType": {
                    "@id": "https://purl.org/ctdlasn/terms/publicationStatusType",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Publication status of the source competency framework. The original framework may be drafted, published, or depreciated outside of this system."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Source Publication Status"}],
                    "thingKey": "ceasn:publicationStatusType",
                    "options": {"Draft": "http://credreg.net/ctdlasn/vocabs/publicationStatus/Draft",
                        "Published": "http://credreg.net/ctdlasn/vocabs/publicationStatus/Published",
                        "Deprecated": "http://credreg.net/ctdlasn/vocabs/publicationStatus/Deprecated"},
                    "max": 1
                },
                "http://schema.org/identifier": {
                    "@id": "http://schema.org/identifier",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An alternative URI by which this competency or competency framework is identified. For example, https://sandbox.credentialengineregistry.org/."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Identifier"}],
                    "thingKey": "schema:identifier"
                },
                "http://schema.org/copyrightYear": {
                    "@id": "http://schema.org/copyrightYear",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://purl.org/dc/terms/date"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Year of a statement of copyright for this competency framework, such as 2017."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Year Copyrighted"}],
                    "thingKey": "schema:copyrightYear",
                    "max": 1
                },
                "http://schema.org/license": {
                    "@id": "http://schema.org/license",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A legal document giving official permission to do something with this competency framework. For example, https://sandbox.credentialengineregistry.org/"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "License"}],
                    "thingKey": "schema:license",
                    "max": 1
                },
                "http://purl.org/dc/elements/1.1/rights": {
                    "@id": "http://purl.org/dc/elements/1.1/rights",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Information about rights held in and over this competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rights"}],
                    "thingKey": "dc:rights",
                    "max": 1
                },
                "http://schema.org/copyrightHolder": {
                    "@id": "http://schema.org/copyrightHolder",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The agent owning or managing rights over this competency framework. For example, https://credentialengineregistry.org/"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rights Holder"}],
                    "thingKey": "schema:copyrightHolder",
                    "max": 1
                }
            };
        },
        ctdlAsnCompetencyProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Canonical URL"}],
                    "noTextEditing": true,
                    "max": 1
                },
                "registryURL": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Credential Registry URL"}],
                    "noTextEditing": true,
                    "valuesIndexed": function() { return me.registryURLs; },
                    "thingKey": "registryURL",
                    "max": 1
                },
                "ctid": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "CTID"}],
                    "noTextEditing": true,
                    "valuesIndexed": function() { return me.ctids; },
                    "thingKey": "ctid",
                    "max": 1
                },
                "https://purl.org/ctdlasn/terms/competencyLabel": {
                    "@id": "https://purl.org/ctdlasn/terms/competencyLabel",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Short identifying phrase or name applied to a competency by the creator of the competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Competency Label"}],
                    "thingKey": "ceasn:competencyLabel",
                    "onePerLanguage": true
                },
                "http://schema.org/name": {
                    "@id": "https://purl.org/ctdlasn/terms/competencyText",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The text of the competency. One per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Competency Text*"}],
                    "required": true,
                    "onePerLanguage": true
                },
                "http://schema.org/description": {
                    "@id": "https://purl.org/ctdlasn/terms/comment",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Supplemental text provided by the promulgating body that clarifies the nature, scope or use of this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Comment"}]
                },
                "http://purl.org/dc/terms/type": {
                    "@id": "https://purl.org/ctdlasn/terms/competencyCategory",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The textual label identifying the category of the competency as designated by the promulgating body. One label per line. One label per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Competency Category"}],
                    "thingKey": "dcterms:type",
                    "onePerLanguage": true
                },
                "https://purl.org/ctdlasn/terms/educationLevelType": {
                    "@id": "https://purl.org/ctdlasn/terms/educationLevelType",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [
                            {"@language": "en",
                                "@value":
                                `A general statement describing the education or training context. Alternatively, a more specific statement of the location of the audience in terms of its progression 
                                through an education or training context.`}
                        ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Education Level"}],
                    "thingKey": "ceasn:educationLevelType",
                    "iframePath": me.$store.state.editor.iframeConceptPath,
                    "iframeText": "Select concepts to attach..."
                },
                "https://purl.org/ctdlasn/terms/listId": {
                    "@id": "https://purl.org/ctdlasn/terms/listID",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An alphanumeric string indicating this competency's position in a list of competencies at the same level in some arbitrary hierarchy."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "List ID"}],
                    "thingKey": "ceasn:listID",
                    "max": 1
                },
                "https://purl.org/ctdlasn/terms/codedNotation": {
                    "@id": "https://purl.org/ctdlasn/terms/codedNotation",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An alphanumeric notation or ID code identifying this competency in common use among end-users."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Coded Notation"}],
                    "thingKey": "ceasn:codedNotation",
                    "max": 1
                },
                "https://purl.org/ctdlasn/terms/derivedFrom": {
                    "@id": "https://purl.org/ctdlasn/terms/derivedFrom",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value":
                            "The URI of a competency from which this competency has been derived. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.  One entity per line."}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Derivative Of"}],
                    "thingKey": "ceasn:derivedFrom",
                    "max": 1
                },
                "http://schema.org/identifier": {
                    "@id": "https://purl.org/ctdlasn/terms/identifier",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An alternative URI by which this competency framework or competency is identified. For example, https://sandbox.credentialengineregistry.org/. One URI per line."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Identifier"}],
                    "thingKey": "schema:identifier"
                },
                "http://schema.org/keywords": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptKeyword",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual competencies contextually. One concept per line."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Keyword"}],
                    "thingKey": "schema:keywords"
                },
                "https://purl.org/ctdlasn/terms/conceptTerm": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Term"}],
                    "thingKey": "ceasn:conceptTerm",
                    "iframePath": me.$store.state.editor.iframeConceptPath,
                    "iframeText": "Select concepts to attach..."
                },
                "https://purl.org/ctdlasn/terms/complexityLevel": {
                    "@id": "https://purl.org/ctdlasn/terms/complexityLevel",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "The expected performance level of a learner or professional as defined by a competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Complexity Level"}],
                    "thingKey": "ceasn:complexityLevel",
                    "iframePath": me.$store.state.editor.iframeConceptPath,
                    "iframeText": "Select concepts to attach..."
                },
                "https://purl.org/ctdlasn/terms/weight": {
                    "@id": "https://purl.org/ctdlasn/terms/weight",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An asserted measurement of the weight, degree, percent, or strength of a recommendation, requirement, or comparison."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Weight"}],
                    "thingKey": "ceasn:weight",
                    "max": 1
                },
                "hasChild": {
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The referenced competency is lower in some arbitrary hierarchy than this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Has Child"}],
                    "valuesIndexed": function() { return me.relations["hasChild"]; },
                    "noTextEditing": true,
                    "noEditing": true
                },
                "isChildOf": {
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The referenced competency is higher in some arbitrary hierarchy than this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Child Of"}],
                    "valuesIndexed": function() { return me.relations["isChildOf"]; },
                    "noTextEditing": true,
                    "noEditing": true
                },
                "narrows": {
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Covers all of the relevant concepts in the referenced competency as well as relevant concepts not found in the referenced competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Broad Alignment"}],
                    "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                    "iframeText": "Select competencies to align...",
                    "valuesIndexed": function() { return me.relations["narrows"]; },
                    "noTextEditing": true,
                    "add": "unsaved",
                    "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "narrows", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "narrows", target); }
                },
                "broadens": {
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Covers all of the relevant concepts in this competency as well as relevant concepts not found in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Narrow Alignment"}],
                    "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                    "iframeText": "Select competencies to align...",
                    "valuesIndexed": function() { return me.relations["broadens"]; },
                    "noTextEditing": true,
                    "add": "unsaved",
                    "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "broadens", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "broadens", target); }
                },
                "isEquivalentTo": {
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Relevant concepts in this competency and the referenced competency are coextensive."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Exact Alignment"}],
                    "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                    "iframeText": "Select competencies to align...",
                    "valuesIndexed": function() { return me.relations["isEquivalentTo"]; },
                    "noTextEditing": true,
                    "add": "unsaved",
                    "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "isEquivalentTo", target); }
                },
                "majorRelated": {
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Major overlap of relevant concepts between this competency and the referenced competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Major Alignment"}],
                    "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                    "iframeText": "Select competencies to align...",
                    "valuesIndexed": function() { return me.relations["majorRelated"]; },
                    "noTextEditing": true,
                    "add": "unsaved",
                    "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "majorRelated", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "majorRelated", target); }
                },
                "minorRelated": {
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Minor overlap of relevant concepts between this competency and the referenced competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Minor Alignment"}],
                    "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                    "iframeText": "Select competencies to align...",
                    "valuesIndexed": function() { return me.relations["minorRelated"]; },
                    "noTextEditing": true,
                    "add": "unsaved",
                    "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "minorRelated", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "minorRelated", target); }
                },
                "requires": {
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "This competency is a prerequisite to the referenced competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Prerequisite Alignment"}],
                    "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                    "iframeText": "Select competencies to align...",
                    "valuesIndexed": function() { return me.relations["requires"]; },
                    "noTextEditing": true,
                    "add": "unsaved",
                    "save": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "requires", values); },
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "requires", target); }
                },
                "https://purl.org/ctdlasn/terms/abilityEmbodied": {
                    "@id": "https://purl.org/ctdlasn/terms/abilityEmbodied",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Enduring attributes of the individual that influence performance are embodied either directly or indirectly in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Ability Embodied"}],
                    "iframePath": me.$store.state.editor.iframeCompetencyPathIntraframework,
                    "iframeText": "Select competencies to align...",
                    "thingKey": "ceasn:abilityEmbodied"
                },
                "https://purl.org/ctdlasn/terms/knowledgeEmbodied": {
                    "@id": "https://purl.org/ctdlasn/terms/knowledgeEmbodied",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Body of information embodied either directly or indirectly in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Knowledge Embodied"}],
                    "iframePath": me.$store.state.editor.iframeCompetencyPathIntraframework,
                    "iframeText": "Select competencies to align...",
                    "thingKey": "ceasn:knowledgeEmbodied"
                },
                "https://purl.org/ctdlasn/terms/skillEmbodied": {
                    "@id": "https://purl.org/ctdlasn/terms/skillEmbodied",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Cognitive, affective, and psychomotor skills directly or indirectly embodied in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Skill Embodied"}],
                    "iframePath": me.$store.state.editor.iframeCompetencyPathIntraframework,
                    "iframeText": "Select competencies to align...",
                    "thingKey": "ceasn:skillEmbodied"
                },
                "https://purl.org/ctdlasn/terms/taskEmbodied": {
                    "@id": "https://purl.org/ctdlasn/terms/taskEmbodied",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Specifically defined piece of work embodied either directly or indirectly in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Task Embodied"}],
                    "iframePath": me.$store.state.editor.iframeCompetencyPathIntraframework,
                    "iframeText": "Select competencies to align...",
                    "thingKey": "ceasn:taskEmbodied"
                }
            };
        }
    }
};