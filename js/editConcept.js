addConcept = function () {
    if (conceptMode) return addConcept();
    if (viewMode) return;
    var addOrSearch = $("#sidebarAddCompetencies").val();
    if (addOrSearch == "search") {
        showPage("#findCompetencySection", framework);
    } else if (addOrSearch == "new") {
        previousSelectedCompetency = selectedCompetency;
        var c = new EcCompetency();
        c.generateId(repo.selectedServer);
        framework.addCompetency(c.id);
        if (EcIdentityManager.ids.length > 0)
            c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        c.name = "New Competency";
        EcRepository.save(c, function () {
            if (selectedCompetency != null) {
                var r = new EcAlignment();
                r.generateId(repo.selectedServer);
                r.target = selectedCompetency.shortId();
                r.source = c.shortId();
                r.relationType = Relation.NARROWS;
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                framework.addRelation(r.id);
                EcRepository.save(r, function () {
                    EcRepository.save(framework, function () {
                        selectedCompetency = c;
                        refreshSidebar();
                        editSidebar();
                        $("#sidebarNameInput").focus();
                        afterSave();
                    }, error);
                }, error);
            } else {
                EcRepository.save(framework, function () {
                    selectedCompetency = c;
                    refreshSidebar();
                    editSidebar();
                    $("#sidebarNameInput").focus();
                    afterSave();
                }, error);
            }
        }, error);
    }
}

saveConcept = function () {
    if (conceptMode) return saveConcept();
    if (viewMode) return;
    if (selectedCompetency == null) {
        framework.name = getValueOrNull($("#sidebarNameInput").val());
        framework.description = getValueOrNull($("#sidebarDescriptionInput").val());

        framework["schema:inLanguage"] = getValueOrNull($("#sidebarInLanguageInput").val()) === null ? null : $("#sidebarInLanguageInput").val().split(',');
        framework["schema:author"] = getValueOrNull($("#sidebarAuthorInput").val()) === null ? null : $("#sidebarAuthorInput").val().split(',');
        framework["schema:creator"] = getValueOrNull($("#sidebarCreatorInput").val()) === null ? null : $("#sidebarCreatorInput").val().split(',');
        framework["schema:keywords"] = getValueOrNull($("#sidebarConceptKeywordInput").val()) === null ? null : $("#sidebarConceptKeywordInput").val().split(',');

        EcRepository.save(framework, function () {
            populateFramework();
        }, error);
    } else {
        selectedCompetency.name = $("#sidebarNameInput").val();
        selectedCompetency.description = $("#sidebarDescriptionInput").val();

        selectedCompetency["schema:inLanguage"] = getValueOrNull($("#sidebarInLanguageInput").val()) === null ? null : $("#sidebarInLanguageInput").val().split(',');
        selectedCompetency["schema:identifier"] = getValueOrNull($("#sidebarCodedNotationInput").val());
        selectedCompetency["http://schema.eduworks.com/ims/case/v1p0/CFItemType"] = getValueOrNull($("#sidebarCompetencyCategory").val()) === null ? null : $("#sidebarCompetencyCategory").val().split(',');
        selectedCompetency["schema:author"] = getValueOrNull($("#sidebarAuthorInput").val()) === null ? null : $("#sidebarAuthorInput").val().split(',');
        //selectedCompetency.comment = getValueOrNull($("#sidebarCommentInput").val());
        selectedCompetency["schema:creator"] = getValueOrNull($("#sidebarCreatorInput").val()) === null ? null : $("#sidebarCreatorInput").val().split(',');
        selectedCompetency["ceasn:additionalType"] = getValueOrNull($("#sidebarAlternativeCodedNotationInput").val()) === null ? null : $("#sidebarAlternativeCodedNotationInput").val().split(',');
        selectedCompetency["schema:keywords"] = getValueOrNull($("#sidebarConceptKeywordInput").val()) === null ? null : $("#sidebarConceptKeywordInput").val().split(',');
        selectedCompetency["ceasn:weight"] = getValueOrNull($("#sidebarWeightInput").val());

        EcRepository.save(selectedCompetency, afterSave, error);
    }
    refreshSidebar();
}

createConceptScheme = function () {
    if (conceptMode) return createConceptScheme();
    if (viewMode) return;
    if ($("#name").val() == null || $("#name").val().trim() == "")
        return;
    framework = new EcFramework();
    framework.generateId(repo.selectedServer);
    if (EcIdentityManager.ids.length > 0)
        framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
    framework.name = $("#name").val();
    if ($("#description").val() != null && $("#description").val() != "")
        framework.description = $("#description").val();
    loading("Creating framework...");
    EcRepository.save(framework, function () {
        refreshSidebar();
        populateFramework();
        highlightSelected($('#frameworkNameContainer'));
    }, error);
}

unlinkConcept = function () {
    if (conceptMode) return unlinkConcept();
    if (viewMode) return;
    framework.removeRelation(selectedRelation.shortId());
    conditionalDelete(selectedRelation.shortId());
    selectedRelation = null;
    EcRepository.save(framework, afterSave, console.log);
    refreshSidebar();
}

deleteConcept = function () {
    if (conceptMode) return deleteConcept();
    if (viewMode) return;
    if (selectedCompetency == null) {
        showConfirmDialog(function (confirmed) {
            if (confirmed === true) {
                EcRepository._delete(framework, function (success) {
                    if (defaultPage == "#frameworksSection")
                        searchFrameworks(createParamObj(5000));
                    else
                        showPage(defaultPage);
                    //Delete the framework, delete all non-used stuff.
                    if (framework.competency != null)
                        for (var i = 0; i < framework.competency.length; i++)
                            conditionalDelete(framework.competency[i]);
                    if (framework.relation != null)
                        for (var i = 0; i < framework.relation.length; i++)
                            conditionalDelete(framework.relation[i]);
                    if (framework.level != null)
                        for (var i = 0; i < framework.level.length; i++)
                            conditionalDelete(framework.level[i]);
                    framework = null;
                    selectedCompetency = null;
                }, console.log);
            }
            hideConfirmDialog();
        }, "Are you sure you want to delete this framework? This will also delete all objects referenced in this framework that aren't found in other frameworks on this server.");
    } else {
        showConfirmDialog(function (confirmed) {
            if (confirmed === true) {
                framework.removeCompetency(selectedCompetency.shortId());
                framework.removeLevel(selectedCompetency.shortId());
                selectedRelation = null;
                conditionalDelete(selectedCompetency.shortId());
                selectedCompetency = null;
                EcRepository.save(framework, afterSave, console.log);
                refreshSidebar();
            }
            hideConfirmDialog();
        }, "Are you sure you want to delete this competency? This will remove the competency from the system entirely, not just from your framework.", "delete", selectedCompetency.shortId());
    }
}

dragConceptShortcut = function (element, isCopy) {
    if (conceptMode) return dragConceptShortcut();
    if (viewMode) return;
    dragShortcutData = {
        competencyId: $(element).attr('id'),
        relationId: $(element).attr('relationid'),
        isCopy: isCopy
    };
}

dropConceptShortcut = function (element) {
    if (conceptMode) return dropConceptShortcut();
    if (viewMode) return;
    if (dragShortcutData != null) {
        var targetData = {};
        var tgt = $(element);
        while (targetData.competencyId == null) {
            targetData.competencyId = tgt.attr('id');
            tgt = tgt.parent();
        }
        //Cut and paste
        if (!dragShortcutData.isCopy)
            if (dragShortcutData.relationId != null && dragShortcutData.relationId != '') {
                framework.removeRelation(dragShortcutData.relationId);
                conditionalDelete(targetData.relationId);
            }
        dropAny(dragShortcutData, targetData);
        dragShortcutData = null;
    }
}

dragConcept = function (ev) {
    if (conceptMode) return dragConcept();
    if (viewMode) return;
    ev.dataTransfer.setData("text", JSON.stringify({
        competencyId: $(ev.target).attr("id"),
        relationId: $(ev.target).attr("relationid")
    }));
}

dropAny = function (data, targetData) {
    //If data is a parent of targetData, we need to unlink targetData.
    //This is better rewritten than understood, unless you're Fritz or Mile.
    var targetNodes = $("[id=\"" + targetData.competencyId + "\"]");
    if (targetNodes.parents("[id=\"" + data.competencyId + "\"]").length > 0) {
        //OK I found some possible loops. Go find me the actual loops and nuke some connections to make what I commanded possible.
        targetNodes.parents("[id=\"" + data.competencyId + "\"]").find("[id=\"" + targetData.competencyId + "\"]").each(function () {
            framework.removeRelation($(this).attr("relationId"));
            conditionalDelete($(this).attr("relationId"));
        });
    }

    if (data.competencyId == targetData.competencyId) return;
    var thing = EcRepository.getBlocking(data.competencyId);
    if (thing.isAny(new EcLevel().getTypes())) {
        thing.competency = targetData.competencyId;
        EcRepository.save(thing, function () {
            if (webSocketConnection == false)
                populateFramework();
        }, error);
    } else if (thing.isAny(new EcCompetency().getTypes())) {
        var r = new EcAlignment();
        r.generateId(repo.selectedServer);
        r.target = EcRemoteLinkedData.trimVersionFromUrl(targetData.competencyId);
        r.source = thing.shortId();
        if (r.target == r.source)
            return;
        r.relationType = Relation.NARROWS;
        if (EcIdentityManager.ids.length > 0)
            r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        framework.addRelation(r.id);
        r.save(function () {}, error);
        EcRepository.save(framework, function () {
            if (data.relationId != null && data.relationId !== undefined)
                conditionalDelete(data.relationId);
            if (webSocketConnection == false)
                populateFramework();
        }, error);
    }
}

dropConcept = function (ev) {
    if (conceptMode) return dropConcept();
    if (viewMode) return;
    ev.stopPropagation();
    var data = ev.dataTransfer.getData("text");
    if (data != null)
        data = JSON.parse(data);
    else
        return;
    ev.dataTransfer.clearData("text");

    var targetData = {};
    var tgt = $(ev.target);
    while (targetData.competencyId == null) {
        targetData.competencyId = tgt.attr("id");
        targetData.relationId = tgt.attr("relationid");
        tgt = tgt.parent();
    }
    if (!ev.shiftKey)
        if (data.relationId != null && data.relationId != "") {
            framework.removeRelation(data.relationId);
            conditionalDelete(targetData.relationId);
        }
    dropAny(data, targetData);
}

allowConceptDrop = function (ev) {
    if (conceptMode) return allowConceptDrop();
    if (viewMode) return;
    ev.preventDefault();
}

conditionalDelete = function (id, depth) {
    if (viewMode) return;
    if (depth == undefined || depth == null) depth = 0;
    if (id == null || id == undefined)
        console.trace("ID is undefined.");
    if (depth < 5)
        setTimeout(function () {
            EcFramework.search(repo, "\"" + id + "\"", function (results) {
                if (results.length <= 0) {
                    console.log("No references found for " + id + "... deleting.");
                    EcRepository._delete(EcRepository.getBlocking(id), afterSave, console.log);
                } else {
                    console.log(results.length + " references found for " + id + "... Not deleting. Will see again in another second.");
                    conditionalDelete(id, depth + 1);
                }
            }, console.error, {});
        }, 1000);
}
