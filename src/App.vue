<template>
    <div
        id="app"
        class="has-navbar-fixed-top">
        <!-- nav bar navigation -->
        <nav
            class="navbar is-black is-fixed-top"
            role="navigation"
            aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-start">
                    <div class="navbar-item">
                        <router-link to="/new">
                            New
                        </router-link>
                    </div>
                    <div class="navbar-item">
                        <router-link to="/">
                            Open
                        </router-link>
                    </div>
                    <div class="navbar-item">
                        <router-link to="/import">
                            Import
                        </router-link>
                    </div>
                    <div
                        class="navbar-item has-dropdown is-hoverable"
                        v-if="$route.name=='framework'">
                        <a class="navbar-link">
                            Export
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                Achivement Standards Network (RDF+JSON)
                            </a>
                            <a class="navbar-item">
                                CaSS (JSON-LD)
                            </a>
                            <a class="navbar-item">
                                CaSS (RDF Quads)
                            </a>
                            <a class="navbar-item">
                                CaSS (RDF+JSON)
                            </a>
                            <a class="navbar-item">
                                CaSS (RDF+XML)
                            </a>
                            <a class="navbar-item">
                                CaSS (Turtle)
                            </a>
                            <a class="navbar-item">
                                Credential Engine ASN (JSON-LD)
                            </a>
                            <a class="navbar-item">
                                Credential Engine ASN (CSV)
                            </a>
                            <a class="navbar-item">
                                Table (CSV)
                            </a>
                            <a class="navbar-item">
                                IMS Global CASE (JSON)
                            </a>
                        </div>
                    </div>
                    <div class="navbar-item">
                        <router-link to="/help">
                            Help
                        </router-link>
                    </div>
                </div>
                <a
                    role="button"
                    class="navbar-burger burger"
                    :class="{ 'is-active': navBarActive}"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="artPagesDropDown"
                    @click="navBarActive = !navBarActive">
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>
            <!-- nav bar tablet and mobile drop down side navigation -->
            <div
                id="artPagesDropDown"
                class="navbar-menu is-spaced"
                :class="{ 'is-active': navBarActive}">
                <div class="navbar-end">
                    <div
                        class="navbar-item has-dropdown is-hidden-desktop"
                        :class="{ 'is-active': navBarActive}">
                        navbar-mobile
                    </div>
                </div>
            </div>
        </nav>
        <div class="custom-overflow">
            <div class="is-multiline is-desktop is-centered">
                <router-view class="is-full pagesFull" />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">

.pagesFull {
    margin-top:40px;
}
.pagesRightFull {
    width: calc(100% - 360px) !important;
    margin-left: 360px;
    margin-top:50px;
}
.menu {
    min-height: calc(100vh - 50px);
    z-index: 1;
    width: 360px;
    position: fixed;
    top: 52px;
    a {
        cursor: pointer;
    }
    .menu-list a {
        display: inline-block;
        width: 100%;
    }
    .menu-item {
        padding: 1rem;
        margin-bottom:0;
    }
    .custom-overflow{
        overflow-y:scroll;
        height: calc(100vh - 52px);
    }
}
.navbar {
    max-width: 100vw;
    .navbar-item a{
      color:white;
    }
    .navbar-dropdown a{
      color:black;
    }
}
</style>
<style lang="scss">
    @import './styles.scss';
</style>
<script>
export default {
    data: function() {
        return {navBarActive: false};
    }
};
</script>