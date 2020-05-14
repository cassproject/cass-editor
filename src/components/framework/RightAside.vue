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
        direction:rtl;
        border-left: solid 1px rgba($dark, .2);
        z-index: 10;
        height: calc(100vh - 52px);
        overflow: auto;
        right: 0;
        padding: 1.5rem 1rem .5rem 1.25rem;
        width: 340px;
        transform: translateX(0);
        .right-aside-bar__title {
            direction: ltr;
            padding-bottom: 1rem;
        }
        .comment-list {
            direction: ltr;
            background-color: white;
            padding: .5rem;
            border-radius: 4px;
            border: solid 1px rgba($dark, .2);
            margin-bottom: 1rem;
        }
        .comment-list__about {
            padding: .125rem 0rem .125rem .25rem;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
        }
        .comment-list-item {
            .comment-list__user {
                padding: .125rem 0rem 0rem .25rem;
                font-weight: 600;
                font-size: .9rem;
            }

            .comment-list__message-container {
                .dropdown {
                    float: right;
                    padding-top: 0rem;
                    .dropdown-menu {
                        min-width: 3rem;
                        left: -60px;
                    }
                }
                .comment-list__message-container__message {
                    padding: .125rem 1.25rem .5rem .25rem;
                    font-size: .9rem;
                    max-height: 5rem;
                    overflow: hidden;
                    line-height: 1.3rem;
                    margin-left: 0rem;
                    font-weight: 400;
                }
                .comment-list__message-container__message.show-more {
                    max-height: 100%;
                }
            }
            .comment-list__message_edit {
                font-size: .7rem;
                font-weight: 500;
                padding: .125rem 0rem .125rem .5rem;
            }
            .comment-list__timestamp {
                font-size: .7rem;
                padding: .125rem 0rem .125rem .25rem;
                font-weight: 500;
            }
            .comment-list__reply_hr {
                margin-top: 1rem;
                margin-bottom: 1rem;
            }
            .comment-list__nested {
                padding-left: .5rem;
            }

        }

    }


</style>

