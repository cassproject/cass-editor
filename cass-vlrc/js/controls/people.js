Vue.component('people', {
    props: [],
    data: function () {
        return {
            search: ""
        };
    },
    recomputed: {
        people: {
            get: function () {
                if (app.people == null) return null;
                var results = [];
                for (var i = 0; i < app.people.length; i++) {
                    if (app.people[i].owner == null || app.people[i].length == 0)
                        continue;
                    if (EcPk.fromPem(app.people[i].owner[0]).fingerprint() != app.people[i].getGuid())
                        continue;
                    if (app.people[i].getName() == null)
                        continue;
                    if (this.search == "" || app.people[i].getName().toLowerCase().indexOf(this.search.toLowerCase()) != -1)
                        results.push(app.people[i]);
                }
                return results;
            }
        }
    },
    created: function () {
        var me = this;
        EcPerson.search(repo, "*", function (people) {
            for (var i = 0; i < people.length; i++) {
                if (people[i].owner == null || people[i].length == 0)
                    people.splice(i, 1);
                else if (EcPk.fromPem(people[i].owner[0]).fingerprint() != people[i].getGuid())
                    people.splice(i, 1);
            }
            app.people = people;
        }, console.error, {
            size: 5000
        });
    },
    watch: {
        search: function(newSearch){
            this.$recompute("people");
        }
    },
    methods: {
        changeSelected: function (pk) {
            app.subject = pk;
            $("#rad2").click();
        }
    },
    template: '<div>' +
    '<input type="text" class="frameworksSearchInput" placeholder="Search for people..." v-model="search"/>' +
    '<ul>' +
    '<profile v-if="people" v-for="item in people" :key="item.id" :pk="item.owner[0]" :displayName="item.name" :onClick="changeSelected"></profile>' +
    '</ul>' +
    '<div v-if="people != null && people.length == 0"><br>None found...</div>' +
    '<div v-if="people == null"><br>Loading People...</div>' +
    '</div>'
});
