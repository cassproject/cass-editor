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
        <button
            class="delete is-pulled-left ml-2 mt-4"
            @click="$store.commit('app/closeRightAside')"
            aria-label="close" />
        <slot name="right-aside-content">
            <Component :is="rightAsideContent" />
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


</style>

