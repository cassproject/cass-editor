<template>
    <div id="framework-preview">
        <p>Preview Framework</p>
        <div class="framework-preview__container columns is-multiline">
            <div class="column is-12" />
        </div>
        <div class="buttons is-right">
            <div
                @click="acceptFrameworkPreview"
                class="button is-primary">
                Accept & Import
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'FrameworkPreview',

    data() {
        return {

        };
    },
    methods: {
        acceptFrameworkPreview() {
            this.$emit('acceptFrameworkPreview');
        }
    }
};
</script>
<style>

#framework-preview {
    padding: 16px;
}
.framework-preview {
    border: solid 1px black;
}
</style>