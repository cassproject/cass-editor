<template>
    <div>
        <h3>Configuration</h3>
        <div v-if="configBusy">
            CONFIG BUSY!!!! //TODO Replace me with something pretty
        </div>
        <div v-if="!configBusy">
            <div v-if="configViewMode === 'list'">
                <h4>Configurations</h4>
                <div class="columns">
                    <div class="column is-3 listHdr">
                        name
                    </div>
                    <div class="column is-5 listHdr">
                        description
                    </div>
                    <div class="column is-2 listHdr">
                        default
                    </div>
                    <div class="column is-2 listHdr"></div>
                </div>
                <configuration-list-item
                    v-for="config in configList"
                    :id="config.id"
                    :name="config.name"
                    :description="config.description"
                    :isOwned="config.isOwned"
                    :isDefault="config.isDefault"
                    @showDetails="showConfigDetails">
                </configuration-list-item>
                <br>
                <button @click="createNewConfig">create new configuration</button>
            </div>
            <div v-if="configViewMode === 'detail'">
                <h4>Configuration Details</h4>
                <configuration-details
                    :config="currentConfig"
                    :readOnly="currentConfigIsReadOnly"
                    @save="saveCurrentConfig"
                    @cancel="cancelEditCurrentConfig"
                    @back="backFromEditCurrentConfig">
                </configuration-details>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import ConfigurationListItem from '../../components/configuration/ConfigurationListItem';
import ConfigurationDetails from "../../components/configuration/ConfigurationDetails";

// TODO Figure out a way to manage the default configuration (potentially multiple owners)

export default {
    name: 'ConfigurationEditor',
    components: {
        ConfigurationDetails,
        ConfigurationListItem
    },
    computed: {
        currentConfigIsReadOnly: function() {
            if (!this.currentConfig || !this.currentConfig.isOwned) return true;
            else if (this.currentConfig.isOwned) return false;
            else return true;
        }
    },
    data: () => ({
        configViewMode: "list",
        configBusy: false,
        currentConfig: {},
        configList: []
    }),
    methods: {
        showListView() {
            this.configViewMode = "list";
        },
        showDetailView() {
            this.configViewMode = "detail";
        },
        showConfigDetails(configId) {
            this.setCurrentConfig(configId);
            this.showDetailView();
        },
        validateCurrentConfig() {
            // TODO implement
        },
        backFromEditCurrentConfig() {
            this.showListView();
            this.currentConfig = {};
        },
        saveCurrentConfig() {
            // TODO implement
            this.validateCurrentConfig();
        },
        cancelEditCurrentConfig() {
            this.buildConfigList();
            this.showListView();
            this.currentConfig = {};
        },
        createNewConfig() {
            // TODO implement
        },
        setCurrentConfig(configId) {
            for (let c of this.configList) {
                if (c.id === configId) {
                    this.currentConfig = c;
                    break;
                }
            }
        },
        sortConfigList() {
            this.configList.sort(function(c1, c2) {
                if (c1.isOwned !== c2.isOwned) {
                    if (c2.isOwned) return 1;
                    else return -1;
                } else {
                    if (c1.name > c2.name) return 1;
                    else if (c2.name > c1.name) return -1;
                    else return 0;
                }
            });
        },
        buildConfigListFromTestData() {
            this.configList = this.generateTestConfigList();
            this.sortConfigList();
            this.configBusy = false;
        },
        buildConfigListFromRepository() {
            // TODO implement
        },
        buildConfigList() {
            this.configBusy = true;
            if (!EcIdentityManager || !EcIdentityManager.ids || EcIdentityManager.ids.length === 0) {
                this.buildConfigListFromTestData();
            } else this.buildConfigListFromRepository();
        },
        generateTestConfigList() {
            let ca = [];
            let a = {};
            a.id = "testOwnedConfig_1";
            a.isOwned = true;
            a.name = "Test Owned Configuration 1";
            a.description = "Configuration owned by the current user - 1";
            a.isNew = false;
            a.isDefault = true;
            a.fwkIdLabel = "FWK ID LBL 1";
            a.fwkIdDescription = "FWK ID DESC 1";
            a.fwkIdPriorty = "primary";
            a.fwkNameLabel = "FWK NAME LBL 1";
            a.fwkNameDescription = "FWK NAME DESC 1";
            a.fwkDescLabel = "FWK DESC LBL 1";
            a.fwkDescDescription = "FWK DESC DESC 1";
            a.fwkDescPriority = "primary";
            a.fwkDescIsRequired = true;
            a.compAllowLevels = true;
            a.compIdLabel = "COMP ID LABEL 1";
            a.compIdDescription = "COMP ID DESC 1";
            a.compIdPriorty = "secondary";
            a.compNameLabel = "COMP DESC LABEL 1";
            a.compNameDescription = "COMP NAME DESC 1";
            a.compDescLabel = "COMP DESC LABEL 1";
            a.compDescDescription = "COMP DESC DESC 1";
            a.compDescPriority = "primary";
            a.compDescIsRequired = false;
            a.compTypeLabel = "COMP TYPE LABEL 1";
            a.compTypeDescription = "COMP TYPE DESC 1";
            a.compTypePriority = "secondary";
            a.compTypeIsRequired = false;
            a.compEnforcedTypes = [];
            ca.push(a);
            let b = {};
            b.id = "testNotOwnedConfig_1";
            b.isOwned = false;
            b.name = "Test Not-Owned Configuration 1";
            b.description = "Configuration NOT owned by the current user - 1";
            b.isNew = false;
            b.isDefault = false;
            b.fwkIdLabel = "framework id";
            b.fwkIdDescription = "id of the framework";
            b.fwkIdPriorty = "secondary";
            b.fwkNameLabel = "framework name";
            b.fwkNameDescription = "name of the framework";
            b.fwkDescLabel = "framework description";
            b.fwkDescDescription = "description of the framework";
            b.fwkDescPriority = "primary";
            b.fwkDescIsRequired = true;
            b.compAllowLevels = false;
            b.compIdLabel = "competency id";
            b.compIdDescription = "id of the competency";
            b.compIdPriorty = "secondary";
            b.compNameLabel = "comptency name";
            b.compNameDescription = "name of the competency";
            b.compDescLabel = "competency description";
            b.compDescDescription = "description of the competency";
            b.compDescPriority = "primary";
            b.compDescIsRequired = false;
            b.compTypeLabel = "competency type";
            b.compTypeDescription = "type of the competency";
            b.compTypePriority = "secondary";
            b.compTypeIsRequired = true;
            b.compEnforcedTypes = [];
            ca.push(b);
            let c = {};
            c.id = "testOwnedConfig_2";
            c.isOwned = true;
            c.name = "Test Owned Configuration 2";
            c.description = "Configuration owned by the current user - 2";
            c.isNew = false;
            c.isDefault = false;
            c.fwkIdLabel = "FWK ID LBL 2";
            c.fwkIdDescription = "FWK ID DESC 2";
            c.fwkIdPriorty = "secondary";
            c.fwkNameLabel = "FWK NAME LBL 2";
            c.fwkNameDescription = "FWK NAME DESC 2";
            c.fwkDescLabel = "FWK DESC LBL 2";
            c.fwkDescDescription = "FWK DESC DESC 2";
            c.fwkDescPriority = "primary";
            c.fwkDescIsRequired = true;
            c.compAllowLevels = true;
            c.compIdLabel = "COMP ID LABEL 2";
            c.compIdDescription = "COMP ID DESC 2";
            c.compIdPriorty = "secondary";
            c.compNameLabel = "COMP DESC LABEL 2";
            c.compNameDescription = "COMP NAME DESC 2";
            c.compDescLabel = "COMP DESC LABEL 2";
            c.compDescDescription = "COMP DESC DESC 2";
            c.compDescPriority = "primary";
            c.compDescIsRequired = false;
            c.compTypeLabel = "COMP TYPE LABEL 2";
            c.compTypeDescription = "COMP TYPE DESC 2";
            c.compTypePriority = "secondary";
            c.compTypeIsRequired = true;
            c.compEnforcedTypes = [];
            ca.push(c);
            return ca;
        }
    },
    mounted() {
        this.buildConfigList();
    }
};
</script>

<style lang="scss" scoped>
    h3 {
        font-size: 2rem;
        padding-bottom: 1rem;
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
