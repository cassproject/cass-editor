<template>
    <modal-template
        :active="true"
        size="small"
        type="danger"
        @close="$emit('close')">
        <template #modal-header>
            Not permitted
        </template>
        <template #modal-body>
            <h3 class="title is-size-4 has-text-weight-bold">
                Log in to access
            </h3>
            <p>
                This configuration has default owners and readers defined. You must be logged in to apply this configuration.
            </p>
        </template>
        <template #modal-foot>
            <div class="buttons is-spaced">
                <button
                    class="button is-dark is-outlined"
                    @click="$emit('cancel')"
                    id="configuration-not-permitted-cancel-button">
                    OK
                </button>
                <button
                    class="button is-outlined is-danger"
                    @click="$router.push({name: 'login', query: queryParams})"
                    id="configuration-not-permitted-login-button">
                    Login
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
    name: 'ConfigurationNotPermitted',
    emits: ["close","cancel"],
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