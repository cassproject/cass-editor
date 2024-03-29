import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const state = {
    crosswalkEnabled: true,
    userManagementEnabled: true,
    configurationsEnabled: true,
    searchByOwnerNameEnabled: true,
    pluginsEnabled: true,
    loginEnabled: true,
    legacyLoginEnabled: true,
    apiLoginEnabled: false,
    shareEnabled: true,
    shareLink: false,
    ownedByMe: false
};

const mutations = {
    crosswalkEnabled(state, bool) {
        state.crosswalkEnabled = bool;
    },
    userManagementEnabled(state, bool) {
        state.userManagementEnabled = bool;
    },
    configurationsEnabled(state, bool) {
        state.configurationsEnabled = bool;
    },
    searchByOwnerNameEnabled(state, bool) {
        state.searchByOwnerNameEnabled = bool;
    },
    pluginsEnabled(state, bool) {
        state.pluginsEnabled = bool;
    },
    loginEnabled(state, bool) {
        state.loginEnabled = bool;
    },
    apiLoginEnabled(state, bool) {
        state.apiLoginEnabled = bool;
    },
    legacyLoginEnabled(state, bool) {
        state.legacyLoginEnabled = bool;
    },
    shareEnabled(state, bool) {
        state.shareEnabled = bool;
    },
    shareLink(state, bool) {
        state.shareLink = bool;
    },
    ownedByMe(state, bool) {
        state.ownedByMe = bool;
    }
};

const actions = {

};

const getters = {
    legacyLoginEnabled: function(state) {
        return state.legacyLoginEnabled;
    },
    apiLoginEnabled: function(state) {
        return state.apiLoginEnabled;
    },
    ownedByMe: function(state) {
        return state.ownedByMe;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};