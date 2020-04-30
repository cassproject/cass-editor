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
    newCompetency: null,
    t3Profile: false,
    changedObject: null,
    configuration: null,
    commonPathIframe: '',
    iframeCompetencyPathInterframework: '',
    iframeConceptPath: '',
    addCommentAboutId: '',
    frameworkCommentList: [],
    frameworkCommentPersonList: []
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
    },
    commonPathIframe(state, val) {
        state.commonPathIframe = val;
    },
    iframeCompetencyPathInterframework(state, val) {
        state.iframeCompetencyPathInterframework = val;
    },
    iframeConceptPath(state, val) {
        state.iframeConceptPath = val;
    },
    setAddCommentAboutId(state, val) {
        state.addCommentAboutId = val;
    },
    clearFrameworkCommentData(state) {
        state.frameworkCommentList = [];
        state.frameworkCommentPersonList = [];
    },
    setFrameworkCommentList(state, val) {
        state.frameworkCommentList = val;
    },
    setFrameworkCommentPersonList(state, val) {
        state.frameworkCommentPersonList = val;
    }
};
const actions = {

};
const getters = {
    framework: function(state) {
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
    newCompetency: function(state) {
        return state.newCompetency;
    },
    t3Profile: function(state) {
        return state.t3Profile;
    },
    changedObject: function(state) {
        return state.changedObject;
    },
    configuration: function(state) {
        return state.configuration;
    },
    addCommentAboutId: function(state) {
        return state.addCommentAboutId;
    },
    frameworkCommentList: function(state) {
        return state.frameworkCommentList;
    },
    frameworkCommentPersonList: function(state) {
        return state.frameworkCommentPersonList;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};