<template>
    <div>
        <a
            @click="showDetails"
            class="panel-block"
            :style="indent">
            {{ label }}
        </a>
        <cass-panel-item
            :depth="depth + 1"
            v-for="node in nodes"
            :key="node"
            :id="node.id"
            @showDetails="showDetailsChild"
            :nodes="node.subGroups"
            :label="node.name" />
    </div>
</template>
<script>
import CassPanelItem from './PanelItem';

export default {
    name: 'CassPanelItem',
    props: [ 'nodes', 'label', 'depth', 'id' ],
    components: {
        CassPanelItem
    },
    computed: {
        indent() {
            return {transform: `translate(${this.depth * 16}px)`};
        }
    },
    methods: {
        showDetails() {
            // console.log("PanelItem - showDetails: " + this.id);
            this.$emit('showDetails', this.id);
        },
        showDetailsChild(id) {
            // console.log("PanelItem - showDetailsChild: " + id);
            this.$emit('showDetails', id);
        }
    }
};
</script>

<style>
.panel-block {
    display: block;
}
</style>