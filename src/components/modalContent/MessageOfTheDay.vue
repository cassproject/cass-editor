<template>
    <modal-template
        @close="$emit('close')"
        :active="true"
        type="primary">
        <template #modal-header>
            <span class="title has-text-white">{{ useAppStore().motdTitle || "Message of the Day" }}</span>
        </template>
        <template
            #modal-body>
            <div class="section has-background-white has-text-centered">
                <p>
                    {{ useAppStore().motdMessage }}
                </p>
            </div>
        </template>
        <template #modal-foot>
            <div
                class="buttons is-spaced">
                <button
                    class="button is-primary is-outlined"
                    @click="close">
                    <span>Confirm</span>
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';
import {useAppStore} from '@/stores/app';
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
            useAppStore().closeModal();
        }
    }
};
</script>


<style lang="scss">

</style>