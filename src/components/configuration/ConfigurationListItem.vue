<template>
    <tr>
        <th>
            <b>{{ name }}</b>
        </th>
        <td v-if="view !== 'dynamic-modal'">
            {{ description }}
        </td>
        <td>
            {{ isDefault }}
        </td>
        <td>
            <div
                class="button is-outlined is-primary is-small"
                :disabled="defaultBrowserConfigId && defaultBrowserConfigId.equals(id)"
                @click="$emit('setBrowserDefault', id)">
                set as browser default
            </div>
        </td>
        <td v-if="view !== 'dynamic-modal'">
            <div
                v-if="isOwned"
                class="button is-outlined is-small is-primary"
                @click="$emit('showDetails', id)">
                <span class="icon">
                    <i class="fas fa-cog" />
                </span>
                <span>
                    manage
                </span>
            </div>
            <div
                v-else-if="!isOwned"
                class="button is-outlined is-small is-primary"
                @click="$emit('showDetails', id)">
                <span class="icon">
                    <i class="fas fa-eye" />
                </span>
                <span>
                    view
                </span>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'ConfigurationListItem',
    props: {
        id: {
            type: String,
            default: ''
        },
        view: {
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
        },
        defaultBrowserConfigId: {
            type: String,
            default: ''
        }
    }
};
</script>


<style lang="scss" scoped>
</style>