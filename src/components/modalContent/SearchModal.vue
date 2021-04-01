<template>
    <modal-template
        @close="closeModal"
        :active="true">
        <template slot="modal-header">
            <p class="modal-card-title">
                <span class="title has-text-white">Search for {{ searchType }}</span>
                <br><span
                    class="subtitle has-text-white"
                    v-if="copyOrLink">
                    {{ frameworkName }}
                </span>
                <span
                    v-else
                    class="subtitle has-text-white">
                    {{ nameOfSelectedCompetency }}
                </span>
            </p>
        </template>
        <template slot="modal-body">
            <search
                :allowShowFrameworks="true" />
        </template>
        <template slot="modal-foot">
            <div class="buttons">
                <button
                    class="button is-outlined is-dark"
                    @click="resetModal();">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span>
                    <span>cancel</span>
                </button>
                <button
                    class="button is-outlined is-primary"
                    v-if="copyOrLink"
                    :disabled="!selectedIds || selectedIds.length === 0"
                    @click="copyCompetencies(selectedIds); resetModal();">
                    <span class="icon">
                        <i class="fa fa-copy" />
                    </span>
                    <span>
                        Copy {{ searchType }}
                    </span>
                </button>
                <button
                    class="button is-outlined is-primary"
                    v-if="copyOrLink"
                    :disabled="!selectedIds || selectedIds.length === 0"
                    @click="appendCompetencies(selectedIds); resetModal();">
                    <span class="icon">
                        <i class="fa fa-link" />
                    </span>
                    <span>
                        Link {{ searchType }}
                    </span>
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';
import Search from '@/components/framework/Search.vue';
import common from '@/mixins/common.js';
import {mapState} from 'vuex';

export default {
    name: 'SearchModal',
    data() {
        return {
            selectedIds: []
        };
    },
    components: {
        ModalTemplate,
        Search
    },
    mixins: [common],
    computed: {
        ...mapState({
            selectedCompetency: state => state.editor.selectedCompetency,
            framework: state => state.editor.framework
        }),
        nameOfSelectedCompetency: function() {
            if (this.selectedCompetency && this.selectedCompetency.name) {
                return this.selectedCompetency.getName();
            } else if (this.selectedCompetency) {
                return Thing.getDisplayStringFrom(this.selectedCompetency["skos:prefLabel"]);
            } else {
                return '';
            }
        },
        copyOrLink: function() {
            return this.$store.state.lode.copyOrLink;
        },
        searchType: function() {
            return this.$store.state.lode.searchType;
        }
    },
    methods: {
        resetModal: function() {
            this.$store.commit('app/closeModal');
            this.selectedIds = [];
        },
        frameworkName: function() {
            if (this.framework) {
                return this.framework.getName();
            } else {
                return '';
            }
        },
        closeModal: function() {
            this.$store.commit('app/closeModal');
        }
    }
};
</script>