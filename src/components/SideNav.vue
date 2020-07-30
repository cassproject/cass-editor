<template>
    <aside
        id="app-side-nav-bar"
        :class="{'is-narrow': !showSideNav}"
        class="menu has-background-primary has-text-white">
        <div
            class="">
            <router-link
                v-if="queryParams.ceasnDataFields !== 'true'"
                to="/">
                <img
                    v-if="showSideNav"
                    class="cass-logo"
                    :src="casslogo">
                <img
                    v-else
                    class="cass-logo-square"
                    :src="casslogoSquare">
            </router-link>
            <div
                v-if="showSideNav"
                class="icon is-pulled-right"
                @click="$store.commit('app/closeSideNav')">
                <i class="fa fa-times" />
            </div>
        </div>
        <div
            class="menu-label has-text-white is-size-3">
            <div
                v-if="!showSideNav"
                class="buttons is-centered"
                @click="$store.commit('app/showSideNav')">
                <div class="button is-outlined is-white">
                    <span class="icon icon has-text-centered">
                        <i class="fa fa-bars has-text-centered" />
                    </span>
                </div>
            </div>
            <template v-if="displayName !== 'No user'">
                <div class="has-text-centered">
                    <span
                        class="icon has-text-centered"
                        v-if="!showSideNav">
                        <i class="far fa-user-circle" />
                    </span>
                </div>
                <h3 class="is-size-2 has-text-weight-semibold">
                    <span v-if="showSideNav">{{ displayName }}</span>
                </h3>
                <p
                    v-if="showSideNav"
                    class="is-size-5">
                    {{ loggedOnPerson.email }}
                </p>
                <p
                    v-if="showSideNav"
                    class="is-size-5">
                    {{ loggedOnPerson.type }}
                </p>
                <div
                    class="buttons is-right"
                    v-if="showSideNav">
                    <router-link
                        class="button is-outlined is-link"
                        to="/login">
                        <span class="icon">
                            <i class="fa fa-sign-out-alt" />
                        </span>
                        <span v-if="showSideNav">logout</span>
                    </router-link>
                </div>
                <div
                    class="buttons is-centered"
                    v-else>
                    <router-link
                        class="button is-text has-text-link is-medium"
                        to="/login">
                        <span class="icon">
                            <i class="fa fa-sign-out-alt" />
                        </span>
                    </router-link>
                </div>
            </template>
            <template v-else-if="loginEnabled">
                <router-link
                    v-if="showSideNav"
                    class="button is-outlined is-link"
                    to="/login">
                    <span class="icon">
                        <i class="fa fa-sign-in-alt" />
                    </span><span v-if="showSideNav">login</span>
                </router-link>
                <div
                    v-if="!showSideNav"
                    class="buttons is-centered"
                    to="/login">
                    <router-link
                        to="/login"
                        class="button  is-outlined is-link">
                        <span class="icon">
                            <i class="fa fa-sign-in-alt" />
                        </span>
                    </router-link>
                </div>
            </template>
            <!-- might need later to close -->
            <div
                v-if="false"
                class="icon is-pulled-right">
                <i class="fa fa-caret-right" />
            </div>
        </div>
        <hr>
        <!-- END OPTION TO NAVIGATE BACK -->

        <!-- GENERAL MENU -->
        <div
            v-if="showSideNav"
            class="menu-label has-text-weight-bold">
            Competencies & Frameworks
        </div>
        <ul
            class="menu-list">
            <li class="has-text-white">
                <router-link to="/frameworks">
                    <span class="icon">
                        <i class="fa fa-list-alt" />
                    </span>
                    <span v-if="showSideNav"> Frameworks</span>
                </router-link>
            </li>
            <li
                v-if="showSideNav"
                class="has-text-white"
                @click="$emit('createNewFramework')">
                <a>
                    <span class="icon">
                        <i class="fa fa-plus" />
                    </span><span v-if="showSideNav">New framework</span></a>
            </li>
            <!-- hidding this for now -->
            <li
                class="has-text-white"
                v-if="crosswalkEnabled">
                <router-link to="/crosswalk">
                    <span class="icon">
                        <i class="fa fa-network-wired" />
                    </span>
                    <span v-if="showSideNav"> Crosswalk Frameworks</span>
                </router-link>
            </li>
            <li
                class="has-text-white"
                v-if="showSideNav">
                <router-link
                    to="/import"
                    @click.native="$store.commit('editor/conceptMode', false); $store.dispatch('app/clearImport');">
                    <span class="icon">
                        <i class="fa fa-upload" />
                    </span><span v-if="showSideNav">
                        Import Framework
                    </span>
                </router-link>
            </li>
        </ul>
        <!-- CONCEPT SCHEMES -->
        <div
            v-if="showSideNav"
            class="menu-label has-text-weight-bold">
            <span v-if="queryParams.ceasnDataFields === 'true'">Concept Schemes</span>
            <span v-else>Taxonomy</span>
        </div>
        <ul
            class="menu-list">
            <li class="has-text-white">
                <router-link to="/concepts">
                    <span class="icon">
                        <i class="fa fa-layer-group" />
                    </span>
                    <span v-if="showSideNav && queryParams.ceasnDataFields === 'true'">
                        Concepts
                    </span>
                    <span v-if="showSideNav">
                        Taxonomies
                    </span>
                </router-link>
            </li>
            <li
                v-if="showSideNav"
                class="has-text-white"
                @click="$emit('createNewConceptScheme')">
                <a>
                    <span class="icon">
                        <i class="fa fa-plus" />
                    </span>
                    <span>
                        New
                        <span v-if="showSideNav && queryParams.ceasnDataFields === 'true'">
                            Concept
                        </span>
                        <span v-else-if="showSideNav">
                            Taxonomy
                        </span>
                    </span>
                </a>
            </li>
            <li
                class="has-text-white"
                v-if="showSideNav">
                <router-link
                    to="/import"
                    @click.native="$store.commit('editor/conceptMode', true); $store.dispatch('app/clearImport');">
                    <span class="icon">
                        <i class="fa fa-upload" />
                    </span>
                    Import
                    <span v-if="showSideNav && queryParams.ceasnDataFields === 'true'">
                        Concept
                    </span>
                    <span v-else-if="showSideNav">
                        Taxonomy
                    </span>
                </router-link>
            </li>
        </ul>
        <ul class="menu-list" />
        <div
            v-if="showSideNav && (configurationsEnabled || userManagementEnabled)"
            class="menu-label has-text-weight-bold">
            Configuration
        </div>
        <ul
            class="menu-list">
            <li v-if="configurationsEnabled">
                <router-link to="/configuration">
                    <span class="icon">
                        <i class="fa fa-cog" />
                    </span><span v-if="showSideNav">Configurations</span>
                </router-link>
            </li>
            <li v-if="isLoggedOn && userManagementEnabled">
                <router-link to="/users">
                    <span class="icon">
                        <i class="fa fa-users" />
                    </span><span v-if="showSideNav">Users and Groups</span>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
import {mapState} from 'vuex';
import casslogo from '@/assets/cass-logo-white.svg';
import casslogoSquare from '@/assets/cass-logo-square.png';
import {cassUtil} from './../mixins/cassUtil';
export default {
    name: 'SideNav',
    props: {
        method: {
            default: ''
        },
        showSideNav: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            casslogo: casslogo,
            casslogoSquare: casslogoSquare,
            serverUrl: null,
            url: null
        };
    },
    watch: {
        serverUrl: function() {
            this.$emit('updateUrl', this.serverUrl);
        },
        url: function() {
            this.$emit('updateUrl', this.url);
        }
    },

    computed: {
        ...mapState({
            crosswalkEnabled: state => state.featuresEnabled.crosswalkEnabled,
            userManagementEnabled: state => state.featuresEnabled.userManagementEnabled,
            configurationsEnabled: state => state.featuresEnabled.configurationsEnabled,
            loginEnabled: state => state.featuresEnabled.loginEnabled,
            queryParams: state => state.editor.queryParams
        }),
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        isLoggedOn: function() {
            if (this.loggedOnPerson && this.loggedOnPerson.name) {
                return true;
            } else {
                return false;
            }
        },
        displayName: function() {
            if (this.isLoggedOn) {
                return this.loggedOnPerson.name;
            } else {
                return 'No user';
            }
        },
        currentRoute: function() {
            return this.$route.path;
        },
        supportedFiles: function() {
            return this.$store.getters['editor/conceptMode'] === true ? this.supportedConceptFileTypes : this.supportedFileTypes;
        },
        loggedOnPerson: function() {
            return this.$store.getters['user/loggedOnPerson'];
        }
    }
};
</script>
<style lang="scss">
.cass-logo {
    max-width: 100px;
    display: inline;
    margin: auto;
    width: 100%;
    padding: 0rem .5rem;
}
.cass-logo-square {
    max-width: 100px;
    display: block;
    margin: auto;
    width: 100%;
    padding: .5rem .5rem;
}
#app-side-nav-bar {
    position: fixed;
    z-index: 12;
    top: 0;
    left:0;
    height: calc(100vh);
    margin-top: 0rem;
    bottom: 0;
    overflow-y: scroll;
}

.menu.is-narrow {
    margin: auto !important;
    padding: .25rem !important;
    width: 4rem;
    .menu-label {
        div.open-nav {
            display: block;
            margin: auto;
            padding: .5rem 0rem;
        }
    }
    .menu-list {
        margin: auto !important;
        display: block;
        a {
            padding: .5em !important;
            text-align: center;
        }
    }
}
</style>