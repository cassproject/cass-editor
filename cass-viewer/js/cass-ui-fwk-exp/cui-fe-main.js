//**************************************************************************************************
// CASS UI Framework Explorer Main Functions
//**************************************************************************************************

//TODO addChildToGraphProfileSummary construct list view for multi node competency cluster
//TODO addChildToListView construct list view for multi node competency cluster
//TODO showCircleGraphSidebarDetails handle multi node packets

//TODO saveFrameworkPublish define and implement


//**************************************************************************************************
// Constants

const CREATE_IMPLIED_RELATIONS_ON_COLLAPSE = true;

const MAX_FWK_SEARCH_SIZE = 10000;

//**************************************************************************************************
// Variables

var availableFrameworkList = [];
var frameworkIdFrameworkMap = {};
var frameworkNameFrameworkMap = {};

var currentFrameworkName;
var currentFrameworkId;
var currentFrameworkFull;
var currentFrameworkRelatedFrameworks;

var userOwnsCurrentFramework;

var currentFrameworkCompetencyData;

var currentD3FrameworkNode;
var currentD3FrameworkNodeString;

var zoomToCompetencyOnOpen = false;
var screenToZoomOnOpen;
var compNameToZoom;
var competencyIdToSave;

var hasFinishedLoading;

var frameworkToOpen;

//**************************************************************************************************
// Utility Functions
//**************************************************************************************************

EcRepository.caching = true;

function getFirstFrameworkIdForName(name) {
    if (name) {
        var n = name.trim();
        if (frameworkNameFrameworkMap[n] && frameworkNameFrameworkMap[n].length > 0) {
            return frameworkNameFrameworkMap[n][0].shortId();
        }
    }
    return null;
}

function getFrameworkName(frameworkId) {
    var fw = frameworkIdFrameworkMap[frameworkId];
    if (fw) return getStringVal(fw.getName());
    else return "Framework not found";
}

function getFrameworkDescription(frameworkId) {
    var fw = frameworkIdFrameworkMap[frameworkId];
    if (fw) return getStringVal(fw.getDescription());
    else return "";
}

//yes...this first if is weird...but it is an easy solution to a problem
// specifically if trying to get the competency name for a D3 circle ID and that D3 circle is the
// outer framework circle...
function getCompetencyName(compId) {
    if (compId == currentFrameworkName) return currentFrameworkName;
    if (currentFrameworkCompetencyData.competencyPacketDataMap[compId]) {
        return currentFrameworkCompetencyData.competencyPacketDataMap[compId].name;
    }
    else return "";
}

function getCassNodePacket(packetId) {
    if (currentFrameworkCompetencyData && currentFrameworkCompetencyData.competencyPacketDataMap &&
        currentFrameworkCompetencyData.competencyPacketDataMap[packetId]) {
        return currentFrameworkCompetencyData.competencyPacketDataMap[packetId].cassNodePacket;
    }
    else return null;
}

function getCompetencyD3NodeTracker(trackerId) {
    if (currentFrameworkCompetencyData && currentFrameworkCompetencyData.competencyD3NodeTrackerMap &&
        currentFrameworkCompetencyData.competencyD3NodeTrackerMap[trackerId]) {
        return currentFrameworkCompetencyData.competencyD3NodeTrackerMap[trackerId];
    }
    else return null;
}

function checkForFrameworkContentsSearchbarEnter(event) {
    if (event.which == 13 || event.keyCode == 13) {
        $(FWK_CONT_SRCH_INPT).autocomplete("close");
        findItemByFrameworkContentsSearchBar($(FWK_CONT_SRCH_INPT).val().trim());
    }
}

//**************************************************************************************************
// Explorer Circle Graph Supporting Functions
//**************************************************************************************************

//d.data.name should be the competency ID or the framework name if the circle is the outer circle....
function getExplorerCgCircleText(d) {
    if (!d || !d.data || !d.data.name) return "UNDEFINED 'D'";
    else if (currentFrameworkCompetencyData.competencyD3NodeTrackerMap[d.data.name]) {
        var text = getCompetencyName(d.data.name);
        if (text == "") text = "UNDEFINED NODE PACKET";
        return text;
    }
    return "UNDEFINED NAME";
}

//**************************************************************************************************
// Alignment Setup Modal
//**************************************************************************************************

function isFrameworkAlignmentSetupInputValid() {
    var fw1 = $(FWL_ALM_FW1).val();
    var fw2 = $(FWL_ALM_FW2).val();
    if (!fw1 || fw1.trim().length == 0 || !fw2 || fw2.trim().length == 0) {
        showModalError(FWK_ALM_SETUP_MODAL,"You must select both frameworks");
        return false;
    } else if (fw1 == fw2) {
        showModalError(FWK_ALM_SETUP_MODAL,"You must select two different frameworks");
        return false;
    }
    return true;
}

function prepFrameworkAlignmentWithFrameworkIds(fw1Id, fw2Id) {
    sendAlignFrameworksMessage(fw1Id,fw2Id);
}

function prepFrameworkAlignment() {
    hideModalError(FWK_ALM_SETUP_MODAL);
    if (isFrameworkAlignmentSetupInputValid()) {
        $(FWK_ALM_SETUP_MODAL).foundation('close');
        prepFrameworkAlignmentWithFrameworkIds($(FWL_ALM_FW1).val(), $(FWL_ALM_FW2).val());
    }
}

function populateFrameworkAlignmentFrameworkDropdowns(ddId, startOnCurrent) {
    var alreadySelected = false;
    $(ddId).empty();
    for (var i = 0; i < availableFrameworkList.length; i++) {
        var fw = availableFrameworkList[i];
        var fwo = $("<option />");
        fwo.val(fw.shortId());
        fwo.text(getStringVal(fw.getName()));
        if (startOnCurrent) {
            if (fw.shortId() == currentFrameworkId) {
                fwo.attr("selected", "true");
            }
        }
        else {
            if ((fw.shortId() != currentFrameworkId) && !alreadySelected) {
                fwo.attr("selected", "true");
                alreadySelected = true;
            }
        }
        $(ddId).append(fwo);
    }
}

function openAlignmentSetupModal() {
    if (!availableFrameworkList || availableFrameworkList.length < 2) {
        showPageError("You must have access to at least 2 frameworks for alignment");
    } else {
        populateFrameworkAlignmentFrameworkDropdowns(FWL_ALM_FW1, true);
        populateFrameworkAlignmentFrameworkDropdowns(FWL_ALM_FW2, false);
        hideModalError(FWK_ALM_SETUP_MODAL);
        hideModalBusy(FWK_ALM_SETUP_MODAL);
        enableModalInputsAndButtons();
        $(FWK_ALM_SETUP_MODAL).foundation('open');
    }
}

//**************************************************************************************************
// Share/Publish Framework Modal
//**************************************************************************************************

function handleSaveFrameworkForShareSuccess() {
    hideModalBusy(FWK_SHARE_MODAL);
    enableModalInputsAndButtons();
    $(FWK_SHARE_MODAL).foundation('close');
}

function handleSaveFrameworkForShareFailure(err) {
    hideModalBusy(FWK_SHARE_MODAL);
    enableModalInputsAndButtons();
    showModalError(FWK_SHARE_MODAL,"Framework sharing failed: " + err);
}

function setFrameworkShareState() {
    for (var i=0;i<contactDisplayList.length;i++) {
        var cdo = contactDisplayList[i];
        if (cdo.pkPem != loggedInPkPem){
            var editCheckBoxId = buildFrameworkShareEditCheckBoxId(cdo.pkPem);
            var viewCheckBoxId = buildFrameworkShareViewCheckBoxId(cdo.pkPem);
            var isAssignedEdit = $("#" + editCheckBoxId).prop("checked");
            var isAssignedView = $("#" + viewCheckBoxId).prop("checked");
            if (isAssignedEdit) currentFrameworkFull.addOwner(cdo.pk);
            else currentFrameworkFull.removeOwner(cdo.pk);
            if (isAssignedView) currentFrameworkFull.addReader(cdo.pk);
            else currentFrameworkFull.removeReader(cdo.pk);
        }
    }
}

function saveFrameworkShare() {
    hideModalError(FWK_SHARE_MODAL);
    showModalBusy(FWK_SHARE_MODAL,"Sharing framework...");
    disableModalInputsAndButtons();
    setFrameworkShareState();
    currentFrameworkFull.save(handleSaveFrameworkForShareSuccess,handleSaveFrameworkForShareFailure,repo);
}

function buildFrameworkShareContactListLineItem(cntName,viewCheckBoxId,editCheckBoxId,viewChecked,editChecked) {
    var cntLi = $("<li/>");
    var cntGridDiv = $("<div/>");
    cntGridDiv.addClass("grid-x");
    var cntNameLi  = $("<div/>");
    cntNameLi.addClass("cell medium-8");
    cntNameLi.html("<span>" + cntName + "</span>");
    cntGridDiv.append(cntNameLi);
    var cntViewDiv  = $("<div/>");
    cntViewDiv.addClass("cell medium-2 text-center");
    var cntViewDivHtml = "<input id=\"" + viewCheckBoxId + "\" type=\"checkbox\"";
    if (viewChecked) cntViewDivHtml += " checked ";
    cntViewDivHtml += "></input>";
    cntViewDiv.html(cntViewDivHtml);
    cntGridDiv.append(cntViewDiv);
    var cntEditDiv  = $("<div/>");
    cntEditDiv.addClass("cell medium-2 text-center");
    var cntEditDivHtml = "<input id=\"" + editCheckBoxId + "\" type=\"checkbox\"";
    if (editChecked) cntEditDivHtml += " checked ";
    cntEditDivHtml += "></input>";
    cntEditDiv.html(cntEditDivHtml);
    cntGridDiv.append(cntEditDiv);
    cntLi.append(cntGridDiv);
    return cntLi;
}

function buildFrameworkShareEditCheckBoxId(contPkPem) {
    return FWK_SHARE_CONT_ED_CB_ID_PREFIX + buildIDableString(contPkPem);
}

function buildFrameworkShareViewCheckBoxId(contPkPem) {
    return FWK_SHARE_CONT_VW_CB_ID_PREFIX + buildIDableString(contPkPem);
}

function buildContactListForFrameworkShare() {
    $(FWK_SHARE_CONT_LIST).empty();
    for (var i=0;i<contactDisplayList.length;i++) {
        var cdo = contactDisplayList[i];
        if (cdo.pkPem != loggedInPkPem && !cdo.hide){
            var cntName = cdo.displayName;
            var editCheckBoxId = buildFrameworkShareEditCheckBoxId(cdo.pkPem);
            var viewCheckBoxId = buildFrameworkShareViewCheckBoxId(cdo.pkPem);
            var viewChecked = currentFrameworkFull.hasReader(cdo.pk);;
            var editChecked = currentFrameworkFull.hasOwner(cdo.pk);
            var cntLi = buildFrameworkShareContactListLineItem(cntName,viewCheckBoxId,editCheckBoxId,viewChecked,editChecked);
            $(FWK_SHARE_CONT_LIST).append(cntLi);
        }
    }
}

function setUpFrameworkShareModalView() {
    $(FWK_SHARE_FWK_NAME).html(currentFrameworkName);
    if (contactDisplayList && contactDisplayList.length > 0) {
        buildContactListForFrameworkShare();
        $(FWK_SHARE_NO_CONT_CTR).hide();
        $(FWK_SHARE_CONT_LIST_HDR_CTR).show();
        $(FWK_SHARE_CONT_LIST_CTR).show();
        $(FWK_SHARE_SAVE_BTN).show();
    }
    else {
        $(FWK_SHARE_CONT_LIST_HDR_CTR).hide();
        $(FWK_SHARE_CONT_LIST_CTR).hide();
        $(FWK_SHARE_SAVE_BTN).hide();
        $(FWK_SHARE_NO_CONT_CTR).show();
    }
}

function openShareFrameworkModal() {
    enableModalInputsAndButtons();
    hideModalError(FWK_SHARE_MODAL);
    hideModalBusy(FWK_SHARE_MODAL);
    setUpFrameworkShareModalView();
    $(FWK_SHARE_MODAL).foundation('open');
}

function isValidPublishDataFromFrameworkPublish() {
    var dest = $(FWK_PUBLISH_DEST).val();
    if (!dest || dest.length == 0) {
        showModalError(FWK_PUBLISH_MODAL,"You must select at least one destination");
        return false;
    }
    return true;
}

//TODO saveFrameworkPublish define and implement
//This function doesn't really do anything at the moment
// Just a place holder for future functionality
function saveFrameworkPublish() {
    hideModalError(FWK_PUBLISH_MODAL);
    if (isValidPublishDataFromFrameworkPublish()) {
        showModalBusy(FWK_PUBLISH_MODAL,"Publishing framework...");
        setTimeout(function() {
                hideModalBusy(FWK_PUBLISH_MODAL);
                enableModalInputsAndButtons();
            },
        3000);
    }
}

function setUpFrameworkPublishModalView() {
    $(FWK_PUBLISH_DEST).val([]);
    $(FWK_PUBLISH_DEST + ":selected").prop("selected", false);
    $(FWK_PUBLISH_FWK_NAME).html(currentFrameworkName);
}

function openPublishFrameworkModal() {
    enableModalInputsAndButtons();
    hideModalError(FWK_PUBLISH_MODAL);
    hideModalBusy(FWK_PUBLISH_MODAL);
    setUpFrameworkPublishModalView();
    $(FWK_PUBLISH_MODAL).foundation('open');
}

//**************************************************************************************************
// Competency Details Modal
//**************************************************************************************************

function saveCompetencyInfoFromFrameworkExpSuccess() {
    zoomToCompetencyOnOpen = true;
    screenToZoomOnOpen = currentScreen;
    loadAndOpenFramework(currentFrameworkId);
    enableModalInputsAndButtons();
    hideModalBusy(COMP_DTL_MODAL);
    $(COMP_DTL_MODAL).foundation('close');
}

function saveCompetencyInfoFromFrameworkExpFailure(err) {
    hideModalBusy(COMP_DTL_MODAL);
    showModalError(COMP_DTL_MODAL,"Competency save failed: " + err);
    enableModalInputsAndButtons();
    if (userOwnsCurrentFramework) {
        $(COMP_DTL_NAME).prop('readonly', false);
        $(COMP_DTL_DESC).prop('readonly', false);
        $(COMP_DTL_SAVE_BTN).show();
    }
}

function getCompetencyForSaveFromFrameworkExpSuccess(ecc) {
    var compName = $(COMP_DTL_NAME).val().trim();
    compNameToZoom = compName;
    ecc.setName(compName);
    ecc.setDescription($(COMP_DTL_DESC).val().trim());
    ecc.save(saveCompetencyInfoFromFrameworkExpSuccess,saveCompetencyInfoFromFrameworkExpFailure,repo);
}

function isValidCompetencyDataFromFrameworkExp() {
    var compName = $(COMP_DTL_NAME).val();
    if (!compName || !compName.trim() || compName.trim().length <= 0) {
        showModalInputAsInvalid(COMP_DTL_NAME);
        showModalError(COMP_DTL_MODAL,"You must enter a competency name");
        return false;
    }
    return true;
}

function saveCompetencyInfoFromFrameworkExp() {
    hideModalError(COMP_DTL_MODAL);
    if (competencyIdToSave && isValidCompetencyDataFromFrameworkExp()) {
        disableModalInputsAndButtons();
        showModalBusy(COMP_DTL_MODAL,"Saving competency...");
        EcCompetency.get(competencyIdToSave,getCompetencyForSaveFromFrameworkExpSuccess,saveCompetencyInfoFromFrameworkExpFailure);
    }
}

function setUpCompetencyDetailsModalView(comp) {
    $(COMP_DTL_NAME).val(getStringVal(comp.getName()).trim());
    $(COMP_DTL_DESC).val(getStringVal(comp.getDescription()).trim());
    $(COMP_DTL_COMP_LINK).html(buildFrameworkCompetencyHyperlink(currentFrameworkId,comp.id,getStringVal(comp.getName()).trim()));
    $(COMP_DTL_FRM_LINK).html(buildFrameworkHyperlink(currentFrameworkId,currentFrameworkName));
    if (userOwnsCurrentFramework) {
        competencyIdToSave = comp.getId();
        $(COMP_DTL_NAME).prop('readonly', false);
        $(COMP_DTL_DESC).prop('readonly', false);
        $(COMP_DTL_SAVE_BTN).show();
    }
    else {
        competencyIdToSave = null;
        $(COMP_DTL_NAME).prop('readonly', true);
        $(COMP_DTL_DESC).prop('readonly', true);
        $(COMP_DTL_SAVE_BTN).hide();
    }
}

function openCompetencyDetailsModal(compId) {
    var cpd = currentFrameworkCompetencyData.competencyPacketDataMap[compId];
    if (!cpd) return;
    var comp = cpd.cassNodePacket.getNodeList()[0];
    if (!comp) return;
    setUpCompetencyDetailsModalView(comp);
    enableModalInputsAndButtons();
    hideModalError(COMP_DTL_MODAL);
    hideModalBusy(COMP_DTL_MODAL);
    $(COMP_DTL_MODAL).foundation('open');
}


//**************************************************************************************************
// Open Framework Auto Complete/Modal
//**************************************************************************************************

function openFrameworkOpenModal() {
    clearOpenFrameworkSearchBar();
    enableModalInputsAndButtons();
    hideModalError(OPEN_FWK_MODAL);
    hideModalBusy(OPEN_FWK_MODAL);
    $(OPEN_FWK_MODAL).foundation('open');
}

function buildOpenFrameworkSearchAutoCompleteData() {
    var data = [];
    for (var frameworkId in frameworkIdFrameworkMap) {
        if (frameworkIdFrameworkMap.hasOwnProperty(frameworkId)) {
            data.push({
                label:getStringVal(frameworkIdFrameworkMap[frameworkId].getName()),
                value:frameworkId
            });
        }
    }
    return data;
}

function fillInOpenFrameworkSearchAutoComplete() {
    $(OPEN_FWK_SRCH_INPT).autocomplete({
        appendTo: OPEN_FWK_MODAL,
        source: buildOpenFrameworkSearchAutoCompleteData(),
        select: function (event, ui) {
            event.preventDefault();
            $(OPEN_FWK_SRCH_INPT).val(ui.item.label);
            $(OPEN_FWK_SRCH_INPT).autocomplete("close");
            $(OPEN_FWK_MODAL).foundation('close');
            loadAndOpenFramework(ui.item.value);
        },
        focus: function(event, ui) {
            event.preventDefault();
            $(OPEN_FWK_SRCH_INPT).val(ui.item.label);
        }
    });
}

function checkForOpenFrameworkSearchbarEnter(event) {
    if (event.which == 13 || event.keyCode == 13) {
        var firstFwId = getFirstFrameworkIdForName($(OPEN_FWK_SRCH_INPT).val().trim());
        if (firstFwId) {
            $(OPEN_FWK_SRCH_INPT).autocomplete("close");
            $(OPEN_FWK_MODAL).foundation('close');
            loadAndOpenFramework(firstFwId);
        }
    }
}

//**************************************************************************************************
// Framework Contents Search Auto Complete
//**************************************************************************************************

function findItemByFrameworkContentsSearchBar(selectedValue) {
    if (competencySearchAutoCompleteMap.hasOwnProperty(selectedValue)) {
        if ($(GRAPH_SCREEN).attr("style").indexOf("none") < 0) {
            zoomExpCircleGraphByAutoComplete(selectedValue);
        } else {
            scrollToCompInListView(selectedValue);
        }
    }
}

function buildFrameworkContentsSearchAutoCompleteDataFromAutoCompleteMap() {
    var data = [];
    for (var property in competencySearchAutoCompleteMap) {
        if (competencySearchAutoCompleteMap.hasOwnProperty(property)) {
            if (property != "Framework not found") data.push(property);
        }
    }
    return data;
}

function fillInFrameworkContentsSearchAutoComplete() {
    $(FWK_CONT_SRCH_INPT).autocomplete({
        source: buildFrameworkContentsSearchAutoCompleteDataFromAutoCompleteMap(),
        select: function (event, ui) {
            findItemByFrameworkContentsSearchBar(ui.item.label);
        }
    });
}

//**************************************************************************************************
// List View
//**************************************************************************************************

function expandListViewToObject(expObj) {
    if (expObj.hasClass("collapsed") || expObj.hasClass("expanded")) {
        expObj.removeClass('collapsed').addClass('expanded');
        expObj.children('.title').children('.fa-li').removeClass('fa-caret-right').addClass('fa-caret-down');
        if (expObj.parent("ul") && expObj.parent("ul").hasClass("fa-ul")) {
            expObj.parent("ul").attr('style', 'display:block');
        }
        if (expObj.parent("ul").parent("li")) {
            expandListViewToObject(expObj.parent("ul").parent("li"));
        }
    }
}

function expandListViewToName(name) {
    var obj = $("#" + buildIDableString(name) + "_lvi");
    obj.attr('style', 'display:block');
    if (obj.parent("ul") && obj.parent("ul").hasClass("fa-ul")) {
        obj.parent("ul").attr('style', 'display:block');
    }
    if (obj.parent("ul").parent("li")) {
        expandListViewToObject(obj.parent("ul").parent("li"));
    }
}

function scrollToCompInListView(compName) {
    if ($('#' + buildIDableString(compName) + "_lvi").length > 0) {
        expandListViewToName(compName);
        $('html, body').animate({
            scrollTop: ($('#' + buildIDableString(compName) + "_lvi").offset().top - LIST_VIEW_SCROLL_ITEM_OFFSET)
        }, 500);
    }
}

function generateCompetencyLineItemHtmlForListView(cpd, compNode, hasChildren) {
    var liHtml = "<span class=\"competency-type\">" +
        "<a onclick=\"openCompetencyDetailsModal('" + compNode.getId().trim() + "');\">" +
        "<i class=\"fa fa-info-circle\" title=\"Show more details\" aria-hidden=\"true\"></i></a></span>" +
        "<h4 class=\"title\">";
    if (hasChildren) liHtml += "<i class=\"fa-li fa fa-caret-right\"></i>";
    if (compNode.getName() != null) liHtml += compNode.getName().trim() + "</h4>";
    else liHtml += "</h4>";
    if (compNode.getDescription() != null) liHtml += "<p>" + compNode.getDescription().trim() + "</p>";
    return liHtml;
}

//TODO addChildToListView construct list view for multi node competency cluster
function addChildToListView(parentUl, childCcn) {
    var childLi = $("<li/>");
    var cpd = currentFrameworkCompetencyData.competencyPacketDataMap[childCcn.id];
    var compNode = cpd.cassNodePacket.getNodeList()[0]; //TODO: What if there are multiple nodes in the same packet?
    if (childCcn.children && childCcn.children.length > 0) childLi.addClass("collapsed");
    childLi.attr("id", buildIDableString(getStringVal(compNode.getName()).trim()) + "_lvi");
    var hasChildren = childCcn.children && childCcn.children.length > 0;
    childLi.html(generateCompetencyLineItemHtmlForListView(cpd, compNode, hasChildren));
    if (hasChildren) {
        childCcn.children.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        var childsChildUl = $("<ul/>");
        childsChildUl.attr("class", "fa-ul");
        childsChildUl.attr("style", "display:none");
        $(childCcn.children).each(function (i, cc) {
            addChildToListView(childsChildUl, cc);
        });
        childLi.append(childsChildUl);
    }
    parentUl.append(childLi);
}

function addFrameworkCompetenciesToListView() {
    $(FWK_CONTENTS_LIST).empty();
    var d3fn = currentD3FrameworkNode;
    if (!d3fn || d3fn == null) return;
    if (d3fn.children && d3fn.children.length > 0) {
        d3fn.children.sort(function (a, b) {return a.name.localeCompare(b.name);});
        $(d3fn.children).each(function (i, c) {
            addChildToListView($(FWK_CONTENTS_LIST), c);
        });
    }
}

function buildListView() {
    addFrameworkCompetenciesToListView();
    setCompetencyListViewActions();
}

//**************************************************************************************************
// Graph View Sidebar (Right-Hand Side)
//**************************************************************************************************

//d.data.name should be the competency ID or the framework name if the circle is the outer circle....
function addCompetencyGraphSidebarParentToList(cl, d3Node) {
    if (d3Node.parent) {
        var compName = getCompetencyName( d3Node.parent.data.name.trim());
        var cLiHtml = " <li title=\"Find '" + escapeSingleQuote(compName) + "'\" onclick=\"zoomExpCgByD3NodeId('" + d3Node.parent.data.name.trim() + "',true)\">" +
            "<i class=\"fa-li fa fa-arrow-circle-up\"></i><a><strong>" + compName + "</strong></a></li>";
        cl.append(cLiHtml);
    }
}

//d.data.name should be the competency ID or the framework name if the circle is the outer circle....
function addCompetencyGraphSidebarChildrenToList(cl, d3Node) {
    if (d3Node.children) {
        $(d3Node.children).each(function (i, c) {
            var compName = getCompetencyName(c.data.name.trim());
            var cLiHtml = " <li title=\"Find '" + escapeSingleQuote(compName) + "'\" onclick=\"zoomExpCgByD3NodeId('" + c.data.name.trim() + "',true)\">" +
                "<i class=\"fa-li fa fa-arrow-circle-o-right\"></i><a>" + compName + "</a></li>";
            cl.append(cLiHtml);
        });
    }
}

function buildCompetencyGraphSidebarRelatedList(d3Node) {
    var cl = $(CIR_FCS_DTL_REL_LIST);
    cl.empty();
    if (d3Node && (d3Node.children || d3Node.parent)) {
        addCompetencyGraphSidebarParentToList(cl, d3Node);
        addCompetencyGraphSidebarChildrenToList(cl, d3Node);
    }
}

function showCompetencyGraphSidebarSingleNodePacketDetails(cpd) {
    var compNode = cpd.cassNodePacket.getNodeList()[0];
    scrollCompNodeInGraphViewSummary(compNode);
    $(CIR_FCS_COMP_TOOLS).show();
    $(CIR_FCS_DTL_COMP_DTL_LINK).off("click").click(function () {
        openCompetencyDetailsModal(compNode.getId().trim());
    });
    $(CIR_FCS_DTL_SING_NAME).html(getStringVal(compNode.getName()).trim());
    if (compNode.getDescription() && getStringVal(compNode.getDescription()).trim().length > 0) {
        $(CIR_FCS_DTL_SING_DESC).html(getStringVal(compNode.getDescription()).trim());
    }
    else $(CIR_FCS_DTL_SING_DESC).html("<i>No description available</i>");
    //use the D3Node instead of the competencyPacketData here because the root competencies point back to the framework as a parent
    var d3n = currentFrameworkCompetencyData.competencyD3NodeTrackerMap[cpd.id];
    buildCompetencyGraphSidebarRelatedList(d3n.d3Node);
    showCircleSidebarDetails();
}

//TODO showCircleGraphSidebarDetails handle multi node packets
function showCircleGraphSidebarDetails(compId) {
    hideCircleSidebarDetails();
    if (!compId || compId == null) return;
    else if (compId == currentFrameworkName) removeAllGraphViewSummaryHighLighting();
    else {
        var cpd = currentFrameworkCompetencyData.competencyPacketDataMap[compId];
        if (!cpd || cpd == null) debugMessage("Cannot locate competency data for: " + compId);
        else {
            if (!cpd.cassNodePacket || cpd.cassNodePacket == null) debugMessage("cpd.cassNodePacket is null: " + compId);
            else if (!cpd.cassNodePacket.getNodeList() || cpd.cassNodePacket.getNodeList() == null) debugMessage("cpd.cassNodePacket.getNodePacketList() is null: " + compId);
            else if (cpd.cassNodePacket.getNodeList().length == 1) showCompetencyGraphSidebarSingleNodePacketDetails(cpd);
            //else showCompetencyGraphSidebarMultiNodePacketDetails(cpd);
        }
    }
}

//**************************************************************************************************
// Graph View Summary (Left-Hand Side)
//**************************************************************************************************

function expandGraphViewSummaryToObject(toggleObj) {
    if ((toggleObj.prop("tagName") && (toggleObj.prop("tagName").toLowerCase() == "a")) &&
        toggleObj.find('i:first').hasClass("fa-chevron-right")) {
        toggleGraphProfileSummaryChild(toggleObj);
    }
    if (toggleObj.parent().hasClass(CIR_FCS_SUM_ITEM_NON_ROOT_COMP_CLASS)) {
        var parentToToggle = toggleObj.parent().parent().parent().find('a:first');
        if (parentToToggle.hasClass(CIR_FCS_SUM_ITEM_TOGGLE_CLASS_ID)) expandGraphViewSummaryToObject(parentToToggle);
    }

}

function removeAllGraphViewSummaryHighLighting() {
    $(".psiItem.active").removeClass("active");
}

function expandGraphViewSummaryToCompNode(compNode) {
    removeAllGraphViewSummaryHighLighting();
    var toggleObj = $("#" + buildProfileSummaryItemToggleElementId(compNode));
    var liObject = $("#" + buildProfileSummaryItemElementId(compNode));
    liObject.addClass("active");
    if (toggleObj.parent().hasClass(CIR_FCS_SUM_ITEM_ROOT_COMP_CLASS)  &&
        (toggleObj.prop("tagName") && (toggleObj.prop("tagName").toLowerCase() == "a")) &&
        toggleObj.find('i:first').hasClass("fa-chevron-right")) {
            toggleGraphProfileSummaryChild(toggleObj);
    }
    else expandGraphViewSummaryToObject(toggleObj);
}

function scrollCompNodeInGraphViewSummary(compNode) {
    if ($("#" + buildProfileSummaryItemElementId(compNode)).length > 0) {
        expandGraphViewSummaryToCompNode(compNode);
        $(CIR_FCS_SUM_LIST_CTR).scrollTo("#" + buildProfileSummaryItemElementId(compNode), 500);
    }
}

function buildProfileSummaryItemElementId(compNode) {
    return buildIDableString(compNode.getId().trim()) + "_psi";
}

function toggleGraphProfileSummaryChild(ce) {
    if (ce.find('i:first').hasClass("fa-chevron-right")) {
        ce.find('i:first').attr("class", "fa fa-chevron-down");
        ce.parent().find('ul:first').attr("style", "display:block");
    } else {
        ce.find('i:first').attr("class", "fa fa-chevron-right");
        ce.parent().find('ul:first').attr("style", "display:none");
    }
}

function buildProfileSummaryItemToggleElementId(compNode) {
    return buildIDableString(compNode.getId().trim()) + "_psiToggle";
}

function generateCompetencyLineItemHtmlForGraphProfileSummary(compNode, hasChildren) {
    var liHtml = "";
    if (hasChildren) {
        liHtml += "<a class=\"" + CIR_FCS_SUM_ITEM_TOGGLE_CLASS_ID + "\" " +
            " id=\"" + buildProfileSummaryItemToggleElementId(compNode) + "\" + onclick=\"toggleGraphProfileSummaryChild($(this))\">" +
            " <i class=\"fa fa-chevron-right " + CIR_FCS_SUM_ITEM_CLASS_ID + "\" aria-hidden=\"true\"></i></a>";
    }
    else {
        liHtml += "<i id=\"" + buildProfileSummaryItemToggleElementId(compNode) + "\" class=\"fa fa-circle " + CIR_FCS_SUM_ITEM_CLASS_ID +
            " " + CIR_FCS_SUM_ITEM_TOGGLE_CLASS_ID + "\" aria-hidden=\"true\"></i>";
    }
    liHtml += "&nbsp;&nbsp;<a class=\"psiItem\" id=\"" + buildProfileSummaryItemElementId(compNode) + "\" " +
        "onclick=\"zoomExpCgByD3NodeId('" + escapeSingleQuote(compNode.getId().trim()) + "',true)\">" +
        getStringVal(compNode.getName()).trim() + "</a>";
    return liHtml;
}

//TODO addChildToGraphProfileSummary construct list view for multi node competency cluster
function addChildToGraphProfileSummary(parentUl, childCcn, isRootComp) {
    var childLi = $("<li/>");
    if (isRootComp) childLi.addClass(CIR_FCS_SUM_ITEM_ROOT_COMP_CLASS);
    else childLi.addClass(CIR_FCS_SUM_ITEM_NON_ROOT_COMP_CLASS);
    var cpd = currentFrameworkCompetencyData.competencyPacketDataMap[childCcn.id];
        var compNode = cpd.cassNodePacket.getNodeList()[0]; //TODO addChildToGraphProfileSummary construct list view for multi node competency cluster
        var hasChildren = childCcn.children && childCcn.children.length > 0;
        childLi.html(generateCompetencyLineItemHtmlForGraphProfileSummary(compNode, hasChildren));
        if (hasChildren) {
            childCcn.children.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            var childsChildUl = $("<ul/>");
            childsChildUl.attr("class", "fa-ul gpsiChild");
            childsChildUl.attr("style", "display:none");
            $(childCcn.children).each(function (i, cc) {
                addChildToGraphProfileSummary(childsChildUl, cc, false);
            });
            childLi.append(childsChildUl);
        }
    parentUl.append(childLi);
}

function addFrameworkCompetenciesToGraphProfileSummary() {
    $(CIR_FCS_SUM_LIST_CTR).empty();
    var d3fn = currentD3FrameworkNode;
    if (!d3fn || d3fn == null) return;
    if (d3fn.children && d3fn.children.length > 0) {
        d3fn.children.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        var childUl = $("<ul/>");
        childUl.attr("class", "fa-ul gpsiChild");
        $(d3fn.children).each(function (i, c) {
            addChildToGraphProfileSummary(childUl, c, true);
        });
        $(CIR_FCS_SUM_LIST_CTR).append(childUl);
    }
}

function buildRelatedFrameworksGraphProfileSummaryList() {
    $(FWK_REL_FWK_LIST).empty();
    for (var i=0;i<currentFrameworkRelatedFrameworks.length;i++) {
        var fw = frameworkIdFrameworkMap[currentFrameworkRelatedFrameworks[i]];
        if (fw) {
            var relFwLi = $("<li/>");
            var relFwLink = $("<a/>");
            relFwLink.attr("onclick","prepFrameworkAlignmentWithFrameworkIds('" + currentFrameworkId + "','" + fw.shortId() + "');");
            relFwLink.html(getStringVal(fw.getName()));
            relFwLi.append(relFwLink);
            $(FWK_REL_FWK_LIST).append(relFwLi);
        }
    }
}

function addRelatedFrameworksToGraphProfileSummary() {
    if (currentFrameworkRelatedFrameworks.length <= 0) {
        $(FWK_REL_FWK_LIST_CTR).hide();
    }
    else {
        buildRelatedFrameworksGraphProfileSummaryList();
        $(FWK_REL_FWK_LIST_CTR).show();
    }
}

function buildGraphProfileSummary() {
    var frameworkDesc = getFrameworkDescription(currentFrameworkId);
    if (!frameworkDesc || frameworkDesc.trim().length == 0) frameworkDesc = DEFAULT_FRAMEWORK_DESCRIPTION;
    $(CIR_FCS_SUM_DESC).html(frameworkDesc);
    addFrameworkCompetenciesToGraphProfileSummary();
    addRelatedFrameworksToGraphProfileSummary();
}

//**************************************************************************************************
// Build Framework Display
//**************************************************************************************************

function checkForPostDisplayZoom() {
    if (zoomToCompetencyOnOpen) {
        zoomToCompetencyOnOpen = false;
        if (screenToZoomOnOpen && screenToZoomOnOpen == "list-screen") currentScreen = "list-screen";
        $('.screen:visible').fadeOut('fast', function () {
            $("#" + currentScreen).fadeIn('fast',function () {
                findItemByFrameworkContentsSearchBar(compNameToZoom);
            });
        });
    }
}

function buildFrameworkDisplays() {
    showPageAsBusy("Building framework display...");
    clearFrameworkExpCircleSvg();
    buildExpGraphCircles(null, JSON.parse(currentD3FrameworkNodeString));
    buildGraphProfileSummary();
    buildListView();
    hideCircleSidebarDetails();
    showPageMainContentsContainer();
    fillInFrameworkContentsSearchAutoComplete();
    $(FWK_CONT_SRCH_INPT).val("");
    showFrameworkContentsSearchBar();
    hasFinishedLoading = true;
    enableViewToggleButtons();
    setUpAndShowFrameworkExpTools();
    checkForPostDisplayZoom();
}

//**************************************************************************************************
// Framework Display Preparation
//**************************************************************************************************

function prepForFrameworkDisplay(fnpg) {
    showPageAsBusy("Processing collapsed data...");
    currentFrameworkCompetencyData = buildFrameworkCompetencyData(currentFrameworkId,currentFrameworkName,fnpg);
    showPageAsBusy("Prepping framework display nodes...");
    currentD3FrameworkNode = setUpD3FrameworkNodes(currentFrameworkName,currentFrameworkCompetencyData);
    currentD3FrameworkNodeString = buildD3JsonString(currentD3FrameworkNode);
    debugMessage("currentFrameworkCompetencyData");
    debugMessage(currentFrameworkCompetencyData);
    debugMessage("currentD3FrameworkNode:");
    debugMessage(currentD3FrameworkNode);
    debugMessage("currentD3FrameworkNode JSON String:");
    debugMessage(currentD3FrameworkNodeString);
    buildFrameworkDisplays();
}

//**************************************************************************************************
// Framework Collapsing
//**************************************************************************************************

function doesFrameworkHaveCircularDependency(fnpg) {
    for (var i=0;i<fnpg.getNodePacketList().length;i++) {
        var np = fnpg.getNodePacketList()[i];
        if (np.getNodeCount() > 1) return true;
    }
    return false;
}

function frameworkCollapsedCorrectly(fnpg) {
    if (!fnpg || fnpg == null || fnpg.getNodePacketList() == null || fnpg.getNodePacketList().length == 0) {
        return false;
    }
    return true;
}

function handleCollapseFrameworkSuccess(frameworkId,fnpg) {
    debugMessage("Framework collapsed:" + frameworkId);
    debugMessage(fnpg);
    // if (!frameworkCollapsedCorrectly(fnpg)) {
    //     showPageError("Could not determine framework competencies.  Check framework permissions.");
    // }
    // else if (doesFrameworkHaveCircularDependency(fnpg)) {
    //     showFrameworkHasCircularDependencyWarning();
    // }
    // else {
        prepForFrameworkDisplay(fnpg);
    // }
}

function handleCollapseFrameworkFailure(err) {
    showPageError("Could not collapse framework (" + getFrameworkName(currentFrameworkId) + "): " + err);
}

function collapseCurrentFramework() {
    showPageAsBusy("Collapsing framework...");
    var fc = new FrameworkCollapser();
    fc.collapseFramework(repo, currentFrameworkFull, CREATE_IMPLIED_RELATIONS_ON_COLLAPSE, handleCollapseFrameworkSuccess, handleCollapseFrameworkFailure);
}

//**************************************************************************************************
// Selected Framework Loading
//**************************************************************************************************

function handleFetchFrameworkSuccess(framework) {
    currentFrameworkFull = framework;
    userOwnsCurrentFramework = currentFrameworkFull.hasOwner(loggedInPk);
    collapseCurrentFramework();
}

function handleFetchFrameworkFailure(err) {
    showPageError("Could not fetch framework (" + getFrameworkName(currentFrameworkId) + "): " + err);
}

function findCurrentFrameworkRelatedFrameworks() {
    currentFrameworkRelatedFrameworks = [];
    var curFw = frameworkIdFrameworkMap[currentFrameworkId];
    if (curFw){
        var curFwRels =  curFw.relation;
        if (curFwRels) {
            for (var i=0;i<curFwRels.length;i++) {
                for (var frameworkId in frameworkIdFrameworkMap) {
                    if (frameworkIdFrameworkMap.hasOwnProperty(frameworkId) && frameworkId != currentFrameworkId && !currentFrameworkRelatedFrameworks.includes(frameworkId)) {
                        var lkFwRels = frameworkIdFrameworkMap[frameworkId].relation;
                        if(lkFwRels && lkFwRels.includes(curFwRels[i])) {
                            currentFrameworkRelatedFrameworks.push(frameworkId);
                        }
                    }
                }
            }
        }
    }
}

function loadAndOpenFramework(frameworkId) {
    disableViewToggleButtons();
    hideFrameworkExpTools();
    hideFrameworkContentsSearchBar();
    showGraphViewMainContentsScreen();
    currentFrameworkId = frameworkId;
    currentFrameworkName = getFrameworkName(currentFrameworkId);
    setPageFrameworkExplorerName(currentFrameworkName);
    showPageAsBusy("Finding related frameworks...");
    findCurrentFrameworkRelatedFrameworks();
    showPageAsBusy("Loading framework data...");
    EcFramework.get(currentFrameworkId, handleFetchFrameworkSuccess, handleFetchFrameworkFailure);
}

//**************************************************************************************************
// Available Framework Fetching
//**************************************************************************************************

function createSortedAvailableFrameworkList(ownedFrameworkList,unownedFrameworkList) {
    availableFrameworkList = [];
    ownedFrameworkList.sort(function (a, b) {return getStringVal(a.getName()).localeCompare(getStringVal(b.getName()));});
    unownedFrameworkList.sort(function (a, b) {return getStringVal(a.getName()).localeCompare(getStringVal(b.getName()));});
    for (var i=0;i<ownedFrameworkList.length;i++) {
        availableFrameworkList.push(ownedFrameworkList[i]);
    }
    for (var i=0;i<unownedFrameworkList.length;i++) {
        availableFrameworkList.push(unownedFrameworkList[i]);
    }
}

function getInitialFrameworkToExplore() {
    if (frameworkToOpen && frameworkToOpen != "")  return frameworkToOpen;
    else return availableFrameworkList[0].shortId();
}

function buildFrameworkLists(arrayOfEcFrameworks) {
    var ownedFrameworkList = [];
    var unownedFrameworkList = [];
    frameworkIdFrameworkMap = {};
    for (var i=0;i<arrayOfEcFrameworks.length;i++) {
        var cecf = arrayOfEcFrameworks[i];
        try {
            if (cecf && cecf.getName() && getStringVal(cecf.getName()).trim().length > 0) {
                frameworkIdFrameworkMap[cecf.shortId()] = cecf;
                if (!frameworkNameFrameworkMap[getStringVal(cecf.getName()).trim()]) {
                    frameworkNameFrameworkMap[getStringVal(cecf.getName()).trim()] = [];
                }
                frameworkNameFrameworkMap[getStringVal(cecf.getName()).trim()].push(cecf);
                if (cecf.hasOwner(loggedInPk)) {
                    ownedFrameworkList.push(cecf);
                }
                else unownedFrameworkList.push(cecf);
            }
        }
        catch (ex) {
            debugMessage("buildFrameworkLists exception: " + ex);
            debugMessage(cecf);
        }
    }
    if ((ownedFrameworkList.length + unownedFrameworkList.length) <= 0) {
        showNoFrameworksAvailableWarning();
    }
    else {
        createSortedAvailableFrameworkList(ownedFrameworkList,unownedFrameworkList);
        loadAndOpenFramework(getInitialFrameworkToExplore());
    }
}

function handleFetchFrameworksFromRepositorySuccess(arrayOfEcFrameworks) {
    buildFrameworkLists(arrayOfEcFrameworks);
    fillInOpenFrameworkSearchAutoComplete();
}

function handleFetchFrameworksFromRepositoryFailure(err) {
    showPageError("Could not fetch framework list: " + err);
}

function fetchAvailableFrameworks() {
    disableViewToggleButtons();
    hideFrameworkExpTools();
    hideFrameworkContentsSearchBar();
    showGraphViewMainContentsScreen();
    setPageFrameworkExplorerName("Loading...");
    showPageAsBusy("Loading available frameworks...");
    EcFramework.search(repo, null, handleFetchFrameworksFromRepositorySuccess, handleFetchFrameworksFromRepositoryFailure, {'size':MAX_FWK_SEARCH_SIZE});
}


//**************************************************************************************************
// Page Load
//**************************************************************************************************

setPageColorTheme();

function loadPageContents() {
    fetchAvailableFrameworks();
}
