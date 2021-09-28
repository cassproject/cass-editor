/*
 Copyright 2017 Eduworks Corporation and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var repo;

EcRepository.caching = true;

var frameworkId = "";

var servers = ["https://sandbox.cassproject.org/api/custom"];

if (queryParams.server != null)
    servers = [queryParams.server];

for (var i = 0; i < servers.length; i++) {
    var r = new EcRepository();
    r.selectedServer = servers[i];
    r.autoDetectRepository();
    servers[i] = r;
}
