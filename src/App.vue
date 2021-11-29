<template>
    <div
        id="app"
        :class="editorClass">
        <DynamicModal
            @create-directory="saveDirectory" />
        <router-view
            @create-new-framework="createNewFramework"
            @create-new-concept-scheme="createNewConceptScheme"
            :class="[{ 'clear-side-bar': showSideNav}, { 'clear-narrow-side-bar': !showSideNav}, {'clear-right-aside': showRightAside}]" />
        <router-view
            :showSideNav="showSideNav"
            @create-new-framework="createNewFramework"
            @create-new-concept-scheme="createNewConceptScheme"
            name="sidebar" />
        <vue-progress-bar />
    </div>
</template>

<script>
import {mapState} from 'vuex';
import common from '@/mixins/common.js';
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
            repo: window.repo,
            itemsSaving: 0,
            showNav: true,
            GROUP_SEARCH_SIZE: 10000,
            linkedPerson: null
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
    methods: {
        initializeApp: function() {
            var server = window.origin + "/api/";
            if (window.location.origin === "https://cassproject.github.io") {
                server = "https://dev.cassproject.org/api/";
            } else if (process.env.VUE_APP_SELECTEDSERVER) {
                server = process.env.VUE_APP_SELECTEDSERVER;
            }
            var cassApiLocation = "https://dev.rest.api.cassproject.org/";
            this.$store.commit('environment/cassApiLocation', cassApiLocation);
            var me = this;
            if (this.$route.query) {
                let queryParams = JSON.parse(JSON.stringify(this.$route.query));
                for (let key in window.queryParams) {
                    queryParams[key] = window.queryParams[key];
                }
                this.$store.commit('editor/queryParams', queryParams);
                if (this.queryParams.server) {
                    if (this.queryParams.server.endsWith && this.queryParams.server.endsWith("/") === false) {
                        this.queryParams.server += "/";
                    }
                    server = this.queryParams.server;
                }
                if (this.queryParams.concepts === 'true') {
                    this.$store.commit('editor/conceptMode', true);
                }
                if (this.queryParams.ceasnDataFields === 'true') {
                    this.$store.commit('featuresEnabled/configurationsEnabled', false);
                    this.$store.commit('featuresEnabled/userManagementEnabled', false);
                    this.$store.commit('featuresEnabled/searchByOwnerNameEnabled', false);
                    this.$store.commit('featuresEnabled/loginEnabled', false);
                    this.$store.commit('featuresEnabled/pluginsEnabled', false);
                }
                if (this.queryParams.user === "wait") {
                    this.$store.commit('featuresEnabled/shareEnabled', false);
                }
            }
            var r = new EcRepository();
            r.selectedServer = server;
            r.init(server, function() {
                appLog("Repository initialized");
                if (EcIdentityManager.default.ids.length === 0) {
                    EcIdentityManager.default.readContacts();
                    EcIdentityManager.default.readIdentities();
                }
                if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
                    me.findLinkedPersonForIdentity();
                }
            }, appError, (loginInfo) => {
                this.$store.commit('user/repositorySsoOptions', loginInfo);
                if (loginInfo.ssoLogin != null) {
                    this.$store.commit('featuresEnabled/apiLoginEnabled', true);
                }
            });
            r.autoDetectRepositoryAsync(appLog, appError);
            window.repo = r;
            this.repo = r;

            try {
                window.addEventListener('message', this.cappend, false);
            } catch (e) {
                appError(e);
            }

            this.openWebSocket(r);
            if (window.addEventListener) {
                window.addEventListener("message", this.messageListener, false);
            } else {
                window.attachEvent("onmessage", this.messageListener);
            }
            this.loadIdentity(function() {
                if (me.queryParams) {
                    if (me.queryParams.frameworkId) {
                        if (me.$store.getters['editor/conceptMode'] === true) {
                            EcConceptScheme.get(me.queryParams.frameworkId, function(success) {
                                me.$store.commit('editor/framework', success);
                                me.$store.commit('editor/clearFrameworkCommentData');
                                me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                                me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                                me.$router.push({name: "conceptScheme", params: {frameworkId: me.queryParams.frameworkId}});
                            }, appError);
                        } else {
                            EcFramework.get(me.queryParams.frameworkId, function(success) {
                                me.$store.commit('editor/framework', success);
                                me.$store.commit('editor/clearFrameworkCommentData');
                                me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                                me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                                me.$router.push({name: "framework", params: {frameworkId: me.queryParams.frameworkId}});
                            }, appError);
                        }
                    }
                    if (me.queryParams.directoryId) {
                        EcDirectory.get(me.queryParams.directoryId, function(success) {
                            me.$store.commit('app/selectDirectory', success);
                            me.$router.push({name: "directory"});
                        }, appError);
                    }
                    if (me.queryParams.action === "import") {
                        me.$router.push({name: "import"});
                    }
                    if (me.queryParams.action === "add") {
                        me.createNew();
                    }
                    if ((me.queryParams.ceasnDataFields === "true" || me.queryParams.frameworksPage === "true") && (!me.queryParams.action && !me.queryParams.frameworkId)) {
                        if (me.$store.getters['editor/conceptMode'] === true) {
                            me.$router.push({name: "concepts"});
                        } else if (me.$route.name !== 'frameworks' && me.$route.name !== 'concepts') {
                            me.$router.push({name: "frameworks"});
                        }
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
            // Preload schema so large frameworks are faster
            let types = [
                "https://schema.cassproject.org/0.4", "https://schema.cassproject.org/0.4/Directory", "https://schema.cassproject.org/0.4/", "https://schema.cassproject.org/0.4/Directory/", "https://schema.cassproject.org/0.4/skos/ConceptScheme/", "https://schema.cassproject.org/0.4/skos/", "https://schema.cassproject.org/0.4/Framework/",
                "https://schema.cassproject.org/0.4/skos/ConceptScheme", "https://schema.cassproject.org/0.4/skos/Concept", "https://schema.cassproject.org/0.4/skos", "https://schema.cassproject.org/0.4/Framework", "https://schema.cassproject.org/0.4/Competency", "https://schema.cassproject.org/0.4/skos/Concept/", "https://schema.cassproject.org/0.4/Competency/"
            ];
            for (let type of types) {
                if (this.$store.state.lode.schemata[type] === undefined && type.indexOf("EncryptedValue") === -1) {
                    EcRemote.getExpectingObject("", type, function(context) {
                        me.$store.commit('lode/rawSchemata', {id: type, obj: context});
                        jsonld.expand(context, function(err, expanded) {
                            if (err == null) {
                                me.$store.dispatch('lode/schemata', {id: type, obj: expanded});
                            }
                        });
                    }, function() {});
                }
            }
            EcRemote.getExpectingString(window.repo.selectedServer, "badge/pk", (badgePk) => {
                this.$store.commit('editor/setBadgePk', EcPk.fromPem(badgePk));
            }, console.error);
        },
        onSidebarEvent: function() {
            this.showSideNav = !this.showSideNav;
        },
        findLinkedPersonForIdentity: function() {
            appLog("Finding linked person for identity...");
            let identFingerprint = EcIdentityManager.default.ids[0].ppk.toPk().fingerprint();
            let paramObj = {};
            paramObj.size = 10000;
            window.repo.searchWithParams("@type:Person AND @id:\"" + identFingerprint + "\"", paramObj, null,
                this.findLinkedPersonPersonSearchSuccess, this.findLinkedPersonPersonSearchFailure);
        },
        findLinkedPersonPersonSearchSuccess(ecRemoteLda) {
            appLog("Linked person person search success: ");
            appLog(ecRemoteLda);
            let matchingPersonRecordFound = false;
            for (let ecrld of ecRemoteLda) {
                let ep = new EcPerson();
                ep.copyFrom(ecrld);
                if (ep.getGuid().equals(EcIdentityManager.default.ids[0].ppk.toPk().fingerprint())) {
                    matchingPersonRecordFound = true;
                    this.$store.commit('user/loggedOnPerson', ep);
                    this.linkedPerson = ep;
                    appLog('Matching person record found: ');
                    appLog(ep);
                }
            }
            if (matchingPersonRecordFound) this.addGroupIdentities();
        },
        findLinkedPersonPersonSearchFailure(msg) {
            appLog('Linked person person search failure: ' + msg);
        },
        searchRepositoryForGroupsSuccess: function(ecoa) {
            let linkedPersonShortId = this.linkedPerson.shortId();
            if (ecoa && ecoa.length > 0) {
                for (let eco of ecoa) {
                    if (eco.employee && eco.employee.length > 0) {
                        for (let e of eco.employee) {
                            if (e.equals(linkedPersonShortId)) {
                                this.addGroupIdentity(eco);
                                break;
                            }
                        }
                    }
                }
                if (this.$route.name === 'frameworks' || this.$route.name === 'concepts') {
                    this.$store.dispatch('app/refreshDirectories');
                    this.$store.commit('app/refreshSearch', true);
                }
            }
        },
        searchRepositoryForGroupsFailure: function(msg) {
            appLog("Group search failure: " + msg);
        },
        addGroupIdentities: function() {
            appLog("Finding assigned groups...");
            let paramObj = {};
            paramObj.size = this.GROUP_SEARCH_SIZE;
            EcOrganization.search(window.repo, '', this.searchRepositoryForGroupsSuccess, this.searchRepositoryForGroupsFailure, paramObj);
        },
        addGroupIdentity: async function(group) {
            try {
                // add all available group keys to identity manager
                let groupPpkSet = await group.getOrgKeys();
                appLog("Adding group identities: " + "(" + group.shortId() + ") - " + group.getName() + " - (" + groupPpkSet.length + ") keys");
                for (let i = 0; i < groupPpkSet.length; i++) {
                    let gPpk = groupPpkSet[i];
                    let grpIdent = new EcIdentity();
                    grpIdent.displayName = group.getName() + " - key[" + i + "]";
                    grpIdent.ppk = gPpk;
                    EcIdentityManager.default.addIdentityQuietly(grpIdent);
                }
            } catch (e) {
                // TODO Problem with EcOrganization update and creating encrypted value when only a reader...
                // Anticipated workaround....login as group owner and save it.
                // console.error("TODO...fix this...needs FRITZ input!!!!: " + e.toString());
            }
        },
        saveDirectory: function(e) {
            let me = this;
            let dir = new EcDirectory();
            dir.name = e;
            // dir.description = "Test Description";
            dir.generateId(window.repo.selectedServer);
            if (EcIdentityManager.default.ids.length > 0) {
                dir.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            dir["schema:dateCreated"] = new Date().toISOString();
            dir["schema:dateModified"] = new Date().toISOString();
            // To do: Add other owners and readers
            dir.save(function(success) {
                appLog("Directory saved: " + dir.id);
                me.$store.commit('app/closeModal');
                me.$store.dispatch('app/refreshDirectories');
                me.selectDirectory(dir);
            }, appError, window.repo);
        },
        selectDirectory: function(directory) {
            this.$store.commit('app/selectDirectory', directory);
            this.$store.commit('app/rightAsideObject', directory);
            if (this.$router.currentRoute.name !== "directory") {
                this.$router.push({name: "directory"});
            }
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
                appLog("I got " + event.data.selected.length + " selected items from the iframe");
                appLog(event.data.selected);
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
                appLog("WebSocket open.");
            };

            connection.onerror = function(error) {
                appLog(error);
            };

            // Re-establish connection on close.
            connection.onclose = function(evt) {
                appLog(evt);
                me.$store.commit('editor/webSocketBackoffIncrease');
                setTimeout(function() {
                    me.openWebSocket(r);
                }, me.$store.state.editor.webSocketBackoff);
            };

            connection.changedObject = async function(wut) {
                me.$store.commit('editor/changedObject', wut.shortId());
                if (me.$route.name !== 'framework' && me.$route.name !== 'conceptScheme') {
                    return;
                }

                var framework = me.$store.state.editor.framework;

                if (new ConceptScheme().isA(wut.getFullType()) || wut["encryptedType"] === "ConceptScheme") {
                    if (framework != null) {
                        if (framework.shortId() === wut.shortId()) {
                            var f = new ConceptScheme();
                            if (wut["encryptedType"] === "ConceptScheme") {
                                f.copyFrom(await EcEncryptedValue.fromEncryptedValue(wut));
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
                                f.copyFrom(await EcEncryptedValue.fromEncryptedValue(wut));
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
                                    com.copyFrom(await EcEncryptedValue.fromEncryptedValue(wut));
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
                                    com.copyFrom(await EcEncryptedValue.fromEncryptedValue(wut));
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
                                    com.copyFrom(await EcEncryptedValue.fromEncryptedValue(wut));
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
                appLog('Server: ' + resp);
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
                            EcRepository.get(resp[i], connection.changedObject, appError);
                        }
                    });
                } else {
                    delete EcRepository.cache[resp];
                    delete EcRepository.cache[EcRemoteLinkedData.trimVersionFromUrl(resp)];
                    EcRepository.get(resp, connection.changedObject, appError);
                }
            };
        },
        createNewFramework: async function(optionalDirectory) {
            let me = this;
            this.$store.commit('editor/t3Profile', false);
            this.setDefaultLanguage();
            var framework = new EcFramework();
            if (this.queryParams.newObjectEndpoint != null) {
                framework.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                framework.generateId(this.repo.selectedServer);
            }
            framework["schema:dateCreated"] = new Date().toISOString();
            framework["schema:dateModified"] = new Date().toISOString();
            if (optionalDirectory) {
                framework.directory = optionalDirectory.shortId();
                if (optionalDirectory.owner) {
                    framework.owner = optionalDirectory.owner;
                }
                if (optionalDirectory.reader) {
                    framework.reader = optionalDirectory.reader;
                }
            }
            if (EcIdentityManager.default.ids.length > 0) {
                framework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            framework.name = {"@language": this.$store.state.editor.defaultLanguage, "@value": "New Framework"};
            this.$store.commit('editor/newFramework', framework.shortId());
            if (this.queryParams.ceasnDataFields === "true") {
                framework["schema:inLanguage"] = [this.$store.state.editor.defaultLanguage];
            }
            var saveFramework = framework;
            if (this.queryParams.private === "true") {
                saveFramework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(saveFramework, function() {
                me.$store.commit('editor/framework', framework);
                if (me.$route.name !== 'framework') {
                    me.$router.push({name: "framework"});
                }
            }, appError);
        },
        createNewConceptScheme: async function() {
            let me = this;
            this.setDefaultLanguage();
            var framework = new EcConceptScheme();
            if (this.queryParams.newObjectEndpoint != null) {
                framework.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                framework.generateId(this.repo.selectedServer);
            }
            if (EcIdentityManager.default.ids.length > 0) {
                framework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            let name = "New Taxonomy";
            if (this.queryParams.ceasnDataFields === 'true') {
                name = "New Concept Scheme";
            }
            framework["dcterms:title"] = {"@language": this.$store.state.editor.defaultLanguage, "@value": name};
            if (this.queryParams.ceasnDataFields === "true") {
                framework["dcterms:language"] = [this.$store.state.editor.defaultLanguage];
            }
            framework["schema:dateCreated"] = new Date().toISOString();
            framework["schema:dateModified"] = new Date().toISOString();
            this.$store.commit('editor/newFramework', framework.shortId());
            var saveFramework = framework;
            if (this.queryParams.private === "true") {
                saveFramework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(saveFramework, function() {
                me.$store.commit('editor/framework', framework);
                if (me.$route.name !== 'conceptScheme') {
                    me.$router.push({name: "conceptScheme"});
                }
            }, appError);
        },
        createNew: function() {
            this.setDefaultLanguage();
            var me = this;
            if (me.$store.getters['editor/conceptMode'] === true) {
                this.createNewConceptScheme();
            } else {
                this.createNewFramework();
            }
        },
        loadIdentity: function(callback) {
            var identity;
            if (this.queryParams.user === "self") {
                EcIdentityManager.default.readIdentities();
                EcIdentityManager.default.readContacts();
                if (EcIdentityManager.default.ids.length === 0) {
                    EcPpk.generateKeyAsync(
                        function(p1) {
                            identity = new EcIdentity();
                            identity.ppk = p1;
                            identity.displayName = "You";
                            EcIdentityManager.default.onIdentityChanged = EcIdentityManager.default.saveIdentities;
                            EcIdentityManager.default.addIdentity(identity);
                            callback();
                        }
                    );
                } else {
                    callback();
                }
            } else if (this.queryParams.user === "wait") {
                var me = this;
                var fun = function(evt) {
                    var data = evt.data;
                    if (data != null && data !== "" && !EcObject.isObject(data)) {
                        data = JSON.parse(data);
                    }
                    if (data.action === "identity") {
                        identity = new EcIdentity();
                        identity.ppk = EcPpk.fromPem(data.identity);
                        identity.displayName = "You";
                        EcIdentityManager.default.addIdentity(identity);
                        callback();
                        var message = {
                            action: "response",
                            message: "identityOk"
                        };
                        appLog(message);
                        parent.postMessage(message, me.queryParams.origin);
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
                appLog(message);
                parent.postMessage(message, this.queryParams.origin);
            } else {
                callback();
            }
        },
        messageListener: async function(evt) {
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
                    if (data.directory != null) {
                        EcDirectory.template = this.removeNewlines(data.directory);
                    }
                    var message = {
                        action: "response",
                        message: "templateOk"
                    };
                    appLog(message);
                    parent.postMessage(message, this.queryParams.origin);
                } else if (data.action === "set") {
                    if (data.id != null) {
                        var d = await EcRepository.get(data.id);
                    }
                    delete data.id;
                    delete data.action;
                    for (var key in data) {
                        d[key] = data[key];
                    }
                    d["schema:dateModified"] = new Date().toISOString();
                    if (me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[d.id] !== true) {
                        d = await EcEncryptedValue.toEncryptedValue(d);
                    }
                    repo.saveTo(d, function(success) {
                        var message = {
                            action: "response",
                            message: "setOk"
                        };
                        appLog(message);
                        parent.postMessage(message, me.queryParams.origin);
                    }, function(failure) {
                        var message = {
                            action: "response",
                            message: "setFail"
                        };
                        appLog(message);
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
                        if (EcRepository.shouldTryUrl(selectedCompetency.id) === false && selectedCompetency.id.indexOf(this.repo.selectedServer) === -1) {
                            link = this.repo.selectedServer + "data/" + EcCrypto.md5(selectedCompetency.shortId());
                            fid = this.repo.selectedServer + "data/" + EcCrypto.md5(framework.shortId());
                            guid = EcCrypto.md5(selectedCompetency.shortId());
                        } else {
                            link = selectedCompetency.id;
                            fid = framework.id;
                            guid = selectedCompetency.getGuid();
                        }
                    } else {
                        if (EcRepository.shouldTryUrl(framework.id) === false && framework.id.indexOf(this.repo.selectedServer) === -1) {
                            link = this.repo.selectedServer + "data/" + EcCrypto.md5(framework.shortId());
                            fid = this.repo.selectedServer + "data/" + EcCrypto.md5(framework.shortId());
                            guid = EcCrypto.md5(framework.shortId());
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
                            appLog(failure);
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
                            appLog(failure);
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
                            appLog(failure);
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
                            appLog(failure);
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
                                appLog(failure);
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
                                appLog(failure);
                            });
                        }
                    }
                }
            }
        },
        // Removes newlines from public key in owner and reader fields
        removeNewlines: function(entity) {
            if (entity["owner"] != null) {
                for (var i = 0; i < entity["owner"].length; i++) {
                    var owner = entity["owner"][i];
                    entity["owner"][i] = EcPk.fromPem(owner).toPem();
                }
            }
            if (entity["reader"] != null) {
                for (var i = 0; i < entity["reader"].length; i++) {
                    var owner = entity["reader"][i];
                    entity["reader"][i] = EcPk.fromPem(owner).toPem();
                }
            }
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
        attachUrlProperties: async function(results) {
            var resource = this.$store.state.editor.framework;
            if (this.$store.state.editor.selectedCompetency != null) {
                resource = this.$store.state.editor.selectedCompetency;
            }
            for (var i = 0; i < results.length; i++) {
                var thing = await EcRepository.get(results[i]);
                if (thing.isAny(new EcConcept().getTypes())) {
                    if (!EcArray.isArray(resource[this.$store.state.editor.selectCompetencyRelation])) {
                        resource[this.$store.state.editor.selectCompetencyRelation] = [];
                    }
                    EcArray.setAdd(resource[this.$store.state.editor.selectCompetencyRelation], thing.shortId());
                }
            }
            resource["schema:dateModified"] = new Date().toISOString();
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[resource.id] !== true) {
                resource = await EcEncryptedValue.toEncryptedValue(resource);
            }
            this.repo.saveTo(resource, function() {}, appError);
        },
        copyOrLink(choice, selectedIds) {
            if (choice === "Copy") {
                this.copyCompetencies(selectedIds);
            } else {
                this.appendCompetencies(selectedIds, true);
            }
        },
        copyCompetencies: async function(results) {
            var copyDict = {};
            var framework = this.$store.state.editor.framework;
            var me = this;
            for (var i = 0; i < results.length; i++) {
                var thing = await EcRepository.get(results[i]);
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
                    if (EcIdentityManager.default.ids.length > 0) {
                        c.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                    }
                    if (framework.owner && framework.owner.length > 0) {
                        for (var j = 0; j < framework.owner.length; j++) {
                            var owner = framework.owner[j];
                            c.addOwner(EcPk.fromPem(owner));
                        }
                    }
                    if (framework.reader && framework.reader.length > 0) {
                        for (var j = 0; j < framework.reader.length; j++) {
                            var reader = framework.reader[j];
                            c.addReader(EcPk.fromPem(reader));
                        }
                    }
                    c['ceasn:derivedFrom'] = thing.id;
                    copyDict[c['ceasn:derivedFrom']] = c;
                    if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[c.id] !== true) {
                        c = await EcEncryptedValue.toEncryptedValue(c);
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
                                appError(error);
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
                        level = await EcEncryptedValue.toEncryptedValue(level);
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
                                appError(error);
                                me.afterCopy();
                                callback();
                            });
                        });
                    })(level);
                }
            }
            for (var i = 0; i < results.length; i++) {
                var thing = await EcRepository.get(results[i]);
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
                        if (EcIdentityManager.default.ids.length > 0) {
                            r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                        }
                        if (framework.owner && framework.owner.length > 0) {
                            for (var j = 0; j < framework.owner.length; j++) {
                                var owner = framework.owner[j];
                                r.addOwner(EcPk.fromPem(owner));
                            }
                        }
                        if (framework.reader && framework.reader.length > 0) {
                            for (var j = 0; j < framework.reader.length; j++) {
                                var reader = framework.reader[j];
                                r.addReader(EcPk.fromPem(reader));
                            }
                        }
                        if (r.source !== r.target) {
                            framework["schema:dateModified"] = new Date().toISOString();
                            EcArray.setRemove(results, thing.source);
                            if (this.$store.state.editor.private === true) {
                                r = await EcEncryptedValue.toEncryptedValue(r);
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
                                        appError(error);
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
                var thing = await EcRepository.get(results[i]);
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
                        if (EcIdentityManager.default.ids.length > 0) {
                            r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                        }
                        if (framework.owner && framework.owner.length > 0) {
                            for (var j = 0; j < framework.owner.length; j++) {
                                var owner = framework.owner[j];
                                r.addOwner(EcPk.fromPem(owner));
                            }
                        }
                        if (framework.reader && framework.reader.length > 0) {
                            for (var j = 0; j < framework.reader.length; j++) {
                                var reader = framework.reader[j];
                                r.addReader(EcPk.fromPem(reader));
                            }
                        }
                        if (r.source !== r.target) {
                            this.itemsSaving++;
                            framework.addRelation(r.id);
                            framework["schema:dateModified"] = new Date().toISOString();
                            if (this.$store.state.editor.private === true) {
                                r = await EcEncryptedValue.toEncryptedValue(r);
                            }
                            (function(r) {
                                Task.asyncImmediate(function(callback) {
                                    me.repo.saveTo(r, function() {
                                        me.afterCopy();
                                        callback();
                                    },
                                    function(error) {
                                        appError(error);
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
        afterCopy: async function() {
            this.itemsSaving--;
            // loading(this.itemsSaving + " objects left to copy.");
            if (this.itemsSaving === 0) {
                var framework = this.$store.state.editor.framework;
                if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                    framework = await EcEncryptedValue.toEncryptedValue(framework);
                }
                this.repo.saveTo(framework, function() {}, appError);
            }
        },
        appendCompetencies: async function(results, newLink) {
            var selectedCompetency = this.$store.state.editor.selectedCompetency;
            var framework = this.$store.state.editor.framework;
            var me = this;
            for (var i = 0; i < results.length; i++) {
                var thing = await EcRepository.get(results[i]);
                if (thing.isAny(new EcCompetency().getTypes())) {
                    framework.addCompetency(thing.shortId());
                } else if (thing.isAny(new EcLevel().getTypes())) {
                    framework.addLevel(thing.shortId());
                    if (!EcArray.isArray(thing.competency)) {
                        thing.competency = [thing.competency];
                    }
                    thing.competency.push(selectedCompetency.shortId());
                    this.repo.saveTo(thing, function() {}, appError);
                }
            }
            for (var i = 0; i < results.length; i++) {
                var thing = await EcRepository.get(results[i]);
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
                var thing = await EcRepository.get(results[i]);
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
                        if (EcIdentityManager.default.ids.length > 0) {
                            r.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
                        }
                        if (framework.owner && framework.owner.length > 0) {
                            for (var j = 0; j < framework.owner.length; j++) {
                                var owner = framework.owner[j];
                                r.addOwner(EcPk.fromPem(owner));
                            }
                        }
                        if (framework.reader && framework.reader.length > 0) {
                            for (var j = 0; j < framework.reader.length; j++) {
                                var reader = framework.reader[j];
                                r.addReader(EcPk.fromPem(reader));
                            }
                        }

                        if (r.source !== r.target) {
                            framework.addRelation(r.id);
                            if (this.$store.state.editor.private === true) {
                                r = await EcEncryptedValue.toEncryptedValue(r);
                            }
                            this.repo.saveTo(r, function() {}, appError);
                        }
                    }
                }
            }
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                framework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, async function() {
                me.$store.commit('editor/framework', await EcFramework.get(framework.id));
            }, appError);
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
        editorClass: function() {
            if (this.queryParams.ceasnDataFields === 'true') {
                return 'ceasn-editor';
            } else {
                return '';
            }
        },
        showRightAside: function() {
            return this.$store.getters['app/showRightAside'];
        },
        showSideNav: function() {
            return this.$store.getters['app/showSideNav'];
        },
        currentRoute: function() {
            return this.$route.path;
        },
        isLoggedIn: function() {
            if (!this.loggedInPerson || (this.loggedInPerson && !this.loggedInPerson.name)) {
                return false;
            } else {
                return true;
            }
        },
        currentPathIsLogin: function() {
            if (this.$route.name === 'login') return true;
            else return false;
        },
        ...mapState({
            loggedInPerson: state => state.user.loggedOnPerson,
            queryParams: state => state.editor.queryParams
        })
    },
    mounted: function() {
    },
    watch: {
        currentRoute: function(val) {
            // appLog("logged in", this.loggedInPerson);
            if (!this.isLoggedIn && val === '/users') {
                this.$router.push({path: '/'});
            }
        },
        '$route'(to, from) {
            this.$store.commit('app/closeRightAside');
            this.$store.commit('app/closeSideNav');
            this.$store.commit('app/closeModal');
            let navigationTo = to;
            if (navigationTo) {
                this.navBarActive = false;
            }
            // First load, can't access this.$route.query before this
            if (!from.name) {
                this.initializeApp();
            }
            if (to.name === 'concepts') {
                this.$store.commit('editor/conceptMode', true);
            }
            if (to.name === 'frameworks') {
                this.$store.commit('editor/conceptMode', false);
            }
        },
        loggedInPerson: function() {
            this.$store.commit('editor/setMe', EcIdentityManager.default.ids[0].ppk.toPk().toPem());
            this.$store.commit('editor/setSubject', EcIdentityManager.default.ids[0].ppk.toPk().toPem());
        }
    }
};
</script>


<style lang="scss">
 @import './scss/variables.scss';
.pagesFull {
    margin-top:40px;
}
.pagesRightFull {
    width: calc(100% - 360px) !important;
    margin-left: 360px;
    margin-top:50px;
}

    #app {
        height: 100%;
    }
    #app-content {
        height: 100%;
    }
    .clear-narrow-side-bar:not(.legacyIframe) {
        margin-left: 4rem;
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
    .cass-modal {
        z-index:130;
    }

</style>