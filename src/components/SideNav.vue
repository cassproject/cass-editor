<template>
    <aside
        id="app-side-nav-bar"
        :class="{'is-narrow': !showSideNav}"
        class="menu has-background-primary has-text-white">
        <div class="">
            <!--CaSS Logo-->
            <router-link
                v-if="queryParams.ceasnDataFields !== 'true'"
                :to="{path: '/', query: queryParams}">
                <img
                    v-if="showSideNav"
                    class="cass-logo"
                    :src="casslogo">
                <img
                    v-else
                    class="cass-logo-square"
                    :src="casslogoSquare">
            </router-link>
            <!--Collapse / Grow Icon-->
            <div
                v-if="!showSideNav"
                class="buttons is-centered"
                @click="$store.commit('app/showSideNav')">
                <button class="button is-outlined is-rounded p-0">
                    <i class="fa fa-chevron-right px-3" />
                </button>
            </div>
            <div
                v-if="showSideNav"
                class="button is-rounded p-0 is-pulled-right"
                @click="$store.commit('app/closeSideNav')">
                <i class="fa fa-chevron-left p-3" />
            </div>
        </div>
        <div
            class="menu-label has-text-white is-size-3">
            <template v-if="displayName !== 'No user'">
                <div
                    v-if="!showSideNav"
                    class="cass-editor__logged-in-user-icon">
                    <span
                        :title="'Signed in as: ' + displayName">
                        {{ loggedOnPerson.email.slice(0, 2) }}
                    </span>
                </div>
                <h3 class="is-size-3 has-text-weight-semibold">
                    <span v-if="showSideNav">{{ displayName }}</span>
                </h3>
                <p
                    v-if="showSideNav"
                    class="is-size-6">
                    {{ loggedOnPerson.email }}
                </p>
                <!-- <p
                    v-if="showSideNav"
                    class="is-size-5">
                    {{ loggedOnPerson.type }}
                </p> -->
                <p
                    v-if="showSideNav && $store.getters['user/lastLogin']"
                    class="is-size-6">
                    Last Login: {{ new Date($store.getters['user/lastLogin']).toLocaleString() }}
                </p>
                <div
                    class="buttons is-right"
                    v-if="showSideNav"
                    title="Log out">
                    <div
                        class="button is-rounded white"
                        @click="performApplicationLogout">
                        <span class="icon">
                            <i class="fa fa-sign-out-alt" />
                        </span>
                        <span v-if="showSideNav">logout</span>
                    </div>
                </div>
                <div
                    class="buttons pt-4 is-centered"
                    v-else>
                    <div
                        class="button is-outlined is-white"
                        @click="performApplicationLogout">
                        <span class="icon">
                            <i class="fa fa-sign-out-alt" />
                        </span>
                    </div>
                </div>
            </template>
            <template v-else-if="loginEnabled">
                <div
                    v-if="showSideNav"
                    class="button  is-large is-outlined is-white"
                    @click="performApplicationLogin">
                    <span class="icon">
                        <i class="fa fa-sign-in-alt" />
                    </span><span v-if="showSideNav">login</span>
                </div>
                <div
                    v-if="!showSideNav"
                    class="buttons is-centered">
                    <div
                        class="button is-outlined is-white"
                        @click="performApplicationLogin">
                        <span class="icon">
                            <i class="fa fa-sign-in-alt" />
                        </span>
                    </div>
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
        <!-- Add new buttons -->
        <!-- <div
            v-if="showSideNav"
            @click="addFrameworkOrDirectory = true;">
            <add-new-dropdown
                :frameworkEnabled="showFrameworks"
                :directoryEnabled="showFrameworks"
                :collectionEnabled="queryParams.ceasnDataFields === 'true'"
                @close="addFrameworkOrDirectory = false"
                :conceptEnabled="showConcepts"
                @toggle="addFrameworkOrDirectory = !addFrameworkOrDirectory"
                align="left"
                color="light"
                @directory="$store.commit('app/showModal', {component: 'AddDirectory'});"
                @concept="$emit('create-new-concept-scheme')"
                @framework="$emit('create-new-framework')"
                @collection="$emit('create-new-collection')"
                :active="addFrameworkOrDirectory" />
        </div> -->
        <!-- GENERAL MENU -->
        <!-- COMPETENCIES AND FRAMEWORKS -->
        <div
            v-if="showSideNav && showFrameworks"
            class="menu-label has-text-weight-bold">
            Framework
        </div>
        <ul
            class="menu-list"
            v-if="showFrameworks">
            <li class="has-text-white">
                <router-link
                    :to="{path: '/frameworks', query: queryParams}"
                    @click.native="$store.commit('editor/collectionMode', false)">
                    <span class="icon">
                        <i class="fa fa-th-list" />
                    </span>
                    <span v-if="showSideNav"> Frameworks</span>
                </router-link>
            </li>
            <li
                class="has-text-white"
                v-if="queryParams.ceasnDataFields === 'true' && showSideNav">
                <router-link
                    :to="{path: '/collections', query: queryParams}"
                    @click.native="$store.commit('editor/collectionMode', true)">
                    <span class="icon">
                        <i class="fa fa-th-list" />
                    </span>
                    <span v-if="showSideNav"> Collections</span>
                </router-link>
            </li>
            <li
                class="has-text-white"
                v-if="showSideNav">
                <router-link
                    :to="{path: '/import', query: queryParams}"
                    @click.native="$store.commit('editor/conceptMode', false); $store.dispatch('app/clearImport');">
                    <span class="icon">
                        <i class="fa fa-upload" />
                    </span><span v-if="showSideNav">
                        Import
                    </span>
                </router-link>
            </li>
            <li
                class="has-text-white"
                v-if="crosswalkEnabled">
                <router-link :to="{path: '/crosswalk', query: queryParams}">
                    <span class="icon">
                        <i class="fa fa-network-wired" />
                    </span>
                    <span v-if="showSideNav"> Crosswalk Frameworks</span>
                </router-link>
            </li>
            <li
                v-for="navLink of pluginLinkMap['Competencies & Frameworks']"
                class="has-text-white"
                v-show="showSideNav && pluginsEnabled"
                :key="navLink">
                <a @click="setLaunchPluginValues(navLink)">
                    <span class="icon">
                        <i class="fa fa-plug" />
                    </span>
                    <span v-if="showSideNav"> {{ navLink.launchName }}</span>
                </a>
            </li>
        </ul>
        <template v-if="queryParams.disableAssertions !== 'true' && isLoggedOn">
            <div
                v-if="showSideNav"
                data-id="side-nav-assertions-section"
                class="menu-label has-text-weight-bold">
                Assertion
            </div>
            <ul
                class="menu-list">
                <li
                    class="has-text-white">
                    <router-link :to="{path: '/timeline', query: queryParams}">
                        <span class="icon">
                            <i class="fa fa-history" />
                        </span>
                        <span v-if="showSideNav"> Timeline</span>
                    </router-link>
                </li>
                <li
                    class="has-text-white">
                    <a
                        data-id="share-assertions-button"
                        @click="shareAssertions">
                        <span class="icon">
                            <i class="fa fa-share" />
                        </span>
                        <span v-if="showSideNav"> Share</span>
                    </a>
                </li>
            </ul>
        </template>
        <!-- DIRECTORIES -->
        <!-- <div
            v-if="showSideNav && showFrameworks"
            class="menu-label has-text-weight-bold">
            My Directories
        </div>
        <ul
            v-if="showSideNav && showFrameworks"
            class="menu-list">
            <li
                class="has-text-white cass--main-nav--list-item "
                v-for="directory in myTopLevelDirectories"
                :key="directory.id"
                @click="selectDirectory(directory)">
                <router-link :to="{path: '/directory', query: queryParams}">
                    <span
                        class="icon"
                        v-if="$store.getters['app/selectedDirectory'] && $store.getters['app/selectedDirectory'].id === directory.id">
                        <i class="fa fa-folder-open" />
                    </span>
                    <span
                        class="icon"
                        v-else>
                        <i class="fa fa-folder" />
                    </span>
                    <span
                        v-if="showSideNav"
                        class="cass--main-nav--item"> {{ directory.name }}</span>
                </router-link>
            </li>
        </ul> -->
        <!-- CONCEPT SCHEMES -->
        <div
            v-if="showSideNav && showConcepts"
            class="menu-label has-text-weight-bold">
            <span v-if="queryParams.ceasnDataFields === 'true'">Concept Schemes</span>
            <span v-else>Taxonomy</span>
        </div>
        <ul
            class="menu-list"
            v-if="showConcepts">
            <li class="has-text-white">
                <router-link :to="{path: '/concepts', query: queryParams}">
                    <span class="icon">
                        <i class="fa fa-layer-group" />
                    </span>
                    <span v-if="showSideNav && queryParams.ceasnDataFields === 'true'">
                        Concept Schemes
                    </span>
                    <span v-else-if="showSideNav">
                        Taxonomies
                    </span>
                </router-link>
            </li>
            <li
                class="has-text-white"
                v-if="showSideNav">
                <router-link
                    :to="{path: '/import', query: queryParams}"
                    @click.native="$store.commit('editor/conceptMode', true); $store.dispatch('app/clearImport');">
                    <span class="icon">
                        <i class="fa fa-upload" />
                    </span>
                    Import
                </router-link>
            </li>
            <li
                v-for="navLink of pluginLinkMap['Taxonomy']"
                class="has-text-white"
                v-show="showSideNav && pluginsEnabled"
                :key="navLink">
                <a @click="setLaunchPluginValues(navLink)">
                    <span class="icon">
                        <i class="fa fa-plug" />
                    </span>
                    <span v-if="showSideNav"> {{ navLink.launchName }}</span>
                </a>
            </li>
        </ul>
        <!--<ul class="menu-list" />-->
        <!-- CONFIGURATION -->
        <div
            v-if="showSideNav && (configurationsEnabled || userManagementEnabled)"
            class="menu-label has-text-weight-bold">
            Configuration
        </div>
        <ul
            class="menu-list">
            <li v-if="configurationsEnabled">
                <router-link :to="{path: '/configuration', query: queryParams}">
                    <span class="icon">
                        <i class="fa fa-cog" />
                    </span><span v-if="showSideNav">Configurations</span>
                </router-link>
            </li>
            <li v-if="pluginsEnabled">
                <router-link :to="{path: '/pluginManager', query: queryParams}">
                    <span class="icon">
                        <i class="fa fa-charging-station" />
                    </span><span v-if="showSideNav">Plugins</span>
                </router-link>
            </li>
            <li v-if="isLoggedOn && userManagementEnabled">
                <router-link :to="{path: '/users', query: queryParams}">
                    <span class="icon">
                        <i class="fa fa-users" />
                    </span><span v-if="showSideNav">Groups</span>
                </router-link>
            </li>
            <li
                v-for="navLink of pluginLinkMap['Configuration']"
                class="has-text-white"
                v-show="showSideNav && pluginsEnabled"
                :key="navLink">
                <a @click="setLaunchPluginValues(navLink)">
                    <span class="icon">
                        <i class="fa fa-plug" />
                    </span>
                    <span v-if="showSideNav"> {{ navLink.launchName }}</span>
                </a>
            </li>
        </ul>
        <!-- NON STANDARD NAV CATEGORIES (FROM PLUGINS) -->
        <div
            class="menu-label"
            v-show="pluginsEnabled"
            v-for="nonStandardNavCat of getNonStandardNavCategoriesFromPlugins"
            :key="nonStandardNavCat">
            <div
                v-if="showSideNav"
                class="menu-label has-text-weight-bold">
                {{ nonStandardNavCat }}
            </div>
            <ul
                v-if="showSideNav"
                class="menu-list">
                <li
                    v-for="navLink of pluginLinkMap[nonStandardNavCat]"
                    class="has-text-white"
                    :key="navLink">
                    <a @click="setLaunchPluginValues(navLink)">
                        <span class="icon">
                            <i class="fa fa-plug" />
                        </span>
                        <span v-if="showSideNav"> {{ navLink.launchName }}</span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
import {mapState} from 'vuex';
import casslogo from '@/assets/cass-logo-white.svg';
import casslogoSquare from '@/assets/cass-logo-square.png';
import {cassUtil} from './../mixins/cassUtil';
import {cassApi} from './../mixins/cassApi';
import {pluginUtil} from './../mixins/pluginUtil';

export default {
    mixins: [cassUtil, cassApi, pluginUtil],
    name: 'SideNav',
    props: {
        method: {
            default: '',
            type: String
        },
        showSideNav: {
            default: false,
            type: Boolean
        }
    },
    components: {
    },
    data() {
        return {
            PLUGIN_CONTAINER_ROUTE: 'pluginContainer',
            STANDARD_NAV_CATEGORIES: ['Competencies & Frameworks', 'Taxonomy', 'Configuration'],
            casslogo: casslogo,
            casslogoSquare: casslogoSquare,
            pluginLinkMap: {},
            addFrameworkOrDirectory: false,
            addNewDirectory: false,
            directoryName: ""
        };
    },
    methods: {
        handleClickoutsidePopup() {
            if (this.addFrameworkOrDirectory) {
                this.addFrameworkOrDirectory = false;
                this.addNewDirectory = false;
            }
        },
        setLaunchPluginValues(pluginShortcut) {
            this.$store.commit('app/pluginToLaunch', pluginShortcut);
            this.$store.commit('app/pluginToLaunchLastUpdate', Date.now());
            if (!this.$router.currentRoute.name.equals(this.PLUGIN_CONTAINER_ROUTE)) this.$router.push({path: '/pluginContainer'});
        },
        buildPluginLinkMap() {
            // TODO handle screen type plugins at some point...this would be the place to do it...stash them on the VUEX store
            this.pluginLinkMap = {};
            let pluginKeys = Object.keys(this.pluginManifestData);
            for (let pk of pluginKeys) {
                let pm = this.pluginManifestData[pk];
                if (pm.shortcuts && pm.shortcuts.length > 0) {
                    for (let pmsc of pm.shortcuts) {
                        if (pmsc.launchLocation.toLowerCase().equals('main')) {
                            if (!this.pluginLinkMap[pmsc.launchCategory]) this.pluginLinkMap[pmsc.launchCategory] = [];
                            this.pluginLinkMap[pmsc.launchCategory].push(pmsc);
                        }
                    }
                }
            }
        },
        buildPluginListComplete: function() {
            let enabledPluginUrlList = this.getEnabledPluginUrlList();
            if (enabledPluginUrlList && enabledPluginUrlList.length > 0) {
                this.loadManifestDataForPluginUrlList(enabledPluginUrlList, this.buildPluginLinkMap);
            } else this.pluginLinkMap = {};
        },
        addNewlinesToId: function(pem) {
            // Begin public key line
            pem = pem.substring(0, 26) + "\n" + pem.substring(26);
            var length = pem.length;
            var start = 27;
            while (start + 64 < length) {
                pem = pem.substring(0, start + 64) + "\n" + pem.substring(start + 64);
                start += 65;
                length++;
            }
            // End public key line
            pem = pem.substring(0, length - 24) + "\n" + pem.substring(length - 24);
            return pem;
        },
        selectDirectory: function(directory) {
            this.$store.commit('app/selectDirectory', directory);
            this.$store.commit('app/rightAsideObject', directory);
            if (this.$router.currentRoute.name !== "directory") {
                this.$router.push({name: "directory"});
            }
        },
        saveDirectory: function() {
            let me = this;
            let dir = new EcDirectory();
            dir.name = this.directoryName;
            // dir.description = "Test Description";
            dir.generateId(window.repo.selectedServer);
            if (EcIdentityManager.default.ids.length > 0) {
                dir.addOwner(EcIdentityManager.default.ids[0].ppk.toPk());
            }
            dir["schema:dateCreated"] = new Date().toISOString();
            dir["schema:dateModified"] = new Date().toISOString();
            // To do: Add other owners and readers
            dir.save(function(success) {
                appLog("Directory saved: " + dir.id);
                me.directoryName = '';
                me.$store.dispatch('app/refreshDirectories');
                me.selectDirectory(dir);
            }, appError, window.repo);
        },
        shareAssertions: function() {
            this.$store.commit('app/showModal', {component: 'ShareAssertions'});
        }
    },
    watch: {
        pluginLastUpdate: function() {
            this.buildPluginList(this.buildPluginListComplete);
        }
    },
    computed: {
        ...mapState({
            crosswalkEnabled: state => state.featuresEnabled.crosswalkEnabled,
            userManagementEnabled: state => state.featuresEnabled.userManagementEnabled,
            configurationsEnabled: state => state.featuresEnabled.configurationsEnabled,
            pluginsEnabled: state => state.featuresEnabled.pluginsEnabled,
            loginEnabled: state => state.featuresEnabled.loginEnabled,
            queryParams: state => state.editor.queryParams,
            pluginLastUpdate: state => state.app.pluginLastUpdate,
            directoryList: state => state.app.directories.directoryList
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
        },
        getNonStandardNavCategoriesFromPlugins: function() {
            let nonStandardNavCats = [];
            let pluginNavCats = Object.keys(this.pluginLinkMap);
            for (let pnc of pluginNavCats) {
                if (!this.STANDARD_NAV_CATEGORIES.includes(pnc)) nonStandardNavCats.push(pnc);
            }
            nonStandardNavCats.sort();
            return nonStandardNavCats;
        },
        myTopLevelDirectories: function() {
            return this.directoryList.filter(directory => {
                return !directory.parentDirectory;
            });
        },
        showFrameworks() {
            // temporarily hide frameworks when in concept mode on CE instance & vice versa
            if (this.queryParams && this.queryParams.ceasnDataFields === 'true' && this.queryParams.concepts === 'true') {
                return false;
            }
            return true;
        },
        showConcepts() {
            if (this.queryParams && this.queryParams.ceasnDataFields === 'true' && this.queryParams.concepts !== 'true') {
                return false;
            }
            return true;
        }
    },
    mounted() {
        this.buildPluginList(this.buildPluginListComplete);
        this.$store.dispatch('app/refreshDirectories');
    }
};
</script>
<style lang="scss">
 @import '../scss/variables.scss';
 @import '../scss/side-nav.scss';

.cass-editor__logged-in-user-icon {
    border: solid 2px white;
    border-radius: 36px;
    text-align: center;
    line-height: 32px;
    font-size: 1.25rem;
    font-weight: 500;
    text-transform: uppercase;
    margin: auto;
    height: 36px;
    width: 36px;
}
.cass--main-nav--list-item a {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    max-width: 240px;
    display: inline-block;
}
</style>