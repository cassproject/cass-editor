export const cassUtil = {
    name: 'cassUtil',
    data() {
    },
    methods: {
        getPersonEcPk(personObj) {
            let personFingerprint = this.generateProbablePersonFingerprintFromShortId(personObj.shortId());
            for (let pkPem of personObj.owner) {
                let ecPk = EcPk.fromPem(pkPem);
                if (personFingerprint.equals(ecPk.fingerprint())) return ecPk;
            }
            return null;
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
        },
        generateProbablePersonFingerprintFromShortId(personShortId) {
            return personShortId.substring(personShortId.lastIndexOf("/") + 1);
        },
        isPersonIdAnObjectOwner(personShortId, obj) {
            if (!obj.owner || obj.owner.length === 0) return false;
            let personFingerprint = this.generateProbablePersonFingerprintFromShortId(personShortId);
            for (let ownerPkPem of obj.owner) {
                let ownerFingerprint = EcPk.fromPem(ownerPkPem).fingerprint();
                if (ownerFingerprint.equals(personFingerprint)) return true;
            }
            return false;
        },
        isPersonIdAnObjectReader(personShortId, obj) {
            if (!obj.reader || obj.reader.length === 0) return false;
            let personFingerprint = this.generateProbablePersonFingerprintFromShortId(personShortId);
            for (let readerPkPem of obj.reader) {
                let readerFingerprint = EcPk.fromPem(readerPkPem).fingerprint();
                if (readerFingerprint.equals(personFingerprint)) return true;
            }
            // return obj.hasReader(EcPk.fromPem(pkPem));
            return false;
        },
        areAnyIdentitiesThisPerson(personObj) {
            let personFingerprint = personObj.getFingerprint();
            if (EcIdentityManager && EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
                for (let i = 0; i < EcIdentityManager.ids.length; i++) {
                    if (EcIdentityManager.ids[i].ppk.toPk().fingerprint().equals(personFingerprint)) return true;
                }
            }
            return false;
        }
    },
    computed: {
        amLoggedIn: function() {
            if (EcIdentityManager && EcIdentityManager.ids && EcIdentityManager.ids.length > 0) return true;
            else return false;
        }
    }
};

