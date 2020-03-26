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
                <button
                    :disabled="defaultBrowserConfigId && defaultBrowserConfigId.equals(id)"
                    @click="$emit('setBrowserDefault', id)">
                    set as browser default
                </button>
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
    name: 'ConfigurationListItem',
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