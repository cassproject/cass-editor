Vue.component('resources', {
    props: ['url'],
    data: function () {
        return {
            resourceCount: -1
        };
    },
    computed: {
        resources: function () {
            if (this.resourceCount != app.creativeWorksChanges)
                this.getResources();
            this.resourceCount = app.creativeWorksChanges;
            return app.creativeWorks[this.url];
        },
        empty: function () {
            if (this.resources == null)
                return true;
            return this.resources.length == 0;
        }
    },
    created: function () {
    },
    watch: {
        url: function (newUrl) {
            this.getResources();
        }
    },
    methods: {
        getResources: function () {
            var me = this;
            if (this.url == null) return;
            var search = "@type:CreativeWork AND educationalAlignment.targetUrl:\"" + EcRemoteLinkedData.trimVersionFromUrl(this.url) + "\"";
            repo.searchWithParams(search, {
                    size: 50
                },
                null,
                function (resources) {
                    app.creativeWorks[me.url] = resources;
                    me.resourceCount = resources.length;
                }, console.error);
        }
    },
    template: '<div>' +
    '<div v-if="empty">No resources have been associated with this competency. To add a resource, use the form below.</div>' +
    '<div v-else>' +
    '<ul class="noIndent" v-if="resources"><resourceSelect v-for="item in resources" :uri="item.id"></resourceSelect></ul>' +
    '<div v-else>Loading Resources...</div>' +
    '</div>' +
    '</div>'
});