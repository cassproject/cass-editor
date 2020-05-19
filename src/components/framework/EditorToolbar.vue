<template>
    <div
        id="framework-editor-toolbar">
        <!-- property view -->
        <div class="fet__wrapper">
            <div
                class="dropdown"
                :class="{ 'is-active': showPropertyViewDropDown}">
                <div class="dropdown-trigger">
                    <button
                        class="button is-text"
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
                        class="button is-text"
                        @click="showShareDropdown = !showShareDropdown"
                        aria-haspopup="true">
                        <span>Share</span>
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
                            @click="$emit('showExportModal'); showShareDropdown = false;"
                            class="dropdown-item">
                            Export
                        </a>
                        <a
                            @click="showManageUsersModal(); showShareDropdown = false;"
                            class="dropdown-item"
                            v-if="canEditFramework">
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
                class="button is-text has-text-dark">
                <span class="icon">
                    <i class="fas fa-comments" />
                </span>
            </div>
            <div
                class="button is-text has-text-dark"
                @click="onClickUndo"
                v-if="canEditFramework">
                <span class="icon">
                    <i class="fas fa-undo-alt " />
                </span>
            </div>
            <div
                @click="$store.commit('app/showRightAside', 'Versions')"
                class="button is-text"
                v-if="canEditFramework">
                <span class="icon">
                    <i class="fas fa-history has-text-dark" />
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'EditorToolbar',
    data() {
        return {
            showPropertyViewDropDown: false,
            showShareDropdown: false,
            activeView: "primary",
            repo: window.repo
        };
    },
    methods: {
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
        changeProperties(type) {
            this.$emit('changeProperties', type);
            this.showPropertyViewDropDown = false;
            this.activeView = type;
        },
        onClickUndo: function() {
            this.$store.dispatch('editor/lastEditToUndo').then(editToUndo => {
                if (editToUndo) {
                    if (!EcArray.isArray(editToUndo)) {
                        editToUndo = [editToUndo];
                    }
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
            this.repo.deleteRegistered(EcRepository.getBlocking(id), function() {}, function(failure) {
                console.log(failure);
            });
        },
        undoDelete(obj) {
            // Re-add
            this.repo.saveTo(obj, function() {}, function(failure) {
                console.log(failure);
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
                me.repo.saveTo(success, function() {}, function() {});
                me.$store.commit('editor/changedObject', success.shortId());
            }, function(error) {
                console.error(error);
            });
        },
        undoUpdateWithExpandedProperty(update, updatedObject) {
            console.log(update);
            var me = this;
            this.expand(updatedObject, function(expanded) {
                for (var i = 0; i < update.fieldChanged.length; i++) {
                    console.log("changing " + update.fieldChanged[i] + " to " + JSON.stringify(update.initialValue[i]) + " from " + JSON.stringify(update.changedValue[i]));
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
            jsonld.compact(expandedCompetency, this.$store.state.lode.rawSchemata[context], function(err, compacted) {
                if (err != null) {
                    console.error(err);
                }
                var rld = new EcRemoteLinkedData();
                rld.copyFrom(compacted);
                rld.context = context;
                delete rld["@context"];
                if (rld.owner && !EcArray.isArray(rld.owner)) {
                    rld.owner = [rld.owner];
                }
                if (rld.reader && !EcArray.isArray(rld.reader)) {
                    rld.reader = [rld.reader];
                }
                if (rld.signature && !EcArray.isArray(rld.signature)) {
                    rld.signature = [rld.signature];
                }
                if (rld.competency && !EcArray.isArray(rld.competency)) {
                    rld.competency = [rld.competency];
                }
                if (rld.level && !EcArray.isArray(rld.level)) {
                    rld.level = [rld.level];
                }
                if (rld.relation && !EcArray.isArray(rld.relation)) {
                    rld.relation = [rld.relation];
                }
                rld["schema:dateModified"] = new Date().toISOString();
                if (me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[rld.id] !== true) {
                    rld = EcEncryptedValue.toEncryptedValue(rld);
                }
                me.repo.saveTo(rld, console.log, console.error);
            });
        }
    },
    computed: {
        showAddComments() {
            return this.$store.state.app.canAddComments;
        },
        showViewComments() {
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
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';

#framework-editor-toolbar {
    border-bottom: solid 1px $light;
    top: 52px;
    z-index: 10;
    height: 44px;
    display: fixed;
    width: 100%;
    padding: 4px;
    background-color:$light;
    .fet__wrapper {
        max-width: 1400px;
        display: flex;
        margin: auto;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        justify-content: flex-start;
        justify-items: center;
        align-content: center;
        align-items: center;
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