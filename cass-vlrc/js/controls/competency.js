var topicCompetencies = {};
Vue.component('competency', {
    props: ['uri', 'hasChild', 'parentCompetent', 'subject', 'frameworkUri', 'subjectPerson', 'computedState'],
    data: function () {
        return {
            resources: null,
            assertionCounter: -1,
            creativeWorkCounter: -1,
            competentStateEah: null,
            competentStateNew: null,
            badged: null,
            badgeLink: null,
            incompetentStateNew: null,
            competentState: null,
            incompetentState: null,
            assertionsByOthers: [],
            competencyObj: null,
            estimatedCompetenceValue: null,
            estimatedCompetenceTitle: null,
            visible: false,
            iconAssertion: true,
            hover: false,
            collapseState: null,
            evidence: null,
            evidenceExplanation: null,
            evidenceInput: null
        };
    },
    computed: {
        collapse:
            {
                get: function () {
                    if (this.collapseState == null)
                        this.collapseState = app.collapseState[this.uri];
                    return this.collapseState;
                },
                set: function (val) {
                    this.collapseState = val;
                    app.collapseState[this.uri] = val;
                }
            },
        evidenceText: {
            get: function () {
                var me = this;
                return this.evidenceExplanation;
            }
        },
        counter: {
            get: function () {
                if (this.visible) {
                    if (this.creativeWorkCounter != app.creativeWorksChanges)
                        this.getResourceCount();
                    this.creativeWorkCounter = app.creativeWorksChanges;
                }
                if (this.resources == null) return 0;
                return this.resources.length;
            }
        },
        estimatedCompetenceTrue: {
            get: function () {
                if (this.competencyObj == null) return null;
                if (this.computedState == null) return null;
                if (this.computedState == 0) return null;
                var msc = this.computedState.getMetaStateCompetency(this.competencyObj);
                if (msc != null)
                    if (msc.negativeAssertion == null && msc.positiveAssertion != null) {
                        this.estimatedCompetenceTitle = "The system believes you hold this competency. Click for details.";
                        return true;
                    }
                return null;
            }
        },
        estimatedCompetenceFalse: {
            get: function () {
                if (this.competencyObj == null) return null;
                if (this.computedState == null) return null;
                if (this.computedState == 0) return null;
                var msc = this.computedState.getMetaStateCompetency(this.competencyObj);
                if (msc != null)
                    if (msc.negativeAssertion != null && msc.positiveAssertion == null) {
                        this.estimatedCompetenceTitle = "The system believes you do not hold this competency. Click for details.";
                        return true;
                    }
                return null;
            }
        },
        estimatedCompetenceIndeterminant: {
            get: function () {
                if (this.competencyObj == null) return null;
                if (this.computedState == null) return null;
                if (this.computedState == 0) return null;
                var msc = this.computedState.getMetaStateCompetency(this.competencyObj);
                if (msc != null)
                    if (msc.negativeAssertion != null && msc.positiveAssertion != null) {
                        this.estimatedCompetenceTitle = "There is conflicting evidence that you hold this competency. Click for details.";
                        return true;
                    }
                return null;
            }
        },
        estimatedCompetenceUnknown: {
            get: function () {
                if (this.competencyObj == null) return null;
                if (this.computedState == null) return null;
                if (this.computedState == 0) return null;
                var msc = this.computedState.getMetaStateCompetency(this.competencyObj);
                if (msc != null)
                    if (msc.negativeAssertion == null && msc.positiveAssertion == null) {
                        this.estimatedCompetenceTitle = "It is not known if you hold this competency. Click for details.";
                        return true;
                    }
                return null;
            }
        },
        competency: {
            get: function () {
                var me = this;
                if (this.competencyObj == null) {
                    EcCompetency.get(this.uri, function (c) {
                        me.competencyObj = c;
                    });
                }
                return this.competencyObj;
            }
        },
        myAssertion: {
            get: function () {
                var me = this;
                if (this.competency == null)
                    return;
                if (app.assertions == null)
                    return;
                if (this.visible && app.assertionsChanges != this.assertionCounter) {
                    var assertions = [];
                    for (var i = 0; i < app.assertions.length; i++)
                        if (this.competency.isId(app.assertions[i].competency))
                            assertions.push(app.assertions[i]);
                    if (this.competentStateEah != null)
                        this.competentStateEah.stop();
                    this.competentStateNew = null;
                    this.incompetentStateNew = null;
                    this.competentStateEah = new EcAsyncHelper();
                    this.competentStateEah.each(assertions, function (assertion, callback) {
                        if (assertion != null)
                            assertion.getSubjectAsync(function (subject) {
                                if (me.subject == subject.toPem()) {
                                    assertion.getAgentAsync(function (agent) {
                                        if (app.me == agent.toPem()) {
                                            var negativeCallback = function () {
                                                if (assertion.negative != null) {
                                                    assertion.getNegativeAsync(function (negative) {
                                                        if (negative) {
                                                            me.incompetentStateNew = true;
                                                            me.badged = null;
                                                        }
                                                        else {
                                                            me.badged = assertion.hasReader(app.badgePk);
                                                            me.badgeLink = EcRemote.urlAppend(repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                                                            me.competentStateNew = true;
                                                        }
                                                        callback();
                                                    }, callback);
                                                }
                                                else {
                                                    me.competentStateNew = true;
                                                    me.badged = assertion.hasReader(app.badgePk);
                                                    me.badgeLink = EcRemote.urlAppend(repo.selectedServer, "badge/assertion/") + assertion.getGuid();
                                                    callback();
                                                }
                                            }
                                            if (assertion.evidence != null) {
                                                assertion.getEvidencesAsync(function (evidences) {
                                                    me.evidence = evidences;
                                                    app.computeBecause(me.evidence, function (because) {
                                                        me.evidenceExplanation = because;
                                                    });
                                                    negativeCallback();
                                                }, callback);
                                            }
                                            else {
                                                me.evidence = null;
                                                me.evidenceExplanation = null;
                                                negativeCallback();
                                            }
                                        } else {
                                            EcArray.setRemove(me.assertionsByOthers, assertion);
                                            EcArray.setAdd(me.assertionsByOthers, assertion);
                                            callback();
                                        }
                                    }, callback);
                                } else
                                    callback();
                            }, callback);
                        else
                            callback();
                    }, function (assertions) {
                        if (me.competentStateNew == null)
                            me.competentStateNew = false;
                        if (me.incompetentStateNew == null)
                            me.incompetentStateNew = false;
                        me.competentState = me.competentStateNew;
                        me.incompetentState = me.incompetentStateNew;
                        me.assertionCounter = app.assertionsChanges;
                    });
                }
                return;
            }
        },
        competent: {
            get: function () {
                this.myAssertion;
                return this.competentState;
            }
        },
        incompetent: {
            get: function () {
                this.myAssertion;
                return this.incompetentState;
            }
        },
        count: {
            get: function () {
                var me = this;
                if (this.uri == null) return 0;
                return this.counter;
            }
        },
        name: {
            get: function () {
                if (this.uri == null) return "Invalid Competency";
                if (this.competency == null) return "Loading...";
                return this.competency.getName();
            }
        },
        description: {
            get: function () {
                if (this.uri == null) return "Could not resolve URI.";
                if (this.competency == null) return "Loading...";
                var descriptionArray = this.competency.getDescription();
                if (descriptionArray == null) return null;
                if (EcArray.isArray(descriptionArray))
                    return descriptionArray[0];
                return descriptionArray;
            }
        },
        isCompetent: {
            get: function () {
                return this.competent || this.parentCompetent;
            }
        },
        isGoal: {
            get: function () {
                if (this.competency == null) return false;
                if (this.subjectPerson.seeks == null) return false;
                for (var i = 0; i < this.subjectPerson.seeks.length; i++)
                    if (this.subjectPerson.seeks[i].itemOffered != null)
                        if (this.subjectPerson.seeks[i].itemOffered.serviceOutput != null)
                            if (this.competency.isId(this.subjectPerson.seeks[i].itemOffered.serviceOutput.competency))
                                return true;
                return false;
            }
        },
        countPhrase: {
            get: function () {
                if (this.count == 0)
                    return "No resource" + (this.count == 1 ? "" : "s");
                return this.count + " resource" + (this.count == 1 ? "" : "s");
            }
        },
        claimCompetencePhrase: {
            get: function () {
                return "By selecting this, I think " + (this.subject == app.me ? "I" : (this.subjectPerson == null ? "they" : this.subjectPerson.getName())) + " can demonstrate this.";
            }
        },
        unclaimCompetencePhrase: {
            get: function () {
                return "By deselecting this, I no longer think " + (this.subject == app.me ? "I" : (this.subjectPerson == null ? "they" : this.subjectPerson.getName())) + " can demonstrate this.";
            }
        },
        claimIncompetencePhrase: {
            get: function () {
                return "By selecting this, I think " + (this.subject == app.me ? "I" : (this.subjectPerson == null ? "they" : this.subjectPerson.getName())) + " could not demonstrate this.";
            }
        },
        unclaimIncompetencePhrase: {
            get: function () {
                return "By deselecting this, I no longer think " + (this.subject == app.me ? "I" : (this.subjectPerson == null ? "they" : this.subjectPerson.getName())) + " can't demonstrate this.";
            }
        },
        claimCompetencePhraseShort: {
            get: function () {
                return (this.subject == app.me ? "I" : "They") + " can";
            }
        },
        unclaimCompetencePhraseShort: {
            get: function () {
                return (this.subject == app.me ? "I" : "They") + " can";
            }
        },
        claimIncompetencePhraseShort: {
            get: function () {
                return (this.subject == app.me ? "I" : "They") + " can't";
            }
        },
        unclaimIncompetencePhraseShort: {
            get: function () {
                return (this.subject == app.me ? "I" : "They") + " can't";
            }
        },
        makeGoalPhrase: {
            get: function () {
                return "By selecting this, I would like to add this to " + (this.subject == app.me ? "my" :(this.subjectPerson == null ? "their" : this.subjectPerson.getName() + "'s")) + " goals.";
            }
        },
        unmakeGoalPhrase: {
            get: function () {
                return "By selecting this, I would like to remove this from " + (this.subject == app.me ? "my" : (this.subjectPerson == null ? "their" : this.subjectPerson.getName() + "'s")) + " goals.";
            }
        },
        otherClaimsPhrase: {
            get: function () {
                return "Others have made claims about " + (this.subject == app.me ? "you" : (this.subjectPerson == null ? "them" : this.subjectPerson.getName())) + ". Click to expand.";
            }
        },
        ithey: {
            get: function () {
                return (this.subject == app.me ? "I" : "they");
            }
        },
        becausePhrase: {
            get: function () {
                return "do this because " + (this.subject == app.me ? "I..." : "they...");
            }
        },
        canEditSubject: {
            get: function () {
                if (this.subjectPerson == null) return false;
                if (EcIdentityManager.ids.length == 0) return false;
                return this.subjectPerson.canEdit(EcIdentityManager.ids[0].ppk.toPk());
            }
        }
    },
    created: function () {
        if (topicCompetencies[this.uri] == null)
            topicCompetencies[this.uri] = [this];
        else
            topicCompetencies[this.uri].push(this);
    },
    watch: {
        uri: function (newUri, oldUri) {
            this.assertionsByOthers = [];
            this.competencyObj = null;
            this.assertionCounter = -1;
            this.competentState = null;
            this.incompetentState = null;
            this.estimatedCompetenceValue = null;
            this.evidenceExplanation = null;
            this.evidenceInput = null;
            this.evidence = null;
        },
        subject: function (newSubject, oldSubject) {
            this.assertionsByOthers = [];
            this.assertionCounter = -1;
            this.competentState = null;
            this.incompetentState = null;
            this.estimatedCompetenceValue = null;
            this.evidenceExplanation = null;
            this.evidenceInput = null;
            this.evidence = null;
        }
    },
    methods: {
        initialize: function (isVisible, entry) {
            this.visible = isVisible;
            if (isVisible && this.once == null) {
                this.once = true;
            }
        },
        getResourceCount: function () {
            var me = this;
            var search = "@type:CreativeWork AND educationalAlignment.targetUrl:\"" + EcRemoteLinkedData.trimVersionFromUrl(this.uri) + "\"";
            EcRepository.unsigned = true;
            repo.searchWithParams(search, {
                    size: 50
                },
                null,
                function (resources) {
                    me.resources = resources;
                }, console.error);
            EcRepository.unsigned = false;
        },
        getEstimatedCompetence: function () {
            var me = this;
            if (this.frameworkUri == null)
                return;
            me.estimatedCompetenceValue = null;
            var ep = new PessimisticQuadnaryAssertionProcessor();
            ep.transferIndeterminateOptimistically = false;
            ep.logFunction = function (data) {
            };
            ep.repositories.push(repo);
            var subject = new Array();
            subject.push(EcPk.fromPem(this.subject));
            var additionalSignatures = null;
            ep.has(
                subject,
                this.competencyObj,
                null,
                EcFramework.getBlocking(this.frameworkUri),
                additionalSignatures,
                function (success) {
                    me.estimatedCompetenceValue = success.result._name;
                    if (me.estimatedCompetenceValue == "TRUE")
                        me.estimatedCompetenceTitle = "The system believes you hold this competency. Click to recompute. ";
                    else if (me.estimatedCompetenceValue == "FALSE")
                        me.estimatedCompetenceTitle = "The system believes you do not hold this competency. Click to recompute. ";
                    else if (me.estimatedCompetenceValue == "INDETERMINANT")
                        me.estimatedCompetenceTitle = "There is conflicting evidence that you hold this competency. Click to recompute. ";
                    else if (me.estimatedCompetenceValue == "UNKNOWN")
                        me.estimatedCompetenceTitle = "It is not known if you hold this competency. Click to recompute. ";
                    me.estimatedCompetenceTitle += "\n\nReasoning:" + app.explain(success);
                },
                function (ask) {
                    console.log(ask);
                },
                console.error
            );
        },
        setCompetency: function () {
            app.selectedCompetency = EcCompetency.getBlocking(this.uri);
            app.availableResources = null;
            setTimeout(function () {
                $("#rad3").click();
            }, 100);
        },
        claimCompetence: function (evt, after) {
            var me = this;
            this.competentState = null;
            this.unclaimIncompetence(evt, function () {
                var a = new EcAssertion();
                a.generateId(repo.selectedServer);
                a.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                //a.addReader(EcPk.fromPem("-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAixq5WEp+F5HEJZj12N791JATM+vkVJuolfOq0KbqtZwiygPao12fnpTwZdRCmb/4O1n6PXkJJ1XbufAx6k7hGNyM1kTngbs743QuyzP15SmYcP9l9FluL9ISvIECt1eHo4sSKdaKxLRguOj79HjZXtFg3UDIhvvLBVqPQm5d5OQ1OPgu4WzL4GN7hYwK6PYJf2zJjxs9vEQ6agrvpAZI+Rm1DT5x3i4xtcB+Mip473Xe+6IPoRmJ/NqzcP3c0xBf6xV1GDBBIQIaRRkIJgoAb/k0fb+Hl0uXnKxcSm86nYk4Kq5GSbeZ+G+B3rrnQfXbLZnle6nTj1YdAOErOKKi2wIDAQAB-----END PUBLIC KEY-----")); //Eduworks Researcher
                for (var i = 0; i < EcIdentityManager.contacts.length; i++)
                    a.addReader(EcIdentityManager.contacts[i].pk);
                a.setSubjectAsync(EcPk.fromPem(me.subject), function () {
                    a.setAgentAsync(EcPk.fromPem(app.me), function () {
                        a.setCompetency(EcRemoteLinkedData.trimVersionFromUrl(me.uri));
                        a.setAssertionDateAsync(Date.now(), function () {
                            a.setExpirationDateAsync(Date.now() + 1000 * 60 * 60 * 24 * 365, function () {
                                a.setNegativeAsync(false, function () {
                                    a.setConfidence(1.0);
                                    var evidences = [];
                                    //Go find viewActions on related resources to attach to the assertion.
                                    if (app.me == me.subject)
                                        repo.searchWithParams(
                                            "@type:CreativeWork AND educationalAlignment.targetUrl:\"" + EcRemoteLinkedData.trimVersionFromUrl(me.uri) + "\"",
                                            {size: 5000},
                                            null,
                                            function (resources) {
                                                new EcAsyncHelper().each(
                                                    resources,
                                                    function (resource, resourceCallback) {
                                                        repo.searchWithParams(
                                                            "@type:ChooseAction AND object:\"" + resource.shortId() + "\" AND \\*owner:\"" + me.subject + "\"",
                                                            {size: 5000},
                                                            null,
                                                            function (views) {
                                                                for (var i = 0; i < views.length; i++)
                                                                    evidences.push(views[i].shortId());
                                                                resourceCallback();
                                                            },
                                                            resourceCallback
                                                        );
                                                    }, function (resources) {
                                                        if (evidences.length > 0)
                                                            a.setEvidenceAsync(evidences, function () {
                                                                EcRepository.save(a, function () {
                                                                    me.competentState = null;
                                                                }, console.error);
                                                            }, console.error);
                                                        else
                                                            EcRepository.save(a, function () {
                                                                me.competentState = null;
                                                            }, console.error);
                                                    }
                                                );
                                            },
                                            console.error
                                        );
                                    else
                                        EcRepository.save(a, function () {
                                            me.competentState = null;
                                        }, console.error);
                                }, console.error); //This is an assertion that an individual *can* do something, not that they *cannot*.
                            }, console.error); //UTC Milliseconds, 365 days in the future.
                        }, console.error); //UTC Milliseconds
                    }, console.error);
                }, console.error);
            });
        },
        unclaimCompetence: function (evt, after) {
            var me = this;
            this.competentState = null;
            EcCompetency.get(this.uri, function (c) {
                me.competencyObj = c;
                if (app.assertions == null)
                    return;
                var eah = new EcAsyncHelper();
                eah.each(app.assertions, function (assertion, callback) {
                    if (me.competencyObj.isId(assertion.competency))
                        assertion.getSubjectAsync(function (subject) {
                            if (me.subject == subject.toPem()) {
                                assertion.getAgentAsync(function (agent) {
                                    if (app.me == agent.toPem()) {
                                        if (assertion.negative == null) {
                                            EcRepository._delete(assertion, function () {
                                                EcArray.setRemove(app.assertions, assertion);
                                                me.competentState = null;
                                                callback();
                                            }, callback);
                                        } else
                                            assertion.getNegativeAsync(function (negative) {
                                                if (!negative) {
                                                    EcRepository._delete(assertion, function () {
                                                        EcArray.setRemove(app.assertions, assertion);
                                                        me.competentState = null;
                                                        callback();
                                                    }, callback);
                                                }
                                                else
                                                    callback();
                                            }, callback);
                                    }
                                    else
                                        callback();
                                }, callback);
                            } else
                                callback();
                        }, callback);
                    else
                        callback();
                }, function (assertions) {
                    if (after != null) after();
                });
            }, console.error);
        },
        claimIncompetence: function (evt, after) {
            var me = this;
            this.incompetentState = null;
            this.unclaimCompetence(evt, function () {
                var a = new EcAssertion();
                a.generateId(repo.selectedServer);
                a.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                //a.addReader(EcPk.fromPem("-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAixq5WEp+F5HEJZj12N791JATM+vkVJuolfOq0KbqtZwiygPao12fnpTwZdRCmb/4O1n6PXkJJ1XbufAx6k7hGNyM1kTngbs743QuyzP15SmYcP9l9FluL9ISvIECt1eHo4sSKdaKxLRguOj79HjZXtFg3UDIhvvLBVqPQm5d5OQ1OPgu4WzL4GN7hYwK6PYJf2zJjxs9vEQ6agrvpAZI+Rm1DT5x3i4xtcB+Mip473Xe+6IPoRmJ/NqzcP3c0xBf6xV1GDBBIQIaRRkIJgoAb/k0fb+Hl0uXnKxcSm86nYk4Kq5GSbeZ+G+B3rrnQfXbLZnle6nTj1YdAOErOKKi2wIDAQAB-----END PUBLIC KEY-----")); //Eduworks Researcher
                for (var i = 0; i < EcIdentityManager.contacts.length; i++)
                    a.addReader(EcIdentityManager.contacts[i].pk);
                a.setSubjectAsync(EcPk.fromPem(me.subject), function () {
                    a.setAgentAsync(EcPk.fromPem(app.me), function () {
                        a.setCompetency(EcRemoteLinkedData.trimVersionFromUrl(me.uri));
                        a.setAssertionDateAsync(Date.now(), function () {
                            a.setExpirationDateAsync(Date.now() + 1000 * 60 * 60 * 24 * 365, function () {
                                a.setNegativeAsync(true, function () {
                                    a.setConfidence(1.0);
                                    EcRepository.save(a, function () {
                                        me.incompetentState = null;
                                    }, console.error);
                                }, console.error); //This is an assertion that an individual *cannot* do something, not that they *can*.
                            }, console.error); //UTC Milliseconds, 365 days in the future.
                        }, console.error); //UTC Milliseconds
                    }, console.error);
                }, console.error);
            });
        },
        unclaimIncompetence: function (evt, after) {
            var me = this;
            this.incompetentState = null;
            EcCompetency.get(this.uri, function (c) {
                me.competencyObj = c;
                if (app.assertions == null)
                    return;
                var eah = new EcAsyncHelper();
                eah.each(app.assertions, function (assertion, callback) {
                    if (me.competencyObj.isId(assertion.competency))
                        assertion.getSubjectAsync(function (subject) {
                            if (me.subject == subject.toPem()) {
                                assertion.getAgentAsync(function (agent) {
                                    if (app.me == agent.toPem()) {
                                        if (assertion.negative != null)
                                            assertion.getNegativeAsync(function (negative) {
                                                if (negative) {
                                                    EcRepository._delete(assertion, function () {
                                                        EcArray.setRemove(app.assertions, assertion);
                                                        me.incompetentState = null;
                                                        callback();
                                                    }, callback);
                                                } else callback();
                                            }, callback);
                                    } else callback();
                                }, callback);
                            } else callback();
                        }, callback);
                    else callback();
                }, function (assertions) {
                    if (after != null) after();
                });
            }, console.error);
        }

        ,
        badgeAssertion: function (evt, after) {
            var me = this;
            EcCompetency.get(this.uri, function (c) {
                me.competencyObj = c;
                if (app.assertions == null)
                    return;
                var eah = new EcAsyncHelper();
                eah.each(app.assertions, function (assertion, callback) {
                    if (me.competencyObj.isId(assertion.competency))
                        assertion.getSubjectAsync(function (subject) {
                            if (me.subject == subject.toPem()) {
                                assertion.getAgentAsync(function (agent) {
                                    if (app.me == agent.toPem()) {
                                        if (assertion.negative == null) {
                                            assertion.addReader(app.badgePk);
                                            EcRepository.save(assertion, function () {
                                                app.assertionsChanges++;
                                                callback();
                                            }, callback);
                                        } else {
                                            assertion.getNegativeAsync(function (negative) {
                                                if (!negative) {
                                                    assertion.addReader(app.badgePk);
                                                    EcRepository.save(assertion, function () {
                                                        app.assertionsChanges++;
                                                        callback();
                                                    }, callback);
                                                }
                                                else
                                                    callback();
                                            }, callback);
                                        }
                                    }
                                    else
                                        callback();
                                }, callback);
                            } else
                                callback();
                        }, callback);
                    else
                        callback();
                }, function (assertions) {
                    if (after != null) after();
                });
            }, console.error);
        }
        ,
        unbadgeAssertion: function (evt, after) {
            var me = this;
            EcCompetency.get(this.uri, function (c) {
                me.competencyObj = c;
                if (app.assertions == null)
                    return;
                var eah = new EcAsyncHelper();
                eah.each(app.assertions, function (assertion, callback) {
                    if (me.competencyObj.isId(assertion.competency))
                        assertion.getSubjectAsync(function (subject) {
                            if (me.subject == subject.toPem()) {
                                assertion.getAgentAsync(function (agent) {
                                    if (app.me == agent.toPem()) {
                                        if (assertion.negative == null) {
                                            assertion.removeReader(app.badgePk);
                                            EcRepository.save(assertion, function () {
                                                app.assertionsChanges++;
                                                callback();
                                            }, callback);
                                        } else {
                                            assertion.getNegativeAsync(function (negative) {
                                                if (!negative) {
                                                    assertion.removeReader(app.badgePk);
                                                    EcRepository.save(assertion, function () {
                                                        app.assertionsChanges++;
                                                        callback();
                                                    }, callback);
                                                }
                                                else
                                                    callback();
                                            }, callback);
                                        }
                                    }
                                    else
                                        callback();
                                }, callback);
                            } else
                                callback();
                        }, callback);
                    else
                        callback();
                }, function (assertions) {
                    if (after != null) after();
                });
            }, console.error);
        }
        ,
        evidenceAssertion: function (evt, after) {
            var me = this;
            EcCompetency.get(this.uri, function (c) {
                me.competencyObj = c;
                if (app.assertions == null)
                    return;
                var eah = new EcAsyncHelper();
                eah.each(app.assertions, function (assertion, callback) {
                    if (me.competencyObj.isId(assertion.competency))
                        assertion.getSubjectAsync(function (subject) {
                            if (me.subject == subject.toPem()) {
                                assertion.getAgentAsync(function (agent) {
                                    if (app.me == agent.toPem()) {
                                        assertion.getEvidencesAsync(function (evidences) {
                                            EcArray.setAdd(evidences, me.evidenceInput);
                                            me.evidenceInput = "";
                                            assertion.setEvidence(evidences);
                                            EcRepository.save(assertion, function () {
                                                app.assertionsChanges++;
                                                callback();
                                            }, callback);
                                        }, callback);
                                    }
                                    else
                                        callback();
                                }, callback);
                            } else
                                callback();
                        }, callback);
                    else
                        callback();
                }, function (assertions) {
                    if (after != null) after();
                });
            }, console.error);
        }
        ,
        unevidenceAssertion: function (url, after) {
            var me = this;
            EcCompetency.get(this.uri, function (c) {
                me.competencyObj = c;
                if (app.assertions == null)
                    return;
                var eah = new EcAsyncHelper();
                eah.each(app.assertions, function (assertion, callback) {
                    if (me.competencyObj.isId(assertion.competency))
                        assertion.getSubjectAsync(function (subject) {
                            if (me.subject == subject.toPem()) {
                                assertion.getAgentAsync(function (agent) {
                                    if (app.me == agent.toPem()) {
                                        assertion.getEvidencesAsync(function (evidences) {
                                            EcArray.setRemove(evidences, url);
                                            assertion.setEvidence(evidences);
                                            EcRepository.save(assertion, function () {
                                                app.assertionsChanges++;
                                                callback();
                                            }, callback);
                                        }, callback);
                                    }
                                    else
                                        callback();
                                }, callback);
                            } else
                                callback();
                        }, callback);
                    else
                        callback();
                }, function (assertions) {
                    if (after != null) after();
                });
            }, console.error);
        }
        ,
        makeGoal: function (evt, after) {
            this.goalState = null;
            var d = new Demand();
            d.itemOffered = new Service();
            d.itemOffered.serviceOutput = new Assertion();
            d.itemOffered.serviceOutput.competency = this.competencyObj.shortId();
            d.itemOffered.serviceOutput.framework = this.frameworkUri;
            this.subjectPerson.seeks.push(d);
            EcRepository.save(this.subjectPerson, function () {
            }, console.error);
        }
        ,
        unmakeGoal: function (evt, after) {
            this.goalState = null;
            var needsSave = false;
            for (var i = 0; i < this.subjectPerson.seeks.length; i++) {
                if (this.subjectPerson.seeks[i].itemOffered == null) continue;
                if (this.subjectPerson.seeks[i].itemOffered.serviceOutput == null) continue;
                if (this.competency.isId(this.subjectPerson.seeks[i].itemOffered.serviceOutput.competency)) {
                    this.subjectPerson.seeks.splice(i, 1);
                    needsSave = true;
                }
            }
            if (needsSave)
                EcRepository.save(this.subjectPerson, function () {
                }, console.error);
        }
    },
    template:
    '<li class="competency" v-on:mouseover="hover = true" v-on:mouseleave="hover = false" v-observe-visibility="{callback: initialize}" :id="uri">' +
    '<span v-if="hasChild != null">' +
    '<button class="inline" v-if="collapse" v-on:click="collapse = !collapse"><i class="mdi mdi-18px mdi-menu-right" aria-hidden="true"></i></button>' +
    '<button class="inline" v-else v-on:click="collapse = !collapse"><i class="mdi mdi-18px mdi-menu-down" aria-hidden="true"></i></button>' +
    '</span>' +
    '<div>' +
    '<div class="tile">' +
    '<div class="section pbottom">' +
    '<div v-observe-visibility="{callback: initialize,once: true}">{{ name }}</div> ' +
    '<small v-if="description" class="block">{{ description }}</small>' +
    '</div>' +
    '<div class="buttons btop">' +
    '<span v-if="subject != null">' +
    '<button class="inline" v-if="competent == null"><i class="mdi mdi-18px mdi-loading mdi-spin" aria-hidden="true"></i> Loading...</button>' +
    '<button class="inline" v-if="competent == true" v-on:click="unclaimCompetence" :title="unclaimCompetencePhrase"><i class="mdi mdi-18px mdi-checkbox-marked-circle-outline" aria-hidden="true"></i> {{unclaimCompetencePhraseShort}}</button>' +
    '<button class="inline" v-if="competent == false" v-on:click="claimCompetence" :title="claimCompetencePhrase"><i class="mdi mdi-18px mdi-checkbox-blank-circle-outline" aria-hidden="true"></i> {{claimCompetencePhraseShort}}</button>' +
    '<button class="inline" v-if="incompetent == null"><i class="mdi mdi-18px mdi-loading mdi-spin" aria-hidden="true"></i> Loading...</button>' +
    '<button class="inline" v-if="incompetent == true" v-on:click="unclaimIncompetence" :title="unclaimIncompetencePhrase"><i class="mdi mdi-18px mdi-close-box-outline" aria-hidden="true"></i> {{unclaimIncompetencePhraseShort}}</button>' +
    '<button class="inline" v-if="incompetent == false" v-on:click="claimIncompetence" :title="claimIncompetencePhrase"><i class="mdi mdi-18px mdi-checkbox-blank-outline" aria-hidden="true"></i> {{claimIncompetencePhraseShort}}</button>' +
    ' </span> ' +
    '</span>' +
    '<span v-if="subject">' +
    '<span v-if="frameworkUri">' +
    '<button class="inline" v-if="computedState == null" v-on:click="getEstimatedCompetence" ><i class="mdi mdi-18px mdi-loading mdi-spin" aria-hidden="true"></i> Loading...</button>' +
    '<button class="inline" v-if="estimatedCompetenceUnknown" v-on:click="getEstimatedCompetence" :title="estimatedCompetenceTitle"><i class="mdi mdi-18px mdi-help-circle" aria-hidden="true"></i> Unknown</button>' +
    '<button class="inline" v-if="estimatedCompetenceIndeterminant" style="color:purple;" v-on:click="getEstimatedCompetence" :title="estimatedCompetenceTitle"><i class="mdi mdi-18px mdi-flash-circle" aria-hidden="true"></i> Conflict</button>' +
    '<button class="inline" v-if="estimatedCompetenceTrue" style="color:green;" v-on:click="getEstimatedCompetence" :title="estimatedCompetenceTitle"><i class="mdi mdi-18px mdi-check-circle" aria-hidden="true"></i> Can</button>' +
    '<button class="inline" v-if="estimatedCompetenceFalse" style="color:red;" v-on:click="getEstimatedCompetence" :title="estimatedCompetenceTitle"><i class="mdi mdi-18px mdi-diameter-variant" aria-hidden="true"></i> Can&apos;t</button>' +
    '</span>' +
    '<span v-if="canEditSubject">' +
    '<button class="inline" v-if="isGoal == null"><i class="mdi mdi-18px mdi-loading mdi-spin" aria-hidden="true"></i></button>' +
    '<button class="inline" v-if="isGoal == false" v-on:click="makeGoal" :title="makeGoalPhrase"><i class="mdi mdi-18px mdi-bullseye" aria-hidden="true"></i> My Goal</button>' +
    '<button class="inline" v-if="isGoal == true" v-on:click="unmakeGoal" :title="unmakeGoalPhrase"><i class="mdi mdi-18px mdi-bullseye-arrow" style="color:green;" aria-hidden="true"></i> Goal</button>' +
    '</span>' +
    '<button class="inline wider" v-on:click="setCompetency" title="View Learning Resources for this topic."><i class="mdi mdi-18px mdi-book-open" aria-hidden="true"></i>{{ countPhrase }}</button>' +
    '</span>' +
    '<span v-if="competent == true || incompetent == true">' +
    '<button class="inline" v-if="badged == true" style="color:green;" v-on:click="unbadgeAssertion" title="Remove the badge for my claim."><i class="mdi mdi-18px mdi-shield" aria-hidden="true"></i> Badge</button>' +
    '<button class="inline wider" v-if="badged == true"><i class="mdi mdi-18px mdi-shield-link-variant" style="color:darkblue;" aria-hidden="true"></i><a class="inline" style="color:darkblue;" target="_blank" :href="badgeLink">Badge Link</a></button>' +
    '<button class="inline" v-if="badged == false" style="color:gray;" v-on:click="badgeAssertion" title="Issue a badge for my claim."><i class="mdi mdi-18px mdi-shield-outline" aria-hidden="true"></i> Badge</button>' +
    '</span>' +
    '</div>' +
    '<div class="btop" v-if="competent != false || incompetent != false">' +
    '<input class="inline antitile" style="width:25rem;max-width:100%" v-model="evidenceInput" v-on:keyup.enter="evidenceAssertion" v-on:keyup.esc="evidenceInput = null" :placeholder="becausePhrase" title="Text or URL Link">' +
    //'<button class="inline wider" v-on:click="evidenceAssertion" title="Add Evidence as URL or Text."><i class="mdi mdi-18px mdi-fingerprint" aria-hidden="true"></i>Add Evidence</button>' +
    '</div>' +
    '<small class="buttons" v-if="evidenceText && (competent != false || incompetent != false)">' +
    '<ul>' +
    '<li class="pbottom" v-for="(evidence, index) in evidenceText">' +
    '<span v-on:click="unevidenceAssertion(evidence.original)" style="float:right;cursor:pointer;">X</span>' +
    '<a v-if="evidence.url" :href="evidence.url" target="_blank">{{evidence.text}}</a>' +
    '<span v-else>{{evidence.text}}</span>' +
    '</li>' +
    '</ul>' +
    '</small>' +
    '<div v-if="assertionsByOthers && assertionsByOthers.length > 0" v-on:click="iconAssertion = !iconAssertion" class="assertions section btop ptop">' +
    '<span v-if="iconAssertion && assertionsByOthers && assertionsByOthers.length > 0" :title="otherClaimsPhrase"><i class="mdi mdi-account-group mdi-18px" aria-hidden="true"/>: </span>' +
    '<assertion :icon="iconAssertion" v-for="item in assertionsByOthers" v-bind:key="uri+item.id" :short="true" :uri="item.id" title="Assertion from elsewhere"></assertion>' +
    '</div>' +
    '</div>' +
    '<ul v-if="collapse == false || collapse == null"><competency v-for="item in hasChild" :uri="item.id" :hasChild="item.hasChild" :parentCompetent="isCompetent" :frameworkUri="frameworkUri" :computedState="computedState" :subjectPerson="subjectPerson" :subject="subject"></competency></ul>' +
    '</div>' +
    '</li>'
});
