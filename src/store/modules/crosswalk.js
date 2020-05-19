import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const state = {
    step: 0,
    frameworkSource: null,
    frameworkTarget: null,
    tempAlignment: {
        source: {},
        targets: [],
        type: ''
    },
    tempAlignments: [],
    sourceState: 'ready',
    targetState: 'ready'


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
        state.tempAlignment.source = c;
    },
    addCompetencyTarget(state, c) {
        state.tempAlignment.targets.push(c);
    },
    competencyTargets(state, c) {
        state.tempAlignment.targets = c;
    },
    alignmentType(state, a) {
        state.tempAlignment.type = a;
    },
    sourceState(state, s) {
        state.sourceState = s;
    },
    targetState(state, t) {
        state.targetState = t;
    },
    resetCrosswalk(state) {
        state.step = 0;
        state.tempAlignment.source = {};
        state.tempAlignment.targets = [];
        state.tempAlignment.type = '';
        state.sourceState = 'ready';
        state.targetState = 'ready';
        state.tempAlignments = [];
    },
    resetTempAlignment(state) {
        state.sourceState = 'ready';
        state.targetState = 'ready';
        state.tempAlignment = {
            source: {},
            targets: [],
            type: ''
        };
    },
    removeFromTargetsArray(state, id) {
        let targets = state.tempAlignment.targets;
        let filtered = targets.filter(target => target !== id);
        state.tempAlignment.targets = filtered;
    },
    addAlignmentToAlignmentsArray(state, alignment) {
        state.tempAlignments.push(alignment);
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
    competencySource(state) {
        return state.tempAlignment.source;
    },
    competencyTargets(state) {
        return state.tempAlignment.targets;
    },
    alignmentType(state, a) {
        return state.tempAlignment.type;
    },
    sourceState(state) {
        return state.sourceState;
    },
    targetState(state) {
        return state.targetState;
    },
    tempAlignments(state) {
        return state.tempAlignments;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};