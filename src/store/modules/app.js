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
        versionsEnabled: true,
        draggingEnabled: false,
        isDragging: false,
        draggable: {}
    },
    configuration: {
        contentSection: ''
    },
    modal: {
        framework: '',
        showModal: false,
        dynamicModalContent: {}
    },
    import: {
        files: [],
        transition: 'upload',
        processingStatus: '',
        importType: 'file', // pdf, server, text
        fileType: '',
        firstImport: Boolean,
        errors: [],
        feedback: ''
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
    importFiles: function(state, value) {
        state.import.files = value;
    },
    clearImportFiles: function(state) {
        state.import.files = [];
    },
    importTransition: function(state, value) {
        state.import.transition = value;
    },
    importFileType: function(state, value) {
        state.import.fileType = value;
    },
    firstImport: function(state, val) {
        state.import.firstImport = val;
    },
    addImportError: function(state, val) {
        state.import.errors.push(val);
    },
    clearImportErrors: function(state) {
        state.import.errors = [];
    },
    importProcessingStatus: function(state, val) {
        state.import.processingState = val;
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
    importFiles: state => {
        return state.import.files;
    },
    importTransition: state => {
        return state.import.transition;
    },
    importFileType: state => {
        return state.import.fileType;
    },
    firstImport: state => {
        return state.import.firstImport;
    },
    importErrors: state => {
        return state.import.errors;
    },
    importProcessingState: state => {
        return state.import.processingState;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};