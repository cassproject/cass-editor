<template>
    <div
        id="framework-editor-toolbar">
        <!-- property view -->
        <div class="fet__wrapper">
            <div
                class="dropdown"
                :class="{ 'is-active': showPropertyViewDropDown}">
                <div class="dropdown-trigger">
                    <button
                        class="button is-text"
                        @click="showPropertyViewDropDown = !showPropertyViewDropDown"
                        aria-haspopup="true">
                        <span>View</span>
                        <span class="icon is-small">
                            <i
                                class="fas fa-angle-down has-text-link"
                                aria-hidden="true" />
                        </span>
                    </button>
                </div>
                <div
                    class="dropdown-menu"
                    id="property-dropdown"
                    role="menu">
                    <div class="dropdown-content">
                        <a
                            @click="changeProperties('primary')"
                            class="dropdown-item">
                            <span
                                :class="activeView==='primary'? '' : 'is-hidden'"
                                class="icon">
                                <i class="fa fa-check has-text-primary" />
                            </span>
                            Primary Properties
                        </a>
                        <a
                            @click="changeProperties('secondary')"
                            class="dropdown-item">
                            <span
                                :class="activeView==='secondary'? '' : 'is-hidden'"
                                class="icon">
                                <i class="fa fa-check has-text-link" />
                            </span>
                            Secondary Properties
                        </a>
                        <a
                            @click="changeProperties('tertiary')"
                            class="dropdown-item">
                            <span
                                :class="activeView==='tertiary'? '' : 'is-hidden'"
                                class="icon">
                                <i class="fa fa-check" />
                            </span>
                            Tertiary Properties
                        </a>
                    </div>
                </div>
            </div>
            <!-- share: export or manage users -->
            <div
                class="dropdown"
                :class="{ 'is-active': showShareDropdown}">
                <div class="dropdown-trigger">
                    <button
                        class="button is-text"
                        @click="showShareDropdown = !showShareDropdown"
                        aria-haspopup="true">
                        <span>Share</span>
                        <span class="icon is-small">
                            <i
                                class="fas fa-angle-down has-text-link"
                                aria-hidden="true" />
                        </span>
                    </button>
                </div>
                <div
                    class="dropdown-menu"
                    id="share-menu"
                    role="menu">
                    <div class="dropdown-content">
                        <a
                            @click="$emit('showExportModal'); showShareDropdown = false;"
                            class="dropdown-item">
                            Export
                        </a>
                        <a
                            @click="showManageUsersModal(); showShareDropdown = false;"
                            class="dropdown-item">
                            Manage Users
                        </a>
                    </div>
                </div>
            </div>
            <!-- hook this button up to add a new node at the top of the
            hierarchy in editing mode -->
            <div
                v-if="showAddComments"
                @click="$store.commit('app/showModal', { component: 'AddComment'})"
                class="button is-text has-text-primary">
                <span class="icon">
                    <i class="fas fa-comment-medical" />
                </span>
            </div>
            <div
                v-if="showViewComments"
                @click="$store.commit('app/showRightAside', 'Comments')"
                class="button is-text has-text-dark">
                <span class="icon">
                    <i class="fas fa-comments" />
                </span>
            </div>
            <div class="button is-text has-text-dark">
                <span class="icon">
                    <i class="fas fa-undo-alt " />
                </span>
            </div>
            <div
                @click="$store.commit('app/showRightAside', 'Versions')"
                class="button is-text">
                <span class="icon">
                    <i class="fas fa-history has-text-dark" />
                </span>
            </div>
            <div class="framework-search">
                <input
                    class="input"
                    type="text"
                    placeholder="Text input">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'EditorToolbar',
    data() {
        return {
            showPropertyViewDropDown: false,
            showShareDropdown: false,
            activeView: "primary"
        };
    },
    methods: {
        showExportModal() {
            this.$store.commit('app/showModal', 'Export');
        },
        showManageUsersModal() {
            this.$store.commit('app/showModal', {component: 'Share'});
        },
        changeProperties(type) {
            this.$emit('changeProperties', type);
            this.showPropertyViewDropDown = false;
            this.activeView = type;
        }
    },
    computed: {
        showAddComments() {
            return this.$store.state.app.canAddComments;
        },
        showViewComments() {
            return this.$store.state.app.canViewComments;
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';

#framework-editor-toolbar {
    border-bottom: solid 1px $light;
    top: 52px;
    z-index: 10;
    height: 36px;
    display: fixed;
    width: 100%;
    padding: 4px;
    background-color:$light;
    .fet__wrapper {
        max-width: 1400px;
        display: flex;
        margin: auto;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        justify-content: space-between;
        justify-items: center;
        align-content: center;
        align-items: center;
    }
    .dropdown, .button, .framework-search {
        padding: 0px .5rem;
    }
    .framework-search {
        width: 100%;
    }
    .dropdown-menu {
        padding-top: 0;
        .dropdown-item:hover {
            background-color: $link;
        }
    }
    .fet_view-options {

    }
}
</style>