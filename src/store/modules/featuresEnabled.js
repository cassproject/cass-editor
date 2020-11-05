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
    shareEnabled: true
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
    shareEnabled(state, bool) {
        state.shareEnabled = bool;
    }
};
const actions = {

};
const getters = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};