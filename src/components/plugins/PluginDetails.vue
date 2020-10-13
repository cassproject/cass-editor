<template>
    <div>
        <!-- ************************************** Content ************************************************ -->
        <div class="columns">
            <div class="column is-3">
                <nav :class="panelClass">
                    <a
                        class="panel-block"
                        v-if="readOnly">
                        <div class="buttons is-fullwidth is-right">
                            <div
                                class="button is-outlined is-primary"
                                @click="$emit('back')">
                                back
                            </div>
                        </div>
                    </a>
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
                            class="button is-fullwidth  is-outlined is-primary"
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
                        <label class="label">Name: </label>
                        <div v-if="readOnly">
                            {{ plugin.name }}
                        </div>
                        <div
                            class="control"
                            v-if="!readOnly">
                            <input
                                class="input"
                                type="text"
                                v-model="plugin.name">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description: </label>
                        <div v-if="readOnly">
                            {{ plugin.description }}
                        </div>
                        <div
                            class="control"
                            v-if="!readOnly">
                            <input
                                class="input"
                                type="text"
                                v-model="plugin.description">
                        </div>
                    </div>
                </div>
                <!-- ************************************** Validation ************************************************ -->
                <!--
                <div v-if="groupInvalid">
                    <p>User Group is invalid:</p>
                    <p v-if="groupNameInvalid">
                        *User group name is required
                    </p>
                    <p v-if="groupDescriptionInvalid">
                        *User group description is required
                    </p>
                </div>
                -->
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
            panelClass: 'panel'
        };
    },
    methods: {
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
</style>

