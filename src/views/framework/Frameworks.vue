<template>
    <div class="page-open">
        <List
            type="Framework"
            :repo="repo"
            :click="frameworkClick">
            <template
                v-slot:frameworkTags="slotProps">
                {{ slotProps.item.competency.length }} competencies
            </template>
        </List>
    </div>
</template>
<script>
import List from '@/lode/components/lode/List.vue';
export default {
    name: "Frameworks",
    props: {
        queryParams: Object
    },
    data: function() {
        return {
            repo: window.repo
        };
    },
    components: {List},
    methods: {
        frameworkClick: function(framework) {
            this.$router.push({name: "framework", params: {frameworkId: framework.id}});
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