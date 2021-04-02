const state = {
    defaultBrowserConfig: '',
    defaultBrowserConfigName: '',
    localDefaultBrowserConfig: '',
    configurationIsBusy: ''
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
        return state.defaultBrowserConfig;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};