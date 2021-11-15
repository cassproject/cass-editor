Vue.component('profiles', {
    props: ['profiles', 'identities'],
    data: function () {
        return {};
    },
    computed: {},
    methods: {
        changeSelected: function (pk) {
            app.subject = pk;
            //$("#rad2").click();
        }
    },
    template: '<div>' +
    '<ul>' +
    '<profile v-if="identities" v-for="item in identities" v-bind:key="item.ppk.toPk().toPem()" :pk="item.ppk.toPk().toPem()" :displayName="item.displayName" :onClick="changeSelected"></profile>' +
    '<profile v-if="profiles" v-for="item in profiles" v-bind:key="item.pk.toPem()" :pk="item.pk.toPem()" :displayName="item.displayName" :onClick="changeSelected"></profile>' +
    '<div v-else><br>Loading Profiles...</div>' +
    '</ul>' +
    '</div>'
});