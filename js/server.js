/*
 Copyright 2017 Credential Engine and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var repo;

EcRepository.caching = true;
EcRepository.cachingSearch = true;

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
    connection.onclose = function () {
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
    console.log("I got " + event.data.selected.length + " selected items from the iframe");
    console.log(event.data.selected);
    appendCompetencies(event.data.selected);
    backPage();
}

for (var i = 0; i < servers.length; i++) {
    var r = new EcRepository();
    r.selectedServer = servers[i];
    r.autoDetectRepository();
    servers[i] = r;
    repo = r;
    $("iframe").attr("src", "https://cassproject.github.io/cass-viewer/index.html?select=Add&origin=" + window.location.origin + "&server=" +
        r.selectedServer);

    window.addEventListener('message', cappend, false);

    openWebSocket(r);
}
