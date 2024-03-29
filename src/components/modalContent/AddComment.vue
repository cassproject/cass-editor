<template>
    <modal-template
        type="info"
        @close="closeModal"
        :active="true">
        <template slot="modal-header">
            <span v-if="isCommentNew || isCommentReply">New Comment</span>
            <span v-if="isCommentEdit">Edit Comment</span>
        </template>
        <template slot="modal-body">
            <span
                v-if="isCommentNew"
                class="comment-modal__details__header">Commenting on</span>
            <span
                v-if="isCommentReply"
                class="comment-modal__details__header">Replying to comments about</span>
            <span
                v-if="isCommentEdit"
                class="comment-modal__details__header">Editing comment on</span>
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
        </template>
        <template slot="modal-foot">
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
        </template>
    </modal-template>
</template>

<script>

import {cassUtil} from '../../mixins/cassUtil';
import ModalTemplate from './ModalTemplate.vue';

export default {
    mixins: [cassUtil],
    name: 'AddComment',
    components: {
        ModalTemplate
    },
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
            appLog("Save comment succeeded");
            this.updateStoredFrameworkCommentData();
            this.commentIsBusy = false;
            this.closeModal();
            this.$store.commit('app/showRightAside', 'Comments');
        },
        saveCommentFailed: function(msg) {
            this.commentIsBusy = false;
            appLog("Save comment failed: " + msg);
        },
        saveComment: function() {
            if (this.commentText.trim().length > 0) {
                if (!this.loggedInPerson || !this.loggedInPerson.id) alert('Not logged in. How did you get here?');
                else {
                    this.loggedInPersonEcPk = this.getPersonEcPk(this.loggedInPerson);
                    if (!this.loggedInPersonEcPk) appLog("Could not determine person EcPk for comment");
                    else {
                        this.commentIsBusy = true;
                        this.commentToSave = this.buildCommentObject();
                        appLog("commentToSave");
                        appLog(this.commentToSave);
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
    mounted: async function() {
        if (this.commentFrameworkId.equals(this.commentAboutId)) {
            this.commentSubjectType = 'framework';
        } else {
            let someObj = await EcRepository.get(this.commentAboutId);
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