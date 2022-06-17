export const configuration = {
    name: 'configuration',
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

            simpleConfigObj.fwkClassLabel = cfo["https://schema.cassproject.org/0.4/Classification"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.fwkClassDescription = cfo["https://schema.cassproject.org/0.4/Classification"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.fwkClassPriority = cfo["https://schema.cassproject.org/0.4/Classification"]["priority"];
            simpleConfigObj.fwkClassRequired = this.getBooleanValue(cfo["https://schema.cassproject.org/0.4/Classification"]["isRequired"]);
            let classHeading = cfo["https://schema.cassproject.org/0.4/Classification"]["heading"];
            if (classHeading) simpleConfigObj.fwkClassHeading = classHeading.trim();
            else simpleConfigObj.fwkClassHeading = "";

            simpleConfigObj.fwkMarkingsLabel = cfo["https://schema.cassproject.org/0.4/Markings"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.fwkMarkingsDescription = cfo["https://schema.cassproject.org/0.4/Markings"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.fwkMarkingsPriority = cfo["https://schema.cassproject.org/0.4/Markings"]["priority"];
            simpleConfigObj.fwkMarkingsRequired = this.getBooleanValue(cfo["https://schema.cassproject.org/0.4/Markings"]["isRequired"]);
            let markingsHeading = cfo["https://schema.cassproject.org/0.4/Markings"]["heading"];
            if (markingsHeading) simpleConfigObj.fwkMarkingsHeading = markingsHeading.trim();
            else simpleConfigObj.fwkMarkingsHeading = "";

            simpleConfigObj.fwkCustomProperties = [];
            let propertyKeys = Object.keys(cfo);
            for (let pk of propertyKeys) {
                if (this.isCustomPropertyKey('framework', pk)) {
                    simpleConfigObj.fwkCustomProperties.push(this.generateSimpleCustomPropertyObject(cfo[pk]));
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

            simpleConfigObj.compClassLabel = cfo["https://schema.cassproject.org/0.4/Classification"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compClassDescription = cfo["https://schema.cassproject.org/0.4/Classification"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compClassPriority = cfo["https://schema.cassproject.org/0.4/Classification"]["priority"];
            simpleConfigObj.compClassRequired = this.getBooleanValue(cfo["https://schema.cassproject.org/0.4/Classification"]["isRequired"]);
            let classHeading = cfo["https://schema.cassproject.org/0.4/Classification"]["heading"];
            if (classHeading) simpleConfigObj.compClassHeading = classHeading.trim();
            else simpleConfigObj.compClassHeading = "";

            simpleConfigObj.compMarkingsLabel = cfo["https://schema.cassproject.org/0.4/Markings"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compMarkingsDescription = cfo["https://schema.cassproject.org/0.4/Markings"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compMarkingsPriority = cfo["https://schema.cassproject.org/0.4/Markings"]["priority"];
            simpleConfigObj.compMarkingsRequired = this.getBooleanValue(cfo["https://schema.cassproject.org/0.4/Markings"]["isRequired"]);
            let markingsHeading = cfo["https://schema.cassproject.org/0.4/Markings"]["heading"];
            if (markingsHeading) simpleConfigObj.compMarkingsHeading = markingsHeading.trim();
            else simpleConfigObj.compMarkingsHeading = "";

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