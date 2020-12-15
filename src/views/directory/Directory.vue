<template>
    <div id="directory">
        <RightAside v-if="showRightAside" />
        <div :class="parentObjectClass">
            <div class="section">
                <div class="container">
                    <div class="columns is-gapless is-paddingless">
                        <div class="column is-narrow">
                            <h1 class="title">
                                {{ directory.name }}
                            </h1>
                        </div>
                        <div class="column">
                            <div
                                @click="$emit('create-new-framework', directory)"
                                class="button is-outlined is-primary">
                                <span class="icon">
                                    <i class="fa fa-plus" />
                                </span><span>create new framework</span>
                            </div>
                            <div
                                @click="createSubdirectory"
                                class="button is-outlined is-primary">
                                <span class="icon">
                                    <i class="fa fa-plus" />
                                </span><span>create subdirectory</span>
                            </div>
                            <div
                                @click="addResource"
                                class="button is-outlined is-primary">
                                <span class="icon">
                                    <i class="fa fa-plus" />
                                </span><span>add a resource</span>
                            </div>
                            <div
                                v-if="directory.parentDirectory"
                                @click="goToParentDirectory"
                                class="button is-outlined is-primary">
                                <span class="icon">
                                    <i class="fa fa-back" />
                                </span><span>go to parent</span>
                            </div>
                        </div>
                        <div class="column">
                            <p class="share-url has-text-weight-light">
                                {{ shareLink }}
                            </p>
                        </div>
                        <div class="column is-narrow">
                            <div
                                class="button is-outlined is-large is-primary"
                                title="Copy URL to the clipboard."
                                v-clipboard="shareLink"
                                v-clipboard:success="successfulClip"
                                v-clipboard:error="errorClip">
                                <i
                                    v-if="clipStatus === 'ready'"
                                    class="fa fa-copy" />
                                <i
                                    v-if="clipStatus === 'success'"
                                    class="fa fa-check" />
                                <i
                                    v-if="clipStatus === 'error'"
                                    class="fa fa-times" />
                            </div>
                        </div>
                    </div>
                    <SearchBar
                        filterSet="all"
                        searchType="framework" />
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container is-fluid show-only-mine">
                <!-- show my frameworks radio -->
                <div class="control">
                    <div v-if="queryParams.show !== 'mine' && numIdentities">
                        <label
                            class="checkbox"
                            for="showMine">
                            <input
                                type="checkbox"
                                value="true"
                                id="showMine"
                                v-model="showMine">
                            Show only mine</label>
                    </div>
                </div>
            </div>
            <div class="container is-fluid">
                <List
                    type="Framework"
                    :repo="repo"
                    :click="frameworkClick"
                    :searchOptions="searchOptions"
                    :paramObj="paramObj"
                    view="directory"
                    :disallowEdits="true">
                    <!-- TO DO move these template items to the "actions" right side area -->
                    <template
                        v-slot:frameworkTags="slotProps">
                        <span class="framework-details has-text-weight-light family-primary is-size-7">
                            <span
                                class="framework-details__item"
                                v-if="slotProps.item.type === 'Framework'">
                                <span class="has-text-weight-medium">
                                    Items:
                                </span>
                                <span class="has-text-weight-light">
                                    {{ slotProps.item.competency ? slotProps.item.competency.length : 0 }}
                                </span>
                            </span>
                            <span
                                class="framework-details__item"
                                v-if="slotProps.item.Published"
                                :title="slotProps.item.Published">
                                <span class="has-text-weight-medium">
                                    Published:
                                </span>
                                <span class="has-text-weight-light">
                                    &nbsp; {{ slotProps.item.Published }}
                                </span>
                            </span>
                            <span
                                class="framework-details__item"
                                v-if="slotProps.item.Approved"
                                :title="slotProps.item.Approved">
                                <span class="has-texte-weight-medium">
                                    Approved:
                                </span>
                                <span class="has-text-weight-light">
                                    &nbsp; {{ slotProps.item.Approved }}
                                </span>
                            </span>
                            <span
                                class="framework-details__item"
                                v-if="slotProps.item['schema:dateCreated']"
                                :title="new Date(slotProps.item['schema:dateCreated'])">
                                <span class="has-text-weight-medium">
                                    Created:
                                </span>
                                <span class="has-text-weight-light">
                                    &nbsp; {{ $moment(new Date(slotProps.item['schema:dateCreated'])).format("MMM D YYYY") }}
                                </span>
                            </span>
                            <span
                                class="framework-details__item"
                                v-if="slotProps.item.getTimestamp()"
                                :title="new Date(slotProps.item.getTimestamp())">
                                <span class="has-text-weight-medium">
                                    Last modified:
                                </span>
                                <span class="has-text-weight-light">
                                    &nbsp; {{ $moment(slotProps.item.getTimestamp()).format("MMM D YYYY") }}
                                </span>
                            </span>
                            <span
                                class="framework-details__item"
                                v-else-if="slotProps.item['schema:dateModified']"
                                :title="new Date(slotProps.item['schema:dateModified'])">
                                <span class="has-text-weight-medium">
                                    Last modified:
                                </span>
                                <span class="has-text-weight-light">
                                    {{ $moment(new Date(slotProps.item['schema:dateModified'])).format("MMM D YYYY") }}
                                </span>
                            </span>
                            <span
                                class="framework-details__item"
                                v-if="slotProps.item['ceasn:publisherName'] && getName(slotProps.item['ceasn:publisherName'])">
                                <span class="has-text-weight-medium">
                                    Publisher:
                                </span>
                                <span class="has-text-weight-light">
                                    {{ getName(slotProps.item['ceasn:publisherName']) }}
                                </span>
                            </span>
                            <span
                                class="framework-details__item"
                                v-else-if="slotProps.item['schema:publisher'] && getName(slotProps.item['schema:publisher'])">
                                <span class="has-text-weight-medium">
                                    Publisher:
                                </span>
                                <span>
                                    {{ getName(slotProps.item['schema:publisher']) }}
                                </span>
                            </span>
                            <span
                                class=""
                                v-else-if="slotProps.item['schema:creator'] && getName(slotProps.item['schema:creator'])">
                                <span class="has-text-weight-medium">
                                    Creator
                                </span>
                                <span>
                                    {{ getName(slotProps.item['schema:creator']) }}
                                </span>
                            </span>
                            <span
                                class="framework-details__item"
                                v-if="canEditItem(slotProps.item) && queryParams.view !== 'true'">
                                <span class="has-text-weight-medium">
                                    Editable
                                </span>
                            </span>
                        </span>
                    </template>
                </List>
            </div>
        </div>
    </div>
</template>
<script>
import debounce from 'lodash/debounce';
import List from '@/lode/components/lode/List.vue';
import common from '@/mixins/common.js';
import SearchBar from '@/components/framework/SearchBar.vue';
export default {
    name: "Directory",
    mixins: [common],
    data: function() {
        return {
            repo: window.repo,
            showMine: false,
            showNotMine: false,
            filterByConfig: false,
            numIdentities: EcIdentityManager.ids.length,
            parentObjectClass: 'frameworks-sticky',
            sortBy: null,
            defaultConfig: "",
            clipStatus: 'ready'
        };
    },
    created: function() {
        this.sortBy = "name.keyword";
        this.$store.commit("editor/t3Profile", false);
        this.$store.commit('editor/framework', null);
        this.spitEvent('viewChanged');
        this.setDefaultConfig();
    },
    computed: {
        showRightAside: function() {
            return this.$store.getters['app/showRightAside'];
        },
        directory: function() {
            return this.$store.getters['app/selectedDirectory'];
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        searchOptions: function() {
            let search = " AND (directory:\"" + this.directory.shortId() + "\" OR parentDirectory:\"" + this.directory.shortId() + "\")";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.showMine || (this.queryParams && this.queryParams.show === "mine")) {
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
            if (this.showNotMine && EcIdentityManager.ids.length > 0) {
                search += " AND NOT (";
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
            if (this.filterByConfig && this.defaultConfig) {
                search += " AND (configuration:\"";
                search += this.defaultConfig;
                search += "\")";
            }
            return search;
        },
        paramObj: function() {
            let obj = {};
            obj.size = 20;
            var order = (this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword") ? "asc" : "desc";
            obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "long",  "missing" : "_last"}} ]';
            if (EcIdentityManager.ids.length > 0 && this.queryParams && this.queryParams.show === 'mine') {
                obj.ownership = 'me';
            }
            return obj;
        },
        sortResults: function() {
            return this.$store.getters['app/sortResults'];
        },
        quickFilters: function() {
            return this.$store.getters['app/quickFilters'];
        },
        filteredQuickFilters: function() {
            let filterValues = this.quickFilters.filter(item => item.checked === true);
            appLog('filtered value', filterValues);
            return filterValues;
        },
        shareLink: function() {
            return window.location.href.replace('/directory', "?directoryId=" + this.directory.shortId());
        }
    },
    components: {
        List,
        SearchBar,
        RightAside: () => import('@/components/framework/RightAside.vue')
    },
    methods: {
        canEditItem: function(item) {
            return item.canEditAny(EcIdentityManager.getMyPks());
        },
        frameworkClick: function(framework) {
            if (framework.type === "Directory") {
                this.$store.commit('app/rightAsideObject', framework);
                this.$store.commit('app/showRightAside', 'ListItemInfo');
            } else {
                var me = this;
                EcFramework.get(framework.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "framework", params: {frameworkId: framework.id}});
                }, appError);
            }
        },
        getName: function(field) {
            let name = EcArray.isArray(field) ? field : [field];
            if (Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
                return this.resolveNameFromUrl(Thing.getDisplayStringFrom(name));
            } else {
                return Thing.getDisplayStringFrom(name);
            }
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
        },
        setDefaultConfig: function() {
            var me = this;
            if (localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId")) {
                this.defaultConfig = localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId");
            } else {
                this.repo.searchWithParams("@type:Configuration", {'size': 10000}, function(c) {
                    if (c.isDefault === "true") {
                        me.defaultConfig = c.shortId();
                    }
                }, function() {
                }, function() {
                });
            }
        },
        scrollFunction(e) {
            let documentObject = document.getElementsByClassName('frameworks-sticky');
            let scrollValue = e.target.scrollTop;
            if (scrollValue !== 0) {
                this.parentObjectClass = 'frameworks-sticky scrolled';
            } else {
                this.parentObjectClass = 'frameworks-sticky';
            }
        },
        createSubdirectory: function() {
            let me = this;
            let dir = new EcDirectory();
            dir.name = "Test Subdirectory Name";
            dir.description = "Test Subdirectory Description";
            dir.generateId(this.repo.selectedServer);
            dir.parentDirectory = this.directory.shortId();
            if (this.directory.owner) {
                dir.owner = this.directory.owner;
            }
            if (this.directory.reader) {
                dir.reader = this.directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                dir.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            dir["schema:dateCreated"] = new Date().toISOString();
            dir["schema:dateModified"] = new Date().toISOString();
            // To do: Add other owners and readers
            // To do: add parentDirectory if button is being used to add a subdirectory
            dir.save(function(success) {
                appLog("Directory saved: " + dir.id);
                me.$store.commit('app/selectDirectory', dir);
            }, console.error, this.repo);
        },
        successfulClip({value, event}) {
            appLog('success', value);
            this.clipStatus = 'success';
            setTimeout(() => {
                this.clipStatus = 'ready';
            }, 1000);
        },
        errorClip({value, event}) {
            appLog('error', value);
            this.clipStatus = 'error';
            setTimeout(() => {
                this.clipStatus = 'ready';
            }, 1000);
        },
        goToParentDirectory: function() {
            let me = this;
            EcDirectory.get(this.directory.parentDirectory, function(success) {
                me.$store.commit('app/selectDirectory', success);
            }, appError);
        },
        addResource: function() {
            let c = new CreativeWork();
            c.generateId(this.repo.selectedServer);
            c.name = "New Resource";
            c.url = "http://myresource.com";
            c.directory = this.directory.shortId();
            if (this.directory.owner) {
                c.owner = this.directory.owner;
            }
            if (this.directory.reader) {
                c.reader = this.directory.reader;
            }
            if (EcIdentityManager.ids.length > 0) {
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            this.repo.saveTo(c, function() {
                appLog("Resource saved: " + c.id);
            }, appError);
        }
    },
    mounted: function() {
        if (!this.directory || this.directory === '') {
            this.$router.push({name: "frameworks"});
        }
        // Keep sorting/filtering in sync with the store on back button
        if (this.sortResults.id === "lastEdited") {
            this.sortBy = "schema:dateModified";
        } else if (this.sortResults.id === "dateCreated") {
            this.sortBy = "schema:dateCreated";
        }
        this.showMine = false;
        this.showNotMine = false;
        this.filterByConfig = false;
        for (var i = 0; i < this.filteredQuickFilters.length; i++) {
            if (this.filteredQuickFilters[i].id === "ownedByMe") {
                this.showMine = true;
            }
            if (this.filteredQuickFilters[i].id === "notOwnedByMe") {
                this.showNotMine = true;
            }
            if (this.filteredQuickFilters[i].id === "configMatchDefault") {
                this.filterByConfig = true;
            }
        }
        let documentBody = document.getElementById('directory');
        documentBody.addEventListener('scroll', debounce(this.scrollFunction, 100, {'leading': true}));
    },
    watch: {
        sortResults: function() {
            if (this.sortResults.id === "lastEdited") {
                this.sortBy = "schema:dateModified";
            } else if (this.sortResults.id === "dateCreated") {
                this.sortBy = "schema:dateCreated";
            } else {
                this.sortBy = "name.keyword";
            }
        },
        filteredQuickFilters: function() {
            this.showMine = false;
            this.showNotMine = false;
            this.filterByConfig = false;
            for (var i = 0; i < this.filteredQuickFilters.length; i++) {
                if (this.filteredQuickFilters[i].id === "ownedByMe") {
                    this.showMine = true;
                }
                if (this.filteredQuickFilters[i].id === "notOwnedByMe") {
                    this.showNotMine = true;
                }
                if (this.filteredQuickFilters[i].id === "configMatchDefault") {
                    this.filterByConfig = true;
                }
            }
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/frameworks.scss';
.frameworks-sticky {
    position: sticky;
    background-color: $white;
    top: 0px;
    z-index: 9;
    width: 100%;
    transition: height .1s;
    position: -webkit-sticky;
    border-bottom: solid 1px rgba($dark, .3);
}
.frameworks-sticky.scrolled {
    z-index: 8;
    height: 136px;
    top: 0;
    overflow: hidden;
    .title {
        display: none;
    }
    .subtitle {
        display: none;
    }
    .frameworks-buttons, .concept-buttons {
        display: none;
    }
}
.framework-details {
    .framework-details__item {
        border-right: 1px solid rgba($dark, .3);
        padding: 0rem .25rem;
    }
    .framework-details__item:first-of-type {
        border-right: 1px solid rgba($dark, .3);
        padding: 0rem .25rem 0rem 0rem;
    }
    .framework-details__item:last-of-type {
        border-right: 0px solid rgba($dark, .3);
        padding: 0rem .25rem 0rem .25rem;
    }
}
</style>