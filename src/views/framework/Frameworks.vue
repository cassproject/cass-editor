<template>
    <div class="page-open">
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
            sortBy: "name.keyword"
        };
    },
    computed: {
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
        },
        changeSort: function() {
            // this.sortBy = $("#sortSelect").val();
            if (this.queryParams && this.queryParams.concepts === "true" && this.sortBy === "name.keyword") {
                this.sortBy = "dcterms:title.keyword";
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