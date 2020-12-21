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

<style>
.cass-users-and-groups__panel {
    width: 300px;
}
</style>