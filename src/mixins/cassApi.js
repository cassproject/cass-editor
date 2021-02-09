export const cassApi = {
    name: 'cassApi',
    data: () => ({
        USER_PROFILE_SERVCE: "user/profile",
        USER_LOGIN_SERVICE: "login",
        USER_LOGOUT_SERVICE: "logout",
        LOGOUT_REDIRECT_URL: window.location.origin + "/cass-editor/#/login"
    }),
    methods: {
        getUserProfile(responseCallback) {
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", (x) => responseCallback(x.currentTarget));
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