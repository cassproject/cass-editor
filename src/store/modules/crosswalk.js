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
    alignmentsToSave: [],
    sourceState: 'ready',
    targetState: 'ready',
    targetNodesToHighlight: []
};

const mutations = {
    targetNodesToHighlight(state, f) {
        state.targetNodesToHighlight = f;
    },
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
    resetCrosswalkFrameworks(state) {
        state.frameworkSource = null;
        state.frameworkTarget = null;
    },
    resetCrosswalkAlignmentsAndState(state) {
        state.tempAlignment.source = {};
        state.tempAlignment.targets = [];
        state.tempAlignment.type = '';
        state.sourceState = 'ready';
        state.targetState = 'ready';
        state.alignmentsToSave = [];
    },
    resetCrosswalk(state) {
        state.step = 0;
        state.tempAlignment.source = {};
        state.tempAlignment.targets = [];
        state.tempAlignment.type = '';
        state.sourceState = 'ready';
        state.targetState = 'ready';
        state.alignmentsToSave = [];
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
    appendAlignmentsToSave(state, alignment) {
        if (alignment.targets && alignment.targets.length > 0) {
            for (let at of alignment.targets) {
                let newAlignmentToSave = {};
                newAlignmentToSave.source = alignment.source;
                newAlignmentToSave.target = at;
                newAlignmentToSave.type = alignment.type;
                state.alignmentsToSave.push(newAlignmentToSave);
            }
        }
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
    alignmentsToSave(state) {
        return state.alignmentsToSave;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};