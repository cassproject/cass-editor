<template>
    <div>
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': configBusy}]">
            <div class="modal-background"></div>
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-3x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <!-- configuration editor content-->
        <div v-if="!configBusy">
            <h3>Configuration</h3>
            <div v-if="configViewMode.equals('list')">
                <h4>Configurations</h4>
                <div class="columns">
                    <div class="column is-3 listHdr">name</div>
                    <div class="column is-5 listHdr">description</div>
                    <div class="column is-2 listHdr">default</div>
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
            <div v-if="configViewMode.equals('detail')">
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
            // TODO implement DONT FORGET TO TRIM!!!!
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
                if (c.id.equals(configId)) {
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
            /** **************************** Test Config A ***********************************************/
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
            a.fwkDescRequired = true;
            a.compAllowLevels = true;
            a.compIdLabel = "COMP ID LABEL 1";
            a.compIdDescription = "COMP ID DESC 1";
            a.compIdPriorty = "secondary";
            a.compNameLabel = "COMP NAME LABEL 1";
            a.compNameDescription = "COMP NAME DESC 1";
            a.compDescLabel = "COMP DESC LABEL 1";
            a.compDescDescription = "COMP DESC DESC 1";
            a.compDescPriority = "primary";
            a.compDescRequired = false;
            a.compTypeLabel = "COMP TYPE LABEL 1";
            a.compTypeDescription = "COMP TYPE DESC 1";
            a.compTypePriority = "secondary";
            a.compTypeRequired = false;
            a.compEnforceTypes = false;
            a.compEnforcedTypes = [];
            a.fwkCustomProperties = [];
            a.compCustomProperties = [];
            a.relationships = {};
            a.relationships.isEnabledBy = {};
            a.relationships.isEnabledBy.label = 'is enabled by';
            a.relationships.isEnabledBy.enabled = true;
            a.relationships.requires = {};
            a.relationships.requires.label = 'requires';
            a.relationships.requires.enabled = true;
            a.relationships.desires = {};
            a.relationships.desires.label = 'desires';
            a.relationships.desires.enabled = true;
            a.relationships.narrows = {};
            a.relationships.narrows.label = 'narrows';
            a.relationships.narrows.enabled = true;
            a.relationships.isRelatedTo = {};
            a.relationships.isRelatedTo.label = 'is related to';
            a.relationships.isRelatedTo.enabled = true;
            a.relationships.isEquivalentTo = {};
            a.relationships.isEquivalentTo.label = 'is equivalent to';
            a.relationships.isEquivalentTo.enabled = true;
            a.relationships.broadens = {};
            a.relationships.broadens.label = 'broadens';
            a.relationships.broadens.enabled = false;
            a.relationships.majorRelated = {};
            a.relationships.majorRelated.label = 'is majorly related to';
            a.relationships.majorRelated.enabled = false;
            a.relationships.minorRelated = {};
            a.relationships.minorRelated.label = 'is minorly related to';
            a.relationships.minorRelated.enabled = false;
            a.relationships.isSimilarTo = {};
            a.relationships.isSimilarTo.label = 'is similar to';
            a.relationships.isSimilarTo.enabled = false;
            a.relationships.isPartiallySameAs = {};
            a.relationships.isPartiallySameAs.label = 'is partially the same as';
            a.relationships.isPartiallySameAs.enabled = false;
            a.relationships.enables = {};
            a.relationships.enables.label = 'enables';
            a.relationships.enables.enabled = false;
            a.relationships.hasChild = {};
            a.relationships.hasChild.label = 'has child';
            a.relationships.hasChild.enabled = false;
            a.relationships.isChildOf = {};
            a.relationships.isChildOf.label = 'is child of';
            a.relationships.isChildOf.enabled = false;
            a.alignments = {};
            a.alignments.teaches = true;
            a.alignments.assesses = true;
            a.alignments.requires = true;
            ca.push(a);
            /** **************************** Test Config B ***********************************************/
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
            b.fwkDescRequired = true;
            b.compAllowLevels = false;
            b.compIdLabel = "competency id";
            b.compIdDescription = "id of the competency";
            b.compIdPriorty = "secondary";
            b.compNameLabel = "competency name";
            b.compNameDescription = "name of the competency";
            b.compDescLabel = "competency description";
            b.compDescDescription = "description of the competency";
            b.compDescPriority = "primary";
            b.compDescRequired = false;
            b.compTypeLabel = "competency type";
            b.compTypeDescription = "type of the competency";
            b.compTypePriority = "secondary";
            b.compTypeRequired = true;
            b.compEnforceTypes = false;
            b.compEnforcedTypes = [];
            b.fwkCustomProperties = [];
            let prop1 = {};
            prop1.context = 'https://schema.cassproject.org/0.4/';
            prop1.propertyName = 'customFwkProp1';
            prop1.range = 'http://schema.org/URL';
            prop1.description = 'Custom Fwk property 1';
            prop1.label = 'cFwkProp1';
            prop1.priority = 'secondary';
            prop1.required = true;
            prop1.permittedValues = [];
            let prop2 = {};
            prop2.context = 'https://schema.cassproject.org/0.4/';
            prop2.propertyName = 'customFwkProp2';
            prop2.range = 'http://schema.org/Text';
            prop2.description = 'Custom Fwk property 2';
            prop2.label = 'cFwkProp2';
            prop2.priority = 'tertiary';
            prop2.required = false;
            prop2.permittedValues = [];
            let prop2pv1 = {};
            prop2pv1.display = "fwkProp2 pvd 1";
            prop2pv1.value = "fwkProp2pvv1";
            let prop2pv2 = {};
            prop2pv2.display = "fwkProp2 pvd 2";
            prop2pv2.value = "fwkProp2pvv2";
            prop2.permittedValues.push(prop2pv1);
            prop2.permittedValues.push(prop2pv2);
            b.fwkCustomProperties.push(prop1);
            b.fwkCustomProperties.push(prop2);
            b.compCustomProperties = [];
            let prop3 = {};
            prop3.context = 'https://schema.cassproject.org/0.4/';
            prop3.propertyName = 'customCompProp1';
            prop3.range = 'http://schema.org/URL';
            prop3.description = 'Custom Comp property 1';
            prop3.label = 'cCompProp1';
            prop3.priority = 'primary';
            prop3.required = true;
            prop3.permittedValues = [];
            let prop4 = {};
            prop4.context = 'https://schema.cassproject.org/0.4/';
            prop4.propertyName = 'customCompProp2';
            prop4.range = 'http://schema.org/Text';
            prop4.description = 'Custom Comp property 2';
            prop4.label = 'cCompProp2';
            prop4.priority = 'tertiary';
            prop4.required = false;
            prop4.permittedValues = [];
            let prop4pv1 = {};
            prop4pv1.display = "compProp2 pvd 1";
            prop4pv1.value = "compProp2pvv1";
            let prop4pv2 = {};
            prop4pv2.display = "compProp2 pvd 2";
            prop4pv2.value = "compProp2pvv2";
            prop4.permittedValues.push(prop4pv1);
            prop4.permittedValues.push(prop4pv2);
            b.compCustomProperties.push(prop3);
            b.compCustomProperties.push(prop4);
            b.relationships = {};
            b.relationships.isEnabledBy = {};
            b.relationships.isEnabledBy.label = 'is enabled by';
            b.relationships.isEnabledBy.enabled = true;
            b.relationships.requires = {};
            b.relationships.requires.label = 'requires';
            b.relationships.requires.enabled = true;
            b.relationships.desires = {};
            b.relationships.desires.label = 'desires';
            b.relationships.desires.enabled = true;
            b.relationships.narrows = {};
            b.relationships.narrows.label = 'narrows';
            b.relationships.narrows.enabled = true;
            b.relationships.isRelatedTo = {};
            b.relationships.isRelatedTo.label = 'is related to';
            b.relationships.isRelatedTo.enabled = true;
            b.relationships.isEquivalentTo = {};
            b.relationships.isEquivalentTo.label = 'is equivalent to';
            b.relationships.isEquivalentTo.enabled = true;
            b.relationships.broadens = {};
            b.relationships.broadens.label = 'broadens';
            b.relationships.broadens.enabled = false;
            b.relationships.majorRelated = {};
            b.relationships.majorRelated.label = 'is majorly related to';
            b.relationships.majorRelated.enabled = false;
            b.relationships.minorRelated = {};
            b.relationships.minorRelated.label = 'is minorly related to';
            b.relationships.minorRelated.enabled = false;
            b.relationships.isSimilarTo = {};
            b.relationships.isSimilarTo.label = 'is similar to';
            b.relationships.isSimilarTo.enabled = false;
            b.relationships.isPartiallySameAs = {};
            b.relationships.isPartiallySameAs.label = 'is partially the same as';
            b.relationships.isPartiallySameAs.enabled = false;
            b.relationships.enables = {};
            b.relationships.enables.label = 'enables';
            b.relationships.enables.enabled = false;
            b.relationships.hasChild = {};
            b.relationships.hasChild.label = 'has child';
            b.relationships.hasChild.enabled = false;
            b.relationships.isChildOf = {};
            b.relationships.isChildOf.label = 'is child of';
            b.relationships.isChildOf.enabled = false;
            b.alignments = {};
            b.alignments.teaches = true;
            b.alignments.assesses = true;
            b.alignments.requires = true;
            ca.push(b);
            /** **************************** Test Config C ***********************************************/
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
            c.fwkDescRequired = true;
            c.compAllowLevels = true;
            c.compIdLabel = "COMP ID LABEL 2";
            c.compIdDescription = "COMP ID DESC 2";
            c.compIdPriorty = "secondary";
            c.compNameLabel = "COMP NAME LABEL 2";
            c.compNameDescription = "COMP NAME DESC 2";
            c.compDescLabel = "COMP DESC LABEL 2";
            c.compDescDescription = "COMP DESC DESC 2";
            c.compDescPriority = "primary";
            c.compDescRequired = false;
            c.compTypeLabel = "COMP TYPE LABEL 2";
            c.compTypeDescription = "COMP TYPE DESC 2";
            c.compTypePriority = "secondary";
            c.compTypeRequired = true;
            c.compEnforceTypes = false;
            c.compEnforcedTypes = [];
            c.fwkCustomProperties = [];
            let prop5 = {};
            prop5.context = 'https://schema.cassproject.org/0.4/';
            prop5.propertyName = 'customFwkProp1';
            prop5.range = 'http://schema.org/URL';
            prop5.description = 'Custom Fwk property 1';
            prop5.label = 'cFwkProp1';
            prop5.priority = 'secondary';
            prop5.required = true;
            prop5.permittedValues = [];
            let prop6 = {};
            prop6.context = 'https://schema.cassproject.org/0.4/';
            prop6.propertyName = 'customFwkProp2';
            prop6.range = 'http://schema.org/Text';
            prop6.description = 'Custom Fwk property 2';
            prop6.label = 'cFwkProp2';
            prop6.priority = 'tertiary';
            prop6.required = false;
            prop6.permittedValues = [];
            let prop6pv1 = {};
            prop6pv1.display = "fwkProp2 pvd 1";
            prop6pv1.value = "fwkProp2pvv1";
            let prop6pv2 = {};
            prop6pv2.display = "fwkProp2 pvd 2";
            prop6pv2.value = "fwkProp2pvv2";
            prop6.permittedValues.push(prop6pv1);
            prop6.permittedValues.push(prop6pv2);
            c.fwkCustomProperties.push(prop5);
            c.fwkCustomProperties.push(prop6);
            c.compCustomProperties = [];
            let prop7 = {};
            prop7.context = 'https://schema.cassproject.org/0.4/';
            prop7.propertyName = 'customCompProp1';
            prop7.range = 'http://schema.org/URL';
            prop7.description = 'Custom Comp property 1';
            prop7.label = 'cCompProp1';
            prop7.priority = 'primary';
            prop7.required = true;
            prop7.permittedValues = [];
            let prop8 = {};
            prop8.context = 'https://schema.cassproject.org/0.4/';
            prop8.propertyName = 'customCompProp2';
            prop8.range = 'http://schema.org/Text';
            prop8.description = 'Custom Comp property 2';
            prop8.label = 'cCompProp2';
            prop8.priority = 'tertiary';
            prop8.required = false;
            prop8.permittedValues = [];
            let prop8pv1 = {};
            prop8pv1.display = "compProp2 pvd 1";
            prop8pv1.value = "compProp2pvv1";
            let prop8pv2 = {};
            prop8pv2.display = "compProp2 pvd 2";
            prop8pv2.value = "compProp2pvv2";
            prop8.permittedValues.push(prop8pv1);
            prop8.permittedValues.push(prop8pv2);
            c.compCustomProperties.push(prop7);
            c.compCustomProperties.push(prop8);
            c.relationships = {};
            c.relationships.isEnabledBy = {};
            c.relationships.isEnabledBy.label = 'is enabled by';
            c.relationships.isEnabledBy.enabled = true;
            c.relationships.requires = {};
            c.relationships.requires.label = 'requires';
            c.relationships.requires.enabled = true;
            c.relationships.desires = {};
            c.relationships.desires.label = 'desires';
            c.relationships.desires.enabled = true;
            c.relationships.narrows = {};
            c.relationships.narrows.label = 'narrows';
            c.relationships.narrows.enabled = true;
            c.relationships.isRelatedTo = {};
            c.relationships.isRelatedTo.label = 'is related to';
            c.relationships.isRelatedTo.enabled = true;
            c.relationships.isEquivalentTo = {};
            c.relationships.isEquivalentTo.label = 'is equivalent to';
            c.relationships.isEquivalentTo.enabled = true;
            c.relationships.broadens = {};
            c.relationships.broadens.label = 'broadens';
            c.relationships.broadens.enabled = false;
            c.relationships.majorRelated = {};
            c.relationships.majorRelated.label = 'is majorly related to';
            c.relationships.majorRelated.enabled = false;
            c.relationships.minorRelated = {};
            c.relationships.minorRelated.label = 'is minorly related to';
            c.relationships.minorRelated.enabled = false;
            c.relationships.isSimilarTo = {};
            c.relationships.isSimilarTo.label = 'is similar to';
            c.relationships.isSimilarTo.enabled = false;
            c.relationships.isPartiallySameAs = {};
            c.relationships.isPartiallySameAs.label = 'is partially the same as';
            c.relationships.isPartiallySameAs.enabled = false;
            c.relationships.enables = {};
            c.relationships.enables.label = 'enables';
            c.relationships.enables.enabled = false;
            c.relationships.hasChild = {};
            c.relationships.hasChild.label = 'has child';
            c.relationships.hasChild.enabled = false;
            c.relationships.isChildOf = {};
            c.relationships.isChildOf.label = 'is child of';
            c.relationships.isChildOf.enabled = false;
            c.alignments = {};
            c.alignments.teaches = true;
            c.alignments.assesses = true;
            c.alignments.requires = true;
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
