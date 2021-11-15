Vue.component('jobPostingSelect', {
    props: ['uri'],
    data: function () {
        return {};
    },
    created: function () {},
    computed: {
        resource: {
            get: function () {
                var resource = EcRepository.getBlocking(this.uri);
                var count = 0;
                while (count++ < 50 && resource.url != null && resource.url.indexOf(repo.selectedServer) != -1)
                    resource = EcRepository.getBlocking(resource.url);
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
                    return resource.additionalType;
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
        },
        setJobPosting: function () {
            app.selectedJobPosting = this.uri;
            showPage('8');
        }
    },
    template: '<li class="jobPostingSelect">' +
        '<div v-if="mine" v-on:click="deleteMe" style="float:right;cursor:pointer;">X</div>' +
        '<i class="mdi mdi-briefcase-outline" aria-hidden="true"></i> ' +
        '<a v-on:click="setJobPosting" href="#" style="cursor:pointer;">' +
        '{{ name }}' +
        ' <span v-if="count">({{count}} required skills)</span>' + '</a> ' +
        '<small v-on:click="setJobPosting" v-if="description" class="block">{{ description }}</small>' +
        '</li>'
});
