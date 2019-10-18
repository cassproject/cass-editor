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
        if (conceptMode) {
            CTDLASNCSVConceptImport.analyzeFile(file, function (frameworkCount, competencyCount) {
                $("#ctdlasncsvImportSection #importButton").text("Import " + frameworkCount + " concept schemes and " + competencyCount + " concepts.");
                showPage("#ctdlasncsvImportSection");

            }, function (errorMsg) {
                alert(error);
                showPage("#importSection");
            });
        }
        else {
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
        }
    } else if (file.name.endsWith(".json") || file.name.endsWith(".jsonld")) {
        //Try JSON-LD first, checks for @graph
        analyzeJsonLdFramework(file, function (data, ctdlasn) {
            var invalid = false;
            if (ctdlasn == "ctdlasnConcept") {
                if (queryParams.concepts == "true") {
                    $("#importJsonLdFrameworks").text("1 Concept Scheme Detected.");
                    $("#importJsonLdCompetencies").text(EcObject.keys(data).length-1 + " Concepts Detected.");
                }
                else {
                    alert("Concept Schemes must be imported in the concept scheme editor.");
                    showPage("#importSection");
                    invalid = true;
                }
            }
            else {
                if (queryParams.concepts != "true") {
                    $("#importJsonLdFrameworks").text("1 Framework Detected.");
                    $("#importJsonLdCompetencies").text(EcObject.keys(data).length-1 + " Competencies Detected.");
                }
                else {
                    alert("Frameworks must be imported in the competency editor.");
                    showPage("#importSection");
                    invalid = true;
                }
            }
            asnCompetencyCount = EcObject.keys(data).length;
            if (!invalid && (ctdlasn == "ctdlasn" || ctdlasn == "ctdlasnConcept")) {
                showPage("#jsonLdImportFrameworksSection");
            }
            else if (!invalid) {
                alert("Context is not CTDL-ASN");
                showPage("#importSection");
            }
        }, function (error) {
            {
                //If JSON-LD doesn't work, try JSON
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
                    spitEvent("importFinished", f.shortId());
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
                spitEvent("importFinished", f.shortId());
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
    if (conceptMode) {
        return importCtdlAsnConceptCsv();
    }
    var ceo = null;
    if (EcIdentityManager.ids.length > 0)
        ceo = EcIdentityManager.ids[0];
    CTDLASNCSVImport.importFrameworksAndCompetencies(repo, importFiles[0], function (frameworks, competencies, relations) {
        if (queryParams.ceasnDataFields == true) {
            for (var i = 0; i < frameworks.length; i++) {
                if (frameworks[i]["schema:inLanguage"] == null || frameworks[i]["schema:inLanguage"] === undefined) {
                    setDefaultLanguage();
                    frameworks[i]["schema:inLanguage"] = defaultLanguage;
                }
            }
        }
        var all = frameworks.concat(competencies).concat(relations);
        loading("Saving " + all.length + " objects.");
        repo.multiput(all,function () {
            for (var i = 0; i < frameworks.length; i++) {
                framework = frameworks[i];
                spitEvent("importFinished", frameworks[i].shortId());
            }
            showPage("framework");
            populateFramework();
            selectedCompetency = null;
            refreshSidebar();
        },function (failure) {
            error(failure);
            backPage();
        });
    }, function (failure) {
        error(failure);
        backPage();
    },ceo);
}

function importCtdlAsnConceptCsv() {
    var ceo = null;
    if (EcIdentityManager.ids.length > 0)
        ceo = EcIdentityManager.ids[0];
    CTDLASNCSVConceptImport.importFrameworksAndCompetencies(repo, importFiles[0], function (frameworks, competencies) {
        if (queryParams.ceasnDataFields == true) {
            for (var i = 0; i < frameworks.length; i++) {
                if (frameworks[i]["dcterms:language"] == null || frameworks[i]["dcterms:language"] === undefined) {
                    setDefaultLanguage();
                    frameworks[i]["dcterms:language"] = defaultLanguage;
                }
            }
        }
        var all = frameworks.concat(competencies);
        loading("Saving " + all.length + " objects.");
        repo.multiput(all,function () {
            for (var i = 0; i < frameworks.length; i++) {
                framework = frameworks[i];
                spitEvent("importFinished", frameworks[i].shortId());
            }
            showPage("framework");
            populateFramework();
            selectedCompetency = null;
            refreshSidebar();
        },function (failure) {
            error(failure);
            alert("Failed to save: " + failure);
            backPage();
        });
    }, function (failure) {
        error(failure);
        backPage();
    },ceo);
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
                    spitEvent("importFinished", f.shortId());
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

function analyzeJsonLdFramework(file, success, failure) {
    if (file == null) {
        failure("No file to analyze");
        return;
    }
    if ((file)["name"] == null) {
        failure("Invalid file");
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var result = ((e)["target"])["result"];
        var jsonObj = JSON.parse(result);
        if (jsonObj["@graph"]) {
            if (jsonObj["@context"] == "http://credreg.net/ctdlasn/schema/context/json" || jsonObj["@context"] == "http://credreg.net/ctdl/schema/context/json" 
                || jsonObj["@context"] == "https://credreg.net/ctdlasn/schema/context/json" || jsonObj["@context"] == "https://credreg.net/ctdl/schema/context/json") {
                if (jsonObj["@graph"][0]["@type"].indexOf("Concept") != -1) {
                    success(jsonObj["@graph"], "ctdlasnConcept");
                }
                else {
                    success(jsonObj["@graph"], "ctdlasn");
                }
            }
            else {
                success(jsonObj["@graph"], null);
            }
        }
        else {
            failure("Invalid file");
            return;
        }
    };
    reader.readAsText(file, "UTF-8");
}

function importJsonLdFramework(data) {
    var formData = new FormData();
    if (data != null && data !== undefined) {
        formData.append('data', JSON.stringify(data));
    } else {
        var file = importFiles[0];
        formData.append('file', file);
    }    
    var identity = EcIdentityManager.ids[0];
    if (identity != null)
        formData.append('owner',identity.ppk.toPk().toPem());
    $.ajax({
        url: repo.selectedServer + "ctdlasn",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.indexOf("ctdlasn") != -1) {
                var data1 = data.substring(0, data.indexOf("ctdlasn"));
                var data2 = data.substring(data.indexOf("ctdlasn")+7);
                data = data1 + "data" + data2;
            }
            framework = EcFramework.getBlocking(data);
            showPage("framework");
            populateFramework();
            selectedCompetency = null;
            refreshSidebar();
            spitEvent("importFinished", framework.shortId());
        },
        failure: function (failure) {
            alert("Import failed. Check your import file for any errors.");
            console.log(failure.statusText);
            showPage("#importSection");
        },
        error: function (failure) {
            alert("Import error. Check your import file for any errors.");
            console.log(failure.statusText);
            showPage("#importSection");
        }
    });
    loading("Importing Framework");
}

importCTDLASNURL = function() {
    var url = $("#urlEndpoint").val();
    $.ajax({
        url: url,
        method: "GET",
        success: function (result, b, c) {
            var graph = result["@graph"];
            if (graph != null) {
                importJsonLdFramework(result);
            }
            else {
                importCTDLASNURLError("URL must have an '@graph' field at the top level.");
            }
            if (graph[0]["@type"].indexOf("Concept") != -1) {
                importCTDLASNURLError("Competency Editor cannot be used to import concept schemes.");
            }
        },
        failure: importCTDLASNURLError,
        error: importCTDLASNURLError
    });
}

importCTDLASNURLError = function(msg) {
    if (!msg) {
        msg = "Import Error";
    }
    alert(msg);
    showPage("#importSection");
}
