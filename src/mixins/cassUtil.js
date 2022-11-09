export const cassUtil = {
    name: 'cassUtil',
    data: () => ({
    }),
    methods: {
        getOrganizationByEcPk(ecPk, successCallback, failureCallback) {
            let ecPkPem = ecPk.toPem();
            let paramObj = {};
            paramObj.size = 10000;
            EcOrganization.search(window.repo, '',
                async function(ecoa) {
                    for (let o of ecoa) {
                        try {
                            let groupPpkSet = await o.getOrgKeys();
                            for (let gPpk of groupPpkSet) {
                                if (gPpk && gPpk.toPk().toPem().equals(ecPkPem)) {
                                    successCallback(o);
                                    return;
                                }
                            }
                        } catch (e) {
                            // TODO Problem with EcOrganization update and creating encrypted value when only a reader...
                            // Anticipated workaround....login as group owner and save it.
                            // console.error("TODO...fix this...needs FRITZ input!!!!: " + e.toString());
                            failureCallback(e.toString());
                        }
                    }
                    successCallback(null);
                },
                function(err) {
                    failureCallback(err);
                },
                paramObj);
        },
        async getOrganizationEcPk(orgObj) {
            try {
                return (await orgObj.getCurrentOrgKey()).toPk();
                // let orgEvPpk = new EcEncryptedValue();
                // orgEvPpk.copyFrom(orgObj[this.GROUP_PPK_KEY]);
                // let orgPpk = EcPpk.fromPem(orgEvPpk.decryptIntoString());
                // return orgPpk.toPk();
            } catch (e) {
                // TODO Problem with EcOrganization update and creating encrypted value when only a reader...
                // Anticipated workaround....login as group owner and save it.
                return null;
            }
        },
        getPersonEcPk(personObj) {
            let personFingerprint = this.generateProbablePersonFingerprintFromShortId(personObj.shortId());
            if (personObj.owner) {
                for (let pkPem of personObj.owner) {
                    let ecPk = EcPk.fromPem(pkPem);
                    if (personFingerprint.equals(ecPk.fingerprint())) return ecPk;
                }
            }
            return null;
        },
        addAllOwnersFromObjectToObject(fromObj, toObj) {
            if (fromObj && fromObj.owner) {
                for (let pkPem of fromObj.owner) {
                    let ecPk = EcPk.fromPem(pkPem);
                    toObj.addOwner(ecPk);
                }
            }
        },
        setDefaultBrowserConfigId(configId) {
            localStorage.setItem("cassAuthoringToolDefaultBrowserConfigId", configId);
        },
        removeDefaultBrowserConfig() {
            localStorage.removeItem("cassAuthoringToolDefaultBrowserConfigId");
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
            if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
                for (let i = 0; i < EcIdentityManager.default.ids.length; i++) {
                    obj.addOwner(EcIdentityManager.default.ids[i].ppk.toPk());
                }
            }
        },
        isObjectOwnerless(obj) {
            if (!obj.owner || obj.owner.length === 0) return true;
            else return false;
        },
        doesAnyIdentityOwnObject(obj) {
            if (this.isAdmin()) return true;
            if (obj.canEditAny == null) return true;
            return obj.canEditAny(EcIdentityManager.default.getMyPks());
        },
        isAdmin: function() {
            if (EcIdentityManager.default.ids.length > 0 && window.repo.adminKeys != null && window.repo.adminKeys.length > 0) {
                if (window.repo.adminKeys[0] === EcIdentityManager.default.ids[0].ppk.toPk().toPem()) { return true; }
            }
            return false;
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
            if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
                for (let i = 0; i < EcIdentityManager.default.ids.length; i++) {
                    if (EcIdentityManager.default.ids[i].ppk.toPk().fingerprint().equals(personFingerprint)) return true;
                }
            }
            return false;
        },
        isPersonalIdentityAnObjectOwner(obj) {
            if (this.isAdmin()) return true;
            if (!obj.owner || obj.owner.length === 0) return false;
            let personalIdentPkPem = this.getPersonalIdentityPk().toPem();
            return obj.owner.includes(personalIdentPkPem);
        },
        getPersonalIdentityPk() {
            // assuming that the first identity is the user's personal identity
            if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
                return EcIdentityManager.default.ids[0].ppk.toPk();
            } else return null;
        },
        buildEcAlignmentsFromRemoteLinkedData(ecrlda) {
            let ecaa = [];
            for (let ecrld of ecrlda) {
                let eca = new EcAlignment();
                eca.copyFrom(ecrld);
                ecaa.push(eca);
            }
            return ecaa;
        }
    },
    computed: {
        amLoggedIn: function() {
            if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) return true;
            else return false;
        }
    }
};

