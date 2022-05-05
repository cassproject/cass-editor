<template>
    <modal-template
        @close="closeModal"
        content="search"
        :active="true">
        <template slot="modal-header">
            <p class="modal-card-title">
                <span class="title has-text-white">Search for {{ searchType }}</span>
                <br><span
                    class="subtitle has-text-white"
                    v-if="copyOrLink">
                    <b>Editing framework:</b> {{ frameworkName }}
                </span>
            </p>
        </template>
        <template slot="modal-body">
            <button
                class="button is-dark is-outlined is-small is-pulled-right"
                v-if="(selectedIds && selectedIds.length) || selectedFramework"
                @click="clickClearFramework">
                <span class="icon">
                    <i class="fa fa-times" />
                </span>
                <span>
                    Clear selection
                </span>
            </button>
            <search
                ref="search"
                @setSelectedIds="selectedIds = $event"
                parent="search-modal"
                :allowShowFrameworks="true"
                :clearFramework="clearFramework"
                @selectFramework="selectFramework"
                :idsNotPermittedInSearch="idsNotPermittedInSearch" />
        </template>
        <template slot="modal-foot">
            <div class="buttons">
                <button
                    class="button is-outlined is-dark"
                    @click="closeModal">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span>
                    <span>cancel</span>
                </button>
                <button
                    class="button is-outlined is-primary"
                    v-if="copyOrLink"
                    :disabled="!selectedIds || selectedIds.length === 0"
                    @click="copyCompetencies">
                    <span class="icon">
                        <i class="fa fa-copy" />
                    </span>
                    <span>
                        Copy {{ searchType }}
                    </span>
                </button>
                <button
                    class="button is-outlined is-primary"
                    v-if="copyOrLink && linkEnabled"
                    :disabled="!selectedIds || selectedIds.length === 0"
                    @click="appendCompetencies">
                    <span class="icon">
                        <i class="fa fa-link" />
                    </span>
                    <span>
                        Link {{ searchType }}
                    </span>
                </button>
            </div>
        </template>
    </modal-template>
</template>

<script>
import ModalTemplate from './ModalTemplate.vue';
import Search from '@/components/framework/Search.vue';
import common from '@/mixins/common.js';
import {mapState} from 'vuex';

export default {
    name: 'SearchModal',
    data() {
        return {
            selectedIds: [],
            clearFramework: false,
            selectedFramework: null,
            repo: window.repo,
            itemsSaving: 0
        };
    },
    components: {
        ModalTemplate,
        Search
    },
    mixins: [common],
    computed: {
        ...mapState({
            selectedCompetency: state => state.editor.selectedCompetency,
            framework: state => state.editor.framework,
            queryParams: state => state.editor.queryParams,
            includeRelations: state => state.lode.includeRelations
        }),
        copyOrLink: function() {
            return this.$store.state.lode.copyOrLink;
        },
        searchType: function() {
            return this.$store.state.lode.searchType;
        },
        frameworkName: function() {
            if (this.framework && this.framework.context) {
                return this.framework.getName();
            } else {
                return '';
            }
        },
        searchFrameworksInCompetencySearch: function() {
            return this.$store.getters['app/searchFrameworksInCompetencySearch'];
        },
        idsNotPermittedInSearch: function() {
            if (this.copyOrLink) {
                let ary = [this.framework.shortId()];
                if (this.framework.competency && this.framework.competency.length > 0) {
                    ary = ary.concat(this.framework.competency);
                }
                return ary;
            }
            return null;
        },
        linkEnabled: function() {
            // For CE frameworks, don't permit linking
            if (this.framework.subType !== 'Collection' && this.queryParams.ceasnDataFields === "true") {
                return false;
            }
            return true;
        }
    },
    methods: {
        closeModal: function() {
            this.$store.commit('app/closeModal');
        },
        clickClearFramework: function() {
            this.selectedIds.splice(0, this.selectedIds.length);
            this.clearFramework = true;
            this.$nextTick(() => {
                this.clearFramework = false;
            });
        },
        selectFramework: function(val) {
            this.selectedFramework = val;
        },
        addRelations: async function() {
            if (this.searchFrameworksInCompetencySearch && this.selectedFramework.relation) {
                for (var i = 0; i < this.selectedFramework.relation.length; i++) {
                    var relation = await EcAlignment.get(this.selectedFramework.relation[i]);
                    if (EcArray.has(this.selectedIds, relation.target) && EcArray.has(this.selectedIds, relation.source)) {
                        this.selectedIds.push(relation.shortId());
                    }
                }
            }
        },
        copyCompetencies: async function() {
            let results = this.selectedIds;
            if (this.includeRelations) {
                await this.addRelations();
            }
            var copyDict = {};
            var framework = this.$store.state.editor.framework;
            var initialCompetencies = this.framework.competency ? this.framework.competency.slice() : null;
            var initialRelations = this.framework.relation ? this.framework.relation.slice() : null;
            var initialLevels = this.framework.level ? this.framework.level.slice() : null;
            var addedNew = [];
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
                    addedNew.push(c.shortId());
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
                    copyDict[thing.shortId()] = c;
                    if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[c.id] !== true) {
                        c = await EcEncryptedValue.toEncryptedValue(c);
                    }
                    this.itemsSaving++;
                    (function(c) {
                        Task.asyncImmediate(function(callback) {
                            me.repo.saveTo(c, function() {
                                framework.addCompetency(c.shortId());
                                me.$store.commit('editor/framework', framework);
                                me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                                callback();
                            }, function(error) {
                                appError(error);
                                me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
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
                    addedNew.push(level.shortId());
                    level["schema:dateCreated"] = new Date().toISOString();
                    level.competency = this.$store.state.editor.selectedCompetency.shortId();
                    delete level.owner;
                    level['ceasn:derivedFrom'] = thing.id;
                    copyDict[thing.shortId()] = level;
                    if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[level.id] !== true) {
                        level = await EcEncryptedValue.toEncryptedValue(level);
                    }
                    this.itemsSaving++;
                    (function(level) {
                        Task.asyncImmediate(function(callback) {
                            me.repo.saveTo(level, function() {
                                framework.addLevel(level.shortId());
                                me.$store.commit('editor/framework', framework);
                                me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                                callback();
                            }, function(error) {
                                appError(error);
                                me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
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
                        addedNew.push(r.shortId());
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
                            if (this.$store.state.editor.private === true) {
                                r = await EcEncryptedValue.toEncryptedValue(r);
                            }
                            this.itemsSaving++;
                            (function(r) {
                                Task.asyncImmediate(function(callback) {
                                    me.repo.saveTo(r, function() {
                                        framework.addRelation(r.id);
                                        me.$store.commit('editor/framework', framework);
                                        me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                                        callback();
                                    },
                                    function(error) {
                                        appError(error);
                                        me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
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
                        addedNew.push(r.shortId());
                        r["schema:dateCreated"] = new Date().toISOString();

                        var child = copyDict[thing.shortId()];

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
                                        me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                                        callback();
                                    },
                                    function(error) {
                                        appError(error);
                                        me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                                        callback();
                                    });
                                });
                            })(r);
                        }
                    }
                }
            }
        },
        afterCopy: async function(initialCompetencies, initialRelations, initialLevels, addedNew) {
            this.itemsSaving--;
            // loading(this.itemsSaving + " objects left to copy.");
            if (this.itemsSaving === 0) {
                var framework = this.$store.state.editor.framework;
                var changes = [];
                for (var i = 0; i < addedNew.length; i++) {
                    changes.push({operation: "addNew", id: addedNew[i]});
                }
                changes.push({operation: "update", id: framework.shortId(), fieldChanged: ["competency", "relation", "level"], initialValue: [initialCompetencies, initialRelations, initialLevels], changedValue: [framework.competency, framework.relation, framework.level]});
                this.$store.commit('editor/addEditsToUndo', changes);
                if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                    framework = await EcEncryptedValue.toEncryptedValue(framework);
                }
                this.repo.saveTo(framework, function() {}, appError);
                this.closeModal();
            }
        },
        appendCompetencies: async function() {
            let results = this.selectedIds;
            if (this.includeRelations) {
                await this.addRelations();
            }
            var selectedCompetency = this.$store.state.editor.selectedCompetency;
            var framework = this.$store.state.editor.framework;
            var initialCompetencies = this.framework.competency ? this.framework.competency.slice() : null;
            var initialRelations = this.framework.relation ? this.framework.relation.slice() : null;
            var initialLevels = this.framework.level ? this.framework.level.slice() : null;
            var initialLevelCompetency = [];
            var afterLevelCompetency = [];
            var addedNew = [];
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
                    var thingId = thing.shortId();
                    initialLevelCompetency.push({id: thingId, competency: thing.competency.splice()});
                    thing.competency.push(selectedCompetency.shortId());
                    afterLevelCompetency.push({id: thingId, competency: thing.competency});
                    this.repo.saveTo(thing, function() {}, appError);
                }
            }
            for (var i = 0; i < results.length; i++) {
                var thing = await EcRepository.get(results[i]);
                if (thing.isAny(new EcAlignment().getTypes())) {
                    if (EcArray.has(framework.competency, thing.source)) {
                        if (EcArray.has(framework.competency, thing.target)) {
                            framework.addRelation(thing.shortId());
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
                        addedNew.push(r.shortId());
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
            var changes = [];
            for (var i = 0; i < addedNew.length; i++) {
                changes.push({operation: "addNew", id: addedNew[i]});
            }
            if (initialLevelCompetency.length > 0) {
                for (var i = 0; i < initialLevelCompetency.length; i++) {
                    changes.push({operation: "update", id: initialLevelCompetency[i].id, fieldChanged: ["competency"], initialValue: [initialLevelCompetency[i].competency], changedValue: [afterLevelCompetency[i].competency]});
                }
            }
            changes.push({operation: "update", id: framework.shortId(), fieldChanged: ["competency", "relation", "level"], initialValue: [initialCompetencies, initialRelations, initialLevels], changedValue: [framework.competency, framework.relation, framework.level]});
            this.$store.commit('editor/addEditsToUndo', changes);
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[framework.id] !== true) {
                framework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, async function() {
                me.$store.commit('editor/framework', await EcFramework.get(framework.id));
                me.closeModal();
            }, appError);
        }
    }
};
</script>

<style scoped lang="scss">
.cass-editor__modal--search {
    .hierarchy-item__buttons {
        display: none !important;
    }
    .lode__type {
        font-size: 1rem;
        color: var(--dark);
    }
}

</style>