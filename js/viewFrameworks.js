if (queryParams.select != null)
    if (parent != window)
        $("#frameworksBack").show();

function searchFrameworks(paramObj) {
    loading("Loading frameworks...");
    var searchTerm = $("#search").val();
    if (searchTerm == null || searchTerm == "")
        searchTerm = "*";
    $("#frameworks").html("");
    searchCompetencies = [];
    for (var i = 0; i < servers.length; i++) {
        frameworkSearch(servers[i], searchTerm, null, paramObj);
        if (viewMode)
            if (searchTerm != "*") {
                frameworkSearchByCompetency(servers[i], searchTerm);
            }
    }
}
var frameworkLoading = 0;

function frameworkSearch(server, searchTerm, subsearchTerm, paramObj, retry) {
    frameworkLoading++;
    var search = "";
    if (queryParams.filter != null)
        search = "(" + searchTerm + ") AND (" + queryParams.filter + ")";
    else
        search = searchTerm;
    EcFramework.search(server, search, function (frameworks) {
        for (var v = 0; v < frameworks.length; v++) {
            var fx = frameworks[v];
            if (fx.name === undefined || fx.name == null || fx.name == "")
                continue;
            if ($("[id='" + fx.shortId() + "']").length == 0) {
                if ($("#frameworks").children().length > 0)
                    $("#frameworks").append("<hr/>");
                var p = $("#frameworks").append("<p><a/><span/></p>").children().last();

                p.attr("id", fx.shortId());
                p.attr("subsearch", subsearchTerm);
                p.click(function (evt) {
                    loading("Loading framework...");
                    var frameworkId = null
                    frameworkId = $(evt.target).attr("id");
                    if (frameworkId == null)
                        frameworkId = $(evt.target).parent().attr("id");
                    EcFramework.get(frameworkId, function (f) {
                        framework = f;
                        populateFramework(subsearchTerm);
                        selectedCompetency = null;
                        refreshSidebar();
                    }, error);
                });
                var title = p.children().first();
                title.text(fx.getName());
                if (subsearchTerm != null)
                    p.prepend("<span style='float:right'>*Matches inside. <span>");
                var desc = p.children().last();
                desc.text(fx.getDescription());
                if (searchTerm != "*" && subsearchTerm == null)
                    p.mark(searchTerm);
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

function frameworkSearchByCompetency(server, searchTerm) {
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
    }, console.log, {
        size: 5000
    });
}

$("#search").keyup(function (event) {
    if (event.keyCode == '13') {
        searchFrameworks(createParamObj(5000));
    }
    return false;
});
