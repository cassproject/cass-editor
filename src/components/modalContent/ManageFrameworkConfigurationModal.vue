<template>
    <modal-template
        :active="true"
        type="success"
        @close="$emit('close')">
        <template #modal-header>
            Manage configuration
        </template>
        <template #modal-body>
            <p>
                Choose a configuration to apply to this framework below.  You can view and manage details about
                your available configurations in <router-link :to="{path: '/config', query: queryParams}">
                    configuration management
                </router-link>.
            </p>
            <p />
        </template>
        <template #modal-foot>
            <div class="buttons is-spaced">
                <button
                    class="button is-dark is-outlined"
                    id="manage-framework-configuration-modal-done-button"
                    @click="$emit('close')">
                    Done
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import store from '@/stores/index.js';
import ModalTemplate from './ModalTemplate.vue';

import {cassUtil} from '../../mixins/cassUtil';
import common from '@/mixins/common.js';

export default {
    mixins: [cassUtil, common],
    name: 'ManageFrameworkConfigurationModal',
    emits: ["close"],
    components: {
        ModalTemplate
    },
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    computed: {
        queryParams() {
            return store.editor().queryParams;
        }
    }
};
</script>

<style lang="scss">

</style>