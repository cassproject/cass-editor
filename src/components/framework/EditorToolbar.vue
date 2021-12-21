<template>
    <div
        id="framework-editor-toolbar">
        <!-- property view -->
        <div class="container">
            <div class="columns is-mobile">
                <!-- view options -->
                <!-- primary -->
                <div class="column is-narrow">
                    <div class="buttons">
                        <div
                            title="View only primary properties"
                            @click="changeProperties('primary')"
                            :class="activeView === 'primary' ? 'has-text-primary' : 'has-text-dark'"
                            class="button is-text has-text-dark ">
                            <span class="icon">
                                <i class="fas fa-check-square" />
                            </span>
                            <span class="is-hidden-touch">{{ ceasnDataFields ? "Low Detail" : "Primary" }}</span>
                            <span class="is-hidden-desktop">1st</span>
                        </div>
                        <!-- secondary -->
                        <div
                            title="View primary and secondary properties"
                            @click="changeProperties('secondary')"
                            :class="activeView === 'secondary' ? 'has-text-primary' : 'has-text-dark'"
                            class="button is-text ">
                            <span
                                v-if="activeView === 'primary'"
                                class="icon">
                                <i class="fas fa-square" />
                            </span>
                            <span
                                v-else
                                class="icon">
                                <i class="fas fa-check-square" />
                            </span>
                            <span class="is-hidden-touch">{{ ceasnDataFields ? "Moderate Detail" : "Secondary" }}</span>
                            <span class="is-hidden-desktop">2nd</span>
                        </div>
                        <!-- tertiary -->
                        <div
                            title="View all properties"
                            :class="activeView === 'tertiary' ? 'has-text-primary' : 'has-text-dark'"
                            @click="changeProperties('tertiary')"
                            class="button is-text ">
                            <span
                                v-if="activeView === 'tertiary'"
                                class="icon">
                                <i class="fas fa-check-square" />
                            </span>
                            <span
                                v-else
                                class="icon">
                                <i class="fas fa-square" />
                            </span>
                            <span class="is-hidden-touch">{{ ceasnDataFields ? "High Detail" : "Tertiary" }}</span>
                            <span class="is-hidden-desktop">3rd</span>
                        </div>
                    </div>
                </div>
                <div class="column is-narrow">
                    <div class="vl" />
                </div>
                <!-- comments -->
                <div
                    class="column is-narrow"
                    v-if="showAddComments || showViewComments">
                    <!-- show comments -->
                    <div class="buttons">
                        <div
                            title="View all comments"
                            v-if="showViewComments"
                            @click="$store.commit('app/showRightAside', 'Comments')"
                            class="button is-text  has-text-dark">
                            <span class="icon">
                                <i class="fas fa-comments" />
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    v-if="showAddComments || showViewComments"
                    class="column is-narrow">
                    <div class="vl" />
                </div>
                <div
                    class="column is-narrow"
                    v-if="canEditFramework">
                    <div class="buttons">
                        <div
                            title="Undo recent change"
                            class="button  is-text has-text-dark"
                            @click="onClickUndo">
                            <span class="icon">
                                <i class="fas fa-undo-alt " />
                            </span>
                        </div>
                    <!-- <div
                            title="View history"
                            @click="$store.commit('app/showRightAside', 'Versions')"
                            class="button is-text  has-text-dark">
                            <span class="icon">
                                <i class="fas fa-history" />
                            </span>
                        </div> -->
                    </div>
                </div>
                <div
                    v-if="canEditFramework"
                    class="column is-narrow">
                    <div class="vl" />
                </div>
                <!-- divider -->
                <!-- export -->
                <div
                    class="column is-narrow"
                    v-if="canExport">
                    <div
                        title="Export framework"
                        :class="{ 'is-disabled': !canExport}"
                        @click="handleExportClick()"
                        class="button is-text has-text-dark ">
                        <span class="icon">
                            <i class="fas fa-file-export" />
                        </span>
                    </div>
                </div>
                <!-- export -->
                <div
                    class="column is-narrow"
                    v-else>
                    <div
                        title="Export unavailable"
                        :class="{ 'is-disabled': !canExport}"
                        disabled="true"
                        class="button is-text has-text-dark ">
                        <span class="icon">
                            <i class="fas fa-file-export" />
                        </span>
                    </div>
                </div>
                <!-- manage users -->
                <div
                    class="column is-narrow"
                    v-if="showUserManagementIcon">
                    <div
                        v-if="loggedIn"
                        title="Manage users"
                        @click="showManageUsersModal(); showShareDropdown = false;"
                        class="button is-text has-text-dark ">
                        <span class="icon">
                            <i class="fas fa-users" />
                        </span>
                    </div>
                    <!-- get share link -->
                    <div
                        v-else-if="shareEnabled"
                        title="Get shareable link"
                        @click="showManageUsersModal(); showShareDropdown = false;"
                        class="button is-text has-text-dark ">
                        <span class="icon">
                            <i class="fas fa-share" />
                        </span>
                    </div>
                </div>
                <!-- configuration -->
                <div
                    class="column is-narrow"
                    v-if="configurationsEnabled">
                    <div
                        title="Framework configuration"
                        class="button  is-text has-text-dark is-pulled-right not-lowercase"
                        v-if="canEditFramework && !conceptMode"
                        @click="showManageConfigurationModal(); showShareDropdown = false;">
                        <span class="icon">
                            <i class="fas fa-cog" />
                        </span>
                        <span class="is-hidden-touch">{{ defaultFrameworkConfigName }}</span>
                    </div>
                </div>
                <!-- directory -->
                <div
                    v-if="directoryId"
                    class="column is-narrow"
                    @click="goToDirectory">
                    <div class="button is-text has-text-dark">
                        Go to directory
                    </div>
                </div>
                <!-- assertions -->
                <div
                    id="manageAssertionsButton"
                    v-if="canManageAssertions"
                    class="column is-narrow"
                    @click="manageAssertions">
                    <div class="button is-text has-text-dark">
                        <template v-if="managingAssertions">
                            Stop Managing Assertions
                        </template>
                        <template v-else>
                            Manage Assertions
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {cassUtil} from '../../mixins/cassUtil';
export default {
    name: 'EditorToolbar',
    mixins: [ cassUtil ],
    props: {
        properties: {
            type: String,
            default: 'primary'
        }
    },
    data() {
        return {
            showPropertyViewDropDown: false,
            showShareDropdown: false,
            activeView: "primary",
            repo: window.repo,
            editsFinishedCounter: 0,
            totalEditsCounter: 0,
            defaultFrameworkConfigName: null,
            privateFramework: false
        };
    },
    methods: {
        closeViewDropDown: function() {
            if (this.showPropertyViewDropDown) {
                this.showPropertyViewDropDown = false;
            }
        },
        closeShareDropDown: function() {
            if (this.showShareDropdown) {
                this.showShareDropdown = false;
            }
        },
        handleExportClick: function() {
            if (this.canExport) {
                this.$emit('show-export-modal');
                this.showShareDropdown = false;
            }
        },
        handleClickAddComment: function() {
            this.$store.commit('editor/setAddCommentAboutId', this.$store.getters['editor/framework'].shortId());
            this.$store.commit('editor/setAddCommentType', 'new');
            this.$store.commit('app/showModal', {component: 'AddComment'});
        },
        showExportModal() {
            this.$store.commit('app/showModal', 'Export');
        },
        showManageUsersModal() {
            this.$store.commit('app/showModal', {component: 'Share'});
        },
        showManageConfigurationModal() {
            this.$store.commit('app/showModal', {component: 'FrameworkConfiguration'});
        },
        changeProperties(type) {
            let properties = this.properties;
            let newType = type;
            /* If clicking something that is selected, reduce
               to lower level view, essentially unclicking */
            if (newType === 'secondary' && properties === 'secondary') {
                newType = 'primary';
            } else if (newType === 'tertiary' && properties === 'tertiary') {
                newType = 'secondary';
            }
            this.$emit('change-properties', newType);
            this.showPropertyViewDropDown = false;
            this.activeView = newType;
        },
        onClickUndo: function() {
            this.$Progress.start();
            this.$store.dispatch('editor/lastEditToUndo').then(editToUndo => {
                if (editToUndo) {
                    if (!EcArray.isArray(editToUndo)) {
                        editToUndo = [editToUndo];
                    }
                    this.totalEditsCounter += editToUndo.length;
                    for (let i = 0; i < editToUndo.length; i++) {
                        let editType = editToUndo[i].operation;
                        if (editType === "addNew") {
                            this.undoAdd(editToUndo[i].id);
                        } else if (editType === "delete") {
                            this.undoDelete(editToUndo[i].obj);
                        } else if (editType === "update") {
                            this.undoUpdate(editToUndo[i]);
                        }
                    }
                }
                this.$store.commit('editor/setLastEditToUndo', null);
            });
        },
        async undoAdd(id) {
            // Delete
            var me = this;
            let obj = await EcRepository.get(id);
            this.repo.deleteRegistered(obj, function() {
                me.editsFinishedCounter++;
            }, function(failure) {
                appLog(failure);
                me.editsFinishedCounter++;
                me.$Progress.fail();
            });
        },
        undoDelete(obj) {
            // Re-add
            var toSave = obj;
            var me = this;
            if (obj.type === "Concept") {
                toSave = new EcConcept();
                toSave.copyFrom(obj);
            }
            this.repo.saveTo(toSave, function() {
                me.editsFinishedCounter++;
                me.$Progress.finish();
            }, function(failure) {
                appLog(failure);
                me.editsFinishedCounter++;
                me.$Progress.fail();
            });
        },
        undoUpdate(update) {
            // Revert to initial value
            let me = this;
            EcRepository.get(update.id, function(success) {
                if (update.expandedProperty) {
                    return me.undoUpdateWithExpandedProperty(update, success);
                }
                for (var i = 0; i < update.fieldChanged.length; i++) {
                    success[update.fieldChanged[i]] = update.initialValue[i];
                }
                me.repo.saveTo(success, function() {
                    me.editsFinishedCounter++;
                    me.$Progress.finish();
                }, function() {
                    me.editsFinishedCounter++;
                    me.$Progress.fail();
                });
                me.$store.commit('editor/changedObject', success.shortId());
            }, function(error) {
                appError(error);
                me.editsFinishedCounter++;
                me.$Progress.fail();
            });
        },
        undoUpdateWithExpandedProperty(update, updatedObject) {
            var me = this;
            this.expand(updatedObject, function(expanded) {
                for (var i = 0; i < update.fieldChanged.length; i++) {
                    expanded[update.fieldChanged[i]] = update.initialValue[i];
                    if (expanded[update.fieldChanged[i]].length === 0) {
                        delete expanded[update.fieldChanged[i]];
                    }
                    me.saveExpanded(expanded);
                }
            });
        },
        expand: async function(o, after) {
            var toExpand = JSON.parse(o.toJson());
            if (toExpand["@context"] != null && toExpand["@context"].startsWith("http://")) {
                toExpand["@context"] = toExpand["@context"].replace("http://", "https://");
            }
            if (toExpand["@context"] != null && toExpand["@context"].indexOf("skos") !== -1) {
                toExpand["@context"] = "https://schema.cassproject.org/0.4/skos/";
            }
            try {
                let expanded = await jsonld.expand(toExpand);
                after(expanded[0]);
            } catch (err) {
                after(null);
            }
        },
        saveExpanded: async function(expandedCompetency) {
            var me = this;
            var context = "https://schema.cassproject.org/0.4";
            if (expandedCompetency["@type"][0].toLowerCase().indexOf("concept") !== -1) {
                context = "https://schema.cassproject.org/0.4/skos";
            }
            try {
                let compacted = await jsonld.compact(expandedCompetency, this.$store.state.lode.rawSchemata[context]);
                if (compacted) {
                    var rld = new EcRemoteLinkedData();
                    rld.copyFrom(compacted);
                    rld.context = context;
                    delete rld["@context"];
                    rld = me.turnFieldsBackIntoArrays(rld);
                    rld["schema:dateModified"] = new Date().toISOString();
                    if (me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[rld.id] !== true) {
                        rld = await EcEncryptedValue.toEncryptedValue(rld);
                    }
                    me.repo.saveTo(rld, function() {
                        me.editsFinishedCounter++;
                    }, function(error) {
                        appError(error);
                        me.editsFinishedCounter++;
                    });
                }
            } catch (err) {
                appError(err);
            }
        },
        // Compact operation removes arrays when length is 1, but some fields need to be arrays in the data that's saved
        turnFieldsBackIntoArrays: function(rld) {
            var fields = [
                "owner", "reader", "signature", "competency", "level", "relation", "skos:hasTopConcept", "skos:narrower", "skos:broader", "skos:broadMatch", "skos:closeMatch",
                "skos:exactMatch", "skos:narrowMatch", "skos:related"
            ];
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (rld[field] && !EcArray.isArray(rld[field])) {
                    rld[field] = [rld[field]];
                }
            }
            return rld;
        },
        getConfigurationName: async function() {
            if (this.$store.getters['editor/framework'].configuration) {
                let config = await EcRepository.get(this.$store.getters['editor/framework'].configuration);
                if (config) {
                    this.defaultFrameworkConfigName = config.name;
                } else {
                    this.defaultFrameworkConfigName = "No configuration";
                }
            } else {
                this.defaultFrameworkConfigName = "No configuration";
            }
        },
        goToDirectory: function() {
            let me = this;
            EcDirectory.get(this.directoryId, function(success) {
                me.$store.commit('app/selectDirectory', success);
                me.$router.push({name: "directory"});
            }, appError);
        },
        checkIsPrivate: function() {
            let obj = this.framework;
            delete EcRepository.cache[obj.shortId()];
            let me = this;
            EcRepository.get(obj.shortId(), function(success) {
                if (success.type === "EncryptedValue") {
                    me.privateFramework = true;
                } else {
                    me.privateFramework = false;
                }
            }, function(failure) {
                appError(failure);
            });
        },
        manageAssertions: async function() {
            if (this.managingAssertions) {
                this.$store.commit('editor/setManageAssertions', false);
            } else {
                EcPerson.search(window.repo, '*').then((people) => {
                    this.$store.commit('editor/setPeople', people.map((x) => {
                        return {name: x.name, key: x.owner[0]};
                    }));
                });
                this.$store.dispatch('editor/searchForAssertions', 500).then(() => {
                    this.$store.commit('editor/setManageAssertions', true);
                }).catch(() => {
                    // TODO: Handle assertion search error
                });
            }
        }
    },
    computed: {
        showAddComments() {
            if (this.$store.getters['editor/conceptMode'] === true) {
                return false;
            }
            return this.$store.state.app.canAddComments;
        },
        showViewComments() {
            if (this.$store.getters['editor/conceptMode'] === true) {
                return false;
            }
            return this.$store.state.app.canViewComments;
        },
        framework: function() {
            return this.$store.state.editor.framework;
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        ceasnDataFields: function() {
            return this.queryParams.ceasnDataFields === 'true';
        },
        canEditFramework: function() {
            if (this.queryParams && this.queryParams.view === 'true') {
                return false;
            } else if (!this.framework.canEditAny(EcIdentityManager.default.getMyPks())) {
                return false;
            }
            return true;
        },
        loggedIn: function() {
            if (EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
                return true;
            }
            return false;
        },
        configuration: function() {
            return this.$store.getters['editor/framework'].configuration;
        },
        conceptMode: function() {
            return this.$store.getters['editor/conceptMode'];
        },
        canExport: function() {
            if (this.$store.state.editor.private) {
                return false;
            } else if (this.framework.reader && this.framework.reader.length > 0) {
                return false;
            } else if (this.privateFramework) {
                return false;
            } else {
                return true;
            }
        },
        configurationsEnabled: function() {
            return this.$store.state.featuresEnabled.configurationsEnabled;
        },
        shareEnabled: function() {
            return this.$store.state.featuresEnabled.shareEnabled;
        },
        userManagementEnabled: function() {
            return this.$store.state.featuresEnabled.userManagementEnabled;
        },
        showUserManagementIcon: function() {
            if (!this.shareEnabled && !this.canEditFramework) {
                return false;
            }
            if (!this.shareEnabled && !this.userManagementEnabled) {
                return false;
            }
            return true;
        },
        directoryId: function() {
            return this.framework.directory;
        },
        canManageAssertions: function() {
            if (this.queryParams.disableAssertions !== 'true' && this.loggedIn) {
                return true;
            }
            return false;
        },
        managingAssertions: function() {
            return this.$store.getters['editor/manageAssertions'];
        }
    },
    watch: {
        editsFinishedCounter: async function() {
            if (this.editsFinishedCounter && this.editsFinishedCounter === this.totalEditsCounter) {
                this.editsFinishedCounter = 0;
                this.totalEditsCounter = 0;
                // If changes were made to the framework, make sure they get into the store.
                var framework = this.$store.getters['editor/framework'];
                let obj = await EcRepository.get(framework.shortId());
                this.$store.commit('editor/framework', obj);
                this.$store.commit('editor/recomputeHierarchy', true);
                this.$store.commit('editor/refreshAlignments', true);
            }
        },
        configuration: function() {
            this.getConfigurationName();
        }
    },
    mounted: function() {
        if (this.$store.getters['editor/setPropertyLevel']) {
            this.changeProperties(this.$store.getters['editor/setPropertyLevel']);
            this.$store.commit('editor/setPropertyLevel', null);
        }
        this.checkIsPrivate();
        this.getConfigurationName();
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';
#framework-editor-toolbar {
    width: calc(100% - 4rem);
    z-index: 10;
    background-color: white;
    .fet__wrapper {
        max-width: 1400px;
        display: flex;
        margin: auto;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        justify-content: space-between;
        justify-items: center;
        align-content: center;
        align-items: stretch;
        .right-side {
            justify-content: flex-end;
        }
         .left-side {
            justify-content: flex-start;
        }
    }
    .dropdown, .framework-search {
        padding: 0px .5rem;
    }
    .framework-search {
        width: 100%;
    }
    .dropdown-menu {
        padding-top: 0;
        .dropdown-item:hover {
            background-color: $link;
        }
    }
    .fet_view-options {

    }
    .vl {
        border-right:1px solid rgba($dark, .3);
        height:100%;
        width: 0px;
    }
}
</style>