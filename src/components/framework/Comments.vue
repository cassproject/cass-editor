<!--
    This template is used to show the comments by framework
    It uses the Comment.vue templae to serve comments
    in a recursive manner for nested comments, much like Hierarchy.Node does
    This is controlled by an event sent from the EditorToolbar.vue template
    which triggers Framework.vue to open this component.
-->
<template>
    <aside
        id="right-side-bar__comments"
        class="menu has-background-lightest">
        <p class="subtitle is-size-4">
            Comments
        </p>
        <!-- for each comment in time sequence
            click to scroll to position in framework eventually -->
        <!-- for each response -->
        <Comment
            :isAdmin="isAdmin"
            :isViewer="isViewer"
            :isCommenter="isCommenter"
            v-for="n in 10"
            :key="n" />
    </aside>
</template>
<script>
import Comment from './Comment.vue';

export default {
    name: 'Comments',
    data() {
        return {
            isCommenter: true,
            isAdmin: false,
            isViewer: true

        };
    },
    components: {
        Comment
    }
};
</script>

<style lang="scss">
#right-side-bar__comnents {
    position: relative;
    z-index: 10;
    height: 100%;
    overflow: scroll;
    right: 0;
    padding: .5rem;
    width: 300px;
    .comment-list {
        padding: .5rem;
         .comment-list__user {
        font-weight: 700;
        }
        .comment-list__message {
            font-size: .7rem;
        }
        .comment-list__timestamp {
            font-size: .7rem;
            font-weight: 600;
        }
        .comment-list__nested {
            padding-left: .5rem;
        }
    }

}


</style>
