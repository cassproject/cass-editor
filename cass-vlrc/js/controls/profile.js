var vueProfiles = [];
Vue.component('profile', {
    props: ['pk', 'displayName', 'onClick'],
    data: function () {
        return {
            editing: false,
            private: false,
            personObj: null,
            inContactList: null
        }
    },
    recomputed: {
        person: {
            get: function () {
                if (this.personObj != null)
                    return this.personObj;
                if (this.pk == null)
                    return null;
                this.getPerson();
                return null;
            },
            set: function (person) {
                this.personObj = person;
                this.$recompute("person");
            }
        }

    },
    computed: {
        name: {
            get: function () {
                if (this.person == null)
                    return "Loading...";
                if (this.person.givenName != null && this.person.familyName != null)
                    return this.person.givenName + " " + this.person.familyName;
                if (this.person.name == null)
                    return "<Restricted>";
                //EcIdentityManager.getIdentity(EcPk.fromPem(this.pk)).displayName = this.personObj.name;
                return this.person.name;
            },
            set: function (newName) {
                this.personObj.name = newName;
                if (EcIdentityManager.getIdentity(EcPk.fromPem(this.pk)) != null)
                    EcIdentityManager.getIdentity(EcPk.fromPem(this.pk)).displayName = this.personObj.name;
            }
        },
        email: {
            get: function () {
                if (this.person == null)
                    return "Loading...";
                if (this.person.name == null)
                    return "";

                return this.person.email;
            },
            set: function (newEmail) {
                this.personObj.email = newEmail;
            }
        },
        mine: {
            get: function () {
                if (app.me == null)
                    return false;
                if (this.personObj == null)
                    return false;
                return this.personObj.hasOwner(EcPk.fromPem(app.me));
            }
        },
        fingerprint: {
            get: function () {
                if (this.personObj == null)
                    return null;
                setTimeout(function () {
                    jdenticon()
                }, 100);
                return this.personObj.getGuid();
            }
        },
        fingerprintUrl: {
            get: function () {
                if (this.personObj == null)
                    return null;
                if (this.personObj.email != null) {
                    return "https://www.gravatar.com/avatar/" + EcCrypto.md5(this.personObj.email.toLowerCase()) + "?s=44";
                }
                return null;
            }
        },
        isContact: {
            get: function () {
                if (this.inContactList == null) this.inContactList = EcIdentityManager.getContact(EcPk.fromPem(this.pk)) != null;
                return this.inContactList;
            }
        },
        shareStatement: {
            get: function () {
                return "Share your claims about " + (app.subject == app.me ? "yourself" : app.subjectName) + " with " + this.name;
            }
        },
        unshareStatement: {
            get: function () {
                return "Unshare your claims about " + (app.subject == app.me ? "yourself" : app.subjectName) + " with " + this.name;
            }
        },
        isSubject: {
            get: function () {
                return app.subject == this.pk;
            }
        }
    },
    created: function () {
        EcArray.setAdd(vueProfiles, this);
    },
    destroyed: function () {
        EcArray.setRemove(vueProfiles, this);
    },
    watch: {
        pk: function () {
            this.personObj = null;
            this.editing = false;
            this.private = false;
            this.inContactList = null;
            this.getPerson();
        },
        private: function () {
        }
    },
    methods: {
        savePerson: function () {
            this.editing = false;
            var thingToSave = this.personObj;
            var me = this;
            if (this.private) {
                EcEncryptedValue.toEncryptedValueAsync(thingToSave, false, function (thingToSave) {
                    thingToSave.name = null; //Delete PII.
                    EcRepository.save(thingToSave, function () {
                        me.getPerson();
                        for (var i = 0; i < vueProfiles.length; i++)
                            if (vueProfiles[i].pk == me.pk)
                                vueProfiles[i].getPerson();
                    }, console.error);
                }, console.error);
            } else {
                EcRepository.save(thingToSave, function () {
                    me.getPerson();
                    for (var i = 0; i < vueProfiles.length; i++)
                        if (vueProfiles[i].pk == me.pk)
                            vueProfiles[i].getPerson();
                }, console.error);
            }
        },
        setPerson: function (person) {
            var p = new Person();
            p.copyFrom(person);
            if (p.seeks == null)
                p.seeks = [];
            this.personObj = p;
            this.$recompute("person");
            if (this.pk == app.subject)
                app.subjectPerson = p;
            if (this.pk == app.me)
                app.mePerson = p;
        },
        getPerson: function () {
            this.personObj = null;
            var pk = EcPk.fromPem(this.pk);
            var me = this;
            EcRepository.get(repo.selectedServer + "data/schema.org.Person/" + pk.fingerprint(), function (person) {
                var e = new EcEncryptedValue();
                if (person.isAny(e.getTypes())) {
                    me.private = true;
                    e.copyFrom(person);
                    e.decryptIntoObjectAsync(me.setPerson, console.error);
                } else {
                    me.private = false;
                    me.setPerson(person);
                }
            }, function (failure) {
                var pk = EcPk.fromPem(me.pk);
                var p = new Person();
                p.assignId(repo.selectedServer, pk.fingerprint());
                p.addOwner(pk);
                p.seeks = [];
                if (me.displayName == null)
                    p.name = "Unknown Person.";
                else
                    p.name = me.displayName;
                me.setPerson(p);
                me.private = true;
                if (me.pk == app.subject)
                    app.subjectPerson = p;
                if (me.pk == app.me)
                    app.mePerson = p;
                if (me.mine)
                    me.savePerson();
            });
        },
        cancelSave: function () {
            this.editing = false;
            this.getPerson();
        },
        clickTitle: function () {
            if (this.onClick != null)
                this.onClick(this.pk);
        },
        contact: function () {
            var c = new EcContact();
            c.pk = EcPk.fromPem(this.pk);
            c.displayName = this.name;
            EcIdentityManager.addContact(c);
            this.inContactList = true;
            app.mePerson.addReader(EcPk.fromPem(this.pk));
            repo.saveTo(app.mePerson, console.log, console.error);
        },
        uncontact: function () {
            for (var i = 0; i < EcIdentityManager.contacts.length; i++) {
                if (EcIdentityManager.contacts[i].pk.toPem() == this.pk)
                    EcIdentityManager.contactChanged(EcIdentityManager.contacts.splice(i, 1));
            }
            this.inContactList = false;
            app.mePerson.removeReader(EcPk.fromPem(this.pk));
            repo.saveTo(app.mePerson, console.log, console.error);
        },
        shareAssertionsAboutSubjectWith: function () {
            var me = this;
            app.processing = true;
            app.processingMessage = "Fetching assertions about " + app.subjectName;
            var complete = 0;
            var count = 0;
            EcAssertion.search(repo,
                "\\*owner:\"" + app.me + "\" AND \\*reader:\"" + app.subject + "\"",
                function (assertions) {
                    count = assertions.length;
                    app.processingMessage = count + " claims found. Sharing with " + me.name + ".";
                    var eah = new EcAsyncHelper();
                    eah.each(assertions, function (assertion, after) {
                        assertion.getSubjectAsync(function (subject) {
                            if (app.subject == subject.toPem()) {
                                assertion.getAgentAsync(function (agent) {
                                    if (app.me == agent.toPem()) {
                                        assertion.addReaderAsync(EcPk.fromPem(me.pk), function () {
                                            EcRepository.save(assertion, function () {
                                                app.processingMessage = ++complete + " of " + count + " claims shared with " + me.name + ".";
                                                after();
                                            }, after);
                                        }, after);
                                    } else
                                        after();
                                }, console.error);
                            } else
                                after();
                        }, console.error);
                    }, function (assertions) {
                        app.processing = false;
                    });
                }, console.error, {
                    size: 5000
                });
        },
        unshareAssertionsAboutSubjectWith: function (evt, after) {
            var me = this;
            app.processing = true;
            app.processingMessage = "Fetching assertions about " + app.subjectName;
            var complete = 0;
            var count = 0;
            EcAssertion.search(repo,
                "\\*owner:\"" + app.me + "\" AND \\*reader:\"" + app.subject + "\"",
                function (assertions) {
                    var eah = new EcAsyncHelper();
                    eah.each(assertions, function (assertion, after) {
                        count = assertions.length;
                        app.processingMessage = count + " claims found. Unsharing with " + me.name + ".";
                        assertion.getSubjectAsync(function (subject) {
                            if (app.subject == subject.toPem()) {
                                assertion.getAgentAsync(function (agent) {
                                    if (app.me == agent.toPem()) {
                                        assertion.removeReaderAsync(EcPk.fromPem(me.pk), function () {
                                            EcRepository.save(assertion, function () {
                                                app.processingMessage = ++complete + " of " + count + " claims unshared with " + me.name + ".";
                                                after();
                                            }, after);
                                        }, after);
                                    } else
                                        after();
                                }, console.error);
                            } else
                                after();
                        }, console.error);
                    }, function (assertions) {
                        app.processing = false;
                    });
                }, console.error, {
                    size: 5000
                });
        }
    },
    template: '<div class="profileRow" v-if="person">' +
        '<span v-if="mine">' +
        '<span v-if="editing">' +
        '<i class="mdi mdi-content-save mdi-36px" aria-hidden="true" style="float:right;font-size:large" title="Save your personal information." v-on:click="savePerson()"></i>' +
        '<i class="mdi mdi-cancel mdi-36px" aria-hidden="true" style="float:right;font-size:large" title="Cancel editing." v-on:click="cancelSave();"></i>' +
        '</span>' +
        '<span v-else>' +
        '<i class="mdi mdi-pencil mdi-36px" aria-hidden="true" style="float:right;font-size:large" title="Edit your personal information." v-on:click="editing = true;"></i>' +
        '</span>' +
        '</span>' +
        '<span v-else>' +
        '<i class="mdi mdi-account-circle mdi-36px" aria-hidden="true" style="float:right;font-size:large" title="Remove person from contacts." v-if="isContact" v-on:click="uncontact();"></i> ' +
        '<i class="mdi mdi-account-circle-outline mdi-36px" aria-hidden="true" style="float:right;font-size:large" title="Add person to contacts." v-else v-on:click="contact();"></i> ' +
        '<i class="mdi mdi-comment-processing-outline mdi-36px" aria-hidden="true" style="float:right;font-size:large" :title="unshareStatement" v-if="isSubject == false" v-on:click="unshareAssertionsAboutSubjectWith();"></i> ' +
        '<i class="mdi mdi-comment-account mdi-36px" aria-hidden="true" style="float:right;font-size:large" :title="shareStatement" v-if="isSubject == false" v-on:click="shareAssertionsAboutSubjectWith();"></i> ' +
        '</span>' +
        '<img style="vertical-align: sub;" v-if="fingerprintUrl" :src="fingerprintUrl" :title="fingerprint"/>' +
        '<svg v-else style="vertical-align: sub;" width="44" height="44" :data-jdenticon-value="fingerprint" :title="fingerprint"></svg>' +
        ' <span v-if="editing">Name:</span>' +
        '<input type="text" v-if="editing" v-on:keyup.esc="cancelSave()" v-on:keyup.enter="savePerson()" v-model="name">' +
        ' <span v-if="editing">Email:</span>' +
        '<input type="text" v-if="editing" v-on:keyup.esc="cancelSave()" v-on:keyup.enter="savePerson()" v-model="email">' +
        '<h2 v-else v-on:click="clickTitle" style="display:inline;">{{ name }}</h2>' +
        '<div v-if="editing"><br><br><input :id="pk" v-model="private" type="checkbox"><label :for="pk">Private</label></div>' +
        '</div>'
});
