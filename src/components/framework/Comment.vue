<template>
    <div>
        <ul class="comment-list">
            <li
                class="comment-list__user"
                :title="comment.creatorEmail">
                {{ comment.creatorName }}
            </li>
            <li
                class="comment-list__about"
                :title="comment.aboutId">
                {{ comment.aboutName }}
            </li>
            <li class="comment-list__message">
                {{ comment.commentText }}
            </li>
            <li class="comment-list__timestamp">
                {{ toPrettyDateString(comment.dateCreated) }}
            </li>
            <li
                v-if="comment.lastEditDate"
                class="comment-list__message_edit">
                *Edited: {{ toPrettyDateString(comment.lastEditDate) }}
            </li>
            <li class="comment-list__action">
                <div class="buttons is-right">
                    <div
                        v-if="canReply && comment.replies.length <= 0"
                        class="button is-small is-text"
                        title="reply"
                        @click="handleClickReply">
                        <div class="icon">
                            <i class="fa fa-reply" />
                        </div>
                    </div>
                    <div
                        v-if="comment.canModify"
                        class="button is-small is-text"
                        title="delete"
                        @click="handleClickDelete">
                        <div class="icon">
                            <i class="fa fa-trash" />
                        </div>
                    </div>
                    <div
                        v-if="comment.canModify"
                        class="button is-small is-text"
                        title="edit"
                        @click="handleClickEdit">
                        <div class="icon">
                            <i class="fa fa-edit" />
                        </div>
                    </div>
                </div>
            </li>
            <li v-if="comment.replies.length > 0">
                <ul>
                    <div v-for="(reply, replyIdx) in comment.replies">
                        <li class="comment-list__reply_hr">
                            <hr>
                        </li>
                        <li
                            class="comment-list__user"
                            :title="reply.creatorEmail">
                            {{ reply.creatorName }}
                        </li>
                        <li class="comment-list__message">
                            {{ reply.commentText }}
                        </li>
                        <li class="comment-list__timestamp">
                            {{ toPrettyDateString(reply.dateCreated) }}
                        </li>
                        <li
                            v-if="reply.lastEditDate"
                            class="comment-list__message_edit">
                            *Edited: {{ toPrettyDateString(reply.lastEditDate) }}
                        </li>
                        <li class="comment-list__action">
                            <div class="buttons is-right">
                                <div
                                    v-if="canReply && ((replyIdx + 1) === comment.replies.length)"
                                    class="button is-small is-text"
                                    title="reply"
                                    @click="handleClickReply">
                                    <div class="icon">
                                        <i class="fa fa-reply" />
                                    </div>
                                </div>
                                <div
                                    v-if="reply.canModify"
                                    class="button is-small is-text"
                                    title="delete"
                                    @click="handleClickDeleteReply(replyIdx)">
                                    <div class="icon">
                                        <i class="fa fa-trash" />
                                    </div>
                                </div>
                                <div
                                    v-if="reply.canModify"
                                    class="button is-small is-text"
                                    title="edit"
                                    @click="handleClickEditReply(replyIdx)">
                                    <div class="icon">
                                        <i class="fa fa-edit" />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
            </li>
            <!-- can make this recursive for nested components
                don't turn on until you have a way to end the loop or else
                infinite but you probably know that... :)-->
            <Comment v-if="false" />
        </ul>
    </div>
</template>

<script>
import common from '@/mixins/common.js';

export default {
    name: 'Comment',
    mixins: [common],
    components: {
    },
    props: {
        comment: {
            type: Object
        },
        canReply: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
        };
    },
    methods: {

        handleClickReply: function() {
            this.$store.commit('editor/setAddCommentAboutId', this.comment.aboutId);
            this.$store.commit('editor/setAddCommentType', 'reply');
            this.$store.commit('editor/setCommentToReply', this.comment.comment);
            this.$store.commit('app/showModal', {component: 'AddComment'});
        },
        handleClickEdit: function() {
            this.$store.commit('editor/setAddCommentAboutId', this.comment.aboutId);
            this.$store.commit('editor/setAddCommentType', 'edit');
            this.$store.commit('editor/setCommentToEdit', this.comment.comment);
            this.$store.commit('app/showModal', {component: 'AddComment'});
        },
        handleClickEditReply: function(replyIdx) {
            this.$store.commit('editor/setAddCommentAboutId', this.comment.aboutId);
            this.$store.commit('editor/setAddCommentType', 'edit');
            this.$store.commit('editor/setCommentToEdit', this.comment.replies[replyIdx].comment);
            this.$store.commit('app/showModal', {component: 'AddComment'});
        },
        handleClickDelete: function() {
            let ctd = [];
            ctd.push(this.comment.comment);
            if (this.comment.replies && this.comment.replies.length > 0) {
                for (let r of this.comment.replies) {
                    ctd.push(r.comment);
                }
            }
            this.$store.commit('editor/setCommentsToDelete', ctd);
            this.$store.commit('app/showModal', {component: 'DeleteCommentConfirm'});
        },
        handleClickDeleteReply: function(replyIdx) {
            let ctd = [];
            ctd.push(this.comment.replies[replyIdx].comment);
            this.$store.commit('editor/setCommentsToDelete', ctd);
            this.$store.commit('app/showModal', {component: 'DeleteCommentConfirm'});
        }
    },
    computed: {
    }
};
</script>