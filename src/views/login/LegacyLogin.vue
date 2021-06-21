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
                    <h3
                        v-if="amJustLoggingIn"
                        class="modal-card-title is-size-2 has-text-centered has-text-white">
                        Login to CaSS Authoring Tool
                    </h3>
                    <h3
                        v-if="amCreatingAccount"
                        class="modal-card-title is-size-2 has-text-centered has-text-white">
                        Create CaSS Authoring Tool User
                    </h3>
                    <h4
                        class="title is-size-2 has-text-centered has-text-white"
                        v-if="amCreatingLinkedPerson">
                        Link User Information
                    </h4>
                </header>
                <section class="modal-card-body">
                    <div
                        class="section"
                        v-if="amCreatingAccount || amCreatingLinkedPerson">
                        <p v-if="amCreatingLinkedPerson">
                            No matching user record could be found that matched your login information. Please provide the following:
                        </p>
                    </div>
                    <!-- inputs -->
                    <div
                        class="section"
                        v-if="amJustLoggingIn">
                        <div class="field">
                            <div class="control">
                                <label class="label">Username</label>
                                <input
                                    type="text"
                                    class="input"
                                    v-model="username"
                                    placeholder="username">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <label class="label">Password</label>
                                <input
                                    type="password"
                                    class="input"
                                    v-model="password"
                                    placeholder="password"
                                    @keyup.enter="attemptCassLogin">
                            </div>
                        </div>
                    </div>
                    <!-- inputs -->
                    <div class="section">
                        <!-- name and email -->
                        <div
                            class="field"
                            v-if="amCreatingAccount || amCreatingLinkedPerson">
                            <div class="control">
                                <label class="label">name</label>
                                <input
                                    class="input"
                                    type="text "
                                    v-model="createLinkPersonName">
                            </div>
                        </div>
                        <div
                            v-if="amCreatingAccount || amCreatingLinkedPerson"
                            class="field">
                            <div class="control">
                                <label class="label">email</label>
                                <input
                                    class="input"
                                    type="text "
                                    v-model="createLinkPersonEmail">
                            </div>
                        </div>
                        <div
                            class="field"
                            v-if="amCreatingAccount">
                            <div class="control">
                                <label class="label">username</label>
                                <input
                                    type="text"
                                    class="input"
                                    v-model="createAccountUsername">
                            </div>
                        </div>
                        <!--  password -->
                        <div
                            class="field is-grouped"
                            v-if="amCreatingAccount">
                            <div class="control is-expanded">
                                <label class="label">password</label>
                                <input
                                    type="password"
                                    class="input"
                                    v-model="createAccountPassword">
                            </div>
                            <div class="control is-expanded">
                                <label class="label">Confirm password</label>
                                <input
                                    class="input"
                                    type="password"
                                    v-model="createAccountPasswordRetype">
                            </div>
                        </div>
                    </div>
                    <!-- error messages -->
                    <div
                        class="field has-text-danger"
                        v-if="createAccountOrLinkPersonDataInvalid">
                        <div class="label has-text-danger">
                            Please correct the following errors:
                        </div>
                        <div
                            class="is-size-6"
                            v-if="createAccountUsernameInvalid">
                            Username is required
                        </div>
                        <div
                            class="is-size-6"
                            v-if="createAccountPasswordInvalid">
                            Password is required
                        </div>
                        <div
                            class="is-size-6"
                            v-if="createAccountPasswordMismatch">
                            Passwords do not match
                        </div>
                        <div
                            class="is-size-6"
                            v-if="createLinkPersonNameInvalid">
                            Name is required
                        </div>
                        <div
                            class="is-size-6"
                            v-if="createLinkPersonEmailInvalid">
                            Valid email is required
                        </div>
                        <div
                            class="is-size-6"
                            v-if="createLinkPersonEmailExists">
                            That email is already in use
                        </div>
                        <div
                            class="is-size-6"
                            v-if="createAccountUsernameUnavailable">
                            That username is unavailable
                        </div>
                    </div>
                    <!-- error messages -->
                    <div
                        v-if="identityFetchFailed || configRetrieveFailed || loginParamsInvalid"
                        class="section">
                        <div v-if="identityFetchFailed">
                            <p><b>Login failed: {{ identityFailMsg }}</b></p>
                        </div>
                        <div v-if="configRetrieveFailed">
                            <p><b>Could not retrieve configuration from selected server: {{ configFailMsg }}</b></p>
                        </div>
                        <div v-if="loginParamsInvalid">
                            <p><b>Login failed: Invalid Username/Password</b></p>
                        </div>
                    </div>
                </section>
                <!-- footer with actions -->
                <footer class="modal-card-foot has-background-white">
                    <div class="buttons is-spaced">
                        <div
                            class="button is-dark is-outlined"
                            v-if="amCreatingLinkedPerson || amCreatingAccount"
                            @click="setDataToBaseLogin(true)">
                            <span class="icon">
                                <i class="fa fa-times" />
                            </span><span>cancel</span>
                        </div>
                        <template v-if="amJustLoggingIn">
                            <div
                                v-if="!apiLoginEnabled"
                                class="button is-outlined is-dark"
                                @click="showCreateAccount">
                                <span class="icon">
                                    <i class="fa fa-plus" />
                                </span><span>create account</span>
                            </div>
                            <div
                                class="button is-outlined is-primary"
                                @click="attemptCassLogin">
                                <span class="icon">
                                    <i class="fa fa-sign-in-alt" />
                                </span><span>login</span>
                            </div>
                        </template>
                        <div
                            class="button is-expanded is-primary is-outlined"
                            v-if="amCreatingAccount"
                            @click="createNewAccount">
                            <span class="icon">
                                <i class="fa fa-sign-in-alt" />
                            </span><span>create</span>
                        </div>
                        <div
                            class="button is-success is-outlined"
                            v-if="amCreatingLinkedPerson"
                            @click="linkPerson">
                            <span class="icon">
                                <i class="fa fa-sign-in-alt" />
                            </span><span>update</span>
                        </div>
                    </div>
                </footer>
                <div
                    v-if="apiLoginEnabled"
                    class="has-text-centered">
                    <a @click="goToStandardLogin">Return to Standard Login</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LegacyLogin',
    data: () => ({
        GROUP_SEARCH_SIZE: 10000,
        PERSON_SEARCH_SIZE: 10000,
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
        createAccountOrLinkPersonDataInvalid: false,
        createAccountUsernameInvalid: false,
        createAccountPasswordInvalid: false,
        createAccountPasswordMismatch: false,
        createLinkPersonNameInvalid: false,
        createLinkPersonEmailInvalid: false,
        createLinkPersonEmailExists: false,
        createAccountUsernameUnavailable: false,
        identityToLinkToPerson: {},
        linkedPerson: {}
    }),
    methods: {
        goToStandardLogin: function() {
            this.loginBusy = false;
            this.$router.push({path: '/login'});
        },
        goToAppHome: function() {
            this.loginBusy = false;
            this.$router.push({path: '/frameworks'});
        },
        async addGroupIdentity(group) {
            try {
                // add all available group keys to identity manager
                let groupPpkSet = await group.getOrgKeys();
                appLog("Adding group identities: " + "(" + group.shortId() + ") - " + group.getName() + " - (" + groupPpkSet.length + ") keys");
                for (let i = 0; i < groupPpkSet.length; i++) {
                    let gPpk = groupPpkSet[i];
                    let grpIdent = new EcIdentity();
                    grpIdent.displayName = group.getName() + " - key[" + i + "]";
                    grpIdent.ppk = gPpk;
                    EcIdentityManager.default.addIdentityQuietly(grpIdent);
                }
            } catch (e) {
                // TODO Problem with EcOrganization update and creating encrypted value when only a reader...
                // Anticipated workaround....login as group owner and save it.
                // console.error("TODO...fix this...needs FRITZ input!!!!: " + e.toString());
            }
        },
        searchRepositoryForGroupsSuccess(ecoa) {
            let linkedPersonShortId = this.linkedPerson.shortId();
            if (ecoa && ecoa.length > 0) {
                for (let eco of ecoa) {
                    if (eco.employee && eco.employee.length > 0) {
                        for (let e of eco.employee) {
                            if (e.equals(linkedPersonShortId)) {
                                this.addGroupIdentity(eco);
                                break;
                            }
                        }
                    }
                }
            }
        },
        searchRepositoryForGroupsFailure(msg) {
            appLog("Group search failure: " + msg);
            this.goToAppHome();
        },
        addGroupIdentities: function() {
            appLog(" Adding group identities...");
            let paramObj = {};
            paramObj.size = this.GROUP_SEARCH_SIZE;
            EcOrganization.search(window.repo, '', this.searchRepositoryForGroupsSuccess, this.searchRepositoryForGroupsFailure, paramObj);
            this.goToAppHome();
        },
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
            this.createAccountOrLinkPersonDataInvalid = false;
            this.createAccountUsernameInvalid = false;
            this.createAccountPasswordInvalid = false;
            this.createAccountPasswordMismatch = false;
            this.createLinkPersonNameInvalid = false;
            this.createLinkPersonEmailInvalid = false;
            this.createLinkPersonEmailExists = false;
            this.createAccountUsernameUnavailable = false;
            if (clearIdentityManager) {
                this.ecRemoteIdentMgr = {};
                EcIdentityManager.default.clearContacts();
                EcIdentityManager.default.clearIdentities();
                this.identityToLinkToPerson = {};
                this.linkedPerson = {};
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
        setAllNewAccountValidationsChecksToValid() {
            this.createAccountOrLinkPersonDataInvalid = false;
            this.createAccountUsernameInvalid = false;
            this.createAccountPasswordInvalid = false;
            this.createAccountPasswordMismatch = false;
            this.createLinkPersonNameInvalid = false;
            this.createLinkPersonEmailInvalid = false;
            this.createLinkPersonEmailExists = false;
            this.createAccountUsernameUnavailable = false;
        },
        isValidEmail(email) {
            let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/igm;
            if (re.test(email)) return true;
            return false;
        },
        validateNewAccountData() {
            if (!this.createAccountUsername || this.createAccountUsername.trim().equals('')) {
                this.createAccountOrLinkPersonDataInvalid = true;
                this.createAccountUsernameInvalid = true;
            }
            if (!this.createAccountPassword || this.createAccountPassword.trim().equals('') ||
                !this.createAccountPasswordRetype || this.createAccountPasswordRetype.trim().equals('')) {
                this.createAccountOrLinkPersonDataInvalid = true;
                this.createAccountPasswordInvalid = true;
            } else if (!this.createAccountPassword.equals(this.createAccountPasswordRetype)) {
                this.createAccountOrLinkPersonDataInvalid = true;
                this.createAccountPasswordMismatch = true;
            }
            this.validateLinkPersonData();
        },
        handleCreatePersonSuccess() {
            appLog("Person created.");
            if (this.amCreatingAccount) {
                this.goToAppHome();
            } else this.addGroupIdentities();
        },
        createPersonObjectToLinkToIdentity() {
            appLog("Creating person object for identity...");
            let p = new EcPerson();
            p.assignId(window.repo.selectedServer, this.identityToLinkToPerson.ppk.toPk().fingerprint());
            p.addOwner(this.identityToLinkToPerson.ppk.toPk());
            p.name = this.createLinkPersonName;
            p.email = this.createLinkPersonEmail;
            appLog(p);
            this.$store.commit('user/loggedOnPerson', p);
            this.linkedPerson = p;
            EcRepository.save(p, this.handleCreatePersonSuccess, this.handleAttemptLoginFetchIdentityFailure);
        },
        handleCreateAccountFetchIdentitySuccess() {
            appLog("Creating new account identity object...");
            let ident = new EcIdentity();
            ident.displayName = this.createLinkPersonName;
            ident.ppk = EcPpk.generateKey();
            EcIdentityManager.default.addIdentity(ident);
            EcIdentityManager.default.saveContacts();
            EcIdentityManager.default.saveIdentities();
            this.identityToLinkToPerson = ident;
            this.ecRemoteIdentMgr.commit(this.createPersonObjectToLinkToIdentity, this.handleAttemptLoginFetchIdentityFailure);
        },
        handleCreateAccountRemoteIdentityMgrCreateSuccess() {
            appLog("Creating new account manager fetch...");
            this.ecRemoteIdentMgr.fetch(this.handleCreateAccountFetchIdentitySuccess, this.handleAttemptLoginFetchIdentityFailure);
        },
        handleCreateAccountConfigureFromServerSuccess: function(obj) {
            appLog("EcRemoteIdentityManager creating...");
            appLog("Creating new account login...");
            this.ecRemoteIdentMgr.startLogin(this.createAccountUsername, this.createAccountPassword);
            this.ecRemoteIdentMgr.create(this.handleCreateAccountRemoteIdentityMgrCreateSuccess, this.handleAttemptLoginFetchIdentityFailure);
        },
        createNewAccountIdentityAndPerson() {
            appLog("Creating new account...");
            appLog("EcRemoteIdentityManager Configuring from server...");
            this.ecRemoteIdentMgr = new EcRemoteIdentityManager();
            this.ecRemoteIdentMgr.server = window.repo.selectedServer;
            this.ecRemoteIdentMgr.configureFromServer(this.handleCreateAccountConfigureFromServerSuccess, this.handleAttemptLoginConfigureFromServerFail);
        },
        handleCheckUsernameFetchIdentitySuccess: function(obj) {
            appLog('handleCheckUsernameFetchIdentitySuccess !!!!');
            this.createAccountOrLinkPersonDataInvalid = true;
            this.createAccountUsernameUnavailable = true;
            this.loginBusy = false;
            EcIdentityManager.default.clearIdentities();
            EcIdentityManager.default.clearContacts();
        },
        handleCheckUsernameFetchIdentityFailure: function(failMsg) {
            appLog('handleCheckUsernameFetchIdentityFailure: ' + failMsg);
            if (failMsg && failMsg.toString().toLowerCase().indexOf('user does not exist') !== -1) {
                this.createNewAccountIdentityAndPerson();
            } else {
                this.createAccountOrLinkPersonDataInvalid = true;
                this.createAccountUsernameUnavailable = true;
                this.loginBusy = false;
                EcIdentityManager.default.clearIdentities();
                EcIdentityManager.default.clearContacts();
            }
        },
        handleCheckUsernameConfigureFromServerSuccess: function(obj) {
            appLog("Fetching identity for username check...");
            this.ecRemoteIdentMgr.startLogin(this.createAccountUsername, this.createAccountPassword); // Creates the hashes for storage and retrieval of keys.
            this.ecRemoteIdentMgr.fetch(this.handleCheckUsernameFetchIdentitySuccess, this.handleCheckUsernameFetchIdentityFailure); // Retrieves the identities and encryption keys from the server.
        },
        handleCheckUsernameConfigureFromServerFail: function(failMsg) {
            this.loginBusy = false;
            appLog('New account configure from server for username check failure: ' + msg);
        },
        checkForExistingUsername: function() {
            appLog("Check if new account username already exists");
            this.ecRemoteIdentMgr = new EcRemoteIdentityManager();
            this.ecRemoteIdentMgr.server = window.repo.selectedServer;
            this.ecRemoteIdentMgr.configureFromServer(this.handleCheckUsernameConfigureFromServerSuccess, this.handleCheckUsernameConfigureFromServerFail); // Retrieves username and password salts from the serve
        },
        searchPersonsForNewAccountSuccess(ecRemoteLda) {
            appLog("New account person search success: ");
            appLog(ecRemoteLda);
            let emailExists = false;
            for (let ecrld of ecRemoteLda) {
                let ep = new EcPerson();
                ep.copyFrom(ecrld);
                if (this.createLinkPersonEmail.equalsIgnoreCase(ep.email)) {
                    emailExists = true;
                    break;
                }
            }
            if (emailExists) {
                this.createAccountOrLinkPersonDataInvalid = true;
                this.createLinkPersonEmailExists = true;
                this.loginBusy = false;
            } else {
                this.checkForExistingUsername();
                // this.createNewAccountIdentityAndPerson();
            }
        },
        searchPersonsForNewAccountFailure(msg) {
            // Search fails if the index doesn't exist yet.
            this.checkForExistingUsername();
        },
        verifyEmailAddressForNewAccountAndGo() {
            this.loginBusy = true;
            let paramObj = {};
            paramObj.size = this.PERSON_SEARCH_SIZE;
            window.repo.searchWithParams("@type:Person AND email:\"" + this.createLinkPersonEmail + "\"", paramObj, null,
                this.searchPersonsForNewAccountSuccess, this.searchPersonsForNewAccountFailure);
        },
        createNewAccount: function() {
            this.setAllNewAccountValidationsChecksToValid();
            this.validateNewAccountData();
            if (!this.createAccountOrLinkPersonDataInvalid) this.verifyEmailAddressForNewAccountAndGo();
        },
        validateLinkPersonData() {
            if (!this.createLinkPersonName || this.createLinkPersonName.trim().equals('')) {
                this.createAccountOrLinkPersonDataInvalid = true;
                this.createLinkPersonNameInvalid = true;
            }
            if (!this.createLinkPersonEmail || this.createLinkPersonEmail.trim().equals('') || !this.isValidEmail(this.createLinkPersonEmail)) {
                this.createAccountOrLinkPersonDataInvalid = true;
                this.createLinkPersonEmailInvalid = true;
            }
        },
        searchPersonsForLinkPersonSuccess(ecRemoteLda) {
            this.loginBusy = true;
            let emailExists = false;
            for (let ecrld of ecRemoteLda) {
                let ep = new EcPerson();
                ep.copyFrom(ecrld);
                if (this.createLinkPersonEmail.equalsIgnoreCase(ep.email)) {
                    emailExists = true;
                    break;
                }
            }
            if (emailExists) {
                this.createAccountOrLinkPersonDataInvalid = true;
                this.createLinkPersonEmailExists = true;
                this.loginBusy = false;
            } else {
                this.createPersonObjectToLinkToIdentity();
            }
        },
        verifyEmailAddressForLinkPersonAndGo() {
            appLog('Validating link person email...');
            let paramObj = {};
            paramObj.size = this.PERSON_SEARCH_SIZE;
            window.repo.searchWithParams("@type:Person AND email:\"" + this.createLinkPersonEmail + "\"", paramObj, null,
                this.searchPersonsForLinkPersonSuccess, this.searchPersonsForNewAccountFailure);
        },
        linkPerson: function() {
            this.setAllNewAccountValidationsChecksToValid();
            this.validateLinkPersonData();
            if (!this.createAccountOrLinkPersonDataInvalid) this.verifyEmailAddressForLinkPersonAndGo();
        },
        areLoginParamsValid: function() {
            if (this.username == null || this.username.length === 0 || this.password == null || this.password.length === 0) {
                this.loginParamsInvalid = true;
                return false;
            }
            return true;
        },
        findLinkedPersonPersonSearchSuccess(ecRemoteLda) {
            appLog("Linked person person search success: ");
            appLog(ecRemoteLda);
            this.identityToLinkToPerson = EcIdentityManager.default.ids[0];
            let matchingPersonRecordFound = false;
            for (let ecrld of ecRemoteLda) {
                let ep = new EcPerson();
                ep.copyFrom(ecrld);
                if (ep.getGuid().equals(this.identityToLinkToPerson.ppk.toPk().fingerprint())) {
                    matchingPersonRecordFound = true;
                    this.$store.commit('user/loggedOnPerson', ep);
                    this.linkedPerson = ep;
                    appLog('Matching person record found: ');
                    appLog(ep);
                    EcIdentityManager.default.saveContacts();
                    EcIdentityManager.default.saveIdentities();
                }
            }
            if (matchingPersonRecordFound) this.addGroupIdentities();
            else {
                appLog('Matching person record NOT found');
                this.showCreateLinkedPerson();
            }
        },
        findLinkedPersonPersonSearchFailure(msg) {
            this.loginBusy = false;
            appLog('Linked person person search failure: ' + msg);
        },
        findLinkedPersonForIdentity: function() {
            appLog("Finding linked person for identity...");
            let identFingerprint = EcIdentityManager.default.ids[0].ppk.toPk().fingerprint();
            let paramObj = {};
            paramObj.size = this.PERSON_SEARCH_SIZE;
            window.repo.searchWithParams("@type:Person AND @id:\"" + identFingerprint + "\"", paramObj, null,
                this.findLinkedPersonPersonSearchSuccess, this.findLinkedPersonPersonSearchFailure);
        },
        handleAttemptLoginFetchIdentitySuccess: function(obj) {
            if (!EcIdentityManager.default.ids || EcIdentityManager.default.ids.length <= 0) {
                this.handleAttemptLoginFetchIdentityFailure('Login credentials valid but no identity could be found.');
            } else this.findLinkedPersonForIdentity();
        },
        handleAttemptLoginFetchIdentityFailure: function(failMsg) {
            this.identityFailMsg = failMsg;
            this.identityFetchFailed = true;
            this.loginBusy = false;
        },
        handleAttemptLoginConfigureFromServerSuccess: async function(obj) {
            appLog("Fetching identity...");
            this.ecRemoteIdentMgr.startLogin(this.username, this.password); // Creates the hashes for storage and retrieval of keys.
            await this.ecRemoteIdentMgr.fetch(null, this.handleAttemptLoginFetchIdentityFailure).then((ident) => {
                EcIdentityManager.default = ident;
                this.handleAttemptLoginFetchIdentitySuccess();
            }); // Retrieves the identities and encryption keys from the server.
        },
        handleAttemptLoginConfigureFromServerFail: function(failMsg) {
            this.configFailMsg = failMsg;
            this.configRetrieveFailed = true;
            this.loginBusy = false;
        },
        attemptCassLogin: function() {
            this.loginParamsInvalid = false;
            this.identityFetchFailed = false;
            this.configRetrieveFailed = false;
            if (this.areLoginParamsValid()) {
                appLog("Attempting CaSS login....");
                this.loginBusy = true;
                EcIdentityManager.default.clearContacts();
                EcIdentityManager.default.clearIdentities();
                this.ecRemoteIdentMgr = new EcRemoteIdentityManager();
                this.ecRemoteIdentMgr.server = window.repo.selectedServer;
                this.ecRemoteIdentMgr.configureFromServer(this.handleAttemptLoginConfigureFromServerSuccess, this.handleAttemptLoginConfigureFromServerFail); // Retrieves username and password salts from the serve
            }
        }
    },
    computed: {
        legacyLoginEnabled: function() {
            return this.$store.getters['featuresEnabled/legacyLoginEnabled'];
        },
        apiLoginEnabled: function() {
            return this.$store.getters['featuresEnabled/apiLoginEnabled'];
        }
    },
    mounted() {
        this.setDataToBaseLogin(true);
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