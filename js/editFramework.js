var defaultLanguage = "";

afterSave = function (stuff) {
    if (webSocketConnection == false)
        populateFramework();
}
afterSaveRender = function () {
    afterSave();
    renderSidebar(true);
}
afterSaveSidebar = function (stuff) {
    refreshSidebar();
    if (webSocketConnection == false)
        populateFramework();
}

setDefaultLanguage = function() {
    if (framework && framework["ceasn:inLanguage"])
        defaultLanguage = EcArray.isArray(framework["ceasn:inLanguage"]) ? framework["ceasn:inLanguage"][0] : framework["ceasn:inLanguage"];
    else if (framework && framework["schema:inLanguage"])
        defaultLanguage = EcArray.isArray(framework["schema:inLanguage"]) ? framework["schema:inLanguage"][0] : framework["schema:inLanguage"];
    else if (framework && framework["dcterms:language"])
        defaultLanguage = framework["dcterms:language"];
    else if (navigator.language || navigator.userLanguage)
        defaultLanguage = navigator.language || navigator.userLanguage;
    else
        defaultLanguage = "en";
}

addCompetency = function () {
    if (conceptMode) return addConcept();
    if (viewMode) return;
    var addOrSearch = $("#sidebarAddCompetencies").attr('value');
    if (addOrSearch == "search") {
        initIframe();
        showPage("#findCompetencySection", framework);
    } else if (addOrSearch == "new") {
        isFirstEdit = true;
        previousSelectedCompetency = selectedCompetency;
        var c = new EcCompetency();
        if (newObjectEndpoint != null)
            c.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
        else
            c.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
        c["schema:dateCreated"] = new Date().toISOString();
        framework.addCompetency(c.id);
        if (EcIdentityManager.ids.length > 0)
            c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        c["ceasn:inLanguage"] = framework["ceasn:inLanguage"];
        c["schema:inLanguage"] = framework["schema:inLanguage"];
        setDefaultLanguage();
        c.name = {"@language": defaultLanguage, "@value": "New Competency"};
        if (!c["ceasn:inLanguage"] && !c["schema:inLanguage"]) {
            if (queryParams.ceasnDataFields == "true")
                c["ceasn:inLanguage"] = defaultLanguage;
            else
                c["schema:inLanguage"] = defaultLanguage;
        }

        framework["schema:dateModified"] = new Date().toISOString();
        repo.saveTo(c, function () {
            if (selectedCompetency != null) {
                collapseCompetencyTracking(framework.shortId(),selectedCompetency.shortId(),"expanded");
                var r = new EcAlignment();
                if (newObjectEndpoint != null)
                    r.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
                else
                    r.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
                r["schema:dateCreated"] = new Date().toISOString();
                r.target = selectedCompetency.shortId();
                r.source = c.shortId();
                r.relationType = Relation.NARROWS;
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                framework.addRelation(r.id);
                repo.saveTo(r, function () {
                    repo.saveTo(framework, function () {
                        selectedCompetency = c;
                        refreshSidebar();
                        editSidebar();
                        $("#sidebarNameInput").focus();
                        $("#sidebarNameInput").select();
                        afterSave();
                    }, error);
                }, error);
            } else {
                repo.saveTo(framework, function () {
                    selectedCompetency = c;
                    refreshSidebar();
                    editSidebar();
                    $("#sidebarNameInput").focus();
                    $("#sidebarNameInput").select();
                    afterSave();
                }, error);
            }
        }, error);
    }
}

addAlignments = function(targets, thing, relationType) {
    for (var i = 0; i < targets.length; i++) {
        var r = new EcAlignment();
        if (newObjectEndpoint != null)
            r.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
        else
            r.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
        r["schema:dateCreated"] = new Date().toISOString();
        r.target = EcRemoteLinkedData.trimVersionFromUrl(targets[i]);
        r.source = thing.shortId();
        if (r.target == r.source)
            return;
        r.relationType = relationType ? relationType : $("#selectCompetencySection").attr("relation");
        if (r.relationType == "broadens") {
            var dosedo = r.target;
            r.target = r.source;
            r.source = dosedo;
            r.relationType = "narrows";
        }
        if (EcIdentityManager.ids.length > 0)
            r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        if (thing.type == 'Concept') {
            if (framework.relation == null)
                framework.relation = new Array();
            let isNew = true;
            let idx = 0;
            while (isNew && idx < framework.relation.length) {
                if (EcRemoteLinkedData.trimVersionFromUrl(framework.relation[idx]).equals(r.id))
                    isNew = false;
                idx++;
            }
            if (isNew)
                framework.relation.push(r.id);
        } else {
            framework.addRelation(r.id);
        }
        repo.saveTo(r, function () {}, error);
    }
    repo.saveTo(framework, afterSaveRender, error);
}

attachUrlProperties = function (results) {
    if (viewMode) return;
    var resource = framework;
    if (selectedCompetency != null)
        resource = selectedCompetency;
    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (thing.isAny(new EcConcept().getTypes())) {

            if (resource[$("#selectConceptSection").attr("destination")] == null)
                resource[$("#selectConceptSection").attr("destination")] = [];
            EcArray.setAdd(resource[$("#selectConceptSection").attr("destination")], thing.shortId());
        }
    }
    renderSidebar(true);
}
var previousSelectedCompetency = null;
appendCompetencies = function (results, newLink) {
    if (conceptMode) return;
    if (viewMode) return;
    var selectedCompetency = selectedCompetency;
    if (newLink !== null && newLink === true && selectedCompetency == null && previousSelectedCompetency != null) {
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
                if (newObjectEndpoint != null)
                    r.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
                else
                    r.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
                r["schema:dateCreated"] = new Date().toISOString();

                r.target = selectedCompetency.shortId();
                r.source = thing.shortId();
                r.relationType = Relation.NARROWS;
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());

                if (r.source != r.target) {
                    framework.addRelation(r.id);
                    repo.saveTo(r,
                        afterSave, error);
                }
            }
    }

    repo.saveTo(framework, function () {
        refreshSidebar();
        $("#sidebarNameInput").focus();
        $("#sidebarNameInput").select();
    }, error);
}

addLevel = function () {
    if (conceptMode) return;
    if (viewMode) return;
    var addOrSearch = $("#sidebarAddLevels").val();
    if (addOrSearch == "search") {
        initIframe();
        gotoPage("#findCompetencySection", framework);
    } else if (addOrSearch == "new") {
        var c = new EcLevel();
        if (newObjectEndpoint != null)
            c.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
        else
            c.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
        c["schema:dateCreated"] = new Date().toISOString();
        framework.addLevel(c.id);
        if (EcIdentityManager.ids.length > 0)
            c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        c.name = "New Level";
        c.competency = selectedCompetency.shortId();
        framework["schema:dateModified"] = new Date().toISOString();
        repo.saveTo(c, function () {
            repo.saveTo(framework, function () {
                selectedCompetency = c;
                refreshSidebar();
                editSidebar();
                $("#sidebarNameInput").focus();
                $("#sidebarNameInput").select();
                afterSave();
            }, error);
        }, error);
    }
}

saveCompetency = function (addAnother) {
    if (viewMode) return;
    isFirstEdit = false;
    //Alert for bad characters in input
    if (alertBadCharacters() === false) {
        return false;
    }
    $(".changedField").removeClass("changedField");
    
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

    var nameString = $('#sidebarNameInput').val();
    if ($.trim(nameString) === '') {
        alert('Please enter a name');
        return false;
    }

    if ($("input:invalid").filter(":visible").length > 0) {
        if (queryParams.allowValidationBypass == "true") {
            if (confirm("Your edits include invalid data. If you continue, this could break export formats and cause other issues. Are you sure you want to save?") == false)
                return false;
        } else {
            alert("Your changes contain invalid data. Please ensure all data is valid before saving.");
            return false;
        }
    }

    $("#detailSlider").find("input:not([plural]):visible,textarea:not([plural]):visible").each(function () {
        var val = getValueOrNull($(this).val());
        if (val == null)
            delete thing[$(this).attr(inputChoice)];
        else {
            if ($(this).attr("type") == "datetime-local")
                thing[$(this).attr(inputChoice)] = new Date(val).toISOString();
            else {
                if ($(this).attr('data-autocompleteCache') === "true")
                    saveToAutocompleteCache($(this).attr('id'), val);
                thing[$(this).attr(inputChoice)] = val;
            }
        }
    });

    $("#detailSlider").find('.sidebarInputGrouping').each(function() {
        var arrayVals = [];
        var whichInputChoice = $(this).children().first().children('input:not(.sidebarInputLanguageSelect),textarea').attr(inputChoice);

        $(this).find('.sidebarInputRow > input:visible:not(.sidebarInputLanguageSelect), .sidebarInputRow > textarea:visible').each(function() {
            if ($(this).prev('input.sidebarInputLanguageSelect').length > 0) {
                var objectVals = {};
                var selectVal = getValueOrNull($(this).prev('input.sidebarInputLanguageSelect').val());
                var stringVal = getValueOrNull($(this).val());
                if (selectVal != null && stringVal != null) {
                    if (langTags[selectVal])
                        objectVals["@language"] = langTags[selectVal];
                    else
                        objectVals["@language"] = selectVal;
                    objectVals["@value"] = stringVal;
                    arrayVals.push(objectVals);
                }
                else if (stringVal != null) {
                    arrayVals.push(stringVal);
                }
            } else {
                var val = getValueOrNull($(this).val());
                if (val != null) {
                    if (($(this).hasClass("language") || $(this).hasClass("sidebarInputLanguageSelect")) && langTags[val])
                        arrayVals.push(langTags[val]);
                    else
                        arrayVals.push(val);
                }
            }
        });
        if (arrayVals.length > 0) {
            thing[whichInputChoice] = arrayVals;
        } else {
            delete thing[whichInputChoice];
        }
    });

    //Save concept scheme language as code
    if (conceptMode && $("#sidebarConceptInLanguageInput").val()) {
        var conceptLanguage = $("#sidebarConceptInLanguageInput").val();
        var whichInputChoice = $("#sidebarConceptInLanguageInput").attr(inputChoice);
        if (conceptLanguage != null) {
            if (langTags[conceptLanguage]) {
                conceptLanguage = langTags[conceptLanguage];
            }
        }
        thing[whichInputChoice] = conceptLanguage;
    }


    $("#detailSlider").find("select:visible:not(.sidebarInputLanguageSelect)").each(function () {
        var val = $(this).find("option:selected").attr("value");
        if (val === undefined || val == null || val == "")
            delete thing[$(this).attr(inputChoice)];
        else {
            thing[$(this).attr(inputChoice)] = val;
        }
    });

    thing["schema:dateModified"] = new Date().toISOString();
    if (selectedCompetency == null) {
        repo.saveTo(thing, afterSaveSidebar, error);
    } else {
        repo.saveTo(thing, afterSave, error);
    }
    refreshSidebar();
    //Reselect the parent of the selected competency, or the framework if there is no parent competency and add another
    if (addAnother && addAnother == "true") {
        var elem = $('[id="' + thing.shortId() + '"]');
        if (elem.parent().attr('id') == 'tree')
            $('#frameworkName').click();
        else
            elem.parent().parent().click();
        
        $('#sidebarAddCompetencies').click();
    }
}

var createFrameworkDelay;
createFramework = function () {
    if (conceptMode) return createConceptScheme();
    if (viewMode) return;
    isFirstEdit = true;
    framework = new EcFramework();
    if (newObjectEndpoint != null)
        framework.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
    else
        framework.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
    framework["schema:dateCreated"] = new Date().toISOString();
    if (EcIdentityManager.ids.length > 0)
        framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
    setDefaultLanguage();
    framework.name = {"@language": defaultLanguage, "@value": "New Framework"};
    refreshSidebar();
    editSidebar();
    populateFramework();
    highlightSelected($('#frameworkNameContainer'));
    createFrameworkDelay = setInterval(function() {
        $("#sidebarFrameworkInLanguageInput").val(defaultLanguage);
        if ($('#sidebarNameInput').is(':visible')) {
            $('#sidebarNameInput').focus();
            $('#sidebarNameInput').select();
            clearInterval(createFrameworkDelay);
        }
    }, 1000);
}

setCompetencyConfigurationManagement = function () {
    if (conceptMode) return;
    if (viewMode) return;
    var addOrSearch = $("#sidebarVersion").val();
    if (addOrSearch == "version") {
        for (var i = 0; i < framework.competency.length; i++) {
            if (framework.competency[i] == selectedCompetency.shortId()) {
                framework.competency[i] = selectedCompetency.id;
                repo.saveTo(framework, refreshSidebar, error);
            }
        }
        for (var i = 0; i < framework.level.length; i++) {
            if (framework.level[i] == selectedCompetency.shortId()) {
                framework.level[i] = selectedCompetency.id;
                repo.saveTo(framework, refreshSidebar, error);
            }
        }
    } else if (addOrSearch == "noVersion") {

        for (var i = 0; i < framework.competency.length; i++) {
            if (framework.competency[i] == selectedCompetency.id) {
                framework.competency[i] = selectedCompetency.shortId();
                repo.saveTo(framework, refreshSidebar, error);
            }
        }
        for (var i = 0; i < framework.level.length; i++) {
            if (framework.level[i] == selectedCompetency.id) {
                framework.level[i] = selectedCompetency.shortId();
                repo.saveTo(framework, refreshSidebar, error);
            }
        }
    }
}

unlinkCompetency = function (ev) {
    if (ev && ev.preventDefault)
        ev.preventDefault();
    if (conceptMode) return unlinkConcept();
    if (viewMode) return;
    framework.removeRelation(selectedRelation.shortId());
    conditionalDelete(selectedRelation.shortId());
    selectedRelation = null;
    framework["schema:dateModified"] = new Date().toISOString();
    repo.saveTo(framework, afterSave, console.log);
    refreshSidebar();
}

removeCompetency = function () {
    if (conceptMode) return;
    if (viewMode) return;
    showConfirmDialog(function (confirmed) {
        if (confirmed === true) {
            framework["schema:dateModified"] = new Date().toISOString();
            framework.removeCompetency(selectedCompetency.shortId(), function () {
                selectedRelation = null;
                selectedCompetency = null;
                repo.saveTo(framework, afterSave, console.log);
                refreshSidebar();
            }, console.log);
        }
        hideConfirmDialog();
    }, "This will remove the competency from your framework (but not delete it), do you wish to continue?", "Cancel", "Confirm");
}

deleteCompetency = function () {
    if (conceptMode) return deleteConcept();
    if (viewMode) return;
    if (selectedCompetency == null) {
        if (isFirstEdit) {
            spitEvent("frameworkDeleted", framework.shortId());
            if (defaultPage == "#frameworksSection")
                searchFrameworks(createParamObj());
            else
                showPage(defaultPage);
        }
        else
            showConfirmDialog(function (confirmed) {
                if (confirmed === true) {
                    repo.deleteRegistered(framework, function (success) {
                        spitEvent("frameworkDeleted", framework.shortId());
                        if (defaultPage == "#frameworksSection")
                            searchFrameworks(createParamObj());
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
            }, "Are you sure you want to delete this framework? This will also delete all objects referenced in this framework that aren't found in other frameworks on this server.", "Cancel", "Confirm");
    } else {
        showConfirmDialog(function (confirmed) {
            if (confirmed === true) {
                framework["schema:dateModified"] = new Date().toISOString();
                framework.removeCompetency(selectedCompetency.shortId(), function () {
                    framework.removeLevel(selectedCompetency.shortId());
                    selectedRelation = null;
                    conditionalDelete(selectedCompetency.shortId());
                    selectedCompetency = null;
                    repo.saveTo(framework, afterSave, console.log);
                    refreshSidebar();
                }, console.log);
            }
            hideConfirmDialog();
        }, "Are you sure you want to delete this competency? This will remove the competency from the system entirely, not just from your framework.", "Cancel", "Confirm", "delete", selectedCompetency.shortId());
    }
}

dragShortcut = function (element, isCopy) {
    if (conceptMode) return dragConceptShortcut(element, isCopy);
    if (viewMode) return;
    dragShortcutData = {
        competencyId: $(element).attr('id'),
        relationId: $(element).attr('relationid'),
        isCopy: isCopy
    };
}

dropShortcut = function (element) {
    if (conceptMode) return dropConceptShortcut(element);
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
        repo.saveTo(thing, function () {
            if (webSocketConnection == false)
                populateFramework();
        }, error);
    } else if (thing.isAny(new EcCompetency().getTypes())) {
        var r = new EcAlignment();
        if (newObjectEndpoint != null)
            r.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
        else
            r.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
        r["schema:dateCreated"] = new Date().toISOString();
        r.target = EcRemoteLinkedData.trimVersionFromUrl(targetData.competencyId);
        r.source = thing.shortId();
        if (r.target == r.source)
            return;
        r.relationType = Relation.NARROWS;
        if (EcIdentityManager.ids.length > 0)
            r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        framework.addRelation(r.id);
        repo.saveTo(r, function () {}, error);
        repo.saveTo(framework, function () {
            if (data.relationId != null && data.relationId !== undefined)
                conditionalDelete(data.relationId);
            if (webSocketConnection == false)
                populateFramework();
        }, error);
    }
}

dropCompetency = function (ev) {
    ev.preventDefault();
    if (conceptMode) return dropConcept();
    if (viewMode) return;
    ev.stopPropagation();
    var data = ev.dataTransfer.getData("text");
    if (data != null)
        data = JSON.parse(data);
    else
        return;
    //ev.dataTransfer.clearData("text");

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
            conditionalDelete(data.relationId);
        }
    dropAny(data, targetData);
}

allowCompetencyDrop = function (ev) {
    if (conceptMode) return allowConceptDrop();
    if (viewMode) return;
    ev.preventDefault();
}

//Touchscreen drag and drop
handleTouchStart = function (event) {
    if (viewMode)
        return;
    //Drag and drop when using 2+ fingers
    console.log(event);
    if (!$(event.srcElement).hasClass('collapse') && !$(event.srcElement).hasClass('fa') && event.touches.length > 1) {
        event.stopPropagation();
        $(event.srcElement).click();
        setGlobalTouchDragData(event.srcElement);
    }
}

handleTouchMove = function (event) {
    if (viewMode)
        return;
    event.stopPropagation();
    if (globalTouchDragData != null) {
        $('.competency').addClass('dashBorder');
        var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
        var hoverElem = document.elementFromPoint(x, y);
        if (hoverElem.classList.contains('competencyName') || hoverElem.classList.contains('competencyDescription') || hoverElem.classList.contains('competencyCodedNotation'))
            hoverElem = hoverElem.parentNode.parentNode;
        if (hoverElem.classList.contains('competency') || hoverElem.id == "frameworkNameContainer") {
            $('.selected').removeClass('selected');
            hoverElem.classList.add('selected');
            globalTouchDragDestination = hoverElem.id;
        }
    }
}

handleTouchEnd = function (event) {
    if (viewMode)
        return;
    event.stopPropagation();
    if (globalTouchDragDestination != null && globalTouchDragData != null) {
        //Unlink competency
        if (globalTouchDragDestination == "frameworkNameContainer") {
            unlinkCompetency();
        } else {
            var targetElem = $(document.getElementById(globalTouchDragDestination));
            var targetCompetencyId = targetElem.attr('id');
            var targetRelationId = targetElem.attr('relationId');
            var targetData = {
                competencyId: targetCompetencyId,
                relationId: targetRelationId
            };

            if (globalTouchDragData.relationId != null && globalTouchDragData.relationId != "") {
                framework.removeRelation(globalTouchDragData.relationId);
                conditionalDelete(targetData.relationId);
            }

            dropAny(globalTouchDragData, targetData);
        }
    }
    $('.competency').removeClass('dashBorder');
    globalTouchDragData = null;
    globalTouchDragDestination = null;
}

//Recursively get the li element we want for touchdrag
setGlobalTouchDragData = function (obj) {
    if (obj && obj.localName) {
        if (obj.localName === "li") {
            //Super hacky, needs a more robust solution (attribute length may change and this would break)
            var competencyId = obj.attributes[8].value;
            var relationId = Object.keys(obj.attributes).length > 9 ? obj.attributes[9].value : null;

            globalTouchDragData = {
                competencyId: competencyId,
                relationId: relationId
            };
        } else {
            setGlobalTouchDragData(obj.parentNode);
        }
    }
}

conditionalDelete = function (id, depth) {
    (function (id, depth) {
        Task.asyncImmediate(function (callback) {
            if (viewMode) return;
            if (depth == undefined || depth == null) depth = 0;
            if (id == null || id == undefined)
                console.trace("ID is undefined.");
            if (depth < 5)
                EcFramework.search(repo, "\"" + id + "\"", function (results) {
                    if (results.length <= 0) {
                        console.log("No references found for " + id + "... deleting.");
                        repo.deleteRegistered(EcRepository.getBlocking(id), function (success) {
                            callback();
                            afterSave(success);
                        }, function (failure) {
                            console.log(failure);
                            callback();
                        });
                    } else {
                        console.log(results.length + " references found for " + id + "... Not deleting. Will see again in another second.");
                        callback();
                        setTimeout(function () {
                            conditionalDelete(id, depth + 1);
                        }, 1000);
                    }
                }, console.error, {});
            else
                callback();
        });
    })(id, depth);
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

afterCopy = function () {
    itemsSaving--;
    loading(itemsSaving + " objects left to copy.");
    if (itemsSaving == 0)
        repo.saveTo(framework, function (stuff) {
            refreshSidebar();
            populateFramework();
            afterSave(stuff);
        }, error);
}

copyCompetencies = function (results) {
    if (conceptMode) return;
    if (viewMode) return;
    var copyDict = {};
    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (thing != null && thing.isAny(new EcCompetency().getTypes())) {
            var c = new EcCompetency();
            c.copyFrom(thing);
            if (newObjectEndpoint != null)
                c.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
            else
                c.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
            c["schema:dateCreated"] = new Date().toISOString();
            framework.addCompetency(c.id);
            delete c.owner;
            if (EcIdentityManager.ids.length > 0)
                c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            c['ceasn:derivedFrom'] = thing.id;
            copyDict[c['ceasn:derivedFrom']] = c;
            itemsSaving++;
            (function (c) {
                Task.asyncImmediate(function (callback) {
                    repo.saveTo(c, function () {
                        afterCopy();
                        callback();
                    }, function (error) {
                        error(error);
                        afterCopy();
                        callback();
                    });
                });
            })(c);
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
                if (newObjectEndpoint != null)
                    r.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
                else
                    r.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
                r["schema:dateCreated"] = new Date().toISOString();

                r.target = parent.shortId();
                r.source = child.shortId();
                r.relationType = thing.relationType;
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());

                if (r.source != r.target) {
                    framework.addRelation(r.id);
                    framework["schema:dateModified"] = new Date().toISOString();
                    EcArray.setRemove(results, thing.source);
                    itemsSaving++;
                    (function (r) {
                        Task.asyncImmediate(function (callback) {
                            repo.saveTo(r, function () {
                                    afterCopy();
                                    callback();
                                },
                                function (error) {
                                    error(error);
                                    afterCopy();
                                    callback();
                                }
                            );
                        });
                    })(r);
                }
            }
        }
    }
    for (var i = 0; i < results.length; i++) {
        var thing = EcRepository.getBlocking(results[i]);
        if (thing != null && thing.isAny(new EcCompetency().getTypes()))
            if (selectedCompetency != null) {

                var r = new EcAlignment();
                if (newObjectEndpoint != null)
                    r.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
                else
                    r.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
                r["schema:dateCreated"] = new Date().toISOString();

                var child = copyDict[thing.id];

                r.target = selectedCompetency.shortId();
                r.source = child.shortId();
                r.relationType = Relation.NARROWS;
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                if (r.source != r.target) {
                    itemsSaving++;
                    framework.addRelation(r.id);
                    framework["schema:dateModified"] = new Date().toISOString();
                    (function (r) {
                        Task.asyncImmediate(function (callback) {
                            repo.saveTo(r, function () {
                                    afterCopy();
                                    callback();
                                },
                                function (error) {
                                    error(error);
                                    afterCopy();
                                    callback();
                                }
                            );
                        });
                    })(r);
                }
            }
    }
}

moveUp = function () {
    var moveThis = $("[id=\"" + selectedCompetency.shortId() + "\"]");
    var prevNodes = moveThis.prev();
    if (prevNodes.length > 0) {
        var done = false;
        var lastNode = null;
        for (var j = 0; j < framework.competency.length; j++) {
            for (var i = 0; i < prevNodes.length; i++) {
                if (framework.competency[j].startsWith($(prevNodes.get(i)).attr("id"))) {
                    done = true;
                    break;
                }
                if (!done)
                    lastNode = framework.competency[j];
            }
            if (done) break;
        }
        if (j != framework.competency.length) {
            for (var i = 0; i < framework.competency.length; i++) {
                if (framework.competency[i].startsWith(selectedCompetency.shortId()))
                    var currentNode = framework.competency.splice(i, 1);
            }
            framework.competency.splice(j, 0, currentNode[0]);
            repo.saveTo(framework, afterSave, error);
        }
    }
}

moveDown = function () {
    var moveThis = $("[id=\"" + selectedCompetency.shortId() + "\"]");
    var prevNodes = moveThis.next();
    if (prevNodes.length > 0) {
        var done = false;
        var lastNode = null;
        for (var j = 0; j < framework.competency.length; j++) {
            for (var i = 0; i < prevNodes.length; i++) {
                if (framework.competency[j].startsWith($(prevNodes.get(i)).attr("id"))) {
                    done = true;
                    break;
                }
                if (!done)
                    lastNode = framework.competency[j];
            }
            if (done) break;
        }
        if (j != framework.competency.length) {
            for (var i = 0; i < framework.competency.length; i++) {
                if (framework.competency[i].startsWith(selectedCompetency.shortId()))
                    var currentNode = framework.competency.splice(i, 1);
            }
            framework.competency.splice(j, 0, currentNode[0]);
            repo.saveTo(framework, afterSave, error);
        }
    }
}
