<template>
    <div
        id="not-found"
        class="container">
        <div class="section">
            <h2 class="title  is-size-3">
                Not found
            </h2>
            <p>
                We’re terribly sorry but the CaSS server does not appear to be online. Please try again later or check the server configuration parameters.
            </p>
        </div>
        <div class="section">
            <div class="buttons is-centered">
                <router-link to="/" class="button is-primary is-centered">
                    return home
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '404'
};
</script>
<style scoped>
#not-found {
    max-width: 800px;
    display: block;
    margin: auto;
    height: 100%;
    flex-direction: column;
    justify-content: center;
}
</style>
