const CEASN_FIELD_TOGGLE = "ceasnDataFields=true";
const FWK_MINE_TOGGLE = "show=mine";
const CONCEPT_MINE_TOGGLE = "conceptShow=mine";
const CONCEPTS_TOGGLE = "concepts=true";
const PRIVATE_TOGGLE = "private=true";

const EDITR_IFRAME = "#cassEditorIFrame";
const EDITR_IFRAME_SOURCE = "index.html?user=wait";

const WAITING_MESSAGE = "waiting";

const INIT_IDENTITY_ACTION = "identity";

var testUn;
var testPw;
var testSelectedServer;

var repo;
var ecIdentMgr;

var loggedInIdentityName;
var loggedInPpkPem;

function sendIdentityInitializeMessage() {
    $(EDITR_IFRAME)[0].contentWindow.postMessage(JSON.stringify({
        action: INIT_IDENTITY_ACTION,
        identity: loggedInPpkPem
    }), window.location.origin);
}

$(EDITR_IFRAME).ready(function () {
    $(window).on("message", function (event) {
        if (event.originalEvent.data.message == WAITING_MESSAGE) {
            sendIdentityInitializeMessage();
        }
    });
});

function isChecked(elem) {
    return elem.is(':checked');
}

function getEditorIframeSourceLink() {
    var ifs = EDITR_IFRAME_SOURCE;
    if (isChecked($("#edTestIncCeasn"))) ifs += "&" + CEASN_FIELD_TOGGLE;
    if (isChecked($("#edTestFwkMine"))) ifs += "&" + FWK_MINE_TOGGLE;
    if (isChecked($("#edTestCptMine"))) ifs += "&" + CONCEPT_MINE_TOGGLE;
    if (isChecked($("#edTestConcepts"))) ifs += "&" + CONCEPTS_TOGGLE;
    if (isChecked($("#edTestPrivate"))) ifs += "&" + PRIVATE_TOGGLE;
    ifs += "&origin="+ window.location.origin + "&server=" + testSelectedServer;
    console.log("Opening cass editor iFrame with: " + ifs);
    return ifs;
}

function loadEditorIframe() {
    $(EDITR_IFRAME).attr("src", getEditorIframeSourceLink());
}

function initRepo() {
    console.log("Initializing repository...");
    repo = new EcRepository();
    repo.selectedServer = testSelectedServer;
    console.log("Repository initialized.");
}

function handleFetchIdentitySuccess2(obj) {
    console.log("handleFetchIdentitySuccess: ");
    loggedInIdentityName = EcIdentityManager.ids[0].displayName.trim();
    console.log("Display Name: " + loggedInIdentityName);
    var loggedInPkPem = EcIdentityManager.ids[0].ppk.toPk().toPem();
    console.log("Public Key: " + loggedInPkPem);
    loggedInPpkPem = EcIdentityManager.ids[0].ppk.toPem();
    $("#testLoggedInName").html(loggedInIdentityName);
    $("#testLoginSpinner").hide();
    loadEditorIframe();
}

function handleFetchIdentitySuccess(obj) {
    if (EcIdentityManager.ids.length == 0) {
        console.log("Creating Identity.");
        var ident = new EcIdentity();
        ident.displayName = "You";
        ident.ppk = EcPpk.generateKey();
        EcIdentityManager.addIdentity(ident);
        console.log("Created Identity.");
        ecIdentMgr.commit(handleFetchIdentitySuccess2, handleFetchIdentityFailure);
    }
    else
        handleFetchIdentitySuccess2(obj);
}

function handleFetchIdentityFailure(failMsg) {
    console.log("handleFetchIdentityFailure: " + failMsg);
    if (failMsg.trim() == "User does not exist.") {
        ecIdentMgr.create(handleConfigureFromServerSuccess, handleFetchIdentityFailure);
    }
    else {
        alert("Identity fetch failed: " + failMsg);
        $("#testLoggedInName").html("LOGIN ERROR");
        $("#testLoginSpinner").hide();
    }
}

function handleConfigureFromServerSuccess(obj) {
    console.log("handleConfigureFromServerSuccess: ");
    console.log(obj);
    ecIdentMgr.startLogin(testUn, testPw); //Creates the hashes for storage and retrieval of keys.
    ecIdentMgr.fetch(handleFetchIdentitySuccess, handleFetchIdentityFailure); //This retrieves the identities and encryption keys from the server.
}

function handleConfigureFromServerFail(failMsg) {
    console.log("handleConfigureFromServerFail: " + failMsg);
    alert("Could not retrieve configuration from selected server: " + failMsg);
    $("#testLoggedInName").html("LOGIN ERROR");
    $("#testLoginSpinner").hide();
}

function initIdentity() {
    ecIdentMgr = new EcRemoteIdentityManager();
    ecIdentMgr.server = testSelectedServer;
    ecIdentMgr.configureFromServer(handleConfigureFromServerSuccess, handleConfigureFromServerFail);
}

function attemptCassLogin() {
    $("#testLoginSpinner").show();
    repo = null;
    ecIdentMgr = null;
    EcIdentityManager.clearContacts();
    EcIdentityManager.clearIdentities();
    initRepo();
    initIdentity();
}

function doEditorTestShellLogin() {
    testUn = $("#edTestUn").val();
    testPw = $("#edTestPw").val();
    testSelectedServer = $("#edTestServer").val();
    if (testUn && testUn.trim() != "" && testPw && testPw.trim() != "" && testSelectedServer && testSelectedServer.trim() != "") {
        attemptCassLogin();
    }
    else {
        alert("Enter username, password, and server");
        $("#testLoggedInName").html("LOGIN ERROR");
        $("#testLoginSpinner").hide();
    }
}

$(document).ready(function () {
    $("#testLoginSpinner").hide();
    //init();
});