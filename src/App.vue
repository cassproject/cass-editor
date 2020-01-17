<template>
    <div
        id="app"
        class="">
        <!-- nav bar navigation -->
        <nav
            class="navbar is-black is-fixed-top"
            role="navigation"
            aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <h2 class="has-text-white subtitle">
                        Cass Editor
                    </h2>
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
                        <router-link
                            class="button is-primary"
                            to="/new">
                            New
                        </router-link>
                    </div>
                    <div class="navbar-item">
                        <router-link
                            class="button is-primary"
                            to="/">
                            Open
                        </router-link>
                    </div>
                    <div class="navbar-item">
                        <router-link
                            class="button is-primary"
                            to="/import">
                            Import
                        </router-link>
                    </div>
                    <div
                        class="navbar-item has-dropdown is-hoverable"
                        v-if="$route.name=='framework'">
                        <a class="navbar-link button is-primary">
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
                    <div class="navbar-item">
                        <router-link
                            class="button is-primary"
                            to="/help">
                            Help
                        </router-link>
                    </div>
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
            queryParams: null
        };
    },
    mixins: [common],
    $router: function(to, from) {
        if (to.path !== from.path) {
            this.navBarActive = false;
        }
    },
    created: function() {
        console.error("here we are");
        if (this.$route.query) {
            this.queryParams = this.$route.query;
            if (this.queryParams.server) {
                if (this.queryParams.server.endsWith && this.queryParams.server.endsWith("/") === false) {
                    this.queryParams.server += "/";
                }
                window.repo.selectedServer = this.queryParams.server;
                window.repo.autoDetectRepository();
                try {
                    window.addEventListener('message', this.cappend, false);
                } catch (e) {
                    console.error(e);
                }
                this.openWebSocket(window.repo);
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
        }
    },
    methods: {
        cappend: function(event) {
            if (event.data.message === "selected") {
                var selectedIds = [];
                if (event.data.selectedFramework["ceasn:exactAlignment"]) {
                    selectedFrameworkId = event.data.selectedFramework["ceasn:exactAlignment"];
                }
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
                this.highlightCompetencies(event.data.competencies);
            } else if (event.data.message === "select") {
                if (this.$route.name === 'framework' && this.queryParams.select) {
                    this.select();
                }
            }
        },
        openWebSocket: function(r) {
            var connection;
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
                    openWebSocket(r);
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
                            spitEvent("frameworkChanged", f.shortId());
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
                            spitEvent("competencyChanged", this.$store.state.editor.selectedCompetency.shortId());
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
                            spitEvent("competencyChanged", this.$store.state.editor.selectedCompetency.shortId());
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
                            spitEvent("competencyChanged", this.$store.state.editor.selectedCompetency.shortId());
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
                    if (framework == null) return;
                    EcRepository.get(resp, connection.changedObject, error);
                }
            };
        },
        decrypt: function(encryptedThing, returnObject) {
            var v = new EcEncryptedValue();
            v.copyFrom(encryptedThing);
            returnObject.copyFrom(v.decryptIntoObject());
            return returnObject;
        }
    }
};
</script>