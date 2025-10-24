const state = {
    cassApiLocation: ''
};

const mutations = {
    cassApiLocation(state, f) {
        state.cassApiLocation = f;
    }
};

const actions = {
};

const getters = {
    cassApiLocation: function (state) {
        return state.cassApiLocation;
    }
};

import { defineStore } from 'pinia';

export default defineStore('environment', {
    state,
    mutations,
    actions,
    getters
});