<template>
    <div
        class="modal"
        :class="{'is-active': visible}">
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title has-text-dark">
                    {{ title }}
                </p>
                <button
                    class="delete"
                    aria-label="close"
                    @click="hide()" />
            </header>
            <section class="modal-card-body has-text-dark">
                {{ text }}
            </section>
            <section class="modal-card-body has-text-dark">
                <div
                    v-if="type === 'export'"
                    class="field">
                    <div class="control">
                        <div class="select is-primary is-fullwidth">
                            <select v-model="selectedExportOption">
                                <option
                                    value
                                    selected>
                                    Select an export format
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
            <footer class="modal-card-foot">
                <button
                    v-if="type==='export'"
                    class="button is-success"
                    @click="confirm">
                    Export file
                </button>
                <button
                    v-else
                    class="button is-success"
                    @click="confirm">
                    Save changes
                </button>
                <button
                    class="button"
                    @click="hide()">
                    Cancel
                </button>
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
            // adding callback function variable
            onConfirm: {}
        };
    },
    methods: {
        hide() {
            this.visible = false;
        },
        confirm() {
            if (typeof this.onConfirm === 'function') {
                // perform call back and then handle hide
                if (this.type === 'export') {
                    this.onConfirm(this.selectedExportOption);
                } else {
                    this.onConfirm();
                }
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
            // callback
            this.onConfirm = params.onConfirm;
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

<style lang="scss"></style>