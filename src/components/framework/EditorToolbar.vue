<template>
    <div
        id="framework-editor-toolbar">
        <!-- property view -->
        <div class="fet__wrapper">
            <div class="left-side">
                <div
                    class="dropdown"
                    :class="{ 'is-active': showPropertyViewDropDown}">
                    <div class="dropdown-trigger">
                        <button
                            class="button is-small is-text"
                            @click="showPropertyViewDropDown = !showPropertyViewDropDown"
                            aria-haspopup="true">
                            <span>View</span>
                            <span class="icon is-small">
                                <i
                                    class="fas fa-angle-down has-text-link"
                                    aria-hidden="true" />
                            </span>
                        </button>
                    </div>
                    <div
                        class="dropdown-menu"
                        id="property-dropdown"
                        role="menu">
                        <div class="dropdown-content">
                            <a
                                @click="changeProperties('primary')"
                                class="dropdown-item">
                                <span
                                    :class="activeView==='primary'? '' : 'is-hidden'"
                                    class="icon">
                                    <i class="fa fa-check has-text-primary" />
                                </span>
                                Primary Properties
                            </a>
                            <a
                                @click="changeProperties('secondary')"
                                class="dropdown-item">
                                <span
                                    :class="activeView==='secondary'? '' : 'is-hidden'"
                                    class="icon">
                                    <i class="fa fa-check has-text-link" />
                                </span>
                                Secondary Properties
                            </a>
                            <a
                                @click="changeProperties('tertiary')"
                                class="dropdown-item">
                                <span
                                    :class="activeView==='tertiary'? '' : 'is-hidden'"
                                    class="icon">
                                    <i class="fa fa-check" />
                                </span>
                                Tertiary Properties
                            </a>
                        </div>
                    </div>
                </div>
                <!-- share: export or manage users -->
                <div
                    class="dropdown"
                    :class="{ 'is-active': showShareDropdown}">
                    <div class="dropdown-trigger">
                        <button
                            class="button is-small is-text"
                            @click="showShareDropdown = !showShareDropdown"
                            aria-haspopup="true">
                            <span>Framework</span>
                            <span class="icon is-small">
                                <i
                                    class="fas fa-angle-down has-text-link"
                                    aria-hidden="true" />
                            </span>
                        </button>
                    </div>
                    <div
                        class="dropdown-menu"
                        id="share-menu"
                        role="menu">
                        <div class="dropdown-content">
                            <a
                                :class="{ 'is-disabled': !canExport}"
                                @click="handleExportClick()"
                                class="dropdown-item">
                                Export
                            </a>
                            <a
                                @click="showManageUsersModal(); showShareDropdown = false;"
                                class="dropdown-item"
                                v-if="loggedIn">
                                Manage Users
                            </a>
                            <a
                                @click="showManageUsersModal(); showShareDropdown = false;"
                                class="dropdown-item"
                                v-else>
                                Get Shareable Link
                            </a>
                        </div>
                    </div>
                </div>
                <!-- hook this button up to add a new node at the top of the
            hierarchy in editing mode -->
                <div
                    v-if="showAddComments"
                    @click="handleClickAddComment"
                    class="button is-text has-text-primary">
                    <span class="icon">
                        <i class="fas fa-comment-medical" />
                    </span>
                </div>
                <div
                    v-if="showViewComments"
                    @click="$store.commit('app/showRightAside', 'Comments')"
                    class="button is-text is-small has-text-dark">
                    <span class="icon">
                        <i class="fas fa-comments" />
                    </span>
                </div>
                <div
                    class="button is-small is-text has-text-dark"
                    @click="onClickUndo"
                    v-if="canEditFramework">
                    <span class="icon">
                        <i class="fas fa-undo-alt " />
                    </span>
                </div>
                <div
                    @click="$store.commit('app/showRightAside', 'Versions')"
                    class="button is-text is-small"
                    v-if="canEditFramework">
                    <span class="icon">
                        <i class="fas fa-history has-text-dark" />
                    </span>
                </div>
                <div
                    class="button is-small is-text has-text-primary"
                    @click="copyClick">
                    <span class="icon ">
                        <i class="fa fa-copy is-size-7" />
                    </span>
                </div>
                <div
                    class="button is-small is-text has-text-primary"
                    @click="cutClick">
                    <span class="icon">
                        <i class="fas handle fa-cut" />
                    </span>
                </div>
                <div
                    class="button is-small is-text has-text-primary"
                    @click="pasteClick"
                    title="paste">
                    <span class="icon">
                        <i class="fa fa-paste is-size-7" />
                    </span>
                </div>
            </div>
            <div class="right-side">
                <div
                    class="button is-small is-text is-pulled-right"
                    v-if="canEditFramework && !conceptMode"
                    @click="showManageConfigurationModal(); showShareDropdown = false;">
                    <span class="icon">
                        <i class="fas fa-cog has-text-dark" />
                    </span>
                    <span>{{ defaultFrameworkConfigName }}</span>
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
        selectedArray: Array
    },
    data() {
        return {
            showPropertyViewDropDown: false,
            showShareDropdown: false,
            activeView: "primary",
            repo: window.repo,
            editsFinishedCounter: 0,
            totalEditsCounter: 0,
            defaultFrameworkConfigName: null
        };
    },
    methods: {
        handleExportClick: function() {
            if (this.canExport) {
                this.$emit('showExportModal');
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
            this.$store.commit('app/showModal', {component: 'Configuration'});
        },
        changeProperties(type) {
            this.$emit('changeProperties', type);
            this.showPropertyViewDropDown = false;
            this.activeView = type;
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
        undoAdd(id) {
            // Delete
            var me = this;
            this.repo.deleteRegistered(EcRepository.getBlocking(id), function() {
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
        expand: function(o, after) {
            var toExpand = JSON.parse(o.toJson());
            if (toExpand["@context"] != null && toExpand["@context"].startsWith("http://")) {
                toExpand["@context"] = toExpand["@context"].replace("http://", "https://");
            }
            if (toExpand["@context"] != null && toExpand["@context"].indexOf("skos") !== -1) {
                toExpand["@context"] = "https://schema.cassproject.org/0.4/skos/";
            }
            jsonld.expand(toExpand, function(err, expanded) {
                if (err == null) {
                    after(expanded[0]);
                } else {
                    after(null);
                }
            });
        },
        saveExpanded: function(expandedCompetency) {
            var me = this;
            var context = "https://schema.cassproject.org/0.4";
            if (expandedCompetency["@type"][0].toLowerCase().indexOf("concept") !== -1) {
                context = "https://schema.cassproject.org/0.4/skos";
            }
            jsonld.compact(expandedCompetency, this.$store.state.lode.rawSchemata[context], function(err, compacted) {
                if (err != null) {
                    appError(err);
                }
                if (compacted) {
                    var rld = new EcRemoteLinkedData();
                    rld.copyFrom(compacted);
                    rld.context = context;
                    delete rld["@context"];
                    rld = me.turnFieldsBackIntoArrays(rld);
                    rld["schema:dateModified"] = new Date().toISOString();
                    if (me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[rld.id] !== true) {
                        rld = EcEncryptedValue.toEncryptedValue(rld);
                    }
                    me.repo.saveTo(rld, function() {
                        me.editsFinishedCounter++;
                    }, function(error) {
                        appError(error);
                        me.editsFinishedCounter++;
                    });
                }
            });
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
        getConfigurationName: function() {
            if (this.$store.getters['editor/framework'].configuration) {
                let config = EcRepository.getBlocking(this.$store.getters['editor/framework'].configuration);
                if (config) {
                    this.defaultFrameworkConfigName = config.name;
                } else {
                    this.defaultFrameworkConfigName = "No configuration";
                }
            } else {
                this.defaultFrameworkConfigName = "No configuration";
            }
        },
        cutClick: function() {
            if (this.selectedArray && this.selectedArray.length === 1) {
                this.$store.commit('editor/cutId', this.selectedArray[0]);
            }
            this.$store.commit('editor/copyId', null);
            this.$store.commit('editor/paste', false);
        },
        copyClick: function() {
            if (this.selectedArray && this.selectedArray.length === 1) {
                this.$store.commit('editor/copyId', this.selectedArray[0]);
            }
            this.$store.commit('editor/cutId', null);
            this.$store.commit('editor/paste', false);
        },
        pasteClick: function() {
            this.$store.commit('editor/paste', true);
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
        canEditFramework: function() {
            if (this.queryParams && this.queryParams.view === 'true') {
                return false;
            } else if (!this.framework.canEditAny(EcIdentityManager.getMyPks())) {
                return false;
            }
            return true;
        },
        loggedIn: function() {
            if (EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
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
            } else {
                return true;
            }
        }
    },
    watch: {
        editsFinishedCounter: function() {
            if (this.editsFinishedCounter && this.editsFinishedCounter === this.totalEditsCounter) {
                this.editsFinishedCounter = 0;
                this.totalEditsCounter = 0;
                // If changes were made to the framework, make sure they get into the store.
                var framework = this.$store.getters['editor/framework'];
                this.$store.commit('editor/framework', EcRepository.getBlocking(framework.shortId()));
                this.$store.commit('editor/recomputeHierarchy', true);
            }
        },
        configuration: function() {
            this.getConfigurationName();
        }
    },
    mounted: function() {
        this.getConfigurationName();
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';
.clear-side-bar #framework-editor-toolbar {
    width: calc(100% - 300px);
}
#framework-editor-toolbar {
    border-bottom: solid 1px $light;
    top: 0rem;
    width: calc(100% - 4rem);
    z-index: 10;
    height: 1.75rem;
    position: fixed;
    padding: 4px;
    background-color:$light;
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
    .dropdown, .button, .framework-search {
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
}
</style>