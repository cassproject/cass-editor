// This store is used to control app state for behavior
// such as displaying certain modals
// and transitions

const state = {
    sideNavEnabled: true,
    showSideNav: false,
    showRightAside: false,
    rightAsideContent: '',
    framework: {
        showToolBar: true,
        commentsEnabled: true,
        versionsEnabled: true,
        draggingEnabled: false,
        isDragging: false,
        draggable: {}
    },
    configuration: {
        contentSection: ''
    },
    frameworks: {
        searchTerm: '',
        quickFilters: [],
        applySearchTo: [],
        sortResults: []
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
        state.showRightAside = false;
    },
    closeSideNav: function() {
        state.showSideNav = false;
    },
    showRightAside: function(state, payload) {
        state.showRightAside = true;
        state.rightAsideContent = payload;
        state.showSideNav = false;
    },
    closeRightAside: function(state) {
        state.showRightAside = false;
        state.rightAsideContent = '';
    },
    showModal: function(state, payload) {
        state.modal.showModal = true;
        state.modal.dynamicModalContent = payload;
    },
    closeModal: function(state) {
        state.modal.showModal = false;
        state.modal.dynamicModalContent = {};
    },
    draggingEnabled: function(state, value) {
        state.framework.draggingEnabled = value;
    },
    isDragging: function(state, value) {
        state.framework.isDragging = value;
    },
    draggable: function(state, value) {
        state.framework.draggable = value;
    },
    searchTerm: function(state, value) {
        state.frameworks.searchTerm = value;
    },
    applySearchTo: function(state, value) {
        state.frameworks.applySearchTo = value;
    },
    sortResults: function(state, value) {
        state.frameworks.sortResults = value;
    },
    quickFilters: function(state, value) {
        state.frameworks.quickFilters = value;
    },
    clearSearchFilters: function(state) {
        let quickFilters = state.frameworks.quickFilters;
        let sortResults = state.frameworks.sortResults;
        let applySearchTo = state.frameworks.applySearchTo;

        for (let i = 0; i < quickFilters.length; i++) {
            quickFilters[i].checked = false;
        }
        for (let i = 0; i < sortResults.length; i++) {
            sortResults[i].checked = false;
        }
        for (let i = 0; i < applySearchTo.length; i++) {
            applySearchTo[i].checked = false;
        }
        state.frameworks.quickFilters = quickFilters;
        state.frameworks.sortResults = sortResults;
        state.frameworks.applySearchTo = applySearchTo;
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
        return state.showRightAside;
    },
    rightAsideContent: state => {
        return state.rightAsideContent;
    },
    framework: state => {
        return state.framework;
    },
    showModal: state => {
        return state.modal.showModal;
    },
    dynamicModalContent: state => {
        return state.modal.dynamicModalContent;
    },
    draggingEnabled: state => {
        return state.modal.draggingEnabled;
    },
    isDragging: state => {
        return state.modal.isDragging;
    },
    draggable: state => {
        return state.framework.draggable;
    },
    searchTerm: state => {
        return state.frameworks.searchTerm;
    },
    sortResults: state => {
        return state.frameworks.sortResults;
    },
    quickFilters: state => {
        return state.frameworks.quickFilters;
    },
    applySearchTo: state => {
        return state.frameworks.applySearchTo;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};