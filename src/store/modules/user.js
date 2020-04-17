import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const state = {
    loggedOnPerson: {}
};
const mutations = {
    loggedOnPerson(state, personObj) {
        state.loggedOnPerson = personObj;
    }
};
const actions = {

};
const getters = {
    loggedOnPerson: function(state) {
        return state.loggedOnPerson;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};