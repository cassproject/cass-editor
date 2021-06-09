<template>
    <modal-template
        :active="true"
        type="success"
        @close="$emit('close')">
        <template slot="modal-header">
            Manage configuration
        </template>
        <template slot="modal-body">
            <p>
                Choose a configuration to apply to this framework below.  You can view and manage details about
                your available configurations in <router-link to="/config">
                    configuration management
                </router-link>.
            </p>
            <p />
        </template>
        <template slot="modal-foot">
            <div class="buttons is-spaced">
                <button
                    class="button is-dark is-outlined"
                    @click="$emit('close')">
                    Done
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
    name: 'ManageFrameworkConfigurationModal',
    components: {
        ModalTemplate
    },
    props: {
        name: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">

</style>