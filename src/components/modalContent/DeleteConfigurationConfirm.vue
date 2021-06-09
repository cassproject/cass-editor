<template>
    <modal-template
        :active="true"
        size="small"
        content="delete-configuration"
        type="danger"
        @close="$store.commit('app/closeModal')">
        <template slot="modal-header">
            Delete Configuration
        </template>
        <template slot="modal-body">
            <h3 class="title is-size-4 has-text-weight-semibold">
                This action is permanent.
            </h3>
            <p>
                You are about to delete the above configuration. <b>This action is unreversable.</b>
                Once the configuration is deleted it will no longer be selectable to set as a browser or application default.
            </p>
        </template>
        <template slot="modal-foot">
            <div class="buttons is-spaced">
                <button
                    class="button is-outlined is-danger"
                    @click="$emit('confirm')">
                    Yes, Delete Configuration
                </button>
                <button
                    class="button is-dark"
                    @click="$emit('cancel')">
                    Cancel
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';

import {cassUtil} from '../../mixins/cassUtil';
import common from '@/mixins/common.js';

export default {
    mixins: [cassUtil, common],
    name: 'DeleteConfigurationConfirm',
    components: {
        ModalTemplate
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