<template>
    <div
        class="cass--list--container"
        :class="parent">
        <div
            class="section has-text-centered"
            v-if="firstSearchProcessing">
            <span class="icon is-large">
                <i class="fa fa-spinner fa-2x fa-pulse" />
            </span>
        </div>
        <template>
            <div class="container is-desktop">
                <ul class="cass--list">
                    <li
                        class="cass--list--item"
                        v-for="(item) in results"
                        :key="item.id"
                        :class="[
                            {'source-framework': crosswalkAlignmentSource && item.id === crosswalkAlignmentSource.id},
                            rightAsideObjectId && rightAsideObjectId === item.shortId() ? 'cass--list--item--selected' : '']"
                        @click="click(item)">
                        <div class="cass--list-item--icon">
                            <div class="cass--list-item--icon-wrap has-background-dark">
                                <span class="icon">
                                    <i
                                        title="Directory"
                                        v-if="item.type === 'Directory'"
                                        class="fa fa-folder" />
                                    <i
                                        title="Framework"
                                        v-else-if="item.type === 'Framework'"
                                        class="fa fa-file-alt" />
                                    <i
                                        title="Competency"
                                        v-else-if="item.type === 'Competency'"
                                        class="fa fa-list-alt" />
                                    <i
                                        title="Concept Scheme"
                                        v-else-if="item.type === 'ConceptScheme'"
                                        class="fa fa-book" />
                                </span>
                            </div>
                        </div>
                        <div
                            class="cass--list-item--content">
                            <Breadcrumbs
                                v-if="selectingCompetency || item.parentDirectory"
                                :competency="item" />
                            <Thing
                                :parent="parent"
                                :obj="item"
                                @dblclick.native="$emit('dblclick', item)"
                                :view="view"
                                :profile="profile"
                                class="cass--list--thing"
                                :parentNotEditable="disallowEdits">
                                <template #frameworkTags>
                                    <slot
                                        name="frameworkTags"
                                        :item="item" />
                                </template>
                            </Thing>
                        </div>
                        <div class="cass--list-item--hover">
                            <span
                                class="search-selection__icon"
                                v-if="selectingCompetency && isClicked(item.shortId()) && view === 'search'">
                                <div class="icon is-primary is-small">
                                    <i
                                        class="fa fa-check has-text-primary"
                                        aria-hidden="true" />
                                </div>
                            </span>
                            <span
                                class="search-selection__add-icon"
                                v-else-if="view === 'search'&& view !== 'crosswalk'">
                                <div class="icon is-primary is-small">
                                    <i
                                        class="fa fa-plus has-text-primary"
                                        aria-hidden="true" />
                                </div>
                            </span>
                            <div
                                v-if="view !== 'search'"
                                class="icon has-text-primary arrow-icon">
                                <i class="fa fa-arrow-right" />
                            </div>
                        </div>
                    </li>
                    <!-- After the framework/concept scheme search results, show competencies/concepts -->
                    <li
                        class="cass--list--item"
                        :class="rightAsideObjectId && rightAsideObjectId === item.shortId() ? 'cass-list-item--selected' : ''"
                        v-for="(item) in subResults"
                        :key="item.id"
                        @click="subObjectClick(item)">
                        <div class="cass--list-item--icon">
                            <div class="cass--list-item--icon-wrap has-background-dark">
                                <span class="icon">
                                    <i
                                        title="Directory"
                                        v-if="item.type === 'Directory'"
                                        class="fa fa-folder" />
                                    <i
                                        title="Framework"
                                        v-else-if="item.type === 'Framework'"
                                        class="fa fa-file-alt" />
                                    <i
                                        title="Competency"
                                        v-else-if="item.type === 'Competency'"
                                        class="fa fa-list-alt" />
                                    <i
                                        title="Concept Scheme"
                                        v-else-if="item.type === 'Concept'"
                                        class="fa fa-book" />
                                </span>
                            </div>
                        </div>
                        <div
                            class="cass--list-item--content">
                            <Breadcrumbs
                                :competency="item"
                                :ref="item.id" />
                            <Thing
                                :obj="item"
                                @dblclick.native="$emit('dblclick', item)"
                                :view="view"
                                :profile="profile"
                                class="list-thing"
                                :parentNotEditable="disallowEdits" />
                        </div>
                        <div class="cass--list-item--hover">
                            <div
                                v-if="view !== 'search'"
                                class="icon has-text-primary arrow-icon">
                                <i class="fa fa-arrow-right" />
                            </div>
                        </div>
                    </li>
                </ul>
                <infinite-loading
                    @infinite="loadMore"
                    spinner="circles"
                    v-if="results.length > 0"
                    :distance="10">
                    <div slot="no-more">
                        All results loaded
                    </div>
                    <div slot="no-results">
                        All results loaded
                    </div>
                </infinite-loading>
            </div>
        </template>
    </div>
</template>

<script>
import Thing from './Thing.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import {cassUtil} from '@/mixins/cassUtil.js';
export default {
    name: 'List',
    props: {
        parent: {
            type: String,
            default: ''
        },
        type: String,
        repo: Object,
        profile: Object,
        click: Function,
        searchOptions: String,
        paramObj: Object,
        disallowEdits: Boolean,
        selectingCompetency: Boolean,
        selected: Array,
        displayFirst: Array,
        view: {
            type: String,
            default: ''
        },
        filterToEditable: {
            type: Boolean,
            default: false
        },
        idsNotPermittedInSearch: {
            type: Array,
            default: null
        }
    },
    components: {Thing, Breadcrumbs},
    mixins: [ cassUtil ],
    created: function() {
        this.$nextTick(() => this.searchRepo());
    },
    data: function() {
        return {
            results: [],
            start: 0,
            subResults: [],
            subStart: 0,
            searchFrameworks: true,
            searchCompetencies: true,
            searchDirectories: false,
            searchingForCompetencies: false,
            searchingForDirectories: false,
            applySearchToOwner: false,
            firstSearchProcessing: true,
            // To avoid duplicates
            resultIds: [],
            nonDirectoryResults: false
        };
    },
    watch: {
        text: function(newValue, oldValue) {
        },
        paramObj: function() {
            this.searchRepo();
        },
        searchOptions: function() {
            this.searchRepo();
        },
        searchTerm: function(val) {
            this.searchRepo();
        },
        applySearchTo: function() {
            this.applySearchToOwner = false;
            // Set which objects to search
            if (this.view === 'crosswalk') {
                this.searchFrameworks = true;
                this.searchCompetencies = false;
                this.searchDirectories = false;
            } else if (this.applySearchTo && this.applySearchTo.length > 0) {
                this.searchFrameworks = false;
                this.searchCompetencies = false;
                this.searchDirectories = false;
                for (let i = 0; i < this.applySearchTo.length; i++) {
                    if (this.applySearchTo[i].id === "frameworkName" || this.applySearchTo[i].id === "frameworkDescription") {
                        this.searchFrameworks = true;
                    } else if (this.applySearchTo[i].id === "competencyName" || this.applySearchTo[i].id === "competencyDescription" || this.applySearchTo[i].id === "competencyLabel") {
                        this.searchCompetencies = true;
                    } else if (this.applySearchTo[i].id === "ownerName") {
                        this.searchFrameworks = true;
                        this.searchCompetencies = true;
                        this.applySearchToOwner = true;
                    } else if (this.applySearchTo[i].id === "directoryName" || this.applySearchTo[i].id === "directoryDescription") {
                        this.searchDirectories = true;
                    } else {
                        // Any other property comes from framework config
                        this.searchFrameworks = true;
                    }
                }
            } else {
                this.searchFrameworks = true;
                this.searchCompetencies = true;
                if (this.type === "Framework") {
                    this.searchDirectories = true;
                } else {
                    this.searchDirectories = false;
                }
            }
            this.searchRepo();
        },
        type: function() {
            this.searchRepo();
        },
        refreshSearch: function() {
            if (this.refreshSearch) {
                this.searchRepo();
                this.$store.commit('app/refreshSearch', false);
            }
        },
        timeOffset: function() {
            this.searchRepo();
        },
        numIdentities: function() {
            this.searchRepo();
        }
    },
    computed: {
        crosswalkAlignmentSource: function() {
            return this.$store.getters['crosswalk/frameworkSource'];
        },
        searchTerm: function(val) {
            return this.$store.getters['app/searchTerm'];
        },
        refreshSearch: function(val) {
            return this.$store.getters['app/refreshSearch'];
        },
        applySearchTo: function() {
            let options = this.$store.getters['app/applySearchTo'];
            if (!options) return null;
            let filterValues = options.filter(item => item.checked === true);
            if (filterValues.length <= 0) return null;
            return filterValues;
        },
        rightAsideObjectId: function() {
            if (this.$store.getters['app/rightAsideObject']) {
                return this.$store.getters['app/rightAsideObject'].shortId();
            }
            return null;
        },
        timeOffset: function() {
            return this.repo.timeOffset;
        },
        numIdentities: function() {
            return EcIdentityManager.default.ids?.length;
        }
    },
    methods: {
        subObjectClick: function(item) {
            // Access framework from breadcrumbs instead of re-searching
            var frameworks = this.$refs[item.id][0].frameworks;
            if (frameworks.length > 0) {
                this.click(frameworks[0]);
            } else {
                var modalObject = {
                    component: 'Single',
                    uri: item.id,
                    type: item.type,
                    objectType: item.type,
                    parentName: null,
                    canEdit: false
                };
                this.$store.commit('app/showModal', modalObject);
            }
        },
        buildSearch: function(type, callback) {
            var search = "";
            // Used to only add OR to query if there's already a term
            var termAdded = false;
            if (!this.applySearchTo || this.searchTerm === "") {
                search = "((@type:" + type + " OR (EncryptedValue AND \\*encryptedType:" + type + "))" + (this.searchTerm != null && this.searchTerm !== "" ? " AND " + this.searchTerm : "") + ")" + (this.searchOptions == null || this.searchOptions === "" ? "" : this.searchOptions);
            } else {
                search = "((@type:" + type + " OR (EncryptedValue AND \\*encryptedType:" + type + "))" + " AND (";
                for (let i = 0; i < this.applySearchTo.length; i++) {
                    if ((type === "Framework" && this.applySearchTo[i].id === "frameworkName") ||
                    (type === "Competency" && this.applySearchTo[i].id === "competencyName") ||
                    (type === "Directory" && this.applySearchTo[i].id === "directoryName")) {
                        if (termAdded) {
                            search += " OR ";
                        }
                        search += ("name:" + this.searchTerm);
                        termAdded = true;
                    } else if ((type === "Framework" && this.applySearchTo[i].id === "frameworkDescription") ||
                    (type === "Competency" && this.applySearchTo[i].id === "competencyDescription") ||
                    (type === "Directory" && this.applySearchTo[i].id === "directoryDescription")) {
                        if (termAdded) {
                            search += " OR ";
                        }
                        search += ("description:" + this.searchTerm);
                        termAdded = true;
                    } else if (this.applySearchTo[i].id === "ownerName") {
                        let paramObj = {};
                        paramObj.size = 10;
                        let me = this;
                        EcPerson.search(window.repo, 'name:' + this.searchTerm, function(success) {
                            if (termAdded && success.length > 0) {
                                search += " OR ";
                            }
                            appLog(success);
                            for (var i = 0; i < success.length; i++) {
                                search += "\\*owner:\"" + me.getPersonEcPk(success[i]).toPem() + "\"";
                                if (i < success.length - 1) {
                                    search += " OR ";
                                }
                            }
                            EcOrganization.search(window.repo, 'name:' + me.searchTerm, async function(success) {
                                appLog(success);
                                for (var i = 0; i < success.length; i++) {
                                    search += "\\*owner:\"" + (await me.getOrganizationEcPk(success[i])).toPem() + "\"";
                                    termAdded = true;
                                    if (i < success.length - 1) {
                                        search += " OR ";
                                    }
                                }
                                search += "))" + (me.searchOptions == null ? "" : me.searchOptions);
                                if (search.indexOf("AND ())") !== -1) {
                                    search = null;
                                }
                                callback(search);
                            }, function(failure) {
                                appError(failure);
                                callback(null);
                            }, paramObj);
                        }, function(failure) {
                            appError(failure);
                            callback(null);
                        }, paramObj);
                    } else if (type === "Framework") {
                        if (termAdded) {
                            search += " OR ";
                        }
                        // Other framework property from config
                        search += (this.applySearchTo[i].id + ":" + this.searchTerm);
                        termAdded = true;
                    } else if (type === "Competency" && this.applySearchTo[i].id === "competencyLabel") {
                        if (termAdded) {
                            search += " OR ";
                        }
                        search += ("ceasn\\:competencyLabel:" + this.searchTerm);
                        termAdded = true;
                    }
                }
                if (!this.applySearchToOwner) {
                    search += "))" + (this.searchOptions == null ? "" : this.searchOptions);
                }
            }
            if (!this.applySearchToOwner) {
                callback(search);
            }
        },
        searchForDirectories: function($state) {
            let me = this;
            this.searchingForDirectories = true;
            me.buildSearch("Directory", function(search) {
                var paramObj = null;
                if (me.paramObj) {
                    paramObj = Object.assign({}, me.paramObj);
                }
                if (!me.firstSearchProcessing) {
                    me.start += me.paramObj.size;
                }
                paramObj.start = me.start;
                let directories = [];
                me.repo.searchWithParams(search, paramObj, null, async function(results) {
                    for (let result of results) {
                        if (!me.filterToEditable || (me.filterToEditable && result.canEditAny(EcIdentityManager.default.getMyPks()))) {
                            if (!EcArray.has(me.resultIds, result.id)) {
                                if (!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId())) {
                                    // Don't show subdirectories unless searching
                                    if (!result.parentDirectory || me.searchTerm !== "") {
                                        if (result.isAny(new EcEncryptedValue().getTypes())) {
                                            // Decrypt and add to results list
                                            var type = "Ec" + result.encryptedType;
                                            var v = new EcEncryptedValue();
                                            v.copyFrom(result);
                                            let obj = new window[type]();
                                            obj.copyFrom(await v.decryptIntoObject());
                                            result = obj;
                                        }
                                        directories.push(result);
                                        me.resultIds.push(result.id);
                                    }
                                }
                            }
                        }
                    }
                    me.firstSearchProcessing = false;
                    if (directories && directories.length > 0) {
                        me.results = me.results.concat(directories);
                        if ($state) {
                            $state.loaded();
                        }
                    } else if (results.length === 0) {
                        me.searchingForDirectories = false;
                        me.start = 0;
                        me.loadMore($state);
                    } else if (results.length > 0 && $state) {
                        // $state references are for vue-infinite-loading component
                        $state.loaded();
                    } else if ($state) {
                        $state.complete();
                    }
                }, function(err) {
                    appError(err);
                    me.firstSearchProcessing = false;
                    if ($state) {
                        $state.complete();
                    }
                });
            });
        },
        searchRepo: function() {
            var me = this;
            this.start = 0;
            this.subStart = 0;
            this.firstSearchProcessing = true;
            this.results.splice(0, this.results.length);
            this.subResults.splice(0, this.subResults.length);
            this.resultIds.splice(0, this.resultIds.length);
            this.searchingForCompetencies = false;
            this.nonDirectoryResults = false;
            if (!this.applySearchTo) {
                if (this.view === 'frameworks' && this.type === "Framework") {
                    this.searchDirectories = true;
                } else {
                    this.searchDirectories = false;
                }
            }
            if (this.searchTerm === "" && this.displayFirst && this.displayFirst.length > 0) {
                for (var i = 0; i < 20; i++) {
                    if (this.displayFirst[0]) {
                        this.results.push(this.displayFirst[0]);
                        this.resultIds.push(this.displayFirst[0].id);
                        this.displayFirst.shift();
                        this.nonDirectoryResults = true;
                    }
                }
            }
            if (this.searchDirectories === true) {
                this.searchForDirectories();
            } else if (this.searchFrameworks && (this.searchTerm !== "" || !this.displayFirst || this.displayFirst.length === 0)) {
                me.buildSearch(this.type, function(search) {
                    var paramObj = null;
                    if (me.paramObj) {
                        paramObj = Object.assign({}, me.paramObj);
                    }
                    me.repo.searchWithParams(search, paramObj, async function(result) {
                        if (!me.filterToEditable || (me.filterToEditable && result.canEditAny(EcIdentityManager.default.getMyPks()))) {
                            if (!EcArray.has(me.resultIds, result.id)) {
                                me.resultIds.push(result.id);
                                if (!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId())) {
                                    if (result.isAny(new EcEncryptedValue().getTypes())) {
                                        // Decrypt and add to results list
                                        var type = "Ec" + result.encryptedType;
                                        var v = new EcEncryptedValue();
                                        v.copyFrom(result);
                                        let obj = new window[type]();
                                        obj.copyFrom(await v.decryptIntoObject());
                                        result = obj;
                                    }
                                    if (result.name !== '' || result['dcterms:title'] !== '') {
                                        me.results.push(result);
                                        me.nonDirectoryResults = true;
                                    }
                                }
                            }
                        }
                    }, function(results) {
                        me.firstSearchProcessing = false;
                        if (results.length < 10 && (me.type === "Framework" || me.type === "ConceptScheme")) {
                            if (me.searchCompetencies) {
                                me.searchForSubObjects();
                            }
                        }
                    }, function(err) {
                        appError(err);
                        me.firstSearchProcessing = false;
                    });
                });
            } else {
                me.firstSearchProcessing = false;
            }
            if (!this.searchFrameworks && !this.searchDirectories && (this.searchTerm !== "" || !this.displayFirst || this.displayFirst.length === 0)) {
                // Only competency fields were selected
                return this.searchForSubObjects();
            }
        },
        loadMore: function($state) {
            if (this.searchTerm === "" && this.displayFirst && this.displayFirst.length > 0) {
                for (var i = 0; i < 20; i++) {
                    if (this.displayFirst[i]) {
                        this.results.push(this.displayFirst[i]);
                        this.resultIds.push(this.displayFirst[i].id);
                        this.displayFirst.shift();
                    }
                }
            }
            if (this.searchingForDirectories) {
                this.searchForDirectories($state);
            } else if (this.paramObj && (this.searchTerm !== "" || !this.displayFirst || this.displayFirst.length === 0)) {
                var me = this;
                var localParamObj = Object.assign({}, this.paramObj);
                if (me.nonDirectoryResults) {
                    this.start += this.paramObj.size;
                }
                localParamObj.start = this.start;
                // If we've started loading competencies and reach scroll point, load more
                var type;
                if (this.searchingForCompetencies) {
                    if (this.type === "ConceptScheme") {
                        type = "Concept";
                    } else {
                        type = "Competency";
                    }
                } else {
                    type = this.type;
                }
                this.buildSearch(type, function(search) {
                    me.repo.searchWithParams(search, localParamObj, async function(result) {
                        if (!me.filterToEditable || (me.filterToEditable && result.canEditAny(EcIdentityManager.default.getMyPks()))) {
                            if (me.searchingForCompetencies) {
                                if (!EcArray.has(me.resultIds, result.id)) {
                                    if (!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId())) {
                                        if (result.isAny(new EcEncryptedValue().getTypes())) {
                                            // Decrypt and add to results list
                                            var objType = "Ec" + result.encryptedType;
                                            var v = new EcEncryptedValue();
                                            v.copyFrom(result);
                                            let obj = new window[objType]();
                                            obj.copyFrom(await v.decryptIntoObject());
                                            result = obj;
                                        }
                                        me.subResults.push(result);
                                        me.resultIds.push(result.id);
                                    }
                                }
                            } else {
                                if (!EcArray.has(me.resultIds, result.id)) {
                                    if (!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, result.shortId())) {
                                        if (result.isAny(new EcEncryptedValue().getTypes())) {
                                            // Decrypt and add to results list
                                            var objType = "Ec" + result.encryptedType;
                                            var v = new EcEncryptedValue();
                                            v.copyFrom(result);
                                            let obj = new window[objType]();
                                            obj.copyFrom(await v.decryptIntoObject());
                                            result = obj;
                                        }
                                        me.results.push(result);
                                        me.resultIds.push(result.id);
                                    }
                                }
                            }
                        }
                    }, function(results) {
                        if (results.length === 0 && (me.type === "Framework" || me.type === "ConceptScheme")) {
                            if (me.searchCompetencies) {
                                me.searchForSubObjects($state);
                            } else if ($state) {
                                $state.complete();
                            }
                        } else if (results.length > 0) {
                            me.nonDirectoryResults = true;
                            // $state references are for vue-infinite-loading component
                            if ($state) {
                                $state.loaded();
                            }
                        } else if ($state) {
                            $state.complete();
                        }
                    }, function(err) {
                        appError(err);
                        $state.complete();
                    });
                });
            } else {
                $state.loaded();
            }
        },
        searchForSubObjects: function($state) {
            var me = this;
            this.searchingForCompetencies = true;
            var subLocalParamObj = Object.assign({}, me.paramObj);
            subLocalParamObj.start = me.subStart;
            if (subLocalParamObj.sort.indexOf("dcterms:title") !== -1) {
                subLocalParamObj.sort = subLocalParamObj.sort.replace('dcterms:title', 'skos:prefLabel');
            }
            var type = me.type === "Framework" ? "Competency" : "Concept";
            me.buildSearch(type, function(subSearch) {
                me.repo.searchWithParams(subSearch, subLocalParamObj, async function(subResult) {
                    if (!me.filterToEditable || (me.filterToEditable && subResult.canEditAny(EcIdentityManager.default.getMyPks()))) {
                        if (!EcArray.has(me.resultIds, subResult.id)) {
                            if (!me.idsNotPermittedInSearch || me.idsNotPermittedInSearch.length === 0 || !EcArray.has(me.idsNotPermittedInSearch, subResult.shortId())) {
                                if (subResult.isAny(new EcEncryptedValue().getTypes())) {
                                    // Decrypt and add to results list
                                    var objType = "Ec" + subResult.encryptedType;
                                    var v = new EcEncryptedValue();
                                    v.copyFrom(subResult);
                                    let obj = new window[objType]();
                                    obj.copyFrom(await v.decryptIntoObject());
                                    subResult = obj;
                                }
                                me.subResults.push(subResult);
                                me.resultIds.push(subResult.id);
                                me.nonDirectoryResults = true;
                            }
                        }
                    }
                }, function(subResults) {
                    if (subResults.length > 0 && $state) {
                        $state.loaded();
                    } else if ($state) {
                        $state.complete();
                    }
                    me.subStart += me.paramObj.size;
                }, function(err) {
                    appError(err);
                    if ($state) {
                        $state.complete();
                    }
                });
            });
        },
        isClicked: function(id) {
            if (EcArray.has(this.selected, id)) {
                return true;
            } else {
                return false;
            }
        }
    },
    mounted: function() {
        if (this.view === 'crosswalk') {
            this.searchFrameworks = true;
            this.searchCompetencies = false;
            this.searchDirectories = false;
        }
    }
};
</script>

<style lang="scss">
</style>