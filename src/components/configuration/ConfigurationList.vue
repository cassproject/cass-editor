<template>
    <div
        class="table-container">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th><abbr title="Name">name</abbr></th>
                    <th v-if="view !=='modal'">
                        <abbr title="Description">description</abbr>
                    </th>
                    <th v-if="view !=='modal'">
                        <abbr title="Instance Default">instance default</abbr>
                    </th>
                    <th v-if="view !=='modal'">
                        <abbr title="Browser Default" />browser default
                    </th>
                    <th v-else>
                        <abbr title="Framework Default">framework default</abbr>
                    </th>
                    <th v-if="view !=='modal'">
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
import {cassUtil} from '@/mixins/cassUtil';
import {configuration} from '@/mixins/configuration';
import {mapGetters} from 'vuex';

export default {
    name: 'ConfigurationList',
    components: {
        ConfigurationListItem
    },
    props: {
        view: {
            type: String,
            defau: 'page'
        }
    },
    computed: {
        ...mapGetters([
            'CONFIG_SEARCH_SIZE',
            'DEFAULT_CONFIGURATION_TYPE',
            'DEFAULT_CONFIGURATION_CONTEXT',
            'LANG_STRING_TYPE',
            'DEFAULT_HEADING'
        ]),
        configViewMode() {
            return this.$store.getters['configuration/configView'];
        },
        localDefaultBrowserConfigId() {
            return this.$store.getters['configuration/localDefaultBrowserConfig'];
        },
        currentConfig() {
            return this.$store.getters['configuration/currentConfig'];
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
        configToDelete: {},
        showConfirmDeleteConfigModal: false,
        showMustBeLoggedInModal: false,
        enforceHeadings: false
    }),
    mixins: [cassUtil, configuration]
};
</script>