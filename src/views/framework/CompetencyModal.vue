<template>
    <div class="modal is-active">
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    Modal title
                </p>
                <button
                    class="delete"
                    aria-label="close" />
            </header>
            <section class="modal-card-body">
                Thing goes here  in editing mode
                <Component :is="Thing" />
            </section>
            <footer class="modal-card-foot">
                <button class="button is-outlined is-dark is-small">
                    Cancel
                </button>
                <button class="button is-outlined is-primary is-small">
                    Save changes
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
import Thing from './../lode/components/Thing.vue';

export default {
    name: 'ThingAsProperty',
    components: {Thing},
    data() {
        return {

        };
    },
    computed: {

    },
    methods: {

    },
    mounted() {

    }
};
</script>
