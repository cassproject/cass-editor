Vue.component('frameworks', {
    props: [],
    data: function () {
        return {
            frameworksResult: null,
            search: null,
            lastSearch: null
        };
    },
    computed: {
        frameworks: {
            get: function () {
                var me = this;
                if (this.lastSearch != this.search)
                    this.frameworksResult = null;
                this.lastSearch = this.search;
                if (this.frameworksResult != null) {
                    return this.frameworksResult;
                }
                var search = this.search;
                if (search == null) search = "*";
                var f = EcFramework.search(repo, search, function (frameworks) {
                    me.frameworksResult = frameworks;
                }, console.error, {
                    size: 500
                });
                return this.frameworksResult;
            }
        }
    },
    template: '<div>' +
    '<input type="text" class="frameworksSearchInput" placeholder="Search..." v-model="search"/>' +
    '<ul v-if="frameworks">' +
    '<frameworkSelect v-for="item in frameworks" v-bind:key="item.id" :uri="item.id"></frameworkSelect>' +
    '</ul>' +
    '<div v-else><br>Loading Frameworks...</div>' +
    '</div>'
});