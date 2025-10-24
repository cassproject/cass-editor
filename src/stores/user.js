const state = {
    loggedOnPerson: {},
    repoInit: {
        ssoLogin: null,
        ssoLogout: null,
        ssoPublicKey: null
    },
    lastLogin: null
};
const mutations = {
    loggedOnPerson(state, personObj) {
        state.loggedOnPerson = personObj;
        if (window.EcIdentityManager.default.ids.length > 0) {
            state.lastLogin = window.EcIdentityManager.default.ids[0].lastLogin;
        } else {
            state.lastLogin = null;
        }
    },
    repositorySsoOptions(state, repoInit) {
        state.repoInit.ssoLogin = repoInit.ssoLogin;
        state.repoInit.ssoLogout = repoInit.ssoLogout;
        state.repoInit.ssoPublicKey = repoInit.ssoPublicKey;
    }
};
const actions = {

};
const getters = {
    loggedOnPerson: function (state) {
        return state.loggedOnPerson;
    },
    repositorySsoOptions: function (state) {
        return state.repoInit;
    },
    lastLogin: function (state) {
        return state.lastLogin;
    }
};

import { defineStore } from 'pinia';

export default defineStore('user', {
    state,
    mutations,
    actions,
    getters
});