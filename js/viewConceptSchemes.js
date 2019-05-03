function searchConceptSchemes(paramObj) {
    if (firstLoad) {
        loading("Loading concept schemes...");
    }
    if (paramObj.size == null)
        paramObj.size = paramSize ? paramSize : 20;
    paramSize = paramObj.size;
    var searchTerm = $("#search").val();
    if (searchTerm == null || searchTerm == "") {
        searchTerm = "*";
        $("#resetSearchButton").hide();
    } else {
        $("#resetSearchButton").show();
    }
    if (searchTerm != "*")
        delete paramObj.sort;
    if (firstLoad) {
        $("#frameworks").html("");
        searchCompetencies = [];
    }
    for (var i = 0; i < servers.length; i++) {
        conceptSchemeSearch(servers[i], searchTerm, null, paramObj);
        if (searchTerm != "*" && firstLoad) {
            firstLoadSubC = true;
            conceptSchemeSearchByConcept(servers[i], searchTerm);
        }
    }
}

function conceptSchemeSearch(server, searchTerm, subsearchTerm, paramObj, retry) {
    frameworkLoading++;
    if (paramObj == null)
        paramObj = {};
    paramObj.sort = '[ { "dcterms:title.keyword": {"order" : "asc" , "missing" : "_last"}} ]';
    var search = "";
    if (queryParams.filter != null || (queryParams.conceptShow != null && EcIdentityManager != null && EcIdentityManager.ids.length > 0)) {
        search = "(" + searchTerm + ")";
        if (queryParams.filter != null)
            search += " AND (" + queryParams.filter + ")";
        if (queryParams.conceptShow != null && queryParams.conceptShow == "mine" && EcIdentityManager != null && EcIdentityManager.ids.length > 0) {
            search += " AND (";
            for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                if (i != 0) {
                    search += " OR ";
                }
                var id = EcIdentityManager.ids[i];
                search += "@owner:\"" + id.ppk.toPk().toPem() + "\"";
            }
            search += ")";
        }
    }
    else
        search = searchTerm;
    EcConceptScheme.search(server, search, function (frameworks) {
        for (var v = 0; v < frameworks.length; v++) {
            var fx = frameworks[v];
            if (fx["dcterms:title"] === undefined || fx["dcterms:title"] == null || fx["dcterms:title"] == "")
                continue;
            if ($("[id='" + fx.shortId() + "']").length == 0) {
                var p;
                //Display in sorted order if new framework has been added
                if ((v > 0) && $("#frameworks [id='" + frameworks[v-1].shortId() + "']").length != 0 && !firstLoad && !firstLoadSubC) {
                    $("#frameworks [id='" + frameworks[v-1].shortId() + "']").after("<hr/>");
                    p = $("#frameworks [id='" + frameworks[v-1].shortId() + "']").next().after("<p><a/><span/></p>").next();
                }
                else if ((v+1 < frameworks.length) && $("#frameworks [id='" + frameworks[v+1].shortId() + "']").length != 0 && !firstLoad && !firstLoadSubC) {
                    $("#frameworks [id='" + frameworks[v+1].shortId() + "']").before("<hr/>");
                    p = $("#frameworks [id='" + frameworks[v+1].shortId() + "']").prev().before("<p><a/><span/></p>").prev();
                }
                else {
                    if ($("#frameworks").children().length > 0)
                        $("#frameworks").append("<hr/>");
                    p = $("#frameworks").append("<p><a/><span/></p>").children().last();
                }

                p.attr("id", fx.shortId());
                p.attr("subsearch", subsearchTerm);
                p.click(function (evt) {
                    loading("Loading concept scheme...");
                    var frameworkId = null;
                    var frameworkTarget = $(evt.target);
                    while (frameworkId == null && frameworkTarget.length > 0) {
                        frameworkId = frameworkTarget.attr("id");
                        frameworkTarget = frameworkTarget.parent();
                    }
                    if (frameworkId == null)
                        error("Critical: Couldn't find concept scheme ID.");
                    EcConceptScheme.get(frameworkId, function (f) {
                        framework = f;
                        spitEvent("frameworkClicked", f.shortId());
                        populateFramework(subsearchTerm);
                        selectedCompetency = null;
                        refreshSidebar();
                    }, error);
                });
                var title = p.children().first();
                var frameworkName = fx["dcterms:title"];
                frameworkName = EcArray.isArray(frameworkName) ? frameworkName : [frameworkName];
                title.text(Thing.getDisplayStringFrom(frameworkName));;
                title.addClass("frameworkName");
                if (subsearchTerm != null)
                    p.prepend("<span style='float:right'>*Matches inside. <span>");
                var desc = p.children().last();
                var frameworkDescription = fx["dcterms:description"];
                frameworkDescription = EcArray.isArray(frameworkDescription) ? frameworkDescription : [frameworkDescription];
                for (var i in frameworkDescription) {
                    if (frameworkDescription[i] != null && frameworkDescription[i] != "")
                        desc.append($('<span class="frameworkDescription">' + Thing.getDisplayStringFrom(frameworkDescription[i]) + '</span>'));
                }
                for (var i = 1; i < frameworkName.length; i++) {
                    p.append("<span class='properties'>AKA: " + Thing.getDisplayStringFrom(frameworkName[i]) + "</span>");
                }
                if (queryParams.ceasnDataFields == "true") {
                    if (fx['ceasn:publisherName'] != null) {
                        var publisherName = EcArray.isArray(fx['ceasn:publisherName']) ? fx['ceasn:publisherName'] : [fx['ceasn:publisherName']];
                        for (var i in publisherName) {
                            if (Thing.getDisplayStringFrom(publisherName[i]).toLowerCase().indexOf("http") != -1) {
                                var anchor = p;
                                resolveNameFromUrlWithElem(name, anchor, function(result, elem) {
                                    if (result != null) {
                                        elem.append("<span class='properties'>" + result + "</span>");
                                    }
                                });
                            } else
                                p.append("<span class='properties'>" + Thing.getDisplayStringFrom(publisherName[i]) + "</span>");
                        }
                    }
                    else {
                        if (fx['dcterms:publisher'] != null) {
                            var publisher = EcArray.isArray(fx['dcterms:publisher']) ? fx['dcterms:publisher'] : [fx['dcterms:publisher']];
                            getArrayOfResolvedUrlsWithElem(publisher, p, function(result, elem) {
                                if (result.length > 0) {
                                    for (var i in result) {
                                        elem.append("<span class='properties'>" + result[i] + "</span>");
                                    }
                                } else {
                                    var creator = EcArray.isArray(fx['dcterms:creator']) ? fx['dcterms:creator'] : [fx['dcterms:creator']];
                                    getArrayOfResolvedUrlsWithElem(creator, elem, function(result2, elem2) {
                                        if (result2.length > 0) {
                                            for (var i in result2) {
                                                elem2.append("<span class='properties'>" + result2[i] + "</span>");
                                            }
                                        }
                                    });
                                }
                            });
                        } else if (fx['dcterms:creator'] != null) {
                            var creator = EcArray.isArray(fx['dcterms:creator']) ? fx['dcterms:creator'] : [fx['dcterms:creator']];
                            getArrayOfResolvedUrlsWithElem(creator, p, function(result, elem) {
                                if (result.length > 0) {
                                    for (var i in result) {
                                        elem.append("<span class='properties'>" + result[i] + "</span>");
                                    }
                                }
                            });
                        }
                    }
                }

                if (fx.canEditAny(EcIdentityManager.getMyPks())) {
                    p.append("<span class='properties'>Editable</span>");
                }
                var object = EcRepository.getBlocking(fx.id);
                if (object.isAny(new EcEncryptedValue().getTypes())) {
                    p.append("<span class='properties'>Private</span>");
                }
                if (searchTerm != "*" && subsearchTerm == null)
                    title.mark(searchTerm);
                    desc.mark(searchTerm);
            }
        }
        frameworkLoading--;
        if (frameworkLoading == 0) {
            if ($("#frameworks").html() == "")
                $("#frameworks").html("<center>No concept schemes found. Create a new concept scheme by clicking the plus sign in the upper right corner.</center>");
            showPage("#frameworksSection");
        }
        if (firstLoad) {
            firstLoad = false;
        }
        if (loadNumber) {
            loadNumber = false;
        }
        if (subsearchTerm != null) {
            firstLoadSubC = false;
        }
        scrollTime = true;
    }, function (failure) {
        frameworkLoading--;
        if (retry == true) {
            loading(failure);
            setTimeout(function () {
                showPage("#frameworksSection");
            }, 2000);
        } else {
            loading("Defaulting to exact search.");
            //var escapedSearch = $("#search").val().replaceAll(/([$-/:-?{-~!"^_`\[\]])/g, "\\$1");
            conceptSchemeSearch(server, "\"" + searchTerm + "\"", subsearchTerm, paramObj, true);
        }
    }, paramObj);
}

function conceptSchemeSearchByConcept(server, searchTerm, retry) {
    frameworkLoading++;
    EcConcept.search(server, searchTerm, function (competencies) {
        var subSearch = "";
        for (var v = 0; v < competencies.length; v++) {
            if (subSearch.indexOf(competencies[v]["skos:inScheme"]) != -1)
                continue;
            searchCompetencies.push(competencies[v].shortId());
            if (subSearch != "")
                subSearch += " OR ";
            subSearch += "@id:\"" + competencies[v]["skos:inScheme"] + "\"";
        }
        if (subSearch != "") {
            conceptSchemeSearch(server, subSearch, searchTerm);
        }
        frameworkLoading--;
        if (frameworkLoading == 0) {
            if ($("#frameworks").html() == "")
                $("#frameworks").html("<center>No concept schemes found. Create a new concept scheme by clicking the plus sign in the upper right corner.</center>");
            showPage("#frameworksSection");
        }
    }, function (failure) {
        frameworkLoading--;
        if (retry == true) {
            loading(failure);
            setTimeout(function () {
                showPage("#frameworksSection");
            }, 2000);
        } else {
            loading("Defaulting to exact search.");
            //var escapedSearch = $("#search").val().replaceAll(/([$-/:-?{-~!"^_`\[\]])/g, "\\$1");
            frameworkSearchByCompetency(server, "\"" + searchTerm + "\"", true);
        }
    }, {
        size: 100
    });
}
