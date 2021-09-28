Vue.component('timeline', {
    props: [],
    data: function () {
        return {
            searched: false
        }
    },
    computed: {
        assertions: {
            get: function () {
                var me = this;
                if (app.assertions != null)
                    return app.assertions;
                return null;
            }
        }
    },
    created: function () {},
    watch: {},
    methods: {},
    template: '<div><h3>Timeline</h3>' +
        '<div class="timeline" v-if="assertions">' +
        '<timelineElement v-for="item in assertions" v-bind:key="item.id" :uri="item.id"></timelineElement>' +
        '<span v-if="assertions.length == 0">None.</span>' +
        '</div>' +
        '<div v-else><br>Loading Timeline...</div>' +
        '</div>'
});
