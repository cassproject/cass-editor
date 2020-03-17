<template>
    <div>
        User Group Details
    </div>
</template>

<script>
export default {
    name: 'userGroupDetails',
    props: {
        group: {
            type: Object
        },
        readOnly: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
    }),
    methods: {
    },
    computed: {
    }
};
</script>

<style lang="scss" scoped>
    h3 {
        font-size: 2rem;
        padding-bottom: 1rem;
    }
    h4 {
        font-size: 1.6rem;
        padding-bottom: 1rem;
    }
    h5 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
    .listHdr {
        font-weight: bold;
    }
</style>
