const state = ()=>({
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
});

const actions = {
    setCrosswalkEnabled(bool) {
        this.crosswalkEnabled = bool;
    },
    setUserManagementEnabled(bool) {
        this.userManagementEnabled = bool;
    },
    setConfigurationsEnabled(bool) {
        this.configurationsEnabled = bool;
    },
    setSearchByOwnerNameEnabled(bool) {
        this.searchByOwnerNameEnabled = bool;
    },
    setPluginsEnabled(bool) {
        this.pluginsEnabled = bool;
    },
    setLoginEnabled(bool) {
        this.loginEnabled = bool;
    },
    setApiLoginEnabled(bool) {
        this.apiLoginEnabled = bool;
    },
    setLegacyLoginEnabled(bool) {
        this.legacyLoginEnabled = bool;
    },
    setShareEnabled(bool) {
        this.shareEnabled = bool;
    },
    setShareLink(bool) {
        this.shareLink = bool;
    },
    setOwnedByMe(bool) {
        this.ownedByMe = bool;
    }
};

const getters = {
};

import { defineStore } from 'pinia';
export default defineStore('featuresEnabled', { 
    state,
    actions,
    getters
});