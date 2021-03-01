import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


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
    cassApiLocation: function(state) {
        return state.cassApiLocation;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};