<template>
    <aside
        id="app-side-nav-bar"
        :class="{'is-narrow': !showSideNav,
                 'menu':true,
                 'has-background-primary':true,
                 'has-text-white':true}">
        <div>
            <div
                class="logo-container mx-3 my-2"
                :class="{'is-narrow' : !showSideNav}">
                <!-- CaSS Logo -->
                <router-link
                    v-if="queryParams.ceasnDataFields !== 'true'"
                    :to="{path: '/', query: queryParams}">
                    <img
                        v-if="showSideNav"
                        class="cass-logo"
                        alt="Cass logo"
                        :src="casslogo">
                </router-link>
                <!-- User icon -->
                <button
                    class="button is-rounded is-light cass-editor__logged-in-user-icon"
                    @click="showUserInfo = !showUserInfo">
                    <span
                        :title="'Signed in as: ' + displayName">
                        {{ loggedOnPerson.email != null ? loggedOnPerson.email.slice(0, 2) : (displayName !== 'No user' ? displayName.slice(0, 2) : "ME") }}
                    </span>
                </button>
            </div>

            <!-- User info -->
            <div class="px-3 mb-3 pb-1 cass-editor__logged-in-user-info"
                v-if="showUserInfo && displayName !== 'No user'">
                <h3
                    v-if="availableIdentities.length < 2"
                    class="is-size-3 has-text-weight-semibold">
                    <span v-if="showSideNav">{{ displayName }}</span>
                </h3>
                <div
                    v-else
                    class="select is-fullwidth">
                    <select
                        @change="setIdentity($event.target.value)">
                        <option
                            v-for="ident in availableIdentities"
                            :value="ident.ppk.toPk().toPem()"
                            :key="ident">
                            {{ ident.displayName }}
                        </option>
                    </select>
                </div>
                <p
                    v-if="showSideNav"
                    class="is-size-7">
                    {{ loggedOnPerson.email }}
                </p>
                <p
                    v-if="showSideNav && $store.getters['user/lastLogin']"
                    class="is-size-7">
                    Last Login: {{ new Date($store.getters['user/lastLogin']).toLocaleString() }}
                </p>
                <!-- <p
                    v-if="showSideNav"
                    class="is-size-7">
                    {{ loggedOnPerson.type }}
                </p> -->
                <div
                    v-if="showSideNav && !hideLogoutButton"
                    class="my-2">
                    <button
                        class="button is-primary is-small is-fullwidth"
                        @click="performApplicationLogout">
                        <span class="icon">
                            <i class="fa fa-sign-out-alt" />
                        </span>
                        <span v-if="showSideNav">logout</span>
                    </button>
                </div>
                <ul class="menu-list"
                    v-else-if="!hideLogoutButton">
                    <li class="mt-1 has-text-white">
                        <a @click="performApplicationLogout"
                            title="Logout">
                            <span class="icon">
                                <i class="fa fa-sign-out-alt" />
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            <div
                v-else-if="loginEnabled && displayName == 'No user'"
                class="mx-3">
                <button
                    v-if="showSideNav"
                    class="my-2 button is-outlined is-white is-fullwidth"
                    @click="performApplicationLogin">
                    <span class="icon">
                        <i class="fa fa-sign-in-alt" />
                    </span><span v-if="showSideNav">login</span>
                </button>
                <div
                    v-if="!showSideNav"
                    class="buttons is-centered">
                    <button
                        class="button is-outlined is-white"
                        @click="performApplicationLogin"
                        title="Login">
                        <span class="icon">
                            <i class="fa fa-sign-in-alt" />
                        </span>
                    </button>
                </div>
            </div>
            <!-- <hr v-if="showSideNav"> -->
        </div>

        <!-- Add new buttons -->
        <!-- <div
            v-if="showSideNav"
            @click="addFrameworkOrDirectory = true;">
            <add-new-dropdown
                :frameworkEnabled="showFrameworks"
                :directoryEnabled="showFrameworks"
                :collectionEnabled="queryParams.ceasnDataFields === 'true' && this.queryParams.concepts !== 'true'"
                @close="addFrameworkOrDirectory = false"
                :conceptEnabled="showConcepts"
                @toggle="addFrameworkOrDirectory = !addFrameworkOrDirectory"
                align="left"
                color="light"
                @directory="$store.commit('app/showModal', {component: 'AddDirectory'});"
                @concept="$emit('create-new-concept-scheme')"
                @framework="$emit('create-new-framework')"
                @collection="$emit('create-new-collection')"
                @progression="$emit('create-new-progression-model')"
                :active="addFrameworkOrDirectory" />
        </div> -->
        <!-- GENERAL MENU -->
        <!-- COMPETENCIES AND FRAMEWORKS -->
        <div class="mx-3">
            <div
                v-if="showFrameworks"
                class="menu-label">
                Framework
            </div>
            <ul
                class="menu-list"
                v-if="showFrameworks">
                <li class="has-text-white">
                    <router-link
                        :to="{path: '/frameworks', query: queryParams}"
                        @click.native="$store.commit('editor/collectionMode', false)"
                        :title="showSideNav ? '' : 'Frameworks'">
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
                        @click.native="$store.commit('editor/collectionMode', true)"
                        :title="showSideNav ? '' : 'Collections'">
                        <span class="icon">
                            <i class="fa fa-th-list" />
                        </span>
                        <span v-if="showSideNav"> Collections</span>
                    </router-link>
                </li>
                <li class="has-text-white">
                    <router-link
                        :to="{path: '/import', query: queryParams}"
                        @click.native="$store.commit('editor/conceptMode', false); $store.commit('editor/progressionMode', false); $store.dispatch('app/clearImport');"
                        :title="showSideNav ? '' : 'Import Framework'">
                        <span class="icon">
                            <i class="fa fa-upload" />
                        </span>
                        <span v-if="showSideNav">
                            Import
                        </span>
                    </router-link>
                </li>
                <li
                    class="has-text-white"
                    v-if="crosswalkEnabled">
                    <router-link
                        :to="{path: '/crosswalk', query: queryParams}"
                        :title="showSideNav ? '' : 'Crosswalk Frameworks'">
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
                    <a @click="setLaunchPluginValues(navLink)"
                        :title="showSideNav ? '' : '{{ navLink.launchName }}'">
                        <span class="icon">
                            <i class="fa fa-plug" />
                        </span>
                        <span v-if="showSideNav"> {{ navLink.launchName }}</span>
                    </a>
                </li>
            </ul>
            <template v-if="queryParams.disableAssertions !== 'true' && isLoggedOn">
                <div
                    data-id="side-nav-assertions-section"
                    class="menu-label">
                    Assertion
                </div>
                <ul
                    class="menu-list">
                    <li
                        class="has-text-white">
                        <router-link
                            :to="{path: '/timeline', query: queryParams}"
                            :title="showSideNav ? '' : 'Timeline'">
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
                            @click="shareAssertions"
                            :title="showSideNav ? '' : 'Share'">
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
                class="menu-label">
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
                v-if="showConcepts"
                class="menu-label">
                <span v-if="queryParams.ceasnDataFields === 'true'">Concept Schemes</span>
                <span v-else>Taxonomy</span>
            </div>
            <ul
                class="menu-list"
                v-if="showConcepts">
                <li class="has-text-white">
                    <router-link
                        :to="{path: '/concepts', query: queryParams}"
                        :title="showSideNav ? '' : queryParams.ceasnDataFields === 'true'? 'Concept Schemes' : 'Taxonomies'">
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
                <li class="has-text-white">
                    <router-link
                        :to="{path: '/import', query: queryParams}"
                        @click.native="$store.commit('editor/conceptMode', true); $store.commit('editor/progressionMode', false); $store.dispatch('app/clearImport');"
                        :title="showSideNav ? '' : queryParams.ceasnDataFields === 'true' ? 'Import Concept Schemes' : 'Import Taxonomies'">
                        <span class="icon">
                            <i class="fa fa-upload" />
                        </span>
                        <span v-if="showSideNav"> Import</span>
                    </router-link>
                </li>
                <li
                    v-for="navLink of pluginLinkMap['Taxonomy']"
                    class="has-text-white"
                    v-show="showSideNav && pluginsEnabled"
                    :key="navLink">
                    <a
                        @click="setLaunchPluginValues(navLink)"
                        :title="showSideNav ? '' : '{{ navLink.launchName }}'">
                        <span class="icon">
                            <i class="fa fa-plug" />
                        </span>
                        <span v-if="showSideNav"> {{ navLink.launchName }}</span>
                    </a>
                </li>
            </ul>
            <!-- PROGRESSION MODELS -->
            <div
                v-if="queryParams.ceasnDataFields === 'true' && showConcepts"
                class="menu-label">
                <span>Progression Models</span>
            </div>
            <ul
                class="menu-list"
                v-if="queryParams.ceasnDataFields === 'true' && showConcepts">
                <li class="has-text-white">
                    <router-link :to="{path: '/progressionLevels', query: queryParams}"
                        :title="showSideNav && queryParams.ceasnDataFields === 'true' ? '' : 'Progression Models'">
                        <span class="icon">
                            <i class="fa fa-layer-group" />
                        </span>
                        <span v-if="showSideNav && queryParams.ceasnDataFields === 'true'">
                            Progression Models
                        </span>
                    </router-link>
                </li>
                <li
                    class="has-text-white"
                    v-if="showSideNav && queryParams.ceasnDataFields === 'true' && showConcepts">
                    <router-link
                        :to="{path: '/import', query: queryParams}"
                        @click.native="$store.commit('editor/progressionMode', true); $store.commit('editor/conceptMode', false); $store.dispatch('app/clearImport');"
                        :title="showSideNav ? '' : 'Import'">
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
                    <a @click="setLaunchPluginValues(navLink)"
                        :title="showSideNav ? '' : '{{ navLink.launchName }}'">
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
                v-if="configurationsEnabled || userManagementEnabled"
                class="menu-label">
                Configuration
            </div>
            <ul
                class="menu-list">
                <li v-if="configurationsEnabled">
                    <router-link :to="{path: '/configuration', query: queryParams}"
                        :title="showSideNav ? '' : 'Configurations'">
                        <span class="icon">
                            <i class="fa fa-cog" />
                        </span><span v-if="showSideNav">Configurations</span>
                    </router-link>
                </li>
                <li v-if="pluginsEnabled">
                    <router-link
                        :to="{path: '/pluginManager', query: queryParams}"
                        :title="showSideNav ? '' : 'Plugins'">
                        <span class="icon">
                            <i class="fa fa-charging-station" />
                        </span><span v-if="showSideNav">Plugins</span>
                    </router-link>
                </li>
                <li v-if="isLoggedOn && userManagementEnabled">
                    <router-link
                        :to="{path: '/users', query: queryParams}"
                        :title="showSideNav ? '' : 'Groups'">
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
                    <a
                        @click="setLaunchPluginValues(navLink)"
                        :title="showSideNav ? '' : '{{ navLink.launchName }}'">
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
                    class="menu-label">
                    {{ nonStandardNavCat }}
                </div>
                <ul
                    v-if="showSideNav"
                    class="menu-list">
                    <li
                        v-for="navLink of pluginLinkMap[nonStandardNavCat]"
                        class="has-text-white"
                        :key="navLink">
                        <a
                            @click="setLaunchPluginValues(navLink)"
                            :title="showSideNav ? '' : '{{ navLink.launchName }}'">
                            <span class="icon">
                                <i class="fa fa-plug" />
                            </span>
                            <span v-if="showSideNav"> {{ navLink.launchName }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- Expand / Collapse Icon -->
        <div class="mx-3">
            <ul class="menu-list">
                <li
                    v-if="showSideNav"
                    class="has-text-white">
                    <a @click="$store.commit('app/closeSideNav')">
                        <span class="icon">
                            <i class="fa-regular fa-square-caret-left" />
                        </span>
                        <span v-if="showSideNav"> Collapse Sidebar</span>
                    </a>
                </li>
                <li
                    v-else
                    class="has-text-white">
                    <a
                        @click="$store.commit('app/showSideNav')"
                        title="Expand sidebar">
                        <span class="icon">
                            <i class="fa-regular fa-square-caret-right" />
                        </span>
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
            availableIdentities: [],
            addNewDirectory: false,
            directoryName: "",
            showUserInfo: false
        };
    },
    methods: {
        handleClickoutsidePopup() {
            if (this.addFrameworkOrDirectory) {
                this.addFrameworkOrDirectory = false;
                this.addNewDirectory = false;
            }
        },
        setIdentity: async function(identity) {
            for (let i = 0; i < window.EcIdentityManager.default.ids.length; i++) {
                if (window.EcIdentityManager.default.ids[i].ppk.toPk().toPem() === identity) {
                    window.EcIdentityManager.default.ids.unshift(window.EcIdentityManager.default.ids.splice(i, 1)[0]);
                    break;
                }
            }
            this.identityDropdownActive = false;
            let person = await window.EcPerson.getByPk(window.repo, window.EcIdentityManager.default.ids[0].ppk.toPk());
            this.$store.commit('user/loggedOnPerson', person);
            this.availableIdentities = window.EcIdentityManager.default.ids;
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
            if (window.EcIdentityManager.default.ids.length > 0) {
                dir.addOwner(window.EcIdentityManager.default.ids[0].ppk.toPk());
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
        loggedOnPerson: function() {
            this.availableIdentities = window.EcIdentityManager.default.ids;
        },
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
        hideLogoutButton: function() {
            let loginInfo = this.$store.getters['user/repositorySsoOptions'];
            if (loginInfo) {
                if (loginInfo.ssoPublicKey && !loginInfo.ssoLogout) {
                    return true;
                }
            }
            return false;
        },
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
            } else if (this.availableIdentities.length > 0) {
                return this.availableIdentities[0].displayName ? this.availableIdentities[0].displayName : 'Organization';
            } else {
                return 'No user';
            }
        },
        currentRoute: function() {
            return this.$route.path;
        },
        supportedFiles: function() {
            return (this.$store.getters['editor/conceptMode'] === true || this.$store.getters['editor/progressionMode'] === true) ? this.supportedConceptFileTypes : this.supportedFileTypes;
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
        this.availableIdentities = window.EcIdentityManager.default.ids;
    }
};
</script>
<style lang="scss">
 @import '../scss/variables.scss';
 @import '../scss/side-nav.scss';

.cass--main-nav--list-item a {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    max-width: 240px;
    display: inline-block;
}
</style>