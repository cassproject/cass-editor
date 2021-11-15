Vue.component('history', {
    props: [],
    data: function () {
        return {
            assertionResult: null,
            empty: false
        };
    },
    computed: {
        assertions: {
            get: function () {
                var me = this;
                if (this.assertionResult != null) {
                    this.empty = this.assertionResult.length == 0;
                    return this.assertionResult;
                }
                var search = "\"" + EcIdentityManager.ids[0].ppk.toPk().toPem() + "\" AND competency:\"" + app.selectedCompetency.shortId() + "\"";
                EcAssertion.search(repo, search,
                    function (assertions) {
                        me.assertionResult = assertions;
                    }, console.error, {
                        size: 50
                    });
                return null;
            }
        }
    },
    template: '<div>' +
    '<div v-if="empty"><br>None found...</div>' +
    '<div v-else>' +
    '<ul v-if="assertions"><assertion v-for="item in assertions" v-bind:key="item.id" :uri="item.id"></assertion></ul>' +
    '<div v-else>Loading History...</div>' +
    '</div>' +
    '</div>'
});