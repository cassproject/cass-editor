Vue.component('assertionhistory', {
    props: ['pk'],
    data: function () {
        return {
            assertionResult: null,
            assertionCounter: -1,
            visible: false
        }
    },
    computed: {
        assertions: {
            get: function () {
                var me = this;
                if (this.pk == null) return null;
                if (app.assertions == null) return null;
                if (me.visible && app.assertions.length != this.assertionCounter) {
                    this.assertionCounter = app.assertions.length;
                    this.assertionResultNew = [];
                    var eah = new EcAsyncHelper();
                    eah.each(app.assertions, function (assertion, callback) {
                        if (me.assertionResultNew.length > 10) {
                            callback();
                            return;
                        }
                        assertion.getSubjectAsync(function (subject) {
                            if (me.assertionResultNew.length > 10) {
                                callback();
                                return;
                            }
                            if (subject.toPem() == me.pk)
                                me.assertionResultNew.push(assertion);
                            callback();
                        }, callback);
                    }, function (assertions) {
                        me.assertionResult = me.assertionResultNew;
                    });
                }
                return this.assertionResult;
            }
        }
    },
    created: function () {},
    watch: {
        pk: function (newVal, oldVal) {
            this.assertionResult = null;
            this.assertionCounter = -1;
        }
    },
    methods: {
        initialize: function (isVisible, entry) {
            this.visible = isVisible;
        }
    },
    template: '<div v-observe-visibility="{callback: initialize}">' +
        '<h3>Recent Claims (Privately shared):</h3>' +
        '<span v-if="assertions"><span v-if="assertions.length == 0">None.</span></span>' +
        '<ul v-if="assertions" style="max-height:10rem;overflow-y:scroll;">' +
        '<assertion v-for="item in assertions" :uri="item.id"></assertion>' +
        '</ul>' +
        '<div v-else>Loading Assertions...</div>' +
        '</div>'
});
