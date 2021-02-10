<template>
    <div
        id="login"
        class="section is-large">
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': loginBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <!-- login content-->
        <div
            v-if="!loginBusy"
            class="modal is-active">
            <div class="modal-card">
                <header
                    class="modal-card-head has-text-centered has-background-primary"
                    v-if="!loginBusy">
                    <h3 class="modal-card-title is-size-2 has-text-centered has-text-white">
                        Login to CaSS
                    </h3>
                </header>
                <section class="modal-card-body">
                    <div class="columns is-mobile is-multiline">
                        <div class="column is-6">
                            <div class="section box py-2 px-2">
                                <div class="modal-card-body has-text-centered">
                                    <div
                                        class="button is-outlined is-primary"
                                        @click="attemptExternalCassLogin">
                                        <span class="icon">
                                            <i class="fa fa-sign-in-alt" />
                                        </span><span>login</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="section box py-2 px-2">
                                <div class="modal-card-body has-text-centered">
                                    <div
                                        class="button is-outlined is-dark"
                                        @click="goToCreateAccount">
                                        <span class="icon">
                                            <i class="fa fa-plus" />
                                        </span><span>create account</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- error messages -->
                        <div
                            v-if="identityFetchFailed || configRetrieveFailed || loginParamsInvalid"
                            class="column is-12">
                            <div class="panel is-warning py-2 px-2">
                                <p class="panel-heading">
                                    Login failed
                                </p>
                                <div
                                    class="panel-block"
                                    v-if="identityFetchFailed">
                                    <p>Could not fetch identity: {{ identityFailMsg }}</p>
                                </div>
                                <div
                                    class="panel-block"
                                    v-if="configRetrieveFailed">
                                    <p>Could not retrieve configuration from selected server: {{ configFailMsg }}</p>
                                </div>
                                <div
                                    class="panel-block"
                                    v-if="loginParamsInvalid">
                                    <p>Login failed: Invalid Username/Password</p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="column is-12"
                            v-if="legacyLoginEnabled">
                            <div class="has-text-centered">
                                <a @click="goToLegacyLogin">Legacy Login (for pre 1.4 accounts)</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>

import {cassApi} from '../../mixins/cassApi';

export default {
    name: 'Login',
    mixins: [cassApi],
    data: () => ({
        loginBusy: false,
        ecRemoteIdentMgr: null,
        identityFetchFailed: false,
        configRetrieveFailed: false,
        loginParamsInvalid: false,
        identityFailMsg: '',
        configFailMsg: '',
        loginCredentials: null
    }),
    methods: {
        goToLegacyLogin: function() {
            this.loginBusy = false;
            this.loginCredentials = null;
            this.$router.push({path: '/legacyLogin'});
        },
        goToCreateAccount: function() {
            this.loginBusy = false;
            this.loginCredentials = null;
            this.$router.push({path: '/createAccount'});
        },
        createPersonObjectToLinkToIdentity: function() {
            // TODO implement
        },
        findLinkedPersonForIdentity: function() {
            // TODO implement
            // appLog("Finding linked person for identity...");
            // let identFingerprint = EcIdentityManager.ids[0].ppk.toPk().fingerprint();
            // let paramObj = {};
            // paramObj.size = this.PERSON_SEARCH_SIZE;
            // window.repo.searchWithParams("@type:Person AND @id:\"" + identFingerprint + "\"", paramObj, null,
            //     this.findLinkedPersonPersonSearchSuccess, this.findLinkedPersonPersonSearchFailure);
        },
        handleCreateAccountFetchIdentitySuccess: function() {
            appLog("Creating new account identity object...");
            let ident = new EcIdentity();
            ident.displayName = this.loginCredentials.name;
            ident.ppk = EcPpk.generateKey();
            EcIdentityManager.addIdentity(ident);
            EcIdentityManager.saveContacts();
            EcIdentityManager.saveIdentities();
            // this.identityToLinkToPerson = ident;
            this.ecRemoteIdentMgr.commit(this.createPersonObjectToLinkToIdentity, this.handleAttemptLoginFetchIdentityFailureNoCreateAccountCheck);
        },
        handleCreateAccountRemoteIdentityMgrCreateSuccess: function() {
            appLog("Creating new account manager fetch...");
            this.ecRemoteIdentMgr.fetch(this.handleCreateAccountFetchIdentitySuccess, this.handleAttemptLoginFetchIdentityFailureNoCreateAccountCheck);
        },
        handleCreateAccountConfigureFromServerSuccess: function(obj) {
            appLog("Creating new account identity...");
            this.ecRemoteIdentMgr.startLogin(this.loginCredentials.username, this.loginCredentials.password);
            this.ecRemoteIdentMgr.create(this.handleCreateAccountRemoteIdentityMgrCreateSuccess, this.handleAttemptLoginFetchIdentityFailureNoCreateAccountCheck);
        },
        createNewAccountIdentity: function() {
            appLog("Creating new account...");
            appLog("EcRemoteIdentityManager Configuring from server...");
            this.ecRemoteIdentMgr = new EcRemoteIdentityManager();
            this.ecRemoteIdentMgr.server = window.repo.selectedServer;
            this.ecRemoteIdentMgr.configureFromServer(this.handleCreateAccountConfigureFromServerSuccess, this.handleAttemptLoginConfigureFromServerFail);
        },
        handleAttemptLoginFetchIdentityFailureNoCreateAccountCheck: function(failMsg) {
            // this shouldn't happen, but don't want to cause an unexpected create loop
            this.identityFailMsg = failMsg;
            this.identityFetchFailed = true;
            this.loginBusy = false;
        },
        handleAttemptLoginFetchIdentitySuccess: function(obj) {
            if (!EcIdentityManager.ids || EcIdentityManager.ids.length <= 0) {
                this.handleAttemptLoginFetchIdentityFailure('Login credentials valid but no identity could be found.');
            } else this.findLinkedPersonForIdentity();
        },
        handleAttemptLoginFetchIdentityFailure: function(failMsg) {
            if (failMsg && failMsg.toLowerCase().trim().equals('user does not exist.')) {
                this.createNewAccountIdentity();
            } else {
                this.identityFailMsg = failMsg;
                this.identityFetchFailed = true;
                this.loginBusy = false;
            }
        },
        handleAttemptLoginConfigureFromServerSuccess: function(obj) {
            appLog("Fetching identity...");
            // Creates the hashes for storage and retrieval of keys.
            this.ecRemoteIdentMgr.startLogin(this.loginCredentials.username, this.loginCredentials.password);
            // Retrieves the identities and encryption keys from the server.
            this.ecRemoteIdentMgr.fetch(this.handleAttemptLoginFetchIdentitySuccess, this.handleAttemptLoginFetchIdentityFailure);
        },
        handleAttemptLoginConfigureFromServerFail: function(failMsg) {
            this.configFailMsg = failMsg;
            this.configRetrieveFailed = true;
            this.loginBusy = false;
        },
        performInternalCassLogin: function() {
            appLog("Attempting CaSS login....");
            this.loginBusy = true;
            EcIdentityManager.clearContacts();
            EcIdentityManager.clearIdentities();
            this.ecRemoteIdentMgr = new EcRemoteIdentityManager();
            this.ecRemoteIdentMgr.server = window.repo.selectedServer;
            // Retrieve username and password salts from the server
            this.ecRemoteIdentMgr.configureFromServer(this.handleAttemptLoginConfigureFromServerSuccess, this.handleAttemptLoginConfigureFromServerFail);
        },
        attemptExternalCassLogin: function() {
            this.redirectToExternalLoginPage();
        },
        handleUserProfileAlreadyLoaded: function(profileResponse) {
            let co = this.parseCredentialsFromProfileResponse(profileResponse);
            if (co.username && co.username.trim().length > 0 && co.password && co.password.trim().length > 0) {
                this.loginCredentials = co;
                // this.performInternalCassLogin();
            } else {
                appLog("Unable to parse credentials from user profile response");
            }
        },
        checkUserProfileRequestStatus: function(profileResponse) {
            console.log('HELLO FROM checkUserProfileRequestStatus: ' + profileResponse.status);
            if (profileResponse.status === 401) {
                this.loginBusy = false;
            } else if (profileResponse.status === 200) {
                this.handleUserProfileAlreadyLoaded(profileResponse);
            } else {
                appLog('Unexpected response status: ' + profileResponse.status);
                this.loginBusy = false;
            }
        },
        checkLoginStatus: function() {
            this.loginBusy = true;
            this.getUserProfile(this.checkUserProfileRequestStatus);
        }
    },
    computed: {
        legacyLoginEnabled: function() {
            return this.$store.getters['featuresEnabled/legacyLoginEnabled'];
        }
    },
    mounted() {
        this.checkLoginStatus();
    }
};
</script>

<style lang="scss" scoped>
    @import '@/scss/variables.scss';
#login {
    position: fixed;
    background-color: $light;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    .container {
        height: 100%;
    }
    .columns {
        height: 100%;
    }
    .container {
    }
    .modal-card {
        width: 600px;
        max-width: calc(100% - 1rem);
    }
    .card {
        border-radius: 10px;
        .card-header {
            border-radius: 10px 10px 0px 0px;
        }
    }
}

</style>