export const cassApi = {
    name: 'cassApi',
    data: () => ({
        USER_PROFILE_SERVCE: "user/profile",
        USER_LOGIN_SERVICE: "login",
        USER_LOGOUT_SERVICE: "logout",
        LOGOUT_REDIRECT_URL: window.location.origin + "/cass-editor/#/login"
    }),
    methods: {
        parseCredentialsFromProfileResponse(profileResponse) {
            let pro = JSON.parse(profileResponse.responseText);
            let credentials = {};
            credentials.username = pro["preferred_username"];
            credentials.password = pro["cass_password"];
            credentials.email = pro["email"];
            if (pro["name"]) {
                credentials.name = pro["name"];
            } else if (pro["given_name"] && pro["family_name"]) {
                credentials.name = pro["given_name"] + " " + pro["family_name"];
            }
            return credentials;
        },
        getUserProfile(responseCallback) {
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", (x) => responseCallback(x.currentTarget));
            oReq.withCredentials = true;
            let serviceEndpoint = this.cassApiLocation + this.USER_PROFILE_SERVCE;
            oReq.open("GET", serviceEndpoint);
            oReq.send();
        },
        redirectToExternalLoginPage() {
            appLog("Redirecting to external login...");
            let loginEndpoint = this.cassApiLocation + this.USER_LOGIN_SERVICE + "?redirectUrl=" + encodeURIComponent(window.location);
            window.location = loginEndpoint;
        },
        redirectToExternalLogout() {
            appLog("Redirecting to external logout...");
            let logoutEndpoint = this.cassApiLocation + this.USER_LOGOUT_SERVICE + "?redirectUrl=" + encodeURIComponent(this.LOGOUT_REDIRECT_URL);
            window.location = logoutEndpoint;
        }
    },
    computed: {
        cassApiLocation: function() {
            return this.$store.getters['environment/cassApiLocation'];
        }
    }
};