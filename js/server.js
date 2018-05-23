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

if (queryParams.server != null) {
    if (queryParams.server.endsWith != null && queryParams.server.endsWith("/") == false)
        queryParams.server = queryParams.server + "/";
    servers = [queryParams.server];
}

var newObjectEndpoint = null;
if (queryParams.newObjectEndpoint != null)
    newObjectEndpoint = queryParams.newObjectEndpoint;

var webSocketBackoff = 100;
var webSocketConnection = false;

openWebSocket = function (r) {
    var connection;
    // Instead of /ws/custom, will be /ws in next release.
    if (queryParams.webSocketOverride == null || queryParams.webSocketOverride === undefined)
        connection = new WebSocket(r.selectedServer.replace(/http/, "ws").replace(/api\//, "ws/custom"));
    else
        connection = new WebSocket(queryParams.webSocketOverride);

    connection.onopen = function () {
        console.log("WebSocket open.");
        webSocketConnection = true;
    };

    connection.onerror = function (error) {
        console.log(error);
    };

    //Re-establish connection on close.
    connection.onclose = function (evt) {
        console.log(evt);
        webSocketBackoff *= 2;
        webSocketConnection = false;
        setTimeout(function () {
            openWebSocket(r);
        }, webSocketBackoff);
    };

    connection.onmessage = function (e) {
        console.log('Server: ' + e.data);
        if (framework == null) return;
        delete EcRepository.cache[e.data];
        EcRepository.get(e.data, function (wut) {
            delete EcRepository.cache[wut.id];
            delete EcRepository.cache[wut.shortId()];

            if (!$("#editFrameworkSection").is(":visible"))
                return;

            if (new ConceptScheme().isA(wut.getFullType()))
                if (framework != null)
                    if (framework.shortId() == wut.shortId()) {
                        framework = new ConceptScheme();
                        framework.copyFrom(wut);
                        populateFramework();
                        spitEvent("frameworkChanged", framework.shortId());
                    }

            if (new EcFramework().isA(wut.getFullType()))
                if (framework != null)
                    if (framework.shortId() == wut.shortId()) {
                        framework = new EcFramework();
                        framework.copyFrom(wut);
                        populateFramework();
                        renderSidebar(true);
                        spitEvent("frameworkChanged", framework.shortId());
                    }

            if (new Concept().isA(wut.getFullType())) {
                if (framework != null)
                    if ($("[id=\"" + wut.shortId() + "\"]").length > 0) {
                        var com = new EcConcept();
                        com.copyFrom(wut);
                        $("#tree [id='" + com.shortId() + "']").remove();
                        if (com["skos:broader"] != null)
                            for (var i = 0; i < com["skos:broader"].length; i++) {

                                window.fetches++;
                                refreshCompetency(com).appendTo($("[id=\"" + com["skos:broader"][i] + "\"]>ul"));
                            }
                        if (com["skos:topConceptOf"] != null)
                            refreshCompetency(com);
                        if (selectedCompetency != null) {
                            if (selectedCompetency.shortId() == wut.shortId()) {
                                selectedCompetency = com;
                                refreshSidebar();
                            }
                            spitEvent("competencyChanged", selectedCompetency.shortId());
                        }
                    }
            }
            if (new EcCompetency().isA(wut.getFullType())) {
                if (framework != null)
                    if (framework.competency != null)
                        if (EcArray.has(framework.competency, wut.shortId()) || EcArray.has(framework.competency, wut.shortId()) || JSON.stringify(framework.competency).indexOf(EcCrypto.md5(wut.id)) != -1) {
                            var com = new EcCompetency();
                            com.copyFrom(wut);
                            populateFramework();
                            if (selectedCompetency != null) {
                                if (selectedCompetency.shortId() == wut.shortId()) {
                                    selectedCompetency = com;
                                    refreshSidebar();
                                }
                                spitEvent("competencyChanged", selectedCompetency.shortId());
                            }
                        }
            }

            if (new EcLevel().isA(wut.getFullType())) {
                if (framework != null)
                    if (framework.level != null)
                        if (EcArray.has(framework.level, wut.shortId()) || EcArray.has(framework.level, wut.shortId())) {
                            var com = new EcLevel();
                            com.copyFrom(wut);
                            window.fetches++;
                            refreshCompetency(com);
                            if (selectedCompetency != null) {
                                if (selectedCompetency.shortId() == wut.shortId()) {
                                    selectedCompetency = com;
                                    refreshSidebar();
                                }
                                spitEvent("competencyChanged", selectedCompetency.shortId());
                            }
                        }
            }
        }, error);
    };

}

function cappend(event) {
    if (event.data.message == "selected") {
        console.log("I got " + event.data.selected.length + " selected items from the iframe");
        console.log(event.data.selected);
        if (JSON.stringify(event.data.selected).indexOf("Concept") != -1) {
            attachUrlProperties(event.data.selected);
            $("#selectConceptSection").hide();
            $("#editFrameworkSection").show();
        } else if ($("#selectCompetencySection:visible").length > 0) {
            var targets = event.data.selected;
            var thing = selectedCompetency;
            for (var i = 0; i < targets.length; i++) {
                var r = new EcAlignment();
                if (newObjectEndpoint != null)
                    r.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
                else
                    r.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
                r["schema:dateCreated"] = new Date().toISOString();
                r.target = EcRemoteLinkedData.trimVersionFromUrl(targets[i]);
                r.source = thing.shortId();
                if (r.target == r.source)
                    return;
                r.relationType = $("#selectCompetencySection").attr("relation");
                if (r.relationType == "broadens") {
                    var dosedo = r.target;
                    r.target = r.source;
                    r.source = dosedo;
                    r.relationType = "narrows";
                }
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                framework.addRelation(r.id);
                repo.saveTo(r, function () {}, error);
            }
            repo.saveTo(framework, afterSaveRender, error);
            $("#selectCompetencySection").hide();
            $("#editFrameworkSection").show();
        } else if (event.data.selected.length > 0) {
            showCopyOrLinkDialog(function (copy) {
                if (copy === true) {
                    copyCompetencies(event.data.selected);
                } else {
                    appendCompetencies(event.data.selected, true);
                }
                hideCopyOrLinkDialog();
                $("#selectConceptSection,#findCompetencySection").hide();
                $("#editFrameworkSection").show();
            });
        } else if (event.data.selected.length <= 0) {
            alert("No items have been selected.");
        }
    } else if (event.data.message == "back") {
        gotoPage('#editFrameworkSection');
    } else if (event.data.message == "highlighted") {
        var elem = $('[id="' + event.data.highlightTarget + '"]');
        if (elem.length && elem.is(':visible')) {
            $('[id="' + event.data.highlightTarget + '"]').click();
            $('#tree').animate({
                scrollTop: elem.offset().top
            }, 1000);
        } else {
            console.log("Highlight failed");
            console.log(event.data);
        }
    }
}

for (var i = 0; i < servers.length; i++) {
    var r = new EcRepository();
    r.selectedServer = servers[i];
    r.autoDetectRepository();
    servers[i] = r;
    repo = r;

    try {
        window.addEventListener('message', cappend, false);
    } catch (e) {
        console.error(e);
    }

    openWebSocket(r);
}

var iframeInit = false;
initIframe = function (comp) {
    var iframeRoot = queryParams.editorRoot;
    if (iframeRoot == null || iframeRoot === undefined)
        iframeRoot = "";
    if (comp == true) {
        var iframeCompetencyPath = iframeRoot + "index.html?select=Align with...&view=true&back=true&frameworkId=" + framework.shortId() + "&iframeRoot=" + iframeRoot + "&origin=" + window.location.origin + (queryParams.server == null ? "" : "&server=" + queryParams.server + (queryParams.newObjectEndpoint == null ? "" : "&newObjectEndpoint=" + queryParams.newObjectEndpoint));
        if (queryParams.webSocketOverride != null && queryParams.webSocketOverride !== undefined)
            iframeCompetencyPath += "&webSocketOverride=" + queryParams.webSocketOverride;
        if (queryParams.view != "true")
            $("#selectCompetencyIframe").attr("src", iframeCompetencyPath);
    }

    if (iframeInit == true) return;
    iframeInit = true;

    var iframePath = iframeRoot + "index.html?select=Add&selectRelations=true&view=true&iframeRoot=" + iframeRoot + "&origin=" + window.location.origin + (queryParams.server == null ? "" : "&server=" + queryParams.server + (queryParams.newObjectEndpoint == null ? "" : "&newObjectEndpoint=" + queryParams.newObjectEndpoint));
    if (queryParams.webSocketOverride != null && queryParams.webSocketOverride !== undefined)
        iframePath += "&webSocketOverride=" + queryParams.webSocketOverride;
    if (queryParams.view != "true")
        $("#findCompetencyIframe").attr("src", iframePath);

    var iframeConceptPath = iframeRoot + "index.html?select=Add&concepts=true&iframeRoot=" + iframeRoot + "&ceasnDataFields=" + queryParams.ceasnDataFields + "&origin=" + window.location.origin + (queryParams.server == null ? "" : "&server=" + queryParams.server) + (queryParams.newObjectEndpoint == null ? "" : "&newObjectEndpoint=" + queryParams.newObjectEndpoint);
    if (queryParams.webSocketOverride != null && queryParams.webSocketOverride !== undefined)
        iframeConceptPath += "&webSocketOverride=" + queryParams.webSocketOverride;
    if (queryParams.view != "true")
        $("#selectConceptIframe").attr("src", iframeConceptPath);
}

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
            if (data != null && data != "" && !EcObject.isObject(data))
                data = JSON.parse(data);
            if (data.action == "identity") {
                identity = new EcIdentity();
                identity.ppk = EcPpk.fromPem(data.identity);
                identity.displayName = "You";
                EcIdentityManager.addIdentity(identity);
                callback();
                var message = {
                    action: "response",
                    message: "identityOk"
                };
                console.log(message);
                parent.postMessage(message, queryParams.origin);
            }
        };
        if (window.addEventListener) {
            window.addEventListener("message", fun, false);
        } else {
            window.attachEvent("onmessage", fun);
        }
        var message = {
            message: "waiting"
        };
        console.log(message);
        parent.postMessage(message, queryParams.origin);
    } else
        callback();
}

var frameworkTemplate = null;
var competencyTemplate = null;
var messageListener = function (evt) {
    var data = evt.data;
    if (data != null && data != "" && !EcObject.isObject(data))
        data = JSON.parse(data);
    if (data != null && data != "") {
        if (data.action == "template") {
            EcFramework.template = data.framework;
            EcCompetency.template = data.competency;
            var message = {
                action: "response",
                message: "templateOk"
            };
            console.log(message);
            parent.postMessage(message, queryParams.origin);
        } else if (data.action == "export") {
            var v = data.schema;
            var link;
            var fid;
            var guid;
            if (selectedCompetency != null) {
                if (EcRepository.shouldTryUrl(selectedCompetency.id) == false) {
                    link = repo.selectedServer + "data/" + EcCrypto.md5(selectedCompetency.id);
                    fid = repo.selectedServer + "data/" + EcCrypto.md5(framework.id);
                    guid = EcCrypto.md5(selectedCompetency.id);
                } else {
                    link = selectedCompetency.id;
                    fid = framework.id;
                    guid = selectedCompetency.getGuid();
                }
            } else {
                if (EcRepository.shouldTryUrl(framework.id) == false) {
                    link = repo.selectedServer + "data/" + EcCrypto.md5(framework.id);
                    fid = repo.selectedServer + "data/" + EcCrypto.md5(framework.id);
                    guid = EcCrypto.md5(framework.id);
                } else {
                    link = framework.id;
                    fid = framework.id;
                    guid = framework.getGuid();
                }
            }
            if (v == "asn") {
                $.ajax({
                    url: fid.replace("/data/", "/asn/"),
                    success: function (data) {
                        parent.postMessage({
                            action: "response",
                            message: "export",
                            schema: "asn",
                            format: "rdf+json",
                            data: data
                        }, queryParams.origin);
                    }
                });
            } else if (v == "cass") {
                $.ajax({
                    url: link,
                    success: function (data) {
                        parent.postMessage({
                            action: "response",
                            message: "export",
                            schema: "cass",
                            format: "application/ld+json",
                            data: data
                        }, queryParams.origin);
                    }
                });
            } else if (v == "cassn4") {
                $.ajax({
                    url: link,
                    headers: {
                        "Accept": "text/n4"
                    },
                    success: function (data) {
                        parent.postMessage({
                            action: "response",
                            message: "export",
                            schema: "cass",
                            format: "text/n4",
                            data: data
                        }, queryParams.origin);
                    }
                });
            } else if (v == "cassrdfjson") {
                $.ajax({
                    url: link,
                    headers: {
                        "Accept": "application/rdf+json"
                    },
                    success: function (data) {
                        parent.postMessage({
                            action: "response",
                            message: "export",
                            schema: "cass",
                            format: "application/rdf+json",
                            data: data
                        }, queryParams.origin);
                    }
                });
            } else if (v == "cassrdfxml") {
                $.ajax({
                    url: link,
                    headers: {
                        "Accept": "application/rdf+xml"
                    },
                    success: function (data) {
                        if (conceptMode)
                            parent.postMessage({
                                action: "response",
                                message: "export",
                                schema: "cass",
                                format: "application/rdf+xml",
                                data: data
                            }, queryParams.origin);
                    }
                });
            } else if (v == "cassturtle") {
                $.ajax({
                    url: link,
                    headers: {
                        "Accept": "text/turtle"
                    },
                    success: function (data) {
                        parent.postMessage({
                            action: "response",
                            message: "export",
                            schema: "cass",
                            format: "text/turtle",
                            data: data
                        }, queryParams.origin);
                    }
                });
            } else if (v == "ceasn" || v == "ctdlasn") {
                $.ajax({
                    url: fid.replace("/data/", "/ceasn/"),
                    success: function (data) {
                        parent.postMessage({
                            action: "response",
                            message: "export",
                            schema: v,
                            format: "application/ld+json",
                            data: data
                        }, queryParams.origin);
                    }
                });
            } else if (v == "case") {
                if (selectedCompetency == null) {
                    $.ajax({
                        url: repo.selectedServer + "ims/case/v1p0/CFDocuments/" + guid,
                        success: function (data) {
                            parent.postMessage({
                                action: "response",
                                message: "export",
                                schema: "case",
                                format: "application/json",
                                data: data
                            }, queryParams.origin);
                        }
                    });
                } else {
                    $.ajax({
                        url: repo.selectedServer + "ims/case/v1p0/CFItems/" + guid,
                        success: function (data) {
                            parent.postMessage({
                                action: "response",
                                message: "export",
                                schema: "case",
                                format: "json-ld",
                                data: data
                            }, queryParams.origin);
                        }
                    });
                }
            }
        }
    }
};
if (window.addEventListener) {
    window.addEventListener("message", messageListener, false);
} else {
    window.attachEvent("onmessage", messageListener);
}
