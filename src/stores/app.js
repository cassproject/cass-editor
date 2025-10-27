// This store is used to control app state for behavior
// such as displaying certain modals
// and transitions

const state = ()=>({
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
}); 
const actions = {
    openSideNav: function () {
        this.showSideNav = true;
        this.showRightAside = false;
    },
    closeSideNav: function () {
        this.showSideNav = false;
    },
    showRightAside: function (payload) {
        this.showRightAside = true;
        this.rightAsideContent = payload;
        // this.showSideNav = false;
    },
    closeRightAside: function () {
        this.showRightAside = false;
        this.rightAsideContent = '';
        this.rightAsideObject = null;
    },
    setRightAsideObject: async function (payload) {
        if (payload.encryptedType) {
            let type = "Ec" + payload.encryptedType;
            let obj = new window[type]();
            obj.copyFrom(await EcEncryptedValue.fromEncryptedValue(payload));
            this.rightAsideObject = obj;
        } else {
            this.rightAsideObject = payload;
        }
    },
    setShowModal: function (payload) {
        this.modal.showModal = true;
        this.modal.dynamicModalContent = payload;
    },
    closeModal: function () {
        this.modal.showModal = false;
        this.modal.dynamicModalContent = {};
    },
    setObjForShareModal: function (payload) {
        this.modal.objForShareModal = payload;
    },
    setDraggingEnabled: function (value) {
        this.framework.draggingEnabled = value;
    },
    setIsDragging: function (value) {
        this.framework.isDragging = value;
    },
    setDraggable: function (value) {
        this.framework.draggable = value;
    },
    setImportFiles: function (value) {
        this.import.files = value;
    },
    setCanViewComments: function (value) {
        this.canViewComments = value;
    },
    setCanAddComments: function (value) {
        this.canAddComments = value;
    },
    clearImportFiles: function () {
        this.import.files = [];
    },
    pluginLastUpdate: function (value) {
        this.pluginLastUpdate = value;
    },
    pluginToLaunch: function (value) {
        this.pluginToLaunch = value;
    },
    pluginToLaunchLastUpdate: function (value) {
        this.pluginToLaunchLastUpdate = value;
    },
    resetImport: function () {
        this.import = {
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
    setImportTransition: function (value) {
        this.import.transition = value;
    },
    setImportFileType: function (value) {
        this.import.fileType = value;
    },
    setImportType: function (value) {
        this.import.type = value;
    },
    setFirstImport: function (val) {
        this.import.firstImport = val;
    },
    addImportError: function (val) {
        this.import.errors.push(val);
    },
    clearImportErrors: function () {
        this.import.errors = [];
    },
    setImportStatus: function (val) {
        this.import.status = val;
    },
    setImportAllowCancel: function (val) {
        this.allowCancel = val;
    },
    setImportFeedback: function (val) {
        this.import.feedback = val;
    },
    setImportDuplicates: function (val) {
        this.import.duplicates = val;
    },
    setImportSkip: function (val) {
        this.import.skip = val;
    },
    setImportFramework: function (val) {
        this.import.framework = val;
    },
    setImportFrameworkName: function (val) {
        this.import.frameworkName = val;
    },
    setImportFrameworkNameColumn: function (val) {
        this.import.frameworkNameColumn = val;
    },
    setImportFrameworkScopeColumn: function (val) {
        this.import.frameworkScopeColumn = val;
    },
    setImportFrameworkIdColumn: function (val) {
        this.import.frameworkIdColumn = val;
    },
    setImportFrameworkDescription: function (val) {
        this.import.frameworkDescription = val;
    },
    setImportText: function (val) {
        this.import.importText = val;
    },
    setImportServerUrl: function (val) {
        this.import.serverUrl = val;
    },
    setImportUrl: function (val) {
        this.import.url = val;
    },
    setImportNameColumn: function (val) {
        this.import.importCsv.nameColumn = val;
    },
    setImportDescriptionColumn: function (val) {
        this.import.importCsv.descriptionColumn = val;
    },
    setImportScopeColumn: function (val) {
        this.import.importCsv.scopeColumn = val;
    },
    setImportSourceColumn: function (val) {
        this.import.importCsv.sourceColumn = val;
    },
    setImportTargetColumn: function (val) {
        this.import.importCsv.targetColumn = val;
    },
    setImportRelationColumn: function (val) {
        this.import.importCsv.relationColumn = val;
    },
    setImportIdColumn: function (val) {
        this.import.importCsv.idColumn = val;
    },
    setCsvColumns: function (val) {
        this.import.csvColumns = val;
    },
    setCsvRelationColumns: function (val) {
        this.import.csvRelationColumns = val;
    },
    setCsvRelationFile: function (val) {
        this.import.csvRelationFile = val;
    },
    setImportModalParams: function (val) {
        this.import.importModalParams = val;
    },
    setSearchTerm: function (value) {
        this.frameworks.searchTerm = value;
    },
    setApplySearchTo: function (value) {
        this.frameworks.applySearchTo = value;
    },
    setRefreshSearch: function (value) {
        this.frameworks.refreshSearch = value;
    },
    setSortResults: function (value) {
        this.frameworks.sortResults = value;
    },
    setQuickFilters: function (value) {
        this.frameworks.quickFilters = value;
    },
    setSingleQuickFilter: function (value) {
        let i = this.frameworks.quickFilters.findIndex((filter) => filter.id === value.id);
        if (i >= 0) {
            this.frameworks.quickFilters[i].checked = value.checked;
        } else {
            this.frameworks.quickFilters.push(value);
        }
    },
    clearSearchFilters: function () {
        let quickFilters = this.frameworks.quickFilters;
        let sortResults = this.frameworks.sortResults;
        let applySearchTo = this.frameworks.applySearchTo;

        for (let i = 0; i < quickFilters.length; i++) {
            quickFilters[i].checked = false;
        }
        for (let i = 0; i < sortResults.length; i++) {
            sortResults[i].checked = false;
        }
        for (let i = 0; i < applySearchTo.length; i++) {
            applySearchTo[i].checked = false;
        }
        this.frameworks.quickFilters = quickFilters;
        this.frameworks.sortResults = sortResults;
        this.frameworks.applySearchTo = applySearchTo;
    },
    selectDirectory: function (value) {
        this.directories.selectedDirectory = value;
    },
    setDirectoryList: function (list) {
        this.directories.directoryList = list;
    },
    setSearchingInDirectory: function (bool) {
        this.directories.searchingInDirectory = bool;
    },
    setEditDirectory: function (bool) {
        this.directories.editDirectory = bool;
    },
    setSearchFrameworksInCompetencySearch: function (bool) {
        this.frameworks.searchFrameworksInCompetencySearch = bool;
    },
    setBanner: function (payload) {
        if (payload.message) {
            this.banner.message = payload.message;
        }
        if (payload.color) {
            this.banner.color = payload.color;
        }
        if (payload.background) {
            this.banner.background = payload.background;
        }
    },
    setMotd: function (payload) {
        if (payload.message) {
            this.motd.message = payload.message;
        }
        if (payload.title) {
            this.motd.title = payload.title;
        }
    },
    setCuratedPlugins: function (payload) {
        this.curatedPlugins = payload;
    },
    clearImport: function () {
        this.importFramework(null);
        this.clearImportFiles();
        this.clearImportErrors();
        this.setImportTransition('upload');
        this.setImportStatus('');
        this.setImportAllowCancel(false);
        this.setImportFeedback('');
        this.setImportFileType('');
        this.setImportDuplicates([]);
        this.setImportSkip([]);
    },
    refreshDirectories: function () {
        let directories = [];
        let directoryIds = [];
        let paramObj = { size: 10000 };
        EcDirectory.search(window.repo, "", (dirs) => {
            for (let i = 0; i < dirs.length; i++) {
                if (dirs[i].canEditAny(EcIdentityManager.default.getMyPks()) && !EcArray.has(directoryIds, dirs[i].id)) {
                    directories.push(dirs[i]);
                    directoryIds.push(dirs[i].id);
                }
            }
            this.setDirectoryList(directories);
        }, console.error, paramObj);
    }
};
const getters = {
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
    }
};

import { defineStore } from 'pinia';

export default defineStore('app',{
    state,
    actions,
    getters
});