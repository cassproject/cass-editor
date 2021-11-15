const PPK_PEM = "";
const DISPLAY_NAME = "";

const INIT_IDENTITY_ACTION = "initIdentity";
const REPO_SERVER = "https://dev.api.cassproject.org/api/";

function sendIdentityToVlrc(origin) {
    console.log('Sending "' + this.INIT_IDENTITY_ACTION + '" message to plugin');
    let messageObj = {
        action: INIT_IDENTITY_ACTION,
        serverParm: REPO_SERVER,
        nameParm: DISPLAY_NAME,
        pemParm: PPK_PEM
    };
    // console.log(messageObj);
    document.getElementsByTagName('iframe')[0].contentWindow.postMessage(JSON.stringify(messageObj), origin);
}

function handleVlrcMessage(msg) {
    if (msg && msg.data && msg.data.message) {
        console.log("!!!handleVlrcMessage!!!");
        console.log(msg);
        console.log(msg.data.message);
        console.log(msg.data.message === 'waiting');
        if (msg.data.message === 'waiting') {
            console.log('Received waiting message!...sending identity...');
            sendIdentityToVlrc(msg.origin);
        }
    }
}

window.addEventListener('message', handleVlrcMessage);