var app;

function startVlrc() {
    app = new Vue({
        el: '#app',
        computed: {
            uri: {
                get: function () {
                    return $("iframe").attr("src");
                },
                set: function (v) {
                    return $("iframe").attr("src", v);
                }
            }
        },
        created: function () {
            $("#app").show();
            EcRemote.getExpectingString(repo.selectedServer, "badge/pk", function (badgePk) {
                app.badgePk = EcPk.fromPem(badgePk);
            }, console.error);
            this.identities = EcIdentityManager.ids;
            var assertions = [];
            var request = indexedDB.open("assertions", 1);
            request.onerror = console.error;
            request.onupgradeneeded = this.indexedDbCreate;
            request.onsuccess = function (event) {
                var db = event.target.result;
                var objectStore = db.transaction("assertions").objectStore("assertions");

                objectStore.openCursor().onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        var a = new EcAssertion();
                        a.copyFrom(cursor.value);
                        assertions.push(a);
                        cursor.continue();
                    }
                    else {
                        var eah = new EcAsyncHelper();
                        eah.each(assertions, function (assertion, callback) {
                                assertion.getAssertionDateAsync(function (date) {
                                    assertion.assertionDateDecrypted = date;
                                    callback();
                                }, callback)
                            },
                            function (assertions) {
                                assertions = assertions.sort(function (a, b) {
                                    return b.assertionDateDecrypted - a.assertionDateDecrypted;
                                });
                                app.assertions = assertions;
                                app.assertionsChanges++;
                                console.log("Finished loading assertions. " + app.assertions.length + " loaded.");
                            });
                    }
                };
            }
        },
        methods: {
            searchGoogle: function () {
                window.open("https://google.com/search?q=" + app.selectedCompetency.getName(), "lernnit");
            },

            searchForAssertions: function (count) {
                EcAssertion.search(repo, "\"" + this.me + "\"", function (assertions) {
                    var eah = new EcAsyncHelper();
                    eah.each(assertions, function (assertion, callback) {
                            if (assertion.assertionDateDecrypted != null)
                                callback();
                            else
                                assertion.getAssertionDateAsync(function (date) {
                                    assertion.assertionDateDecrypted = date;
                                    callback();
                                }, callback)
                        },
                        function (assertions) {
                            assertions = assertions.sort(function (a, b) {
                                return b.assertionDateDecrypted - a.assertionDateDecrypted;
                            });
                            app.assertions = assertions;
                            app.saveAssertionsToIndexedDb();
                        });
                }, console.error, {
                    sort: '[ { "@version": {"order" : "desc" , "missing" : "_last"}} ]',
                    size: count
                });
            },
            indexedDbCreate: function (event) {
                var db = event.target.result;
                db.createObjectStore("assertions", {keyPath: "id"});
            },
            removeAssertionFromIndexedDb: function (a, success) {
                var request = indexedDB.open("assertions", 1);

                request.onerror = console.error;
                request.onupgradeneeded = this.indexedDbCreate;
                request.onsuccess = function (event) {
                    var db = event.target.result;
                    var assertionStore = db.transaction("assertions", "readwrite").objectStore("assertions");
                    var del = assertionStore.delete(a);
                    del.onsuccess = function (event) {
                        console.log("Removed assertion from indexedDB: " + a);
                        if (event.returnValue && success != null)
                            success();
                    };
                    del.onerror = function (event) {
                        console.log("Failed to remove assertion from indexedDB: " + a);
                    };
                };
            },
            saveAssertionToIndexedDb: function (a) {
                console.log("Saving assertion to indexedDB.");
                var request = indexedDB.open("assertions", 1);

                request.onerror = console.error;
                request.onupgradeneeded = this.indexedDbCreate;
                request.onsuccess = function (event) {
                    var db = event.target.result;
                    var assertionStore = db.transaction("assertions", "readwrite").objectStore("assertions");
                    var add = assertionStore.put(a);
                    add.onsuccess = function (event) {
                        console.log("Added assertion to indexedDB: " + a);
                    };
                    add.onerror = function (event) {
                        console.log("Failed to add assertion to indexedDB: " + a);
                    };
                };
            },
            saveAssertionsToIndexedDb: function () {
                console.log("Saving assertions to indexedDB.");
                var request = indexedDB.open("assertions", 1);

                request.onerror = console.error;
                request.onupgradeneeded = this.indexedDbCreate;
                request.onsuccess = function (event) {
                    var db = event.target.result;

                    var assertionStore = db.transaction("assertions", "readwrite").objectStore("assertions");
                    assertionStore.clear().onsuccess = function (event) {
                        app.assertions.forEach(function (assertion) {
                            assertionStore.put(assertion);
                        });
                    }
                };
                localStorage.removeItem("assertions");
            },
            addResource: function () {
                var me = this;
                var c = new CreativeWork();
                c.assignId(repo.selectedServer, EcCrypto.md5(app.inputUrl + app.selectedCompetency.shortId()));
                c.name = app.inputName;
                c.description = app.inputDescription;
                c.url = app.inputUrl;
                c.educationalAlignment = new AlignmentObject();
                c.educationalAlignment.targetUrl = app.selectedCompetency.shortId();
                c.educationalAlignment.alignmentType = "teaches";
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                EcRepository.save(c, function () {
                    app.creativeWorksChanges++;
                }, console.error);
            },
            computeBecause: function (evidences, success) {
                var explanations = [];
                new EcAsyncHelper().each(evidences, function (e, callback) {
                    var evidenceString = "";
                    var eoriginal = e;
                    if (e.startsWith != null && e.startsWith("{"))
                        e = JSON.parse(e);
                    if (EcObject.isObject(e)) {
                        if (e.verb != null)
                            if (e.verb.display != null)
                                if (e.verb.display.en != null)
                                    evidenceString += e.verb.display.en + " ";
                        if (e.object != null)
                            if (e.object.definition != null)
                                if (e.object.definition.type == "http://adlnet.gov/expapi/activities/assessment") {
                                    evidenceString += "\"" + e.object.definition.name.en + "\" quiz with a ";
                                    if (e.result != null)
                                        if (e.result.success != null) {
                                            evidenceString += e.result.success ? " passing " : " not passing ";
                                            evidenceString += Math.round(e.result.score.scaled * 100.0) + "%";
                                        }
                                }
                        if (e.object != null)
                            if (e.object.definition != null)
                                if (e.object.definition.interactionType != null) {
                                    evidenceString += "\"" + e.object.definition.name.en + "\" ";
                                    if (e.result != null)
                                        if (e.result.success != null)
                                            evidenceString += e.result.success ? " correctly" : " incorrectly";
                                }
                        if (evidenceString != "")
                            explanations.push({text: evidenceString, original: eoriginal});
                        callback();
                    } else if (e.startsWith != null && e.startsWith("http")) {
                        EcRepository.get(e, function (success) {
                            if (success.isAny(new ChooseAction().getTypes())) {
                                EcRepository.get(success.object, function (creativeWork) {
                                    explanations.push({
                                        text: "viewed " + creativeWork.name,
                                        url: creativeWork.url,
                                        original: eoriginal
                                    });
                                    callback();
                                }, callback);
                            }
                            else
                                callback();
                        }, function (failure) {
                            explanations.push({
                                text: "did this",
                                url: e,
                                original: eoriginal
                            });
                            callback();
                        });
                    }
                    else {
                        explanations.push({text: "\"" + e + "\"", original: eoriginal});
                        callback();
                    }
                }, function (evidences) {
                    success(explanations);
                });
            },
            explain: function (packet, tab, prev, prev2) {
                var because = "";
                if (tab == null) {
                    tab = 0;
                    if (packet.positive.length > 0)
                        because += "\n" + packet.positive.length + " direct positive assertion.";
                    if (packet.negative.length > 0)
                        because += "\n" + packet.negative.length + " direct negative assertion.";
                }
                for (var i = 0; i < packet.equivalentPackets.length; i++) {
                    var eqp = packet.equivalentPackets[i];
                    because += "\n";
                    for (var j = 0; j < tab; j++)
                        if (j == tab - 1)
                            because += " - ";
                        else
                            because += "   ";
                    for (var j = 0; j < eqp.competency.length; j++)
                        because += "\"" + packet.competency[0].getName() + "\" is equal to \"" + eqp.competency[j].getName() + "\" which is " + eqp.result._name;
                    if (eqp.positive.length > 0)
                        because += " with " + eqp.positive.length + " positive assertion.";
                    if (eqp.negative.length > 0)
                        because += " with " + eqp.negative.length + " negative assertion.";
                    because += this.explain(eqp, tab, null, packet);
                }
                for (var i = 0; i < packet.subPackets.length; i++) {
                    var eqp = packet.subPackets[i];
                    because += "\n";
                    for (var j = 0; j < tab; j++)
                        if (j == tab - 1)
                            because += " - ";
                        else
                            because += "   ";
                    if (eqp.type._name == "COMPETENCY")
                        for (var j = 0; j < eqp.competency.length; j++) {
                            because += "\"" + eqp.competency[j].getName() + "\" which is " + eqp.result._name;
                            if (eqp.positive.length > 0)
                                because += " with " + eqp.positive.length + " positive assertion.";
                            if (eqp.negative.length > 0)
                                because += " with " + eqp.negative.length + " negative assertion.";
                        }
                    else
                        because += (prev2 !== undefined ? ("\"" + prev2.competency[0].getName() + "\" ") : "\"" + packet.competency[0].getName() + "\" ") + eqp.type._name.replace("RELATION_", "").toLowerCase();
                    because += this.explain(eqp, tab + 1, packet, prev);
                }
                return because;
            }
        },
        watch: {
            me: function (newMe, oldMe) {
                this.searchForAssertions(5000);
            },
            inputUrl: function (newUrl) {
                var me = this;
                $.ajax("https://api.algorithmia.com/v1/web/algo/outofstep/MegaAnalyzeURL/0.1.6", {
                    'data': "\"" + newUrl + "\"",
                    'type': 'POST',
                    'processData': false,
                    'contentType': 'application/json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Simple simnxB3dwTN8kds9p6SGMpGoOJC1");
                    },
                    success: function (success) {
                        app.inputName = success.result.metadata.title;
                        app.inputDescription = success.result.summary;
                    }
                });
            },
            subject: function (newSubject) {
                var pk = EcPk.fromPem(newSubject);
                var me = this;
                EcRepository.get(repo.selectedServer + "data/" + pk.fingerprint(), function (person) {
                    var e = new EcEncryptedValue();
                    if (person.isAny(e.getTypes())) {
                        e.copyFrom(person);
                        e.decryptIntoObjectAsync(function (person) {
                            var p = new Person();
                            p.copyFrom(person);
                            if (p.name != null)
                                me.subjectName = p.name;
                            else if (p.givenName != null && p.familyName != null)
                                me.subjectName = p.givenName + " " + p.familyName;
                            else if (p.givenName != null)
                                me.subjectName = p.givenName;
                            else
                                me.subjectName = "Unknown Subject.";
                        }, console.error);
                    } else {
                        var p = new Person();
                        p.copyFrom(person);
                        if (p.name != null)
                            me.subjectName = p.name;
                        else if (p.givenName != null && p.familyName != null)
                            me.subjectName = p.givenName + " " + p.familyName;
                        else if (p.givenName != null)
                            me.subjectName = p.givenName;
                        else
                            me.subjectName = "Unknown Subject.";
                    }
                }, function (failure) {
                    me.subjectName = "Unknown Subject.";
                });
            }
        },
        data: {
            message: 'Hello Vue!',
            login: false,
            subject: null,
            subjectName: "Not loaded yet...",
            subjectPerson: null,
            me: null,
            mePerson: null,
            status: 'loading...',
            selectedFramework: null,
            selectedCompetency: null,
            selectedResource: null,
            selectedJobPosting: null,
            profiles: EcIdentityManager.contacts,
            inputUrl: "",
            inputName: "",
            inputDescription: "",
            processing: false,
            processingMessage: "",
            assertions: null,
            assertionsChanges: 0,
            creativeWorks: {},
            creativeWorksChanges: 0,
            jobPostings: null,
            people: null,
            collapseState: {}
        }
    });
}
