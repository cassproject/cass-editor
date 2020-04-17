<!--
    This template is used to show the comments by framework
    It uses the Comment.vue templae to serve comments
    in a recursive manner for nested comments, much like Hierarchy.Node does
    This is controlled by an event sent from the EditorToolbar.vue template
    which triggers Framework.vue to open this component.
-->
<template>
    <aside
        id="right-side-bar"
        class="menu has-background-light">
        <p class="is-pulled-left">
            <span
                @click="$store.commit('app/closeRightAside')"
                class="icon">
                <i class="fa fa-caret-right" />
            </span>
        </p>
        <Component :is="rightAsideContent" />
    </aside>
</template>
<script>
import Comments from './Comments.vue';
import Versions from './Versions.vue';

export default {
    name: 'RightAside',
    data() {
        return {
            isCommenter: true,
            isAdmin: false,
            isViewer: true

        };
    },
    components: {
        Comments,
        Versions
    },
    computed: {
        dynamicSideBarContent: function() {
            return this.$store.getters['app/framework'];
        },
        showRightSideContent: function() {
            return this.dynamicSideBarContent.showRightAside;
        },
        rightAsideContent: function() {
            return this.dynamicSideBarContent.rightAsideContent;
        }
    }
};
</script>

<style lang="scss">
#right-side-bar {
    position: absolute;
    z-index: 10;
    height: calc(100vh - 48px);
    overflow: scroll;
    right: 0;
    padding: .5rem;
    width: 300px;
    .comment-list {
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

