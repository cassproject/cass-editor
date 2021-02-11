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
        class="has-background-light">
        <div class="cass--right-aside--top-bar">
            <button
                class="delete has-text-white"
                @click="$store.commit('app/closeRightAside')"
                aria-label="close">
                <span class="icon">
                    <i class="fa fa-times" />
                </span>
            </button>
            <div class="cass--right-aside--title">
                <span v-if="rightAsideContent === 'FilterAndSort'">
                    Filter & sort
                </span>
                <span v-else-if="rightAsideContent === 'ListItemInfo'">
                    Information
                </span>
                <span v-else-if="rightAsideContent === 'Comments'">
                    Comments
                </span>
            </div>
        </div>
        <slot name="right-aside-content">
            <Component
                :is="rightAsideContent" />
        </slot>
    </aside>
</template>
<script>
import Comments from './Comments.vue';
import Versions from './Versions.vue';
import ListItemInfo from './ListItemInfo.vue';
import FilterAndSort from './../frameworks/FilterAndSort.vue';

export default {
    name: 'RightAside',
    props: {
    },
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
        FilterAndSort,
        ListItemInfo
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

<style lang="scss" scoped>
    @import './../../scss/variables.scss';
    .close-right-aside-button {
        position: absolute;
        left: 0rem;
        padding-left: -1rem;
        z-index: 100;
        top: 1rem;
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
    }
    #right-side-bar {
        border-left: solid 1px rgba($dark, .2);
        z-index: 11;
        height: 100%;
        width: 100%;
        overflow: hidden;
        right: 0;
        background-color: $light;
        padding: 0rem;
        transform: translateX(0);
        .right-aside-bar__title {
            direction: ltr;
            padding: 0rem 0rem;
        }
        .right-aside__filter-and-sort {
            direction: ltr;
        }
    }
    .cass--right-aside--top-bar {
        width: 100%;
        position: fixed;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: .25rem .5rem;
        height: 44px;
        top:0;
        border-bottom: solid 1px rgba($dark, .3);
    }
    .cass--right-aside--content {
        height: 100%;
        overflow-y: scroll;
        margin-top: 44px;
    }
    .cass--right-aside--title {
        padding-left: .5rem;
    }

</style>

