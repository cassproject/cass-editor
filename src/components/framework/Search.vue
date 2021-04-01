<!--
This component is displays a ui for searchin for compencies and selecting them
this component can be dropped into a card element such as DynamicModel.vue
with some adjustments to the modal-card classes to just card, this could be
placed anywhere in a structured html element such as a <section> or a <div>
-->
<template>
    <div
        class="columns is-multiline">
        <div
            class="column is-12"
            v-if="!selectedFramework">
            <SearchBar
                filterSet="basic"
                :allowShowFrameworks="allowShowFrameworks"
                :searchType="searchType" />
        </div>
        <div
            v-if="!selectedFramework"
            class="column is-12">
            <List
                v-if="$store.state.lode.competencySearchModalOpen"
                :type="searchTypeToPassToList"
                view="search"
                :repo="repo"
                :click="select"
                :searchOptions="searchOptions"
                :paramObj="paramObj"
                :disallowEdits="true"
                :selectingCompetency="true"
                :selected="selectedIds"
                :displayFirst="displayFirst"
                :idsNotPermittedInSearch="idsNotPermittedInSearch" />
        </div>
        <div
            v-if="selectedFramework && !hierarchyLoaded">
            <span class="icon is-large">
                <i class="fa fa-spinner fa-2x fa-pulse" />
            </span>
        </div>
        <div v-show="hierarchyLoaded">
            <Thing
                v-if="selectedFramework"
                :obj="selectedFramework"
                :repo="repo"
                :view="view"
                :expandInModal="true" />
            <Hierarchy
                :container="selectedFramework"
                view="competencySearch"
                containerType="Framework"
                containerTypeGet="EcFramework"
                containerNodeProperty="competency"
                containerEdgeProperty="relation"
                nodeType="EcCompetency"
                edgeType="EcAlignment"
                edgeRelationProperty="relationType"
                edgeRelationLiteral="narrows"
                edgeSourceProperty="source"
                edgeTargetProperty="target"
                :viewOnly="true"
                :repo="repo"
                :exportOptions="[]"
                :highlightList="null"
                @done-loading-nodes="hierarchyLoaded = true"
                properties="primary"
                @selected-array="selectedArrayEvent" />
        </div>
    </div>
</template>

<script>
import List from '@/lode/components/List.vue';
import Hierarchy from '@/lode/components/Hierarchy.vue';
import Thing from '@/lode/components/Thing.vue';
import common from '@/mixins/common.js';
import {mapState} from 'vuex';
import SearchBar from '@/components/framework/SearchBar.vue';
export default {
    name: 'CompetencySearch',
    props: {
        isActive: Boolean,
        view: {
            type: String,
            default: 'modal'
        },
        idsNotPermittedInSearch: {
            type: Array,
            default: null
        },
        allowShowFrameworks: {
            type: Boolean,
            default: false
        }
    },
    components: {List, SearchBar, Hierarchy, Thing},
    mixins: [common],
    data() {
        return {
            repo: window.repo,
            selectedIds: [],
            itemsSaving: 0,
            displayFirst: [],
            showMine: false,
            sortBy: null,
            selectedFramework: null,
            hierarchyLoaded: false
        };
    },
    created: function() {
        this.sortBy = (this.$store.getters['editor/conceptMode'] === true || this.searchType === "Concept") ? "dcterms:title.keyword" : "name.keyword";
        this.$store.commit('app/searchTerm', "");
    },
    beforeDestroy: function() {
        this.$store.commit('app/searchTerm', "");
    },
    computed: {
        ...mapState({
            selectedCompetency: state => state.editor.selectedCompetency,
            framework: state => state.editor.framework,
            queryParams: state => state.editor.queryParams,
            addingProperty: state => state.lode.addingProperty
        }),
        nameOfSelectedCompetency: function() {
            if (this.selectedCompetency && this.selectedCompetency.name) {
                return this.selectedCompetency.getName();
            } else if (this.selectedCompetency) {
                return Thing.getDisplayStringFrom(this.selectedCompetency["skos:prefLabel"]);
            } else {
                return '';
            }
        },
        copyOrLink: function() {
            return this.$store.state.lode.copyOrLink;
        },
        frameworkName: function() {
            if (this.framework) {
                return this.framework.getName();
            } else {
                return '';
            }
        },
        searchOptions: function() {
            let search = "";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.showMine || (this.queryParams && this.$store.getters['editor/conceptMode'] !== true && this.queryParams.show === "mine") ||
                (this.queryParams && this.$store.getters['editor/conceptMode'] === true && this.queryParams.conceptShow === "mine")) {
                if (EcIdentityManager.ids.length > 0) {
                    search += " AND (";
                    for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                        if (i !== 0) {
                            search += " OR ";
                        }
                        var id = EcIdentityManager.ids[i];
                        search += "\\*owner:\"" + id.ppk.toPk().toPem() + "\"";
                        search += " OR \\*owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
                    }
                    search += ")";
                }
            }
            return search;
        },
        paramObj: function() {
            let obj = {};
            obj.size = 20;
            var searchTerm = this.$store.getters['app/searchTerm'];
            if (!searchTerm || searchTerm.length === 0) {
                var order = (this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword") ? "asc" : "desc";
                obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "long",  "missing" : "_last"}} ]';
            } else {
                delete obj.sort;
            }
            if (EcIdentityManager.ids.length > 0 && this.queryParams && ((this.$store.getters['editor/conceptMode'] !== true && this.queryParams.show === 'mine') ||
                (this.$store.getters['editor/conceptMode'] === true && this.queryParams.conceptShow === "mine"))) {
                obj.ownership = 'me';
            }
            return obj;
        },
        searchType: function() {
            return this.$store.state.lode.searchType;
        },
        sortResults: function() {
            return this.$store.getters['app/sortResults'];
        },
        quickFilters: function() {
            return this.$store.getters['app/quickFilters'];
        },
        filteredQuickFilters: function() {
            if (this.quickFilters) {
                let filterValues = this.quickFilters.filter(item => item.checked === true);
                appLog('filtered value', filterValues);
                return filterValues;
            } else {
                return [];
            }
        },
        searchFrameworksInCompetencySearch: function() {
            return this.$store.getters['app/searchFrameworksInCompetencySearch'];
        },
        searchTypeToPassToList: function() {
            if (this.searchType === "Competency" && this.searchFrameworksInCompetencySearch) {
                return "Framework";
            } else {
                return "Competency";
            }
        }
    },
    mounted: function() {
        this.displayFirst.splice(0, this.displayFirst.length);
        this.$store.commit('app/searchTerm', "");
        if (!this.copyOrLink && this.searchType === "Competency" && this.framework.competency) {
            for (var i = 0; i < this.framework.competency.length; i++) {
                if (this.framework.competency[i] !== this.selectedCompetency.shortId()) {
                    if (!this.idsNotPermittedInSearch || this.idsNotPermittedInSearch.length === 0 || !EcArray.has(this.idsNotPermittedInSearch, this.framework.competency[i])) {
                        var comp = EcRepository.getBlocking(this.framework.competency[i]);
                        if (comp) {
                            this.displayFirst.push(comp);
                        }
                    }
                }
            }
        }
        if (this.searchType === "Level" && this.framework.level) {
            for (var i = 0; i < this.framework.level.length; i++) {
                var comp = EcRepository.getBlocking(this.framework.level[i]);
                if (comp) {
                    this.displayFirst.push(comp);
                }
            }
        }
    },
    methods: {
        resetModal: function() {
            this.$store.commit('app/closeModal');
            this.selectedIds = [];
        },
        selectedArrayEvent: function(ary) {
            this.selectedIds = ary;
            if (!this.copyOrLink || this.searchType === "Level") {
                this.$store.commit('editor/selectedCompetenciesAsProperties', this.selectedIds);
            }
            if (this.queryParams.selectRelations === "true" && this.framework.relation) {
                for (var i = 0; i < this.framework.relation.length; i++) {
                    var relation = EcAlignment.getBlocking(this.framework.relation[i]);
                    if (EcArray.has(selectedArray, relation.target)) {
                        if (this.queryParams.selectVerbose === "true") {
                            ary.push(JSON.parse((rld).toJson()));
                        } else {
                            ary.push(relation.shortId());
                        }
                    }
                }
            }
        },
        select: function(competency) {
            if (competency.type === "Framework") {
                return this.selectFramework(competency);
            }
            if (!EcArray.has(this.selectedIds, competency.shortId())) {
                this.selectedIds.push(competency.shortId());
            } else {
                EcArray.setRemove(this.selectedIds, competency.shortId());
            }
            if (!this.copyOrLink || this.searchType === "Level") {
                this.$store.commit('editor/selectedCompetenciesAsProperties', this.selectedIds);
            }
        },
        selectFramework: function(framework) {
            this.selectedFramework = framework;
        },
        addRelations: function() {
            if (this.searchFrameworksInCompetencySearch && this.selectedFramework.relation) {
                for (var i = 0; i < this.selectedFramework.relation.length; i++) {
                    var relation = EcAlignment.getBlocking(this.selectedFramework.relation[i]);
                    if (EcArray.has(this.selectedIds, relation.target) && EcArray.has(this.selectedIds, relation.source)) {
                        this.selectedIds.push(relation.shortId());
                    }
                }
            }
        },
        copyCompetencies: function(results) {
            this.addRelations();
            var copyDict = {};
            var framework = this.$store.state.editor.framework;
            var initialCompetencies = this.framework.competency ? this.framework.competency.slice() : null;
            var initialRelations = this.framework.relation ? this.framework.relation.slice() : null;
            var initialLevels = this.framework.level ? this.framework.level.slice() : null;
            var addedNew = [];
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
                    addedNew.push(c.shortId());
                    c["schema:dateCreated"] = new Date().toISOString();
                    c["schema:dateModified"] = new Date().toISOString();
                    delete c.owner;
                    if (EcIdentityManager.ids.length > 0) {
                        c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
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
                        c = EcEncryptedValue.toEncryptedValue(c);
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
                        level = EcEncryptedValue.toEncryptedValue(level);
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
                        addedNew.push(r.shortId());
                        r["schema:dateCreated"] = new Date().toISOString();

                        r.target = parent.shortId();
                        r.source = child.shortId();
                        r.relationType = thing.relationType;
                        if (EcIdentityManager.ids.length > 0) {
                            r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
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
                                r = EcEncryptedValue.toEncryptedValue(r);
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
                var thing = EcRepository.getBlocking(results[i]);
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
                        if (EcIdentityManager.ids.length > 0) {
                            r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
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
                                r = EcEncryptedValue.toEncryptedValue(r);
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
        afterCopy: function(initialCompetencies, initialRelations, initialLevels, addedNew) {
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
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                this.repo.saveTo(framework, function() {}, appError);
            }
        },
        appendCompetencies: function(results, newLink) {
            this.addRelations();
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
                var thing = EcRepository.getBlocking(results[i]);
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
                var thing = EcRepository.getBlocking(results[i]);
                if (thing.isAny(new EcAlignment().getTypes())) {
                    if (EcArray.has(framework.competency, thing.source)) {
                        if (EcArray.has(framework.competency, thing.target)) {
                            framework.addRelation(thing.shortId());
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
                        addedNew.push(r.shortId());
                        r["schema:dateCreated"] = new Date().toISOString();

                        r.target = selectedCompetency.shortId();
                        r.source = thing.shortId();
                        r.relationType = Relation.NARROWS;
                        if (EcIdentityManager.ids.length > 0) {
                            r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
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
                                r = EcEncryptedValue.toEncryptedValue(r);
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
                framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            this.repo.saveTo(framework, function() {
                me.$store.commit('editor/framework', EcFramework.getBlocking(framework.id));
            }, appError);
        },
        addNewlinesToId: function(pem) {
            // Begin public key line
            pem = pem.substring(0, 26) + "\n" + pem.substring(26);
            var length = pem.length;
            var start = 27;
            while (start + 64 < length) {
                pem = pem.substring(0, start + 64) + "\n" + pem.substring(start + 64);
                start += 65;
                length++;
            }
            // End public key line
            pem = pem.substring(0, length - 24) + "\n" + pem.substring(length - 24);
            return pem;
        }
    },
    watch: {
        sortResults: function() {
            if (this.sortResults.id === "lastEdited") {
                this.sortBy = "schema:dateModified";
                this.displayFirst.splice(0, this.displayFirst.length);
            } else {
                this.sortBy = (this.$store.getters['editor/conceptMode'] === true || this.searchType === "Concept") ? "dcterms:title.keyword" : "name.keyword";
                this.displayFirst.splice(0, this.displayFirst.length);
            }
        },
        filteredQuickFilters: function() {
            this.showMine = false;
            for (var i = 0; i < this.filteredQuickFilters.length; i++) {
                if (this.filteredQuickFilters[i].id === "ownedByMe") {
                    this.showMine = true;
                    this.displayFirst.splice(0, this.displayFirst.length);
                }
            }
        }
    }
};
</script>


<style lang="scss">
    @import '@/scss/frameworks.scss';
.search-modal,
.modal.lode__thing-editing {
    .breadcrumb {
        padding-left: .125rem;
    }
    .lode__type {
        display: none;
    }
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
            padding-top: .5rem;
            background-color: $cass-lightest;
        }
        .list-ul__item {
            margin-top: .25rem;
            border-radius: 3px;
            padding: .5rem;
        }
    }
    .property-section {
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
    }

    .cass--list {
        .list-ul {
            .list-ul__item {
                padding: .5rem .25rem;
                .search-selection__add-icon {
                    visibility: hidden;
                }
                .search-selection__icon,
                .search-selection__add-icon
                {
                    float: right;
                    right: 16px;
                    display: flex;
                    height: 100%;
                    align-content: center;
                    .icon {
                        height: 100%;
                        padding-right: 16px;
                    }
                }
            }
            .list-ul__item:hover {
                background-color: rgba($light, .5);
                .lode__Competency .search-selection__add-icon {
                    visibility: visible !important;
                }
            }
        }
    }

}


</style>