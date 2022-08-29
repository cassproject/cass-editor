export default {
    computed: {
        ctdlAsnFrameworkProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Framework/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the framework. If imported from another source, the URL of the framework from which this one originates."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Canonical URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "registryURL": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The Credential Registry URL of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Credential Registry URL"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.registryURLs; },
                    "max": 1,
                    "heading": "Keys"
                },
                "ctid": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The CTID of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "CTID"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.ctids; },
                    "max": 1,
                    "heading": "Keys"
                },
                "http://schema.org/name": {
                    "@id": "https://purl.org/ctdlasn/terms/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name or title of this competency framework. One name or title per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "isRequired": "true",
                    "onePerLanguage": "true",
                    "heading": "General"
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A short description of this framework. One description per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}],
                    "onePerLanguage": "true",
                    "isRequired": "true",
                    "heading": "General"
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
                    "isRequired": "true",
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/author": {
                    "@id": "https://purl.org/ctdlasn/terms/author",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A person or organization chiefly responsible for the intellectual or artistic content of this competency framework or competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Author"}],
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
                    "isRequired": "true",
                    "heading": "General"
                },
                "http://schema.org/keywords": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptKeyword",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual frameworks contextually. One concept per line."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Keyword"}],
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
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Term"}],
                    "noTextEditing": "true",
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
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Source Framework"}],
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
                    "noTextEditing": "true",
                    "heading": "Context"
                },
                "http://schema.org/validFrom": {
                    "@id": "https://purl.org/ctdlasn/terms/validFrom",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2001/XMLSchema#dateTime"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Beginning date of validity of this competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Date Valid From"}],
                    "max": 1,
                    "heading": "Context"
                },
                "http://schema.org/validThrough": {
                    "@id": "https://purl.org/ctdlasn/terms/validThrough",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2001/XMLSchema#dateTime"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "End date of validity of this competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Date Valid Until"}],
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
                        {display: "Draft", val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Draft"},
                        {display: "Published", val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Published"},
                        {display: "Deprecated", val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Deprecated"}
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
                    [{"@language": "en", "@value": "Date of a statement of copyright for this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Date Copyrighted"}],
                    "heading": "Rights",
                    "max": 1
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
                "https://schema.cassproject.org/0.4/socList": {
                    "@id": "https://schema.cassproject.org/0.4/socList",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of occupation; select from an existing enumeration of such types. See https://www.bls.gov/soc/."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Occupation Type"}],
                    "heading": "General"
                },
                "https://schema.cassproject.org/0.4/naicsList": {
                    "@id": "https://schema.cassproject.org/0.4/naicsList",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of industry; select from an existing enumeration of such types such as the SIC, NAICS, and ISIC classifications. See https://www.naics.com/search/."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Industry Type"}],
                    "heading": "General"
                },
                "https://schema.cassproject.org/0.4/cipList": {
                    "@id": "https://schema.cassproject.org/0.4/cipList",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of instructional program; select from an existing enumeration of such types. See https://nces.ed.gov/ipeds/cipcode."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Instructional Program Type"}],
                    "heading": "Tagging"
                },
                "https://purl.org/ctdlasn/terms/localSubject": {
                    "@id": "https://purl.org/ctdlasn/terms/localSubject",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The text string denoting the subject of the competency framework or competency as designated by the promulgating agency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Local Subject"}],
                    "heading": "Tagging"
                },
                "http://purl.org/ASN/schema/core/hasProgressionModel": {
                    "@id": "http://purl.org/ASN/schema/core/hasProgressionModel",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Reference to a progression model used."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Has Progression Model"}],
                    "max": 1,
                    "heading": "Connections"
                },
                "headings": ["General", "Tagging", "Connections", "Context", "Rights", "Keys"],
                "primaryProperties": [
                    "http://schema.org/name",
                    "http://schema.org/description"
                ],
                "secondaryProperties": [
                    "http://schema.org/creator",
                    "https://purl.org/ctdlasn/terms/publisherName",
                    "http://schema.org/publisher",
                    "http://schema.org/inLanguage",
                    "http://schema.org/keywords",
                    "https://purl.org/ctdlasn/terms/conceptTerm",
                    "https://purl.org/ctdlasn/terms/derivedFrom",
                    "http://purl.org/dc/elements/1.1/source",
                    "https://purl.org/ctdlasn/terms/educationLevelType",
                    "https://schema.cassproject.org/0.4/socList",
                    "https://schema.cassproject.org/0.4/naicsList",
                    "http://purl.org/ASN/schema/core/hasProgressionModel"
                ],
                "tertiaryProperties": [
                    "@id",
                    "registryURL",
                    "ctid",
                    "http://schema.org/validFrom",
                    "http://schema.org/validThrough",
                    "https://purl.org/ctdlasn/terms/publicationStatusType",
                    "http://schema.org/identifier",
                    "http://schema.org/copyrightYear",
                    "http://schema.org/license",
                    "http://purl.org/dc/elements/1.1/rights",
                    "http://schema.org/copyrightHolder",
                    "https://purl.org/ctdlasn/terms/author",
                    "https://purl.org/ctdlasn/terms/localSubject",
                    "https://schema.cassproject.org/0.4/cipList"
                ]
            };
        },
        ctdlAsnCollectionProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Framework/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the collection. If imported from another source, the URL of the collection from which this one originates."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Canonical URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "registryURL": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The Credential Registry URL of the collection."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Credential Registry URL"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.registryURLs; },
                    "max": 1,
                    "heading": "Keys"
                },
                "ctid": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The CTID of the collection."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "CTID"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.ctids; },
                    "max": 1,
                    "heading": "Keys"
                },
                "http://schema.org/name": {
                    "@id": "https://purl.org/ctdl/terms/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name or title of this competency collection. One name or title per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "isRequired": "true",
                    "onePerLanguage": "true",
                    "heading": "General"
                },
                "http://schema.org/description": {
                    "@id": "https://purl.org/ctdl/terms/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A short description of this collection. One description per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}],
                    "onePerLanguage": "true",
                    "isRequired": "true",
                    "heading": "General"
                },
                "https://purl.org/ctdl/terms/ownedBy": {
                    "@id": "https://purl.org/ctdl/terms/ownedBy",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Organization or person with an enforceable claim or legal title to the resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Owned By"}],
                    "heading": "General",
                    "isRequired": "true"
                },
                "http://schema.org/license": {
                    "@id": "https://purl.org/ctdlasn/terms/license",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A legal document giving official permission to do something with this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "License"}],
                    "max": 1,
                    "heading": "General"
                },
                "https://purl.org/ctdl/terms/classification": {
                    "@id": "https://purl.org/ctdl/terms/classification",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Category or classification of this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Classification"}],
                    "noTextEditing": "true",
                    "heading": "General"
                },
                "https://purl.org/ctdl/terms/codedNotation": {
                    "@id": "https://purl.org/ctdl/terms/codedNotation",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Set of alpha-numeric symbols as defined by the body responsible for this resource that uniquely identifies this resource and supports its discovery and use."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Coded Notation"}],
                    "max": 1,
                    "heading": "General"
                },
                "https://purl.org/ctdl/terms/dateEffective": {
                    "@id": "https://purl.org/ctdl/terms/dateEffective",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2001/XMLSchema#date"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Effective date of the content of a credential, assessment or learning opportunity."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Date Effective"}],
                    "max": 1,
                    "heading": "General"
                },
                "https://purl.org/ctdl/terms/expirationDate": {
                    "@id": "https://purl.org/ctdl/terms/expirationDate",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2001/XMLSchema#date"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Date beyond which the resource is no longer offered or available."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Expiration Date"}],
                    "max": 1,
                    "heading": "General"
                },
                "https://schema.cassproject.org/0.4/socList": {
                    "@id": "https://schema.cassproject.org/0.4/socList",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of occupation; select from an existing enumeration of such types. See https://www.bls.gov/soc/."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Occupation Type"}],
                    "heading": "Tagging"
                },
                "https://schema.cassproject.org/0.4/naicsList": {
                    "@id": "https://schema.cassproject.org/0.4/naicsList",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of industry; select from an existing enumeration of such types such as the SIC, NAICS, and ISIC classifications. See https://www.naics.com/search/."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Industry Type"}],
                    "heading": "Tagging"
                },
                "https://schema.cassproject.org/0.4/cipList": {
                    "@id": "https://schema.cassproject.org/0.4/cipList",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of instructional program; select from an existing enumeration of such types. See https://nces.ed.gov/ipeds/cipcode."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Instructional Program Type"}],
                    "heading": "Tagging"
                },
                "http://schema.org/inLanguage": {
                    "@id": "https://purl.org/ctdl/terms/inLanguage",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The primary language or languages of the entity, even if it makes use of other languages; e.g., a course offered in English to teach Spanish would have an inLanguage of English, while a credential in Quebec could have an inLanguage of both French and English."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "In Language"}],
                    "heading": "General"
                },
                "http://schema.org/keywords": {
                    "@id": "https://purl.org/ctdl/terms/keyword",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Keyword or key phrase describing relevant aspects of an entity."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Keyword"}],
                    "heading": "Tagging"
                },
                "https://purl.org/ctdl/terms/subject": {
                    "@id": "https://purl.org/ctdl/terms/subject",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Words or brief phrases describing the topicality of the entity; select subject terms from an existing enumeration of such terms."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Subject"}],
                    "heading": "Tagging"
                },
                "https://purl.org/ctdl/terms/subjectWebpage": {
                    "@id": "https://purl.org/ctdl/terms/subjectWebpage",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Webpage that describes this entity."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Subject Webpage"}],
                    "max": 1,
                    "heading": "General"
                },
                "headings": ["General", "Tagging", "Keys"],
                "primaryProperties": [
                    "http://schema.org/name",
                    "http://schema.org/description",
                    "http://schema.org/license",
                    "https://purl.org/ctdl/terms/codedNotation",
                    "https://purl.org/ctdl/terms/dateEffective",
                    "https://purl.org/ctdl/terms/expirationDate",
                    "http://schema.org/inLanguage",
                    "https://purl.org/ctdl/terms/subjectWebpage"
                ],
                "secondaryProperties": [
                    "https://purl.org/ctdl/terms/classification",
                    "https://schema.cassproject.org/0.4/socList",
                    "https://schema.cassproject.org/0.4/naicsList",
                    "https://schema.cassproject.org/0.4/cipList",
                    "http://schema.org/keywords",
                    "https://purl.org/ctdl/terms/ownedBy",
                    "https://purl.org/ctdl/terms/subject"
                ],
                "tertiaryProperties": [
                    "@id",
                    "registryURL",
                    "ctid"
                ]
            };
        },
        ctdlAsnCompetencyProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency. If imported from another source, the URL of the competency from which this one originates."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Canonical URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "registryURL": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The Credential Registry URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Credential Registry URL"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.registryURLs; },
                    "max": 1,
                    "heading": "Keys"
                },
                "ctid": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The CTID of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "CTID"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.ctids; },
                    "max": 1,
                    "heading": "Keys"
                },
                "https://purl.org/ctdlasn/terms/competencyLabel": {
                    "@id": "https://purl.org/ctdlasn/terms/competencyLabel",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Short identifying phrase or name applied to a competency by the creator of the competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Competency Label"}],
                    "onePerLanguage": "true",
                    "heading": "General"
                },
                "http://schema.org/name": {
                    "@id": "https://purl.org/ctdlasn/terms/competencyText",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The text of the competency. One per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Competency Text"}],
                    "isRequired": "true",
                    "onePerLanguage": "true",
                    "heading": "General"
                },
                "http://schema.org/description": {
                    "@id": "https://purl.org/ctdlasn/terms/comment",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Supplemental text provided by the promulgating body that clarifies the nature, scope or use of this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Comment"}],
                    "heading": "General"
                },
                "http://purl.org/dc/terms/type": {
                    "@id": "https://purl.org/ctdlasn/terms/competencyCategory",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The textual label identifying the category of the competency as designated by the promulgating body. One label per line. One label per language."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Competency Category"}],
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
                    "noTextEditing": "true",
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/listID": {
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
                "https://purl.org/ctdlasn/terms/altCodedNotation": {
                    "@id": "https://purl.org/ctdlasn/terms/altCodedNotation",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An alphanumeric notation or ID code identifying this competency in common use among end-users."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Alternative Coded Notation"}],
                    "max": 1,
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/comprisedOf": {
                    "@id": "https://purl.org/ctdlasn/terms/comprisedOf",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "This competency includes, comprehends or encompasses, in whole or in part, the meaning, nature or importance of the referenced competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Comprised Of"}],
                    "heading": "Connections"
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
                            "@value": `A third party version of the entity being referenced that has been modified in meaning through editing, extension, or refinement.
                            For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.`}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Derived From"}],
                    "max": 1,
                    "heading": "Connections"
                },
                "http://schema.org/identifier": {
                    "@id": "https://purl.org/ctdlasn/terms/identifier",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "An alternative URI by which this competency framework or competency is identified. For example, https://sandbox.credentialengineregistry.org/. One URI per line."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Identifier"}],
                    "heading": "Context"
                },
                "http://schema.org/inLanguage": {
                    "@id": "http://schema.org/inLanguage",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The primary language used in or by this competency framework or competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "In Language"}],
                    "isRequired": "true",
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/author": {
                    "@id": "https://purl.org/ctdlasn/terms/author",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A person or organization chiefly responsible for the intellectual or artistic content of this competency framework or competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Author"}],
                    "heading": "General"
                },
                "http://schema.org/keywords": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptKeyword",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual competencies contextually. One concept per line."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Keyword"}],
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
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Term"}],
                    "noTextEditing": "true",
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
                    "noTextEditing": "true",
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
                "https://purl.org/ctdlasn/terms/isVersionOf": {
                    "@id": "https://purl.org/ctdlasn/terms/isVersionOf",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A related competency of which this competency is a version, edition, or adaptation."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Version Of"}],
                    "max": 1,
                    "heading": "Connections"
                },
                "narrows": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Covers all of the relevant concepts in the referenced competency as well as relevant concepts not found in the referenced competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Broad Alignment"}],
                    "valuesIndexed": function() { return me.relations["narrows"]; },
                    "noTextEditing": "true",
                    "add": async function(selectedCompetency, values) { await me.addRelationsToFramework(selectedCompetency, "narrows", values); },
                    "save": function() {},
                    "remove": async function(source, target) { await me.removeRelationFromFramework(source, "narrows", target); },
                    "heading": "Connections"
                },
                "broadens": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Covers all of the relevant concepts in this competency as well as relevant concepts not found in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Narrow Alignment"}],
                    "valuesIndexed": function() { return me.relations["broadens"]; },
                    "noTextEditing": "true",
                    "add": async function(selectedCompetency, values) { await me.addRelationsToFramework(selectedCompetency, "broadens", values); },
                    "save": function() {},
                    "remove": async function(source, target) { await me.removeRelationFromFramework(source, "broadens", target); },
                    "heading": "Connections"
                },
                "isEquivalentTo": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Relevant concepts in this competency and the referenced competency are coextensive."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Exact Alignment"}],
                    "valuesIndexed": function() { return me.relations["isEquivalentTo"]; },
                    "noTextEditing": "true",
                    "add": async function(selectedCompetency, values) { await me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values); },
                    "save": function() {},
                    "remove": async function(source, target) { await me.removeRelationFromFramework(source, "isEquivalentTo", target); },
                    "heading": "Connections"
                },
                "majorRelated": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Major overlap of relevant concepts between this competency and the referenced competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Major Alignment"}],
                    "valuesIndexed": function() { return me.relations["majorRelated"]; },
                    "noTextEditing": "true",
                    "add": async function(selectedCompetency, values) { await me.addRelationsToFramework(selectedCompetency, "majorRelated", values); },
                    "save": function() {},
                    "remove": async function(source, target) { await me.removeRelationFromFramework(source, "majorRelated", target); },
                    "heading": "Connections"
                },
                "minorRelated": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Minor overlap of relevant concepts between this competency and the referenced competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Minor Alignment"}],
                    "valuesIndexed": function() { return me.relations["minorRelated"]; },
                    "noTextEditing": "true",
                    "add": async function(selectedCompetency, values) { await me.addRelationsToFramework(selectedCompetency, "minorRelated", values); },
                    "save": function() {},
                    "remove": async function(source, target) { await me.removeRelationFromFramework(source, "minorRelated", target); },
                    "heading": "Connections"
                },
                "requires": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "This competency is a prerequisite to the referenced competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Prerequisite Alignment"}],
                    "valuesIndexed": function() { return me.relations["requires"]; },
                    "noTextEditing": "true",
                    "add": async function(selectedCompetency, values) { await me.addRelationsToFramework(selectedCompetency, "requires", values); },
                    "save": function() {},
                    "remove": async function(source, target) { await me.removeRelationFromFramework(source, "requires", target); },
                    "heading": "Connections"
                },
                "https://purl.org/ctdlasn/terms/abilityEmbodied": {
                    "@id": "https://purl.org/ctdlasn/terms/abilityEmbodied",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Enduring attributes of the individual that influence performance are embodied either directly or indirectly in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Ability Embodied"}],
                    "heading": "Connections"
                },
                "https://purl.org/ctdlasn/terms/knowledgeEmbodied": {
                    "@id": "https://purl.org/ctdlasn/terms/knowledgeEmbodied",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Body of information embodied either directly or indirectly in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Knowledge Embodied"}],
                    "heading": "Connections"
                },
                "https://purl.org/ctdlasn/terms/skillEmbodied": {
                    "@id": "https://purl.org/ctdlasn/terms/skillEmbodied",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Cognitive, affective, and psychomotor skills directly or indirectly embodied in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Skill Embodied"}],
                    "heading": "Connections"
                },
                "https://purl.org/ctdlasn/terms/taskEmbodied": {
                    "@id": "https://purl.org/ctdlasn/terms/taskEmbodied",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Specifically defined piece of work embodied either directly or indirectly in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Task Embodied"}],
                    "heading": "Connections"
                },
                "https://schema.cassproject.org/0.4/socList": {
                    "@id": "https://schema.cassproject.org/0.4/socList",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of occupation; select from an existing enumeration of such types. See https://www.bls.gov/soc/."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Occupation Type"}],
                    "heading": "General"
                },
                "https://schema.cassproject.org/0.4/naicsList": {
                    "@id": "https://schema.cassproject.org/0.4/naicsList",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of industry; select from an existing enumeration of such types such as the SIC, NAICS, and ISIC classifications. See https://www.naics.com/search/."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Industry Type"}],
                    "heading": "General"
                },
                "https://schema.cassproject.org/0.4/cipList": {
                    "@id": "https://schema.cassproject.org/0.4/cipList",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of instructional program; select from an existing enumeration of such types. See https://nces.ed.gov/ipeds/cipcode."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Instructional Program Type"}],
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/localSubject": {
                    "@id": "https://purl.org/ctdlasn/terms/localSubject",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The text string denoting the subject of the competency framework or competency as designated by the promulgating agency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Local Subject"}],
                    "heading": "Tagging"
                },
                "https://purl.org/ctdlasn/terms/crossSubjectReference": {
                    "@id": "https://purl.org/ctdlasn/terms/crossSubjectReference",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A relationship between this competency and a competency in a separate competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Cross Subject Reference"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdl/terms/environmentalHazardType": {
                    "@id": "https://purl.org/ctdl/terms/environmentalHazardType",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of condition in the physical work performance environment that entails risk exposures requiring mitigating processes; select from an existing enumeration of such types."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Environmental Hazard Type"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdl/terms/performanceLevelType": {
                    "@id": "https://purl.org/ctdl/terms/performanceLevelType",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of required or expected human performance level; select from an existing enumeration of such types."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Performance Level Type"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdl/terms/physicalCapabilityType": {
                    "@id": "https://purl.org/ctdl/terms/physicalCapabilityType",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of physical activity required or expected in performance; select from an existing enumeration of such types."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Physical Capability Type"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdl/terms/sensoryCapabilityType": {
                    "@id": "https://purl.org/ctdl/terms/sensoryCapabilityType",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Type of required or expected sensory capability; select from an existing enumeration of such types."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Sensory Capability Type"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/substantiatingResource": {
                    "@id": "https://purl.org/ctdlasn/terms/substantiatingResource",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Aspects of the referenced resource provide some justification that the resource being described is useful."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Substantiating Resource"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/substantiatingCompetencyFramework": {
                    "@id": "https://purl.org/ctdlasn/terms/substantiatingCompetencyFramework",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Aspects of the referenced Competency Framework provide some justification that the resource being described is useful."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Substantiating Competency Framework"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/substantiatingCredential": {
                    "@id": "https://purl.org/ctdlasn/terms/substantiatingCredential",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Aspects of the referenced Credential provide some justification that the resource being described is useful."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Substantiating Credential"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/substantiatingJob": {
                    "@id": "https://purl.org/ctdlasn/terms/substantiatingJob",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Aspects of the referenced Job provide some justification that the resource being described is useful."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Substantiating Job"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/substantiatingOccupation": {
                    "@id": "https://purl.org/ctdlasn/terms/substantiatingOccupation",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Aspects of the referenced Occupation provide some justification that the resource being described is useful."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Substantiating Occupation"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/substantiatingOrganization": {
                    "@id": "https://purl.org/ctdlasn/terms/substantiatingOrganization",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Aspects of the referenced Organization provide some justification that the resource being described is useful."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Substantiating Organization"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/substantiatingTask": {
                    "@id": "https://purl.org/ctdlasn/terms/substantiatingTask",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Aspects of the referenced Task provide some justification that the resource being described is useful."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Substantiating Task"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/substantiatingWorkRole": {
                    "@id": "https://purl.org/ctdlasn/terms/substantiatingResource",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Aspects of the referenced Work Role provide some justification that the resource being described is useful."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Substantiating Work Role"}],
                    "heading": "Context"
                },
                "https://purl.org/ctdlasn/terms/sourceDocumentation": {
                    "@id": "https://purl.org/ctdlasn/terms/sourceDocumentation",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Human-readable information resource other than a competency framework from which this competency was generated or derived by humans or machines."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Source Documentation"}],
                    "heading": "Connections"
                },
                "https://purl.org/ctdlasn/terms/inferredCompetency": {
                    "@id": "https://purl.org/ctdlasn/terms/inferredCompetency",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Competency deduced or arrive at by reasoning on the competency being described."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Inferred Competency"}],
                    "heading": "Connections",
                    "isDirectLink": 'true'
                },
                "https://purl.org/ctdl/terms/hasWorkforceDemand": {
                    "@id": "https://purl.org/ctdl/terms/hasWorkforceDemand",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Indicates the level of demand for a resource via a demand level action."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Has Workforce Demand"}],
                    "heading": "Connections"
                },
                "https://purl.org/ctdl/terms/hasTask": {
                    "@id": "https://purl.org/ctdl/terms/hasTask",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Task related to this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Has Task"}],
                    "heading": "Context"
                },
                "http://schema.org/creator": {
                    "@id": "http://schema.org/creator",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
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
                "http://purl.org/ASN/schema/core/hasProgressionLevel": {
                    "@id": "http://purl.org/ASN/schema/core/hasProgressionLevel",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Reference to a specific point in a progression model."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Has Progression Level"}],
                    "heading": "Connections"
                },
                "headings": ["General", "Context", "Tagging", "Scales", "Connections", "Keys"],
                "primaryProperties": [
                    "https://purl.org/ctdlasn/terms/competencyLabel",
                    "http://schema.org/name",
                    "http://schema.org/description",
                    "http://purl.org/dc/terms/type",
                    "https://purl.org/ctdlasn/terms/listID",
                    "https://purl.org/ctdlasn/terms/codedNotation",
                    "https://purl.org/ctdlasn/terms/altCodedNotation"
                ],
                "secondaryProperties": [
                    "https://purl.org/ctdlasn/terms/abilityEmbodied",
                    "https://purl.org/ctdlasn/terms/knowledgeEmbodied",
                    "https://purl.org/ctdlasn/terms/skillEmbodied",
                    "https://purl.org/ctdlasn/terms/taskEmbodied",
                    "http://schema.org/inLanguage",
                    "http://schema.org/keywords",
                    "https://purl.org/ctdlasn/terms/conceptTerm",
                    "https://purl.org/ctdlasn/terms/complexityLevel",
                    "https://purl.org/ctdlasn/terms/weight",
                    "https://schema.cassproject.org/0.4/socList",
                    "https://schema.cassproject.org/0.4/naicsList",
                    "https://purl.org/ctdlasn/terms/localSubject",
                    "https://purl.org/ctdlasn/terms/crossSubjectReference",
                    "https://schema.cassproject.org/0.4/cipList"
                ],
                "tertiaryProperties": [
                    "@id",
                    "registryURL",
                    "ctid",
                    "narrows",
                    "broadens",
                    "isEquivalentTo",
                    "majorRelated",
                    "minorRelated",
                    "requires",
                    "https://purl.org/ctdlasn/terms/isVersionOf",
                    "https://purl.org/ctdlasn/terms/comprisedOf",
                    "https://purl.org/ctdlasn/terms/educationLevelType",
                    "https://purl.org/ctdlasn/terms/derivedFrom",
                    "http://schema.org/identifier",
                    "https://purl.org/ctdl/terms/environmentalHazardType",
                    "https://purl.org/ctdl/terms/performanceLevelType",
                    "https://purl.org/ctdl/terms/physicalCapabilityType",
                    "https://purl.org/ctdl/terms/sensoryCapabilityType",
                    "https://purl.org/ctdlasn/terms/substantiatingResource",
                    "https://purl.org/ctdlasn/terms/substantiatingCompetencyFramework",
                    "https://purl.org/ctdlasn/terms/substantiatingCredential",
                    "https://purl.org/ctdlasn/terms/substantiatingJob",
                    "https://purl.org/ctdlasn/terms/substantiatingOccupation",
                    "https://purl.org/ctdlasn/terms/substantiatingOrganization",
                    "https://purl.org/ctdlasn/terms/substantiatingTask",
                    "https://purl.org/ctdlasn/terms/substantiatingWorkRole",
                    "https://purl.org/ctdlasn/terms/sourceDocumentation",
                    "https://purl.org/ctdlasn/terms/inferredCompetency",
                    "https://purl.org/ctdl/terms/hasWorkforceDemand",
                    "https://purl.org/ctdl/terms/hasTask",
                    "http://schema.org/creator",
                    "https://purl.org/ctdlasn/terms/author",
                    "http://purl.org/ASN/schema/core/hasProgressionLevel"
                ]
            };
        },
        ctdlAsnConceptSchemeProfile: function() {
            var me = this;
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
                "registryURL": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The Credential Registry URL of the concept scheme."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Credential Registry URL"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.registryURLs; },
                    "max": 1,
                    "heading": "Keys"
                },
                "ctid": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The CTID of the concept scheme."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "CTID"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.ctids; },
                    "max": 1,
                    "heading": "Keys"
                },
                "http://purl.org/dc/terms/title": {
                    "@id": "https://purl.org/ctdlasn/terms/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name or title of this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "heading": "General",
                    "onePerLanguage": "true",
                    "isRequired": "true"
                },
                "http://purl.org/dc/terms/description": {
                    "@id": "https://purl.org/ctdlasn/terms/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A short description of this resource. One definition per language"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}],
                    "heading": "General",
                    "isRequired": "true",
                    "onePerLanguage": "true"
                },
                "http://purl.org/dc/terms/creator": {
                    "@id": "https://purl.org/ctdlasn/terms/creator",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [{"@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"}],
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
                    "@id": "https://purl.org/ctdlasn/terms/publisher",
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
                    "@id": "https://purl.org/ctdlasn/terms/inLanguage",
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
                    "isRequired": "true",
                    "heading": "General"
                },
                "http://purl.org/dc/elements/1.1/source": {
                    "@id": "https://purl.org/ctdlasn/terms/source",
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
                "https://purl.org/ctdlasn/terms/conceptKeyword": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptKeyword",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
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
                            "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual resources contextually."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Keyword"}],
                    "heading": "Tagging"
                },
                "https://purl.org/ctdlasn/terms/conceptTerm": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
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
                            "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Term"}],
                    "noTextEditing": "true",
                    "heading": "Tagging"
                },
                "https://purl.org/ctdlasn/terms/publicationStatusType": {
                    "@id": "https://purl.org/ctdlasn/terms/publicationStatusType",
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
                            "@value": "The publication status of this resource."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publication Status"}],
                    "heading": "Context",
                    "options": [
                        {display: "Draft", val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Draft"},
                        {display: "Published", val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Published"},
                        {display: "Deprecated", val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Deprecated"}
                    ],
                    "isRequired": "true",
                    "max": 1
                },
                "http://purl.org/dc/terms/dateCopyrighted": {
                    "@id": "https://purl.org/ctdlasn/terms/dateCopyrighted",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://purl.org/dc/terms/date"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Date of a statement of copyright for this resource."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Date Copyrighted"}],
                    "heading": "Rights",
                    "max": 1
                },
                "http://purl.org/dc/terms/license": {
                    "@id": "https://purl.org/ctdlasn/terms/license",
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
                            "@value": "A legal document giving official permission to do something with this resource. For example, https://sandbox.credentialengineregistry.org/"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "License"}],
                    "heading": "Rights",
                    "max": 1
                },
                "http://purl.org/dc/terms/rights": {
                    "@id": "https://purl.org/ctdlasn/terms/rights",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
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
                            "@value": "Information about rights held in and over this resource."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rights"}],
                    "heading": "Rights",
                    "max": 1
                },
                "http://purl.org/dc/terms/rightsHolder": {
                    "@id": "http://purl.org/dc/terms/rightsHolder",
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
                            "@value": "An agent owning or managing rights over this resource. For example, https://credentialengineregistry.org/."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rights Holder"}],
                    "heading": "Rights",
                    "max": 1
                },
                "headings": ["General", "Tagging", "Context", "Rights", "Keys"],
                "primaryProperties": [
                    "http://purl.org/dc/terms/title",
                    "http://purl.org/dc/terms/description",
                    "https://purl.org/ctdlasn/terms/conceptKeyword",
                    "https://purl.org/ctdlasn/terms/conceptTerm",
                    "https://purl.org/ctdlasn/terms/publisherName"
                ],
                "secondaryProperties": [
                    "http://purl.org/dc/terms/creator",
                    "http://purl.org/dc/terms/publisher",
                    "http://purl.org/dc/terms/language",
                    "http://purl.org/dc/elements/1.1/source"
                ],
                "tertiaryProperties": [
                    "@id",
                    "registryURL",
                    "ctid",
                    "https://purl.org/ctdlasn/terms/publicationStatusType",
                    "http://purl.org/dc/terms/dateCopyrighted",
                    "http://purl.org/dc/terms/license",
                    "http://purl.org/dc/terms/rights",
                    "http://purl.org/dc/terms/rightsHolder"
                ]
            };
        },
        ctdlAsnConceptProfile: function() {
            var me = this;
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
                "registryURL": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Concept"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The Credential Registry URL of the concept."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Credential Registry URL"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.conceptRegistryUrls; },
                    "max": 1,
                    "heading": "Keys"
                },
                "ctid": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Concept"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The CTID of the concept."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "CTID"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.conceptCtids; },
                    "max": 1,
                    "heading": "Keys"
                },
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
                "http://www.w3.org/2004/02/skos/core#changeNote": {
                    "@id": "http://www.w3.org/2004/02/skos/core#changeNote",
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
                            "@value": "Text describing a significant change to the concept."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Change Note"}],
                    "heading": "Documentation"
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
                    "noTextEditing": "true",
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
                    "noTextEditing": "true",
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
                    "noTextEditing": "true",
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
                    "noTextEditing": "true",
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
                    "noTextEditing": "true",
                    "heading": "Connections"
                },
                "headings": ["General", "Other Labels", "Documentation", "Connections", "Keys"],
                "primaryProperties": [
                    "http://www.w3.org/2004/02/skos/core#prefLabel",
                    "http://www.w3.org/2004/02/skos/core#definition",
                    "http://www.w3.org/2004/02/skos/core#notation",
                    "http://www.w3.org/2004/02/skos/core#altLabel"
                ],
                "secondaryProperties": [
                    "http://www.w3.org/2004/02/skos/core#broadMatch",
                    "http://www.w3.org/2004/02/skos/core#closeMatch",
                    "http://www.w3.org/2004/02/skos/core#exactMatch",
                    "http://www.w3.org/2004/02/skos/core#narrowMatch",
                    "http://www.w3.org/2004/02/skos/core#related"
                ],
                "tertiaryProperties": [
                    "@id",
                    "registryURL",
                    "ctid",
                    "http://www.w3.org/2004/02/skos/core#hiddenLabel",
                    "http://www.w3.org/2004/02/skos/core#note",
                    "http://www.w3.org/2004/02/skos/core#changeNote"
                ]
            };
        },
        ctdlAsnProgressionModelProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/ConceptScheme/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the progression model. If imported from another source, the URL of the progression model from which this one originates."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Canonical URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "registryURL": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The Credential Registry URL of the progression model."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Credential Registry URL"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.registryURLs; },
                    "max": 1,
                    "heading": "Keys"
                },
                "ctid": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The CTID of the progression model."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "CTID"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.ctids; },
                    "max": 1,
                    "heading": "Keys"
                },
                "http://purl.org/dc/terms/title": {
                    "@id": "https://purl.org/ctdlasn/terms/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name or title of this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "heading": "General",
                    "onePerLanguage": "true",
                    "isRequired": "true"
                },
                "http://purl.org/dc/terms/description": {
                    "@id": "https://purl.org/ctdlasn/terms/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/ConceptScheme"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A short description of this resource. One definition per language"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}],
                    "heading": "General",
                    "isRequired": "true",
                    "onePerLanguage": "true"
                },
                "http://purl.org/dc/terms/creator": {
                    "@id": "https://purl.org/ctdlasn/terms/creator",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [{"@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"}],
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
                    "@id": "https://purl.org/ctdlasn/terms/publisher",
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
                    "@id": "https://purl.org/ctdlasn/terms/inLanguage",
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
                    "isRequired": "true",
                    "heading": "General"
                },
                "http://purl.org/dc/elements/1.1/source": {
                    "@id": "https://purl.org/ctdlasn/terms/source",
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
                "https://purl.org/ctdlasn/terms/conceptKeyword": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptKeyword",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
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
                            "@value": "A word or phrase used by the promulgating agency to refine and differentiate individual resources contextually."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Keyword"}],
                    "heading": "Tagging"
                },
                "https://purl.org/ctdlasn/terms/conceptTerm": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
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
                            "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Concept Term"}],
                    "noTextEditing": "true",
                    "heading": "Tagging"
                },
                "https://purl.org/ctdlasn/terms/publicationStatusType": {
                    "@id": "https://purl.org/ctdlasn/terms/publicationStatusType",
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
                            "@value": "The publication status of this resource."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publication Status"}],
                    "heading": "Context",
                    "options": [
                        {display: "Draft", val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Draft"},
                        {display: "Published", val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Published"},
                        {display: "Deprecated", val: "https://credreg.net/ctdlasn/vocabs/publicationStatus/Deprecated"}
                    ],
                    "isRequired": "true",
                    "max": 1
                },
                "http://purl.org/dc/terms/dateCopyrighted": {
                    "@id": "https://purl.org/ctdlasn/terms/dateCopyrighted",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
                        }
                    ],
                    "http://schema.org/rangeIncludes": [
                        {
                            "@id": "http://purl.org/dc/terms/date"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#comment": [
                        {
                            "@language": "en",
                            "@value": "Date of a statement of copyright for this resource."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Date Copyrighted"}],
                    "heading": "Rights",
                    "max": 1
                },
                "http://purl.org/dc/terms/license": {
                    "@id": "https://purl.org/ctdlasn/terms/license",
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
                            "@value": "A legal document giving official permission to do something with this resource. For example, https://sandbox.credentialengineregistry.org/"
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "License"}],
                    "heading": "Rights",
                    "max": 1
                },
                "http://purl.org/dc/terms/rights": {
                    "@id": "https://purl.org/ctdlasn/terms/rights",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes": [
                        {
                            "@id": "http://schema.cassproject.org/0.4/skos/ConceptScheme"
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
                            "@value": "Information about rights held in and over this resource."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rights"}],
                    "heading": "Rights",
                    "max": 1
                },
                "http://purl.org/dc/terms/rightsHolder": {
                    "@id": "http://purl.org/dc/terms/rightsHolder",
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
                            "@value": "An agent owning or managing rights over this resource. For example, https://credentialengineregistry.org/."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rights Holder"}],
                    "heading": "Rights",
                    "max": 1
                },
                "headings": ["General", "Tagging", "Context", "Rights", "Keys"],
                "primaryProperties": [
                    "http://purl.org/dc/terms/title",
                    "http://purl.org/dc/terms/description",
                    "https://purl.org/ctdlasn/terms/conceptKeyword",
                    "https://purl.org/ctdlasn/terms/conceptTerm",
                    "https://purl.org/ctdlasn/terms/publisherName"
                ],
                "secondaryProperties": [
                    "http://purl.org/dc/terms/creator",
                    "http://purl.org/dc/terms/publisher",
                    "http://purl.org/dc/terms/language",
                    "http://purl.org/dc/elements/1.1/source"
                ],
                "tertiaryProperties": [
                    "@id",
                    "registryURL",
                    "ctid",
                    "https://purl.org/ctdlasn/terms/publicationStatusType",
                    "http://purl.org/dc/terms/dateCopyrighted",
                    "http://purl.org/dc/terms/license",
                    "http://purl.org/dc/terms/rights",
                    "http://purl.org/dc/terms/rightsHolder"
                ]
            };
        },
        ctdlAsnProgressionLevelProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Concept/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Concept"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the progression level. If imported from another source, the URL of the progression level from which this one originates."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Canonical URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "registryURL": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Concept"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The Credential Registry URL of the progression level."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Credential Registry URL"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.conceptRegistryUrls; },
                    "max": 1,
                    "heading": "Keys"
                },
                "ctid": {
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Concept"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The CTID of the progression level."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "CTID"}],
                    "readOnly": "true",
                    "valuesIndexed": function() { return me.conceptCtids; },
                    "max": 1,
                    "heading": "Keys"
                },
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
                            "@value": "Preferred language-tagged label representing this progression level. One label per language."
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
                            "@value": "Supplies a complete explanation of the intended meaning of a progression level. One definition per language."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Definition"}],
                    "heading": "General",
                    "onePerLanguage": "true"
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
                            "@value": "Annotations to the progression level for purposes of general documentation."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Note"}],
                    "heading": "Documentation"
                },
                "https://purl.org/ctdlasn/terms/precedes": {
                    "@id": "https://purl.org/ctdlasn/terms/precedes",
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
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {
                            "@language": "en", "@value": "Resource that logically comes after this resource."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label":
                    [
                        {
                            "@language": "en", "@value": "Precedes"
                        }
                    ],
                    "heading": "General"
                },
                "https://purl.org/ctdlasn/terms/precededBy": {
                    "@id": "https://purl.org/ctdlasn/terms/precededBy",
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
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {
                            "@language": "en", "@value": "Resource that logically comes before this resource."
                        }
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label":
                    [
                        {
                            "@language": "en", "@value": "Preceded By"
                        }
                    ],
                    "heading": "General"
                },
                "headings": ["General", "Other Labels", "Documentation", "Connections", "Keys"],
                "primaryProperties": [
                    "http://www.w3.org/2004/02/skos/core#prefLabel",
                    "http://www.w3.org/2004/02/skos/core#definition",
                    "http://www.w3.org/2004/02/skos/core#notation"
                ],
                "secondaryProperties": [
                    "https://purl.org/ctdlasn/terms/precedes",
                    "https://purl.org/ctdlasn/terms/precededBy"
                ],
                "tertiaryProperties": [
                    "@id",
                    "registryURL",
                    "ctid",
                    "http://www.w3.org/2004/02/skos/core#note"
                ]
            };
        }
    }
};