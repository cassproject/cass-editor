<template>
    <modal-template
        @close="closeModal"
        content="search"
        :active="true">
        <template slot="modal-header">
            <p class="modal-card-title">
                <span class="title has-text-white">Search for {{ searchType }}</span>
                <br><span
                    class="subtitle has-text-white"
                    v-if="copyOrLink">
                    <b>Editing framework:</b> {{ frameworkName }}
                </span>
            </p>
        </template>
        <template slot="modal-body">
            <button class="button is-dark is-outlined is-small is-pulled-right">
                <span class="icon">
                    <i class="fa fa-times" />
                </span>
                <span>
                    Clear selection
                </span>
            </button>
            <search
                ref="search"
                @setSelectedIds="selectedIds = $event"
                parent="search-modal"
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
                    @click="copyCompetencies()">
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
        copyOrLink: function() {
            return this.$store.state.lode.copyOrLink;
        },
        searchType: function() {
            return this.$store.state.lode.searchType;
        },
        frameworkName: function() {
            if (this.framework && this.framework.context) {
                return this.framework.getName();
            } else {
                return '';
            }
        }
    },
    methods: {
        copyCompetencies() {
            this.$refs.search.copyCompetencies(this.selectedIds);
            this.$refs.resetModal();
        },
        closeModal: function() {
            this.$store.commit('app/closeModal');
        }
    }
};
</script>

<style scoped lang="scss">
.cass-editor__modal--search {
    .hierarchy-item__buttons {
        display: none !important;
    }
    .lode__type {
        font-size: 1rem;
        color: var(--dark);
    }
}

</style>