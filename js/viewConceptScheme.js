populateConceptScheme = function (subsearch) {
    if (conceptMode)
        return populateConceptScheme(subsearch);
    var me = this;
    treeTop = $("#tree").scrollTop();
    $("#tree").hide().html("");
    me.fetches = 0;
    $("#editFrameworkSection #frameworkName").text(framework.getName());
    if (queryParams.link == "true")
        $("#editFrameworkSection #frameworkLink").attr("href", framework.shortId()).show();

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
                EcCompetency.get(framework.competency[i], function (c) {
                    refreshCompetency(c, null, subsearch);
                }, fetchFailure);
            }
            me.fetches += framework.level.length;
            for (var i = 0; i < framework.level.length; i++) {
                EcLevel.get(framework.level[i], function (c) {
                    refreshCompetency(c, null, subsearch);
                }, fetchFailure);
            }
        }
    };
    repo.precache(framework.competency.concat(framework.relation), fun, fun);
}

function afterConceptSchemeRefresh(level, subsearch) {
    if (level == null) {
        this.fetches += framework.level.length;
        for (var i = 0; i < framework.level.length; i++) {
            EcLevel.get(framework.level[i], function (c) {
                refreshCompetency(c, null, subsearch);
            }, fetchFailure);
        }
        if (framework.level.length == 0)
            showPage("#editFrameworkSection", framework);
    } else
        showPage("#editFrameworkSection", framework);
    $("#tree").show().scrollTop(treeTop);
    if (selectedCompetency !== null) {
        highlightSelected($("[id=\"" + selectedCompetency.shortId() + "\"]"));
        $(".selected").parent().scrollTop($(".selected").parent().scrollTop() + $(".selected").position().top - 50);
    }
}


function refreshCompetency(col, level, subsearch) {
    var me = this;
    me.fetches--;
    var treeNode = null;
    if ($("#tree [id='" + col.shortId() + "']").length > 0) {
        treeNode = $("[id='" + col.shortId() + "']");
        treeNode.remove();
    }
    treeNode = $("#tree").append("<li class = 'competency' draggable='true' ondragstart='dragCompetency(event);' ondrop='dropCompetency(event);' ondragover='allowCompetencyDrop(event);'><span></span><ul></ul></li>").children().last();
    treeNode.attr("id", col.shortId());
    if (col.description != null && col.description != "NULL" && col.description != col.name)
        treeNode.children().first().prepend("<small/>").children().first().addClass("competencyDescription").css('display', 'block').text(col.getDescription());
    treeNode.children().first().prepend("<span/>").children().first().addClass("competencyName").text(col.getName());
    if (col.competency != null) {
        level = true;
        $(".competency[id=\"" + col.competency + "\"]").children().last().append($(".competency[id=\"" + col.shortId() + "\"]"));
        treeNode.children().first().append(" <small>(Performance Level)</small>");
        if (!$(".competency[id=\"" + col.competency + "\"]").hasClass("expandable"))
            $(".competency[id=\"" + col.competency + "\"]").addClass("expandable").prepend("<span/>").children().first().addClass("collapse").html('<i class="fa fa-minus-square" aria-hidden="true"></i> ');
    }
    if (queryParams.link == "true")
        treeNode.prepend(" <a style='float:right;' target='_blank'><i class='fa fa-link' aria-hidden='true'></a>").children().first().attr("href", col.shortId());
    if (queryParams.select != null)
        treeNode.prepend("<input type='checkbox' tabIndex='-1'>");
    if (subsearch != null)
        treeNode.mark(subsearch);
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
                                    $(".competency[id=\"" + relation.target + "\"]").addClass("expandable").prepend("<span/>").children().first().addClass("collapse").html('<i class="fa fa-minus-square" aria-hidden="true"></i> ');
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
                                    afterRefresh(level, subsearch);
                                }
                            }, fetchFailure);
                        }
                    }
                }, fetchFailure);
            }
        } else {
            if ($("#tree").html() == "")
                $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
            afterRefresh(level, subsearch);
        }
    }
}

refreshConceptSidebar = function () {
    if ($("#detailSlider").length == 0) return;

    $('#detailSlider').show();

    if (queryParams.export === 'true') {
        $('.export').show();
    }

    if (queryParams.ceasnDataFields === 'true') {
        $('#ceasnDataFields').show();
    }

    $('#ceasnDataFields').find('p').each(function () {
        $(this).text(null);
    });

    $('#ceasnDataFields').find('input').each(function () {
        $(this).val(null);
    });

    var thing = framework;
    if (selectedCompetency != null) {
        $('.ceasnCompetency .viewMode').show();
        thing = selectedCompetency;
    } else {
        $('.ceasnCompetency').hide();
    }
    $("sidebarFeedback").text("");
    $("#editFrameworkSection").find("button,input,textarea,select").prop('disabled', false);
    $("#editFrameworkSection .editMode").hide();
    $("#editFrameworkSection .viewMode").show();
    $("#editFrameworkSection #sidebarName").text(thing.getName());
    $("#editFrameworkSection #sidebarNameInput").val(thing.getName());
    $("#editFrameworkSection #sidebarDescription").text(thing.getDescription());
    $("#editFrameworkSection #sidebarDescriptionInput").val(thing.getDescription());
    $("#editFrameworkSection #sidebarInLanguage").text(thing["schema:inLanguage"]);
    $("#editFrameworkSection #sidebarInLanguageInput").val(thing["schema:inLanguage"]);
    $("#editFrameworkSection #sidebarCodedNotation").text(thing["schema:identifier"]);
    $("#editFrameworkSection #sidebarCodedNotationInput").val(thing["schema:identifier"]);
    $("#editFrameworkSection #sidebarCompetencyCategory").text(thing["http://schema.eduworks.com/ims/case/v1p0/CFItemType"]);
    $("#editFrameworkSection #sidebarCompetencyCategoryInput").val(thing["http://schema.eduworks.com/ims/case/v1p0/CFItemType"]);
    $("#editFrameworkSection #sidebarConceptKeyword").text(thing["schema:keywords"]);
    $("#editFrameworkSection #sidebarConceptKeywordInput").val(thing["schema:keywords"]);
    $("#editFrameworkSection #sidebarAuthor").text(thing["schema:author"]);
    $("#editFrameworkSection #sidebarAuthorInput").val(thing["schema:author"]);
    //    $("#editFrameworkSection #sidebarComment").text(thing.comment);
    //    $("#editFrameworkSection #sidebarCommentInput").val(thing.comment);
    $("#editFrameworkSection #sidebarCreator").text(thing["schema:creator"]);
    $("#editFrameworkSection #sidebarCreatorInput").val(thing["schema:creator"]);
    $("#editFrameworkSection #sidebarAlternativeCodedNotation").text(thing["ceasn:additionalType"]);
    $("#editFrameworkSection #sidebarAlternativeCodedNotationInput").val(thing["ceasn:additionalType"]);
    $("#editFrameworkSection #sidebarWeight").text(thing["ceasn:weight"]);
    $("#editFrameworkSection #sidebarWeightInput").val(thing["ceasn:weight"]);

    $("#editFrameworkSection label").each(function () {
        if ($("#" + $(this).attr("for")).text() == "" || $("#" + $(this).attr("for")).text() == null)
            $(this).hide();
    });

    if (framework == thing) {
        $(".frameworkOnly").show();
        $("#sidebarVersion").hide();
        $("#sidebarAddLevels").hide();
    }

    if (thing == selectedCompetency) {
        $(".frameworkOnly").hide();
        if (EcArray.has(framework.competency.concat(framework.level), thing.shortId()))
            $("#sidebarVersion option").prop('selected', false).first().prop('selected', true);
        else {
            if (EcArray.has(framework.competency.concat(framework.level), thing.id))
                $("#sidebarVersion option").prop('selected', false).last().prop('selected', true);
            else
                console.log("Error. Version not certain.");
        }
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
                $("#sidebarFeedback").html("Some edit options are limited: <li>You do not own this framework.</li> ");
            }

    if (!thing.canEditAny(EcIdentityManager.getMyPks())) {
        $("#sidebarNameInput").prop('disabled', true);
        $("#sidebarDescriptionInput").prop('disabled', true);
        $("#sidebarSave").prop('disabled', true);
        $("#sidebarDelete").prop('disabled', true);
        if (thing == framework) {
            $("#sidebarFeedback").html("Some edit options are limited: <li>You do not own this framework.</li> ");
        } else
            $("#sidebarFeedback").append("<li>You do not own this competency.</li> ");
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

    var competencies = [];
    var autocompleteDict = {};

    $('.competencyName').each(function () {
        var competency = $(this)[0].parentElement.parentElement;
        if (!autocompleteDict.hasOwnProperty($(this).text())) {
            competencies.push($(this).text());
        }
        autocompleteDict[$(this).text()] = competency.id;

    });

    $('#sidebarNameInput').autocomplete({
        source: competencies,
        select: function (event, ui) {
            var competency = EcRepository.getBlocking(autocompleteDict[ui.item.value]);
            var results = [];
            results.push(competency.id);

            //Delete the default created competency if selecting an existing one from dropdown
            framework.removeCompetency(selectedCompetency.shortId());
            framework.removeLevel(selectedCompetency.shortId());
            conditionalDelete(selectedCompetency.shortId());

            appendCompetencies(results, true);
        }
    });
}
