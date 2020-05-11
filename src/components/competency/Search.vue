<!--
This component is displays a ui for searchin for compencies and selecting them
this component can be dropped into a card element such as DynamicModel.vue
with some adjustments to the modal-card classes to just card, this could be
placed anywhere in a structured html element such as a <section> or a <div>
-->
<template>
    <div class="search-modal modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title">
                <span class="title has-text-white">Search for {{ searchType }}</span>
                <br><span
                    class="subtitle has-text-white"
                    v-if="copyOrLink">
                    Sharing settings for {{ frameworkName }}
                </span>
                <span
                    v-else
                    class="subtitle has-text-white">
                    {{ nameOfSelectedCompetency }}
                </span>
            </p>
            <button
                class="delete"
                @click="resetModal();"
                aria-label="close" />
        </header>
        <section class="modal-card-body">
            <div class="column is-12">
                <SearchBar searchType="competency" />
            </div>
            <div class="column is-12">
                <List
                    v-if="$store.state.lode.competencySearchModalOpen"
                    :type="searchType"
                    :repo="repo"
                    :click="select"
                    :searchOptions="searchOptions"
                    :paramObj="paramObj"
                    :disallowEdits="true"
                    :selectingCompetency="true"
                    :selected="selectedIds"
                    :displayFirst="displayFirst" />
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
                        Copy {{ searchType }}
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
                        Link {{ searchType }}
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
</template>

<script>
import List from '@/lode/components/lode/List.vue';
import common from '@/mixins/common.js';
import {mapState} from 'vuex';
import SearchBar from '@/components/framework/SearchBar.vue';
export default {
    name: 'CompetencySearch',
    props: {
        isActive: Boolean
    },
    components: {List, SearchBar},
    mixins: [common],
    data() {
        return {
            repo: window.repo,
            selectedIds: [],
            itemsSaving: 0,
            displayFirst: []
        };
    },
    computed: {
        ...mapState({
            selectedCompetency: state => state.editor.selectedCompetency,
            framework: state => state.editor.framework,
            queryParams: state => state.editor.queryParams
        }),
        nameOfSelectedCompetency: function() {
            if (this.selectedCompetency) {
                return this.selectedCompetency.getName();
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
        },
        searchType: function() {
            return this.$store.state.lode.searchType;
        }
    },
    mounted: function() {
        this.displayFirst.splice(0, this.displayFirst.length);
        if (!this.copyOrLink && this.searchType === "Competency" && this.framework.competency) {
            for (var i = 0; i < this.framework.competency.length; i++) {
                var comp = EcRepository.getBlocking(this.framework.competency[i]);
                if (comp) {
                    this.displayFirst.push(comp);
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
                    if (this.$store.state.editor && this.$store.state.editor.configuration) {
                        var config = this.$store.state.editor.configuration;
                        if (config["defaultObjectOwners"]) {
                            for (var k = 0; k < config["defaultObjectOwners"].length; k++) {
                                c.addOwner(EcPk.fromPem(config["defaultObjectOwners"][k]));
                            }
                        }
                        if (config["defaultObjectReaders"]) {
                            for (var k = 0; k < config["defaultObjectReaders"].length; k++) {
                                c.addReader(EcPk.fromPem(config["defaultObjectReaders"][k]));
                            }
                        }
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
                                framework.addCompetency(c.shortId());
                                me.$store.commit('editor/framework', framework);
                                me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                                callback();
                            }, function(error) {
                                console.error(error);
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
                    copyDict[level['ceasn:derivedFrom']] = level;
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
                                console.error(error);
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
                        if (this.$store.state.editor && this.$store.state.editor.configuration) {
                            var config = this.$store.state.editor.configuration;
                            if (config["defaultObjectOwners"]) {
                                for (var k = 0; k < config["defaultObjectOwners"].length; k++) {
                                    r.addOwner(EcPk.fromPem(config["defaultObjectOwners"][k]));
                                }
                            }
                            if (config["defaultObjectReaders"]) {
                                for (var k = 0; k < config["defaultObjectReaders"].length; k++) {
                                    r.addReader(EcPk.fromPem(config["defaultObjectReaders"][k]));
                                }
                            }
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
                                        me.afterCopy(initialCompetencies, initialRelations, initialLevels, addedNew);
                                        callback();
                                    },
                                    function(error) {
                                        console.error(error);
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

                        var child = copyDict[thing.id];

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
                        if (this.$store.state.editor && this.$store.state.editor.configuration) {
                            var config = this.$store.state.editor.configuration;
                            if (config["defaultObjectOwners"]) {
                                for (var k = 0; k < config["defaultObjectOwners"].length; k++) {
                                    r.addOwner(EcPk.fromPem(config["defaultObjectOwners"][k]));
                                }
                            }
                            if (config["defaultObjectReaders"]) {
                                for (var k = 0; k < config["defaultObjectReaders"].length; k++) {
                                    r.addReader(EcPk.fromPem(config["defaultObjectReaders"][k]));
                                }
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
                                        console.error(error);
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
                        if (framework.owner && framework.owner.length > 0) {
                            for (var j = 0; j < framework.owner.length; j++) {
                                var owner = framework.owner[j];
                                r.addOwner(EcPk.fromPem(owner));
                            }
                        }
                        if (this.$store.state.editor && this.$store.state.editor.configuration) {
                            var config = this.$store.state.editor.configuration;
                            if (config["defaultObjectOwners"]) {
                                for (var k = 0; k < config["defaultObjectOwners"].length; k++) {
                                    r.addOwner(EcPk.fromPem(config["defaultObjectOwners"][k]));
                                }
                            }
                            if (config["defaultObjectReaders"]) {
                                for (var k = 0; k < config["defaultObjectReaders"].length; k++) {
                                    r.addReader(EcPk.fromPem(config["defaultObjectReaders"][k]));
                                }
                            }
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
        attachUrlProperties: function(results) {
            var resource = this.$store.state.editor.framework;
            if (this.$store.state.editor.selectedCompetency != null) {
                resource = this.$store.state.editor.selectedCompetency;
            }
            for (var i = 0; i < results.length; i++) {
                var thing = EcRepository.getBlocking(results[i]);
                if (thing.isAny(new EcConcept().getTypes())) {
                    if (!EcArray.isArray(resource[this.$store.state.editor.selectCompetencyRelation])) {
                        resource[this.$store.state.editor.selectCompetencyRelation] = [];
                    }
                    EcArray.setAdd(resource[this.$store.state.editor.selectCompetencyRelation], thing.shortId());
                }
            }
            resource["schema:dateModified"] = new Date().toISOString();
            if (this.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[resource.id] !== true) {
                resource = EcEncryptedValue.toEncryptedValue(resource);
            }
            this.repo.saveTo(resource, function() {}, console.error);
        },
        addSelected: function(ids) {
            if (this.searchType === "Competency") {
                this.addAlignments(ids, this.$store.state.editor.selectedCompetency, this.$store.state.editor.selectCompetencyRelation);
            } else {
                this.attachUrlProperties(ids);
            }
        }
    }
};
</script>


<style lang="scss">
    @import '@/scss/frameworks.scss';
.search-modal {
    max-height: 100%;
    min-height: 600px;
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