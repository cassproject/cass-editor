<template>
    <div
        class="modal cass-editor___modal"
        id="cass-modal"
        :class="[{'is-active': active}, 'is-' + size, 'cass-editor__modal--' + content]">
        <div class="modal-background" />
        <div
            class="modal-card"
            :class="'cass-editor__modal-card--' + size">
            <header
                class="modal-card-head is-size-4 has-text-weight-bold"
                :class="['has-background-' + type, 'has-text-' + fontColor, ]">
                <p class="modal-card-title">
                    <slot name="modal-header" />
                </p>
                <button
                    class="delete"
                    @click="$emit('close')"
                    aria-label="close" />
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
import '@/scss/modal-template.scss';
export default {
    name: 'ModalTemplate',
    props: {
        active: {
            type: Boolean,
            default: false
        },
        type: {
            default: 'primary',
            type: String
        },
        fontColor: {
            type: String,
            default: 'white'
        },
        size: {
            type: String,
            default: 'medium'
        },
        content: {
            defualt: 'default',
            type: String
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
.modal-card.cass-editor__modal-card--small{
    max-width: 600px;
    min-height: 200px;
}
</style>

