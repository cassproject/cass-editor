<template>
    <main-layout
        :rightActive="showRightAside"
        :class=" showRightAside ? 'right-side-open' : ''">
        <!-- should be used for search bar -->
        <template #top>
            <thing-editing
                v-if="editDirectory && canEditDirectory"
                :obj="$store.getters['app/rightAsideObject']"
                :repo="repo"
                :parentNotEditable="queryParams.view==='true'"
                :profile="directoryProfile"
                @done-editing-node-event="onDoneEditingNode()" />
            <div
                class="columns is-mobile is-spaced is-vcentered"
                style="width: 100%;">
                <div class="column">
                    <SearchBar
                        filterSet="all"
                        :setFocus="setFocus"
                        :searchType="type === 'ConceptScheme' ? 'concept scheme' : 'framework'" />
                </div>
                <div class="column is-1" />
                <div class="column is-narrow">
                    <div
                        v-if="conceptMode"
                        class="buttons is-right concept-buttons">
                        <add-new-dropdown
                            :conceptEnabled="true"
                            @concept="$emit('create-new-concept-scheme')"
                            @close="createDropDownActive = false"
                            @toggle="createDropDownActive = !createDropDownActive"
                            :active="createDropDownActive" />
                        <router-link
                            :to="{path: '/import', query: queryParams}"
                            @click.native="$store.commit('editor/conceptMode', true); $store.dispatch('app/clearImport');"
                            class="button is-hidden-touch is-outlined is-primary">
                            <span class="icon">
                                <i class="fa fa-upload" />
                            </span><span>import {{ conceptSchemeStringForButton }}</span>
                        </router-link>
                        <router-link
                            :to="{path: '/import', query: queryParams}"
                            @click.native="$store.commit('editor/conceptMode', true); $store.dispatch('app/clearImport');"
                            class="button is-hidden-desktop is-outlined is-primary">
                            <span class="icon">
                                <i class="fa fa-upload" />
                            </span>
                        </router-link>
                        <!-- help -->
                        <a
                            href="docs/taxonomies/"
                            target="_blank"
                            title="Go to documentation on framework library"
                            class="button is-hidden-touch is-primary is-outlined">
                            <span class="icon">
                                <i class="far fa-question-circle" />
                            </span>
                            <span class="is-hidden-touch">
                                Help
                            </span>
                        </a>
                        <a
                            href="docs/taxonomies/"
                            target="_blank"
                            title="Go to documentation on framework library"
                            class="button is-primary is-hidden-desktop is-outlined">
                            <span class="icon">
                                <i class="far fa-question-circle" />
                            </span>
                        </a>
                    </div>
                    <!-- frameworks -->
                    <div
                        v-else
                        class="buttons is-right frameworks-buttons">
                        <add-new-dropdown
                            :frameworkEnabled="true"
                            :collectionEnabled="queryParams.ceasnDataFields === 'true'"
                            @framework="$emit('create-new-framework')"
                            @collection="$emit('create-new-collection')"
                            @close="createDropDownActive = false"
                            @toggle="createDropDownActive = !createDropDownActive"
                            :active="createDropDownActive" />
                        <!-- upload -->
                        <router-link
                            :to="{path: '/import', query: queryParams}"
                            @click.native="$store.commit('editor/conceptMode', false); $store.dispatch('app/clearImport');"
                            class="button is-outlined is-hidden-desktop is-primary">
                            <span class="icon">
                                <i class="fa fa-upload" />
                            </span>
                        </router-link>
                        <router-link
                            :to="{path: '/import', query: queryParams}"
                            @click.native="$store.commit('editor/conceptMode', false); $store.dispatch('app/clearImport');"
                            class="button is-outlined is-hidden-touch is-primary">
                            <span class="icon">
                                <i class="fa fa-upload" />
                            </span><span>import</span>
                        </router-link>
                        <!-- crosswalk -->
                        <router-link
                            :to="{path: '/crosswalk', query: queryParams}"
                            class="button is-hidden-touch is-outlined is-primary">
                            <span class="icon">
                                <i class="fa fa-network-wired" />
                            </span>
                            <span>
                                Crosswalk
                            </span>
                        </router-link>
                        <router-link
                            :to="{path: '/crosswalk', query: queryParams}"
                            class="button is-hidden-desktop is-outlined is-primary">
                            <span class="icon">
                                <i class="fa fa-network-wired" />
                            </span>
                        </router-link>
                        <!-- help -->
                        <a
                            href="docs/competency-and-framework-management/"
                            target="_blank"
                            title="Go to documentation on framework library"
                            class="button is-hidden-touch is-primary is-outlined">
                            <span class="icon">
                                <i class="far fa-question-circle" />
                            </span>
                            <span class="is-hidden-touch">
                                Help
                            </span>
                        </a>
                        <a
                            href="docs/competency-and-framework-management/"
                            target="_blank"
                            title="Go to documentation on framework library"
                            class="button is-primary is-hidden-desktop is-outlined">
                            <span class="icon">
                                <i class="far fa-question-circle" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </template>
        <!-- should be used for title / breadcrumbs -->
        <template #secondary-top>
            <div style="width: 100%;">
                <h2 class="has-text-dark is-size-5 text-align-left pl-0 ml-0">
                    Available Items
                </h2>
            </div>
        </template>
        <!-- should be used for body i.e. framework itself -->
        <template #body>
            <div
                id="frameworks"
                class="framework-list-page">
                <div class="container is-fluid">
                    <List
                        :type="type"
                        :repo="repo"
                        :click="frameworkClick"
                        @dblclick="openItem"
                        @search-updated="refocusSearch"
                        :searchOptions="searchOptions"
                        :paramObj="paramObj"
                        view="frameworks"
                        :disallowEdits="true">
                        <!-- TO DO move these template items to the "actions" right side area -->
                        <template
                            #frameworkTags="slotProps">
                            <span class="framework-details has-text-weight-light family-primary is-size-7">
                                <span
                                    class="framework-details__item"
                                    v-if="!conceptMode && slotProps.item.type === 'Framework'">
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
        </template>
        <template #right>
            <RightAside
                title="Filter \& sort"
                v-if="showRightAside" />
        </template>
    </main-layout>
</template>
<script>
import MainLayout from './../../layouts/MainLayout.vue';
import debounce from 'lodash/debounce';
import List from '@/lode/components/List.vue';
import RightAside from '@/components/framework/RightAside.vue';
import common from '@/mixins/common.js';
import editDirectory from '@/mixins/editDirectory.js';
import SearchBar from '@/components/framework/SearchBar.vue';
import AddNewDropdown from '@/components/AddNewDropdown.vue';

export default {
    name: "Frameworks",
    mixins: [common, editDirectory],
    data: function() {
        return {
            createDropDownActive: false,
            repo: window.repo,
            showMine: false,
            showNotMine: false,
            filterByConfig: false,
            numIdentities: EcIdentityManager.default.ids.length,
            parentObjectClass: 'frameworks-sticky',
            sortBy: null,
            defaultConfig: "",
            setFocus: false
        };
    },
    created: function() {
        this.sortBy = this.conceptMode ? "dcterms:title.keyword" : "name.keyword";
        this.$store.commit("editor/t3Profile", false);
        this.$store.commit('editor/framework', null);
        this.spitEvent('viewChanged');
        this.setDefaultConfig();
    },
    computed: {
        conceptSchemeString: function() {
            if (this.queryParams.ceasnDataFields === 'true') {
                return 'Concept Schemes';
            } else {
                return "Taxonomies";
            }
        },
        conceptSchemeStringForButton: function() {
            if (this.queryParams.ceasnDataFields === 'true') {
                return 'Concept Scheme';
            } else {
                return "Taxonomy";
            }
        },
        showRightAside: function() {
            return this.$store.getters['app/showRightAside'];
        },
        frameworkSearchTerm: function() {
            return this.$store.getters['app/searchTerm'];
        },
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        type: function() {
            return this.conceptMode ? "ConceptScheme" : "Framework";
        },
        searchOptions: function() {
            let search = "";
            if (this.queryParams.ceasnDataFields === 'true' && this.type === "Framework") {
                if (this.collectionMode) {
                    search += " AND (subType:\"Collection\")";
                } else {
                    search += " AND NOT (subType:\"Collection\")";
                }
            }
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.showMine || (this.queryParams && !this.conceptMode && this.queryParams.show === "mine") ||
                (this.queryParams && this.conceptMode && this.queryParams.conceptShow === "mine")) {
                if (EcIdentityManager.default.ids.length > 0) {
                    search += " AND (";
                    for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
                        if (i !== 0) {
                            search += " OR ";
                        }
                        var id = EcIdentityManager.default.ids[i];
                        search += "\\*owner:\"" + id.ppk.toPk().toPem() + "\"";
                        search += " OR \\*owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
                    }
                    search += ")";
                }
            }
            if (this.showNotMine && EcIdentityManager.default.ids.length > 0) {
                search += " AND NOT (";
                for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
                    if (i !== 0) {
                        search += " OR ";
                    }
                    var id = EcIdentityManager.default.ids[i];
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
            let type = (this.sortBy === "name.keyword" || this.sortBy === "dcterms:title.keyword") ? "text" : "date";
            obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "' + type + '",  "missing" : "_last"}} ]';
            if (EcIdentityManager.default.ids.length > 0 && this.queryParams && ((!this.conceptMode && this.queryParams.show === 'mine') ||
                (this.conceptMode && this.queryParams.conceptShow === "mine"))) {
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
        conceptMode: function() {
            return this.$store.getters['editor/conceptMode'];
        },
        collectionMode: function() {
            return this.$store.getters['editor/collectionMode'];
        }
    },
    components: {
        List,
        RightAside,
        AddNewDropdown,
        SearchBar,
        MainLayout,
        ThingEditing: () => import('@/lode/components/ThingEditing.vue')
    },
    methods: {
        refocusSearch: function() {
            this.setFocus = !this.setFocus;
        },
        canEditItem: function(item) {
            return item.canEditAny(EcIdentityManager.default.getMyPks());
        },
        openItem: function(object) {
            var me = this;
            if (object.type === "Directory") {
                this.$store.commit('app/selectDirectory', object);
                if (this.$route.name !== "directory") {
                    this.$router.push({name: "directory"});
                }
                this.$store.commit('app/closeRightAside');
            } else if (object.type === "Competency") {
                EcFramework.search(this.repo, "competency:\"" + object.shortId() + "\"", function(success) {
                    if (success && success[0]) {
                        me.openItem(success[0]);
                    }
                }, appError, null);
            } else if (object.type === "Concept") {
                this.findConceptTrail(object);
            } else if (this.conceptMode) {
                EcConceptScheme.get(object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "conceptScheme", params: {frameworkId: object.id}});
                }, appError);
            } else {
                EcFramework.get(object.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "framework", params: {frameworkId: object.id}});
                }, appError);
            }
        },
        findConceptTrail: function(concept) {
            let me = this;
            if (concept["skos:topConceptOf"]) {
                EcConceptScheme.get(concept["skos:topConceptOf"], function(scheme) {
                    me.openItem(scheme);
                }, appError);
            } else if (concept["skos:broader"]) {
                if (!EcArray.isArray(concept["skos:broader"])) {
                    concept["skos:broader"] = [concept["skos:broader"]];
                }
                EcConcept.get(concept["skos:broader"][0], function(parent) {
                    me.findConceptTrail(parent);
                }, appError);
            }
        },
        frameworkClick: function(framework) {
            this.$store.commit('app/rightAsideObject', framework);
            this.$store.commit('app/showRightAside', 'ListItemInfo');
        },
        getName: function(field) {
            let name = EcArray.isArray(field) ? field : [field];
            if (schema.Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
                return this.resolveNameFromUrl(schema.Thing.getDisplayStringFrom(name));
            } else {
                return schema.Thing.getDisplayStringFrom(name);
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
        }
    },
    mounted: function() {
        // Keep sorting/filtering in sync with the store on back button
        if (this.sortResults.id === "lastEdited") {
            this.sortBy = "schema:dateModified";
        } else if (this.sortResults.id === "dateCreated") {
            this.sortBy = "schema:dateCreated";
        } else {
            this.sortBy = this.conceptMode ? "dcterms:title.keyword" : "name.keyword";
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
        let documentBody = document.getElementById('frameworks');
        documentBody.addEventListener('scroll', debounce(this.scrollFunction, 100, {'leading': true}));
    },
    watch: {
        sortResults: function() {
            if (this.sortResults.id === "lastEdited") {
                this.sortBy = "schema:dateModified";
            } else if (this.sortResults.id === "dateCreated") {
                this.sortBy = "schema:dateCreated";
            } else {
                this.sortBy = this.conceptMode ? "dcterms:title.keyword" : "name.keyword";
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
        },
        conceptMode: function() {
            this.sortBy = this.conceptMode ? "dcterms:title.keyword" : "name.keyword";
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