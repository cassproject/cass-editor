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
import {mapState} from 'pinia';

import { useConfigurationStore } from '@/stores/configuration';
import { useEditorStore } from '@/stores/editor';
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
        ...mapGetters({
            CONFIG_SEARCH_SIZE: 'configuration/CONFIG_SEARCH_SIZE',
            DEFAULT_CONFIGURATION_TYPE: 'configuration/DEFAULT_CONFIGURATION_TYPE',
            DEFAULT_CONFIGURATION_CONTEXT: 'configuration/DEFAULT_CONFIGURATION_CONTEXT',
            LANG_STRING_TYPE: 'configuration/LANG_STRING_TYPE',
            DEFAULT_HEADING: 'configuration/DEFAULT_HEADING'
        }),
        defaultBrowserConfigName: {
            get() {
                return this.useConfigurationStore().defaultBrowserConfigName;
            },
            set(val) {
                useConfigurationStore().setSetDefaultBrowserConfigName(val);
            }
        },
        showConfirmDeleteConfigModal: {
            get() {
                return this.useConfigurationStore().showConfirmDeleteConfigModal;
            },
            set(val) {
                useConfigurationStore().setSetShowConfirmDeleteConfigModal(val);
            }
        },
        showBrowserConfigSetModal: {
            get() {
                return this.useConfigurationStore().showBrowserConfigSetModal;
            },
            set(val) {
                useConfigurationStore().setSetShowBrowserConfigSetModal(val);
            }
        },
        showMustBeLoggedInModal: {
            get() {
                return this.useConfigurationStore().showMustBeLoggedInModal;
            },
            set(val) {
                useConfigurationStore().setSetShowMustBeLoggedInModal(val);
            }
        },
        configToDelete: {
            get() {
                return this.useConfigurationStore().configToDelete;
            },
            set(val) {
                useConfigurationStore().setSetConfigToDelete(val);
            }
        },
        configViewMode() {
            return this.useConfigurationStore().configView;
        },
        localDefaultBrowserConfigId() {
            return this.useConfigurationStore().localDefaultBrowserConfig;
        }
    },
    data: () => ({
        configBusy: false,
        configList: [],
        complexConfigObject: {},
        defaultConfigId: null,
        frameworkConfigId: '',
        enforceHeadings: false
    }),
    mixins: [cassUtil, configuration],
    methods: {
        showDeleteConfirm(configId) {
            this.setConfigToDelete(configId);
            this.showConfirmDeleteConfigModal = true;
        },
        setConfigToDelete(configId) {
            useConfigurationStore().setSetConfigToDelete(this.getConfigById(configId));
        },
        async setConfigAsFrameworkDefault(configId) {
            let me = this;
            let f = this.useEditorStore().framework;
            let previousConfig = f.configuration;
            f.configuration = configId;
            if (!previousConfig) {
                f = await this.setOwnersAndReaders(f);
            }
            if (f) {
                this.frameworkConfigId = configId;
                window.repo.saveTo(f, async function() {
                    useEditorStore().setFramework(await EcRepository.get(f.shortId()));
                }, function() {});
            }
        },
        async setOwnersAndReaders(framework) {
            let userIdentity = null;
            if (EcIdentityManager.default.ids.length > 0) {
                userIdentity = EcIdentityManager.default.ids[0].ppk.toPk();
            }
            let config = await EcRepository.get(framework.configuration);
            let owners = config.defaultObjectOwners;
            let readers = config.defaultObjectReaders;
            if (owners.length > 0 || readers.length > 0) {
                if (userIdentity) {
                    framework.addOwner(userIdentity);
                } else {
                    useConfigurationStore().setSetShowMustBeLoggedInModal(true);
                    return false;
                }
            }
            for (let i = 0; i < owners.length; i++) {
                framework.addOwner(EcPk.fromPem(owners[i]));
            }

            let compsAndRelations = [];
            if (new EcConceptScheme().isA(framework.getFullType())) {
                compsAndRelations = (await EcConcept.search(window.repo, 'skos:inScheme\\:"' + framework.shortId() + '"', null, null, {size: 10000})).map(x => x.shortId());
            } else {
                compsAndRelations = framework.competency ? framework.competency : [];
                if (framework.relation) {
                    compsAndRelations = compsAndRelations.concat(framework.relation);
                }
            }
            new EcAsyncHelper().each(compsAndRelations, function(id, done) {
                EcRepository.get(id, async function(obj) {
                    if (owners.length > 0 || readers.length > 0) {
                        if (userIdentity) {
                            obj.addOwner(userIdentity);
                        }
                    }
                    for (let i = 0; i < owners.length; i++) {
                        obj.addOwner(EcPk.fromPem(owners[i]));
                    }
                    if (readers.length > 0) {
                        for (let i = 0; i < readers.length; i++) {
                            obj.addReader(EcPk.fromPem(readers[i]));
                        }
                        obj = await EcEncryptedValue.toEncryptedValue(obj);
                    }
                    window.repo.saveTo(obj, done, done);
                }, done);
            }, function(competencyIds) {
            });
            if (readers.length > 0) {
                for (let i = 0; i < readers.length; i++) {
                    framework.addReader(EcPk.fromPem(readers[i]));
                }
                framework = await EcEncryptedValue.toEncryptedValue(framework);
            }
            return framework;
        }
    }
};
</script>