const state = ()=>({
    CONFIG_SEARCH_SIZE: 10000,
    DEFAULT_CONFIGURATION_TYPE: 'Configuration',
    DEFAULT_CONFIGURATION_CONTEXT: 'https://schema.cassproject.org/0.4/',
    LANG_STRING_RANGE: 'http://www.w3.org/2000/01/rdf-schema#langString',
    DEFAULT_HEADING: "General",
    LEVEL_SEARCH_SIZE: 10000,
    PERSON_SEARCH_SIZE: 10000,
    GROUP_SEARCH_SIZE: 10000,
    DEFAULT_CUSTOM_PROPERTY_CONTEXT: 'https://schema.cassproject.org/0.4/',
    DEFAULT_CUSTOM_PROPERTY_RANGE: 'http://schema.org/Text',
    defaultBrowserConfig: '',
    defaultBrowserConfigName: '',
    localDefaultBrowserConfig: '',
    configBusy: false,
    configList: [],
    configView: 'list',
    currentConfig: {},
    showConfirmDeleteConfigModal: false,
    showMustBeLoggedInModal: false,
    showBrowserConfigSetModal: false,
    configToDelete: {},
    availableConcepts: []
});

const actions = {
setConfigToDelete(val) {
        this.configToDelete = val;
    },
    setShowMustBeLoggedInModal(val) {
        this.showMustBeLoggedInModal = val;
    },
    setShowBrowserConfigSetModal(val) {
        this.showBrowserConfigSetModal = val;
    },
    setShowConfirmDeleteConfigModal(val) {
        this.showConfirmDeleteConfigModal = val;
    },
    setCurrentConfig(val) {
        this.currentConfig = val;
    },
    setConfigView(val) {
        this.configView = val;
    },
    setConfigList(val) {
        this.setConfigList = val;
    },
    setConfigBusy(val) {
        this.configBusy = val;
    },
    setDefaultBrowserConfig(val) {
        this.defaultBrowserConfig = val;
    },
    setDefaultBrowserConfigName(val) {
        this.defaultBrowserConfigName = val;
    },
    setLocalDefaultBrowserConfig(val) {
        this.localDefaultBrowserConfig = val;
    },
    setAvailableConcepts(val) {
        this.availableConcepts = val;
    },
    setAvailableTypes(val) {
        this.availableTypes = val;
    }
};
import { defineStore } from 'pinia';
export default defineStore('configuration',{ 
    state,
    actions
});