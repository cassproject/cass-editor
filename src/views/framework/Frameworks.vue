<template>
    <div
        id="frameworks"
        class="framework-list-page">
        <RightAside v-if="showRightAside" />
        <!-- search field -->
        <div :class="parentObjectClass">
            <div class="section">
                <div class="container">
                    <div class="columns is-gapless is-paddingless">
                        <div class="column is-narrow">
                            <h1
                                class="title"
                                v-if="conceptMode">
                                {{ conceptSchemeString }}
                            </h1>
                            <h1
                                class="title"
                                v-else>
                                Frameworks
                            </h1>
                            <h2 class="subtitle is-size-5">
                                List of available
                                <span v-if="conceptMode && queryParams.ceasnDataFields === 'true'">concepts</span>
                                <span v-else-if="conceptMode">taxonomies.</span>
                                <p
                                    class="is-size-6"
                                    v-if="conceptMode && queryParams.ceasnDataFields !== 'true'">
                                    <a
                                        class="custom-link is-size-6"
                                        href="https://en.wikipedia.org/wiki/Taxonomy_(general)"
                                        target="_blank">Taxonomies
                                    </a>
                                    can be used to categorize and label competencies in frameworks.
                                </p>
                                <span v-if="conceptMode && queryParams.ceasnDataFields === 'true'">frameworks</span>
                            </h2>
                        </div>
                        <div class="column">
                            <div
                                v-if="conceptMode"
                                class="buttons is-right concept-buttons">
                                <div
                                    @click="$emit('createNewConceptScheme')"
                                    class="button is-outlined is-primary">
                                    <span class="icon">
                                        <i class="fa fa-plus" />
                                    </span><span>new {{ conceptSchemeStringForButton }}</span>
                                </div>
                                <router-link
                                    to="/import"
                                    @click.native="$store.commit('editor/conceptMode', true); $store.dispatch('app/clearImport');"
                                    class="button is-outlined is-primary">
                                    <span class="icon">
                                        <i class="fa fa-upload" />
                                    </span><span>import {{ conceptSchemeStringForButton }}</span>
                                </router-link>
                            </div>
                            <div
                                v-else
                                class="buttons is-right frameworks-buttons">
                                <div
                                    @click="$emit('createNewFramework')"
                                    class="button is-outlined is-primary">
                                    <span class="icon">
                                        <i class="fa fa-plus" />
                                    </span><span>create new</span>
                                </div>
                                <router-link
                                    to="/import"
                                    @click.native="$store.commit('editor/conceptMode', false); $store.dispatch('app/clearImport');"
                                    class="button is-outlined is-primary">
                                    <span class="icon">
                                        <i class="fa fa-upload" />
                                    </span><span>import framework</span>
                                </router-link>
                                <router-link
                                    to="/crosswalk"
                                    class="button is-outlined is-primary">
                                    <span class="icon">
                                        <i class="fa fa-network-wired" />
                                    </span><span>crosswalk</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <SearchBar
                        filterSet="all"
                        :searchType="type === 'ConceptScheme' ? 'concept scheme' : 'framework'" />
                </div>
            </div>
        </div>
        <div class="section">
            <div
                v-if="!conceptMode"
                class="container is-fluid show-only-mine">
                <!-- show my frameworks radio -->
                <div class="control">
                    <div v-if="queryParams.show !== 'mine' && queryParams.conceptShow !== 'mine' && numIdentities">
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
                    :type="type"
                    :repo="repo"
                    :click="frameworkClick"
                    :searchOptions="searchOptions"
                    :paramObj="paramObj"
                    view="frameworks"
                    :disallowEdits="true">
                    <!-- TO DO move these template items to the "actions" right side area -->
                    <template
                        v-slot:frameworkTags="slotProps">
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
                                <span class="has-text-weight-light" />
                            </span>
                            <span
                                class="framework-details__item"
                                v-if="slotProps.item.Approved"
                                :title="slotProps.item.Approved">
                                <span class="has-texte-weight-medium">
                                    Approved:
                                </span>
                                <span class="has-text-weight-light" />
                            </span>
                            <span
                                class="framework-details__item"
                                v-if="slotProps.item['schema:dateCreated']"
                                :title="new Date(slotProps.item['schema:dateCreated'])">
                                <span class="has-text-weight-medium">
                                    Created:
                                </span>
                                <span class="has-text-weight-light">
                                    &nbsp; {{ $moment(new Date(slotProps.item['schema:dateCreated'])).fromNow() }}
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
                                    &nbsp; {{ $moment(slotProps.item.getTimestamp()).fromNow() }}
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
                                    {{ $moment(new Date(slotProps.item['schema:dateModified'])).fromNow() }}
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
import RightAside from '@/components/framework/RightAside.vue';
import common from '@/mixins/common.js';
import SearchBar from '@/components/framework/SearchBar.vue';
export default {
    name: "Frameworks",
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
            defaultConfig: ""
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
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.showMine || (this.queryParams && !this.conceptMode && this.queryParams.show === "mine") ||
                (this.queryParams && this.conceptMode && this.queryParams.conceptShow === "mine")) {
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
            if (EcIdentityManager.ids.length > 0 && this.queryParams && ((!this.conceptMode && this.queryParams.show === 'mine') ||
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
        }
    },
    components: {List, RightAside, SearchBar},
    methods: {
        canEditItem: function(item) {
            return item.canEditAny(EcIdentityManager.getMyPks());
        },
        frameworkClick: function(framework) {
            var me = this;
            if (this.conceptMode) {
                EcConceptScheme.get(framework.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "conceptScheme", params: {frameworkId: framework.id}});
                }, appError);
            } else {
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
        }
    },
    mounted: function() {
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