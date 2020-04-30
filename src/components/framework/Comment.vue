<template>
    <ul class="comment-list">
        <li class="comment-list__user" :title="comment.creatorEmail">
            {{ comment.creatorName }}
        </li>
        <li class="comment-list__about" :title="comment.aboutId">
            {{ comment.aboutName }}
        </li>
        <li class="comment-list__message">
            {{ comment.commentText }}
        </li>
        <li class="comment-list__timestamp">
            {{ toPrettyDateString(comment.dateCreated) }}
        </li>
        <li class="comment-list__action">
            <div class="buttons is-right">
                <div
                    v-if="canReply"
                    class="button is-small is-text">
                    <div class="icon">
                        <i class="fa fa-reply" />
                    </div>
                </div>
                <div
                    v-if="comment.canModify"
                    class="button is-small is-text">
                    <div class="icon">
                        <i class="fa fa-trash" />
                    </div>
                </div>
                <div
                    v-if="comment.canModify"
                    class="button is-small is-text">
                    <div class="icon">
                        <i class="fa fa-edit" />
                    </div>
                </div>
            </div>
        </li>
        <li>TODO ADD REPLIES</li>
        <!-- can make this recursive for nested components
            don't turn on until you have a way to end the loop or else
            infinite but you probably know that... :)-->
        <Comment v-if="false" />
    </ul>
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
    }
};
</script>