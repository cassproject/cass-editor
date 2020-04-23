<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title">
                <span class="title has-text-white">New Comment</span>
                <br><span class="subtitle has-text-white has-text-weight-medium">
                    Add Comment
                </span>
            </p>
            <button
                class="delete"
                @click="$store.commit('app/closeModal')"
                aria-label="close" />
        </header>
        <section class="modal-card-body">
            <h3 class="title is-size-4">
                Commenting on
            </h3>
            <p class="subtitle">
                Name of competency or framework
            </p>
            <div class="field">
                <div class="control">
                    <input
                        class="textarea"
                        row="3">
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <div class="buttons is-spaced">
                <button
                    class="button is-dark is-outlined"
                    @click="$store.commit('app/closeModal')">
                    Cancel
                </button>
                <button
                    class="button is-outlined is-primary">
                    Save comment
                </button>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'AddComment',
    data() {
        return {

        };
    }
};
</script>