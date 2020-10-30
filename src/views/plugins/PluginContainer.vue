<template>
    <div :class="[{'modal-card': view === 'dynamic-modal'}, {'section': view !== 'dynamic-modal'}]">
        <section :class="[{ 'container': view !== 'dynamic-modal'}, { 'modal-card-body': view === 'dynamic-modal'}]">
            <div class="section">
                <template>
                    <h3 class="title">
                        <i class="fa fa-plug"/> {{pluginName}}
                    </h3>
                </template>
            </div>
            <div
                class="modal"
                :class="[{'is-active': pluginBusy}]">
                <div class="modal-background" />
                <div class="modal-content has-text-centered">
                    <span class="icon is-large has-text-center has-text-link">
                        <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                    </span>
                </div>
            </div>
            <div :class="[{'is-active': !pluginBusy}]">
                <iframe
                    id="pluginFrame"
                    :src="iFrameSource"
                    @load="handlePluginFrameLoaded">
                </iframe>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    props: {
        view: {
            default: '',
            type: String
        }
    },
    name: 'PluginContainer',
    components: {},
    data: () => ({
        WAITING_MESSAGE: "waiting",
        INIT_IDENTITY_ACTION: "initIdentity",
        pluginName: '',
        iFrameSource: '',
        pluginBusy: true
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
                this.pluginBusy = true;
                this.pluginName = this.pluginToLaunch.launchName;
                this.iFrameSource = this.pluginToLaunch.launchUrl + this.buildQueryParameterString(this.pluginToLaunch.queryParams);
            } else {
                appLog('Cannot determine launch plugin');
            }
        },
        sendIdentityToPlugin(origin) {
            appLog('Sending "' + this.INIT_IDENTITY_ACTION + '" message to plugin');
            let messageObj = {
                action: this.INIT_IDENTITY_ACTION,
                serverParm: window.repo.selectedServer,
                nameParm: EcIdentityManager.ids[0].displayName,
                pemParm: EcIdentityManager.ids[0].ppk.toPem()
            };
            document.getElementsByTagName('iframe')[0].contentWindow.postMessage(JSON.stringify(messageObj), origin);
        },
        handlePluginFrameMessage(msg) {
            if (msg && msg.data && msg.data.message) {
                if (msg.data.message.equals(this.WAITING_MESSAGE)) this.sendIdentityToPlugin(msg.origin);
            }
        },
        handlePluginFrameLoaded() {
            this.pluginBusy = false;
            window.addEventListener('message', this.handlePluginFrameMessage);
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
            // TODO handle clear event listener...reestablish (plugin crosstalk???)
            this.setIFrameSource();
        }
    },
    mounted() {
        this.setIFrameSource();
    },
    beforeDestroy() {
        window.removeEventListener('message', this.handlePluginFrameMessage);
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
