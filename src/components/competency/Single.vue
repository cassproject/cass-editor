<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <h2 class="modal-card-title has-text-white is-size-2">
                Title of Competency
            </h2>
            <button
                @click="$store.commit('app/closeModal')"
                class="delete"
                aria-label="close" />
        </header>
        <section class="modal-card-body">
            Thing goes here /// should include breadcrumbs
            This should probbaly be handled like a regular
            Should only be thing, no editing.  We will make the user
            go to the main framework to edit.
            <Component :is="Thing" />
        </section>
        <footer class="modal-card-foot">
            <div class="buttons is-spaced is-fullwidth">
                <button class="button is-outlined is-dark">
                    Navigate to parent framework
                </button>
                <button
                    @click="$store.commit('app/closeModal')"
                    class="button is-outlined is-primary">
                    Close Competency
                </button>
            </div>
        </footer>
    </div>
</template>

<script>
import Thing from '@/lode/components/lode/Thing.vue';

export default {
    name: 'Single',
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
