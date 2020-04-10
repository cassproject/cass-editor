<template>
    <div
        class="modal competency-search"
        :class="{'is-active': isActive}">
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head has-background-primary">
                <p class="modal-card-title">
                    <span class="title has-text-white">Search for Competency</span>
                    <br><span
                        class="subtitle has-text-white"
                        v-if="copyOrLink">
                        Sharing settings for {{ frameworkName }}
                    </span>
                    <span
                        v-else
                        class="subtitle has-text-white">
                        {{ $store.state.editor.selectedCompetency.getName() }}
                    </span>
                </p>
                <button
                    class="delete"
                    @click="resetModal();"
                    aria-label="close" />
            </header>
            <section class="modal-card-body">
                <div class="column is-12">
                    <List
                        v-if="$store.state.lode.competencySearchModalOpen"
                        type="Competency"
                        :repo="repo"
                        :click="select"
                        :searchOptions="searchOptions"
                        :paramObj="paramObj"
                        :disallowEdits="true"
                        :selectingCompetency="true"
                        :selected="selectedIds" />
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button
                        class="button is-outlined is-dark"
                        @click="resetModal();">
                        <span class="icon">
                            <i class="fa fa-times" />
                        </span>
                        <span>cancel</span>
                    </button>
                    <button
                        class="button is-outlined is-primary"
                        v-if="copyOrLink"
                        @click="copyCompetencies(selectedIds); resetModal();">
                        <span class="icon">
                            <i class="fa fa-copy" />
                        </span>
                        <span>
                            Copy Competency
                        </span>
                    </button>
                    <button
                        class="button is-outlined is-primary"
                        v-if="copyOrLink"
                        @click="appendCompetencies(selectedIds); resetModal();">
                        <span class="icon">
                            <i class="fa fa-link" />
                        </span>
                        <span>
                            Link Competency
                        </span>
                    </button>
                    <button
                        v-if="!copyOrLink"
                        class="button is-outlined is-primary"
                        @click="addSelected(selectedIds); resetModal();">
                        Add Selected
                    </button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import List from '@/lode/components/lode/List.vue';
import common from '@/mixins/common.js';
export default {
    name: 'CompetencySearch',
    props: {
        isActive: Boolean,
        framework: Object,
        queryParams: Object
    },
    components: {List},
    mixins: [common],
    data() {
        return {
            viewOptions: [
                {
                    label: 'View',
                    value: 'view'
                },
                {
                    label: 'Admin',
                    value: 'admin'
                }
            ],
            groups: [
                {
                    header: 'group 1',
                    view: 'admin'
                },
                {
                    header: 'group 2',
                    view: 'view'
                }
            ],
            users: [
                {
                    header: 'user 1',
                    view: 'admin'
                },
                {
                    header: 'user 2',
                    view: 'view'
                }
            ],
            repo: window.repo,
            selectedIds: [],
            itemsSaving: 0
        };
    },
    computed: {
        copyOrLink: function() {
            return this.$store.state.lode.copyOrLink;
        },
        frameworkName: function() {
            return this.framework.getName();
        },
        searchOptions: function() {
            let search = "";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.showMine || (this.queryParams && this.queryParams.concepts !== "true" && this.queryParams.show === "mine") ||
                (this.queryParams && this.queryParams.concepts === "true" && this.queryParams.conceptShow === "mine")) {
                search += " AND (";
                for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                    if (i !== 0) {
                        search += " OR ";
                    }
                    var id = EcIdentityManager.ids[i];
                    search += "@owner:\"" + id.ppk.toPk().toPem() + "\"";
                    search += " OR @owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
                }
                search += ")";
            }
            return search;
        },
        paramObj: function() {
            let obj = {};
            obj.size = 20;
            var order = (this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword") ? "asc" : "desc";
            obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "long",  "missing" : "_last"}} ]';
            if (this.queryParams && ((this.queryParams.concepts !== "true" && this.queryParams.show === 'mine') ||
                (this.queryParams.concepts === "true" && this.queryParams.conceptShow === "mine"))) {
                obj.ownership = 'me';
            }
            return obj;
        }
    },
    methods: {
        resetModal: function() {
            this.$store.commit('competencySearchModalOpen', false);
            this.selectedIds = [];
        },
        select: function(competency) {
            if (!EcArray.has(this.selectedIds, competency.shortId())) {
                this.selectedIds.push(competency.shortId());
            } else {
                EcArray.setRemove(this.selectedIds, competency.shortId());
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
                    if (EcIdentityManager.ids.length > 0) {
                        level.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                    }
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
        addSelected: function(ids) {
            this.addAlignments(ids, this.$store.state.editor.selectedCompetency, this.$store.state.editor.selectCompetencyRelation);
        }
    }
};
</script>


<style lang="scss">
    @import './../../scss/frameworks.scss';
.competency-search{
    .thing {
        padding: .125rem .25rem !important;
    }
    .thing .list-thing:hover {
        background-color: none;
    }
    .Thing__heading {
        padding-left: .25rem !important;
        margin-right: 2rem;
    }
    .edit-button {
        display: none;
    }

    .list-ul__item:hover {
        padding-top: .25rem;
        background-color: $cass-lightest;
    }
    .list-ul__item {
        margin-top: .25rem;
        border-radius: 3px;
        padding-top: .25rem;
    }
}

</style>