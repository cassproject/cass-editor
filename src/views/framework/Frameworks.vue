<template>
    <div
        id="frameworks"
        class="framework-list-page">
        <RightAside v-if="showRightAside" />
        <!-- search field -->
        <div class="section is-medium">
            <SearchBar
                filterSet="all"
                :searchType="type === 'ConceptScheme' ? 'concept scheme' : 'framework'" />
            <div
                v-if="!conceptMode"
                class="container is-fluid">
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
                    :disallowEdits="true">
                    <!-- TO DO move these template items to the "actions" right side area -->
                    <template
                        v-slot:frameworkTags="slotProps">
                        <span
                            class="framework-list-item__details is-light"
                            v-if="!conceptMode">
                            <span>
                                Items:
                            </span>
                            <span>
                                {{ slotProps.item.competency ? slotProps.item.competency.length : 0 }}
                            </span>
                        </span>
                        <span
                            class="framework-list-item__details"
                            v-if="slotProps.item.Published"
                            :title="slotProps.item.Published">
                            <span class="details-label">
                                Published:
                            </span>
                            <span class="details-value" />
                        </span>
                        <span
                            class="framework-list-item__details"
                            v-if="slotProps.item.Approved"
                            :title="slotProps.item.Approved">
                            <span class="details-label">
                                Approved:
                            </span>
                            <span class="details-value" />
                        </span>
                        <span
                            class="framework-list-item__details"
                            v-if="slotProps.item['schema:dateCreated']"
                            :title="new Date(slotProps.item['schema:dateCreated'])">
                            <span class="details-label">
                                Created:
                            </span>
                            <span class="details-value">
                                {{ $moment(slotProps.item['schema:dateCreated']).fromNow() }}
                            </span>
                        </span>
                        <span
                            class="framework-list-item__details"
                            v-if="slotProps.item.getTimestamp()"
                            :title="new Date(slotProps.item.getTimestamp())">
                            <span class="details-label">
                                Last modified:
                            </span>
                            <span class="details-value">
                                {{ $moment(slotProps.item.getTimestamp()).fromNow() }}
                            </span>
                        </span>
                        <span
                            class="framework-list-item__details"
                            v-else-if="slotProps.item['schema:dateModified']"
                            :title="new Date(slotProps.item['schema:dateModified'])">
                            <span class="details-label">
                                Last modified:
                            </span>
                            <span class="details-value">
                                {{ $moment(slotProps.item['schema:dateModified']).fromNow() }}
                            </span>
                        </span>
                        <span
                            class="framework-list-item__details"
                            v-if="slotProps.item['ceasn:publisherName'] && getName(slotProps.item['ceasn:publisherName'])">
                            <span class="details-value">
                                {{ getName(slotProps.item['ceasn:publisherName']) }}
                            </span>
                        </span>
                        <span
                            class="framework-list-item__details"
                            v-else-if="slotProps.item['schema:publisher'] && getName(slotProps.item['schema:publisher'])">
                            {{ getName(slotProps.item['schema:publisher']) }}
                        </span>
                        <span
                            class="framework-list-item__details"
                            v-else-if="slotProps.item['schema:creator'] && getName(slotProps.item['schema:creator'])">
                            {{ getName(slotProps.item['schema:creator']) }}
                        </span>
                        <span
                            class="framework-list-item__details"
                            v-if="canEditItem(slotProps.item)">
                            <span class="details-label">
                                Editable
                            </span>
                        </span>
                    </template>
                </List>
            </div>
        </div>
    </div>
</template>
<script>
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
                        search += "@owner:\"" + id.ppk.toPk().toPem() + "\"";
                        search += " OR @owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
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
                    search += "@owner:\"" + id.ppk.toPk().toPem() + "\"";
                    search += " OR @owner:\"" + this.addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
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
            console.log('filtered value', filterValues);
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
                }, console.error);
            } else {
                EcFramework.get(framework.id, function(success) {
                    me.$store.commit('editor/framework', success);
                    me.$store.commit('editor/clearFrameworkCommentData');
                    me.$store.commit('app/setCanViewComments', me.canViewCommentsCurrentFramework());
                    me.$store.commit('app/setCanAddComments', me.canAddCommentsCurrentFramework());
                    me.$router.push({name: "framework", params: {frameworkId: framework.id}});
                }, console.error);
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
    },
    watch: {
        sortResults: function() {
            if (this.sortResults.id === "lastEdited") {
                this.sortBy = "schema:dateModified";
            } else if (this.sortResults.id === "dateCreated") {
                this.sortBy = "schema:dateCreated";
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

</style>