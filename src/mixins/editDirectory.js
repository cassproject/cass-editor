export default {
    methods: {
        deleteObject: function(obj) {
            appLog("deleting " + obj.id);
            var me = this;
            this.repo.search("(directory:\"" + obj.shortId() + "\" OR parentDirectory:\"" + obj.shortId() + "\")", function() {}, function(success) {
                new EcAsyncHelper().each(success, function(obj, done) {
                    if (obj.type === 'Framework') {
                        me.deleteFramework(obj);
                    } else if (obj.type === 'CreativeWork') {
                        me.repo.deleteRegistered(obj, appLog, appError);
                    } else if (obj.type === "Directory") {
                        me.deleteObject(obj);
                    }
                    done();
                }, function(objs) {
                    me.repo.deleteRegistered(obj, function() {
                        me.$store.dispatch('app/refreshDirectories');
                    }, appError);
                    if (obj.shortId() === me.directory.shortId()) {
                        me.$router.push({name: "frameworks"});
                    }
                });
            }, appError);
        },
        deleteFramework: function(framework) {
            let me = this;
            this.repo.deleteRegistered(framework, function(success) {
                me.spitEvent("frameworkDeleted", framework.shortId(), "directoryPage");
                // Delete the framework, delete all non-used stuff.
                if (framework.competency != null) {
                    for (var i = 0; i < framework.competency.length; i++) {
                        me.conditionalDelete(framework.competency[i]);
                    }
                }
                if (framework.relation != null) {
                    for (var i = 0; i < framework.relation.length; i++) {
                        me.conditionalDelete(framework.relation[i]);
                    }
                }
                if (framework.level != null) {
                    for (var i = 0; i < framework.level.length; i++) {
                        me.conditionalDelete(framework.level[i]);
                    }
                }
            }, appLog);
        },
        onDoneEditingNode: function() {
            let me = this;
            if (this.$store.getters['app/rightAsideObject']) {
                EcRepository.get(this.$store.getters['app/rightAsideObject'].shortId(), function(success) {
                    me.$store.commit('app/rightAsideObject', success);
                }, appError);
            }
            this.$store.commit('app/editDirectory', false);
        }
    },
    computed: {
        editDirectory: function() {
            return this.$store.getters['app/editDirectory'];
        },
        canEditDirectory: function() {
            if (this.queryParams && this.queryParams.view === 'true') {
                return false;
            } else if (!this.directory.canEditAny(EcIdentityManager.getMyPks())) {
                return false;
            }
            return true;
        },
        directory: function() {
            return this.$store.getters['app/rightAsideObject'];
        },
        directoryProfile: function() {
            return {
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Directory"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The name of the directory."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "isRequired": "true"
                },
                "http://schema.org/description": {
                    "@id": "http://schema.org/description",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Directory"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The description of the directory."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Description"}]
                },
                "@id": {
                    "@id": "https://schema.cassproject.org/0.4/Framework/id",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                    [{"@id": "https://schema.cassproject.org/0.4/Framework"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/URL"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                    [{"@language": "en", "@value": "The URL of the framework."}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Framework URL"}],
                    "readOnly": "true",
                    "max": 1,
                    "heading": "Keys"
                },
                "primaryProperties": [
                    "http://schema.org/name",
                    "http://schema.org/description"
                ],
                "secondaryProperties": ["@id"],
                "tertiaryProperties": []
            };
        },
        changedObject: function() {
            return this.$store.getters['editor/changedObject'];
        }
    },
    watch: {
        changedObject: function() {
            if (this.changedObject && this.changedObject === this.directory.shortId()) {
                let me = this;
                EcRepository.get(this.directory.shortId(), function(dir) {
                    if (me.$store.getters['app/selectedDirectory'] && me.$store.getters['app/selectedDirectory'].shortId() === dir.shortId()) {
                        me.$store.commit('app/selectDirectory', dir);
                    } else {
                        me.$store.commit('app/refreshSearch', true);
                    }
                    if (me.showRightAside && dir.shortId() === me.$store.getters['app/rightAsideObject'].shortId()) {
                        me.$store.commit('app/rightAsideObject', dir);
                    }
                }, appError);
                this.$store.commit('editor/changedObject', null);
            }
        }
    }
};