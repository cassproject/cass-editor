<template>
    <div class="List">
        <div
            class="section has-text-centered"
            v-if="firstSearchProcessing">
            <span class="icon is-large">
                <i class="fa fa-spinner fa-2x fa-pulse" />
            </span>
        </div>
        <template>
            <div class="container">
                <ul class="list-ul">
                    <!-- directories -->
                    <li
                        class="list-ul__item"
                        v-for="(item) in directory"
                        :key="item.id"
                        @click="click(item)">
                        <Thing
                            :obj="item"
                            :view="view"
                            class="list-thing"
                            :parentNotEditable="true" />
                        <div
                            v-if="view !== 'search'"
                            class="icon has-text-primary arrow-icon">
                            <i class="fa fa-arrow-right" />
                        </div>
                    </li>
                    <!-- frameworks -->
                    <li
                        class="list-ul__item"
                        v-for="(item) in framework"
                        :key="item.id"
                        @click="click(item)">
                        <Thing
                            :obj="item"
                            :view="view"
                            class="list-thing"
                            :parentNotEditable="true" />
                        <div
                            v-if="view !== 'search'"
                            class="icon has-text-primary arrow-icon">
                            <i class="fa fa-arrow-right" />
                        </div>
                    </li>
                    <!-- After the framework/concept scheme search results, show competencies/concepts -->
                    <li
                        class="list-ul__item"
                        v-for="(item) in competency"
                        :key="item.id"
                        @click="competencyClick(item)">
                        <Breadcrumbs
                            :competency="item"
                            :ref="item.id" />
                        <Thing
                            :obj="item"
                            :view="view"
                            class="list-thing"
                            :parentNotEditable="true" />
                        <div
                            v-if="view !== 'search'"
                            class="icon has-text-primary arrow-icon">
                            <i class="fa fa-arrow-right" />
                        </div>
                    </li>
                    <!-- Resources -->
                    <li>
                        <div
                            v-for="item in creativework"
                            :key="item.id"
                            @click="frameworkClick(item)">
                            {{ item.name }}
                        </div>
                        <div
                            v-if="view !== 'search'"
                            class="icon has-text-primary arrow-icon">
                            <i class="fa fa-arrow-right" />
                        </div>
                    </li>
                </ul>
                <infinite-loading
                    @infinite="loadResults"
                    spinner="circles"
                    v-if="!firstSearchProcessing"
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
import Thing from '@/lode/components/lode/Thing.vue';
import Breadcrumbs from '@/lode/components/lode/Breadcrumbs.vue';
import {cassUtil} from '@/mixins/cassUtil.js';
export default {
    name: 'DirectoryList',
    props: {
        type: String,
        repo: Object,
        click: Function,
        searchOptions: String,
        paramObj: Object,
        view: {
            type: String,
            default: ''
        }
    },
    components: {Thing, Breadcrumbs},
    mixins: [ cassUtil ],
    created: function() {
        this.$nextTick(() => this.searchRepo());
    },
    data: function() {
        return {
            framework: [],
            frameworkStart: 0,
            competency: [],
            competencyStart: 0,
            searchFrameworks: true,
            searchCompetencies: true,
            searchDirectories: true,
            searchResources: true,
            searchingFor: 'Directory',
            applySearchToOwner: false,
            firstSearchProcessing: true,
            // To avoid duplicates
            resultIds: [],
            creativework: [],
            directory: [],
            resourcesStart: 0,
            directoriesStart: 0,
            start: 0
        };
    },
    watch: {
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
            if (this.applySearchTo && this.applySearchTo.length > 0) {
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
                this.searchDirectories = true;
                this.searchResources = true;
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
        }
    },
    computed: {
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
        }
    },
    methods: {
        competencyClick: function(item) {
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
                search = "(@type:" + type + (this.searchTerm != null && this.searchTerm !== "" ? " AND " + this.searchTerm : "") + ")" + (this.searchOptions == null || this.searchOptions === "" ? "" : this.searchOptions);
            } else {
                search = "(@type:" + type + " AND (";
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
                            EcOrganization.search(window.repo, 'name:' + me.searchTerm, function(success) {
                                appLog(success);
                                for (var i = 0; i < success.length; i++) {
                                    search += "\\*owner:\"" + me.getOrganizationEcPk(success[i]).toPem() + "\"";
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
        searchRepo: function() {
            var me = this;
            this.frameworkStart = 0;
            this.competencyStart = 0;
            this.directory.splice(0, this.directory.length);
            this.framework.splice(0, this.framework.length);
            this.competency.splice(0, this.competency.length);
            this.creativework.splice(0, this.creativework.length);
            this.resultIds.splice(0, this.resultIds.length);
            this.searchingFor = 'Directory';
            /* if (this.searchDirectories) {
                this.searchForDirectories();
            } else if (this.searchFrameworks) {
                this.searchForFrameworks();
            } else if (this.searchCompetencies) {
                this.searchForCompetencies();
            } else if (this.searchResources) {
                this.searchForResources();
            } else {
                me.firstSearchProcessing = false;
            } */
            this.loadResults();
        },
        loadResults: function($state) {
            let me = this;
            let localParamObj = Object.assign({}, this.paramObj);
            localParamObj.start = this.start;
            let type = this.searchingFor;
            let arrayType = type.toLowerCase();
            me.buildSearch(type, function(search) {
                me.repo.searchWithParams(search, localParamObj, function(result) {
                    if (!EcArray.has(me.resultIds, result.id)) {
                        me[arrayType].push(result);
                        me.resultIds.push(result.id);
                    }
                }, function(results) {
                    me.firstSearchProcessing = false;
                    if (!me.applySearchTo) {
                        me.buildSearch("EncryptedValue AND \\*encryptedType:" + type, function(search) {
                            me.repo.searchWithParams(search, localParamObj, function(result) {
                                // Decrypt and add to results list
                                var type = "Ec" + result.encryptedType;
                                var v = new EcEncryptedValue();
                                v.copyFrom(result);
                                var obj = new window[type]();
                                obj.copyFrom(v.decryptIntoObject());
                                if (!EcArray.has(me.resultIds, obj.id)) {
                                    me[arrayType].push(obj);
                                    me.resultIds.push(obj.id);
                                }
                            }, function(results2) {
                                me.start += me.paramObj.size;
                                if (results.length < 10) {
                                    me.changeType($state);
                                } else if (results.length > 0 && $state) {
                                    $state.loaded();
                                } else if ($state) {
                                    $state.complete();
                                }
                            }, appError);
                        });
                    } else {
                        me.start += me.paramObj.size;
                        if (results.length < 10) {
                            me.changeType($state);
                        } else if (results.length > 0 && $state) {
                            $state.loaded();
                        } else if ($state) {
                            $state.complete();
                        }
                    }
                }, function(err) {
                    appError(err);
                    me.firstSearchProcessing = false;
                });
            });
        },
        changeType: function($state) {
            this.start = 0;
            if (this.searchingFor === "Directory") {
                this.searchingFor = "Framework";
            } else if (this.searchingFor === "Framework") {
                this.searchingFor = "Competency";
            } else if (this.searchingFor === "Competency") {
                this.searchingFor = "CreativeWork";
            } else if ($state) {
                return $state.complete();
            } else {
                return;
            }
            this.loadResults($state);
        }
    }
};
</script>
