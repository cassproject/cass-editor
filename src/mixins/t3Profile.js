export default {
    computed: {
        t3CompetencyProfile: function() {
            var me = this;
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "ID"}],
                    "noTextEditing": true
                },
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Name of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}]
                },
                "https://purl.org/ctdlasn/terms/codedNotation": {
                    "@id": "https://purl.org/ctdlasn/terms/codedNotation",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "An alphanumeric notation or ID code as defined by the promulgating body to identify this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Code"}],
                    "thingKey": "ceasn:codedNotation"
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Description of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                },
                "http://purl.org/dc/terms/type": {
                    "@id": "http://purl.org/dc/terms/type",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "The textual label identifying the category of the competency as designated by the promulgating body."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Type"}],
                    "thingKey": "dcterms:type"
                },
                "https://schema.cassproject.org/0.4/Competency/scope": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/scope",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Scope in which the competency may be applied. e.g. Underwater."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Scope"}]
                },
                "https://purl.org/ctdlasn/terms/conceptTerm": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Context"}],
                    "thingKey": "ceasn:conceptTerm",
                    "iframePath": me.$store.state.editor.iframeConceptPath,
                    "iframeText": "Select concepts to attach..."
                },
                "https://schema.cassproject.org/0.4/Level": {
                    "@id": "https://schema.cassproject.org/0.4/Level",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value":
                        "When an individual's performance in a competency can be measured, a level specifies milestones that an individual can reach, creating fine-grained distinction between the proficient and the adept."}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rubric Cell"}],
                    "valuesIndexed": function() { return me.levels; },
                    "noTextEditing": true,
                    "iframePath": me.$store.state.editor.iframeCompetencyPathInterframework,
                    "iframeText": "Select levels to align...",
                    "add": function(selectedCompetency) { me.addLevel(selectedCompetency); },
                    "remove": function(competency, levelId) { me.removeLevelFromFramework(levelId); },
                    "save": function() { me.saveFramework(); },
                    profile: {
                        "https://schema.cassproject.org/0.4/Level/title": {
                            "@id": "https://schema.cassproject.org/0.4/Level/title",
                            "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                            "http://schema.org/domainIncludes":
                                [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                            "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                            "http://www.w3.org/2000/01/rdf-schema#comment":
                                [{"@language": "en", "@value": "The title that one who holds this performance level may assume. e.g. \"Fast\""}],
                            "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rubric Column Header"}]
                        },
                        "https://schema.cassproject.org/0.4/Level/competency": {
                            "@id": "https://schema.cassproject.org/0.4/Level/competency",
                            "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                            "http://schema.org/domainIncludes":
                                [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                            "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                            "http://www.w3.org/2000/01/rdf-schema#comment":
                                [{"@language": "en", "@value": "Specifies the URL of the competency the level relates to."}],
                            "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rubric Row Header"}]
                        },
                        "alwaysProperties": ["https://schema.cassproject.org/0.4/Level/title", "https://schema.cassproject.org/0.4/Level/competency"]
                    }
                },
                "alwaysProperties": [
                    "http://schema.org/name",
                    "http://schema.org/description"
                ]
            };
        },
        t3FrameworkProfile: function() {
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "ID"}],
                    "noTextEditing": true
                },
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Name of the competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}]
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2000/01/rdf-schema#langString"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Description of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                },
                "https://schema.cassproject.org/0.4/level": {
                    "@id": "https://schema.cassproject.org/0.4/level",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/level"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The title that one who holds this performance level may assume. e.g. \"Fast\""}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Available Levels"}]
                },
                "http://schema.org/publisher": {
                    "@id": "http://schema.org/publisher",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The entity responsible for making this competency framework available."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publisher"}]
                },
                "http://purl.org/dc/elements/1.1/source": {
                    "@id": "http://purl.org/dc/elements/1.1/source",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A URI to the original competency framework which this competency framework is based on or derived from."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Extracted From"}]
                },
                "http://schema.org/dateCreated": {
                    "@id": "http://schema.org/dateCreated",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "http://schema.cassproject.org/0.3/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2001/XMLSchema#date"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Date of creation of this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Extraction Date"}]
                }
            };
        }
    }
};