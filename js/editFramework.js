addCompetency = function () {
    var addOrSearch = $("#sidebarAddCompetencies").val();
    if (addOrSearch == "search") {} else if (addOrSearch == "add") {
        var c = new EcCompetency();
        c.generateId(repo.selectedServer);
        framework.addCompetency(c.id);
        if (EcIdentityManager.ids.length > 0)
            c.addOwner(EcIdentityManager.ids[0].ppk.toPk());
        c.name = "New Competency";
        EcRepository.save(c, function () {
            if (selectedCompetency != null) {
                var r = new EcAlignment();
                r.generateId(repo.selectedServer);
                r.target = selectedCompetency.shortId();
                r.source = c.shortId();
                r.relationType = Relation.NARROWS;
                if (EcIdentityManager.ids.length > 0)
                    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
                framework.addRelation(r.id);
                EcRepository.save(r, function () {
                    EcRepository.save(framework, function () {
                        selectedCompetency = c;
                        refreshSidebar();
                        editSidebar();
                        $("#sidebarNameInput").focus();
                    }, error);
                }, error);
            } else {
                EcRepository.save(framework, function () {
                    selectedCompetency = c;
                    refreshSidebar();
                    editSidebar();
                    $("#sidebarNameInput").focus();
                }, error);
            }
        }, error);
    }
}
saveCompetency = function () {
    if (selectedCompetency == null) {
        framework.name = $("#sidebarNameInput").val();
        framework.description = $("#sidebarDescriptionInput").val();

        EcRepository.save(framework, function () {
            populateFramework();
        }, error);
    } else {
        selectedCompetency.name = $("#sidebarNameInput").val();
        selectedCompetency.description = $("#sidebarDescriptionInput").val();

        EcRepository.save(selectedCompetency, function () {}, error);
    }
}

createFramework = function () {
    if ($("#name").val() == null || $("#name").val().trim() == "")
        return;
    framework = new EcFramework();
    framework.generateId(repo.selectedServer);
    if (EcIdentityManager.ids.length > 0)
        framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
    framework.name = $("#name").val();
    if ($("#description").val() != null && $("#description").val() != "")
        framework.description = $("#description").val();
    loading("Creating framework...");
    EcRepository.save(framework, function () {
        populateFramework();
    }, error);
}
