//For touch drag
var globalTouchDragDestinationConcept = null;
var globalTouchDragDataConcept = null;

populateConceptScheme = function (subsearch) {
    treeTop = $("#tree").scrollTop();
    $("#tree").hide().html("");
    if (!isFirstEdit && EcRepository.getBlocking(framework.id).type == "EncryptedValue") {
        $("#private").prop("checked", true);
    }
    else if (framework["skos:hasTopConcept"] && EcRepository.getBlocking(framework.id).type == "EncryptedValue") {
        $("#private").prop("checked", true);
    }
    else if (isFirstEdit && selectedCompetency == null && queryParams.private == "true") {
        $("#private").prop("checked", true);
    }
    else {
        $("#private").prop("checked", false);
    }
    var frameworkName = framework["dcterms:title"];
    frameworkName = EcArray.isArray(frameworkName) ? frameworkName : [frameworkName];
    $("#editFrameworkSection #frameworkAKA").children().remove();
    $("#editFrameworkSection #frameworkName").text(Thing.getDisplayStringFrom(frameworkName));
    for (var i = 1; i < frameworkName.length; i++) {
        $("#editFrameworkSection #frameworkAKA").append($('<span>AKA: ' + Thing.getDisplayStringFrom(frameworkName[i]) + '</span>'));
    }
    $("#editFrameworkSection #frameworkCount").hide();
    var frameworkDescription = framework["dcterms:description"];
    frameworkDescription = EcArray.isArray(frameworkDescription) ? frameworkDescription : [frameworkDescription];
    $("#editFrameworkSection #frameworkDescription").children().remove();
    for (var i in frameworkDescription) {
        if (frameworkDescription[i] != null && frameworkDescription[i] != 'NULL' && frameworkDescription[i] != ''){
            $("#editFrameworkSection #frameworkDescription").append($('<span>' + Thing.getDisplayStringFrom(frameworkDescription[i]) + '</span>'));
        }
    }
    try {
        if (framework.getTimestamp() == null || isNaN(framework.getTimestamp()))
            if (framework["schema:dateModified"] != null && framework["schema:dateModified"] !== undefined)
                $("#editFrameworkSection #frameworkLastModified").text("Last modified " + moment(new Date(framework["schema:dateModified"])).fromNow() + ".").show();
            else
                $("#editFrameworkSection #frameworkLastModified").hide();
        else
            $("#editFrameworkSection #frameworkLastModified").text("Last modified " + moment(new Date(framework.getTimestamp())).fromNow() + ".").show();
    } catch (e) {}
    try {
        if (framework["schema:dateCreated"] != null && framework["schema:dateCreated"] !== undefined)
            $("#editFrameworkSection #frameworkCreated").text("Created " + moment(new Date(framework["schema:dateCreated"])).fromNow() + ".").show();
        else
            $("#editFrameworkSection #frameworkCreated").hide();
    } catch (e) {}
    if (queryParams.link == "true")
        $("#editFrameworkSection #frameworkLink").attr("href", framework.shortId()).show();

    if (framework["skos:hasTopConcept"] == null)
        framework["skos:hasTopConcept"] = [];
    if (framework["skos:hasTopConcept"].length == 0) {
        if ($("#tree").html() == "")
            $("#tree").html("<br><br><center><h3>This concept scheme is empty.</h3></center>");
        showPage("#editFrameworkSection", framework);
    } else {
        new EcAsyncHelper().each(framework["skos:hasTopConcept"], function(conceptId, done) {
            EcConcept.get(conceptId, function (c) {
                refreshConcept(c, null, subsearch, null, done);
            }, done);
        }, function (conceptIds) {
            afterConceptRefresh();
        });
    }
}

function afterConceptRefresh(level, subsearch) {
    showPage("#editFrameworkSection", framework);
    $("#tree").show().scrollTop(treeTop);
    if (selectedCompetency !== null) {
        highlightSelected($("[id=\"" + selectedCompetency.shortId() + "\"]"));
        if ($(".selected").length > 0)
            $(".selected").get(0).scrollIntoView(false);
    }
    var sort = function () {
        $(this).children().sort(function (a, b) {
            var ax = null;
            var bx = null;
            if (framework["skos:hasTopConcept"].indexOf(a.getAttribute('id')) != -1) {
                ax = framework["skos:hasTopConcept"].indexOf(a.getAttribute('id'));
                bx = framework["skos:hasTopConcept"].indexOf(b.getAttribute('id'));
            }
            else {
                var parentA = a.parentNode.parentNode;
                var parentB = b.parentNode.parentNode;
                if (parentA == parentB && parentA.getAttribute('id').indexOf("http") != -1) {
                    parentA = EcConcept.getBlocking(parentA.getAttribute('id'));
                    ax = parentA["skos:narrower"].indexOf(a.getAttribute('id'));
                    bx = parentA["skos:narrower"].indexOf(b.getAttribute('id'));
                }
            }
            return ax - bx;
        }).detach().appendTo($(this));
    };
    $("#tree").each(sort).find("ul").each(sort);
    collapseCompetencies();
}

function refreshConcept(col, level, subsearch, recurse, done) {
    if (recurse == null) recurse = [];
    if (EcArray.has(recurse, col.shortId())) {
        return;
    }
    recurse.push(col.shortId());
    var treeNode = null;
    if ($("#tree [id='" + col.shortId() + "']").length > 0) {
        treeNode = $("[id='" + col.shortId() + "']");
        treeNode.remove();
    }
    treeNode = $("#tree").append("<li class = 'competency' draggable='true' ondragstart='dragConcept(event);' ontouchstart='handleTouchStartConcept(event)' ontouchmove='handleTouchMoveConcept(event);' ontouchend='handleTouchEndConcept(event);' ondrop='dropConcept(event);' ondragover='allowConceptDrop(event);'><span></span><ul></ul></li>").children().last();
    treeNode.attr("id", col.shortId());
    if (col["skos:prefLabel"] != null && col["skos:prefLabel"] != "NULL" && col["skos:prefLabel"] != col["skos:definition"] && col["skos:definition"]) {
        var definition = col["skos:definition"];
        definition = EcArray.isArray(definition) ? definition : [definition];
        treeNode.children().first().prepend("<small/>").children().first().addClass("competencyDescription").css('display', 'block').text(Thing.getDisplayStringFrom(definition));
    }
    var prefLabel = col["skos:prefLabel"];
    prefLabel = EcArray.isArray(prefLabel) ? prefLabel : [prefLabel];
    treeNode.children().first().prepend("<span/>").children().first().addClass("competencyName").text(Thing.getDisplayStringFrom(prefLabel));
    if (queryParams.link == "true")
        treeNode.prepend(" <a style='float:right;' target='_blank'><i class='fa fa-link' aria-hidden='true'></a>").children().first().attr("href", col.shortId());
    if (queryParams.select != null)
        treeNode.prepend("<input type='checkbox' tabIndex='-1'>");
    if (subsearch != null)
        treeNode.mark(subsearch);
    treeNode.prepend("<span/>").children().first().addClass("collapse").css("visibility", "hidden").html('<i class="fa fa-minus-square" aria-hidden="true"></i> ');
    if (col["skos:narrower"] != null && col["skos:narrower"].length > 0) {
        if (!$(".competency[id=\"" + col.shortId() + "\"]").hasClass("expandable"))
            $(".competency[id=\"" + col.shortId() + "\"]").addClass("expandable").children(".collapse").css("visibility", "visible");
        new EcAsyncHelper().each(col["skos:narrower"], function(conceptId, callback) {
            EcConcept.get(conceptId, function (c) {
                refreshConcept(c, level, subsearch, JSON.parse(JSON.stringify(recurse)), callback).appendTo(treeNode.children("ul"));
            }, callback);
        }, function (conceptIds) {
            afterConceptRefresh();
        });
    }
    if (done != null && done !== undefined) {
        done();
    }
    return treeNode;
}

editConceptSidebar = function () {
    $("#detailSlider").addClass("detailSliderEdit").removeClass("detailSliderView");
    $("#editFrameworkSection label").css("display", "");
    $("#sidebarNameInputLabel").addClass("required");

    changedFields = {};
    ulLengths = {};

    //Don't persist the invalidInput class between edits
    $('.invalidInput').each(function () {
        $(this).removeClass('invalidInput');
    });

    initULLengths();
    renderSidebar();

    $('.sidebarAccordion').removeClass('forceShow');

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

    if (thing["schema:dateCreated"] == null || thing["schema:dateCreated"] === undefined) {
        var timestamp;
        var date;
        if (!thing.id.substring(thing.id.lastIndexOf("/")).matches("\\/[0-9]+")) {
            timestamp = null;
        }
        else {
            timestamp = thing.id.substring(thing.id.lastIndexOf("/")+1);
        }
        if (timestamp != null) {
            date = new Date(parseInt(timestamp)).toISOString();
        }
        else {
            date = new Date().toISOString();
        }
        thing["schema:dateCreated"] = date;
    }

    if (thing == framework) {
        $("#sidebarUnlink").hide();
        $("#sidebarRemove").hide();
        if (EcIdentityManager.ids[0]) {
            $(".private").show();
            if (!isFirstEdit && EcRepository.getBlocking(framework.id).type == "EncryptedValue") {
                $("#private").prop("checked", true);
            }
            else if (framework.competency && EcRepository.getBlocking(framework.id).type == "EncryptedValue") {
                $("#private").prop("checked", true);
            }
            else if (isFirstEdit && selectedCompetency == null && queryParams.private == "true") {
                $("#private").prop("checked", true);
            }
            else {
                $("#private").prop("checked", false);
            }
        }
    }

    if (selectedCompetency != null) {
        $('.ceasnCompetency .editMode').show();
    } else {
        $('.ceasnCompetency').hide();
    }
    setDefaultLanguage();
    $("#detailSlider").find(".sidebarInputLanguageSelect").each(function () {
        if (!$(this).next().attr("value")) {
            $(this).val(defaultLanguage);
        }
    });
    $(".sidebar table").css("margin-top", "calc(" + $(".sidebarToolbar").height() + "px)");
}
