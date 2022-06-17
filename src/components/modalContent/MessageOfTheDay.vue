<template>
    <modal-template
        @close="$emit('close')"
        :active="true"
        type="primary">
        <template slot="modal-header">
            <span class="title has-text-white">{{$store.getters['app/motdTitle'] || "Message of the Day"}}</span>
        </template>
        <template
            slot="modal-body">
            <div class="section has-background-white has-text-centered">
                <p>
                    {{$store.getters['app/motdMessage']}}
                </p>
            </div>
        </template>
        <template slot="modal-foot">
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
            this.$store.commit('app/closeModal');
        }
    }
};
</script>


<style lang="scss">

</style>