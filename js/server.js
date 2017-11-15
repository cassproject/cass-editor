/*
 Copyright 2017 Credential Engine and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var repo;

EcRepository.caching = true;
EcRepository.cachingSearch = false;

var frameworkId = "";

var servers = ["https://dev.cassproject.org/api/"];
var repo;

if (queryParams.server != null)
    servers = [queryParams.server];

var webSocketBackoff = 100;

openWebSocket = function (r) {
    // Instead of /ws/custom, will be /ws in next release.
    var connection = new WebSocket(r.selectedServer.replace(/http/, "ws").replace(/api\//, "ws/custom"));

    connection.onopen = function () {
        console.log("WebSocket open.");
    };

    connection.onerror = function (error) {
        console.log(error);
    };

    //Re-establish connection on close.
    connection.onclose = function (evt) {
        console.log(evt);
        webSocketBackoff *= 2;
        setTimeout(function () {
            openWebSocket(r);
        }, webSocketBackoff);
    };

    connection.onmessage = function (e) {
        console.log('Server: ' + e.data);
        EcRepository.get(e.data, function (wut) {
            delete EcRepository.cache[wut.id];
            delete EcRepository.cache[wut.shortId()];
            if (new EcFramework().isA(wut.getFullType()))
                if (framework != null)
                    if (framework.id == wut.id) {
                        framework = new EcFramework();
                        framework.copyFrom(wut);
                        populateFramework();
                    }

            if (new EcCompetency().isA(wut.getFullType())) {
                var com = new EcCompetency();
                com.copyFrom(wut);
                refreshCompetency(com);
                if (selectedCompetency != null)
                    if (selectedCompetency.id == wut.id) {
                        selectedCompetency = com;
                        refreshSidebar();
                    }
            }
            if (new EcLevel().isA(wut.getFullType())) {
                var com = new EcLevel();
                com.copyFrom(wut);
                refreshCompetency(com);
                if (selectedCompetency != null)
                    if (selectedCompetency.id == wut.id) {
                        selectedCompetency = com;
                        refreshSidebar();
                    }
            }

        }, error);
    };

}

function cappend(event) {
    if (event.data.message == "selected") {
        console.log("I got " + event.data.selected.length + " selected items from the iframe");
        console.log(event.data.selected);
        showCopyOrLinkDialog(function(copy) {
            if (copy === true) {
                copyCompetencies(event.data.selected);
            } else {
                appendCompetencies(event.data.selected);
            }
            hideCopyOrLinkDialog();
            backPage();
        });
        

    } else if (event.data.message == "back")
        backPage();
}

for (var i = 0; i < servers.length; i++) {
    var r = new EcRepository();
    r.selectedServer = servers[i];
    r.autoDetectRepository();
    servers[i] = r;
    repo = r;

    window.addEventListener('message', cappend, false);

    openWebSocket(r);
}
$("iframe").attr("src", "index.html?select=Add&view=true&origin=" + window.location.origin + "&server=" +
    r.selectedServer);

loadIdentity = function (callback) {
    if (queryParams.user == "self") {
        EcIdentityManager.readIdentities();
        EcIdentityManager.readContacts();
        if (EcIdentityManager.ids.length == 0) {
            loading("Generating identity...");
            EcPpk.generateKeyAsync(
                function (p1) {
                    identity = new EcIdentity();
                    identity.ppk = p1;
                    identity.displayName = "You";
                    EcIdentityManager.onIdentityChanged = EcIdentityManager.saveIdentities;
                    EcIdentityManager.addIdentity(identity);
                    callback();
                }
            );
        } else
            callback();
    } else if (queryParams.user == "wait") {
        var fun = function (evt) {
            var data = evt.data;
            if (data != null)
                data = JSON.parse(data);
            if (data.action == "identity") {
                identity = new EcIdentity();
                identity.ppk = EcPpk.fromPem(data.identity);
                identity.displayName = "You";
                EcIdentityManager.addIdentity(identity);
                callback();
            }
        };
        if (window.addEventListener) {
            window.addEventListener("message", fun, false);
        } else {
            window.attachEvent("onmessage", fun);
        }
    } else
        callback();
}
