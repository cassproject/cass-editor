<template>
    <div
        class="assertions-group">
        <div class="assertions-buttons">
            <div class="left-buttons">
                <div
                    data-id="positiveAssertionButton"
                    class="button is-text"
                    :disabled="loading"
                    :class="{'active': canAssertion}"
                    @click="handleCanClick">
                    <i :class="canButtonIcon" />
                    {{ canButtonText }}
                </div>
                <div
                    data-id="negativeAssertionButton"
                    class="button is-text"
                    :disabled="loading"
                    :class="{'active': cannotAssertion}"
                    @click="handleCannotClick">
                    <i :class="cantButtonIcon" />
                    {{ cantButtonText }}
                </div>
            </div>
            <div class="right-button">
                <div
                    data-id="badgeButton"
                    class="button is-text"
                    :disabled="loading"
                    v-if="canAssertion"
                    @click="handleBadgeClick">
                    <template v-if="badgeExists">
                        <span class="text-icon">-</span> Remove Badge
                    </template>
                    <template v-else>
                        <span class="text-icon">+</span> Add Badge
                    </template>
                </div>
                <div
                    data-id="viewBadgeButton"
                    class="button is-text"
                    @click="viewBadge"
                    v-if="badgeExists">
                    View Badge
                </div>
            </div>
        </div>
        <div class="assertions-input">
            <input
                :disabled="loading"
                class="input is-narrow"
                type="text"
                v-if="assertionExists"
                @keyup.enter="handleEvidenceAssertion"
                v-model="assertionText"
                :placeholder="reasonPlaceholder">
        </div>
        <small
            class="assertions-evidence"
            v-if="evidenceExplanation && (assertionExists)">
            <hr>
            <ul>
                <li
                    data-id="evidenceElement"
                    v-for="(evidenceThing, index) in evidenceExplanation"
                    :key="index">
                    <a
                        v-if="evidenceThing.url"
                        :href="evidenceThing.url"
                        target="_blank">
                        {{ evidenceThing.text }}
                    </a>
                    <span v-else>{{ evidenceThing.text }}</span>
                    <div
                        data-id="removeEvidenceButton"
                        class="button is-text"
                        @click="handleUnevidenceAssertion(evidenceThing.original)">
                        <i class="fas fa-times" />
                    </div>
                </li>
            </ul>
        </small>
        <div
            v-if="assertionsByOthers && assertionsByOthers.length > 0"
            class="assertions-others">
            <Assertion
                v-for="item in assertionsByOthers"
                :key="uri+item.id"
                :uri="item.id"
                title="Assertion from elsewhere" />
        </div>
    </div>
</template>
<script>

export default {
    name: 'AssertionEditor',
    props: {
        uri: String
    },
    components: {
        Assertion: () => import('./Assertion.vue')
    },
    data: function() {
        return {
            loading: false,
            canAssertion: false,
            cannotAssertion: false,
            assertionText: '',
            badge: false,
            badgeLink: null,
            repo: window.repo,
            competentStateEah: null,
            evidence: null,
            evidenceExplanation: null,
            assertionsByOthers: [],
            iconAssertion: true
        };
    },
    created: function() {},
    mounted: function() {
        this.initAssertions();
    },
    computed: {
        badgeExists: function() {
            return this.badge;
        },
        assertionExists: function() {
            return this.canAssertion || this.cannotAssertion;
        },
        assertions: function() {
            let assertions = this.$store.getters['editor/assertions'].filter((a) => {
                return a.competency === EcRemoteLinkedData.trimVersionFromUrl(this.uri);
            });
            return assertions;
        },
        me: function() {
            return this.$store.getters['editor/getMe'];
        },
        subject: function() {
            return this.$store.getters['editor/getSubject'];
        },
        otherClaimsPhrase: function() {
            return "Others have made claims about " + (this.subject === this.me ? "you" : (this.subjectPerson === null ? "them" : this.subjectPerson)) + ". Click to expand.";
        },
        reasonPlaceholder: function() {
            if (this.me === this.subject) {
                return 'do this because I...';
            } else {
                return 'do this because they...';
            }
        },
        canButtonText: function() {
            if (this.me === this.subject) {
                return 'I can';
            } else {
                return 'They can';
            }
        },
        cantButtonText: function() {
            if (this.me === this.subject) {
                return "I can't";
            } else {
                return "They can't";
            }
        },
        canButtonIcon: function() {
            if (this.canAssertion) {
                return 'far fa-check-circle';
            } else {
                return 'far fa-circle';
            }
        },
        cantButtonIcon: function() {
            if (this.cannotAssertion) {
                return 'far fa-check-square';
            } else {
                return 'far fa-square';
            }
        },
        subjectPerson: function() {
            return this.$store.getters['editor/getSubjectName'];
        }
    },
    methods: {
        initAssertions: function() {
            this.canAssertion = false;
            this.cannotAssertion = false;
            this.assertionText = '';
            this.badge = false;
            this.badgeLink = null;
            this.competentStateEah = null;
            this.evidence = null;
            this.evidenceExplanation = null;
            this.assertionsByOthers = [];
            this.iconAssertion = true;

            if (this.competentStateEah != null) {
                this.competentStateEah.stop();
            }
            this.competentStateEah = new EcAsyncHelper();
            this.competentStateEah.each(this.assertions, (assertion, callback) => {
                if (assertion !== null) {
                    assertion.getSubjectAsync((subject) => {
                        if (this.subject === subject.toPem()) {
                            assertion.getAgentAsync((agent) => {
                                if (this.me === agent.toPem()) {
                                    var negativeCallback = () => {
                                        if (assertion.negative != null) {
                                            assertion.getNegativeAsync((negative) => {
                                                if (negative) {
                                                    this.canAssertion = false;
                                                    this.cannotAssertion = true;
                                                    this.badge = false;
                                                } else {
                                                    this.badge = assertion.hasReader(this.$store.getters['editor/badgePk']);
                                                    this.badgeLink = EcRemote.urlAppend(this.repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                                                    this.canAssertion = true;
                                                    this.cannotAssertion = false;
                                                }
                                                callback();
                                            }, callback);
                                        } else {
                                            this.canAssertion = true;
                                            this.cannotAssertion = false;
                                            this.badge = assertion.hasReader(this.$store.getters['editor/badgePk']);
                                            this.badgeLink = EcRemote.urlAppend(this.repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                                            callback();
                                        }
                                    };
                                    if (assertion.evidence != null) {
                                        assertion.getEvidencesAsync((evidences) => {
                                            this.evidence = evidences;
                                            this.$store.dispatch('editor/computeBecause', this.evidence).then((because) => {
                                                this.evidenceExplanation = because;
                                            });
                                            negativeCallback();
                                        }, callback);
                                    } else {
                                        this.evidence = null;
                                        this.evidenceExplanation = null;
                                        negativeCallback();
                                    }
                                } else {
                                    this.assertionsByOthers.push(assertion);
                                    callback();
                                }
                            }, callback);
                        } else {
                            callback();
                        }
                    }, callback);
                } else {
                    callback();
                }
            }, () => {
                // TODO
            });
        },
        handleEvidenceAssertion: async function() {
            this.loading = true;
            try {
                await this.evidenceAssertion();
            } catch (e) {
                appError(e);
            } finally {
                this.$nextTick(() => {
                    this.loading = false;
                });
            }
        },
        handleUnevidenceAssertion: async function(url) {
            this.loading = true;
            try {
                await this.unevidenceAssertion(url);
            } catch (e) {
                appError(e);
            } finally {
                this.$nextTick(() => {
                    this.loading = false;
                });
            }
        },
        handleBadgeClick: async function() {
            this.loading = true;
            try {
                if (this.badge) {
                    await this.revokeBadge();
                } else {
                    await this.generateBadge();
                }
            } catch (e) {
                appError(e);
            } finally {
                this.$nextTick(() => {
                    this.loading = false;
                });
            }
        },
        handleCanClick: async function() {
            if (this.loading) {
                return;
            }
            this.loading = true;
            try {
                if (this.canAssertion) {
                    await this.revokeBadge();
                    await this.revokeCanAssertion();
                } else {
                    if (this.cannotAssertion) {
                        await this.revokeCannotAssertion();
                    }
                    await this.generateCanAssertion();
                }
            } catch (e) {
                appError(e);
            } finally {
                this.$nextTick(() => {
                    this.loading = false;
                });
            }
        },
        handleCannotClick: async function() {
            if (this.loading) {
                return;
            }

            this.loading = true;
            try {
                if (this.cannotAssertion) {
                    await this.revokeCannotAssertion();
                } else {
                    if (this.canAssertion) {
                        await this.revokeBadge();
                        await this.revokeCanAssertion();
                    }
                    await this.generateCannotAssertion();
                }
            } catch (e) {
                appError(e);
            } finally {
                this.$nextTick(() => {
                    this.loading = false;
                });
            }
        },
        generateBadge: async function() {
            return new Promise((resolve, reject) => {
                EcCompetency.get(this.uri, (c) => {
                    if (this.assertions.length === 0) {
                        return;
                    }
                    var eah = new EcAsyncHelper();
                    eah.each(this.assertions, (assertion, callback) => {
                        if (c.isId(assertion.competency)) {
                            assertion.getSubjectAsync((subject) => {
                                if (this.subject === subject.toPem()) {
                                    assertion.getAgentAsync(async(agent) => {
                                        if (this.me === agent.toPem()) {
                                            if (assertion.negative == null) {
                                                await assertion.addReader(this.$store.getters['editor/badgePk']);
                                                EcRepository.save(assertion, () => {
                                                    // this.$store.commit('editor/addAssertion', assertion);
                                                    this.badgeLink = EcRemote.urlAppend(this.repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                                                    this.badge = true;
                                                    callback();
                                                }, callback);
                                            } else {
                                                assertion.getNegativeAsync(async(negative) => {
                                                    if (!negative) {
                                                        await assertion.addReader(this.$store.getters['editor/badgePk']);
                                                        EcRepository.save(assertion, () => {
                                                            // this.$store.commit('editor/addAssertion', assertion);
                                                            this.badgeLink = EcRemote.urlAppend(this.repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                                                            this.badge = true;
                                                            callback();
                                                        }, callback);
                                                    } else {
                                                        callback();
                                                    }
                                                }, callback);
                                            }
                                        } else {
                                            callback();
                                        }
                                    }, callback);
                                } else {
                                    callback();
                                }
                            }, callback);
                        } else {
                            callback();
                        }
                    }, () => {
                        resolve();
                    });
                }, reject);
            });
        },
        viewBadge: function() {
            window.open(this.badgeLink, '_blank');
        },
        revokeBadge: async function() {
            return new Promise((resolve, reject) => {
                EcCompetency.get(this.uri, (c) => {
                    if (this.assertions.length === 0) {
                        return;
                    }
                    var eah = new EcAsyncHelper();
                    eah.each(this.assertions, (assertion, callback) => {
                        if (c.isId(assertion.competency)) {
                            assertion.getSubjectAsync((subject) => {
                                if (this.subject === subject.toPem()) {
                                    assertion.getAgentAsync((agent) => {
                                        if (this.me === agent.toPem()) {
                                            if (assertion.negative == null) {
                                                assertion.removeReader(this.$store.getters['editor/badgePk']);
                                                EcRepository.save(assertion, () => {
                                                    // this.$store.commit('editor/addAssertion', assertion);
                                                    this.badgeLink = null;
                                                    this.badge = false;
                                                    callback();
                                                }, callback);
                                            } else {
                                                assertion.getNegativeAsync((negative) => {
                                                    if (!negative) {
                                                        assertion.removeReader(this.$store.getters['editor/badgePk']);
                                                        EcRepository.save(assertion, () => {
                                                            // this.$store.commit('editor/addAssertion', assertion);
                                                            this.badgeLink = null;
                                                            this.badge = false;
                                                            callback();
                                                        }, callback);
                                                    } else {
                                                        callback();
                                                    }
                                                }, callback);
                                            }
                                        } else {
                                            callback();
                                        }
                                    }, callback);
                                } else {
                                    callback();
                                }
                            }, callback);
                        } else {
                            callback();
                        }
                    }, () => {
                        resolve();
                    });
                }, reject);
            });
        },
        revokeCanAssertion: function() {
            return new Promise((resolve, reject) => {
                EcCompetency.get(this.uri, (c) => {
                    if (this.assertions.length === 0) {
                        return;
                    }
                    var eah = new EcAsyncHelper();
                    eah.each(this.assertions, (assertion, callback) => {
                        if (c.isId(assertion.competency)) {
                            assertion.getSubjectAsync((subject) => {
                                if (this.subject === subject.toPem()) {
                                    assertion.getAgentAsync((agent) => {
                                        if (this.me === agent.toPem()) {
                                            if (assertion.negative === null) {
                                                EcRepository._delete(assertion, () => {
                                                    this.$store.commit('editor/removeAssertion', assertion);
                                                    this.canAssertion = false;
                                                    callback();
                                                }, callback);
                                            } else {
                                                assertion.getNegativeAsync((negative) => {
                                                    if (!negative) {
                                                        EcRepository._delete(assertion, () => {
                                                            this.$store.commit('editor/removeAssertion', assertion);
                                                            this.canAssertion = false;
                                                            callback();
                                                        }, callback);
                                                    } else {
                                                        callback();
                                                    }
                                                }, callback);
                                            }
                                        } else {
                                            callback();
                                        }
                                    }, callback);
                                } else {
                                    callback();
                                }
                            }, callback);
                        } else {
                            callback();
                        }
                    }, () => {
                        resolve();
                    });
                }, reject);
            });
        },
        revokeCannotAssertion: function() {
            return new Promise((resolve, reject) => {
                EcCompetency.get(this.uri, (c) => {
                    if (this.assertions.length === 0) {
                        return;
                    }
                    var eah = new EcAsyncHelper();
                    eah.each(this.assertions, (assertion, callback) => {
                        if (c.isId(assertion.competency)) {
                            assertion.getSubjectAsync((subject) => {
                                if (this.subject === subject.toPem()) {
                                    assertion.getAgentAsync((agent) => {
                                        if (this.me === agent.toPem()) {
                                            if (assertion.negative != null) {
                                                assertion.getNegativeAsync((negative) => {
                                                    if (negative) {
                                                        EcRepository._delete(assertion, () => {
                                                            this.$store.commit('editor/removeAssertion', assertion);
                                                            this.cannotAssertion = false;
                                                            callback();
                                                        }, callback);
                                                    } else {
                                                        callback();
                                                    }
                                                }, callback);
                                            }
                                        } else callback();
                                    }, callback);
                                } else callback();
                            }, callback);
                        } else {
                            callback();
                        }
                    }, () => {
                        resolve();
                    });
                }, reject);
            });
        },
        generateCanAssertion: function() {
            return new Promise(async (resolve, reject) => {
                var a = new EcAssertion();
                a.generateId(this.repo.selectedServer);
                a.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                if (this.repo.adminKeys) {
                    for (let key of this.repo.adminKeys) {
                        let adminPk = EcPk.fromPem(key);
                        a.addOwner(adminPk);
                    }
                }
                a.setSubjectAsync(EcPk.fromPem(this.subject), () => {
                    a.setAgentAsync(EcPk.fromPem(this.me), () => {
                        a.setCompetency(EcRemoteLinkedData.trimVersionFromUrl(this.uri));
                        a.setAssertionDateAsync(Date.now(), () => {
                            a.setExpirationDateAsync(Date.now() + 1000 * 60 * 60 * 24 * 365, () => {
                                a.setNegativeAsync(false, () => {
                                    a.setConfidence(1.0);
                                    var evidences = [];
                                    // Go find viewActions on related resources to attach to the assertion.
                                    if (this.me === this.subject) {
                                        repo.searchWithParams(
                                            "@type:CreativeWork AND educationalAlignment.targetUrl:\"" + EcRemoteLinkedData.trimVersionFromUrl(this.uri) + "\"",
                                            {size: 5000},
                                            null,
                                            (resources) => {
                                                new EcAsyncHelper().each(
                                                    resources,
                                                    (resource, resourceCallback) => {
                                                        repo.searchWithParams(
                                                            "@type:ChooseAction AND object:\"" + resource.shortId() + "\" AND \\*owner:\"" + this.subject + "\"",
                                                            {size: 5000},
                                                            null,
                                                            (views) => {
                                                                for (var i = 0; i < views.length; i++) {
                                                                    evidences.push(views[i].shortId());
                                                                }
                                                                resourceCallback();
                                                            },
                                                            resourceCallback
                                                        );
                                                    }, (resources) => {
                                                        if (evidences.length > 0) {
                                                            a.setEvidenceAsync(evidences, () => {
                                                                EcRepository.save(a, () => {
                                                                    // this.$store.commit('editor/addAssertion', a);
                                                                    this.canAssertion = true;
                                                                    resolve();
                                                                }, reject);
                                                            }, reject);
                                                        } else {
                                                            EcRepository.save(a, () => {
                                                                // this.$store.commit('editor/addAssertion', a);
                                                                this.canAssertion = true;
                                                                resolve();
                                                            }, reject);
                                                        }
                                                    }
                                                );
                                            },
                                            reject
                                        );
                                    } else {
                                        EcRepository.save(a, () => {
                                            // this.$store.commit('editor/addAssertion', a);
                                            this.canAssertion = true;
                                            resolve();
                                        }, reject);
                                    }
                                }, reject); // This is an assertion that an individual *can* do something, not that they *cannot*.
                            }, reject); // UTC Milliseconds, 365 days in the future.
                        }, reject); // UTC Milliseconds
                    }, reject);
                }, reject);
            });
        },
        generateCannotAssertion: function() {
            return new Promise((resolve, reject) => {
                var a = new EcAssertion();
                a.generateId(this.repo.selectedServer);
                a.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                if (this.repo.adminKeys) {
                    for (let key of this.repo.adminKeys) {
                        let adminPk = EcPk.fromPem(key);
                        a.addOwner(adminPk);
                    }
                }
                a.setSubjectAsync(EcPk.fromPem(this.subject), () => {
                    a.setAgentAsync(EcPk.fromPem(this.me), () => {
                        a.setCompetency(EcRemoteLinkedData.trimVersionFromUrl(this.uri));
                        a.setAssertionDateAsync(Date.now(), () => {
                            a.setExpirationDateAsync(Date.now() + 1000 * 60 * 60 * 24 * 365, () => {
                                a.setNegativeAsync(true, () => {
                                    a.setConfidence(1.0);
                                    EcRepository.save(a, () => {
                                        // this.$store.commit('editor/addAssertion', a);
                                        this.cannotAssertion = true;
                                        resolve();
                                    }, reject);
                                }, reject); // This is an assertion that an individual *cannot* do something, not that they *can*.
                            }, reject); // UTC Milliseconds, 365 days in the future.
                        }, reject); // UTC Milliseconds
                    }, reject);
                }, reject);
            });
        },
        evidenceAssertion: async function() {
            return new Promise((resolve, reject) => {
                EcCompetency.get(this.uri, (c) => {
                    if (this.assertions.length === 0) {
                        return;
                    }
                    var eah = new EcAsyncHelper();
                    eah.each(this.assertions, (assertion, callback) => {
                        if (c.isId(assertion.competency)) {
                            assertion.getSubjectAsync((subject) => {
                                if (this.subject === subject.toPem()) {
                                    assertion.getAgentAsync((agent) => {
                                        if (this.me === agent.toPem()) {
                                            assertion.getEvidencesAsync(async(evidences) => {
                                                EcArray.setAdd(evidences, this.assertionText);
                                                this.assertionText = "";
                                                await assertion.setEvidence(evidences);
                                                EcRepository.save(assertion, () => {
                                                    // this.$store.commit('editor/addAssertion', assertion);
                                                    this.$store.dispatch('editor/computeBecause', evidences).then((because) => {
                                                        this.evidenceExplanation = because;
                                                    });
                                                    callback();
                                                }, callback);
                                            }, callback);
                                        } else {
                                            callback();
                                        }
                                    }, callback);
                                } else {
                                    callback();
                                }
                            }, callback);
                        } else {
                            callback();
                        }
                    }, () => {
                        resolve();
                    });
                }, reject);
            });
        },
        unevidenceAssertion: async function(url) {
            return new Promise((resolve, reject) => {
                EcCompetency.get(this.uri, (c) => {
                    if (this.assertions.length === 0) {
                        return;
                    }
                    var eah = new EcAsyncHelper();
                    eah.each(this.assertions, (assertion, callback) => {
                        if (c.isId(assertion.competency)) {
                            assertion.getSubjectAsync((subject) => {
                                if (this.subject === subject.toPem()) {
                                    assertion.getAgentAsync((agent) => {
                                        if (this.me === agent.toPem()) {
                                            assertion.getEvidencesAsync(async(evidences) => {
                                                EcArray.setRemove(evidences, url);
                                                await assertion.setEvidence(evidences);
                                                EcRepository.save(assertion, () => {
                                                    // this.$store.commit('editor/addAssertion', assertion);
                                                    this.$store.dispatch('editor/computeBecause', evidences).then((because) => {
                                                        this.evidenceExplanation = because;
                                                    });
                                                    callback();
                                                }, callback);
                                            }, callback);
                                        } else {
                                            callback();
                                        }
                                    }, callback);
                                } else {
                                    callback();
                                }
                            }, callback);
                        } else {
                            callback();
                        }
                    }, () => {
                        resolve();
                    });
                }, reject);
            });
        }
    },
    watch: {
        subject: function() {
            this.initAssertions();
        }
    }
};
</script>
