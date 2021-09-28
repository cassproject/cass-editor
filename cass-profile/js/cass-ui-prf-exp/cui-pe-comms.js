//**************************************************************************************************
// CASS UI Profile Explorer iFrame Communication Functions
//**************************************************************************************************

//**************************************************************************************************
// Constants

const WAITING_MESSAGE = "waiting";
const INIT_FWK_EXP_MESSAGE = "initFrameworkExplorer";

const INIT_IDENTITY_ACTION = "initIdentity";
/* eyo */
//**************************************************************************************************
// Action Executions
//**************************************************************************************************

function performInitIdentityAction(data) {
    setupIdentity(data.serverParm,data.nameParm,data.pemParm);
    identifyEcPersons(
        function() {
            loadPageContents();
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

function sendInitFrameworkExplorerMessage(frameworkId) {
    var message = {
        message: INIT_FWK_EXP_MESSAGE,
        frameworkId: frameworkId
    };
    debugMessage("Sending '" + INIT_FWK_EXP_MESSAGE + "' message:" + JSON.stringify(message));
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
    if (queryParams.profilePem && queryParams.profilePem != "") {
        profileToOpen = queryParams.profilePem;
    }
    else profileToOpen = null;
    if (queryParams.user == "wait") {
        debugMessage("Received user='wait' parameter...");
        showPageAsBusy("Initializing Profile Explorer...");
        sendWaitingMessage();
    }
    else {
        showPageError("Not sure what to do...");
    }
});