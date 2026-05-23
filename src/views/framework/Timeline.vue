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
import MainLayout from '@/layouts/MainLayout.vue';
import AssertionTimeline from '@/lode/components/AssertionTimeline.vue';
import {mapState, mapActions} from 'pinia';
import {useEditorStore} from '@/stores/editor';
import {useAppStore} from '@/stores/app';

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
        ...mapState(useEditorStore, {me: 'getMe'})
    },
    watch: {
        me: function() {
            const editorStore = useEditorStore();
            editorStore.searchForAssertions();
        }
    },
    created() {
        const editorStore = useEditorStore();
        const appStore = useAppStore();
        editorStore.setSearchingAssertions(true);
        appStore.searchTerm("");
        editorStore.searchForAssertions();
    },
    beforeUnmount: function() {
        const appStore = useAppStore();
        appStore.clearSearchFilters();
        appStore.searchTerm("");
    },
    methods: {}
};
</script>

<style lang="scss">
    @import './../../scss/timeline.scss';
</style>

