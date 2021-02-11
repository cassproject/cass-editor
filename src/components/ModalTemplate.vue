<template>
    <div
        class="modal"
        id="cass-modal"
        :class="[{'is-active': active}, 'is-' + size]">
        <div class="modal-background" />
        <div class="modal-card">
            <header
                class="modal-card-head is-size-4"
                :class="['has-background-' + type, 'has-text-' + fontColor, ]">
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
        },
        type: {
            default: 'info',
            type: String
        },
        fontColor: {
            type: String,
            default: 'white'
        },
        size: {
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