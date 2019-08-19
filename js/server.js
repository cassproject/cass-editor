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

			if (new ConceptScheme().isA(wut.getFullType()) || wut["encryptedType"] == "ConceptScheme")
				if (framework != null)
					if (framework.shortId() == wut.shortId()) {
						framework = new ConceptScheme();
						if (wut["encryptedType"] == "ConceptScheme") {
							var v = new EcEncryptedValue();
							v.copyFrom(wut);
							framework.copyFrom(v.decryptIntoObject());
						}
						else {
							framework.copyFrom(wut);
						}
						populateFramework();
						playSavedAnimation('frameworkNameContainer');
						spitEvent("frameworkChanged", framework.shortId());
					}

			if (new EcFramework().isA(wut.getFullType()) || wut["encryptedType"] == "Framework")
				if (framework != null)
					if (framework.shortId() == wut.shortId()) {
						framework = new EcFramework();
						if (wut["encryptedType"] == "Framework") {
							var v = new EcEncryptedValue();
							v.copyFrom(wut);
							framework.copyFrom(v.decryptIntoObject());
						}
						else {
							framework.copyFrom(wut);
						}
						renderSidebar(true);
						playSavedAnimation('frameworkNameContainer');
						populateFramework();
						spitEvent("frameworkChanged", framework.shortId());
					}

			if (new Concept().isA(wut.getFullType())  || wut["encryptedType"] == "Concept") {
				if (framework != null)
					if ($("[id=\"" + wut.shortId() + "\"]").length > 0) {
						var com = new EcConcept();
						if (wut["encryptedType"] == "Concept") {
							var v = new EcEncryptedValue();
							v.copyFrom(wut);
							com.copyFrom(v.decryptIntoObject());
						}
						else {
							com.copyFrom(wut);
						}
						populateConceptScheme();
						if (selectedCompetency != null) {
							if (selectedCompetency.shortId() == wut.shortId()) {
								selectedCompetency = com;
								if (!$('.detailSliderEdit').length)
									refreshSidebar();
							}
							spitEvent("competencyChanged", selectedCompetency.shortId());
						}
						playSavedAnimation(wut.shortId());
					}
			}
			if (new EcCompetency().isA(wut.getFullType()) || wut["encryptedType"] == "Competency") {
				if (framework != null)
					if (framework.competency != null)
						if (EcArray.has(framework.competency, wut.shortId()) || EcArray.has(framework.competency, wut.shortId()) || JSON.stringify(framework.competency).indexOf(EcCrypto.md5(wut.id)) != -1) {
							var com = new EcCompetency();
							if (wut["encryptedType"] == "Competency") {
								var v = new EcEncryptedValue();
								v.copyFrom(wut);
								com.copyFrom(v.decryptIntoObject());
							}
							else {
								com.copyFrom(wut);
							}
							populateFramework();
							if (selectedCompetency != null) {
								if (selectedCompetency.shortId() == wut.shortId()) {
									selectedCompetency = com;
									if (!$('.detailSliderEdit').length)
										refreshSidebar();
								}
								spitEvent("competencyChanged", selectedCompetency.shortId());
							}
							playSavedAnimation(wut.shortId());
						}
			}

			if (new EcLevel().isA(wut.getFullType()) || wut["encryptedType"] == "Level") {
				if (framework != null)
					if (framework.level != null)
						if (EcArray.has(framework.level, wut.shortId()) || EcArray.has(framework.level, wut.shortId())) {
							var com = new EcLevel();
							if (wut["encryptedType"] == "Level") {
								var v = new EcEncryptedValue();
								v.copyFrom(wut);
								com.copyFrom(v.decryptIntoObject());
							}
							else {
								com.copyFrom(wut);
							}
							window.fetches++;
							refreshCompetency(com);
							if (selectedCompetency != null) {
								if (selectedCompetency.shortId() == wut.shortId()) {
									selectedCompetency = com;
									refreshSidebar();
								}
								spitEvent("competencyChanged", selectedCompetency.shortId());
							}
							playSavedAnimation(wut.shortId());
						}
			}
		}, error);
	};

}

function cappend(event) {
	if (event.data.message == "selected") {
		var selectedFrameworkId = event.data.selectedFramework.id;
		var selectedIds = [];
		if (event.data.selectedFramework["ceasn:exactAlignment"]) {
			selectedFrameworkId = event.data.selectedFramework["ceasn:exactAlignment"];
		}
		for (var i = 0; i < event.data.selected.length; i++) {
			if (event.data.selected[i]["ceasn:exactAlignment"]) {
				selectedIds.push(event.data.selected[i]["ceasn:exactAlignment"]);
			}
			else if (event.data.selected[i]["@id"]) {
				selectedIds.push(event.data.selected[i]["@id"]);
			}
			else {
				selectedIds.push(event.data.selected[i]);
			}
		}
		console.log("I got " + event.data.selected.length + " selected items from the iframe");
		console.log(event.data.selected);
		if (conceptMode && event.data.type == 'Concept' && $("#selectConceptSection").attr("relation")) {
			addAlignments(selectedIds, selectedCompetency, $("#selectConceptSection").attr("relation"));
			$("#selectConceptSection").hide();
			$("#editFrameworkSection").removeClass("transparent");
			$(".sidebarToolbar:visible").removeClass("transparent");
		} else if (event.data.type == 'Concept') {
			attachUrlProperties(selectedIds);
			$("#selectConceptSection").hide();
			$("#editFrameworkSection").removeClass("transparent");
			$(".sidebarToolbar:visible").removeClass("transparent");
			if (queryParams.ceasnDataFields == "true") {
				$(".ceasnDataFields").show();
			}
		} else if ($("#selectCompetencySection:visible").length > 0) {
			var targets = selectedIds;
			var thing = selectedCompetency;
			var relationType = $("#selectCompetencySection").attr("relation");
			addAlignments(targets, thing, relationType);
			$("#selectCompetencySection").hide();
			$("#editFrameworkSection").removeClass("transparent");
			$(".sidebarToolbar:visible").removeClass("transparent");
		} else if (selectedIds.length > 0) {
			showCopyOrLinkDialog(function (copy) {
				if (copy === true) {
					copyCompetencies(selectedIds);
				} else {
					appendCompetencies(selectedIds, true);
				}
				hideCopyOrLinkDialog();
				$("#selectConceptSection,#findCompetencySection").hide();
				$("#editFrameworkSection").removeClass("transparent");
				$(".sidebarToolbar:visible").removeClass("transparent");
			});
		} else if (event.data.selected.length <= 0) {
			alert("No items have been selected.");
		}
		if ($('#editFrameworkSection').is(':visible')) {
			resizeEditFrameworkSection();
		}
	} else if (event.data.message == "back") {
		gotoPage('#editFrameworkSection');
	} else if (event.data.message == "highlighted") {
		if (!event.data.highlightTarget)
			return;
		var elem = $('[id="' + event.data.highlightTarget + '"]');
		if (elem.length && elem.is(':visible')) {
			$('[id="' + event.data.highlightTarget + '"]').click();
			$('#tree').animate({
				scrollTop: elem.offset().top
			}, 1000);
		}
	} else if (event.data.message == "highlightedCompetencies") {
		if (!event.data.competencies)
			return;
		highlightCompetencies(event.data.competencies);
	} else if (event.data.message == "select") {
		if ($('#editFrameworkSection').is(':visible') && queryParams.select != null) {
			select();
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
var iframeCompetencyPath = "";
initIframe = function (intraFramework) {
	var iframeRoot = queryParams.editorRoot;
	if (iframeRoot == null || iframeRoot === undefined)
		iframeRoot = "";

	var commonPath = "&iframeRoot=" + iframeRoot + "&origin=" + window.location.origin + (queryParams.server == null ? "" : "&server=" + queryParams.server) + (queryParams.newObjectEndpoint == null ? "" : "&newObjectEndpoint=" + queryParams.newObjectEndpoint);
	if (queryParams.ceasnDataFields != null && queryParams.ceasnDataFields != undefined)
		commonPath += "&ceasnDataFields=" + queryParams.ceasnDataFields;
	if (queryParams.webSocketOverride != null && queryParams.webSocketOverride !== undefined)
		commonPath += "&webSocketOverride=" + queryParams.webSocketOverride;
	if (queryParams.inherit != null && queryParams.inherit != undefined)
		commonPath += "&inherit=" + queryParams.inherit;
	if (queryParams.css != null && queryParams.css != undefined)
		commonPath += "&css=" + queryParams.css;
	if (queryParams.selectVerbose != null && queryParams.selectVerbose != undefined)
		commonPath += "&selectVerbose=" + queryParams.selectVerbose;
	if (queryParams.selectExport != null && queryParams.selectExport != undefined)
		commonPath += "&selectExport=" + queryParams.selectExport;
	if (queryParams.user != null && queryParams.user != undefined)
		commonPath += "&user=" + queryParams.user;


	if (intraFramework == true) {
		var iframeCompetencyPathTrue = iframeRoot + "index.html?select=Align with...&view=true&back=true&frameworkId=" + framework.shortId();
		iframeCompetencyPathTrue += commonPath;
		if (queryParams.view != "true")
			$("#selectCompetencyIframe").attr("src", iframeCompetencyPathTrue);

		iframeInit = false;
		var iframeConceptPathTrue = iframeRoot + "index.html?select=Add&concepts=true&view=true&back=true&frameworkId=" + framework.shortId();
		if (queryParams.conceptShow != null && queryParams.conceptShow != undefined)
			iframeConceptPathTrue += "&conceptShow=" + queryParams.conceptShow;
		iframeConceptPathTrue += commonPath;
		if (queryParams.view != "true")
			$("#selectConceptIframe").attr("src", iframeConceptPathTrue);
		return;
	}
	else if (intraFramework == false) {
		if (iframeCompetencyPath != "") {
			return;
		}
		iframeCompetencyPath = iframeRoot + "index.html?select=Align with...&view=true&back=true";
		iframeCompetencyPath += commonPath;
		if (queryParams.view != "true")
			$("#selectCompetencyIframe").attr("src", iframeCompetencyPath);
	}

	if (iframeInit == true) return;
	iframeInit = true;

	var iframePath = iframeRoot + "index.html?select=Add&selectRelations=true&view=true";
	iframePath += commonPath;
	if (queryParams.view != "true")
		$("#findCompetencyIframe").attr("src", iframePath);

	var iframeConceptPath = iframeRoot + "index.html?select=Add&concepts=true" + "&ceasnDataFields=" + queryParams.ceasnDataFields;
	if (queryParams.conceptShow != null && queryParams.conceptShow != undefined)
		iframeConceptPath += "&conceptShow=" + queryParams.conceptShow;
	if (queryParams.editIframe != "true")
		iframeConceptPath += "&view=true";
	iframeConceptPath += commonPath;
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
		try {
			data = JSON.parse(data);
		} catch (e) {}
	if (data != null && data != "") {
		if (data.action == "template") {
			if (data.framework != null) {
            	EcFramework.template = removeNewlines(data.framework);
			}
            if (data.competency != null) {
            	EcCompetency.template = removeNewlines(data.competency);
            }
            if (data.conceptScheme != null) {
            	EcConceptScheme.template = removeNewlines(data.conceptScheme);
            }
            if (data.concept != null) {
            	EcConcept.template = removeNewlines(data.concept);
            }
			var message = {
				action: "response",
				message: "templateOk"
			};
			console.log(message);
			parent.postMessage(message, queryParams.origin);
		} else if (data.action == "set") {
			if (data.id != null)
				var d = EcRepository.getBlocking(data.id);
			delete data.id;
			delete data.action;
			for (var key in data) {
				d[key] = data[key];
			}
			EcRepository.save(d, function (success) {
				var message = {
					action: "response",
					message: "setOk"
				};
				console.log(message);
				parent.postMessage(message, queryParams.origin);
			}, function (failure) {
				var message = {
					action: "response",
					message: "setFail"
				};
				console.log(message);
				parent.postMessage(message, queryParams.origin);
			});
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

//Forward the logged in identity to the concept frame
sendIdentityInitializeMessage = function() {
	var loggedInPpkPem = EcIdentityManager.ids[0].ppk.toPem();
	$("#selectConceptIframe")[0].contentWindow.postMessage(JSON.stringify({
		action: "identity",
		identity: loggedInPpkPem
	}), window.location.origin);
}

$("#selectConceptIframe").ready(function () {
	$(window).on("message", function (event) {
		if (event.originalEvent.data.message == "waiting") {
			sendIdentityInitializeMessage();
		}
	});
});

//Removes newlines from public key in owner and reader fields
var removeNewlines = function(entity) {
	if (entity["@owner"] != null) {
		for (var i = 0; i < entity["@owner"].length; i++) {
			var owner = entity["@owner"][i];
			entity["@owner"][i] = EcPk.fromPem(owner).toPem();
		}
	}
	if (entity["@reader"] != null) {
		for (var i = 0; i < entity["@reader"].length; i++) {
			var owner = entity["@reader"][i];
			entity["@reader"][i] = EcPk.fromPem(owner).toPem();
		}
	}
	return entity;
}
