<template>
    <aside
        id="app-side-nav-bar"
        v-if="showSideNav"
        class="menu has-background-primary has-text-white">
        <div
            class="menu-label has-text-white is-size-3">
            {{ displayName }}
            <!-- might need later to close -->
            <div
                v-if="false"
                class="icon is-pulled-right">
                <i class="fa fa-caret-right" />
            </div>
        </div>

        <div>
            Role title
        </div>
        <div>
            Organization Name
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
            class="menu-label"
            v-if="currentRoute === '/' || currentRoute === '/import'">
            Competencies & Frameworks
        </div>
        <ul
            class="menu-list"
            v-if="currentRoute === '/' || currentRoute === '/import'">
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
        <div
            class="menu-label"
            v-if="currentRoute === '/'">
            Activity
        </div>
        <ul class="menu-list" />
        <div
            class="menu-label"
            v-if="currentRoute === '/' || currentRoute === '/import'">
            Configuration
        </div>
        <ul
            class="menu-list"
            v-if="currentRoute === '/' || currentRoute === '/import'">
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
        <!-- END GENERAL MENU -->

        <!-- IMPORT OPTIONS -->
        <div
            class=""
            v-if="false">
            <h3 class="subtitle has-text-white is-size-3 has-text-weight-bold">
                Import Options
            </h3>
            <div class="menu-label">
                Supported File Type
            </div>
            <ul class="menu-list">
                <li>
                    <a title="PDF imports are experimental. While some may work, we are still working out the kinks.">
                        <span>PDF</span>
                        <span class="icon">
                            <i class="fa fa-exclamation" />
                        </span>
                    </a>
                </li>
                <li>
                    <a title="HTML imports are supported at this time.">HTML<span class="icon"><i class="fa fa-check" /></span></a>
                </li>
                <li>
                    <a title="DOCX imports are experimental, while some may work, we are still working out the kinks.">DOCX<span class="icon"><i class="fa fa-check" /></span></a>
                </li>
            </ul>
            <div class="menu-label">
                Supported Framework Formats
            </div>
            <ul class="menu-list">
                <li>
                    <a
                        href="https://www.careeronestop.org/competencymodel/home.aspx"
                        target="_blank">
                        Competency Model Clearinghouse
                    </a>
                </li>
                <li>
                    <a
                        href="https://kctcs.edu/"
                        target="_blank">
                        Kentucky Community and Technical College System
                    </a>
                </li>
                <li>
                    <a
                        href="https://act.org"
                        target="_blank">
                        ACT.org</a>
                </li>
                <li>
                    <a
                        href="https://www.nccco.org/"
                        target="_blank">
                        National Commission for the Certification of Crane Operators
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.dol.gov/agencies/eta"
                        target="_blank">
                        Department of Labor: Employment and Training Administration
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.urban.org/policy-centers/center-labor-human-services-and-population/projects/competency-based-occupational-frameworks-registered-apprenticeships"
                        target="_blank">
                        CBOF</a>
                </li>
            </ul>
        </div>
        <!-- END IMPORT CONTEXTUAL MENU -->
        <!-- CONFIG OPTIONS -->
        <div
            class=""
            v-if="currentRoute === '/config'">
            <h3 class="subtitle has-text-white is-size-3 has-text-weight-bold">
                Configuration
            </h3>
            <div class="menu-label">
                Configuration
            </div>
            <ul class="menu-list">
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
        </div>
        <!-- END IMPORT CONTEXTUAL MENU -->
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
        },
        queryParams: Object
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
    margin-top: 50px;
    bottom: 0;
    overflow-y: scroll;
}
</style>