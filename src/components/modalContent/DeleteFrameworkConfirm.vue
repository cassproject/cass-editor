<template>
    <modal-template
        type="danger"
        @close="closeModal"
        size="small"
        :active="true">
        <template #modal-header>
            Confirm Delete {{ obj.subType === 'Collection' ? "Collection" : "Framework" }}
        </template>
        <template #modal-body>
            <section>
                <b>
                    Warning! This action is not reversable.
                </b>
            </section>
            <p class="help is-danger">
                This action will delete {{ name }} and all of its contents.
            </p>
        </template>
        <template #modal-foot>
            <button
                @click="deleteItem()"
                class="is-danger is-outlined button">
                Delete {{ obj.subType === 'Collection' ? "Collection" : "Framework" }}
            </button>
            <button
                @click="closeModal()"
                class="is-dark button">
                Cancel
            </button>
        </template>
    </modal-template>
</template>
<script>
import ModalTemplate from './ModalTemplate.vue';
import competencyEdits from '@/mixins/competencyEdits.js';
import {useAppStore} from '@/stores/app';
import {useEditorStore} from '@/stores/editor';
export default {
    name: 'DeleteFrameworkConfirm',
    mixins: [competencyEdits],
    components: {
        ModalTemplate
    },
    data() {
        return {
        };
    },
    computed: {
        obj() {
            return useEditorStore().itemToDelete;
        },
        name() {
            return this.obj.getName();
        }
    },
    mounted() {
    },
    methods: {
        deleteItem() {
            this.deleteObject(this.obj);
            this.closeModal();
            useEditorStore().setItemToDelete({});
        },
        closeModal() {
            useAppStore().closeModal();
            useEditorStore().setItemToDelete({});
        }
    }
};
</script>