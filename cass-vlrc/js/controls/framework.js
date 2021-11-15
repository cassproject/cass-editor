/**
 * @property uri - URI of the framework
 * @property subject - Subject to use to measure competence, see if they have this as a goal, etc.
 * @property subjectPerson - Person object to use to see if they have this as a goal, etc.
 * @property competencyUri - Only show the tree under this URI, if present.
 */
Vue.component('framework', {
    props: ['uri', 'subject', 'subjectperson', 'competencyUri'],
    data: function () {
        return {
            competency: null,
            computedStateActual: null,
            computedStateAssertionLength: -1,
            visible: false,
            once: false,
            calculate: false
        }
    },
    computed: {
        competencies: {
            get: function () {
                var me = this;
                if (!this.once) return null;
                if (this.uri == null) return null;
                if (this.competency != null)
                    return this.competency;
                EcFramework.get(this.uri, function (f) {
                    var precache = [];
                    if (f.competency != null) precache = precache.concat(f.competency);
                    if (f.relation != null) precache = precache.concat(f.relation);
                    topicCompetencies = {};
                    repo.multiget(precache, function (success) {
                        var r = {};
                        var top = {};
                        if (f == null)
                            return r;
                        if (f.competency != null)
                            for (var i = 0; i < f.competency.length; i++) {
                                var c = EcCompetency.getBlocking(f.competency[i]);
                                if (c != null)
                                    r[f.competency[i]] = r[c.shortId()] = top[c.shortId()] = c;
                            }
                        if (f.relation != null)
                            for (var i = 0; i < f.relation.length; i++) {
                                var a = null;
                                try {
                                    a = EcAlignment.getBlocking(f.relation[i]);
                                } catch (e) {
                                }
                                if (a != null) {
                                    if (a.relationType == Relation.NARROWS) {
                                        if (r[a.target] == null) continue;
                                        if (r[a.source] == null) continue;
                                        if (r[a.target].hasChild == null)
                                            r[a.target].hasChild = [];
                                        r[a.target].hasChild.push(r[a.source]);
                                        delete top[a.source];
                                    }
                                }
                            }
                        if (f.competency != null)
                            for (var i = 0; i < f.competency.length; i++) {
                                if (r[f.competency[i]].hasChild == null) continue;
                                r[f.competency[i]].hasChild.sort(function (a, b) {
                                    return f.competency.indexOf(a.shortId()) - f.competency.indexOf(b.shortId());
                                });
                            }
                        me.competency = [];
                        var keys = EcObject.keys(top);
                        if (me.competencyUri != null)
                            me.competency.push(r[me.competencyUri]);
                        else
                            for (var i = 0; i < keys.length; i++)
                                me.competency.push(top[keys[i]]);
                        me.competency.sort(function (a, b) {
                            return f.competency.indexOf(a.shortId()) - f.competency.indexOf(b.shortId());
                        });

                    }, console.error, console.log);
                }, console.error);
                return this.competency;
            },
            set: function (v) {
                this.competency = v;
            }
        },
        name: function () {
            if (this.uri == null)
                return "N/A";
            return EcFramework.getBlocking(this.uri).getName();
        },
        description: function () {
            if (this.uri == null)
                return null;
            return EcFramework.getBlocking(this.uri).getDescription();
        },
        permalink: function () {
            return window.location.origin + window.location.pathname + "?frameworkId=" + EcRemoteLinkedData.trimVersionFromUrl(this.uri);
        },
        computedState: function () {
            var me = this;
            if (this.calculate == false)
                return 0;
            if (!this.once) return;
            if (this.competencies == null) return;
            var uri = this.uri;
            if (this.computedStateAssertionLength != app.assertionsChanges) {
                this.computedStateActual = null;
                this.computedStateAssertionLength = app.assertionsChanges;
                var hash = this.computedStateAssertionLength + app.assertionsChanges + this.uri;
                console.log("Started processing: " + new Date() + " " + hash);
                var assertions = [];
                new EcAsyncHelper().each(app.assertions, function (a, done) {
                    if (a == null)
                        done();
                    else
                        a.getSubjectAsync(function (subject) {
                            if (subject.toPem() == me.subject)
                                assertions.push(a);
                            done();
                        }, done);
                }, function (as) {
                    var frameworkGraph = new EcFrameworkGraph();
                    frameworkGraph.addFramework(EcFramework.getBlocking(me.uri), repo, function () {
                        frameworkGraph.processAssertionsBoolean(assertions, function () {
                            if (hash == me.computedStateAssertionLength + app.assertionsChanges + me.uri) {
                                for (var key in frameworkGraph.metaVerticies)
                                    delete frameworkGraph.metaVerticies[key].framework;
                                me.computedStateActual = frameworkGraph;
                                console.log("Finished processing (overwrite): " + new Date() + " " + hash);
                            } else
                                console.log("Finished processing (abort): " + new Date() + " " + hash);
                        }, console.error);
                    }, console.error);
                });
            }
            return this.computedStateActual;
        }
    },
    watch: {
        uri: function (newUri, oldUri) {
            this.competency = null;
            this.computedStateAssertionLength = -1;
            this.once = false;
        },
        subject: function (newSubject, oldSubject) {
            this.computedStateAssertionLength = -1;
        }
    },
    methods: {
        initialize: function (isVisible, entry) {
            this.visible = isVisible;
            if (isVisible && this.once != true) {
                this.once = true;
            }
        }
    },
    template: '<div class="framework" v-observe-visibility="{callback: initialize}">' +
    '<div class="frameworkNameAndDescription">{{ name }}<small v-if="description" class="block">{{ description }}</small></div>' +
    '<span class="buttons btop fright">' +
    '<button class="inline"><a style="float:right;cursor:pointer;" :href="permalink"><i class="mdi mdi-18px mdi-link" aria-hidden="true"></i>Permalink</a></button>' +
    '<button class="inline" v-if="calculate == true" style="color:blue;" v-on:click="calculate = false" title="Turn off processing."><i class="mdi mdi-18px mdi-cogs" aria-hidden="true"></i> Processing</button>' +
    '<button class="inline" v-if="calculate == false" v-on:click="calculate = true" title="Turn on processing, showing estimated ability."><i class="mdi mdi-18px mdi-cogs" aria-hidden="true"></i> Processing</button>' +
    '</span>' +
    '<ul v-if="competencies"><competency v-for="item in competencies" v-bind:key="item.id" :uri="item.id" :hasChild="item.hasChild" :subjectPerson="subjectperson" :frameworkUri="uri" :computedState="computedState" :subject="subject"></competency></ul>' +
    '<div v-else><br>Loading Framework...</div></div>'
});
