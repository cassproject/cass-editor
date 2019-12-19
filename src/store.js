import Vue from 'vue';
import Vuex from 'vuex';
import lode from './lode/store.js';

Vue.use(Vuex);

const editorStore = {
    state: {

    },
    mutations: {

    },
    actions: {

    }
};

export default new Vuex.Store({
    modules: {
        lode,
        editorStore
    }
});
