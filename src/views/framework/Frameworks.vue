<template>
    <div class="framework-list-page">
        <RightAside v-if="showRightAside" />
        <!-- search field -->
        <div class="section is-medium">
            <SearchBar
                filterSet="all"
                :searchType="type === 'ConceptScheme' ? 'concept scheme' : 'framework'" />
            <div
                v-if="!queryParams.concepts==='true'"
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
                            v-if="queryParams.concepts!=='true'">
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
            numIdentities: EcIdentityManager.ids.length,
            sortBy: null
        };
    },
    created: function() {
        this.sortBy = this.queryParams.concepts === 'true' ? "dcterms:title.keyword" : "name.keyword";
        this.$store.commit("editor/t3Profile", false);
        this.$store.commit('editor/framework', null);
        this.spitEvent('viewChanged');
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
            return this.queryParams.concepts === 'true' ? "ConceptScheme" : "Framework";
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
            if (this.showNotMine) {
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
        }
    },
    components: {List, RightAside, SearchBar},
    methods: {
        frameworkClick: function(framework) {
            var me = this;
            if (this.queryParams.concepts === "true") {
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
        for (var i = 0; i < this.filteredQuickFilters.length; i++) {
            if (this.filteredQuickFilters[i].id === "ownedByMe") {
                this.showMine = true;
            }
            if (this.filteredQuickFilters[i].id === "notOwnedByMe") {
                this.showNotMine = true;
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
            for (var i = 0; i < this.filteredQuickFilters.length; i++) {
                if (this.filteredQuickFilters[i].id === "ownedByMe") {
                    this.showMine = true;
                }
                if (this.filteredQuickFilters[i].id === "notOwnedByMe") {
                    this.showNotMine = true;
                }
            }
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/frameworks.scss';

</style>