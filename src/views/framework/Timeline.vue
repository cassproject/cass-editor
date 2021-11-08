<template>
    <div>
        <main-layout
            :simple="true">
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
    mounted() {
        this.$store.commit('app/searchTerm', "");
        this.$store.dispatch('editor/searchForAssertions', 5000);
    },
    beforeDestroy: function() {
        this.$store.commit('app/clearSearchFilters');
        this.$store.commit('app/searchTerm', "");
    },
    watch: {},
    methods: {}
};
</script>

<style lang="scss">

</style>

