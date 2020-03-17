export const cassUtil = {
    name: 'cassUtil',
    data() {
    },
    methods: {
        amLoggedIn() {
            if (EcIdentityManager && EcIdentityManager.ids && EcIdentityManager.ids.length > 0) return true;
            return false;
        },
        setDefaultBrowserConfigId(configId) {
            localStorage.setItem("cassAuthoringToolDefaultBrowserConfigId", configId);
        },
        getDefaultBrowserConfigId() {
            return localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId");
        },
        getBooleanValue(val) {
            if (typeof val === 'boolean') return val;
            else if (typeof val === 'string') {
                if (val.equalsIgnoreCase('true')) return true;
                else return false;
            } else return false;
        },
        addAllIdentityPksAsOwners(obj) {
            // let isEcrld = (obj instanceOf EcRemoteLinkedData);
            if (EcIdentityManager && EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
                for (let i = 0; i < EcIdentityManager.ids.length; i++) {
                    obj.addOwner(EcIdentityManager.ids[i].ppk.toPk());
                    obj.addOwner(EcIdentityManager.ids[i].ppk.toPk());
                }
            }
        },
        isObjectOwnerless(obj) {
            if (!obj.owner || obj.owner.length === 0) return true;
            else return false;
        },
        doesAnyIdentityOwnObject(obj) {
            if (!EcIdentityManager || !EcIdentityManager.ids || EcIdentityManager.ids.length <= 0) return false;
            else {
                for (let i = 0; i < EcIdentityManager.ids.length; i++) {
                    if (obj.hasOwner(EcIdentityManager.ids[i].ppk.toPk())) return true;
                }
                return false;
            }
        }
    }
};
