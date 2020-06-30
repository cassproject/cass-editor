<template>
    <div
        id="not-found"
        class="container">
        <div class="section">
            <h2 class="title  is-size-3">
                Not found
            </h2>
            <p>
                You've tried to access a page that doesn't exist, please check your url and try again.
            </p>
        </div>
        <div class="section">
            <div class="buttons is-centered">
                <router-link
                    to="/frameworks"
                    class="button is-primary is-centered">
                    return home
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
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
