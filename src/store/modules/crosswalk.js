import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const state = {
    step: 0,
    frameworkSource: null,
    frameworkSourceRelationships: null,
    frameworkTarget: null,
    frameworkTargetRelationships: null,
    relevantExistingAlignmentsMap: null,
    workingAlignmentsMap: {
        source: '',
        targets: [],
        initialTargets: [],
        removedTargets: [],
        type: ''
    },
    alignmentsToSave: [],
    alignmentsToDelete: [],
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
    frameworkSourceRelationships(state, f) {
        state.frameworkSourceRelationships = f;
    },
    frameworkTargetRelationships(state, f) {
        state.frameworkTargetRelationships = f;
    },
    relevantExistingAlignmentsMap(state, f) {
        state.relevantExistingAlignmentsMap = f;
    },
    step(state, val) {
        state.step = val;
    },
    workingAlignmentsSource(state, c) {
        state.workingAlignmentsMap.source = c;
    },
    addWorkingAlignmentsTarget(state, c) {
        state.workingAlignmentsMap.targets.push(c);
    },
    workingAlignmentsTargets(state, c) {
        state.workingAlignmentsMap.targets = c;
    },
    workingAlignmentsType(state, a) {
        state.workingAlignmentsMap.type = a;
    },
    sourceState(state, s) {
        state.sourceState = s;
    },
    targetState(state, t) {
        state.targetState = t;
    },
    populateWorkingAlignmentMap(state) {
        if (state.relevantExistingAlignmentsMap[state.workingAlignmentsMap.source] &&
            state.relevantExistingAlignmentsMap[state.workingAlignmentsMap.source][state.workingAlignmentsMap.type]) {
            let sourceTypeAlignMap = state.relevantExistingAlignmentsMap[state.workingAlignmentsMap.source][state.workingAlignmentsMap.type];
            let targetIds = Object.keys(sourceTypeAlignMap);
            for (let ti of targetIds) {
                state.workingAlignmentsMap.targets.push(ti);
                state.workingAlignmentsMap.initialTargets.push(ti);
            }
        }
    },
    resetFrameworkSourceRelationships(state) {
        state.frameworkSourceRelationships = null;
        state.relevantExistingAlignmentsMap = null;
    },
    resetFrameworkTargetRelationships(state) {
        state.frameworkTargetRelationships = null;
        state.relevantExistingAlignmentsMap = null;
    },
    resetCrosswalkFrameworks(state) {
        state.frameworkSource = null;
        state.frameworkTarget = null;
        state.frameworkSourceRelationships = null;
        state.frameworkTargetRelationships = null;
        state.relevantExistingAlignmentsMap = null;
    },
    resetCrosswalkAlignmentsAndState(state) {
        state.workingAlignmentsMap.source = '';
        state.workingAlignmentsMap.targets = [];
        state.workingAlignmentsMap.initialTargets = [];
        state.workingAlignmentsMap.removedTargets = [];
        state.workingAlignmentsMap.type = '';
        state.sourceState = 'ready';
        state.targetState = 'ready';
        state.alignmentsToSave = [];
    },
    resetCrosswalk(state) {
        state.step = 0;
        state.workingAlignmentsMap.source = '';
        state.workingAlignmentsMap.targets = [];
        state.workingAlignmentsMap.initialTargets = [];
        state.workingAlignmentsMap.removedTargets = [];
        state.workingAlignmentsMap.type = '';
        state.sourceState = 'ready';
        state.targetState = 'ready';
        state.alignmentsToSave = [];
    },
    resetWorkingAlignmentsMap(state) {
        state.sourceState = 'ready';
        state.targetState = 'ready';
        state.workingAlignmentsMap = {
            source: '',
            targets: [],
            initialTargets: [],
            removedTargets: [],
            type: ''
        };
    },
    removeWorkingAlignmentsTarget(state, id) {
        let targets = state.workingAlignmentsMap.targets;
        let filtered = targets.filter(target => target !== id);
        state.workingAlignmentsMap.targets = filtered;
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
    frameworkSourceRelationships: function(state) {
        return state.frameworkSourceRelationships;
    },
    frameworkTargetRelationships: function(state) {
        return state.frameworkTargetRelationships;
    },
    relevantExistingAlignmentsMap: function(state) {
        return state.relevantExistingAlignmentsMap;
    },
    workingAlignmentsSource(state) {
        return state.workingAlignmentsMap.source;
    },
    workingAlignmentsTargets(state) {
        return state.workingAlignmentsMap.targets;
    },
    workingAlignmentsType(state, a) {
        return state.workingAlignmentsMap.type;
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