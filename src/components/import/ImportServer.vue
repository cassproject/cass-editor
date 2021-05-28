<template>
    <div
        id="import-from-server"
        class="columns is-mobile">
        <div class="column is-12">
            <div class="container py-6">
                <slot name="import-server-title">
                    <p>Nothing send from import.vue</p>
                </slot>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <ImportTabs />
                    </div>
                    <div
                        class="column is-12"
                        v-if="importTransition !== 'preview' && importTransition !== 'light'">
                        <!-- server input -->
                        <div
                            class="remote-server">
                            <template v-if="importTransition === 'upload'">
                                <div
                                    v-for="item in serverDetails"
                                    :key="item"
                                    class="field">
                                    <label class="label">
                                        {{ item.label }}
                                    </label>
                                    <div class="field">
                                        <div class="control is-expanded">
                                            <input
                                                class="input is-large"
                                                v-model="importServerUrl"
                                                type="url">
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="buttons is-right">
                                            <div
                                                class="button is-large is-outlined is-primary"
                                                :disabled="importServerUrl === ''"
                                                @click="$store.commit('app/importTransition', 'connectToServer'); serverType='case';">
                                                <span class="icon">
                                                    <i class="fas fa-network-wired" />
                                                </span>
                                                <span>
                                                    connect to CASE endpoint
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="buttons is-right">
                                            <div
                                                class="button is-large is-outlined is-primary"
                                                :disabled="importServerUrl === ''"
                                                @click="$store.commit('app/importTransition', 'connectToServer'); serverType='cass';">
                                                <span class="icon">
                                                    <i class="fas fa-network-wired" />
                                                </span>
                                                <span>
                                                    connect to CaSS endpoint
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="py-4">
                                    <h3 class="title is-size-5">
                                        Looking for an example? Try out an example from the <a @click="importServerUrl='https://opensalt.net'">OpenSalt.net endpoint</a> to test the workflow.
                                    </h3>
                                </div>
                            <!--<div class="column is-12">
                                    <div
                                        class="button is-dark is-small"
                                        @click="importServerUrl='https://opensalt.net'">
                                        Use OpenSalt.net
                                    </div>
                                </div>-->
                            </template>
                            <div
                                v-if="importTransition === 'connectToServer'"
                                class="section has-text-centered">
                                <span class="icon is-large">
                                    <i class="fa fa-spinner fa-pulse fa-2x" />
                                </span>
                            </div>
                            <div
                                v-else-if="(importTransition === 'process' || importTransition === 'info') && importErrors.length === 0"
                                class="column">
                                <div class="section has-text-centered">
                                    <span
                                        class="icon is-large"
                                        v-if="importTransition === 'process'">
                                        <i class="fa fa-spinner fa-pulse fa-2x" />
                                    </span>
                                </div>
                                <div class="section">
                                    <p
                                        class="is-size-6">
                                        {{ importStatus }}
                                    </p>
                                </div>
                            </div>
                            <!-- import errors -->
                            <div
                                v-else-if="importErrors.length > 0"
                                class="column has-text-danger">
                                <ul>
                                    <li
                                        class="is-size-6"
                                        v-for="(error, index) in importErrors"
                                        :key="index">
                                        <span class="">
                                            <span class="icon">
                                                <i class="fa fa-times" />
                                            </span>
                                            {{ error }}
                                        </span>
                                    </li>
                                    <li />
                                </ul>
                                <div class="buttons is-centered">
                                    <div
                                        @click="resetImport()"
                                        class="button is-primary">
                                        <span class="icon">
                                            <i class="fa fa-redo" />
                                        </span>
                                        <span>start over</span>
                                    </div>
                                </div>
                            </div>
                            <!-- HANDLE CASE DOCS -->
                            <div
                                class=""
                                v-if="caseDocs.length">
                                <h3 class="subtitle has-text-weight-bold is-size-4">
                                    Found Frameworks
                                </h3>
                                <p>
                                    Select the framework you would like to import.
                                </p>
                                <div
                                    class="field is-grouped"
                                    v-for="doc in caseDocs"
                                    :key="doc.id">
                                    <input
                                        class="is-checkradio is-small"
                                        type="checkbox"
                                        :checked="doc.checked"
                                        :id="'check' + doc.id"
                                        :name="'check' + doc.id"
                                        v-model="doc.checked"
                                        v-if="!doc.loading && !doc.success && !doc.error">

                                    <label
                                        class="label"
                                        :for="'check' + doc.id">{{ doc.name }}</label>
                                    <span class="icon is-pulled-right">
                                        <i
                                            class="fa fa-spinner fa-pulse"
                                            v-if="doc.loading" />
                                        <i
                                            class="fa fa-exclamation-triangle"
                                            v-else-if="doc.error" />
                                        <i
                                            class="fa fa-check"
                                            v-else-if="doc.success" />

                                    </span>
                                </div>
                                <div class="buttons is-right">
                                    <div
                                        class="button is-outlined is-dark"
                                        @click="cancelImport">
                                        Cancel
                                    </div>
                                    <div
                                        v-if="importTransition !== 'importingCaseFrameworks'"
                                        class="button is-outlined is-primary"
                                        @click="importCaseDocs()">
                                        Import
                                    </div>
                                </div>
                            </div>
                            <!-- HANDLE CASS DOCS -->
                            <div
                                class="cass__import--cass"
                                v-if="cassDirectories.length || cassFrameworks.length">
                                <div class="cass__import--frameworks">
                                    <h3 class="has-text-weight-bold is-size-4">
                                        Found Frameworks
                                    </h3>
                                    <div class="field">
                                        <SearchBar
                                            searchType="framework" />
                                    </div>
                                    <div class="field">
                                        <div class="label">
                                            <label>Select a directory to filter results</label>
                                        </div>
                                        <div class="select is-fullwidth is-primary">
                                            <select v-model="selectDirectory">
                                                <label>Directories</label>
                                                <option
                                                    value="all">
                                                    <span class="has-text-dark">All frameworks</span>
                                                </option>
                                                <option
                                                    v-for="directory in cassDirectories"
                                                    :key="directory.id"
                                                    :value="directory">
                                                    <span class="has-text-dark">{{ directory.getName() }}</span>
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div
                                        v-if="selectDirectory"
                                        class="breadcrumb is-medium"
                                        aria-label="breadcrumbs has-text-dark">
                                        <ul>
                                            <li
                                                v-for="each in directoryTrail"
                                                :key="each.id">
                                                <a>{{ each.name }}</a>
                                            </li>
                                            <li>
                                                <a>{{ selectDirectory.name }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="field">
                                        <div class="buttons is-right">
                                            <div
                                                class="button is-primary"
                                                @click="selectAllFrameworks">
                                                Select all
                                            </div>
                                        </div>
                                    </div>
                                    <!-- multi select for frameworks -->
                                    <div class="field">
                                        <div
                                            class="select is-fullwidth is-primary is-multiple">
                                            <select
                                                multiple
                                                size="6"
                                                v-model="selectedFrameworks">
                                                <option
                                                    v-for="doc in cassFrameworks"
                                                    :key="doc.id"
                                                    :id="'check' + doc.id"
                                                    :value="doc.id">
                                                    {{ doc.getName() }}
                                                </option>
                                            </select>
                                        </div>
                                        <p class="help is-info">
                                            Select the framework(s) to import.
                                        </p>
                                    </div>
                                </div>
                                <div class="is-12">
                                    <div class="buttons is-right">
                                        <div
                                            class="button is-outlined is-dark"
                                            @click="cancelImport">
                                            Cancel
                                        </div>
                                        <div
                                            class="button is-outlined is-dark"
                                            v-if="directoryThatsOpen"
                                            @click="goBack">
                                            Back
                                        </div>
                                        <div
                                            v-if="importTransition !== 'importingCassFrameworks'"
                                            class="button is-outlined is-primary"
                                            @click="importCassFrameworks()">
                                            Import
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-12">
                        <slot name="import-framework" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ImportTabs from '@/components/import/ImportTabs';
import imports from '@/mixins/import.js';
import common from '@/mixins/common.js';
import SearchBar from '../framework/SearchBar.vue';
export default {
    name: 'ImportServer',
    components: {
        ImportTabs,
        SearchBar
    },
    mixins: [ imports, common ],
    props: {
        importTransition: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            caseDocs: [],
            serverDetails: [
                {
                    label: 'Paste URL endpoint of server'
                }
            ],
            serverType: '',
            cassDirectories: [],
            cassFrameworks: [],
            remoteRepo: null,
            directoryThatsOpen: null,
            selectDirectory: 'all',
            selectedFrameworks: [],
            directoryTrail: []
        };
    },
    computed: {
        importInfoVisible: function() {
            return this.$store.getters['app/showRightAside'];
        },
        importErrors: function() {
            return this.$store.getters['app/importErrors'];
        },
        importServerUrl: {
            get() {
                return this.$store.getters['app/importServerUrl'];
            },
            set(url) {
                this.$store.commit('app/importServerUrl', url);
            }
        },
        searchTerm: function() {
            return this.$store.getters['app/searchTerm'];
        }
    },
    mounted: function() {
        this.$store.commit('app/searchTerm', '');
    },
    methods: {
        importCaseDocs: function() {
            this.handleImportFromTabs(this.caseDocs);
            this.$store.commit('app/importTransition', 'importingCaseFrameworks');
        },
        handleImportFromTabs: function(e) {
            this.caseDocs = e;
            this.importCase();
        },
        isValidUrl(s) {
            try {
                let u = new URL(s);
            } catch (e) {
                return false;
            }
            return true;
        },
        connectToServer: function() {
            appLog("connecting to server 1");
            this.$store.commit('app/clearImportErrors');
            let error = {
                message: "Unable to import from the URL Endpoint provided.",
                details: ""
            };
            if (!this.isValidUrl(this.importServerUrl)) {
                error.details = "The endpoint provided is not a valid URL.";
                this.$store.commit('app/addImportError', error.details);
                this.$store.commit('app/importTransition', 'upload');
                this.showModal('error', error);
                return;
            }
            this.caseDocs.splice(0, this.caseDocs.length);
            this.cassDirectories.splice(0, this.cassDirectories.length);
            this.cassFrameworks.splice(0, this.cassFrameworks.length);
            if (this.serverType === 'cass') {
                this.cassDetectEndpoint();
            } else if (this.serverType === 'case') {
                this.caseDetectEndpoint();
            }
        },
        cassDetectEndpoint: function() {
            let remoteServer = this.importServerUrl;
            if (!remoteServer.endsWith("/")) {
                remoteServer += "/";
            }
            if (!remoteServer.endsWith("api/")) {
                remoteServer += "api/";
            }
            let remoteRepo = new EcRepository();
            // Constructor adds repo to our repository list but we don't want it there in this case
            EcRepository.repos.pop();
            remoteRepo.selectedServer = remoteServer;
            this.remoteRepo = remoteRepo;
            this.cassSearchEndpoint();
        },
        cassSearchEndpoint: function() {
            this.cassDirectories.splice(0, this.cassDirectories.length);
            this.cassFrameworks.splice(0, this.cassFrameworks.length);
            this.searchingTopLevel = true;
            let me = this;
            let paramObj = {};
            paramObj.size = 50;
            paramObj.sort = '[ { "name.keyword": {"order" : "asc"}} ]';
            let search = "(*)";
            if (this.searchTerm) {
                search = this.searchTerm;
            }
            EcDirectory.search(this.remoteRepo, search, function(success) {
                me.cassSearchSuccess(success, "directory");
            }, appError, paramObj);
            EcFramework.search(this.remoteRepo, search, function(success) {
                me.cassSearchSuccess(success, "framework");
            }, function(error) {
                appLog(error);
                me.cassSearchError();
            }, paramObj);
        },
        cassSearchError: function() {
            let error = {
                message: "Unable to search the URL Endpoint provided.",
                details: "Make sure you entered the URL of a CaSS Repository."
            };
            this.$store.commit('app/addImportError', error.details);
            this.$store.commit('app/importTransition', 'upload');
            this.showModal('error', error);
        },
        cassSearchSuccess: function(success, objectType) {
            if (objectType === "framework") {
                let message = success.length + " frameworks detected.";
                this.$store.commit('app/importStatus', message);
                this.$store.commit('app/importTransition', 'serverFrameworksDetected');
            }
            for (let each in success) {
                success[each].loading = false;
                success[each].success = false;
                success[each].error = false;
                success[each].checked = false;
                if (objectType === "directory" && (!success[each].parentDirectory || !this.searchingTopLevel)) {
                    this.cassDirectories.push(success[each]);
                } else if (objectType === "framework") {
                    this.cassFrameworks.push(success[each]);
                }
            }
        },
        importCassFrameworks: function(dataArray) {
            this.$store.commit('app/importTransition', 'importingCassFrameworks');
            if (dataArray) {
                // User has clicked cancel on this import item
                var localFirstIndex = dataArray[1];
                this.cassFrameworks[localFirstIndex].loading = false;
                this.cassFrameworks[localFirstIndex].error = true;
            }
            for (var i = this.cassFrameworks.length - 1; i >= 0; i--) {
                if (!this.cassFrameworks[i].checked) {
                    this.cassFrameworks.splice(i, 1);
                } else if (this.cassFrameworks[i].success === false && this.cassFrameworks[i].error === false) {
                    this.cassFrameworks[i].loading = true;
                }
            }
            let lis = 0;
            let firstIndex = null;
            for (var i = 0; i < this.cassFrameworks.length; i++) {
                if (this.cassFrameworks[i].loading === true) {
                    lis++;
                    if (firstIndex == null) {
                        firstIndex = i;
                    }
                }
            }
            if (lis === 0) {
                this.$store.commit('app/importFramework', this.$store.getters['editor/framework']);
                if (this.cassFrameworks.length === 1) {
                    this.importSuccess();
                } else {
                    this.$store.commit('app/sortResults', {
                        id: 'lastEdited',
                        label: 'last modified'
                    });
                    this.$router.push({name: "frameworks"});
                }
                this.$store.commit('app/importStatus', "Import finished.");
            } else {
                var me = this;
                EcRepository.cache = {};
                EcFramework.get(this.cassFrameworks[firstIndex].shortId(), function(found) {
                    me.$store.commit('app/importStatus', 'framework found...');
                    me.showModal('duplicateOverwriteOnly', [[me.cassFrameworks[firstIndex], firstIndex], found]);
                }, function(notFound) {
                    me.$store.commit('app/importStatus', 'no match, saving new framework...');
                    me.continueCassImport([me.cassFrameworks[firstIndex], firstIndex]);
                });
            }
        },
        precacheRemoteServer: function(urls, success, failure) {
            var cacheUrls = [];
            for (var i = 0; i < urls.length; i++) {
                var url = urls[i];
                if (url.startsWith(this.remoteRepo.selectedServer)) {
                    cacheUrls.push(url.replace(this.remoteRepo.selectedServer, "").replace("custom/", ""));
                } else {
                    cacheUrls.push("data/" + EcCrypto.md5(url));
                }
            }
            if (cacheUrls.length === 0) {
                if (success != null) {
                    success();
                }
                return;
            }
            var fd = new FormData();
            fd.append("data", JSON.stringify(cacheUrls));
            EcRemote.postExpectingObject(this.remoteRepo.selectedServer, "sky/repo/multiGet", fd, function(p1) {
                var results = p1;
                for (var i = 0; i < results.length; i++) {
                    var d = new EcRemoteLinkedData(null, null);
                    d.copyFrom(results[i]);
                    results[i] = d;
                    if (EcRepository.caching) {
                        if (!EcRepository.shouldTryUrl(d.id)) {
                            var md5 = EcCrypto.md5(d.shortId());
                            for (var j = 0; j < cacheUrls.length; j++) {
                                var url = cacheUrls[j];
                                if (url.indexOf(md5) !== -1) {
                                    (EcRepository.cache)[url] = d;
                                    break;
                                }
                            }
                        }
                        (EcRepository.cache)[d.shortId()] = d;
                        (EcRepository.cache)[d.id] = d;
                    }
                }
                if (success != null) {
                    success();
                }
            }, null);
        },
        continueCassImport(dataArray) {
            var data = dataArray[0];
            var firstIndex = dataArray[1];
            var me = this;
            let framework = new EcFramework();
            framework.copyFrom(data);
            delete framework.owner;
            delete framework.reader;
            if (EcIdentityManager.default.ids.length > 0) {
                framework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            framework.id = framework.shortId();
            framework["schema:dateModified"] = new Date().toISOString();
            delete framework.loading;
            delete framework.success;
            delete framework.error;
            delete framework.checked;
            delete framework.directory;
            // To do: address directory
            let toSave = [];
            toSave.push(framework);
            let subObjects = [];
            if (framework.competency && framework.competency.length) {
                subObjects = framework.competency;
            }
            if (framework.relation && framework.relation.length) {
                subObjects = subObjects.concat(framework.relation);
            }
            if (framework.level && framework.level.length) {
                subObjects = subObjects.concat(framework.level);
            }
            EcRepository.alwaysTryUrl = true;
            this.precacheRemoteServer(subObjects, function() {
                new EcAsyncHelper().each(subObjects, function(subId, done) {
                    EcRepository.get(subId, function(result) {
                        let type = "Ec" + result.type;
                        if (type === "EcRelation") {
                            type = "EcAlignment";
                        }
                        let newObj = new window[type]();
                        newObj.copyFrom(result);
                        delete newObj.owner;
                        delete newObj.reader;
                        if (EcIdentityManager.default.ids.length > 0) {
                            newObj.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                        }
                        newObj.id = newObj.shortId();
                        toSave.push(newObj);
                        done();
                    }, done);
                }, function(allDone) {
                    EcRepository.alwaysTryUrl = false;
                    me.repo.multiput(toSave, function() {
                        me.cassFrameworks[firstIndex].loading = false;
                        me.cassFrameworks[firstIndex].success = true;
                        me.$store.commit('editor/framework', framework);
                        me.spitEvent("importFinished", framework.shortId(), "importPage");
                        me.importCassFrameworks();
                    }, function() {
                        me.cassFrameworks[firstIndex].loading = false;
                        me.cassFrameworks[firstIndex].error = true;
                        me.importCassFrameworks();
                    });
                });
            }, function(error) {
                appError(error);
            });
        },
        openDirectory: function(directory) {
            this.directoryThatsOpen = directory;
            let me = this;
            let paramObj = {};
            paramObj.size = 50;
            paramObj.sort = '[ { "name.keyword": {"order" : "asc"}} ]';
            EcDirectory.search(this.remoteRepo, "parentDirectory:\"" + directory.shortId() + "\"", function(success) {
                me.cassDirectories.splice(0, me.cassDirectories.length);
                me.searchingTopLevel = false;
                me.cassSearchSuccess(success, "directory");
            }, appError, paramObj);
            EcFramework.search(this.remoteRepo, "directory:\"" + directory.shortId() + "\"", function(success) {
                me.cassFrameworks.splice(0, me.cassFrameworks.length);
                me.cassSearchSuccess(success, "framework");
            }, appError, paramObj);
        },
        selectAllFrameworks: function() {
            for (let each in this.cassFrameworks) {
                this.cassFrameworks[each].checked = true;
                EcArray.setAdd(this.selectedFrameworks, this.cassFrameworks[each].id);
            }
        },
        caseDetectEndpoint: function() {
            var me = this;
            let error = {
                message: "Unable to import from the URL Endpoint provided.",
                details: ""
            };
            let serverUrl = this.importServerUrl;
            if (!serverUrl.endsWith("/")) {
                serverUrl += "/";
            }
            this.get(serverUrl, "ims/case/v1p0/CFDocuments", {"Accept": "application/json"}, function(success) {
                me.caseGetDocsSuccess(success);
            }, function(failure) {
                if (failure) {
                    error.details = "Error: " + failure;
                    if (failure === 401) {
                        error.details += " A CASE framework cannot be imported if it uses API Key authentication.";
                    }
                    me.$store.commit('app/importTransition', 'upload');
                    me.$store.commit('app/addImportError', error.details);
                    me.showModal('error', error);
                } else {
                    me.caseGetServerSide();
                }
            });
        },
        caseGetDocsSuccess: function(result) {
            result = JSON.parse(result);
            let error;
            this.caseDocs = [];
            if (result.CFDocuments == null) {
                error = "No frameworks found. Please check the URL and try again.";
                this.$store.commit('app/addImportError', error);
                me.$store.commit('app/importTransition', 'process');
            } else {
                let message = result.CFDocuments.length + " frameworks detected.";
                this.$store.commit('app/importStatus', message);
                this.$store.commit('app/importTransition', 'serverFrameworksDetected');
                for (var i = 0; i < result.CFDocuments.length; i++) {
                    var doc = result.CFDocuments[i];
                    var obj = {};
                    obj.name = doc.title;
                    obj.id = doc.uri;
                    obj.identifier = doc.identifier;
                    obj.loading = false;
                    obj.success = false;
                    obj.error = false;
                    obj.checked = false;
                    this.caseDocs.push(obj);
                }
                this.caseCancel = false;
            }
        },
        caseGetServerSide: function() {
            var me = this;
            EcRemote.getExpectingString(this.repo.selectedServer, "ims/case/getDocs?url=" + this.importServerUrl, function(success) {
                me.caseGetDocsSuccess(success);
            }, function(failure) {
                me.$store.commit('app/importTransition', 'process');
                me.$store.commit('app/addImportError', "No frameworks found. Please check the URL and try again.");
            });
        },
        importCase: function(dataArray) {
            if (dataArray) {
                // User has clicked cancel on this import item
                var firstIndex = dataArray[1];
                this.caseDocs[firstIndex].loading = false;
                this.caseDocs[firstIndex].error = true;
            }
            for (var i = this.caseDocs.length - 1; i >= 0; i--) {
                if (!this.caseDocs[i].checked) {
                    this.caseDocs.splice(i, 1);
                } else if (this.caseDocs[i].success === false && this.caseDocs[i].error === false) {
                    this.caseDocs[i].loading = true;
                }
            }
            if (!this.caseCancel) {
                let lis = 0;
                let firstIndex = null;
                for (var i = 0; i < this.caseDocs.length; i++) {
                    if (this.caseDocs[i].loading === true) {
                        lis++;
                        if (firstIndex == null) {
                            firstIndex = i;
                        }
                    }
                }
                if (lis === 0) {
                    this.$store.commit('app/importFramework', this.$store.getters['editor/framework']);
                    this.importSuccess();
                    this.$store.commit('app/importStatus', "Import finished.");
                } else {
                    var me = this;
                    var id = this.caseDocs[firstIndex].id;
                    me.repo.search("(@id:\"" + id + "\") AND (@type:Framework)", function() {}, function(frameworks) {
                        appLog(frameworks);
                        if (frameworks.length > 0) {
                            me.$store.commit('app/importStatus', 'framework found...');
                            me.showModal('duplicateOverwriteOnly', [[me.caseDocs[firstIndex], firstIndex], frameworks[0]]);
                        } else {
                            me.$store.commit('app/importStatus', 'no match, saving new framework...');
                            me.continueCaseImport([me.caseDocs[firstIndex], firstIndex]);
                        } /* TO DO - ERROR HANDLING HERE */
                    }, function(error) {
                        me.$store.commit('app/importStatus', error);
                        me.$store.commit('app/importTransition', 'process');
                        me.$store.commit('app/addImportError', error);
                    });
                }
            }// if not canceled
        },
        continueCaseImport: function(dataArray) {
            var data = dataArray[0];
            var firstIndex = dataArray[1];
            var me = this;
            var id = data.id;
            var uuid = data.identifier;
            var identity = EcIdentityManager.default.ids[0];
            var formData = new FormData();
            if (identity != null) { formData.append('owner', identity.ppk.toPk().toPem()); }
            EcRemote.postInner(this.repo.selectedServer, "ims/case/harvest?caseEndpoint=" + this.importServerUrl + "&dId=" + uuid, formData, null, function(success) {
                me.caseDocs[firstIndex].loading = false;
                me.caseDocs[firstIndex].success = true;
                appLog(id);
                EcFramework.get(id, function(f) {
                    // me.$store.commit('app/importFramework', f);
                    // Preserve the framework so we can set it as importFramework when they're all done
                    me.$store.commit('editor/framework', f);
                    me.spitEvent("importFinished", f.shortId(), "importPage");
                    me.importCase();
                }, function(error) {
                    appError(error);
                    me.importCase();
                });
            }, function(failure) {
                me.caseDocs[firstIndex].loading = false;
                me.caseDocs[firstIndex].error = true;
                me.importCase();
            });
        },
        cancelCase: function() {
            this.caseCancel = true;
            var first = null;
            for (var i = 0; i < this.caseDocs.length; i++) {
                if (this.caseDocs[i].loading === true) {
                    if (first == null) {
                        first = i;
                    } else {
                        this.caseDocs[i].loading = false;
                        this.caseDocs[i].error = true;
                    }
                }
            }
            this.clearImport();
            this.$store.commit('app/importTransition', 'upload');
        },
        goBack: function() {
            let me = this;
            if (this.directoryThatsOpen && this.directoryThatsOpen.parentDirectory) {
                EcRepository.get(this.directoryThatsOpen.parentDirectory, function(success) {
                    me.openDirectory(success);
                }, function(error) {
                    appError(error);
                    me.directoryThatsOpen = null;
                    me.cassSearchEndpoint();
                });
            } else {
                this.directoryThatsOpen = null;
                this.cassSearchEndpoint();
            }
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
    watch: {
        importServerUrl: function(val) {
            this.caseDocs = [];
        },
        searchTerm: function(val) {
            this.cassSearchEndpoint();
        },
        selectDirectory: function() {
            if (this.selectDirectory === "all") {
                this.selectDirectory = null;
                this.directoryThatsOpen = null;
                this.cassSearchEndpoint();
            } else {
                this.openDirectory(this.selectDirectory);
                this.directoryTrail.splice(0, this.directoryTrail.length);
                this.findDirectoryTrail(this.selectDirectory);
            }
        },
        selectedFrameworks: function() {
            for (let each in this.cassFrameworks) {
                if (EcArray.has(this.selectedFrameworks, this.cassFrameworks[each].id)) {
                    this.cassFrameworks[each].checked = true;
                } else {
                    this.cassFrameworks[each].checked = false;
                }
            }
        },
        cassFrameworks: function() {
            this.selectedFrameworks.splice(0, this.selectedFrameworks.length);
        }
    }
};
</script>

<style>
.cass__import--cass {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
}
.cass__import--directories {
    width: 100%;
    padding: 1rem 0rem;

}
.cass__import--frameworks {
    width: 100%;
    padding: 1rem 0rem;
}
.cass__import--cass--list {
    height: 200px;
    overflow-y: auto;
    border-radius: 10px;
    padding: 0rem;
    margin-bottom: 1rem;
    cursor: pointer;
}

.cass__import--cass--list-item {
    padding: .5rem 1rem;
}
.cass__import--cass--list-item:hover {
    background-color: rgba(0, 0, 0, .25);
    padding: .5rem 1rem;
}

@media only screen and (max-width: 600px) {
  .cass__import--directories,
  .cass__import--frameworks {
    width: 100%;
  }
}
</style>