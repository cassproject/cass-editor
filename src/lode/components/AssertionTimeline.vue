<template>
    <div>
        <div
            class="timeline"
            v-if="assertions && !loading">
            <TimelineElement
                v-for="item in assertions"
                :key="item.id"
                :uri="item.id" />
            <span
                id="noAssertionsMessage"
                v-if="assertions.length === 0">
                None.
            </span>
        </div>
        <div
            v-else
            id="loadingAssertionTimeline">
            <progress
                class="progress is-large is-primary"
                max="100" />
        </div>
    </div>
</template>
<script>
import {defineAsyncComponent} from 'vue';
import {mapState} from 'pinia';
import {useEditorStore} from '@/stores/editor';

export default {
    name: 'AssertionTimeline',
    components: {
        TimelineElement: defineAsyncComponent(() => import('./TimelineElement.vue'))
    },
    props: {

    },
    data: function() {
        return {
            searched: false
        };
    },
    computed: {
        ...mapState(useEditorStore, {
            assertions: 'sortedAssertions',
            loading: 'searchingAssertions'
        })
    },
    watch: {},
    methods: {}
};
</script>
