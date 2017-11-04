var importFiles = [];

function showFiles(files) {
    importFiles = files;

    importFile();
}

function importFile() {
    var file = importFiles[0];
    loading(file.name);
    $("#csvImportHeader").text("Import " + file.name);
    $("#importCsvFrameworkName").val(file.name.replace(".csv", ""));
    if (file.name.endsWith(".csv")) {
        CSVImport.analyzeFile(file, function (data) {
            $("#importCsvColumnName").html("<option>N/A</option>");
            $("#importCsvColumnDescription").html("<option>N/A</option>");
            $("#importCsvColumnScope").html("<option>N/A</option>");
            $("#importCsvColumnId").html("<option>N/A</option>");
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
            $("#csvImportSection #importButton").text("Import " + (data.length - 1) + " items.");
            showPage("#csvImportSection");
        }, function (error) {
            {
                alert(error);
                showPage("importSection");
            }
        });
    }
}

function importCsv() {

    var nameIndex = parseInt($("#importCsvColumnName option:selected").attr("index"));
    var descriptionIndex = parseInt($("#importCsvColumnDescription option:selected").attr("index"));
    var scopeIndex = parseInt($("#importCsvColumnScope option:selected").attr("index"));
    var idIndex = parseInt($("#importCsvColumnId option:selected").attr("index"));
    var sourceIndex = parseInt($("#importCsvColumnSource option:selected").attr("index"));
    var relationTypeIndex = parseInt($("#importCsvColumnRelationType option:selected").attr("index"));
    var targetIndex = parseInt($("#importCsvColumnTarget option:selected").attr("index"));

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
