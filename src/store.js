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
        selectConceptRelation: null,
        selectCompetencyRelation: null,
        selectingCompetencies: false,
        private: false
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
