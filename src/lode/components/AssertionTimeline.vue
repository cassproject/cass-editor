<template>
    <div>
        <div
            class="timeline"
            v-if="!loading">
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

export default {
    name: 'AssertionTimeline',
    components: {
        TimelineElement: () => import('./TimelineElement.vue')
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
            return this.$store.getters['editor/assertions'];
        },
        loading: function() {
            return this.$store.getters['editor/searchingAssertions'];
        }
    },
    watch: {},
    methods: {}
};
</script>
