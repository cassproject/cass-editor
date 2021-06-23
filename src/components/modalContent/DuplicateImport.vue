<template>
    <modal-template
        :active="true"
        @close="closeImportModal">
        <template slot="modal-header">
            {{ importModalParams.title }}
        </template>
        <template slot="modal-body">
            <section>
                {{ importModalParams.text }}
                <section
                    v-if="importModalParams.options"
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
                                        v-for="(option, index) in importModalParams.options"
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
                    <div v-if="invalidName">
                        The name you chose is already in the system. Please try a different name.
                    </div>
                </section>
            </section>
        </template>
        <template slot="modal-foot">
            <button
                @click="clickConfirmFromImportModal"
                :disabled="confirmDisabledModal"
                class="is-danger is-outlined button">
                Confirm
            </button>
            <button
                @click="closeImportModal"
                class="is-dark button">
                Cancel
            </button>
        </template>
    </modal-template>
</template>
<script>
import ModalTemplate from './ModalTemplate.vue';
export default {
    name: 'DuplicateImport',
    components: {
        ModalTemplate
    },
    data() {
        return {
            newName: '',
            invalidName: false,
            selectedOption: ''
        };
    },
    computed: {
        confirmDisabledModal: function() {
            if (this.importModalParams.type === 'duplicate') {
                if (this.importModalParams.options.length > 0 && this.selectedOption === "") {
                    return true;
                } else {
                    if (this.selectedOption === 'Save import as a new framework' && this.newName === '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return false;
        },
        importModalParams: {
            get() {
                return this.$store.getters['app/importModalParams'];
            },
            set(val) {
                this.$store.commit('app/importModalParams', val);
            }
        }
    },
    methods: {
        clickConfirmFromImportModal: function() {
            let me = this;
            if (this.newName) {
                if (this.newName === this.importModalParams.currentName) {
                    this.invalidName = true;
                } else {
                    let uuid = new UUID(3, "nil", this.newName).format();
                    let f = new EcFramework();
                    if (me.queryParams && me.queryParams.newObjectEndpoint) {
                        f.id = me.queryParams.newObjectEndpoint + uuid;
                    } else {
                        f.assignId(window.repo.selectedServer, uuid);
                    }
                    window.repo.search("(@id:\"" + f.shortId() + "\") AND (@type:Framework)", function() {}, function(frameworks) {
                        if (frameworks.length > 0) {
                            me.invalidName = true;
                        } else {
                            me.importModalParams.onConfirm(me.newName);
                            me.resetImportModal();
                        }
                    }, function(error) {
                        appError(error);
                        me.resetImportModal();
                    });
                }
            } else if (this.importModalParams.options && this.importModalParams.type !== "duplicate") {
                this.importModalParams.onConfirm(this.selectedOption);
                this.resetImportModal();
            } else {
                this.importModalParams.onConfirm();
                this.resetImportModal();
            }
        },
        resetImportModal: function() {
            this.importModalParams = null;
            this.$store.commit('app/closeModal');
        },
        closeImportModal: function() {
            if (!this.importModalParams.onConfirm) {
                return this.resetImportModal();
            }
            this.importModalParams.onCancel();
            this.importModalParams = null;
            this.$store.commit('app/closeModal');
        }
    }
};
</script>