<template>
    <div>
        <main-layout
            :simple="true">
            <template slot="top">
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
            <template slot="body">
                <AssertionTimeline />
            </template>
        </main-layout>
    </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import AssertionTimeline from '@/lode/components/AssertionTimeline.vue';

export default {
    name: 'FrameworkCrosswalk',
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
            return this.$store.getters['editor/getMe'];
        }
    },
    watch: {
        me: function() {
            this.$store.dispatch('editor/searchForAssertions');
        }
    },
    mounted() {
        this.$store.commit('app/searchTerm', "");
        this.$store.dispatch('editor/searchForAssertions');
    },
    beforeDestroy: function() {
        this.$store.commit('app/clearSearchFilters');
        this.$store.commit('app/searchTerm', "");
    },
    methods: {}
};
</script>

<style lang="scss">
    @import './../../scss/timeline.scss';
</style>

