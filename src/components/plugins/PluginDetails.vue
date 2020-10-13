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
                                <p><i class="fa fa-exclamation-triangle is-primary"/> Manifest data not loaded</p>
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
                                {{manifestData}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
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
            manifestRequestBusy: false,
            manifestData: ''
        };
    },
    methods: {
        loadManifestData() {
            // alert('TODO loadManifestData');
            this.manifestRequestBusy = true;
            let manifestUrl = '';
            if (this.plugin.url.endsWith("/")) manifestUrl = this.plugin.url + "manifest.json";
            else manifestUrl = this.plugin.url + "/manifest.json";
            this.$http.get(manifestUrl).then(
                function(response) {
                    this.manifestData = response.data;
                    this.manifestLoaded = true;
                    this.manifestRequestBusy = false;
                },
                function(error) {
                    this.manifestData = 'ERROR: ' + error.statusText;
                    this.manifestLoaded = true;
                    this.manifestRequestBusy = false;
                }
            );
        },
        // setAllConfigValidationsChecksToValid() {
        //     this.groupInvalid = false;
        //     this.groupNameInvalid = false;
        //     this.groupDescriptionInvalid = false;
        // },
        validateCurrentPluginAndEmitSave() {
            // this.setAllConfigValidationsChecksToValid();
            // this.validateGroupFields();
            // if (!this.groupInvalid) {
            //     this.$emit('save', this.localGroupManagers, this.localGroupUsers);
            // }
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
</style>

