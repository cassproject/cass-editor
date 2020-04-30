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
        <button
            class="delete is-dark has-text-dark is-pulled-right"
            @click="$store.commit('app/closeRightAside')"
            aria-label="close" />
        <Component :is="rightAsideContent" />
    </aside>
</template>
<script>
import Comments from './Comments.vue';
import Versions from './Versions.vue';
import FilterAndSort from './../frameworks/FilterAndSort.vue';

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
        Versions,
        FilterAndSort
    },
    computed: {
        showRightAside: function() {
            return this.$store.getters['app/showRightAside'];
        },
        rightAsideContent: function() {
            return this.$store.getters['app/rightAsideContent'];
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';

    #right-side-bar {
        position: fixed;
        border-left: solid 1px rgba($dark, .4);
        z-index: 10;
        height: calc(100vh - 48px);
        overflow: scroll;
        right: 0;
        padding: 2.5rem 1.5rem;
        width: 340px;
        transform: translateX(0);
        .comment-list {
            .comment-list__user {
                font-weight: 700;
            }
            .comment-list__about {
                font-size: .8rem;
                font-weight: 600;
                font-style: italic;
            }
            .comment-list__message {
                font-size: .7rem;
                margin-left: 1rem;
            }
            .comment-list__timestamp {
                font-size: .7rem;
                font-weight: 600;
            }
            .comment-list__nested {
                padding-left: .5rem;
            }
            padding: .5rem;
            border-radius: 4px;
            border-style: solid;
            border-width: 1px;
            border-color: #CCC;
            margin-bottom: 1rem;
        }

    }


</style>

