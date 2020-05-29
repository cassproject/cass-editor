<template>
    <aside
        id="app-side-nav-bar"
        v-if="showSideNav"
        class="menu has-background-primary has-text-white">
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
            </template>
            <template v-else>
                <router-link
                    class="button is-outlined is-link"
                    to="/login">
                    login
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
        <!-- OPTION TO NAVIGATE BACK -->
        <div
            class="menu-label has-text-white"
            :class="[{'is-hidden': currentRoute == '/'}]">
            <router-link to="/">
                <span class="icon">
                    <i class="fa fa-arrow-left" />
                </span>
                <span>back</span>
            </router-link>
        </div>
        <!-- END OPTION TO NAVIGATE BACK -->

        <!-- GENERAL MENU -->
        <div
            class="menu-label has-text-weight-bold">
            Competencies & Frameworks
        </div>
        <ul
            class="menu-list">
            <li class="has-text-white">
                <router-link to="/">
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
                <router-link to="/import">
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
            class="menu-list"
            v-if="currentRoute !== '/config'">
            <li>
                <router-link to="/config">
                    Configurations
                </router-link>
            </li>
            <li>
                <router-link to="/usergroup">
                    Users/Groups
                </router-link>
            </li>
        </ul>
        <!-- CONFIG OPTIONS -->
        <ul
            v-if="currentRoute === '/config'"
            class="menu-list">
            <li>
                <a v-scroll-to="'#configuration-details'">
                    <span>Configuration Details</span>
                </a>
            </li>
            <li>
                <a
                    href="#"
                    v-scroll-to="'#framework-properties'">Framework Properties</a>
            </li>
            <li>
                <a
                    href="#"
                    v-scroll-to="'#competency-properties'">Competency Properties</a>
            </li>
            <li>
                <a
                    href="#"
                    v-scroll-to="'#enforce-competency-types'">Enforce Competency Types</a>
            </li>
            <li>
                <a
                    href="#"
                    v-scroll-to="'#allow-levels'">Allow Levels</a>
            </li>
            <li>
                <a
                    href="#"
                    v-scroll-to="'#enforce-level-values'">Enforce Level Values</a>
            </li>
            <li>
                <a
                    href="#"
                    v-scroll-to="'#competency-relationships'">Competency Relationships</a>
            </li>
            <li>
                <a
                    href="#"
                    v-scroll-to="'#resource-alignments'">Resource Alignments</a>
            </li>
            <li>
                <a
                    href="#"
                    v-scroll-to="'#default-owners'">Default Owners</a>
            </li>
            <li>
                <a
                    href="#"
                    v-scroll-to="'#default-readers'">Default Readers</a>
            </li>
            <li>
                <a
                    href="#"
                    v-scroll-to="'#default-commenters'">Default Commenters</a>
            </li>
        </ul>
    </aside>
</template>

<script>
import {mapState} from 'vuex';
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
        amLoggedIn: function() {
            if (EcIdentityManager && EcIdentityManager.ids && EcIdentityManager.ids.length > 0) return true;
            else return false;
        },
        displayName: function() {
            if (this.amLoggedIn) {
                return this.loggedOnPerson.name;
            } else {
                return 'No user';
            }
        },
        currentRoute: function() {
            return this.$route.path;
        },
        supportedFiles: function() {
            return this.queryParams.concepts === 'true' ? this.supportedConceptFileTypes : this.supportedFileTypes;
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
    z-index: 2;
    top: 0;
    left:0;
    height: calc(100vh - 47px);
    margin-top: 64px;
    bottom: 0;
    overflow-y: scroll;
}
</style>