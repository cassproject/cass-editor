const state = ()=>({
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
    targetNodesToHighlight: [],
    enabledRelationshipTypes: [],
    enabledRelationshipTypesLastUpdate: null
});

const actions = {
    setEnabledRelationshipTypesLastUpdate(f) {
        this.enabledRelationshipTypesLastUpdate = f;
    },
    setEnabledRelationshipTypes(f) {
        this.enabledRelationshipTypes = f;
    },
    setTargetNodesToHighlight(f) {
        this.targetNodesToHighlight = f;
    },
    setFrameworkSource(f) {
        this.frameworkSource = f;
    },
    setFrameworkTarget(f) {
        this.frameworkTarget = f;
    },
    setFrameworkSourceRelationships(f) {
        this.frameworkSourceRelationships = f;
    },
    setFrameworkTargetRelationships(f) {
        this.frameworkTargetRelationships = f;
    },
    setRelevantExistingAlignmentsMap(f) {
        this.relevantExistingAlignmentsMap = f;
    },
    setRelevantExistingAlignmentsMapLastUpdate(f) {
        this.relevantExistingAlignmentsMapLastUpdate = f;
    },
    setAlignedCompetenciesList(f) {
        this.alignedCompetenciesList = f;
    },
    setStep(val) {
        this.step = val;
    },
    setWorkingAlignmentsSource(c) {
        this.workingAlignmentsMap.source = c;
    },
    setWorkingAlignmentsTargets(c) {
        this.workingAlignmentsMap.targets = c;
    },
    setWorkingAlignmentsType(a) {
        this.workingAlignmentsMap.type = a;
    },
    setSourceState(s) {
        this.sourceState = s;
    },
    setTargetState(t) {
        this.targetState = t;
    },
    setAlignmentsToSave(t) {
        this.alignmentsToSave = t;
    },
    populateAlignedCompetenciesList() {
        if (this.relevantExistingAlignmentsMap) {
            let alignedCompetencies = [];
            let sourceComps = Object.keys(this.relevantExistingAlignmentsMap);
            for (let sc of sourceComps) {
                alignedCompetencies.push(sc);
                let alignTypes = Object.keys(this.relevantExistingAlignmentsMap[sc]);
                for (let scAt of alignTypes) {
                    let targetIds = Object.keys(this.relevantExistingAlignmentsMap[sc][scAt]);
                    for (let ti of targetIds) {
                        alignedCompetencies.push(ti);
                    }
                }
            }
            this.alignedCompetenciesList = alignedCompetencies;
        }
    },
    populateWorkingAlignmentMap() {
        if (this.relevantExistingAlignmentsMap[this.workingAlignmentsMap.source] &&
            this.relevantExistingAlignmentsMap[this.workingAlignmentsMap.source][this.workingAlignmentsMap.type]) {
            let sourceTypeAlignMap = this.relevantExistingAlignmentsMap[this.workingAlignmentsMap.source][this.workingAlignmentsMap.type];
            let targetIds = Object.keys(sourceTypeAlignMap);
            for (let ti of targetIds) {
                this.workingAlignmentsMap.targets.push(ti);
                this.workingAlignmentsMap.initialTargets.push(ti);
            }
        }
        this.workingAlignmentsMap.changed = false;
    },
    resetFrameworkSourceRelationships() {
        this.frameworkSourceRelationships = null;
        this.relevantExistingAlignmentsMap = null;
    },
    resetFrameworkTargetRelationships() {
        this.frameworkTargetRelationships = null;
        this.relevantExistingAlignmentsMap = null;
    },
    resetCrosswalkFrameworks() {
        this.frameworkSource = null;
        this.frameworkTarget = null;
        this.frameworkSourceRelationships = null;
        this.frameworkTargetRelationships = null;
        this.relevantExistingAlignmentsMap = null;
    },
    resetCrosswalkAlignmentsAndState() {
        this.workingAlignmentsMap.source = '';
        this.workingAlignmentsMap.targets = [];
        this.workingAlignmentsMap.initialTargets = [];
        this.workingAlignmentsMap.removedTargets = [];
        this.workingAlignmentsMap.changed = false;
        this.workingAlignmentsMap.type = '';
        this.sourceState = 'ready';
        this.targetState = 'ready';
        this.alignmentsToSave = [];
        this.alignmentsToDelete = [];
    },
    resetCrosswalk() {
        this.step = 0;
        this.workingAlignmentsMap.source = '';
        this.workingAlignmentsMap.targets = [];
        this.workingAlignmentsMap.initialTargets = [];
        this.workingAlignmentsMap.removedTargets = [];
        this.workingAlignmentsMap.changed = false;
        this.workingAlignmentsMap.type = '';
        this.sourceState = 'ready';
        this.targetState = 'ready';
        this.alignmentsToSave = [];
        this.alignmentsToDelete = [];
    },
    resetWorkingAlignmentsMap() {
        this.sourceState = 'ready';
        this.targetState = 'ready';
        this.workingAlignmentsMap = {
            source: '',
            targets: [],
            initialTargets: [],
            removedTargets: [],
            changed: false,
            type: ''
        };
    },
    addWorkingAlignmentsTarget(id) {
        let remTargets = this.workingAlignmentsMap.removedTargets;
        let filteredRemovedTargets = remTargets.filter(remTargets => remTargets !== id);
        this.workingAlignmentsMap.removedTargets = filteredRemovedTargets;
        this.workingAlignmentsMap.targets.push(id);
        if (this.workingAlignmentsMap.removedTargets.length > 0) this.workingAlignmentsMap.changed = true;
        else {
            let shouldSetToChanged = false;
            for (let t of this.workingAlignmentsMap.targets) {
                if (!this.workingAlignmentsMap.initialTargets.includes(t)) {
                    shouldSetToChanged = true;
                    break;
                }
            }
            if (shouldSetToChanged) this.workingAlignmentsMap.changed = true;
            else this.workingAlignmentsMap.changed = false;
        }
    },
    removeWorkingAlignmentsTarget(id) {
        let targets = this.workingAlignmentsMap.targets;
        let filtered = targets.filter(target => target !== id);
        this.workingAlignmentsMap.targets = filtered;
        if (this.workingAlignmentsMap.initialTargets.includes(id)) this.workingAlignmentsMap.removedTargets.push(id);
        if (this.workingAlignmentsMap.removedTargets.length > 0) this.workingAlignmentsMap.changed = true;
        else {
            let shouldSetToChanged = false;
            for (let t of this.workingAlignmentsMap.targets) {
                if (!this.workingAlignmentsMap.initialTargets.includes(t)) {
                    shouldSetToChanged = true;
                    break;
                }
            }
            if (shouldSetToChanged) this.workingAlignmentsMap.changed = true;
            else this.workingAlignmentsMap.changed = false;
        }
    },
    removeAlignmentFromRelevantAlignmentsMap(alignProps) {
        if (this.relevantExistingAlignmentsMap[alignProps.source]) {
            if (this.relevantExistingAlignmentsMap[alignProps.source][alignProps.type]) {
                if (this.relevantExistingAlignmentsMap[alignProps.source][alignProps.type][alignProps.target]) {
                    let ream = this.relevantExistingAlignmentsMap;
                    delete ream[alignProps.source][alignProps.type][alignProps.target];
                    this.relevantExistingAlignmentsMap = ream;
                }
            }
        }
    },
    addAlignmentToRelevantAlignmentsMap(ecaObj) {
        let ream = this.relevantExistingAlignmentsMap;
        if (!ream[ecaObj.source]) ream[ecaObj.source] = {};
        if (!ream[ecaObj.source][ecaObj.relationType]) ream[ecaObj.source][ecaObj.relationType] = {};
        if (!ream[ecaObj.source][ecaObj.relationType][ecaObj.target]) ream[ecaObj.source][ecaObj.relationType][ecaObj.target] = ecaObj;
        this.relevantExistingAlignmentsMap = ream;
    },
    removeAlignmentFromAlignmentsToSave(alignProps) {
        let newAts = [];
        for (let a of this.alignmentsToSave) {
            if (!(a.source === alignProps.source && a.target === alignProps.target && a.relationType === alignProps.type)) {
                newAts.push(a);
            }
        }
        this.alignmentsToSave = newAts;
    },
    removeAlignmentFromAlignmentsToDelete(alignProps) {
        let newAtd = [];
        for (let a of this.alignmentsToDelete) {
            if (!(a.source === alignProps.source && a.target === alignProps.target && a.relationType === alignProps.type)) {
                newAtd.push(a);
            }
        }
        this.alignmentsToDelete = newAtd;
    },
    setAppendAlignmentsToDelete(alignment) {
        this.alignmentsToDelete.push(alignment);
    },
    setAppendAlignmentsToSave(alignment) {
        this.alignmentsToSave.push(alignment);
    }
};
const getters = {
    workingAlignmentsSource(state) {
        return state.workingAlignmentsMap.source;
    },
    workingAlignmentsTargets(state) {
        return state.workingAlignmentsMap.targets;
    },
    workingAlignmentsType(state, a) {
        return state.workingAlignmentsMap.type;
    }
};

import { defineStore } from 'pinia';
export default defineStore('crosswalk',{ 
    state,
    actions,
    getters
});