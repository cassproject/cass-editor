import Vue from 'vue';
import Vuex from 'vuex';
import lode from './lode/store.js';

Vue.use(Vuex);

const editor = {
    state: {
        selectedCompetency: null,
        defaultLanguage: null
    },
    mutations: {
        selectedCompetency(state, comp) {
            state.selectedCompetency = comp;
        },
        defaultLanguage(state, lang) {
            state.defaultLanguage = lang;
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
