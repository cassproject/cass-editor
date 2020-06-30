<template>
    <div class="modal-card comment-modal">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title">
                <span class="title has-text-white">
                    <span v-if="isCommentNew || isCommentReply">New Comment</span>
                    <span v-if="isCommentEdit">Edit Comment</span>
                </span>
            </p>
            <button
                class="delete"
                @click="closeModal"
                aria-label="close" />
        </header>
        <section class="modal-card-body comment-modal__details">
            <h3 class="is-size-4">
                <span
                    v-if="isCommentNew"
                    class="comment-modal__details__header">Commenting on</span>
                <span
                    v-if="isCommentReply"
                    class="comment-modal__details__header">Replying to comments about</span>
                <span
                    v-if="isCommentEdit"
                    class="comment-modal__details__header">Editing comment on</span>
            </h3>
            <p class="comment-modal__details__framework">
                <b>framework: </b>{{ commentFrameworkName }}
            </p>
            <p
                class="comment-modal__details__competency"
                v-if="isCommentOnCompetency">
                <b>competency:</b> {{ commentSubject.getName() }}
            </p>
            <div class="field">
                <div class="control">
                    <textarea
                        v-model="commentText"
                        class="textarea"
                        row="3" />
                </div>
            </div>
            <div
                v-if="commentIsBusy"
                class="has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                </span>
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
                    :disabled="commentIsBusy"
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
            commentToSave: {},
            commentIsBusy: false
        };
    },
    methods: {
        closeModal: function() {
            this.$store.commit('app/closeModal');
        },
        buildNewCommentObject: function() {
            let commentObj = new EcComment();
            commentObj.generateId(window.repo.selectedServer);
            commentObj.setCreator(this.loggedInPerson);
            if (this.isCommentReply) commentObj.setSubjectIds(this.commentFrameworkId, this.commentToReply.shortId());
            else commentObj.setSubjectIds(this.commentFrameworkId, this.commentAboutId);
            commentObj.setDateCreated(Date.now() + "");
            commentObj.text = this.commentText;
            commentObj.addOwner(this.loggedInPersonEcPk);
            this.addAllOwnersFromObjectToObject(this.commentFramework, commentObj);
            if (this.isCommentReply) this.addAllOwnersFromObjectToObject(this.commentToReply, commentObj);
            if (!this.isCommentOnFramework) this.addAllOwnersFromObjectToObject(this.commentSubject, commentObj);
            return commentObj;
        },
        buildEditCommentObject: function() {
            let commentObj = this.commentToEdit;
            commentObj.text = this.commentText;
            commentObj.lastEditDate = Date.now() + "";
            return commentObj;
        },
        buildCommentObject: function() {
            if (this.isCommentEdit) return this.buildEditCommentObject();
            else return this.buildNewCommentObject();
        },
        updateStoredFrameworkCommentPersonMap() {
            let cpm = this.$store.getters['editor/frameworkCommentPersonMap'];
            cpm[this.loggedInPerson.shortId()] = this.loggedInPerson;
            this.$store.commit('editor/setFrameworkCommentPersonMap', cpm);
        },
        insertEditedCommentObjectIntoStoreFrameworkCommentList() {
            let newFcl = [];
            let fcl = this.$store.getters['editor/frameworkCommentList'];
            for (let c of fcl) {
                if (c.shortId().equals(this.commentToSave.shortId())) newFcl.push(this.commentToSave);
                else newFcl.push(c);
            }
            this.$store.commit('editor/setFrameworkCommentList', newFcl);
        },
        updateStoreFrameworkCommentList() {
            if (this.isCommentEdit) {
                this.insertEditedCommentObjectIntoStoreFrameworkCommentList();
            } else {
                let fcl = this.$store.getters['editor/frameworkCommentList'];
                fcl.push(this.commentToSave);
                this.$store.commit('editor/setFrameworkCommentList', fcl);
            }
        },
        updateStoredFrameworkCommentData() {
            if (this.frameworkCommentDataAlreadyLoaded) {
                this.updateStoredFrameworkCommentPersonMap();
                this.updateStoreFrameworkCommentList();
            }
        },
        saveCommentSuccess: function() {
            console.log("Save comment succeeded");
            this.updateStoredFrameworkCommentData();
            this.commentIsBusy = false;
            this.closeModal();
        },
        saveCommentFailed: function(msg) {
            this.commentIsBusy = false;
            console.log("Save comment failed: " + msg);
        },
        saveComment: function() {
            if (this.commentText.trim().length > 0) {
                if (!this.loggedInPerson || !this.loggedInPerson.id) alert('Not logged in. How did you get here?');
                else {
                    this.loggedInPersonEcPk = this.getPersonEcPk(this.loggedInPerson);
                    if (!this.loggedInPersonEcPk) console.log("Could not determine person EcPk for comment");
                    else {
                        this.commentIsBusy = true;
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
        commentAboutId: function() {
            return this.$store.getters['editor/addCommentAboutId'];
        },
        commentType: function() {
            return this.$store.getters['editor/addCommentType'];
        },
        commentToEdit: function() {
            return this.$store.getters['editor/commentToEdit'];
        },
        commentToReply: function() {
            return this.$store.getters['editor/commentToReply'];
        },
        frameworkCommentDataAlreadyLoaded: function() {
            return this.$store.getters['editor/frameworkCommentDataLoaded'];
        },
        isCommentReply: function() {
            return this.commentType.equalsIgnoreCase('reply');
        },
        isCommentEdit: function() {
            return this.commentType.equalsIgnoreCase('edit');
        },
        isCommentNew: function() {
            return this.commentType.equalsIgnoreCase('new');
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
        if (this.commentFrameworkId.equals(this.commentAboutId)) {
            this.commentSubjectType = 'framework';
        } else {
            let someObj = EcRepository.getBlocking(this.commentAboutId);
            this.commentSubject = someObj;
            this.commentSubjectType = someObj.type.toLowerCase();
        }
        if (this.isCommentEdit) {
            this.commentText = this.commentToEdit.text;
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';

    .comment-modal__details {
        margin-left: 0rem;
        .comment-modal__details__header {
            font-size: 1rem;
            font-weight: 500;
        }
        .comment-modal__details__framework {
            font-size: 1rem;
        }
        .comment-modal__details__competency {
            font-size: 1rem;
            padding-bottom: .5rem;
        }
    }
    .commentReply {
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-style: italic;
    }
</style>