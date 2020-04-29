<template>
    <div>
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': configBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-3x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <!-- set browser commit success modal-->
        <div
            class="modal"
            :class="[{'is-active': showBrowserConfigSetModal}]">
            <div class="modal-background" />
            <div class="modal-card">
                <header class="modal-card-head has-background-primary">
                    <h4 class="subtitle is-size-3 has-text-white modal-card-title">
                        Configuration set as browser default
                    </h4>
                    <div
                        class="delete is-pulled-right"
                        aria-label="close"
                        @click="closeBrowserConfigSetModal" />
                </header>
                <div class="modal-card-body has-text-dark">
                    <p>'<i>{{ defaultBrowserConfigName }}</i>' has been set as your browser's default CaSS Authoring Tool configuration.</p>
                </div>
            </div>
        </div>
        <!-- configuration editor content-->
        <div
            class="container"
            v-if="!configBusy">
            <div class="section">
                <h3 class="subtitle">
                    Configuration
                </h3>
                <div
                    class="button is-outlined is-primary"
                    v-if="configViewMode.equals('list')"
                    @click="createNewConfig">
                    <span class="icon">
                        <i class="fa fa-plus" />
                    </span>
                    <span>
                        create new configuration
                    </span>
                </div>
            </div>
            <div class="table-container">
                <table
                    class="table is-fullwidth"
                    v-if="configViewMode.equals('list')">
                    <thead>
                        <tr>
                            <th><abbr title="Name">name</abbr></th>
                            <th><abbr title="Description">description</abbr></th>
                            <th><abbr title="primary">primary</abbr></th>
                            <th><abbr title="" />default</th>
                            <th><abbr title="" />view/manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <configuration-list-item
                            v-for="config in configList"
                            :id="config.id"
                            :key="config"
                            :name="config.name"
                            :isDefault="config.isDefault"
                            :description="config.description"
                            :isOwned="config.isOwned"
                            :defaultBrowserConfigId="localDefaultBrowserConfigId"
                            @setBrowserDefault="setConfigAsBrowserDefault"
                            @showDetails="showConfigDetails" />
                    </tbody>
                    <br>
                </table>
            </div>
            <div v-if="configViewMode.equals('detail')">
                <configuration-details
                    :config="currentConfig"
                    :readOnly="currentConfigIsReadOnly"
                    :defaultConfigId="defaultConfigId"
                    @setBrowserDefault="setConfigAsBrowserDefault"
                    @save="saveCurrentConfig"
                    @cancel="cancelEditCurrentConfig"
                    @back="backFromEditCurrentConfig" />
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import ConfigurationListItem from '../../components/configuration/ConfigurationListItem';
import ConfigurationDetails from "../../components/configuration/ConfigurationDetails";
import {cassUtil} from '../../mixins/cassUtil';

export default {
    mixins: [cassUtil],
    name: 'ConfigurationEditor',
    components: {
        ConfigurationDetails,
        ConfigurationListItem
    },
    computed: {
        currentConfigIsReadOnly: function() {
            if (!this.currentConfig || !this.currentConfig.isOwned) return true;
            else if (this.currentConfig.isOwned) return false;
            else return true;
        }
    },
    data: () => ({
        USE_TEST_DATA: false,
        CONFIG_SEARCH_SIZE: 10000,
        DEFAULT_CONFIGURATION_CONTEXT: 'https://schema.cassproject.org/0.4/',
        DEFAULT_CONFIGURATION_TYPE: 'Configuration',
        configViewMode: "list",
        configBusy: false,
        currentConfig: {},
        configList: [],
        complexConfigObject: {},
        defaultConfigId: null,
        showBrowserConfigSetModal: false,
        defaultBrowserConfigName: '',
        localDefaultBrowserConfigId: ''
    }),
    methods: {
        showListView() {
            this.configViewMode = "list";
        },
        showDetailView() {
            this.configViewMode = "detail";
        },
        showConfigDetails(configId) {
            this.setCurrentConfig(configId);
            this.showDetailView();
        },
        backFromEditCurrentConfig() {
            this.showListView();
            this.currentConfig = {};
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
        generatePropertyConfigObject(id, domain, range, description, label, priority, required, readOnly, noTextEditing, permittedValues) {
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
            propObj.max = 1;
            if (permittedValues && permittedValues.length > 0) {
                propObj.options = [];
                for (let pv of permittedValues) {
                    let option = {};
                    option.display = pv.display.trim();
                    option.val = pv.value.trim();
                    propObj.options.push(option);
                }
            }
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
                    prop.permittedValues);
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
                null);
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
                null);
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
                null);
        },
        addFrameworkConfigToObject(cco) {
            let fwkConf = {};
            fwkConf.headings = [];
            this.buildFrameworkConfigPriorityArrays(fwkConf);
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
            this.addCustomPropertiesToPriorityArray(this.currentConfig.compCustomProperties, compConf.primaryProperties, "primary");
            compConf.secondaryProperties = [];
            if (this.currentConfig.compIdPriorty.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("@id");
            if (this.currentConfig.compDescPriority.equalsIgnoreCase("secondary")) compConf.secondaryProperties.push("http://schema.org/description");
            this.addCustomPropertiesToPriorityArray(this.currentConfig.compCustomProperties, compConf.secondaryProperties, "secondary");
            compConf.tertiaryProperties = [];
            if (this.currentConfig.compIdPriorty.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("@id");
            if (this.currentConfig.compDescPriority.equalsIgnoreCase("tertiary")) compConf.tertiaryProperties.push("http://schema.org/description");
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
                null);
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
                null);
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
                null);
        },
        buildCompetencyTypeConfigObject(compConf) {
            let compTypeRequired = this.currentConfig.compTypeRequired;
            if (this.currentConfig.compEnforcedTypes && this.currentConfig.compEnforcedTypes.length > 0) compTypeRequired = true;
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
                this.currentConfig.compEnforcedTypes);
        },
        addCompetencyConfigToObject(cco) {
            let compConf = {};
            compConf.headings = [];
            this.buildCompetencyConfigPriorityArrays(compConf);
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
        generateComplexConfigObjectFromCurrentConfig() {
            let cco = new Thing();
            cco.context = this.DEFAULT_CONFIGURATION_CONTEXT;
            cco.type = this.DEFAULT_CONFIGURATION_TYPE;
            this.addAllIdentityPksAsOwners(cco);
            console.log(this.currentConfig);
            if (this.currentConfig.isNew) cco.generateId(window.repo.selectedServer);
            else cco.id = this.currentConfig.id;
            cco.setName(this.currentConfig.name.trim());
            cco.setDescription(this.currentConfig.description.trim());
            cco.isDefault = this.currentConfig.isDefault;
            this.addFrameworkConfigToObject(cco);
            this.addCompetencyConfigToObject(cco);
            this.addRelationsConfigToObject(cco);
            this.addLevelsConfigToObject(cco);
            this.addAlignmentConfigToObject(cco);
            this.addDefaultPermissionConfigToObject(cco);
            this.complexConfigObject = cco;
        },
        saveConfigToRepositorySuccess(msg) {
            console.log("Config save success");
            this.buildConfigList();
            this.configBusy = false;
            this.showListView();
        },
        saveConfigToRepositoryFailure(msg) {
            console.log("Config save failure: " + msg);
            this.configBusy = false;
            this.showListView();
        },
        saveCurrentConfig(enforcedLevels, defaultOwners, defaultReaders, defaultCommenters) {
            console.log("saveCurrentConfig: ");
            console.log(enforcedLevels);
            if (enforcedLevels && enforcedLevels.length > 0) {
                this.currentConfig.enforceLevelValues = true;
                this.currentConfig.enforcedLevelValues = enforcedLevels;
            } else this.currentConfig.enforceLevelValues = false;
            this.currentConfig.defaultOwners = defaultOwners;
            this.currentConfig.defaultReaders = defaultReaders;
            this.currentConfig.defaultCommenters = defaultCommenters;
            this.generateComplexConfigObjectFromCurrentConfig();
            console.log("complexConfigObject: ");
            console.log(JSON.stringify(this.complexConfigObject));
            if (this.USE_TEST_DATA) alert("Using Test Data...won't issue repository save");
            else {
                this.configBusy = true;
                EcRepository.save(this.complexConfigObject, this.saveConfigToRepositorySuccess, this.saveConfigToRepositoryFailure);
            }
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
            newConfigObj.fwkNameLabel = "Framework Name";
            newConfigObj.fwkNameDescription = "Name of the framework";
            newConfigObj.fwkDescLabel = "Framework Description";
            newConfigObj.fwkDescDescription = "Description of the framework";
            newConfigObj.fwkDescPriority = "primary";
            newConfigObj.fwkDescRequired = true;
            newConfigObj.compAllowLevels = true;
            newConfigObj.levelLabel = 'Level';
            newConfigObj.levelDescription = 'Level of the competency';
            newConfigObj.enforceLevelValues = false;
            newConfigObj.enforcedLevelValues = [];
            newConfigObj.compIdLabel = "Competency ID";
            newConfigObj.compIdDescription = "ID of the competency";
            newConfigObj.compIdPriorty = "primary";
            newConfigObj.compNameLabel = "Competency Name";
            newConfigObj.compNameDescription = "Name of the competency";
            newConfigObj.compDescLabel = "Competency Description";
            newConfigObj.compDescDescription = "Description of the competency";
            newConfigObj.compDescPriority = "primary";
            newConfigObj.compDescRequired = false;
            newConfigObj.compTypeLabel = "Competency Type";
            newConfigObj.compTypeDescription = "Type of the competency";
            newConfigObj.compTypePriority = "secondary";
            newConfigObj.compTypeRequired = false;
            newConfigObj.compEnforceTypes = false;
            newConfigObj.compEnforcedTypes = [];
            newConfigObj.fwkCustomProperties = [];
            newConfigObj.compCustomProperties = [];
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
            this.currentConfig = this.getConfigById(configId);
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
        buildConfigListFromTestData() {
            this.configList = this.generateTestConfigList();
            this.sortConfigList();
            this.configBusy = false;
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
            simpleConfigObj.fwkNameLabel = cfo["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.fwkNameDescription = cfo["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.fwkDescLabel = cfo["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.fwkDescDescription = cfo["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.fwkDescPriority = cfo["http://schema.org/description"]["priority"];
            simpleConfigObj.fwkDescRequired = this.getBooleanValue(cfo["http://schema.org/description"]["isRequired"]);
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
            simpleConfigObj.compIdLabel = cco["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compIdDescription = cco["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compIdPriorty = cco["@id"]["priority"];
            simpleConfigObj.compNameLabel = cco["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compNameDescription = cco["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compDescLabel = cco["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compDescDescription = cco["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compDescPriority = cco["http://schema.org/description"]["priority"];
            simpleConfigObj.compDescRequired = this.getBooleanValue(cco["http://schema.org/description"]["isRequired"]);
            let ccto = cco["http://purl.org/dc/terms/type"];
            simpleConfigObj.compTypeLabel = ccto["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compTypeDescription = ccto["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compTypePriority = ccto["priority"];
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
            if (complexConfigObj["levelsConfig"] && complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]) {
                let lo = complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"];
                simpleConfigObj.compAllowLevels = true;
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
            console.log("Config search success: ");
            console.log(ecRemoteLda);
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
            console.log("Config search failure: " + msg);
            this.configBusy = false;
        },
        buildConfigListFromRepository() {
            let paramObj = {};
            paramObj.size = this.CONFIG_SEARCH_SIZE;
            window.repo.searchWithParams("@type:Configuration", paramObj, null, this.searchRepositoryForConfigsSuccess, this.searchRepositoryForConfigsFailure);
        },
        buildConfigList() {
            this.configBusy = true;
            this.complexConfigObject = {};
            if (this.USE_TEST_DATA) this.buildConfigListFromTestData();
            else this.buildConfigListFromRepository();
        },
        closeBrowserConfigSetModal() {
            this.showBrowserConfigSetModal = false;
        },
        setConfigAsBrowserDefault(configId) {
            let bdc = this.getConfigById(configId);
            this.setDefaultBrowserConfigId(configId);
            this.defaultBrowserConfigName = bdc.name;
            this.localDefaultBrowserConfigId = configId;
            this.showBrowserConfigSetModal = true;
        },
        generateTestConfigList() {
            let ca = [];
            /** **************************** Test Config A ***********************************************/
            let a = {};
            a.id = "testOwnedConfig_1";
            a.isOwned = true;
            a.isNew = false;
            a.name = "Test Owned Configuration 1";
            a.description = "Configuration owned by the current user - 1";
            a.isDefault = true;
            a.fwkIdLabel = "FWK ID LBL 1";
            a.fwkIdDescription = "FWK ID DESC 1";
            a.fwkIdPriorty = "primary";
            a.fwkNameLabel = "FWK NAME LBL 1";
            a.fwkNameDescription = "FWK NAME DESC 1";
            a.fwkDescLabel = "FWK DESC LBL 1";
            a.fwkDescDescription = "FWK DESC DESC 1";
            a.fwkDescPriority = "primary";
            a.fwkDescRequired = true;
            a.compAllowLevels = true;
            a.levelLabel = 'Level';
            a.levelDescription = 'Level of the competency';
            a.enforceLevelValues = true;
            a.enforcedLevelValues = [];
            a.enforcedLevelValues.push("https://dev.api.cassproject.org/api/data/schema.cassproject.org.0.4.Level/760175fd-4bda-49e1-9607-f8fa51737f88");
            a.enforcedLevelValues.push("https://dev.api.cassproject.org/api/data/schema.cassproject.org.0.4.Level/35d4b028-d805-4da5-8eba-8938fc5ef1d8");
            a.compIdLabel = "COMP ID LABEL 1";
            a.compIdDescription = "COMP ID DESC 1";
            a.compIdPriorty = "secondary";
            a.compNameLabel = "COMP NAME LABEL 1";
            a.compNameDescription = "COMP NAME DESC 1";
            a.compDescLabel = "COMP DESC LABEL 1";
            a.compDescDescription = "COMP DESC DESC 1";
            a.compDescPriority = "primary";
            a.compDescRequired = false;
            a.compTypeLabel = "COMP TYPE LABEL 1";
            a.compTypeDescription = "COMP TYPE DESC 1";
            a.compTypePriority = "secondary";
            a.compTypeRequired = false;
            a.compEnforceTypes = false;
            a.compEnforcedTypes = [];
            a.fwkCustomProperties = [];
            a.compCustomProperties = [];
            a.relationships = {};
            a.relationships.isEnabledBy = {};
            a.relationships.isEnabledBy.label = 'is enabled by';
            a.relationships.isEnabledBy.enabled = true;
            a.relationships.requires = {};
            a.relationships.requires.label = 'requires';
            a.relationships.requires.enabled = true;
            a.relationships.desires = {};
            a.relationships.desires.label = 'desires';
            a.relationships.desires.enabled = true;
            a.relationships.narrows = {};
            a.relationships.narrows.label = 'narrows';
            a.relationships.narrows.enabled = true;
            a.relationships.isRelatedTo = {};
            a.relationships.isRelatedTo.label = 'is related to';
            a.relationships.isRelatedTo.enabled = true;
            a.relationships.isEquivalentTo = {};
            a.relationships.isEquivalentTo.label = 'is equivalent to';
            a.relationships.isEquivalentTo.enabled = true;
            a.relationships.broadens = {};
            a.relationships.broadens.label = 'broadens';
            a.relationships.broadens.enabled = false;
            a.relationships.majorRelated = {};
            a.relationships.majorRelated.label = 'is majorly related to';
            a.relationships.majorRelated.enabled = false;
            a.relationships.minorRelated = {};
            a.relationships.minorRelated.label = 'is minorly related to';
            a.relationships.minorRelated.enabled = false;
            a.relationships.isSimilarTo = {};
            a.relationships.isSimilarTo.label = 'is similar to';
            a.relationships.isSimilarTo.enabled = false;
            a.relationships.isPartiallySameAs = {};
            a.relationships.isPartiallySameAs.label = 'is partially the same as';
            a.relationships.isPartiallySameAs.enabled = false;
            a.relationships.enables = {};
            a.relationships.enables.label = 'enables';
            a.relationships.enables.enabled = false;
            a.relationships.hasChild = {};
            a.relationships.hasChild.label = 'has child';
            a.relationships.hasChild.enabled = false;
            a.relationships.isChildOf = {};
            a.relationships.isChildOf.label = 'is child of';
            a.relationships.isChildOf.enabled = false;
            a.alignments = {};
            a.alignments.teaches = true;
            a.alignments.assesses = true;
            a.alignments.requires = true;
            a.defaultOwners = [];
            a.defaultReaders = [];
            a.defaultCommenters = [];
            ca.push(a);
            /** **************************** Test Config B ***********************************************/
            let b = {};
            b.id = "testNotOwnedConfig_1";
            b.isOwned = false;
            b.isNew = false;
            b.name = "Test Not-Owned Configuration 1";
            b.description = "Configuration NOT owned by the current user - 1";
            b.isDefault = false;
            b.fwkIdLabel = "framework id";
            b.fwkIdDescription = "id of the framework";
            b.fwkIdPriorty = "secondary";
            b.fwkNameLabel = "framework name";
            b.fwkNameDescription = "name of the framework";
            b.fwkDescLabel = "framework description";
            b.fwkDescDescription = "description of the framework";
            b.fwkDescPriority = "primary";
            b.fwkDescRequired = true;
            b.compAllowLevels = false;
            b.levelLabel = 'Level';
            b.levelDescription = 'Level of the competency';
            b.enforceLevelValues = false;
            b.enforcedLevelValues = [];
            b.compIdLabel = "competency id";
            b.compIdDescription = "id of the competency";
            b.compIdPriorty = "secondary";
            b.compNameLabel = "competency name";
            b.compNameDescription = "name of the competency";
            b.compDescLabel = "competency description";
            b.compDescDescription = "description of the competency";
            b.compDescPriority = "primary";
            b.compDescRequired = false;
            b.compTypeLabel = "competency type";
            b.compTypeDescription = "type of the competency";
            b.compTypePriority = "secondary";
            b.compTypeRequired = true;
            b.compEnforceTypes = false;
            b.compEnforcedTypes = [];
            b.fwkCustomProperties = [];
            let prop1 = {};
            prop1.context = 'https://schema.cassproject.org/0.4/';
            prop1.propertyName = 'customFwkProp1';
            prop1.range = 'http://schema.org/URL';
            prop1.description = 'Custom Fwk property 1';
            prop1.label = 'cFwkProp1';
            prop1.priority = 'secondary';
            prop1.required = true;
            prop1.permittedValues = [];
            let prop2 = {};
            prop2.context = 'https://schema.cassproject.org/0.4/';
            prop2.propertyName = 'customFwkProp2';
            prop2.range = 'http://schema.org/Text';
            prop2.description = 'Custom Fwk property 2';
            prop2.label = 'cFwkProp2';
            prop2.priority = 'tertiary';
            prop2.required = false;
            prop2.permittedValues = [];
            let prop2pv1 = {};
            prop2pv1.display = "fwkProp2 pvd 1";
            prop2pv1.value = "fwkProp2pvv1";
            let prop2pv2 = {};
            prop2pv2.display = "fwkProp2 pvd 2";
            prop2pv2.value = "fwkProp2pvv2";
            prop2.permittedValues.push(prop2pv1);
            prop2.permittedValues.push(prop2pv2);
            b.fwkCustomProperties.push(prop1);
            b.fwkCustomProperties.push(prop2);
            b.compCustomProperties = [];
            let prop3 = {};
            prop3.context = 'https://schema.cassproject.org/0.4/';
            prop3.propertyName = 'customCompProp1';
            prop3.range = 'http://schema.org/URL';
            prop3.description = 'Custom Comp property 1';
            prop3.label = 'cCompProp1';
            prop3.priority = 'primary';
            prop3.required = true;
            prop3.permittedValues = [];
            let prop4 = {};
            prop4.context = 'https://schema.cassproject.org/0.4/';
            prop4.propertyName = 'customCompProp2';
            prop4.range = 'http://schema.org/Text';
            prop4.description = 'Custom Comp property 2';
            prop4.label = 'cCompProp2';
            prop4.priority = 'tertiary';
            prop4.required = false;
            prop4.permittedValues = [];
            let prop4pv1 = {};
            prop4pv1.display = "compProp2 pvd 1";
            prop4pv1.value = "compProp2pvv1";
            let prop4pv2 = {};
            prop4pv2.display = "compProp2 pvd 2";
            prop4pv2.value = "compProp2pvv2";
            prop4.permittedValues.push(prop4pv1);
            prop4.permittedValues.push(prop4pv2);
            b.compCustomProperties.push(prop3);
            b.compCustomProperties.push(prop4);
            b.relationships = {};
            b.relationships.isEnabledBy = {};
            b.relationships.isEnabledBy.label = 'is enabled by';
            b.relationships.isEnabledBy.enabled = true;
            b.relationships.requires = {};
            b.relationships.requires.label = 'requires';
            b.relationships.requires.enabled = true;
            b.relationships.desires = {};
            b.relationships.desires.label = 'desires';
            b.relationships.desires.enabled = true;
            b.relationships.narrows = {};
            b.relationships.narrows.label = 'narrows';
            b.relationships.narrows.enabled = true;
            b.relationships.isRelatedTo = {};
            b.relationships.isRelatedTo.label = 'is related to';
            b.relationships.isRelatedTo.enabled = true;
            b.relationships.isEquivalentTo = {};
            b.relationships.isEquivalentTo.label = 'is equivalent to';
            b.relationships.isEquivalentTo.enabled = true;
            b.relationships.broadens = {};
            b.relationships.broadens.label = 'broadens';
            b.relationships.broadens.enabled = false;
            b.relationships.majorRelated = {};
            b.relationships.majorRelated.label = 'is majorly related to';
            b.relationships.majorRelated.enabled = false;
            b.relationships.minorRelated = {};
            b.relationships.minorRelated.label = 'is minorly related to';
            b.relationships.minorRelated.enabled = false;
            b.relationships.isSimilarTo = {};
            b.relationships.isSimilarTo.label = 'is similar to';
            b.relationships.isSimilarTo.enabled = false;
            b.relationships.isPartiallySameAs = {};
            b.relationships.isPartiallySameAs.label = 'is partially the same as';
            b.relationships.isPartiallySameAs.enabled = false;
            b.relationships.enables = {};
            b.relationships.enables.label = 'enables';
            b.relationships.enables.enabled = false;
            b.relationships.hasChild = {};
            b.relationships.hasChild.label = 'has child';
            b.relationships.hasChild.enabled = false;
            b.relationships.isChildOf = {};
            b.relationships.isChildOf.label = 'is child of';
            b.relationships.isChildOf.enabled = false;
            b.alignments = {};
            b.alignments.teaches = true;
            b.alignments.assesses = true;
            b.alignments.requires = true;
            b.defaultOwners = [];
            b.defaultReaders = [];
            b.defaultCommenters = [];
            ca.push(b);
            /** **************************** Test Config C ***********************************************/
            let c = {};
            c.id = "testOwnedConfig_2";
            c.isOwned = true;
            c.isNew = false;
            c.name = "Test Owned Configuration 2";
            c.description = "Configuration owned by the current user - 2";
            c.isDefault = false;
            c.fwkIdLabel = "FWK ID LBL 2";
            c.fwkIdDescription = "FWK ID DESC 2";
            c.fwkIdPriorty = "secondary";
            c.fwkNameLabel = "FWK NAME LBL 2";
            c.fwkNameDescription = "FWK NAME DESC 2";
            c.fwkDescLabel = "FWK DESC LBL 2";
            c.fwkDescDescription = "FWK DESC DESC 2";
            c.fwkDescPriority = "primary";
            c.fwkDescRequired = true;
            c.compAllowLevels = true;
            c.levelLabel = 'Level';
            c.levelDescription = 'Level of the competency';
            c.enforceLevelValues = false;
            c.enforcedLevelValues = [];
            c.compIdLabel = "COMP ID LABEL 2";
            c.compIdDescription = "COMP ID DESC 2";
            c.compIdPriorty = "secondary";
            c.compNameLabel = "COMP NAME LABEL 2";
            c.compNameDescription = "COMP NAME DESC 2";
            c.compDescLabel = "COMP DESC LABEL 2";
            c.compDescDescription = "COMP DESC DESC 2";
            c.compDescPriority = "primary";
            c.compDescRequired = false;
            c.compTypeLabel = "COMP TYPE LABEL 2";
            c.compTypeDescription = "COMP TYPE DESC 2";
            c.compTypePriority = "secondary";
            c.compTypeRequired = true;
            c.compEnforceTypes = false;
            c.compEnforcedTypes = [];
            c.fwkCustomProperties = [];
            let prop5 = {};
            prop5.context = 'https://schema.cassproject.org/0.4/';
            prop5.propertyName = 'customFwkProp1';
            prop5.range = 'http://schema.org/URL';
            prop5.description = 'Custom Fwk property 1';
            prop5.label = 'cFwkProp1';
            prop5.priority = 'secondary';
            prop5.required = true;
            prop5.permittedValues = [];
            let prop6 = {};
            prop6.context = 'https://schema.cassproject.org/0.4/';
            prop6.propertyName = 'customFwkProp2';
            prop6.range = 'http://schema.org/Text';
            prop6.description = 'Custom Fwk property 2';
            prop6.label = 'cFwkProp2';
            prop6.priority = 'tertiary';
            prop6.required = false;
            prop6.permittedValues = [];
            let prop6pv1 = {};
            prop6pv1.display = "fwkProp2 pvd 1";
            prop6pv1.value = "fwkProp2pvv1";
            let prop6pv2 = {};
            prop6pv2.display = "fwkProp2 pvd 2";
            prop6pv2.value = "fwkProp2pvv2";
            prop6.permittedValues.push(prop6pv1);
            prop6.permittedValues.push(prop6pv2);
            c.fwkCustomProperties.push(prop5);
            c.fwkCustomProperties.push(prop6);
            c.compCustomProperties = [];
            let prop7 = {};
            prop7.context = 'https://schema.cassproject.org/0.4/';
            prop7.propertyName = 'customCompProp1';
            prop7.range = 'http://schema.org/URL';
            prop7.description = 'Custom Comp property 1';
            prop7.label = 'cCompProp1';
            prop7.priority = 'primary';
            prop7.required = true;
            prop7.permittedValues = [];
            let prop8 = {};
            prop8.context = 'https://schema.cassproject.org/0.4/';
            prop8.propertyName = 'customCompProp2';
            prop8.range = 'http://schema.org/Text';
            prop8.description = 'Custom Comp property 2';
            prop8.label = 'cCompProp2';
            prop8.priority = 'tertiary';
            prop8.required = false;
            prop8.permittedValues = [];
            let prop8pv1 = {};
            prop8pv1.display = "compProp2 pvd 1";
            prop8pv1.value = "compProp2pvv1";
            let prop8pv2 = {};
            prop8pv2.display = "compProp2 pvd 2";
            prop8pv2.value = "compProp2pvv2";
            prop8.permittedValues.push(prop8pv1);
            prop8.permittedValues.push(prop8pv2);
            c.compCustomProperties.push(prop7);
            c.compCustomProperties.push(prop8);
            c.relationships = {};
            c.relationships.isEnabledBy = {};
            c.relationships.isEnabledBy.label = 'is enabled by';
            c.relationships.isEnabledBy.enabled = true;
            c.relationships.requires = {};
            c.relationships.requires.label = 'requires';
            c.relationships.requires.enabled = true;
            c.relationships.desires = {};
            c.relationships.desires.label = 'desires';
            c.relationships.desires.enabled = true;
            c.relationships.narrows = {};
            c.relationships.narrows.label = 'narrows';
            c.relationships.narrows.enabled = true;
            c.relationships.isRelatedTo = {};
            c.relationships.isRelatedTo.label = 'is related to';
            c.relationships.isRelatedTo.enabled = true;
            c.relationships.isEquivalentTo = {};
            c.relationships.isEquivalentTo.label = 'is equivalent to';
            c.relationships.isEquivalentTo.enabled = true;
            c.relationships.broadens = {};
            c.relationships.broadens.label = 'broadens';
            c.relationships.broadens.enabled = false;
            c.relationships.majorRelated = {};
            c.relationships.majorRelated.label = 'is majorly related to';
            c.relationships.majorRelated.enabled = false;
            c.relationships.minorRelated = {};
            c.relationships.minorRelated.label = 'is minorly related to';
            c.relationships.minorRelated.enabled = false;
            c.relationships.isSimilarTo = {};
            c.relationships.isSimilarTo.label = 'is similar to';
            c.relationships.isSimilarTo.enabled = false;
            c.relationships.isPartiallySameAs = {};
            c.relationships.isPartiallySameAs.label = 'is partially the same as';
            c.relationships.isPartiallySameAs.enabled = false;
            c.relationships.enables = {};
            c.relationships.enables.label = 'enables';
            c.relationships.enables.enabled = false;
            c.relationships.hasChild = {};
            c.relationships.hasChild.label = 'has child';
            c.relationships.hasChild.enabled = false;
            c.relationships.isChildOf = {};
            c.relationships.isChildOf.label = 'is child of';
            c.relationships.isChildOf.enabled = false;
            c.alignments = {};
            c.alignments.teaches = true;
            c.alignments.assesses = true;
            c.alignments.requires = true;
            c.defaultOwners = [];
            c.defaultReaders = [];
            c.defaultCommenters = [];
            ca.push(c);
            return ca;
        }
    },
    mounted() {
        this.buildConfigList();
        this.localDefaultBrowserConfigId = this.getDefaultBrowserConfigId();
    }
};
</script>

<style lang="scss" scoped>
    h3 {
        font-size: 2rem;
        padding-bottom: 1rem;
    }
    h4 {
        font-size: 1.6rem;
        padding-bottom: 1rem;
    }
    h4 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
    .listHdr {
        font-weight: bold;
    }
</style>

