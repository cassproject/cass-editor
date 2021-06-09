<template>
    <modal-template
        type="danger"
        @close="closeModal"
        :active="true">
        <template slot="modal-header">
            <span class="title has-text-white">
                {{ commentDeleteConfirmTitle }}
            </span>
        </template>
        <template slot="modal-body">
            <p v-if="commentsToDelete.length <= 1">
                Are you sure you wish to delete this comment?
            </p>
            <p v-if="commentsToDelete.length > 1">
                Are you sure you wish to delete this entire thread?
            </p>
        </template>
        <template slot="modal-foot">
            <div class="buttons is-spaced">
                <button
                    class="button is-dark is-outlined"
                    @click="closeModal">
                    Cancel
                </button>
                <button
                    class="button is-outlined is-primary"
                    @click="confirmDelete">
                    Confirm
                </button>
            </div>
        </template>
    </modal-template>
</template>
<script>
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
            this.$store.commit('editor/setCommentsToDelete', []);
            this.$store.commit('app/closeModal');
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
            let fcl = this.$store.getters['editor/frameworkCommentList'];
            let nfcl = [];
            for (let fc of fcl) {
                if (!ctdIds.includes(fc.shortId())) nfcl.push(fc);
            }
            this.$store.commit('editor/setFrameworkCommentList', nfcl);
        },
        deleteCommentSuccess() {
            appLog('Comment delete succeeded');
        },
        deleteCommentFailure(msg) {
            appLog('Comment delete failed: ' + msg);
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
            return this.$store.getters['editor/commentsToDelete'];
        }
    },
    mounted: function() {
    }
};
</script>