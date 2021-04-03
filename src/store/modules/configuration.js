const state = {
    defaultBrowserConfig: '',
    defaultBrowserConfigName: '',
    localDefaultBrowserConfig: '',
    configurationBusy: false
};

const mutations = {
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