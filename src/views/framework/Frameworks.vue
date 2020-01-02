<template>
    <div class="page-open">
        <div>
            <span v-if="queryParams.concepts==='true'">
                <input
                    type="radio"
                    value="dcterms:title.keyword"
                    id="dcterms:title.keyword"
                    v-model="sortBy">
                <label for="dcterms:title.keyword">Sort alphabetically</label>
            </span>
            <span v-else>
                <input
                    type="radio"
                    value="name.keyword"
                    id="name.keyword"
                    v-model="sortBy">
                <label for="name.keyword">Sort alphabetically</label>
            </span>
            <span>
                <input
                    type="radio"
                    value="schema:dateModified"
                    id="schema:dateModified"
                    v-model="sortBy">
                <label for="schema:dateModified">Sort by last modified</label>
            </span>
            <span v-if="queryParams.showMine!=='true'&&numIdentities">
                <input
                    type="checkbox"
                    value="true"
                    id="showMine"
                    v-model="showMine">
                <label for="showMine">Show only mine</label>
            </span>
        </div>
        <List
            type="Framework"
            :repo="repo"
            :click="frameworkClick"
            :searchOptions="searchOptions"
            :paramObj="paramObj">
            <template
                v-slot:frameworkTags="slotProps">
                <span>{{ slotProps.item.competency.length }} items </span>
                <span
                    v-if="slotProps.item.Published"
                    :title="slotProps.item.Published">Published </span>
                <span
                    v-if="slotProps.item.Approved"
                    :title="slotProps.item.Approved">Approved </span>
                <span
                    v-if="slotProps.item['schema:dateCreated']"
                    :title="new Date(slotProps.item['schema:dateCreated'])">
                    Created {{ $moment(slotProps.item['schema:dateCreated']).fromNow() }}
                </span>
                <span
                    v-if="slotProps.item.getTimestamp()"
                    :title="new Date(slotProps.item.getTimestamp())">
                    Last modified {{ $moment(slotProps.item.getTimestamp()).fromNow() }}
                </span>
                <span
                    v-else-if="slotProps.item['schema:dateModified']"
                    :title="new Date(slotProps.item['schema:dateModified'])">
                    Last modified {{ $moment(slotProps.item['schema:dateModified']).fromNow() }}
                </span>
                <span v-if="slotProps.item['ceasn:publisherName']">
                    {{ getName(slotProps.item['ceasn:publisherName']) }}
                </span>
                <span v-else-if="slotProps.item['schema:publisher']">
                    {{ getName(slotProps.item['schema:publisher']) }}
                </span>
                <span v-else-if="slotProps.item['schema:creator']">
                    {{ getName(slotProps.item['schema:creator']) }}
                </span>
            </template>
        </List>
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
            sortBy: "name.keyword",
            showMine: false,
            numIdentities: EcIdentityManager.ids.length
        };
    },
    computed: {
        searchOptions: function() {
            let search = "";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.showMine || (this.queryParams && this.queryParams.show === "mine")) {
                search += " AND (";
                for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                    if (i !== 0) {
                        search += " OR ";
                    }
                    var id = EcIdentityManager.ids[i];
                    search += "@owner:\"" + id.ppk.toPk().toPem() + "\"";
                    search += " OR @owner:\"" + addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
                }
                search += ")";
            }
            return search;
        },
        paramObj: function() {
            let obj = {};
            obj.size = 20;
            var order = (this.sortBy === "name.keyword") ? "asc" : "desc";
            obj.sort = '[ { "' + this.sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "long",  "missing" : "_last"}} ]';
            if (this.queryParams && this.queryParams.show != null && this.queryParams.show === 'mine') {
                obj.ownership = 'me';
            }
            return obj;
        }
    },
    components: {List},
    methods: {
        frameworkClick: function(framework) {
            var me = this;
            EcFramework.get(framework.id, function(success) {
                me.$store.commit('framework', success);
                me.$router.push({name: "framework", params: {frameworkId: framework.id}});
            }, console.error);
        },
        getName: function(field) {
            let name = EcArray.isArray(field) ? field : [field];
            if (Thing.getDisplayStringFrom(name).toLowerCase().indexOf("http") !== -1) {
                return this.resolveNameFromUrl(Thing.getDisplayStringFrom(name));
            } else {
                return Thing.getDisplayStringFrom(name);
            }
        }
    }
};
</script>

<style lang="scss">

.page-open .e-name{
    label{
        display:none;
    }
    ul{
        margin-left:0px;
        display:inline;
        li{
            display:inline;
            margin-right:.5rem;
        }
    }
}

.page-open .e-description{
    label{
        display:none;
    }
    font-size:.8rem;
}

.page-open .e-Framework{
    a {display:none;}
    .icon {display:none;}
    .editable {display:block;float:right;}
}

</style>