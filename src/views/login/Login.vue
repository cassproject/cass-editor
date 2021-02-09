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
                <section
                    class="modal-card-body"
                    v-if="amJustLoggingIn">
                    <div class="columns is-mobile is-multiline">
                        <div class="column is-6">
                            <div class="modal-card">
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
                            <div class="modal-card">
                                <div class="modal-card-body has-text-centered">
                                    <div
                                        class="button is-outlined is-dark"
                                        @click="showCreateAccount">
                                        <span class="icon">
                                            <i class="fa fa-plus" />
                                        </span><span>create account</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-12">
                            <div class="has-text-centered">
                                <a @click="goToLegacyLogin">Legacy Login</a>
                            </div>
                        </div>
                        <div class="column is-12">
                            <div class="has-text-centered">
                                <a @click="forceLogout">Force Logout (remove this at some point)</a>
                            </div>
                        </div>
                        <div class="column is-12">
                            <div class="has-text-centered">
                                <a @click="testCreateUser">Test Create</a>
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
        amJustLoggingIn: true,
        amCreatingAccount: false,
        amCreatingLinkedPerson: false
    }),
    methods: {
        testCreateUser() {
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", (x) => this.checkLoginStatus());
            oReq.withCredentials = true;
            let serviceEndpoint = this.cassApiLocation + this.USER_PROFILE_SERVCE;
            oReq.open("POST", "https://dev.rest.api.cassproject.org/user");
            oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            oReq.send(JSON.stringify({
                username: "tomTest1",
                password: "tomTest1",
                email: "someemail@email.com",
                firstName: "TomTestFirst",
                lastName: "TomTestLast"
            }));
        },
        forceLogout() {
            this.redirectToExternalLogout();
        },
        goToLegacyLogin() {
            this.loginBusy = false;
            this.$router.push({path: '/legacyLogin'});
        },
        showCreateAccount() {
            // TODO implement
        },
        attemptExternalCassLogin() {
            this.redirectToExternalLoginPage();
        },
        handleUserProfileAlreadyLoaded(profileResponse) {
            let co = this.parseCredentialsFromProfileResponse(profileResponse);
            console.log(co);
            if (co.username && co.username.trim().length > 0 && co.password && co.password.trim().length > 0) {
                // TODO left off here...do cass login
                console.log('YAY');
                this.loginBusy = false;
            } else {
                appLog("Unable to parse credentials from user profile response");
            }
        },
        checkUserProfileRequestStatus(profileResponse) {
            console.log('HELLO FROM checkUserProfileRequestStatus: ' + profileResponse.status);
            if (profileResponse.status === 401) {
                this.amJustLoggingIn = true;
                this.loginBusy = false;
            } else if (profileResponse.status === 200) {
                this.handleUserProfileAlreadyLoaded(profileResponse);
            } else {
                appLog('Unexpected response status: ' + profileResponse.status);
                this.loginBusy = false;
            }
        },
        checkLoginStatus() {
            console.log('Checking login status');
            this.loginBusy = true;
            this.getUserProfile(this.checkUserProfileRequestStatus);
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