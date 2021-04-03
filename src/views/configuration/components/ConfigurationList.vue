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

export default {
    name: 'ConfigurationList',
    components: {
        ConfigurationListItem
    },
    mixins: [cassUtil],
    data() {
        return {
            frameworkConfigId: '',
            complexConfigObject: '',
            CONFIG_SEARCH_SIZE: 10000,
            configList: []
        };
    },
    props: {
        view: {
            type: String,
            defau: 'page'
        }
    },
    computed: {
        localDefaultBrowserConfigId() {
            return this.$store.getters['configuration/localDefaultBrowserConfig'];
        },
        configrationBusy() {
            return this.$store.getters['configuration/configurationBusy'];
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
        searchRepositoryForConfigsFailure(msg) {
            appLog("Config search failure: " + msg);
            this.$store.commit('configuration/configurationBusy', false);
        },
        buildSimpleConfigObjectFrameworkData(simpleConfigObj, complexConfigObj) {
            let cfo = complexConfigObj["frameworkConfig"];
            simpleConfigObj.fwkIdLabel = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.fwkIdDescription = cfo["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.fwkIdPriorty = cfo["@id"]["priority"];
            let idHeading = cfo["@id"]["heading"];
            if (idHeading) simpleConfigObj.fwkIdHeading = idHeading.trim();
            else simpleConfigObj.fwkIdHeading = "";
            simpleConfigObj.fwkNameLabel = cfo["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.fwkNameDescription = cfo["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            let nameHeading = cfo["http://schema.org/name"]["heading"];
            if (nameHeading) simpleConfigObj.fwkNameHeading = nameHeading.trim();
            else simpleConfigObj.fwkNameHeading = "";
            simpleConfigObj.fwkDescLabel = cfo["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.fwkDescDescription = cfo["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.fwkDescPriority = cfo["http://schema.org/description"]["priority"];
            simpleConfigObj.fwkDescRequired = this.getBooleanValue(cfo["http://schema.org/description"]["isRequired"]);
            let descHeading = cfo["http://schema.org/description"]["heading"];
            if (descHeading) simpleConfigObj.fwkDescHeading = descHeading.trim();
            else simpleConfigObj.fwkDescHeading = "";
            simpleConfigObj.fwkCustomProperties = [];
            let propertyKeys = Object.keys(cfo);
            for (let pk of propertyKeys) {
                if (this.isCustomPropertyKey('framework', pk)) {
                    simpleConfigObj.fwkCustomProperties.push(this.generateSimpleCustomPropertyObject(cfo[pk]));
                }
            }
        },
        isCustomPropertyKey(propertyParent, propertyKey) {
            if (propertyKey.equals('headings')) return false;
            else if (propertyKey.equals('primaryProperties')) return false;
            else if (propertyKey.equals('secondaryProperties')) return false;
            else if (propertyKey.equals('tertiaryProperties')) return false;
            else if (propertyKey.equals('@id')) return false;
            else if (propertyKey.equals('http://schema.org/name')) return false;
            else if (propertyKey.equals('http://schema.org/description')) return false;
            else if (propertyParent.equalsIgnoreCase('competency') && propertyKey.equals('http://purl.org/dc/terms/type')) return false;
            else if (propertyParent.equalsIgnoreCase('competency') && propertyKey.equals('relationshipsHeading')) return false;
            else if (propertyParent.equalsIgnoreCase('competency') && propertyKey.equals('relationshipsPriority')) return false;
            else return true;
        },
        generateSimpleCustomPropertyObject(ccpo) {
            let scpo = {};
            let contextNameObj = this.generateCustomPropertyContextAndNameFromId(ccpo["@id"]);
            scpo.context = contextNameObj.context;
            scpo.propertyName = contextNameObj.name;
            scpo.range = ccpo["http://schema.org/rangeIncludes"][0]["@id"];
            scpo.description = ccpo["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            scpo.label = ccpo["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            scpo.priority = ccpo["priority"];
            if (ccpo["heading"]) scpo.heading = ccpo["heading"];
            else scpo.heading = "";
            if (ccpo["max"] && (ccpo["max"] === 1 || ccpo["max"] === '1')) scpo.allowMultiple = false;
            else scpo.allowMultiples = true;
            if (ccpo["onePerLanguage"] && (ccpo["onePerLanguage"] === 'true' || ccpo["max"] === true)) scpo.onePerLanguage = true;
            else scpo.onePerLanguage = false;
            scpo.required = this.getBooleanValue(ccpo["isRequired"]);
            scpo.permittedValues = [];
            if (ccpo.options && ccpo.options.length > 0) {
                for (let pv of ccpo.options) {
                    let pvo = {};
                    pvo.display = pv.display;
                    pvo.value = pv.val;
                    scpo.permittedValues.push(pvo);
                }
            }
            return scpo;
        },
        buildSimpleConfigObjectCompetencyData(simpleConfigObj, complexConfigObj) {
            let cco = complexConfigObj["competencyConfig"];
            let relHeading = cco["relationshipsHeading"];
            if (relHeading) simpleConfigObj.relationshipsHeading = relHeading.trim();
            else simpleConfigObj.relationshipsHeading = "";
            let relPriority = cco["relationshipsPriority"];
            if (relPriority) simpleConfigObj.relationshipsPriority = relPriority;
            else simpleConfigObj.relationshipsPriority = "tertiary";
            simpleConfigObj.compIdLabel = cco["@id"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compIdDescription = cco["@id"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compIdPriorty = cco["@id"]["priority"];
            let idHeading = cco["@id"]["heading"];
            if (idHeading) simpleConfigObj.compIdHeading = idHeading.trim();
            else simpleConfigObj.compIdHeading = "";
            simpleConfigObj.compNameLabel = cco["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compNameDescription = cco["http://schema.org/name"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            let nameHeading = cco["http://schema.org/name"]["heading"];
            if (nameHeading) simpleConfigObj.compNameHeading = nameHeading.trim();
            else simpleConfigObj.compNameHeading = "";
            simpleConfigObj.compDescLabel = cco["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compDescDescription = cco["http://schema.org/description"]["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compDescPriority = cco["http://schema.org/description"]["priority"];
            simpleConfigObj.compDescRequired = this.getBooleanValue(cco["http://schema.org/description"]["isRequired"]);
            let descHeading = cco["http://schema.org/description"]["heading"];
            if (descHeading) simpleConfigObj.compDescHeading = descHeading.trim();
            else simpleConfigObj.compDescHeading = "";
            let ccto = cco["http://purl.org/dc/terms/type"];
            simpleConfigObj.compTypeLabel = ccto["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
            simpleConfigObj.compTypeDescription = ccto["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
            simpleConfigObj.compTypePriority = ccto["priority"];
            if (ccto["heading"]) simpleConfigObj.compTypeHeading = ccto["heading"];
            else simpleConfigObj.compTypeHeading = "";
            simpleConfigObj.compTypeRequired = this.getBooleanValue(ccto["isRequired"]);
            simpleConfigObj.compEnforceTypes = false;
            simpleConfigObj.compEnforcedTypes = [];
            if (ccto.options && ccto.options.length > 0) {
                simpleConfigObj.compEnforceTypes = true;
                for (let et of ccto.options) {
                    let eto = {};
                    eto.display = et.display;
                    eto.value = et.val;
                    simpleConfigObj.compEnforcedTypes.push(eto);
                }
            }
            simpleConfigObj.compCustomProperties = [];
            let propertyKeys = Object.keys(cco);
            for (let pk of propertyKeys) {
                if (this.isCustomPropertyKey('competency', pk)) {
                    simpleConfigObj.compCustomProperties.push(this.generateSimpleCustomPropertyObject(cco[pk]));
                }
            }
        },
        generateCustomPropertyContextAndNameFromId(customPropId) {
            let retObj = {};
            retObj.context = customPropId.substr(0, customPropId.lastIndexOf("/") + 1);
            retObj.name = customPropId.substr(customPropId.lastIndexOf("/") + 1);
            return retObj;
        },
        buildSimpleRelationshipConfigObject(simpleConfigObj, complexRelationshipObj, relationshipName, defaultLabel) {
            simpleConfigObj.relationships[relationshipName] = {};
            if (complexRelationshipObj[relationshipName]) {
                simpleConfigObj.relationships[relationshipName].label = complexRelationshipObj[relationshipName]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                simpleConfigObj.relationships[relationshipName].enabled = true;
            } else {
                simpleConfigObj.relationships[relationshipName].label = defaultLabel;
                simpleConfigObj.relationships[relationshipName].enabled = false;
            }
        },
        buildSimpleConfigDefaultPermissionData(simpleConfigObj, complexConfigObj) {
            if (complexConfigObj["defaultObjectOwners"]) {
                simpleConfigObj.defaultOwners = complexConfigObj["defaultObjectOwners"];
            } else simpleConfigObj.defaultOwners = [];
            if (complexConfigObj["defaultObjectReaders"]) {
                simpleConfigObj.defaultReaders = complexConfigObj["defaultObjectReaders"];
            } else simpleConfigObj.defaultReaders = [];
            if (complexConfigObj["defaultCommenters"]) {
                simpleConfigObj.defaultCommenters = complexConfigObj["defaultCommenters"];
            } else simpleConfigObj.defaultCommenters = [];
        },
        buildSimpleConfigObjectAlignmentData(simpleConfigObj, complexConfigObj) {
            let caa = complexConfigObj["alignConfig"];
            simpleConfigObj.alignments = {};
            simpleConfigObj.alignments.teaches = caa.includes("teaches");
            simpleConfigObj.alignments.assesses = caa.includes("assesses");
            simpleConfigObj.alignments.requires = caa.includes("requires");
            simpleConfigObj.alignments.desires = caa.includes("desires");
        },
        generateSimpleConfigObject(cco) {
            let simpleConfigObj = {};
            simpleConfigObj.id = cco.shortId();
            if (this.isObjectOwnerless(cco) || this.doesAnyIdentityOwnObject(cco)) simpleConfigObj.isOwned = true;
            else simpleConfigObj.isOwned = false;
            simpleConfigObj.isNew = false;
            simpleConfigObj.name = cco.getName();
            simpleConfigObj.description = cco.getDescription();
            simpleConfigObj.isDefault = this.getBooleanValue(cco.isDefault);
            if (simpleConfigObj.isDefault) this.defaultConfigId = simpleConfigObj.id;
            this.buildSimpleConfigObjectFrameworkData(simpleConfigObj, cco);
            this.buildSimpleConfigObjectCompetencyData(simpleConfigObj, cco);
            this.buildSimpleConfigObjectLevelData(simpleConfigObj, cco);
            this.buildSimpleConfigObjectRelationshipData(simpleConfigObj, cco);
            this.buildSimpleConfigObjectAlignmentData(simpleConfigObj, cco);
            this.buildSimpleConfigDefaultPermissionData(simpleConfigObj, cco);
            return simpleConfigObj;
        },
        buildSimpleConfigObjectLevelData(simpleConfigObj, complexConfigObj) {
            simpleConfigObj.compAllowLevels = false;
            simpleConfigObj.levelLabel = '';
            simpleConfigObj.levelDescription = '';
            simpleConfigObj.enforceLevelValues = false;
            simpleConfigObj.enforcedLevelValues = [];
            simpleConfigObj.levelPriority = 'secondary';
            simpleConfigObj.levelHeading = '';
            if (complexConfigObj["levelsConfig"] && complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]) {
                let lo = complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"];
                simpleConfigObj.compAllowLevels = true;
                if (lo["priority"]) simpleConfigObj.levelPriority = lo["priority"];
                else simpleConfigObj.levelPriority = "secondary";
                if (lo["heading"]) simpleConfigObj.levelHeading = lo["heading"];
                else simpleConfigObj.levelHeading = "";
                simpleConfigObj.levelLabel = lo["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"];
                simpleConfigObj.levelDescription = lo["http://www.w3.org/2000/01/rdf-schema#comment"][0]["@value"];
                if (complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]["options"]) {
                    let complexLevelsEnforced = complexConfigObj["levelsConfig"]["https://schema.cassproject.org/0.4/Level"]["options"];
                    if (complexLevelsEnforced.length > 0) {
                        simpleConfigObj.enforceLevelValues = true;
                        for (let cLvl of complexLevelsEnforced) {
                            simpleConfigObj.enforcedLevelValues.push(cLvl["val"]);
                        }
                    }
                }
            }
        },
        buildSimpleConfigObjectRelationshipData(simpleConfigObj, complexConfigObj) {
            let cro = complexConfigObj["relationshipConfig"];
            simpleConfigObj.relationships = {};
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isEnabledBy", "is enabled by");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "requires", "requires");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "desires", "desires");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "narrows", "narrows");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isRelatedTo", "is related to");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isEquivalentTo", "is equivalent to");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "broadens", "broadens");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "majorRelated", "is majorly related to");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "minorRelated", "is minorly related to");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isSimilarTo", "is similar to");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isPartiallySameAs", "is partially the same as");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "enables", "enables");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "hasChild", "has child");
            this.buildSimpleRelationshipConfigObject(simpleConfigObj, cro, "isChildOf", "is child of");
        },
        searchRepositoryForConfigsSuccess(ecRemoteLda) {
            appLog("Config search success: ");
            appLog(ecRemoteLda);
            this.configList = [];
            for (let ecrld of ecRemoteLda) {
                let t = new Thing();
                t.copyFrom(ecrld);
                this.configList.push(this.generateSimpleConfigObject(t));
            }
            this.sortConfigList();
            this.$store.commit('configuration/configurationBusy', false);
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
        }
    },
    updated() {
        console.log("updated");
    },
    mounted() {
        console.log("mounted");
        this.buildConfigList();
        if (this.$store.getters['editor/framework'] && this.$store.getters['editor/framework'].configuration) {
            this.frameworkConfigId = this.$store.getters['editor/framework'].configuration;
        }
        let defaultConfig = this.getDefaultBrowserConfigId();
        console.log("default config: ", defaultConfig);
        this.$store.commit('configuration/setLocalDefaultBrowserConfig', defaultConfig);
    }
};
</script>