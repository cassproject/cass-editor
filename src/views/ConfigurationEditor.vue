<template>
    <div
        id="configuration"
        class="'section">
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': configBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <delete-configuration-confirm
            v-if="showConfirmDeleteConfigModal"
            :name="configToDelete.name"
            @close="cancelConfigurationDelete"
            @confirm="deleteConfiguration"
            @cancel="cancelConfigurationDelete" />
        <configuration-not-permitted
            v-if="showMustBeLoggedInModal"
            @cancel="showMustBeLoggedInModal = false"
            @close="showMustBeLoggedInModal=false" />
        <!-- set browser commit success modal-->
        <configuration-set-success
            :name="defaultBrowserConfigName"
            v-if="showBrowserConfigSetModal"
            @ok="closeBrowserConfigSetModal"
            @close="closeBrowserConfigSetModal"
            @cancel="closeBrowserConfigSetModal" />
        <!-- configuration editor content-->
        <section
            class="container"
            v-if="!configBusy">
            <div class="section">
                <h3
                    class="title">
                    Configuration
                </h3>
                <p v-if="configViewMode.equals('list')">
                    Configurations control the way your frameworks appear in the editor, as well as what properties, relationships,
                    and in some cases value types of properties and relationships you can add to your framework. If a browser configuration
                    is not set then the system will default to your instance default. If you are the configuration administrator you will be
                    able to manage the property settings and change which instance is the default.  Otherwise contact your CAT administrator.
                </p>
            </div>
            <!-- configuration list -->
            <configuration-list
                view="editor"
                @showDetails="showConfigDetails($event)"
                :configList="configList"
                v-if="configViewMode.equals('list')" />
            <div
                class="button is-outlined is-primary is-pulled-right"
                v-if="configViewMode.equals('list')"
                @click="createNewConfig">
                <span class="icon">
                    <i class="fa fa-plus" />
                </span>
                <span>
                    create new configuration
                </span>
            </div>
            <div v-if="configViewMode.equals('detail')">
                <configuration-details
                    :config="currentConfig"
                    :configList="configList"
                    :readOnly="currentConfigIsReadOnly"
                    :defaultConfigId="defaultConfigId"
                    :defaultBrowserConfig="localDefaultBrowserConfigId"
                    @set-browser-default="setConfigAsBrowserDefault"
                    @remove-browser-default-config="removeConfigAsBrowserDefault"
                    @save="saveCurrentConfig"
                    @cancel="cancelEditCurrentConfig"
                    @back="backFromEditCurrentConfig" />
            </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /src
import ConfigurationDetails from "@/components/configuration/ConfigurationDetails";
import {cassUtil} from '@/mixins/cassUtil';
import {configuration} from '@/mixins/configuration';
import DeleteConfigurationConfirm from '@/components/modalContent/DeleteConfigurationConfirm.vue';
import ConfigurationNotPermitted from '@/components/modalContent/ConfigurationNotPermitted.vue';
import ConfigurationSetSuccess from '@/components/modalContent/ConfigurationSetSuccess.vue';
import ConfigurationList from '@/components/configuration/ConfigurationList.vue';
import {mapGetters} from 'vuex';

export default {
    name: 'ConfigurationEditor',
    mixins: [cassUtil, configuration],
    computed: {
        ...mapGetters({
            CONFIG_SEARCH_SIZE: 'configuration/CONFIG_SEARCH_SIZE',
            DEFAULT_CONFIGURATION_TYPE: 'configuration/DEFAULT_CONFIGURATION_TYPE',
            DEFAULT_CONFIGURATION_CONTEXT: 'configuration/DEFAULT_CONFIGURATION_CONTEXT',
            LANG_STRING_RANGE: 'configuration/LANG_STRING_RANGE',
            DEFAULT_HEADING: 'configuration/DEFAULT_HEADING'
        }),
        configViewMode() {
            return this.$store.getters['configuration/configView'];
        },
        showConfirmDeleteConfigModal: {
            get() {
                return this.$store.getters['configuration/showConfirmDeleteConfigModal'];
            },
            set(val) {
                this.$store.commit('configuration/setShowConfirmDeleteConfigModal', val);
            }
        },
        configToDelete: {
            get() {
                return this.$store.getters['configuration/configToDelete'];
            },
            set(val) {
                this.$store.commit('configuration/setConfigToDelete', val);
            }
        },
        currentConfig: {
            get() {
                return this.$store.getters['configuration/currentConfig'];
            },
            set(val) {
                this.$store.commit('configuration/setCurrentConfig', val);
            }
        },
        localDefaultBrowserConfigId() {
            return this.$store.getters['configuration/localDefaultBrowserConfig'];
        }
    },
    data: () => ({
        configBusy: false,
        configList: [],
        complexConfigObject: {},
        defaultConfigId: null,
        showBrowserConfigSetModal: false,
        defaultBrowserConfigName: '',
        frameworkConfigId: '',
        showMustBeLoggedInModal: false,
        enforceHeadings: false
    }),
    components: {
        ConfigurationDetails,
        DeleteConfigurationConfirm,
        ConfigurationNotPermitted,
        ConfigurationSetSuccess,
        ConfigurationList
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

