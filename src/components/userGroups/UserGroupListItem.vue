<template>
    <div>
        User Group List Item
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