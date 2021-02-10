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
            v-if="!createAccountBusy"
            class="modal is-active">
            <div class="modal-card">
                <header
                    class="modal-card-head has-text-centered has-background-primary"
                    v-if="!createAccountBusy">
                    <h3 class="modal-card-title is-size-2 has-text-centered has-text-white">
                        Create CaSS Account
                    </h3>
                </header>
                <section class="modal-card-body">
                    TODO
                    <div class="columns is-mobile is-multiline">
                        <div class="column is-12">
                            <div class="has-text-centered">
                                <a @click="goToLogin">Return to Login</a>
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
    name: 'CreateAccount',
    mixins: [cassApi],
    data: () => ({
        createAccountBusy: false
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
        goToLogin() {
            this.loginBusy = false;
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