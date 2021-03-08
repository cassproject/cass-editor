<template>
    <div
        class="dropdown is-right"
        v-click-outside="closeCreateDropdown"
        :class="active ? 'is-active' : ''">
        <div class="dropdown-trigger">
            <button
                @click="$emit('toggle')"
                class="button is-primary is-hidden-touch is-outlined"
                aria-haspopup="true"
                aria-controls="directory-add-dropdown">
                <span class="icon">
                    <i class="fa fa-plus" />
                </span>
                <span>Add New</span>
                <span class="icon is-small">
                    <i
                        class="fas fa-angle-down"
                        aria-hidden="true" />
                </span>
            </button>
            <button
                @click="$emit('toggle')"
                class="button is-primary is-hidden-desktop is-outlined"
                aria-haspopup="true"
                aria-controls="directory-add-dropdown">
                <span class="icon">
                    <i class="fa fa-plus" />
                </span>
                <span class="icon is-small">
                    <i
                        class="fas fa-angle-down"
                        aria-hidden="true" />
                </span>
            </button>
        </div>
        <div
            class="dropdown-menu"
            id="directory-add-dropdown"
            role="menu">
            <div class="dropdown-content">
                <a
                    v-if="frameworkEnabled"
                    href="#"
                    @click="$emit('framework')"
                    class="dropdown-item">
                    Framework
                </a>
                <a
                    v-if="subdirectoryEnabled"
                    @click="$emit('subdirectory')"
                    class="dropdown-item">
                    Sub directory
                </a>
                <a
                    v-if="directoryEnabled"
                    @click="$emit('directory')"
                    class="dropdown-item">
                    Directory
                </a>
                <a
                    v-if="conceptEnabled"
                    @click="$emit('concept')"
                    class="dropdown-item">
                    Concept
                </a>
                <a
                    v-if="resourceEnabled"
                    @click="$emit('resource')"
                    href="#"
                    class="dropdown-item">
                    Resource
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddNewDropdown',
    props: {
        active: {
            type: Boolean,
            default: false
        },
        frameworkEnabled: {
            type: Boolean,
            default: false
        },
        resourceEnabled: {
            type: Boolean,
            default: false
        },
        conceptEnabled: {
            type: Boolean,
            default: false
        },
        directoryEnabled: {
            type: Boolean,
            default: false
        },
        subdirectoryEnabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            createResource: false,
            createFramework: false,
            createDirectory: false,
            createSubdirectory: false
        };
    },
    methods: {
        closeCreateDropdown() {
            this.$emit('close');
        }
    }
};
</script>