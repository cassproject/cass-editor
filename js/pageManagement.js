/*
 Copyright 2017 Credential Engine and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var defaultPage = "#frameworksSection";
$(document).ready(function () {
    loadIdentity(function () {
        if (queryParams.frameworkId != null) {
            defaultPage = "#editFrameworkSection";

            if (queryParams.back != "true")
                $("#editFrameworkBack").hide();
            if (queryParams.frameworkId.toLowerCase().indexOf("conceptscheme") != -1){
                loading("Loading concept scheme...");
                conceptMode = true;
                EcConceptScheme.get(queryParams.frameworkId, function (f) {
                    framework = f;
                    populateFramework(); // populateConceptScheme if conceptMode
                    selectedCompetency = null;
                    refreshSidebar();
                }, error);
            } else {
                loading("Loading framework...");
                EcFramework.get(queryParams.frameworkId, function (f) {
                    framework = f;
                    populateFramework();
                    selectedCompetency = null;
                    refreshSidebar();
                }, error);
            }
        } else if (queryParams.action == "add") {
            defaultPage = "#frameworksSection";
            createFramework();
        } else if (queryParams.action == "import") {
            defaultPage = "#importSection";
            showPage(defaultPage);
        } else {
            searchFrameworks(createParamObj(20));
        }
        var tryShowTourDialog = setInterval(function () {
            if (!$('#loading').is(':visible')) {
                clearInterval(tryShowTourDialog);
                showTourDialog(function (response) {
                    if (response === true) {
                        startTour();
                    } else {
                        cancelTour();
                    }
                    hideTourDialog();
                });
            }
        }, 1000);
    });
});

function backPage() {
    window.history.back();
}

var error = console.error;

window.onpopstate = function (event) {
    if (event.state == null)
        gotoPage(defaultPage);
    else
        gotoPage(event.state.pageId);
};

function gotoPage(pageId, state) {
    var p = $(".page:visible");
    if (p.length == 0 || (p.length == 1 && p[0] == $(pageId)[0])) {
        spitEvent("viewChanged");
        $(pageId).slideDown(400, function () {
            $(".page").hide();
            $(pageId).show();
        });
    } else
        $(".page:visible").slideUp(400, function () {
            spitEvent("viewChanged");
            $(pageId).slideDown(400, function () {
                $(".page").hide();
                $(pageId).show();
                $("#tree").height("calc(" + $(window).outerHeight() + "px - " + $("#tree").position().top + "px)");
                $(".sidebar table").css("margin-top", "calc(" + $(".sidebarToolbar").height() + "px)");
                resizeWindow($(window).width() / 2);
            });
        });
}

function showPage(pageId, state) {
    window.history.pushState({
        pageId: pageId,
        state: state
    }, pageId);
    gotoPage(pageId, state);
}

function overlayPage(pageId, state) {
    window.history.pushState({
        pageId: pageId,
        state: state
    }, pageId);
    $("#editFrameworkSection:visible").addClass("transparent");
    $(".sidebarToolbar:visible").addClass("transparent");
    $(pageId).slideDown(400, function () {
        $(pageId).show();
        $("#tree").height("calc(" + $(window).outerHeight() + "px - " + $("#tree").position().top + "px)");
        $(".sidebar table").css("margin-top", "calc(" + $(".sidebarToolbar").height() + "px)");
        resizeWindow($(window).width() / 2);
    });
}

function loading(message) {
    var p = $(".page:visible");
    if (p.length == 0 || (p.length == 1 && p[0] == $("#loading")[0])) {
        $("#status").text(message);
        $("#loading").show({
            duration: 0
        })
    } else {
        $(".page:visible").hide();
        $("#status").text(message);
        $("#loading").show();
    }
}
