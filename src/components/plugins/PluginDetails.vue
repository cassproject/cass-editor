<template>
    <div>
        <!-- ************************************** Content ************************************************ -->
        <div class="columns">
            <div class="column is-3">
                <nav :class="panelClass">
                    <p class="panel-heading">
                        Actions
                    </p>
                    <div
                        class="panel-block"
                        v-if="readOnly">
                        <div class="buttons is-fullwidth is-right">
                            <div
                                class="button is-outlined is-primary"
                                @click="$emit('back')">
                                <span class="icon">
                                    <i class="fa fa-arrow-left" />
                                </span>
                                <span>back</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="panel-block"
                        v-if="!readOnly">
                        <div
                            class="button is-fullwidth is-outlined is-dark"
                            @click="$emit('cancel')">
                            <span class="icon">
                                <i class="fa fa-arrow-left" />
                            </span>
                            <span>cancel</span>
                        </div>
                    </div>
                    <div
                        class="panel-block"
                        v-if="!readOnly">
                        <div
                            class="button is-fullwidth is-outlined is-primary"
                            @click="validateCurrentPluginAndEmitSave">
                            <span class="icon">
                                <i class="fa fa-save" />
                            </span><span>save plugin</span>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="column is-9">
                <div class="section box px-4 py-4">
                    <h3 class="is-size-3 title">
                        Plugin details
                    </h3>
                    <div class="field">
                        <label class="label">Location: </label>
                        <div v-if="readOnly">
                            {{ plugin.url }}
                        </div>
                        <div
                            class="control"
                            v-if="!readOnly">
                            <input
                                class="input"
                                type="url"
                                v-model="plugin.url">
                        </div>
                    </div>
                    <!-- ************************************** Validation ************************************************ -->
                    <div
                        class="errorColor"
                        v-if="pluginInvalid">
                        <p>Plugin is invalid:</p>
                        <p v-if="pluginUrlInvalid">
                            *A valid URL is required for a plugin
                        </p>
                    </div>
                </div>
                <div class="section box px-4 py-4">
                    <h3 class="is-size-3 title">
                        Manifest information
                    </h3>
                    <div class="field">
                        <div v-if="manifestRequestBusy">
                            <span class="icon is-large has-text-center has-text-link">
                                <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                            </span>
                        </div>
                        <div v-if="!manifestRequestBusy">
                            <div
                                class="manifestNotLoaded"
                                v-if="!manifestLoaded">
                                <p><i class="fa fa-exclamation-triangle is-primary" /> Manifest data not loaded</p>
                                <br>
                                <div class="buttons is-fullwidth is-left">
                                    <div
                                        class="button is-outlined is-primary"
                                        @click="loadManifestData">
                                        <span class="icon">
                                            <i class="fa fa-sync-alt" />
                                        </span>
                                        <span>load manifest data</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="manifestLoaded">
                                <div v-if="manifestError">
                                    <p class="errorColor">
                                        <i class="fa fa-exclamation-triangle is-primary" /> Manifest load error: {{ manifestData.error }}
                                    </p>
                                    <br>
                                    <div class="buttons is-fullwidth is-left">
                                        <div
                                            class="button is-outlined is-primary"
                                            @click="loadManifestData">
                                            <span class="icon">
                                                <i class="fa fa-sync-alt" />
                                            </span>
                                            <span>retry</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    v-if="!manifestError"
                                    class="columns is-centered is-multiline">
                                    <div class="column is-4">
                                        <div class="field">
                                            <label class="label">Name: </label>
                                            <div>
                                                {{ manifestData.name }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-8">
                                        <div class="field">
                                            <label class="label">Scope: </label>
                                            <div>
                                                {{ manifestData.scope }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-12">
                                        <div class="field">
                                            <label class="label">Shortcuts: </label>
                                            <div>
                                                <table class="table is-hoverable is-fullwidth">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                name
                                                            </th>
                                                            <th>
                                                                location
                                                            </th>
                                                            <th>
                                                                category/screen
                                                            </th>
                                                            <th>
                                                                url
                                                            </th>
                                                            <th>
                                                                query params
                                                            </th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr
                                                            v-for="(mds, idx) in manifestData.shortcuts"
                                                            :key="idx">
                                                            <td>
                                                                <b>{{ mds.launchName }}</b>
                                                            </td>
                                                            <td>
                                                                {{ mds.launchLocation }}
                                                            </td>
                                                            <td>
                                                                {{ mds.launchCategory }}
                                                            </td>
                                                            <td>
                                                                {{ mds.launchUrl }}
                                                            </td>
                                                            <td>
                                                                <ul>
                                                                    <li
                                                                        v-for="qp in mds.queryParams"
                                                                        :key="qp">
                                                                        {{ qp.name }}={{ qp.value }}
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {pluginUtil} from '../../mixins/pluginUtil';

export default {
    mixins: [pluginUtil],
    name: 'PluginDetails',
    props: {
        plugin: {
            type: Object
        },
        readOnly: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            panelClass: 'panel',
            manifestLoaded: false,
            manifestError: false,
            manifestRequestBusy: false,
            manifestData: {},
            pluginInvalid: false,
            pluginUrlInvalid: false
        };
    },
    methods: {
        loadManifestDataComplete() {
            this.manifestData = this.pluginManifestData[this.plugin.url];
            if (!this.manifestData.loaded) this.manifestError = true;
            this.manifestLoaded = true;
            this.manifestRequestBusy = false;
        },
        loadManifestData() {
            if (this.isValidUrl(this.plugin.url)) {
                this.manifestRequestBusy = true;
                let pluginUrls = [];
                pluginUrls.push(this.plugin.url);
                this.loadManifestDataForPluginUrlList(pluginUrls, this.loadManifestDataComplete);
            } else {
                appLog('invalid URL');
            }
        },
        validatePluginFields() {
            if (!this.isValidUrl(this.plugin.url)) {
                this.pluginInvalid = true;
                this.pluginUrlInvalid = true;
            }
        },
        validateCurrentPluginAndEmitSave() {
            this.pluginInvalid = false;
            this.pluginUrlInvalid = false;
            this.validatePluginFields();
            if (!this.pluginInvalid) {
                this.$emit('save');
            }
        }
    },
    computed: {
    },
    mounted: function() {
    }
};
</script>

<style lang="scss" scoped>
    .panel {
        top: 16px;
        position: sticky;
    }
    h3 {
        font-size: 2rem;
        padding-bottom: 1rem;
    }
    h4 {
        font-size: 1.6rem;
        padding-bottom: 1rem;
    }
    h5 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
    .listHdr {
        font-weight: bold;
    }
    .selectBox {
        min-height: 20rem;
        max-height: 20rem;
        overflow: auto;
    }
    .manifestNotLoaded {
        font-size: .9rem;
    }
    .errorColor {
        color: #D74C44;
    }
</style>

