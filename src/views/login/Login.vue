<template>
    <div>
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': loginBusy}]">
            <div class="modal-background"></div>
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-3x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <!-- login content-->
        <div v-if="!loginBusy">
            <h3>CAT Login</h3>
            <div v-if="amJustLoggingIn">
                <p><input type="text" v-model="username" placeholder="username"></p>
                <p><input type="password" v-model="password" placeholder="password"></p>
                <div v-if="identityFetchFailed">
                    <p><b>Login failed: {{identityFailMsg}}</b></p>
                </div>
                <div v-if="configRetrieveFailed">
                    <p><b>Could not retrieve configuration from selected server: {{configFailMsg}}</b></p>
                </div>
                <div v-if="loginParamsInvalid">
                    <p><b>Login failed: Invalid Username/Password</b></p>
                </div>
                <div>
                    <button @click="attemptCassLogin">Login</button>
                    <button @click="showCreateAccount">Create Account</button>
                </div>
            </div>
            <div v-if="amCreatingAccount || amCreatingLinkedPerson">
                <h4 v-if="amCreatingAccount">New Account</h4>
                <h4 v-if="amCreatingLinkedPerson">Link User Information</h4>
                <p v-if="amCreatingLinkedPerson">No matching user record could be found that matched your login information. Please provide the following:</p>
                <div v-if="amCreatingAccount">
                    <p><input type="text" v-model="createAccountUsername" placeholder="username"></p>
                    <p><input type="password" v-model="createAccountPassword" placeholder="password"></p>
                    <p><input type="password" v-model="createAccountPasswordRetype" placeholder="retype password"></p>
                </div>
                <p><input type="text" v-model="createLinkPersonName" placeholder="name"></p>
                <p><input type="text" v-model="createLinkPersonEmail" placeholder="email"></p>
                <div v-if="createAccountDataInvalid">
                    <div v-if="createAccountUsernameInvalid">*Username is required</div>
                    <div v-if="createAccountPasswordInvalid">*Password is required</div>
                    <div v-if="createAccountPasswordMismatch">*Passwords do not match</div>
                    <div v-if="createLinkPersonNameInvalid">*Name is required</div>
                    <div v-if="createLinkPersonEmailInvalid">*Email is required</div>
                    <div v-if="createLinkPersonEmailExists">*That email is already in use</div>
                </div>
                <div>
                    <button v-if="amCreatingAccount" @click="createNewAccount">Create</button>
                    <button v-if="amCreatingLinkedPerson" @click="linkPerson">Update</button>
                    <button @click="setDataToBaseLogin(true)">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        username: '',
        password: '',
        createAccountUsername: '',
        createAccountPassword: '',
        createAccountPasswordRetype: '',
        createLinkPersonName: '',
        createLinkPersonEmail: '',
        loginParamsInvalid: false,
        identityFetchFailed: false,
        configRetrieveFailed: false,
        loginBusy: false,
        ecRemoteIdentMgr: {},
        configFailMsg: '',
        identityFailMsg: '',
        amJustLoggingIn: true,
        amCreatingAccount: false,
        amCreatingLinkedPerson: false,
        createAccountDataInvalid: false,
        createAccountUsernameInvalid: false,
        createAccountPasswordInvalid: false,
        createAccountPasswordMismatch: false,
        createLinkPersonNameInvalid: false,
        createLinkPersonEmailInvalid: false,
        createLinkPersonEmailExists: false
    }),
    methods: {
        setDataToBaseLogin: function(clearIdentityManager) {
            this.username = '';
            this.password = '';
            this.createAccountUsername = '';
            this.createAccountPassword = '';
            this.createAccountPasswordRetype = '';
            this.createLinkPersonName = '';
            this.createLinkPersonEmail = '';
            this.loginParamsInvalid = false;
            this.identityFetchFailed = false;
            this.configRetrieveFailed = false;
            this.configFailMsg = "";
            this.identityFailMsg = "";
            this.amCreatingAccount = false;
            this.amCreatingLinkedPerson = false;
            this.createAccountDataInvalid = false;
            this.createAccountUsernameInvalid = false;
            this.createAccountPasswordInvalid = false;
            this.createAccountPasswordMismatch = false;
            this.createLinkPersonNameInvalid = false;
            this.createLinkPersonEmailInvalid = false;
            this.createLinkPersonEmailExists = false;
            if (clearIdentityManager) {
                this.ecRemoteIdentMgr = {};
                EcIdentityManager.clearContacts();
                EcIdentityManager.clearIdentities();
            }
            this.amJustLoggingIn = true;
            this.loginBusy = false;
        },
        showCreateAccount: function() {
            this.setDataToBaseLogin(true);
            this.amJustLoggingIn = false;
            this.amCreatingAccount = true;
        },
        showCreateLinkedPerson: function() {
            this.setDataToBaseLogin(false);
            this.amJustLoggingIn = false;
            this.amCreatingLinkedPerson = true;
        },
        validateNewAccountData() {
            if (!this.createAccountUsername || this.createAccountUsername.trim().equals('')) {
                this.createAccountDataInvalid = true;
                this.createAccountUsernameInvalid = true;
            }
            if (!this.createAccountPassword || this.createAccountPassword.trim().equals('') ||
                !this.createAccountPasswordRetype || this.createAccountPasswordRetype.trim().equals('')) {
                this.createAccountDataInvalid = true;
                this.createAccountPasswordInvalid = true;
            } else if (!this.createAccountPassword.equals(this.createAccountPasswordRetype)) {
                this.createAccountDataInvalid = true;
                this.createAccountPasswordMismatch = true;
            }
            if (!this.createLinkPersonName || this.createLinkPersonName.trim().equals('')) {
                this.createAccountDataInvalid = true;
                this.createLinkPersonNameInvalid = true;
            }
            if (!this.createLinkPersonEmail || this.createLinkPersonEmail.trim().equals('')) {
                this.createAccountDataInvalid = true;
                this.createLinkPersonEmailInvalid = true;
            }
        },
        createNewAccount: function() {
            this.validateNewAccountData();
            if (!this.createAccountDataInvalid) {
                // TODO verify email does not exist
            }
        },
        linkPerson: function() {
            // TODO implement
        },
        areLoginParamsValid: function() {
            if (this.username == null || this.username.length === 0 || this.password == null || this.password.length === 0) {
                this.loginParamsInvalid = true;
                return false;
            }
            return true;
        },
        handleFetchIdentitySuccess: function(obj) {
            // TODO Check for person object
            this.loginBusy = false;
            this.$router.push({path: '/config'});
        },
        handleFetchIdentityFailure: function(failMsg) {
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
            if (this.areLoginParamsValid()) {
                this.loginBusy = true;
                EcIdentityManager.clearContacts();
                EcIdentityManager.clearIdentities();
                this.ecRemoteIdentMgr = new EcRemoteIdentityManager();
                this.ecRemoteIdentMgr.server = window.repo.selectedServer;
                this.ecRemoteIdentMgr.configureFromServer(this.handleConfigureFromServerSuccess, this.handleConfigureFromServerFail); // Retrieves username and password salts from the serve
            }
        }
    },
    mounted() {
        this.setDataToBaseLogin(true);
    }
};
</script>