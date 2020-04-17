import Vue from 'vue';
import Vuex from 'vuex';
import {stat} from 'fs';
Vue.use(Vuex);


const state = {
    framework: null,
    organization: null,
    selectedCompetency: null,
    defaultLanguage: null,
    webSocketBackoff: 100,
    selectCompetencyRelation: null,
    selectingCompetencies: false,
    private: false,
    commonPathIframe: null,
    iframeCompetencyPathInterframework: null,
    iframeCompetencyPathIntraframework: null,
    iframeConceptPath: null,
    newCompetency: null,
    t3Profile: false,
    changedObject: null,
    configuration: null
};
const mutations = {
    framework(state, f) {
        state.framework = f;
    },
    organization(state, f) {
        state.organization = f;
    },
    selectedCompetency(state, comp) {
        state.selectedCompetency = comp;
    },
    defaultLanguage(state, lang) {
        state.defaultLanguage = lang;
    },
    webSocketBackoffIncrease(state) {
        state.webSocketBackoff *= 2;
    },
    private(state, bool) {
        state.private = bool;
    },
    selectCompetencyRelation(state, r) {
        state.selectCompetencyRelation = r;
    },
    selectingCompetencies(state, bool) {
        state.selectingCompetencies = bool;
    },
    commonPathIframe(state, path) {
        state.commonPathIframe = path;
    },
    iframeCompetencyPathInterframework(state, path) {
        state.iframeCompetencyPathInterframework = path;
    },
    iframeCompetencyPathIntraframework(state, path) {
        state.iframeCompetencyPathIntraframework = path;
    },
    iframeConceptPath(state, path) {
        state.iframeConceptPath = path;
    },
    newCompetency(state, id) {
        state.newCompetency = id;
    },
    t3Profile(state, bool) {
        state.t3Profile = bool;
    },
    changedObject(state, id) {
        state.changedObject = id;
    },
    configuration(state, config) {
        state.configuration = config;
    }
};
const actions = {

};
const getters = {
    framework: function(sate) {
        return state.framework;
    },
    organization: function(state) {
        return state.organization;
    },
    selectedCompetency: function(state) {
        return state.selectedCompetency;
    },
    defaultLanguage: function(state) {
        return state.defaultLanguage;
    },
    webSocketBackoff: function(state) {
        return state.webSocketBackoff;
    },
    selectCompetencyRelation: function(state) {
        return state.selectCompetencyRelation;
    },
    selectingCompetencies: function(state) {
        return state.selectingCompetencies;
    },
    private: function(state) {
        return state.private;
    },
    commonPathIframe: function(state) {
        return state.commonPathIframe;
    },
    iframeCompetencyPathInterframework: function(state) {
        return state.iframeCompetencyPathInterframework;
    },
    iframeCompetencyPathIntraframework: function(state) {
        return state.iframeCompetencyPathIntraframework;
    },
    iframeConceptPath: function(state) {
        return state.iframeConceptPath;
    },
    newCompetency: function(state) {
        return state.newCompetency;
    },
    t3Profile: function(staet) {
        return state.t3Profile;
    },
    changedObject: function(state) {
        return state.changedObject;
    },
    configuration: function(state) {
        return state.configuration;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};