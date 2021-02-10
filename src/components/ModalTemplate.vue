<template>
    <div
        class="modal is-small"
        id="cass-modal"
        :class="[{'is-active': active}]">
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head has-text-white is-size-4 has-background-primary">
                <slot name="modal-header" />
            </header>
            <div class="modal-card-body has-text-dark">
                <slot name="modal-body" />
            </div>
            <footer class="modal-card-foot has-background-white">
                <slot name="modal-foot" />
            </footer>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ModalTemplate',
    props: {
        active: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        };
    },
    computed: {
    }
};
</script>

<style lang="scss">

</style>