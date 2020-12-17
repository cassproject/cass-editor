<template>
    <tr>
        <th>
            <b>{{ name }}</b>
        </th>
        <td v-if="view !== 'dynamic-modal'">
            {{ description }}
        </td>
        <td v-if="view !== 'dynamic-modal'">
            <span
                v-if="isDefault"
                class="icon has-text-primary">
                <i class="fa fa-check" />
            </span>
        </td>
        <td v-if="view !== 'dynamic-modal'">
            <!-- <div
                class="button is-outlined is-primary is-small"
                :disabled="defaultBrowserConfigId && defaultBrowserConfigId.equals(id)"
                @click="$emit('setBrowserDefault', id)">
                set as browser default
            </div>-->
            <div class="field">
                <div class="control is-size-3">
                    <input
                        v-model="isBrowserDefault"
                        :id="id + 'browserDefaultSwitch'"
                        type="checkbox"
                        :name="id + 'browserDefaultSwitch'"
                        class="switch is-outlined">
                    <label :for="id + 'browserDefaultSwitch'" />
                </div>
            </div>
        </td>
        <td v-else>
            <div
                class="button is-outlined is-primary is-small"
                :disabled="defaultFrameworkConfigId !== null && defaultFrameworkConfigId !== undefined && defaultFrameworkConfigId.equals(id)"
                @click="$emit('set-framework-default', id)">
                set as framework default
            </div>
        </td>
        <td v-if="view !== 'dynamic-modal'">
            <div
                v-if="isOwned"
                title="Manage configuration"
                class="button is-outlined is-small is-primary"
                @click="$emit('show-details', id)">
                <span class="icon">
                    <i class="fas fa-cog" />
                </span>
            </div>
            <div
                v-if="isOwned && !isDefault"
                title="Delete configuration"
                class="button is-outlined is-small is-danger delete-btn"
                @click="$emit('show-delete', id)">
                <span class="icon">
                    <i class="fas fa-trash" />
                </span>
            </div>
            <div
                v-if="!isOwned"
                title="View configuration"
                class="button is-outlined is-small is-primary"
                @click="$emit('show-details', id)">
                <span class="icon">
                    <i class="fas fa-eye" />
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
        },
        defaultFrameworkConfigId: {
            type: String,
            default: ''
        }
    },
    computed: {
        isBrowserDefault: {
            get() {
                if (this.defaultBrowserConfigId === this.id) {
                    return true;
                } else {
                    return false;
                }
            },
            set(val) {
                appLog("val", val);
                if (val) {
                    this.$emit('set-browser-default', this.id);
                } else {
                    this.$emit('remove-browser-default-config');
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
    .delete-btn {
        margin-left: .4rem;
    }
</style>