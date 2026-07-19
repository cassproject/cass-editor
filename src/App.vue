<template>
    <div
        id="app"
        :class="editorClass">
        <div
            v-if="bannerMessage"
            :style="bannerStyle"
            class="banner">
            <span>{{ bannerMessage }}</span>
        </div>
        <DynamicModal
            @create-directory="saveDirectory"
            @create-another-directory="saveDirectoryAndAddAnother" />
        <router-view
            @create-new-framework="createNewFramework"
            @create-new-concept-scheme="createNewConceptScheme"
            @create-new-progression-model="createNewProgressionModel"
            @create-new-collection="createNewCollection"
            :class="[{ 'clear-side-bar': routeHasSidebar && showSideNav}, { 'clear-narrow-side-bar': routeHasSidebar && !showSideNav}, {'clear-right-aside': showRightAside}]" />
        <router-view
            :showSideNav="showSideNav"
            @create-new-framework="createNewFramework"
            @create-new-concept-scheme="createNewConceptScheme"
            @create-new-progression-model="createNewProgressionModel"
            @create-new-collection="createNewCollection"
            name="sidebar" />
        <!-- NProgress handles its own DOM, no component needed -->
        <div
            v-if="bannerMessage"
            :style="bannerStyle"
            class="banner banner-bot">
            <span>{{ bannerMessage }}</span>
        </div>
    </div>
</template>

<script>
import {mapState} from 'pinia';
import common from '@/mixins/common.js';
import DynamicModal from './components/modals/DynamicModal.vue';
import {version} from '../package.json';
import {useAppStore} from '@/stores/app';
import {useEditorStore} from '@/stores/editor';
import {useLodeStore} from '@/stores/lode';
import {useUserStore} from '@/stores/user';
import {useEnvironmentStore} from '@/stores/environment';
import {useFeaturesEnabledStore} from '@/stores/featuresEnabled';

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
            linkedPerson: null,
            addAnotherDirectory: false,
            appVersion: version
        };
    },
    $router: function(to, from) {
        if (to.path !== from.path) {
            this.navBarActive = false;
        }
    },
    beforeUnmount: function() {
        window.removeEventListener('message', this.cappend);
        window.removeEventListener("message", this.messageListener);
    },
    methods: {
        initializeApp: function() {
            if (this.appVersion) {
                document.title = "CaSS Editor " + this.appVersion;
            }
            var server = window.origin + "/api/";
            if (window.location.origin === "https://cassproject.github.io") {
                server = "https://dev.cassproject.org/api/";
            } else if (window.location.origin === "http://localhost:8080" || window.location.origin === "http://localhost:8082") {
                server = "https://dev.cassproject.org/api/";
            } else if (import.meta.env.VITE_SELECTEDSERVER) {
                server = import.meta.env.VITE_SELECTEDSERVER;
            }
            var cassApiLocation = "https://dev.rest.api.cassproject.org/";
            useEnvironmentStore().setCassApiLocation(cassApiLocation);
            var me = this;
            if (this.$route.query) {
                let queryParams = JSON.parse(JSON.stringify(this.$route.query));
                for (let key in window.queryParams) {
                    queryParams[key] = window.queryParams[key];
                }
                useEditorStore().setQueryParams(queryParams);
                if (this.queryParams.server) {
                    if (this.queryParams.server.endsWith && this.queryParams.server.endsWith("/") === false) {
                        this.queryParams.server += "/";
                    }
                    server = this.queryParams.server;
                }
                if (this.queryParams.concepts === 'true') {
                    useEditorStore().setConceptMode(true);
                    useEditorStore().setProgressionMode(false);
                }
                if (this.queryParams.ceasnDataFields === 'true') {
                    var featuresStore = useFeaturesEnabledStore();
                    featuresStore.setConfigurationsEnabled(false);
                    featuresStore.setUserManagementEnabled(false);
                    featuresStore.setSearchByOwnerNameEnabled(false);
                    featuresStore.setLoginEnabled(false);
                    featuresStore.setPluginsEnabled(false);
                }
                if (this.queryParams.user === "wait") {
                    useFeaturesEnabledStore().setShareEnabled(false);
                    useFeaturesEnabledStore().setShareLink(true);
                }
                // Add support for show=mine. This param was already being used by CE, but was no longer functioning as expected.
                //  OwnedByMe offers the expected functionality. Including show=mine for compatibility with existing clients.
                if (this.queryParams.ownedByMe === "true" || this.queryParams.show === "mine") {
                    useFeaturesEnabledStore().setOwnedByMe(true);
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
                if (EcRepository.defaultPlugins && EcRepository.defaultPlugins.length > 0) {
                    let plugins = [];
                    for (let each in EcRepository.defaultPlugins) {
                        let url = EcRepository.defaultPlugins[each];
                        if (url.startsWith('/')) {
                            url = window.location.origin + url;
                        }
                        plugins.push({"id": each, "url": url});
                    }
                    useAppStore().setCuratedPlugins(plugins);
                }
            }, appError, async(loginInfo) => {
                r.fetchServerAdminKeys(() => {}, appError);
                this.appVersion = loginInfo.version || this.appVersion;
                useUserStore().setRepositorySsoOptions(loginInfo);
                if (loginInfo.ssoPublicKey != null && loginInfo.ssoLogin == null && loginInfo.ssoViaP1 == null) {
                    useFeaturesEnabledStore().setLoginEnabled(false);
                    useFeaturesEnabledStore().setUserManagementEnabled(false);
                }
                if (loginInfo.ssoLogin != null) {
                    useFeaturesEnabledStore().setApiLoginEnabled(true);
                }
                if (loginInfo.banner) {
                    useAppStore().setBanner(loginInfo.banner);
                }
                if (loginInfo.motd) {
                    useAppStore().setMotd(loginInfo.motd);
                    if (loginInfo.motd.message) {
                        useAppStore().openModal({component: 'MessageOfTheDay'});
                    }
                }
                if (loginInfo.corsOrigins) {
                    global.corsOrigins = loginInfo.corsOrigins;
                }
                if (window.EcIdentityManager.default.ids.length > 0) {
                    try {
                        let pers = await window.EcPerson.getByPk(r, window.EcIdentityManager.default.ids[0].ppk.toPk());
                        if (pers != null) {
                            window.EcIdentityManager.default.ids[0].displayName = pers.getName();
                        }
                    } catch (ex) {
                        window.EcIdentityManager.default.ids[0].displayName = "Unknown Person";
                    }
                }
                if (loginInfo.ssoAdditionalPublicKeys != null) {
                    for (let i = 0; i < loginInfo.ssoAdditionalPublicKeys.length; i++) {
                        let ppk = window.EcPpkFacade.fromPem(loginInfo.ssoAdditionalPublicKeys[i]);
                        let ident = new window.EcIdentity();
                        try {
                            let per = await window.EcPerson.getByPk(r, ppk.toPk());
                            if (per != null) {
                                ident.displayName = per.getName();
                            }
                        } catch (ex) {
                            ident.displayName = "Unknown Person";
                        }
                        ident.ppk = ppk;
                        window.EcIdentityManager.default.addIdentity(ident);
                    }
                }
                useAppStore().refreshDirectories();
            });
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
                        if (useEditorStore().conceptMode === true) {
                            EcConceptScheme.get(me.queryParams.frameworkId, function(success) {
                                var editorStore = useEditorStore();
                                var appStore = useAppStore();
                                editorStore.setFramework(success);
                                editorStore.clearFrameworkCommentData();
                                appStore.setCanViewComments(me.canViewCommentsCurrentFramework());
                                appStore.setCanAddComments(me.canAddCommentsCurrentFramework());
                                if (success.subType === 'Progression') {
                                    editorStore.setConceptMode(false);
                                    editorStore.setProgressionMode(true);
                                    me.$router.push({name: "progressionModel", params: {frameworkId: me.queryParams.frameworkId}});
                                } else {
                                    editorStore.setConceptMode(true);
                                    editorStore.setProgressionMode(false);
                                    me.$router.push({name: "conceptScheme", params: {frameworkId: me.queryParams.frameworkId}});
                                }
                            }, appError);
                        } else {
                            EcFramework.get(me.queryParams.frameworkId, function(success) {
                                var editorStore = useEditorStore();
                                var appStore = useAppStore();
                                editorStore.setFramework(success);
                                editorStore.clearFrameworkCommentData();
                                appStore.setCanViewComments(me.canViewCommentsCurrentFramework());
                                appStore.setCanAddComments(me.canAddCommentsCurrentFramework());
                                me.$router.push({name: "framework", params: {frameworkId: me.queryParams.frameworkId}});
                            }, appError);
                        }
                    }
                    if (me.queryParams.directoryId) {
                        EcDirectory.get(me.queryParams.directoryId, function(success) {
                            useAppStore().selectDirectory(success);
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
                        if (me.queryParams.collections === "true") {
                            useEditorStore().setCollectionMode(true);
                            me.$router.push({name: "collections"});
                        } else if (useEditorStore().conceptMode === true) {
                            me.$router.push({name: "concepts"});
                        } else if (useEditorStore().progressionMode === true) {
                            me.$router.push({name: "progressionLevels"});
                        } else if (me.$route.name !== 'frameworks' && me.$route.name !== 'concepts' && me.$route.name !== 'progressionLevels') {
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
            // Preload schema so large frameworks are faster — fetch all in parallel
            let types = [
                "https://schema.cassproject.org/0.4", "https://schema.cassproject.org/0.4/Directory", "https://schema.cassproject.org/0.4/", "https://schema.cassproject.org/0.4/Directory/", "https://schema.cassproject.org/0.4/skos/ConceptScheme/", "https://schema.cassproject.org/0.4/skos/", "https://schema.cassproject.org/0.4/Framework/",
                "https://schema.cassproject.org/0.4/skos/ConceptScheme", "https://schema.cassproject.org/0.4/skos/Concept", "https://schema.cassproject.org/0.4/skos", "https://schema.cassproject.org/0.4/Framework", "https://schema.cassproject.org/0.4/Competency", "https://schema.cassproject.org/0.4/skos/Concept/", "https://schema.cassproject.org/0.4/Competency/"
            ];
            const lodeStore = useLodeStore();
            const schemaPromises = types
                .filter(type => lodeStore.schemata[type] === undefined && type.indexOf("EncryptedValue") === -1)
                .map(type => {
                    let index = type.indexOf('schema.cassproject.org');
                    let url = type;
                    if (index !== -1) {
                        url = url.substring(index);
                        url = window.location.origin + window.location.pathname + url + "/index.json-ld";
                    }
                    return fetch(url, {headers: {"Accept": "application/json"}})
                        .then(resp => resp.ok ? resp.json() : null)
                        .then(async(context) => {
                            if (!context) return;
                            lodeStore.setRawSchemata({id: type, obj: context});
                            try {
                                let expanded = await jsonld.expand(context);
                                lodeStore.processSchemata({id: type, obj: expanded});
                            } catch (err) {
                                appError(err);
                            }
                        })
                        .catch(() => {});
                });
            Promise.all(schemaPromises);
            EcRemote.getExpectingString(window.repo.selectedServer, "badge/pk", (badgePk) => {
                useEditorStore().setBadgePk(EcPk.fromPem(badgePk));
            }, appError);
            setTimeout(() => {
                // If crypto workers haven't loaded forgeAsync.js at repo init, need to try again to load the identity.
                if (this.linkedPerson == null && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
                    me.findLinkedPersonForIdentity();
                }
            }, 1000);
        },
        onSidebarEvent: function() {
            this.showSideNav = !this.showSideNav;
        },
        findLinkedPersonForIdentity: function() {
            appLog("Finding linked person for identity...");
            window.EcPerson.getByPk(window.repo, window.EcIdentityManager.default.ids[0].ppk.toPk(), this.findLinkedPersonPersonSearchSuccess, this.findLinkedPersonPersonSearchFailure);
        },
        findLinkedPersonPersonSearchSuccess(ecRemoteLda) {
            if (!EcArray.isArray(ecRemoteLda)) {
                ecRemoteLda = [ecRemoteLda];
            }
            appLog("Linked person person search success: ");
            appLog(ecRemoteLda);
            let matchingPersonRecordFound = false;
            for (let ecrld of ecRemoteLda) {
                let ep = new EcPerson();
                ep.copyFrom(ecrld);
                if (ep.getGuid().equals(EcIdentityManager.default.ids[0].ppk.toPk().fingerprint())) {
                    matchingPersonRecordFound = true;
                    useUserStore().setLoggedOnPerson(ep);
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
                if (this.$route.name === 'frameworks' || this.$route.name === 'concepts' || this.$route.name === 'progressionLevels') {
                    useAppStore().refreshDirectories();
                    useAppStore().setRefreshSearch(true);
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
                useAppStore().closeModal();
                useAppStore().refreshDirectories();
                if (me.addAnotherDirectory) {
                    me.addAnotherDirectory = false;
                    me.$nextTick(() => {
                        useAppStore().openModal({component: 'AddDirectory'});
                    });
                } else {
                    me.selectDirectory(dir);
                }
            }, appError, window.repo);
        },
        saveDirectoryAndAddAnother: function(e) {
            this.addAnotherDirectory = true;
            this.saveDirectory(e);
        },
        selectDirectory: function(directory) {
            useAppStore().selectDirectory(directory);
            useAppStore().setRightAsideObject(directory);
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
                this.$router.push({name: "framework", params: {frameworkId: useEditorStore().framework.id}});
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
                useEditorStore().webSocketBackoffIncrease();
                setTimeout(function() {
                    me.openWebSocket(r);
                }, useEditorStore().webSocketBackoff);
            };

            connection.changedObject = async function(wut) {
                useEditorStore().setChangedObject(wut.shortId());
                // Add new assertions as they come in
                if (wut.type === 'Assertion') {
                    let a = await EcAssertion.get(wut.shortId());
                    a.assertionDateDecrypted = await a.getAssertionDate();
                    useEditorStore().addAssertion(a);
                }
                if (me.$route.name !== 'framework' && me.$route.name !== 'conceptScheme' && me.$route.name !== 'progressionModel') {
                    return;
                }

                var framework = useEditorStore().framework;

                if (new ConceptScheme().isA(wut.getFullType()) || wut["encryptedType"] === "ConceptScheme") {
                    if (framework != null) {
                        if (framework.shortId() === wut.shortId()) {
                            var f = new ConceptScheme();
                            if (wut["encryptedType"] === "ConceptScheme") {
                                f.copyFrom(await EcEncryptedValue.fromEncryptedValue(wut));
                            } else {
                                f.copyFrom(wut);
                            }
                            useEditorStore().setFramework(f);
                            me.setDefaultLanguage();
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
                            useEditorStore().setFramework(f);
                            me.setDefaultLanguage();
                            me.spitEvent("frameworkChanged", f.shortId());
                        }
                    }
                }

                if (new Concept().isA(wut.getFullType()) || wut["encryptedType"] === "Concept") {
                    if (framework != null) {
                        if (useEditorStore().selectedCompetency != null) {
                            if (useEditorStore().selectedCompetency.shortId() === wut.shortId()) {
                                var com = new EcConcept();
                                if (wut["encryptedType"] === "Concept") {
                                    com.copyFrom(await EcEncryptedValue.fromEncryptedValue(wut));
                                } else {
                                    com.copyFrom(wut);
                                }
                                useEditorStore().setSelectedCompetency(com);
                            }
                            me.spitEvent("competencyChanged", useEditorStore().selectedCompetency.shortId());
                        }
                    }
                }
                if (new EcCompetency().isA(wut.getFullType()) || wut["encryptedType"] === "Competency") {
                    if (framework != null) {
                        if (useEditorStore().selectedCompetency != null) {
                            if (useEditorStore().selectedCompetency.shortId() === wut.shortId()) {
                                var com = new EcCompetency();
                                if (wut["encryptedType"] === "Competency") {
                                    com.copyFrom(await EcEncryptedValue.fromEncryptedValue(wut));
                                } else {
                                    com.copyFrom(wut);
                                }
                                useEditorStore().setSelectedCompetency(com);
                            }
                            me.spitEvent("competencyChanged", useEditorStore().selectedCompetency.shortId());
                        }
                    }
                }

                if (new EcLevel().isA(wut.getFullType()) || wut["encryptedType"] === "Level") {
                    if (framework != null) {
                        if (useEditorStore().selectedCompetency != null) {
                            if (useEditorStore().selectedCompetency.shortId() === wut.shortId()) {
                                var com = new EcLevel();
                                if (wut["encryptedType"] === "Level") {
                                    com.copyFrom(await EcEncryptedValue.fromEncryptedValue(wut));
                                } else {
                                    com.copyFrom(wut);
                                }
                                useEditorStore().setSelectedCompetency(com);
                            }
                            me.spitEvent("competencyChanged", useEditorStore().selectedCompetency.shortId());
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
                        delete EcRepository.cache[EcRemoteLinkedData.veryShortId(repo.selectedServer, EcCrypto.md5(resp[i]))];
                    }
                    if (useEditorStore().framework == null) return;
                    me.repo.precache(resp, function() {
                        for (var i = 0; i < resp.length; i++) {
                            EcRepository.get(resp[i], connection.changedObject, appError);
                        }
                    });
                } else {
                    delete EcRepository.cache[resp];
                    delete EcRepository.cache[EcRemoteLinkedData.trimVersionFromUrl(resp)];
                    delete EcRepository.cache[EcRemoteLinkedData.veryShortId(repo.selectedServer, EcCrypto.md5(resp))];
                    EcRepository.get(resp, connection.changedObject, appError);
                }
            };
        },
        createNewFramework: async function(optionalDirectory) {
            let me = this;
            useEditorStore().setT3Profile(false);
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
            framework.name = {"@language": useEditorStore().defaultLanguage, "@value": "New Framework"};
            useEditorStore().setNewFramework(framework.shortId());
            if (this.queryParams.ceasnDataFields === "true") {
                framework["schema:inLanguage"] = [useEditorStore().defaultLanguage];
            }
            var saveFramework = framework;
            if (this.queryParams.private === "true") {
                saveFramework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(saveFramework, function() {
                useEditorStore().setFramework(framework);
                if (me.$route.name !== 'framework') {
                    me.$router.push({name: "framework", params: {frameworkId: framework.shortId()}});
                }
            }, appError);
        },
        createNewCollection: async function() {
            let me = this;
            useEditorStore().setT3Profile(false);
            this.setDefaultLanguage();
            var framework = new EcFramework();
            if (this.queryParams.newObjectEndpoint != null) {
                framework.generateShortId(this.queryParams.newObjectEndpoint);
            } else {
                framework.generateId(this.repo.selectedServer);
            }
            framework["schema:dateCreated"] = new Date().toISOString();
            framework["schema:dateModified"] = new Date().toISOString();
            if (EcIdentityManager.default.ids.length > 0) {
                framework.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            framework.name = {"@language": useEditorStore().defaultLanguage, "@value": "New Collection"};
            useEditorStore().setNewFramework(framework.shortId());
            if (this.queryParams.ceasnDataFields === "true") {
                framework["schema:inLanguage"] = [useEditorStore().defaultLanguage];
            }
            framework.subType = "Collection";
            var saveFramework = framework;
            if (this.queryParams.private === "true") {
                saveFramework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(saveFramework, function() {
                useEditorStore().setFramework(framework);
                if (me.$route.name !== 'framework') {
                    me.$router.push({name: "framework", params: {frameworkId: framework.shortId()}});
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
            framework["dcterms:title"] = {"@language": useEditorStore().defaultLanguage, "@value": name};
            if (this.queryParams.ceasnDataFields === "true") {
                framework["dcterms:language"] = [useEditorStore().defaultLanguage];
            }
            framework["schema:dateCreated"] = new Date().toISOString();
            framework["schema:dateModified"] = new Date().toISOString();
            useEditorStore().setNewFramework(framework.shortId());
            var saveFramework = framework;
            if (this.queryParams.private === "true") {
                saveFramework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(saveFramework, function() {
                useEditorStore().setFramework(framework);
                if (me.$route.name !== 'conceptScheme') {
                    me.$router.push({name: "conceptScheme", params: {frameworkId: framework.shortId()}});
                }
            }, appError);
        },
        createNewProgressionModel: async function() {
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
            let name = "New Progression Model";
            framework["dcterms:title"] = {"@language": useEditorStore().defaultLanguage, "@value": name};
            if (this.queryParams.ceasnDataFields === "true") {
                framework["schema:inLanguage"] = [useEditorStore().defaultLanguage];
            }
            framework["schema:dateCreated"] = new Date().toISOString();
            framework["schema:dateModified"] = new Date().toISOString();
            useEditorStore().setNewFramework(framework.shortId());
            var saveFramework = framework;
            if (this.queryParams.private === "true") {
                saveFramework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            framework.subType = "Progression";
            this.repo.saveTo(saveFramework, function() {
                useEditorStore().setFramework(framework);
                if (me.$route.name !== 'progressionModel') {
                    me.$router.push({name: "progressionModel", params: {frameworkId: framework.shortId()}});
                }
            }, appError);
        },
        createNew: function() {
            this.setDefaultLanguage();
            var me = this;
            if (useEditorStore().conceptMode === true) {
                this.createNewConceptScheme();
            } else if (useEditorStore().progressionMode === true) {
                this.createNewProgressionModel();
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
            } else if (this.queryParams.user === "wait" && this.inIframe()) {
                var me = this;
                var fun = function(evt) {
                    var data = evt.data;
                    if (data != null && data !== "" && !EcObject.isObject(data)) {
                        data = JSON.parse(data);
                    }
                    if (data.action === "identity") {
                        identity = new EcIdentity();
                        identity.ppk = EcPpk.fromPem(data.identity);
                        identity.displayName = data.name ? data.name : "You";
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
                    if (useEditorStore().private === true && EcEncryptedValue.encryptOnSaveMap[d.id] !== true) {
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
                    var framework = useEditorStore().framework;
                    if (useEditorStore().selectedCompetency != null) {
                        var selectedCompetency = useEditorStore().selectedCompetency;
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
                                format: "rdf+xml",
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
            var editorStore = useEditorStore();
            var resource = editorStore.framework;
            if (editorStore.selectedCompetency != null) {
                resource = editorStore.selectedCompetency;
            }
            for (var i = 0; i < results.length; i++) {
                var thing = await EcRepository.get(results[i]);
                if (thing.isAny(new EcConcept().getTypes())) {
                    if (!EcArray.isArray(resource[editorStore.selectCompetencyRelation])) {
                        resource[editorStore.selectCompetencyRelation] = [];
                    }
                    EcArray.setAdd(resource[editorStore.selectCompetencyRelation], thing.shortId());
                }
            }
            resource["schema:dateModified"] = new Date().toISOString();
            if (editorStore.private === true && EcEncryptedValue.encryptOnSaveMap[resource.id] !== true) {
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
            var framework = useEditorStore().framework;
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
                    if (useEditorStore().private === true && EcEncryptedValue.encryptOnSaveMap[c.id] !== true) {
                        c = await EcEncryptedValue.toEncryptedValue(c);
                    }
                    this.itemsSaving++;
                    (function(c) {
                        Task.asyncImmediate(function(callback) {
                            me.repo.saveTo(c, function() {
                                framework.addCompetency(c.id);
                                useEditorStore().setFramework(framework);
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
                    level.competency = useEditorStore().selectedCompetency.shortId();
                    delete level.owner;
                    level['ceasn:derivedFrom'] = thing.id;
                    copyDict[level['ceasn:derivedFrom']] = level;
                    if (useEditorStore().private === true && EcEncryptedValue.encryptOnSaveMap[level.id] !== true) {
                        level = await EcEncryptedValue.toEncryptedValue(level);
                    }
                    this.itemsSaving++;
                    (function(level) {
                        Task.asyncImmediate(function(callback) {
                            me.repo.saveTo(level, function() {
                                framework.addLevel(level.id);
                                useEditorStore().setFramework(framework);
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
                            if (useEditorStore().private === true) {
                                r = await EcEncryptedValue.toEncryptedValue(r);
                            }
                            this.itemsSaving++;
                            (function(r) {
                                Task.asyncImmediate(function(callback) {
                                    me.repo.saveTo(r, function() {
                                        framework.addRelation(r.id);
                                        useEditorStore().setFramework(framework);
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
            var selectedCompetency = useEditorStore().selectedCompetency;
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
                            if (useEditorStore().private === true) {
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
                var framework = useEditorStore().framework;
                if (useEditorStore().private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                    framework = await EcEncryptedValue.toEncryptedValue(framework);
                }
                this.repo.saveTo(framework, function() {}, appError);
            }
        },
        appendCompetencies: async function(results, newLink) {
            var selectedCompetency = useEditorStore().selectedCompetency;
            var framework = useEditorStore().framework;
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
                            if (useEditorStore().private === true) {
                                r = await EcEncryptedValue.toEncryptedValue(r);
                            }
                            this.repo.saveTo(r, function() {}, appError);
                        }
                    }
                }
            }
            if (useEditorStore().private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                framework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, async function() {
                useEditorStore().setFramework(await EcFramework.get(framework.id));
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
        },
        inIframe: function() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        }
    },
    computed: {
        // Only routes that define a named "sidebar" view should clear space
        // for the sidebar; standalone routes (login, createAccount, …) must
        // not be offset.
        routeHasSidebar: function() {
            const matched = this.$route.matched[0];
            return !!(matched && matched.components && matched.components.sidebar);
        },
        bannerMessage: function() {
            return useAppStore().bannerMessage;
        },
        bannerStyle: function() {
            return {
                'color': useAppStore().bannerColor,
                'background-color': useAppStore().bannerBackground
            };
        },
        editorClass: function() {
            return {
                'ceasn-editor': this.queryParams.ceasnDataFields === 'true',
                'has-banner': useAppStore().bannerMessage
            };
        },
        showRightAside: function() {
            return useAppStore().showRightAside;
        },
        showSideNav: function() {
            return useAppStore().showSideNav;
        },
        currentRoute: function() {
            return this.$route.path;
        },
        isLoggedIn: function() {
            if (!this.loggedInPerson || this.loggedInPerson && !this.loggedInPerson.name) {
                return false;
            } else {
                return true;
            }
        },
        currentPathIsLogin: function() {
            if (this.$route.name === 'login') return true;
            else return false;
        },
        ...mapState(useUserStore, {loggedInPerson: 'loggedOnPerson'}),
        ...mapState(useEditorStore, ['queryParams'])
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
            useAppStore().closeRightAside();
            // useAppStore().closeSideNav();
            useAppStore().closeModal();
            let navigationTo = to;
            if (navigationTo) {
                this.navBarActive = false;
            }
            // First load, can't access this.$route.query before this
            if (!from.name) {
                this.initializeApp();
            }
            if (to.name === 'concepts') {
                useEditorStore().setConceptMode(true);
                useEditorStore().setProgressionMode(false);
            }
            if (to.name === 'progressionLevels') {
                useEditorStore().setProgressionMode(true);
                useEditorStore().setConceptMode(false);
            }
            if (to.name === 'frameworks') {
                useEditorStore().setConceptMode(false);
                useEditorStore().setProgressionMode(false);
            }
        },
        loggedInPerson: function() {
            // Also fires on logout, after identities have been cleared — guard
            // ids[0] or the watcher throws and aborts the UI update.
            const ids = EcIdentityManager.default.ids;
            if (ids && ids.length > 0) {
                useEditorStore().setMe(ids[0].ppk.toPk().toPem());
                useEditorStore().setSubject(ids[0].ppk.toPk().toPem());
            } else {
                useEditorStore().setMe(null);
                useEditorStore().setSubject(null);
            }
            useEditorStore().setManageAssertions(false); // Turn off managing assertions when logging in / switching users
        }
    }
};
</script>


<style lang="scss">
 @import './scss/variables.scss';
 .banner {
    height: 15px;
    color: $light-color;
    display: flex;
    background-color: $primary-color;
    justify-content: center;
    align-items: center;
    width: 100%;
 }
 .banner-bot {
     position: fixed;
     bottom: 0;
 }
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
        width: 250px;
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