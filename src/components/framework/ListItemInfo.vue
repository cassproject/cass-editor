<template>
    <aside
        id="right-side-bar__comments"
        class="menu has-background-lightest">
        <div class="right-aside-bar__title">
            <h3 class="title is-size-3">
                {{ objectName }}
            </h3>
        </div>
    </aside>
</template>
<script>
import common from '@/mixins/common.js';

export default {
    name: 'ListItemInfo',
    mixins: [common],
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        objectName: function() {
            return Thing.getDisplayStringFrom(this.object.name);
        },
        object: function() {
            return this.$store.getters['app/rightAsideObject'];
        },
        objectType: function() {
            return this.object.type;
        }
    },
    watch: {
    },
    mounted: function() {
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';
</style>

