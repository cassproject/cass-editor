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
                                                @click="$store.commit('app/importTransition', 'connectToServer')">
                                                <span class="icon">
                                                    <i class="fas fa-network-wired" />
                                                </span>
                                                <span>
                                                    connect to endpoint
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
                        </div>
                    </div>
                    <div class="column is-12">
                        <slot name="import-framework" />
                    </div>
                </div>
            </div>
        </div>
        <!-- list description for right panel -->
        <RightAside v-if="importInfoVisible">
            <template slot="right-aside-content">
                <div class="section">
                    <h2 class="title is-size-4">
                        Remote Server Import
                    </h2>
                    <!--v-else-if="importType=='server' && !conceptMode"-->
                    <p class="is-size-5">
                        If you know the URL of a IMS CASE Repository, such as OpenSalt, you can import published frameworks from that repository.
                    </p>
                    <br>
                    <ul class="cat__bullet-list">
                        <li class="is-size-6">
                            This import maintains the URLs of the CASE frameworks and changes both the format and schema used to store the CASE frameworks in CaSS, but does not change any of the data.
                        </li>
                        <li class="is-size-6">
                            After entering the endpoint below, you can select which frameworks you would like to import.
                        </li>
                        <li class="is-size-6">
                            If you wish to edit the frameworks after importing, please be sure you are signed in.
                        </li>
                    </ul>
                </div>
            </template>
        </RightAside>
    </div>
</template>

<script>
import ImportTabs from '@/components/import/ImportTabs';
import imports from '@/mixins/import.js';
import common from '@/mixins/common.js';
import RightAside from '@/components/framework/RightAside';
export default {
    name: 'ImportServer',
    components: {
        ImportTabs,
        RightAside
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
            ]
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
        }
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
        connectToServer: function() {
            appLog("connecting to server 1");
            this.caseDocs.splice(0, this.caseDocs.length);
            // To do: add import from CaSS Server
            this.caseDetectEndpoint();
        },
        caseDetectEndpoint: function() {
            var me = this;
            let serverUrl = this.importServerUrl;
            if (!serverUrl.endsWith("/")) {
                serverUrl += "/";
            }
            this.get(serverUrl, "ims/case/v1p0/CFDocuments", {"Accept": "application/json"}, function(success) {
                me.caseGetDocsSuccess(success);
            }, function(failure) {
                me.caseGetServerSide();
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
                            me.showModal('duplicateOverwriteOnly', [me.caseDocs[firstIndex], firstIndex]);
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
            var identity = EcIdentityManager.ids[0];
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
        }
    },
    watch: {
        importServerUrl: function(val) {
            this.caseDocs = [];
        }
    }
};
</script>