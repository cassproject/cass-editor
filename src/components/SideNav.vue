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
                <i class="fa fa-chevron-down" />
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
                        <i class="fa fa-chevron-right has-text-centered" />
                    </span>
                </div>
            </div>
            <template v-if="displayName !== 'No user'">
                <div class="has-text-centered">
                    <span
                        :title="'Signed in as: ' + displayName"
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
                    v-if="showSideNav"
                    title="Log out">
                    <router-link
                        class="button is-rounded is-white has-text-danger"
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
        <!-- Add new buttons -->
        <div
            v-if="showSideNav"
            class="cass-add-item--button button is-rounded has-text-primary has-font-weight-medium"
            v-click-outside="handleClickoutsidePopup"
            @click="addFrameworkOrDirectory = true;">
            <span class="icon">
                <i class="fa fa-plus" />
            </span>
            <span>Create new</span>
            <div
                class="cass--pop-out"
                v-if="addFrameworkOrDirectory">
                <div
                    @click="$emit('create-new-framework')"
                    class="cass--popout-text-button">
                    <span v-if="showSideNav">Framework</span>
                </div>
                <div
                    @click.prevent="addNewDirectory = true"
                    class="cass--popout-text-button">
                    <span v-if="showSideNav">Directory</span>
                </div>
                <div
                    class="cass--popout-text-button"
                    @click="$emit('create-new-concept-scheme')">
                    <span>
                        <span v-if="showSideNav && queryParams.ceasnDataFields === 'true'">
                            Concept Scheme
                        </span>
                        <span v-else-if="showSideNav">
                            Taxonomy
                        </span>
                    </span>
                </div>
                <div
                    class="field"
                    v-if="addNewDirectory">
                    <div class="control">
                        <div class="control">
                            <input
                                class="input"
                                placeholder="Name of new directory"
                                v-model="directoryName">
                        </div>
                    </div>
                </div>
                <div
                    class="field"
                    v-if="addNewDirectory">
                    <div class="buttons">
                        <div
                            class="button is-dark is-outlined is-small"
                            @click="addFrameworkOrDirectory = false">
                            Cancel
                        </div>
                        <div
                            class="button is-primary is-small"
                            :class="directoryName.length === 0 ? 'is-disabled' : ''"
                            :disabled="directoryName.length === 0"
                            @click="saveDirectory">
                            Create
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- GENERAL MENU -->
        <!-- COMPETENCIES AND FRAMEWORKS -->
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
                        <i class="fa fa-th-list" />
                    </span>
                    <span v-if="showSideNav"> Frameworks</span>
                </router-link>
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
                        Import
                    </span>
                </router-link>
            </li>
            <li
                class="has-text-white"
                v-if="showSideNav">
                <a
                    href="/docs/competency-and-framework-management/"
                    target="_blank">
                    <span class="icon">
                        <i class="fas fa-book" />
                    </span>
                    Documentation
                </a>
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
        <!-- DIRECTORIES -->
        <div
            v-if="showSideNav"
            class="menu-label has-text-weight-bold">
            My Directories
        </div>
        <ul
            class="menu-list">
            <li
                class="has-text-white"
                v-for="directory in myTopLevelDirectories"
                :key="directory.id"
                @click="selectDirectory(directory)">
                <router-link to="/directory">
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
                    <span v-if="showSideNav"> {{ directory.name }}</span>
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
                    to="/import"
                    @click.native="$store.commit('editor/conceptMode', true); $store.dispatch('app/clearImport');">
                    <span class="icon">
                        <i class="fa fa-upload" />
                    </span>
                    Import
                </router-link>
            </li>
            <li
                class="has-text-white"
                v-if="showSideNav">
                <a
                    href="/docs/taxonomies/"
                    target="_blank">
                    <span class="icon">
                        <i class="fas fa-book" />
                    </span> Documentation
                </a>
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
                <router-link to="/configuration">
                    <span class="icon">
                        <i class="fa fa-cog" />
                    </span><span v-if="showSideNav">Configurations</span>
                </router-link>
            </li>
            <li v-if="pluginsEnabled">
                <router-link to="/pluginManager">
                    <span class="icon">
                        <i class="fa fa-charging-station" />
                    </span><span v-if="showSideNav">Plugins</span>
                </router-link>
            </li>
            <li v-if="isLoggedOn && userManagementEnabled">
                <router-link to="/users">
                    <span class="icon">
                        <i class="fa fa-users" />
                    </span><span v-if="showSideNav">Users and Groups</span>
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
import {pluginUtil} from './../mixins/pluginUtil';
import {curatedPlugins} from './../mixins/curatedPlugins';

export default {
    mixins: [cassUtil, pluginUtil, curatedPlugins],
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
            if (EcIdentityManager.ids.length > 0) {
                dir.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            }
            dir["schema:dateCreated"] = new Date().toISOString();
            dir["schema:dateModified"] = new Date().toISOString();
            // To do: Add other owners and readers
            dir.save(function(success) {
                appLog("Directory saved: " + dir.id);
                me.$store.dispatch('app/refreshDirectories');
                me.selectDirectory(dir);
            }, console.error, window.repo);
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

</style>