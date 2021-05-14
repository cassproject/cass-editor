export const configuration = {
    name: 'configuration',
    computed: {
        currentConfigIsReadOnly: function() {
            if (!this.currentConfig || !this.currentConfig.isOwned) return true;
            else if (this.currentConfig.isOwned) return false;
            else return true;
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
        handleDeleteConfigurationSuccess() {
            appLog("Config delete success");
            this.configToDelete = {};
            this.buildConfigList();
            this.configBusy = false;
            this.showListView();
        },
        handleDeleteConfigurationFailure(msg) {
            appError("failed to delete configuration: " + msg);
            this.configToDelete = {};
            this.configBusy = false;
        },
        deleteConfiguration() {
            this.showConfirmDeleteConfigModal = false;
            this.configBusy = true;
            let configObj = EcRepository.getBlocking(this.configToDelete.id);
            if (configObj) {
                let repo = window.repo;
                repo.deleteRegistered(configObj, this.handleDeleteConfigurationSuccess, this.handleDeleteConfigurationFailure);
            }
        },
        cancelConfigurationDelete() {
            this.configToDelete = {};
            this.showConfirmDeleteConfigModal = false;
        },
        setConfigToDelete(configId) {
            this.configToDelete = this.getConfigById(configId);
        },
        showDeleteConfirm(configId) {
            this.setConfigToDelete(configId);
            this.showConfirmDeleteConfigModal = true;
        },
        showConfigDetails(configId) {
            this.setCurrentConfig(configId);
            this.showDetailView();
        },
        backFromEditCurrentConfig() {
            this.showListView();
            this.$store.commit('configuration/setCurrentConfig', {});
        },
        generateCustomPropertyNameId(customProp) {
            return customProp.context + customProp.propertyName;
        },
        generateCustomPropertyContextAndNameFromId(customPropId) {
            let retObj = {};
            retObj.context = customPropId.substr(0, customPropId.lastIndexOf("/") + 1);
            retObj.name = customPropId.substr(customPropId.lastIndexOf("/") + 1);
            return retObj;
        },
        addCustomPropertiesToPriorityArray(customProperties, priorityArray, priority) {
            for (let prop of customProperties) {
                if (prop.priority.equalsIgnoreCase(priority)) {
                    priorityArray.push(this.generateCustomPropertyNameId(prop));
                }
            }
        },
        addCustomPropertiesToHeadingsObj(customProperties, headingsObj) {
            for (let prop of customProperties) {
                if (prop.heading && !prop.heading.trim().equals('')) {
                    headingsObj[prop.heading.trim()] = 'x';
                }
            }
        },
        generatePropertyConfigObject(id, domain, range, description, label, priority, required, readOnly, noTextEditing, permittedValues, heading, allowMultiples, onePerLanguage) {
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
            }
            if (heading && !heading.trim().equals('')) propObj.heading = heading.trim();
            else if (this.enforceHeadings) propObj.heading = this.DEFAULT_HEADING;
            return propObj;
        },
        buildCustomPropertiesConfigObjects(parentConf, domain, customProperties) {
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
                    false,
                    prop.permittedValues,
                    prop.heading,
                    prop.allowMultiples,
                    prop.onePerLanguage);
            }
        },
        buildFrameworkConfigPriorityArrays(fwkConf) {
            fwkConf.primaryProperties = [];
            fwkConf.primaryProperties.push("http://schema.org/name");
            if (this.currentConfig.fwkIdPriorty.equalsIgnoreCase("primary")) fwkConf.primaryProperties.push("@id");
            if (this.currentConfig.fwkDescPriority.equalsIgnoreCase("primary")) fwkConf.primaryProperties.push("http://schema.org/description");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.fwkCustomProperties, fwkConf.primaryProperties, "primary");
            fwkConf.secondaryProperties = [];
            if (this.currentConfig.fwkIdPriorty.equalsIgnoreCase("secondary")) fwkConf.secondaryProperties.push("@id");
            if (this.currentConfig.fwkDescPriority.equalsIgnoreCase("secondary")) fwkConf.secondaryProperties.push("http://schema.org/description");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.fwkCustomProperties, fwkConf.secondaryProperties, "secondary");
            fwkConf.tertiaryProperties = [];
            if (this.currentConfig.fwkIdPriorty.equalsIgnoreCase("tertiary")) fwkConf.tertiaryProperties.push("@id");
            if (this.currentConfig.fwkDescPriority.equalsIgnoreCase("tertiary")) fwkConf.tertiaryProperties.push("http://schema.org/description");
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
                null,
                this.currentConfig.fwkDescHeading,
                false,
                true);
        },
        getFrameworkConfigHeadings() {
            let allHeadings = [];
            if (this.currentConfig.fwkIdHeading && !this.currentConfig.fwkIdHeading.trim().equals('')) allHeadings[this.currentConfig.fwkIdHeading.trim()] = 'x';
            if (this.currentConfig.fwkNameHeading && !this.currentConfig.fwkNameHeading.trim().equals('')) allHeadings[this.currentConfig.fwkNameHeading.trim()] = 'x';
            if (this.currentConfig.fwkDescHeading && !this.currentConfig.fwkDescHeading.trim().equals('')) allHeadings[this.currentConfig.fwkDescHeading.trim()] = 'x';
            this.addCustomPropertiesToHeadingsObj(this.currentConfig.fwkCustomProperties, allHeadings);
            return allHeadings;
        },
        buildFrameworkConfigHeadingsArray(fwkConf) {
            let fwkConfigHeadings = this.getFrameworkConfigHeadings();
            fwkConf.headings = Object.keys(fwkConfigHeadings);
            if (this.enforceHeadings && !fwkConf.headings.includes(this.DEFAULT_HEADING)) fwkConf.headings.push(this.DEFAULT_HEADING);
        },
        addFrameworkConfigToObject(cco) {
            let fwkConf = {};
            this.buildFrameworkConfigPriorityArrays(fwkConf);
            this.buildFrameworkConfigHeadingsArray(fwkConf);
            this.buildFrameworkIdConfigObject(fwkConf);
            this.buildFrameworkNameConfigObject(fwkConf);
            this.buildFrameworkDescConfigObject(fwkConf);
            this.buildCustomPropertiesConfigObjects(fwkConf, "http://schema.cassproject.org/0.3/Framework", this.currentConfig.fwkCustomProperties);
            cco.frameworkConfig = fwkConf;
        },
        buildCompetencyConfigPriorityArrays(compConf) {
            compConf.primaryProperties = [];
            compConf.primaryProperties.push("http://schema.org/name");
            if (this.currentConfig.compIdPriorty.equalsIgnoreCase("primary")) compConf.primaryProperties.push("@id");
            if (this.currentConfig.compDescPriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("http://schema.org/description");
            if (this.currentConfig.compTypePriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("http://purl.org/dc/terms/type");
            if (this.currentConfig.compAllowLevels && this.currentConfig.levelPriority.equalsIgnoreCase("primary")) compConf.primaryProperties.push("https://schema.cassproject.org/0.4/Level");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.compCustomProperties, compConf.primaryProperties, "primary");
            compConf.secondaryProperties = [];
            if (this.currentConfig.compIdPriorty.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("@id");
            if (this.currentConfig.compDescPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("http://schema.org/description");
            if (this.currentConfig.compTypePriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("http://purl.org/dc/terms/type");
            if (this.currentConfig.compAllowLevels && this.currentConfig.levelPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("https://schema.cassproject.org/0.4/Level");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.compCustomProperties, compConf.secondaryProperties, "secondary");
            compConf.tertiaryProperties = [];
            if (this.currentConfig.compIdPriorty.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("@id");
            if (this.currentConfig.compDescPriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("http://schema.org/description");
            if (this.currentConfig.compTypePriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("http://purl.org/dc/terms/type");
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
                this.currentConfig.compEnforcedTypes,
                this.currentConfig.compTypeHeading,
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
        },
        determineHeadingStatusForCustomProperties(customProperties, headingsTracking) {
            for (let prop of customProperties) {
                if (prop.heading && !prop.heading.trim().equals('')) headingsTracking.anyHeadingsPopulated = true;
                else headingsTracking.anyHeadingsBlank = true;
            }
        },
        determineHeadingStatus(headingField, headingsTracking) {
            if (headingField && !headingField.trim().equals('')) headingsTracking.anyHeadingsPopulated = true;
            else headingsTracking.anyHeadingsBlank = true;
        },
        determineIfHeadingsShouldBeEnforced() {
            this.enforceHeadings = false;
            let headingsTracking = {};
            headingsTracking.anyHeadingsPopulated = false;
            headingsTracking.anyHeadingsBlank = false;
            this.determineHeadingStatus(this.currentConfig.compIdHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.compNameHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.compDescHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.compTypeHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.levelHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.relationshipsHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.fwkIdHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.fwkNameHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.fwkDescHeading, headingsTracking);
            this.determineHeadingStatusForCustomProperties(this.currentConfig.compCustomProperties, headingsTracking);
            this.determineHeadingStatusForCustomProperties(this.currentConfig.fwkCustomProperties, headingsTracking);
            if (headingsTracking.anyHeadingsPopulated && headingsTracking.anyHeadingsBlank) this.enforceHeadings = true;
        },
        generateComplexConfigObjectFromCurrentConfig() {
            let cco = new Thing();
            cco.context = this.DEFAULT_CONFIGURATION_CONTEXT;
            cco.type = this.DEFAULT_CONFIGURATION_TYPE;
            this.addAllIdentityPksAsOwners(cco);
            appLog(this.currentConfig);
            if (this.currentConfig.isNew) cco.generateId(window.repo.selectedServer);
            else cco.id = this.currentConfig.id;
            cco.setName(this.currentConfig.name.trim());
            cco.setDescription(this.currentConfig.description.trim());
            cco.isDefault = this.currentConfig.isDefault;
            this.determineIfHeadingsShouldBeEnforced();
            this.addFrameworkConfigToObject(cco);
            this.addCompetencyConfigToObject(cco);
            this.addRelationsConfigToObject(cco);
            this.addLevelsConfigToObject(cco);
            this.addAlignmentConfigToObject(cco);
            this.addDefaultPermissionConfigToObject(cco);
            this.complexConfigObject = cco;
        },
        saveConfigToRepositorySuccess(msg) {
            appLog("Config save success");
            this.buildConfigList();
            this.configBusy = false;
            this.showListView();
        },
        saveConfigToRepositoryFailure(msg) {
            appLog("Config save failure: " + msg);
            this.configBusy = false;
            this.showListView();
        },
        saveCurrentConfig(enforcedLevels, defaultOwners, defaultReaders, defaultCommenters) {
            appLog("saveCurrentConfig: ");
            if (enforcedLevels && enforcedLevels.length > 0) {
                this.currentConfig.enforceLevelValues = true;
                this.currentConfig.enforcedLevelValues = enforcedLevels;
            } else this.currentConfig.enforceLevelValues = false;
            this.currentConfig.defaultOwners = defaultOwners;
            this.currentConfig.defaultReaders = defaultReaders;
            this.currentConfig.defaultCommenters = defaultCommenters;
            this.generateComplexConfigObjectFromCurrentConfig();
            appLog("complexConfigObject: ");
            appLog(JSON.stringify(this.complexConfigObject));
            this.configBusy = true;
            EcRepository.save(this.complexConfigObject, this.saveConfigToRepositorySuccess, this.saveConfigToRepositoryFailure);
        },
        cancelEditCurrentConfig() {
            this.buildConfigList();
            this.showListView();
            this.currentConfig = {};
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
            return newConfigObj;
        },
        createNewConfig() {
            this.currentConfig = this.generateNewConfigObject();
            this.showDetailView();
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
            if (ccpo["heading"]) scpo.heading = ccpo["heading"];
            else scpo.heading = "";
            if (ccpo["max"] && (ccpo["max"] === 1 || ccpo["max"] === '1')) scpo.allowMultiple = false;
            else scpo.allowMultiples = true;
            if (ccpo["onePerLanguage"] && (ccpo["onePerLanguage"] === 'true' || ccpo["max"] === true)) scpo.onePerLanguage = true;
            else scpo.onePerLanguage = false;
            scpo.required = this.getBooleanValue(ccpo["isRequired"]);
            scpo.permittedValues = [];
            if (ccpo.options && ccpo.options.length > 0) {
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
        searchRepositoryForConfigsSuccess(ecRemoteLda) {
            appLog("Config search success: ");
            appLog(ecRemoteLda);
            this.configList = [];
            for (let ecrld of ecRemoteLda) {
                let t = new Thing();
                t.copyFrom(ecrld);
                this.configList.push(this.generateSimpleConfigObject(t));
            }
            this.sortConfigList();
            this.configBusy = false;
        },
        searchRepositoryForConfigsFailure(msg) {
            appLog("Config search failure: " + msg);
            this.configBusy = false;
        },
        buildConfigListFromRepository() {
            let paramObj = {};
            paramObj.size = this.configSearchSize;
            window.repo.searchWithParams("@type:Configuration", paramObj, null, this.searchRepositoryForConfigsSuccess, this.searchRepositoryForConfigsFailure);
        },
        buildConfigList() {
            this.configBusy = true;
            this.complexConfigObject = {};
            this.buildConfigListFromRepository();
        },
        closeBrowserConfigSetModal() {
            this.showBrowserConfigSetModal = false;
        },
        setConfigAsBrowserDefault(configId) {
            let bdc = this.getConfigById(configId);
            this.setDefaultBrowserConfigId(configId);
            this.defaultBrowserConfigName = bdc.name;
            this.$store.commit('configuration/setLocalDefaultBrowserConfig', configId);
            this.showBrowserConfigSetModal = true;
        },
        removeConfigAsBrowserDefault(configId) {
            this.removeDefaultBrowserConfig();
            this.defaultBrowserConfigName = '';
            this.$store.commit('configuration/setLocalDefaultBrowserConfig', '');
            this.showBrowserConfigSetModal = false;
        },
        setConfigAsFrameworkDefault(configId) {
            let me = this;
            let f = this.$store.getters['editor/framework'];
            let previousConfig = f.configuration;
            f.configuration = configId;
            if (!previousConfig) {
                f = this.setOwnersAndReaders(f);
            }
            if (f) {
                this.frameworkConfigId = configId;
                window.repo.saveTo(f, function() {
                    me.$store.commit('editor/framework', EcRepository.getBlocking(f.shortId()));
                }, function() {});
            }
        },
        setOwnersAndReaders(framework) {
            let userIdentity = null;
            if (EcIdentityManager.ids.length > 0) {
                userIdentity = EcIdentityManager.ids[0].ppk.toPk();
            }
            let config = EcRepository.getBlocking(framework.configuration);
            let owners = config.defaultObjectOwners;
            let readers = config.defaultObjectReaders;
            if (owners.length > 0 || readers.length > 0) {
                if (userIdentity) {
                    framework.addOwner(userIdentity);
                } else {
                    this.showMustBeLoggedInModal = true;
                    return false;
                }
            }
            for (let i = 0; i < owners.length; i++) {
                framework.addOwner(EcPk.fromPem(owners[i]));
            }
            let compsAndRelations = framework.competency ? framework.competency : [];
            if (framework.relation) {
                compsAndRelations = compsAndRelations.concat(framework.relation);
            }
            new EcAsyncHelper().each(compsAndRelations, function(id, done) {
                EcRepository.get(id, function(obj) {
                    if (owners.length > 0 || readers.length > 0) {
                        if (userIdentity) {
                            obj.addOwner(userIdentity);
                        }
                    }
                    for (let i = 0; i < owners.length; i++) {
                        obj.addOwner(EcPk.fromPem(owners[i]));
                    }
                    if (readers.length > 0) {
                        for (let i = 0; i < readers.length; i++) {
                            obj.addReader(EcPk.fromPem(readers[i]));
                        }
                        obj = EcEncryptedValue.toEncryptedValue(obj);
                    }
                    window.repo.saveTo(obj, done, done);
                }, done);
            }, function(competencyIds) {
            });
            if (readers.length > 0) {
                for (let i = 0; i < readers.length; i++) {
                    framework.addReader(EcPk.fromPem(readers[i]));
                }
                framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            return framework;
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