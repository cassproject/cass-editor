<template>
    <iframe
        :src="baseRepoUrl + 'cass-profile?user=wait&origin=' + origin"
        height="100%"
        width="100%"
        class="legacyIframe" />
</template>

<script>

export default {
    name: 'Welcome',
    data() {
        return {
            repo: window.repo,
            baseRepoUrl: "",
            origin: ""
        };
    },
    mounted: function() {
        let index = this.repo.selectedServer.lastIndexOf('api');
        this.baseRepoUrl = this.repo.selectedServer.slice(0, index);
        this.origin = window.location.origin;
        console.log(this.origin);
    },
    created: function() {
        window.addEventListener('message', this.sendIdentity);
    },
    beforeDestroy: function() {
        window.removeEventListener('message', this.sendIdentity);
    },
    methods: {
        sendIdentity: function(msg) {
            var me = this;
            let origin = me.repo.selectedServer.replace("/api/", "");
            if (msg.data.message === "waiting") {
                document.getElementsByTagName('iframe')[0].contentWindow.postMessage(JSON.stringify({
                    action: "initIdentity",
                    serverParm: me.repo.selectedServer,
                    nameParm: EcIdentityManager.ids[0].displayName,
                    pemParm: EcIdentityManager.ids[0].ppk.toPem()
                }), origin);
            }
        }
    }
};
</script>