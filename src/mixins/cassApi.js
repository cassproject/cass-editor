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
        redirectToExternalLoginPage: function() {
            appLog("Redirecting to external login...");
            window.location = this.cassApiLocation + this.USER_LOGIN_SERVICE + "?redirectUrl=" + encodeURIComponent(window.location);
        },
        // OLD Logout
        // redirectToExternalLogout: function() {
        //     appLog("Redirecting to external logout...");
        //     window.location = this.cassApiLocation + this.USER_LOGOUT_SERVICE + "?redirectUrl=" + encodeURIComponent(this.LOGOUT_REDIRECT_URL + this.addQueryParams());
        // },
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
            EcIdentityManager.clearContacts();
            EcIdentityManager.clearIdentities();
            let clearPerson = {};
            this.$store.commit('user/loggedOnPerson', clearPerson);
            if (this.apiLoginEnabled) this.performExternalLogout();
            else this.goToLogin();
        },
        addQueryParams: function() {
            let paramObj = this.$store.getters['editor/queryParams'];
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
                            toAdd += (key + "=" + val[i]);
                        }
                    } else {
                        toAdd += (key + "=" + val);
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
            return this.$store.getters['environment/cassApiLocation'];
        },
        apiLoginEnabled: function() {
            return this.$store.getters['featuresEnabled/apiLoginEnabled'];
        }
    }
};