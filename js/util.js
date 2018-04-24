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
    });
    $("#confirmDialog #confirmText").text("Are you sure you want to delete this concept?");
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

function createParamObj(size) {
    var paramObj = {};
    paramObj.size = size;
    paramObj.sort = '[ { "name.keyword": {"order" : "asc" , "unmapped_type" : "long",  "missing" : "_last"}} ]';
    if (queryParams.show != null && queryParams.show === 'mine')
        paramObj.ownership = 'me';

    return paramObj;
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
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
    if (type === 'cassCompetency') {
        $('label[for="sidebarAlternativeName"]').tooltip({
            content: 'An alternative name for this competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarInLanguage"]').tooltip({
            content: 'The primary language used in or by this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarChangeNote"]').tooltip({
            content: 'Documents fine-grained changes to a concept, for the purposes of administration and maintenance.',
            show: false,
            hide: false
        });
        $('label[for="sidebarHiddenLabel"]').tooltip({
            content: 'Alternate hidden labels for this concept.',
            show: false,
            hide: false
        });
        $('label[for="sidebarPreferredLabel"]').tooltip({
            content: 'Preferred display label for this concept.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCodedNotation"]').tooltip({
            content: 'An alphanumeric notation or ID code as defined by the promulgating body to identify this competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCompetencyCategory"]').tooltip({
            content: 'The textual label identifying the category of the competency as designated by the promulgating body.',
            show: false,
            hide: false
        });
        $('label[for="sidebarConceptKeyword"]').tooltip({
            content: 'A word or phrase used by the promulgating agency to refine and differentiate individual competencies contextually.',
            show: false,
            hide: false
        });
        $('label[for="sidebarConceptTerm"]').tooltip({
            content: 'A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual competencies contextually.',
            show: false,
            hide: false
        });
        $('label[for="sidebarAuthor"]').tooltip({
            content: 'A person or organization chiefly responsible for the intellectual or artistic content of this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarAlternativeCodedNotation"]').tooltip({
            content: 'An alphanumeric notation or ID code identifying this competency in common use among end-users.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCreator"]').tooltip({
            content: 'An entity primarily responsible for making this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarEducationLevelType"]').tooltip({
            content: 'A general statement describing the education or training context. Alternatively, a more specific statement of the location of the audience in terms of its progression through an education or training context.',
            show: false,
            hide: false
        });
        $('label[for="sidebarIdentifier"]').tooltip({
            content: 'An alternative URI by which this competency framework or competency is identified.',
            show: false,
            hide: false
        });
        $('label[for="sidebarLocalSubject"]').tooltip({
            content: 'The text string denoting the subject of the competency framework or competency as designated by the promulgating agency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarSkillEmbodied"]').tooltip({
            content: 'Cognitive, affective, and psychomotor skills directly or indirectly embodied in this competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarWeight"]').tooltip({
            content: 'An asserted measurement of the weight, degree, percent, or strength of a recommendation, requirement, or comparison.',
            show: false,
            hide: false
        });
    } else if (type === 'cassFramework') {
        $('label[for="sidebarNameInput"]').tooltip({
            content: 'The name of the framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarNameDescription"]').tooltip({
            content: 'The description of the framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarInLanguage"]').tooltip({
            content: 'The primary language used in or by this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarAuthor"]').tooltip({
            content: 'A person or organization chiefly responsible for the intellectual or artistic content of this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCreator"]').tooltip({
            content: 'A URI to an entity primarily responsible for making this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDateCopyrighted"]').tooltip({
            content: 'Date of a statement of copyright for this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarLicense"]').tooltip({
            content: 'A URI to a legal document giving official permission to do something with this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarRights"]').tooltip({
            content: 'Information about rights held in and over this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarSource"]').tooltip({
            content: 'A URI to the original competency framework which this competency framework is based on or derived from.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCodedNotation"]').tooltip({
            content: 'An alphanumeric notation or ID code as defined by the promulgating body to identify this framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarConceptKeyword"]').tooltip({
            content: 'A word or phrase used by the promulgating agency to refine and differentiate individual competencies contextually.',
            show: false,
            hide: false
        });
        $('label[for="sidebarConceptTerm"]').tooltip({
            content: 'A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual competencies contextually.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDateCreated"]').tooltip({
            content: 'Date of creation of this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDateValidFrom"]').tooltip({
            content: 'Beginning date of validity of this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDateValidUntil"]').tooltip({
            content: 'End date of validity of this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarIdentifier"]').tooltip({
            content: 'An alternative URI by which this competency framework or competency is identified.',
            show: false,
            hide: false
        });
        $('label[for="sidebarLocalSubject"]').tooltip({
            content: 'The text string denoting the subject of the competency framework or competency as designated by the promulgating agency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarPublicationStatus"]').tooltip({
            content: 'The publication status of the of this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarPublisher"]').tooltip({
            content: 'A URI to an entity responsible for making this competency framework available. ',
            show: false,
            hide: false
        });
        $('label[for="sidebarHistoryNote"]').tooltip({
            content: 'Describes significant changes to the meaning or the form of a concept.',
            show: false,
            hide: false
        });
        $('label[for="sidebarRepositoryDate"]').tooltip({
            content: 'Date this was registered in the registry.',
            show: false,
            hide: false
        });
        $('label[for="sidebarRightsHolder"]').tooltip({
            content: 'A URI to an agent owning or managing rights over this competency framework.',
            show: false,
            hide: false
        });
    } else if (type === 'ceasnCompetency') {
        $('label[for="sidebarNameInput"]').tooltip({
            content: 'The text of the competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarNameDescription"]').tooltip({
            content: 'Supplemental text provided by the promulgating body that clarifies the nature, scope or use of this competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarInLanguage"]').tooltip({
            content: 'The primary language used in or by this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCodedNotation"]').tooltip({
            content: 'An alphanumeric notation or ID code as defined by the promulgating body to identify this competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCompetencyCategory"]').tooltip({
            content: 'The textual label identifying the category of the competency as designated by the promulgating body.',
            show: false,
            hide: false
        });
        $('label[for="sidebarConceptKeyword"]').tooltip({
            content: 'A word or phrase used by the promulgating agency to refine and differentiate individual competencies contextually.',
            show: false,
            hide: false
        });
        $('label[for="sidebarConceptTerm"]').tooltip({
            content: 'A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual competencies contextually.',
            show: false,
            hide: false
        });
        $('label[for="sidebarAuthor"]').tooltip({
            content: 'A person or organization chiefly responsible for the intellectual or artistic content of this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarAlternativeCodedNotation"]').tooltip({
            content: 'An alphanumeric notation or ID code identifying this competency in common use among end-users.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCreator"]').tooltip({
            content: 'An entity primarily responsible for making this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarEducationLevelType"]').tooltip({
            content: 'A general statement describing the education or training context. Alternatively, a more specific statement of the location of the audience in terms of its progression through an education or training context.',
            show: false,
            hide: false
        });
        $('label[for="sidebarIdentifier"]').tooltip({
            content: 'An alternative URI by which this competency framework or competency is identified.',
            show: false,
            hide: false
        });
        $('label[for="sidebarLocalSubject"]').tooltip({
            content: 'The text string denoting the subject of the competency framework or competency as designated by the promulgating agency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarSkillEmbodied"]').tooltip({
            content: 'Cognitive, affective, and psychomotor skills directly or indirectly embodied in this competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarWeight"]').tooltip({
            content: 'An asserted measurement of the weight, degree, percent, or strength of a recommendation, requirement, or comparison.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDerivedFrom"]').tooltip({
            content: 'The URI of a competency from which this competency has been derived.',
            show: false,
            hide: false
        });
        $('label[for="sidebarListId"]').tooltip({
            content: "An alphanumeric string indicating this competency's position in a list of competencies at the same level in some arbitrary hierarchy.",
            show: false,
            hide: false
        });
        $('label[for="sidebarComplexityLevel"]').tooltip({
            content: "The expected performance level of a learner or professional as defined by a competency.",
            show: false,
            hide: false
        });
    } else if (type === 'ceasnFramework') {
        $('label[for="sidebarNameInput"]').tooltip({
            content: 'The name or title of this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarNameDescription"]').tooltip({
            content: 'A short description of this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarInLanguage"]').tooltip({
            content: 'The primary language used in or by this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarAuthor"]').tooltip({
            content: 'A person or organization chiefly responsible for the intellectual or artistic content of this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCreator"]').tooltip({
            content: 'An entity primarily responsible for making this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDateCopyrighted"]').tooltip({
            content: 'Date of a statement of copyright for this competency framework, such as ©2017.',
            show: false,
            hide: false
        });
        $('label[for="sidebarLicense"]').tooltip({
            content: 'A legal document giving official permission to do something with this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarRights"]').tooltip({
            content: 'Information about rights held in and over this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarSource"]').tooltip({
            content: 'The original competency framework which this competency framework is based on or derived from.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCodedNotation"]').tooltip({
            content: 'An alphanumeric notation or ID code as defined by the promulgating body to identify this framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarConceptKeyword"]').tooltip({
            content: 'A word or phrase used by the promulgating agency to refine and differentiate individual competencies contextually.',
            show: false,
            hide: false
        });
        $('label[for="sidebarConceptTerm"]').tooltip({
            content: 'A term drawn from a controlled vocabulary used by the promulgating agency to refine and differentiate individual competencies contextually.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDateCreated"]').tooltip({
            content: 'Date of creation of this competency framework or competency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDateValidFrom"]').tooltip({
            content: 'Beginning date of validity of this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDateValidUntil"]').tooltip({
            content: 'End date of validity of this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarIdentifier"]').tooltip({
            content: 'An alternative URI by which this competency framework or competency is identified.',
            show: false,
            hide: false
        });
        $('label[for="sidebarLocalSubject"]').tooltip({
            content: 'The text string denoting the subject of the competency framework or competency as designated by the promulgating agency.',
            show: false,
            hide: false
        });
        $('label[for="sidebarPublicationStatus"]').tooltip({
            content: 'The publication status of the of this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarPublisher"]').tooltip({
            content: 'An entity responsible for making this competency framework available.',
            show: false,
            hide: false
        });
        $('label[for="sidebarRepositoryDate"]').tooltip({
            content: 'Date this was registered in the registry.',
            show: false,
            hide: false
        });
        $('label[for="sidebarRightsHolder"]').tooltip({
            content: 'An agent owning or managing rights over this competency framework.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDerivedFrom"]').tooltip({
            content: 'The URI of a competency from which this competency has been derived.',
            show: false,
            hide: false
        });
        $('label[for="sidebarPublisherName"]').tooltip({
            content: 'Name of an agent responsible for making this entity available.',
            show: false,
            hide: false
        });
    } else if (type === 'skosCompetency') {
        $('label[for="sidebarNameInput"]').tooltip({
            content: 'Preferred display label for this concept.',
            show: false,
            hide: false
        });
        $('label[for="sidebarNameDescription"]').tooltip({
            content: 'Definition of this concept.',
            show: false,
            hide: false
        });
        $('label[for="sidebarAlternativeName"]').tooltip({
            content: 'Alternative display labels for this concept.',
            show: false,
            hide: false
        });
        $('label[for="sidebarInLanguage"]').tooltip({
            content: 'A language of the concept.',
            show: false,
            hide: false
        });
        $('label[for="sidebarChangeNote"]').tooltip({
            content: 'Documents fine-grained changes to a concept, for the purposes of administration and maintenance.',
            show: false,
            hide: false
        });
        $('label[for="sidebarHiddenLabel"]').tooltip({
            content: 'Alternate hidden labels for this concept.',
            show: false,
            hide: false
        });
        $('label[for="sidebarPreferredLabel"]').tooltip({
            content: 'Preferred display label for this concept.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCompetencyCategory"]').tooltip({
            content: 'The textual label identifying the category of the competency as designated by the promulgating body.',
            show: false,
            hide: false
        });
        $('label[for="sidebarConceptKeyword"]').tooltip({
            content: 'A word or phrase used by the promulgating agency to refine and differentiate individual competencies contextually.',
            show: false,
            hide: false
        });
        $('label[for="sidebarAuthor"]').tooltip({
            content: 'An entity responsible for making contributions to the resource.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCreator"]').tooltip({
            content: 'An entity primarily responsible for making the resource.',
            show: false,
            hide: false
        });
        $('label[for="sidebarIdentifier"]').tooltip({
            content: 'An unambiguous reference to the resource within a given context.',
            show: false,
            hide: false
        });
    } else if (type === 'skosFramework') {
        $('label[for="sidebarNameInput"]').tooltip({
            content: 'Preferred display label for this scheme.',
            show: false,
            hide: false
        });
        $('label[for="sidebarNameDescription"]').tooltip({
            content: 'Definition of this scheme.',
            show: false,
            hide: false
        });
        $('label[for="sidebarInLanguage"]').tooltip({
            content: 'A language of the scheme.',
            show: false,
            hide: false
        });
        $('label[for="sidebarAuthor"]').tooltip({
            content: 'An entity responsible for making contributions to the resource.',
            show: false,
            hide: false
        });
        $('label[for="sidebarCreator"]').tooltip({
            content: 'An entity primarily responsible for making the resource.',
            show: false,
            hide: false
        });
        $('label[for="sidebarDateCopyrighted"]').tooltip({
            content: 'Date of a statement of copyright for this concept scheme.',
            show: false,
            hide: false
        });
        $('label[for="sidebarLicense"]').tooltip({
            content: 'A URI to a legal document giving official permission to do something with this scheme.',
            show: false,
            hide: false
        });
        $('label[for="sidebarConceptKeyword"]').tooltip({
            content: 'A word or phrase used by the promulgating agency to refine and differentiate schemes contextually.',
            show: false,
            hide: false
        });
        $('label[for="sidebarPublicationStatus"]').tooltip({
            content: 'The publication status of this scheme.',
            show: false,
            hide: false
        });
        $('label[for="sidebarPublisher"]').tooltip({
            content: 'A URI to an entity responsible for making this scheme available.',
            show: false,
            hide: false
        });
        $('label[for="sidebarHistoryNote"]').tooltip({
            content: 'Describes significant changes to the meaning or the form of a scheme.',
            show: false,
            hide: false
        });
        $('label[for="sidebarRightsHolder"]').tooltip({
            content: 'A URI to an agent owning or managing rights over this scheme.',
            show: false,
            hide: false
        });
    }
}

resetSearch = function () {
    $('#search').val('');
    searchFrameworks(createParamObj(5000));
}

highlightSelected = function (element) {
    $('.selected').removeClass('selected');
    $(element).addClass('selected');
}

var tourSkipAhead = false;
startTour = function (step) {
    //Scroll to top of the frameworks list before starting the tour.
    $('#frameworks').scrollTop(0);
    localStorage.setItem('tourStatus', 'in progress');
    var intro = introJs();
    intro.setOptions({
        steps: [
            {
                element: $('#header')[0],
                intro: 'You can search for a particular framework here.'
            },
            {
                element: $('#frameworks').children(':first')[0],
                intro: 'You can click a framework for more information.'
            },
            {
                element: $('#frameworkNameContainer')[0],
                intro: 'This displays the current framework, you can click here to view more details about the framework itself.'
            },
            {
                element: $('#tree').children(':first')[0],
                intro: 'You can click a competency for more information. If you have permission to edit the framework, you can also drag and drop competencies to rearrange them.'
            },
            {
                element: $('#detailSlider')[0],
                intro: 'This panel will list the properties of the selected framework or competency. Additionally, you can add new competencies or edit these properties here.'
            }
        ],
        showStepNumbers: false,
        disableInteraction: true,
        hideNext: true,
        exitOnOverlayClick: false,
        keyboardNavigation: false
    });

    intro.oncomplete(function () {
        cancelTour();
        selectedCompetency = null;
    });

    intro.onafterchange(function () {
        $('.introjs-prevbutton').hide();
        $('.introjs-bullets').hide();
        $('.introjs-skipbutton').attr('tabindex', '2');
        $('.introjs-nextbutton').attr('tabindex', '1');
        if (tourSkipAhead === false && this._currentStep === 2) {
            $('.introjs-skipbutton').click();
            $('#frameworks').children(':first').click();
            setTimeout(function () {
                tourSkipAhead = true;
                startTour(3);
            }, 3000);
        } else if (this._currentStep === 4) {
            $('#tree').children(':first').click();
        }
    });

    if (step !== null)
        intro.goToStepNumber(step).start();
    else
        intro.start();
}

cancelTour = function () {
    localStorage.setItem('tourStatus', 'complete');
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

showConfirmDialog = function (callback, statement, action, id) {
    if (viewMode) return;
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
    $("#tree").height("calc(" + window.visualViewport.height + "px - " + $("#tree").position().top + "px)");
    $(".sidebar table").css("margin-top", "calc(" + $(".sidebarToolbar").height() + "px)");
});

resizeWindow = function (pageX) {
    if (queryParams.view == "true")
        return;
    var x = $(window).width() - pageX - 16;
    if (x > min && x < (($(window).width() * 3) / 4) && pageX < ($(window).width() - mainmin)) {
        $('#detailSlider').css("width", x - 8);
        $('#editFrameworkSection').css("padding-right", x);
    }
    $("#tree").height("calc(" + window.visualViewport.height + "px - " + $("#tree").position().top + "px)");
    $(".sidebar table").css("margin-top", "calc(" + $(".sidebarToolbar").height() + "px)");
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
