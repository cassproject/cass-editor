<template>
    <tr id="user-group-item">
        <th>
            <b>{{ name }}</b>
        </th>
        <td>
            {{ description }}
        </td>
        <td>
            {{ numMembers }}
        </td>
        <td>
            <div
                class="button is-outlined is-small is-primary"
                @click="$emit('showDetails', id)">
                <span class="icon">
                    <i
                        v-if="isOwned"
                        class="fa fa-cog" />
                    <i
                        v-else
                        class="fa fa-eye" />
                </span>
                <span v-if="isOwned">manage</span>
                <span v-if="!isOwned">view</span>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'UserGroupListItem',
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