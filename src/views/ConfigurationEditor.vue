<template>
    <div
        id="configuration"
        class="'section">
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': configBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <delete-configuration-confirm
            v-if="showConfirmDeleteConfigModal"
            :name="configToDelete.name"
            @close="cancelConfigurationDelete"
            @confirm="deleteConfiguration"
            @cancel="cancelConfigurationDelete" />
        <configuration-not-permitted
            v-if="showMustBeLoggedInModal"
            @cancel="showMustBeLoggedInModal = false"
            @close="showMustBeLoggedInModal=false" />
        <!-- set browser commit success modal-->
        <configuration-set-success
            :name="defaultBrowserConfigName"
            v-if="showBrowserConfigSetModal"
            @ok="showBrowserConfigSetModal = false"
            @close="showBrowserConfigSetModal = false"
            @cancel="closeBrowserConfigSetModal" />
        <!-- configuration editor content-->
        <section
            class="container"
            v-if="!configBusy">
            <div class="section">
                <h3
                    class="title">
                    Configuration
                </h3>
                <p v-if="configViewMode.equals('list')">
                    Configurations control the way your frameworks appear in the editor, as well as what properties, relationships,
                    and in some cases value types of properties and relationships you can add to your framework. If a browser configuration
                    is not set then the system will default to your instance default. If you are the configuration administrator you will be
                    able to manage the property settings and change which instance is the default.  Otherwise contact your CAT administrator.
                </p>
            </div>
            <!-- configuration list -->
            <configuration-list
                view="editor"
                @showDetails="showConfigDetails($event)"
                :configList="configList"
                v-if="configViewMode.equals('list')" />
            <div
                class="button is-outlined is-primary is-pulled-right"
                v-if="configViewMode.equals('list')"
                @click="createNewConfig">
                <span class="icon">
                    <i class="fa fa-plus" />
                </span>
                <span>
                    create new configuration
                </span>
            </div>
            <div v-if="configViewMode.equals('detail')">
                <configuration-details
                    :config="currentConfig"
                    :configList="configList"
                    :readOnly="currentConfigIsReadOnly"
                    :defaultConfigId="defaultConfigId"
                    :defaultBrowserConfig="localDefaultBrowserConfigId"
                    @set-browser-default="setConfigAsBrowserDefault"
                    @remove-browser-default-config="removeConfigAsBrowserDefault"
                    @save="saveCurrentConfig"
                    @cancel="cancelEditCurrentConfig"
                    @back="backFromEditCurrentConfig" />
            </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /src
import ConfigurationDetails from "@/components/configuration/ConfigurationDetails";
import {cassUtil} from '@/mixins/cassUtil';
import {configuration} from '@/mixins/configuration';
import DeleteConfigurationConfirm from '@/components/modalContent/DeleteConfigurationConfirm.vue';
import ConfigurationNotPermitted from '@/components/modalContent/ConfigurationNotPermitted.vue';
import ConfigurationSetSuccess from '@/components/modalContent/ConfigurationSetSuccess.vue';
import ConfigurationList from '@/components/configuration/ConfigurationList.vue';
import {mapGetters} from 'vuex';

export default {
    name: 'ConfigurationEditor',
    mixins: [cassUtil, configuration],
    computed: {
        ...mapGetters({
            CONFIG_SEARCH_SIZE: 'configuration/CONFIG_SEARCH_SIZE',
            DEFAULT_CONFIGURATION_TYPE: 'configuration/DEFAULT_CONFIGURATION_TYPE',
            DEFAULT_CONFIGURATION_CONTEXT: 'configuration/DEFAULT_CONFIGURATION_CONTEXT',
            LANG_STRING_RANGE: 'configuration/LANG_STRING_RANGE',
            DEFAULT_HEADING: 'configuration/DEFAULT_HEADING'
        }),
        configViewMode() {
            return this.$store.getters['configuration/configView'];
        },
        defaultBrowserConfigName: {
            get() {
                return this.$store.getters['configuration/defaultBrowserConfigName'];
            },
            set(val) {
                this.$store.commit('configuration/setDefaultBrowserConfigName', val);
            }
        },
        showConfirmDeleteConfigModal: {
            get() {
                return this.$store.getters['configuration/showConfirmDeleteConfigModal'];
            },
            set(val) {
                this.$store.commit('configuration/setShowConfirmDeleteConfigModal', val);
            }
        },
        showBrowserConfigSetModal: {
            get() {
                return this.$store.getters['configuration/showBrowserConfigSetModal'];
            },
            set(val) {
                this.$store.commit('configuration/setShowBrowserConfigSetModal', val);
            }
        },
        showMustBeLoggedInModal: {
            get() {
                return this.$store.getters['configuration/showMustBeLoggedInModal'];
            },
            set(val) {
                this.$store.commit('configuration/setShowMustBeLoggedInModal', val);
            }
        },
        configToDelete: {
            get() {
                return this.$store.getters['configuration/configToDelete'];
            },
            set(val) {
                this.$store.commit('configuration/setConfigToDelete', val);
            }
        },
        currentConfig: {
            get() {
                return this.$store.getters['configuration/currentConfig'];
            },
            set(val) {
                this.$store.commit('configuration/setCurrentConfig', val);
            }
        },
        localDefaultBrowserConfigId() {
            return this.$store.getters['configuration/localDefaultBrowserConfig'];
        },
        currentConfigIsReadOnly: function() {
            if (!this.currentConfig || !this.currentConfig.isOwned) return true;
            else if (this.currentConfig.isOwned) return false;
            else return true;
        }
    },
    data: () => ({
        configBusy: false,
        configList: [],
        complexConfigObject: {},
        defaultConfigId: null,
        frameworkConfigId: '',
        enforceHeadings: false
    }),
    components: {
        ConfigurationDetails,
        DeleteConfigurationConfirm,
        ConfigurationNotPermitted,
        ConfigurationSetSuccess,
        ConfigurationList
    },
    mounted() {
        this.generateCustomPropertyAvailableTypes();
    },
    methods: {
        generateCustomPropertyAvailableTypes() {
            appLog("generate list of available types");
            // repo.searchWithParams('@type:ConceptScheme',
            //     {size: 10000},
            //     null,
            //     null,
            //     null,
            //     null
            // ).then((results) => {
            //     let types = [];
            //     for (let type = 0; type < results.length; type++) {
            //         types.push({
            //             display: EcRemoteLinkedData.getDisplayStringFrom(results[type]["dcterms:title"]),
            //             value: results[type].id
            //         });
            //     }
            //     this.$store.commit('configuration/setAvailableTypes', types);
            //     appLog(types);
            // }).catch((err) => {
            //     appLog("failed to retrieve types: " + err);
            // });
            let types = [
                {
                    value: 'typeA',
                    display: 'Type A'
                },
                {
                    value: 'typeB',
                    display: 'Type B'
                },
                {
                    value: 'typeC',
                    display: 'Type C'
                }
            ];
            this.$store.commit('configuration/setAvailableTypes', types);
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
        async deleteConfiguration() {
            this.showConfirmDeleteConfigModal = false;
            this.configBusy = true;
            let configObj = await EcRepository.get(this.configToDelete.id);
            if (configObj) {
                let repo = window.repo;
                repo.deleteRegistered(configObj, this.handleDeleteConfigurationSuccess, this.handleDeleteConfigurationFailure);
            }
        },
        cancelConfigurationDelete() {
            this.configToDelete = {};
            this.showConfirmDeleteConfigModal = false;
        },
        backFromEditCurrentConfig() {
            this.showListView();
            this.$store.commit('configuration/setCurrentConfig', {});
        },
        generateCustomPropertyNameId(customProp) {
            return customProp.context + customProp.propertyName;
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
        generatePropertyConfigObject(id, domain, range, description, label, priority, required, readOnly, noTextEditing, permittedValues, permittedTypes, heading, allowMultiples, onePerLanguage) {
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
                    prop.permittedTypes,
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
            let cco = new schema.Thing();
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
            window.repo.saveTo(this.complexConfigObject, this.saveConfigToRepositorySuccess, this.saveConfigToRepositoryFailure);
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
        cancelEditCurrentConfig() {
            this.buildConfigList();
            this.showListView();
            this.currentConfig = {};
        },
        createNewConfig() {
            this.currentConfig = this.generateNewConfigObject();
            this.showDetailView();
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
        closeBrowserConfigSetModal() {
            this.$store.commit('configuration/setShowConfirmDeleteConfigModal', false);
        }
    }
};
</script>

<style lang="scss" scoped>
    h3 {
        font-size: 2rem;
        padding-bottom: 0rem;
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

