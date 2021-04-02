<template>
    <div
        class="table-container">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th><abbr title="Name">name</abbr></th>
                    <th v-if="view !=='dynamic-modal'">
                        <abbr title="Description">description</abbr>
                    </th>
                    <th v-if="view !=='dynamic-modal'">
                        <abbr title="Instance Default">instance default</abbr>
                    </th>
                    <th v-if="view !=='dynamic-modal'">
                        <abbr title="Browser Default" />browser default
                    </th>
                    <th v-else>
                        <abbr title="Framework Default">framework default</abbr>
                    </th>
                    <th v-if="view !=='dynamic-modal'">
                        <abbr title="" />view/manage/delete
                    </th>
                </tr>
            </thead>
            <tbody>
                <configuration-list-item
                    v-for="config in configList"
                    :id="config.id"
                    :view="view"
                    :key="config"
                    :name="config.name"
                    :isDefault="config.isDefault"
                    :description="config.description"
                    :isOwned="config.isOwned"
                    :defaultBrowserConfigId="localDefaultBrowserConfigId"
                    :defaultFrameworkConfigId="frameworkConfigId"
                    @set-browser-default="setConfigAsBrowserDefault"
                    @remove-browser-default-config="removeConfigAsBrowserDefault"
                    @set-framework-default="setConfigAsFrameworkDefault"
                    @show-details="showConfigDetails"
                    @show-delete="showDeleteConfirm" />
            </tbody>
            <br>
        </table>
    </div>
</template>
<script>
import ConfigurationListItem from '@/components/configuration/ConfigurationListItem';

export default {
    name: 'ConfigurationList',
    components: {
        ConfigurationListItem
    },
    data() {
        return {
            frameworkConfigId: '',
            complexConfigObject: '',
            CONFIG_SEARCH_SIZE: 10000
        };
    },
    props: {
        configList: {
            type: Object,
            default: function() { return {}; }
        }
    },
    computed: {
        localDefaultBrowserConfigId() {
            return this.$store.getters['configuration/localDefaultBrowserConfig'];
        },
        configrationBusy() {
            return this.$store.getters['configuration/configrationBusy'];
        }
    },
    methods: {
        showDeleteConfirm() {
            this.$store.commit('app/showModal', 'DeleteConfiguration');
        },
        setConfigAsBrowserDefault(configId) {
            let bdc = this.getConfigById(configId);
            console.log('configid', configId);
            this.$store.commit('configuration/setLocalDefaultBrowserConfigName', bdc.name);
            this.$store.commit('configuration/setDefaultBrowserConfig', configId);
            this.$store.commit('configuration/setLocalDefaultBrowserConfig', configId);
            this.$store.commit('app/showModal', 'ConfigurationSetSuccess');
        },
        getConfigById(configId) {
            for (let c of this.configList) {
                if (c.id.equals(configId)) {
                    return c;
                }
            }
            return null;
        },
        buildConfigList() {
            this.$store.commit('configuration/configurationBusy', true);
            this.complexConfigObject = {};
            this.buildConfigListFromRepository();
        },
        buildConfigListFromRepository() {
            let paramObj = {};
            paramObj.size = this.CONFIG_SEARCH_SIZE;
            window.repo.searchWithParams("@type:Configuration", paramObj, null, this.searchRepositoryForConfigsSuccess, this.searchRepositoryForConfigsFailure);
        },
        setConfigAsFrameworkDefault(configId) {
            let me = this;
            let f = this.$store.getters['editor/framework'];
            let previousConfig = f.configuration;
            f.configuration = configId;
            if (!previousConfig) {
                f = this.setOwnersAndReaders(f);
            }
            if (f) {
                this.frameworkConfigId = configId;
                window.repo.saveTo(f, function() {
                    me.$store.commit('editor/framework', EcRepository.getBlocking(f.shortId()));
                }, function() {});
            }
        },
        mounted() {
            if (this.$store.getters['editor/framework'] && this.$store.getters['editor/framework'].configuration) {
                this.frameworkConfigId = this.$store.getters['editor/framework'].configuration;
            }
        }
    }
};
</script>