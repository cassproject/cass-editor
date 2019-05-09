var caseImportTemplate = $("#caseImportList").html();
var importCaseAjax;
var isImportCaseCanceled = false;

detectEndpoint1 = function () {
	$("#caseImportSection #importButton").show();
	$("#urlEndpointSuccess").hide();
	$("#urlEndpointError").hide();
	var url = $("#urlEndpoint").val();
	if (url.endsWith("/") == false)
		url += "/";
	$.ajax({
		url: url + "ims/case/v1p0/CFDocuments",
		method: "GET",
		success: function (result, b, c) {
			if (result.CFDocuments == null)
				detectEndpoint2();
			else {
				$("#urlEndpointSuccess").text(result.CFDocuments.length + " frameworks detected.").show();
				$("#caseImportList").html("");
				for (var i = 0; i < result.CFDocuments.length; i++) {
					var doc = result.CFDocuments[i];
					var t = $("#caseImportList").append(caseImportTemplate).children().last();
					t.attr("id", doc.uri);
					t.find(".caseImportTitle").text(doc.title);
				}
				isImportCaseCanceled = false;
				showPage("#caseImportSection");
			}
		},
		failure: detectEndpoint2,
		error: detectEndpoint2
	});
}

detectEndpoint2 = function (error) {
	$("#urlEndpointError").text("No frameworks found. Please check the URL and try again.").show();
}

$("#urlEndpointButton").click(detectEndpoint1);

importCase = function () {
	$("#caseImportSection #importButton").hide();
	$("#caseImportSection input:not(:checked)").parent().remove();
	if (!isImportCaseCanceled) {
		let lis = $(".caseImportTemplate.unfinished");
		if (lis.length == 0) {
			$("#search").val("\"" + $("#urlEndpoint").val() + "\"");
			firstLoad = true;
			searchFrameworks({
				frameworksOnly: true
			});
		} else {
			lis.find("input").hide();
			var id = lis.first().attr("id");
			var uuid = id.split("/")[id.split("/").length - 1];

			$("#caseImportSection [id='" + id + "']").find(".loading").show();
            var identity = EcIdentityManager.ids[0];
            var formData = new FormData();
            if (identity != null)
                formData.append('owner',identity.ppk.toPk().toPem());
			importCaseAjax = $.ajax({
				url: repo.selectedServer + "ims/case/harvest?caseEndpoint=" + $("#urlEndpoint").val() + "&dId=" + uuid,
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
				success: function () {
					$("#caseImportSection [id='" + id + "']").removeClass("unfinished").addClass("finished").find(".loading").hide().parent().find(".success").show();
					EcFramework.get(id, function(f) {
						framework = f;
						spitEvent("importFinished", f.shortId());
					}, error);
					importCase();
				},
				failure: function (failure) {
					$("#caseImportSection [id='" + id + "']").removeClass("unfinished").addClass("finished").find(".loading").hide().parent().find(".error").show().attr("title", failure.statusText);
					importCase();
				},
				error: function (failure) {
					$("#caseImportSection [id='" + id + "']").removeClass("unfinished").addClass("finished").find(".loading").hide().parent().find(".error").show().attr("title", failure.statusText);
					importCase();
				}
			});
		}
	}// if not import canceled
}

importCaseCancel = function () {
	isImportCaseCanceled = true;
	if (importCaseAjax != null)
		importCaseAjax.abort();
}