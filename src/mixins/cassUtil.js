export const cassUtil = {
    name: 'cassUtil',
    data() {
    },
    methods: {
        addAllIdentityPksAsOwners(obj) {
            // let isEcrld = (obj instanceOf EcRemoteLinkedData);
            if (EcIdentityManager && EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
                for (let i = 0; i < EcIdentityManager.ids.length; i++) {
                    obj.addOwner(EcIdentityManager.ids[i].ppk.toPk());
                }
            }
        }
    }
};
