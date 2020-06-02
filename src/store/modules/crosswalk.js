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
    relevantExistingAlignmentsMapLastUpdate: null,
    alignedCompetenciesList: [],
    workingAlignmentsMap: {
        source: '',
        targets: [],
        initialTargets: [],
        removedTargets: [],
        changed: false,
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
    relevantExistingAlignmentsMapLastUpdate(state, f) {
        state.relevantExistingAlignmentsMapLastUpdate = f;
    },
    alignedCompetenciesList(state, f) {
        state.alignedCompetenciesList = f;
    },
    step(state, val) {
        state.step = val;
    },
    workingAlignmentsSource(state, c) {
        state.workingAlignmentsMap.source = c;
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
    populateAlignedCompetenciesList(state) {
        if (state.relevantExistingAlignmentsMap) {
            let alignedCompetencies = [];
            let sourceComps = Object.keys(state.relevantExistingAlignmentsMap);
            for (let sc of sourceComps) {
                alignedCompetencies.push(sc);
                let alignTypes = Object.keys(state.relevantExistingAlignmentsMap[sc]);
                for (let scAt of alignTypes) {
                    let targetIds = Object.keys(state.relevantExistingAlignmentsMap[sc][scAt]);
                    for (let ti of targetIds) {
                        alignedCompetencies.push(ti);
                    }
                }
            }
            state.alignedCompetenciesList = alignedCompetencies;
        }
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
        state.workingAlignmentsMap.changed = false;
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
        state.workingAlignmentsMap.changed = false;
        state.workingAlignmentsMap.type = '';
        state.sourceState = 'ready';
        state.targetState = 'ready';
        state.alignmentsToSave = [];
        state.alignmentsToDelete = [];
    },
    resetCrosswalk(state) {
        state.step = 0;
        state.workingAlignmentsMap.source = '';
        state.workingAlignmentsMap.targets = [];
        state.workingAlignmentsMap.initialTargets = [];
        state.workingAlignmentsMap.removedTargets = [];
        state.workingAlignmentsMap.changed = false;
        state.workingAlignmentsMap.type = '';
        state.sourceState = 'ready';
        state.targetState = 'ready';
        state.alignmentsToSave = [];
        state.alignmentsToDelete = [];
    },
    resetWorkingAlignmentsMap(state) {
        state.sourceState = 'ready';
        state.targetState = 'ready';
        state.workingAlignmentsMap = {
            source: '',
            targets: [],
            initialTargets: [],
            removedTargets: [],
            changed: false,
            type: ''
        };
    },
    addWorkingAlignmentsTarget(state, id) {
        let remTargets = state.workingAlignmentsMap.removedTargets;
        let filteredRemovedTargets = remTargets.filter(remTargets => remTargets !== id);
        state.workingAlignmentsMap.removedTargets = filteredRemovedTargets;
        state.workingAlignmentsMap.targets.push(id);
        if (state.workingAlignmentsMap.removedTargets.length > 0) state.workingAlignmentsMap.changed = true;
        else {
            let shouldSetToChanged = false;
            for (let t of state.workingAlignmentsMap.targets) {
                if (!state.workingAlignmentsMap.initialTargets.includes(t)) {
                    shouldSetToChanged = true;
                    break;
                }
            }
            if (shouldSetToChanged) state.workingAlignmentsMap.changed = true;
            else state.workingAlignmentsMap.changed = false;
        }
    },
    removeWorkingAlignmentsTarget(state, id) {
        let targets = state.workingAlignmentsMap.targets;
        let filtered = targets.filter(target => target !== id);
        state.workingAlignmentsMap.targets = filtered;
        if (state.workingAlignmentsMap.initialTargets.includes(id)) state.workingAlignmentsMap.removedTargets.push(id);
        if (state.workingAlignmentsMap.removedTargets.length > 0) state.workingAlignmentsMap.changed = true;
        else {
            let shouldSetToChanged = false;
            for (let t of state.workingAlignmentsMap.targets) {
                if (!state.workingAlignmentsMap.initialTargets.includes(t)) {
                    shouldSetToChanged = true;
                    break;
                }
            }
            if (shouldSetToChanged) state.workingAlignmentsMap.changed = true;
            else state.workingAlignmentsMap.changed = false;
        }
    },
    removeAlignmentFromRelevantAlignmentsMap(state, alignProps) {
        if (state.relevantExistingAlignmentsMap[alignProps.source]) {
            if (state.relevantExistingAlignmentsMap[alignProps.source][alignProps.type]) {
                if (state.relevantExistingAlignmentsMap[alignProps.source][alignProps.type][alignProps.target]) {
                    let ream = state.relevantExistingAlignmentsMap;
                    delete ream[alignProps.source][alignProps.type][alignProps.target];
                    state.relevantExistingAlignmentsMap = ream;
                }
            }
        }
    },
    addAlignmentToRelevantAlignmentsMap(state, ecaObj) {
        let ream = state.relevantExistingAlignmentsMap;
        if (!ream[ecaObj.source]) ream[ecaObj.source] = {};
        if (!ream[ecaObj.source][ecaObj.relationType]) ream[ecaObj.source][ecaObj.relationType] = {};
        if (!ream[ecaObj.source][ecaObj.relationType][ecaObj.target]) ream[ecaObj.source][ecaObj.relationType][ecaObj.target] = ecaObj;
        state.relevantExistingAlignmentsMap = ream;
    },
    removeAlignmentFromAlignmentsToSave(state, alignProps) {
        let newAts = [];
        for (let a of state.alignmentsToSave) {
            if (!(a.source === alignProps.source && a.target === alignProps.target && a.relationType === alignProps.type)) {
                newAts.push(a);
            }
        }
        state.alignmentsToSave = newAts;
    },
    removeAlignmentFromAlignmentsToDelete(state, alignProps) {
        let newAtd = [];
        for (let a of state.alignmentsToDelete) {
            if (!(a.source === alignProps.source && a.target === alignProps.target && a.relationType === alignProps.type)) {
                newAtd.push(a);
            }
        }
        state.alignmentsToDelete = newAtd;
    },
    appendAlignmentsToDelete(state, alignment) {
        state.alignmentsToDelete.push(alignment);
    },
    appendAlignmentsToSave(state, alignment) {
        state.alignmentsToSave.push(alignment);
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
    relevantExistingAlignmentsMapLastUpdate: function(state) {
        return state.relevantExistingAlignmentsMapLastUpdate;
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
    },
    alignmentsToDelete(state) {
        return state.alignmentsToDelete;
    },
    alignedCompetenciesList(state) {
        return state.alignedCompetenciesList;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};