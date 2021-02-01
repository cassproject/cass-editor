<template>
    <div
        v-click-outside="closeDropdown"
        class="dropdown  cass-user-group--dropdown"
        :class="active ? 'is-active' : ''">
        <div
            class="dropdown-trigger"
            @click="$emit('showDropdown')">
            <button
                class="button is-fullwidth is-large"
                aria-haspopup="true"
                aria-controls="dropdown-menu">
                <span v-if="label">{{ label }}</span>
                <span v-else>All Group Members</span>
                <span class="icon is-small">
                    <i
                        class="fas fa-angle-down"
                        aria-hidden="true" />
                </span>
            </button>
        </div>
        <div
            class="dropdown-menu"
            id="dropdown-menu"
            role="menu">
            <div class="dropdown-content">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import CassDropdownItem from './DropdownItem';
export default {
    name: 'CassDropdown',
    props: ['active', 'label'],
    methods: {
        closeDropdown() {
            this.$emit('closeDropdown');
        }
    }
};
</script>

<style lang="scss">
.cass-user-group--dropdown {
    width: 100%;
    .dropdown-trigger {
        width: 100%;
    }
    .dropdown-menu {
        width: 100%;
    }
}
</style>