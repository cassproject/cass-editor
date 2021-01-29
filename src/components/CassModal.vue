<template>
    <div
        class="modal is-small"
        id="cass-modal"
        :class="[{'is-active': visible}, type, modalClass]">
        <div class="modal-background" />
        <div class="modal-card">
            <header
                class="modal-card-head"
                :class="modalHeaderBackground">
                <p
                    class="subtitle has-text-weight-bold is-size-3 modal-card-title"
                    :class="modalHeaderFontColor">
                    {{ title }}

                    <button
                        class="delete is-pulled-right"
                        aria-label="close"
                        @click="cancel()" />
                </p>
            </header>
            <div class="modal-card-body has-text-dark">
                {{ text }}
            </div>
            <div
                v-if="details"
                class="modal-card-body has-text-dark">
                {{ details }}
            </div>
            <section
                v-if="type==='export'"
                class="modal-card-body has-text-dark">
                <div
                    v-if="type === 'export'"
                    class="field">
                    <div class="control">
                        <div class="select is-primary is-fullwidth">
                            <select v-model="selectedExportOption">
                                <option
                                    selected
                                    value>
                                    Select an option
                                </option>
                                <option
                                    v-for="(option, index) in exportOptions"
                                    :value="option.value"
                                    :key="index">
                                    {{ option.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            <section
                v-else-if="options"
                class="modal-card-body has-text-dark">
                <div
                    class="field">
                    <div class="control">
                        <div class="select is-primary is-fullwidth">
                            <select v-model="selectedOption">
                                <option
                                    selected
                                    disabled
                                    value="">
                                    Select an option
                                </option>
                                <option
                                    v-for="(option, index) in options"
                                    :value="option"
                                    :key="index">
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <input
                    class="input"
                    placeholder="Enter a new name"
                    v-if="selectedOption==='Save import as a new framework'"
                    v-model="newName">
                <div v-if="invalid">
                    The name you chose is already in the system. Please try a different name.
                </div>
            </section>
            <footer class="modal-card-foot has-background-white">
                <div
                    class="buttons is-right"
                    style="width: 100%;">
                    <button
                        class="button is-outlined is-dark"
                        @click="cancel()">
                        <span>
                            Cancel
                        </span>
                        <span class="icon">
                            <i class="fa fa-times-circle" />
                        </span>
                    </button>
                    <button
                        v-if="type==='export'"
                        class="export-confirm button is-outlined is-info"
                        :disabled="confirmDisabled"
                        @click="confirm">
                        <span>
                            Export file
                        </span>
                        <span class="icon">
                            <i class="fa fa-download" />
                        </span>
                    </button>
                    <button
                        v-if="(type!='export') && (type!='error')"
                        class="confirm button is-outlined"
                        :disabled="confirmDisabled"
                        :class="modalConfirmButton"
                        @click="confirm">
                        <span>
                            Confirm
                        </span>
                        <span
                            class="icon"
                            :class="modalButtonIcons">
                            <i class="fa fa-check-circle" />
                        </span>
                    </button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import Modal from './../plugins/modalPlugin.js';

export default {
    name: 'CassModal',
    props: {
    },
    data() {
        return {
            selectedExportOption: {},
            visible: false,
            exportOptions: [],
            title: '',
            type: '',
            text: '',
            details: '',
            // adding callback function variable
            onConfirm: {},
            options: [],
            selectedOption: "",
            onCancel: {},
            newName: '',
            currentName: '',
            invalid: false
        };
    },
    computed: {
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        confirmDisabled: function() {
            if (this.type === 'duplicate') {
                if (this.options.length > 0 && this.selectedOption === "") {
                    return true;
                } else {
                    if (this.selectedOption === 'Save import as a new framework' && this.newName === '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else if (this.type === 'export') {
                if (this.exportOptions.length > 0 && this.selectedExportOption === "") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        modalButtonIcons: function() {
            let modalClass = '';
            if (this.type === 'removeObject') {
                modalClass = '';
            } else if (this.type === 'deleteObject') {
                modalClass = '';
            } else {
                modalClass = '';
            }
            return modalClass;
        },
        modalClass: function() {
            let modalClass = '';
            if (this.type === 'removeObject') {
                modalClass = 'alert-modal';
            } else if (this.type === 'deleteObject' || this.type === 'duplicate') {
                modalClass = 'warning-modal';
            } else {
                modalClass = '';
            }
            return modalClass;
        },
        modalHeaderFontColor: function() {
            let modalClass = '';
            if (this.type === 'removeObject') {
                modalClass = 'has-text-white';
            } else if (this.type === 'deleteObject') {
                modalClass = 'has-text-white';
            } else {
                modalClass = 'has-text-white';
            }
            return modalClass;
        },
        modalConfirmButton: function() {
            let modalClass = '';
            if (this.type === 'removeObject') {
                modalClass = 'is-warning';
            } else if (this.type === 'deleteObject') {
                modalClass = 'is-danger';
            } else {
                modalClass = 'is-primary';
            }
            return modalClass;
        },
        modalHeaderBackground: function() {
            let modalClass = '';
            if (this.type === 'removeObject') {
                modalClass = 'has-background-primary has-text-white';
            } else if (this.type === 'deleteObject' || this.type === 'error') {
                modalClass = 'has-background-danger';
            } else if (this.type === 'duplicate') {
                modalClass = 'has-background-warning';
            } else {
                modalClass = 'has-background-primary';
            }
            return modalClass;
        }

    },
    methods: {
        hide() {
            this.visible = false;
            this.selectedOption = "";
            this.newName = '';
            this.currentName = '';
            this.invalid = false;
        },
        confirm() {
            var me = this;
            if (typeof this.onConfirm === 'function') {
                // perform call back and then handle hide
                if (this.type === 'export') {
                    this.onConfirm(this.selectedExportOption);
                    this.hide();
                } else if (this.newName) {
                    if (this.newName === this.currentName) {
                        this.invalid = true;
                    } else {
                        var uuid = new UUID(3, "nil", this.newName).format();
                        var f = new EcFramework();
                        if (me.queryParams && me.queryParams.newObjectEndpoint) {
                            f.id = me.queryParams.newObjectEndpoint + uuid;
                        } else {
                            f.assignId(window.repo.selectedServer, uuid);
                        }
                        window.repo.search("(@id:\"" + f.shortId() + "\") AND (@type:Framework)", function() {}, function(frameworks) {
                            if (frameworks.length > 0) {
                                me.invalid = true;
                            } else {
                                me.onConfirm(me.newName);
                                me.hide();
                            }
                        }, function(error) {
                            appError(error);
                            me.hide();
                        });
                    }
                } else if (this.options && this.type !== "duplicate") {
                    this.onConfirm(this.selectedOption);
                    this.hide();
                } else {
                    this.onConfirm();
                    this.hide();
                }
            } else {
                this.hide();
            }
        },
        cancel() {
            if (typeof this.onCancel === 'function') {
                // perform call back and then handle hide
                this.onCancel();
                this.hide();
            } else {
                this.hide();
            }
        },
        show(params) {
            this.type = params.type;
            this.visible = true;
            this.selectedExportOption = params.selectedExportOption;
            this.title = params.title;
            this.text = params.text;
            this.exportOptions = params.exportOptions;
            this.options = params.options;
            this.details = params.details;
            // callback
            this.onConfirm = params.onConfirm;
            this.onCancel = params.onCancel;
            this.currentName = params.currentName;
        },
        setSelectedExportOption: function(e) {
            alert(e.target);
            this.selectedExportOption = e.target.value;
        }
    },
    beforeMount() {
    // listen for events declared in plugin
        Modal.EventBus.$on('show', (params) => {
            this.show(params);
        });
    }
};
</script>

<style lang="scss">
#cass-modal {
    z-index: 50;
}
</style>