<template>
    <div id="directory">
        <!-- name directory modal -->
        <modal-template :active="createSubdirectory">
            <template slot="modal-header">
                Create directory
            </template>
            <template slot="modal-body">
                <div
                    class="field">
                    <div class="label">
                        <label>Name of new directory</label>
                    </div>
                    <div class="control">
                        <div class="control">
                            <input
                                class="input"
                                placeholder="Name of new directory"
                                v-model="subdirectoryName">
                        </div>
                    </div>
                </div>
            </template>
            <template slot="modal-foot">
                <div
                    class="field">
                    <div class="buttons">
                        <div
                            class="button is-dark is-outlined"
                            @click="createSubdirectory = false">
                            Cancel
                        </div>
                        <div
                            class="button is-primary"
                            :class="subdirectoryName.length === 0 ? 'is-disabled' : ''"
                            :disabled="subdirectoryName.length === 0"
                            @click="saveNewSubdirectory">
                            Create
                        </div>
                    </div>
                </div>
            </template>
        </modal-template>
        <!-- name directory modal -->
        <modal-template :active="createResource || editResource">
            <template slot="modal-header">
                {{ createResource ? "Create resource" : "Edit resource" }}
            </template>
            <template slot="modal-body">
                <div class="field">
                    <div class="label">
                        <label>Name of resource</label>
                    </div>
                    <div class="control">
                        <div class="control">
                            <input
                                class="input"
                                placeholder="Name of new resource"
                                v-model="resourceName">
                        </div>
                    </div>
                </div>
                <div
                    class="field">
                    <div class="label">
                        <label>URL of resource</label>
                    </div>
                    <div class="control">
                        <div class="control">
                            <input
                                class="input"
                                placeholder="Url of new resource"
                                v-model="resourceUrl">
                        </div>
                        <p
                            v-if="resourceUrl && !validResourceUrl"
                            class="help is-danger">
                            url must start with 'http://' or 'https://'
                        </p>
                    </div>
                </div>
            </template>
            <template slot="modal-foot">
                <div
                    class="field"
                    v-if="createResource">
                    <div class="buttons">
                        <div
                            class="button is-dark is-outlined"
                            @click="createResource = false; resourceName = ''; resourceUrl = ''">
                            Cancel
                        </div>
                        <div
                            class="button is-primary"
                            :class="(resourceName.length === 0 || resourceUrl.length === 0 || !validResourceUrl) ? 'is-disabled' : ''"
                            :disabled="(resourceName.length === 0 || resourceUrl.length === 0 || !validResourceUrl)"
                            @click="saveNewResource">
                            Create
                        </div>
                    </div>
                </div>
                <div
                    class="field"
                    v-if="editResource">
                    <div class="buttons">
                        <div
                            class="button is-dark is-outlined"
                            @click="editResource = false; resource = null;">
                            Cancel
                        </div>
                        <div
                            class="button is-primary"
                            :class="(resourceName.length === 0 || resourceUrl.length === 0 || !validResourceUrl) ? 'is-disabled' : ''"
                            :disabled="(resourceName.length === 0 || resourceUrl.length === 0 || !validResourceUrl)"
                            @click="saveEditedResource">
                            Save
                        </div>
                    </div>
                </div>
            </template>
        </modal-template>
        <thing-editing
            v-if="editDirectory && canEditDirectory"
            :obj="directory"
            :repo="repo"
            :parentNotEditable="queryParams.view==='true'"
            :profile="directoryProfile"
            @delete-object="deleteObject"
            @done-editing-node-event="onDoneEditingNode()" />
        <main-layout :rightActive="showRightAside">
            <template slot="top">
                <div class="container is-fullhd">
                    <div class="columns is-mobile is-spaced mt-0">
                        <!-- search bar -->
                        <div class="column is-6-desktop is-8-mobile">
                            <SearchBar
                                filterSet="all"
                                searchType="framework" />
                        </div>
                        <!-- top bar icons, add framework, resource, new directory, copy share link -->
                        <div class="column is-narrow">
                            <div
                                class="dropdown is-right"
                                v-click-outside="closeCreateDropDown"
                                :class="createDropDownActive ? 'is-active' : ''">
                                <div class="dropdown-trigger">
                                    <button
                                        @click="createDropDownActive = !createDropDownActive"
                                        class="button is-primary is-outlined is-rounded"
                                        aria-haspopup="true"
                                        aria-controls="directory-add-dropdown">
                                        <span class="icon">
                                            <i class="fa fa-plus" />
                                        </span>
                                        <span>Add New</span>
                                        <span class="icon is-small">
                                            <i
                                                class="fas fa-angle-down"
                                                aria-hidden="true" />
                                        </span>
                                    </button>
                                </div>
                                <div
                                    class="dropdown-menu"
                                    v-if="canEditDirectory"
                                    id="directory-add-dropdown"
                                    role="menu">
                                    <div class="dropdown-content">
                                        <a
                                            href="#"
                                            @click="$emit('create-new-framework', directory)"
                                            class="dropdown-item">
                                            Framework
                                        </a>
                                        <a
                                            @click="createSubdirectory = true"
                                            class="dropdown-item">
                                            Sub directory
                                        </a>
                                        <a
                                            @click="createResource = true"
                                            href="#"
                                            class="dropdown-item is-active">
                                            Resource
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="secondary-top">
                <div
                    class="container is-fullhd"
                    @click="showDirectoryInRightAside">
                    <!-- to do account for -->
                    <h1 class="is-size-4 has-text-dark">
                        {{ directory.name }}
                    </h1>
                </div>
            </template>
            <template slot="body">
                <DirectoryList
                    type="Framework"
                    :repo="repo"
                    :click="frameworkClick"
                    :searchOptions="searchOptions"
                    :paramObj="paramObj"
                    :directoryId="directory.shortId()"
                    view="directory"
                    :disallowEdits="true"
                    @dblclick="openObject" />
            </template>
            <template slot="right">
                <RightAside
                    @editResource="editResource = true; resource = $event"
                    v-if="showRightAside" />
            </template>
            <div class="section">
                <div class="container is-fluid show-only-mine">
                    <!-- show my frameworks radio -->
                    <div class="control">
                        <div v-if="queryParams.show !== 'mine' && numIdentities">
                            <label
                                class="checkbox"
                                for="showMine">
                                <input
                                    type="checkbox"
                                    value="true"
                                    id="showMine"
                                    v-model="showMine">
                                Show only mine</label>
                        </div>
                    </div>
                </div>
                <div>
                    <label
                        class="checkbox"
                        for="searchingInDirectory">
                        <input
                            type="checkbox"
                            value="true"
                            id="searchingInDirectory"
                            v-model="searchingInDirectory">
                        Search within Directory</label>
                </div>
            </div>
        </main-layout>
    </div>
</template>
<script>
import debounce from 'lodash/debounce';
import DirectoryList from './DirectoryList.vue';
import common from '@/mixins/common.js';
import SearchBar from '@/components/framework/SearchBar.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import ModalTemplate from '@/components/ModalTemplate.vue';
export default {
    name: "Directory",
    mixins: [common],
    components: {
        MainLayout,
        DirectoryList,
        ModalTemplate,
        SearchBar,
        RightAside: () => import('@/components/framework/RightAside.vue'),
        ThingEditing: () => import('@/lode/components/lode/ThingEditing.vue')
    },
    data: function() {
        return {
            editResource: false,
            createDropDownActive: false,
            repo: window.repo,
            showMine: false,
            showNotMine: false,
            filterByConfig: false,
            numIdentities: EcIdentityManager.ids.length,
            parentObjectClass: 'frameworks-sticky',
            sortBy: null,
            defaultConfig: "",
            clipStatus: 'ready',
            createSubdirectory: false,
            subdirectoryName: '',
            createResource: false,
            resource: null,
            resourceName: '',
            resourceUrl: ''
        };
    },
    created: function() {
        this.sortBy = "name.keyword";
        this.$store.commit("editor/t3Profile", false);
        this.$store.commit('editor/framework', null);
        this.spitEvent('viewChanged');
        this.setDefaultConfig();
    },
    computed: {
        showRightAside: function() {
            return this.$store.getters['app/showRightAside'];
        },
        directory: function() {
            return this.$store.getters['app/selectedDirectory'];
        },
        editDirectory: function() {
            return this.$store.getters['app/editDirectory'];
        },
        canEditDirectory: function() {
            if (this.queryParams && this.queryParams.view === 'true') {
                return false;
            } else if (!this.directory.canEditAny(EcIdentityManager.getMyPks())) {
                return false;
            }
            return true;
        },
        loggedIn: function() {
            if (EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
                return true;
            }
            return false;
        },
        searchingInDirectory: {
            get() {
                return this.$store.getters['app/searchingInDirectory'];
            },
            set(val) {
                this.$store.commit('app/searchingInDirectory', val);
            }
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        searchOptions: function() {
            let search = "";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.showMine || (this.queryParams && this.queryParams.show === "mine")) {
                if (EcIdentityManager.ids.length > 0) {
                    search += " AND (";
                    for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                        if (i !== 0) {
                            search += " OR ";
                        }
                        var id = EcIdentityManager.ids[i];
                        search += "\\*owner:\"" + id.ppk.toPk().toPem() + "\"";
                        search += " OR \\*owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
                    }
                    search += ")";
                }
            }
            if (this.showNotMine && EcIdentityManager.ids.length > 0) {
                search += " AND NOT (";
                for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                    if (i !== 0) {
                        search += " OR ";
                    }
                    var id = EcIdentityManager.ids[i];
                    search += "\\*owner:\"" + id.ppk.toPk().toPem() + "\"";
                    search += " OR \\*owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
                }
                search += ")";
            }
            if (this.filterByConfig && this.defaultConfig) {
                search += " AND (configuration:\"";
                search += this.defaultConfig;
                search += "\")";
            }
            return search;
        },
        paramObj: function() {
            let obj = {};
            obj.size = 20;
            var order = (this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword") ? "asc" : "desc";
            obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "long",  "missing" : "_last"}} ]';
            if (EcIdentityManager.ids.length > 0 && this.queryParams && this.queryParams.show === 'mine') {
                obj.ownership = 'me';
            }
            return obj;
        },
        sortResults: function() {
            return this.$store.getters['app/sortResults'];
        },
        searchTerm: function() {
            return this.$store.getters['app/searchTerm'];
        },
        quickFilters: function() {
            return this.$store.getters['app/quickFilters'];
        },
        filteredQuickFilters: function() {
            let filterValues = this.quickFilters.filter(item => item.checked === true);
            appLog('filtered value', filterValues);
            return filterValues;
        },
        shareLink: function() {
            return window.location.href.replace('/directory', "?directoryId=" + this.directory.shortId());
        },
        directoryProfile: function() {
            return {
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Directory"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name of the directory."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "isRequired": "true"
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Directory"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The description of the directory."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                },
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Framework/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Framework URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "primaryProperties": [
                    "http://schema.org/name",
                    "http://schema.org/description"
                ],
                "secondaryProperties": ["@id"],
                "tertiaryProperties": []
            };
        },
        changedObject: function() {
            return this.$store.getters['editor/changedObject'];
        },
        shareEnabled: function() {
            return this.$store.state.featuresEnabled.shareEnabled;
        },
        userManagementEnabled: function() {
            return this.$store.state.featuresEnabled.userManagementEnabled;
        },
        showUserManagementIcon: function() {
            if (!this.shareEnabled && !this.canEditDirectory) {
                return false;
            }
            if (!this.shareEnabled && !this.userManagementEnabled) {
                return false;
            }
            return true;
        },
        validResourceUrl: function() {
            try {
                let u = new URL(this.resourceUrl);
            } catch (e) {
                return false;
            }
            return true;
        }
    },
    methods: {
        closeCreateDropDown: function() {
            if (this.createDropDownActive) {
                this.createDropDownActive = false;
            }
        },
        canEditItem: function(item) {
            return item.canEditAny(EcIdentityManager.getMyPks());
        },
        frameworkClick: function(framework) {
            this.$store.commit('app/rightAsideObject', framework);
            this.$store.commit('app/showRightAside', 'ListItemInfo');
        },
        openObject: function(object) {
            let me = this;
            if (object.type === "Directory") {
                this.$store.commit('app/selectDirectory', object);
                if (this.$route.name !== "directory") {
                    this.$router.push({name: "directory"});
                }
                this.$store.commit('app/closeRightAside');
            } else if (object.type === "CreativeWork") {
                window.open(object.url, '_blank');
            } else if (this.$store.getters['editor/conceptMode']) {
                EcConceptScheme.get(object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "conceptScheme", params: {frameworkId: object.id}});
                }, appError);
            } else {
                EcFramework.get(object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "framework", params: {frameworkId: object.id}});
                }, appError);
            }
        },
        getName: function(field) {
            let name = EcArray.isArray(field) ? field : [field];
            if (Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
                return this.resolveNameFromUrl(Thing.getDisplayStringFrom(name));
            } else {
                return Thing.getDisplayStringFrom(name);
            }
        },
        addNewlinesToId: function(pem) {
            // Begin public key line
            pem = pem.substring(0, 26) + "\n" + pem.substring(26);
            var length = pem.length;
            var start = 27;
            while (start + 64 < length) {
                pem = pem.substring(0, start + 64) + "\n" + pem.substring(start + 64);
                start += 65;
                length++;
            }
            // End public key line
            pem = pem.substring(0, length - 24) + "\n" + pem.substring(length - 24);
            return pem;
        },
        setDefaultConfig: function() {
            var me = this;
            if (localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")) {
                this.defaultConfig = localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId");
            } else {
                this.repo.searchWithParams("@type:Configuration", {'size': 10000}, function(c) {
                    if (c.isDefault === "true") {
                        me.defaultConfig = c.shortId();
                    }
                }, function() {
                }, function() {
                });
            }
        },
        scrollFunction(e) {
            let documentObject = document.getElementsByClassName('frameworks-sticky');
            let scrollValue = e.target.scrollTop;
            if (scrollValue !== 0) {
                this.parentObjectClass = 'frameworks-sticky scrolled';
            } else {
                this.parentObjectClass = 'frameworks-sticky';
            }
        },
        saveNewSubdirectory: function() {
            let me = this;
            let dir = new EcDirectory();
            dir.name = this.subdirectoryName;
            dir.generateId(this.repo.selectedServer);
            dir.parentDirectory = this.directory.shortId();
            if (this.directory.owner) {
                dir.owner = this.directory.owner;
            }
            if (this.directory.reader) {
                dir.reader = this.directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                dir.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            dir["schema:dateCreated"] = new Date().toISOString();
            dir["schema:dateModified"] = new Date().toISOString();
            // To do: Add other owners and readers
            // To do: add parentDirectory if button is being used to add a subdirectory
            dir.save(function(success) {
                appLog("Directory saved: " + dir.id);
                me.createSubdirectory = false;
                me.subdirectoryName = '';
                me.$store.commit('app/selectDirectory', dir);
            }, appError, this.repo);
        },
        successfulClip({value, event}) {
            appLog('success', value);
            this.clipStatus = 'success';
            setTimeout(() => {
                this.clipStatus = 'ready';
            }, 1000);
        },
        errorClip({value, event}) {
            appLog('error', value);
            this.clipStatus = 'error';
            setTimeout(() => {
                this.clipStatus = 'ready';
            }, 1000);
        },
        goToParentDirectory: function() {
            let me = this;
            EcDirectory.get(this.directory.parentDirectory, function(success) {
                me.$store.commit('app/selectDirectory', success);
            }, appError);
        },
        saveNewResource: function() {
            let me = this;
            let c = new CreativeWork();
            c.generateId(this.repo.selectedServer);
            c.name = this.resourceName;
            c.url = this.resourceUrl;
            c.directory = this.directory.shortId();
            if (this.directory.owner) {
                c.owner = this.directory.owner;
            }
            if (this.directory.reader) {
                c.reader = this.directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            this.repo.saveTo(c, function() {
                appLog("Resource saved: " + c.id);
                me.resourceName = '';
                me.resourceUrl = '';
                me.createResource = false;
                me.$store.commit('app/refreshSearch', true);
                me.$store.commit('app/rightAsideObject', c);
            }, appError);
        },
        saveEditedResource: function() {
            let me = this;
            let resource = this.resource;
            resource.name = this.resourceName;
            resource.url = this.resourceUrl;
            repo.saveTo(resource, function() {
                me.$store.commit('app/rightAsideObject', resource);
                me.editResource = false;
                me.resource = null;
            }, appError);
        },
        onDoneEditingNode: function() {
            this.$store.commit('app/editDirectory', false);
        },
        deleteObject: function(obj) {
            appLog("deleting " + obj.id);
            var me = this;
            this.repo.search("(directory:\"" + obj.shortId() + "\" OR parentDirectory:\"" + obj.shortId() + "\")", function() {}, function(success) {
                new EcAsyncHelper().each(success, function(obj, done) {
                    if (obj.type === 'Framework') {
                        me.deleteFramework(obj);
                    } else if (obj.type === 'CreativeWork') {
                        me.repo.deleteRegistered(obj, appLog, appError);
                    } else if (obj.type === "Directory") {
                        me.deleteObject(obj);
                    }
                    done();
                }, function(objs) {
                    me.repo.deleteRegistered(obj, appLog, appError);
                    if (obj.shortId() === me.directory.shortId()) {
                        me.$router.push({name: "frameworks"});
                    }
                });
            }, appError);
        },
        deleteFramework: function(framework) {
            let me = this;
            this.repo.deleteRegistered(framework, function(success) {
                me.spitEvent("frameworkDeleted", framework.shortId(), "directoryPage");
                // Delete the framework, delete all non-used stuff.
                if (framework.competency != null) {
                    for (var i = 0; i < framework.competency.length; i++) {
                        me.conditionalDelete(framework.competency[i]);
                    }
                }
                if (framework.relation != null) {
                    for (var i = 0; i < framework.relation.length; i++) {
                        me.conditionalDelete(framework.relation[i]);
                    }
                }
                if (framework.level != null) {
                    for (var i = 0; i < framework.level.length; i++) {
                        me.conditionalDelete(framework.level[i]);
                    }
                }
            }, appLog);
        },
        showManageUsersModal() {
            this.$store.commit('app/showModal', {component: 'Share'});
        },
        showDirectoryInRightAside() {
            this.$store.commit('app/rightAsideObject', this.directory);
            this.$store.commit('app/showRightAside', 'ListItemInfo');
        }
    },
    mounted: function() {
        if (!this.directory || this.directory === '') {
            this.$router.push({name: "frameworks"});
        }
        this.$store.commit('app/objForShareModal', null);
        this.showDirectoryInRightAside();
        this.$store.commit('app/searchTerm', '');
        // Keep sorting/filtering in sync with the store on back button
        if (this.sortResults.id === "lastEdited") {
            this.sortBy = "schema:dateModified";
        } else if (this.sortResults.id === "dateCreated") {
            this.sortBy = "schema:dateCreated";
        } else {
            this.sortBy = "name.keyword";
        }
        this.showMine = false;
        this.showNotMine = false;
        this.filterByConfig = false;
        for (var i = 0; i < this.filteredQuickFilters.length; i++) {
            if (this.filteredQuickFilters[i].id === "ownedByMe") {
                this.showMine = true;
            }
            if (this.filteredQuickFilters[i].id === "notOwnedByMe") {
                this.showNotMine = true;
            }
            if (this.filteredQuickFilters[i].id === "configMatchDefault") {
                this.filterByConfig = true;
            }
        }
        let documentBody = document.getElementById('directory');
        documentBody.addEventListener('scroll', debounce(this.scrollFunction, 100, {'leading': true}));
    },
    watch: {
        sortResults: function() {
            if (this.sortResults.id === "lastEdited") {
                this.sortBy = "schema:dateModified";
            } else if (this.sortResults.id === "dateCreated") {
                this.sortBy = "schema:dateCreated";
            } else {
                this.sortBy = "name.keyword";
            }
        },
        filteredQuickFilters: function() {
            this.showMine = false;
            this.showNotMine = false;
            this.filterByConfig = false;
            for (var i = 0; i < this.filteredQuickFilters.length; i++) {
                if (this.filteredQuickFilters[i].id === "ownedByMe") {
                    this.showMine = true;
                }
                if (this.filteredQuickFilters[i].id === "notOwnedByMe") {
                    this.showNotMine = true;
                }
                if (this.filteredQuickFilters[i].id === "configMatchDefault") {
                    this.filterByConfig = true;
                }
            }
        },
        changedObject: function() {
            if (this.changedObject && this.changedObject === this.directory.shortId()) {
                let me = this;
                EcRepository.get(this.directory.shortId(), function(dir) {
                    me.$store.commit('app/selectDirectory', dir);
                    if (me.showRightAside && dir.shortId() === me.$store.getters['app/rightAsideObject'].shortId()) {
                        me.$store.commit('app/rightAsideObject', dir);
                    }
                }, appError);
                this.$store.commit('editor/changedObject', null);
            }
        },
        resource: function() {
            if (this.resource) {
                this.resourceName = this.resource.name;
                this.resourceUrl = this.resource.url;
            } else {
                this.resourceName = '';
                this.resourceUrl = '';
            }
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/frameworks.scss';
.frameworks-sticky {
    position: sticky;
    background-color: $white;
    top: 0px;
    z-index: 9;
    width: 100%;
    transition: height .1s;
    position: -webkit-sticky;
    border-bottom: solid 1px rgba($dark, .3);
}
.frameworks-sticky.scrolled {
    z-index: 8;
    height: 136px;
    top: 0;
    overflow: hidden;
    .title {
        display: none;
    }
    .subtitle {
        display: none;
    }
    .frameworks-buttons, .concept-buttons {
        display: none;
    }
}
.framework-details {
    .framework-details__item {
        border-right: 1px solid rgba($dark, .3);
        padding: 0rem .25rem;
    }
    .framework-details__item:first-of-type {
        border-right: 1px solid rgba($dark, .3);
        padding: 0rem .25rem 0rem 0rem;
    }
    .framework-details__item:last-of-type {
        border-right: 0px solid rgba($dark, .3);
        padding: 0rem .25rem 0rem .25rem;
    }
}
.share-url {
    text-align: left;
    padding-right: 1rem;
    max-width: 300px;
    width: 600px;
    cursor: pointer;
    display: inline-block;
    direction: rtl;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: $dark;
}
</style>