/*
 Copyright 2017 Credential Engine and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

if (queryParams.select != null) {
    $("#selectButton").show().text(queryParams.select);
    $("#selectAllButton").show();
}
if (queryParams.singleSelect != null) {
    $("#selectButton").show().text(queryParams.singleSelect);
}

var framework = null;
var selectedCompetency = null;
var selectedRelation = null;
//For keyboard controls
var frameworkSelectionIndex = null;
var competencySelectionIndex = null;

fetchFailure = function (failure) {
    this.fetches--;
    error(failure);
    if (this.fetches == 0) {
        if ($("#tree").html() == "")
            if (conceptMode)
                $("#tree").html("<br><br><center><h3>This scheme is empty.</h3></center>");
            else
                $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
        afterRefresh(true);
    }
};

function select() {
    var ary = [];
    if ($("input:checkbox").length == 0)
        if (selectedCompetency != null)
            ary.push(selectedCompetency.shortId());
    $("input:checked").parent().each(function (f) {
        ary.push($(this).attr("id"));
        var rId = $(this).attr("relationId");
        if (rId != null && rId !== undefined && rId != "")
            if (queryParams.selectRelations == "true")
                ary.push(rId);
    });
    var message = {
        message: "selected",
        selected: ary
    };
    console.log(message);
    parent.postMessage(message, queryParams.origin);
}

function handleSelectAll(status) {
    if (status === 'select') {
        selectAll();
        $('#selectAllButton').attr('status', 'deselect');
    } else {
        deselectAll();
        $('#selectAllButton').attr('status', 'select');
    }
}

function deselectAll() {
    $('#tree').find('input').each(function () {
        $(this).prop('checked', false);
    });
}

function selectAll() {
    $('#tree').find('input').each(function () {
        $(this).prop('checked', true);
    });
}

var treeTop = 0;
populateFramework = function (subsearch) {
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

function afterRefresh(level, subsearch) {
    if (conceptMode)
        return afterConceptRefresh(level, subsearch);
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
        if ($(".selected").length > 0)
            $(".selected").parent().scrollTop($(".selected").parent().scrollTop() + $(".selected").position().top - 50);
    }
}

function refreshCompetency(col, level, subsearch) {
    if (conceptMode)
        return refreshConcept(col, level, subsearch);
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

refreshSidebar = function () {
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

    var labelChoice = null;
    var fieldChoice = null;
    var inputChoice = null;
    var safeChoice = null;

    if (thing == selectedCompetency) {
        labelChoice = "cassCompetency";
        fieldChoice = "cassCompetency";
        inputChoice = "cassCompetency";
        safeChoice = "cassCompetency";
    } else {
        labelChoice = "cassFramework";
        fieldChoice = "cassFramework";
        inputChoice = "cassFramework";
        safeChoice = "cassFramework";
    }
    if (queryParams.ceasnDataFields == 'true') {
        if (thing == selectedCompetency) {
            labelChoice = "ceasnCompetency";
            $(".ceasnCompetency").show();
            $(".ceasnFramework").hide();
        } else {
            labelChoice = "ceasnFramework";
            $(".ceasnCompetency").hide();
            $(".ceasnFramework").show();
        }
        $('#ceasnDataFields').find('p').text(null);
        $('#ceasnDataFields').find('input').val(null);
    }
    if (conceptMode) {
        if (thing == selectedCompetency) {
            labelChoice = "skosCompetency";
            fieldChoice = "skosCompetency";
            inputChoice = "skosCompetency";
        } else {
            labelChoice = "skosFramework";
            fieldChoice = "skosFramework";
            inputChoice = "skosFramework";
        }
    }

    $("#detailSlider label").each(function () {
        var label = $(this).attr(labelChoice);
        if (label != null)
            $(this).text(label);
    });
    $("#detailSlider p,h3").each(function () {
        if (!$(this).next().is("input,textarea"))
            return;
        var val = thing[$(this).next().attr(fieldChoice)];
        if (EcArray.isArray(val))
            val = val.join(", ");
        if (val === undefined || val == null || val == "")
            $(this).html("");
        else
            $(this).text(val);
    });
    $("#detailSlider input,textarea").each(function () {
        if ($(this).attr(safeChoice) != null && ($(this).attr(labelChoice) == null || $(this).attr(labelChoice) === undefined)) {
            $(this).prev().prev().remove();
            $(this).prev().remove();
            $(this).remove();
            return;
        }
        var val = thing[$(this).attr(inputChoice)];
        if (val === undefined || val == null || val == "")
            if ($(this).attr("defaultToFramework") != null)
                val = framework[$(this).attr(inputChoice)];
        if (EcArray.isArray(val))
            val = val.join(", ");
        if (val === undefined || val == null || val == "") {
            $(this).val(null);
        } else
            $(this).val(val);
    });
    $("#detailSlider button").each(function () {
        if ($(this).attr(safeChoice) != null && ($(this).attr(labelChoice) == null || $(this).attr(labelChoice) === undefined)) {
            $(this).prev().prev().remove();
            $(this).prev().remove();
            $(this).remove();
            return;
        }
        var val = thing[$(this).attr(inputChoice)];
        if (val === undefined || val == null || val == "")
            $(this).val(null);
        else
            $(this).val(val);
    });
    $("#detailSlider select").each(function () {
        if ($(this).attr(safeChoice) != null && ($(this).attr(labelChoice) == null || $(this).attr(labelChoice) === undefined)) {
            $(this).prev().prev().remove();
            $(this).prev().remove();
            $(this).remove();
            return;
        }
        var val = thing[$(this).attr(inputChoice)];
        if (val === undefined || val == null || val == "")
            $(this).find("option").prop('selected', false).first().prop('selected', true);
        else {
            $(this).find("option").prop('selected', false);
            $(this).find("option[value=\"" + val + "\"]").prop('selected', true);
        }
    });

    $("#editFrameworkSection label:visible").each(function () {
        if ($(this).parent().children("#" + $(this).attr("for")).text() == "" || $(this).parent().children("#" + $(this).attr("for")).text() == null)
            $(this).hide();
    });

    if (framework == thing) {
        $(".frameworkOnly").show();
        $("#sidebarVersion").hide();
        $("#sidebarAddLevels").hide();
        if (queryParams.ceasnDataFields === 'true') {
            $(".absentForCeasn").hide();
        }
    }

    if (thing == selectedCompetency) {
        $(".frameworkOnly").hide();
        if (framework.competency != null)
            if (EcArray.has(framework.competency.concat(framework.level), thing.shortId()))
                $("#sidebarVersion option").prop('selected', false).first().prop('selected', true);
            else {
                if (EcArray.has(framework.competency.concat(framework.level), thing.id))
                    $("#sidebarVersion option").prop('selected', false).last().prop('selected', true);
                else
                    console.log("Error. Version not certain.");
            }
        if (queryParams.ceasnDataFields === 'true') {
            $(".absentForCeasn").hide();
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

editSidebar = function () {
    if (conceptMode)
        return editConceptSidebar();

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

$("body").on("click", ".collapse", null, function (evt) {
    $(this).parent().children("ul").slideToggle();

    if ($(this).hasClass('collapsed')) {
        $(this).removeClass('collapsed');
        $(this).html('<i class="fa fa-minus-square" aria-hidden="true"></i> ');
    } else {
        $(this).addClass('collapsed');
        $(this).html('<i class="fa fa-plus-square" aria-hidden="true"></i> ');
    }
});


$("body").on("click", ".competency input", null, function (evt) {
    evt.stopPropagation();
    $(evt.target).parent().find("input").prop("checked", evt.target.checked);
}).on("click", ".competency", null, function (evt) {
    var me = $(this);
    if (!$(this).hasClass("competency"))
        me = $(this).parents("competency");

    highlightSelected(me);

    if (conceptMode) {
        selectedCompetency = EcConcept.getBlocking(me.attr("id"));
    } else {
        selectedCompetency = EcCompetency.getBlocking(me.attr("id"));
        if (selectedCompetency == null)
            selectedCompetency = EcLevel.getBlocking(me.attr("id"));
        var relationId = me.attr("relationid");
        if (relationId != null && relationId != "")
            selectedRelation = EcAlignment.getBlocking(me.attr("relationid"));
        else
            selectedRelation = null;
    }
    refreshSidebar();
    evt.stopPropagation();
});

$('body').on('click', '#frameworkName', function (evt) {
    highlightSelected($('#frameworkNameContainer'));
});

$('body').on('dragover', '.competency', function (evt) {
    $(this).addClass('selected');
});

$('body').on('dragleave', '.competency', function (evt) {
    $(this).removeClass('selected');
});

$('body').on('dragstart', '.competency', function (evt) {
    $(evt.target).click();
});

$('body').on('dragenter', '#frameworkNameContainer', function (evt) {
    evt.preventDefault();
});

$('body').on('dragover', '#frameworkNameContainer', function (evt) {
    evt.preventDefault();
    $(this).addClass('selected');
});

$('body').on('dragleave', '#frameworkNameContainer', function (evt) {
    $(this).removeClass('selected');
});

$('html').keydown(function (evt) {
    if (!$('input').is(':focus') && !$('select').is(':focus') && !$('textarea').is(':focus')) {
        //If we're on the framework selection screen
        if ($('#frameworksSection').css('display') === 'block') {
            var frameworkElementArray = document.getElementsByTagName('p');
            if (frameworkSelectionIndex === null) {
                frameworkSelectionIndex = 0;
                $('#frameworks').find('.selected').each(function () {
                    $(this).removeClass('selected');
                });
                frameworkElementArray[frameworkSelectionIndex].classList.add('selected');
                return;
            }
            //On Down arrow
            if (evt.which === 40) {
                if (frameworkSelectionIndex < frameworkElementArray.length)
                    frameworkSelectionIndex++;
                //clear any existing selected
                $('#frameworks').find('.selected').each(function () {
                    $(this).removeClass('selected');
                });
                frameworkElementArray[frameworkSelectionIndex].classList.add('selected');
                $(".selected").parent().scrollTop($(".selected").parent().scrollTop() + $(".selected").position().top - 100);
            }
            //On Up arrow
            else if (evt.which === 38) {
                if (frameworkSelectionIndex > 0)
                    frameworkSelectionIndex--;
                $('#frameworks').find('.selected').each(function () {
                    $(this).removeClass('selected');
                });
                frameworkElementArray[frameworkSelectionIndex].classList.add('selected');
                $(".selected").parent().scrollTop($(".selected").parent().scrollTop() + $(".selected").position().top - 100);
            }
            //On enter
            else if (evt.which === 13) {
                $(frameworkElementArray[frameworkSelectionIndex]).click();
                frameworkSelectionIndex = null;
            }
        }
        //If we're on the editFrameworks section
        else if ($('#editFrameworkSection').css('display') === 'block') {
            var competencyElementArray = $('#tree').find('.competency:visible');
            if (competencySelectionIndex === null) {
                competencySelectionIndex = -1;
                $('#frameworkName').click();
                return;
            }
            //On down arrow
            if (evt.which === 40) {
                $('button').blur();
                if (competencySelectionIndex < competencyElementArray.length)
                    competencySelectionIndex++;
                $(competencyElementArray[competencySelectionIndex]).click();
                $('#tree').scrollTop($('#tree').scrollTop() + $('.selected').position().top - 100);
            }
            //On up arrow
            else if (evt.which === 38) {
                $('button').blur();
                if (competencySelectionIndex >= 0)
                    competencySelectionIndex--;
                if (competencySelectionIndex >= 0)
                    $(competencyElementArray[competencySelectionIndex]).click();
                else
                    $('#frameworkName').click();
                $('#tree').scrollTop($('#tree').scrollTop() + $('.selected').position().top - 100);
            }
            //On left and right arrows
            else if (evt.which === 39) {
                $('button').blur();
                $(competencyElementArray[competencySelectionIndex]).find('.collapse').click();
                $(".selected").parent().scrollTop($(".selected").parent().scrollTop() + $(".selected").position().top - 50);

            } else if (evt.which === 37) {
                $('button').blur();
                $(competencyElementArray[competencySelectionIndex]).find('.collapse').click();
                $(".selected").parent().scrollTop($(".selected").parent().scrollTop() + $(".selected").position().top - 50);
            }
            //On Backspace
            else if (evt.which === 8) {
                $('#editFrameworkBack').click();
            }
            //On Enter
            else if (evt.which === 13) {
                if (queryParams.select != null) {
                    if (evt.shiftKey)
                        $('#selectAllButton').click();
                    else
                        $(competencyElementArray[competencySelectionIndex]).children("input").click();
                }
            }
            //Shift+C
            else if (evt.which === 67) {
                if (evt.shiftKey) {
                    dragShortcut($('.selected'), true);
                }
            }
            //Shift+X
            else if (evt.which === 88) {
                if (evt.shiftKey) {
                    dragShortcut($('.selected'), false);
                }
            }
            //Shift+V
            else if (evt.which === 86) {
                if (evt.shiftKey) {
                    dropShortcut($('.selected'));
                }
            }
            //Shift+U
            else if (evt.which === 85) {
                if (evt.shiftKey) {
                    unlinkCompetency();
                }
            }

        }
    } else {
        //On escape
        if (evt.which === 27) {
            $('input').blur();
            $('select').blur();
        }
    }
});

exportSelected = function () {
    var v = $("#sidebarExport").val();
    var link;
    var guid;
    if (selectedCompetency != null) {
        if (EcRepository.shouldTryUrl(selectedCompetency.id) == false) {
            link = repo.selectedServer + "data/" + EcCrypto.md5(selectedCompetency.id);
            guid = EcCrypto.md5(selectedCompetency.id);
        } else {
            link = selectedCompetency.id;
            guid = selectedCompetency.getGuid();
        }
    } else {
        if (EcRepository.shouldTryUrl(framework.id) == false) {
            link = repo.selectedServer + "data/" + EcCrypto.md5(framework.id);
            guid = EcCrypto.md5(framework.id);
        } else {
            link = framework.id;
            guid = framework.getGuid();
        }
    }
    if (v == "asn")
        window.open(link.replace("/data/", "/asn/"), '_blank');
    else if (v == "cass")
        window.open(link, '_blank');
    else if (v == "cassn4") {
        $.ajax({
            url: link,
            headers: {
                "Accept": "text/n4"
            },
            success: function (data) {
                if (conceptMode)
                    download(framework.title + ".n4", data);
                else
                    download(framework.name + ".n4", data);
            }
        });
    } else if (v == "cassrdfjson") {
        $.ajax({
            url: link,
            headers: {
                "Accept": "application/rdf+json"
            },
            success: function (data) {
                if (conceptMode)
                    download(framework.title + ".rdf.json", JSON.stringify(data, null, 2));
                else
                    download(framework.name + ".rdf.json", JSON.stringify(data, null, 2));
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
                    download(framework.title + ".rdf.xml", data);
                else
                    download(framework.name + ".rdf.xml", data);
            }
        });
    } else if (v == "cassturtle") {
        $.ajax({
            url: link,
            headers: {
                "Accept": "text/turtle"
            },
            success: function (data) {
                if (conceptMode)
                    download(framework.title + ".turtle", data);
                else
                    download(framework.name + ".turtle", data);
            }
        });
    } else if (v == "ceasn")
        window.open(link.replace("/data/", "/ceasn/"), '_blank');
    else if (v == "csv") {
        CSVExport.exportFramework(framework.id, console.log, console.log);
    } else if (v == "case")
        if (selectedCompetency == null)
            window.open(repo.selectedServer + "ims/case/v1p0/CFDocuments/" + guid, '_blank');
        else
            window.open(repo.selectedServer + "ims/case/v1p0/CFItems/" + guid, '_blank');

}

viewJSON = function () {
    var link;
    if (selectedCompetency !== null) {
        link = selectedCompetency.id;
    } else {
        link = framework.id;
    }
    var redirect = window.open(link, '_blank');
    redirect.location;
}
