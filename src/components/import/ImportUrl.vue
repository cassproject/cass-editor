<template>
    <div
        id="import-from-url"
        class="columns">
        <div class="column is-12">
            <div class="section">
                <slot name="import-url-title">
                    <p>No import type selected</p>
                </slot>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <ImportTabs />
                    </div>
                    <div class="column is-12">
                        <!-- url input -->
                        <div
                            class="section has-text-centered"
                            v-if="importTransition === 'importingFromUrl'">
                            <span class="icon is-large">
                                <i class="fa fa-spinner fa-pulse fa-2x" />
                            </span>
                        </div>
                        <template v-if="importTransition === 'upload'">
                            <div class="field">
                                <label class="label">
                                    Paste URL of document
                                </label>
                                <div class="field is-grouped">
                                    <div class="control is-expanded">
                                        <input
                                            class="input"
                                            v-model="importUrl"
                                            type="url">
                                    </div>
                                    <div class="control">
                                        <div
                                            class="button is-outlined is-primary"
                                            @click="importFromUrl">
                                            <span class="file-icon">
                                                <i class="fas fa-upload" />
                                            </span>
                                            <span>
                                                Import
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns is-multiline">
                                <div class="column is-12">
                                    <h3 class="title is-size-5">
                                        URL Import Examples:
                                    </h3>
                                </div>
                                <div class="column is-narrow">
                                    <div
                                        class="button is-small is-dark"
                                        @click="importUrl='https://www.onetcenter.org/ctdlasn/graph/ce-07c257d6-9119-11e8-b852-782bcb5df6ac'">
                                        O*NET Abilities Competency Framework
                                    </div>
                                </div>
                                <div class="column is-narrow">
                                    <div
                                        class="button is-small is-dark"
                                        @click="importUrl='https://www.onetcenter.org/ctdlasn/graph/ce-07c25f74-9119-11e8-b852-782bcb5df6ac'">
                                        O*NET Basic Skills Competency Framework
                                    </div>
                                </div>
                                <div class="column is-narrow">
                                    <div
                                        class="button is-small is-dark"
                                        @click="importUrl='https://www.onetcenter.org/ctdlasn/graph/ce-07c264d7-9119-11e8-b852-782bcb5df6ac'">
                                        O*NET Cross-Functional Skills Competency Framework
                                    </div>
                                </div>
                                <div class="column is-narrow">
                                    <div
                                        class="button is-small is-dark"
                                        @click="importUrl='https://www.onetcenter.org/ctdlasn/graph/ce-07c27a0f-9119-11e8-b852-782bcb5df6ac'">
                                        O*NET Knowledge Competency Framework
                                    </div>
                                </div>
                                <div class="column is-narrow">
                                    <div
                                        class="button is-small is-dark"
                                        @click="importUrl='https://www.onetcenter.org/ctdlasn/graph/ce-9fab4187-d8e7-11e9-8250-782bcb5df6ac'">
                                        O*NET Technology Skills Competency Framework
                                    </div>
                                </div>
                            </div>
                        </template>
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
                            <div class="section">
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
                        </div>
                    </div>
                    <div class="column is-12">
                        <slot name="import-framework" />
                    </div>
                </div>
            </div>
        </div>
        <RightAside :allowClose="false">
            <template slot="right-aside-content">
                <div class="section">
                    <h2 class="title is-size-4">
                        Import From URL Source
                    </h2>
                    <!--v-else-if="importType=='url' && !conceptMode">-->
                    <p class="is-size-6">
                        If you know the URL of a CTDL-ASN JSON-LD graph, you can import published frameworks by URL.
                    </p>
                    <br>
                    <ul class="cat__bullet-list is-size-6">
                        <li>
                            This import maintains the URLs of the original frameworks and changes both the format and schema used to store the CTDL-ASN frameworks in CaSS, but does not change any of the data.
                        </li>
                        <li>
                            If you wish to edit the framework after importing by URL, please be sure you are signed in.
                        </li>
                        <li>
                            <b>Please note that the Technology Skills framework in the URL Import Examples is very large and will take a long time to import.</b>
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
    name: 'ImportUrl',
    components: {
        ImportTabs,
        RightAside
    },
    mixins: [ imports, common ],
    data() {
        return {
            importType: 'url',
            importErrors: [],
            importUrl: '',
            repo: window.repo
        };
    },
    props: {
        importTransition: {
            type: String,
            default: ''
        }
    },
    methods: {
    },
    watch: {
    }
};
</script>