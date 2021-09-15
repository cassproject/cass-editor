<template>
    <nav
        class="navbar is-black is-fixed-top"
        role="navigation"
        aria-label="main navigation">
        <div class="navbar-brand">
            <div
                @click="$store.commit('app/showSideNav')"
                v-if="!showSideNav"
                class="navbar-item">
                <div class="icon has-text-white">
                    <i class="fa fa-bars" />
                </div>
            </div>
            <div
                v-else
                @click="$store.commit('app/closeSideNav')"
                class="navbar-item">
                <div class="icon has-text-white">
                    <i class="fa fa-chevron-down has-text-white" />
                </div>
            </div>
            <div class="navbar-item">
                <router-link :to="{path: '/frameworks', query: queryParams}">
                    <h2 class="has-text-white subtitle has-text-weight-bold">
                        CaSS
                    </h2>
                </router-link>
            </div>
        </div>
    <!-- nav bar tablet and mobile drop down side navigation -->
    </nav>
</template>

<script>
export default {
    name: 'Topbar',
    props: {
        showSideNav: {
            dafault: false,
            type: Boolean
        }
    },
    data: function() {
        return {
            return() {
            }
        };
    },
    computed: {
        queryParams() {
            return this.$store.getters['editor/queryParams'];
        }
    }
};
</script>

<style lang="scss">
</style>