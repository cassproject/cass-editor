Vue.component('jobpostingdetail', {
    props: ['uri', 'subject'],
    data: function () {
        return {};
    },
    computed: {
        resource: {
            get: function () {
                var resource = EcRepository.getBlocking(this.uri);
                return resource;
            }
        },
        name: {
            get: function () {
                if (this.uri == null) return "Untitled Posting.";
                var resource = this.resource;
                if (resource != null && resource.title != null)
                    return resource.title;
                else
                    return "Unknown Posting.";
            }
        },
        type: {
            get: function () {
                if (this.uri == null) return "Untitled Posting.";
                var resource = this.resource;
                if (resource != null && resource.additionalType != null)
                    return {
                        "jobPostingType://gig": "Gig",
                        "jobPostingType://job": "Job",
                        "jobPostingType://position": "Position",
                        "jobPostingType://temp": "Temporary Position"
                    }[resource.additionalType];
                else
                    return null;
            }
        },
        mine: {
            get: function () {
                if (this.uri == null) return null;
                var resource = this.resource;
                if (resource != null) {
                    if (resource.owner == null || resource.owner.length == 0)
                        return true;
                    return resource.hasOwner(EcIdentityManager.ids[0].ppk.toPk());
                } else
                    return null;
            }
        },
        count: {
            get: function () {
                if (this.uri == null) return null;
                var resource = this.resource;
                if (resource != null && resource.skills != null) {
                    return resource.skills.length;
                } else
                    return null;
            }
        },
        description: {
            get: function () {
                if (this.uri == null) return null;
                var resource = this.resource;
                if (resource != null && resource.description != null)
                    return resource.description;
                else
                    return null;
            }
        },
        competencies: {
            get: function () {
                if (this.uri == null) return null;
                var resource = this.resource;
                if (resource != null && resource.skills != null)
                    return resource.skills;
                else
                    return null;
            }
        }
    },
    methods: {
        deleteMe: function () {
            var me = this;
            var resource = EcRepository.getBlocking(this.uri);
            EcRepository._delete(resource, function () {
                var c = app.selectedCompetency;
                app.selectedCompetency = null;
                me.$nextTick(function () {
                    app.selectedCompetency = c;
                    if (topicCompetencies[app.selectedCompetency.id] != null)
                        for (var i = 0; i < topicCompetencies[app.selectedCompetency.id].length; i++)
                            topicCompetencies[app.selectedCompetency.id][i].getResourceCount();
                });
            }, console.error);
        }
    },
    template: '<li class="jobPostingDetail">' +
        '<h2>{{type}}:</h2>' +
        '<div v-if="mine" v-on:click="deleteMe" style="float:right;cursor:pointer;">X</div>' +
        '<h3>' +
        '{{ name }}' +
        '</h3>' +
        '<pre v-if="description" class="block">{{ description }}</pre>' +
        '<hr>' +
        '<h3>Required Skills:</h3>' +
        '<ul v-if="competencies"><competency v-for="item in competencies" v-bind:key="item" :uri="item" :subject="subject"></competency></ul>' +
        '</li>'
});
