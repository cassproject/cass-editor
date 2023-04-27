import {mapGetters} from 'vuex';
export const configuration = {
    name: 'configuration',
    computed: {
        ...mapGetters({
            CONFIG_SEARCH_SIZE: 'configuration/CONFIG_SEARCH_SIZE',
            DEFAULT_CONFIGURATION_TYPE: 'configuration/DEFAULT_CONFIGURATION_TYPE',
            DEFAULT_CONFIGURATION_CONTEXT: 'configuration/DEFAULT_CONFIGURATION_CONTEXT',
            LANG_STRING_RANGE: 'configuration/LANG_STRING_RANGE',
            DEFAULT_HEADING: 'configuration/DEFAULT_HEADING'
        }),
        currentConfig: {
            get() {
                return this.$store.getters['configuration/currentConfig'];
            },
            set(val) {
                this.$store.commit('configuration/setCurrentConfig', val);
            }
        }
    },
    methods: {
        closeModal: function() {
            this.$store.commit('app/closeModal');
        },
        showListView() {
            this.$store.commit('configuration/setConfigView', "list");
        },
        showDetailView() {
            this.$store.commit('configuration/setConfigView', "detail");
        },
        showConfigDetails(configId) {
            this.setCurrentConfig(configId);
            this.showDetailView();
        },
        generateCustomPropertyContextAndNameFromId(customPropId) {
            let retObj = {};
            retObj.context = customPropId.substr(0, customPropId.lastIndexOf("/") + 1);
            retObj.name = customPropId.substr(customPropId.lastIndexOf("/") + 1);
            return retObj;
        },
        getConfigById(configId) {
            for (let c of this.configList) {
                if (c.id.equals(configId)) {
                    return c;
                }
            }
            return null;
        },
        setCurrentConfig(configId) {
            let currentConfig = this.getConfigById(configId);
            this.$store.commit('configuration/setCurrentConfig', currentConfig);
        },
        sortConfigList() {
            this.configList.sort(function(c1, c2) {
                if (c1.isOwned !== c2.isOwned) {
                    if (c2.isOwned) return 1;
                    else return -1;
                } else {
                    if (c1.name > c2.name) return 1;
                    else if (c2.name > c1.name) return -1;
                    else return 0;
                }
            });
        },
        isCustomPropertyKey(propertyParent, propertyKey) {
            if (propertyKey.equals('headings')) return false;
            else if (propertyKey.equals('primaryProperties')) return false;
            else if (propertyKey.equals('secondaryProperties')) return false;
            else if (propertyKey.equals('tertiaryProperties')) return false;
            else if (propertyKey.equals('@id')) return false;
            else if (propertyKey.equals('http://schema.org/name')) return false;
            else if (propertyKey.equals('http://schema.org/description')) return false;
            else if (propertyKey.equals('https://schema.cassproject.org/0.4/classification')) return false;
            else if (propertyKey.equals('https://schema.cassproject.org/0.4/markings')) return false;
            else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/terms/title')) return false;
            else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/terms/description')) return false;
            else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/terms/creator')) return false;
            else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/terms/publisher')) return false;
            else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('https://purl.org/ctdlasn/terms/publisherName')) return false;
            else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/terms/language')) return false;
            else if (propertyParent.equalsIgnoreCase('taxonomy') && propertyKey.equals('http://purl.org/dc/elements/1.1/source')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#prefLabel')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#definition')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#notation')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#altLabel')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#hiddenLabel')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#note')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#broader')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#narrower')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#broadMatch')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#closeMatch')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#exactMatch')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#narrowMatch')) return false;
            else if (propertyParent.equalsIgnoreCase('taxon') && propertyKey.equals('http://www.w3.org/2004/02/skos/core#related')) return false;
            else if (propertyParent.equalsIgnoreCase('competency') && propertyKey.equals('http://purl.org/dc/terms/type')) return false;
            else if (propertyParent.equalsIgnoreCase('competency') && propertyKey.equals('relationshipsHeading')) return false;
            else if (propertyParent.equalsIgnoreCase('competency') && propertyKey.equals('relationshipsPriority')) return false;
            else return true;
        },
        generateSimpleCustomPropertyObject(ccpo) {
            let scpo = {};
            let contextNameObj = this.generateCustomPropertyContextAndNameFromId(ccpo["@id"]);
            scpo.context = contextNameObj.context;
            scpo.propertyName = contextNameObj.name;
            scpo.range = ccpo["http://schema.org/rangeIncludes"][0]["@id"];
            scpo.description = ccpo["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            scpo.label = ccpo["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            scpo.priority = ccpo["priority"];
            if (ccpo["isDirectLink"]) {
                scpo.isDirectLink = ccpo["isDirectLink"];
            }
            if (ccpo["heading"]) scpo.heading = ccpo["heading"];
            else scpo.heading = "";
            if (ccpo["max"] && (ccpo["max"] === 1 || ccpo["max"] === '1')) scpo.allowMultiple = false;
            else scpo.allowMultiples = true;
            if (ccpo["onePerLanguage"] && (ccpo["onePerLanguage"] === 'true' || ccpo["max"] === true)) scpo.onePerLanguage = true;
            else scpo.onePerLanguage = false;
            scpo.required = this.getBooleanValue(ccpo["isRequired"]);
            scpo.permittedValues = [];
            scpo.permittedTypes = [];
            scpo.permittedConcepts = [];
            if (scpo.range.equalsIgnoreCase('https://schema.cassproject.org/0.4/Competency')) {
                if (ccpo.options && ccpo.options.length > 0) {
                    for (let pv of ccpo.options) {
                        let pvo = {};
                        pvo.display = pv.display;
                        pvo.value = pv.val;
                        scpo.permittedTypes.push(pvo);
                    }
                }
            } else if (scpo.range.equalsIgnoreCase('https://schema.cassproject.org/0.4/skos/Concept')) {
                if (ccpo.options && ccpo.options.length > 0) {
                    for (let pv of ccpo.options) {
                        let pvo = {};
                        pvo.display = pv.display;
                        pvo.value = pv.val;
                        scpo.permittedConcepts.push(pvo);
                    }
                }
            } else if (ccpo.options && ccpo.options.length > 0) {
                for (let pv of ccpo.options) {
                    let pvo = {};
                    pvo.display = pv.display;
                    pvo.value = pv.val;
                    scpo.permittedValues.push(pvo);
                }
            }
            return scpo;
        },
        buildSimpleConfigObjectFrameworkData(simpleConfigObj, complexConfigObj) {
            let cfo = complexConfigObj["frameworkConfig"];
            simpleConfigObj.fwkIdLabel = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.fwkIdDescription = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.fwkIdPriorty = cfo["@id"]["priority"];
            let idHeading = cfo["@id"]["heading"];
            if (idHeading) simpleConfigObj.fwkIdHeading = idHeading.trim();
            else simpleConfigObj.fwkIdHeading = "";
            simpleConfigObj.fwkNameLabel = cfo["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.fwkNameDescription = cfo["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            let nameHeading = cfo["http://schema.org/name"]["heading"];
            if (nameHeading) simpleConfigObj.fwkNameHeading = nameHeading.trim();
            else simpleConfigObj.fwkNameHeading = "";
            simpleConfigObj.fwkDescLabel = cfo["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.fwkDescDescription = cfo["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.fwkDescPriority = cfo["http://schema.org/description"]["priority"];
            simpleConfigObj.fwkDescRequired = this.getBooleanValue(cfo["http://schema.org/description"]["isRequired"]);
            let descHeading = cfo["http://schema.org/description"]["heading"];
            if (descHeading) simpleConfigObj.fwkDescHeading = descHeading.trim();
            else simpleConfigObj.fwkDescHeading = "";

            if (cfo["https://schema.cassproject.org/0.4/classification"] != null) {
                simpleConfigObj.fwkClassLabel = cfo["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                simpleConfigObj.fwkClassDescription = cfo["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
                simpleConfigObj.fwkClassPriority = cfo["https://schema.cassproject.org/0.4/classification"]["priority"];
                simpleConfigObj.fwkClassRequired = this.getBooleanValue(cfo["https://schema.cassproject.org/0.4/classification"]["isRequired"]);
                let classHeading = cfo["https://schema.cassproject.org/0.4/classification"]["heading"];
                if (classHeading) simpleConfigObj.fwkClassHeading = classHeading.trim();
                else simpleConfigObj.fwkClassHeading = "";
            }

            if (cfo["https://schema.cassproject.org/0.4/markings"] != null) {
                simpleConfigObj.fwkMarkingsLabel = cfo["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                simpleConfigObj.fwkMarkingsDescription = cfo["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
                simpleConfigObj.fwkMarkingsPriority = cfo["https://schema.cassproject.org/0.4/markings"]["priority"];
                simpleConfigObj.fwkMarkingsRequired = this.getBooleanValue(cfo["https://schema.cassproject.org/0.4/markings"]["isRequired"]);
                let markingsHeading = cfo["https://schema.cassproject.org/0.4/markings"]["heading"];
                if (markingsHeading) simpleConfigObj.fwkMarkingsHeading = markingsHeading.trim();
                else simpleConfigObj.fwkMarkingsHeading = "";
            }

            simpleConfigObj.fwkCustomProperties = [];
            let propertyKeys = Object.keys(cfo);
            for (let pk of propertyKeys) {
                if (this.isCustomPropertyKey('framework', pk)) {
                    simpleConfigObj.fwkCustomProperties.push(this.generateSimpleCustomPropertyObject(cfo[pk]));
                }
            }
        },
        buildSimpleConfigObjectTaxonomyData(simpleConfigObj, complexConfigObj) {
            let cfo = complexConfigObj["taxonomyConfig"];
            if (!cfo) {
                this.currentConfig = this.generateNewConfigObject();
                let obj = {};
                this.addTaxonomyConfigToObject(obj);
                cfo = obj.taxonomyConfig;
            }
            simpleConfigObj.taxonomyIdLabel = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonomyIdDescription = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonomyIdPriorty = cfo["@id"]["priority"];
            let idHeading = cfo["@id"]["heading"];
            if (idHeading) simpleConfigObj.taxonomyIdHeading = idHeading.trim();
            else simpleConfigObj.taxonomyIdHeading = "";
            simpleConfigObj.taxonomyNameLabel = cfo["http://purl.org/dc/terms/title"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonomyNameDescription = cfo["http://purl.org/dc/terms/title"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            let nameHeading = cfo["http://purl.org/dc/terms/title"]["heading"];
            if (nameHeading) simpleConfigObj.taxonomyNameHeading = nameHeading.trim();
            else simpleConfigObj.taxonomyNameHeading = "";
            simpleConfigObj.taxonomyDescLabel = cfo["http://purl.org/dc/terms/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonomyDescDescription = cfo["http://purl.org/dc/terms/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonomyDescPriority = cfo["http://purl.org/dc/terms/description"]["priority"];
            simpleConfigObj.taxonomyDescRequired = this.getBooleanValue(cfo["http://purl.org/dc/terms/description"]["isRequired"]);
            let descHeading = cfo["http://purl.org/dc/terms/description"]["heading"];
            if (descHeading) simpleConfigObj.taxonomyDescHeading = descHeading.trim();
            else simpleConfigObj.taxonomyDescHeading = "";

            simpleConfigObj.taxonomyCreatorLabel = cfo["http://purl.org/dc/terms/creator"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonomyCreatorDescription = cfo["http://purl.org/dc/terms/creator"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonomyCreatorPriority = cfo["http://purl.org/dc/terms/creator"]["priority"];
            simpleConfigObj.taxonomyCreatorRequired = this.getBooleanValue(cfo["http://purl.org/dc/terms/creator"]["isRequired"]);
            let creatorHeading = cfo["http://purl.org/dc/terms/creator"]["heading"];
            if (creatorHeading) simpleConfigObj.taxonomyCreatorHeading = creatorHeading.trim();
            else simpleConfigObj.taxonomyCreatorHeading = "";

            simpleConfigObj.taxonomyPublisherLabel = cfo["http://purl.org/dc/terms/publisher"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonomyPublisherDescription = cfo["http://purl.org/dc/terms/publisher"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonomyPublisherPriority = cfo["http://purl.org/dc/terms/publisher"]["priority"];
            simpleConfigObj.taxonomyPublisherRequired = this.getBooleanValue(cfo["http://purl.org/dc/terms/publisher"]["isRequired"]);
            let publisherHeading = cfo["http://purl.org/dc/terms/publisher"]["heading"];
            if (publisherHeading) simpleConfigObj.taxonomyPublisherHeading = publisherHeading.trim();
            else simpleConfigObj.taxonomyPublisherHeading = "";

            simpleConfigObj.taxonomyPubNameLabel = cfo["https://purl.org/ctdlasn/terms/publisherName"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonomyPubNameDescription = cfo["https://purl.org/ctdlasn/terms/publisherName"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonomyPubNamePriority = cfo["https://purl.org/ctdlasn/terms/publisherName"]["priority"];
            simpleConfigObj.taxonomyPubNameRequired = this.getBooleanValue(cfo["https://purl.org/ctdlasn/terms/publisherName"]["isRequired"]);
            let pubNameHeading = cfo["https://purl.org/ctdlasn/terms/publisherName"]["heading"];
            if (pubNameHeading) simpleConfigObj.taxonomyPubNameHeading = pubNameHeading.trim();
            else simpleConfigObj.taxonomyPubNameHeading = "";

            simpleConfigObj.taxonomyLangLabel = cfo["http://purl.org/dc/terms/language"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonomyLangDescription = cfo["http://purl.org/dc/terms/language"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonomyLangPriority = cfo["http://purl.org/dc/terms/language"]["priority"];
            simpleConfigObj.taxonomyLangRequired = this.getBooleanValue(cfo["http://purl.org/dc/terms/language"]["isRequired"]);
            let langHeading = cfo["http://purl.org/dc/terms/language"]["heading"];
            if (langHeading) simpleConfigObj.taxonomyLangHeading = langHeading.trim();
            else simpleConfigObj.taxonomyLangHeading = "";

            simpleConfigObj.taxonomySourceLabel = cfo["http://purl.org/dc/elements/1.1/source"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonomySourceDescription = cfo["http://purl.org/dc/elements/1.1/source"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonomySourcePriority = cfo["http://purl.org/dc/elements/1.1/source"]["priority"];
            simpleConfigObj.taxonomySourceRequired = this.getBooleanValue(cfo["http://purl.org/dc/elements/1.1/source"]["isRequired"]);
            let sourceHeading = cfo["http://purl.org/dc/elements/1.1/source"]["heading"];
            if (sourceHeading) simpleConfigObj.taxonomySourceHeading = sourceHeading.trim();
            else simpleConfigObj.taxonomySourceHeading = "";

            simpleConfigObj.taxonomyCustomProperties = [];
            let propertyKeys = Object.keys(cfo);
            for (let pk of propertyKeys) {
                if (this.isCustomPropertyKey('taxonomy', pk)) {
                    simpleConfigObj.taxonomyCustomProperties.push(this.generateSimpleCustomPropertyObject(cfo[pk]));
                }
            }
        },
        buildSimpleConfigObjectTaxonData(simpleConfigObj, complexConfigObj) {
            let cfo = complexConfigObj["taxonConfig"];
            if (!cfo) {
                this.currentConfig = this.generateNewConfigObject();
                let obj = {};
                this.addTaxonConfigToObject(obj);
                cfo = obj.taxonConfig;
            }
            simpleConfigObj.taxonIdLabel = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonIdDescription = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonIdPriorty = cfo["@id"]["priority"];
            let idHeading = cfo["@id"]["heading"];
            if (idHeading) simpleConfigObj.taxonIdHeading = idHeading.trim();
            else simpleConfigObj.taxonIdHeading = "";
            simpleConfigObj.taxonNameLabel = cfo["http://www.w3.org/2004/02/skos/core#prefLabel"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonNameDescription = cfo["http://www.w3.org/2004/02/skos/core#prefLabel"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            let nameHeading = cfo["http://www.w3.org/2004/02/skos/core#prefLabel"]["heading"];
            if (nameHeading) simpleConfigObj.taxonNameHeading = nameHeading.trim();
            else simpleConfigObj.taxonoNameHeading = "";
            simpleConfigObj.taxonDescLabel = cfo["http://www.w3.org/2004/02/skos/core#definition"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonDescDescription = cfo["http://www.w3.org/2004/02/skos/core#definition"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonDescPriority = cfo["http://www.w3.org/2004/02/skos/core#definition"]["priority"];
            simpleConfigObj.taxonDescRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#definition"]["isRequired"]);
            let descHeading = cfo["http://www.w3.org/2004/02/skos/core#definition"]["heading"];
            if (descHeading) simpleConfigObj.taxonDescHeading = descHeading.trim();
            else simpleConfigObj.taxonDescHeading = "";

            simpleConfigObj.taxonNotationLabel = cfo["http://www.w3.org/2004/02/skos/core#notation"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonNotationDescription = cfo["http://www.w3.org/2004/02/skos/core#notation"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonNotationPriority = cfo["http://www.w3.org/2004/02/skos/core#notation"]["priority"];
            simpleConfigObj.taxonNotationRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#notation"]["isRequired"]);
            let notationHeading = cfo["http://www.w3.org/2004/02/skos/core#notation"]["heading"];
            if (notationHeading) simpleConfigObj.taxonNotationHeading = notationHeading.trim();
            else simpleConfigObj.taxonNotationHeading = "";

            simpleConfigObj.taxonAltLabelLabel = cfo["http://www.w3.org/2004/02/skos/core#altLabel"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonAltLabelDescription = cfo["http://www.w3.org/2004/02/skos/core#altLabel"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonAltLabelPriority = cfo["http://www.w3.org/2004/02/skos/core#altLabel"]["priority"];
            simpleConfigObj.taxonAltLabelRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#altLabel"]["isRequired"]);
            let altLabelHeading = cfo["http://www.w3.org/2004/02/skos/core#altLabel"]["heading"];
            if (altLabelHeading) simpleConfigObj.taxonAltLabelHeading = altLabelHeading.trim();
            else simpleConfigObj.taxonAltLabelHeading = "";

            simpleConfigObj.taxonHiddenLabelLabel = cfo["http://www.w3.org/2004/02/skos/core#hiddenLabel"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonHiddenLabelDescription = cfo["http://www.w3.org/2004/02/skos/core#hiddenLabel"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonHiddenLabelPriority = cfo["http://www.w3.org/2004/02/skos/core#hiddenLabel"]["priority"];
            simpleConfigObj.taxonHiddenLabelRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#hiddenLabel"]["isRequired"]);
            let hiddenLabelHeading = cfo["http://www.w3.org/2004/02/skos/core#hiddenLabel"]["heading"];
            if (hiddenLabelHeading) simpleConfigObj.taxonHiddenLabelHeading = hiddenLabelHeading.trim();
            else simpleConfigObj.taxonHiddenLabelHeading = "";

            simpleConfigObj.taxonNoteLabel = cfo["http://www.w3.org/2004/02/skos/core#note"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonNoteDescription = cfo["http://www.w3.org/2004/02/skos/core#note"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonNotePriority = cfo["http://www.w3.org/2004/02/skos/core#note"]["priority"];
            simpleConfigObj.taxonNoteRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#note"]["isRequired"]);
            let noteHeading = cfo["http://www.w3.org/2004/02/skos/core#note"]["heading"];
            if (noteHeading) simpleConfigObj.taxonNoteHeading = noteHeading.trim();
            else simpleConfigObj.taxonNoteHeading = "";

            simpleConfigObj.taxonBroaderLabel = cfo["http://www.w3.org/2004/02/skos/core#broader"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonBroaderDescription = cfo["http://www.w3.org/2004/02/skos/core#broader"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonBroaderPriority = cfo["http://www.w3.org/2004/02/skos/core#broader"]["priority"];
            simpleConfigObj.taxonBroaderRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#broader"]["isRequired"]);
            let broaderHeading = cfo["http://www.w3.org/2004/02/skos/core#broader"]["heading"];
            if (broaderHeading) simpleConfigObj.taxonBroaderHeading = broaderHeading.trim();
            else simpleConfigObj.taxonBroaderHeading = "";

            simpleConfigObj.taxonNarrowerLabel = cfo["http://www.w3.org/2004/02/skos/core#narrower"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonNarrowerDescription = cfo["http://www.w3.org/2004/02/skos/core#narrower"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonNarrowerPriority = cfo["http://www.w3.org/2004/02/skos/core#narrower"]["priority"];
            simpleConfigObj.taxonNarrowerRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#narrower"]["isRequired"]);
            let narrowerHeading = cfo["http://www.w3.org/2004/02/skos/core#narrower"]["heading"];
            if (narrowerHeading) simpleConfigObj.taxonNarrowerHeading = narrowerHeading.trim();
            else simpleConfigObj.taxonNarrowerHeading = "";

            simpleConfigObj.taxonBroadMatchLabel = cfo["http://www.w3.org/2004/02/skos/core#broadMatch"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonBroadMatchDescription = cfo["http://www.w3.org/2004/02/skos/core#broadMatch"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonBroadMatchPriority = cfo["http://www.w3.org/2004/02/skos/core#broadMatch"]["priority"];
            simpleConfigObj.taxonBroadMatchRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#broadMatch"]["isRequired"]);
            let broadMatchHeading = cfo["http://www.w3.org/2004/02/skos/core#broadMatch"]["heading"];
            if (broadMatchHeading) simpleConfigObj.taxonBroadMatchHeading = broadMatchHeading.trim();
            else simpleConfigObj.taxonBroadMatchHeading = "";

            simpleConfigObj.taxonCloseMatchLabel = cfo["http://www.w3.org/2004/02/skos/core#closeMatch"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonCloseMatchDescription = cfo["http://www.w3.org/2004/02/skos/core#closeMatch"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonCloseMatchPriority = cfo["http://www.w3.org/2004/02/skos/core#closeMatch"]["priority"];
            simpleConfigObj.taxonCloseMatchRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#closeMatch"]["isRequired"]);
            let closeMatchHeading = cfo["http://www.w3.org/2004/02/skos/core#closeMatch"]["heading"];
            if (closeMatchHeading) simpleConfigObj.taxonCloseMatchHeading = closeMatchHeading.trim();
            else simpleConfigObj.taxonCloseMatchHeading = "";

            simpleConfigObj.taxonExactMatchLabel = cfo["http://www.w3.org/2004/02/skos/core#exactMatch"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonExactMatchDescription = cfo["http://www.w3.org/2004/02/skos/core#exactMatch"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonExactMatchPriority = cfo["http://www.w3.org/2004/02/skos/core#exactMatch"]["priority"];
            simpleConfigObj.taxonExactMatchRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#exactMatch"]["isRequired"]);
            let exactMatchHeading = cfo["http://www.w3.org/2004/02/skos/core#exactMatch"]["heading"];
            if (exactMatchHeading) simpleConfigObj.taxonExactMatchHeading = exactMatchHeading.trim();
            else simpleConfigObj.taxonExactMatchHeading = "";

            simpleConfigObj.taxonNarrowMatchLabel = cfo["http://www.w3.org/2004/02/skos/core#narrowMatch"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonNarrowMatchDescription = cfo["http://www.w3.org/2004/02/skos/core#narrowMatch"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonNarrowMatchPriority = cfo["http://www.w3.org/2004/02/skos/core#narrowMatch"]["priority"];
            simpleConfigObj.taxonNarrowMatchRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#narrowMatch"]["isRequired"]);
            let narrowMatchHeading = cfo["http://www.w3.org/2004/02/skos/core#narrowMatch"]["heading"];
            if (narrowMatchHeading) simpleConfigObj.taxonNarrowMatchHeading = narrowMatchHeading.trim();
            else simpleConfigObj.taxonNarrowMatchHeading = "";

            simpleConfigObj.taxonRelatedLabel = cfo["http://www.w3.org/2004/02/skos/core#related"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.taxonRelatedDescription = cfo["http://www.w3.org/2004/02/skos/core#related"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.taxonRelatedPriority = cfo["http://www.w3.org/2004/02/skos/core#related"]["priority"];
            simpleConfigObj.taxonRelatedRequired = this.getBooleanValue(cfo["http://www.w3.org/2004/02/skos/core#related"]["isRequired"]);
            let relatedHeading = cfo["http://www.w3.org/2004/02/skos/core#related"]["heading"];
            if (relatedHeading) simpleConfigObj.taxonRelatedHeading = relatedHeading.trim();
            else simpleConfigObj.taxonRelatedHeading = "";

            simpleConfigObj.taxonCustomProperties = [];
            let propertyKeys = Object.keys(cfo);
            for (let pk of propertyKeys) {
                if (this.isCustomPropertyKey('taxon', pk)) {
                    simpleConfigObj.taxonCustomProperties.push(this.generateSimpleCustomPropertyObject(cfo[pk]));
                }
            }
        },
        buildSimpleConfigObjectCompetencyData(simpleConfigObj, complexConfigObj) {
            let cco = complexConfigObj["competencyConfig"];
            let relHeading = cco["relationshipsHeading"];
            if (relHeading) simpleConfigObj.relationshipsHeading = relHeading.trim();
            else simpleConfigObj.relationshipsHeading = "";
            let relPriority = cco["relationshipsPriority"];
            if (relPriority) simpleConfigObj.relationshipsPriority = relPriority;
            else simpleConfigObj.relationshipsPriority = "tertiary";
            simpleConfigObj.compIdLabel = cco["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compIdDescription = cco["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compIdPriorty = cco["@id"]["priority"];
            let idHeading = cco["@id"]["heading"];
            if (idHeading) simpleConfigObj.compIdHeading = idHeading.trim();
            else simpleConfigObj.compIdHeading = "";
            simpleConfigObj.compNameLabel = cco["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compNameDescription = cco["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            let nameHeading = cco["http://schema.org/name"]["heading"];
            if (nameHeading) simpleConfigObj.compNameHeading = nameHeading.trim();
            else simpleConfigObj.compNameHeading = "";
            simpleConfigObj.compDescLabel = cco["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compDescDescription = cco["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compDescPriority = cco["http://schema.org/description"]["priority"];
            simpleConfigObj.compDescRequired = this.getBooleanValue(cco["http://schema.org/description"]["isRequired"]);
            let descHeading = cco["http://schema.org/description"]["heading"];
            if (descHeading) simpleConfigObj.compDescHeading = descHeading.trim();
            else simpleConfigObj.compDescHeading = "";
            let ccto = cco["http://purl.org/dc/terms/type"];
            simpleConfigObj.compTypeLabel = ccto["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compTypeDescription = ccto["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compTypePriority = ccto["priority"];
            if (ccto["heading"]) simpleConfigObj.compTypeHeading = ccto["heading"];
            else simpleConfigObj.compTypeHeading = "";
            simpleConfigObj.compTypeRequired = this.getBooleanValue(ccto["isRequired"]);
            simpleConfigObj.compEnforceTypes = false;
            simpleConfigObj.compEnforcedTypes = [];
            if (ccto.options && ccto.options.length > 0) {
                simpleConfigObj.compEnforceTypes = true;
                for (let et of ccto.options) {
                    let eto = {};
                    eto.display = et.display;
                    eto.value = et.val;
                    simpleConfigObj.compEnforcedTypes.push(eto);
                }
            }

            if (cco["https://schema.cassproject.org/0.4/classification"] != null) {
                simpleConfigObj.compClassLabel = cco["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                simpleConfigObj.compClassDescription = cco["https://schema.cassproject.org/0.4/classification"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
                simpleConfigObj.compClassPriority = cco["https://schema.cassproject.org/0.4/classification"]["priority"];
                simpleConfigObj.compClassRequired = this.getBooleanValue(cco["https://schema.cassproject.org/0.4/classification"]["isRequired"]);
                let classHeading = cco["https://schema.cassproject.org/0.4/classification"]["heading"];
                if (classHeading) simpleConfigObj.compClassHeading = classHeading.trim();
                else simpleConfigObj.compClassHeading = "";
            }

            if (cco["https://schema.cassproject.org/0.4/markings"] != null) {
                simpleConfigObj.compMarkingsLabel = cco["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                simpleConfigObj.compMarkingsDescription = cco["https://schema.cassproject.org/0.4/markings"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
                simpleConfigObj.compMarkingsPriority = cco["https://schema.cassproject.org/0.4/markings"]["priority"];
                simpleConfigObj.compMarkingsRequired = this.getBooleanValue(cco["https://schema.cassproject.org/0.4/markings"]["isRequired"]);
                let markingsHeading = cco["https://schema.cassproject.org/0.4/markings"]["heading"];
                if (markingsHeading) simpleConfigObj.compMarkingsHeading = markingsHeading.trim();
                else simpleConfigObj.compMarkingsHeading = "";
            }
            simpleConfigObj.compCustomProperties = [];
            let propertyKeys = Object.keys(cco);
            for (let pk of propertyKeys) {
                if (this.isCustomPropertyKey('competency', pk)) {
                    simpleConfigObj.compCustomProperties.push(this.generateSimpleCustomPropertyObject(cco[pk]));
                }
            }
        },
        buildSimpleConfigObjectLevelData(simpleConfigObj, complexConfigObj) {
            simpleConfigObj.compAllowLevels = false;
            simpleConfigObj.levelLabel = '';
            simpleConfigObj.levelDescription = '';
            simpleConfigObj.enforceLevelValues = false;
            simpleConfigObj.enforcedLevelValues = [];
            simpleConfigObj.levelPriority = 'secondary';
            simpleConfigObj.levelHeading = '';
            if (complexConfigObj["levelsConfig"] && complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]) {
                let lo = complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"];
                simpleConfigObj.compAllowLevels = true;
                if (lo["priority"]) simpleConfigObj.levelPriority = lo["priority"];
                else simpleConfigObj.levelPriority = "secondary";
                if (lo["heading"]) simpleConfigObj.levelHeading = lo["heading"];
                else simpleConfigObj.levelHeading = "";
                simpleConfigObj.levelLabel = lo["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                simpleConfigObj.levelDescription = lo["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
                if (complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]["options"]) {
                    let complexLevelsEnforced = complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]["options"];
                    if (complexLevelsEnforced.length > 0) {
                        simpleConfigObj.enforceLevelValues = true;
                        for (let cLvl of complexLevelsEnforced) {
                            simpleConfigObj.enforcedLevelValues.push(cLvl["val"]);
                        }
                    }
                }
            }
        },
        buildSimpleRelationshipConfigObject(simpleConfigObj, complexRelationshipObj, relationshipName, defaultLabel) {
            simpleConfigObj.relationships[relationshipName] = {};
            if (complexRelationshipObj[relationshipName]) {
                simpleConfigObj.relationships[relationshipName].label = complexRelationshipObj[relationshipName]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                simpleConfigObj.relationships[relationshipName].enabled = true;
            } else {
                simpleConfigObj.relationships[relationshipName].label = defaultLabel;
                simpleConfigObj.relationships[relationshipName].enabled = false;
            }
        },
        buildSimpleConfigObjectRelationshipData(simpleConfigObj, complexConfigObj) {
            let cro = complexConfigObj["relationshipConfig"];
            simpleConfigObj.relationships = {};
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isEnabledBy", "is enabled by");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "requires", "requires");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "desires", "desires");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "narrows", "narrows");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isRelatedTo", "is related to");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isEquivalentTo", "is equivalent to");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "broadens", "broadens");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "majorRelated", "is majorly related to");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "minorRelated", "is minorly related to");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isSimilarTo", "is similar to");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isPartiallySameAs", "is partially the same as");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "enables", "enables");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "hasChild", "has child");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isChildOf", "is child of");
        },
        buildSimpleConfigObjectAlignmentData(simpleConfigObj, complexConfigObj) {
            let caa = complexConfigObj["alignConfig"];
            simpleConfigObj.alignments = {};
            simpleConfigObj.alignments.teaches = caa.includes("teaches");
            simpleConfigObj.alignments.assesses = caa.includes("assesses");
            simpleConfigObj.alignments.requires = caa.includes("requires");
            simpleConfigObj.alignments.desires = caa.includes("desires");
        },
        buildSimpleConfigDefaultPermissionData(simpleConfigObj, complexConfigObj) {
            if (complexConfigObj["defaultObjectOwners"]) {
                simpleConfigObj.defaultOwners = complexConfigObj["defaultObjectOwners"];
            } else simpleConfigObj.defaultOwners = [];
            if (complexConfigObj["defaultObjectReaders"]) {
                simpleConfigObj.defaultReaders = complexConfigObj["defaultObjectReaders"];
            } else simpleConfigObj.defaultReaders = [];
            if (complexConfigObj["defaultCommenters"]) {
                simpleConfigObj.defaultCommenters = complexConfigObj["defaultCommenters"];
            } else simpleConfigObj.defaultCommenters = [];
        },
        generateSimpleConfigObject(cco) {
            let simpleConfigObj = {};
            simpleConfigObj.id = cco.shortId();
            if (this.isObjectOwnerless(cco) || this.doesAnyIdentityOwnObject(cco)) simpleConfigObj.isOwned = true;
            else simpleConfigObj.isOwned = false;
            simpleConfigObj.isNew = false;
            simpleConfigObj.name = cco.getName();
            simpleConfigObj.description = cco.getDescription();
            simpleConfigObj.isDefault = this.getBooleanValue(cco.isDefault);
            if (simpleConfigObj.isDefault) this.defaultConfigId = simpleConfigObj.id;
            this.buildSimpleConfigObjectFrameworkData(simpleConfigObj, cco);
            this.buildSimpleConfigObjectTaxonomyData(simpleConfigObj, cco);
            this.buildSimpleConfigObjectTaxonData(simpleConfigObj, cco);
            this.buildSimpleConfigObjectCompetencyData(simpleConfigObj, cco);
            this.buildSimpleConfigObjectLevelData(simpleConfigObj, cco);
            this.buildSimpleConfigObjectRelationshipData(simpleConfigObj, cco);
            this.buildSimpleConfigObjectAlignmentData(simpleConfigObj, cco);
            this.buildSimpleConfigDefaultPermissionData(simpleConfigObj, cco);
            return simpleConfigObj;
        },
        generateCustomPropertyAvailableConcepts() {
            repo.searchWithParams('@type:ConceptScheme',
                {size: 10000},
                null,
                null,
                null,
                null
            ).then((results) => {
                let concepts = [];
                for (let concept = 0; concept < results.length; concept++) {
                    concepts.push({
                        display: EcRemoteLinkedData.getDisplayStringFrom(results[concept]["dcterms:title"]),
                        value: results[concept].id
                    });
                }
                this.$store.commit('configuration/setAvailableConcepts', concepts);
            }).catch((err) => {
                appLog("failed to retrieve concepts: " + err);
            });
        },
        generateCustomPropertyAvailableTypes() {
            let types = [];
            this.configList.forEach((config) => {
                if (config.compEnforceTypes) {
                    types.push(...config.compEnforcedTypes);
                }
            });
            this.$store.commit('configuration/setAvailableTypes', types);
        },
        searchRepositoryForConfigsSuccess(ecRemoteLda) {
            appLog("Config search success: ");
            appLog(ecRemoteLda);
            this.configList = [];
            for (let ecrld of ecRemoteLda) {
                let t = new schema.Thing();
                t.copyFrom(ecrld);
                this.configList.push(this.generateSimpleConfigObject(t));
            }
            this.sortConfigList();
            this.generateCustomPropertyAvailableConcepts();
            this.generateCustomPropertyAvailableTypes();
            this.configBusy = false;
        },
        searchRepositoryForConfigsFailure(msg) {
            appLog("Config search failure: " + msg);
            this.configBusy = false;
        },
        buildConfigListFromRepository() {
            let paramObj = {};
            paramObj.size = this.buildConfigListFromRepository_SIZE;
            window.repo.searchWithParams("@type:Configuration", paramObj, null, this.searchRepositoryForConfigsSuccess, this.searchRepositoryForConfigsFailure);
        },
        buildConfigList() {
            this.configBusy = true;
            this.complexConfigObject = {};
            this.buildConfigListFromRepository();
        },
        setConfigAsBrowserDefault(configId) {
            let bdc = this.getConfigById(configId);
            this.setDefaultBrowserConfigId(configId);
            this.defaultBrowserConfigName = bdc.name;
            this.$store.commit('configuration/setLocalDefaultBrowserConfig', configId);
            this.$store.commit('configuration/setShowBrowserConfigSetModal', true);
        },
        removeConfigAsBrowserDefault(configId) {
            this.removeDefaultBrowserConfig();
            this.$store.commit('configuration/setDefaultBrowserConfigName', '');
            this.$store.commit('configuration/setLocalDefaultBrowserConfig', '');
            this.$store.commit('configuration/setShowBrowserConfigSetModal', false);
        },
        generateNewConfigObject() {
            let newConfigObj = {};
            newConfigObj.id = "newConfigId";
            newConfigObj.isOwned = true;
            newConfigObj.isNew = true;
            newConfigObj.name = "New Configuration";
            newConfigObj.description = "New configuration";
            newConfigObj.isDefault = false;
            newConfigObj.fwkIdLabel = "Framework ID";
            newConfigObj.fwkIdDescription = "ID of the framework";
            newConfigObj.fwkIdPriorty = "primary";
            newConfigObj.fwkIdHeading = "";
            newConfigObj.fwkNameLabel = "Framework Name";
            newConfigObj.fwkNameDescription = "Name of the framework";
            newConfigObj.fwkNameHeading = "";
            newConfigObj.fwkDescLabel = "Framework Description";
            newConfigObj.fwkDescDescription = "Description of the framework";
            newConfigObj.fwkDescPriority = "primary";
            newConfigObj.fwkDescRequired = true;
            newConfigObj.fwkDescHeading = "";
            newConfigObj.fwkClassLabel = "Classification";
            newConfigObj.fwkClassDescription = "Classification of the framework";
            newConfigObj.fwkClassPriority = "primary";
            newConfigObj.fwkClassRequired = false;
            newConfigObj.fwkClassHeading = "";
            newConfigObj.fwkMarkingsLabel = "Markings";
            newConfigObj.fwkMarkingsDescription = "Markings of the framework";
            newConfigObj.fwkMarkingsPriority = "primary";
            newConfigObj.fwkMarkingsRequired = false;
            newConfigObj.fwkMarkingsHeading = "";
            newConfigObj.compAllowLevels = true;
            newConfigObj.levelLabel = 'Level';
            newConfigObj.levelDescription = 'Level of the competency';
            newConfigObj.enforceLevelValues = false;
            newConfigObj.enforcedLevelValues = [];
            newConfigObj.levelPriority = 'secondary';
            newConfigObj.levelHeading = "";
            newConfigObj.compIdLabel = "Competency ID";
            newConfigObj.compIdDescription = "ID of the competency";
            newConfigObj.compIdPriorty = "primary";
            newConfigObj.compIdHeading = "";
            newConfigObj.compNameLabel = "Competency Name";
            newConfigObj.compNameDescription = "Name of the competency";
            newConfigObj.compNameHeading = "";
            newConfigObj.compDescLabel = "Competency Description";
            newConfigObj.compDescDescription = "Description of the competency";
            newConfigObj.compDescPriority = "primary";
            newConfigObj.compDescRequired = false;
            newConfigObj.compDescHeading = "";
            newConfigObj.compTypeLabel = "Competency Type";
            newConfigObj.compTypeDescription = "Type of the competency";
            newConfigObj.compTypePriority = "secondary";
            newConfigObj.compTypeRequired = false;
            newConfigObj.compTypeHeading = "";
            newConfigObj.compClassLabel = "Classification";
            newConfigObj.compClassDescription = "Classification of the competency";
            newConfigObj.compClassPriority = "primary";
            newConfigObj.compClassRequired = false;
            newConfigObj.compClassHeading = "";
            newConfigObj.compMarkingsLabel = "Markings";
            newConfigObj.compMarkingsDescription = "Markings of the competency";
            newConfigObj.compMarkingsPriority = "primary";
            newConfigObj.compMarkingsRequired = false;
            newConfigObj.compMarkingsHeading = "";
            newConfigObj.compEnforceTypes = false;
            newConfigObj.compEnforcedTypes = [];
            newConfigObj.fwkCustomProperties = [];
            newConfigObj.compCustomProperties = [];
            newConfigObj.relationshipsHeading = '';
            newConfigObj.relationshipsPriority = "tertiary";
            newConfigObj.relationships = {};
            newConfigObj.relationships.isEnabledBy = {};
            newConfigObj.relationships.isEnabledBy.label = 'is enabled by';
            newConfigObj.relationships.isEnabledBy.enabled = true;
            newConfigObj.relationships.requires = {};
            newConfigObj.relationships.requires.label = 'requires';
            newConfigObj.relationships.requires.enabled = true;
            newConfigObj.relationships.desires = {};
            newConfigObj.relationships.desires.label = 'desires';
            newConfigObj.relationships.desires.enabled = true;
            newConfigObj.relationships.narrows = {};
            newConfigObj.relationships.narrows.label = 'narrows';
            newConfigObj.relationships.narrows.enabled = true;
            newConfigObj.relationships.isRelatedTo = {};
            newConfigObj.relationships.isRelatedTo.label = 'is related to';
            newConfigObj.relationships.isRelatedTo.enabled = true;
            newConfigObj.relationships.isEquivalentTo = {};
            newConfigObj.relationships.isEquivalentTo.label = 'is equivalent to';
            newConfigObj.relationships.isEquivalentTo.enabled = true;
            newConfigObj.relationships.broadens = {};
            newConfigObj.relationships.broadens.label = 'broadens';
            newConfigObj.relationships.broadens.enabled = false;
            newConfigObj.relationships.majorRelated = {};
            newConfigObj.relationships.majorRelated.label = 'is majorly related to';
            newConfigObj.relationships.majorRelated.enabled = false;
            newConfigObj.relationships.minorRelated = {};
            newConfigObj.relationships.minorRelated.label = 'is minorly related to';
            newConfigObj.relationships.minorRelated.enabled = false;
            newConfigObj.relationships.isSimilarTo = {};
            newConfigObj.relationships.isSimilarTo.label = 'is similar to';
            newConfigObj.relationships.isSimilarTo.enabled = false;
            newConfigObj.relationships.isPartiallySameAs = {};
            newConfigObj.relationships.isPartiallySameAs.label = 'is partially the same as';
            newConfigObj.relationships.isPartiallySameAs.enabled = false;
            newConfigObj.relationships.enables = {};
            newConfigObj.relationships.enables.label = 'enables';
            newConfigObj.relationships.enables.enabled = false;
            newConfigObj.relationships.hasChild = {};
            newConfigObj.relationships.hasChild.label = 'has child';
            newConfigObj.relationships.hasChild.enabled = false;
            newConfigObj.relationships.isChildOf = {};
            newConfigObj.relationships.isChildOf.label = 'is child of';
            newConfigObj.relationships.isChildOf.enabled = false;
            newConfigObj.alignments = {};
            newConfigObj.alignments.teaches = true;
            newConfigObj.alignments.assesses = true;
            newConfigObj.alignments.requires = true;
            newConfigObj.alignments.desires = true;
            newConfigObj.defaultOwners = [];
            newConfigObj.defaultReaders = [];
            newConfigObj.defaultCommenters = [];
            newConfigObj.taxonomyIdLabel = "Canonical URL";
            newConfigObj.taxonomyIdDescription = "The URL of the concept scheme. If imported from another source, the URL of the concept scheme from which this one originates.";
            newConfigObj.taxonomyIdPriorty = "primary";
            newConfigObj.taxonomyIdHeading = "Keys";
            newConfigObj.taxonomyNameLabel = "Title";
            newConfigObj.taxonomyNameDescription = "The name or title of this resource.";
            newConfigObj.taxonomyNameHeading = "General";
            newConfigObj.taxonomyNamePriority = "primary";
            newConfigObj.taxonomyDescLabel = "Description";
            newConfigObj.taxonomyDescDescription = "A short description of this resource. One definition per language";
            newConfigObj.taxonomyDescPriority = "primary";
            newConfigObj.taxonomyDescRequired = false;
            newConfigObj.taxonomyDescHeading = "General";
            newConfigObj.taxonomyCreatorLabel = "Creator";
            newConfigObj.taxonomyCreatorDescription = "An entity primarily responsible for making this resource. For example, https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/. One entity per line.";
            newConfigObj.taxonomyCreatorHeading = "General";
            newConfigObj.taxonomyCreatorPriority = "secondary";
            newConfigObj.taxonomyPublisherLabel = "Publisher";
            newConfigObj.taxonomyPublisherDescription = "An agent responsible for making this entity available. For example, https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.";
            newConfigObj.taxonomyPublisherHeading = "General";
            newConfigObj.taxonomyPublisherPriority = "secondary";
            newConfigObj.taxonomyPubNameLabel = "Publisher Name";
            newConfigObj.taxonomyPubNameDescription = "Name of an agent responsible for making this resource available. One name per line.";
            newConfigObj.taxonomyPubNameHeading = "General";
            newConfigObj.taxonomyPubNamePriority = "secondary";
            newConfigObj.taxonomyLangLabel = "Language";
            newConfigObj.taxonomyLangDescription = "The primary language used in or by this resource. One language per line.";
            newConfigObj.taxonomyLangHeading = "General";
            newConfigObj.taxonomyLangPriority = "secondary";
            newConfigObj.taxonomySourceLabel = "Source";
            newConfigObj.taxonomySourceDescription = "A URI to the original resource which this resource is based on or derived from. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.";
            newConfigObj.taxonomySourceHeading = "General";
            newConfigObj.taxonomySourcePriority = "secondary";
            newConfigObj.taxonomyCustomProperties = [];
            newConfigObj.taxonIdLabel = "Canonical URL";
            newConfigObj.taxonIdDescription = "The URL of the concept. If imported from another source, the URL of the concept from which this one originates.";
            newConfigObj.taxonIdPriorty = "primary";
            newConfigObj.taxonIdHeading = "Keys";
            newConfigObj.taxonNameLabel = "Preferred Label";
            newConfigObj.taxonNameDescription = "Preferred language-tagged label representing this concept. One label per language.";
            newConfigObj.taxonNameHeading = "General";
            newConfigObj.taxonomyNamePriority = "primary";
            newConfigObj.taxonDescLabel = "Definition";
            newConfigObj.taxonDescDescription = "Supplies a complete explanation of the intended meaning of a concept. One definition per language.";
            newConfigObj.taxonDescPriority = "primary";
            newConfigObj.taxonDescHeading = "General";
            newConfigObj.taxonNotationLabel = "Notation";
            newConfigObj.taxonNotationDescription = "Alphanumeric notation or ID code as defined by the promulgating body to identify this resource.";
            newConfigObj.taxonNotationHeading = "General";
            newConfigObj.taxonNotationPriority = "secondary";
            newConfigObj.taxonAltLabelLabel = "Alternative Label";
            newConfigObj.taxonAltLabelDescription = "Non-preferred label for the concept used to relate a concept synonym to the preferred label.";
            newConfigObj.taxonAltLabelHeading = "Other Labels";
            newConfigObj.taxonAltLabelPriority = "secondary";
            newConfigObj.taxonHiddenLabelLabel = "Hidden Label";
            newConfigObj.taxonHiddenLabelDescription = "Label not intended for public presentation but to assist applications in disambiguating searcher intent - e.g., hidden labels can be used for common misspelling or a colloquial expression.";
            newConfigObj.taxonHiddenLabelHeading = "Other Labels";
            newConfigObj.taxonHiddenLabelPriority = "tertiary";
            newConfigObj.taxonNoteLabel = "Note";
            newConfigObj.taxonNoteDescription = "Annotations to the concept for purposes of general documentation.";
            newConfigObj.taxonNoteHeading = "Documentation";
            newConfigObj.taxonNotePriority = "secondary";
            newConfigObj.taxonBroaderLabel = "Broader";
            newConfigObj.taxonBroaderDescription = "Concept that is broader in some way than this concept.";
            newConfigObj.taxonBroaderHeading = "Connections";
            newConfigObj.taxonBroaderPriority = "tertiary";
            newConfigObj.taxonNarrowerLabel = "Narrower";
            newConfigObj.taxonNarrowerDescription = "Concept that is narrower in some way than this concept.";
            newConfigObj.taxonNarrowerHeading = "Connections";
            newConfigObj.taxonNarrowerPriority = "tertiary";
            newConfigObj.taxonBroadMatchLabel = "Broad Match";
            newConfigObj.taxonBroadMatchDescription = "Assertion indicates that the referenced concept is broader in some way than this concept.";
            newConfigObj.taxonBroadMatchHeading = "Connections";
            newConfigObj.taxonBroadMatchPriority = "tertiary";
            newConfigObj.taxonCloseMatchLabel = "Close Match";
            newConfigObj.taxonCloseMatchDescription = "Assertion indicates that two concepts are sufficiently similar that they can be used interchangeably.";
            newConfigObj.taxonCloseMatchHeading = "Connections";
            newConfigObj.taxonCloseMatchPriority = "tertiary";
            newConfigObj.taxonExactMatchLabel = "Exact Match";
            newConfigObj.taxonExactMatchDescription = "Indicates semantic similarity denoting an even higher degree of closeness than Close Match.";
            newConfigObj.taxonExactMatchHeading = "Connections";
            newConfigObj.taxonExactMatchPriority = "tertiary";
            newConfigObj.taxonNarrowMatchLabel = "Narrow Match";
            newConfigObj.taxonNarrowMatchDescription = "Assertion indicates that the referenced concept is narrower in some way than this concept.";
            newConfigObj.taxonNarrowMatchHeading = "Connections";
            newConfigObj.taxonNarrowMatchPriority = "tertiary";
            newConfigObj.taxonRelatedLabel = "Related";
            newConfigObj.taxonRelatedDescription = "URL of an associatively related concept.";
            newConfigObj.taxonRelatedHeading = "Connections";
            newConfigObj.taxonRelatedPriority = "tertiary";
            newConfigObj.taxonCustomProperties = [];
            return newConfigObj;
        },
        addCustomPropertiesToPriorityArray(customProperties, priorityArray, priority) {
            if (customProperties != null) {
                for (let prop of customProperties) {
                    if (prop.priority.equalsIgnoreCase(priority)) {
                        priorityArray.push(this.generateCustomPropertyNameId(prop));
                    }
                }
            }
        },
        addCustomPropertiesToHeadingsObj(customProperties, headingsObj) {
            if (customProperties != null) {
                for (let prop of customProperties) {
                    if (prop.heading && !prop.heading.trim().equals('')) {
                        headingsObj[prop.heading.trim()] = 'x';
                    }
                }
            }
        },
        generatePropertyConfigObject(id, domain, range, description, label, priority, required, readOnly, noTextEditing, isDirectLink, permittedValues, permittedConcepts, permittedTypes, heading, allowMultiples, onePerLanguage) {
            let propObj = {};
            propObj["@id"] = id;
            propObj["@type"] = "http://www.w3.org/2000/01/rdf-schema#Property";
            propObj["http://schema.org/domainIncludes"] = [];
            let domainObj = {};
            domainObj["@id"] = domain.trim();
            propObj["http://schema.org/domainIncludes"].push(domainObj);
            propObj["http://schema.org/rangeIncludes"] = [];
            let rangeObj = {};
            rangeObj["@id"] = range.trim();
            propObj["http://schema.org/rangeIncludes"].push(rangeObj);
            propObj["http://www.w3.org/2000/01/rdf-schema#comment"] = [];
            let commentObj = {};
            commentObj["@language"] = "en";
            commentObj["@value"] = description.trim();
            propObj["http://www.w3.org/2000/01/rdf-schema#comment"].push(commentObj);
            propObj["http://www.w3.org/2000/01/rdf-schema#label"] = [];
            let labelObj = {};
            labelObj["@language"] = "en";
            labelObj["@value"] = label.trim();
            propObj["http://www.w3.org/2000/01/rdf-schema#label"].push(labelObj);
            propObj.priority = priority;
            propObj.isRequired = required;
            propObj.readOnly = readOnly;
            propObj.noTextEditing = noTextEditing;
            propObj.isDirectLink = isDirectLink;
            if (!allowMultiples) propObj.max = 1;
            if (range.equalsIgnoreCase(this.LANG_STRING_RANGE)) propObj.onePerLanguage = onePerLanguage;
            if (permittedValues && permittedValues.length > 0) {
                propObj.options = [];
                for (let pv of permittedValues) {
                    let option = {};
                    option.display = pv.display.trim();
                    option.val = pv.value.trim();
                    propObj.options.push(option);
                }
            } else if (permittedConcepts && permittedConcepts.length > 0) {
                propObj.options = [];
                for (let pv of permittedConcepts) {
                    let option = {};
                    option.display = pv.display.trim();
                    option.val = pv.value.trim();
                    propObj.options.push(option);
                }
            } else if (permittedTypes && permittedTypes.length > 0) {
                propObj.options = [];
                for (let pv of permittedTypes) {
                    let option = {};
                    option.display = pv.display.trim();
                    option.val = pv.value.trim();
                    propObj.options.push(option);
                }
            }

            if (heading && !heading.trim().equals('')) propObj.heading = heading.trim();
            else if (this.enforceHeadings) propObj.heading = this.DEFAULT_HEADING;
            return propObj;
        },
        buildCustomPropertiesConfigObjects(parentConf, domain, customProperties) {
            if (customProperties != null) {
                for (let prop of customProperties) {
                    let id = this.generateCustomPropertyNameId(prop);
                    parentConf[id] = this.generatePropertyConfigObject(
                        id,
                        domain,
                        prop.range,
                        prop.description,
                        prop.label,
                        prop.priority,
                        prop.required,
                        false,
                        prop.noTextEditing,
                        prop.isDirectLink,
                        prop.permittedValues,
                        prop.permittedConcepts,
                        prop.permittedTypes,
                        prop.heading,
                        prop.allowMultiples,
                        prop.onePerLanguage);
                }
            }
        },
        buildTaxonomyConfigPriorityArrays(taxonomyConf) {
            taxonomyConf.primaryProperties = [];
            taxonomyConf.primaryProperties.push("http://purl.org/dc/terms/title");
            if (this.currentConfig.taxonomyIdPriorty.equalsIgnoreCase("primary")) taxonomyConf.primaryProperties.push("@id");
            if (this.currentConfig.taxonomyDescPriority.equalsIgnoreCase("primary")) taxonomyConf.primaryProperties.push("http://purl.org/dc/terms/description");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonomyCustomProperties, taxonomyConf.primaryProperties, "primary");
            taxonomyConf.secondaryProperties = [];
            if (this.currentConfig.taxonomyIdPriorty.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("@id");
            if (this.currentConfig.taxonomyDescPriority.equalsIgnoreCase("secondary")) taxonomyConf.secondaryProperties.push("http://purl.org/dc/terms/description");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonomyCustomProperties, taxonomyConf.secondaryProperties, "secondary");
            taxonomyConf.tertiaryProperties = [];
            if (this.currentConfig.taxonomyIdPriorty.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("@id");
            if (this.currentConfig.taxonomyDescPriority.equalsIgnoreCase("tertiary")) taxonomyConf.tertiaryProperties.push("http://purl.org/dc/terms/description");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonomyCustomProperties, taxonomyConf.tertiaryProperties, "tertiary");
        },
        buildTaxonomyIdConfigObject(taxonomyConf) {
            taxonomyConf["@id"] = this.generatePropertyConfigObject(
                "https://schema.cassproject.org/0.4/ConceptScheme/id",
                "https://schema.cassproject.org/0.4/ConceptScheme",
                "http://schema.org/URL",
                this.currentConfig.taxonomyIdDescription,
                this.currentConfig.taxonomyIdLabel,
                this.currentConfig.taxonomyIdPriorty,
                true,
                true,
                true,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonomyIdHeading,
                false,
                true);
        },
        buildTaxonomyNameConfigObject(taxonomyConf) {
            taxonomyConf["http://purl.org/dc/terms/title"] = this.generatePropertyConfigObject(
                "http://purl.org/dc/terms/title",
                "https://schema.cassproject.org/0.4/ConceptScheme",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.taxonomyNameDescription,
                this.currentConfig.taxonomyNameLabel,
                "primary",
                true,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonomyNameHeading,
                false,
                true);
        },
        buildTaxonomyDescConfigObject(taxonomyConf) {
            taxonomyConf["http://purl.org/dc/terms/description"] = this.generatePropertyConfigObject(
                "http://purl.org/dc/terms/description",
                "https://schema.cassproject.org/0.4/ConceptScheme",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.taxonomyDescDescription,
                this.currentConfig.taxonomyDescLabel,
                this.currentConfig.taxonomyDescPriority,
                this.currentConfig.taxonomyDescRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonomyDescHeading,
                false,
                true);
        },
        buildTaxonomyCreatorConfigObject(taxonomyConf) {
            taxonomyConf["http://purl.org/dc/terms/creator"] = this.generatePropertyConfigObject(
                "http://purl.org/dc/terms/creator",
                "http://schema.cassproject.org/0.4/skos/ConceptScheme",
                "http://schema.org/URL",
                this.currentConfig.taxonomyCreatorDescription,
                this.currentConfig.taxonomyCreatorLabel,
                this.currentConfig.taxonomyCreatorPriority,
                this.currentConfig.taxonomyCreatorRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonomyCreatorHeading,
                false,
                true);
        },
        buildTaxonomyPublisherConfigObject(taxonomyConf) {
            taxonomyConf["http://purl.org/dc/terms/publisher"] = this.generatePropertyConfigObject(
                "http://purl.org/dc/terms/publisher",
                "http://schema.cassproject.org/0.4/skos/ConceptScheme",
                "http://schema.org/URL",
                this.currentConfig.taxonomyPublisherDescription,
                this.currentConfig.taxonomyPublisherLabel,
                this.currentConfig.taxonomyPublisherPriority,
                this.currentConfig.taxonomyPublisherRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonomyPublisherHeading,
                false,
                true);
        },
        buildTaxonomyPubNameConfigObject(taxonomyConf) {
            taxonomyConf["https://purl.org/ctdlasn/terms/publisherName"] = this.generatePropertyConfigObject(
                "https://purl.org/ctdlasn/terms/publisherName",
                "http://schema.cassproject.org/0.4/skos/ConceptScheme",
                "http://schema.org/Text",
                this.currentConfig.taxonomyPubNameDescription,
                this.currentConfig.taxonomyPubNameLabel,
                this.currentConfig.taxonomyPubNamePriority,
                this.currentConfig.taxonomyPubNameRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonomyPubNameHeading,
                false,
                true);
        },
        buildTaxonomyLangConfigObject(taxonomyConf) {
            taxonomyConf["http://purl.org/dc/terms/language"] = this.generatePropertyConfigObject(
                "http://purl.org/dc/terms/language",
                "http://schema.cassproject.org/0.4/skos/ConceptScheme",
                "http://schema.org/Text",
                this.currentConfig.taxonomyLangDescription,
                this.currentConfig.taxonomyLangLabel,
                this.currentConfig.taxonomyLangPriority,
                this.currentConfig.taxonomyLangRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonomyLangHeading,
                false,
                true);
        },
        buildTaxonomySourceConfigObject(taxonomyConf) {
            taxonomyConf["http://purl.org/dc/elements/1.1/source"] = this.generatePropertyConfigObject(
                "http://purl.org/dc/elements/1.1/source",
                "http://schema.cassproject.org/0.4/skos/ConceptScheme",
                "http://schema.org/URL",
                this.currentConfig.taxonomySourceDescription,
                this.currentConfig.taxonomySourceLabel,
                this.currentConfig.taxonomySourcePriority,
                this.currentConfig.taxonomySourceRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonomySourceHeading,
                false,
                true);
        },
        buildFrameworkConfigPriorityArrays(fwkConf) {
            fwkConf.primaryProperties = [];
            fwkConf.primaryProperties.push("http://schema.org/name");
            if (this.currentConfig.fwkIdPriorty.equalsIgnoreCase("primary")) fwkConf.primaryProperties.push("@id");
            if (this.currentConfig.fwkDescPriority.equalsIgnoreCase("primary")) fwkConf.primaryProperties.push("http://schema.org/description");
            if (this.currentConfig.fwkClassPriority.equalsIgnoreCase("primary")) fwkConf.primaryProperties.push("https://schema.cassproject.org/0.4/classification");
            if (this.currentConfig.fwkMarkingsPriority.equalsIgnoreCase("primary")) fwkConf.primaryProperties.push(("https://schema.cassproject.org/0.4/markings"));
            this.addCustomPropertiesToPriorityArray(this.currentConfig.fwkCustomProperties, fwkConf.primaryProperties, "primary");
            fwkConf.secondaryProperties = [];
            if (this.currentConfig.fwkIdPriorty.equalsIgnoreCase("secondary")) fwkConf.secondaryProperties.push("@id");
            if (this.currentConfig.fwkDescPriority.equalsIgnoreCase("secondary")) fwkConf.secondaryProperties.push("http://schema.org/description");
            if (this.currentConfig.fwkClassPriority.equalsIgnoreCase("secondary")) fwkConf.secondaryProperties.push("https://schema.cassproject.org/0.4/classification");
            if (this.currentConfig.fwkMarkingsPriority.equalsIgnoreCase("secondary")) fwkConf.secondaryProperties.push(("https://schema.cassproject.org/0.4/markings"));
            this.addCustomPropertiesToPriorityArray(this.currentConfig.fwkCustomProperties, fwkConf.secondaryProperties, "secondary");
            fwkConf.tertiaryProperties = [];
            if (this.currentConfig.fwkIdPriorty.equalsIgnoreCase("tertiary")) fwkConf.tertiaryProperties.push("@id");
            if (this.currentConfig.fwkDescPriority.equalsIgnoreCase("tertiary")) fwkConf.tertiaryProperties.push("http://schema.org/description");
            if (this.currentConfig.fwkClassPriority.equalsIgnoreCase("tertiary")) fwkConf.tertiaryProperties.push("https://schema.cassproject.org/0.4/classification");
            if (this.currentConfig.fwkMarkingsPriority.equalsIgnoreCase("tertiary")) fwkConf.tertiaryProperties.push(("https://schema.cassproject.org/0.4/markings"));
            this.addCustomPropertiesToPriorityArray(this.currentConfig.fwkCustomProperties, fwkConf.tertiaryProperties, "tertiary");
        },
        buildFrameworkIdConfigObject(fwkConf) {
            fwkConf["@id"] = this.generatePropertyConfigObject(
                "https://schema.cassproject.org/0.4/Framework/id",
                "http://schema.cassproject.org/0.3/Framework",
                "http://schema.org/URL",
                this.currentConfig.fwkIdDescription,
                this.currentConfig.fwkIdLabel,
                this.currentConfig.fwkIdPriorty,
                true,
                true,
                true,
                false,
                null,
                null,
                null,
                this.currentConfig.fwkIdHeading,
                false,
                true);
        },
        buildFrameworkNameConfigObject(fwkConf) {
            fwkConf["http://schema.org/name"] = this.generatePropertyConfigObject(
                "http://schema.org/name",
                "http://schema.cassproject.org/0.3/Framework",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.fwkNameDescription,
                this.currentConfig.fwkNameLabel,
                "primary",
                true,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.fwkNameHeading,
                false,
                true);
        },
        buildFrameworkDescConfigObject(fwkConf) {
            fwkConf["http://schema.org/description"] = this.generatePropertyConfigObject(
                "http://schema.org/description",
                "http://schema.cassproject.org/0.3/Framework",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.fwkDescDescription,
                this.currentConfig.fwkDescLabel,
                this.currentConfig.fwkDescPriority,
                this.currentConfig.fwkDescRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.fwkDescHeading,
                false,
                true);
        },
        buildFrameworkClassificationConfigObject(fwkConf) {
            fwkConf["https://schema.cassproject.org/0.4/classification"] = this.generatePropertyConfigObject(
                "https://schema.cassproject.org/0.4/classification",
                "http://schema.cassproject.org/0.3/Framework",
                "http://schema.org/Text",
                this.currentConfig.fwkClassDescription,
                this.currentConfig.fwkClassLabel,
                this.currentConfig.fwkClassPriority,
                this.currentConfig.fwkClassRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.fwkClassHeading,
                false,
                true);
        },
        buildFrameworkMarkingsConfigObject(fwkConf) {
            fwkConf["https://schema.cassproject.org/0.4/markings"] = this.generatePropertyConfigObject(
                "https://schema.cassproject.org/0.4/markings",
                "http://schema.cassproject.org/0.3/Framework",
                "http://schema.org/Text",
                this.currentConfig.fwkMarkingsDescription,
                this.currentConfig.fwkMarkingsLabel,
                this.currentConfig.fwkMarkingsPriority,
                this.currentConfig.fwkMarkingsRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.fwkMarkingsHeading,
                false,
                true);
        },
        getFrameworkConfigHeadings() {
            let allHeadings = [];
            if (this.currentConfig.fwkIdHeading && !this.currentConfig.fwkIdHeading.trim().equals('')) allHeadings[this.currentConfig.fwkIdHeading.trim()] = 'x';
            if (this.currentConfig.fwkNameHeading && !this.currentConfig.fwkNameHeading.trim().equals('')) allHeadings[this.currentConfig.fwkNameHeading.trim()] = 'x';
            if (this.currentConfig.fwkDescHeading && !this.currentConfig.fwkDescHeading.trim().equals('')) allHeadings[this.currentConfig.fwkDescHeading.trim()] = 'x';
            if (this.currentConfig.fwkClassHeading && !this.currentConfig.fwkClassHeading.trim().equals('')) allHeadings[this.currentConfig.fwkClassHeading.trim()] = 'x';
            if (this.currentConfig.fwkMarkingsHeading && !this.currentConfig.fwkMarkingsHeading.trim().equals('')) allHeadings[this.currentConfig.fwkMarkingsHeading.trim()] = 'x';
            this.addCustomPropertiesToHeadingsObj(this.currentConfig.fwkCustomProperties, allHeadings);
            return allHeadings;
        },
        getTaxonomyConfigHeadings() {
            let allHeadings = [];
            if (this.currentConfig.taxonomyIdHeading && !this.currentConfig.taxonomyIdHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomyIdHeading.trim()] = 'x';
            if (this.currentConfig.taxonomyNameHeading && !this.currentConfig.taxonomyNameHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomyNameHeading.trim()] = 'x';
            if (this.currentConfig.taxonomyDescHeading && !this.currentConfig.taxonomyDescHeading.trim().equals('')) allHeadings[this.currentConfig.taxonomyDescHeading.trim()] = 'x';
            this.addCustomPropertiesToHeadingsObj(this.currentConfig.taxonomyCustomProperties, allHeadings);
            return allHeadings;
        },
        getTaxonConfigHeadings() {
            let allHeadings = [];
            if (this.currentConfig.taxonIdHeading && !this.currentConfig.taxonIdHeading.trim().equals('')) allHeadings[this.currentConfig.taxonIdHeading.trim()] = 'x';
            if (this.currentConfig.taxonNameHeading && !this.currentConfig.taxonNameHeading.trim().equals('')) allHeadings[this.currentConfig.taxonNameHeading.trim()] = 'x';
            if (this.currentConfig.taxonDescHeading && !this.currentConfig.taxonDescHeading.trim().equals('')) allHeadings[this.currentConfig.taxonDescHeading.trim()] = 'x';
            this.addCustomPropertiesToHeadingsObj(this.currentConfig.taxonCustomProperties, allHeadings);
            return allHeadings;
        },
        buildFrameworkConfigHeadingsArray(fwkConf) {
            let fwkConfigHeadings = this.getFrameworkConfigHeadings();
            fwkConf.headings = Object.keys(fwkConfigHeadings);
            if (this.enforceHeadings && !fwkConf.headings.includes(this.DEFAULT_HEADING)) fwkConf.headings.push(this.DEFAULT_HEADING);
        },
        buildTaxonomyConfigHeadingsArray(taxonomyConf) {
            let taxonomyConfigHeadings = this.getTaxonomyConfigHeadings();
            taxonomyConf.headings = Object.keys(taxonomyConfigHeadings);
            if (this.enforceHeadings && !taxonomyConf.headings.includes(this.DEFAULT_HEADING)) taxonomyConf.headings.push(this.DEFAULT_HEADING);
        },
        buildTaxonConfigHeadingsArray(taxonConf) {
            let taxonConfigHeadings = this.getTaxonConfigHeadings();
            taxonConf.headings = Object.keys(taxonConfigHeadings);
            if (this.enforceHeadings && !taxonConf.headings.includes(this.DEFAULT_HEADING)) taxonConf.headings.push(this.DEFAULT_HEADING);
        },
        addFrameworkConfigToObject(cco) {
            let fwkConf = {};
            this.buildFrameworkConfigPriorityArrays(fwkConf);
            this.buildFrameworkConfigHeadingsArray(fwkConf);
            this.buildFrameworkIdConfigObject(fwkConf);
            this.buildFrameworkNameConfigObject(fwkConf);
            this.buildFrameworkDescConfigObject(fwkConf);
            this.buildFrameworkClassificationConfigObject(fwkConf);
            this.buildFrameworkMarkingsConfigObject(fwkConf);
            this.buildCustomPropertiesConfigObjects(fwkConf, "http://schema.cassproject.org/0.3/Framework", this.currentConfig.fwkCustomProperties);
            cco.frameworkConfig = fwkConf;
        },
        addTaxonomyConfigToObject(cco) {
            let taxonomyConf = {};
            this.buildTaxonomyConfigPriorityArrays(taxonomyConf);
            this.buildTaxonomyConfigHeadingsArray(taxonomyConf);
            this.buildTaxonomyIdConfigObject(taxonomyConf);
            this.buildTaxonomyNameConfigObject(taxonomyConf);
            this.buildTaxonomyDescConfigObject(taxonomyConf);
            this.buildTaxonomyCreatorConfigObject(taxonomyConf);
            this.buildTaxonomyPublisherConfigObject(taxonomyConf);
            this.buildTaxonomyPubNameConfigObject(taxonomyConf);
            this.buildTaxonomyLangConfigObject(taxonomyConf);
            this.buildTaxonomySourceConfigObject(taxonomyConf);
            this.buildCustomPropertiesConfigObjects(taxonomyConf, "http://schema.cassproject.org/0.4/skos", this.currentConfig.taxonomyCustomProperties);
            cco.taxonomyConfig = taxonomyConf;
        },
        buildTaxonConfigPriorityArrays(taxonConf) {
            taxonConf.primaryProperties = [];
            taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#prefLabel");
            if (this.currentConfig.taxonIdPriorty.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("@id");
            if (this.currentConfig.taxonDescPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#definition");
            if (this.currentConfig.taxonNotationPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#notation");
            if (this.currentConfig.taxonAltLabelPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#altLabel");
            if (this.currentConfig.taxonHiddenLabelPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#hiddenLabel");
            if (this.currentConfig.taxonNotePriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#note");
            if (this.currentConfig.taxonBroaderPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#broader");
            if (this.currentConfig.taxonNarrowerPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#narrower");
            if (this.currentConfig.taxonBroadMatchPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#broadMatch");
            if (this.currentConfig.taxonCloseMatchPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#closeMatch");
            if (this.currentConfig.taxonExactMatchPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#exactMatch");
            if (this.currentConfig.taxonNarrowMatchPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#narrowMatch");
            if (this.currentConfig.taxonRelatedPriority.equalsIgnoreCase("primary")) taxonConf.primaryProperties.push("http://www.w3.org/2004/02/skos/core#related");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonCustomProperties, taxonConf.primaryProperties, "primary");
            taxonConf.secondaryProperties = [];
            if (this.currentConfig.taxonIdPriorty.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("@id");
            if (this.currentConfig.taxonDescPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#definition");
            if (this.currentConfig.taxonNotationPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#notation");
            if (this.currentConfig.taxonAltLabelPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#altLabel");
            if (this.currentConfig.taxonHiddenLabelPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#hiddenLabel");
            if (this.currentConfig.taxonNotePriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#note");
            if (this.currentConfig.taxonBroaderPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#broader");
            if (this.currentConfig.taxonNarrowerPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#narrower");
            if (this.currentConfig.taxonBroadMatchPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#broadMatch");
            if (this.currentConfig.taxonCloseMatchPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#closeMatch");
            if (this.currentConfig.taxonExactMatchPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#exactMatch");
            if (this.currentConfig.taxonNarrowMatchPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#narrowMatch");
            if (this.currentConfig.taxonRelatedPriority.equalsIgnoreCase("secondary")) taxonConf.secondaryProperties.push("http://www.w3.org/2004/02/skos/core#related");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonCustomProperties, taxonConf.secondaryProperties, "secondary");
            taxonConf.tertiaryProperties = [];
            if (this.currentConfig.taxonIdPriorty.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("@id");
            if (this.currentConfig.taxonDescPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#definition");
            if (this.currentConfig.taxonNotationPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#notation");
            if (this.currentConfig.taxonAltLabelPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#altLabel");
            if (this.currentConfig.taxonHiddenLabelPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#hiddenLabel");
            if (this.currentConfig.taxonNotePriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#note");
            if (this.currentConfig.taxonBroaderPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#broader");
            if (this.currentConfig.taxonNarrowerPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#narrower");
            if (this.currentConfig.taxonBroadMatchPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#broadMatch");
            if (this.currentConfig.taxonCloseMatchPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#closeMatch");
            if (this.currentConfig.taxonExactMatchPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#exactMatch");
            if (this.currentConfig.taxonNarrowMatchPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#narrowMatch");
            if (this.currentConfig.taxonRelatedPriority.equalsIgnoreCase("tertiary")) taxonConf.tertiaryProperties.push("http://www.w3.org/2004/02/skos/core#related");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.taxonCustomProperties, taxonConf.tertiaryProperties, "tertiary");
        },
        buildTaxonIdConfigObject(taxonConf) {
            taxonConf["@id"] = this.generatePropertyConfigObject(
                "https://schema.cassproject.org/0.4/Concept/id",
                "https://schema.cassproject.org/0.4/Concept",
                "http://schema.org/URL",
                this.currentConfig.taxonIdDescription,
                this.currentConfig.taxonIdLabel,
                this.currentConfig.taxonIdPriorty,
                true,
                true,
                true,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonIdHeading,
                false,
                true);
        },
        buildTaxonNameConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#prefLabel"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#prefLabel",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.taxonNameDescription,
                this.currentConfig.taxonNameLabel,
                "primary",
                true,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonNameHeading,
                false,
                true);
        },
        buildTaxonDescConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#definition"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#definition",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.taxonDescDescription,
                this.currentConfig.taxonDescLabel,
                this.currentConfig.taxonDescPriority,
                this.currentConfig.taxonDescRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonDescHeading,
                false,
                true);
        },
        buildTaxonNotationConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#notation"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#notation",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "http://schema.org/Text",
                this.currentConfig.taxonNotationDescription,
                this.currentConfig.taxonNotationLabel,
                this.currentConfig.taxonNotationPriority,
                this.currentConfig.taxonNotationRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonNotationHeading,
                false,
                true);
        },
        buildTaxonAltLabelConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#altLabel"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#altLabel",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.taxonAltLabelDescription,
                this.currentConfig.taxonAltLabelLabel,
                this.currentConfig.taxonAltLabelPriority,
                this.currentConfig.taxonAltLabelRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonAltLabelHeading,
                false,
                true);
        },
        buildTaxonHiddenLabelConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#hiddenLabel"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#hiddenLabel",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.taxonHiddenLabelDescription,
                this.currentConfig.taxonHiddenLabelLabel,
                this.currentConfig.taxonHiddenLabelPriority,
                this.currentConfig.taxonHiddenLabelRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonHiddenLabelHeading,
                false,
                true);
        },
        buildTaxonNoteConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#note"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#note",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.taxonNoteDescription,
                this.currentConfig.taxonNoteLabel,
                this.currentConfig.taxonNotePriority,
                this.currentConfig.taxonNoteRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonNoteHeading,
                false,
                true);
        },
        buildTaxonBroaderConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#broader"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#broader",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "https://schema.cassproject.org/0.4/skos/Concept",
                this.currentConfig.taxonBroaderDescription,
                this.currentConfig.taxonBroaderLabel,
                this.currentConfig.taxonBroaderPriority,
                this.currentConfig.taxonBroaderRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonBroaderHeading,
                false,
                true);
        },
        buildTaxonNarrowerConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#narrower"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#narrower",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "https://schema.cassproject.org/0.4/skos/Concept",
                this.currentConfig.taxonNarrowerDescription,
                this.currentConfig.taxonNarrowerLabel,
                this.currentConfig.taxonNarrowerPriority,
                this.currentConfig.taxonNarrowerRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonNarrowerHeading,
                false,
                true);
        },
        buildTaxonBroadMatchConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#broadMatch"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#broadMatch",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "https://schema.cassproject.org/0.4/skos/Concept",
                this.currentConfig.taxonBroadMatchDescription,
                this.currentConfig.taxonBroadMatchLabel,
                this.currentConfig.taxonBroadMatchPriority,
                this.currentConfig.taxonBroadMatchRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonBroadMatchHeading,
                false,
                true);
        },
        buildTaxonCloseMatchConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#closeMatch"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#closeMatch",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "https://schema.cassproject.org/0.4/skos/Concept",
                this.currentConfig.taxonCloseMatchDescription,
                this.currentConfig.taxonCloseMatchLabel,
                this.currentConfig.taxonCloseMatchPriority,
                this.currentConfig.taxonCloseMatchRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonCloseMatchHeading,
                false,
                true);
        },
        buildTaxonExactMatchConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#exactMatch"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#exactMatch",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "https://schema.cassproject.org/0.4/skos/Concept",
                this.currentConfig.taxonExactMatchDescription,
                this.currentConfig.taxonExactMatchLabel,
                this.currentConfig.taxonExactMatchPriority,
                this.currentConfig.taxonExactMatchRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonExactMatchHeading,
                false,
                true);
        },
        buildTaxonNarrowMatchConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#narrowMatch"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#narrowMatch",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "https://schema.cassproject.org/0.4/skos/Concept",
                this.currentConfig.taxonNarrowMatchDescription,
                this.currentConfig.taxonNarrowMatchLabel,
                this.currentConfig.taxonNarrowMatchPriority,
                this.currentConfig.taxonNarrowMatchRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonNarrowMatchHeading,
                false,
                true);
        },
        buildTaxonRelatedConfigObject(taxonConf) {
            taxonConf["http://www.w3.org/2004/02/skos/core#related"] = this.generatePropertyConfigObject(
                "http://www.w3.org/2004/02/skos/core#related",
                "http://schema.cassproject.org/0.4/skos/Concept",
                "https://schema.cassproject.org/0.4/skos/Concept",
                this.currentConfig.taxonRelatedDescription,
                this.currentConfig.taxonRelatedLabel,
                this.currentConfig.taxonRelatedPriority,
                this.currentConfig.taxonRelatedRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.taxonRelatedHeading,
                false,
                true);
        },
        addTaxonConfigToObject(cco) {
            let taxonConf = {};
            this.buildTaxonConfigPriorityArrays(taxonConf);
            this.buildTaxonConfigHeadingsArray(taxonConf);
            this.buildTaxonIdConfigObject(taxonConf);
            this.buildTaxonNameConfigObject(taxonConf);
            this.buildTaxonDescConfigObject(taxonConf);
            this.buildTaxonNotationConfigObject(taxonConf);
            this.buildTaxonAltLabelConfigObject(taxonConf);
            this.buildTaxonHiddenLabelConfigObject(taxonConf);
            this.buildTaxonNoteConfigObject(taxonConf);
            this.buildTaxonBroaderConfigObject(taxonConf);
            this.buildTaxonNarrowerConfigObject(taxonConf);
            this.buildTaxonBroadMatchConfigObject(taxonConf);
            this.buildTaxonCloseMatchConfigObject(taxonConf);
            this.buildTaxonExactMatchConfigObject(taxonConf);
            this.buildTaxonNarrowMatchConfigObject(taxonConf);
            this.buildTaxonRelatedConfigObject(taxonConf);
            this.buildCustomPropertiesConfigObjects(taxonConf, "http://schema.cassproject.org/0.4/skos", this.currentConfig.taxonCustomProperties);
            cco.taxonConfig = taxonConf;
        },
        buildCompetencyConfigPriorityArrays(compConf) {
            compConf.primaryProperties = [];
            compConf.primaryProperties.push("http://schema.org/name");
            if (this.currentConfig.compIdPriorty.equalsIgnoreCase("primary")) compConf.primaryProperties.push("@id");
            if (this.currentConfig.compDescPriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("http://schema.org/description");
            if (this.currentConfig.compTypePriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("http://purl.org/dc/terms/type");
            if (this.currentConfig.compClassPriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("https://schema.cassproject.org/0.4/classification");
            if (this.currentConfig.compMarkingsPriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push(("https://schema.cassproject.org/0.4/markings"));
            if (this.currentConfig.compAllowLevels && this.currentConfig.levelPriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("https://schema.cassproject.org/0.4/Level");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.compCustomProperties, compConf.primaryProperties, "primary");
            compConf.secondaryProperties = [];
            if (this.currentConfig.compIdPriorty.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("@id");
            if (this.currentConfig.compDescPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("http://schema.org/description");
            if (this.currentConfig.compTypePriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("http://purl.org/dc/terms/type");
            if (this.currentConfig.compClassPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("https://schema.cassproject.org/0.4/classification");
            if (this.currentConfig.compMarkingsPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push(("https://schema.cassproject.org/0.4/markings"));
            if (this.currentConfig.compAllowLevels && this.currentConfig.levelPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("https://schema.cassproject.org/0.4/Level");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.compCustomProperties, compConf.secondaryProperties, "secondary");
            compConf.tertiaryProperties = [];
            if (this.currentConfig.compIdPriorty.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("@id");
            if (this.currentConfig.compDescPriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("http://schema.org/description");
            if (this.currentConfig.compTypePriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("http://purl.org/dc/terms/type");
            if (this.currentConfig.compClassPriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("https://schema.cassproject.org/0.4/classification");
            if (this.currentConfig.compMarkingsPriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push(("https://schema.cassproject.org/0.4/markings"));
            if (this.currentConfig.compAllowLevels && this.currentConfig.levelPriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("https://schema.cassproject.org/0.4/Level");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.compCustomProperties, compConf.tertiaryProperties, "tertiary");
        },
        buildCompetencyIdConfigObject(compConf) {
            compConf["@id"] = this.generatePropertyConfigObject(
                "https://schema.cassproject.org/0.4/Competency/id",
                "http://schema.cassproject.org/0.3/Competency",
                "http://schema.org/URL",
                this.currentConfig.compIdDescription,
                this.currentConfig.compIdLabel,
                this.currentConfig.compIdPriorty,
                true,
                true,
                true,
                false,
                null,
                null,
                null,
                this.currentConfig.compIdHeading,
                false,
                true);
        },
        buildCompetencyNameConfigObject(compConf) {
            compConf["http://schema.org/name"] = this.generatePropertyConfigObject(
                "http://schema.org/name",
                "http://schema.cassproject.org/0.3/Competency",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.compNameDescription,
                this.currentConfig.compNameLabel,
                "primary",
                true,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.compNameHeading,
                false,
                true);
        },
        buildCompetencyDescConfigObject(compConf) {
            compConf["http://schema.org/description"] = this.generatePropertyConfigObject(
                "http://schema.org/description",
                "http://schema.cassproject.org/0.3/Competency",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.compDescDescription,
                this.currentConfig.compDescLabel,
                this.currentConfig.compDescPriority,
                this.currentConfig.compDescRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.compDescHeading,
                false,
                true);
        },
        buildCompetencyTypeConfigObject(compConf) {
            if (!this.currentConfig.compEnforceTypes) this.currentConfig.compEnforcedTypes = [];
            let compTypeRequired = this.currentConfig.compTypeRequired;
            // commenting this out for now CA-381
            // if (this.currentConfig.compEnforcedTypes && this.currentConfig.compEnforcedTypes.length > 0) compTypeRequired = true;
            compConf["http://purl.org/dc/terms/type"] = this.generatePropertyConfigObject(
                "https://purl.org/ctdlasn/terms/competencyCategory",
                "http://schema.cassproject.org/0.3/Competency",
                "http://www.w3.org/2000/01/rdf-schema#langString",
                this.currentConfig.compTypeDescription,
                this.currentConfig.compTypeLabel,
                this.currentConfig.compTypePriority,
                compTypeRequired,
                false,
                false,
                false,
                this.currentConfig.compEnforcedTypes,
                null,
                null,
                this.currentConfig.compTypeHeading,
                false,
                true);
        },
        buildCompetencyClassificationConfigObject(compConf) {
            compConf["https://schema.cassproject.org/0.4/classification"] = this.generatePropertyConfigObject(
                "https://schema.cassproject.org/0.4/classification",
                "http://schema.cassproject.org/0.3/Framework",
                "http://schema.org/Text",
                this.currentConfig.compClassDescription,
                this.currentConfig.compClassLabel,
                this.currentConfig.compClassPriority,
                this.currentConfig.compClassRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.compClassHeading,
                false,
                true);
        },
        buildCompetencyMarkingsConfigObject(compConf) {
            compConf["https://schema.cassproject.org/0.4/markings"] = this.generatePropertyConfigObject(
                "https://schema.cassproject.org/0.4/markings",
                "http://schema.cassproject.org/0.3/Framework",
                "http://schema.org/Text",
                this.currentConfig.compMarkingsDescription,
                this.currentConfig.compMarkingsLabel,
                this.currentConfig.compMarkingsPriority,
                this.currentConfig.compMarkingsRequired,
                false,
                false,
                false,
                null,
                null,
                null,
                this.currentConfig.compMarkingsHeading,
                false,
                true);
        },
        getCompetencyConfigHeadings() {
            let allHeadings = [];
            if (this.currentConfig.compIdHeading && !this.currentConfig.compIdHeading.trim().equals('')) allHeadings[this.currentConfig.compIdHeading.trim()] = 'x';
            if (this.currentConfig.compNameHeading && !this.currentConfig.compNameHeading.trim().equals('')) allHeadings[this.currentConfig.compNameHeading.trim()] = 'x';
            if (this.currentConfig.compDescHeading && !this.currentConfig.compDescHeading.trim().equals('')) allHeadings[this.currentConfig.compDescHeading.trim()] = 'x';
            if (this.currentConfig.compTypeHeading && !this.currentConfig.compTypeHeading.trim().equals('')) allHeadings[this.currentConfig.compTypeHeading.trim()] = 'x';
            if (this.currentConfig.levelHeading && !this.currentConfig.levelHeading.trim().equals('')) allHeadings[this.currentConfig.levelHeading.trim()] = 'x';
            this.addCustomPropertiesToHeadingsObj(this.currentConfig.compCustomProperties, allHeadings);
            return allHeadings;
        },
        buildCompetencyConfigHeadingsArray(compConf) {
            let compHeadings = this.getCompetencyConfigHeadings();
            compConf.headings = Object.keys(compHeadings);
            if (this.enforceHeadings && !compConf.headings.includes(this.DEFAULT_HEADING)) compConf.headings.push(this.DEFAULT_HEADING);
        },
        buildRelationshipsPriorityAndHeading(compConf) {
            if (this.currentConfig.relationshipsHeading && !this.currentConfig.relationshipsHeading.trim().equals('')) {
                compConf.relationshipsHeading = this.currentConfig.relationshipsHeading;
            } else if (this.enforceHeadings) {
                compConf.relationshipsHeading = this.DEFAULT_HEADING;
            } else {
                compConf.relationshipsHeading = "";
            }
            compConf.relationshipsPriority = this.currentConfig.relationshipsPriority;
        },
        addCompetencyConfigToObject(cco) {
            let compConf = {};
            this.buildCompetencyConfigPriorityArrays(compConf);
            this.buildCompetencyConfigHeadingsArray(compConf);
            this.buildRelationshipsPriorityAndHeading(compConf);
            this.buildCompetencyIdConfigObject(compConf);
            this.buildCompetencyNameConfigObject(compConf);
            this.buildCompetencyDescConfigObject(compConf);
            this.buildCompetencyClassificationConfigObject(compConf);
            this.buildCompetencyMarkingsConfigObject(compConf);
            this.buildCompetencyTypeConfigObject(compConf);
            this.buildCustomPropertiesConfigObjects(compConf, "http://schema.cassproject.org/0.3/Competency", this.currentConfig.compCustomProperties);
            cco.competencyConfig = compConf;
        },
        generateRelationshipConfigObject(relObj) {
            let relConfigObj = {};
            relConfigObj["http://www.w3.org/2000/01/rdf-schema#comment"] = [];
            let commentObj = {};
            commentObj["@language"] = "en";
            commentObj["@value"] = relObj.label.trim();
            relConfigObj["http://www.w3.org/2000/01/rdf-schema#comment"].push(commentObj);
            relConfigObj["http://www.w3.org/2000/01/rdf-schema#label"] = [];
            let labelObj = {};
            labelObj["@language"] = "en";
            labelObj["@value"] = relObj.label.trim();
            relConfigObj["http://www.w3.org/2000/01/rdf-schema#label"].push(labelObj);
            return relConfigObj;
        },
        addRelationsConfigToObject(cco) {
            let relConf = {};
            let configRelationships = Object.keys(this.currentConfig.relationships);
            for (let cr of configRelationships) {
                let relObj = this.currentConfig.relationships[cr];
                if (relObj.enabled) relConf[cr] = this.generateRelationshipConfigObject(relObj);
            }
            cco.relationshipConfig = relConf;
        },
        generateLevelsConfigObject(levConf) {
            levConf["https://schema.cassproject.org/0.4/Level"] = {};
            levConf["https://schema.cassproject.org/0.4/Level"]["priority"] = this.currentConfig.levelPriority;
            if (this.currentConfig.levelHeading && !this.currentConfig.levelHeading.trim().equals('')) {
                levConf["https://schema.cassproject.org/0.4/Level"]["heading"] = this.currentConfig.levelHeading.trim();
            } else if (this.enforceHeadings) {
                levConf["https://schema.cassproject.org/0.4/Level"]["heading"] = this.DEFAULT_HEADING;
            }
            levConf["https://schema.cassproject.org/0.4/Level"]["http://www.w3.org/2000/01/rdf-schema#comment"] = [];
            let commentObj = {};
            commentObj["@language"] = "en";
            commentObj["@value"] = this.currentConfig.levelLabel.trim();
            levConf["https://schema.cassproject.org/0.4/Level"]["http://www.w3.org/2000/01/rdf-schema#comment"].push(commentObj);
            levConf["https://schema.cassproject.org/0.4/Level"]["http://www.w3.org/2000/01/rdf-schema#label"] = [];
            let labelObj = {};
            labelObj["@language"] = "en";
            labelObj["@value"] = this.currentConfig.levelDescription.trim();
            levConf["https://schema.cassproject.org/0.4/Level"]["http://www.w3.org/2000/01/rdf-schema#label"].push(labelObj);
            if (this.currentConfig.enforceLevelValues && this.currentConfig.enforcedLevelValues && this.currentConfig.enforcedLevelValues.length > 0) {
                let optionsArray = [];
                for (let lvlId of this.currentConfig.enforcedLevelValues) {
                    let lvlOptionObj = {};
                    lvlOptionObj["val"] = lvlId;
                    optionsArray.push(lvlOptionObj);
                }
                levConf["https://schema.cassproject.org/0.4/Level"]["options"] = optionsArray;
            }
        },
        addLevelsConfigToObject(cco) {
            if (this.currentConfig.compAllowLevels) {
                let levConf = {};
                this.generateLevelsConfigObject(levConf);
                cco.levelsConfig = levConf;
            }
        },
        addAlignmentConfigToObject(cco) {
            let algConfig = [];
            let configAligns = Object.keys(this.currentConfig.alignments);
            for (let al of configAligns) {
                if (this.currentConfig.alignments[al]) algConfig.push(al);
            }
            cco.alignConfig = algConfig;
        },
        addDefaultPermissionConfigToObject(cco) {
            cco.defaultObjectOwners = this.currentConfig.defaultOwners;
            cco.defaultObjectReaders = this.currentConfig.defaultReaders;
            cco.defaultCommenters = this.currentConfig.defaultCommenters;
        }
    },
    updated() {
        this.$store.commit('configuration/setLocalDefaultBrowserConfig', this.getDefaultBrowserConfigId());
    },
    mounted() {
        this.buildConfigList();
        this.$store.commit('configuration/setLocalDefaultBrowserConfig', this.getDefaultBrowserConfigId());
        if (this.$store.getters['editor/framework'] && this.$store.getters['editor/framework'].configuration) {
            this.frameworkConfigId = this.$store.getters['editor/framework'].configuration;
        }
    }
};