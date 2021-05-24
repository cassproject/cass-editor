<template>
    <modal-template
        :active="true"
        @close="closeImportModal">
        <template slot="modal-header">
            {{ importModalParams.title }}
        </template>
        <template slot="modal-body">
            <section>
                {{ importModalParams.text }}
            </section>
        </template>
        <template slot="modal-foot">
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
export default {
    name: 'ImportError',
    components: {
        ModalTemplate
    },
    computed: {
        showImportInfoModal: {
            get() {
                return this.$store.getters['app/showImportInfoModal'];
            },
            set(val) {
                this.$store.commit('app/showImportInfoModal', val);
            }
        },
        importModalParams: {
            get() {
                return this.$store.getters['app/importModalParams'];
            },
            set(val) {
                this.$store.commit('app/importModalParams', val);
            }
        }
    },
    methods: {
        closeModal: function() {
            this.importModalParams = null;
            this.$store.commit('app/closeModal');
        }
    }
};
</script>