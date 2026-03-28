<template>
    <modal-template
        type="danger"
        @close="closeModal"
        :active="true">
        <template #modal-header>
            <span class="title has-text-white">
                {{ commentDeleteConfirmTitle }}
            </span>
        </template>
        <template #modal-body>
            <p v-if="commentsToDelete.length <= 1">
                Are you sure you wish to delete this comment?
            </p>
            <p v-if="commentsToDelete.length > 1">
                Are you sure you wish to delete this entire thread?
            </p>
        </template>
        <template #modal-foot>
            <div class="buttons is-spaced">
                <button
                    class="button is-dark is-outlined"
                    id="delete-comment-cancel-button"
                    @click="closeModal">
                    Cancel
                </button>
                <button
                    class="button is-outlined is-primary"
                    id="delete-comment-confirm-button"
                    @click="confirmDelete">
                    Confirm
                </button>
            </div>
        </template>
    </modal-template>
</template>
<script>
import store from '@/stores/index.js';
import ModalTemplate from './ModalTemplate.vue';

export default {
    name: 'DeleteCommentConfirm',
    props: {
        active: {
            type: Boolean,
            defaut: false
        }
    },
    data() {
        return {
        };
    },
    components: {
        ModalTemplate
    },
    methods: {
        closeModal: function() {
            store.editor().setCommentsToDelete([]);
            store.app().closeModal();
        },
        generateCommentsToDeleteIds() {
            let ctdIds = [];
            for (let ctd of this.commentsToDelete) {
                ctdIds.push(ctd.shortId());
            }
            return ctdIds;
        },
        removeCommentsFromStoreFrameworkCommentList: function() {
            let ctdIds = this.generateCommentsToDeleteIds();
            let fcl = store.editor().frameworkCommentList;
            let nfcl = [];
            for (let fc of fcl) {
                if (!ctdIds.includes(fc.shortId())) nfcl.push(fc);
            }
            store.editor().setFrameworkCommentList(nfcl);
        },
        deleteCommentSuccess() {
            console.log('Comment delete succeeded');
        },
        deleteCommentFailure(msg) {
            console.log('Comment delete failed: ' + msg);
        },
        confirmDelete: function() {
            let repo = window.repo;
            for (let ctd of this.commentsToDelete) {
                repo.deleteRegistered(ctd, this.deleteCommentSuccess, this.deleteCommentFailure);
            }
            this.removeCommentsFromStoreFrameworkCommentList();
            this.closeModal();
        }
    },
    computed: {
        commentDeleteConfirmTitle() {
            if (this.commentsToDelete.length > 1) return 'Delete comment thread?';
            else return 'Delete comment?';
        },
        commentsToDelete: function() {
            return store.editor().commentsToDelete;
        }
    },
    mounted: function() {
    }
};
</script>