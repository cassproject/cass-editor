import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const state = {
    loggedOnPerson: {},
    repoInit: {
        ssoLogin: null,
        ssoLogout: null
    }
};
const mutations = {
    loggedOnPerson(state, personObj) {
        state.loggedOnPerson = personObj;
    },
    repositorySsoOptions(state, repoInit) {
        state.repoInit.ssoLogin = repoInit.ssoLogin;
        state.repoInit.ssoLogout = repoInit.ssoLogout;
    }
};
const actions = {

};
const getters = {
    loggedOnPerson: function(state) {
        return state.loggedOnPerson;
    },
    repositorySsoOptions: function(state) {
        return state.repoInit;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};