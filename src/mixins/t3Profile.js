export default {
    computed: {
        t3CompetencyProfile: function() {
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
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "ID"}],
                    "readOnly": "true"
                },
                "https://purl.org/ctdlasn/terms/codedNotation": {
                    "@id": "https://purl.org/ctdlasn/terms/codedNotation",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "An alphanumeric notation or ID code as defined by the promulgating body to identify this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Code"}]
                },
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Name of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "isRequired": "true"
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "Description of the competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                },
                "http://purl.org/dc/terms/type": {
                    "@id": "http://purl.org/dc/terms/type",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "The textual label identifying the category of the competency as designated by the promulgating body."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Type"}]
                },
                "https://schema.cassproject.org/0.4/Competency/scope": {
                    "@id": "https://schema.cassproject.org/0.4/Competency/scope",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Scope in which the competency may be applied. e.g. Underwater."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Scope"}]
                },
                "https://purl.org/ctdlasn/terms/conceptTerm": {
                    "@id": "https://purl.org/ctdlasn/terms/conceptTerm",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/skos/Concept"}],
                    "noTextEditing": "true",
                    "isDirectLink": "false",
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual resources contextually."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Context"}]
                },
                "https://schema.cassproject.org/0.4/Level": {
                    "@id": "https://schema.cassproject.org/0.4/Level",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [
                        {"@language": "en",
                            "@value":
                        "When an individual's performance in a competency can be measured, a level specifies milestones that an individual can reach, creating fine-grained distinction between the proficient and the adept."}
                    ],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rubric Cell"}],
                    "valuesIndexed": function() { return me.levels; },
                    "noTextEditing": "true",
                    "isDirectLink": "false",
                    "add": function(selectedCompetency) { me.addLevel(selectedCompetency); },
                    "remove": function(competency, levelId) { me.removeLevelFromFramework(levelId); },
                    "save": function() { me.saveFramework(); },
                    profile: {
                        "http://schema.org/name": {
                            "@id": "http://schema.org/name",
                            "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                            "http://schema.org/domainIncludes":
                                [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                            "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                            "http://www.w3.org/2000/01/rdf-schema#comment":
                                [{"@language": "en", "@value": "The title that one who holds this performance level may assume. e.g. \"Fast\""}],
                            "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rubric Column Header"}]
                        },
                        "https://schema.cassproject.org/0.4/competency": {
                            "@id": "https://schema.cassproject.org/0.4/competency",
                            "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                            "http://schema.org/domainIncludes":
                                [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                            "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                            "http://www.w3.org/2000/01/rdf-schema#comment":
                                [{"@language": "en", "@value": "Specifies the URL of the competency the level relates to."}],
                            "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Rubric Row Header"}]
                        },
                        "alwaysProperties": ["http://schema.org/name", "https://schema.cassproject.org/0.4/competency"]
                    }
                },
                "narrows": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A sub-competency relationship which has relevance to this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Narrows"}],
                    "valuesIndexed": function() { return me.relations["narrows"]; },
                    "noTextEditing": "true",
                    "isDirectLink": "false",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "narrows", values); },
                    "save": function() {},
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "narrows", target); }
                },
                "broadens": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Covers other relevant competencies not found in this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Broadens"}],
                    "valuesIndexed": function() { return me.relations["broadens"]; },
                    "noTextEditing": "true",
                    "isDirectLink": "false",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "broadens", values); },
                    "save": function() {},
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "broadens", target); }
                },
                "isEquivalentTo": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Represents same capability in all aspects to another competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Equivalent To"}],
                    "valuesIndexed": function() { return me.relations["isEquivalentTo"]; },
                    "noTextEditing": "true",
                    "isDirectLink": "false",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEquivalentTo", values); },
                    "save": function() {},
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "isEquivalentTo", target); }
                },
                "isSimilarTo": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Similar To"}],
                    "valuesIndexed": function() { return me.relations["isSimilarTo"]; },
                    "noTextEditing": "true",
                    "isDirectLink": "false",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isSimilarTo", values); },
                    "save": function() {},
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "isSimilarTo", target); }
                },
                "isPartiallySameAs": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Partially Same As"}],
                    "valuesIndexed": function() { return me.relations["isPartiallySameAs"]; },
                    "noTextEditing": "true",
                    "isDirectLink": "false",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isPartiallySameAs", values); },
                    "save": function() {},
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "isPartiallySameAs", target); }
                },
                "isRelatedTo": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "This competency has some degree of overlap with another."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Related To"}],
                    "valuesIndexed": function() { return me.relations["isRelatedTo"]; },
                    "noTextEditing": "true",
                    "isDirectLink": "false",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isRelatedTo", values); },
                    "save": function() {},
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "isRelatedTo", target); }
                },
                "enables": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Enables"}],
                    "valuesIndexed": function() { return me.relations["enables"]; },
                    "noTextEditing": "true",
                    "isDirectLink": "false",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "enables", values); },
                    "save": function() {},
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "enables", target); }
                },
                "isEnabledBy": {
                    "http://schema.org/rangeIncludes": [{"@id": "https://schema.cassproject.org/0.4/Competency"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A recommended option that speeds up acquisition of this competency."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Is Enabled By"}],
                    "valuesIndexed": function() { return me.relations["isEnabledBy"]; },
                    "noTextEditing": "true",
                    "isDirectLink": "false",
                    "add": function(selectedCompetency, values) { me.addRelationsToFramework(selectedCompetency, "isEnabledBy", values); },
                    "save": function() {},
                    "remove": function(source, target) { me.removeRelationFromFramework(source, "isEnabledBy", target); }
                },
                "primaryProperties": [
                    "https://purl.org/ctdlasn/terms/codedNotation",
                    "http://schema.org/name",
                    "http://schema.org/description"
                ],
                "secondaryProperties": [
                    "@id",
                    "http://purl.org/dc/terms/type",
                    "https://schema.cassproject.org/0.4/Competency/scope",
                    "https://purl.org/ctdlasn/terms/conceptTerm",
                    "https://schema.cassproject.org/0.4/Level",
                    "narrows",
                    "broadens",
                    "isEquivalentTo",
                    "isSimilarTo",
                    "isPartiallySameAs",
                    "isRelatedTo",
                    "enables",
                    "isEnabledBy"
                ],
                "tertiaryProperties": []
            };
        },
        t3FrameworkProfile: function() {
            return {
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Framework/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "ID"}],
                    "readOnly": "true"
                },
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Name of the competency framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "isRequired": "true"
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Description of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                },
                "https://schema.cassproject.org/0.4/level": {
                    "@id": "https://schema.cassproject.org/0.4/level",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The title that one who holds this performance level may assume. e.g. \"Fast\""}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Available Levels"}]
                },
                "http://schema.org/publisher": {
                    "@id": "http://schema.org/publisher",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The entity responsible for making this competency framework available."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Publisher"}]
                },
                "http://purl.org/dc/elements/1.1/source": {
                    "@id": "http://purl.org/dc/elements/1.1/source",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "A URI to the original competency framework which this competency framework is based on or derived from."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Extracted From"}]
                },
                "http://schema.org/dateCreated": {
                    "@id": "http://schema.org/dateCreated",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://www.w3.org/2001/XMLSchema#date"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "Date of creation of this resource."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Extraction Date"}]
                },
                "primaryProperties": [
                    "http://schema.org/name",
                    "http://schema.org/description"
                ],
                "secondaryProperties": [
                    "@id",
                    "https://schema.cassproject.org/0.4/level",
                    "http://schema.org/publisher",
                    "http://purl.org/dc/elements/1.1/source",
                    "http://schema.org/dateCreated"
                ],
                "tertiaryProperties": []
            };
        }
    }
};