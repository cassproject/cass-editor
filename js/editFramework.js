addCompetency = function () {
    var addOrSearch = $("#sidebarAddCompetencies").val();
    if (addOrSearch == "search") {
        gotoPage("#findCompetencySection", framework);
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
        if (thing.isAny(new EcCompetency().getTypes())) {
            var r = new EcAlignment();
            r.generateId(repo.selectedServer);
            r.target = selectedCompetency.shortId();
            r.source = thing.shortId();
            r.relationType = Relation.NARROWS;
            if (EcIdentityManager.ids.length > 0)
                r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            framework.addRelation(r.id);
            EcRepository.save(r, function () {}, error);
        }
    }

    EcRepository.save(framework, function () {
        refreshSidebar();
        $("#sidebarNameInput").focus();
    }, error);
}

addLevel = function () {
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
    if (selectedCompetency == null) {
        framework.name = $("#sidebarNameInput").val();
        framework.description = $("#sidebarDescriptionInput").val();

        EcRepository.save(framework, function () {
            populateFramework();
        }, error);
    } else {
        selectedCompetency.name = $("#sidebarNameInput").val();
        selectedCompetency.description = $("#sidebarDescriptionInput").val();

        EcRepository.save(selectedCompetency, function () {}, error);
    }
}

createFramework = function () {
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
    framework.removeRelation(selectedRelation.shortId());
    conditionalDelete(selectedRelation.shortId());
    selectedRelation = null;
    EcRepository.save(framework, console.log, console.log);
    refreshSidebar();
}

removeCompetency = function () {
    framework.removeCompetency(selectedCompetency.shortId());
    selectedRelation = null;
    selectedCompetency = null;
    EcRepository.save(framework, console.log, console.log);
    refreshSidebar();
}

deleteCompetency = function () {
    framework.removeCompetency(selectedCompetency.shortId());
    selectedRelation = null;
    conditionalDelete(selectedCompetency.shortId());
    selectedCompetency = null;
    EcRepository.save(framework, console.log, console.log);
    refreshSidebar();
}

dragCompetency = function (ev) {
    ev.dataTransfer.setData("text", JSON.stringify({
        competencyId: $(ev.target).attr("id"),
        relationId: $(ev.target).attr("relationid")
    }));
}

dropCompetency = function (ev) {
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
        r.relationType = Relation.NARROWS;
        if (EcIdentityManager.ids.length > 0)
            r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        framework.addRelation(r.id);
        r.save(function () {}, error);
        EcRepository.save(framework, function () {
            conditionalDelete(data.relationId);
        }, error);
    }
}

allowCompetencyDrop = function (ev) {
    ev.preventDefault()
}

conditionalDelete = function (id) {
    setTimeout(function () {
        repo.search("\"" + id + "\"", null, function (results) {
            if (results.length == 1) {
                console.log("No references found for " + id + "... deleting.");
                EcRepository._delete(results[0], console.log, console.log);
            } else
                console.log(results.length + " references found for " + id + "... Not deleting.");
        }, console.log);
    }, 1000);
}
