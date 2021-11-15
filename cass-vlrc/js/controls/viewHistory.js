var viewHistory = {};
Vue.component('viewhistory', {
    props: ['pk'],
    data: function () {
        return {
            viewResult: null
        }
    },
    computed: {
        views: {
            get: function () {
                var me = this;
                if (this.pk == null) return null;
                if (this.viewResult != null)
                    return this.viewResult;
                repo.searchWithParams("@type:ChooseAction AND \\*owner:\"" + this.pk + "\"", {
                    size: 5000
                }, null, function (views) {
                    views = views.sort(function (a, b) {
                        return parseInt(b.id.substring(b.id.lastIndexOf("/") + 1)) - parseInt(a.id.substring(a.id.lastIndexOf("/") + 1));
                    });
                    me.viewResult = views;
                }, console.error, {
                    size: 5000
                });
                return null;
            },
            set: function (v) {
                this.viewResult = v;
            }
        }
    },
    created: function () {
        viewHistory[this.pk] = this;
    },
    watch: {
        pk: function () {
            this.viewResult = null;
        }
    },
    methods: {
        addView: function (a) {
            this.viewResult.unshift(a);
        },
        removeView: function (a) {
            for (var i = 0; i < this.viewResult.length; i++) {
                if (this.viewResult[i].id == a.id)
                    this.viewResult.splice(i, 1);
            }
        }
    },
    template: '<div><h3>View History (Public)</h3>' +
        '<span v-if="views"><span v-if="views.length == 0">None.</span></span>' +
        '<ul v-if="views" style="max-height:10rem;overflow-y:scroll;"><chooseAction v-for="item in views" v-bind:key="item.id" :uri="item.id"></chooseAction></ul>' +
        '<div v-else><br>Loading Views...</div>' +
        '</div>'
});
