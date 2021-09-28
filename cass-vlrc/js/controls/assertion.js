Vue.component('assertion', {
    props: ['uri', 'icon', 'short'],
    data: function () {
        return {
            assertion: null,
            subject: null,
            subjectPk: null,
            agentPk: null,
            agent: null,
            timestamp: null,
            expiry: null,
            competency: null,
            negative: null,
            agentPerson: null,
            evidence: null,
            evidenceExplanation: null
        };
    },
    computed: {
        ok: {
            get: function () {
                if (this.subject == null)
                    return false;
                if (this.agent == null)
                    return false;
                if (this.competency == null)
                    return false;
                return true;
            }

        },
        statement: {
            get: function () {
                if (this.subject == null)
                    return "Decrypting...";
                if (this.agent == null)
                    return "Decrypting...";
                if (this.competency == null)
                    return "Decrypting...";
                var statement = "";
                if (this.timestamp != null)
                    statement += moment(this.timestamp).fromNow() + ", ";
                statement += this.agent + " claimed " + this.subject;
                if (this.negative == true)
                    statement += " could not ";
                else
                    statement += " could ";
                statement += "demonstrate \"" + this.competencyText + "\".";
                return statement;
            }
        },
        timeAgo: {
            get: function () {
                if (this.timestamp == null)
                    return null;
                return moment(this.timestamp).fromNow();
            }
        },
        competencyText: {
            get: function () {
                if (this.competency == null)
                    return null;
                return this.competency.name;
            }
        },
        evidenceText: {
            get: function () {
                var me = this;
                if (this.evidenceExplanation == null)
                    if (this.evidence != null)
                        if (this.evidence.length > 0)
                            app.computeBecause(this.evidence, function (because) {
                                me.$nextTick(function () {
                                    me.evidenceExplanation = because;
                                });
                            });
                return this.evidenceExplanation;
            }
        },
        fingerprintUrl: {
            get: function () {
                if (this.agentPerson == null) {
                    return null;
                }
                if (this.agentPerson.email != null) {
                    return "https://www.gravatar.com/avatar/" + EcCrypto.md5(this.agentPerson.email.toLowerCase()) + "?s=22";
                }
                return "http://tinygraphs.com/spaceinvaders/" + this.agentPerson.getGuid() + "?theme=base&numcolors=16&size=22&fmt=svg";
            }
        },
        badged: {
            get: function () {
                if (this.assertion == null)
                    return false;
                return this.assertion.hasReader(app.badgePk);
            }
        },
        badgeUrl: {
            get: function () {
                if (this.assertion != null)
                    if (this.assertion.hasReader(app.badgePk))
                        return EcRemote.urlAppend(repo.selectedServer, "badge/assertion/") + this.assertion.getGuid();
                return "";
            }
        }
    },
    created: function () {
    },
    watch: {
        evidence:function(oldEvidence,newEvidence){
            evidenceExplanation = null;
        }
    },
    methods: {
        initialize: function (isVisible, entry) {
            var me = this;
            if (isVisible) {
                EcAssertion.get(this.uri, function (assertion) {
                    me.assertion = assertion;
                    if (assertion.subject == null)
                        me.subject = "nobody"
                    else {
                        assertion.getSubjectNameAsync(function (name) {
                            me.subject = name;
                        }, console.error);
                        assertion.getSubjectAsync(function (pk) {
                            me.subjectPk = pk.toPem();
                        }, console.error);
                    }
                    if (assertion.agent == null)
                        me.agent = "nobody"
                    else
                        assertion.getAgentNameAsync(function (name) {
                            me.agent = name;
                        }, console.error);
                    assertion.getAgentAsync(function (pk) {
                        me.agentPk = pk.toPem();
                        me.getAgent();
                    }, console.error);
                    if (assertion.assertionDate != null)
                        assertion.getAssertionDateAsync(function (assertionDate) {
                            me.timestamp = assertionDate;
                        }, console.error);
                    if (assertion.expirationDate != null)
                        assertion.getExpirationDateAsync(function (expirationDate) {
                            me.expiry = expirationDate;
                        }, console.error);
                    if (assertion.negative != null)
                        assertion.getNegativeAsync(function (negative) {
                            me.negative = negative;
                        }, console.error);
                    else
                        me.negative = false;
                    if (assertion.evidence != null)
                        for (var i = 0; i < assertion.getEvidenceCount(); i++)
                            (function (i) {
                                assertion.getEvidenceAsync(i, function (evidence) {
                                    if (me.evidence == null)
                                        me.evidence = [];
                                    me.evidence.push(evidence);
                                    me.evidenceExplanation = null;
                                }, console.error);
                            })(i);
                    EcCompetency.get(assertion.competency, function (competency) {
                        me.competency = competency;
                    }, console.error);
                }, console.error);
            }
        },
        gotoCompetency: function () {
            var me = this;
            EcFramework.search(repo, "competency:\"" + this.assertion.competency + "\"", function (frameworks) {
                if (frameworks.length > 0) {
                    app.selectedFramework = frameworks[0];
                    app.selectedCompetency = EcCompetency.getBlocking(me.assertion.competency);
                    app.subject = me.assertion.getSubject().toPem();
                    $("#rad2").click();
                    setTimeout(
                        function () {
                            $("[id=\"" + app.selectedCompetency.id + "\"]").each(function () {
                                $(this)[0].scrollIntoView();
                            })
                        }, 1000);
                }
            }, console.error);
        },
        getAgent: function () {
            this.agentPerson = null;
            var me = this;
            EcRepository.get(repo.selectedServer + "data/schema.org.Person/" + EcPk.fromPem(me.agentPk).fingerprint(), function (person) {
                var e = new EcEncryptedValue();
                if (person.isAny(e.getTypes())) {
                    e.copyFrom(person);
                    e.decryptIntoObjectAsync(function (person) {
                        var p = new Person();
                        p.copyFrom(person);
                        me.agentPerson = p;
                    }, console.error);
                } else {
                    var p = new Person();
                    p.copyFrom(person);
                    me.agentPerson = p;
                }
            }, function (failure) {
                var pk = EcPk.fromPem(me.agentPk);
                var p = new Person();
                p.assignId(repo.selectedServer, pk.fingerprint());
                p.addOwner(pk);
                if (me.displayName == null)
                    p.name = "Unknown Person.";
                else
                    p.name = me.displayName;
                me.agentPerson = p;
            });
        },
    },
    template: '' +
    '<span class="assertion" v-observe-visibility="{callback: initialize,once: true}">' +
    '<span v-if="icon">' +
    '<i v-if="negative" class="mdi mdi-18px mdi-close-box-outline" aria-hidden="true" :title="statement"></i>' +
    '<i v-else class="mdi mdi-18px mdi-checkbox-marked-circle-outline" aria-hidden="true" :title="statement"></i>' +
    '</span>' +
    '<span v-else-if="short">' +
    '<li v-if="ok">' +
    '<img style="vertical-align: sub;" v-if="fingerprintUrl" :src="fingerprintUrl" :title="agent"/> <span style="color:blue">{{agent}}</span> ' +
    '<span v-if="timestamp">claimed {{ timeAgo }}:</span>' +
    '<span class="statement antitile">'+
    '<span v-if="negative">{{subject}} can&#39t do this</span>'+
    '<span v-else>{{subject}} can do this</span>'+
    '<span v-if="evidenceText"> because they ' +
    '<span v-for="(evidence, index) in evidenceText">' +
    '<span v-if="index != 0"> and they </span>' +
    '<a v-if="evidence.url" :href="evidence.url" target="_blank">{{evidence.text}}</a>' +
    '<span v-else >{{evidence.text}}</span>' +
    '</span>' +
    '</span>' +
    '<span v-if="badged"> and I issued them a <a :href="badgeUrl">badge</a></span>.'+
    '</span> ' +
    '</li>' +
    '</span>' +
    '<span v-else>' +
    '<li v-if="ok">' +
    '<span v-if="timestamp">{{ timeAgo }}, </span>' +
    '{{agent}} claimed {{subject}} ' +
    '<span v-if="negative">could not</span><span v-else>could</span>' +
    ' demonstrate <a href="#" v-on:click="gotoCompetency" :title="assertion.competency">{{ competencyText }}</a>' +
    '<span v-if="evidenceText"> because they ' +
    '<span v-for="(evidence, index) in evidenceText">' +
    '<span v-if="index != 0"> and they </span>' +
    '<a v-if="evidence.url" :href="evidence.url" target="_blank">{{evidence.text}}</a>' +
    '<span v-else >{{evidence.text}}</span>' +
    '</span>' +
    '</span>' +
    '<a v-if="badged" :href="badgeUrl">Badge</a>' +
    '</li>' +
    '</span>' +
    '</span>'

});
