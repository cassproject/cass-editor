//**************************************************************************************************
// CASS UI Gap Analysis Session Functions
//**************************************************************************************************


//**************************************************************************************************
// Constants

const MAX_PRS_SEARCH_SIZE = 10000;
const MAX_ORG_SEARCH_SIZE = 10000;

const OVERWRITE_PERSON_NAME_WITH_CONTACT_NAME = true;

//**************************************************************************************************
// Variables

var repo;
var selectedServer;
var loggedInIdentityName;
var loggedInPk;
var loggedInPkPem;
var loggedInPpkPem;

var profileGroupList;
var profileGroupMap;
var profileGroupMapByIDableString;

var viewableProfileList;
var viewableProfileByPkPemMap;
var viewableProfileByPersonIdMap;

//**************************************************************************************************
// Data Structures
//**************************************************************************************************

function viewableProfObj(name,pk,person) {
    this.displayName = name;
    this.pk = pk;
    this.pkPem = pk.toPem();
    this.personId = person.shortId();
    this.person = person;
}

//**************************************************************************************************
// Organizations/Profile Groups
//**************************************************************************************************

function addDataForGroup(go) {
    profileGroupMapByIDableString[buildIDableString(go.shortId())] = go;
    profileGroupList.push(go);
    profileGroupMap[go.shortId()] = go;
}

function buildProfileGroupData(ecoa) {
    profileGroupMapByIDableString = {};
    profileGroupList = [];
    profileGroupMap = {};
    for (var i=0;i<ecoa.length;i++) {
        if (ecoa[i].hasOwner(loggedInPk)) {
            addDataForGroup(ecoa[i]);
        }
    }
    profileGroupList.sort(function(a, b) {return a.name.localeCompare(b.name);})
}

function handleFetchOrganizationsSuccess(ecoa,callback) {
    debugMessage("handleFetchOrganizationsSuccess: " + ecoa.length);
    buildProfileGroupData(ecoa);
    callback();
}

function handleFetchOrganizationsFailure(err) {
    debugMessage("handleFetchOrganizationsFailure: " + err);
    showPageError("Could not fetch EcOrganization list: " + err);
}

function findProfileGroups(callback) {
    debugMessage("Finding repo Organzation objects...");
    EcOrganization.search(repo,"",
        function(ecoa){
            handleFetchOrganizationsSuccess(ecoa,callback);
        },
        handleFetchOrganizationsFailure,
        {'size':MAX_ORG_SEARCH_SIZE}
    );
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
    for (var i=0;i<ecpa.length;i++) {
        var po = ecpa[i];
        var poPk = getPersonObjectPk(po);
        if (poPk && !addedProfiles.includes(po.getFingerprint())) {
            var poName = buildPersonObjectName(po);
            if (poName && poName != "") {
                var vpo = new viewableProfObj(poName,poPk,po);
                viewableProfileList.push(vpo);
                viewableProfileByPkPemMap[vpo.pkPem] = vpo;
                viewableProfileByPersonIdMap[po.shortId()] = vpo;
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
    debugMessage("Identity set up.");
}