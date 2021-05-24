<template>
    <modal-template
        type="info"
        @close="closeModal"
        size="small"
        :active="true">
        <template slot="modal-header">
            Required Property
        </template>
        <template slot="modal-body">
            <section>
                <b>This action cannot be completed</b>
                This property is required.  Please modify your configuration or
                contact an administrator to request a configuration that does
                not require this property.
            </section>
        </template>
        <template slot="modal-foot">
            <button
                @click="closeModal()"
                class="is-dark button">
                Ok
            </button>
        </template>
    </modal-template>
</template>
<script>
import ModalTemplate from './ModalTemplate.vue';
export default {
    name: 'RequiredPropertyModal',
    components: {
        ModalTemplate
    },
    data() {
        return {
        };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
        closeModal() {
            this.$store.commit('app/closeModal');
        }
    }
};
</script>