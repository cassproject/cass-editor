<template>
    <ul class="comment-list-item">
        <li
            class="comment-list__user"
            :title="comment.creatorEmail">
            {{ comment.creatorName }}
        </li>
        <li class="comment-list__email">
            {{ comment.creatorEmail }}
        </li>
        <li class="comment-list__timestamp">
            {{ toPrettyDateString(comment.dateCreated) }}
        </li>
        <li
            class="comment-list__message-container"
            v-click-outside="closeCommentListDropDown">
            <div
                v-if="comment.canModify"
                class="dropdown"
                :class="{ 'is-active': commentListDropDownActive}">
                <div class="dropdown-trigger">
                    <button
                        @click="commentListDropDownActive = !commentListDropDownActive"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                        class="button is-text has-text-dark">
                        <span class="icon has-text-primary">
                            <i class="fas fa-ellipsis-v" />
                        </span>
                    </button>
                </div>
                <div
                    class="dropdown-menu"
                    id="dropdown-menu"
                    role="menu">
                    <div class="dropdown-content">
                        <a
                            @click="handleClickEdit"
                            href="#"
                            class="dropdown-item">
                            edit
                        </a>
                        <a
                            @click="handleClickDelete"
                            class="dropdown-item">
                            delete
                        </a>
                    </div>
                </div>
            </div>
            <div
                class="comment-list__message-container__message"
                :class="{'show-more': showMore}">
                {{ comment.commentText }}
            </div>
            <div
                v-if="comment.commentText.length > 90"
                class="buttons is-right">
                <div
                    v-if="showMore"
                    @click="showMore=false"
                    class="button is-text has-text-primary">
                    show less
                </div>
                <div
                    v-else
                    @click="showMore=true"
                    class="button is-text has-text-primary">
                    show more
                </div>
            </div>
        </li>
        <li
            v-if="comment.lastEditDate"
            class="comment-list__message_edit">
            *Edited: {{ toPrettyDateString(comment.lastEditDate) }}
        </li>
        <li class="comment-list__reply_hr">
            <hr>
        </li>
        <li v-if="comment.replies.length > 0">
            <comment
                v-for="reply in comment.replies"
                :key="reply.commentId"
                :comment="reply"
                :canReply="false" />
        </li>
    <!-- moved to comments.vue leaving for a commit to make sure everything is here -->
    <!--<li><ul>
                    <div v-for="(reply, replyIdx) in comment.replies" :key="reply.commentId">
                        <li class="comment-list__reply_hr">
                            <hr>
                        </li>
                        <li
                            class="comment-list__user"
                            :title="reply.creatorEmail">
                            {{ reply.creatorName }}
                        </li>
                        <li class="comment-list__message-container">
                            <div class="dropdown" :class="{ 'is-active': commentListDropDownActive === reply.commentId}">
                                <div class="dropdown-trigger">
                                    <button @click="handleCommentDropDown(reply.commentId)" aria-haspopup="true" aria-controls="dropdown-menu" class="button is-text has-text-dark" >
                                    <span class="icon has-text-primary" >
                                        <i class="fas fa-ellipsis-v"/>
                                    </span>
                                    </button>
                                </div>
                                <div v-if="comment.canModify" class="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div class="dropdown-content">
                                        <a @click="handleClickEditReply(replyIdx)" href="#" class="dropdown-item">
                                            edit
                                        </a>
                                        <a @click="handleClickDeleteReply(replyIdx)" class="dropdown-item">
                                            delete
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="comment-list__message-container__message">
                                {{ reply.commentText }}
                            </div>
                            <div v-if="comment.commentText.length > 90" class="buttons is-right">
                                <div v-if="showMore" @click="showMore=false" class="button is-text has-text-primary">
                                    show more
                                </div>
                                <div v-else @click="showMore=true" class="button is-text has-text-primary">
                                    show less
                                </div>
                            </div>
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
                                    class="button is-small is-outlined is-primary"
                                    title="reply"
                                    @click="handleClickReply">
                                    <span class="icon">
                                        <i class="fa fa-reply" />
                                    </span>
                                    <span>reply</span>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
            </li>-->
    </ul>
</template>

<script>
import common from '@/mixins/common.js';

export default {
    name: 'Comment',
    mixins: [common],
    components: {
        comment: () => import('./Comment.vue')
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
            showMore: false,
            commentListDropDownActive: false
        };
    },
    methods: {
        closeCommentListDropDown: function() {
            this.commentListDropDownActive = false;
        },
        handleClickReply: function() {
            this.$store.commit('editor/setAddCommentAboutId', this.comment.aboutId);
            this.$store.commit('editor/setAddCommentType', 'reply');
            this.$store.commit('editor/setCommentToReply', this.comment.comment);
            this.$store.commit('app/showModal', {component: 'AddComment'});
        },
        handleClickEdit: function() {
            this.commentListDropDownActive = false;
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
        commentId: function() {
            return this.comment.commentId;
        }
    }
};
</script>