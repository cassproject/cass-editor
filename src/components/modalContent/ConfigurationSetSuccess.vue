<template>
    <modal-template
        size="small"
        :active="true"
        type="success"
        @close="$emit('close')">
        <template slot="modal-header">
            <span class="title has-text-white">
                Configuration set as browser default
            </span>
        </template>
        <template slot="modal-body">
            <h3 class="title is-size-4">
                <span class="">Success</span>
            </h3>
            <p>
                {{ name }} has been set as your browser's default CaSS Authoring Tool configuration.
            </p>
        </template>
        <template slot="modal-foot">
            <div class="buttons is-spaced">
                <button
                    class="button is-dark is-outlined"
                    @click="$emit('ok')">
                    Ok
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
    name: 'ConfigurationSetSuccess',
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