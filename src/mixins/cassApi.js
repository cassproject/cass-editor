export const cassApi = {
    name: 'cassApi',
    data: () => ({
        USER_PROFILE_SERVCE: "user/profile"
    }),
    methods: {
        getUserProfile(responseCallback) {
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", (x) => responseCallback(x.currentTarget));
            let serviceEndpoint = this.cassApiLocation + this.USER_PROFILE_SERVCE;
            oReq.open("GET", serviceEndpoint);
            oReq.send();
        }
    },
    computed: {
        cassApiLocation: function() {
            return this.$store.getters['environment/cassApiLocation'];
        }
    }
};