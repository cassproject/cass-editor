import Vue from 'vue';
import Vuex from 'vuex';
import lode from './../lode/lode.js';
import editor from './modules/editor.js';
import app from './modules/app.js';
import user from './modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        lode,
        editor,
        app,
        user
    }
});
