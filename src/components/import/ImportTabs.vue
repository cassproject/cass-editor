<!--ImportTabs.vue
    Displays options for importing a framework
    Components:
        DragAndDrop.vue
        Container which accepts drag and dropped files
-->
<template>
    <!-- import drop area and tabs -->
    <div
        id="import-bottom-section"
        class="container is-fluid">
        <!-- types of import for tabs -->
        <div
            v-if="!importFramework || (importFramework && importType === 'text')"
            class="pt-4">
            <div class="tile is-vertical">
                <div class="section is-medium">
                    <!-- columns for tabs -->
                    <div class="columns is-multiline is-mobile">
                        <!-- file -->
                        <div class="column">
                            <div
                                class="import-tab"
                                :class="{ 'is-active-tab': importType === 'file'}">
                                <a @click="$store.commit('app/importType', 'file')">
                                    <i
                                        class="fa fa-2x fa-file has-text-centered is-block"
                                        aria-hidden="true" />
                                    <div class="is-hidden-mobile is-block has-text-centered">
                                        File Import
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- server tab -->
                        <div
                            class="column"
                            v-if="!conceptMode">
                            <div
                                class="import-tab"
                                :class="{ 'is-active-tab': importType === 'server'}">
                                <a @click="$store.commit('app/importType', 'server')">
                                    <i
                                        class="fa fa-2x fa-server is-block has-text-centered"
                                        aria-hidden="true" />
                                    <div class="is-hidden-mobile is-block has-text-centered">
                                        Remote Server
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- text tab -->
                        <div
                            class="column"
                            v-if="!conceptMode">
                            <div
                                class="import-tab"
                                :class="{ 'is-active-tab': importType === 'text'}">
                                <a @click="$store.commit('app/importType', 'text')">
                                    <i
                                        class="fa fa-2x fa-paste has-text-centered is-block"
                                        aria-hidden="true" />
                                    <div class="is-hidden-mobile is-block has-text-centered">
                                        Paste Text
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- url tab -->
                        <div
                            class="column"
                            v-if="!conceptMode">
                            <div
                                class="import-tab"
                                :class="{ 'is-active-tab': importType === 'url'}">
                                <a @click="$store.commit('app/importType', 'url')">
                                    <i
                                        class="fa fa-link has-text-centered is-block fa-2x"
                                        aria-hidden="true" />
                                    <div class="is-hidden-mobile is-block has-text-centered">
                                        URL Source
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- import status messages -->
        <div v-if="importType === 'file'">
            <h2 class="is-size-3">
                Import from file
            </h2>
            <span>Status:
                <span
                    v-if="importTransition === 'upload' && (!importFile || importFile.length === 0) && conceptMode"
                    class="is-size-5 has-text-dark">
                    Upload documents to transform into CaSS {{ queryParams.ceasnDataFields === 'true' ? 'Concept Schemes' : 'Taxonomies' }}.
                </span>
                <span
                    v-else-if="importTransition === 'process'"
                    class="is-size-5 has-text-dark">
                    processing
                </span>
                <span
                    v-else-if="importTransition === 'upload' && (!importFile || importFile.length === 0) "
                    class="is-size-5">
                    Upload documents to transform into CaSS Competency Frameworks.
                </span>
                <span v-else-if="importTransition === 'detail'">
                    <span
                        class="is-size-5">
                        <span class="has-text-success has-text-weight-bold">
                            CaSS has detected a framework!
                        </span>
                        <br><br>
                        Please review the competency framework and file details gathered below. To continue with the input of this competency framework, press Accept Details & Review. To cancel and review or change your input file, press cancel.
                    </span>
                </span>
                <span v-if="importTransition === 'preview'">
                    <span
                        class=" is-size-5 has-text-success has-text-weight-bold"
                        v-if="frameworkSize !== null">
                        Import success, {{ frameworkSize }} competencies ready to edit.
                    </span>
                    <span
                        class=" is-size-5 has-text-success has-text-weight-bold"
                        v-else>
                        Import success, concepts ready to edit.
                    </span>
                </span>
                <span v-if="importTransition === 'light' && importType !== 'text'">
                    <span
                        class="is-size-5">
                        <span class="has-text-success has-text-weight-bold">
                            Your import is complete!
                        </span>
                        <br><br>
                    </span>
                </span>
            </span>
        </div>
        <div v-if="importType === 'server'">
            <h2 class=" is-size-3">
                Import from remote server
            </h2>
            <span>Status:
                <span v-if="importTransition === 'process'">
                    <span
                        class="icon">
                        <i class="fa fa-spinner fa-pulse fa-2x" />
                    </span>
                </span>
                <span v-else-if="importTransition === 'importingCaseFrameworks'">
                    Processing...
                </span>
                <span v-else-if="importTransition === 'upload'">
                    Ready
                </span>
                <span v-else>
                    {{ importStatus }}
                </span>
            </span>
        </div>
        <div
            class=""
            v-if="importType === 'text'">
            <h2 class="is-size-3">
                Import framework from text
            </h2>
            <span>
                Status:
                <span v-if="importTransition === 'upload'">
                    Ready
                </span>
                <span>
                    {{ importStatus }}
                </span>
            </span>
        </div>
        <div v-if="importType === 'url'">
            <h2 class=" is-size-3">
                Import from URL source
            </h2>
            <span>
                <span v-if="importTransition === 'upload'">
                    Ready
                </span>
                <span v-else-if="importTransition === 'light'">
                    Complete
                </span>
                <span v-else-if="importTransition === 'preview'">
                    Processed, ready to edit
                </span>
                <span v-else>
                    {{ importStatus }}
                </span>
            </span>
        </div>
        <h2 v-else />
    </div>
</template>

<script>
import imports from '@/mixins/import.js';

export default {
    name: 'ImportTabs',
    mixins: [ imports ],
    methods: {
        // delete these?
        importCaseDocs: function() {
            this.$emit('importCase', this.caseDocs);
            this.$store.commit('app/importTransition', 'importingCaseFrameworks');
        },
        importFromUrl: function() {
            this.$store.commit('app/importStatus', 'importFromUrl');
            this.$store.commit('app/importTransition', 'importingFromUrl');
        },
        importFromFile: function() {
            // import.vue watches for framework and file to be defined
            this.$store.commit('app/importType', 'file');
            this.$store.commit('app/importFramework', null);
            this.$store.commit('app/importTransition', 'upload');
        }
    },
    computed: {
        conceptMode: function() {
            return this.$store.getters['editor/conceptMode'];
        },
        importErrors: function() {
            return this.$store.getters['app/importErrors'];
        },
        importFile: function() {
            return this.$store.getters['app/importFiles'];
        },
        importTransition: function() {
            return this.$store.getters['app/importTransition'];
        },
        importType: function() {
            return this.$store.getters['app/importType'];
        },
        importFileType: function() {
            return this.$store.getters['app/importFileType'];
        },
        importFramework: function() {
            return this.$store.getters['app/importFramework'];
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        },
        frameworkSize: function() {
            if (this.conceptMode) {
                return null;
            }
            if (this.importFramework && this.importFramework.competency) {
                return this.importFramework.competency.length;
            } else {
                return 0;
            }
        }
    }
};
</script>

<style>
.is-vcentered {
    display: flex;
}

.remote-server {
    min-height: 300px;
}
</style>