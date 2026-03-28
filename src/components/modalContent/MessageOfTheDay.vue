<template>
    <modal-template
        @close="$emit('close')"
        :active="true"
        type="primary">
        <template #modal-header>
            <span class="title has-text-white">{{store.app().motdTitle || "Message of the Day"}}</span>
        </template>
        <template #modal-body>
            <div class="section has-background-white has-text-centered">
                <p>
                    {{store.app().motdMessage}}
                </p>
            </div>
        </template>
        <template #modal-foot>
            <div
                class="buttons is-spaced">
                <button
                    class="button is-primary is-outlined"
                    id="message-of-the-day-confirm-button"
                    @click="close">
                    <span>Confirm</span>
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import store from '@/stores/index.js';
import ModalTemplate from './ModalTemplate.vue';
export default {
    name: 'MessageOfTheDay',
    props: {
        isActive: Boolean
    },
    components: {
        ModalTemplate
    },
    methods: {
        close: function() {
            store.app().setCloseModal();
        }
    }
};
</script>


<style lang="scss">

</style>