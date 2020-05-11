<template>
    <div
        class="lode__thing__loading">
        <!--
            click to load handles relationships, resources, and levels
            TO DO should be translated to a MODAL -->
        <span class="icon is-dark">
            <i class="fa fa-spinner fa-pulse" />
        </span>
    </div>
</template>
<script>
export default {
    // Thing represents a JSON-LD object. Does not have to be based on http://schema.org/Thing.
    name: 'LoadingThing'
};
</script>

<style>
 .lode__thing__loading {
     background-color: grey;
     width: 100%;
     height: 68px;
 }
</style>
