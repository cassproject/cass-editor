<template>
    <aside
        id="app-narrow-side-nav-bar"
        class="has-background-primary has-text-white"
        :class="{ 'narrow-menu': !showSideNav}">
        <div
            class="menu-label has-text-white is-size-3">
            <template v-if="displayName !== 'No user'">
                <h3 class="is-size-2 has-text-weight-semibold">
                    {{ displayName }}
                </h3>
                <p class="is-size-5">
                    {{ loggedOnPerson.email }}
                </p>
                <p class="is-size-5">
                    {{ loggedOnPerson.type }}
                </p>
                <div class="buttons is-right">
                    <router-link
                        class="button is-outlined is-link"
                        to="/login">
                        <span class="icon">
                            <i class="fa fa-sign-in-alt" />
                        </span>
                    </router-link>
                </div>
            </template>
            <template v-else>
                <router-link
                    class="button is-outlined is-link"
                    to="/login">
                    <span class="icon">
                        <i class="fa fa-sign-in-alt" />
                    </span>
                </router-link>
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
            class="menu-label has-text-weight-bold">
            Competencies & Frameworks
        </div>
        <ul
            class="menu-list">
            <li class="has-text-white">
                <router-link to="/frameworks">
                    Frameworks
                </router-link>
            </li>
            <li
                class="has-text-white"
                @click="$emit('createNewFramework')">
                <a> New Framework</a>
            </li>
            <!-- hidding this for now -->
            <li
                class="has-text-white">
                <router-link to="/crosswalk">
                    Crosswalk Frameworks
                </router-link>
            </li>
            <li class="has-text-white">
                <router-link
                    to="/import"
                    @click.native="$store.commit('editor/conceptMode', false)">
                    Import
                </router-link>
            </li>
        </ul>
        <!-- CONCEPT SCHEMES -->
        <div
            class="menu-label has-text-weight-bold">
            Concept Schemes
        </div>
        <ul
            class="menu-list">
            <li class="has-text-white">
                <router-link to="/concepts">
                    Concepts
                </router-link>
            </li>
            <li
                class="has-text-white"
                @click="$emit('createNewConceptScheme')">
                <a> New Concept Scheme</a>
            </li>
            <li class="has-text-white">
                <router-link
                    to="/import"
                    @click.native="$store.commit('editor/conceptMode', true)">
                    Import
                </router-link>
            </li>
        </ul>
        <ul class="menu-list" />
        <div
            class="menu-label has-text-weight-bold">
            Configuration
        </div>
        <ul
            class="menu-list">
            <li>
                <router-link to="/configuration">
                    Configurations
                </router-link>
            </li>
            <li>
                <router-link to="/pluginManager">
                    Plugins
                </router-link>
            </li>
            <li v-if="isLoggedOn">
                <router-link to="/users">
                    Users/Groups
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
import {mapState} from 'vuex';
import {cassUtil} from './../mixins/cassUtil';
export default {
    name: 'NarrowSideNav',
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
<style>
#app-side-nav-bar {
    position: fixed;
    z-index: 12;
    top: 0;
    left:0;
    height: calc(100vh - 3.25rem);
    margin-top: 3.25rem;
    bottom: 0;
    overflow-y: scroll;
}
.narrow-menu {
    width: 4rem;
}
</style>