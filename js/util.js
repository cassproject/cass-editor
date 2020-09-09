/*
 Copyright 2017 Credential Engine and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

queryParams = function () {
	if (window.document.location.search == null)
		return {};
	var hashSplit = (window.document.location.search.split("?"));
	if (hashSplit.length > 1) {
		var o = {};
		var paramString = hashSplit[1];
		var parts = (paramString).split("&");
		for (var i = 0; i < parts.length; i++)
			if (o[parts[i].split("=")[0]] != null) {
				var val = decodeURIComponent(parts[i].replace(parts[i].split("=")[0] + "=", ""));
				if (val == o[parts[i].split("=")[0]])
					continue;
				if (EcArray.isArray(o[parts[i].split("=")[0]]) == false)
					o[parts[i].split("=")[0]] = [o[parts[i].split("=")[0]]];
				o[parts[i].split("=")[0]].push(val);
			}
		else
			o[parts[i].split("=")[0]] = decodeURIComponent(parts[i].replace(parts[i].split("=")[0] + "=", ""));
		return o;
	}
	return {};
};
queryParams = queryParams();

var viewMode = false;
var conceptMode = false;

if (queryParams.ceasnDataFields == "true") {
	$("#loadingCass").hide();
	$("#loadingCe").css("display", "inline-block");
}

if (queryParams.view == "true") {
	viewMode = true;
	$("#createNewButton").remove();
	$("button.editControl").remove();
	$("select.editControl").remove();
	$("#sidebarFeedback").remove();
	if (queryParams.ceasnDataFields == null) {
		$("#editFrameworkSection").removeClass("pageWithSidebar");
		$("#detailSlider").remove();
		$("#split-bar").remove();
	}
	EcRepository.cachingSearch = true;
}

if (queryParams.concepts == "true") {
	conceptMode = true;
	$("#addFrameworkSection #title").text("Add a Concept Scheme");
	$("#addFrameworkSection #caption").text("Create a scheme below.");
	$(".absentForConcepts").remove();
	$("#formSection #nameSpan").text("Title");
	$("#formSection #name").attr("placeholder", "Enter the concept scheme title here.");
	$("#formSection #description").attr("placeholder", "Enter the concept scheme description here.");
	$("#sidebarVersion").remove();
	$("#sidebarAddCompetencies option").first().text("Add Concept");
	$("#sidebarAddCompetencies option[value=\"search\"]").remove();
	$("#sidebarAddLevels").remove();
	$("#sidebarRemove").remove();
	$("#sidebarExport option").each(function () {
		$(this).text(this.text.replace("CASS", "SKOS"));
		$(this).text(this.text.replace("ASN", "SKOS"));
		if ($(this).val() == "ceasn") {
			$(this).addClass("frameworkOnly");
		}
	});
	$("#confirmDialog #confirmText").text("Are you sure you want to delete this concept?");
	$("#createNewButton").attr("title", "Create a new concept scheme.");
	$("#frameworksSection").find(("#importButton")).attr("title", "Import a concept scheme.");
} else {
	$(".absentForCompetencies").remove();
}

if (!(window.ActiveXObject) && "ActiveXObject" in window) {
	if (queryParams.view == null || queryParams.view === undefined) {
		alert("IE 11 does not support functionality required for editing. You will only be able to view frameworks. To remedy this, please use Edge, Firefox, Chrome, Safari, or any other browser that is keeping current with existing standards.")
		queryParams.view = "true";
	}
}

jQuery.fn.outerHTML = function () {
	return jQuery('<div />').append(this.eq(0).clone()).html();
};

$(document).ready(function () {
	if (parent != window) {
		var oHead = document.getElementsByTagName("head")[0];
		var arrStyleSheets = parent.document.getElementsByTagName("*");
		for (var i = 0; i < arrStyleSheets.length; i++)
			if (arrStyleSheets[i].tagName.toLowerCase() == "link" || arrStyleSheets[i].tagName.toLowerCase() == "style")
				if (arrStyleSheets[i].attributes.inherit != null)
					oHead.appendChild(arrStyleSheets[i].cloneNode(true));
		try {
			importParentStyles();
		} catch (e) {}
	}
});

function importParentStyles() {
	var parentStyleSheets = parent.document.styleSheets;
	var cssString = "";
	for (var i = 0, count = parentStyleSheets.length; i < count; ++i) {
		if (parentStyleSheets[i].cssRules)
			if (parentStyleSheets[i].ownerNode.attributes.inherit != null) {
				var cssRules = parentStyleSheets[i].cssRules;
				for (var j = 0, countJ = cssRules.length; j < countJ; ++j)
					cssString += cssRules[j].cssText;
			} //else
		//cssString += parentStyleSheets[i].cssText; // IE8 and earlier
	}
	var style = document.createElement("style");
	style.type = "text/css";
	try {
		style.innerHTML = cssString;
	} catch (ex) {
		//style.styleSheet.cssText = cssString; // IE8 and earlier
	}
	document.getElementsByTagName("head")[0].appendChild(style);
}

var sortBy = "name.keyword";

function createParamObj(size) {
	var paramObj = {};
	paramObj.size = size;
	var order = (sortBy == "name.keyword") ? "asc" : "desc";
	paramObj.sort = '[ { "' + sortBy + '": {"order" : "' + order + '" , "unmapped_type" : "keyword",  "missing" : "_last"}} ]';
	if (queryParams.show != null && queryParams.show === 'mine')
		paramObj.ownership = 'me';

	return paramObj;
}

function changeSort() {
	sortBy = $("#sortSelect").val();
	if (conceptMode && sortBy == "name.keyword") {
		sortBy = "dcterms:title.keyword";
	}
	firstLoad = true;
    $('#frameworks').scrollTop(0);
    searchFrameworks(createParamObj(20));
}

function changeShowOnlyMine() {
	queryParams.show = $("#showOnlyMine")[0].checked ? "mine" : null;
	firstLoad = true;
    $('#frameworks').scrollTop(0);
    searchFrameworks(createParamObj(20));
}

function download(filename, text) {
	var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
	//Wrap in click handler, necessary for iOS
	$('#detailSlider').on('click', function() {
		saveAs(blob, filename);
		$('#detailSlider').off('click');
	});
	setTimeout(function() {
		$('#detailSlider').click();
	}, 1000);
}

function spitEvent(message, id) {
	var evt = {
		message: message,
		changed: id,
		selectedFramework: framework == null ? null : framework.shortId(),
		selectedCompetency: selectedCompetency == null ? null : selectedCompetency.shortId(),
		selectedFrameworkObject: framework == null ? null : JSON.parse(framework.toJson()),
		selectedCompetencyObject: selectedCompetency == null ? null : JSON.parse(selectedCompetency.toJson()),
		selectedFrameworkName: framework == null ? null : (framework.getName == null ? framework["dcterms:title"] : framework.getName()),
		selectedCompetencyName: selectedCompetency == null ? null : (selectedCompetency.getName == null ? selectedCompetency["skos:prefLabel"] : selectedCompetency.getName()),
		visiblePage: $(".page:visible").attr("id"),
	};
	if (queryParams.ceasnDataFields == "true") {
		if (framework != null)
			if (framework.getGuid != null) {
				if (framework.getGuid().startsWith("ce-"))
					evt.selectedFrameworkCtid = framework == null ? null : framework.getGuid();
				else if (framework.getGuid().matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"))
					evt.selectedFrameworkCtid = framework == null ? null : "ce-" + framework.getGuid();
				else
					evt.selectedFrameworkCtid = "ce-" + new UUID(3, "nil", framework.shortId()).format();

			}
		if (selectedCompetency != null)
			if (selectedCompetency.getGuid != null) {
				if (selectedCompetency.getGuid().startsWith("ce-"))
					evt.selectedCompetencyCtid = selectedCompetency == null ? null : selectedCompetency.getGuid();
				else if (selectedCompetency.getGuid().matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"))
					evt.selectedCompetencyCtid = selectedCompetency == null ? null : "ce-" + selectedCompetency.getGuid();
				else
					evt.selectedCompetencyCtid = "ce-" + new UUID(3, "nil", framework.shortId() + selectedCompetency.shortId()).format();
			}
	}
	console.log(evt);
	if (parent != null)
		if (queryParams.origin != null && queryParams.origin != '')
			parent.postMessage(evt, queryParams.origin);
}

alertBadCharacters = function () {
	var badInputs = $('.invalidInput');
	if (badInputs.length > 0) {
		var inputNames = [];
		for (var i = 0; i < badInputs.length; i++) {
			var fieldName = $('#' + badInputs[i].id + 'Label').text().slice(0, -1);
			inputNames.push(fieldName);
		}
		alert('Bad characters detected in input fields: ' + inputNames);
		return false;
	}
	return true;
}

alertDuplicateLanguages = function () {
	var duplicates = false;
	$("#detailSlider").find('.onePerLanguage').each(function() {
		var languagesUsed = [];
		$(this).find('.sidebarInputLanguageSelect').each(function() {
			if (languagesUsed.includes($(this).val().toLowerCase())) {
				duplicates = true;
				$(this).addClass('invalidLanguage');
				$(this).autocomplete({
					source: tags,
					appendTo: '.ceasnDataFields',
					minLength: 2
				});
			}
			else {
				languagesUsed.push($(this).val().toLowerCase());
			}
		});
	});
	if (duplicates === true) {
		alert('Some fields can only be one entry per language.');
		return false;
	}
	$('.invalidLanguage').each(function() {
		$(this).removeClass('invalidLanguage');
	});
	return true;
}

initTooltips = function (type) {
	$('label').each(function () {
		var title = $(this).attr(type + "Title");
		if (title != null && title !== undefined && title != "")
			$(this).tooltip({
				content: title,
				show: false,
				hide: false
			});
	});
}

resetSearch = function () {
	$('#search').val('');
	firstLoad = true;
	$('#frameworks').scrollTop(0);
	searchFrameworks(createParamObj(20));
}

highlightSelected = function (element) {
	$('.selected').removeClass('selected');
	$(element).addClass('selected');
}

startTour = function (step) {
	//Scroll to top of the frameworks list before starting the tour.
	$('#frameworks').scrollTop(0);
	localStorage.setItem('tourStatus', 'in progress');
	var frameworkTerm = conceptMode ? 'concept scheme' : 'framework';
	var competencyTerm = conceptMode ? 'concept' : 'competency';
	var frameworkTermPlural = conceptMode ? 'concept schemes' : 'frameworks';
	var competencyTermPlural = conceptMode ? 'concepts' : 'competencies';
	//Prevent user from clicking other things
	$('#frameworks').children().css('pointer-events', 'none');
	$('#header').css('pointer-events', 'none');
	$('#frameworkNameContainer').css('pointer-events', 'none');
	$('#tree').children().css('pointer-events', 'none');
	$('.sidebarInner').children().css('pointer-events', 'none');
	var tour = {
		id: "welcomeTour",
		steps: [
			{
				target: $('#search')[0],
				content: 'You can search for a particular ' + frameworkTerm + ' here.',
				placement: "bottom",
				onNext: function() {
					//If concept mode, skip this step
					if (conceptMode)
						hopscotch.showStep(2);
				}
			},
			{
				target: $('#header > #importButton')[0],
				content: 'Clicking here will let you import a ' + frameworkTerm + '.',
				placement: "left"
            },
			{
				target: $('#createNewButton')[0],
				content: 'Or you can click here to create a brand new ' + frameworkTerm + '.',
				placement: "left",
				onNext: function() {
					//If there are no frameworks, start creating a new one to continue the tour
					if ($('#frameworks').children(':first')[0].tagName === 'CENTER') {
						$('#createNewButton').click();
						hopscotch.showStep(4);
					}
					//In case user has scrolled down
					$('#frameworks').scrollTop(0);
				}
            },
			{
				target: $('#frameworks').children(':first')[0],
				content: 'You can click on a ' + frameworkTerm + ' for more information.',
				placement: "bottom",
				onNext: function() {
					$('#frameworks').children(':first').click();
				}
            },
			{
				target: $('#frameworkNameContainer')[0],
				content: 'This displays the current ' + frameworkTerm + ', you can click here to view more details about the ' + frameworkTerm + ' itself.',
				placement: "bottom",
				delay: 1500,
				onNext: function() {
					//If no competencies, skip next step
					if ($('#tree').children(':first')[0].tagName === 'BR') {
						hopscotch.showStep(6);
					}
				},
            },
			{
				target: 'li.competency',
				content: 'You can click a ' + competencyTerm + ' for more information. If you have permission to edit the ' + frameworkTerm + ', you can also drag and drop ' + competencyTermPlural + ' to rearrange them.',
				placement: "right",
            },
			{
				target: 'div.detailSliderView',
				content: 'This panel will list the properties of the selected ' + frameworkTerm + ' or ' + competencyTerm + '. Additionally, you can add new ' + competencyTermPlural + ' or edit these properties here.',
				placement: "left",
				onShow: function() {
					$('#tree').children(':first').click();
				}
            }
		],
		onEnd: function() {
			cancelTour();
			selectedCompetency = null;
			$('#editFrameworkBack').click();
		},
		onClose: function() {
			cancelTour();
			selectedCompetency = null;
			if ($('#editFrameworkBack'))
				$('#editFrameworkBack').click();
		},
	};

	hopscotch.startTour(tour);
}

cancelTour = function () {
	localStorage.setItem('tourStatus', 'complete');
	$('#frameworks').children().css('pointer-events', 'auto');
	$('#header').css('pointer-events', 'auto');
	$('#frameworkNameContainer').css('pointer-events', 'auto');
	$('#tree').children().css('pointer-events', 'auto');
	$('.sidebarInner').children().css('pointer-events', 'auto');
}

showTourDialog = function (callback) {
	if (viewMode) return;
	if (localStorage.getItem('tourStatus') === null || localStorage.getItem('tourStatus') === 'in progress') {
		$("#tourDialog").show();
		$("#confirmOverlay").show();

		$("#acceptTourButton").on('click', function () {
			callback(true);
		});

		$("#declineTourButton").on('click', function () {
			callback(false);
		});
	}

}

hideTourDialog = function (callback) {
	if (viewMode) return;
	$("#tourDialog").hide();
	$("#confirmOverlay").hide();

	$("#acceptTourButton").off();
	$("#declineTourButton").off();
}

showCopyOrLinkDialog = function (callback) {
	if (viewMode) return;
	$("#copyOrLinkDialog").show();
	$("#confirmOverlay").show();

	$("#copyCompetenciesButton").on('click', function () {
		callback(true);
	});

	$("#linkCompetenciesButton").on('click', function () {
		callback(false);
	});
}

hideCopyOrLinkDialog = function () {
	if (viewMode) return;
	$("#copyOrLinkDialog").hide();
	$("#confirmOverlay").hide();
	$("#linkCompetenciesButton").off();
	$("#copyCompetenciesButton").off();
}

showConfirmDialog = function (callback, statement, cancelText, confirmText, action, id) {
	if (viewMode) return;
	$("#dialogCancelButton").text(cancelText);
	$("#dialogConfirmButton").text(confirmText);
	if (action === 'delete') {
		EcFramework.search(repo, "\"" + id + "\"", function (results) {
			$("#confirmDialog").show();
			$("#confirmOverlay").show();
			if (results.length > 1) {
				statement += ' Up to ' + results.length + ' other frameworks may break.';
			}
			$("#confirmText").text(statement);

			$("#dialogConfirmButton").on('click', function () {
				callback(true);
			});
			$("#dialogCancelButton").on('click', function () {
				callback(false);
			});
		}, console.error, {})
	} else {
		$("#confirmDialog").show();
		$("#confirmOverlay").show();
		$("#confirmText").text(statement);

		$("#dialogConfirmButton").on('click', function () {
			callback(true);
		});
		$("#dialogCancelButton").on('click', function () {
			callback(false);
		});
	}

}

hideConfirmDialog = function () {
	if (viewMode) return;
	$("#confirmDialog").hide();
	$("#confirmOverlay").hide();
	$("#dialogConfirmButton").off();
	$("#dialogCancelButton").off();
}

Date.prototype.toDatetimeLocal =
	function toDatetimeLocal() {
		var
			date = this,
			ten = function (i) {
				return (i < 10 ? '0' : '') + i;
			},
			YYYY = date.getFullYear(),
			MM = ten(date.getMonth() + 1),
			DD = ten(date.getDate()),
			HH = ten(date.getHours()),
			II = ten(date.getMinutes()),
			SS = ten(date.getSeconds());
		return YYYY + '-' + MM + '-' + DD + 'T' +
			HH + ':' + II + ':' + SS;
	};

if (queryParams.css != null) {
	var ss = document.createElement("link");
	ss.type = "text/css";
	ss.rel = "stylesheet";
	ss.href = queryParams.css;
	document.getElementsByTagName("head")[0].appendChild(ss);

}

var min = 300;
var mainmin = 300;

$(window).resize(function (e) {
	$('#detailSlider').css("width", Math.min((($(window).width() * 3) / 4), $('#detailSlider').width()));
	$('#editFrameworkSection').css("padding-right", Math.min((($(window).width() * 3) / 4), $('#detailSlider').width()) + 16);
	$("#tree").height("calc(" + $(window).outerHeight() + "px - " + $("#tree").position().top + "px)");

	$(".sidebar table").css("margin-top", "calc(" + $(".sidebarToolbar").height() + "px)");
});

resizeWindow = function (pageX) {
	if (queryParams.view == "true" && queryParams.ceasnDataFields == null)
		return;
	var x = $(window).width() - pageX - 16;
	if (x > min && x < (($(window).width() * 3) / 4) && pageX < ($(window).width() - mainmin)) {
		$('#detailSlider').css("width", x - 8);
		$('#editFrameworkSection').css("padding-right", x);
	}
	resizeEditFrameworkSection();
}

resizeEditFrameworkSection = function () {
	$("#tree").height("calc(" + $(window).outerHeight() + "px - " + $("#tree").position().top + "px)");
	$(".sidebar table").css("margin-top", "calc(" + $(".sidebarToolbar").height() + "px)");
}

isEmpty = function (str) {
	return !str.replace(/^\s+/g, '').length;
}

saveToAutocompleteCache = function (key, value) {
	if (sidebarAutocompleteCache != null) {
		if (sidebarAutocompleteCache[key] == null)
			sidebarAutocompleteCache[key] = new Set();
		sidebarAutocompleteCache[key].add(value);
	}
}

attachCustomAutocomplete = function (elem) {
	if (sidebarAutocompleteCache != null && sidebarAutocompleteCache[elem.getAttribute('id')] != null) {
		var array = Array.from(sidebarAutocompleteCache[elem.getAttribute('id')]);
		$(elem).autocomplete({
			source: array
		});
	}
}

copyToClipboard = function (evt) {
	var target = $(evt.currentTarget);
	var text = target.parent().next().attr('href');
	var textarea = document.createElement('textarea');
	textarea.classList.add('clipboardTextArea');
	textarea.value = text;
	document.body.appendChild(textarea);
	textarea.focus();
	textarea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);
		if (msg === 'successful') {
			target.children().first().removeClass('fa-clipboard');
			target.children().first().addClass('fa-check');
			setTimeout(function () {
				target.children().first().removeClass('fa-check');
				target.children().first().addClass('fa-clipboard');
			}, 2000);
		}
	} catch (err) {
		console.log(err);
		console.log('Oops, unable to copy');
	}

	document.body.removeChild(textarea);
}

resolveNameFromUrl = function (url, callback) {
	$.ajax({
		dataType: "json",
		url: url,
		async: true,
		success: function (data) {
			var name = null;
			if (data) {
				if (data['ceterms:name']) {
					name = data['ceterms:name'];
				}
				else if (data['name']) {
					name = data['name'];
				}
				else if (data['schema:name']) {
					name = data['schema:name'];
				}
				else if (data['title']) {
					name = data['title'];
				}
				else if (data['skos:prefLabel']) {
					name = data['skos:prefLabel'];
				}
				else if (data['title']) {
					name = data['title'];
				}
				else if (data['@graph'] && data['@graph'][0]) {
					if (data['@graph'][0]['ceterms:name']) {
						name = data['@graph'][0]['ceterms:name'];
					}
					else if (data['@graph'][0]['name']) {
						name = data['@graph'][0]['name'];
					}
					else if (data['@graph'][0]['schema:name']) {
						name = data['@graph'][0]['schema:name'];
					}
					else if (data['@graph'][0]['title']) {
						name = data['@graph'][0]['title'];
					}
					else if (data['@graph'][0]['skos:prefLabel']) {
						name = data['@graph'][0]['skos:prefLabel'];
					}
				}
				//If it's a langstring
				name = Thing.getDisplayStringFrom(name);
				//If still object, display value
				if (EcObject.isObject(name)) {
					var langs = Object.keys(name);
					name = name[langs[0]];
				}
			}
			callback(name);
		},
		error: function() {
			callback(null);
		}
	});
}

resolveNameFromUrlWithElem = function (url, elem, callback) {
	$.ajax({
		dataType: "json",
		url: url,
		async: true,
		success: function (data) {
			var name = null;
			if (data) {
				if (data['ceterms:name']) {
					name = data['ceterms:name'];
				}
				else if (data['name']) {
					name = data['name'];
				}
				else if (data['schema:name']) {
					name = data['schema:name'];
				}
				else if (data['title']) {
					name = data['title'];
				}
				else if (data['skos:prefLabel']) {
					name = data['skos:prefLabel'];
				}
				else if (data['title']) {
					name = data['title'];
				}
				else if (data['@graph'] && data['@graph'][0]) {
					if (data['@graph'][0]['ceterms:name']) {
						name = data['@graph'][0]['ceterms:name'];
					}
					else if (data['@graph'][0]['name']) {
						name = data['@graph'][0]['name'];
					}
					else if (data['@graph'][0]['schema:name']) {
						name = data['@graph'][0]['schema:name'];
					}
					else if (data['@graph'][0]['title']) {
						name = data['@graph'][0]['title'];
					}
					else if (data['@graph'][0]['skos:prefLabel']) {
						name = data['@graph'][0]['skos:prefLabel'];
					}
				}
				//If it's a langstring
				name = Thing.getDisplayStringFrom(name);
				//If still object, display value
				if (EcObject.isObject(name)) {
					var langs = Object.keys(name);
					name = name[langs[0]];
				}
			}
			callback(name, elem);
		}
	});
}

getArrayOfResolvedUrlsWithElem = function (urls, elem, callback) {
	var names = [];
	var counter = 0;
	for (var i in urls) {
		resolveNameFromUrlWithElem(urls[i], elem, function (result) {
			if (result != null)
				names.push(result);
			counter++;
			if (counter == urls.length)
				callback(names, elem);
		});
	}
}

$('#split-bar').mousedown(function (e) {
	e.preventDefault();
	$(document).mousemove(function (e) {
		e.preventDefault();
		resizeWindow(e.pageX);
	})
});

$(document).ready(function () {
	resizeWindow($(window).width() / 2);
});

$(document).mouseup(function (e) {
	$(document).unbind('mousemove');
});

jQuery.extend(jQuery.expr[':'], {
	invalid: function (elem, index, match) {
		var invalids = document.querySelectorAll(':invalid'),
			result = false,
			len = invalids.length;

		if (len) {
			for (var i = 0; i < len; i++) {
				if (elem === invalids[i]) {
					result = true;
					break;
				}
			}
		}
		return result;
	}
});

addNewlinesToId = function(pem) {
	//Begin public key line
	pem = pem.substring(0, 26) + "\n" + pem.substring(26);
	var length = pem.length;
	var start = 27;
	while (start+64 < length) {
		pem = pem.substring(0, start+64) + "\n" + pem.substring(start+64);
		start += 65;
		length++;
	}
	//End public key line
	pem = pem.substring(0, length-24) + "\n" + pem.substring(length-24);
	return pem;
}
