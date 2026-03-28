<template>
    <div>
        <main-layout
            :simple="true">
            <template #top>
                <div class="assertion-timeline-topbar">
                    <div
                        style="width: 100%;"
                        class="columns is-spaced is-vcentered">
                        <div class="column">
                            <h2 class="has-text-dark has-text-weight-bold is-size-5 text-align-left">
                                Assertion Timeline
                            </h2>
                        </div>
                    </div>
                </div>
            </template>
            <template #body>
                <AssertionTimeline />
            </template>
        </main-layout>
    </div>
</template>

<script>
import store from '@/stores/index.js';
import MainLayout from '@/layouts/MainLayout.vue';
import AssertionTimeline from '@/lode/components/AssertionTimeline.vue';

export default {
    name: 'Timeline',
    data: () => ({}),
    mixins: [],
    props: {
        queryParams: {
            type: Object,
            default: () => { return {}; }
        }
    },
    components: {
        MainLayout,
        AssertionTimeline
    },
    computed: {
        me: function() {
            return store.editor().getMe;
        }
    },
    watch: {
        me: function() {
            store.editor().searchForAssertions();
        }
    },
    created() {
        store.editor().setSearchingAssertions(true);
        store.app().setSearchTerm("");
        store.editor().searchForAssertions();
    },
    beforeUnmount: function() {
        store.app().clearSearchFilters();
        store.app().setSearchTerm("");
    },
    methods: {}
};
</script>

<style lang="scss">
    @import './../../scss/timeline.scss';
</style>

