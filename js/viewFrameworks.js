if (queryParams.select != null)
    if (parent != window)
        $("#frameworksBack").show();

function searchFrameworks(paramObj) {
    if (conceptMode)
        return searchConceptSchemes(paramObj);
    if (paramObj.size == null)
        paramObj.size = 20;
    loading("Loading frameworks...");
    var searchTerm = $("#search").val();
    if (searchTerm == null || searchTerm == "") {
        searchTerm = "*";
        $("#resetSearchButton").hide();
    } else {
        $("#resetSearchButton").show();
    }
    if (searchTerm != "*")
        delete paramObj.sort;
    $("#frameworks").html("");
    searchCompetencies = [];
    for (var i = 0; i < servers.length; i++) {
        frameworkSearch(servers[i], searchTerm, null, paramObj);
        if (searchTerm != "*" && paramObj.frameworksOnly != true) {
            frameworkSearchByCompetency(servers[i], searchTerm);
        }
    }
}
var frameworkLoading = 0;

function frameworkSearch(server, searchTerm, subsearchTerm, paramObj, retry) {
    frameworkLoading++;
    var search = "";
    if (queryParams.filter != null || queryParams.show != null) {
        search = "(" + searchTerm + ")";
        if (queryParams.filter != null)
            search += " AND (" + queryParams.filter + ")";
        if (queryParams.show != null && queryParams.show == "mine") {
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
    } else
        search = searchTerm;
    EcFramework.search(server, search, function (frameworks) {
        for (var v = 0; v < frameworks.length; v++) {
            var fx = frameworks[v];
            if (fx.name === undefined || fx.name == null || fx.name == "")
                continue;
            if ($("#frameworks [id='" + fx.shortId() + "']").length == 0) {
                if ($("#frameworks").children().length > 0)
                    $("#frameworks").append("<hr/>");
                var p = $("#frameworks").append("<p><a/><span/></p>").children().last();

                p.attr("id", fx.shortId());
                p.attr("subsearch", subsearchTerm);
                p.click(function (evt) {
                    loading("Loading framework...");
                    var frameworkId = null;
                    var frameworkTarget = $(evt.target);
                    while (frameworkId == null && frameworkTarget.length > 0) {
                        frameworkId = frameworkTarget.attr("id");
                        frameworkTarget = frameworkTarget.parent();
                    }
                    if (frameworkId == null)
                        error("Critical: Couldn't find framework ID.");
                    EcFramework.get(frameworkId, function (f) {
                        framework = f;
                        spitEvent("frameworkClicked", f.shortId());
                        populateFramework(subsearchTerm);
                        selectedCompetency = null;
                        refreshSidebar();
                    }, error);
                });
                var title = p.children().first();
                title.text(fx.getName());
                title.addClass("frameworkName");
                if (subsearchTerm != null)
                    p.prepend("<span style='float:right'>*Matches inside. <span>");
                var desc = p.children().last();
                desc.addClass("frameworkDescription");
                var description = fx.getDescription();
                desc.text(description);
                if (fx.competency != null)
                    p.append("<span class='properties'>" + fx.competency.length + " items.</span>");
                //Display additional data on frameworks in search results
                if (queryParams.ceasnDataFields == 'true') {
                    if (fx['ceasn:publisherName'] != null) {
                        var publisherName = EcArray.isArray(fx['ceasn:publisherName']) ? fx['ceasn:publisherName'] : [fx['ceasn:publisherName']];
                        for (var i in publisherName) {
                            if (publisherName[i].toLowerCase().indexOf("http") != -1) {
                                var anchor = p;
                                resolveNameFromUrlWithElem(publisherName[i], anchor, function(result, elem) {
                                    if (result != null) {
                                        elem.append("<span class='properties'>" + result + "</span>");
                                    }
                                });
                            } else
                                p.append("<span class='properties'>" + publisherName[i] + "</span>");
                        }
                    }
                    else {
                        if (fx['schema:publisher'] != null) {
                            var publisher = EcArray.isArray(fx['schema:publisher']) ? fx['schema:publisher'] : [fx['schema:publisher']];
                            getArrayOfResolvedUrlsWithElem(publisher, p, function(result, elem) {
                                if (result.length > 0) {
                                    for (var i in result) {
                                        elem.append("<span class='properties'>" + result[i] + "</span>");
                                    }
                                } else {
                                    var creator = EcArray.isArray(fx['schema:creator']) ? fx['schema:creator'] : [fx['schema:creator']];
                                    getArrayOfResolvedUrlsWithElem(creator, elem, function(result2, elem2) {
                                        if (result2.length > 0) {
                                            for (var i in result2) {
                                                elem2.append("<span class='properties'>" + result2[i] + "</span>");
                                            }
                                        }
                                    });
                                }
                            });
                        } else if (fx['schema:creator'] != null) {
                            var creator = EcArray.isArray(fx['schema:creator']) ? fx['schema:creator'] : [fx['schema:creator']];
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
                if (searchTerm != "*" && subsearchTerm == null) {
                    title.mark(searchTerm);
                    desc.mark(searchTerm);
                }
            }
        }
        frameworkLoading--;
        if (frameworkLoading == 0) {
            if ($("#frameworks").html() == "")
                $("#frameworks").html("<center>No frameworks found.</center>");
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
            frameworkSearch(server, "\"" + searchTerm + "\"", subsearchTerm, paramObj, true);
        }
    }, paramObj);
}

function frameworkSearchByCompetency(server, searchTerm, retry) {
    frameworkLoading++;
    EcCompetency.search(server, searchTerm, function (competencies) {
        var subSearch = "";
        for (var v = 0; v < competencies.length; v++) {
            searchCompetencies.push(competencies[v].shortId());
            if (subSearch != "")
                subSearch += " OR ";
            subSearch += "competency:\"" + competencies[v].shortId() + "\"";
            if (!EcRepository.shouldTryUrl(competencies[v].id)) {
                if (subSearch != "")
                    subSearch += " OR ";
                var m = forge.md.md5.create();
                m.update(competencies[v].id);
                var md5 = m.digest().toHex();
                subSearch += "competency:\"" + md5 + "\"";
            }
        }
        if (subSearch != "") {
            frameworkSearch(server, subSearch, searchTerm);
        }
        frameworkLoading--;
        if (frameworkLoading == 0) {
            if ($("#frameworks").html() == "")
                $("#frameworks").html("<center>No frameworks found.</center>");
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

function checkForChangesBeforeBack(event) {
    if ($(".changedField:visible").length > 0) {
        if (!confirm("Some data has changed during edit. Do you want to discard changes?")) {
            event.stopPropagation();
            return;
        } else {
            searchFrameworks(createParamObj(20));
            framework = null;
            selectedCompetency = null;
        }
    } else {
        searchFrameworks(createParamObj(20));
        framework = null;
        selectedCompetency = null;
    }
}

$("#search").keyup(function (event) {
    if (event.keyCode == '13') {
        searchFrameworks(createParamObj(20));
    }
    return false;
});
