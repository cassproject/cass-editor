// This store is used to control app state for behavior
// such as displaying certain modals
// and transitions

const state = {
    sideNavEnabled: true,
    showSideNav: true,
    showRightAside: false,
    rightAsideContent: '',
    rightAsideObject: null,
    canViewComments: false,
    canAddComments: false,
    pluginLastUpdate: null,
    pluginToLaunch: null,
    pluginToLaunchLastUpdate: 0,
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
        sortResults: [],
        refreshSearch: false,
        searchFrameworksInCompetencySearch: false
    },
    modal: {
        framework: '',
        showModal: false,
        dynamicModalContent: {},
        objForShareModal: null
    },
    directories: {
        directoryList: [],
        selectedDirectory: null,
        searchingInDirectory: true,
        editDirectory: false
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
        duplicates: [],
        skip: [],
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
        importText: '',
        csvColumns: [],
        csvRelationColumns: [],
        csvRelationFile: null,
        importModalParams: null
    },
    allowCancel: false,
    banner: {
        message: '',
        color: '',
        background: ''
    },
    motd: {
        message: '',
        title: ''
    },
    curatedPlugins: [
        {
            "id": "vlrcTestPlugin3",
            "url": "https://raw.githubusercontent.com/cassproject/cass-vlrc/master/"
        }
    ]
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
        // state.showSideNav = false;
    },
    closeRightAside: function(state) {
        state.showRightAside = false;
        state.rightAsideContent = '';
        state.rightAsideObject = null;
    },
    rightAsideObject: async function(state, payload) {
        if (payload.encryptedType) {
            let type = "Ec" + payload.encryptedType;
            let obj = new window[type]();
            obj.copyFrom(await EcEncryptedValue.fromEncryptedValue(payload));
            state.rightAsideObject = obj;
        } else {
            state.rightAsideObject = payload;
        }
    },
    showModal: function(state, payload) {
        state.modal.showModal = true;
        state.modal.dynamicModalContent = payload;
    },
    closeModal: function(state) {
        state.modal.showModal = false;
        state.modal.dynamicModalContent = {};
    },
    objForShareModal: function(state, payload) {
        state.modal.objForShareModal = payload;
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
    pluginLastUpdate: function(state, value) {
        state.pluginLastUpdate = value;
    },
    pluginToLaunch: function(state, value) {
        state.pluginToLaunch = value;
    },
    pluginToLaunchLastUpdate: function(state, value) {
        state.pluginToLaunchLastUpdate = value;
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
            duplicates: [],
            skip: [],
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
            importText: '',
            csvColumns: [],
            csvRelationColumns: [],
            csvRelationFile: null,
            importModalParams: null
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
    importAllowCancel: function(state, val) {
        state.allowCancel = val;
    },
    importFeedback: function(state, val) {
        state.import.feedback = val;
    },
    importDuplicates: function(state, val) {
        state.import.duplicates = val;
    },
    importSkip: function(state, val) {
        state.import.skip = val;
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
    csvColumns: function(state, val) {
        state.import.csvColumns = val;
    },
    csvRelationColumns: function(state, val) {
        state.import.csvRelationColumns = val;
    },
    csvRelationFile: function(state, val) {
        state.import.csvRelationFile = val;
    },
    importModalParams: function(state, val) {
        state.import.importModalParams = val;
    },
    searchTerm: function(state, value) {
        state.frameworks.searchTerm = value;
    },
    applySearchTo: function(state, value) {
        state.frameworks.applySearchTo = value;
    },
    refreshSearch: function(state, value) {
        state.frameworks.refreshSearch = value;
    },
    sortResults: function(state, value) {
        state.frameworks.sortResults = value;
    },
    quickFilters: function(state, value) {
        state.frameworks.quickFilters = value;
    },
    singleQuickFilter: function(state, value) {
        let i = state.frameworks.quickFilters.findIndex((filter) => filter.id === value.id);
        if (i >= 0) {
            state.frameworks.quickFilters[i].checked = value.checked;
        } else {
            state.frameworks.quickFilters.push(value);
        }
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
    },
    selectDirectory: function(state, value) {
        state.directories.selectedDirectory = value;
    },
    directoryList: function(state, list) {
        state.directories.directoryList = list;
    },
    searchingInDirectory: function(state, bool) {
        state.directories.searchingInDirectory = bool;
    },
    editDirectory: function(state, bool) {
        state.directories.editDirectory = bool;
    },
    searchFrameworksInCompetencySearch: function(state, bool) {
        state.frameworks.searchFrameworksInCompetencySearch = bool;
    },
    setBanner: function(state, payload) {
        if (payload.message) {
            state.banner.message = payload.message;
        }
        if (payload.color) {
            state.banner.color = payload.color;
        }
        if (payload.background) {
            state.banner.background = payload.background;
        }
    },
    setMotd: function(state, payload) {
        if (payload.message) {
            state.motd.message = payload.message;
        }
        if (payload.title) {
            state.motd.title = payload.title;
        }
    },
    setCuratedPlugins: function(state, payload) {
        state.curatedPlugins = payload;
    }
};
const actions = {
    clearImport: function({commit}) {
        commit('importFramework', null);
        commit('clearImportFiles');
        commit('clearImportErrors');
        commit('importTransition', 'upload');
        commit('importStatus', '');
        commit('importAllowCancel', false);
        commit('importFeedback', '');
        commit('importFileType', '');
        commit('importDuplicates', []);
        commit('importSkip', []);
    },
    refreshDirectories: function({commit}) {
        let directories = [];
        let directoryIds = [];
        let paramObj = {size: 10000};
        EcDirectory.search(window.repo, "", function(dirs) {
            for (let i = 0; i < dirs.length; i++) {
                if (dirs[i].canEditAny(EcIdentityManager.default.getMyPks()) && !EcArray.has(directoryIds, dirs[i].id)) {
                    directories.push(dirs[i]);
                    directoryIds.push(dirs[i].id);
                }
            }
            commit('directoryList', directories);
        }, appError, paramObj);
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
    rightAsideObject: state => {
        return state.rightAsideObject;
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
    objForShareModal: state => {
        return state.modal.objForShareModal;
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
    importAllowCancel: state => {
        return state.allowCancel;
    },
    importFeedback: state => {
        return state.import.feedback;
    },
    importDuplicates: state => {
        return state.import.duplicates;
    },
    importSkip: state => {
        return state.import.skip;
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
    importModalParams: state => {
        return state.import.importModalParams;
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
    filterByOwnedByMe: (state) => {
        let filter = state.frameworks.quickFilters.find((filter) => filter.id === "ownedByMe");
        if (!filter) {
            return false;
        }
        if (Array.isArray(filter) && filter.length > 0) {
            return filter[0].checked;
        } else {
            return filter.checked;
        }
    },
    filterByNotOwnedByMe: (state) => {
        let filter = state.frameworks.quickFilters.find((filter) => filter.id === "notOwnedByMe");
        if (!filter) {
            return false;
        }
        if (Array.isArray(filter) && filter.length > 0) {
            return filter[0].checked;
        } else {
            return filter.checked;
        }
    },
    filterByConfigMatchDefault: (state) => {
        let filter = state.frameworks.quickFilters.find((filter) => filter.id === "configMatchDefault");
        if (!filter) {
            return false;
        }
        if (Array.isArray(filter) && filter.length > 0) {
            return filter[0].checked;
        } else {
            return filter.checked;
        }
    },
    applySearchTo: state => {
        return state.frameworks.applySearchTo;
    },
    refreshSearch: state => {
        return state.frameworks.refreshSearch;
    },
    csvColumns: state => {
        return state.import.csvColumns;
    },
    csvRelationColumns: state => {
        return state.import.csvRelationColumns;
    },
    csvRelationFile: state => {
        return state.import.csvRelationFile;
    },
    pluginLastUpdate: state => {
        return state.pluginLastUpdate;
    },
    pluginToLaunch: state => {
        return state.pluginToLaunch;
    },
    pluginToLaunchLastUpdate: state => {
        return state.pluginToLaunchLastUpdate;
    },
    selectedDirectory: state => {
        return state.directories.selectedDirectory;
    },
    directoryList: state => {
        return state.directories.directoryList;
    },
    searchingInDirectory: state => {
        return state.directories.searchingInDirectory;
    },
    editDirectory: state => {
        return state.directories.editDirectory;
    },
    searchFrameworksInCompetencySearch: state => {
        return state.frameworks.searchFrameworksInCompetencySearch;
    },
    bannerMessage: state => {
        return state.banner.message;
    },
    bannerColor: state => {
        return state.banner.color;
    },
    bannerBackground: state => {
        return state.banner.background;
    },
    motdTitle: state => {
        return state.motd.title;
    },
    motdMessage: state => {
        return state.motd.message;
    },
    curatedPlugins: state => {
        return state.curatedPlugins;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};