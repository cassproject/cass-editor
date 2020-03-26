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
                {{ numMembers }}
            </div>
            <div class="column is-2">
                <button @click="$emit('showDetails', id)">
                    <span v-if="isOwned">manage</span>
                    <span v-if="!isOwned">view</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userGroupListItem',
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
        numMembers: {
            type: Number,
            default: 0
        },
        isOwned: {
            type: Boolean,
            default: false
        }
    }
};
</script>


<style lang="scss" scoped>
</style>