import Vue from 'vue';
import Vuex from 'vuex';
import lode from './lode/store.js';

Vue.use(Vuex);

const editor = {
    state: {
        framework: null,
        selectedCompetency: null,
        defaultLanguage: null,
        webSocketBackoff: 100,
        selectConceptRelation: null,
        selectCompetencyRelation: null,
        selectingCompetencies: false
    },
    mutations: {
        framework(state, f) {
            state.framework = f;
        },
        selectedCompetency(state, comp) {
            state.selectedCompetency = comp;
        },
        defaultLanguage(state, lang) {
            state.defaultLanguage = lang;
        },
        webSocketBackoffIncrease(state) {
            state.webSocketBackoff *= 2;
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
