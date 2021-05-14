const state = {
    defaultBrowserConfig: '',
    defaultBrowserConfigName: '',
    localDefaultBrowserConfig: '',
    configurationBusy: false,
    configList: [],
    configView: 'list',
    currentConfig: {}
};

const mutations = {
    setCurrentConfig(state, val) {
        state.currentConfig = val;
    },
    setConfigView(state, val) {
        state.configView = val;
    },
    setConfigList(state, val) {
        state.setConfigList = val;
    },
    setConfigurationBusy(state, val) {
        state.configurationBusy = val;
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
    configurationBusy(state) {
        return state.configurationBusy;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};