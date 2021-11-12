<template>
    <div>
        <div
            class="timeline"
            v-if="assertions">
            <TimelineElement
                v-for="item in assertions"
                :key="item.id"
                :uri="item.id" />
            <span v-if="assertions.length === 0">None.</span>
        </div>
        <div v-else>
            <br>Loading Timeline...
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
        }
    },
    watch: {},
    methods: {}
};
</script>
<style lang="scss">
    .timeline {
        padding: 10px 0px;
        position: relative;
        background-color: inherit;
    }

    .timeline::before {
        content: '';
        position: absolute;
        width: 6px;
        background-color: black;
        top: 0rem;
        bottom: 0;
        margin-left: 3.9rem;
    }
</style>
