<template>
    <div
        class="modal"
        :class="{'is-active': showEditMultiple}">
        <div class="modal-background i" />
        <div class="modal-card">
            <header class="modal-card-head has-background-primary">
                <h3 class="modal-card-title has-text-white is-size-3">
                    Edit Multiple Competencies
                </h3>
                <button
                    class="delete"
                    aria-label="close" />
            </header>
            <section class="modal-card-body">
                <!--
          TO DO - After we have the component for selecting and adding competencies,
          add that component here for editing multiple
        -->
                Add SelectProperty component here
                <!-- after adding one property, show button to add another -->
                <div class="buttons is-right">
                    <div class="button is-small is-outlined is-primary">
                        <span class="icon">
                            <i class="fa fa-plus" />
                        </span>
                        <span>Add another property</span>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons is-spaced">
                    <button
                        @click="$emit('cancelEditMultipleEvent')"
                        class="button is-outlined is-dark">
                        <span class="icon">
                            <i class="fa fa-times" />
                        </span>
                        <span>cancel</span>
                    </button>
                    <button class="button is-outlined is-success">
                        <span class="icon">
                            <i class="fa fa-save" />
                        </span>
                        <span>Apply to multiple</span>
                    </button>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>

export default {
    name: 'EditMultipleCompetencies',
    components: { },
    props: {
        showEditMultiple: Boolean
    },
    data() {
        return {

        };
    }
};
</script>
<style>
</style>