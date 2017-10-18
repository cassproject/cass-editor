/*
 Copyright 2017 Credential Engine and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var repo;

EcRepository.caching = true;

var frameworkId = "";

var servers = ["https://dev.cassproject.org/api/"];
var repo;

if (queryParams.server != null)
    servers = [queryParams.server];

for (var i = 0; i < servers.length; i++) {
    var r = new EcRepository();
    r.selectedServer = servers[i];
    r.autoDetectRepository();
    servers[i] = r;
    repo = r;

    // Instead of /ws/custom, will be /ws in next release.
    var connection = new WebSocket(r.selectedServer.replace(/http/, "ws").replace(/api\//, "ws/custom"));
    // When the connection is open, send some data to the server
    connection.onopen = function () {
        console.log("WebSocket open.");
    };

    // Log errors
    connection.onerror = function (error) {
        console.log(error);
    };

    // Log messages from the server
    connection.onmessage = function (e) {
        console.log('Server: ' + e.data);
        EcRepository.get(e.data, function (wut) {
            delete EcRepository.cache[wut.id];
            delete EcRepository.cache[wut.shortId()];
            if (new EcFramework().isA(wut.getFullType()))
                if (framework.id == wut.id) {
                    framework = new EcFramework();
                    framework.copyFrom(wut);
                    populateFramework();
                }

            if (new EcCompetency().isA(wut.getFullType())) {
                var com = new EcCompetency();
                com.copyFrom(wut);
                refreshCompetency(com);
                if (selectedCompetency.id == wut.id) {
                    selectedCompetency = com;
                    refreshSidebar();
                }
            }

        }, error);
    };

}
