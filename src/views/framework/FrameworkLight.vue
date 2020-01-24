<template>
    <div id="framework-light">
        <div
            v-if="framework"
            class="section"
            id="framework-container">
            <div class="tile is-vertical">
                <Hierarchy
                    v-if="framework"
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
                    editable="false"
                    :repo="repo" />
            </div>
        </div>
    </div>
</template>
<script>
import Hierarchy from '@/lode/components/lode/Hierarchy.vue';

export default {
    name: 'FrameworkLight',
    props: {
        framework: {
            default: ''
        },
        repo: {
            default: ''
        }
    },
    components: {
        Hierarchy
    },
    data() {
        return {

        };
    }
};
</script>
<style>
</style>