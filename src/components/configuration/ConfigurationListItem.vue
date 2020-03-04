<template>
    <div>
        <div class="columns">
            <div class="column is-3">
                <b>{{ name }}</b>
            </div>
            <div class="column is-5">
                {{ description }}
            </div>
            <div class="column is-2">
                {{ isDefault }}
            </div>
            <div class="column is-2">
                <button @click="$emit('showDetails', id)">
                    <span v-if="isOwned">Manage</span>
                    <span v-if="!isOwned">View</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'configurationListItem',
    props: {
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        isOwned: {
            type: Boolean,
            default: false
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    }
};
</script>


<style lang="scss" scoped>
</style>