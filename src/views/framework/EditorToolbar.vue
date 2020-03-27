<template>
    <div
        id="framework-editor-toolbar"
        class="has-background-white">
        <!-- property view -->
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
                            class="fas fa-angle-down"
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
                            <i class="fa fa-check" />
                        </span>
                        Primary Properties
                    </a>
                    <a
                        @click="changeProperties('secondary')"
                        class="dropdown-item">
                        <span
                            :class="activeView==='secondary'? '' : 'is-hidden'"
                            class="icon">
                            <i class="fa fa-check" />
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
                            class="fas fa-angle-down"
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
                        href="#"
                        class="dropdown-item">
                        Export
                    </a>
                    <a
                        @click="$emit('openShareModalEvent')"
                        class="dropdown-item">
                        Manage Users
                    </a>
                </div>
            </div>
        </div>
        <div
            @click="$emit('openCommentsEvent')"
            class="button is-text">
            <span class="icon">
                <i class="fas fa-comment-alt" />
            </span>
        </div>
        <div class="button is-text">
            <span class="icon">
                <i class="fas fa-undo-alt" />
            </span>
        </div>
        <div class="button is-text">
            <span class="icon">
                <i class="fas fa-history" />
            </span>
        </div>
        <div class="framework-search">
            <input
                class="input"
                type="text"
                placeholder="Text input">
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
        changeProperties(type) {
            this.$emit('changeProperties', type);
            this.showPropertyViewDropDown = false;
            this.activeView = type;
        }
    }
};
</script>

<style lang="scss">
    @import './../../scss/variables.scss';

#framework-editor-toolbar {
    position: fixed;
    border-bottom: solid 1px $light;
    top: 52px;
    z-index: 10;
    height: 36px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: space-between;
    justify-items: center;
    align-content: center;
    align-items: center;
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