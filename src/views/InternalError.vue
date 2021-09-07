<template>
    <div id="internal-error">
        <div class="section">
            <h2 class="title is-size-3">
                Internal Error
            </h2>
            <p>
                The CaSS server is not responding properly. This is probably our fault. Please try again later or contact your system administrator.
            </p>
        </div>
        <div class="section">
            <div class="buttons is-centered">
                <router-link
                    :to="{path: '/frameworks', query: queryParams}"
                    class="button is-primary is-centered">
                    return home
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InternalError',
    computed: {
        queryParams() {
            return this.$store.getters['editor/queryParams'];
        }
    }
};
</script>

<style scoped>
#internal-error {
    max-width: 800px;
    display: block;
    margin: auto;
    height: 100%;
    flex-direction: column;
    justify-content: center;
}
</style>
