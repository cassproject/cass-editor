function searchConceptSchemes(paramObj) {
    loading("Loading concept schemes...");
    var searchTerm = $("#search").val();
    if (searchTerm == null || searchTerm == "")
        searchTerm = "*";
    $("#frameworks").html("");
    searchCompetencies = [];
    for (var i = 0; i < servers.length; i++) {
        conceptSchemeSearch(servers[i], searchTerm, null, paramObj);
        if (viewMode)
            if (searchTerm != "*") {
                conceptSchemeSearchByConcept(servers[i], searchTerm);
            }
    }
}
var frameworkLoading = 0;

function conceptSchemeSearch(server, searchTerm, subsearchTerm, paramObj, retry) {
    frameworkLoading++;
    var search = "";
    if (queryParams.filter != null)
        search = "(" + searchTerm + ") AND (" + queryParams.filter + ")";
    else
        search = searchTerm;
    EcConceptScheme.search(server, search, function (frameworks) {
        for (var v = 0; v < frameworks.length; v++) {
            var fx = frameworks[v];
            if (fx.title === undefined || fx.title == null || fx.title == "")
                continue;
            if ($("[id='" + fx.shortId() + "']").length == 0) {
                if ($("#frameworks").children().length > 0)
                    $("#frameworks").append("<hr/>");
                var p = $("#frameworks").append("<p><a/><span/></p>").children().last();

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
                        populateFramework(subsearchTerm);
                        selectedCompetency = null;
                        refreshSidebar();
                    }, error);
                });
                var title = p.children().first();
                title.text(fx.title);
                if (subsearchTerm != null)
                    p.prepend("<span style='float:right'>*Matches inside. <span>");
                var desc = p.children().last();
                desc.text(fx.description);
                if (searchTerm != "*" && subsearchTerm == null)
                    p.mark(searchTerm);
            }
        }
        frameworkLoading--;
        if (frameworkLoading == 0) {
            if ($("#frameworks").html() == "")
                $("#frameworks").html("<center>No concept schemes found.</center>");
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
            conceptSchemeSearch(server, "\"" + searchTerm + "\"", subsearchTerm, paramObj, true);
        }
    }, paramObj);
}

function conceptSchemeSearchByConcept(server, searchTerm, retry) {
    frameworkLoading++;
    EcConcept.search(server, searchTerm, function (competencies) {
        var subSearch = "";
        for (var v = 0; v < competencies.length; v++) {
            if (subSearch.indexOf(competencies[v].inScheme) != -1)
                continue;
            searchCompetencies.push(competencies[v].shortId());
            if (subSearch != "")
                subSearch += " OR ";
            subSearch += "@id:\"" + competencies[v].inScheme + "\"";
        }
        if (subSearch != "") {
            conceptSchemeSearch(server, subSearch, searchTerm);
        }
        frameworkLoading--;
        if (frameworkLoading == 0) {
            if ($("#frameworks").html() == "")
                $("#frameworks").html("<center>No concept schemes found.</center>");
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
        size: 5000
    });
}
