<template>
    <div class="cass-users-and-groups__panel">
        <nav>
            <slot />
        </nav>
    </div>
</template>
<script>
export default {
    name: 'CassPanel'
};
</script>

<style lang="scss">
.cass-users-and-groups__panel {
    width: 300px;
    .panel-block {
        max-width: 100%;
        right: 0;
    }
    height: calc(100px - 72);
    overflow-y: scroll;
}
</style>