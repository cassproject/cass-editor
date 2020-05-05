import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const state = {
    step: 0,
    frameworkA: null,
    framewworkB: null

};
const mutations = {
    frameworkA(state, f) {
        state.frameworkA = f;
    },
    frameworkB(state, f) {
        state.frameworkB = f;
    },
    step(state, val) {
        state.step = val;
    }
};
const actions = {

};
const getters = {
    frameworkA: function(state) {
        return state.frameworkA;
    },
    frameworkB: function(state) {
        return state.frameworkB;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};