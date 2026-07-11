// This store controls app state for behavior
// such as displaying certain modals
// and transitions

import {defineStore} from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
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
            errors: [], // errors from the code or from the api
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
    }),
    getters: {
        canViewCommentsGetter: (state) => state.canViewComments,
        canAddCommentsGetter: (state) => state.canAddComments,
        sideNavEnabledGetter: (state) => state.sideNavEnabled,
        showSideNavGetter: (state) => state.showSideNav,
        showRightAsideGetter: (state) => state.showRightAside,
        rightAsideContentGetter: (state) => state.rightAsideContent,
        rightAsideObjectGetter: (state) => state.rightAsideObject,
        frameworkGetter: (state) => state.framework,
        showModalGetter: (state) => state.modal.showModal,
        dynamicModalContent: (state) => state.modal.dynamicModalContent,
        objForShareModal: (state) => state.modal.objForShareModal,
        draggingEnabled: (state) => state.framework.draggingEnabled,
        isDragging: (state) => state.framework.isDragging,
        draggable: (state) => state.framework.draggable,
        importFiles: (state) => state.import.files,
        importTransition: (state) => state.import.transition,
        importFileType: (state) => state.import.fileType,
        importType: (state) => state.import.type,
        firstImport: (state) => state.import.firstImport,
        importErrors: (state) => state.import.errors,
        importStatus: (state) => state.import.status,
        importAllowCancel: (state) => state.allowCancel,
        importFeedback: (state) => state.import.feedback,
        importDuplicates: (state) => state.import.duplicates,
        importSkip: (state) => state.import.skip,
        importFramework: (state) => state.import.framework,
        importFrameworkName: (state) => state.import.frameworkName,
        importFrameworkNameColumn: (state) => state.import.frameworkNameColumn,
        importFrameworkScopeColumn: (state) => state.import.frameworkScopeColumn,
        importFrameworkIdColumn: (state) => state.import.frameworkIdColumn,
        importFrameworkDescription: (state) => state.import.frameworkDescription,
        importText: (state) => state.import.importText,
        importServerUrl: (state) => state.import.serverUrl,
        importUrl: (state) => state.import.url,
        importNameColumn: (state) => state.import.importCsv.nameColumn,
        importDescriptionColumn: (state) => state.import.importCsv.descriptionColumn,
        importScopeColumn: (state) => state.import.importCsv.scopeColumn,
        importIdColumn: (state) => state.import.importCsv.idColumn,
        importSourceColumn: (state) => state.import.importCsv.sourceColumn,
        importRelationColumn: (state) => state.import.importCsv.relationColumn,
        importTargetColumn: (state) => state.import.importCsv.targetColumn,
        importModalParams: (state) => state.import.importModalParams,
        searchTerm: (state) => state.frameworks.searchTerm,
        sortResults: (state) => state.frameworks.sortResults,
        quickFilters: (state) => state.frameworks.quickFilters,
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
        applySearchTo: (state) => state.frameworks.applySearchTo,
        refreshSearch: (state) => state.frameworks.refreshSearch,
        csvColumns: (state) => state.import.csvColumns,
        csvRelationColumns: (state) => state.import.csvRelationColumns,
        csvRelationFile: (state) => state.import.csvRelationFile,
        pluginLastUpdateGetter: (state) => state.pluginLastUpdate,
        pluginToLaunchGetter: (state) => state.pluginToLaunch,
        pluginToLaunchLastUpdateGetter: (state) => state.pluginToLaunchLastUpdate,
        selectedDirectory: (state) => state.directories.selectedDirectory,
        directoryList: (state) => state.directories.directoryList,
        searchingInDirectory: (state) => state.directories.searchingInDirectory,
        editDirectory: (state) => state.directories.editDirectory,
        searchFrameworksInCompetencySearch: (state) => state.frameworks.searchFrameworksInCompetencySearch,
        bannerMessage: (state) => state.banner.message,
        bannerColor: (state) => state.banner.color,
        bannerBackground: (state) => state.banner.background,
        motdTitle: (state) => state.motd.title,
        motdMessage: (state) => state.motd.message,
        curatedPluginsGetter: (state) => state.curatedPlugins
    },
    actions: {
        // --- Mutations converted to actions ---
        openSideNav() {
            this.showSideNav = true;
            this.showRightAside = false;
        },
        closeSideNav() {
            this.showSideNav = false;
        },
        openRightAside(payload) {
            this.showRightAside = true;
            this.rightAsideContent = payload;
        },
        closeRightAside() {
            this.showRightAside = false;
            this.rightAsideContent = '';
            this.rightAsideObject = null;
        },
        async setRightAsideObject(payload) {
            if (payload.encryptedType) {
                let type = "Ec" + payload.encryptedType;
                let obj = new window[type]();
                obj.copyFrom(await EcEncryptedValue.fromEncryptedValue(payload));
                this.rightAsideObject = obj;
            } else {
                this.rightAsideObject = payload;
            }
        },
        openModal(payload) {
            this.modal.showModal = true;
            this.modal.dynamicModalContent = payload;
        },
        closeModal() {
            this.modal.showModal = false;
            this.modal.dynamicModalContent = {};
        },
        setObjForShareModal(payload) {
            this.modal.objForShareModal = payload;
        },
        setDraggingEnabled(value) {
            this.framework.draggingEnabled = value;
        },
        setIsDragging(value) {
            this.framework.isDragging = value;
        },
        setDraggable(value) {
            this.framework.draggable = value;
        },
        setImportFiles(value) {
            this.import.files = value;
        },
        setCanViewComments(value) {
            this.canViewComments = value;
        },
        setCanAddComments(value) {
            this.canAddComments = value;
        },
        clearImportFiles() {
            this.import.files = [];
        },
        setPluginLastUpdate(value) {
            this.pluginLastUpdate = value;
        },
        setPluginToLaunch(value) {
            this.pluginToLaunch = value;
        },
        setPluginToLaunchLastUpdate(value) {
            this.pluginToLaunchLastUpdate = value;
        },
        resetImport() {
            this.import = {
                files: [],
                transition: 'upload',
                status: '',
                type: 'file',
                fileType: '',
                firstImport: Boolean,
                errors: [],
                feedback: '',
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
            };
        },
        setImportTransition(value) {
            this.import.transition = value;
        },
        setImportFileType(value) {
            this.import.fileType = value;
        },
        setImportType(value) {
            this.import.type = value;
        },
        setFirstImport(val) {
            this.import.firstImport = val;
        },
        addImportError(val) {
            this.import.errors.push(val);
        },
        clearImportErrors() {
            this.import.errors = [];
        },
        setImportStatus(val) {
            this.import.status = val;
        },
        setImportAllowCancel(val) {
            this.allowCancel = val;
        },
        setImportFeedback(val) {
            this.import.feedback = val;
        },
        setImportDuplicates(val) {
            this.import.duplicates = val;
        },
        setImportSkip(val) {
            this.import.skip = val;
        },
        setImportFramework(val) {
            this.import.framework = val;
        },
        setImportFrameworkName(val) {
            this.import.frameworkName = val;
        },
        setImportFrameworkNameColumn(val) {
            this.import.frameworkNameColumn = val;
        },
        setImportFrameworkScopeColumn(val) {
            this.import.frameworkScopeColumn = val;
        },
        setImportFrameworkIdColumn(val) {
            this.import.frameworkIdColumn = val;
        },
        setImportFrameworkDescription(val) {
            this.import.frameworkDescription = val;
        },
        setImportText(val) {
            this.import.importText = val;
        },
        setImportServerUrl(val) {
            this.import.serverUrl = val;
        },
        setImportUrl(val) {
            this.import.url = val;
        },
        setImportNameColumn(val) {
            this.import.importCsv.nameColumn = val;
        },
        setImportDescriptionColumn(val) {
            this.import.importCsv.descriptionColumn = val;
        },
        setImportScopeColumn(val) {
            this.import.importCsv.scopeColumn = val;
        },
        setImportSourceColumn(val) {
            this.import.importCsv.sourceColumn = val;
        },
        setImportTargetColumn(val) {
            this.import.importCsv.targetColumn = val;
        },
        setImportRelationColumn(val) {
            this.import.importCsv.relationColumn = val;
        },
        setImportIdColumn(val) {
            this.import.importCsv.idColumn = val;
        },
        setCsvColumns(val) {
            this.import.csvColumns = val;
        },
        setCsvRelationColumns(val) {
            this.import.csvRelationColumns = val;
        },
        setCsvRelationFile(val) {
            this.import.csvRelationFile = val;
        },
        setImportModalParams(val) {
            this.import.importModalParams = val;
        },
        setSearchTerm(value) {
            this.frameworks.searchTerm = value;
        },
        setApplySearchTo(value) {
            this.frameworks.applySearchTo = value;
        },
        setRefreshSearch(value) {
            this.frameworks.refreshSearch = value;
        },
        setSortResults(value) {
            this.frameworks.sortResults = value;
        },
        setQuickFilters(value) {
            this.frameworks.quickFilters = value;
        },
        setSingleQuickFilter(value) {
            let i = this.frameworks.quickFilters.findIndex((filter) => filter.id === value.id);
            if (i >= 0) {
                this.frameworks.quickFilters[i].checked = value.checked;
            } else {
                this.frameworks.quickFilters.push(value);
            }
        },
        clearSearchFilters() {
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
        selectDirectory(value) {
            this.directories.selectedDirectory = value;
        },
        setDirectoryList(list) {
            this.directories.directoryList = list;
        },
        setSearchingInDirectory(bool) {
            this.directories.searchingInDirectory = bool;
        },
        setEditDirectory(bool) {
            this.directories.editDirectory = bool;
        },
        setSearchFrameworksInCompetencySearch(bool) {
            this.frameworks.searchFrameworksInCompetencySearch = bool;
        },
        setBanner(payload) {
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
        setMotd(payload) {
            if (payload.message) {
                this.motd.message = payload.message;
            }
            if (payload.title) {
                this.motd.title = payload.title;
            }
        },
        setCuratedPlugins(payload) {
            this.curatedPlugins = payload;
        },
        // --- Original Vuex actions ---
        clearImport() {
            this.setImportFramework(null);
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
        refreshDirectories() {
            let directories = [];
            let directoryIds = [];
            let paramObj = {size: 10000};
            const self = this;
            EcDirectory.search(window.repo, "", function(dirs) {
                for (let i = 0; i < dirs.length; i++) {
                    if (dirs[i].canEditAny(EcIdentityManager.default.getMyPks()) && !EcArray.has(directoryIds, dirs[i].id)) {
                        directories.push(dirs[i]);
                        directoryIds.push(dirs[i].id);
                    }
                }
                self.setDirectoryList(directories);
            }, appError, paramObj);
        }
    }
});
