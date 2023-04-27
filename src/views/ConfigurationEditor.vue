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

export default {
    name: 'ConfigurationEditor',
    mixins: [cassUtil, configuration],
    computed: {
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
    methods: {
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
        determineHeadingStatusForCustomProperties(customProperties, headingsTracking) {
            if (customProperties != null) {
                for (let prop of customProperties) {
                    if (prop.heading && !prop.heading.trim().equals('')) headingsTracking.anyHeadingsPopulated = true;
                    else headingsTracking.anyHeadingsBlank = true;
                }
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
            this.determineHeadingStatus(this.currentConfig.compClassHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.compMarkingsHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.levelHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.relationshipsHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.fwkIdHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.fwkNameHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.fwkDescHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.fwkClassHeading, headingsTracking);
            this.determineHeadingStatus(this.currentConfig.fwkMarkingsHeading, headingsTracking);
            this.determineHeadingStatusForCustomProperties(this.currentConfig.compCustomProperties, headingsTracking);
            this.determineHeadingStatusForCustomProperties(this.currentConfig.fwkCustomProperties, headingsTracking);
            if (headingsTracking.anyHeadingsPopulated && headingsTracking.anyHeadingsBlank) this.enforceHeadings = true;
        },
        generateComplexConfigObjectFromCurrentConfig() {
            let cco = new schema.Thing();
            cco.context = this.DEFAULT_CONFIGURATION_CONTEXT;
            cco.type = this.DEFAULT_CONFIGURATION_TYPE;
            this.addAllIdentityPksAsOwners(cco);
            if (this.currentConfig.isNew) cco.generateId(window.repo.selectedServer);
            else cco.id = this.currentConfig.id;
            cco.setName(this.currentConfig.name.trim());
            cco.setDescription(this.currentConfig.description.trim());
            cco.isDefault = this.currentConfig.isDefault;
            this.determineIfHeadingsShouldBeEnforced();
            this.addFrameworkConfigToObject(cco);
            this.addTaxonomyConfigToObject(cco);
            this.addTaxonConfigToObject(cco);
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

