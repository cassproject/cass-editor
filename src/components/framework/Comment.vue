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
    </ul>
</template>

<script>
import common from '@/mixins/common.js';
import {useEditorStore} from '@/stores/editor';
import {useAppStore} from '@/stores/app';

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
            const editorStore = useEditorStore();
            const appStore = useAppStore();
            editorStore.setAddCommentAboutId(this.comment.aboutId);
            editorStore.setAddCommentType('reply');
            editorStore.setCommentToReply(this.comment.comment);
            appStore.openModal({component: 'AddComment'});
        },
        handleClickEdit: function() {
            const editorStore = useEditorStore();
            const appStore = useAppStore();
            this.commentListDropDownActive = false;
            editorStore.setAddCommentAboutId(this.comment.aboutId);
            editorStore.setAddCommentType('edit');
            editorStore.setCommentToEdit(this.comment.comment);
            appStore.openModal({component: 'AddComment'});
        },
        handleClickEditReply: function(replyIdx) {
            const editorStore = useEditorStore();
            const appStore = useAppStore();
            editorStore.setAddCommentAboutId(this.comment.aboutId);
            editorStore.setAddCommentType('edit');
            editorStore.setCommentToEdit(this.comment.replies[replyIdx].comment);
            appStore.openModal({component: 'AddComment'});
        },
        handleClickDelete: function() {
            const editorStore = useEditorStore();
            const appStore = useAppStore();
            let ctd = [];
            ctd.push(this.comment.comment);
            if (this.comment.replies && this.comment.replies.length > 0) {
                for (let r of this.comment.replies) {
                    ctd.push(r.comment);
                }
            }
            editorStore.setCommentsToDelete(ctd);
            appStore.openModal({component: 'DeleteCommentConfirm'});
        },
        handleClickDeleteReply: function(replyIdx) {
            const editorStore = useEditorStore();
            const appStore = useAppStore();
            let ctd = [];
            ctd.push(this.comment.replies[replyIdx].comment);
            editorStore.setCommentsToDelete(ctd);
            appStore.openModal({component: 'DeleteCommentConfirm'});
        }
    },
    computed: {
        commentId: function() {
            return this.comment.commentId;
        }
    }
};
</script>