<template>
    <span
        class="assertion"
        v-observe-visibility="{callback: initialize,once: true}">
        <span>
            <li v-if="ok">
                <strong>{{ agent }}</strong>
                <span v-if="timestamp"> claimed {{ timeAgo }}:</span>
                <span class="statement antitile">
                    <span v-if="negative"><strong> {{ subject }}</strong> can't do this</span>
                    <span v-else><strong> {{ subject }}</strong> can do this</span>
                    <span v-if="evidenceText"> because they
                        <span
                            v-for="(evidenceThing, index) in evidenceText"
                            :key="index">
                            <span v-if="index != 0"> and they </span>
                            <a
                                v-if="evidenceThing.url"
                                :href="evidenceThing.url"
                                target="_blank"> {{ evidenceThing.text }}</a>
                            <span v-else> {{ evidenceThing.text }}</span>
                        </span>
                    </span>
                    <span v-if="badged"> and I issued them a <a :href="badgeUrl">badge</a></span>.
                </span>
            </li>
        </span>
    </span>
</template>
<script>

export default {
    name: 'Assertion',
    props: {
        uri: String,
        icon: Boolean
    },
    data: function() {
        return {
            assertion: null,
            subjectPk: null,
            agentPk: null,
            agent: null,
            timestamp: null,
            expiry: null,
            competency: null,
            negative: null,
            agentPerson: null,
            subjectPerson: null,
            evidence: null,
            evidenceExplanation: null,
            subject: null
        };
    },
    computed: {
        ok: function() {
            if (this.subject == null) {
                return false;
            }

            if (this.agent == null) {
                return false;
            }

            if (this.competency == null) {
                return false;
            }

            return true;
        },
        statement: function() {
            if (this.subject == null) {
                return "Decrypting...";
            }

            if (this.agent == null) {
                return "Decrypting...";
            }

            if (this.competency == null) {
                return "Decrypting...";
            }

            var statement = "";
            if (this.timestamp != null) {
                statement += this.$moment(this.timestamp).fromNow() + ", ";
            }

            statement += this.agent + " claimed " + this.subject;

            if (this.negative === true) {
                statement += " could not ";
            } else {
                statement += " could ";
            }

            statement += "demonstrate \"" + this.competencyText + "\".";
            return statement;
        },
        timeAgo: function() {
            if (this.timestamp == null) {
                return null;
            }
            return this.$moment(this.timestamp).fromNow();
        },
        competencyText: function() {
            if (this.competency == null) {
                return null;
            }
            return this.competency.name;
        },
        evidenceText: function() {
            return this.evidenceExplanation;
        },
        fingerprintUrl: function() {
            if (this.agentPerson == null) {
                return null;
            }
            if (this.agentPerson.email != null) {
                return "https://www.gravatar.com/avatar/" + EcCrypto.md5(this.agentPerson.email.toLowerCase()) + "?s=22";
            }
            return "http://tinygraphs.com/spaceinvaders/" + this.agentPerson.getGuid() + "?theme=base&numcolors=16&size=22&fmt=svg";
        },
        badged: function() {
            if (this.assertion == null) {
                return false;
            }
            return this.assertion.hasReader(this.$store.getters['editor/badgePk']);
        },
        badgeUrl: function() {
            if (this.assertion != null) {
                if (this.assertion.hasReader(this.$store.getters['editor/badgePk'])) {
                    return EcRemote.urlAppend(window.repo.selectedServer, "badge/assertion/") + this.assertion.getGuid();
                }
            }
            return "";
        }
    },
    watch: {
        evidence: function(oldEvidence, newEvidence) {
            this.evidenceExplanation = null;
            if (this.evidence != null) {
                if (this.evidence.length > 0) {
                    this.$store.dispatch('editor/computeBecause', this.evidence).then((because) => {
                        this.$nextTick(() => {
                            this.evidenceExplanation = because;
                        });
                    });
                }
            }
        }
    },
    methods: {
        initialize: function(isVisible, entry) {
            if (isVisible) {
                EcAssertion.get(this.uri, (assertion) => {
                    this.assertion = assertion;
                    if (assertion.subject == null) {
                        this.subject = "nobody";
                    } else {
                        assertion.getSubjectName(window.repo).then((name) => {
                            this.subject = name;
                        }).catch(appError);
                        assertion.getSubjectAsync((pk) => {
                            this.subjectPk = pk.toPem();
                        }, appError);
                    }
                    if (assertion.agent == null) {
                        this.agent = "nobody";
                    } else {
                        assertion.getAgentName(window.repo).then((name) => {
                            this.agent = name;
                        }).catch(appError);
                    }
                    assertion.getAgentAsync((pk) => {
                        this.agentPk = pk.toPem();
                        this.getAgent();
                    }, appError);
                    if (assertion.assertionDate != null) {
                        assertion.getAssertionDateAsync((assertionDate) => {
                            this.timestamp = assertionDate;
                        }, appError);
                    }
                    if (assertion.expirationDate != null) {
                        assertion.getExpirationDateAsync((expirationDate) => {
                            this.expiry = expirationDate;
                        }, appError);
                    }
                    if (assertion.negative != null) {
                        assertion.getNegativeAsync((negative) => {
                            this.negative = negative;
                        }, appError);
                    } else {
                        this.negative = false;
                    }
                    if (assertion.evidence != null) {
                        for (var i = 0; i < assertion.getEvidenceCount(); i++) {
                            ((i) => {
                                assertion.getEvidenceAsync(i, (evidence) => {
                                    if (this.evidence == null) {
                                        this.evidence = [];
                                    }
                                    this.evidence.push(evidence);
                                    this.evidenceExplanation = null;
                                }, appError);
                            })(i);
                        }
                    }
                    EcCompetency.get(assertion.competency, (competency) => {
                        this.competency = competency;
                    }, appError);
                }, appError);
            }
        },
        gotoCompetency: function() {
            // TODO
            // EcFramework.search(repo, "competency:\"" + this.assertion.competency + "\"", (frameworks) => {
            //     if (frameworks.length > 0) {
            //         app.selectedFramework = frameworks[0];
            //         app.selectedCompetency = EcCompetency.getBlocking(me.assertion.competency);
            //         app.subject = me.assertion.getSubject().toPem();
            //         $("#rad2").click();
            //         setTimeout(
            //             function () {
            //                 $("[id=\"" + app.selectedCompetency.id + "\"]").each(function () {
            //                     $(this)[0].scrollIntoView();
            //                 })
            //             }, 1000);
            //     }
            // }, appError);
        },
        getAgent: function() {
            this.agentPerson = null;
            let me = this;
            EcPerson.search(window.repo, EcPk.fromPem(me.agentPk).fingerprint(), (persons) => {
                if (persons.length === 0) {
                    var pk = EcPk.fromPem(me.agentPk);
                    var p = new Person();
                    p.assignId(window.repo.selectedServer, pk.fingerprint());
                    p.addOwner(pk);
                    if (this.displayName === null) {
                        p.name = "Unknown Person.";
                    } else {
                        p.name = this.displayName;
                    }
                    this.agentPerson = p;
                } else {
                    this.agentPerson = persons[0];
                }
            }, (failure) => {
                var pk = EcPk.fromPem(me.agentPk);
                var p = new Person();
                p.assignId(window.repo.selectedServer, pk.fingerprint());
                p.addOwner(pk);
                if (this.displayName === null) {
                    p.name = "Unknown Person.";
                } else {
                    p.name = this.displayName;
                }
                this.agentPerson = p;
            });
        },
        getSubject: function() {
            this.agentPerson = null;
            let me = this;
            EcPerson.search(window.repo, EcPk.fromPem(me.subjectPk).fingerprint(), (persons) => {
                if (persons.length === 0) {
                    var pk = EcPk.fromPem(me.subjectPk);
                    var p = new Person();
                    p.assignId(window.repo.selectedServer, pk.fingerprint());
                    p.addOwner(pk);
                    if (this.displayName === null) {
                        p.name = "Unknown Person.";
                    } else {
                        p.name = this.displayName;
                    }
                    this.subjectPerson = p;
                } else {
                    this.subjectPerson = persons[0];
                }
            }, (failure) => {
                var pk = EcPk.fromPem(me.subjectPk);
                var p = new Person();
                p.assignId(window.repo.selectedServer, pk.fingerprint());
                p.addOwner(pk);
                if (this.displayName === null) {
                    p.name = "Unknown Person.";
                } else {
                    p.name = this.displayName;
                }
                this.subjectPerson = p;
            });
        }
    }
};
</script>
