<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title">
                <span class="title has-text-white">
                    {{ commentDeleteConfirmTitle }}
                </span>
            </p>
            <button
                class="delete"
                @click="closeModal"
                aria-label="close" />
        </header>
        <section class="modal-card-body">
            <p v-if="commentsToDelete.length <= 1">
                Are you sure you wish to delete this comment?
            </p>
            <p v-if="commentsToDelete.length > 1">
                Are you sure you wish to delete this entire thread?
            </p>
        </section>
        <footer class="modal-card-foot">
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
        </footer>
    </div>
</template>

<script>

export default {
    name: 'DeleteCommentConfirm',
    data() {
        return {
        };
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