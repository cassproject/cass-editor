<template>
    <div
        class="timelineElement"
        v-observe-visibility="{callback: initialize}">
        <span v-if="ok">
            <div
                class="assertionTimelineIcon"
                v-if="negative">
                <i class="fa fa-times" />
            </div>
            <div
                class="assertionTimelineIcon"
                v-else-if="badged">
                <i class="fa fa-shield-alt" />
            </div>
            <div
                class="assertionTimelineIcon"
                v-else>
                <i class="fa fa-check" />
            </div>
            <div class="content">
                <!-- <div
                    v-if="mine"
                    @click="deleteMe"
                    class="button is-text"
                    title="Delete this claim.">
                    <i class="fas fa-times" />
                </div> -->
                <!-- <img
                    v-if="fingerprintUrlAgent"
                    :src="fingerprintUrlAgent"
                    :title="agent">
                <svg
                    v-else
                    width="44"
                    height="44"
                    :data-jdenticon-value="fingerprintAgent"
                    :title="fingerprintAgent" /> -->
                <strong>{{ agent }}</strong> claimed
                <!-- <img
                    v-if="fingerprintUrlSubject"
                    :src="fingerprintUrlSubject"
                    :title="subject">
                <svg
                    v-else
                    width="44"
                    height="44"
                    :data-jdenticon-value="fingerprintSubject"
                    :title="fingerprintSubject" /> -->
                <strong>{{ subject }} </strong>
                <span v-if="negative">could not</span><span v-else>could</span>
                demonstrate
                <a
                    href="#"
                    @click="gotoCompetency"
                    :title="assertion.competency">
                    {{ competencyName }}
                    <span v-if="frameworkName"> in the subject area {{ frameworkName }}</span>
                </a>
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
                <span v-if="badged"> and has issued a
                    <a
                        target="_blank"
                        :href="badgeUrl"> badge</a>
                </span>.
                <br>
                <small>{{ competencyDescription }}</small>
                <div
                    class="time"
                    v-if="timestamp"><strong>{{ timeAgo }}</strong></div>
            </div>
        </span>
        <div
            class="time"
            v-else>
            <i class="mdi mdi-spin mdi-loading" />
        </div>
    </div>
</template>
<script>
import common from '@/mixins/common.js';
export default {
    name: 'TimelineElement',
    props: {
        uri: String
    },
    mixins: [common],
    data: function() {
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
            subjectPerson: null,
            evidence: null,
            evidenceExplanation: null
        };
    },
    computed: {
        timeAgo: function() {
            if (this.timestamp === null) {
                return null;
            }
            return this.$moment(this.timestamp).fromNow();
        },
        assertions: function() {
            return this.$store.getters['editor/assertions'];
        },
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
        competencyName: function() {
            if (this.competency == null) {
                return null;
            }
            return this.competency.getName();
        },
        frameworkName: function() {
            if (this.framework == null) {
                return null;
            }
            return this.framework.getName();
        },
        competencyDescription: function() {
            if (this.competency == null) {
                return null;
            }
            return this.competency.getDescription();
        },
        fingerprintUrlAgent: function() {
            if (this.agentPerson == null) {
                return null;
            }
            if (this.agentPerson.email != null) {
                return "https://www.gravatar.com/avatar/" + EcCrypto.md5(this.agentPerson.email.toLowerCase()) + "?s=44";
            }
            return null;
        },
        fingerprintUrlSubject: function() {
            if (this.subjectPerson == null) {
                return null;
            }
            if (this.subjectPerson.email != null) {
                return "https://www.gravatar.com/avatar/" + EcCrypto.md5(this.subjectPerson.email.toLowerCase()) + "?s=44";
            }
            return null;
        },
        fingerprintAgent: function() {
            if (this.agentPerson == null) {
                return null;
            }
            // TODO
            // setTimeout(() => {
            //     jdenticon()
            // }, 100);
            return this.agentPerson.getGuid();
        },
        fingerprintSubject: function() {
            if (this.subjectPerson == null) {
                return null;
            }
            // TODO
            // setTimeout(() => {
            //     jdenticon()
            // }, 100);
            return this.subjectPerson.getGuid();
        },
        mine: function() {
            if (this.uri == null) {
                return null;
            }
            var assertion = this.assertion;
            if (assertion !== null) {
                if (assertion.owner === null || assertion.owner.length === 0) {
                    return true;
                }
                return assertion.hasOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            } else {
                return null;
            }
        },
        evidenceText: function() {
            return this.evidenceExplanation;
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
                    return EcRemote.urlAppend(repo.selectedServer, "badge/assertion/") + this.assertion.getGuid();
                }
            }
            return "";
        }
    },
    destroyed: function() {
        clearInterval(this.invl);
    },
    watch: {
        evidence: function(oldEvidence, newEvidence) {
            this.evidenceExplanation = null;
            if (this.evidence != null) {
                if (this.evidence.length > 0) {
                    var count = this.evidence.length;
                    this.$store.dispatch('editor/computeBecause', this.evidence).then((because) => {
                        this.$nextTick(() => {
                            if (count === this.evidence.length) {
                                this.evidenceExplanation = because;
                            }
                        });
                    });
                }
            }
        }
    },
    methods: {
        initialize: function(isVisible, entry) {
            this.isVisible = isVisible;
            if (isVisible) {
                if (this.once) {
                    return;
                }
                this.once = true;
                this.getAssertion(isVisible, entry);
            }
        },
        getAssertion: function(isVisible, entry) {
            if (isVisible) {
                EcAssertion.get(this.uri, (assertion) => {
                    this.assertion = assertion;
                    if (assertion.subject === null) {
                        this.subject = "nobody";
                    } else {
                        assertion.getSubjectName(window.repo).then((name) => {
                            this.subject = name;
                        });
                        assertion.getSubjectAsync((pk) => {
                            this.subjectPk = pk.toPem();
                            this.getSubject();
                        }, console.error);
                    }
                    if (assertion.agent === null) {
                        this.agent = "nobody";
                    } else {
                        assertion.getAgentName(window.repo).then((name) => {
                            this.agent = name;
                        });
                    }
                    assertion.getAgentAsync((pk) => {
                        this.agentPk = pk.toPem();
                        this.getAgent();
                    }, console.error);
                    if (assertion.assertionDate != null) {
                        assertion.getAssertionDateAsync((assertionDate) => {
                            this.timestamp = assertionDate;
                        }, console.error);
                    }
                    if (assertion.expirationDate != null) {
                        assertion.getExpirationDateAsync((expirationDate) => {
                            this.expiry = expirationDate;
                        }, console.error);
                    }
                    if (assertion.negative != null) {
                        assertion.getNegativeAsync((negative) => {
                            this.negative = negative;
                        }, console.error);
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
                                }, console.error);
                            })(i);
                        }
                    }
                    if (assertion.framework != null) {
                        EcFramework.get(assertion.framework, (framework) => {
                            this.framework = framework;
                        }, console.error);
                    }
                    EcCompetency.get(assertion.competency, (competency) => {
                        this.competency = competency;
                    }, () => {
                        for (var i = 0; i < this.assertions.length; i++) {
                            while (this.assertions[i].id === assertion.id) {
                                this.$store.commit('editor/removeAssertionAtIndex', i);
                            }
                        }
                    });
                }, console.error);
            }
        },
        gotoCompetency: function() {
            EcFramework.search(window.repo, "competency:\"" + this.assertion.competency + "\"").then((success) => {
                if (success.length > 0) {
                    this.$store.commit('editor/framework', success[0]);
                    this.$store.commit('editor/clearFrameworkCommentData');
                    this.$store.commit('app/setCanViewComments', this.canViewCommentsCurrentFramework());
                    this.$store.commit('app/setCanAddComments', this.canAddCommentsCurrentFramework());
                    this.$router.push({name: "framework", params: {frameworkId: success[0].id}});
                }
            }).catch(appError);
        },
        getAgent: function() {
            this.agentPerson = null;
            EcRepository.get(window.repo.selectedServer + "data/schema.org.Person/" + EcPk.fromPem(this.agentPk).fingerprint(), (person) => {
                var e = new EcEncryptedValue();
                if (person.isAny(e.getTypes())) {
                    e.copyFrom(person);
                    e.decryptIntoObjectAsync((person) => {
                        var p = new EcPerson();
                        p.copyFrom(person);
                        this.agentPerson = p;
                    }, console.error);
                } else {
                    var p = new EcPerson();
                    p.copyFrom(person);
                    this.agentPerson = p;
                }
            }, (failure) => {
                var pk = EcPk.fromPem(this.agentPk);
                var p = new EcPerson();
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
            this.subjectPerson = null;
            EcRepository.get(window.repo.selectedServer + "data/schema.org.Person/" + EcPk.fromPem(this.subjectPk).fingerprint(), (person) => {
                var e = new EcEncryptedValue();
                if (person.isAny(e.getTypes())) {
                    e.copyFrom(person);
                    e.decryptIntoObjectAsync((person) => {
                        var p = new EcPerson();
                        p.copyFrom(person);
                        this.subjectPerson = p;
                    }, console.error);
                } else {
                    var p = new EcPerson();
                    p.copyFrom(person);
                    this.subjectPerson = p;
                }
            }, (failure) => {
                var pk = EcPk.fromPem(this.agentPk);
                var p = new EcPerson();
                p.assignId(window.repo.selectedServer, pk.fingerprint());
                p.addOwner(pk);
                if (this.displayName == null) {
                    p.name = "Unknown Person.";
                } else {
                    p.name = this.displayName;
                }
                this.subjectPerson = p;
            });
        },
        deleteMe: function() {
            EcRepository.get(this.uri, (resource) => {
                EcRepository._delete(resource, () => {
                    this.$store.commit('editor/removeAssertion', resource);
                }, console.error);
            });
        }
    }
};
</script>
