// This store is used to control app state for behavior
// such as displaying certain modals
// and transitions

const state = {
    sideNavEnabled: true,
    showSideNav: false,
    showRightAside: false,
    rightAsideContent: '',
    canViewComments: false,
    canAddComments: false,
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
    },
    import: {
        files: [],
        transition: 'upload', // upload, process, detail, preview, light
        status: '', // success, failure, edit
        type: 'file', // pdf, server, text
        fileType: '',
        firstImport: Boolean,
        errors: [], // erorrs from the code or from the api
        feedback: '', // additional information
        framework: null,
        serverUrl: '',
        url: '',
        frameworkName: '',
        frameworkDescription: '',
        importCsv: {
            nameColumn: {},
            descriptionColumn: {},
            scopeColumn: {},
            idColumn: {},
            sourceColumn: {},
            relationColumn: {},
            targetColumn: {}
        },
        importText: ''
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
    importFiles: function(state, value) {
        state.import.files = value;
    },
    setCanViewComments: function(state, value) {
        state.canViewComments = value;
    },
    setCanAddComments: function(state, value) {
        state.canAddComments = value;
    },
    clearImportFiles: function(state) {
        state.import.files = [];
    },
    resetImport: function(state) {
        state.import = {
            files: [],
            transition: 'upload', // upload, process, detail, preview, light
            status: '', // success, failure, edit
            type: 'file', // pdf, server, text
            fileType: '',
            firstImport: Boolean,
            errors: [], // erorrs from the code or from the api
            feedback: '', // additional information
            framework: null,
            serverUrl: '',
            url: '',
            frameworkName: '',
            frameworkDescription: '',
            importCsv: {
                nameColumn: {},
                descriptionCcolumn: {},
                scopeColumn: {},
                idColumn: {},
                sourceColumn: {},
                relationColumn: {},
                targetColumn: {}
            },
            importText: ''
        };
    },
    importTransition: function(state, value) {
        state.import.transition = value;
    },
    importFileType: function(state, value) {
        state.import.fileType = value;
    },
    importType: function(state, value) {
        state.import.type = value;
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
    importStatus: function(state, val) {
        state.import.status = val;
    },
    importFeedback: function(state, val) {
        state.import.feedback = val;
    },
    importFramework: function(state, val) {
        state.import.framework = val;
    },
    importFrameworkName: function(state, val) {
        state.import.frameworkName = val;
    },
    importFrameworkNameColumn: function(state, val) {
        state.import.frameworkNameColumn = val;
    },
    importFrameworkScopeColumn: function(state, val) {
        state.import.frameworkScopeColumn = val;
    },
    importFrameworkIdColumn: function(state, val) {
        state.import.frameworkIdColumn = val;
    },
    importFrameworkDescription: function(state, val) {
        state.import.frameworkDescription = val;
    },
    importText: function(state, val) {
        state.import.importText = val;
    },
    importServerUrl: function(state, val) {
        state.import.serverUrl = val;
    },
    importUrl: function(state, val) {
        state.import.url = val;
    },
    importNameColumn: function(state, val) {
        state.import.importCsv.nameColumn = val;
    },
    importDescriptionColumn: function(state, val) {
        state.import.importCsv.descriptionColumn = val;
    },
    importScopeColumn: function(state, val) {
        state.import.importCsv.scopeColumn = val;
    },
    importSourceColumn: function(state, val) {
        state.import.importCsv.sourceColumn = val;
    },
    importTargetColumn: function(state, val) {
        state.import.importCsv.targetColumn = val;
    },
    importRelationColumn: function(state, val) {
        state.import.importCsv.relationColumn = val;
    },
    importIdColumn: function(state, val) {
        state.import.importCsv.idColumn = val;
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
    clearImport: function({commit}) {
        commit('importFramework', null);
        commit('clearImportFiles');
        commit('clearImportErrors');
        commit('importTransition', 'upload');
        commit('importStatus', '');
        commit('importFeedback', '');
        commit('importFileType', '');
    }
};
const getters = {
    canViewComments: state => {
        return state.canViewComments;
    },
    canAddComments: state => {
        return state.canAddComments;
    },
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
    importFiles: state => {
        return state.import.files;
    },
    importTransition: state => {
        return state.import.transition;
    },
    importFileType: state => {
        return state.import.fileType;
    },
    importType: state => {
        return state.import.type;
    },
    firstImport: state => {
        return state.import.firstImport;
    },
    importErrors: state => {
        return state.import.errors;
    },
    importStatus: state => {
        return state.import.status;
    },
    importFeedback: state => {
        return state.import.feedback;
    },
    importFramework: state => {
        return state.import.framework;
    },
    importFrameworkName: state => {
        return state.import.frameworkName;
    },
    importFrameworkNameColumn: state => {
        return state.import.frameworkNameColumn;
    },
    importFrameworkScopeColumn: state => {
        return state.import.frameworkScopeColumn;
    },
    importFrameworkIdColumn: state => {
        return state.import.frameworkIdColumn;
    },
    importFrameworkDescription: state => {
        return state.import.frameworkDescription;
    },
    importText: state => {
        return state.import.importText;
    },
    importServerUrl: state => {
        return state.import.serverUrl;
    },
    importUrl: state => {
        return state.import.url;
    },
    importNameColumn: state => {
        return state.import.importCsv.nameColumn;
    },
    importDescriptionColumn: state => {
        return state.import.importCsv.descriptionColumn;
    },
    importScopeColumn: state => {
        return state.import.importCsv.scopeColumn;
    },
    importIdColumn: state => {
        return state.import.importCsv.idColumn;
    },
    importSourceColumn: state => {
        return state.import.importCsv.sourceColumn;
    },
    importRelationColumn: state => {
        return state.import.importCsv.relationColumn;
    },
    importTargetColumn: state => {
        return state.import.importCsv.targetColumn;
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