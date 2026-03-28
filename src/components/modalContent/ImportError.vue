<template>
    <modal-template
        :active="true"
        @close="closeImportModal">
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
                id="import-error-cancel-button"
                class="is-dark button">
                Cancel
            </button>
        </template>
    </modal-template>
</template>
<script>
import store from '@/stores/index.js';
import ModalTemplate from './ModalTemplate.vue';
export default {
    name: 'ImportError',
    components: {
        ModalTemplate
    },
    computed: {
        showImportInfoModal: {
            get() {
                return store.app().showImportInfoModal;
            },
            set(val) {
                store.app().setShowImportInfoModal(val);
            }
        },
        importModalParams: {
            get() {
                return store.app().importModalParams;
            },
            set(val) {
                store.app().setImportModalParams(val);
            }
        }
    },
    methods: {
        closeModal: function() {
            this.importModalParams = null;
            store.app().setCloseModal();
        }
    }
};
</script>