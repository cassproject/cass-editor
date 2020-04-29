<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title">
                <span class="title has-text-white">New Comment</span>
                <br><span class="subtitle has-text-white has-text-weight-medium">
                    Add Comment
                </span>
            </p>
            <button
                class="delete"
                @click="closeModal"
                aria-label="close" />
        </header>
        <section class="modal-card-body">
            <h3 class="title is-size-4">
                <span v-if="!isReply">Commenting on</span>
                <span v-if="isReply">Replying to</span>
            </h3>
            <p class="subtitle commentAbout">
                <b>{{ commentFrameworkName }}</b>
                <span v-if="isCommentOnCompetency">
                    <br>
                    <span class="commentAbout">{{ commentSubject.getName() }}</span>
                </span>
                <span v-if="isReply">
                    <br>
                    <span class="commentAbout">TODO fill in original comment</span>
                </span>
            </p>
            <div class="field">
                <div class="control">
                    <input
                        v-model="commentText"
                        class="textarea"
                        row="3">
                </div>
            </div>
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
                    @click="saveComment">
                    Save comment
                </button>
            </div>
        </footer>
    </div>
</template>

<script>

import {cassUtil} from '../../mixins/cassUtil';

export default {
    mixins: [cassUtil],
    name: 'AddComment',
    data() {
        return {
            commentSubject: {},
            commentSubjectType: '',
            commentText: '',
            loggedInPersonEcPk: {},
            commentToSave: {}
        };
    },
    methods: {
        closeModal: function() {
            this.$store.commit('app/closeModal');
        },
        buildCommentObject: function() {
            let commentObj = new EcComment();
            commentObj.generateId(window.repo.selectedServer);
            commentObj.setCreator(this.loggedInPerson);
            commentObj.setSubjectIds(this.commentFrameworkId, this.commentSubjectId);
            commentObj.setDateCreated(Date.now() + "");
            commentObj.text = this.commentText;
            commentObj.addOwner(this.loggedInPersonEcPk);
            this.addAllOwnersFromObjectToObject(this.commentFramework, commentObj);
            if (!this.isCommentOnFramework) this.addAllOwnersFromObjectToObject(this.commentSubject, commentObj);
            return commentObj;
        },
        saveCommentSuccess: function() {
            // TODO ADD commentToSave to list
            console.log("Save comment succeeded");
            this.closeModal();
        },
        saveCommentFailed: function(msg) {
            console.log("Save comment failed: " + msg);
        },
        saveComment: function() {
            if (this.commentText.trim().length > 0) {
                if (!this.loggedInPerson || !this.loggedInPerson.id) alert('Not logged in. How did you get here?');
                else {
                    this.loggedInPersonEcPk = this.getPersonEcPk(this.loggedInPerson);
                    if (!this.loggedInPersonEcPk) console.log("Could not determine person EcPk for comment");
                    else {
                        this.commentToSave = this.buildCommentObject();
                        console.log("commentToSave");
                        console.log(this.commentToSave);
                        EcRepository.save(this.commentToSave, this.saveCommentSuccess, this.saveCommentFailed);
                    }
                }
            } else this.closeModal();
        }
    },
    computed: {
        commentFramework: function() {
            return this.$store.getters['editor/framework'];
        },
        commentFrameworkName: function() {
            let fw = this.$store.getters['editor/framework'];
            if (fw) return fw.getName();
            else return 'Unknown';
        },
        commentFrameworkId: function() {
            let fw = this.$store.getters['editor/framework'];
            if (fw) return fw.shortId();
            else return 'Unknown';
        },
        commentSubjectId: function() {
            return this.$store.getters['editor/addCommentAboutId'];
        },
        isReply: function() {
            return this.commentSubjectType.equalsIgnoreCase('comment');
        },
        isCommentOnFramework: function() {
            return this.commentSubjectType.equalsIgnoreCase('framework');
        },
        isCommentOnCompetency: function() {
            return this.commentSubjectType.equalsIgnoreCase('competency');
        },
        loggedInPerson: function() {
            return this.$store.state.user.loggedOnPerson;
        }
    },
    mounted: function() {
        if (this.commentFrameworkId.equals(this.commentSubjectId)) {
            this.commentSubjectType = 'framework';
        } else {
            let someObj = EcRepository.getBlocking(this.commentSubjectId);
            this.commentSubject = someObj;
            this.commentSubjectType = someObj.type.toLowerCase();
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';

    .commentAbout {
        margin-left: 1rem;
    }
</style>