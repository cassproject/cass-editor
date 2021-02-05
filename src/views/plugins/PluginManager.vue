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
        <!-- plugin deletion confirm modal-->
        <div
            class="modal"
            :class="[{'is-active': showConfirmDeletePluginModal}]">
            <div class="modal-background" />
            <div class="modal-card">
                <header class="modal-card-head has-background-primary">
                    <p class="modal-card-title">
                        <span class="title has-text-white">
                            Remove Plugin?
                        </span>
                    </p>
                    <button
                        class="delete"
                        @click="cancelPluginDelete"
                        aria-label="close" />
                </header>
                <section class="modal-card-body">
                    Are you sure you wish to remove the plugin <b>'{{ pluginToDelete.url }}'</b>?
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons is-spaced">
                        <button
                            class="button is-dark is-outlined"
                            @click="cancelPluginDelete">
                            Cancel
                        </button>
                        <button
                            class="button is-outlined is-primary"
                            @click="deletePlugin">
                            Remove
                        </button>
                    </div>
                </footer>
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
                    Plugins provide the capability to add additional CaSS related tools in order to customize your UI.
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
                                    location
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
                                :url="pi.url"
                                :is-curated="pi.isCurated"
                                :is-owned="pi.isOwned"
                                @enable-plugin="enablePlugin"
                                @disable-plugin="disablePlugin"
                                @show-delete="showPluginDelete"
                                @show-details="showPluginDetails" />
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
        currentPlugin: {},
        showConfirmDeletePluginModal: false,
        pluginToDelete: {}
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
            this.buildManagerPluginList();
            this.showListView();
        },
        saveCurrentPlugin() {
            this.pluginManagerBusy = true;
            this.addLocalPlugin(this.currentPlugin.url);
            this.setPluginAsEnabled(this.currentPlugin.url);
            this.currentPlugin = {};
            this.buildManagerPluginList();
            this.showListView();
            this.$store.commit('app/pluginLastUpdate', Date.now());
        },
        deletePlugin() {
            this.pluginManagerBusy = true;
            this.setPluginAsDisabled(this.pluginToDelete.url);
            this.removeLocalPlugin(this.pluginToDelete.url);
            this.pluginToDelete = {};
            this.showConfirmDeletePluginModal = false;
            this.buildManagerPluginList();
            this.$store.commit('app/pluginLastUpdate', Date.now());
        },
        cancelPluginDelete() {
            this.pluginToDelete = {};
            this.showConfirmDeletePluginModal = false;
        },
        setPluginToDelete(pluginId) {
            this.pluginToDelete = this.getPluginById(pluginId);
        },
        showPluginDelete(pluginId) {
            this.setPluginToDelete(pluginId);
            this.showConfirmDeletePluginModal = true;
        },
        enablePlugin(pluginId) {
            this.setPluginAsEnabled(pluginId);
            this.$store.commit('app/pluginLastUpdate', Date.now());
        },
        disablePlugin(pluginId) {
            this.setPluginAsDisabled(pluginId);
            this.$store.commit('app/pluginLastUpdate', Date.now());
        },
        disableAllPlugins() {
            this.setAllPluginsAsDisabled();
            this.buildManagerPluginList();
            this.$store.commit('app/pluginLastUpdate', Date.now());
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
        generateNewPluginObject() {
            let p = {};
            p.id = 'newPluginId';
            p.url = '';
            p.isCurated = false;
            p.isOwned = true;
            return p;
        },
        addNewPlugin() {
            this.currentPlugin = this.generateNewPluginObject();
            this.showDetailView();
        },
        buildPluginListFinished() {
            this.pluginManagerBusy = false;
        },
        buildManagerPluginList() {
            this.pluginManagerBusy = true;
            this.buildPluginList(this.buildPluginListFinished);
        }
    },
    updated() {
    },
    mounted() {
        this.buildManagerPluginList();
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

