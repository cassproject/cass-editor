var viewMode = false;
if (queryParams.view == "true") {
    viewMode = true;
    $(".editControl").remove();
    if (queryParams.ceasnDataFields == null) {
        $("#editFrameworkSection").removeClass("pageWithSidebar");
        $("#detailSlider").remove();
        EcRepository.cachingSearch = true;
    }
}

addCompetency = function () {
    if (viewMode) return;
    var addOrSearch = $("#sidebarAddCompetencies").val();
    if (addOrSearch == "search") {
        showPage("#findCompetencySection", framework);
    } else if (addOrSearch == "new") {
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
                    }, error);
                }, error);
            } else {
                EcRepository.save(framework, function () {
                    selectedCompetency = c;
                    refreshSidebar();
                    editSidebar();
                    $("#sidebarNameInput").focus();
                }, error);
            }
        }, error);
    }
}

appendCompetencies = function (results) {
    if (viewMode) return;
    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (thing.isAny(new EcCompetency().getTypes())) {
            framework.addCompetency(thing.shortId());
        } else if (thing.isAny(new EcLevel().getTypes())) {
            framework.addLevel(thing.shortId());
        }
    }
    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (thing.isAny(new EcAlignment().getTypes())) {
            if (EcArray.has(framework.competency, thing.source))
                if (EcArray.has(framework.competency, thing.target)) {
                    framework.addRelation(thing.shortId());
                    EcArray.setRemove(results, thing.source);
                }
        }
    }

    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (thing.isAny(new EcCompetency().getTypes()))
            if (selectedCompetency != null) {
                var r = new EcAlignment();
                r.generateId(repo.selectedServer);

                r.target = selectedCompetency.shortId();
                r.source = thing.shortId();
                r.relationType = Relation.NARROWS;
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());

                if (r.source != r.target) {
                    framework.addRelation(r.id);
                    EcRepository.save(r, function () {}, error);
                }
            }
    }

    EcRepository.save(framework, function () {
        refreshSidebar();
        $("#sidebarNameInput").focus();
    }, error);
}

addLevel = function () {
    if (viewMode) return;
    var addOrSearch = $("#sidebarAddLevels").val();
    if (addOrSearch == "search") {
        gotoPage("#findCompetencySection", framework);
    } else if (addOrSearch == "new") {
        var c = new EcLevel();
        c.generateId(repo.selectedServer);
        framework.addLevel(c.id);
        if (EcIdentityManager.ids.length > 0)
            c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        c.name = "New Level";
        c.competency = selectedCompetency.shortId();
        EcRepository.save(c, function () {
            EcRepository.save(framework, function () {
                selectedCompetency = c;
                refreshSidebar();
                editSidebar();
                $("#sidebarNameInput").focus();
            }, error);
        }, error);
    }
}

saveCompetency = function () {
    if (viewMode) return;
    if (selectedCompetency == null) {
        framework.name = $("#sidebarNameInput").val();
        framework.description = $("#sidebarDescriptionInput").val();
        framework["schema:inLanguage"] = $("#sidebarInLanguageInput").val();
        // framework.isPartOf = $("#sidebarIsPartOfInput").val();
        framework["schema:identifier"] = $("#sidebarCodedNotationInput").val();
        framework["http://schema.eduworks.com/ims/case/v1p0/CFItemType"] = $("#sidebarCompetencyCategoryInput").val();
        // framework["gemq:hasChild"] = $("#sidebarHasChildInput").val();
        // framework["gemq:isChildOf"] = $("#sidebarIsChildOfInput").val();
        framework.author = $("#sidebarAuthorInput").val();
        framework.comment = $("#sidebarCommentInput").val();
        framework.creator = $("#sidebarCreatorInput").val();
        // framework.dateCreated = $("#sidebarDateCreatedInput").val();
        framework.additionalType = $("#sidebarAlternativeCodedNotationInput").val();
        framework["schema:keywords"] = $("#sidebarConceptKeywordInput").val();

        EcRepository.save(framework, function () {
            populateFramework();
        }, error);
    } else {
        selectedCompetency.name = $("#sidebarNameInput").val();
        selectedCompetency.description = $("#sidebarDescriptionInput").val();
        selectedCompetency["schema:inLanguage"] = $("#sidebarInLanguageInput").val();
        // selectedCompetency.isPartOf = $("#sidebarIsPartOfInput").val();
        selectedCompetency["schema:identifier"] = $("#sidebarCodedNotationInput").val();
        selectedCompetency["http://schema.eduworks.com/ims/case/v1p0/CFItemType"] = $("#sidebarCompetencyCategoryInput").val();
        // selectedCompetency["gemq:hasChild"] = $("#sidebarHasChildInput").val();
        // selectedCompetency["gemq:isChildOf"] = $("#sidebarIsChildOfInput").val();
        selectedCompetency.author = $("#sidebarAuthorInput").val();
        selectedCompetency.comment = $("#sidebarCommentInput").val();
        selectedCompetency.creator = $("#sidebarCreatorInput").val();
        // selectedCompetency.dateCreated = $("#sidebarDateCreatedInput").val();
        selectedCompetency.additionalType = $("#sidebarAlternativeCodedNotationInput").val();
        selectedCompetency["schema:keywords"] = $("#sidebarConceptKeywordInput").val();

        EcRepository.save(selectedCompetency, function () {}, error);
    }
}

createFramework = function () {
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
        populateFramework();
    }, error);
}

setCompetencyConfigurationManagement = function () {
    if (viewMode) return;
    var addOrSearch = $("#sidebarVersion").val();
    if (addOrSearch == "version") {
        for (var i = 0; i < framework.competency.length; i++) {
            if (framework.competency[i] == selectedCompetency.shortId()) {
                framework.competency[i] = selectedCompetency.id;
                EcRepository.save(framework, refreshSidebar, error);
            }
        }
        for (var i = 0; i < framework.level.length; i++) {
            if (framework.level[i] == selectedCompetency.shortId()) {
                framework.level[i] = selectedCompetency.id;
                EcRepository.save(framework, refreshSidebar, error);
            }
        }
    } else if (addOrSearch == "noVersion") {

        for (var i = 0; i < framework.competency.length; i++) {
            if (framework.competency[i] == selectedCompetency.id) {
                framework.competency[i] = selectedCompetency.shortId();
                EcRepository.save(framework, refreshSidebar, error);
            }
        }
        for (var i = 0; i < framework.level.length; i++) {
            if (framework.level[i] == selectedCompetency.id) {
                framework.level[i] = selectedCompetency.shortId();
                EcRepository.save(framework, refreshSidebar, error);
            }
        }
    }
}

unlinkCompetency = function () {
    if (viewMode) return;
    framework.removeRelation(selectedRelation.shortId());
    conditionalDelete(selectedRelation.shortId());
    selectedRelation = null;
    EcRepository.save(framework, console.log, console.log);
    refreshSidebar();
}

removeCompetency = function () {
    if (viewMode) return;
    showConfirmDialog(function (confirmed) {
        if (confirmed === true) {
            framework.removeCompetency(selectedCompetency.shortId());
            selectedRelation = null;
            selectedCompetency = null;
            EcRepository.save(framework, console.log, console.log);
            refreshSidebar();
        }
        hideConfirmDialog();
    }, "This will remove the competency from your framework (but not delete it), do you wish to continue?");
}

deleteCompetency = function () {
    if (viewMode) return;
    if (selectedCompetency == null) {
        showConfirmDialog(function (confirmed) {
            if (confirmed === true) {
                EcRepository._delete(framework, function (success) {
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
                    showPage(defaultPage);
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
                EcRepository.save(framework, console.log, console.log);
                refreshSidebar();
            }
            hideConfirmDialog();
        }, "Are you sure you want to delete this competency? This will remove the competency from the system entirely, not just from your framework.", "delete", selectedCompetency.shortId());
    }
}

dragCompetency = function (ev) {
    if (viewMode) return;
    ev.dataTransfer.setData("text", JSON.stringify({
        competencyId: $(ev.target).attr("id"),
        relationId: $(ev.target).attr("relationid")
    }));
}

dropCompetency = function (ev) {
    if (viewMode) return;
    ev.stopPropagation();
    var data = ev.dataTransfer.getData("text");
    if (data != null)
        data = JSON.parse(data);
    else
        return;
    ev.dataTransfer.clearData("text");
    if (!ev.shiftKey)
        if (data.relationId != null && data.relationId != "")
            framework.removeRelation(data.relationId);
    var targetData = {};
    var tgt = $(ev.target);
    while (targetData.competencyId == null) {
        targetData.competencyId = tgt.attr("id");
        tgt = tgt.parent();
    }
    if (data.competencyId == targetData.competencyId) return;
    var thing = EcRepository.getBlocking(data.competencyId);
    if (thing.isAny(new EcLevel().getTypes())) {
        thing.competency = targetData.competencyId;
        EcRepository.save(thing, function () {}, error);
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
        framework.removeRelation(data.relationId);
        r.save(function () {}, error);
        EcRepository.save(framework, function () {
            if (data.relationId != null && data.relationId !== undefined)
                conditionalDelete(data.relationId);
        }, error);
    }
}

allowCompetencyDrop = function (ev) {
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
                if (results.length <= 1) {
                    console.log("No references found for " + id + "... deleting.");
                    EcRepository._delete(results[0], console.log, console.log);
                } else {
                    console.log(results.length + " references found for " + id + "... Not deleting. Will see again in another second.");
                    conditionalDelete(id, depth + 1);
                }
            }, console.error, {});
        }, 1000);
}

copyCompetencies = function (results) {
    if (viewMode) return;
    var copyDict = {};
    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (thing.isAny(new EcCompetency().getTypes())) {
            var c = new EcCompetency();
            c.generateId(repo.selectedServer);
            framework.addCompetency(c.id);
            if (EcIdentityManager.ids.length > 0)
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            c.name = thing.name;
            c.description = thing.description;
            c.copiedFrom = thing.id;
            copyDict[c.copiedFrom] = c;

            EcRepository.save(c, function () {}, error);
        }
    }
    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (!thing.isAny(new EcCompetency().getTypes())) {
            
            var parent = copyDict[thing.target];
            var child = copyDict[thing.source];

            if (typeof parent !== 'undefined' && typeof child !== 'undefined') {
                var r = new EcAlignment();
                r.generateId(repo.selectedServer);

                r.target = parent.shortId();
                r.source = child.shortId();
                r.relationType = Relation.NARROWS;
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());

                if (r.source != r.target) {
                    framework.addRelation(r.id);
                    EcRepository.save(r, function () {}, error);
                }
            }
        }
    }
    EcRepository.save(framework, function () {
        refreshSidebar();
    }, error);
}

showCopyOrLinkDialog = function (callback) {
    if (viewMode) return;
    $("#copyOrLinkDialog").show();
    $("#confirmOverlay").show();

    $("#copyCompetenciesButton").on('click', function() {
        callback(true);
    });

    $("#linkCompetenciesButton").on('click', function() {
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
