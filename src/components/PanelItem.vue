<template>
    <div>
        <a
            @click="$emit('show-details', id)"
            class="panel-block"
            :style="indent">
            {{ label }}
        </a>
        <cass-panel-item
            :depth="depth + 1"
            v-for="node in nodes"
            :key="node"
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
    }
};
</script>

<style>
.panel-block {
    display: block;
}
</style>