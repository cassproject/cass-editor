//**************************************************************************************************
// CASS UI Gap Analysis iFrame Communication Functions
//**************************************************************************************************

//**************************************************************************************************
// Constants

const WAITING_MESSAGE = "waiting";

const INIT_IDENTITY_ACTION = "initIdentity";
const INIT_PRF_EXP_MESSAGE = "initProfileExplorer";

//**************************************************************************************************
// Action Executions
//**************************************************************************************************

function performInitIdentityAction(data) {
    setupIdentity(data.serverParm,data.nameParm,data.pemParm);
    identifyEcPersons(
        function() {
            findProfileGroups(loadPageContents);
        }
    );
    //loadPageContents();
}

//**************************************************************************************************
// Message Sender
//**************************************************************************************************

function sendWaitingMessage() {
    var message = {
        message: WAITING_MESSAGE
    };
    debugMessage("Sending '" + WAITING_MESSAGE + "' message:" + JSON.stringify(message));
    parent.postMessage(message, queryParams.origin);
}

function sendInitProfileExplorerMessage(profilePem) {
    var message = {
        message: INIT_PRF_EXP_MESSAGE,
        profilePem: profilePem
    };
    debugMessage("Sending '" + INIT_PRF_EXP_MESSAGE + "' message:" + JSON.stringify(message));
    parent.postMessage(message, queryParams.origin);
}

//**************************************************************************************************
// Message Listener
//**************************************************************************************************

function performAction(action,data) {
    debugMessage("iframe-comms: performAction: " + action);
    switch (action) {
        case INIT_IDENTITY_ACTION:
            performInitIdentityAction(data);
            break;
        default:
            showPageError("Unknown message action: " + action);
            break;
    }
}

var messageListener = function (evt) {
    var data = evt.data;
    if (data != null && data != "") {
        data = JSON.parse(data);
        if (data != null && data != "") {
            if (data.action == null || data.action == "") {
                showPageError("Message data missing the 'action' key: " + data);
            }
            else performAction(data.action,data);
        }
        else {
            showPageError("Could not parse iframe message data as JSON: " + data);
        }
    }
    else {
        showPageError("Could not interpret iframe message data: " + data);
    }
}

if (window.addEventListener) {
    window.addEventListener("message", messageListener, false);
    debugMessage("addEventListener: messageListener");
}
else {
    window.attachEvent("onmessage", messageListener);
    debugMessage("attachEvent: messageListener");
}

//**************************************************************************************************
// Initial Page Load
//**************************************************************************************************
$(document).ready(function () {
    if (queryParams.frameworkId && queryParams.frameworkId != "") {
        frameworkToOpen = queryParams.frameworkId;
    }
    else frameworkToOpen = null;
    if (queryParams.user == "wait") {
        debugMessage("Received user='wait' parameter...");
        showPageAsBusy("Initializing Gap Analysis...");
        sendWaitingMessage();
    }
    else {
        showPageError("Not sure what to do...");
    }
});