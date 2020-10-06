<template>
    <div
        id="import-from-text"
        class="columns">
        <div class="column is-9">
            <div class="section">
                <slot name="import-text-title">
                    <p>No import type selected</p>
                </slot>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <ImportTabs />
                    </div>
                    <div
                        class="column"
                        :class="importText !== '' ? 'is-6' :'is-12'">
                        <!-- text input -->
                        <div
                            class="section">
                            <h3 class="title is-size-3 has-text-weight-medium">
                                Import framework as text
                            </h3>
                            <div class="field">
                                <label class="label">
                                    Framework name
                                </label>
                            </div>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="importFrameworkName"
                                    placeholder="Framework Name">
                            </div>
                            <div class="field">
                                <label class="label">
                                    Paste Text
                                </label>
                                <div class="control">
                                    <textarea
                                        class="textarea"
                                        v-model="importText" />
                                </div>
                            </div>
                            <div class="field">
                                <button
                                    class="button is-pulled-right is-primary is-outlined"
                                    :disabled="!importFrameworkName || !importText || importFrameworkName.trim().length === 0"
                                    @click="$store.commit('app/importStatus', 'parseText')">
                                    Import
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="column is-6">
                        <slot name="import-framework">
                            this is my framework
                        </slot>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="column is-3 import-information">
            <div class="section">
                <h2 class="title is-size-4">
                    Paste Text
                </h2>
                <!--v-else-if="importType=='text' && !conceptMode"-->
                <p class="is-size-6">
                    If you have a list of competency names, you can organize them into a new framework by pasting here.
                </p>
                <br>
                <p class="has-text-weight-bold">
                    Instructions
                </p>
                <ul class="cat__bullet-list is-size-6">
                    <li>
                        Copy and paste from a document or start typing in the text area.
                    </li>
                    <li>
                        List each competency on a separate line.
                    </li>
                    <li>
                        Use spaces to indicate indenture. (1) space indicates one level of indentation in the hierarchy.
                    </li>
                    <li>
                        To the right of the text box, you will see a preview of the hierarchy you are creating and can make any needed adjustments before importing.
                    </li>
                    <li>
                        Once you are done select the import button to complete the immport process and view the framework in the editor.
                    </li>
                </ul>
                <p
                    v-if="importTransition === 'light' && importType !== 'text'"
                    class="is-size-6">
                    <span class="has-text-success has-text-weight-bold">
                        Your import is complete!
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import ImportTabs from '@/components/import/ImportTabs';
import imports from '@/mixins/import.js';
import common from '@/mixins/common.js';

export default {
    name: 'ImportText',
    props: {
    },
    mixins: [ imports, common ],
    data() {
        return {
            importText: ''
        };
    },
    computed: {
        text: function() {
            return this.$store.getters['app/importText'];
        },
        importStatus: function() {
            return this.$store.getters['app/importStatus'];
        },
        importFrameworkName: {
            get: function() {
                return this.$store.getters['app/importFrameworkName'];
            },
            set: function(val) {
                return this.$store.commit('app/importFrameworkName', val);
            }
        },
        importFrameworkDescription: function() {
            return this.$store.getters['app/importFrameworkDescription'];
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        conceptMode: function() {
            return this.$store.getters['editor/conceptMode'];
        },
        importErrors: function() {
            return this.$store.getters['app/importErrors'];
        },
        importFramework: function() {
            return this.$store.getters['app/importFramework'];
        },
        importType: function() {
            return this.$store.getters['app/importType'];
        },
        importTransition: function() {
            return this.$store.getters['app/importTransition'];
        }
    },
    components: {
        ImportTabs
    }
};
</script>