<template>
    <modal-template
        :active="true"
        size="small"
        content="delete-configuration"
        type="danger"
        @close="$store.commit('app/closeModal')">
        <template slot="modal-header">
            Framework Configuration
        </template>
        <template slot="modal-body">
            <confuration-list />
        </template>
        <template slot="modal-foot">
            <div class="buttons is-spaced">
                <button
                    class="button is-outlined is-danger"
                    @click="$emit('cancel')">
                    Cancel
                </button>
                <button
                    class="button is-dark"
                    @click="$emit('confirm')">
                    Confirm Change
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';
import ConfigurationList from '@/components/ConfigurationList.vue';

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
    }
};
</script>

<style lang="scss">

</style>