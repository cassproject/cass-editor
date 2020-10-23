<template>
    <div id="user-groups">
        <h3>PLUGIN CONTAINER</h3>
        <p>{{pluginToLaunch.launchUrl}}</p>
    </div>
</template>

<script>
export default {
    name: 'PluginContainer',
    components: {},
    data: () => ({
    }),
    computed: {
        pluginToLaunch: function() {
            return this.$store.getters['app/pluginToLaunch'];
        }
    },
    methods: {
    },
    mounted() {
    }
};
</script>


<style lang="scss">
</style>
