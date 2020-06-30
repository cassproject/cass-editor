<template>
    <div id="internal-error">
        <div class="section">
            <h2 class="title is-size-3">
                Forbidden
            </h2>
            <p>
                You do not have permission to perform this operation. Please check that you are properly logged in.
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
    name: 'Forbidden'
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
