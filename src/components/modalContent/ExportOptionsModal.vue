<template>
    <modal-template
        type="primary"
        @close="closeModal"
        size="small"
        :active="true">
        <template slot="modal-header">
            {{ title || 'Export' }}
        </template>
        <template slot="modal-body">
            <section>
                <div
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
        </template>
        <template slot="modal-foot">
            <button
                class="button is-outlined is-dark"
                @click="closeModal">
                <span>
                    Cancel
                </span>
                <span class="icon">
                    <i class="fa fa-times-circle" />
                </span>
            </button>
            <button
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
        </template>
    </modal-template>
</template>
<script>
import ModalTemplate from './ModalTemplate.vue';
import competencyEdits from '@/mixins/competencyEdits.js';
export default {
    name: 'ExportOptionsModal',
    mixins: [competencyEdits],
    props: {
        exportOptions: {
            default: function() { return {}; },
            type: Object
        },
        title: {
            type: String,
            default: ''
        }
    },
    components: {
        ModalTemplate
    },
    data() {
        return {
            selectedExportOption: ''
        };
    },
    computed: {
        obj() {
            return this.$store.getters['editor/itemToExport'];
        }
    },
    mounted() {
    },
    methods: {
        confirm() {
            this.exportObject();
        },
        closeModal() {
            this.$store.commit('app/closeModal');
        },

        exportObject: function() {
            var thing = EcRepository.getBlocking(this.obj["@id"]);
            this.$emit('export-object', thing, this.selectedExportOption);
        }
    }
};
</script>