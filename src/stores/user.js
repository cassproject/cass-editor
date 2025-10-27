const state = () => ({
    loggedOnPerson: {},
    repoInit: {
        ssoLogin: null,
        ssoLogout: null,
        ssoPublicKey: null
    },
    lastLogin: null
});
const actions = {
    setLoggedOnPerson(personObj) {
        this.loggedOnPerson = personObj;
        if (window.EcIdentityManager.default.ids.length > 0) {
            this.lastLogin = window.EcIdentityManager.default.ids[0].lastLogin;
        } else {
            this.lastLogin = null;
        }
    },
    setRepositorySsoOptions(repoInit) {
        this.repoInit.ssoLogin = repoInit.ssoLogin;
        this.repoInit.ssoLogout = repoInit.ssoLogout;
        this.repoInit.ssoPublicKey = repoInit.ssoPublicKey;
    }
};
const getters = {
    repositorySsoOptions: function (state) {
        return state.repoInit;
    }
};

import { defineStore } from 'pinia';

export default defineStore('user', {
    state,
    actions,
    getters
});