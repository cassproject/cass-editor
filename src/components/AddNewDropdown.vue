<template>
    <div
        class="dropdown"
        v-click-outside="closeCreateDropdown"
        :class="[active ? 'is-active' : '', 'is-' + align]">
        <div class="dropdown-trigger">
            <button
                @click="$emit('toggle')"
                :class="'is-' + color"
                class="button is-hidden-touch"
                aria-haspopup="true"
                aria-controls="directory-add-dropdown">
                <span class="icon">
                    <i class="fa fa-plus" />
                </span>
                <span>New</span>
                <span class="icon is-small">
                    <i
                        class="fas fa-angle-down"
                        aria-hidden="true" />
                </span>
            </button>
            <button
                @click="$emit('toggle')"
                :class="'is-' + color"
                class="button is-hidden-desktop is-outlined"
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
                    v-if="collectionEnabled"
                    @click="$emit('collection')"
                    class="dropdown-item">
                    Collection
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
                    v-if="conceptEnabled && queryParams.ceasnDataFields === 'true'"
                    @click="$emit('concept')"
                    class="dropdown-item">
                    Concept Scheme
                </a>
                <a
                    v-if="conceptEnabled && queryParams.ceasnDataFields === 'true'"
                    @click="$emit('progression')"
                    class="dropdown-item">
                    Progression Model
                </a>
                <a
                    v-else-if="conceptEnabled"
                    @click="$emit('concept')"
                    class="dropdown-item">
                    Taxonomy
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
import {mapState} from 'vuex';
export default {
    name: 'AddNewDropdown',
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        align: {
            type: String,
            default: 'right'
        },
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
        },
        collectionEnabled: {
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
    computed: {
        ...mapState({
            queryParams: state => state.editor.queryParams
        })
    },
    methods: {
        closeCreateDropdown() {
            this.$emit('close');
        }
    }
};
</script>