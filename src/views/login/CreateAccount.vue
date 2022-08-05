<template>
    <div
        id="createAccount"
        class="section is-large">
        <!-- busy modal-->
        <div
            class="modal"
            :class="[{'is-active': createAccountBusy}]">
            <div class="modal-background" />
            <div class="modal-content has-text-centered">
                <span class="icon is-large has-text-center has-text-link">
                    <i class="fas fa-2x fa-spinner is-info fa-pulse" />
                </span>
            </div>
        </div>
        <!-- create account content-->
        <div
            v-if="!createAccountBusy && !userCreated && !createUserServerError"
            class="modal is-active">
            <div class="modal-card">
                <header class="modal-card-head has-text-centered has-background-primary">
                    <h3 class="modal-card-title is-size-2 has-text-centered has-text-white">
                        Create CaSS Account
                    </h3>
                </header>
                <section class="modal-card-body">
                    <!-- inputs -->
                    <div class="section">
                        <div class="field">
                            <div class="control">
                                <label class="label">first name</label>
                                <input
                                    class="input"
                                    type="text "
                                    v-model="inputFirstName">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <label class="label">last name</label>
                                <input
                                    class="input"
                                    type="text "
                                    v-model="inputLastName">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <label class="label">email</label>
                                <input
                                    class="input"
                                    type="text "
                                    v-model="inputEmail">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <label class="label">username</label>
                                <input
                                    type="text"
                                    class="input"
                                    v-model="inputUserName">
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="control is-expanded">
                                <label class="label">password</label>
                                <input
                                    type="password"
                                    class="input"
                                    v-model="inputPassword">
                            </div>
                            <div class="control is-expanded">
                                <label class="label">confirm password</label>
                                <input
                                    class="input"
                                    type="password"
                                    v-model="inputPasswordConfirm">
                            </div>
                        </div>
                    </div>
                    <!-- error messages -->
                    <div
                        class="field has-text-danger"
                        v-if="createAccountInvalid">
                        <div class="label has-text-danger">
                            Please correct the following errors:
                        </div>
                        <div
                            class="is-size-6"
                            v-if="usernameInvalid">
                            Username is required
                        </div>
                        <div
                            class="is-size-6"
                            v-if="passwordInvalid">
                            Password is required
                        </div>
                        <div
                            class="is-size-6"
                            v-if="passwordMismatch">
                            Passwords do not match
                        </div>
                        <div
                            class="is-size-6"
                            v-if="firstNameInvalid">
                            First Name is required
                        </div>
                        <div
                            class="is-size-6"
                            v-if="lastNameInvalid">
                            Last Name is required
                        </div>
                        <div
                            class="is-size-6"
                            v-if="emailInvalid">
                            Valid email is required
                        </div>
                        <div
                            class="is-size-6"
                            v-if="emailUnavailable">
                            That email is unavailable
                        </div>
                        <div
                            class="is-size-6"
                            v-if="usernameUnavailable">
                            That username is unavailable
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot has-background-white">
                    <div class="buttons is-spaced">
                        <div
                            class="button is-dark is-outlined"
                            @click="goToLogin">
                            <span class="icon">
                                <i class="fa fa-times" />
                            </span><span>cancel</span>
                        </div>
                        <div
                            class="button is-dark is-primary"
                            @click="attemptAccountCreate">
                            <span class="icon">
                                <i class="fa fa-sign-in-alt" />
                            </span><span>create</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <!-- create account notification-->
        <div
            v-if="!createAccountBusy && userCreated"
            class="modal is-active">
            <div class="modal-card">
                <header class="modal-card-head has-text-centered has-background-success">
                    <h3 class="modal-card-title is-size-2 has-text-centered has-text-white">
                        Account Created
                    </h3>
                </header>
                <section class="modal-card-body">
                    <p>Your account has been successfully created.  Please return to the login screen.</p>
                </section>
                <footer class="modal-card-foot has-background-white">
                    <div class="buttons is-spaced">
                        <div
                            class="button is-dark is-outlined"
                            @click="goToLogin">
                            <span class="icon">
                                <i class="fa fa-times" />
                            </span><span>ok</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <!-- create account server error-->
        <div
            v-if="!createAccountBusy && createUserServerError"
            class="modal is-active">
            <div class="modal-card">
                <header class="modal-card-head has-text-centered has-background-danger">
                    <h3 class="modal-card-title is-size-2 has-text-centered has-text-white">
                        Could Not Create Account
                    </h3>
                </header>
                <section class="modal-card-body">
                    <p>There was an error when attempting to create your account.  Please contact the system administrator.</p>
                </section>
                <footer class="modal-card-foot has-background-white">
                    <div class="buttons is-spaced">
                        <div
                            class="button is-dark is-outlined"
                            @click="goToLogin">
                            <span class="icon">
                                <i class="fa fa-times" />
                            </span><span>ok</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>

import {cassApi} from '../../mixins/cassApi';

export default {
    name: 'CreateAccount',
    mixins: [cassApi],
    data: () => ({
        PERSON_SEARCH_SIZE: 10000,
        createAccountBusy: false,
        createAccountInvalid: false,
        inputFirstName: '',
        inputLastName: '',
        inputUserName: '',
        inputEmail: '',
        inputPassword: '',
        inputPasswordConfirm: '',
        usernameInvalid: false,
        usernameUnavailable: false,
        passwordInvalid: false,
        passwordMismatch: false,
        firstNameInvalid: false,
        lastNameInvalid: false,
        emailInvalid: false,
        emailUnavailable: false,
        ecRemoteIdentMgr: null,
        userCreated: false,
        createUserServerError: false
    }),
    methods: {
        setAllNewAccountValidationsChecksToValid() {
            this.createAccountInvalid = false;
            this.usernameInvalid = false;
            this.usernameUnavailable = false;
            this.passwordInvalid = false;
            this.passwordMismatch = false;
            this.firstNameInvalid = false;
            this.lastNameInvalid = false;
            this.emailInvalid = false;
            this.emailUnavailable = false;
        },
        isValidEmail(email) {
            let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/igm;
            if (re.test(email)) return true;
            return false;
        },
        validateNewAccountData() {
            if (!this.inputUserName || this.inputUserName.trim().equals('')) {
                this.createAccountInvalid = true;
                this.usernameInvalid = true;
            }
            if (!this.inputPassword || this.inputPassword.trim().equals('') ||
                !this.inputPasswordConfirm || this.inputPasswordConfirm.trim().equals('')) {
                this.createAccountInvalid = true;
                this.passwordInvalid = true;
            } else if (!this.inputPassword.equals(this.inputPasswordConfirm)) {
                this.createAccountInvalid = true;
                this.passwordMismatch = true;
            }
            if (!this.inputFirstName || this.inputFirstName.trim().equals('')) {
                this.createAccountInvalid = true;
                this.firstNameInvalid = true;
            }
            if (!this.inputLastName || this.inputLastName.trim().equals('')) {
                this.createAccountInvalid = true;
                this.lastNameInvalid = true;
            }
            if (!this.inputEmail || this.inputEmail.trim().equals('') || !this.isValidEmail(this.inputEmail)) {
                this.createAccountInvalid = true;
                this.emailInvalid = true;
            }
        },
        checkCreateUserRequestStatus: function(createUserResponse) {
            if (createUserResponse.status === 409) {
                this.createAccountInvalid = true;
                this.usernameUnavailable = true;
                this.createUserServerError = false;
                this.userCreated = false;
            } else if (createUserResponse.status === 503) {
                this.createUserServerError = true;
                this.userCreated = false;
            } else if (createUserResponse.status === 200) {
                this.createUserServerError = false;
                this.userCreated = true;
            } else {
                appLog('Unexpected create user response status: ' + createUserResponse.status);
            }
            this.createAccountBusy = false;
        },
        buildUserInfoObject: function() {
            let userInfo = {};
            userInfo.firstName = this.inputFirstName;
            userInfo.lastName = this.inputLastName;
            userInfo.username = this.inputUserName;
            userInfo.password = this.inputPassword;
            userInfo.email = this.inputEmail;
            return userInfo;
        },
        performAccountCreation: function() {
            this.performCreateUser(this.buildUserInfoObject(), this.checkCreateUserRequestStatus);
        },
        handleCheckUsernameFetchIdentitySuccess: function(obj) {
            this.createAccountInvalid = true;
            this.usernameUnavailable = true;
            this.createAccountBusy = false;
            EcIdentityManager.default.clearIdentities();
            EcIdentityManager.default.clearContacts();
        },
        handleCheckUsernameFetchIdentityFailure: function(failMsg) {
            if (failMsg && String(failMsg).toLowerCase().trim().equals('user does not exist.')) {
                this.performAccountCreation();
            } else {
                this.createAccountInvalid = true;
                this.usernameUnavailable = true;
                this.createAccountBusy = false;
                EcIdentityManager.default.clearIdentities();
                EcIdentityManager.default.clearContacts();
            }
        },
        handleCheckUsernameConfigureFromServerSuccess: function(obj) {
            appLog("Fetching identity for username check...");
            // Creates the hashes for storage and retrieval of keys.
            this.ecRemoteIdentMgr.startLogin(this.inputUserName, this.inputPassword);
            // Retrieves the identities and encryption keys from the server.
            this.ecRemoteIdentMgr.fetch(this.handleCheckUsernameFetchIdentitySuccess, this.handleCheckUsernameFetchIdentityFailure);
        },
        handleCheckUsernameConfigureFromServerFail: function(failMsg) {
            this.createAccountBusy = false;
            appLog('New account configure from server for username check failure: ' + failMsg);
        },
        checkForExistingUsername: function() {
            appLog("Check if new account username already exists");
            this.ecRemoteIdentMgr = new EcRemoteIdentityManager();
            this.ecRemoteIdentMgr.server = window.repo.selectedServer;
            // Retrieves username and password salts from the serve
            this.ecRemoteIdentMgr.configureFromServer(this.handleCheckUsernameConfigureFromServerSuccess, this.handleCheckUsernameConfigureFromServerFail);
        },
        searchPersonsForNewAccountSuccess(ecRemoteLda) {
            appLog("New account person search success: ");
            appLog(ecRemoteLda);
            let emailExists = false;
            for (let ecrld of ecRemoteLda) {
                let ep = new EcPerson();
                ep.copyFrom(ecrld);
                if (this.inputEmail.equalsIgnoreCase(ep.email)) {
                    emailExists = true;
                    break;
                }
            }
            if (emailExists) {
                this.createAccountInvalid = true;
                this.emailUnavailable = true;
                this.createAccountBusy = false;
            } else this.checkForExistingUsername();
        },
        searchPersonsForNewAccountFailure(msg) {
            // Search fails if the index doesn't exist yet.
            this.checkForExistingUsername();
        },
        verifyEmailAddressForNewAccountAndGo() {
            this.createAccountBusy = true;
            let paramObj = {};
            paramObj.size = this.PERSON_SEARCH_SIZE;
            window.repo.searchWithParams("@type:Person AND email:\"" + this.inputEmail + "\"", paramObj, null,
                this.searchPersonsForNewAccountSuccess, this.searchPersonsForNewAccountFailure);
        },
        attemptAccountCreate() {
            this.setAllNewAccountValidationsChecksToValid();
            this.validateNewAccountData();
            if (!this.createAccountInvalid) this.verifyEmailAddressForNewAccountAndGo();
        },
        goToLogin() {
            this.createAccountBusy = false;
            this.$router.push({path: '/login'});
        }
    },
    mounted() {
    }
};
</script>

<style lang="scss" scoped>
    @import '@/scss/variables.scss';
    #createAccount {
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