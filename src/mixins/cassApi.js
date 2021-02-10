export const cassApi = {
    name: 'cassApi',
    data: () => ({
        USER_PROFILE_SERVCE: "user/profile",
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
        getUserProfile: function(responseCallback) {
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", (x) => responseCallback(x.currentTarget));
            oReq.withCredentials = true;
            let serviceEndpoint = this.cassApiLocation + this.USER_PROFILE_SERVCE;
            oReq.open("GET", serviceEndpoint);
            oReq.send();
        },
        redirectToExternalLoginPage: function() {
            appLog("Redirecting to external login...");
            window.location = this.cassApiLocation + this.USER_LOGIN_SERVICE + "?redirectUrl=" + encodeURIComponent(window.location);
        },
        redirectToExternalLogout: function() {
            appLog("Redirecting to external logout...");
            window.location = this.cassApiLocation + this.USER_LOGOUT_SERVICE + "?redirectUrl=" + encodeURIComponent(this.LOGOUT_REDIRECT_URL);
        },
        performApplicationLogout: function() {
            // TODO implement and tie to SideNav.vue
            appLog("Performing application logout...");
            EcIdentityManager.clearContacts();
            EcIdentityManager.clearIdentities();
            let clearPerson = {};
            this.$store.commit('user/loggedOnPerson', clearPerson);
            this.redirectToExternalLogout();
        }
    },
    computed: {
        cassApiLocation: function() {
            return this.$store.getters['environment/cassApiLocation'];
        }
    }
};