<template>
    <div class="page-framework">
        <Thing
            :obj="framework"
            :repo="repo" />
        <span
            class="info-tag"
            v-if="framework.competency.length == 1">{{ framework.competency.length }} item</span>
        <span
            class="info-tag"
            v-else-if="framework.competency.length > 1">{{ framework.competency.length }} items</span>
        <span
            class="info-tag"
            v-if="timestamp"
            :title="new Date(timestamp)">Last modified {{ lastModified }}</span>
        <span
            class="info-tag"
            v-if="framework['schema:dateCreated']"
            :title="new Date(framework['schema:dateCreated'])">Created {{ $moment(framework['schema:dateCreated']).fromNow() }}</span>
        <span
            class="info-tag"
            v-if="framework['Approved']"
            :title="framework['Approved']">Approved</span>
        <span
            class="info-tag"
            v-if="framework['Published']"
            :title="framework['Published']">Published</span>
        <hr>
        <Hierarchy
            :container="framework"
            containerType="Framework"
            containerNodeProperty="competency"
            containerEdgeProperty="relation"
            nodeType="EcCompetency"
            edgeType="EcAlignment"
            edgeRelationProperty="relationType"
            edgeRelationLiteral="narrows"
            edgeSourceProperty="source"
            edgeTargetProperty="target"
            :editable="true"
            :repo="repo" />
    </div>
</template>
<script>
import Thing from '@/lode/components/lode/Thing.vue';
import Hierarchy from '@/lode/components/lode/Hierarchy.vue';
export default {
    name: "Framework",
    data: function() {
        return {
            repo: window.repo,
            framework: EcFramework.getBlocking(this.$route.params.frameworkId)
        };
    },
    computed: {
        timestamp: function() {
            if (this.framework.getTimestamp()) {
                return this.framework.getTimestamp();
            }
            else if (this.framework["schema:dateModified"]) {
                return this.framework["schema:dateModified"];
            }
            else {
                return null;
            }
        },
        lastModified: function() {
            if (this.framework == null) return "Unknown.";
            if (this.timestamp) {
                return this.$moment(this.timestamp).fromNow();
            }
        }
    },
    components: {Hierarchy, Thing}
};
</script>

<style lang="scss">

.page-framework{
    .e-Thing-ul{

        margin-top:0px;
    }
    .e-Thing-always-ul .e-name{
        label{
            display:none;
        }
    }

    .e-Thing-always-ul .e-description{
        label{
            display:none;
        }
        font-size:.8rem;
    }

    .e-Framework{
        ul{margin-left:0px;}
        a {display:none;}
        >.expand{float:right;position:relative;top:.5rem;}
        >.compact{float:right;position:relative;top:.5rem;}
        >.editable{float:right;position:relative;top:.5rem;}
        .e-Property-text{font-size:larger;}
    }

    .e-Competency{
        a {display:none;}
        >.expand{float:right;}
        >.compact{float:right;}
        >.editable {float:right;}
    }
    .e-HierarchyNode{
        >ul{
            padding-left:1rem;
            >div{
                border:1px dashed whitesmoke;
            }
        }
        >.icon{
            width:0px;
            height:0px;
            margin:0px;
            line-height:0px;
            display:block;
            position:relative;
            left:-.5rem;
            top:-2rem;
        }
        padding-left:1rem;
    }
    .dragging{
        div{
            border:1px dashed gray !important;
            .drag-footer::before{
                content:'' !important
            }
            .drag-footer{
            }
        }
    }
}

</style>