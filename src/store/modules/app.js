// This store is used to control app state for behavior
// such as displaying certain modals
// and transitions

const state = {
    sideNavEnabled: true,
    showSideNav: false,
    framework: {
        showRightAside: false,
        rightAsideContent: '',
        showToolBar: true,
        commentsEnabled: true,
        versionsEnabled: true
    },
    modal: {
        framework: '',
        showModal: false,
        dynamicModalContent: {}
    }
};
const mutations = {
    showSideNav: function() {
        state.showSideNav = true;
    },
    closeSideNav: function() {
        state.showSideNav = false;
    },
    showRightAside: function(state, payload) {
        state.framework.showRightAside = true;
        state.framework.rightAsideContent = payload;
    },
    closeRightAside: function(state, payload) {
        state.framework.showRightAside = false;
        state.framework.rightAsideContent = '';
    },
    showModal: function(state, payload) {
        state.modal.showModal = true;
        state.modal.dynamicModalContent = payload;
    },
    closeModal: function(state) {
        state.modal.showModal = false;
        state.modal.dynamicModalContent = {};
    }
};
const actions = {

};
const getters = {
    sideNavEnabled: state => {
        return state.sideNavEnabled;
    },
    showSideNav: state => {
        return state.showSideNav;
    },
    showRightAside: state => {
        return state.framework.showRightAside;
    },
    framework: state => {
        return state.framework;
    },
    showModal: state => {
        return state.modal.showModal;
    },
    dynamicModalContent: state => {
        return state.modal.dynamicModalContent;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};