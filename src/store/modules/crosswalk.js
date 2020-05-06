import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const state = {
    step: 0,
    frameworkSource: null,
    frameworkTarget: null,
    competencySource: null,
    alignmentType: '',
    competencyTarget: []


};
const mutations = {
    frameworkSource(state, f) {
        state.frameworkSource = f;
    },
    frameworkTarget(state, f) {
        state.frameworkTarget = f;
    },
    step(state, val) {
        state.step = val;
    },
    competencySource(state, c) {
        state.competencySource = c;
    },
    competencyTarget(state, c) {
        state.competencyTarget.push(c);
    },
    alignmentType(state, a) {
        state.alignmentType = a;
    }
};
const actions = {

};
const getters = {
    frameworkSource: function(state) {
        return state.frameworkSource;
    },
    frameworkTarget: function(state) {
        return state.frameworkTarget;
    },
    competencySource(state, c) {
        return state.competencySource;
    },
    competencyTarget(state, c) {
        return state.competencyTarget;
    },
    alignmentType(state, a) {
        return state.alignmentType;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};