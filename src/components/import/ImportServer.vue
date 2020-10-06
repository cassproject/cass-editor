<template>
    <div
        id="import-from-server"
        class="columns">
        <div class="column is-9">
            <div class="section">
                <slot name="import-server-title">
                    <p>Nothing send from import.vue</p>
                </slot>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <ImportTabs />
                    </div>
                    <div class="column is-12">
                        <!-- server input -->
                        <div
                            class="remote-server">
                            <h3 class="title is-size-3 has-text-weight-medium">
                                Import from remote server
                            </h3>
                            <template v-if="importTransition === 'upload'">
                                <div
                                    v-for="item in serverDetails"
                                    :key="item"
                                    class="field">
                                    <label class="label">
                                        {{ item.label }}
                                    </label>
                                    <div class="field is-grouped">
                                        <div class="control is-expanded">
                                            <input
                                                class="input"
                                                v-model="importServerUrl"
                                                type="url">
                                        </div>
                                        <div class="control">
                                            <div
                                                class="button is-pulled-right is-outlined is-primary"
                                                @click="$store.commit('app/importTransition', 'connectToServer')">
                                                <span class="icon">
                                                    <i class="fas fa-network-wired" />
                                                </span>
                                                <span>
                                                    connect
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-multiline">
                                    <div class="column is-12">
                                        <h3 class="title is-size-4">
                                            Remote Server Examples:
                                        </h3>
                                    </div>
                                    <div class="column is-12">
                                        <div
                                            class="button is-dark is-small"
                                            @click="importServerUrl='https://opensalt.net'">
                                            OpenSalt.net
                                        </div>
                                    </div>
                                </div>
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
                        <slot name="import-framework">
                            No framework
                        </slot>
                    </div>
                </div>
            </div>
        </div>
        <!-- list description for right panel -->
        <div
            class="column is-3 import-information">
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
        </div>
    </div>
</template>

<script>
import ImportTabs from '@/components/import/ImportTabs';
import imports from '@/mixins/import.js';
import common from '@/mixins/common.js';

export default {
    name: 'ImportServer',
    components: {
        ImportTabs
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
        }
    },
    watch: {
        importServerUrl: function(val) {
            this.caseDocs = [];
        }
    }
};
</script>