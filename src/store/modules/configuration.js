const state = {
    CONFIG_SEARCH_SIZE: 10000,
    DEFAULT_CONFIGURATION_TYPE: 'Configuration',
    DEFAULT_CONFIGURATION_CONTEXT: 'https://schema.cassproject.org/0.4/',
    LANG_STRING_RANGE: 'http://www.w3.org/2000/01/rdf-schema#langString',
    DEFAULT_HEADING: "General",
    LEVEL_SEARCH_SIZE: 10000,
    PERSON_SEARCH_SIZE: 10000,
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
    configToDelete: {}
};

const mutations = {
    setConfigToDelete(state, val) {
        state.configToDelete = val;
    },
    setShowConfirmDeleteConfigModal(state, val) {
        state.showConfirmDeleteConfigModal = val;
    },
    setCurrentConfig(state, val) {
        state.currentConfig = val;
    },
    setConfigView(state, val) {
        state.configView = val;
    },
    setConfigList(state, val) {
        state.setConfigList = val;
    },
    setConfigBusy(state, val) {
        state.configBusy = val;
    },
    setDefaultBrowserConfig(state, val) {
        state.defaultBrowserConfig = val;
    },
    setDefaultBrowserConfigName(state, val) {
        state.defaultBrowserConfigName = val;
    },
    setLocalDefaultBrowserConfig(state, val) {
        state.localDefaultBrowserConfig = val;
    }
};
const actions = {

};
const getters = {
    configToDelete: function(state) {
        return state.configToDelete;
    },
    showConfirmDeleteConfigModal: function(state) {
        return state.showConfirmDeleteConfigModal;
    },
    LEVEL_SEARCH_SIZE: function(state) {
        return state.LEVEL_SEARCH_SIZE;
    },
    GROUP_SEARCH_SIZE: function(state) {
        return state.GROUP_SEARCH_SIZE;
    },
    PERSON_SEARCH_SIZE: function(state) {
        return state.PERSON_SEARCH_SIZE;
    },
    DEFAULT_CUSTOM_PROPERTY_CONTEXT: function(state) {
        return state.DEFAULT_CUSTOM_PROPERTY_CONTEXT;
    },
    DEFAULT_CUSTOM_PROPERTY_RANGE: function(state) {
        return state.DEFAULT_CUSTOM_PROPERTY_RANGE;
    },
    DEFAULT_CONFIGURATION_TYPE: function(state) {
        return state.DEFAULT_CONFIGURATION_TYPE;
    },
    DEFAULT_CONFIGURATION_CONTEXT: function(state) {
        return state.DEFAULT_CONFIGURATION_CONTEXT;
    },
    LANG_STRING_RANGE: function(state) {
        return state.LANG_STRING_RANGE;
    },
    DEFAULT_HEADING: function(state) {
        return state.DEFAULT_HEADING;
    },
    CONFIG_SEARCH_SIZE(state) {
        return state.CONFIG_SEARCH_SIZE;
    },
    currentConfig(state) {
        return state.currentConfig;
    },
    configView(state) {
        return state.configView;
    },
    configList(state) {
        return state.configList;
    },
    defaultBrowserConfig(state) {
        return state.defaultBrowserConfig;
    },
    defaultBrowserConfigName(state) {
        return state.defaultBrowserConfigName;
    },
    localDefaultBrowserConfig(state) {
        return state.localDefaultBrowserConfig;
    },
    configBusy(state) {
        return state.configBusy;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};