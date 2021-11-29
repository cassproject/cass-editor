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
