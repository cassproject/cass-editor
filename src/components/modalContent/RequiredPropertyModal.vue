<template>
    <modal-template
        type="info"
        @close="closeModal"
        size="small"
        :active="true">
        <template #modal-header>
            Required Property
        </template>
        <template #modal-body>
            <section>
                <b>This action cannot be completed</b>
                This property is required.  Please modify your configuration or
                contact an administrator to request a configuration that does
                not require this property.
            </section>
        </template>
        <template #modal-foot>
            <button
                @click="closeModal()"
                id="required-property-modal-ok-button"
                class="is-dark button">
                Ok
            </button>
        </template>
    </modal-template>
</template>
<script>
import store from '@/stores/index.js';
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
            store.app().setCloseModal();
        }
    }
};
</script>