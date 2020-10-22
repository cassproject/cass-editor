export const pluginUtil = {
    name: 'pluginUtil',
    data: () => ({
        PLUGIN_NAME_PARTS_DELIMITER: '/',
        DEFAULT_PLUGIN_LAUNCH_LOCATION: 'main',
        DEFAULT_PLUGIN_LAUNCH_CATEGORY: 'Plugins',
        PLUGIN_ENABLED_LS_KEY: 'cassAuthoringToolPluginsEnabled',
        LOCAL_PLUGIN_LIST_KEY: 'cassAuthoringToolLocalPlugins',
        mdPluginUrlList: [],
        mdPluginSuccessCallback: null,
        numPluginManifestsToGet: 0,
        numPluginManifestsGotten: 0,
        mdPluginCurrentUrl: '',
        pluginManifestData: {}
    }),
    methods: {
        isValidUrl(s) {
            try {
                let u = new URL(s);
            } catch (e) {
                return false;
            }
            return true;
        },
        checkManifestDataForPlugin() {
            if (this.numPluginManifestsGotten >= this.numPluginManifestsToGet) this.mdPluginSuccessCallback();
            else this.getManifestDataForPlugin(this.numPluginManifestsGotten);
        },
        concatenateRemainingPluginNameParts(nameParts) {
            let s = '';
            for (let i = 2; i < nameParts.length; i++) {
                s += nameParts[i];
                if ((i + 1) < nameParts.length) s += this.PLUGIN_NAME_PARTS_DELIMITER;
            }
            return s;
        },
        parsePluginManifestName(manifestName) {
            let pmn = {};
            let np = manifestName.split(this.PLUGIN_NAME_PARTS_DELIMITER);
            if (np.length >= 3 && (np[0].toLowerCase().equals('screen') || np[0].toLowerCase().equals('main'))) {
                pmn.launchLocation = np[0];
                pmn.launchCategory = np[1];
                pmn.launchName = this.concatenateRemainingPluginNameParts(np);
            } else {
                pmn.launchLocation = this.DEFAULT_PLUGIN_LAUNCH_LOCATION;
                pmn.launchCategory = this.DEFAULT_PLUGIN_LAUNCH_CATEGORY;
                pmn.launchName = manifestName;
            }
            return pmn;
        },
        buildShortcutsForPlugin(manifestDataObject, manifestData) {
            for (let so of manifestData.shortcuts) {
                let sdo = this.parsePluginManifestName(so.name);
                sdo.launchUrl = manifestDataObject.scope + so.url;
                sdo.launchUrl = sdo.launchUrl.replaceAll('//', '/');
                manifestDataObject.shortcuts.push(sdo);
            }
        },
        buildDefaultShortcutForPlugin(manifestDataObject) {
            let sdo = this.parsePluginManifestName(manifestDataObject.name);
            sdo.launchUrl = manifestDataObject.scope;
            manifestDataObject.shortcuts.push(sdo);
        },
        parsePluginManifest(manifestData) {
            let mdo = {};
            mdo.name = manifestData.name;
            mdo.scope = manifestData.scope;
            mdo.shortcuts = [];
            if (manifestData.shortcuts && manifestData.shortcuts.length > 0) {
                this.buildShortcutsForPlugin(mdo, manifestData);
            } else this.buildDefaultShortcutForPlugin(mdo);
            return mdo;
        },
        getManifestDataForPluginSuccess(responseData) {
            console.log("getManifestDataForPluginSuccess: " + this.mdPluginCurrentUrl);
            let mdo = {};
            try {
                mdo = this.parsePluginManifest(responseData);
                mdo.loaded = true;
            } catch (e) {
                mdo.loaded = false;
                mdo.error = 'Could not parse manifest';
            }
            mdo.pluginUrl = this.mdPluginCurrentUrl;
            this.pluginManifestData[this.mdPluginCurrentUrl] = mdo;
            this.numPluginManifestsGotten++;
            this.checkManifestDataForPlugin();
        },
        getManifestDataForPluginFailure(err) {
            let mdo = {};
            mdo.pluginUrl = this.mdPluginCurrentUrl;
            mdo.loaded = false;
            mdo.error = err;
            this.pluginManifestData[this.mdPluginCurrentUrl] = mdo;
            this.numPluginManifestsGotten++;
            this.checkManifestDataForPlugin();
        },
        getManifestDataForPlugin(pluginIdx) {
            let pluginUrl = this.mdPluginUrlList[pluginIdx];
            let manifestUrl = '';
            if (pluginUrl.endsWith("/")) manifestUrl = pluginUrl + "manifest.json";
            else manifestUrl = pluginUrl + "/manifest.json";
            this.mdPluginCurrentUrl = pluginUrl;
            this.$http.get(manifestUrl).then(
                function(response) {
                    this.getManifestDataForPluginSuccess(response.data);
                },
                function(error) {
                    this.getManifestDataForPluginFailure(error);
                }
            );
        },
        loadManifestDataForPluginUrlList(pluginUrlList, mdPluginSuccessCallback) {
            if (!pluginUrlList || pluginUrlList.length === 0) mdPluginSuccessCallback();
            this.mdPluginSuccessCallback = mdPluginSuccessCallback;
            this.numPluginManifestsToGet = pluginUrlList.length;
            this.numPluginManifestsGotten = 0;
            this.mdPluginUrlList = pluginUrlList;
            this.pluginManifestData = {};
            this.getManifestDataForPlugin(0);
        },
        getPluginEnabledMapFromLocalStorage() {
            let pluginEnabledMapString = localStorage.getItem(this.PLUGIN_ENABLED_LS_KEY);
            let pluginEnabledMap = null;
            if (!pluginEnabledMapString) pluginEnabledMap = {};
            else pluginEnabledMap = JSON.parse(pluginEnabledMapString);
            return pluginEnabledMap;
        },
        getIsPluginEnabled(pluginId) {
            let pluginEnabledMap = this.getPluginEnabledMapFromLocalStorage();
            if (pluginEnabledMap[pluginId]) return pluginEnabledMap[pluginId];
            else return false;
        },
        setPluginAsEnabled(pluginId) {
            let pluginEnabledMap = this.getPluginEnabledMapFromLocalStorage();
            pluginEnabledMap[pluginId] = true;
            localStorage.setItem(this.PLUGIN_ENABLED_LS_KEY, JSON.stringify(pluginEnabledMap));
            // TODO need to do some type of session plugin rebuild
        },
        setPluginAsDisabled(pluginId) {
            let pluginEnabledMap = this.getPluginEnabledMapFromLocalStorage();
            delete pluginEnabledMap[pluginId];
            localStorage.setItem(this.PLUGIN_ENABLED_LS_KEY, JSON.stringify(pluginEnabledMap));
            // TODO need to do some type of session plugin rebuild
        },
        setAllPluginsAsDisabled() {
            localStorage.removeItem(this.PLUGIN_ENABLED_LS_KEY);
            // TODO need to do some type of session plugin rebuild
        },
        getPluginListFromLocalStorage() {
            let localPluginListString = localStorage.getItem(this.LOCAL_PLUGIN_LIST_KEY);
            let localPluginList = [];
            if (!localPluginListString) localPluginList = [];
            else localPluginList = JSON.parse(localPluginListString);
            return localPluginList;
        },
        addLocalPlugin(pluginUrl) {
            let localPluginList = this.getPluginListFromLocalStorage();
            if (!localPluginList.includes(pluginUrl)) localPluginList.push(pluginUrl);
            localStorage.setItem(this.LOCAL_PLUGIN_LIST_KEY, JSON.stringify(localPluginList));
        },
        removeLocalPlugin(pluginUrl) {
            let localPluginList = this.getPluginListFromLocalStorage();
            if (localPluginList.includes(pluginUrl)) {
                for (let i = 0; i < localPluginList.length; i++) {
                    if (localPluginList[i].equals(pluginUrl)) {
                        localPluginList.splice(i, 1);
                        break;
                    }
                }
                localStorage.setItem(this.LOCAL_PLUGIN_LIST_KEY, JSON.stringify(localPluginList));
            }
        }
    },
    computed: {
    }
};

