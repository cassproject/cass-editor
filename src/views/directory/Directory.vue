<template>
    <div id="directory">
        <!-- name directory modal -->
        <modal-template
            :active="createSubdirectory"
            @close="createSubdirectory = false">
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
                        <div
                            class="button is-primary"
                            :class="subdirectoryName.length === 0 ? 'is-disabled' : ''"
                            :disabled="subdirectoryName.length === 0"
                            @click="saveNewSubdirectoryAndAddAnother">
                            Create and add another
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
            :obj="$store.getters['app/rightAsideObject']"
            :repo="repo"
            :parentNotEditable="queryParams.view==='true'"
            :profile="directoryProfile"
            @done-editing-node-event="onDoneEditingNode()" />
        <main-layout :rightActive="showRightAside">
            <template slot="top">
                <div
                    style="width: 100%;"
                    class="columns is-mobile is-spaced mt-0">
                    <!-- search bar -->
                    <div class="column">
                        <SearchBar
                            filterSet="all"
                            :ownedByMe="initialOwnedByMe"
                            searchType="framework" />
                    </div>
                    <div class="column is-1" />
                    <div class="column is-narrow">
                        <add-new-dropdown
                            :subdirectoryEnabled="true"
                            :frameworkEnabled="true"
                            :resourceEnabled="true"
                            @subdirectory="createSubdirectory = true"
                            @framework="$emit('create-new-framework', directory)"
                            @resource="createResource = true"
                            @close="createDropDownActive = false"
                            @toggle="createDropDownActive = !createDropDownActive"
                            v-if="canEditDirectory"
                            :active="createDropDownActive" />
                    </div>
                    <div class="column is-narrow">
                        <a
                            href="docs/authoring/directory-management/"
                            target="_blank"
                            title="Go to documentation on framework library"
                            class="button is-hidden-touch is-outlined is-primary">
                            <span class="icon">
                                <i class="far fa-question-circle" />
                            </span>
                            <span>
                                Help
                            </span>
                        </a>
                        <a
                            href="docs/authoring/directory-management/"
                            target="_blank"
                            title="Go to documentation on framework library"
                            class="button is-hidden-desktop is-outlined is-primary">
                            <span class="icon">
                                <i class="far fa-question-circle" />
                            </span>
                        </a>
                    </div>
                </div>
            </template>
            <template slot="secondary-top">
                <nav
                    class="breadcrumb is-medium"
                    aria-label="breadcrumbs has-text-dark">
                    <ul>
                        <li>
                            <a
                                href="#"
                                @click="$router.push({name: 'frameworks', query: queryParams}); $store.commit('app/selectDirectory', null)">
                                CaSS
                            </a>
                        </li>
                        <li
                            v-for="each in directoryTrail"
                            :key="each.id">
                            <a
                                href="#"
                                @click="$store.commit('app/selectDirectory', each); $store.commit('app/rightAsideObject', each);">{{ each.name }}</a>
                        </li>
                        <li>
                            <a
                                href="#"
                                @click="showDirectoryInRightAside">
                                <!-- to do account for -->
                                {{ directory.name }}
                            </a>
                        </li>
                    </ul>
                </nav>
            </template>
            <template slot="body">
                <DirectoryList
                    type="Framework"
                    :repo="repo"
                    :click="frameworkClick"
                    :searchOptions="searchOptions"
                    :paramObj="paramObj"
                    :directoryId="directory.shortId()"
                    :directoryObj="directory"
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
                        <div v-if="initialOwnedByMe && numIdentities">
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
import editDirectory from '@/mixins/editDirectory.js';
import SearchBar from '@/components/framework/SearchBar.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import ModalTemplate from '@/components/modalContent/ModalTemplate.vue';
import AddNewDropdown from '@/components/AddNewDropdown.vue';
export default {
    name: "Directory",
    mixins: [common, editDirectory],
    components: {
        MainLayout,
        DirectoryList,
        AddNewDropdown,
        ModalTemplate,
        SearchBar,
        RightAside: () => import('@/components/framework/RightAside.vue'),
        ThingEditing: () => import('@/lode/components/ThingEditing.vue')
    },
    data: function() {
        return {
            editResource: false,
            createDropDownActive: false,
            repo: window.repo,
            showMine: false,
            numIdentities: EcIdentityManager.default.ids.length,
            parentObjectClass: 'frameworks-sticky',
            sortBy: null,
            defaultConfig: "",
            clipStatus: 'ready',
            createSubdirectory: false,
            subdirectoryName: '',
            createResource: false,
            resource: null,
            resourceName: '',
            resourceUrl: '',
            directoryTrail: [],
            addAnother: false
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
        loggedIn: function() {
            if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
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
        currentUser: function() {
            if (EcIdentityManager.default.ids.length > 0) {
                return EcIdentityManager.default.ids;
            } else {
                return undefined;
            }
        },
        filterByOwnedByMe: function() {
            return this.$store.getters['app/filterByOwnedByMe'];
        },
        filterByNotOwnedByMe: function() {
            return this.$store.getters['app/filterByNotOwnedByMe'];
        },
        filterByConfigMatchDefault: function() {
            return this.$store.getters['app/filterByConfigMatchDefault'];
        },
        searchOptions: function() {
            let search = "";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.filterByOwnedByMe) {
                if (this.currentUser) {
                    search += " AND (";
                    this.currentUser.forEach((user, i) => {
                        if (i !== 0) {
                            search += " OR ";
                        }
                        search += "\\*owner:\"" + user.ppk.toPk().toPem() + "\"";
                        search += " OR \\*owner:\"" + this.addNewlinesToId(user.ppk.toPk().toPem()) + "\"";
                    });
                    search += ")";
                }
            }
            if (this.filterByNotOwnedByMe && EcIdentityManager.default.ids.length > 0) {
                search += " AND NOT (";
                for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
                    if (i !== 0) {
                        search += " OR ";
                    }
                    var id = EcIdentityManager.default.ids[i];
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
        initialOwnedByMe: function() {
            return this.$store.getters["featuresEnabled/ownedByMe"];
        },
        paramObj: function() {
            let obj = {};
            obj.size = 20;
            var order = (this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword") ? "asc" : "desc";
            let type = (this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword") ? "text" : "date";
            obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "' + type + '",  "missing" : "_last"}} ]';
            if (this.showMine) {
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
        setOwnedByMe(val) {
            const filter = {
                id: 'ownedByMe',
                checked: val
            };
            this.$store.commit("app/singleQuickFilter", filter);
        },
        closeCreateDropDown: function() {
            if (this.createDropDownActive) {
                this.createDropDownActive = false;
            }
        },
        canEditItem: function(item) {
            return this.canEditAny(item);
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
                this.$store.commit('app/selectDirectory', null);
                EcConceptScheme.get(object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "conceptScheme", params: {frameworkId: object.id}});
                }, appError);
            } else if (this.$store.getters['editor/progressionMode']) {
                this.$store.commit('app/selectDirectory', null);
                EcConceptScheme.get(object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "progressionModel", params: {frameworkId: object.id}});
                }, appError);
            } else {
                this.$store.commit('app/selectDirectory', null);
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
            if (schema.Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
                return this.resolveNameFromUrl(schema.Thing.getDisplayStringFrom(name));
            } else {
                return schema.Thing.getDisplayStringFrom(name);
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
                    if (c.isDefault === "true" || c.isDefault === true) {
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
            if (EcIdentityManager.default.ids.length > 0) {
                dir.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            dir["schema:dateCreated"] = new Date().toISOString();
            dir["schema:dateModified"] = new Date().toISOString();
            // To do: Add other owners and readers
            // To do: add parentDirectory if button is being used to add a subdirectory
            dir.save(function(success) {
                appLog("Directory saved: " + dir.id);
                me.subdirectoryName = '';
                if (me.addAnother) {
                    me.addAnother = false;
                    me.$store.commit('app/refreshSearch', true);
                } else {
                    me.createSubdirectory = false;
                    me.$store.commit('app/selectDirectory', dir);
                    me.$store.commit('app/rightAsideObject', dir);
                }
            }, appError, this.repo);
        },
        saveNewSubdirectoryAndAddAnother: function() {
            this.addAnother = true;
            this.saveNewSubdirectory();
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
            let c = new schema.CreativeWork();
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
            if (EcIdentityManager.default.ids.length > 0) {
                c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
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
        showManageUsersModal() {
            this.$store.commit('app/showModal', {component: 'Share'});
        },
        showDirectoryInRightAside() {
            this.$store.commit('app/rightAsideObject', this.directory);
            this.$store.commit('app/showRightAside', 'ListItemInfo');
        },
        findDirectoryTrail: function(directory) {
            let me = this;
            if (directory.parentDirectory) {
                EcDirectory.get(directory.parentDirectory, function(parent) {
                    if (parent && !parent.parentDirectory) {
                        me.directoryTrail.unshift(parent);
                    } else if (parent) {
                        me.directoryTrail.unshift(parent);
                        me.findDirectoryTrail(parent);
                    }
                }, appError);
            }
        }
    },
    beforeDestroy() {
        if (this.queryParams && this.queryParams.private !== 'true') {
            this.$store.commit('editor/private', false);
        }
        this.$store.commit('app/selectDirectory', null);
    },
    mounted: function() {
        this.showMine = this.filterByOwnedByMe;
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
        let documentBody = document.getElementById('directory');
        documentBody.addEventListener('scroll', debounce(this.scrollFunction, 100, {'leading': true}));
        this.findDirectoryTrail(this.directory);
    },
    watch: {
        showMine: function() {
            this.setOwnedByMe(this.showMine);
        },
        sortResults: function() {
            if (this.sortResults.id === "lastEdited") {
                this.sortBy = "schema:dateModified";
            } else if (this.sortResults.id === "dateCreated") {
                this.sortBy = "schema:dateCreated";
            } else {
                this.sortBy = "name.keyword";
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
        },
        directory: function() {
            if (this.directory) {
                this.directoryTrail.splice(0, this.directoryTrail.length);
                this.findDirectoryTrail(this.directory);
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