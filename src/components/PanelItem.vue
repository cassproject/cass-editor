<template>
    <div>
        <a
            class="panel-block"
            :style="{ transform: indent, width: calcWidth }">
            <span @click="showDetails">
                {{ label }}
            </span>
            <span
                v-if="nodes.length >0"
                class="icon is-pulled-right"
                @click="showChildren = !showChildren">
                <i
                    v-if="showChildren"
                    class="fa fa-chevron-down" />
                <i
                    v-else
                    class="fa fa-chevron-right" />
            </span>
        </a>
        <cass-panel-item
            v-show="showChildren"
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
    data() {
        return {
            showChildren: false
        };
    },
    computed: {
        indent() {
            return `translate(${this.depth * 16}px)`;
        },
        calcWidth() {
            return `calc(100% - ${this.depth * 16}px) !important`;
        }
    },
    methods: {
        showDetails() {
            this.showChildren = true;
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