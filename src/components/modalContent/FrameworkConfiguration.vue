<template>
    <modal-template
        :active="true"
        size="small"
        content="deleteConfiguration"
        type="primary"
        @close="$store.commit('app/closeModal')">
        <template slot="modal-header">
            Framework Configuration
        </template>
        <template slot="modal-body">
            <div class="p-4">
                <configuration-list view="modal" />
            </div>
        </template>
        <template slot="modal-foot">
            <div class="buttons is-spaced">
                <button
                    class="button is-primary"
                    @click="$store.commit('app/closeModal')">
                    Done
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';
import ConfigurationList from '@/views/configuration/components/ConfigurationList.vue';

import {cassUtil} from '../../mixins/cassUtil';
import common from '@/mixins/common.js';

export default {
    mixins: [cassUtil, common],
    name: 'FrameworkConfiguration',
    components: {
        ModalTemplate,
        ConfigurationList
    },
    data() {
        return {
            typedInName: '',
            loggedInPersonEcPk: {},
            commentToSave: {},
            commentIsBusy: false,
            numDirectories: 1,
            repo: window.repo
        };
    },
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    methods: {
    },
    updated() {
    },
    mounted() {
    }
};
</script>

<style lang="scss">

</style>