<template>
    <div id="user-groups">
        <iframe
            id="pluginFrame"
            :src="iFrameSource"
            @load="handlePluginFrameLoaded">
        </iframe>
    </div>
</template>

<script>

export default {
    name: 'PluginContainer',
    components: {},
    data: () => ({
        WAITING_MESSAGE: "waiting",
        INIT_IDENTITY_ACTION: "initIdentity",
        iFrameSource: ''
    }),
    methods: {
        getQueryParameterValue(queryParamValue) {
            if (queryParamValue.equalsIgnoreCase(':origin')) return window.location.origin;
            else return null;
        },
        getQueryStringForParameter(queryParam) {
            if (queryParam.name && queryParam.value) {
                let realValue = null;
                if (queryParam.value.startsWith(':')) realValue = this.getQueryParameterValue(queryParam.value);
                else realValue = queryParam.value;
                if (realValue) return queryParam.name + '=' + realValue;
                else return null;
            } else return null;
        },
        buildQueryParameterString(launchQueryParameters) {
            let queryString = '';
            if (launchQueryParameters && launchQueryParameters.length > 0) {
                let cnt = 0;
                for (let qp of launchQueryParameters) {
                    let queryStringPart = this.getQueryStringForParameter(qp);
                    if (queryStringPart) {
                        if (queryString.equals('')) queryString += '?';
                        if (cnt > 0) queryString += '&';
                        queryString += queryStringPart;
                    }
                    cnt++;
                }
            }
            return queryString;
        },
        setIFrameSource() {
            if (this.pluginToLaunch) {
                this.iFrameSource = this.pluginToLaunch.launchUrl + this.buildQueryParameterString(this.pluginToLaunch.queryParams);
                // console.log('this.iFrameSource');
                // console.log(this.iFrameSource);
            } else appLog('Cannot determine launch plugin');
        },
        sendIdentityToPlugin(origin) {
            appLog('Sending "' + this.INIT_IDENTITY_ACTION + '" message to plugin');
            // let origin = this.iFrameSource;
            // let origin = "https://vlrc.cassproject.org";
            let messageObj = {
                action: this.INIT_IDENTITY_ACTION,
                serverParm: window.repo.selectedServer,
                nameParm: EcIdentityManager.ids[0].displayName,
                pemParm: EcIdentityManager.ids[0].ppk.toPem()
            };
            console.log(messageObj);
            document.getElementsByTagName('iframe')[0].contentWindow.postMessage(JSON.stringify(messageObj), origin);
        },
        handlePluginFrameMessage(msg) {
            if (msg && msg.data && msg.data.message) {
                console.log("!!!handlePluginFrameMessage!!!");
                console.log(msg);
                console.log(msg.data.message);
                if (msg.data.message.equals(this.WAITING_MESSAGE)) this.sendIdentityToPlugin(msg.origin);
            }
        },
        handlePluginFrameLoaded() {
            window.addEventListener('message', this.handlePluginFrameMessage);
            // document.getElementById('pluginFrame').contentWindow.addEventListener('message', this.handlePluginFrameMessage);
        }
    },
    computed: {
        pluginToLaunch: function() {
            return this.$store.getters['app/pluginToLaunch'];
        },
        pluginToLaunchLastUpdate: function() {
            return this.$store.getters['app/pluginToLaunchLastUpdate'];
        }
    },
    watch: {
        pluginToLaunchLastUpdate: function() {
            this.setIFrameSource();
        }
    },
    mounted() {
        this.setIFrameSource();
    },
    beforeDestroy() {
        window.removeEventListener('message', this.handlePluginFrameMessage);
        // document.getElementById('pluginFrame').contentWindow.removeEventListener('message', this.handlePluginFrameMessage);
    }
};
</script>


<style lang="scss">
    #pluginFrame {
        border: 0;
        width: 100%;
        height: 100%;
    }
</style>
