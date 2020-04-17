import Vue from 'vue';
import Vuex from 'vuex';
import lode from './../lode/store.js';
import editor from './editor.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        lode,
        editor
    }
});
