<template>
    <div>
        <div
            class="timeline"
            v-if="assertions && !loading">
            <TimelineElement
                :id="item.id"
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
import { defineAsyncComponent } from 'vue';
import store from '@/stores/index.js';
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
        assertions: function() {
            return store.editor().assertions;
        },
        loading: function() {
            return store.editor().searchingAssertions;
        }
    },
    watch: {},
    methods: {}
};
</script>
