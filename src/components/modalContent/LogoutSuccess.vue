<template>
    <modal-template
        @close="$emit('close')"
        :active="true"
        type="primary">
        <template #modal-header>
            <span class="title has-text-white">Logged Out</span>
        </template>
        <template #modal-body>
            <div class="section has-background-white has-text-centered">
                <p>
                    <strong>You have been logged out.</strong>
                </p>
            </div>
        </template>
        <template #modal-foot>
            <div
                class="buttons is-spaced">
                <button
                    class="button is-secondary is-outlined"
                    id="logout-success-close-button"
                    @click="store.app().closeModal()">
                    <span class="icon">
                        <i class="fa fa-times-circle" />
                    </span>
                    <span>close</span>
                </button>
                <button
                    class="button is-primary is-outlined"
                    id="logout-success-login-button"
                    @click="close">
                    <span class="icon">
                        <i class="fa fa-sign-in-alt" />
                    </span>
                    <span>login</span>
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import store from '@/stores/index.js';
import ModalTemplate from './ModalTemplate.vue';
import {cassApi} from '../../mixins/cassApi';
export default {
    name: 'LogoutSuccessModal',
    emits: ["close"],
    setup() {
        return { store };
    },
    mixins: [cassApi],
    props: {
        isActive: Boolean
    },
    components: {
        ModalTemplate
    },
    methods: {
        close: function() {
            store.app().closeModal();
            if (store.featuresEnabled().apiLoginEnabled) {
                this.redirectToExternalLogout();
            } else {
                this.goToLogin();
            }
        }
    }
};
</script>


<style lang="scss">

</style>