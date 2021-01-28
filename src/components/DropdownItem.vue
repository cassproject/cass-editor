<template>
    <div class="cass-dropdown--item">
        <a
            @click="showDetails"
            class="dropdown-item">
            {{ label }}
        </a>
        <cass-dropdown-item
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
import CassDropdownItem from './DropdownItem';

export default {
    name: 'CassDropdownItem',
    components: {
        CassDropdownItem
    },
    props: [ 'nodes', 'label', 'depth', 'id' ],
    methods: {
        showDetailsChild(id) {
            // console.log("PanelItem - showDetailsChild: " + id);
            this.$emit('showDetails', id);
        },
        showDetails() {
            this.showChildren = true;
            // console.log("PanelItem - showDetails: " + this.id);
            this.$emit('showDetails', this.id);
        }
    }
};
</script>

<style>
.cass-dropdown--item {
    width: 100%;
}
</style>
