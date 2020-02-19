import Vue from 'vue';
import Vuex from 'vuex';
import lode from './lode/store.js';

Vue.use(Vuex);

const editor = {
    state: {
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
        t3Profile: false
    },
    mutations: {
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
        }
    },
    actions: {

    }
};

export default new Vuex.Store({
    modules: {
        lode,
        editor
    }
});
