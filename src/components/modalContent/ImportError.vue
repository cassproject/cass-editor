<template>
    <modal-template
        :active="true"
        @close="closeModal">
        <template #modal-header>
            {{ importModalParams.title }}
        </template>
        <template #modal-body>
            <section>
                {{ importModalParams.text }}
            </section>
        </template>
        <template #modal-foot>
            <button
                @click="closeModal"
                class="is-dark button">
                Cancel
            </button>
        </template>
    </modal-template>
</template>
<script>
import ModalTemplate from './ModalTemplate.vue';
import { useAppStore } from '@/stores/app';
export default {
    name: 'ImportError',
    components: {
        ModalTemplate
    },
    computed: {
        showImportInfoModal: {
            get() {
                return useAppStore().showImportInfoModal;
            },
            set(val) {
                useAppStore().setShowImportInfoModal(val);
            }
        },
        importModalParams: {
            get() {
                return useAppStore().importModalParams;
            },
            set(val) {
                useAppStore().setImportModalParams(val);
            }
        }
    },
    methods: {
        closeModal: function() {
            this.importModalParams = null;
            useAppStore().closeModal();
        }
    }
};
</script>