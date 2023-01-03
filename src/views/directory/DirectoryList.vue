<template>
    <div
        id="directoryList">
        <div
            class="section has-text-centered"
            v-if="firstSearchProcessing">
            <span class="icon is-large">
                <i class="fa fa-spinner fa-2x fa-pulse" />
            </span>
        </div>
        <template>
            <div class="container is-fluid">
                <div class="cass--list--container">
                    <ul class="cass--list">
                        <!-- directories -->
                        <li v-if="!firstSearchProcessing"
                            class="cass--list--item no-results">No results found</li>
                        <li
                            class="cass--list--item "
                            :class="rightAsideObjectId && rightAsideObjectId === item.shortId() ? 'cass--list--item--selected' : ''"
                            v-for="(item) in directory"
                            :key="item.id"
                            @click="click(item)">
                            <div class="cass--list-item--icon">
                                <div class="cass--list-item--icon-wrap has-background-dark">
                                    <span class="icon">
                                        <i
                                            class="fa fa-folder" />
                                    </span>
                                </div>
                            </div>
                            <div
                                class="cass--list-item--content">
                                <Breadcrumbs
                                    v-if="searchTerm"
                                    :competency="item"
                                    :ref="item.id" />
                                <Thing
                                    :obj="item"
                                    @dblclick.native="$emit('dblclick', item)"
                                    :view="view"
                                    class="list-thing list-ul__item--directory"
                                    :parentNotEditable="true" />
                            </div>
                            <div class="cass--list-item--hover">
                                <div
                                    v-if="view !== 'search'"
                                    class="icon has-text-primary arrow-icon">
                                    <i class="fa fa-arrow-right" />
                                </div>
                            </div>
                        </li>
                        <!-- frameworks -->
                        <li
                            class="cass--list--item "
                            :class="rightAsideObjectId && rightAsideObjectId === item.shortId() ? 'cass--list--item--selected' : ''"
                            v-for="(item) in framework"
                            :key="item.id"
                            @click="click(item)">
                            <div class="cass--list-item--icon">
                                <div class="cass--list-item--icon-wrap has-background-dark has-text-white">
                                    <span class="icon">
                                        <i
                                            title="Framework"
                                            class="fa fa-file-alt" />
                                    </span>
                                </div>
                            </div>
                            <div
                                class="cass--list-item--content">
                                <Breadcrumbs
                                    v-if="searchTerm"
                                    :competency="item"
                                    :ref="item.id" />
                                <Thing
                                    :obj="item"
                                    @dblclick.native="$emit('dblclick', item)"
                                    :view="view"
                                    class="list-thing list-ul__item--framework"
                                    :parentNotEditable="true" />
                            </div>
                            <div class="cass--list-item--hover">
                                <div
                                    v-if="view !== 'search'"
                                    class="icon has-text-primary arrow-icon">
                                    <i class="fa fa-arrow-right" />
                                </div>
                            </div>
                        </li>
                        <!-- After the framework/concept scheme search results, show competencies/concepts -->
                        <li
                            class="cass--list--item "
                            :class="rightAsideObjectId && rightAsideObjectId === item.shortId() ? 'cass--list--item--selected' : ''"
                            v-for="(item) in competency"
                            :key="item.id"
                            @click="competencyClick(item)">
                            <div class="cass--list-item--icon">
                                <div class="cass--list-item--icon-wrap has-background-dark has-text-white">
                                    <span class="icon">
                                        <i
                                            title="Competency"
                                            class="fa fa-list-alt" />
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
                                    class="list-thing list-ul__item--object"
                                    :parentNotEditable="true" />
                            </div>
                            <div class="cass--list-item--hover">
                                <div
                                    v-if="view !== 'search'"
                                    class="icon has-text-primary arrow-icon">
                                    <i class="fa fa-arrow-right" />
                                </div>
                            </div>
                        </li>
                        <!-- Resources -->
                        <li
                            v-for="item in creativework"
                            @dblclick="$emit('dblclick', item)"
                            :key="item.id"
                            @click="click(item)"
                            class="cass--list--item">
                            <div class="cass--list-item--icon">
                                <div class="cass--list-item--icon-wrap has-background-dark">
                                    <i class="fa fa-paperclip" />
                                </div>
                            </div>
                            <div
                                class="cass--list-item--content"
                                :class="rightAsideObjectId && rightAsideObjectId === item.shortId() ? 'cass-list-item--selected' : ''">
                                <div
                                    class="list-ul__item--resource">
                                    {{ item.name }}
                                </div>
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
                        @infinite="loadResults"
                        spinner="circles"
                        v-if="(directory.length + framework.length + competency.length + creativework.length > 10)"
                        :distance="10">
                        <div slot="no-more">
                            All results loaded
                        </div>
                        <div slot="no-results">
                            All results loaded
                        </div>
                    </infinite-loading>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Thing from '@/lode/components/Thing.vue';
import Breadcrumbs from '@/lode/components/Breadcrumbs.vue';
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
        },
        directoryId: String,
        directoryObj: Object
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
            start: 0,
            directoryIdList: []
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
        },
        directoryId: function() {
            this.searchRepo();
        },
        searchingInDirectory: function() {
            this.searchRepo();
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
        },
        searchingInDirectory: function() {
            return this.$store.getters['app/searchingInDirectory'];
        },
        rightAsideObjectId: function() {
            if (this.$store.getters['app/rightAsideObject']) {
                return this.$store.getters['app/rightAsideObject'].shortId();
            }
            return null;
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
        buildIdList: function(success) {
            let me = this;
            if (!this.searchingInDirectory) {
                success("");
            } else if (this.searchTerm === "" || this.searchingFor === "CreativeWork") {
                success(" AND (directory:\"" + this.directoryId + "\" OR parentDirectory:\"" + this.directoryId + "\")");
            } else if (this.searchingFor === "Directory" || this.searchingFor === "Framework") {
                this.directoryIdList.splice(0, this.directoryIdList.length);
                let list = " AND (directory:\"" + this.directoryId + "\" OR parentDirectory:\"" + this.directoryId + "\"";
                this.getSubDirectoryIds(this.directoryId, function() {
                    if (me.directoryIdList.length > 0) {
                        for (let i in me.directoryIdList) {
                            list += (" OR directory:\"" + me.directoryIdList[i] + "\" OR parentDirectory:\"" + me.directoryIdList[i] + "\"");
                        }
                        list += ")";
                        success(list);
                    } else {
                        list += ")";
                        success(list);
                    }
                });
            } else if (this.searchingFor === "Competency") {
                if (this.directoryIdList) {
                    this.getCompetencyIds(function(competencies) {
                        if (competencies && competencies.length > 0) {
                            let list = " AND (";
                            for (let i in competencies) {
                                // eslint-disable-next-line eqeqeq
                                if (i != 0) {
                                    list += " OR ";
                                }
                                list += ("@id:\"" + competencies[i] + "\"");
                            }
                            list += ")";
                            success(list);
                        } else success(null);
                    });
                } else {
                    this.getSubDirectoryIds(this.directoryId, function() {
                        me.getCompetencyIds(function(competencies) {
                            if (competencies && competencies.length > 0) {
                                let list = " AND (";
                                for (let i in competencies) {
                                    // eslint-disable-next-line eqeqeq
                                    if (i != 0) {
                                        list += " OR ";
                                    }
                                    list += ("@id:\"" + competencies[i] + "\"");
                                }
                                list += ")";
                                success(list);
                            } else success(null);
                        });
                    });
                }
            } else {
                success("");
            }
        },
        getSubDirectoryIds: function(directoryId, success) {
            let me = this;
            this.repo.search("(parentDirectory:\"" + directoryId + "\")", function(each) {
            }, function(all) {
                new EcAsyncHelper().each(all, function(obj, done) {
                    me.directoryIdList.push(obj.shortId());
                    me.getSubDirectoryIds(obj.shortId(), done, done);
                }, function() {
                    success();
                });
            }, function(error) {
                appError(error);
                done();
            });
        },
        getCompetencyIds: function(success) {
            let me = this;
            let competencies = [];
            let directories = this.directoryIdList.concat(this.directoryId);
            new EcAsyncHelper().each(directories, function(id, done) {
                me.repo.search("(@type:Framework AND directory:\"" + id + "\")", function(each) {
                    if (each.competency) {
                        competencies = competencies.concat(each.competency);
                    }
                }, function(all) {
                    done();
                }, function(error) {
                    appError(error);
                    done();
                });
            }, function() {
                success(competencies);
            });
        },
        buildEncryptedSearch: async function(type, callback) {
            let children = await this.$store.dispatch('editor/getDirectoryChildren', this.directoryObj);
            if (children.length === 0) {
                callback(null);
            } else {
                let search = "(";
                for (let i = 0; i < children.length; i++) {
                    search += '@id:"' + children[i] + '"';
                    if (i < children.length - 1) {
                        search += ' OR ';
                    }
                }
                search += ') AND EncryptedValue AND \\*encryptedType:' + type;
                callback(search);
            }
        },
        buildSearch: function(type, callback) {
            let me = this;
            var search = "";
            // Used to only add OR to query if there's already a term
            var termAdded = false;
            this.buildIdList(function(idList) {
                if (!idList) {
                    return callback(null);
                }
                if (!me.applySearchTo || me.searchTerm === "") {
                    search = "(@type:" + type + (me.searchTerm != null && me.searchTerm !== "" ? " AND " + me.searchTerm : "") + ")" + (me.searchOptions == null || me.searchOptions === "" ? "" : me.searchOptions);
                    search += idList;
                } else {
                    search = "(@type:" + type + " AND (";
                    for (let i = 0; i < me.applySearchTo.length; i++) {
                        if ((type === "Framework" && me.applySearchTo[i].id === "frameworkName") ||
                        (type === "Competency" && me.applySearchTo[i].id === "competencyName") ||
                        (type === "Directory" && me.applySearchTo[i].id === "directoryName")) {
                            if (termAdded) {
                                search += " OR ";
                            }
                            search += ("name:" + me.searchTerm);
                            termAdded = true;
                        } else if ((type === "Framework" && me.applySearchTo[i].id === "frameworkDescription") ||
                        (type === "Competency" && me.applySearchTo[i].id === "competencyDescription") ||
                        (type === "Directory" && me.applySearchTo[i].id === "directoryDescription")) {
                            if (termAdded) {
                                search += " OR ";
                            }
                            search += ("description:" + me.searchTerm);
                            termAdded = true;
                        } else if (type === "Framework") {
                            if (termAdded) {
                                search += " OR ";
                            }
                            // Other framework property from config
                            search += (this.applySearchTo[i].id + ":" + me.searchTerm);
                            termAdded = true;
                        } else if (type === "Competency" && me.applySearchTo[i].id === "competencyLabel") {
                            if (termAdded) {
                                search += " OR ";
                            }
                            search += ("ceasn\\:competencyLabel:" + me.searchTerm);
                            termAdded = true;
                        } else if (me.applySearchTo[i].id === "ownerName") {
                            let paramObj = {};
                            paramObj.size = 10;
                            EcPerson.search(window.repo, 'name:' + me.searchTerm, function(success) {
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
                                    search += idList;
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
                    if (!me.applySearchToOwner) {
                        search += "))" + (me.searchOptions == null ? "" : me.searchOptions);
                    }
                }
                if (!me.applySearchToOwner) {
                    callback(search);
                }
            });
        },
        searchRepo: function() {
            this.frameworkStart = 0;
            this.competencyStart = 0;
            this.directory.splice(0, this.directory.length);
            this.framework.splice(0, this.framework.length);
            this.competency.splice(0, this.competency.length);
            this.creativework.splice(0, this.creativework.length);
            this.resultIds.splice(0, this.resultIds.length);
            this.searchingFor = 'Directory';
            this.loadResults();
        },
        loadResults: function($state) {
            let me = this;
            let localParamObj = Object.assign({}, this.paramObj);
            localParamObj.start = this.start;
            let type = this.searchingFor;
            let arrayType = type.toLowerCase();
            me.buildSearch(type, function(search) {
                if (search) {
                    me.repo.searchWithParams(search, localParamObj, async function(result) {
                        if (!EcArray.has(me.resultIds, result.id)) {
                            if (result.isAny(new EcEncryptedValue().getTypes())) {
                                let unencrypted = new window["Ec" + type]();
                                unencrypted.copyFrom(await EcEncryptedValue.fromEncryptedValue(result));
                                result = unencrypted;
                            }
                            me[arrayType].push(result);
                            me.resultIds.push(result.id);
                        }
                    }, function(results) {
                        me.firstSearchProcessing = false;
                        if (!me.applySearchTo) {
                            me.buildEncryptedSearch(type, function(search) {
                                if (search) {
                                    me.repo.searchWithParams(search, localParamObj, async function(result) {
                                        // Decrypt and add to results list
                                        var type = "Ec" + result.encryptedType;
                                        var obj = new window[type]();
                                        obj.copyFrom(await EcEncryptedValue.fromEncryptedValue(result));
                                        if (!EcArray.has(me.resultIds, obj.id)) {
                                            if (!me.searchTerm || (me.searchTerm && obj.getName().includes(me.searchTerm))) {
                                                me[arrayType].push(obj);
                                                me.resultIds.push(obj.id);
                                            }
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
                } else {
                    me.changeType($state);
                }
            });
        },
        changeType: function($state) {
            this.start = 0;
            if (this.searchingFor === "Directory") {
                this.searchingFor = "Framework";
                return this.loadResults($state);
            } else if (this.searchingFor === "Framework") {
                if (this.searchTerm || !this.searchingInDirectory) {
                    this.searchingFor = "Competency";
                } else {
                    // Only display competencies when searching for something
                    this.searchingFor = "CreativeWork";
                }
                return this.loadResults($state);
            } else if (this.searchingFor === "Competency") {
                if (this.searchingInDirectory) {
                    this.searchingFor = "CreativeWork";
                    return this.loadResults($state);
                }
            }
            if ($state) {
                return $state.complete();
            }
        }
    }
};
</script>


<style lang="scss">
    @import './../../scss/frameworks.scss';
#directoryList {
    .list-ul__item {
        display: flex !important;
        width: 100%;
        padding: .25rem;
        .lode__thing {
            display: flex;
            width: 100%;
            .lode__Framework {
                .lode__type {
                    display: none !important;
                }
            }
            .headings-group {
                .language {
                    display: none !important;
                }
            }
        }
    }
    .list-ul__item--directory {
    }
    .list-ul__item--resource {
        display: flex;
        width: 100%;
        padding: .0rem;
        width: 100%;
    }
}
</style>