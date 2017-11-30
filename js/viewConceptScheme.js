populateConceptScheme = function (subsearch) {
    var me = this;
    treeTop = $("#tree").scrollTop();
    $("#tree").hide().html("");
    me.fetches = 0;
    $("#editFrameworkSection #frameworkName").text(framework.title);
    if (queryParams.link == "true")
        $("#editFrameworkSection #frameworkLink").attr("href", framework.shortId()).show();

    if (framework.hasTopConcept == null)
        framework.hasTopConcept = [];
    if (framework.hasTopConcept.length == 0) {
        if ($("#tree").html() == "")
            $("#tree").html("<br><br><center><h3>This concept scheme is empty.</h3></center>");
        showPage("#editFrameworkSection", framework);
    } else {
        me.fetches += framework.hasTopConcept.length;
        for (var i = 0; i < framework.hasTopConcept.length; i++) {
            EcConcept.get(framework.hasTopConcept[i], function (c) {
                refreshConcept(c, null, subsearch);
            }, fetchFailure);
        }
    }
}

function afterConceptRefresh(level, subsearch) {
    showPage("#editFrameworkSection", framework);
    $("#tree").show().scrollTop(treeTop);
    if (selectedCompetency !== null) {
        highlightSelected($("[id=\"" + selectedCompetency.shortId() + "\"]"));
        if ($(".selected").length > 0)
            $(".selected").parent().scrollTop($(".selected").parent().scrollTop() + $(".selected").position().top - 50);
    }
}

function refreshConcept(col, level, subsearch, recurse) {
    var me = this;
    me.fetches--;
    if (recurse == null) recurse = [];
    if (EcArray.has(recurse, col.shortId())) {
        if (me.fetches == 0) {
            if ($("#tree").html() == "")
                $("#tree").html("<br><br><center><h3>This concept scheme is empty.</h3></center>");
            afterRefresh(level, subsearch);
        }
        return;
    }
    recurse.push(col.shortId());
    var treeNode = null;
    treeNode = $("#tree").append("<li class = 'competency' draggable='true' ondragstart='dragConcept(event);' ondrop='dropConcept(event);' ondragover='allowConceptDrop(event);'><span></span><ul></ul></li>").children().last();
    treeNode.attr("id", col.shortId());
    if (col.description != null && col.description != "NULL" && col.description != col.title)
        treeNode.children().first().prepend("<small/>").children().first().addClass("competencyDescription").css('display', 'block').text(col.description);
    treeNode.children().first().prepend("<span/>").children().first().addClass("competencyName").text(col.title);
    if (queryParams.link == "true")
        treeNode.prepend(" <a style='float:right;' target='_blank'><i class='fa fa-link' aria-hidden='true'></a>").children().first().attr("href", col.shortId());
    if (queryParams.select != null)
        treeNode.prepend("<input type='checkbox' tabIndex='-1'>");
    if (subsearch != null)
        treeNode.mark(subsearch);
    if (col.broadens != null && col.broadens.length > 0) {
        for (var i = 0; i < col.broadens.length; i++) {
            me.fetches++;
            EcConcept.get(col.broadens[i], function (concept) {
                refreshConcept(concept, level, subsearch, JSON.parse(JSON.stringify(recurse))).appendTo(treeNode.children("ul"));

                if (me.fetches == 0) {
                    if ($("#tree").html() == "")
                        $("#tree").html("<br><br><center><h3>This concept scheme is empty.</h3></center>");
                    afterRefresh(level, subsearch);
                }
            }, fetchFailure);
        }
    } else
    if (me.fetches == 0) {
        if ($("#tree").html() == "")
            $("#tree").html("<br><br><center><h3>This concept scheme is empty.</h3></center>");
        afterRefresh(level, subsearch);
    }
    return treeNode;
}

editConceptSidebar = function () {
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
                $("#sidebarFeedback").html("Some edit options are limited: <li>You do not own this concept scheme.</li> ");
            }

    if (!thing.canEditAny(EcIdentityManager.getMyPks())) {
        $("#sidebarNameInput").prop('disabled', true);
        $("#sidebarDescriptionInput").prop('disabled', true);
        $("#sidebarSave").prop('disabled', true);
        $("#sidebarDelete").prop('disabled', true);
        if (thing == framework) {
            $("#sidebarFeedback").html("Some edit options are limited: <li>You do not own this concept scheme.</li> ");
        } else
            $("#sidebarFeedback").append("<li>You do not own this concept.</li> ");
    }

    if (thing == framework) {
        $("#sidebarUnlink").hide();
        $("#sidebarRemove").hide();
    }

    if (selectedRelation == null) {
        $("#sidebarUnlink").prop('disabled', true);
    }

    if (selectedCompetency != null) {
        $('.ceasnCompetency .editMode').show();
    } else {
        $('.ceasnCompetency').hide();
    }

}
