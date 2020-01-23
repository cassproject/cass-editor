<template>
    <div
        id="app"
        class="has-navbar-fixed-top">
        <!-- nav bar navigation -->
        <nav
            class="navbar is-black is-fixed-top"
            role="navigation"
            aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-start">
                    <div class="navbar-item">
                        <a @click="createNew">New</a>
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
                    <div
                        class="navbar-item has-dropdown is-hoverable"
                        v-if="$route.name=='framework'||$route.name=='conceptScheme'">
                        <a class="navbar-link">
                            Export
                        </a>

                        <div class="navbar-dropdown">
                            <a
                                class="navbar-item"
                                @click="exportType='asn'"
                                v-if="queryParams.concepts!=='true'">
                                Achievement Standards Network (RDF+JSON)
                            </a>
                            <a
                                class="navbar-item"
                                @click="exportType='jsonld'">
                                CaSS (JSON-LD)
                            </a>
                            <a
                                class="navbar-item"
                                @click="exportType='rdfQuads'">
                                CaSS (RDF Quads)
                            </a>
                            <a
                                class="navbar-item"
                                @click="exportType='rdfJson'">
                                CaSS (RDF+JSON)
                            </a>
                            <a
                                class="navbar-item"
                                @click="exportType='rdfXml'">
                                CaSS (RDF+XML)
                            </a>
                            <a
                                class="navbar-item"
                                @click="exportType='turtle'">
                                CaSS (Turtle)
                            </a>
                            <a
                                class="navbar-item"
                                @click="exportType='ctdlasnJsonld'">
                                Credential Engine ASN (JSON-LD)
                            </a>
                            <a
                                class="navbar-item"
                                @click="exportType='ctdlasnCsv'"
                                v-if="queryParams.concepts!=='true'">
                                Credential Engine ASN (CSV)
                            </a>
                            <a
                                class="navbar-item"
                                @click="exportType='csv'"
                                v-if="queryParams.concepts!=='true'">
                                Table (CSV)
                            </a>
                            <a
                                class="navbar-item"
                                @click="exportType='case'"
                                v-if="queryParams.concepts!=='true'">
                                IMS Global CASE (JSON)
                            </a>
                        </div>
                    </div>
                    <div
                        v-if="this.queryParams.x"
                        class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Experimental
                        </a>

                        <div class="navbar-dropdown">
                            <a
                                class="navbar-item"
                                @click="exportType='asn'">
                                <router-link to="/organizations">
                                    Organizations
                                </router-link>
                            </a>
                        </div>
                    </div>
                    <div class="navbar-item">
                        <router-link to="/help">
                            Help
                        </router-link>
                    </div>
                </div>
                <a
                    role="button"
                    class="navbar-burger burger"
                    :class="{ 'is-active': navBarActive}"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="artPagesDropDown"
                    @click="navBarActive = !navBarActive">
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>
            <!-- nav bar tablet and mobile drop down side navigation -->
            <div
                id="artPagesDropDown"
                class="navbar-menu is-spaced"
                :class="{ 'is-active': navBarActive}">
                <div class="navbar-end">
                    <div
                        class="navbar-item has-dropdown is-hidden-desktop"
                        :class="{ 'is-active': navBarActive}">
                        navbar-mobile
                    </div>
                </div>
            </div>
        </nav>
        <div class="custom-overflow">
            <div class="is-multiline is-desktop is-centered">
                <router-view
                    class="is-full pagesFull"
                    :exportType="exportType"
                    :queryParams="queryParams" />
            </div>
        </div>
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
.menu {
    min-height: calc(100vh - 50px);
    z-index: 1;
    width: 360px;
    position: fixed;
    top: 52px;
    a {
        cursor: pointer;
    }
    .menu-list a {
        display: inline-block;
        width: 100%;
    }
    .menu-item {
        padding: 1rem;
        margin-bottom:0;
    }
    .custom-overflow{
        overflow-y:scroll;
        height: calc(100vh - 52px);
    }
}
.navbar {
    max-width: 100vw;
    .navbar-item a{
      color:white;
    }
    .navbar-dropdown a{
      color:black;
    }
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
    created: function() {
        var servers = ["https://dev.cassproject.org/api/"];
        if (this.$route.query) {
            this.queryParams = this.$route.query;
            if (this.queryParams.server) {
                if (this.queryParams.server.endsWith && this.queryParams.server.endsWith("/") === false) {
                    this.queryParams.server += "/";
                }
                servers = [this.queryParams.server];
            }
            if (this.queryParams.frameworkId) {
                var me = this;
                if (this.queryParams.concepts === "true") {
                    EcConceptScheme.get(this.queryParams.frameworkId, function(success) {
                        me.$store.commit('framework', success);
                        me.$router.push({name: "conceptScheme", params: {frameworkId: me.queryParams.frameworkId}});
                    }, console.error);
                } else {
                    EcFramework.get(this.queryParams.frameworkId, function(success) {
                        me.$store.commit('framework', success);
                        me.$router.push({name: "framework", params: {frameworkId: me.queryParams.frameworkId}});
                    }, console.error);
                }
            }
            if (this.queryParams.action === "import") {
                this.$router.push({name: "import"});
            }
            if (this.queryParams.action === "add") {
                this.createNew();
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
                this.$store.commit('webSocketBackoffIncrease');
                setTimeout(function() {
                    me.openWebSocket(r);
                }, webSocketBackoff);
            };

            connection.changedObject = function(wut) {
                if (this.$route.name !== 'framework') {
                    return;
                }

                var framework = this.$store.state.editor.framework;

                if (new ConceptScheme().isA(wut.getFullType()) || wut["encryptedType"] === "ConceptScheme") {
                    if (framework != null) {
                        if (framework.shortId() === wut.shortId()) {
                            var f = new ConceptScheme();
                            if (wut["encryptedType"] === "ConceptScheme") {
                                f = this.decrypt(wut, f);
                            } else {
                                f.copyFrom(wut);
                            }
                            this.$store.commit('framework', f);
                            /*
                             * populateFramework();
                             * playSavedAnimation('frameworkNameContainer');
                             */
                            this.spitEvent("frameworkChanged", f.shortId());
                        }
                    }
                }

                if (new EcFramework().isA(wut.getFullType()) || wut["encryptedType"] === "Framework") {
                    if (framework != null) {
                        if (framework.shortId() === wut.shortId()) {
                            var f = new EcFramework();
                            if (wut["encryptedType"] === "Framework") {
                                f = this.decrypt(wut, f);
                            } else {
                                f.copyFrom(wut);
                            }
                            this.$store.commit('framework', f);
                            /*
                             * renderSidebar(true, true);
                             * playSavedAnimation('frameworkNameContainer');
                             * populateFramework();
                             */
                            this.spitEvent("frameworkChanged", f.shortId());
                        }
                    }
                }

                if (new Concept().isA(wut.getFullType()) || wut["encryptedType"] === "Concept") {
                    if (framework != null) {
                        if (this.$store.state.editor.selectedCompetency != null) {
                            if (this.$store.state.editor.selectedCompetency.shortId() === wut.shortId()) {
                                var com = new EcConcept();
                                if (wut["encryptedType"] === "Concept") {
                                    com = this.decrypt(wut, com);
                                } else {
                                    com.copyFrom(wut);
                                }
                                this.$store.commit('selectedCompetency', com);
                            }
                            this.spitEvent("competencyChanged", this.$store.state.editor.selectedCompetency.shortId());
                        }
                    }
                }
                if (new EcCompetency().isA(wut.getFullType()) || wut["encryptedType"] === "Competency") {
                    if (framework != null) {
                        if (this.$store.state.editor.selectedCompetency != null) {
                            if (this.$store.state.editor.selectedCompetency.shortId() === wut.shortId()) {
                                var com = new EcCompetency();
                                if (wut["encryptedType"] === "Competency") {
                                    com = this.decrypt(wut, com);
                                } else {
                                    com.copyFrom(wut);
                                }
                                this.$store.commit('selectedCompetency', com);
                            }
                            this.spitEvent("competencyChanged", this.$store.state.editor.selectedCompetency.shortId());
                        }
                    }
                }

                if (new EcLevel().isA(wut.getFullType()) || wut["encryptedType"] === "Level") {
                    if (framework != null) {
                        if (this.$store.state.editor.selectedCompetency != null) {
                            if (this.$store.state.editor.selectedCompetency.shortId() === wut.shortId()) {
                                var com = new EcLevel();
                                if (wut["encryptedType"] === "Level") {
                                    com = this.decrypt(wut, com);
                                } else {
                                    com.copyFrom(wut);
                                }
                                this.$store.commit('selectedCompetency', com);
                            }
                            this.spitEvent("competencyChanged", this.$store.state.editor.selectedCompetency.shortId());
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
                    if (framework == null) return;
                    this.repo.precache(resp, function() {
                        for (var i = 0; i < resp.length; i++) {
                            EcRepository.get(resp[i], connection.changedObject, error);
                        }
                    });
                } else {
                    delete EcRepository.cache[resp];
                    delete EcRepository.cache[EcRemoteLinkedData.trimVersionFromUrl(resp)];
                    if (this.$store.state.editor.framework == null) return;
                    EcRepository.get(resp, connection.changedObject, error);
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
                if (this.$store.state.editor.private === true) {
                    r = EcEncryptedValue.toEncryptedValue(r);
                }
                this.repo.saveTo(r, function() {}, console.error);
            }
            this.$store.commit('framework', framework);
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, function() {}, console.error);
        }
    }
};
</script>