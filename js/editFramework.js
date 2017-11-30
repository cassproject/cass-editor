afterSave = function (stuff) {
    console.log(stuff);
    if (webSocketConnection == false)
        populateFramework();
}

addCompetency = function () {
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
        c["ceasn:inLanguage"] = framework["ceasn:inLanguage"];
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

appendCompetencies = function (results, newLink) {
    if (conceptMode) return;
    if (viewMode) return;
    var selectedCompetency = selectedCompetency;
    if (newLink !== null && newLink === true) {
        selectedCompetency = previousSelectedCompetency;
    }
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
                    EcRepository.save(r,
                        afterSave, error);
                }
            }
    }

    EcRepository.save(framework, function () {
        refreshSidebar();
        $("#sidebarNameInput").focus();
    }, error);
}

addLevel = function () {
    if (conceptMode) return;
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
                afterSave();
            }, error);
        }, error);
    }
}

saveCompetency = function () {
    if (viewMode) return;

    var labelChoice = null;
    var fieldChoice = null;
    var inputChoice = null;

    var thing;
    if (selectedCompetency == null) {
        thing = framework;
    } else {
        thing = selectedCompetency;
    }

    if (thing == selectedCompetency) {
        labelChoice = "cassCompetency";
        fieldChoice = "cassCompetency";
        inputChoice = "cassCompetency";
    } else {
        labelChoice = "cassFramework";
        fieldChoice = "cassFramework";
        inputChoice = "cassFramework";
    }
    if (queryParams.ceasnDataFields == 'true') {
        if (thing == selectedCompetency) {
            labelChoice = "ceasnCompetency";
        } else {
            labelChoice = "ceasnFramework";
        }
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


    $("#detailSlider").find("input:visible,textarea:visible").each(function () {
        var val = getValueOrNull($(this).val());
        if (val == null)
            delete thing[$(this).attr(inputChoice)];
        else {
            if ($(this).attr("plural") != null) {
                thing[$(this).attr(inputChoice)] = val.split(/, ?/);
                if (thing[$(this).attr(inputChoice)].length == 1)
                    thing[$(this).attr(inputChoice)] = thing[$(this).attr(inputChoice)][0];
                else if (thing[$(this).attr(inputChoice)].length == 0)
                    delete thing[$(this).attr(inputChoice)];
            } else
                thing[$(this).attr(inputChoice)] = val;
        }
    });
    $("#detailSlider").find("select:visible").each(function () {
        var val = $(this).find("option:selected").attr("value");
        if (val === undefined || val == null || val == "")
            delete thing[$(this).attr(inputChoice)];
        else {
            thing[$(this).attr(inputChoice)] = val;
        }
    });

    if (selectedCompetency == null) {
        EcRepository.save(thing, function () {
            populateFramework();
        }, error);
    } else {
        EcRepository.save(thing, afterSave, error);
    }
    refreshSidebar();
}

createFramework = function () {
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

setCompetencyConfigurationManagement = function () {
    if (conceptMode) return;
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
    if (conceptMode) return unlinkConcept();
    if (viewMode) return;
    framework.removeRelation(selectedRelation.shortId());
    conditionalDelete(selectedRelation.shortId());
    selectedRelation = null;
    EcRepository.save(framework, afterSave, console.log);
    refreshSidebar();
}

removeCompetency = function () {
    if (conceptMode) return;
    if (viewMode) return;
    showConfirmDialog(function (confirmed) {
        if (confirmed === true) {
            framework.removeCompetency(selectedCompetency.shortId());
            selectedRelation = null;
            selectedCompetency = null;
            EcRepository.save(framework, afterSave, console.log);
            refreshSidebar();
        }
        hideConfirmDialog();
    }, "This will remove the competency from your framework (but not delete it), do you wish to continue?");
}

deleteCompetency = function () {
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

dragShortcut = function (element, isCopy) {
    if (conceptMode) return dragConceptShortcut();
    if (viewMode) return;
    dragShortcutData = {
        competencyId: $(element).attr('id'),
        relationId: $(element).attr('relationid'),
        isCopy: isCopy
    };
}

dropShortcut = function (element) {
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

dragCompetency = function (ev) {
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

dropCompetency = function (ev) {
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

allowCompetencyDrop = function (ev) {
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

getValueOrNull = function (value) {
    if (value === undefined)
        return null;
    if (value === '')
        return null;
    else
        return value;
}

var itemsSaving = 0;
copyCompetencies = function (results) {
    if (conceptMode) return;
    if (viewMode) return;
    var copyDict = {};
    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (thing != null && thing.isAny(new EcCompetency().getTypes())) {
            var c = new EcCompetency();
            c.copyFrom(thing);
            c.generateId(repo.selectedServer);
            framework.addCompetency(c.id);
            if (EcIdentityManager.ids.length > 0)
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            c['ceasn:derivedFrom'] = thing.id;
            copyDict[c['ceasn:derivedFrom']] = c;
            itemsSaving++;
            EcRepository.save(c, function () {
                itemsSaving--;
                if (itemsSaving == 0)
                    EcRepository.save(framework, afterSave, error);
            }, error);
        }
    }
    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (thing != null && thing.isAny(new EcAlignment().getTypes())) {

            var parent = copyDict[thing.target];
            var child = copyDict[thing.source];

            if (typeof parent !== 'undefined' && typeof child !== 'undefined') {
                var r = new EcAlignment();
                r.copyFrom(thing);
                r.generateId(repo.selectedServer);

                r.target = parent.shortId();
                r.source = child.shortId();
                r.relationType = thing.relationType;
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());

                if (r.source != r.target) {
                    framework.addRelation(r.id);
                    EcArray.setRemove(results, r.source);
                    itemsSaving++;
                    EcRepository.save(r,
                        function () {
                            itemsSaving--;
                            if (itemsSaving == 0)
                                EcRepository.save(framework, afterSave, error);
                        }, error);
                }
            }
        }
    }
    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (thing != null && thing.isAny(new EcCompetency().getTypes()))
            if (selectedCompetency != null) {

                var r = new EcAlignment();
                r.generateId(repo.selectedServer);

                var child = copyDict[thing.id];

                r.target = selectedCompetency.shortId();
                r.source = child.shortId();
                r.relationType = Relation.NARROWS;
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                if (r.source != r.target) {
                    itemsSaving++;
                    framework.addRelation(r.id);
                    EcRepository.save(r,
                        function () {
                            itemsSaving--;
                            if (itemsSaving == 0)
                                EcRepository.save(framework, afterSave, error);
                        }, error);
                }
            }
    }
    EcRepository.save(framework, function () {
        refreshSidebar();
        if (webSocketConnection == false)
            populateFramework();
    }, error);
}

highlightSelected = function (element) {
    $('.selected').removeClass('selected');
    $(element).addClass('selected');
}

showCopyOrLinkDialog = function (callback) {
    if (viewMode) return;
    $("#copyOrLinkDialog").show();
    $("#confirmOverlay").show();

    $("#copyCompetenciesButton").on('click', function () {
        callback(true);
    });

    $("#linkCompetenciesButton").on('click', function () {
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
