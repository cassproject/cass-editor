/*
 Copyright 2017 Credential Engine and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var framework = null;
var selectedCompetency = null;
var selectedRelation = null;

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
    var fun = function (success) {
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
    };
    repo.precache(framework.competency.concat(framework.relation), fun, fun);
}

function afterRefresh(level) {
    if (level == null) {
        this.fetches += framework.level.length;
        for (var i = 0; i < framework.level.length; i++) {
            EcLevel.get(framework.level[i], refreshCompetency, fetchFailure);
        }
        if (framework.level.length == 0)
            showPage("#editFrameworkSection", framework);
    } else
        showPage("#editFrameworkSection", framework);
}

$("body").on("click", ".collapse", null, function (evt) {
    $(evt.target).parent().children("ul").slideToggle();
    if ($(this).text() == "🔽 ")
        $(this).text("▶️ ");
    else
        $(this).text("🔽 ");
});
$("body").on("click", ".competency", null, function (evt) {
    var me = $(this);
    if (!$(this).hasClass("competency"))
        me = $(this).parents("competency");
    selectedCompetency = EcCompetency.getBlocking(me.attr("id"));
    if (selectedCompetency == null)
        selectedCompetency = EcLevel.getBlocking(me.attr("id"));
    var relationId = me.attr("relationid");
    if (relationId != null && relationId != "")
        selectedRelation = EcAlignment.getBlocking(me.attr("relationid"));
    else
        selectedRelation = null;
    refreshSidebar();
    evt.stopPropagation();
});

function refreshCompetency(col, level) {
    var me = this;
    me.fetches--;
    var treeNode = null;
    if ($("[id='" + col.shortId() + "']").length > 0) {
        treeNode = $("[id='" + col.shortId() + "']").before("<li class = 'competency' draggable='true' ondragstart='dragCompetency(event);' ondrop='dropCompetency(event);' ondragover='allowCompetencyDrop(event);'><ul></ul></li>");
        var tn = treeNode.prev();
        treeNode.remove();
        treeNode = tn;
    } else
        treeNode = $("#tree").append("<li class = 'competency' draggable='true' ondragstart='dragCompetency(event);' ondrop='dropCompetency(event);' ondragover='allowCompetencyDrop(event);'><ul></ul></li>").children().last();
    treeNode.attr("id", col.shortId());
    if (col.description != null && col.description != "NULL" && col.description != col.name)
        treeNode.prepend("<small/>").children().first().text(col.getDescription());
    treeNode.prepend("<span/>").children().first().text(col.getName());
    if (col.competency != null) {
        level = true;
        $(".competency[id=\"" + col.competency + "\"]").children().last().append($(".competency[id=\"" + col.shortId() + "\"]"));
        treeNode.children().first().append(" <small>(Performance Level)</small>");
        if (!$(".competency[id=\"" + col.competency + "\"]").hasClass("expandable"))
            $(".competency[id=\"" + col.competency + "\"]").addClass("expandable").prepend("<span/>").children().first().addClass("collapse").text("🔽 ");
    }
    if (queryParams.link == "true")
        treeNode.prepend(" <a style='float:right;' target='_blank'>🔗</a>").children().first().attr("href", col.shortId());
    if (queryParams.select != null)
        treeNode.prepend("<input type='checkbox'>").children().first().addClass("selector").click(function (evt) {
            console.log(evt);
            $(evt.target).parent().find("input").prop("checked", evt.target.checked);
        });
    if (me.fetches == 0) {
        if (framework.relation != undefined && framework.relation.length > 0) {
            me.fetches += framework.relation.length;
            for (var i = 0; i < framework.relation.length; i++) {
                EcAlignment.get(framework.relation[i], function (relation) {
                    me.fetches--;
                    if (relation.source !== undefined && relation.target !== undefined && relation.source != null && relation.target != null) {
                        if (relation.relationType == "narrows") {
                            if ($(".competency[relationid=\"" + relation.shortId() + "\"]").length == 0) {
                                $(".competency[id=\"" + relation.target + "\"]").children().last().append($(".competency[id=\"" + relation.source + "\"]").outerHTML()).children().last().attr("relationid", relation.shortId());
                                if ($(".competency[id=\"" + relation.target + "\"]").length > 0)
                                    $("#tree>.competency[id=\"" + relation.source + "\"]").remove();
                                if (!$(".competency[id=\"" + relation.target + "\"]").hasClass("expandable"))
                                    $(".competency[id=\"" + relation.target + "\"]").addClass("expandable").prepend("<span/>").children().first().addClass("collapse").text("🔽 ");
                            }
                        }
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
                                    afterRefresh(level);
                                }
                            }, fetchFailure);
                        }
                    }
                }, fetchFailure);
            }
        } else {
            if ($("#tree").html() == "")
                $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
            afterRefresh(level);
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

    if (framework == thing) {
        $("#sidebarVersion").hide();
        $("#sidebarAddLevels").hide();
    }

    if (thing == selectedCompetency)
        if (EcArray.has(framework.competency.concat(framework.level), thing.shortId()))
            $("#sidebarVersion option").prop('selected', false).first().prop('selected', true);
        else {
            if (EcArray.has(framework.competency.concat(framework.level), thing.id))
                $("#sidebarVersion option").prop('selected', false).last().prop('selected', true);
            else
                console.log("Error. Version not certain.");
        }

    if (new EcLevel().isA(thing.getFullType())) {
        $("#sidebarAddCompetencies").hide();
        $("#sidebarAddLevels").hide();
    }

    if (thing.id == thing.shortId()) {
        $("#sidebarVersion").hide();
    }

    if (!framework.canEditAny(EcIdentityManager.getMyPks())) {
        $("#sidebarVersion").prop('disabled', true);
        $("#sidebarAddCompetencies").prop('disabled', true);
        $("#sidebarAddLevels").prop('disabled', true);
        $("#sidebarFeedback").html("Some edit options are limited: <li>You do not own this framework.</li> ");
    } else
        $("#sidebarFeedback").html("");

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
            if (EcArray.has(framework.competency.concat(framework.level), selectedCompetency.shortId())) {
                $("#sidebarSave").prop('disabled', true);
                $("#sidebarRemove").prop('disabled', true);
                $("#sidebarDelete").prop('disabled', true);
                $("#sidebarFeedback").html("Some edit options are limited: <li>You do not own this framework.</li> ");
            }

    if (!thing.canEditAny(EcIdentityManager.getMyPks())) {
        $("#sidebarNameInput").prop('disabled', true);
        $("#sidebarDescriptionInput").prop('disabled', true);
        $("#sidebarSave").prop('disabled', true);
        $("#sidebarDelete").prop('disabled', true);
        if (thing == framework) {
            $("#sidebarUnlink").prop('disabled', true);
            $("#sidebarRemove").prop('disabled', true);
            $("#sidebarFeedback").html("Some edit options are limited: <li>You do not own this framework.</li> ");
        } else
            $("#sidebarFeedback").append("<li>You do not own this competency.</li> ");
    }

    if (selectedRelation == null) {
        $("#sidebarUnlink").prop('disabled', true);
    }
}
