<template>
    <div id="plugin-manager">
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': pluginManagerBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <!-- plugin manager content-->
        <div
            class="container"
            v-if="!pluginManagerBusy">
            <div class="section">
                <h3 class="title is-size-1">
                    Plugin Management
                </h3>
                <p class="description">
                    Plugins provide the capability to add additional CaSS components that are available to multiple users.
                </p>
            </div>
            <div
                class="section"
                v-if="pluginManagerViewMode.equals('list')">
                <h4 class="header is-size-3">
                    Plugins
                </h4>
                <div v-if="pluginList.length === 0">
                    <p>No plugins are available.</p>
                </div>
                <div
                    class="table-container"
                    v-if="pluginList.length > 0">
                    <table class="table is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>
                                    name
                                </th>
                                <th>
                                    description
                                </th>
                                <th>
                                    location
                                </th>
                                <th>
                                    launch type
                                </th>
                                <th>
                                    launch location
                                </th>
                                <th title="Curated/Managed by the CaSS Project">
                                    curated?
                                </th>
                                <th>
                                    enabled
                                </th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            <plugin-list-item
                                v-for="pi in pluginList"
                                :id="pi.id"
                                :key="JSON.stringify(pi)"
                                :name="pi.name"
                                :description="pi.description"
                                :url="pi.url"
                                :launch-type="pi.launchType"
                                :launch-location="pi.launchLocation"
                                :is-curated="pi.isCurated"
                                :is-owned="pi.isOwned"
                                @enablePlugin="enablePlugin"
                                @disablePlugin="disablePlugin"
                                @showDelete="showPluginDelete"
                                @showDetails="showPluginDetails" />
                        </tbody>
                    </table>
                </div>
                <div class="buttons is-right">
                    <div
                        class="button is-outlined is-primary"
                        @click="addNewPlugin"
                        title="Add New Plugin">
                        <span class="icon">
                            <i class="fa fa-plus" />
                        </span>
                        <span>
                            add new plugin
                        </span>
                    </div>
                    <!--
                    <div
                        class="button is-outlined"
                        @click="disableAllPlugins"
                        title="Disable All Plugins">
                        <span class="icon">
                            <i class="fa fa-minus" />
                        </span>
                        <span>
                            disable all plugins
                        </span>
                    </div>
                    -->
                </div>
            </div>
            <div v-if="pluginManagerViewMode.equals('detail')">
                <plugin-details
                    :plugin="currentPlugin"
                    :readOnly="currentPluginIsReadOnly"
                    @save="saveCurrentPlugin"
                    @cancel="cancelEditCurrentPlugin"
                    @back="backFromEditCurrentPlugin" />
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import PluginListItem from '../../components/plugins/PluginListItem';
import PluginDetails from '../../components/plugins/PluginDetails';
import {cassUtil} from '../../mixins/cassUtil';
import {pluginUtil} from '../../mixins/pluginUtil';
import {curatedPlugins} from '../../mixins/curatedPlugins';

export default {
    mixins: [cassUtil, pluginUtil, curatedPlugins],
    props: {
        view: {
            default: '',
            type: String
        }
    },
    name: 'PluginManager',
    components: {
        PluginListItem,
        PluginDetails
    },
    data: () => ({
        pluginManagerBusy: false,
        pluginManagerViewMode: 'list',
        pluginList: [],
        currentPlugin: {}
    }),
    computed: {
        currentPluginIsReadOnly: function() {
            if (!this.currentPlugin || !this.currentPlugin.isOwned) return true;
            else if (this.currentPlugin.isOwned) return false;
            else return true;
        }
    },
    methods: {
        showListView() {
            this.pluginManagerViewMode = "list";
        },
        showDetailView() {
            this.pluginManagerViewMode = "detail";
        },
        backFromEditCurrentPlugin() {
            this.showListView();
        },
        cancelEditCurrentPlugin() {
            this.buildPluginList();
            this.showListView();
        },
        saveCurrentPlugin() {
            // TODO
        },
        showPluginDelete(pluginId) {
            // TODO
        },
        enablePlugin(pluginId) {
            this.setPluginAsEnabled(pluginId);
        },
        disablePlugin(pluginId) {
            this.setPluginAsDisabled(pluginId);
        },
        disableAllPlugins() {
            this.setAllPluginsAsDisabled();
            this.buildPluginList();
        },
        getPluginById(pluginId) {
            for (let p of this.pluginList) {
                if (p.id.equals(pluginId)) {
                    return p;
                }
            }
            return null;
        },
        setCurrentPlugin(pluginId) {
            this.currentPlugin = this.getPluginById(pluginId);
        },
        showPluginDetails(pluginId) {
            this.setCurrentPlugin(pluginId);
            this.showDetailView();
        },
        addNewPlugin() {
            // this.showDetailView();
            alert('TODO addNewPlugin');
        },
        getPluginsFromRepoSuccess(ecRemoteLda) {
            // TODO
            this.pluginManagerBusy = false;
        },
        getPluginsFromRepoFailure() {
            appLog("Plugin search failure: " + msg);
            this.pluginManagerBusy = false;
        },
        buildPluginListItemFromRepoPlugin(repoPlug) {
            // TODO
        },
        getPluginsFromRepo() {
            // TODO
            this.getPluginsFromRepoSuccess(null);
        },
        buildPluginListItemFromCuratedPlugin(curPlug) {
            let p = {};
            p.id = curPlug.id;
            p.name = curPlug.name;
            p.description = curPlug.description;
            p.url = curPlug.url;
            p.launchType = curPlug.launchType;
            p.launchLocation = curPlug.launchLocation;
            p.isCurated = true;
            p.isOwned = false;
            p.isEnabled = false;
            return p;
        },
        getPluginsFromCuratedList() {
            for (let p of this.curatedPlugins) {
                this.pluginList.push(this.buildPluginListItemFromCuratedPlugin(p));
            }
        },
        buildPluginList() {
            this.pluginManagerBusy = true;
            this.pluginList = [];
            this.getPluginsFromCuratedList();
            this.getPluginsFromRepo();
        }
    },
    updated() {
    },
    mounted() {
        this.buildPluginList();
    }
};
</script>

<style lang="scss" scoped>
    h3 {
        font-size: 2rem;
        padding-bottom: 0rem;
    }
    h4 {
        font-size: 1.6rem;
        padding-bottom: 1rem;
    }
    h4 {
        font-size: 1.3rem;
        padding-bottom: .5rem;
    }
    .listHdr {
        font-weight: bold;
    }
</style>

