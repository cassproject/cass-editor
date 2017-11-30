addConcept = function () {
    if (viewMode) return;
    var addOrSearch = $("#sidebarAddCompetencies").val();
    if (addOrSearch == "search") {
        showPage("#findCompetencySection", framework);
    } else if (addOrSearch == "new") {
        previousSelectedCompetency = selectedCompetency;
        var c = new EcConcept();
        c.generateId(repo.selectedServer);
        if (EcIdentityManager.ids.length > 0)
            c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        c.title = "New Concept";
        c.inScheme = framework.shortId();
        if (selectedCompetency != null) {
            if (selectedCompetency.broadens == null)
                selectedCompetency.broadens = [];
            EcArray.setAdd(selectedCompetency.broadens, c.shortId());
            if (c.narrows == null)
                c.narrows = [];
            EcArray.setAdd(c.narrows, selectedCompetency.shortId());
            EcRepository.save(c, function () {
                EcRepository.save(selectedCompetency, function () {
                    selectedCompetency = c;
                    refreshSidebar();
                    editSidebar();
                    $("#sidebarNameInput").focus();
                    afterSave();
                }, error);
            }, error);
        } else {
            if (framework.hasTopConcept == null)
                framework.hasTopConcept = [];
            EcArray.setAdd(framework.hasTopConcept, c.shortId());
            c.topConceptOf = framework.shortId();
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
}

createConceptScheme = function () {
    if (viewMode) return;
    if ($("#name").val() == null || $("#name").val().trim() == "")
        return;
    framework = new EcConceptScheme();
    framework.generateId(repo.selectedServer);
    if (EcIdentityManager.ids.length > 0)
        framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
    framework["dcterms:title"] = $("#name").val();
    if ($("#description").val() != null && $("#description").val() != "")
        framework["dcterms:description"] = $("#description").val();
    loading("Creating concept scheme...");
    EcRepository.save(framework, function () {
        refreshSidebar();
        populateFramework();
        highlightSelected($('#frameworkNameContainer'));
    }, error);
}

unlinkConcept = function (c) {
    if (viewMode) return;
    if (c == null)
        c = selectedCompetency;
    if (c.narrows != null)
        for (var i = 0; i < c.narrows.length; i++)
            EcConcept.get(c.narrows[i], function (concept) {
                EcArray.setRemove(concept.broadens, c.shortId());
                EcRepository.save(concept, afterSave, console.error);
            }, console.error);
    delete c.narrows;
    if (framework.hasTopConcept == null)
        framework.hasTopConcept = [];
    EcArray.setAdd(framework.hasTopConcept, c.shortId());
    c.topConceptOf = framework.shortId();
    EcRepository.save(c, function () {
        EcRepository.save(framework, afterSave, console.log);
    }, console.log);
    refreshSidebar();
}

deleteConcept = function (c) {
    if (viewMode) return;
    if (c == null) c = selectedCompetency;
    if (c == null) {
        showConfirmDialog(function (confirmed) {
            if (confirmed === true) {
                EcRepository._delete(framework, function (success) {
                    if (defaultPage == "#frameworksSection")
                        searchFrameworks(createParamObj(5000));
                    else
                        showPage(defaultPage);
                    EcConcept.search(repo, "inScheme:\"" + framework.shortId() + "\"", function (concepts) {
                        for (var i = 0; i < concepts.length; i++)
                            EcRepository._delete(concepts[i], console.log, console.error);
                    }, console.error);
                    framework = null;
                    selectedCompetency = null;
                }, console.log);
            }
            hideConfirmDialog();
        }, "Are you sure you want to delete this concept scheme? This will also delete all concepts referenced in this scheme.");
    } else {
        showConfirmDialog(function (confirmed) {
            if (confirmed === true) {
                deleteConceptInner(c);

                selectedRelation = null;
                selectedCompetency = null;
                refreshSidebar();
            }
            hideConfirmDialog();
        }, "Are you sure you want to delete this concept?", "delete", selectedCompetency.shortId());
    }
}

deleteConceptInner = function (c) {
    if (c.narrows != null)
        for (var i = 0; i < c.narrows; i++)
            EcConcept.get(c.narrows[i], function (concept) {
                EcArray.setRemove(concept.broadens, c.shortId());
                EcRepository.save(concept, afterSave, console.error);
            }, console.error);
    if (c.broadens != null)
        for (var i = 0; i < c.broadens; i++)
            EcConcept.get(c.broadens[i], function (concept) {
                deleteConceptInner(concept);
            }, console.error);
    if (c.topConceptOf != null) {
        EcArray.setRemove(framework.hasTopConcept, c.shortId());
        EcRepository.save(framework, afterSave, console.error);
    }
    EcRepository._delete(c, afterSave, console.error);
}

dragConceptShortcut = function (element, isCopy) {
    if (viewMode) return;
    dragShortcutData = {
        competencyId: $(element).attr('id'),
        isCopy: isCopy
    };
}

dropConceptShortcut = function (element) {
    var me = $(this);
    if (viewMode) return;
    if (dragShortcutData != null) {
        var targetData = {};
        var tgt = $(element);
        while (targetData.competencyId == null) {
            targetData.competencyId = tgt.attr('id');
            tgt = tgt.parent();
        }
        //Cut and paste
        if (dragShortcutData.competencyId == targetData.competencyId) return;
        EcConcept.get(dragShortcutData.competencyId, function (c) {
            if (!dragShortcutData.isCopy) {
                if (c.narrows != null) {
                    for (var i = 0; i < c.narrows.length; i++)
                        EcConcept.get(c.narrows[i], function (concept) {
                            EcArray.setRemove(concept.broadens, c.shortId());
                            EcRepository.save(concept, afterSave, console.error);
                        }, console.error);
                    delete c.narrows;
                }
                delete c.topConceptOf;
                if (EcArray.has(framework.hasTopConcept, c.shortId())) {
                    EcArray.setRemove(framework.hasTopConcept, c.shortId());
                    EcRepository.save(framework, afterSave, console.error);
                }
            }
            dropAnyConcept(dragShortcutData, targetData);
            dragShortcutData = null;
        }, console.error);
    }
}

dragConcept = function (ev) {
    if (viewMode) return;
    ev.dataTransfer.setData("text", JSON.stringify({
        competencyId: $(ev.target).attr("id")
    }));
}

dropAnyConcept = function (data, targetData) {
    var thing;
    if (data.competency != null)
        thing = data.competency;
    else
        thing = EcRepository.getBlocking(data.competencyId);
    if (data.competencyId == targetData.competencyId)
        return;

    //If data is a parent of targetData, we need to unlink targetData.
    //This is better rewritten than understood, unless you're Fritz or Mile.
    var targetNodes = $("[id=\"" + targetData.competencyId + "\"]");
    if (targetNodes.parents("[id=\"" + data.competencyId + "\"]").length > 0) {
        //OK I found some possible loops. Go find me the actual loops and nuke some connections to make what I commanded possible.
        targetNodes.parents("[id=\"" + data.competencyId + "\"]").find("[id=\"" + targetData.competencyId + "\"]").each(function () {
            detangleConcepts($(this), data, targetData);
        });
        return;
    }

    var targetThing = EcRepository.getBlocking(targetData.competencyId);
    if (targetThing.isAny(new EcConceptScheme().getTypes())) {
        thing.topConceptOf = targetThing.shortId();
        if (targetThing.hasTopConcept == null)
            targetThing.hasTopConcept = [];
        EcArray.setAdd(targetThing.hasTopConcept, thing.shortId());
    } else if (targetThing.isAny(new EcConcept().getTypes())) {
        if (targetThing.broadens == null)
            targetThing.broadens = [];
        EcArray.setAdd(targetThing.broadens, thing.shortId());
        if (thing.narrows == null)
            thing.narrows = [];
        EcArray.setAdd(thing.narrows, targetThing.shortId());
        delete thing.topConceptOf;
        EcArray.setRemove(framework.hasTopConcept, thing.shortId());
    }
    EcRepository.save(thing, function () {
        EcRepository.save(targetThing, afterSave, console.error);
    }, console.error);

}

detangleConcepts = function (me, data, targetData) {

    var part3 = function () {
        EcRepository.save(c, function () {
            dropAnyConcept(data, targetData);
        }, console.error); //Saving main competency.
    }

    var part2 = function () {
        var foundAgain = false;
        EcArray.setRemove(c.narrows, me.parent().parent().attr("id"));
        if (c.narrows == null || c.narrows.length == 0) {
            EcArray.setAdd(framework.hasTopConcept, c.shortId());
            c.topConceptOf = framework.shortId();
            EcRepository.save(framework, part3, console.error); //Saving framework again.
            foundAgain = true;
        }
        if (!foundAgain)
            part3();
    }

    var found = false;
    var c = EcConcept.getBlocking(me.attr("id"));
    if (c.narrows != null) {
        for (var i = 0; i < c.narrows.length; i++)
            if (c.narrows[i] == me.parent().parent().attr("id")) {
                var concept = EcConcept.getBlocking(c.narrows[i]);
                EcArray.setRemove(concept.broadens, c.shortId());
                EcRepository.save(concept, part2, console.error); //Saving parent concept again.
                found = true;
            }
    }
    if (!found)
        part2();

}

dropConcept = function (ev) {
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
        tgt = tgt.parent();
    }
    if (data.competencyId == targetData.competencyId) return;
    EcConcept.get(data.competencyId, function (c) {
        if (!ev.shiftKey) {
            var stage2 = function () {
                var found = false;
                delete c.topConceptOf;
                data.competency = c;
                if (EcArray.has(framework.hasTopConcept, c.shortId())) {
                    EcArray.setRemove(framework.hasTopConcept, c.shortId());
                    EcRepository.save(framework, function () {
                        dropAnyConcept(data, targetData);
                    }, console.error); //Saving framework.
                    found = true;
                }
                if (!found)
                    dropAnyConcept(data, targetData);
            }
            var found = false;
            if (c.narrows != null) {
                var narrows = c.narrows;
                delete c.narrows;
                for (var i = 0; i < narrows.length; i++)
                    EcConcept.get(narrows[i], function (concept) {
                        EcArray.setRemove(concept.broadens, c.shortId());
                        EcRepository.save(concept, stage2, console.error); //Saving previous parent.
                        found = true;
                    }, console.error);
            }
            if (!found)
                stage2();
        }
    });
}

allowConceptDrop = function (ev) {
    if (viewMode) return;
    ev.preventDefault();
}
