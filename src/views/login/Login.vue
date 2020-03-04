<template>
    <div>
        <div v-if="!loginBusy">
            <h3>CAT Login</h3>
            <p><input type="text" v-model="username" placeholder="username"></p>
            <p><input type="password" v-model="password" placeholder="password"></p>
            <p><button @click="attemptCassLogin">Login</button></p>
            <div v-if="identityFetchFailed">
                <p><b>Login failed: {{identityFailMsg}}</b></p>
            </div>
            <div v-if="configRetrieveFailed">
                <p><b>Could not retrieve configuration from selected server: {{configFailMsg}}</b></p>
            </div>
            <div v-if="loginParamsInvalid">
                <p><b>Login failed: Invalid Username/Password</b></p>
            </div>
        </div>
        <div v-if="loginBusy">
            LOGGING IN!!!! //TODO Replace me with something pretty
        </div>
        <div v-if="loginSuccess">
            I THINK THE LOGIN SUCCEEDED!!!!!!!!!!!!!
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        username: "",
        password: "",
        loginParamsInvalid: false,
        identityFetchFailed: false,
        configRetrieveFailed: false,
        loginBusy: false,
        ecRemoteIdentMgr: {},
        configFailMsg: "",
        identityFailMsg: "",
        loginSuccess: false
    }),
    methods: {
        areLoginParamsValid: function() {
            if (this.username == null || this.username.length === 0 || this.password == null || this.password.length === 0) {
                this.loginParamsInvalid = true;
                return false;
            }
            return true;
        },
        handleFetchIdentitySuccess: function(obj) {
            // TODO Add new user stuff

            // debugMessage("handleFetchIdentitySuccess: ");
            // loggedInIdentityName = EcIdentityManager.ids[0].displayName.trim();
            // debugMessage("Display Name: " + loggedInIdentityName);
            // var loggedInPkPem = EcIdentityManager.ids[0].ppk.toPk().toPem();
            // debugMessage("Public Key: " + loggedInPkPem);
            // loggedInPpkPem = EcIdentityManager.ids[0].ppk.toPem();
            // sessionStorage.setItem("usernameWithSalt", ecIdentMgr.usernameWithSalt);
            // sessionStorage.setItem("passwordWithSalt", ecIdentMgr.passwordWithSalt);
            // sessionStorage.setItem("secretWithSalt", ecIdentMgr.secretWithSalt);
            // sessionStorage.setItem("pad", ecIdentMgr.pad);
            // sessionStorage.setItem("token", ecIdentMgr.token);
            // hideLoginBusy();
            // hideLoginErrorMessage();
            // enableAllLoginInputs();
            // clearLoginInputs();
            // doAfterLoginSuccess();
            this.loginBusy = false;
            this.loginSuccess = true;
        },
        handleFetchIdentityFailure: function (failMsg) {
            this.identityFailMsg = failMsg;
            this.identityFetchFailed = true;
            this.loginBusy = false;
        },
        handleConfigureFromServerSuccess: function(obj) {
            this.ecRemoteIdentMgr.startLogin(this.username, this.password); // Creates the hashes for storage and retrieval of keys.
            this.ecRemoteIdentMgr.fetch(this.handleFetchIdentitySuccess, this.handleFetchIdentityFailure); // Retrieves the identities and encryption keys from the server.
        },
        handleConfigureFromServerFail: function(failMsg) {
            this.configFailMsg = failMsg;
            this.configRetrieveFailed = true;
            this.loginBusy = false;
        },
        attemptCassLogin: function() {
            this.loginParamsInvalid = false;
            this.identityFetchFailed = false;
            this.configRetrieveFailed = false;
            this.loginSuccess = false;
            if (this.areLoginParamsValid()) {
                this.loginBusy = true;
                EcIdentityManager.clearContacts();
                EcIdentityManager.clearIdentities();
                this.ecRemoteIdentMgr = new EcRemoteIdentityManager();
                this.ecRemoteIdentMgr.server = window.repo.selectedServer;
                this.ecRemoteIdentMgr.configureFromServer(this.handleConfigureFromServerSuccess, this.handleConfigureFromServerFail); // Retrieves username and password salts from the serve
            }
        }
    }
};
</script>