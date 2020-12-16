<template>
    <div class="cass-users-and-groups__panel">
        <nav>
            <p class="panel-heading has-background-white">
                My Groups
            </p>
            <slot />
        </nav>
    </div>
</template>
<script>
export default {
    name: 'CassPanel'
};
</script>

<style>
.cass-users-and-groups__panel {
    width: 300px;
}
</style>