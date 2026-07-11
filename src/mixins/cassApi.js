import {useUserStore} from '@/stores/user';
import {useAppStore} from '@/stores/app';
import {useEditorStore} from '@/stores/editor';
import {useEnvironmentStore} from '@/stores/environment';
import {useFeaturesEnabledStore} from '@/stores/featuresEnabled';

export const cassApi = {
    name: 'cassApi',
    data: () => ({
        USER_PROFILE_SERVICE: "user/profile",
        USER_CREATE_SERVICE: "user",
        USER_LOGIN_SERVICE: "login",
        USER_LOGOUT_SERVICE: "logout",
        LOGOUT_REDIRECT_URL: window.location.origin + "/cass-editor/#/login"
    }),
    methods: {
        parseCredentialsFromProfileResponse: function(profileResponse) {
            let pro = JSON.parse(profileResponse.responseText);
            let credentials = {};
            credentials.username = pro["preferred_username"];
            credentials.password = pro["cass_password"];
            if (pro["email"]) {
                credentials.email = pro["email"];
            } else {
                credentials.email = "n/a";
            }
            if (pro["name"]) {
                credentials.name = pro["name"];
            } else if (pro["given_name"] && pro["family_name"]) {
                credentials.name = pro["given_name"] + " " + pro["family_name"];
            } else {
                credentials.name = pro["preferred_username"];
            }
            return credentials;
        },
        performCreateUser: function(userInfo, responseCallback) {
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", (x) => responseCallback(x.currentTarget));
            oReq.withCredentials = true;
            let serviceEndpoint = this.cassApiLocation + this.USER_CREATE_SERVICE;
            oReq.open("POST", serviceEndpoint);
            oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            oReq.send(JSON.stringify({
                username: userInfo.username,
                password: userInfo.password,
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName
            }));
        },
        getUserProfile: function(responseCallback) {
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", (x) => responseCallback(x.currentTarget));
            oReq.withCredentials = true;
            let serviceEndpoint = this.cassApiLocation + this.USER_PROFILE_SERVICE;
            oReq.open("GET", serviceEndpoint);
            oReq.send();
        },
        redirectToExternalLogin: function() {
            appLog("Redirecting to external login...");
            window.location = this.repositorySsoOptions.ssoLogin + "?redirectUrl=" + encodeURIComponent(window.location);
        },
        redirectToExternalLogout: function() {
            appLog("Redirecting to external logout...");
            window.location = this.repositorySsoOptions.ssoLogout + "?redirectUrl=" + encodeURIComponent(window.location);
        },
        goToLogin: function() {
            if (this.apiLoginEnabled) {
                this.$router.push({path: '/login'});
            } else {
                this.$router.push({path: '/legacyLogin'});
            }
        },
        checkExternalLogoutStatus: function(logoutResponse) {
            if (logoutResponse.status !== 200) {
                appLog('Logout fired but returned an unexpected response code: ' + logoutResponse.status);
            }
            this.goToLogin();
        },
        performExternalLogout: function() {
            appLog("Performing external logout...");
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", (x) => this.checkExternalLogoutStatus(x.currentTarget));
            oReq.withCredentials = true;
            let serviceEndpoint = this.cassApiLocation + this.USER_LOGOUT_SERVICE;
            oReq.open("GET", serviceEndpoint);
            oReq.send();
        },
        performApplicationLogout: function() {
            appLog("Performing application logout...");
            EcIdentityManager.default.clearContacts();
            EcIdentityManager.default.clearIdentities();
            let clearPerson = {};
            const userStore = useUserStore();
            const appStore = useAppStore();
            userStore.setLoggedOnPerson(clearPerson);
            appStore.openModal({component: 'LogoutSuccess'});
        },
        performApplicationLogin: function() {
            appLog("Performing application login...");
            EcIdentityManager.default.clearContacts();
            EcIdentityManager.default.clearIdentities();
            let clearPerson = {};
            const userStore = useUserStore();
            userStore.setLoggedOnPerson(clearPerson);
            if (this.apiLoginEnabled) this.redirectToExternalLogin();
            else this.goToLogin();
        },
        addQueryParams: function() {
            const editorStore = useEditorStore();
            let paramObj = editorStore.queryParams;
            let keys = EcObject.keys(paramObj);
            if (paramObj && keys.length) {
                let toAdd = '?';
                for (let each in keys) {
                    if (each !== 0) {
                        toAdd += "&";
                    }
                    let key = keys[each];
                    let val = paramObj[key];
                    if (EcArray.isArray(val)) {
                        for (let i in val) {
                            if (i !== 0) {
                                toAdd += "&";
                            }
                            toAdd += key + "=" + val[i];
                        }
                    } else {
                        toAdd += key + "=" + val;
                    }
                }
                return toAdd;
            } else {
                return '';
            }
        }
    },
    computed: {
        cassApiLocation: function() {
            const environmentStore = useEnvironmentStore();
            return environmentStore.cassApiLocation;
        },
        repositorySsoOptions: function() {
            const userStore = useUserStore();
            return userStore.repositorySsoOptions;
        },
        apiLoginEnabled: function() {
            const featuresEnabledStore = useFeaturesEnabledStore();
            return featuresEnabledStore.apiLoginEnabled;
        }
    }
};