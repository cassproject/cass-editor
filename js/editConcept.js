addConcept = function () {
    if (viewMode) return;
    var addOrSearch = $("#sidebarAddCompetencies").attr('value');
    if (addOrSearch == "search") {
        initIframe();
        showPage("#findCompetencySection", framework);
    } else if (addOrSearch == "new") {
        $("#sidebarAddCompetencies").prop('disabled', true);
        isFirstEdit = true;
        previousSelectedCompetency = selectedCompetency;
        var c = new EcConcept();
        if (newObjectEndpoint != null)
            c.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
        else
            c.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
        c["schema:dateCreated"] = new Date().toISOString();
        if (EcIdentityManager.ids.length > 0)
            c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        c["skos:inLanguage"] = (framework["ceasn:inLanguage"] != null) ? framework["ceasn:inLanguage"] : framework["dcterms:language"];
        setDefaultLanguage();
        c["skos:prefLabel"] = {"@language": defaultLanguage, "@value": "New Concept"};
        if (!c["skos:inLanguage"]) {
            c["skos:inLanguage"] = defaultLanguage;
        }
        c["skos:inScheme"] = framework.shortId();
        if (selectedCompetency != null) {
            collapseCompetencyTracking(framework.shortId(),selectedCompetency.shortId(),"expanded");
            if (selectedCompetency["skos:narrower"] == null)
                selectedCompetency["skos:narrower"] = [];
            EcArray.setAdd(selectedCompetency["skos:narrower"], c.shortId());
            if (c["skos:broader"] == null)
                c["skos:broader"] = [];
            EcArray.setAdd(c["skos:broader"], selectedCompetency.shortId());
            if ($("#private")[0].checked) {
                c = EcEncryptedValue.toEncryptedValue(c);
                if (EcEncryptedValue.encryptOnSaveMap[selectedCompetency.id] != true)
                    selectedCompetency = EcEncryptedValue.toEncryptedValue(selectedCompetency);
            }
            framework["schema:dateModified"] = new Date().toISOString();
            repo.saveTo(c, function () {
                repo.saveTo(selectedCompetency, function () {
                    selectedCompetency = EcConcept.getBlocking(c.id);
                    refreshSidebar();
                    editSidebar();
                    setTimeout(function() {
                        if ($('#sidebarNameInput').is(':visible')) {
                            $('#sidebarNameInput').focus();
                            $('#sidebarNameInput').select();
                        }
                    }, 2000);
                    afterSave();
                    $("#sidebarAddCompetencies").prop('disabled', false);
                }, error);
            }, error);
        } else {
            if (framework["skos:hasTopConcept"] == null)
                framework["skos:hasTopConcept"] = [];
            EcArray.setAdd(framework["skos:hasTopConcept"], c.shortId());
            c["skos:topConceptOf"] = framework.shortId();
            if ($("#private")[0].checked) {
                c = EcEncryptedValue.toEncryptedValue(c);
                if (EcEncryptedValue.encryptOnSaveMap[framework.id] != true)
                    framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            framework["schema:dateModified"] = new Date().toISOString();
            repo.saveTo(c, function () {
                repo.saveTo(framework, function () {
                    selectedCompetency = EcConcept.getBlocking(c.id);
                    framework = EcConceptScheme.getBlocking(framework.id);
                    refreshSidebar();
                    editSidebar();
                    setTimeout(function() {
                        if ($('#sidebarNameInput').is(':visible')) {
                            $('#sidebarNameInput').focus();
                            $('#sidebarNameInput').select();
                        }
                    }, 2000);
                    afterSave();
                    $("#sidebarAddCompetencies").prop('disabled', false);
                }, error);
            }, error);
        }
    }
}

createConceptScheme = function () {
    if (viewMode) return;
    isFirstEdit = true;
    var csTitle;
    setDefaultLanguage();
    if ($("#name").val() == null || $("#name").val().trim() == "")
        csTitle = {"@language": defaultLanguage, "@value": "New Concept Scheme"};
    else
        csTitle = $("#name").val().trim();
    framework = new EcConceptScheme();
    if (newObjectEndpoint != null)
        framework.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
    else
        framework.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
    if (EcIdentityManager.ids.length > 0)
        framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
    framework["dcterms:title"] = csTitle;
    framework["schema:dateCreated"] = new Date().toISOString();
    if ($("#description").val() != null && $("#description").val() != "")
        framework["dcterms:description"] = {"@language": defaultLanguage, "@value": $("#description").val()};
    if (queryParams.private == "true") {
        framework = EcEncryptedValue.toEncryptedValue(framework);
    }
    loading("Creating concept scheme...");
    repo.saveTo(framework, function () {
        framework = EcConceptScheme.getBlocking(framework.id);
        refreshSidebar();
        editSidebar();
        populateFramework();
        highlightSelected($('#frameworkNameContainer'));
        createFrameworkDelay = setInterval(function() {
            $("#sidebarConceptInLanguageInput").val(defaultLanguage);
            if ($('#sidebarNameInput').is(':visible')) {
                $('#sidebarNameInput').focus();
                $('#sidebarNameInput').select();
                clearInterval(createFrameworkDelay);
            }
        }, 1000);
    }, error);
}

unlinkConcept = function (c) {
    if (viewMode) return;
    if (c == null)
        c = selectedCompetency;
    if (c["skos:broader"] != null)
        for (var i = 0; i < c["skos:broader"].length; i++)
            EcConcept.get(c["skos:broader"][i], function (concept) {
                EcArray.setRemove(concept["skos:narrower"], c.shortId());
                if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[concept.id] != true) {
                    concept = EcEncryptedValue.toEncryptedValue(concept);
                }
                repo.saveTo(concept, function() {
                    afterSave();
                }, console.error);
            }, console.error);
    delete c["skos:broader"];
    if (framework["skos:hasTopConcept"] == null)
        framework["skos:hasTopConcept"] = [];
    EcArray.setRemove(framework["skos:hasTopConcept"], c.shortId());
    EcArray.setAdd(framework["skos:hasTopConcept"], c.shortId());
    c["skos:topConceptOf"] = framework.shortId();
    if ($("#private")[0].checked) {
        if (EcEncryptedValue.encryptOnSaveMap[framework.id] != true)
            framework = EcEncryptedValue.toEncryptedValue(framework);
        if (EcEncryptedValue.encryptOnSaveMap[c.id] != true)
            c = EcEncryptedValue.toEncryptedValue(c);
    }
    repo.saveTo(c, function () {
        repo.saveTo(framework, function() {
            framework = EcConceptScheme.getBlocking(framework.id);
            afterSave();
        }, console.log);
    }, console.log);
    refreshSidebar();
}

deleteConcept = function (c) {
    if (viewMode) return;
    if (c == null) c = selectedCompetency;
    if (c == null) {
        if (isFirstEdit) {
            spitEvent("frameworkDeleted", framework.shortId());
            if (defaultPage == "#frameworksSection")
                searchFrameworks(createParamObj());
            else
                showPage(defaultPage);
            $('[id="'+framework.shortId()+'"').remove();
        }
        else {
            showConfirmDialog(function (confirmed) {
                if (confirmed === true) {
                    repo.deleteRegistered(framework, function (success) {
                        spitEvent("frameworkDeleted", framework.shortId());
                        $('[id="'+framework.shortId()+'"').remove();
                        if (defaultPage == "#frameworksSection")
                            searchFrameworks(createParamObj());
                        else
                            showPage(defaultPage);
                        EcConcept.search(repo, "skos\\:inScheme:\"" + framework.shortId() + "\"", function (concepts) {
                            for (var i = 0; i < concepts.length; i++)
                                repo.deleteRegistered(concepts[i], console.log, console.error);
                        }, console.error);
                        framework = null;
                        selectedCompetency = null;
                        framework = null;
                        selectedCompetency = null;
                    }, console.log);
                }
                hideConfirmDialog();
            }, "Are you sure you want to delete this concept scheme? This will also delete all concepts referenced in this scheme.", "Cancel", "Confirm");
        }
    } else {
        showConfirmDialog(function (confirmed) {
            if (confirmed === true) {
                deleteConceptInner(c);

                framework["schema:dateModified"] = new Date().toISOString();
                selectedRelation = null;
                selectedCompetency = null;
                refreshSidebar();
            }
            hideConfirmDialog();
        }, "Are you sure you want to delete this concept?", "Cancel", "Confirm", "delete", selectedCompetency.shortId());
    }
}

deleteConceptInner = function (c) {
    if (c["skos:broader"] != null)
        for (var i = 0; i < c["skos:broader"].length; i++)
            EcConcept.get(c["skos:broader"][i], function (concept) {
                EcArray.setRemove(concept["skos:narrower"], c.shortId());
                if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[concept.id] != true) {
                    concept = EcEncryptedValue.toEncryptedValue(concept);
                }
                repo.saveTo(concept, afterSave, console.error);
            }, console.error);
    if (c["skos:narrower"] != null)
        for (var i = 0; i < c["skos:narrower"].length; i++)
            EcConcept.get(c["skos:narrower"][i], function (concept) {
                deleteConceptInner(concept);
            }, console.error);
    if (c["skos:topConceptOf"] != null) {
        EcArray.setRemove(framework["skos:hasTopConcept"], c.shortId());
        if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[framework.id] != true) {
            framework = EcEncryptedValue.toEncryptedValue(framework);
        }
        repo.saveTo(framework, function() {
            framework = EcConceptScheme.getBlocking(framework.id);
            afterSave();
        }, console.error);
    }
    repo.deleteRegistered(c, afterSave, console.error);
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
                if (c["skos:broader"] != null) {
                    for (var i = 0; i < c["skos:broader"].length; i++)
                        EcConcept.get(c["skos:broader"][i], function (concept) {
                            EcArray.setRemove(concept["skos:narrower"], c.shortId());
                            if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[concept.id] != true) {
                                concept = EcEncryptedValue.toEncryptedValue(concept);
                            }
                            repo.saveTo(concept, afterSave, console.error);
                        }, console.error);
                    delete c["skos:broader"];
                }
                delete c["skos:topConceptOf"];
                if (EcArray.has(framework["skos:hasTopConcept"], c.shortId())) {
                    EcArray.setRemove(framework["skos:hasTopConcept"], c.shortId());
                    if ($("#private")[0].checked) {
                        if (EcEncryptedValue.encryptOnSaveMap[framework.id] != true)
                            framework = EcEncryptedValue.toEncryptedValue(framework);
                    }
                    repo.saveTo(framework, function() {
                        framework = EcFramework.getBlocking(framework);
                        afterSave();
                    }, console.error);
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
        thing["skos:topConceptOf"] = targetThing.shortId();
        if (targetThing["skos:hasTopConcept"] == null)
            targetThing["skos:hasTopConcept"] = [];
        EcArray.setAdd(targetThing["skos:hasTopConcept"], thing.shortId());
    } else if (targetThing.isAny(new EcConcept().getTypes())) {
        if (targetThing["skos:narrower"] == null)
            targetThing["skos:narrower"] = [];
        EcArray.setAdd(targetThing["skos:narrower"], thing.shortId());
        if (thing["skos:broader"] == null)
            thing["skos:broader"] = [];
        EcArray.setAdd(thing["skos:broader"], targetThing.shortId());
        delete thing["skos:topConceptOf"];
        EcArray.setRemove(framework["skos:hasTopConcept"], thing.shortId());
    }
    // replaced selected concept with changed concept
    selectedCompetency = thing;
    refreshSidebar();
    if ($("#private")[0].checked) {
        if (EcEncryptedValue.encryptOnSaveMap[thing.id] != true)
            thing = EcEncryptedValue.toEncryptedValue(thing);
        if (EcEncryptedValue.encryptOnSaveMap[targetThing.id] != true)
            targetThing = EcEncryptedValue.toEncryptedValue(targetThing);
    }
    repo.saveTo(thing, function () {
        repo.saveTo(targetThing, afterSave, console.error);
    }, console.error);

}

detangleConcepts = function (me, data, targetData) {

    var part3 = function () {
        if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[c.id] != true) {
            c = EcEncryptedValue.toEncryptedValue(c);
        }
        repo.saveTo(c, function () {
            dropAnyConcept(data, targetData);
        }, console.error); //Saving main competency.
    }

    var part2 = function () {
        var foundAgain = false;
        EcArray.setRemove(c["skos:broader"], me.parent().parent().attr("id"));
        if (c["skos:broader"] == null || c["skos:broader"].length == 0) {
            EcArray.setAdd(framework["skos:hasTopConcept"], c.shortId());
            c["skos:topConceptOf"] = framework.shortId();
            if ($("#private")[0].checked) {
                if (EcEncryptedValue.encryptOnSaveMap[c.id] != true)
                    c = EcEncryptedValue.toEncryptedValue(c);
                if (EcEncryptedValue.encryptOnSaveMap[framework.id] != true)
                    framework = EcEncryptedValue.toEncryptedValue(framework);
            }
            repo.saveTo(framework, function () {
                repo.saveTo(c, function() {
                    c = EcConcept.getBlocking(c.id);
                    framework = EcConceptScheme.getBlocking(framework.id);
                    part3();
                }, console.error); //Saving framework again.
            }, console.error);
            foundAgain = true;
        }
        if (!foundAgain)
            part3();
    }

    var found = false;
    var c = EcConcept.getBlocking(me.attr("id"));
    if (c["skos:broader"] != null) {
        for (var i = 0; i < c["skos:broader"].length; i++)
            if (c["skos:broader"][i] == me.parent().parent().attr("id")) {
                var concept = EcConcept.getBlocking(c["skos:broader"][i]);
                EcArray.setRemove(concept["skos:narrower"], c.shortId());
                if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[concept.id] != true) {
                    concept = EcEncryptedValue.toEncryptedValue(concept);
                }
                repo.saveTo(concept, part2, console.error); //Saving parent concept again.
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
                delete c["skos:topConceptOf"];
                data.competency = c;
                if (EcArray.has(framework["skos:hasTopConcept"], c.shortId())) {
                    EcArray.setRemove(framework["skos:hasTopConcept"], c.shortId());
                    if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[framework.id] != true) {
                        framework = EcEncryptedValue.toEncryptedValue(framework);
                    }
                    repo.saveTo(framework, function () {
                        framework = EcConceptScheme.getBlocking(framework.id);
                        dropAnyConcept(data, targetData);
                    }, console.error); //Saving framework.
                    found = true;
                }
                if (!found)
                    dropAnyConcept(data, targetData);
            }
            var found = false;
            if (c["skos:broader"] != null) {
                var narrows = c["skos:broader"];
                delete c["skos:broader"];
                for (var i = 0; i < narrows.length; i++)
                    EcConcept.get(narrows[i], function (concept) {
                        EcArray.setRemove(concept["skos:narrower"], c.shortId());
                        if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[concept.id] != true) {
                            concept = EcEncryptedValue.toEncryptedValue(concept);
                        }
                        repo.saveTo(concept, stage2, console.error); //Saving previous parent.
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

//Touchscreen drag and drop
handleTouchStartConcept = function (event) {
    event.stopPropagation();
    $(event.srcElement).click();
    setGlobalTouchDragDataConcept(event.srcElement);
}

handleTouchMoveConcept = function (event) {
    event.stopPropagation();
    $('.competency').addClass('dashBorder');
    var x = event.touches[0].clientX;
    var y = event.touches[0].clientY;
    var hoverElem = document.elementFromPoint(x, y);
    if (hoverElem.classList.contains('competencyName') || hoverElem.classList.contains('competencyDescription') || hoverElem.classList.contains('competencyCodedNotation'))
        hoverElem = hoverElem.parentNode.parentNode;
    if (hoverElem.classList.contains('competency') || hoverElem.id == "frameworkNameContainer") {
        $('.selected').removeClass('selected');
        hoverElem.classList.add('selected');
        globalTouchDragDestinationConcept = hoverElem.id;
    }
}

handleTouchEndConcept = function (event) {
    event.stopPropagation();
    if (globalTouchDragDestinationConcept != null && globalTouchDragDataConcept != null) {
        //Unlink competency
        if (globalTouchDragDestinationConcept == "frameworkNameContainer") {
            unlinkCompetency();
        } else {
            var targetElem = $(document.getElementById(globalTouchDragDestinationConcept));
            var targetCompetencyId = targetElem.attr('id');
            var targetRelationId = targetElem.attr('relationId');
            var targetData = {
                competencyId: targetCompetencyId,
                relationId: targetRelationId
            };

            if (globalTouchDragDataConcept.competencyId != targetData.competencyId)  {
                EcConcept.get(globalTouchDragDataConcept.competencyId, function (c) {
                    if (!ev.shiftKey) {
                        var stage2 = function () {
                            var found = false;
                            delete c["skos:topConceptOf"];
                            globalTouchDragDataConcept.competency = c;
                            if (EcArray.has(framework["skos:hasTopConcept"], c.shortId())) {
                                EcArray.setRemove(framework["skos:hasTopConcept"], c.shortId());
                                if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[framework.id] != true) {
                                    framework = EcEncryptedValue.toEncryptedValue(framework);
                                }
                                repo.saveTo(framework, function () {
                                    framework = EcConceptScheme.getBlocking(framework);
                                    dropAnyConcept(globalTouchDragDataConcept, targetData);
                                }, console.error); //Saving framework.
                                found = true;
                            }
                            if (!found)
                                dropAnyConcept(globalTouchDragDataConcept, targetData);
                        }
                        var found = false;
                        if (c["skos:broader"] != null) {
                            var narrows = c["skos:broader"];
                            delete c["skos:broader"];
                            for (var i = 0; i < narrows.length; i++)
                                EcConcept.get(narrows[i], function (concept) {
                                    EcArray.setRemove(concept["skos:narrower"], c.shortId());
                                    if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[concept.id] != true) {
                                        concept = EcEncryptedValue.toEncryptedValue(concept);
                                    }
                                    repo.saveTo(concept, stage2, console.error); //Saving previous parent.
                                    found = true;
                                }, console.error);
                        }
                        if (!found)
                            stage2();
                    }
                });
                dropAnyConcept(globalTouchDragDataConcept, targetData);
            }
        }
    }
    $('.competency').removeClass('dashBorder');
    globalTouchDragDataConcept = null;
    globalTouchDragDestinationConcept = null;
}

//Recursively get the li element we want for touchdrag
setGlobalTouchDragDataConcept = function (obj) {
    if (obj.localName === "li") {
        //Super hacky, needs a more robust solution (attribute length may change and this would break)
        var competencyId = obj.attributes[8].value;
        var relationId = Object.keys(obj.attributes).length > 9 ? obj.attributes[9].value : null;

        globalTouchDragDataConcept = {
            competencyId: competencyId,
            relationId: relationId
        };
    } else {
        setGlobalTouchDragDataConcept(obj.parentNode);
    }
}

addConceptAlignments = function(targets, thing, relationType) {
    var relation = "";
    if (relationType.indexOf(":") == -1) {
        relation += "skos:";
    }
    relation += relationType;
    for (var i = 0; i < targets.length; i++) {
        if (thing[relation] == null) {
            thing[relation] = [];
        }
        thing[relation].push(targets[i]);
    }
    if ($("#private")[0].checked) {
        if (EcEncryptedValue.encryptOnSaveMap[thing.id] != true)
            thing = EcEncryptedValue.toEncryptedValue(thing);
        if (EcEncryptedValue.encryptOnSaveMap[framework.id] != true)
            framework = EcEncryptedValue.toEncryptedValue(framework);
    }
    repo.saveTo(thing, function() {
        repo.saveTo(framework, function() {
            if (conceptMode) {
                framework = EcConceptScheme.getBlocking(framework.id);
            }
            else {
                framework = EcFramework.getBlocking(framework.id);
            }
            afterSaveRender();
        }, error);
    }, error);
}

moveUpConcept = function () {
    var moveThisId = selectedCompetency.shortId();
    var moveThis = EcConcept.getBlocking(moveThisId);
    var done = false;
    for (var i = 0; i < framework["skos:hasTopConcept"].length; i++) {
        if (framework["skos:hasTopConcept"][i].startsWith(moveThisId)) {
            done = true;
            if (i != 0) {
                //Swap with previous sibling
                framework["skos:hasTopConcept"][i] = framework["skos:hasTopConcept"][i-1];
                framework["skos:hasTopConcept"][i-1] = moveThisId;
                if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[framework.id] != true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                repo.saveTo(framework, function() {
                    framework = EcConceptScheme.getBlocking(framework.id);
                    afterSave();
                }, error);
            }
            break;
        }
    }
    if (!done) {
        var parentId = EcArray.isArray(moveThis["skos:broader"]) ? moveThis["skos:broader"][0] : moveThis["skos:broader"];
        var parent = EcConcept.getBlocking(parentId);
        for (var i = 0; i < parent["skos:narrower"].length; i++) {
            if (parent["skos:narrower"][i].startsWith(moveThisId)) {
                done = true;
                if (i != 0) {
                    //Swap with previous sibling
                    parent["skos:narrower"][i] = parent["skos:narrower"][i-1];
                    parent["skos:narrower"][i-1] = moveThisId;
                    if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[parent.id] != true) {
                        parent = EcEncryptedValue.toEncryptedValue(parent);
                    }
                    repo.saveTo(parent, function() {
                        parent = EcConcept.getBlocking(parentId);
                        afterSave();
                    }, error);
                }
                break;
            }
        }
    }  
}

moveDownConcept = function () {
    var moveThisId = selectedCompetency.shortId();
    var moveThis = EcConcept.getBlocking(moveThisId);
    var done = false;
    for (var i = 0; i < framework["skos:hasTopConcept"].length; i++) {
        if (framework["skos:hasTopConcept"][i].startsWith(moveThisId)) {
            done = true;
            if (i != framework["skos:hasTopConcept"].length-1) {
                //Swap with next sibling
                framework["skos:hasTopConcept"][i] = framework["skos:hasTopConcept"][i+1];
                framework["skos:hasTopConcept"][i+1] = moveThisId;
                if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[framework.id] != true) {
                    framework = EcEncryptedValue.toEncryptedValue(framework);
                }
                repo.saveTo(framework, function() {
                    framework = EcConceptScheme.getBlocking(framework.id);
                    afterSave();
                }, error);
            }
            break;
        }
    }
    if (!done) {
        var parentId = EcArray.isArray(moveThis["skos:broader"]) ? moveThis["skos:broader"][0] : moveThis["skos:broader"];
        var parent = EcConcept.getBlocking(parentId);
        for (var i = 0; i < parent["skos:narrower"].length; i++) {
            if (parent["skos:narrower"][i].startsWith(moveThisId)) {
                done = true;
                if (i != parent["skos:narrower"].length-1) {
                    //Swap with next sibling
                    parent["skos:narrower"][i] = parent["skos:narrower"][i+1];
                    parent["skos:narrower"][i+1] = moveThisId;
                    if ($("#private")[0].checked && EcEncryptedValue.encryptOnSaveMap[parent.id] != true) {
                        parent = EcEncryptedValue.toEncryptedValue(parent);
                    }
                    repo.saveTo(parent, function() {
                        parent = EcConcept.getBlocking(parentId);
                        afterSave();
                    }, error);
                }
                break;
            }
        }
    }  
}

function encryptConcepts(c) {
    var toSave = [];

    var concepts = c["skos:hasTopConcept"] ? c["skos:hasTopConcept"] : c["skos:narrower"];
    new EcAsyncHelper().each(concepts, function (conceptId, done) {
        EcRepository.get(conceptId, function (concept) {
            concept.addOwner(EcIdentityManager.ids[0].ppk.toPk());
            if (concept["skos:narrower"] && concept["skos:narrower"].length > 0) {
                encryptConcepts(concept);
            }
            if (EcEncryptedValue.encryptOnSaveMap[concept.id] != true) {
                concept = EcEncryptedValue.toEncryptedValue(concept);
            }
            toSave.push(concept);
            done();
        }, done);
    }, function (conceptIds) {
        for (var i = 0; i < toSave.length; i++) {
            repo.saveTo(toSave[i], function() {}, error);
        }
    });
}


function decryptConcepts(c) {
    var concepts = c["skos:hasTopConcept"] ? c["skos:hasTopConcept"] : c["skos:narrower"];

    new EcAsyncHelper().each(concepts, function (conceptId, done) {
        EcRepository.get(conceptId, function (concept) {
            var v;
            if (concept.isAny(new EcEncryptedValue().getTypes())) {
                v = new EcEncryptedValue();
                v.copyFrom(concept);
            }
            else {
                v = EcEncryptedValue.toEncryptedValue(concept);
            }
            concept = new EcConcept();
            concept.copyFrom(v.decryptIntoObject());
            EcEncryptedValue.encryptOnSave(concept.id, false);
            if (concept["skos:narrower"]) {
                decryptConcepts(concept);
            }
            repo.saveTo(concept, done, done);
        }, done);
    }, function (conceptIds) {
        populateConceptScheme();
    });
}
