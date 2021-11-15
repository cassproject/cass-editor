//**************************************************************************************************
// CASS UI Framework Explorer iFrame Communication Functions
//**************************************************************************************************

//**************************************************************************************************
// Constants

const ALIGN_MESSAGE = "gotoAlign";
const WAITING_MESSAGE = "waiting";

const FWK_TO_FWK_ALIGN_TYPE = "fwkToFwk";

const INIT_IDENTITY_ACTION = "initIdentity";

//**************************************************************************************************
// Action Executions
//**************************************************************************************************

function performInitIdentityAction(data) {
    setupIdentity(data.serverParm,data.nameParm,data.pemParm);
    loadPageContents();
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

function sendAlignFrameworksMessage(framework1Id,framework2Id) {
    var message = {
        message: ALIGN_MESSAGE,
        alignType: FWK_TO_FWK_ALIGN_TYPE,
        framework1Id: framework1Id,
        framework2Id: framework2Id
    };
    debugMessage("Sending '" + ALIGN_MESSAGE + "' message:" + JSON.stringify(message));
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
        showPageAsBusy("Initializing Framework Explorer...");
        sendWaitingMessage();
    }
    else {
        showPageError("Not sure what to do...");
    }
});