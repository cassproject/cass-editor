//**************************************************************************************************
// CASS UI Profile Explorer Session Functions
//**************************************************************************************************

const CASS_TRUST_NETWORK_LS_KEY = "cassTrustNetwork";

const MAX_PRS_SEARCH_SIZE = 10000;

//**************************************************************************************************
// Variables

var repo;
var selectedServer;
var loggedInIdentityName;
var loggedInPk;
var loggedInPkPem;
var loggedInPpkPem;

var viewableProfileList;
var viewableProfileByPkPemMap;
var viewableProfileByNameMap;
var viewableProfileByPersonIdMap;

//**************************************************************************************************
// Data Structures
//**************************************************************************************************

function viewableProfObj(name,pk) {
    this.displayName = name;
    this.pk = pk;
    this.pkPem = pk.toPem();
}

//**************************************************************************************************
// Trust Network
//**************************************************************************************************

function fetchTrustNetworkFromLocalStorage() {
    var tnoString = localStorage.getItem(CASS_TRUST_NETWORK_LS_KEY);
    var nt = {};
    if (!tnoString || tnoString.trim() == "") return nt;
    try {
        var tno = JSON.parse(tnoString);
        return tno;
    }
    catch (e) {
        return nt;
    }
}

function saveTrustNetworkToLocalStorage(tno) {
    if (tno) {
        try {
            localStorage.setItem(CASS_TRUST_NETWORK_LS_KEY,JSON.stringify(tno));
        }
        catch (e) {
            localStorage.removeItem(CASS_TRUST_NETWORK_LS_KEY);
        }
    }
}

//**************************************************************************************************
// Persons
//**************************************************************************************************
function getPersonObjectPk(po) {
    var poPk = null;
    var poFp = po.getFingerprint();
    if (po.owner && po.owner.length > 0) {
        for (var i=0;i<po.owner.length;i++) {
            var testPk = EcPk.fromPem(po.owner[i]);
            if (testPk.fingerprint() == poFp) {
                poPk = testPk;
                break;
            }
        }
    }
    return poPk;
}

function buildPersonObjectName(po) {
    var name = getStringVal(po.getName());
    if (!name || name.trim() == "") {
        name = (po.givenName ? po.givenName + " " : "");
        name += (po.familyName ? po.familyName : "");
    }
    return name.trim();
}

function buildViewableProfileData(ecpa) {
    var addedProfiles = [];
    viewableProfileList = [];
    viewableProfileByPkPemMap = {};
    viewableProfileByPersonIdMap = {};
    viewableProfileByNameMap = {};
    for (var i=0;i<ecpa.length;i++) {
        var po = ecpa[i];
        var poPk = getPersonObjectPk(po);
        if (poPk  && !addedProfiles.includes(po.getFingerprint())) {
            var poName = buildPersonObjectName(po);
            if (poName && poName != "") {
                var vpo = new viewableProfObj(poName, poPk);
                viewableProfileList.push(vpo);
                viewableProfileByPkPemMap[vpo.pkPem] = vpo;
                viewableProfileByPersonIdMap[po.shortId()] = vpo;
                if (!viewableProfileByNameMap[poName]) viewableProfileByNameMap[poName] = [];
                viewableProfileByNameMap[poName].push(vpo);
                addedProfiles.push(po.getFingerprint());
            }
        }
    }
    viewableProfileList.sort(function (a, b) {return a.displayName.localeCompare(b.displayName);});
}

function handleFetchPersonsSuccess(ecpa,callback) {
    debugMessage("handleFetchPersonsSuccess: " + ecpa.length);
    buildViewableProfileData(ecpa);
    callback();
}

function handleFetchPersonsFailure(err) {
    debugMessage("handleFetchPersonsFailure: " + err);
    showPageError("Could not fetch EcPerson list: " + err);
}

function identifyEcPersons(callback) {
    debugMessage("Finding repo Person objects...");
    EcPerson.search(repo,"",
        function(ecpa){
            handleFetchPersonsSuccess(ecpa,callback);
        },
        handleFetchPersonsFailure,
        {'size':MAX_PRS_SEARCH_SIZE}
    );
}

//**************************************************************************************************
// Repository Initialization
//**************************************************************************************************
function initRepo() {
    debugMessage("Initializing repository...");
    repo = new EcRepository();
    repo.selectedServer = selectedServer;
    debugMessage("Repository initialized.");
}

//**************************************************************************************************
// Identity Initialization
//**************************************************************************************************
function initSessionIdentity() {
    debugMessage("Initializing identity...");
    var eci = new EcIdentity();
    eci.source = selectedServer;
    eci.displayName = loggedInIdentityName;
    var eciPpk = EcPpk.fromPem(loggedInPpkPem);
    eci.ppk = eciPpk;
    EcIdentityManager.ids.push(eci);
    loggedInPk = EcIdentityManager.ids[0].ppk.toPk();
    loggedInPkPem = loggedInPk.toPem();
    debugMessage("Identity intialized:");
    debugMessage("Display Name: " + EcIdentityManager.ids[0].displayName);
    debugMessage("Public Key: " + loggedInPkPem);
}

function setupIdentity(serverParm,nameParm,pemParm) {
    debugMessage("Setting up identity...");
    selectedServer = serverParm;
    initRepo();
    loggedInIdentityName = nameParm;
    loggedInPpkPem = pemParm;
    initSessionIdentity();
    //buildContactsMaps();
    debugMessage("Identity set up.");
}