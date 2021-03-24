<template>
    <div class="organizations">
        <div>
            <span v-if="$store.getters['editor/conceptMode']">
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
        </div>
        <List
            type="Organization"
            :repo="repo"
            :click="organizationClick"
            :searchOptions="searchOptions"
            :paramObj="paramObj">
            <template
                #organizationTags="slotProps">
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
            </template>
        </List>
    </div>
</template>
<script>
import List from '@/lode/components/List.vue';
import common from '@/mixins/common.js';
export default {
    name: "Organizations",
    mixins: [common],
    data: function() {
        return {
            repo: window.repo,
            sortBy: "name.keyword"
        };
    },
    computed: {
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        searchOptions: function() {
            let search = "";
            if (this.queryParams && this.queryParams.filter != null) {
                search += " AND (" + this.queryParams.filter + ")";
            }
            if (this.queryParams && this.queryParams.show === "mine") {
                search += " AND (";
                for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                    if (i !== 0) {
                        search += " OR ";
                    }
                    var id = EcIdentityManager.ids[i];
                    search += "\\*owner:\"" + id.ppk.toPk().toPem() + "\"";
                    search += " OR \\*owner:\"" + addNewlinesToId(id.ppk.toPk().toPem()) + "\"";
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
        organizationClick: function(organization) {
            var me = this;
            EcOrganization.get(organization.id, function(success) {
                me.$store.commit('editor/organization', success);
                me.$router.push({name: "organization", params: {organizationId: organization.id}});
            }, appError);
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

<style lang="scss" scoped>

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

.page-open .e-Organization{
    a {
        display:none;}
    .icon {
        display:none;}
    .editable {
        display:block;
    }
}

</style>