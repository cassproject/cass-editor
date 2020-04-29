<template>
    <div
        id="login"
        class="container is-fluid is-marginless is-paddingless has-background-white">
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': loginBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-3x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <!-- login content-->
        <div class="columns is-vcentered is-centered">
            <div class="column is-4">
                <div
                    class="card"
                    v-if="!loginBusy">
                    <header
                        v-if="amJustLoggingIn"
                        class="card-header has-background-primary">
                        <h3 class="card-header-title has-text-white">
                            CAT Login
                        </h3>
                    </header>
                    <header
                        v-if="amCreatingAccount"
                        class="card-header has-background-primary">
                        <h3 class="card-header-title has-text-white">
                            CAT Signup
                        </h3>
                    </header>
                    <div
                        class="card-content"
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
                                    v-on:keyup.enter="attemptCassLogin">
                            </div>
                        </div>
                        <div v-if="identityFetchFailed">
                            <p><b>Login failed: {{ identityFailMsg }}</b></p>
                        </div>
                        <div v-if="configRetrieveFailed">
                            <p><b>Could not retrieve configuration from selected server: {{ configFailMsg }}</b></p>
                        </div>
                        <div v-if="loginParamsInvalid">
                            <p><b>Login failed: Invalid Username/Password</b></p>
                        </div>
                        <div class="buttons">
                            <div
                                class="button is-light"
                                @click="showCreateAccount">
                                create account
                            </div>
                            <div
                                class="button is-primary"
                                @click="attemptCassLogin">
                                login
                            </div>
                        </div>
                    </div>
                    <div
                        class="card-content"
                        v-if="amCreatingAccount || amCreatingLinkedPerson">
                        <h4 v-if="amCreatingLinkedPerson">
                            Link User Information
                        </h4>
                        <p v-if="amCreatingLinkedPerson">
                            No matching user record could be found that matched your login information. Please provide the following:
                        </p>
                        <div
                            class="field"
                            v-if="amCreatingAccount">
                            <div class="control">
                                <label class="label">username</label>
                                <input
                                    type="text"
                                    class="input"
                                    v-model="createAccountUsername"
                                    placeholder="username">
                            </div>
                        </div>
                        <div
                            class="field"
                            v-if="amCreatingAccount">
                            <div class="control">
                                <label class="label">password</label>
                                <input
                                    type="password"
                                    class="input"
                                    v-model="createAccountPassword"
                                    placeholder="password">
                            </div>
                        </div>
                        <div
                            class="field"
                            v-if="amCreatingAccount">
                            <div class="control">
                                <label class="label">password</label>
                                <input
                                    class="input"
                                    type="password"
                                    v-model="createAccountPasswordRetype"
                                    placeholder="retype password">
                            </div>
                        </div>
                        <div
                            class="field"
                            v-if="amCreatingAccount || amCreatingLinkedPerson">
                            <div class="control">
                                <label class="label">name</label>
                                <input
                                    class="input"
                                    type="text"
                                    v-model="createLinkPersonName"
                                    placeholder="name">
                            </div>
                        </div>
                        <div
                            class="field"
                            v-if="amCreatingAccount || amCreatingLinkedPerson">
                            <div class="control">
                                <label class="label">email</label>
                                <input
                                    class="input"
                                    type="text"
                                    v-model="createLinkPersonEmail"
                                    placeholder="email">
                            </div>
                        </div>
                        <div
                            class="field has-text-danger"
                            v-if="createAccountOrLinkPersonDataInvalid">
                            <div class="label has-text-danger">
                                Please correct the following errors:
                            </div>
                            <div
                                class="is-size-7"
                                v-if="createAccountUsernameInvalid">
                                Username is required
                            </div>
                            <div
                                class="is-size-7"
                                v-if="createAccountPasswordInvalid">
                                Password is required
                            </div>
                            <div
                                class="is-size-7"
                                v-if="createAccountPasswordMismatch">
                                Passwords do not match
                            </div>
                            <div
                                class="is-size-7"
                                v-if="createLinkPersonNameInvalid">
                                Name is required
                            </div>
                            <div
                                class="is-size-7"
                                v-if="createLinkPersonEmailInvalid">
                                Valid email is required
                            </div>
                            <div
                                class="is-size-7"
                                v-if="createLinkPersonEmailExists">
                                That email is already in use
                            </div>
                        </div>
                        <div
                            class="field"
                            v-if="identityFetchFailed">
                            <p><b>Login failed: {{ identityFailMsg }}</b></p>
                        </div>
                        <div
                            class="field"
                            v-if="configRetrieveFailed">
                            <p><b>Could not retrieve configuration from selected server: {{ configFailMsg }}</b></p>
                        </div>
                        <div class="field">
                            <div class="buttons">
                                <div
                                    class="button is-light"
                                    v-if="amCreatingLinkedPerson || amCreatingAccount"
                                    @click="setDataToBaseLogin(true)">
                                    cancel
                                </div>
                                <div
                                    class="button is-primary"
                                    v-if="amCreatingAccount"
                                    @click="createNewAccount">
                                    create
                                </div>
                                <div
                                    class="button is-success"
                                    v-if="amCreatingLinkedPerson"
                                    @click="linkPerson">
                                    update
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        GROUP_SEARCH_SIZE: 10000,
        PERSON_SEARCH_SIZE: 10000,
        GROUP_PPK_KEY: 'https://schema.cassproject.org/0.3/ppk',
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
        identityToLinkToPerson: {},
        linkedPerson: {}
    }),
    methods: {
        goToAppHome: function() {
            this.loginBusy = false;
            this.$router.push({path: '/config'});
        },
        addGroupIdentity(group) {
            console.log("Adding group identity: " + "(" + group.shortId() + ") - " + group.getName());
            let ecevGroupPpk = new EcEncryptedValue();
            ecevGroupPpk.copyFrom(group[this.GROUP_PPK_KEY]);
            let currentGroupPpkPem = ecevGroupPpk.decryptIntoString();
            let grpIdent = new EcIdentity();
            grpIdent.displayName = group.getName();
            grpIdent.ppk = EcPpk.fromPem(currentGroupPpkPem);
            EcIdentityManager.addIdentityQuietly(grpIdent);
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
            console.log("Group search failure: " + msg);
            this.goToAppHome();
        },
        addGroupIdentities: function() {
            console.log(" Adding group identities...");
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
            if (clearIdentityManager) {
                this.ecRemoteIdentMgr = {};
                EcIdentityManager.clearContacts();
                EcIdentityManager.clearIdentities();
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
            console.log("Person created.");
            if (this.amCreatingAccount) {
                this.goToAppHome();
            } else this.addGroupIdentities();
        },
        createPersonObjectToLinkToIdentity() {
            console.log("Creating person object for identity...");
            let p = new Person();
            p.assignId(window.repo.selectedServer, this.identityToLinkToPerson.ppk.toPk().fingerprint());
            p.addOwner(this.identityToLinkToPerson.ppk.toPk());
            p.name = this.createLinkPersonName;
            p.email = this.createLinkPersonEmail;
            console.log(p);
            this.$store.commit('user/loggedOnPerson', p);
            this.linkedPerson = p;
            EcRepository.save(p, this.handleCreatePersonSuccess, this.handleAttemptLoginFetchIdentityFailure);
        },
        handleCreateAccountFetchIdentitySuccess() {
            console.log("Creating new account identity object...");
            let ident = new EcIdentity();
            ident.displayName = this.createLinkPersonName;
            ident.ppk = EcPpk.generateKey();
            EcIdentityManager.addIdentity(ident);
            this.identityToLinkToPerson = ident;
            this.ecRemoteIdentMgr.commit(this.createPersonObjectToLinkToIdentity, this.handleAttemptLoginFetchIdentityFailure);
        },
        handleCreateAccountRemoteIdentityMgrCreateSuccess() {
            console.log("Creating new account manager fetch...");
            this.ecRemoteIdentMgr.fetch(this.handleCreateAccountFetchIdentitySuccess, this.handleAttemptLoginFetchIdentityFailure);
        },
        handleCreateAccountConfigureFromServerSuccess: function(obj) {
            console.log("EcRemoteIdentityManager creating...");
            console.log("Creating new account login...");
            this.ecRemoteIdentMgr.startLogin(this.createAccountUsername, this.createAccountPassword);
            this.ecRemoteIdentMgr.create(this.handleCreateAccountRemoteIdentityMgrCreateSuccess, this.handleAttemptLoginFetchIdentityFailure);
        },
        createNewAccountIdentityAndPerson() {
            console.log("Creating new account...");
            console.log("EcRemoteIdentityManager Configuring from server...");
            this.ecRemoteIdentMgr = new EcRemoteIdentityManager();
            this.ecRemoteIdentMgr.server = window.repo.selectedServer;
            this.ecRemoteIdentMgr.configureFromServer(this.handleCreateAccountConfigureFromServerSuccess, this.handleAttemptLoginConfigureFromServerFail);
        },
        searchPersonsForNewAccountSuccess(ecRemoteLda) {
            console.log("New account person search success: ");
            console.log(ecRemoteLda);
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
            } else this.createNewAccountIdentityAndPerson();
        },
        searchPersonsForNewAccountFailure(msg) {
            this.loginBusy = false;
            console.log('New account person search failure: ' + msg);
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
            console.log('Validating link person email...');
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
            console.log("Linked person person search success: ");
            console.log(ecRemoteLda);
            this.identityToLinkToPerson = EcIdentityManager.ids[0];
            let matchingPersonRecordFound = false;
            for (let ecrld of ecRemoteLda) {
                let ep = new EcPerson();
                ep.copyFrom(ecrld);
                if (ep.getGuid().equals(this.identityToLinkToPerson.ppk.toPk().fingerprint())) {
                    matchingPersonRecordFound = true;
                    this.$store.commit('user/loggedOnPerson', ep);
                    this.linkedPerson = ep;
                    console.log('Matching person record found: ');
                    console.log(ep);
                }
            }
            if (matchingPersonRecordFound) this.addGroupIdentities();
            else {
                console.log('Matching person record NOT found');
                this.showCreateLinkedPerson();
            }
        },
        findLinkedPersonPersonSearchFailure() {
            this.loginBusy = false;
            console.log('Linked person person search failure: ' + msg);
        },
        findLinkedPersonForIdentity: function() {
            console.log("Finding linked person for identity...");
            let identFingerprint = EcIdentityManager.ids[0].ppk.toPk().fingerprint();
            let paramObj = {};
            paramObj.size = this.PERSON_SEARCH_SIZE;
            window.repo.searchWithParams("@type:Person AND @id:\"" + identFingerprint + "\"", paramObj, null,
                this.findLinkedPersonPersonSearchSuccess, this.findLinkedPersonPersonSearchFailure);
        },
        handleAttemptLoginFetchIdentitySuccess: function(obj) {
            if (!EcIdentityManager.ids || EcIdentityManager.ids.length <= 0) {
                this.handleAttemptLoginFetchIdentityFailure('Login credentials valid but no identity could be found.');
            } else this.findLinkedPersonForIdentity();
        },
        handleAttemptLoginFetchIdentityFailure: function(failMsg) {
            this.identityFailMsg = failMsg;
            this.identityFetchFailed = true;
            this.loginBusy = false;
        },
        handleAttemptLoginConfigureFromServerSuccess: function(obj) {
            console.log("Fetching identity...");
            this.ecRemoteIdentMgr.startLogin(this.username, this.password); // Creates the hashes for storage and retrieval of keys.
            this.ecRemoteIdentMgr.fetch(this.handleAttemptLoginFetchIdentitySuccess, this.handleAttemptLoginFetchIdentityFailure); // Retrieves the identities and encryption keys from the server.
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
                console.log("Attempting CaSS login....");
                this.loginBusy = true;
                EcIdentityManager.clearContacts();
                EcIdentityManager.clearIdentities();
                this.ecRemoteIdentMgr = new EcRemoteIdentityManager();
                this.ecRemoteIdentMgr.server = window.repo.selectedServer;
                this.ecRemoteIdentMgr.configureFromServer(this.handleAttemptLoginConfigureFromServerSuccess, this.handleAttemptLoginConfigureFromServerFail); // Retrieves username and password salts from the serve
            }
        }
    },
    mounted() {
        this.setDataToBaseLogin(true);
    }
};
</script>

<style lang="scss" scoped>
    @import './../../scss/variables.scss';
#login {
    .columns {
        height: 100%;
    }
    .container {
        height: 100vh;
    }

    .card {
        border-radius: 10px;
        .card-header {
            border-radius: 10px 10px 0px 0px;
        }
    }
}

</style>