<template>
    <div>
        <p>TODO: User/Group Management</p>
    </div>
</template>

<script>
export default {
    name: 'UserGroupEditor',
    data: () => ({
        userGroupViewMode: "groupList"
    }),
    methods: {
        buildUserGroupData() {
        }
    },
    mounted() {
        this.buildUserGroupData();
    }
};
</script>
