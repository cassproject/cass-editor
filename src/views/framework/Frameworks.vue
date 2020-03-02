<template>
    <div class="page-framework-list">
        <div class="container">
            <div class="section">
                <div class="control">
                    <label
                        v-if="queryParams.concepts==='true'"
                        class="radio is-large"
                        for="dcterms:title.keyword">
                        <input
                            type="radio"
                            value="dcterms:title.keyword"
                            id="dcterms:title.keyword"
                            v-model="sortBy">
                        Sort alphabetically</label>
                    <label
                        v-else
                        class="radio"
                        for="name.keyword">
                        <input
                            type="radio"
                            value="name.keyword"
                            id="name.keyword"
                            v-model="sortBy">
                        Sort alphabetically</label>
                    <label
                        class="radio"
                        for="schema:dateModified">
                        <input
                            type="radio"
                            value="schema:dateModified"
                            id="schema:dateModified"
                            v-model="sortBy">
                        Sort by last modified</label>
                </div>
                <div class="control">
                    <div v-if="queryParams.show!=='mine'&&queryParams.conceptShow!=='mine'&&numIdentities">
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
            <div class="section">
                <List
                    :type="type"
                    :repo="repo"
                    :click="frameworkClick"
                    :searchOptions="searchOptions"
                    :paramObj="paramObj"
                    :disallowEdits="queryParams.view==='true'">
                    <!-- TO DO move these template items to the "actions" right side area -->
                    <template
                        v-slot:frameworkTags="slotProps">
                        <span
                            class="tag"
                            v-if="queryParams.concepts!=='true'">{{ slotProps.item.competency ? slotProps.item.competency.length : 0 }} items </span>
                        <span
                            class="tag"
                            v-if="slotProps.item.Published"
                            :title="slotProps.item.Published">Published </span>
                        <span
                            class="tag"
                            v-if="slotProps.item.Approved"
                            :title="slotProps.item.Approved">Approved </span>
                        <span
                            class="tag"
                            v-if="slotProps.item['schema:dateCreated']"
                            :title="new Date(slotProps.item['schema:dateCreated'])">
                            Created {{ $moment(slotProps.item['schema:dateCreated']).fromNow() }}
                        </span>
                        <span
                            class="tag"
                            v-if="slotProps.item.getTimestamp()"
                            :title="new Date(slotProps.item.getTimestamp())">
                            Last modified {{ $moment(slotProps.item.getTimestamp()).fromNow() }}
                        </span>
                        <span
                            class="tag"
                            v-else-if="slotProps.item['schema:dateModified']"
                            :title="new Date(slotProps.item['schema:dateModified'])">
                            Last modified {{ $moment(slotProps.item['schema:dateModified']).fromNow() }}
                        </span>
                        <span
                            class="tag"
                            v-if="slotProps.item['ceasn:publisherName'] && getName(slotProps.item['ceasn:publisherName'])">
                            {{ getName(slotProps.item['ceasn:publisherName']) }}
                        </span>
                        <span
                            class="tag"
                            v-else-if="slotProps.item['schema:publisher'] && getName(slotProps.item['schema:publisher'])">
                            {{ getName(slotProps.item['schema:publisher']) }}
                        </span>
                        <span
                            class="tag"
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
import common from '@/mixins/common.js';
export default {
    name: "Frameworks",
    props: {
        queryParams: Object
    },
    mixins: [common],
    data: function() {
        return {
            repo: window.repo,
            showMine: false,
            numIdentities: EcIdentityManager.ids.length,
            sortBy: null
        };
    },
    created: function() {
        this.sortBy = this.queryParams.concepts === 'true' ? "dcterms:title.keyword" : "name.keyword";
        this.$store.commit("t3Profile", false);
    },
    computed: {
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
        }
    },
    components: {List},
    methods: {
        frameworkClick: function(framework) {
            var me = this;
            if (this.queryParams.concepts === "true") {
                EcConceptScheme.get(framework.id, function(success) {
                    me.$store.commit('framework', success);
                    me.$router.push({name: "conceptScheme", params: {frameworkId: framework.id}});
                }, console.error);
            } else {
                EcFramework.get(framework.id, function(success) {
                    me.$store.commit('framework', success);
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
    }
};
</script>

<style lang="scss">
    @import './../../scss/frameworks.scss';
    @import './../../scss/framework.scss';

</style>