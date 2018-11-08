var importFiles = [];

function showFiles(files) {
    importFiles = [];
    for (var i = 0; i < files.length; i++)
        importFiles[i] = files[i];
    importFile();
    $("#file")[0].value = "";
}

var maxCsvCompetencies = null;
var maxCsvRelations = null;

function importFile() {
    var file = importFiles[0];
    loading(file.name);
    $("#csvImportHeader").text("Import " + file.name);
    $("#importCsvFrameworkName").val(file.name.replace(".csv", ""));
    if (file.name.endsWith(".csv")) {
        CTDLASNCSVImport.analyzeFile(file, function (frameworkCount, competencyCount) {
            $("#ctdlasncsvImportSection #importButton").text("Import " + frameworkCount + " frameworks and " + competencyCount + " competencies.");
            showPage("#ctdlasncsvImportSection");

        }, function (errorMsg) {
            CSVImport.analyzeFile(file, function (data) {
                $("#importCsvRelation").val(null);
                $(".importCsvRelationOptions").hide();
                $("#importCsvColumnName").html("<option>N/A</option>");
                $("#importCsvColumnDescription").html("<option>N/A</option>");
                $("#importCsvColumnScope").html("<option>N/A</option>");
                $("#importCsvColumnId").html("<option>N/A</option>");
                $("#importCsvTable").show();
                for (var i = 0; i < data[0].length; i++) {
                    $("#importCsvColumnName").append("<option/>").children().last().text(data[0][i]).attr("index", i);
                    if (data[0][i].toLowerCase().indexOf("name") != -1)
                        $("#importCsvColumnName").children().last().prop("selected", true);
                    $("#importCsvColumnDescription").append("<option/>").children().last().text(data[0][i]).attr("index", i);
                    if (data[0][i].toLowerCase().indexOf("description") != -1)
                        $("#importCsvColumnDescription").children().last().prop("selected", true);
                    $("#importCsvColumnScope").append("<option/>").children().last().text(data[0][i]).attr("index", i);
                    if (data[0][i].toLowerCase().indexOf("scope") != -1)
                        $("#importCsvColumnScope").children().last().prop("selected", true);
                    $("#importCsvColumnId").append("<option/>").children().last().text(data[0][i]).attr("index", i);
                    if (data[0][i].toLowerCase().indexOf("id") != -1)
                        $("#importCsvColumnId").children().last().prop("selected", true);
                }
                $("#csvImportSection #importButton").text("Import " + (maxCsvCompetencies = (data.length - 1)) + " items.");
                showPage("#csvImportSection");
            }, function (error) {
                {
                    alert(error);
                    showPage("#importSection");
                }
            });
        });
    } else if (file.name.endsWith(".json")) {
        ASNImport.analyzeFile(file, function (data) {
            $("#importAsnFrameworks").text("1 Framework Detected.");
            $("#importAsnCompetencies").text(EcObject.keys(data).length + " Competencies Detected.");
            asnCompetencyCount = EcObject.keys(data).length;
            showPage("#asnImportSection");
        }, function (error) {
            {
                alert(error);
                showPage("#importSection");
            }
        });
    } else if (file.name.endsWith(".xml")) {
        MedbiqImport.analyzeFile(file, function (data) {
            $("#importMedbiqFrameworks").text("1 Framework Detected.");
            $("#importMedbiqCompetencies").text(EcObject.keys(data).length + " Competencies Detected.");
            asnCompetencyCount = EcObject.keys(data).length;
            showPage("#medbiqImportSection");
        }, function (error) {
            {
                alert(error);
                showPage("#importSection");
            }
        });
    }
}

var asnCompetencyCount = "unknown";

function importMedbiq() {
    var file = importFiles[0];
    var identity = EcIdentityManager.ids[0];
    var f = new EcFramework();
    if (identity != null)
        f.addOwner(identity.ppk.toPk());
    if (newObjectEndpoint != null)
        f.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
    else
        f.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
    f["schema:dateCreated"] = new Date().toISOString();
    f.setName($("#importMedbiqFrameworkName").val());
    f.setDescription($("#importMedbiqFrameworkDescription").val());
    MedbiqImport.importCompetencies(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint, identity, function (competencies) {
            importFiles.splice(0, 1);
            for (var i = 0; i < competencies.length; i++)
                f.addCompetency(competencies[i].shortId());
            repo.saveTo(f, function (success) {
                importFiles.splice(0, 1);
                if (importFiles.length > 0)
                    importFile();
                else {
                    framework = f;
                    populateFramework();
                    selectedCompetency = null;
                    refreshSidebar();
                    if (parent != null && queryParams.origin != null && queryParams.origin != "")
                        parent.postMessage({
                            message: "importFinished",
                            framework: f.id
                        }, queryParams.origin);
                }
            }, function (failure) {
                error(failure);
                backPage();
            });
        },
        function (failure) {
            error(failure);
            backPage();
        },
        function (increment) {
            loading(increment.competencies + "/" + asnCompetencyCount + " competencies imported.")
        }, repo);
}

function importAsn() {
    var file = importFiles[0];
    var identity = EcIdentityManager.ids[0];
    ASNImport.importCompetencies(repo.selectedServer, identity, true, function (competencies, f) {
            importFiles.splice(0, 1);
            if (importFiles.length > 0)
                importFile();
            else {
                framework = f;
                populateFramework();
                selectedCompetency = null;
                refreshSidebar();
                if (parent != null && queryParams.origin != null && queryParams.origin != "")
                    parent.postMessage({
                        message: "importFinished",
                        framework: f.id
                    }, queryParams.origin);
            }
        },
        function (failure) {
            error(failure);
            backPage();
        },
        function (increment) {
            loading(increment.competencies + "/" + asnCompetencyCount + " competencies imported.")
        }, repo);
}

function importCtdlAsnCsv() {
    CTDLASNCSVImport.importFrameworksAndCompetencies(repo, importFiles[0], function (frameworks, competencies, relations) {
        var all = frameworks.concat(competencies).concat(relations);
        var ah = new EcAsyncHelper();
        var counter = 0;
        var failed = 0;
        ah.each(all, function (f, callback) {
            if (f.isAny(new EcFramework().getTypes())) {
                framework = f;
                if (parent != null && queryParams.origin != null && queryParams.origin != "")
                    parent.postMessage({
                        message: "importFinished",
                        framework: f.id
                    }, queryParams.origin);
            }
            Task.asyncImmediate(function (callback2) {
                repo.saveTo(f, function (success) {
                    counter++;
                    loading(ah.counter + " objects remaining to save. " + (failed > 0 ? (failed + " failed to save.") : ""));
                    callback();
                    callback2();
                }, function (failure) {
                    counter++;
                    failed++;
                    loading(ah.counter + " objects remaining to save. " + (failed > 0 ? (failed + " failed to save.") : ""));
                    callback();
                    callback2();
                });
            });
        }, function (allDone) {
            Task.asyncImmediate(function (callback) {
                showPage("framework");
                populateFramework();
                selectedCompetency = null;
                refreshSidebar();
                callback();
            });
        });
    }, function (failure) {
        error(failure);
        backPage();
    });
}

function importCsv() {
    var nameIndex = parseInt($("#importCsvColumnName option:selected").attr("index"));
    var descriptionIndex = parseInt($("#importCsvColumnDescription option:selected").attr("index"));
    var scopeIndex = parseInt($("#importCsvColumnScope option:selected").attr("index"));
    var idIndex = parseInt($("#importCsvColumnId option:selected").attr("index"));
    var sourceIndex = parseInt($("#importCsvColumnSource option:selected").attr("index"));
    var relationTypeIndex = parseInt($("#importCsvColumnRelationType option:selected").attr("index"));
    var targetIndex = parseInt($("#importCsvColumnTarget option:selected").attr("index"));
    var file = importFiles[0];
    var relations = $("#importCsvRelation")[0].files[0];
    var identity = EcIdentityManager.ids[0];

    var f = new EcFramework();
    if (identity != null)
        f.addOwner(identity.ppk.toPk());
    if (newObjectEndpoint != null)
        f.generateShortId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
    else
        f.generateId(newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint);
    f["schema:dateCreated"] = new Date().toISOString();
    f.setName($("#importCsvFrameworkName").val());
    f.setDescription($("#importCsvFrameworkDescription").val());
    CSVImport.importCompetencies(file, newObjectEndpoint == null ? repo.selectedServer : newObjectEndpoint, identity, nameIndex, descriptionIndex, scopeIndex, idIndex, relations, sourceIndex, relationTypeIndex, targetIndex,
        function (competencies, alignments) {
            f.competency = [];
            f.relation = [];
            for (var i = 0; i < competencies.length; i++) {
                f.competency.push(competencies[i].shortId());
            }
            for (var i = 0; i < alignments.length; i++) {
                f.relation.push(alignments[i].shortId());
            }
            repo.saveTo(f, function (success) {
                importFiles.splice(0, 1);
                if (importFiles.length > 0)
                    importFile();
                else {
                    framework = f;
                    populateFramework();
                    selectedCompetency = null;
                    refreshSidebar();
                    if (parent != null && queryParams.origin != null && queryParams.origin != "")
                        parent.postMessage({
                            message: "importFinished",
                            framework: f.id
                        }, queryParams.origin);
                }
            }, function (failure) {
                error(failure);
                backPage();
            });
        },
        function (failure) {
            error(failure);
            backPage();
        },
        function (increment) {
            if (increment.relations != null && increment.relations !== undefined)
                loading(increment.relations + "/" + maxCsvRelations + " relations imported.");
            else if (increment.competencies != null && increment.competencies !== undefined)
                loading(increment.competencies + "/" + maxCsvCompetencies + " competencies imported.");
            else
                loading("Importing...");
        }, false, repo);
}

function analyzeCsvRelation() {
    var file = $("#importCsvRelation")[0].files[0];
    if (file == null)
        $(".importCsvRelationOptions").hide();
    CSVImport.analyzeFile(file, function (data) {
        $("#importCsvColumnSource").html("<option>N/A</option>");
        $("#importCsvColumnRelationType").html("<option>N/A</option>");
        $("#importCsvColumnTarget").html("<option>N/A</option>");
        $(".importCsvRelationOptions").show();
        for (var i = 0; i < data[0].length; i++) {
            $("#importCsvColumnSource").append("<option/>").children().last().text(data[0][i]).attr("index", i);
            if (data[0][i].toLowerCase().indexOf("source") != -1)
                $("#importCsvColumnSource").children().last().prop("selected", true);
            if (data[0][i].toLowerCase().indexOf("origin") != -1)
                $("#importCsvColumnSource").children().last().prop("selected", true);
            $("#importCsvColumnRelationType").append("<option/>").children().last().text(data[0][i]).attr("index", i);
            if (data[0][i].toLowerCase().indexOf("type") != -1)
                $("#importCsvColumnRelationType").children().last().prop("selected", true);
            $("#importCsvColumnTarget").append("<option/>").children().last().text(data[0][i]).attr("index", i);
            if (data[0][i].toLowerCase().indexOf("target") != -1)
                $("#importCsvColumnTarget").children().last().prop("selected", true);
            if (data[0][i].toLowerCase().indexOf("destination") != -1)
                $("#importCsvColumnTarget").children().last().prop("selected", true);
        }
        maxCsvRelations = (data.length - 1);
    }, function (error) {
        {
            alert(error);
            showPage("importSection");
        }
    });
}


$('#importFileForm').on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
}).on('drop', function (e) {
    droppedFiles = e.originalEvent.dataTransfer.files;
    showFiles(droppedFiles);
});

$('#file').on('change', function (e) {
    showFiles(e.target.files);
});
