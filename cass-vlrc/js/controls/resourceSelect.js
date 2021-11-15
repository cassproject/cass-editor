Vue.component('resourceSelect', {
    props: ['uri'],
    data: function () {
        return {
            upvotes: 0,
            upvoted: false,
            downvotes: 0,
            downvoted: false,
            views: 0,
            viewed: false
        };
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
                if (this.uri == null) return "Untitled Resource.";
                var resource = this.resource;
                if (resource != null && resource.name != null)
                    return resource.name;
                else
                    return "Unknown Resource.";
            }
        },
        url: {
            get: function () {
                if (this.uri == null) return null;
                var resource = this.resource;
                if (resource != null && resource.url != null)
                    return resource.url;
                else
                    return null;
            }
        },
        urlTarget: {
            get: function () {
                if (this.uri == null) return null;
                var resource = this.resource;
                if (resource != null && resource.url != null)
                    return "_blank";
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
    created: function () {
        this.getVotes();
        this.getViews();
    },
    methods: {
        setResource: function () {
            app.selectedResource = EcRepository.getBlocking(this.uri);
            window.open(app.selectedResource.url, "lernnit");
            this.view();
        },
        deleteMe: function () {
            var me = this;
            var resource = EcRepository.getBlocking(this.uri);
            if (resource == null) return;
            EcRepository._delete(resource, function () {
                app.creativeWorksChanges++;
            }, console.error);
        },
        getVotes: function (evt) {
            var me = this;
            repo.searchWithParams(
                "(@type:LikeAction OR @type:DislikeAction) AND object:\"" + this.uri + "\"", {
                    size: 10000
                },
                function (action) {},
                function (actions) {
                    var addresses = {};
                    for (var i = 0; i < actions.length; i++) {
                        var action = actions[i];
                        if (addresses[action.owner[0]] == null)
                            addresses[action.owner[0]] = 0;
                        if (action.type == "LikeAction")
                            addresses[action.owner[0]] = addresses[action.owner[0]] + 1;
                        if (action.type == "DislikeAction")
                            addresses[action.owner[0]] = addresses[action.owner[0]] - 1;
                    }
                    var upvotes = 0;
                    var downvotes = 0;
                    me.upvoted = false;
                    me.downvoted = false;
                    for (var address in addresses) {
                        var value = addresses[address];
                        if (value < 0) {
                            downvotes++;
                            if (address == EcIdentityManager.ids[0].ppk.toPk().toPem())
                                me.downvoted = true;
                        } else if (value > 0) {
                            upvotes++;
                            if (address == EcIdentityManager.ids[0].ppk.toPk().toPem())
                                me.upvoted = true;
                        }
                    }
                    me.upvotes = upvotes;
                    me.downvotes = downvotes;
                }, console.error);
        },
        getViews: function (evt) {
            var me = this;
            repo.searchWithParams(
                "@type:ChooseAction AND object:\"" + this.uri + "\"", {
                    size: 10000
                },
                function (action) {},
                function (actions) {
                    var addresses = {};
                    for (var i = 0; i < actions.length; i++) {
                        var action = actions[i];
                        if (addresses[action.owner[0]] == null)
                            addresses[action.owner[0]] = 0;
                        if (action.type == "ChooseAction")
                            addresses[action.owner[0]] = addresses[action.owner[0]] + 1;
                    }
                    var views = 0;
                    me.viewed = false;
                    for (var address in addresses) {
                        var value = addresses[address];
                        if (value > 0) {
                            views += value;
                            if (address == EcIdentityManager.ids[0].ppk.toPk().toPem())
                                me.viewed = true;
                        }
                    }
                    me.views = views;
                }, console.error);
        },
        view: function (evt, after) {
            var chooseAction = new ChooseAction();
            chooseAction.generateId(repo.selectedServer);
            chooseAction.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            chooseAction.object = this.uri;
            EcRepository.save(chooseAction, this.getViews, console.error);
        },
        unview: function (evt, after) {
            var me = this;
            var a = after;
            repo.search(
                "@type:ChooseAction AND object:\"" + this.uri + "\" AND \\*owner:\"" + EcIdentityManager.ids[0].ppk.toPk().toPem() + "\"",
                function (view) {
                    EcRepository._delete(view, me.getViews, console.error);
                    viewHistory.removeView(view);
                },
                function (views) {
                    if (a != null) a();
                }, console.error);
        },
        upvote: function (evt, after) {
            var me = this;
            this.undownvote(evt, function () {
                var likeAction = new LikeAction();
                likeAction.generateId(repo.selectedServer);
                likeAction.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                likeAction.object = me.uri;
                EcRepository.save(likeAction, me.getVotes, console.error);
            });
        },
        unupvote: function (evt, after) {
            var me = this;
            var a = after;
            repo.search(
                "@type:LikeAction AND object:\"" + this.uri + "\" AND \\*owner:\"" + EcIdentityManager.ids[0].ppk.toPk().toPem() + "\"",
                function (like) {
                    EcRepository._delete(like, me.getVotes, console.error);
                },
                function (likes) {
                    if (a != null) a();
                }, console.error);
        },
        downvote: function (evt, after) {
            var me = this;
            this.unupvote(evt, function () {
                var dislikeAction = new DislikeAction();
                dislikeAction.generateId(repo.selectedServer);
                dislikeAction.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                dislikeAction.object = me.uri;
                EcRepository.save(dislikeAction, me.getVotes, console.error);
            });
        },
        undownvote: function (evt, after) {
            var me = this;
            var a = after;
            repo.search(
                "@type:DislikeAction AND object:\"" + this.uri + "\" AND \\*owner:\"" + EcIdentityManager.ids[0].ppk.toPk().toPem() + "\"",
                function (dislike) {
                    EcRepository._delete(dislike, me.getVotes, console.error);
                },
                function (dislikes) {
                    if (a != null) a();
                }, console.error);
        }
    },
    template: '<li class="resource tile">' +
        '<div v-if="mine" v-on:click="deleteMe" style="float:right;cursor:pointer;">X</div>' +
        '<button class="inline" v-if="upvoted" v-on:click="unupvote" title="Remove Upvote"><i class="mdi mdi-thumb-up-outline" aria-hidden="true"> {{upvotes}}</i></button>' +
        '<button class="inline" v-else v-on:click="upvote" title="Upvote"><i class="mdi mdi-thumb-up" aria-hidden="true"> {{upvotes}}</i></button> ' +
        '<button class="inline" v-if="downvoted" v-on:click="undownvote" title="Remove Downvote"><i class="mdi mdi-thumb-down-outline" aria-hidden="true"> {{downvotes}}</i></button> ' +
        '<button class="inline" v-else v-on:click="downvote" title="Remove Downvote"><i class="mdi mdi-thumb-down" aria-hidden="true"> {{downvotes}}</i></button> ' +
        '<button class="inline" v-if="viewed" v-on:click="unview" title="By clicking this, I did not really view this."><i class="mdi mdi-eye-off-outline" aria-hidden="true"> {{views}}</i></button> ' +
        '<button class="inline" v-else v-on:click="view" title="By clicking this, I viewed this already."><i class="mdi mdi-eye-outline" aria-hidden="true"> {{views}}</i></button> ' +
        '<a v-on:click="setResource" :href="url" :target="urlTarget" style="cursor:pointer;">' +
        '<i class="mdi mdi-link-variant" aria-hidden="true"></i>' +
        '{{ name }}' +
        '</a> ' +
        '<small v-on:click="setResource" v-if="description" class="block">{{ description }}</small>' +
        '</li>'
});
