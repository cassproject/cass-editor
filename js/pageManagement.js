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
            loading("Loading framework...");
            $("#editFrameworkBack").hide();
            EcFramework.get(queryParams.frameworkId, function (f) {
                framework = f;
                populateFramework();
                selectedCompetency = null;
                refreshSidebar();
            }, error);
        } else if (queryParams.action == "add") {
            defaultPage = "#addFrameworkSection";
            showPage(defaultPage);
        } else {
            searchFrameworks(createParamObj(5000));
        }
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
    if (p.length == 0 || (p.length == 1 && p[0] == $(pageId)[0]))
        $(pageId).show({
            complete: function () {
                $(".page").hide();
                $(pageId).show();
            }
        });
    else
        $(".page:visible").hide({
            complete: function () {
                $(pageId).show({
                    complete: function () {
                        $(".page").hide();
                        $(pageId).show();
                    }
                });
            }
        });
}

function showPage(pageId, state) {
    window.history.pushState({
        pageId: pageId,
        state: state
    }, pageId);
    gotoPage(pageId, state);
}

function loading(message) {
    var p = $(".page:visible");
    if (p.length == 0 || (p.length == 1 && p[0] == $("#loading")[0])) {
        $("#status").text(message);
        $("#loading").show({})
    } else
        $(".page:visible").hide({
            complete: function () {
                $("#status").text(message);
                $("#loading").show({})
            }
        });
}
