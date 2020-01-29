<template>
    <div
        id="app"
        class="has-background-white">
        <!-- nav bar navigation -->
        <nav
            class="navbar is-black is-fixed-top"
            role="navigation"
            aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <router-link to="/">
                        <h2 class="has-text-white subtitle">
                            Cass Editor
                        </h2>
                    </router-link>
                </div>
                <a
                    role="button"
                    class="navbar-burger burger"
                    :class="{ 'is-active': navBarActive}"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="mainDropDown"
                    @click="navBarActive = !navBarActive">
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <div class="navbar-item">
                        <a
                            class="has-text-light"
                            @click="createNew">
                            New
                        </a>
                    </div>
                    <div class="navbar-item">
                        <router-link
                            class="has-text-light"
                            to="/">
                            Open
                        </router-link>
                    </div>
                    <div class="navbar-item">
                        <router-link
                            class="has-text-light"
                            to="/import">
                            Import
                        </router-link>
                    </div>
                    <div
                        class="navbar-item has-dropdown is-hoverable"
                        v-if="$route.name=='framework'">
                        <a class="navbar-link is-primary">
                            Export
                        </a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                Achivement Standards Network (RDF+JSON)
                            </a>
                            <a class="navbar-item">
                                CaSS (JSON-LD)
                            </a>
                            <a class="navbar-item">
                                CaSS (RDF Quads)
                            </a>
                            <a class="navbar-item">
                                CaSS (RDF+JSON)
                            </a>
                            <a class="navbar-item">
                                CaSS (RDF+XML)
                            </a>
                            <a class="navbar-item">
                                CaSS (Turtle)
                            </a>
                            <a class="navbar-item">
                                Credential Engine ASN (JSON-LD)
                            </a>
                            <a class="navbar-item">
                                Credential Engine ASN (CSV)
                            </a>
                            <a class="navbar-item">
                                Table (CSV)
                            </a>
                            <a class="navbar-item">
                                IMS Global CASE (JSON)
                            </a>
                        </div>
                    </div>
                    <!--<div class="navbar-item">
                        <router-link
                            class="has-text-light"
                            to="/help">
                            Help
                        </router-link>
                    </div>-->
                </div>
                <div class="navbar-end" />
            </div>

            <div
                id="mainDropDown"
                class="navbar-menu is-dark is-hoverable"
                :class="{ 'is-active': navBarActive}">
                <div class="navbar-end">
                    <div
                        class="navbar-item has-dropdown is-hidden-desktop"
                        :class="{ 'is-active': navBarActive}">
                        <div>
                            <div class="navbar-item">
                                <router-link to="/new">
                                    New
                                </router-link>
                            </div>
                            <div class="navbar-item">
                                <router-link to="/">
                                    Open
                                </router-link>
                            </div>
                            <div class="navbar-item">
                                <router-link to="/import">
                                    Import
                                </router-link>
                            </div>
                            <div class="navbar-item">
                                <router-link to="/help">
                                    Help
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- nav bar tablet and mobile drop down side navigation -->
        </nav>
        <router-view
            :exportType="exportType"
            :queryParams="queryParams" />
    </div>
</template>
<style scoped lang="scss">

.pagesFull {
    margin-top:40px;
}
.pagesRightFull {
    width: calc(100% - 360px) !important;
    margin-left: 360px;
    margin-top:50px;
}

</style>
<style lang="scss">
    @import './styles.scss';
</style>
<script>
import common from '@/mixins/common.js';
export default {
    data: function() {
        return {
            navBarActive: false,
            exportType: null,
            queryParams: null,
            repo: window.repo
        };
    },
    mixins: [common],
    $router: function(to, from) {
        if (to.path !== from.path) {
            this.navBarActive = false;
        }
    },
    created: function() {
        var servers = ["https://dev.cassproject.org/api/"];
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
                            me.$store.commit('framework', success);
                            me.$router.push({name: "conceptScheme", params: {frameworkId: me.queryParams.frameworkId}});
                        }, console.error);
                    } else {
                        EcFramework.get(me.queryParams.frameworkId, function(success) {
                            me.$store.commit('framework', success);
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
    },
    methods: {
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
                if (this.queryParams.concepts === "true" && event.data.type === 'Concept' && this.$store.state.editor.selectConceptRelation) {
                    this.addAlignments(selectedIds, selectedCompetency, this.$store.state.editor.selectConceptRelation);
                } else if (event.data.type === 'Concept') {
                    this.attachUrlProperties(selectedIds);
                } else if (this.$store.state.editor.selectingCompetencies === true) {
                    var targets = selectedIds;
                    var thing = this.$store.state.editor.selectedCompetency;
                    var relationType = this.$store.state.editor.selectCompetencyRelation;
                    this.addAlignments(targets, thing, relationType);
                } else if (selectedIds.length > 0) {
                    this.showCopyOrLinkDialog(function(copy) {
                        if (copy === true) {
                            this.copyCompetencies(selectedIds);
                        } else {
                            this.appendCompetencies(selectedIds, true);
                        }
                        this.hideCopyOrLinkDialog();
                    });
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
                me.$store.commit('webSocketBackoffIncrease');
                setTimeout(function() {
                    me.openWebSocket(r);
                }, webSocketBackoff);
            };

            connection.changedObject = function(wut) {
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
                            me.$store.commit('framework', f);
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
                            me.$store.commit('framework', f);
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
                                me.$store.commit('selectedCompetency', com);
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
                                me.$store.commit('selectedCompetency', com);
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
                                me.$store.commit('selectedCompetency', com);
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
                    if (me.$store.state.editor.framework == null) return;
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
                if (EcIdentityManager.ids.length > 0) {
                    framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                framework.name = {"@language": this.$store.state.editor.defaultLanguage, "@value": "New Framework"};
                var saveFramework = framework;
                if (this.queryParams.private === "true") {
                    saveFramework = EcEncryptedValue.toEncryptedValue(framework);
                }
                this.repo.saveTo(saveFramework, function() {
                    me.$store.commit('framework', framework);
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
                var saveFramework = framework;
                if (this.queryParams.private === "true") {
                    saveFramework = EcEncryptedValue.toEncryptedValue(framework);
                }
                this.repo.saveTo(saveFramework, function() {
                    me.$store.commit('framework', framework);
                    if (me.$route.name !== 'conceptScheme') {
                        me.$router.push({name: "conceptScheme"});
                    }
                }, console.error);
            }
        },
        addAlignments: function(targets, thing, relationType, allowSave) {
            if (this.queryParams.concepts === "true") {
                return this.addConceptAlignments(targets, thing, relationType);
            }
            if (relationType === "ceasn:skillEmbodied" || relationType === "ceasn:abilityEmbodied" || relationType === "ceasn:knowledgeEmbodied" || relationType === "ceasn:taskEmbodied") {
                // This property is attached to competency, not a relation attached to framework
                return this.addRelationAsCompetencyField(targets, thing, relationType, allowSave);
            }
            for (var i = 0; i < targets.length; i++) {
                var r = new EcAlignment();
                if (this.queryParams.newObjectEndpoint != null) {
                    r.generateShortId(this.newObjectEndpoint);
                } else {
                    r.generateId(this.repo.selectedServer);
                }
                r["schema:dateCreated"] = new Date().toISOString();
                r.target = EcRemoteLinkedData.trimVersionFromUrl(targets[i]);
                r.source = thing.shortId();
                if (r.target === r.source) {
                    return;
                }
                r.relationType = relationType;
                if (r.relationType === "broadens") {
                    var dosedo = r.target;
                    r.target = r.source;
                    r.source = dosedo;
                    r.relationType = "narrows";
                }
                if (EcIdentityManager.ids.length > 0) {
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                }
                if (this.$store.state.editor.private === true) {
                    r = EcEncryptedValue.toEncryptedValue(r);
                }
                this.repo.saveTo(r, function() {}, console.error);
                var framework = this.$store.state.editor.framework;
                if (thing.type === 'Concept') {
                    if (framework.relation == null) {
                        framework.relation = [];
                    }
                    let isNew = true;
                    let idx = 0;
                    while (isNew && idx < framework.relation.length) {
                        if (EcRemoteLinkedData.trimVersionFromUrl(framework.relation[idx]).equals(r.id)) {
                            isNew = false;
                        }
                        idx++;
                    }
                    if (isNew) {
                        framework.relation.push(r.id);
                    }
                } else {
                    framework.addRelation(r.id);
                }
            }
            this.$store.commit('framework', framework);
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, function() {}, console.error);
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
                    repo.saveTo(d, function(success) {
                        // Force view framework page to update the framework since changes were made
                        if (d.isAny(new EcFramework().getTypes()) || d.isAny(new EcConceptScheme().getTypes())) {
                            if (me.$route.name === 'frameworks') {
                                // To do: Refresh page
                            }
                        }
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
        }
    }
};
</script>