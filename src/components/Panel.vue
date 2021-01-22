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
    width: calc(280px - 2rem);
    .panel-block {
        max-width: 100%;
        right: 0;
    }
}
</style>