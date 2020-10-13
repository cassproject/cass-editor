export const pluginUtil = {
    name: 'pluginUtil',
    data: () => ({
        PLUGIN_ENABLED_LS_KEY: 'cassAuthoringToolPluginsEnabled'
    }),
    methods: {
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
        }
    },
    computed: {
    }
};

