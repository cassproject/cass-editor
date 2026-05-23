<template>
    <modal-template
        @close="$emit('close')"
        :active="true"
        type="primary">
        <template #modal-header>
            <span class="title has-text-white">Logged Out</span>
        </template>
        <template
            #modal-body>
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
                    @click="useAppStore().closeModal()">
                    <span class="icon">
                        <i class="fa fa-times-circle" />
                    </span>
                    <span>close</span>
                </button>
                <button
                    class="button is-primary is-outlined"
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
import ModalTemplate from './ModalTemplate.vue';
import {cassApi} from '../../mixins/cassApi';
import { useAppStore } from '@/stores/app';
import { useFeaturesEnabledStore } from '@/stores/featuresEnabled';
export default {
    name: 'LogoutSuccessModal',
    mixins: [cassApi],
    props: {
        isActive: Boolean
    },
    components: {
        ModalTemplate
    },
    methods: {
        close: function() {
            useAppStore().closeModal();
            if (this.useFeaturesEnabledStore().apiLoginEnabled) {
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