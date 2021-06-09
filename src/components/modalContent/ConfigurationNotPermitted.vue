<template>
    <modal-template
        :active="true"
        size="small"
        type="danger"
        @close="$emit('close')">
        <template slot="modal-header">
            Not permitted
        </template>
        <template slot="modal-body">
            <h3 class="title is-size-4 has-text-weight-bold">
                Log in to access
            </h3>
            <p>
                This configuration has default owners and readers defined. You must be logged in to apply this configuration.
            </p>
        </template>
        <template slot="modal-foot">
            <div class="buttons is-spaced">
                <button
                    class="button is-dark is-outlined"
                    @click="$emit('cancel')">
                    OK
                </button>
                <button
                    class="button is-outlined is-danger"
                    @click="$router.push('login')">
                    Login
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
    name: 'ConfigurationNotPermitted',
    components: {
        ModalTemplate
    },
    data() {
        return {
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