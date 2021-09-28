Vue.component('chooseAction', {
    props: ['uri'],
    data: function () {
        return {
            subject: null,
            action: null,
            resource: null
        };
    },
    computed: {
        timestamp: {
            get: function () {
                if (this.action == null) return null;
                return moment(parseInt(this.action.id.substring(this.action.id.lastIndexOf("/") + 1))).fromNow();
            }
        }
    },
    created: function () {},
    watch: {},
    methods: {
        initialize: function (isVisible, entry) {
            var me = this;
            if (isVisible) {
                EcRepository.get(this.uri, function (view) {
                    me.action = view;
                    EcRepository.get(repo.selectedServer + "data/schema.org.Person/" + EcPk.fromPem(view.owner[0]).fingerprint(), function (person) {
                        var e = new EcEncryptedValue();
                        if (person.isAny(e.getTypes())) {
                            e.copyFrom(person);
                            e.decryptIntoObjectAsync(function (person) {
                                var p = new Person();
                                p.copyFrom(person);
                                me.subject = p.name;
                            }, function (failure) {
                                me.subject = "someone";
                            });
                        } else {
                            var p = new Person();
                            p.copyFrom(person);
                            me.subject = p.name;
                        }
                    }, console.error);
                    EcRepository.get(view.object, function (resourceAlignment) {
                        me.resource = resourceAlignment;
                    }, console.error);
                }, console.error);
            }
        }
    },
    template: '<div v-observe-visibility="{callback: initialize,once: true}"><li v-if="subject" >{{ timestamp }}, {{ subject }} viewed <a v-if="resource" target="_blank" :href="resource.url">{{resource.name}}</a><span v-else>...</span></li></div>'

});