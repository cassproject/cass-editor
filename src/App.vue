<template>
    <div
        id="app"
        class="has-background-white">
        <!-- nav bar navigation -->
        <cass-modal />
        <DynamicModal />

        <router-view
            :showSideNav="showSideNav"
            @sideBarEvent="onSidebarEvent"
            name="topbar" />
        <router-view
            id="app-content"
            :class="[{ 'clear-side-bar': showSideNav}, {'clear-right-aside': showRightAside}]"
            :queryParams="queryParams" />
        <router-view
            :showSideNav="showSideNav"
            @createNewFramework="onCreateNewFramework"
            name="sidebar" />
    </div>
</template>

<script>
import common from '@/mixins/common.js';
import cassModal from './components/CassModal.vue';
import DynamicModal from './components/modals/DynamicModal.vue';

export default {
    mixins: [common],
    name: "App",
    components: {
        DynamicModal
    },
    data: function() {
        return {
            navBarActive: false,
            queryParams: null,
            repo: window.repo,
            itemsSaving: 0,
            showNav: true
        };
    },
    $router: function(to, from) {
        if (to.path !== from.path) {
            this.navBarActive = false;
        }
    },
    beforeDestroy: function() {
        window.removeEventListener('message', this.cappend);
        window.removeEventListener("message", this.messageListener);
    },
    created: function() {
        var servers = ["https://dev.api.cassproject.org/api/"];
        var me = this;
        if (this.$route.query) {
            this.queryParams = this.$route.query;
            if (this.queryParams.server) {
                if (this.queryParams.server.endsWith && this.queryParams.server.endsWith("/") === false) {
                    this.queryParams.server += "/";
                }
                servers = [this.queryParams.server];
            }
        }
        for (var i = 0; i < servers.length; i++) {
            var r = new EcRepository();
            r.selectedServer = servers[i];
            r.autoDetectRepository();
            servers[i] = r;
            window.repo = r;

            try {
                window.addEventListener('message', this.cappend, false);
            } catch (e) {
                console.error(e);
            }

            this.openWebSocket(r);
        }
        if (window.addEventListener) {
            window.addEventListener("message", this.messageListener, false);
        } else {
            window.attachEvent("onmessage", this.messageListener);
        }
        this.loadIdentity(function() {
            if (me.queryParams) {
                if (me.queryParams.frameworkId) {
                    if (me.queryParams.concepts === "true") {
                        EcConceptScheme.get(me.queryParams.frameworkId, function(success) {
                            me.$store.commit('editor/framework', success);
                            me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                            me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                            me.$router.push({name: "conceptScheme", params: {frameworkId: me.queryParams.frameworkId}});
                        }, console.error);
                    } else {
                        EcFramework.get(me.queryParams.frameworkId, function(success) {
                            me.$store.commit('editor/framework', success);
                            me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                            me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                            me.$router.push({name: "framework", params: {frameworkId: me.queryParams.frameworkId}});
                        }, console.error);
                    }
                }
                if (me.queryParams.action === "import") {
                    me.$router.push({name: "import"});
                }
                if (me.queryParams.action === "add") {
                    me.createNew();
                }
            }
        });
        if (parent !== window) {
            var oHead = document.getElementsByTagName("head")[0];
            var arrStyleSheets = parent.document.getElementsByTagName("*");
            for (var i = 0; i < arrStyleSheets.length; i++) {
                if (arrStyleSheets[i].tagName.toLowerCase() === "link" || arrStyleSheets[i].tagName.toLowerCase() === "style") {
                    if (arrStyleSheets[i].attributes.inherit != null) {
                        oHead.appendChild(arrStyleSheets[i].cloneNode(true));
                    }
                }
            }
            try {
                this.importParentStyles();
            // eslint-disable-next-line no-empty
            } catch (e) {}
        }
        if (this.queryParams.css != null) {
            var ss = document.createElement("link");
            ss.type = "text/css";
            ss.rel = "stylesheet";
            ss.href = this.queryParams.css;
            document.getElementsByTagName("head")[0].appendChild(ss);
        }
    },
    methods: {
        onSidebarEvent: function() {
            this.showSideNav = !this.showSideNav;
        },
        onCreateNewFramework: function() {
            this.createNew();
        },
        cappend: function(event) {
            if (event.data.message === "selected") {
                var selectedIds = [];
                for (var i = 0; i < event.data.selected.length; i++) {
                    if (event.data.selected[i]["ceasn:exactAlignment"]) {
                        selectedIds.push(event.data.selected[i]["ceasn:exactAlignment"]);
                    } else if (event.data.selected[i]["@id"]) {
                        selectedIds.push(event.data.selected[i]["@id"]);
                    } else {
                        selectedIds.push(event.data.selected[i]);
                    }
                }
                console.log("I got " + event.data.selected.length + " selected items from the iframe");
                console.log(event.data.selected);
                if (this.queryParams.concepts === "true" && event.data.type === 'Concept' && this.$store.state.editor.selectCompetencyRelation) {
                    this.addAlignments(selectedIds, selectedCompetency, this.$store.state.editor.selectCompetencyRelation);
                } else if (event.data.type === 'Concept') {
                    this.attachUrlProperties(selectedIds);
                } else if (this.$store.state.editor.selectingCompetencies === true && this.$store.state.editor.selectCompetencyRelation !== "https://schema.cassproject.org/0.4/Level") {
                    var targets = selectedIds;
                    var thing = this.$store.state.editor.selectedCompetency;
                    var relationType = this.$store.state.editor.selectCompetencyRelation;
                    this.addAlignments(targets, thing, relationType);
                } else if (selectedIds.length > 0) {
                    this.showModal("copyOrLink", selectedIds);
                } else if (event.data.selected.length <= 0) {
                    alert("No items have been selected.");
                }
            } else if (event.data.message === "back") {
                this.$router.push({name: "framework", params: {frameworkId: this.$store.state.editor.framework.id}});
            } else if (event.data.message === "highlightedCompetencies") {
                if (!event.data.competencies) {
                    return;
                }
                this.queryParams.highlightCompetency = event.data.competencies;
            } else if (event.data.message === "select") {
                if (this.$route.name === 'framework' && this.queryParams.select) {
                    this.select();
                }
            }
        },
        openWebSocket: function(r) {
            var connection;
            var me = this;
            // Instead of /ws/custom, will be /ws in next release.
            if (this.queryParams.webSocketOverride == null || this.queryParams.webSocketOverride === undefined) {
                connection = new WebSocket(r.selectedServer.replace(/http/, "ws").replace(/api\//, "ws/custom"));
            } else {
                connection = new WebSocket(this.queryParams.webSocketOverride);
            }

            connection.onopen = function() {
                console.log("WebSocket open.");
            };

            connection.onerror = function(error) {
                console.log(error);
            };

            // Re-establish connection on close.
            connection.onclose = function(evt) {
                console.log(evt);
                me.$store.commit('editor/webSocketBackoffIncrease');
                setTimeout(function() {
                    me.openWebSocket(r);
                }, me.$store.state.editor.webSocketBackoff);
            };

            connection.changedObject = function(wut) {
                me.$store.commit('editor/changedObject', wut.shortId());
                if (me.$route.name !== 'framework') {
                    return;
                }

                var framework = me.$store.state.editor.framework;

                if (new ConceptScheme().isA(wut.getFullType()) || wut["encryptedType"] === "ConceptScheme") {
                    if (framework != null) {
                        if (framework.shortId() === wut.shortId()) {
                            var f = new ConceptScheme();
                            if (wut["encryptedType"] === "ConceptScheme") {
                                f = me.decrypt(wut, f);
                            } else {
                                f.copyFrom(wut);
                            }
                            me.$store.commit('editor/framework', f);
                            me.spitEvent("frameworkChanged", f.shortId());
                        }
                    }
                }

                if (new EcFramework().isA(wut.getFullType()) || wut["encryptedType"] === "Framework") {
                    if (framework != null) {
                        if (framework.shortId() === wut.shortId()) {
                            var f = new EcFramework();
                            if (wut["encryptedType"] === "Framework") {
                                f = me.decrypt(wut, f);
                            } else {
                                f.copyFrom(wut);
                            }
                            me.$store.commit('editor/framework', f);
                            me.spitEvent("frameworkChanged", f.shortId());
                        }
                    }
                }

                if (new Concept().isA(wut.getFullType()) || wut["encryptedType"] === "Concept") {
                    if (framework != null) {
                        if (me.$store.state.editor.selectedCompetency != null) {
                            if (me.$store.state.editor.selectedCompetency.shortId() === wut.shortId()) {
                                var com = new EcConcept();
                                if (wut["encryptedType"] === "Concept") {
                                    com = me.decrypt(wut, com);
                                } else {
                                    com.copyFrom(wut);
                                }
                                me.$store.commit('editor/selectedCompetency', com);
                            }
                            me.spitEvent("competencyChanged", me.$store.state.editor.selectedCompetency.shortId());
                        }
                    }
                }
                if (new EcCompetency().isA(wut.getFullType()) || wut["encryptedType"] === "Competency") {
                    if (framework != null) {
                        if (me.$store.state.editor.selectedCompetency != null) {
                            if (me.$store.state.editor.selectedCompetency.shortId() === wut.shortId()) {
                                var com = new EcCompetency();
                                if (wut["encryptedType"] === "Competency") {
                                    com = me.decrypt(wut, com);
                                } else {
                                    com.copyFrom(wut);
                                }
                                me.$store.commit('editor/selectedCompetency', com);
                            }
                            me.spitEvent("competencyChanged", me.$store.state.editor.selectedCompetency.shortId());
                        }
                    }
                }

                if (new EcLevel().isA(wut.getFullType()) || wut["encryptedType"] === "Level") {
                    if (framework != null) {
                        if (me.$store.state.editor.selectedCompetency != null) {
                            if (me.$store.state.editor.selectedCompetency.shortId() === wut.shortId()) {
                                var com = new EcLevel();
                                if (wut["encryptedType"] === "Level") {
                                    com = me.decrypt(wut, com);
                                } else {
                                    com.copyFrom(wut);
                                }
                                me.$store.commit('editor/selectedCompetency', com);
                            }
                            me.spitEvent("competencyChanged", me.$store.state.editor.selectedCompetency.shortId());
                        }
                    }
                }
            };

            connection.onmessage = function(e) {
                var resp = e.data;
                console.log('Server: ' + resp);
                if (!EcArray.isArray(resp) && resp.startsWith("[")) {
                    resp = JSON.parse(resp);
                }
                if (EcArray.isArray(resp)) {
                    for (var i = 0; i < resp.length; i++) {
                        delete EcRepository.cache[resp[i]];
                        delete EcRepository.cache[EcRemoteLinkedData.trimVersionFromUrl(resp[i])];
                    }
                    if (me.$store.state.editor.framework == null) return;
                    me.repo.precache(resp, function() {
                        for (var i = 0; i < resp.length; i++) {
                            EcRepository.get(resp[i], connection.changedObject, console.error);
                        }
                    });
                } else {
                    delete EcRepository.cache[resp];
                    delete EcRepository.cache[EcRemoteLinkedData.trimVersionFromUrl(resp)];
                    EcRepository.get(resp, connection.changedObject, console.error);
                }
            };
        },
        decrypt: function(encryptedThing, returnObject) {
            var v = new EcEncryptedValue();
            v.copyFrom(encryptedThing);
            returnObject.copyFrom(v.decryptIntoObject());
            return returnObject;
        },
        createNew: function() {
            this.setDefaultLanguage();
            var me = this;
            if (this.queryParams.concepts !== "true") {
                var framework = new EcFramework();
                if (this.queryParams.newObjectEndpoint != null) {
                    framework.generateShortId(this.repo.newObjectEndpoint);
                } else {
                    framework.generateId(this.repo.selectedServer);
                }
                framework["schema:dateCreated"] = new Date().toISOString();
                framework["schema:dateModified"] = new Date().toISOString();
                if (EcIdentityManager.ids.length > 0) {
                    framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                framework.name = {"@language": this.$store.state.editor.defaultLanguage, "@value": "New Framework"};
                if (this.queryParams.ceasnDataFields === "true") {
                    framework["schema:inLanguage"] = [this.$store.state.editor.defaultLanguage];
                }
                var saveFramework = framework;
                if (this.queryParams.private === "true") {
                    saveFramework = EcEncryptedValue.toEncryptedValue(framework);
                }
                this.repo.saveTo(saveFramework, function() {
                    me.$store.commit('editor/framework', framework);
                    if (me.$route.name !== 'framework') {
                        me.$router.push({name: "framework"});
                    }
                }, console.error);
            } else {
                var framework = new EcConceptScheme();
                if (this.queryParams.newObjectEndpoint != null) {
                    framework.generateShortId(newObjectEndpoint);
                } else {
                    framework.generateId(this.repo.selectedServer);
                }
                if (EcIdentityManager.ids.length > 0) {
                    framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                framework["dcterms:title"] = {"@language": this.$store.state.editor.defaultLanguage, "@value": "New Concept Scheme"};
                framework["schema:dateCreated"] = new Date().toISOString();
                framework["schema:dateModified"] = new Date().toISOString();
                var saveFramework = framework;
                if (this.queryParams.private === "true") {
                    saveFramework = EcEncryptedValue.toEncryptedValue(framework);
                }
                this.repo.saveTo(saveFramework, function() {
                    me.$store.commit('editor/framework', framework);
                    if (me.$route.name !== 'conceptScheme') {
                        me.$router.push({name: "conceptScheme"});
                    }
                }, console.error);
            }
        },
        loadIdentity: function(callback) {
            var identity;
            if (this.queryParams.user === "self") {
                EcIdentityManager.readIdentities();
                EcIdentityManager.readContacts();
                if (EcIdentityManager.ids.length === 0) {
                    EcPpk.generateKeyAsync(
                        function(p1) {
                            identity = new EcIdentity();
                            identity.ppk = p1;
                            identity.displayName = "You";
                            EcIdentityManager.onIdentityChanged = EcIdentityManager.saveIdentities;
                            EcIdentityManager.addIdentity(identity);
                            callback();
                        }
                    );
                } else {
                    callback();
                }
            } else if (this.queryParams.user === "wait") {
                var fun = function(evt) {
                    var data = evt.data;
                    if (data != null && data !== "" && !EcObject.isObject(data)) {
                        data = JSON.parse(data);
                    }
                    if (data.action === "identity") {
                        identity = new EcIdentity();
                        identity.ppk = EcPpk.fromPem(data.identity);
                        identity.displayName = "You";
                        EcIdentityManager.addIdentity(identity);
                        callback();
                        var message = {
                            action: "response",
                            message: "identityOk"
                        };
                        console.log(message);
                        parent.postMessage(message, this.queryParams.origin);
                    }
                };
                if (window.addEventListener) {
                    window.addEventListener("message", fun, false);
                } else {
                    window.attachEvent("onmessage", fun);
                }
                var message = {
                    message: "waiting"
                };
                console.log(message);
                parent.postMessage(message, this.queryParams.origin);
            } else {
                callback();
            }
        },
        messageListener: function(evt) {
            var data = evt.data;
            var me = this;
            if (data != null && data !== "" && !EcObject.isObject(data)) {
                try {
                    data = JSON.parse(data);
                // eslint-disable-next-line no-empty
                } catch (e) {}
            }
            if (data != null && data !== "") {
                if (data.action === "template") {
                    if (data.framework != null) {
                        EcFramework.template = this.removeNewlines(data.framework);
                    }
                    if (data.competency != null) {
                        EcCompetency.template = this.removeNewlines(data.competency);
                    }
                    if (data.conceptScheme != null) {
                        EcConceptScheme.template = this.removeNewlines(data.conceptScheme);
                    }
                    if (data.concept != null) {
                        EcConcept.template = this.removeNewlines(data.concept);
                    }
                    var message = {
                        action: "response",
                        message: "templateOk"
                    };
                    console.log(message);
                    parent.postMessage(message, this.queryParams.origin);
                } else if (data.action === "set") {
                    if (data.id != null) {
                        var d = EcRepository.getBlocking(data.id);
                    }
                    delete data.id;
                    delete data.action;
                    for (var key in data) {
                        d[key] = data[key];
                    }
                    d["schema:dateModified"] = new Date().toISOString();
                    if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[d.id] !== true) {
                        d = EcEncryptedValue.toEncryptedValue(d);
                    }
                    repo.saveTo(d, function(success) {
                        var message = {
                            action: "response",
                            message: "setOk"
                        };
                        console.log(message);
                        parent.postMessage(message, me.queryParams.origin);
                    }, function(failure) {
                        var message = {
                            action: "response",
                            message: "setFail"
                        };
                        console.log(message);
                        parent.postMessage(message, me.queryParams.origin);
                    });
                } else if (data.action === "export") {
                    var v = data.schema;
                    var link;
                    var fid;
                    var guid;
                    var framework = this.$store.state.editor.framework;
                    if (this.$store.state.editor.selectedCompetency != null) {
                        var selectedCompetency = this.$store.state.editor.selectedCompetency;
                        if (EcRepository.shouldTryUrl(selectedCompetency.id) === false) {
                            link = this.repo.selectedServer + "data/" + EcCrypto.md5(selectedCompetency.id);
                            fid = this.repo.selectedServer + "data/" + EcCrypto.md5(framework.id);
                            guid = EcCrypto.md5(selectedCompetency.id);
                        } else {
                            link = selectedCompetency.id;
                            fid = framework.id;
                            guid = selectedCompetency.getGuid();
                        }
                    } else {
                        if (EcRepository.shouldTryUrl(framework.id) === false) {
                            link = this.repo.selectedServer + "data/" + EcCrypto.md5(framework.id);
                            fid = this.repo.selectedServer + "data/" + EcCrypto.md5(framework.id);
                            guid = EcCrypto.md5(framework.id);
                        } else {
                            link = framework.id;
                            fid = framework.id;
                            guid = framework.getGuid();
                        }
                    }
                    if (v === "asn") {
                        this.get(fid.replace("/data/", "/asn/"), null, null, function(success) {
                            var data = JSON.parse(success);
                            parent.postMessage({
                                action: "response",
                                message: "export",
                                schema: "asn",
                                format: "rdf+json",
                                data: data
                            }, me.queryParams.origin);
                        });
                    } else if (v === "cass") {
                        this.get(link, null, null, function(success) {
                            var data = JSON.parse(success);
                            parent.postMessage({
                                action: "response",
                                message: "export",
                                schema: "cass",
                                format: "application/ld+json",
                                data: data
                            }, me.queryParams.origin);
                        });
                    } else if (v === "cassn4") {
                        this.get(link, null, {"Accept": "text/n4"}, function(success) {
                            var data = JSON.parse(success);
                            parent.postMessage({
                                action: "response",
                                message: "export",
                                schema: "cass",
                                format: "text/n4",
                                data: data
                            }, me.queryParams.origin);
                        }, function(failure) {
                            console.log(failure);
                        });
                    } else if (v === "cassrdfjson") {
                        this.get(link, null, {"Accept": "application/rdf+json"}, function(success) {
                            var data = JSON.parse(success);
                            parent.postMessage({
                                action: "response",
                                message: "export",
                                schema: "cass",
                                format: "application/rdf+json",
                                data: data
                            }, me.queryParams.origin);
                        }, function(failure) {
                            console.log(failure);
                        });
                    } else if (v === "cassrdfxml") {
                        this.get(link, null, {"Accept": "application/rdf+xml"}, function(success) {
                            var data = JSON.parse(success);
                            parent.postMessage({
                                action: "response",
                                message: "export",
                                schema: "cass",
                                format: "application/rdf+xml",
                                data: data
                            }, me.queryParams.origin);
                        }, function(failure) {
                            console.log(failure);
                        });
                    } else if (v === "cassturtle") {
                        this.get(link, null, {"Accept": "text/turtle"}, function(success) {
                            var data = JSON.parse(success);
                            parent.postMessage({
                                action: "response",
                                message: "export",
                                schema: "cass",
                                format: "text/turtle",
                                data: data
                            }, me.queryParams.origin);
                        }, function(failure) {
                            console.log(failure);
                        });
                    } else if (v === "ceasn" || v === "ctdlasn") {
                        this.get(fid.replace("/data/", "/ceasn/"), null, null, function(success) {
                            var data = JSON.parse(success);
                            parent.postMessage({
                                action: "response",
                                message: "export",
                                schema: v,
                                format: "application/ld+json",
                                data: data
                            }, me.queryParams.origin);
                        });
                    } else if (v === "case") {
                        if (selectedCompetency == null) {
                            this.get(this.repo.selectedServer + "ims/case/v1p0/CFDocuments/" + guid, null, null, function(success) {
                                var data = JSON.parse(success);
                                parent.postMessage({
                                    action: "response",
                                    message: "export",
                                    schema: "case",
                                    format: "application/json",
                                    data: data
                                }, me.queryParams.origin);
                            }, function(failure) {
                                console.log(failure);
                            });
                        } else {
                            this.get(this.repo.selectedServer + "ims/case/v1p0/CFItems/" + guid, null, null, function(success) {
                                var data = JSON.parse(success);
                                parent.postMessage({
                                    action: "response",
                                    message: "export",
                                    schema: "case",
                                    format: "application/json",
                                    data: data
                                }, me.queryParams.origin);
                            }, function(failure) {
                                console.log(failure);
                            });
                        }
                    }
                }
            }
        },
        // Removes newlines from public key in owner and reader fields
        removeNewlines: function(entity) {
            if (entity["@owner"] != null) {
                for (var i = 0; i < entity["@owner"].length; i++) {
                    var owner = entity["@owner"][i];
                    entity["@owner"][i] = EcPk.fromPem(owner).toPem();
                }
            }
            if (entity["@reader"] != null) {
                for (var i = 0; i < entity["@reader"].length; i++) {
                    var owner = entity["@reader"][i];
                    entity["@reader"][i] = EcPk.fromPem(owner).toPem();
                }
            }
            return entity;
        },
        attachUrlProperties: function(results) {
            var resource = this.$store.state.editor.framework;
            if (this.$store.state.editor.selectedCompetency != null) {
                resource = this.$store.state.editor.selectedCompetency;
            }
            for (var i = 0; i < results.length; i++) {
                var thing = EcRepository.getBlocking(results[i]);
                if (thing.isAny(new EcConcept().getTypes())) {
                    if (!EcArray.isArray(resource[this.$store.state.editor.selectCompetencyRelation])) {
                        resource[this.$store.state.editor.selectCompetencyRelation] = [];
                    }
                    EcArray.setAdd(resource[this.$store.state.editor.selectCompetencyRelation], thing.shortId());
                }
            }
            resource["schema:dateModified"] = new Date().toISOString();
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[resource.id] !== true) {
                resource = EcEncryptedValue.toEncryptedValue(resource);
            }
            this.repo.saveTo(resource, function() {}, console.error);
        },
        showModal(val, data) {
            let params = {};
            if (val === 'copyOrLink') {
                params = {
                    type: val,
                    title: "Copy or Link",
                    text: "Do you want to copy or link to the selected items?",
                    options: ["Copy", "Link"],
                    onConfirm: (choice) => {
                        return this.copyOrLink(choice, data);
                    }
                };
            }
            // reveal modal
            this.$modal.show(params);
        },
        copyOrLink(choice, selectedIds) {
            if (choice === "Copy") {
                this.copyCompetencies(selectedIds);
            } else {
                this.appendCompetencies(selectedIds, true);
            }
        },
        copyCompetencies: function(results) {
            var copyDict = {};
            var framework = this.$store.state.editor.framework;
            var me = this;
            for (var i = 0; i < results.length; i++) {
                var thing = EcRepository.getBlocking(results[i]);
                if (thing != null && thing.isAny(new EcCompetency().getTypes())) {
                    var c = new EcCompetency();
                    c.copyFrom(thing);
                    if (this.queryParams.newObjectEndpoint != null) {
                        c.generateShortId(this.queryParams.newObjectEndpoint);
                    } else {
                        c.generateId(this.repo.selectedServer);
                    }
                    c["schema:dateCreated"] = new Date().toISOString();
                    c["schema:dateModified"] = new Date().toISOString();
                    delete c.owner;
                    if (EcIdentityManager.ids.length > 0) {
                        c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                    }
                    if (framework.owner && framework.owner.length > 0) {
                        for (var j = 0; j < framework.owner.length; j++) {
                            var owner = framework.owner[j];
                            c.addOwner(EcPk.fromPem(owner));
                        }
                    }
                    if (this.$store.state.editor && this.$store.state.editor.configuration) {
                        var config = this.$store.state.editor.configuration;
                        if (config["defaultObjectOwners"]) {
                            for (var k = 0; k < config["defaultObjectOwners"].length; k++) {
                                c.addOwner(EcPk.fromPem(config["defaultObjectOwners"][k]));
                            }
                        }
                        if (config["defaultObjectReaders"]) {
                            for (var k = 0; k < config["defaultObjectReaders"].length; k++) {
                                c.addReader(EcPk.fromPem(config["defaultObjectReaders"][k]));
                            }
                        }
                    }
                    c['ceasn:derivedFrom'] = thing.id;
                    copyDict[c['ceasn:derivedFrom']] = c;
                    if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[c.id] !== true) {
                        c = EcEncryptedValue.toEncryptedValue(c);
                    }
                    this.itemsSaving++;
                    (function(c) {
                        Task.asyncImmediate(function(callback) {
                            me.repo.saveTo(c, function() {
                                framework.addCompetency(c.id);
                                me.$store.commit('editor/framework', framework);
                                me.afterCopy();
                                callback();
                            }, function(error) {
                                console.error(error);
                                me.afterCopy();
                                callback();
                            });
                        });
                    })(c);
                } else if (thing != null && thing.isAny(new EcLevel().getTypes())) {
                    var level = new EcLevel();
                    level.copyFrom(thing);
                    if (this.queryParams.newObjectEndpoint != null) {
                        level.generateShortId(this.queryParams.newObjectEndpoint);
                    } else {
                        level.generateId(this.repo.selectedServer);
                    }
                    level["schema:dateCreated"] = new Date().toISOString();
                    level.competency = this.$store.state.editor.selectedCompetency.shortId();
                    delete level.owner;
                    level['ceasn:derivedFrom'] = thing.id;
                    copyDict[level['ceasn:derivedFrom']] = level;
                    if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[level.id] !== true) {
                        level = EcEncryptedValue.toEncryptedValue(level);
                    }
                    this.itemsSaving++;
                    (function(level) {
                        Task.asyncImmediate(function(callback) {
                            me.repo.saveTo(level, function() {
                                framework.addLevel(level.id);
                                me.$store.commit('editor/framework', framework);
                                me.afterCopy();
                                callback();
                            }, function(error) {
                                console.error(error);
                                me.afterCopy();
                                callback();
                            });
                        });
                    })(level);
                }
            }
            for (var i = 0; i < results.length; i++) {
                var thing = EcRepository.getBlocking(results[i]);
                if (thing != null && thing.isAny(new EcAlignment().getTypes())) {
                    var parent = copyDict[thing.target];
                    var child = copyDict[thing.source];

                    if (typeof parent !== 'undefined' && typeof child !== 'undefined') {
                        var r = new EcAlignment();
                        r.copyFrom(thing);
                        if (this.queryParams.newObjectEndpoint != null) {
                            r.generateShortId(this.queryParams.newObjectEndpoint);
                        } else {
                            r.generateId(this.repo.selectedServer);
                        }
                        r["schema:dateCreated"] = new Date().toISOString();

                        r.target = parent.shortId();
                        r.source = child.shortId();
                        r.relationType = thing.relationType;
                        if (EcIdentityManager.ids.length > 0) {
                            r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                        }
                        if (framework.owner && framework.owner.length > 0) {
                            for (var j = 0; j < framework.owner.length; j++) {
                                var owner = framework.owner[j];
                                r.addOwner(EcPk.fromPem(owner));
                            }
                        }
                        if (this.$store.state.editor && this.$store.state.editor.configuration) {
                            var config = this.$store.state.editor.configuration;
                            if (config["defaultObjectOwners"]) {
                                for (var k = 0; k < config["defaultObjectOwners"].length; k++) {
                                    r.addOwner(EcPk.fromPem(config["defaultObjectOwners"][k]));
                                }
                            }
                            if (config["defaultObjectReaders"]) {
                                for (var k = 0; k < config["defaultObjectReaders"].length; k++) {
                                    r.addReader(EcPk.fromPem(config["defaultObjectReaders"][k]));
                                }
                            }
                        }
                        if (r.source !== r.target) {
                            framework["schema:dateModified"] = new Date().toISOString();
                            EcArray.setRemove(results, thing.source);
                            if (this.$store.state.editor.private === true) {
                                r = EcEncryptedValue.toEncryptedValue(r);
                            }
                            this.itemsSaving++;
                            (function(r) {
                                Task.asyncImmediate(function(callback) {
                                    me.repo.saveTo(r, function() {
                                        framework.addRelation(r.id);
                                        me.$store.commit('editor/framework', framework);
                                        me.afterCopy();
                                        callback();
                                    },
                                    function(error) {
                                        console.error(error);
                                        me.afterCopy();
                                        callback();
                                    });
                                });
                            })(r);
                        }
                    }
                }
            }
            var selectedCompetency = this.$store.state.editor.selectedCompetency;
            for (var i = 0; i < results.length; i++) {
                var thing = EcRepository.getBlocking(results[i]);
                if (thing != null && thing.isAny(new EcCompetency().getTypes())) {
                    if (selectedCompetency != null) {
                        var r = new EcAlignment();
                        if (this.queryParams.newObjectEndpoint != null) {
                            r.generateShortId(this.queryParams.newObjectEndpoint);
                        } else {
                            r.generateId(this.repo.selectedServer);
                        }
                        r["schema:dateCreated"] = new Date().toISOString();

                        var child = copyDict[thing.id];

                        r.target = selectedCompetency.shortId();
                        r.source = child.shortId();
                        r.relationType = Relation.NARROWS;
                        if (EcIdentityManager.ids.length > 0) {
                            r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                        }
                        if (framework.owner && framework.owner.length > 0) {
                            for (var j = 0; j < framework.owner.length; j++) {
                                var owner = framework.owner[j];
                                r.addOwner(EcPk.fromPem(owner));
                            }
                        }
                        if (this.$store.state.editor && this.$store.state.editor.configuration) {
                            var config = this.$store.state.editor.configuration;
                            if (config["defaultObjectOwners"]) {
                                for (var k = 0; k < config["defaultObjectOwners"].length; k++) {
                                    r.addOwner(EcPk.fromPem(config["defaultObjectOwners"][k]));
                                }
                            }
                            if (config["defaultObjectReaders"]) {
                                for (var k = 0; k < config["defaultObjectReaders"].length; k++) {
                                    r.addReader(EcPk.fromPem(config["defaultObjectReaders"][k]));
                                }
                            }
                        }
                        if (r.source !== r.target) {
                            this.itemsSaving++;
                            framework.addRelation(r.id);
                            framework["schema:dateModified"] = new Date().toISOString();
                            if (this.$store.state.editor.private === true) {
                                r = EcEncryptedValue.toEncryptedValue(r);
                            }
                            (function(r) {
                                Task.asyncImmediate(function(callback) {
                                    me.repo.saveTo(r, function() {
                                        me.afterCopy();
                                        callback();
                                    },
                                    function(error) {
                                        console.error(error);
                                        me.afterCopy();
                                        callback();
                                    });
                                });
                            })(r);
                        }
                    }
                }
            }
        },
        afterCopy: function() {
            this.itemsSaving--;
            // loading(this.itemsSaving + " objects left to copy.");
            if (this.itemsSaving === 0) {
                var framework = this.$store.state.editor.framework;
                if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                this.repo.saveTo(framework, function() {}, console.error);
            }
        },
        appendCompetencies: function(results, newLink) {
            var selectedCompetency = this.$store.state.editor.selectedCompetency;
            var framework = this.$store.state.editor.framework;
            var me = this;
            for (var i = 0; i < results.length; i++) {
                var thing = EcRepository.getBlocking(results[i]);
                if (thing.isAny(new EcCompetency().getTypes())) {
                    framework.addCompetency(thing.shortId());
                } else if (thing.isAny(new EcLevel().getTypes())) {
                    framework.addLevel(thing.shortId());
                    if (!EcArray.isArray(thing.competency)) {
                        thing.competency = [thing.competency];
                    }
                    thing.competency.push(selectedCompetency.shortId());
                    this.repo.saveTo(thing, function() {}, console.error);
                }
            }
            for (var i = 0; i < results.length; i++) {
                var thing = EcRepository.getBlocking(results[i]);
                if (thing.isAny(new EcAlignment().getTypes())) {
                    if (EcArray.has(framework.competency, thing.source)) {
                        if (EcArray.has(framework.competency, thing.target)) {
                            framework.addRelation(thing.shortId());
                            EcArray.setRemove(results, thing.source);
                        }
                    }
                }
            }

            for (var i = 0; i < results.length; i++) {
                var thing = EcRepository.getBlocking(results[i]);
                if (thing.isAny(new EcCompetency().getTypes())) {
                    if (selectedCompetency != null) {
                        var r = new EcAlignment();
                        if (this.queryParams.newObjectEndpoint != null) {
                            r.generateShortId(this.queryParams.newObjectEndpoint);
                        } else {
                            r.generateId(this.repo.selectedServer);
                        }
                        r["schema:dateCreated"] = new Date().toISOString();

                        r.target = selectedCompetency.shortId();
                        r.source = thing.shortId();
                        r.relationType = Relation.NARROWS;
                        if (EcIdentityManager.ids.length > 0) {
                            r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                        }
                        if (framework.owner && framework.owner.length > 0) {
                            for (var j = 0; j < framework.owner.length; j++) {
                                var owner = framework.owner[j];
                                r.addOwner(EcPk.fromPem(owner));
                            }
                        }
                        if (this.$store.state.editor && this.$store.state.editor.configuration) {
                            var config = this.$store.state.editor.configuration;
                            if (config["defaultObjectOwners"]) {
                                for (var k = 0; k < config["defaultObjectOwners"].length; k++) {
                                    r.addOwner(EcPk.fromPem(config["defaultObjectOwners"][k]));
                                }
                            }
                            if (config["defaultObjectReaders"]) {
                                for (var k = 0; k < config["defaultObjectReaders"].length; k++) {
                                    r.addReader(EcPk.fromPem(config["defaultObjectReaders"][k]));
                                }
                            }
                        }

                        if (r.source !== r.target) {
                            framework.addRelation(r.id);
                            if (this.$store.state.editor.private === true) {
                                r = EcEncryptedValue.toEncryptedValue(r);
                            }
                            this.repo.saveTo(r, function() {}, console.error);
                        }
                    }
                }
            }
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, function() {
                me.$store.commit('editor/framework', EcFramework.getBlocking(framework.id));
            }, console.error);
        },
        addRelationAsCompetencyField: function(targets, thing, relationType, allowSave) {
            var me = this;
            for (var i = 0; i < targets.length; i++) {
                if (thing[relationType] == null) {
                    thing[relationType] = [];
                }
                thing[relationType].push(targets[i]);
            }
            thing["schema:dateModified"] = new Date().toISOString();
            if (this.$store.state.editor.private === true) {
                if (EcEncryptedValue.encryptOnSaveMap[thing.id] !== true) {
                    thing = EcEncryptedValue.toEncryptedValue(thing);
                }
            }
            me.repo.saveTo(thing, function() {}, console.error);
        },
        importParentStyles: function() {
            var parentStyleSheets = parent.document.styleSheets;
            var cssString = "";
            for (var i = 0, count = parentStyleSheets.length; i < count; ++i) {
                if (parentStyleSheets[i].cssRules) {
                    if (parentStyleSheets[i].ownerNode.attributes.inherit != null) {
                        var cssRules = parentStyleSheets[i].cssRules;
                        for (var j = 0, countJ = cssRules.length; j < countJ; ++j) {
                            cssString += cssRules[j].cssText;
                        }
                    } // else
                // cssString += parentStyleSheets[i].cssText; // IE8 and earlier
                }
            }
            var style = document.createElement("style");
            style.type = "text/css";
            try {
                style.innerHTML = cssString;
            } catch (ex) {
                // style.styleSheet.cssText = cssString; // IE8 and earlier
            }
            document.getElementsByTagName("head")[0].appendChild(style);
        }
    },
    computed: {
        showRightAside: function() {
            return this.$store.getters['app/showRightAside'];
        },
        showSideNav: function() {
            return this.$store.getters['app/showSideNav'];
        },
        currentRoute: function() {
            return this.$route.path;
        },
        currentPathIsLogin: function() {
            if (this.$route.name === 'login') return true;
            else return false;
        }
    },
    watch: {
        '$route'(to, from) {
            let navigationTo = to;
            if (navigationTo) {
                this.navBarActive = false;
            }
        }
    }
};
</script>


<style scoped lang="scss">
 @import './scss/variables.scss';
.pagesFull {
    margin-top:40px;
}
.pagesRightFull {
    width: calc(100% - 360px) !important;
    margin-left: 360px;
    margin-top:50px;
}


    html {
        font-family: $family-primary;
        max-width: 100vw !important;
        margin: 0px;
        height: 100%;
        padding: 0px;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 16px;
    }
    body{
        // Tom B.  Taking this out for now as it screws up the configuration editor and needing scrolling
        //overflow-y: hidden;
        height: 100%;
        background: $light;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 100vh;
    }
    #app {
        height: 100%;
    }
    #app-content {

    }
    .clear-side-bar {
        margin-left: 300px;
    }
    .clear-right-aside {
        margin-right: 340px;
    }


    .menu {
        overflow-y: scroll;
        height: 100vh;
        padding: 1rem;
        width: 300px;
    }

    .navbar-menu {
        // override active links
        .is-active{
            color: rgba($light, .8) !important;

        }
    }

    #mainDropDown {
        .is-active{
            color: rgba($dark, .7) !important;
        }
    }

</style>