<template>
    <modal-template
        type="danger"
        @close="closeModal"
        size="small"
        :active="true">
        <template #modal-header>
            Confirm Delete Level
        </template>
        <template #modal-body>
            <section>
                <b>
                    Warning! This action deletes all instances of this level.
                </b>
            </section>
            <p class="help is-danger">
                This action will remove the level from <b>{{ numFrameworks }}</b> frameworks.
            </p>
        </template>
        <template #modal-foot>
            <button
                @click="deleteItem()"
                class="is-danger is-outlined button">
                Delete Level
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
import { useAppStore } from '@/stores/app';
import { useEditorStore } from '@/stores/editor';
export default {
    name: 'DeleteLevelConfirm',
    mixins: [competencyEdits],
    components: {
        ModalTemplate
    },
    data() {
        return {
            numFrameworks: 0
        };
    },
    computed: {
        obj() {
            return useEditorStore().itemToDelete;
        }
    },
    mounted() {
        this.getNums();
    },
    methods: {
        getNums() {
            let me = this;
            repo.search("@type:Framework AND level:\"" + this.obj.shortId() + "\"", function(level) {}, function(levels) {
                me.numFrameworks = levels.length;
            }, function() {});
        },
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