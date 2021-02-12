import Vue from 'vue';
import Vuex from 'vuex';
import lode from './../lode/lode.js';
import editor from './modules/editor.js';
import app from './modules/app.js';
import user from './modules/user.js';
import crosswalk from './modules/crosswalk.js';
import environment from './modules/environment.js';
import featuresEnabled from './modules/featuresEnabled.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        lode,
        editor,
        app,
        user,
        crosswalk,
        environment,
        featuresEnabled
    }
});
