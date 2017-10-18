/*
 Copyright 2017 Credential Engine and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var framework = null;
var selectedCompetency = null;

fetchFailure = function (failure) {
    this.fetches--;
    error(failure);
    if (this.fetches == 0) {
        if ($("#tree").html() == "")
            $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
        showPage("#editFrameworkSection", framework);
    }
};

populateFramework = function () {
    var me = this;
    $("#tree").html("");
    me.fetches = 0;
    $("#editFrameworkSection #frameworkName").text(framework.getName());
    if (framework.competency == null)
        framework.competency = [];
    if (framework.relation == null)
        framework.relation = [];
    if (framework.level == null)
        framework.level = [];
    repo.precache(framework.competency.concat(framework.relation), function (success) {
        if (framework.competency.length == 0) {
            if ($("#tree").html() == "")
                $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
            showPage("#editFrameworkSection", framework);
        } else {
            me.fetches += framework.competency.length;
            for (var i = 0; i < framework.competency.length; i++) {
                EcCompetency.get(framework.competency[i], refreshCompetency, fetchFailure);
            }
            me.fetches += framework.level.length;
            for (var i = 0; i < framework.level.length; i++) {
                EcLevel.get(framework.level[i], refreshCompetency, fetchFailure);
            }
        }
    });
}

function refreshCompetency(col) {
    var me = this;
    me.fetches--;
    var treeNode = null;
    if ($("[id='" + col.shortId() + "']").length > 0) {
        treeNode = $("[id='" + col.shortId() + "']").before("<li class = 'competency'><ul></ul></li>");
        var tn = treeNode.prev();
        treeNode.remove();
        treeNode = tn;
    } else
        treeNode = $("#tree").append("<li class = 'competency'><ul></ul></li>").children().last();
    treeNode.click(function (evt) {
        var me = $(this);
        if (!$(this).hasClass("competency"))
            me = $(this).parents("competency");
        selectedCompetency = EcCompetency.getBlocking(me.attr("id"));
        refreshSidebar();
        evt.stopPropagation();
    });
    treeNode.attr("id", col.shortId());
    if (col.description != null && col.description != "NULL" && col.description != col.name)
        treeNode.prepend("<small/>").children().first().text(col.getDescription());
    treeNode.prepend("<span/>").children().first().text(col.getName());
    if (queryParams.link == "true")
        treeNode.prepend(" <a style='float:right;' target='_blank'>🔗</a>").children().first().attr("href", col.shortId());
    if (queryParams.select != null)
        treeNode.prepend("<input type='checkbox'>").children().first().click(function (evt) {
            console.log(evt);
            $(evt.target).parent().find("input").prop("checked", evt.target.checked);
        });
    if (col.competency != null) {
        $(".competency[id=\"" + col.competency + "\"]").children().last().append($(".competency[id=\"" + col.shortId() + "\"]"));
        if (!$(".competency[id=\"" + col.competency + "\"]").hasClass("expandable"))
            $(".competency[id=\"" + col.competency + "\"]").addClass("expandable").prepend("<span/>").children().first().text("🔽 ").click(function (evt) {
                $(evt.target).parent().children("ul").slideToggle();
                if ($(this).text() == "🔽 ")
                    $(this).text("▶️ ");
                else
                    $(this).text("🔽 ");
            });
    }
    if (me.fetches == 0) {
        if (framework.relation != undefined && framework.relation.length > 0) {
            me.fetches += framework.relation.length;
            for (var i = 0; i < framework.relation.length; i++) {
                EcAlignment.get(framework.relation[i], function (relation) {
                    me.fetches--;
                    if (relation.source !== undefined) {
                        if (relation.relationType == "narrows") {
                            $(".competency[id=\"" + relation.target + "\"]").children().last().append($(".competency[id=\"" + relation.source + "\"]"));
                            if (!$(".competency[id=\"" + relation.target + "\"]").hasClass("expandable"))
                                $(".competency[id=\"" + relation.target + "\"]").addClass("expandable").prepend("<span/>").children().first().text("🔽 ").click(function (evt) {
                                    $(evt.target).parent().children("ul").slideToggle();
                                    if ($(this).text() == "🔽 ")
                                        $(this).text("▶️ ");
                                    else
                                        $(this).text("🔽 ");
                                });
                        }
                        if (me.fetches == 0) {
                            me.fetches += framework.relation.length;
                            for (var i = 0; i < framework.relation.length; i++) {
                                EcAlignment.get(framework.relation[i], function (relation) {
                                    me.fetches--;
                                    if (relation.source !== undefined) {
                                        if (relation.relationType == "requires") {
                                            if ($(".competency[id=\"" + relation.target + "\"]").prevAll(".competency[id=\"" + relation.source + "\"]").length > 0)
                                                $(".competency[id=\"" + relation.target + "\"]").insertBefore($(".competency[id=\"" + relation.source + "\"]"));
                                        }
                                    }
                                    if (me.fetches == 0) {
                                        if ($("#tree").html() == "")
                                            $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
                                        showPage("#editFrameworkSection", framework);
                                    }
                                }, fetchFailure);
                            }
                        }
                    }
                }, fetchFailure);
            }
        } else {
            if ($("#tree").html() == "")
                $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
            showPage("#editFrameworkSection", framework);
        }
    }
}

refreshSidebar = function () {
    var thing = framework;
    if (selectedCompetency != null)
        thing = selectedCompetency;
    $("sidebarFeedback").text("");
    $("#editFrameworkSection").find("input,textarea,select").prop('disabled', false);
    $("#editFrameworkSection .viewMode").show();
    $("#editFrameworkSection .editMode").hide();
    $("#editFrameworkSection #sidebarName").text(thing.getName());
    $("#editFrameworkSection #sidebarNameInput").val(thing.getName());
    $("#editFrameworkSection #sidebarDescription").text(thing.getDescription());
    $("#editFrameworkSection #sidebarDescriptionInput").val(thing.getDescription());

    if (framework == thing)
        $("#sidebarVersion").hide();

    if (thing == selectedCompetency)
        if (EcArray.has(framework.competency, thing.shortId()))
            $("#sidebarVersion option").first().attr('selected', true);
        else
            $("#sidebarVersion option").last().attr('selected', true);


    if (!framework.canEditAny(EcIdentityManager.getMyPks())) {
        $("#sidebarVersion").prop('disabled', true);
        $("#sidebarAddCompetencies").prop('disabled', true);
        $("#sidebarAddLevels").prop('disabled', true);
        $("#sidebarFeedback").html("Some edit options are limited: <li>You do not own this framework.</li> ");
    }

}

editSidebar = function () {
    $("#editFrameworkSection .viewMode").hide();
    $("#editFrameworkSection .editMode").show();

    var thing = framework;
    if (selectedCompetency != null)
        thing = selectedCompetency;

    $("sidebarFeedback").text("");
    if (!framework.canEditAny(EcIdentityManager.getMyPks()))
        if (selectedCompetency != null && framework.competency != null)
            if (EcArray.has(framework.competency, selectedCompetency.shortId())) {
                $("#sidebarSave").prop('disabled', true);
                $("#sidebarRemove").prop('disabled', true);
                $("#sidebarDelete").prop('disabled', true);
                $("#sidebarFeedback").html("Some edit options are limited: <li>You do not own this framework.</li> ");
            }

    if (!thing.canEditAny(EcIdentityManager.getMyPks())) {
        $("#sidebarNameInput").prop('disabled', true);
        $("#sidebarDescriptionInput").prop('disabled', true);
        $("#sidebarSave").prop('disabled', true);
        $("#sidebarRemove").prop('disabled', true);
        $("#sidebarDelete").prop('disabled', true);
        if (thing == framework)
            $("#sidebarFeedback").html("Some edit options are limited: <li>You do not own this framework.</li> ");
        else
            $("#sidebarFeedback").append("<li>You do not own this competency.</li> ");
    }
}
