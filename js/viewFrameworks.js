function searchFrameworks() {
    loading("Loading frameworks...");
    var searchTerm = $("#search").val();
    if (searchTerm == null || searchTerm == "")
        searchTerm = "*";
    $("#frameworks").html("");
    searchCompetencies = [];
    for (var i = 0; i < servers.length; i++) {
        frameworkSearch(servers[i], searchTerm);
    }
}
var frameworkLoading = 0;

function frameworkSearch(server, searchTerm) {
    frameworkLoading++;
    var search = "";
    if (queryParams.filter != null)
        search = "(" + searchTerm + ") AND (" + queryParams.filter + ")";
    else
        search = searchTerm;
    EcFramework.search(server, search, function (frameworks) {
        showPage("#frameworksSection");
        for (var v = 0; v < frameworks.length; v++) {
            var fx = frameworks[v];
            if (fx.name === undefined || fx.name == null || fx.name == "")
                continue;
            if ($("[id='" + fx.shortId() + "']").length == 0) {
                var p = $("#frameworks").append("<p><a/><span/></p>").children().last();
                p.attr("id", fx.shortId());
                p.click(function (evt) {
                    loading("Loading framework...");
                    var frameworkId = null
                    frameworkId = $(evt.target).attr("id");
                    if (frameworkId == null)
                        frameworkId = $(evt.target).parent().attr("id");
                    EcFramework.get(frameworkId, function (f) {
                        framework = f;
                        populateFramework();
                        selectedCompetency = null;
                        refreshSidebar();
                    }, error);
                });
                var title = p.children().first();
                title.text(fx.getName());
                var desc = p.children().last();
                desc.text(fx.getDescription());
                if (searchTerm != "*")
                    p.mark(searchTerm);
            }
        }
        frameworkLoading--;
        if (frameworkLoading == 0) {
            if ($("#frameworks").html() == "")
                $("#frameworks").html("<center>No frameworks found.</center>");
        }
    }, console.log, {
        size: 5000
    });
}

$("#search").keyup(function (event) {
    if (event.keyCode == '13') {
        searchFrameworks();
    }
    return false;
});
