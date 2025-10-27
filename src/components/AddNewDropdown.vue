<template>
    <div
        class="dropdown"
        v-click-outside="closeCreateDropdown"
        :class="[active ? 'is-active' : '', 'is-' + align]">
        <div class="dropdown-trigger">
            <button
                @click="$emit('toggle')"
                id="add-new-dropdown-toggle-button"
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
                id="add-new-dropdown-toggle-button-mobile"
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
                    id="add-new-dropdown-framework"
                    class="dropdown-item">
                    Framework
                </a>
                <a
                    v-if="collectionEnabled"
                    @click="$emit('collection')"
                    id="add-new-dropdown-collection"
                    class="dropdown-item">
                    Collection
                </a>
                <a
                    v-if="subdirectoryEnabled"
                    @click="$emit('subdirectory')"
                    id="add-new-dropdown-subdirectory"
                    class="dropdown-item">
                    Sub directory
                </a>
                <a
                    v-if="directoryEnabled"
                    @click="$emit('directory')"
                    id="add-new-dropdown-directory"
                    class="dropdown-item">
                    Directory
                </a>
                <a
                    v-if="conceptEnabled && queryParams.ceasnDataFields === 'true'"
                    @click="$emit('concept')"
                    id="add-new-dropdown-concept-scheme"
                    class="dropdown-item">
                    Concept Scheme
                </a>
                <a
                    v-if="conceptEnabled && queryParams.ceasnDataFields === 'true'"
                    @click="$emit('progression')"
                    id="add-new-dropdown-progression-model"
                    class="dropdown-item">
                    Progression Model
                </a>
                <a
                    v-else-if="conceptEnabled"
                    @click="$emit('concept')"
                    id="add-new-dropdown-concept-scheme"
                    class="dropdown-item">
                    Taxonomy
                </a>
                <a
                    v-if="resourceEnabled"
                    @click="$emit('resource')"
                    id="add-new-dropdown-resource"
                    href="#"
                    class="dropdown-item">
                    Resource
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'pinia';
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
        ...mapState("editor",{
            queryParams: state => state.queryParams
        })
    },
    methods: {
        closeCreateDropdown() {
            this.$emit('close');
        }
    }
};
</script>