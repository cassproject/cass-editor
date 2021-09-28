//**************************************************************************************************
// CASS UI Framework Alignment Main Functions
//**************************************************************************************************

//TODO setAlmVisDividedCgViewboxSize make this smarter

//**************************************************************************************************
// Constants

const MAX_FWK_SEARCH_SIZE = 10000;

const CREATE_IMPLIED_RELATIONS = true;

const ALLOW_MANY_TO_MANY_ALM_CARDS = false;

const FWK_ALM_VIS_CG_DIVIDED = "divided";
const FWK_ALM_VIS_CG_MERGED = "merged";

const FWK_ALM_MRG_VIS_UNION_MODE = "union";
const FWK_ALM_MRG_VIS_INTERSECT_MODE = "intersect";

const FWK_ALM_FW1_SIDE_PREFIX = "fwa_fw1";
const FWK_ALM_FW2_SIDE_PREFIX = "fwa_fw2";

const FWK_ALM_VIS_CG_MERGED_CIR_ROOT_NAME = "mergedAlmVisD3Node";
const FWK_ALM_VIS_CG_DIVIDED_CIR_ROOT_NAME = "ROOT";

// Alignment 'Card' Component ID Prefixes
const FWK_ALM_CRD_ID_PREFIX = "fwa_alm_card";
const FWK_ALM_CRD_FW1_CNT_ID_PREFIX = "fw1_comp_cnt";
const FWK_ALM_CRD_FW2_CNT_ID_PREFIX = "fw2_comp_cnt";
const FWK_ALM_CRD_REL_MENU_BTN_PREFIX = "alm_rel_menu_btn";
const FWK_ALM_CRD_REL_SWTCH_DIR_BTN_ID_PREFIX = "alm_switch_dir";
const FWK_ALM_CRD_SAVE_BTN_ID_PREFIX = "alm_save";
const FWK_ALM_CRD_DLT_BTN_ID_PREFIX = "alm_delete";
const FWK_ALM_CRD_BUSY_CTR_ID_PREFIX = "alm_busy_ctr";
const FWK_ALM_CRD_BUSY_IMG_ID_PREFIX = "alm_busy_img";
const FWK_ALM_CRD_BUSY_FIN_IMG_ID_PREFIX = "alm_busy_fin_img";

// Alignment Visualization Component ID Prefixes
const FWK_ALM_VIS_FW1_UNA_ID_PREFIX = "FAV_FW1_UNA_";
const FWK_ALM_VIS_FW1_EQ_ID_PREFIX = "FAV_FW1_EQ_";
const FWK_ALM_VIS_FW1_REL_ID_PREFIX = "FAV_FW1_REL_";
const FWK_ALM_VIS_FW1_BRD_ID_PREFIX = "FAV_FW1_BRD_";
const FWK_ALM_VIS_FW1_DES_ID_PREFIX = "FAV_FW1_DES_";
const FWK_ALM_VIS_FW1_REQ_ID_PREFIX = "FAV_FW1_REQ_";
const FWK_ALM_VIS_FW2_UNA_ID_PREFIX = "FAV_FW2_UNA_";
const FWK_ALM_VIS_FW2_EQ_ID_PREFIX = "FAV_FW2_EQ_";
const FWK_ALM_VIS_FW2_REL_ID_PREFIX = "FAV_FW2_REL_";
const FWK_ALM_VIS_FW2_BRD_ID_PREFIX = "FAV_FW2_BRD_";
const FWK_ALM_VIS_FW2_DES_ID_PREFIX = "FAV_FW2_DES_";
const FWK_ALM_VIS_FW2_REQ_ID_PREFIX = "FAV_FW2_REQ_";

//**************************************************************************************************
// Variables

var availableFrameworkList = [];
var frameworkIdFrameworkMap = {};
var frameworkNameFrameworkMap = {};

var framework1Id = null;
var framework1Name = null;
var framework1Full = null;
var framework1PacketGraph = null;
var framework1CompData = null;
var framework1Relations = null;
var framework1D3Node = null;
var framework1D3NodeString = null;

var framework2Id = null;
var framework2Name = null;
var framework2Full = null;
var framework2PacketGraph = null;
var framework2CompData = null;
var framework2Relations = null;
var framework2D3Node = null;
var framework2D3NodeString = null;

var prepFinishedSuccessCallback;
var prepFinishedFailureCallback;

var alignmentListElemToCpdMap;
var cpdToAlignmentListElemLinkMap;
var cpdToAlignmentListElemMap;

var alignmentCardList;
var currentAlignmentCard;
var lastAlignmentCardIdx;

var almCardIdToCadMap;
var almCardCompToCpdMap;
var almCardToCompNameMap;

var numAlignmentsToSave;
var numAlignmentsSaved;
var alignmentsToSave;
var numAlignmentsToDelete;
var numAlignmentsDeleted;
var alignmentsToDelete;
var numFrameworksToSave;
var numFrameworksSaved;
var frameworksToSave;
var removeAlignmentCardAfterFrameworksSaved = false;

var cpdToCadMap;

var relevantAlignmentRelationshipsMap;
var relevantAlignmentRelationshipsLTR;
var relevantAlignmentRelationshipsRTL;

var initialAlignmentEquivalentToCadsLTR;
var initialAlignmentRelatedToCadsLTR;
var initialAlignmentNarrowsCadsLTR;
var initialAlignmentDesiresCadsLTR;
var initialAlignmentRequiresCadsLTR;

var initialAlignmentEquivalentToCadsRTL;
var initialAlignmentRelatedToCadsRTL;
var initialAlignmentNarrowsCadsRTL;
var initialAlignmentDesiresCadsRTL;
var initialAlignmentRequiresCadsRTL;

var autoAlignmentSuggestedAlignments;
var lastAutoAlignmentSuggestedListSortType;

//d3 circle packing visualization
var currentAlmVisCgView = FWK_ALM_VIS_CG_DIVIDED;
var currentMergedCgMode = FWK_ALM_MRG_VIS_UNION_MODE;
var currentMergedCgHideLabels = true;
var mergedAlmVisD3Node;
var mergedCgNodeToCompMap;
var mergedCgUsedCompsList;
var almVisFw1UnalignedMap;
var almVisFw2UnalignedMap;
var almVisFw1EqMap;
var almVisFw1RelMap;
var almVisFw1BroadMap;
var almVisFw1DesMap;
var almVisFw1ReqMap;
var almVisFw2EqMap;
var almVisFw2RelMap;
var almVisFw2BroadMap;
var almVisFw2DesMap;
var almVisFw2ReqMap;
var mergedAdhList;
var mergedAdhListFw1;
var mergedAdhListFw2;
var mergedAlmVisCgIdToAdhMap;
var dividedAdhList;
var dividedAdhListFw1;
var dividedAdhListFw2;
var dividedRelPathToAdhMap;
var almVisDvdCgRootNodeX;
var almVisDvdCgRootNodeY;
var compIdToAlmVisCchMap;

//**************************************************************************************************
// Data Structures
//**************************************************************************************************
function customAlignmentData() {
    this.relationIds = [];
    this.sourceCpds = [];
    this.targetCpds = [];
    this.alignmentType = "isEquivalentTo";
    this.direction = "LTR";
    this.almCardId = "";
}

function customAlignmentDataSimple() {
    this.relationIds = [];
    this.sourceIds = [];
    this.targetIds = [];
    this.alignmentType = "isEquivalentTo";
    this.direction = "LTR";
}

function alignmentDisplayHelper(sourceFrameworkName, sourceCompetencyName, alignmentType) {
    this.sourceFrameworkName = sourceFrameworkName;
    this.sourceCompetencyName = sourceCompetencyName;
    this.alignmentType = alignmentType;
    this.targetCompetencyNames = [];
    this.elemId = "";
}

function competencyCircleCoordsHelper(transformedX, transformedY, transformedR) {
    this.tX = transformedX;
    this.tY = transformedY;
    this.tR = transformedR;
}

//**************************************************************************************************
// Utility Functions
//**************************************************************************************************

function parseRemoteLinkedDataArrayIntoRelations(rldaArray) {
    var relArray = [];
    if (!rldaArray || rldaArray.length == 0) return relArray;
    for (var i=0;i<rldaArray.length;i++) {
        var rld = rldaArray[i];
        if ("relation" == rld.type.toLowerCase()) {
            var rel = new EcAlignment();
            rel.copyFrom(rld);
            relArray.push(rel);
        }
    }
    return relArray;
}

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

function getFrameworkName(frameworkId) {
    var fw = frameworkIdFrameworkMap[frameworkId];
    //if (fw) return fw.name;
    if (fw) return getStringVal(fw.getName());
    else return "Framework not found";
}

function getSourceFrameworkNameForCad(cad) {
    var sfName;
    if (cad.direction == "LTR") {
        if (cad.alignmentType.toUpperCase() == "NARROWS") sfName = framework2Name;
        else sfName = framework1Name;
    }
    else {
        if (cad.alignmentType.toUpperCase() == "NARROWS") sfName = framework1Name;
        else sfName = framework2Name;
    }
    return sfName;
}

function getTargetFrameworkNameForCad(cad) {
    var tfName;
    if (cad.direction == "LTR") {
        if (cad.alignmentType.toUpperCase() == "NARROWS") tfName = framework1Name;
        else tfName = framework2Name;
    }
    else {
        if (cad.alignmentType.toUpperCase() == "NARROWS") tfName = framework2Name;
        else tfName = framework1Name;
    }
    return tfName;
}

function getFramework1CompetencyDescription(compId) {
    if (compId == framework1Name) return getStringVal(framework1Full.getDescription());
    if (framework1CompData.competencyPacketDataMap[compId]) {
        var cnp = framework1CompData.competencyPacketDataMap[compId].cassNodePacket;
        if (cnp) {
            return generateDescriptionFromCassNodePacket(cnp);
        }
        else return "";
    }
}

function getFramework2CompetencyDescription(compId) {
    if (compId == framework2Name) return getStringVal(framework2Full.getDescription());
    if (framework2CompData.competencyPacketDataMap[compId]) {
        var cnp = framework2CompData.competencyPacketDataMap[compId].cassNodePacket;
        if (cnp) {
            return generateDescriptionFromCassNodePacket(cnp);
        }
        else return "";
    }
}

function getFramework1CompetencyName(compId) {
    if (compId == framework1Name) return framework1Name;
    if (framework1CompData.competencyPacketDataMap[compId]) {
        var cnp = framework1CompData.competencyPacketDataMap[compId].cassNodePacket;
        if (cnp) {
            return generateNameFromCassNodePacket(cnp);
        }
        else return "";
    }
}

function getFramework2CompetencyName(compId) {
    if (compId == framework2Name) return framework2Name;
    if (framework2CompData.competencyPacketDataMap[compId]) {
        var cnp = framework2CompData.competencyPacketDataMap[compId].cassNodePacket;
        if (cnp) {
            return generateNameFromCassNodePacket(cnp);
        }
        else return "";
    }
}

function getCompetencyNameFromEitherFramework(compId) {
    var cn = getFramework1CompetencyName(compId);
    if (!cn || cn == null || cn == "") cn = getFramework2CompetencyName(compId);
    return cn;
}

function getCompetencyDescriptionFromEitherFramework(compId) {
    var cd = getFramework1CompetencyDescription(compId);
    if (!cd || cd == null || cd == "") cd = getFramework2CompetencyDescription(compId);
    return cd;
}

function removeCpdFromCpdArray(arr,cpd) {
    if (!arr) return arr;
    for (var i=0;i<arr.length;i++) {
        if(arr[i].id == cpd.id) {
            arr.splice(i, 1);
        }
    }
    return arr;
}

function removeStringFromArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function buildPrettyAlignmentTypeFromAlignmentType(alignmentType,reverseNarrows) {
    var prettyAt = alignmentType;
    switch (alignmentType.toUpperCase()) {
        case 'ISEQUIVALENTTO':
            prettyAt = "Is Equivalent To";
            break;
        case 'ISRELATEDTO':
            prettyAt = "Is Related To";
            break;
        case 'NARROWS':
            if (reverseNarrows) prettyAt = "Broadens";
            else prettyAt = "Narrows";
            break;
        case 'DESIRES':
            prettyAt = "Desires";
            break;
        case 'REQUIRES':
            prettyAt = "Requires";
            break;
    }
    return prettyAt;
}

function buildPrettyInverseAlignmentTypeFromAlignmentType(alignmentType) {
    var prettyIat = alignmentType;
    switch (alignmentType.toUpperCase()) {
        case 'ISEQUIVALENTTO':
            prettyIat = "Is Equivalent To";
            break;
        case 'ISRELATEDTO':
            prettyIat = "Is Related To";
            break;
        case 'NARROWS':
            prettyIat = "Broadens";
            break;
        case 'DESIRES':
            prettyIat = "Is Desired By";
            break;
        case 'REQUIRES':
            prettyIat = "Is Required By";
            break;
    }
    return prettyIat;
}

function getLastPieceOfCassId(cassId) {
    return cassId.substring(cassId.lastIndexOf("/") + 1);
}

function openFrameworkExplorer(frameworkId) {
    sendInitFrameworkExplorerMessage(frameworkId);
}

//**************************************************************************************************
// Alignment Circle Graph Supporting Functions
//**************************************************************************************************

//d.data.name should be the competency ID or the framework name if the circle is the outer circle....
function getAlignmentDividedCgCircleText(d) {
    if (!d || !d.data || !d.data.name) return "UNDEFINED 'D'";
    else if (d.data.name == FWK_ALM_VIS_CG_DIVIDED_CIR_ROOT_NAME) return FWK_ALM_VIS_CG_DIVIDED_CIR_ROOT_NAME;
    else if (d.data.name == framework1Name) return framework1Name;
    else if (d.data.name == framework2Name) return framework2Name;
    else if (framework1CompData.competencyPacketDataMap[d.data.name]) {
        var text = getFramework1CompetencyName(d.data.name);
        if (text == "") text = "UNDEFINED NODE PACKET";
        return text;
    }
    else if (framework2CompData.competencyPacketDataMap[d.data.name]) {
        var text = getFramework2CompetencyName(d.data.name);
        if (text == "") text = "UNDEFINED NODE PACKET";
        return text;
    }
    return "UNDEFINED NAME";
}

//**************************************************************************************************
// Auto Alignment Modal
//**************************************************************************************************

function refreshAlignmentViewFromAutoAlign() {
    hideModalBusy(FWK_ALM_AUTO_ALM_MODAL);
    enableModalInputsAndButtons();
    //prepFrameworkAlignmentWithFrameworkIds(framework1Id, framework2Id, true);
    buildFrameworkDataForAlignments(framework1Id,framework2Id,true);
    $(FWK_ALM_AUTO_ALM_MODAL).foundation('close');
}

function checkAllFrameworksSavedForAutoAlignment() {
    if (numFrameworksSaved >= numFrameworksToSave) {
        refreshAlignmentViewFromAutoAlign();
    }
}

function saveFrameworksForAutoAlignmentToServerSuccess() {
    debugMessage("Framework saved success");
    numFrameworksSaved++;
    checkAllFrameworksSavedForAutoAlignment();
}

function saveFrameworksForAutoAlignmentToServerFailure(err) {
    debugMessage("!!!!!!!!!!!!!! Framework saved failed: " + err);
    numFrameworksSaved++;
    checkAllFrameworksSavedForAutoAlignment();
}

function saveFrameworksToServerForAutoAlignment() {
    numFrameworksToSave = frameworksToSave.length;
    numFrameworksSaved = 0;
    if (frameworksToSave.length == 0) refreshAlignmentViewFromAutoAlign();
    for (var i = 0; i < frameworksToSave.length; i++) {
        frameworksToSave[i].save(saveFrameworksForAutoAlignmentToServerSuccess, saveFrameworksForAutoAlignmentToServerFailure, repo);
    }
}

function saveAutoAlignmentsToOwnedFrameworks() {
    frameworksToSave = [];
    //if (loggedInIdentityOwnsObject(framework1Full)) {
    if (framework1Full.hasOwner(loggedInPk)) {
        addSavedAlignmentsToFramework(framework1Full);
        frameworksToSave.push(framework1Full);
    }
    //if (loggedInIdentityOwnsObject(framework2Full)) {
    if (framework2Full.hasOwner(loggedInPk)) {
        addSavedAlignmentsToFramework(framework2Full);
        frameworksToSave.push(framework2Full);
    }
    saveFrameworksToServerForAutoAlignment();
}

function checkAllAutoAlignmentsSaved() {
    if (numAlignmentsSaved >= numAlignmentsToSave) {
        saveAutoAlignmentsToOwnedFrameworks();
    }
}

function saveAutoAlignmentsToServerSuccess() {
    debugMessage("Alignment saved success");
    numAlignmentsSaved++;
    checkAllAutoAlignmentsSaved();
}

function saveAutoAlignmentsToServerFailure(err) {
    debugMessage("!!!!!!!!!!!!!! Alignment saved failed: " + err);
    numAlignmentsSaved++;
    checkAllAutoAlignmentsSaved();
}

function saveAutoAlignmentsToServer() {
    numAlignmentsToSave = alignmentsToSave.length;
    numAlignmentsSaved = 0;
    for (var i = 0; i < alignmentsToSave.length; i++) {
        alignmentsToSave[i].save(saveAutoAlignmentsToServerSuccess, saveAutoAlignmentsToServerFailure, repo);
    }
}

function buildAlignmentsToSaveFromAutoAlignmentSuggestions() {
    alignmentsToSave = [];
    for (var i = 0; i < autoAlignmentSuggestedAlignments.length; i++) {
        if ($("#" + buildAutoAlignmentSuggestionSelectionCheckBoxId(i)).prop("checked")) {
            debugMessage("Found selected alignment suggestion: " + i);
            debugMessage(autoAlignmentSuggestedAlignments[i]);
            alignmentsToSave.push(autoAlignmentSuggestedAlignments[i]);
        }
    }
}

function applySelectedSuggestedAutoAlignments() {
    $(FWK_ALM_AUTO_ALM_RESULTS_BTN_CTR).hide();
    showModalBusy(FWK_ALM_AUTO_ALM_MODAL,"Saving selected alignments...");
    buildAlignmentsToSaveFromAutoAlignmentSuggestions();
    if (alignmentsToSave.length == 0) $(FWK_ALM_AUTO_ALM_MODAL).foundation('close');
    else {
        disableModalInputsAndButtons();
        saveAutoAlignmentsToServer();
    }
}


function getAutoAlignmentSuggestionListSortType(byFw) {
    var sortType;
    if (lastAutoAlignmentSuggestedListSortType.startsWith(byFw)) {
        if (lastAutoAlignmentSuggestedListSortType.indexOf("asc") > -1) {
            sortType = byFw + "-desc";
        }
        else sortType = byFw + "-asc";
    }
    else sortType = byFw + "-asc";
    lastAutoAlignmentSuggestedListSortType = sortType;
    return sortType;
}

function sortAutoAlignmentSuggestionList(byFw) {
    var list = document.getElementById(FWK_ALM_AUTO_ALM_RESULTS_LIST_SIMP);
    var switching = true;
    var sortType = getAutoAlignmentSuggestionListSortType(byFw);
    while (switching) {
        switching = false;
        var childLis = list.getElementsByTagName("li");
        for (var i = 0; i < (childLis.length - 1); i++) {
            var shouldSwitch = false;
            if (sortType == "fw1-asc") {
                if (childLis[i].querySelectorAll(".fw1Name")[0].innerHTML > childLis[i + 1].querySelectorAll(".fw1Name")[0].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            }
            else if (sortType == "fw1-desc") {
                if (childLis[i].querySelectorAll(".fw1Name")[0].innerHTML < childLis[i + 1].querySelectorAll(".fw1Name")[0].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            }
            else if (sortType == "fw2-asc") {
                if (childLis[i].querySelectorAll(".fw2Name")[0].innerHTML > childLis[i + 1].querySelectorAll(".fw2Name")[0].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            }
            else {
                if (childLis[i].querySelectorAll(".fw2Name")[0].innerHTML < childLis[i + 1].querySelectorAll(".fw2Name")[0].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            childLis[i].parentNode.insertBefore(childLis[i + 1], childLis[i]);
            switching = true;
        }
    }
}

function updateAutoAlignmentSuggestionsSelectedCount() {
    $(FWK_ALM_AUTO_ALM_NUM_SUG).html(autoAlignmentSuggestedAlignments.length);
    var numSelected = 0;
    for (var i = 0; i < autoAlignmentSuggestedAlignments.length; i++) {
        if ($("#" + buildAutoAlignmentSuggestionSelectionCheckBoxId(i)).prop("checked")) numSelected++;
    }
    $(FWK_ALM_AUTO_ALM_NUM_SEL).html(numSelected);
}

function deselectAllAutoAlignmentSuggestions() {
    for (var i = 0; i < autoAlignmentSuggestedAlignments.length; i++) {
        $("#" + buildAutoAlignmentSuggestionSelectionCheckBoxId(i)).prop('checked', false);
    }
    updateAutoAlignmentSuggestionsSelectedCount();
}

function selectAllAutoAlignmentSuggestions() {
    for (var i = 0; i < autoAlignmentSuggestedAlignments.length; i++) {
        $("#" + buildAutoAlignmentSuggestionSelectionCheckBoxId(i)).prop('checked', true);
    }
    updateAutoAlignmentSuggestionsSelectedCount();
}

function buildAutoAlignmentSuggestionSelectionCheckBoxId(sugIdx) {
    return FWK_ALM_AUTO_ALM_SUG_SEL_CB_PREFIX + sugIdx;
}

//TODO getSuggestionDisplayDataFromSuggestionAlignment account for mutli competency node cluster
function getSuggestionDisplayDataFromSuggestionAlignment(sugEca) {
    var fw1Cpt = null;
    var fw2Cpt = null;
    if (framework1CompData.competencyPacketDataMap[sugEca.source]) fw1Cpt = framework1CompData.competencyPacketDataMap[sugEca.source];
    else fw2Cpt = framework2CompData.competencyPacketDataMap[sugEca.source];
    if (fw1Cpt == null) fw1Cpt = framework1CompData.competencyPacketDataMap[sugEca.target];
    if (fw2Cpt == null) fw2Cpt = framework2CompData.competencyPacketDataMap[sugEca.target];
    if (!fw1Cpt || fw1Cpt == null || !fw1Cpt.cassNodePacket || !fw1Cpt.cassNodePacket.getNodeList() || fw1Cpt.cassNodePacket.getNodeList().length <= 0 ||
        !fw2Cpt || fw2Cpt == null || !fw2Cpt.cassNodePacket || !fw2Cpt.cassNodePacket.getNodeList() || fw2Cpt.cassNodePacket.getNodeList().length <= 0) return null;
    var sdd = {};
    var fw1Comp = fw1Cpt.cassNodePacket.getNodeList()[0];
    var fw2Comp = fw2Cpt.cassNodePacket.getNodeList()[0];
    sdd["fw1Name"] = fw1Comp.getName();
    sdd["fw2Name"] = fw2Comp.getName();
    sdd["fw1Desc"] = fw1Comp.getDescription();
    sdd["fw2Desc"] = fw2Comp.getDescription();
    if (sugEca.relationType.toUpperCase() == "ISEQUIVALENTTO") sdd["relation"] = "Is Equivalent To";
    else if (sugEca.relationType.toUpperCase() == "NARROWS") {
        if (framework2CompData.competencyPacketDataMap[sugEca.source]) {
            sdd["relation"] = "Broadens";
        }
        else sdd["relation"] = "Narrows";
    }
    else sdd["relation"] = "Is Related To";
    return sdd;
}

function getAutoAlignmentSuggestionsListLineItemRelationImageHtml(sddRelation) {
    var imageHtml = "<img class=\"fwkAlmAutoAlmRelImg\" src=\"";
    switch (sddRelation) {
        case 'Is Related To':
            imageHtml += "img/icon-relationship-related.png";
            break;
        case 'Broadens':
            imageHtml += "img/icon-relationship-broadens.png";
            break;
        case 'Narrows':
            imageHtml += "img/icon-relationship-narrows.png";
            break;
        default:
            imageHtml += "img/icon-relationship-equals.png";
            break;
    }
    imageHtml += "\" title=\"" + sddRelation + "\" />";
    return imageHtml
}

function buildAutoAlignmentSuggestionsListLineItem(sugEca, sugIdx) {
    var sdd = getSuggestionDisplayDataFromSuggestionAlignment(sugEca);
    if (sdd) {
        var sgLi = $("<li/>");
        var sgGridDiv = $("<div/>");
        sgGridDiv.addClass("grid-x");
        var sgCbDiv = $("<div/>");
        sgCbDiv.addClass("cell medium-1 text-center");
        var sgCbId = buildAutoAlignmentSuggestionSelectionCheckBoxId(sugIdx);
        var sgCbDivHtml = "<input onclick='updateAutoAlignmentSuggestionsSelectedCount();' id=\"" + sgCbId + "\" type=\"checkbox\" checked></input>";
        sgCbDiv.html(sgCbDivHtml);
        sgGridDiv.append(sgCbDiv);
        var sgFw1Div = $("<div/>");
        sgFw1Div.addClass("cell medium-5");
        var sgFw1DivHtml = "<span class='fwkAlmAutoAlmFwText fw1Name' title='" + sdd["fw1Desc"] + "'>" + sdd["fw1Name"] + "</span>";
        sgFw1Div.html(sgFw1DivHtml);
        sgGridDiv.append(sgFw1Div);
        var sgRelDiv = $("<div/>");
        sgRelDiv.addClass("cell medium-1 text-center");
        var sgRelDivHtml = "<span class='fwkAlmAutoAlmRelText'>" + getAutoAlignmentSuggestionsListLineItemRelationImageHtml(sdd["relation"]) + "</span>";
        sgRelDiv.html(sgRelDivHtml);
        sgGridDiv.append(sgRelDiv);
        var sgFw2Div = $("<div/>");
        sgFw2Div.addClass("cell medium-5 rightText");
        var sgFw2DivHtml = "<span class='fwkAlmAutoAlmFwText fw2Name' title='" + sdd["fw2Desc"] + "'>" + sdd["fw2Name"] + "</span>";
        sgFw2Div.html(sgFw2DivHtml);
        sgGridDiv.append(sgFw2Div);
        sgLi.append(sgGridDiv);
        return sgLi;
    }
    else return null;
}

function buildAutoAlignmentSuggestionsList() {
    $(FWK_ALM_AUTO_ALM_FW1_LST_HDR).html(framework1Name);
    $(FWK_ALM_AUTO_ALM_FW2_LST_HDR).html(framework2Name);
    $(FWK_ALM_AUTO_ALM_RESULTS_LIST).empty();
    for (var i = 0; i < autoAlignmentSuggestedAlignments.length; i++) {
        var sugLi = buildAutoAlignmentSuggestionsListLineItem(autoAlignmentSuggestedAlignments[i], i);
        if (sugLi) {
            $(FWK_ALM_AUTO_ALM_RESULTS_LIST).append(sugLi);
        }
    }
    updateAutoAlignmentSuggestionsSelectedCount();
    lastAutoAlignmentSuggestedListSortType = "fw1-desc";
    sortAutoAlignmentSuggestionList("fw2");
    sortAutoAlignmentSuggestionList("fw1");
}

function generateSuggestionAlignmentFilterKey(eca) {
    var key = eca.source;
    key += "|" + eca.relationType + "|";
    key += eca.target;
    return key;
}

function generateInverseSuggestionAlignmentFilterKey(eca) {
    var key = eca.target;
    key += "|" + eca.relationType + "|";
    key += eca.source;
    return key;
}

function filterAutoAlignmentSuggestedAlignments(suggestedAlignments) {
    var existingAlmMap = {};
    if (relevantAlignmentRelationshipsMap) {
        for (var almId in relevantAlignmentRelationshipsMap) {
            if (relevantAlignmentRelationshipsMap.hasOwnProperty(almId)) {
                var eca = relevantAlignmentRelationshipsMap[almId];
                var key = generateSuggestionAlignmentFilterKey(eca);
                existingAlmMap[key] = key;
                if (eca.relationType.toUpperCase() == "ISEQUIVALENTTO" || eca.relationType.toUpperCase() == "ISRELATEDTO") {
                    key = generateInverseSuggestionAlignmentFilterKey(eca);
                    existingAlmMap[key] = key;
                }
            }
        }
    }
    var fsa = [];
    for (var i = 0; i < suggestedAlignments.length; i++) {
        var sugKey = generateSuggestionAlignmentFilterKey(suggestedAlignments[i]);
        if (!existingAlmMap[sugKey]) {
            fsa.push(suggestedAlignments[i]);
        }
    }
    return fsa;
}

function handlePerformFrameworkAutoAlignmentSuccess(suggestedAlignments) {
    showModalBusy(FWK_ALM_AUTO_ALM_MODAL,"Processing suggested alignments...");
    if (suggestedAlignments && suggestedAlignments.length && suggestedAlignments.length > 0) {
        var fsa = filterAutoAlignmentSuggestedAlignments(suggestedAlignments);
        if (fsa.length > 0) {
            autoAlignmentSuggestedAlignments = fsa;
            $(FWK_ALM_AUTO_ALM_RESULTS_EMPTY_CTR).hide();
            $(FWK_ALM_AUTO_ALM_RESULTS_BTN_CTR).show();
            $(FWK_ALM_AUTO_ALM_RESULTS_DISPLAY_CTR).show();
            buildAutoAlignmentSuggestionsList();
            $(FWK_ALM_AUTO_ALM_MODAL).removeClass("smaller");
            $(FWK_ALM_AUTO_ALM_MODAL).addClass("small");
        }
    }
    else {
        $(FWK_ALM_AUTO_ALM_RESULTS_DISPLAY_CTR).hide();
        $(FWK_ALM_AUTO_ALM_RESULTS_EMPTY_CTR).show();
    }
    enableModalInputsAndButtons();
    $(FWK_ALM_AUTO_ALM_CONFIRM_CTR).hide();
    hideModalBusy(FWK_ALM_AUTO_ALM_MODAL);
    $(FWK_ALM_AUTO_ALM_RESULTS_CTR).show();
}

function handlePerformFrameworkAutoAlignmentFailure(err) {
    enableModalInputsAndButtons();
    hideModalBusy(FWK_ALM_AUTO_ALM_MODAL);
    $(FWK_ALM_AUTO_ALM_CONFIRM_CTR).hide();
    showModalError(FWK_ALM_AUTO_ALM_MODAL,err);
}

function performFrameworkAutoAlignment() {
    $(FWK_ALM_AUTO_ALM_CONFIRM_BTNS_CTR).hide();
    showModalBusy(FWK_ALM_AUTO_ALM_MODAL,"Generating suggested alignments...");
    disableModalInputsAndButtons();
    cassServiceAutoAlign(framework1Id, framework2Id, repo.selectedServer, repo.selectedServer, handlePerformFrameworkAutoAlignmentSuccess, handlePerformFrameworkAutoAlignmentFailure);
}

function setUpAutoAlignmentModalView() {
    $(FWK_ALM_AUTO_ALM_CONFIRM_CTR).show();
    $(FWK_ALM_AUTO_ALM_CONFIRM_BTNS_CTR).show();
    $(FWK_ALM_AUTO_ALM_RESULTS_CTR).hide();
    hideModalError(FWK_ALM_AUTO_ALM_MODAL);
    hideModalBusy(FWK_ALM_AUTO_ALM_MODAL);
    enableModalInputsAndButtons();
    $(FWK_ALM_AUTO_ALM_FW1_NAME).html(framework1Name);
    $(FWK_ALM_AUTO_ALM_FW2_NAME).html(framework2Name);
    $(FWK_ALM_AUTO_ALM_MODAL).removeClass("small");
    $(FWK_ALM_AUTO_ALM_MODAL).addClass("smaller");
}

function openFrameworkAutoAlignmentModal() {
    setUpAutoAlignmentModalView();
    $(FWK_ALM_AUTO_ALM_MODAL).foundation('open');
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
    }
    else if (fw1 == fw2) {
        showModalError(FWK_ALM_SETUP_MODAL,"You must select two different frameworks");
        return false;
    }
    return true;
}

function prepFrameworkAlignment() {
    hideModalError(FWK_ALM_SETUP_MODAL);
    if (isFrameworkAlignmentSetupInputValid()) {
        $(FWK_ALM_SETUP_MODAL).foundation('close');
        buildFrameworkDataForAlignments($(FWL_ALM_FW1).val(),$(FWL_ALM_FW2).val(),false);
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
            if (fw.shortId() == framework1Id) {
                fwo.attr("selected", "true");
            }
        }
        else {
            if ((fw.shortId() != framework1Id) && !alreadySelected) {
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
    }
    else {
        populateFrameworkAlignmentFrameworkDropdowns(FWL_ALM_FW1, true);
        populateFrameworkAlignmentFrameworkDropdowns(FWL_ALM_FW2, false);
        hideModalError(FWK_ALM_SETUP_MODAL);
        hideModalBusy(FWK_ALM_SETUP_MODAL);
        enableModalInputsAndButtons();
        $(FWK_ALM_SETUP_MODAL).foundation('open');
    }
}

//**************************************************************************************************
// Alignment Visualization Management/Utility Functions
//**************************************************************************************************

function sortAndSeparateAdhList(fullAdhList, fw1AdhList, fw2AdhList) {
    if (fullAdhList && fullAdhList.length > 1) {
        fullAdhList.sort(function (a, b) {
            return a.alignmentType.localeCompare(b.alignmentType);
        });
        fullAdhList.sort(function (a, b) {
            return a.sourceCompetencyName.localeCompare(b.sourceCompetencyName);
        });
        fullAdhList.sort(function (a, b) {
            if (framework1Name == a.sourceFrameworkName) {
                if (framework1Name == b.sourceFrameworkName) return 0;
                else if (framework2Name == b.sourceFrameworkName) return -1;
            }
            else if (framework2Name == a.sourceFrameworkName) {
                if (framework1Name == b.sourceFrameworkName) return 1;
                else if (framework2Name == b.sourceFrameworkName) return 0;
            }
            else return 0;
        });
    }
    if (fullAdhList) {
        for (var i = 0; i < fullAdhList.length; i++) {
            var adh = fullAdhList[i];
            if (adh.targetCompetencyNames && adh.targetCompetencyNames.length > 1) {
                adh.targetCompetencyNames.sort();
            }
            if (framework1Name == adh.sourceFrameworkName) fw1AdhList.push(adh);
            else fw2AdhList.push(adh);
        }
    }
}

function mergeAlignmentVisualizationCircleGraphs() {
    currentAlmVisCgView = "merged";
    if (framework1Relations != null && framework2Relations != null)
        if (framework1Relations.length+framework2Relations.length > 30) {
            $(FWK_ALM_MRG_LABEL_SWITCH).prop("checked", true);
            currentMergedCgHideLabels=true;
        }
    $(FWK_ALM_VIS_CG_DIVIDED_CTR).fadeOut('fast', function () {
        $(FWK_ALM_VIS_CG_MERGED_CTR).fadeIn('fast', function () {
            buildMergedAlignmentVisualizationCircleGraph();
        });
    });
}

function divideAlignmentVisualizationCircleGraphs() {
    currentAlmVisCgView = "divided";
    $(FWK_ALM_VIS_CG_MERGED_CTR).fadeOut('fast', function () {
        $(FWK_ALM_VIS_CG_DIVIDED_CTR).fadeIn('fast', function () {
            buildDividedAlignmentVisualizationCircleGraphs();
        });
    });
}

function showAppropriateAlmVisualizationCircleGraph() {
    if (currentAlmVisCgView == "merged") {
        if (!$(FWK_ALM_VIS_CG_MERGED_CTR).is(":visible")) {
            $(FWK_ALM_VIS_CG_DIVIDED_CTR).hide();
            $(FWK_ALM_VIS_CG_MERGED_CTR).show();
        }
        buildMergedAlignmentVisualizationCircleGraph();
    }
    else {
        if (!$(FWK_ALM_VIS_CG_DIVIDED_CTR).is(":visible")) {
            $(FWK_ALM_VIS_CG_MERGED_CTR).hide();
            $(FWK_ALM_VIS_CG_DIVIDED_CTR).show();
        }
        buildDividedAlignmentVisualizationCircleGraphs();
    }
}

//TODO setAlmVisDividedCgViewboxSize make this smarter
/**
 * What this is trying to do is move the circles up if they are about the same size so they
 * are not towards the bottom of an unscrolled page.
 *
 * If one circle is WAY bigger than the other, it moves them down a little bit so the
 * top of the big circle isn't hanging out under the menu.
 *
 * The current numbers are lots of guestimation based on frameworks I've played with...
 **/
function setAlmVisDividedCgViewboxSize() {
    var vbSize = FWK_ALM_VIS_CG_DIV_STANDARD_VIEWBOX;
    if ((!framework1Full.competency || !framework2Full.competency) ||
        (framework1Full.competency.length != framework2Full.competency.length)) {
        var maxComps = Math.max(framework1Full.competency.length, framework2Full.competency.length);
        var minComps = Math.min(framework1Full.competency.length, framework2Full.competency.length);
        if (maxComps >= FWK_ALM_VIS_CG_DIV_LARGE_OFFSET_MAX && minComps <= FWK_ALM_VIS_CG_DIV_LARGE_OFFSET_MIN) {
            vbSize = FWK_ALM_VIS_CG_DIV_LARGE_OFFSET_VIEWBOX;
        }
        else if (maxComps >= FWK_ALM_VIS_CG_DIV_OFFSET_MAX && (minComps * FWK_ALM_VIS_CG_DIV_OFFSET_MIN_MUTLI < maxComps)) {
            vbSize = FWK_ALM_VIS_CG_DIV_OFFSET_VIEWBOX;
        }
        else if (maxComps >= FWK_ALM_VIS_CG_DIV_SMALL_OFFSET_MAX && (minComps * FWK_ALM_VIS_CG_DIV_SMALL_OFFSET_MIN_MUTLI < maxComps)) {
            vbSize = FWK_ALM_VIS_CG_DIV_SMALL_OFFSET_VIEWBOX;
        }
        //else if ()  //TODO check for many alignments....it pushes the circles way down
    }
    $(ALM_DVD_CIRCLE_PACK).attr("viewBox", vbSize);
}

function handleNoAlignmentsForVisualizationCircleGraphViews() {
    if ((!mergedAdhListFw1 || mergedAdhListFw1.length <= 0) &&
        (!mergedAdhListFw2 || mergedAdhListFw2.length <= 0)) {
        $(FWK_ALM_VIS_CG_MERGED_DATA).hide();
        $(FWK_ALM_VIS_CG_MERGED_NO_DATA).show();
        $(FWK_ALM_VIS_CG_DIVIDED_FW1_TO_FW2_ALM_LIST_CTR).hide();
        $(FWK_ALM_VIS_CG_DIVIDED_FW2_TO_FW1_ALM_LIST_CTR).hide();
        $(FWK_ALM_VIS_CG_DIVIDED_NO_ALM_CTR).show();
    }
    else {
        $(FWK_ALM_VIS_CG_MERGED_NO_DATA).hide();
        $(FWK_ALM_VIS_CG_MERGED_DATA).show();
        $(FWK_ALM_VIS_CG_DIVIDED_NO_ALM_CTR).hide();
    }
}

function initializeAlignmentVisualizationCircleGraphViews() {
    setAlmVisDividedCgViewboxSize();
    $(FWK_ALM_VIS_CG_MERGED_CTR).hide();
    $(FWK_ALM_VIS_CG_DIVIDED_CTR).hide();
    $(FWK_ALM_VIS_CG_FW1_ALM_LIST_HDR_CLS).html(framework1Name);
    $(FWK_ALM_VIS_CG_FW2_ALM_LIST_HDR_CLS).html(framework2Name);
    buildMergedAlmVisualizationCircleGraphData();
    handleNoAlignmentsForVisualizationCircleGraphViews();
}

function showVisualizationScreenAndGraph() {
    $(FWK_ALM_VIS_SCREEN).fadeIn('fast', function () {
        showAppropriateAlmVisualizationCircleGraph();
    });
}

function buildAndShowAlignmentVisualizationCircleGraph() {
    if (!$(FWK_ALM_VIS_SCREEN).is(":visible")) {
        initializeAlignmentVisualizationCircleGraphViews();
        if ($('.screen:visible').length > 0) {
            $('.screen:visible').fadeOut('fast', function () {
                showVisualizationScreenAndGraph();
            });
        }
        else showVisualizationScreenAndGraph();
    }
}

//**************************************************************************************************
// Alignment Visualization Sidebar Functions
//**************************************************************************************************

function generateAlmDisplayHelperTargetHtml(adh, targetClass) {
    var targetCnHtml = "";
    for (var i = 0; i < adh.targetCompetencyNames.length; i++) {
        targetCnHtml += "<span class='almCgSbComp " + targetClass + "'>\"" + adh.targetCompetencyNames[i] + "\"</span>";
        if ((i + 1) != adh.targetCompetencyNames.length) {
            if (adh.targetCompetencyNames.length == 2) {
                targetCnHtml += " &amp; "
            }
            else if ((i + 1) == (adh.targetCompetencyNames.length - 1)) {
                targetCnHtml += ", &amp; "
            }
            else {
                targetCnHtml += ", "
            }
        }
    }
    return targetCnHtml
}

function buildAlmDisplayHelperElementId(elemIdPrefix, adhIdx) {
    return elemIdPrefix + adhIdx;
}

function getDividedRelPathIdFromAdhId(adhElemId) {
    var rpid = null;
    for (var relPathId in dividedRelPathToAdhMap) {
        if (dividedRelPathToAdhMap.hasOwnProperty(relPathId)) {
            var adh = dividedRelPathToAdhMap[relPathId];
            if (adh.elemId == adhElemId) {
                rpid = relPathId;
                break;
            }
        }
    }
    return rpid;
}

function handleAlmCgSidebarLiMouseOver(adhElemId) {
    var rpid = getDividedRelPathIdFromAdhId(adhElemId);
    if (rpid) highlightDividedAlmRelPath(rpid);
}

function handleAlmCgSidebarLiMouseOut(adhElemId) {
    removeAllDividedAlmRelPathHighlights();
}

function addAlmCgSidebarLiMouseEvents(adhLi, adhElemId) {
    if (adhElemId.indexOf(FWK_ALM_VIS_CG_DVD_ADH_ELEM_ID_PREFIX) > -1) {
        adhLi.attr("onmouseover","handleAlmCgSidebarLiMouseOver('" + adhElemId + "')");
        adhLi.attr("onmouseout","handleAlmCgSidebarLiMouseOut('" + adhElemId + "')");
    }
}

function addAlmDisplayHelperToAlmCgSidebarList(adh, listId, elemIdPrefix, adhIdx, sourceClass, targetClass) {
    var adhLi = $("<li/>");
    adhLi.addClass("almAdhLi");
    var elemId = buildAlmDisplayHelperElementId(elemIdPrefix, adhIdx);
    adh.elemId = elemId;
    adhLi.attr("id", elemId);
    addAlmCgSidebarLiMouseEvents(adhLi,elemId);
    var adhLiDiv = $("<div/>");
    adhLiDiv.addClass("grid-x");
    var adhLiBltDiv = $("<div/>");
    adhLiBltDiv.addClass("cell medium-1");
    adhLiBltDiv.html("<i class=\"fa fa-link\" aria-hidden=\"true\"></i>");
    adhLiDiv.append(adhLiBltDiv);
    var adhLiDataDiv = $("<div/>");
    adhLiDataDiv.addClass("cell medium-11");
    var adhDataDivHtml = "<span class='almCgSbComp " + sourceClass + "'>\"" + adh.sourceCompetencyName + "\"</span>";
    adhDataDivHtml += "&nbsp;<span class='almCgSbRel'>" + adh.alignmentType + "</span>&nbsp;";
    adhDataDivHtml += generateAlmDisplayHelperTargetHtml(adh, targetClass);
    adhLiDataDiv.html(adhDataDivHtml);
    adhLiDiv.append(adhLiDataDiv);
    adhLi.append(adhLiDiv);
    $(listId).append(adhLi);
}

function showAlignmentOnAlmCgSidebarList(adh) {
    $(".almAdhLi").addClass("inactive");
    if (adh.elemId && adh.elemId != null) {
        $("#" + adh.elemId).removeClass("inactive");
    }
}

function buildAlignmentsListOnAlmCgSidebar(fw1List, fw2List, listLiElemPrefix, fw1ToFw2ListId, fw2ToFw1ListId, fw1ToFw1ListCtrId, fw2ToFw1ListCtrId) {
    $(fw1ToFw2ListId).empty();
    $(fw2ToFw1ListId).empty();
    $(fw1ToFw1ListCtrId).hide();
    $(fw2ToFw1ListCtrId).hide();
    var adhIdx = 0;
    if (fw1List.length > 0) {
        for (var i = 0; i < fw1List.length; i++) {
            addAlmDisplayHelperToAlmCgSidebarList(fw1List[i], fw1ToFw2ListId,
                listLiElemPrefix, adhIdx, FWK_ALM_VIS_CG_FW1_TXT_CLASS, FWK_ALM_VIS_CG_FW2_TXT_CLASS);
            adhIdx++;
        }
        $(fw1ToFw1ListCtrId).show();
    }
    if (fw2List.length > 0) {
        for (var i = 0; i < fw2List.length; i++) {
            addAlmDisplayHelperToAlmCgSidebarList(fw2List[i], fw2ToFw1ListId,
                listLiElemPrefix, adhIdx, FWK_ALM_VIS_CG_FW2_TXT_CLASS, FWK_ALM_VIS_CG_FW1_TXT_CLASS);
            adhIdx++;
        }
        $(fw2ToFw1ListCtrId).show();
    }
}

//**************************************************************************************************
// Alignment Visualization **Divided** Frameworks View Functions
//**************************************************************************************************

function competencyHasCadAlignment(cadArray) {
    if (!cadArray || cadArray == null || cadArray.length == 0) return false;
    var hasAlms = false;
    for (var i = 0; i < cadArray.length; i++) {
        var cad = cadArray[i];
        if (cad.sourceCpds && cad.targetCpds && cad.sourceCpds.length >= 1 && cad.targetCpds.length >= 1) {
            hasAlms = true;
            break;
        }
    }
    return hasAlms;
}

function isCompCadSource(compId, cad) {
    var isSource = false;
    for (var i = 0; i < cad.sourceCpds.length; i++) {
        if (cad.sourceCpds[i].id == compId) {
            isSource = true;
            break;
        }
    }
    return isSource;
}

function buildDividedAlmCgSbCompDetailsAlmListFromCad(compId, cad) {
    var isSource = isCompCadSource(compId, cad);
    var toDoCpdList;
    var dat;
    if (isSource) {
        toDoCpdList = cad.targetCpds;
        dat = buildPrettyAlignmentTypeFromAlignmentType(cad.alignmentType, false);
    }
    else {
        toDoCpdList = cad.sourceCpds;
        dat = buildPrettyInverseAlignmentTypeFromAlignmentType(cad.alignmentType);
    }
    for (var i = 0; i < toDoCpdList.length; i++) {
        var tdLi = $("<li/>");
        tdLi.addClass("compRelAlignmentText");
        tdLi.html("... <b>" + dat + "</b> \"" + toDoCpdList[i].name + "\"");
        $(FWK_ALM_VIS_CG_DVD_CDSB_REL_LIST).append(tdLi);
    }
}

function buildDividedAlmCgSbCompDetailsAlmListFromCadArray(compId, cadArray) {
    $(FWK_ALM_VIS_CG_DVD_CDSB_REL_LIST).empty();
    for (var i = 0; i < cadArray.length; i++) {
        var cad = cadArray[i];
        if (cad.sourceCpds && cad.targetCpds && cad.sourceCpds.length >= 1 && cad.targetCpds.length >= 1) {
            buildDividedAlmCgSbCompDetailsAlmListFromCad(compId, cad);
        }
    }
}

function fillInDividedAlmCgSbCompetencyDetails(compId) {
    $(FWK_ALM_VIS_CG_DVD_CDSB_NAME).html(getCompetencyNameFromEitherFramework(compId));
    $(FWK_ALM_VIS_CG_DVD_CDSB_DESC).html(getCompetencyDescriptionFromEitherFramework(compId));
    var cadArray = cpdToCadMap[compId];
    if (competencyHasCadAlignment(cadArray)) {
        buildDividedAlmCgSbCompDetailsAlmListFromCadArray(compId, cadArray);
        $(FWK_ALM_VIS_CG_DVD_CDSB_NO_REL_CTR).hide();
        $(FWK_ALM_VIS_CG_DVD_CDSB_REL_CTR).show();
    }
    else {
        $(FWK_ALM_VIS_CG_DVD_CDSB_REL_CTR).hide();
        $(FWK_ALM_VIS_CG_DVD_CDSB_NO_REL_CTR).show();
    }
}

function showDividedAlignmentCircleGraphSidebarDetails(clickedCircle) {
    if (clickedCircle) {
        if (clickedCircle == FWK_ALM_VIS_CG_DIVIDED_CIR_ROOT_NAME) {
            $(FWK_ALM_VIS_CG_DIVIDED_COMP_DTLS_SB).addClass("hide");
            buildAlignmentsListOnAlmCgSidebar(dividedAdhListFw1, dividedAdhListFw2,
                FWK_ALM_VIS_CG_DVD_ADH_ELEM_ID_PREFIX,
                FWK_ALM_VIS_CG_DIVIDED_FW1_TO_FW2_ALM_LIST,
                FWK_ALM_VIS_CG_DIVIDED_FW2_TO_FW1_ALM_LIST,
                FWK_ALM_VIS_CG_DIVIDED_FW1_TO_FW2_ALM_LIST_CTR,
                FWK_ALM_VIS_CG_DIVIDED_FW2_TO_FW1_ALM_LIST_CTR);
        }
        else if (clickedCircle == framework1Name || clickedCircle == framework2Name) {
            $(FWK_ALM_VIS_CG_DIVIDED_COMP_DTLS_SB).addClass("hide");
        }
        else {
            fillInDividedAlmCgSbCompetencyDetails(clickedCircle);
            $(FWK_ALM_VIS_CG_DIVIDED_COMP_DTLS_SB).removeClass("hide");
        }
    }
}

function clearCompetencyCircleCoordsHelperMap() {
    debugMessage("Clearing competency circle coords helper map");
    compIdToAlmVisCchMap = {};
}

function registerCompetencyCircleCoordsHelper(compId, transformedX, transformedY, transformedR) {
    if (compId && compId != FWK_ALM_VIS_CG_DIVIDED_CIR_ROOT_NAME && compId != framework1Name && compId != framework2Name) {
        //debugMessage("Registering cch:" + getLastPieceOfCassId(compId) + "|" + transformedX + "," + transformedY + "|" + transformedR);
        if (!compIdToAlmVisCchMap[compId]) compIdToAlmVisCchMap[compId] = [];
        var cch = new competencyCircleCoordsHelper(transformedX, transformedY, transformedR);
        compIdToAlmVisCchMap[compId].push(cch);
    }
}

function registerAlmVisDividedCgRootNodes(d3Nodes) {
    if (!d3Nodes) return;
    for (var i = 0; i < d3Nodes.length; i++) {
        var n = d3Nodes[i];
        var compId = n.data.name;
        if (compId == FWK_ALM_VIS_CG_DIVIDED_CIR_ROOT_NAME) {
            almVisDvdCgRootNodeX = n.x;
            almVisDvdCgRootNodeY = n.y;
            break;
        }
    }
}

function getSvgPathHandleX(nodeX) {
    return nodeX * FWK_ALM_VIS_CG_SVG_PATH_HANDLE_X_MULTIPLIER;
}

function getSvgPathHandleY(nodeY) {
    return nodeY * FWK_ALM_VIS_CG_SVG_PATH_HANDLE_Y_MULTIPLIER;
}

function buildDividedAlmVisSvgPathCoords(sourceCch, targetCch, reverseCoords) {
    var scX, scY, scHandleX, scHandleY, tcHandleX, tcHandleY, tcX, tcY;
    if (reverseCoords) {
        if (sourceCch.tX >= 0) tcX = sourceCch.tX - sourceCch.tR;
        else tcX = sourceCch.tX + sourceCch.tR;
        tcY = sourceCch.tY;
        if (targetCch.tX >= 0) scX = targetCch.tX - targetCch.tR;
        else scX = targetCch.tX + targetCch.tR;
        scY = targetCch.tY;
    }
    else {
        if (sourceCch.tX >= 0) scX = sourceCch.tX - sourceCch.tR;
        else scX = sourceCch.tX + sourceCch.tR;
        scY = sourceCch.tY;
        if (targetCch.tX >= 0) tcX = targetCch.tX - targetCch.tR;
        else tcX = targetCch.tX + targetCch.tR;
        tcY = targetCch.tY;
    }
    scHandleX = getSvgPathHandleX(scX);
    scHandleY = getSvgPathHandleY(scY);
    tcHandleX = getSvgPathHandleX(tcX);
    tcHandleY = getSvgPathHandleY(tcY);
    var coords = "M" + scX + " " + scY + " C " + scHandleX + " " + scHandleY + ", " + tcHandleX + " " + tcHandleY + ", " + tcX + " " + tcY;
    // debugMessage("sourceCch:");
    // debugMessage(sourceCch);
    // debugMessage("targetCch:");
    // debugMessage(targetCch);
    // debugMessage("coords: " + coords);
    return coords;
}

function getDividedAlmVisSvgPathCoordsSet(sourceCompId, targetCompId, reversCoords) {
    var scCchSet = compIdToAlmVisCchMap[sourceCompId];
    var tcCchSet = compIdToAlmVisCchMap[targetCompId];
    var coordsSet = [];
    if (scCchSet && tcCchSet) {
        for (var i = 0; i < scCchSet.length; i++) {
            for (var j = 0; j < tcCchSet.length; j++) {
                coordsSet.push(buildDividedAlmVisSvgPathCoords(scCchSet[i], tcCchSet[j], reversCoords));
            }
        }
    }
    return coordsSet;
}

function getAlmVisSvgPathClassForAlignmentType(alignmentType) {
    var svgPathClass = "eqRelPath";
    switch (alignmentType) {
        case 'isEquivalentTo':
            svgPathClass = "eqRelPath";
            break;
        case 'isRelatedTo':
            svgPathClass = "relRelPath";
            break;
        case 'narrows':
            svgPathClass = "narRelPath";
            break;
        case 'desires':
            svgPathClass = "desRelPath";
            break;
        case 'requires':
            svgPathClass = "reqRelPath";
            break;
    }
    return FWK_ALM_VIS_CG_DIV_REL_PATH_CLASS + " " + svgPathClass;
}

function getAlmVisSvgPathArrowHeadForAlignmentType(alignmentType) {
    var svgArrowHead = "eqRelPath";
    switch (alignmentType) {
        case 'isEquivalentTo':
            svgArrowHead = "eqRelAH";
            break;
        case 'isRelatedTo':
            svgArrowHead = "relRelAH";
            break;
        case 'narrows':
            svgArrowHead = "narRelAH";
            break;
        case 'desires':
            svgArrowHead = "desRelAH";
            break;
        case 'requires':
            svgArrowHead = "reqRelAH";
            break;
    }
    return svgArrowHead;
}

function highlightDividedAlmRelPath(relPathId) {
    $(".dvdAlmCgRelPath").each(function () {
        $(this).addClass("inactive").removeClass("active");
        var me = $(this).attr("marker-end");
        if (me.indexOf("faded-") < 0) $(this).attr("marker-end", me.replace("url(#", "url(#faded-"));
    });
    $("#" + relPathId).removeClass("inactive").addClass("active");
    var me = $("#" + relPathId).attr("marker-end");
    if (me.indexOf("faded-") > 0) $("#" + relPathId).attr("marker-end", me.replace("url(#faded-", "url(#"));
}

function removeAllDividedAlmRelPathHighlights() {
    $(".dvdAlmCgRelPath").each(function () {
        $(this).removeClass("inactive active");
        var me = $(this).attr("marker-end");
        if (me.indexOf("faded-") > 0) $(this).attr("marker-end", me.replace("url(#faded-", "url(#"));
    });
}

function handleDividedAlmRelPathOnMouseOver(pathId) {
    var adh = dividedRelPathToAdhMap[pathId];
    if (adh) {
        showAlignmentOnAlmCgSidebarList(adh);
    }
}

function handleDividedAlmRelPathOnMouseOut() {
    $(".almAdhLi").removeClass("inactive active");
}

function buildDividedAlmVisRelPathId(avrpIdx) {
    return FWK_ALM_VIS_CG_DVD_REL_PATH_ELEM_ID_PREFIX + avrpIdx;
}

function buildDividedAlmVisSvgPath(pathClass, pathArrowHead, pathCoords, pathId) {
    var spo = [];
    spo["pathClass"] = pathClass;
    spo["pathArrowHead"] = pathArrowHead;
    spo["pathCoords"] = pathCoords;
    spo["pathId"] = pathId;
    return spo;
}

function buildAlignmentDisplayHelper(cad, sourceName, targetName) {
    var adh = new alignmentDisplayHelper(getSourceFrameworkNameForCad(cad), sourceName, buildPrettyAlignmentTypeFromAlignmentType(cad.alignmentType, true));
    adh.targetCompetencyNames.push(targetName);
    return adh;
}

function buildDividedAlmVisRelPathsForCad(avrpList, cad) {
    var pathClass = getAlmVisSvgPathClassForAlignmentType(cad.alignmentType);
    var pathArrowHead = getAlmVisSvgPathArrowHeadForAlignmentType(cad.alignmentType);
    var reverseCoords = cad.alignmentType == "narrows";
    var adh;
    for (var i = 0; i < cad.sourceCpds.length; i++) {
        for (var j = 0; j < cad.targetCpds.length; j++) {
            // debugMessage("****************************************************************");
            // debugMessage(cad.sourceCpds[i].name + " " + cad.alignmentType + " " + cad.targetCpds[j].name);
            var coordsSet = getDividedAlmVisSvgPathCoordsSet(cad.sourceCpds[i].id, cad.targetCpds[j].id, reverseCoords);
            if (coordsSet && coordsSet.length > 0) {
                for (var k = 0; k < coordsSet.length; k++) {
                    var avrpIdx = avrpList.length;
                    //debugMessage("avrpIdx: " + avrpIdx);
                    var pathId = buildDividedAlmVisRelPathId(avrpIdx);
                    //debugMessage("pathId: " + pathId);
                    if (reverseCoords) adh = buildAlignmentDisplayHelper(cad, cad.targetCpds[i].name, cad.sourceCpds[j].name);
                    else adh = buildAlignmentDisplayHelper(cad, cad.sourceCpds[i].name, cad.targetCpds[j].name);
                    avrpList.push(buildDividedAlmVisSvgPath(pathClass, pathArrowHead, coordsSet[k], pathId));
                    dividedRelPathToAdhMap[pathId] = adh;
                    dividedAdhList.push(adh);
                }
            }
        }
    }
}

function drawDividedAlignmentVisualizationRelationshipPaths() {
    removeDividedAlignmentVisualizationRelationshipPaths();
    dividedAdhList = [];
    dividedAdhListFw1 = [];
    dividedAdhListFw2 = [];
    dividedRelPathToAdhMap = {};
    debugMessage("Building divided alignment visualization circle graph relationship paths...");
    var avrpList = [];
    for (var almCardId in almCardIdToCadMap) {
        if (almCardIdToCadMap.hasOwnProperty(almCardId)) {
            var cad = almCardIdToCadMap[almCardId];
            if (cad) {
                buildDividedAlmVisRelPathsForCad(avrpList, cad);
            }
        }
    }
    debugMessage("Relationship path list:");
    debugMessage(avrpList);
    addAlignmentPathsToDividedAlignmentCircleSvg(avrpList);
    sortAndSeparateAdhList(dividedAdhList, dividedAdhListFw1, dividedAdhListFw2);
    if (avrpList.length > 0) {
        showDividedAlignmentCircleGraphSidebarDetails(FWK_ALM_VIS_CG_DIVIDED_CIR_ROOT_NAME);
    }
}

function removeDividedAlignmentVisualizationRelationshipPaths() {
    debugMessage("Removing divided alignment visualization circle graph relationship paths...");
    $(ALM_DVD_CIRCLE_PACK).find("." + FWK_ALM_VIS_CG_DIV_REL_PATH_CLASS).remove();
}

function buildDividedAlignmentVisualizationCircleGraphs() {
    debugMessage("Building divided alignment visualization circle graphs...");
    clearDividedAlignmentCircleSvg();
    var dividedAlmNode = {};
    dividedAlmNode["name"] = FWK_ALM_VIS_CG_DIVIDED_CIR_ROOT_NAME;
    var danca = [];
    danca.push(JSON.parse(framework2D3NodeString));
    danca.push(JSON.parse(framework1D3NodeString));
    dividedAlmNode["children"] = danca;
    buildDividedAlignmentGraphCircles(null, dividedAlmNode);
}

//**************************************************************************************************
// Alignment Visualization **Merged** Frameworks View Functions
//
//Note: This Visualization uses BROADENS as opposed to NARROWS (makes more sense in a drill-down view)
//**************************************************************************************************

function handleMergedAlmRelPathOnMouseOver(circleId) {
    var adh = mergedAlmVisCgIdToAdhMap[circleId];
    if (adh) {
        showAlignmentOnAlmCgSidebarList(adh);
    }
}

function handleMergedAlmRelPathOnMouseOut() {
    $(".almAdhLi").removeClass("inactive active");
}

function showMergedAlignmentCircleGraphSidebarDetails(clickedCircle) {
    if (clickedCircle) {
        if (clickedCircle == FWK_ALM_VIS_CG_MERGED_CIR_ROOT_NAME) {
            buildAlignmentsListOnAlmCgSidebar(mergedAdhListFw1, mergedAdhListFw2,
                FWK_ALM_VIS_CG_MERG_ADH_ELEM_ID_PREFIX,
                FWK_ALM_VIS_CG_MERGED_FW1_TO_FW2_ALM_LIST,
                FWK_ALM_VIS_CG_MERGED_FW2_TO_FW1_ALM_LIST,
                FWK_ALM_VIS_CG_MERGED_FW1_TO_FW2_ALM_LIST_CTR,
                FWK_ALM_VIS_CG_MERGED_FW2_TO_FW1_ALM_LIST_CTR);
        }
        else {
            var adh = mergedAlmVisCgIdToAdhMap[clickedCircle];
            if (adh) showAlignmentOnAlmCgSidebarList(adh);
        }
    }
}

function getMergedAlmCgCircleText(d) {
    if (currentMergedCgHideLabels) return "";
    else {
        if (!d || !d.data || !d.data.name) return "UNDEFINED 'D'";
        else if (d.data.name == "DUMMY") return "";
        else if (mergedCgNodeToCompMap[d.data.name]) {
            return mergedCgNodeToCompMap[d.data.name]["name"];
        }
        return "";
    }
}

function getMergedAlmCgCircleClass(d) {
    if (!d || !d.data || !d.data.name) return "node-unknown";
    else if (d.data.name == "DUMMY") return "node-dummy";
    var cc = "";
    if (d.data.name.startsWith(FWK_ALM_VIS_FW1_UNA_ID_PREFIX)) cc = "node-fw1-una";
    else if (d.data.name.startsWith(FWK_ALM_VIS_FW2_UNA_ID_PREFIX)) cc = "node-fw2-una";
    else {
        if (d.data.name.startsWith(FWK_ALM_VIS_FW1_EQ_ID_PREFIX)) cc = "node-fw1-eq";
        else if (d.data.name.startsWith(FWK_ALM_VIS_FW1_REL_ID_PREFIX)) cc = "node-fw1-rel";
        else if (d.data.name.startsWith(FWK_ALM_VIS_FW1_BRD_ID_PREFIX)) cc = "node-fw1-brd";
        else if (d.data.name.startsWith(FWK_ALM_VIS_FW1_DES_ID_PREFIX)) cc = "node-fw1-des";
        else if (d.data.name.startsWith(FWK_ALM_VIS_FW1_REQ_ID_PREFIX)) cc = "node-fw1-req";
        else if (d.data.name.startsWith(FWK_ALM_VIS_FW2_EQ_ID_PREFIX)) cc = "node-fw2-eq";
        else if (d.data.name.startsWith(FWK_ALM_VIS_FW2_REL_ID_PREFIX)) cc = "node-fw2-rel";
        else if (d.data.name.startsWith(FWK_ALM_VIS_FW2_BRD_ID_PREFIX)) cc = "node-fw2-brd";
        else if (d.data.name.startsWith(FWK_ALM_VIS_FW2_DES_ID_PREFIX)) cc = "node-fw2-des";
        else if (d.data.name.startsWith(FWK_ALM_VIS_FW2_REQ_ID_PREFIX)) cc = "node-fw2-req";
        if (!d.children || d.children.length == 0) cc += " child";
    }
    return cc;
}

function getMergedAlmCgLabelClass(d) {
    if (!d || !d.data || !d.data.name) return "label";
    if ( d.data.name.startsWith(FWK_ALM_VIS_FW1_UNA_ID_PREFIX) ||  d.data.name.startsWith(FWK_ALM_VIS_FW2_UNA_ID_PREFIX)) return "unaLabel";
    else return "label";
}

function initMergedAlmVisD3Data() {
    mergedCgNodeToCompMap = {};
    mergedCgUsedCompsList = [];
    mergedAlmVisD3Node = {};
    mergedAlmVisD3Node["name"] = FWK_ALM_VIS_CG_MERGED_CIR_ROOT_NAME;
    mergedAlmVisD3Node["children"] = [];
    almVisFw1UnalignedMap = {};
    almVisFw2UnalignedMap = {};
    almVisFw1EqMap = {};
    almVisFw1RelMap = {};
    almVisFw1BroadMap = {};
    almVisFw1DesMap = {};
    almVisFw1ReqMap = {};
    almVisFw2EqMap = {};
    almVisFw2RelMap = {};
    almVisFw2BroadMap = {};
    almVisFw2DesMap = {};
    almVisFw2ReqMap = {};
    mergedAlmVisCgIdToAdhMap = {};
    mergedAdhList = [];
    mergedAdhListFw1 = [];
    mergedAdhListFw2 = [];
}

function buildAlmVisD3MapTargetId(mapId, targetIdx, targetId) {
    return mapId + "_TARGET:" + targetIdx + "_" + targetId;
}

function addCadToMergedAlmVisD3Map(d3DataMap, idPrefix, cad, sourceFrameworkName, displayAlignmentType) {
    for (var i = 0; i < cad.sourceCpds.length; i++) {
        var mapId = idPrefix + cad.sourceCpds[i].id;
        var cadh = null;
        if (!d3DataMap[mapId]) {
            d3DataMap[mapId] = [];
            mergedCgNodeToCompMap[mapId] = {};
            mergedCgNodeToCompMap[mapId]["type"] = "root";
            mergedCgNodeToCompMap[mapId]["name"] = cad.sourceCpds[i].name;
            cadh = new alignmentDisplayHelper(sourceFrameworkName, cad.sourceCpds[i].name, displayAlignmentType);
            mergedAlmVisCgIdToAdhMap[mapId] = cadh;
            mergedAdhList.push(cadh);
            mergedCgUsedCompsList.push(cad.sourceCpds[i].id);
        }
        else cadh = mergedAlmVisCgIdToAdhMap[mapId];
        for (var j = 0; j < cad.targetCpds.length; j++) {
            var targetId = buildAlmVisD3MapTargetId(mapId, j, cad.targetCpds[j].id);
            mergedCgNodeToCompMap[targetId] = {};
            mergedCgNodeToCompMap[targetId]["type"] = "child";
            mergedCgNodeToCompMap[targetId]["name"] = cad.targetCpds[j].name;
            mergedCgUsedCompsList.push(cad.targetCpds[j].id);
            d3DataMap[mapId].push(targetId);
            if (cadh && cadh != null) {
                cadh.targetCompetencyNames.push(cad.targetCpds[j].name);
                mergedAlmVisCgIdToAdhMap[targetId] = cadh;
            }
        }
    }
}

function addCadToMergedAlmVisD3MapReversed(d3DataMap, idPrefix, cad, sourceFrameworkName, displayAlignmentType) {
    for (var i = 0; i < cad.targetCpds.length; i++) {
        var mapId = idPrefix + cad.targetCpds[i].id;
        var cadh = null;
        if (!d3DataMap[mapId]) {
            d3DataMap[mapId] = [];
            mergedCgNodeToCompMap[mapId] = {};
            mergedCgNodeToCompMap[mapId]["type"] = "root";
            mergedCgNodeToCompMap[mapId]["name"] = cad.targetCpds[i].name;
            cadh = new alignmentDisplayHelper(sourceFrameworkName, cad.targetCpds[i].name, displayAlignmentType);
            mergedAlmVisCgIdToAdhMap[mapId] = cadh;
            mergedAdhList.push(cadh);
            mergedCgUsedCompsList.push(cad.targetCpds[i].id);
        }
        else cadh = mergedAlmVisCgIdToAdhMap[mapId];
        for (var j = 0; j < cad.sourceCpds.length; j++) {
            var targetId = buildAlmVisD3MapTargetId(mapId, j, cad.sourceCpds[j].id);
            mergedCgNodeToCompMap[targetId] = {};
            mergedCgNodeToCompMap[targetId]["type"] = "child";
            mergedCgNodeToCompMap[targetId]["name"] = cad.sourceCpds[j].name;
            mergedCgUsedCompsList.push(cad.sourceCpds[j].id);
            d3DataMap[mapId].push(targetId);
            if (cadh && cadh != null) {
                cadh.targetCompetencyNames.push(cad.sourceCpds[j].name);
                mergedAlmVisCgIdToAdhMap[targetId] = cadh;
            }
        }
    }
}

//long and ugly...sorry :(
function buildMergedAlmVisD3MapsFromCad() {
    for (var almCardId in almCardIdToCadMap) {
        if (almCardIdToCadMap.hasOwnProperty(almCardId)) {
            var cad = almCardIdToCadMap[almCardId];
            var pat = buildPrettyAlignmentTypeFromAlignmentType(cad.alignmentType, true);
            switch (cad.alignmentType) {
                case 'isEquivalentTo':
                    if (cad.direction == "LTR") {
                        addCadToMergedAlmVisD3Map(almVisFw1EqMap, FWK_ALM_VIS_FW1_EQ_ID_PREFIX, cad, framework1Name, pat);
                        //addCadToMergedAlmVisD3MapReversed(almVisFw2EqMap, FWK_ALM_VIS_FW2_EQ_ID_PREFIX, cad);
                    }
                    else {
                        //addCadToMergedAlmVisD3MapReversed(almVisFw1EqMap, FWK_ALM_VIS_FW1_EQ_ID_PREFIX, cad);
                        addCadToMergedAlmVisD3Map(almVisFw2EqMap, FWK_ALM_VIS_FW2_EQ_ID_PREFIX, cad, framework2Name, pat);
                    }
                    break;
                case 'isRelatedTo':
                    if (cad.direction == "LTR") {
                        addCadToMergedAlmVisD3Map(almVisFw1RelMap, FWK_ALM_VIS_FW1_REL_ID_PREFIX, cad, framework1Name, pat);
                        //addCadToMergedAlmVisD3MapReversed(almVisFw2RelMap, FWK_ALM_VIS_FW2_REL_ID_PREFIX, cad);
                    }
                    else {
                        //addCadToMergedAlmVisD3MapReversed(almVisFw1RelMap, FWK_ALM_VIS_FW1_REL_ID_PREFIX, cad);
                        addCadToMergedAlmVisD3Map(almVisFw2RelMap, FWK_ALM_VIS_FW2_REL_ID_PREFIX, cad, framework2Name, pat);
                    }
                    break;
                case 'narrows':
                    if (cad.direction == "LTR") addCadToMergedAlmVisD3MapReversed(almVisFw2BroadMap, FWK_ALM_VIS_FW2_BRD_ID_PREFIX, cad, framework2Name, pat);
                    else addCadToMergedAlmVisD3MapReversed(almVisFw1BroadMap, FWK_ALM_VIS_FW1_BRD_ID_PREFIX, cad, framework1Name, pat);
                    break;
                case 'desires':
                    if (cad.direction == "LTR") addCadToMergedAlmVisD3Map(almVisFw1DesMap, FWK_ALM_VIS_FW1_DES_ID_PREFIX, cad, framework1Name, pat);
                    else addCadToMergedAlmVisD3Map(almVisFw2DesMap, FWK_ALM_VIS_FW2_DES_ID_PREFIX, cad, framework2Name, pat);
                    break;
                case 'requires':
                    if (cad.direction == "LTR") addCadToMergedAlmVisD3Map(almVisFw1ReqMap, FWK_ALM_VIS_FW1_REQ_ID_PREFIX, cad, framework1Name, pat);
                    else addCadToMergedAlmVisD3Map(almVisFw2ReqMap, FWK_ALM_VIS_FW2_REQ_ID_PREFIX, cad, framework2Name, pat);
                    break;
            }
        }
    }
    sortAndSeparateAdhList(mergedAdhList, mergedAdhListFw1, mergedAdhListFw2);
}

function generateAlmD3DataNodeObj(name, size) {
    var almObj = {};
    almObj["name"] = name;
    almObj["children"] = [];
    if (size >= 1) {
        almObj["size"] = size;
    }
    return almObj;
}

function addAlmBrdDesReqDataToMergedD3Node(dataMap) {
    for (var mapId in dataMap) {
        if (dataMap.hasOwnProperty(mapId)) {
            var almObj = generateAlmD3DataNodeObj(mapId, 0);
            //make sure at least two children (for circle sizing purposes...will hide with colors)
            if (dataMap[mapId].length == 1) {
                almObj["children"].push(generateAlmD3DataNodeObj("DUMMY", 1));
            }
            for (var i = 0; i < dataMap[mapId].length; i++) {
                almObj["children"].push(generateAlmD3DataNodeObj(dataMap[mapId][i], 1));
            }
            mergedAlmVisD3Node["children"].push(almObj);
        }
    }
}

function addAlmEqRelUnaDataToMergedD3Node(dataMap) {
    for (var mapId in dataMap) {
        if (dataMap.hasOwnProperty(mapId)) {
            mergedAlmVisD3Node["children"].push(generateAlmD3DataNodeObj(mapId, 1));
        }
    }
}

function buildMergedAlmVisualizationD3DataNodes(addUnalignedData) {
    if (addUnalignedData) {
        addAlmEqRelUnaDataToMergedD3Node(almVisFw1UnalignedMap);
        addAlmEqRelUnaDataToMergedD3Node(almVisFw2UnalignedMap);
    }
    addAlmEqRelUnaDataToMergedD3Node(almVisFw1EqMap);
    addAlmEqRelUnaDataToMergedD3Node(almVisFw1RelMap);
    addAlmBrdDesReqDataToMergedD3Node(almVisFw1BroadMap);
    addAlmBrdDesReqDataToMergedD3Node(almVisFw1DesMap);
    addAlmBrdDesReqDataToMergedD3Node(almVisFw1ReqMap);
    addAlmEqRelUnaDataToMergedD3Node(almVisFw2EqMap);
    addAlmEqRelUnaDataToMergedD3Node(almVisFw2RelMap);
    addAlmBrdDesReqDataToMergedD3Node(almVisFw2BroadMap);
    addAlmBrdDesReqDataToMergedD3Node(almVisFw2DesMap);
    addAlmBrdDesReqDataToMergedD3Node(almVisFw2ReqMap);
}

function buildMergedAlmVisUnalignedDataForFramework(ecf,idPrefix,unaMap) {
    for (var i=0;i<ecf.competency.length;i++) {
        var ccId = ecf.competency[i];
        if (!mergedCgUsedCompsList.includes(ccId)) {
            var compName = getCompetencyNameFromEitherFramework(ccId);
            if (compName && compName.trim() != "") {
                var mapId = idPrefix + ccId;
                mergedCgNodeToCompMap[mapId] = {};
                mergedCgNodeToCompMap[mapId]["type"] = "unaComp";
                mergedCgNodeToCompMap[mapId]["name"] = compName;
                unaMap[mapId] = mapId;
            }
        }
    }
}

function buildMergedAlmVisUnalignedData() {
    buildMergedAlmVisUnalignedDataForFramework(framework1Full,FWK_ALM_VIS_FW1_UNA_ID_PREFIX,almVisFw1UnalignedMap);
    buildMergedAlmVisUnalignedDataForFramework(framework2Full,FWK_ALM_VIS_FW2_UNA_ID_PREFIX,almVisFw2UnalignedMap);
}

function buildMergedAlmVisualizationCircleGraphData() {
    debugMessage("Building merged alignment visualization circle graph data...");
    initMergedAlmVisD3Data();
    buildMergedAlmVisD3MapsFromCad();
    var addUnalignedata = false;
    if (currentMergedCgMode == FWK_ALM_MRG_VIS_UNION_MODE) {
        addUnalignedata = true;
        buildMergedAlmVisUnalignedData();
    }
    buildMergedAlmVisualizationD3DataNodes(addUnalignedata);
}

function buildMergedAlignmentVisualizationCircleGraph() {
    buildMergedAlmVisualizationCircleGraphData();
    debugMessage("Building merged alignment visualization circle graph...");
    clearMergedAlignmentCircleSvg();
    if (mergedAlmVisD3Node && mergedAlmVisD3Node.children && mergedAlmVisD3Node.children.length > 0) {
        buildMergedAlignmentGraphCircles(null, mergedAlmVisD3Node);
        showMergedAlignmentCircleGraphSidebarDetails(FWK_ALM_VIS_CG_MERGED_CIR_ROOT_NAME);
    }
    //else the 'no merged data' callout will be displayed
}

function changeMergedLabelVisMode() {
    currentMergedCgHideLabels = $(FWK_ALM_MRG_LABEL_SWITCH).prop("checked");
    $('.almCircleGraphMerged').fadeOut('fast', function () {
        buildMergedAlignmentVisualizationCircleGraph();
        $('.almCircleGraphMerged').fadeIn('fast');
    });
}

function changeMergedAlignmentVisMode() {
    var hideUnalignedComps = $(FWK_ALM_MRG_VIS_MODE_SWITCH).prop("checked");
    if (hideUnalignedComps) currentMergedCgMode = FWK_ALM_MRG_VIS_INTERSECT_MODE;
    else currentMergedCgMode = FWK_ALM_MRG_VIS_UNION_MODE;
    $('.almCircleGraphMerged').fadeOut('fast', function () {
        buildMergedAlignmentVisualizationCircleGraph();
        $('.almCircleGraphMerged').fadeIn('fast');
    });
}

//**************************************************************************************************
// Alignment Card Framework Save Functions
//**************************************************************************************************

function checkAllFrameworksSavedForAlmCardAlignment(almCardId) {
    if (numFrameworksSaved >= numFrameworksToSave) {
        showAlignmentCardAsNotBusy(almCardId);
        if (removeAlignmentCardAfterFrameworksSaved) {
            removeAlignmentCardFromView(almCardId);
            removeAlignmentCardAfterFrameworksSaved = false;
        }
    }
}

function saveFrameworksForAlmCardAlignmentToServerSuccess(almCardId) {
    debugMessage("Framework saved success");
    numFrameworksSaved++;
    checkAllFrameworksSavedForAlmCardAlignment(almCardId);
}

function saveFrameworksForAlmCardAlignmentToServerFailure(err, almCardId) {
    debugMessage("!!!!!!!!!!!!!! Framework saved failed: " + err);
    numFrameworksSaved++;
    checkAllFrameworksSavedForAlmCardAlignment(almCardId);
}

function saveFrameworksToServerForAlmCardAlignment(almCardId) {
    numFrameworksToSave = frameworksToSave.length;
    numFrameworksSaved = 0;
    if (frameworksToSave.length == 0) checkAllFrameworksSavedForAlmCardAlignment(almCardId);
    for (var i = 0; i < frameworksToSave.length; i++) {
        frameworksToSave[i].save(function () {
                saveFrameworksForAlmCardAlignmentToServerSuccess(almCardId);
            },
            function (err) {
                saveFrameworksForAlmCardAlignmentToServerFailure(err, almCardId);
            }, repo);
    }
}

function addSavedAlignmentsToFramework(fw) {
    if (alignmentsToSave) {
        for (var i = 0; i < alignmentsToSave.length; i++) {
            fw.addRelation(alignmentsToSave[i].shortId());
            if (typeof addAlignmentToFrameworkForExplore === 'function') {
                addAlignmentToFrameworkForExplore(fw.shortId(), alignmentsToSave[i].shortId());
            }
        }
    }
}

function removeDeletedAlignmentsFromFramework(fw) {
    if (alignmentsToDelete) {
        for (var i = 0; i < alignmentsToDelete.length; i++) {
            fw.removeRelation(alignmentsToDelete[i].shortId());
            if (typeof removeAlignmentFromFrameworkForExplore === 'function') {
                removeAlignmentFromFrameworkForExplore(fw.shortId(), alignmentsToDelete[i].shortId());
            }
        }
    }
}

function saveNewAndDeletedAlmCardAlignmentsToOwnedFrameworks(almCardId) {
    frameworksToSave = [];
    //if (loggedInIdentityOwnsObject(framework1Full)) {
    if (framework1Full.hasOwner(loggedInPk)) {
        addSavedAlignmentsToFramework(framework1Full);
        removeDeletedAlignmentsFromFramework(framework1Full);
        frameworksToSave.push(framework1Full);
    }
    //if (loggedInIdentityOwnsObject(framework2Full)) {
    if (framework2Full.hasOwner(loggedInPk)) {
        addSavedAlignmentsToFramework(framework2Full);
        removeDeletedAlignmentsFromFramework(framework2Full);
        frameworksToSave.push(framework2Full);
    }
    saveFrameworksToServerForAlmCardAlignment(almCardId);
}

//**************************************************************************************************
// Alignment Card Delete Functions
//**************************************************************************************************
function checkAllAlmCardAlignmentsDeleted(almCardId) {
    if (numAlignmentsDeleted >= numAlignmentsToDelete) {
        saveNewAndDeletedAlmCardAlignmentsToOwnedFrameworks(almCardId);
    }
}

function deleteAlmCardAlignmentsFromServerSuccess(almCardId) {
    debugMessage("Alignment delete success");
    numAlignmentsDeleted++;
    checkAllAlmCardAlignmentsDeleted(almCardId);
}

function deleteAlmCardAlignmentsFromServerFailure(err, almCardId) {
    debugMessage("!!!!!!!!!!!!!! Alignment delete failed: " + err);
    numAlignmentsDeleted++;
    checkAllAlmCardAlignmentsDeleted(almCardId);
}

function deleteAlmCardAlignmentsFromServer(almCardId) {
    numAlignmentsToDelete = alignmentsToDelete.length;
    numAlignmentsDeleted = 0;
    if (alignmentsToDelete.length == 0) checkAllAlmCardAlignmentsDeleted(almCardId);
    var cad = almCardIdToCadMap[almCardId];
    for (var i = 0; i < alignmentsToDelete.length; i++) {
        removeStringFromArray(cad.relationIds, alignmentsToDelete[i].shortId());
        alignmentsToDelete[i]._delete(function () {
                deleteAlmCardAlignmentsFromServerSuccess(almCardId);
            },
            function (err) {
                deleteAlmCardAlignmentsFromServerFailure(err, almCardId);
            });
    }
}

function buildAlignmentsToDeleteFromDeleteAlignmentCard(almCardId) {
    var cad = almCardIdToCadMap[almCardId];
    for (var i = 0; i < cad.relationIds.length; i++) {
        var r = relevantAlignmentRelationshipsMap[cad.relationIds[i]];
        if (r) {
            alignmentsToDelete.push(r);
        }
    }
}

function deleteAlignmentCard(almCardId) {
    alignmentsToSave = [];
    alignmentsToDelete = [];
    var cad = almCardIdToCadMap[almCardId];
    unHighlightAllAlignmentListItems();
    if (cad.relationIds.length == 0) {
        removeAlignmentCardFromView(almCardId);
    }
    else {
        showAlignmentCardAsBusy(almCardId);
        removeAlignmentCardAfterFrameworksSaved = true;
        buildAlignmentsToDeleteFromDeleteAlignmentCard(almCardId);
        deleteAlmCardAlignmentsFromServer(almCardId);
    }
}

function deleteAlignmentCardFromConfirmation() {
    var deleteAlmCardId = $(FWK_ALM_DELETE_CARD_CONFRIM_CARD_ID).val();
    $(FWK_ALM_DELETE_CARD_CONFIRM_MODAL).foundation('close');
    deleteAlignmentCard(deleteAlmCardId);
}

function confirmDeleteAlignmentCard(almCardId) {
    var cad = almCardIdToCadMap[almCardId];
    if (cad.relationIds.length == 0) {
        deleteAlignmentCard(almCardId);
    }
    else {
        $(FWK_ALM_DELETE_CARD_CONFRIM_CARD_ID).val(almCardId);
        $(FWK_ALM_DELETE_CARD_CONFIRM_MODAL).foundation('open');
    }
}

//**************************************************************************************************
// Alignment Card Save Functions
//**************************************************************************************************
function generateEcAlignment(relationType, sourceId, targetId) {
    var r = new EcAlignment();
    //addAllIdentitiesAsOwner(r);
    r.addOwner(EcIdentityManager.ids[0].ppk.toPk());
    r.generateId(repo.selectedServer);
    r.relationType = relationType;
    r.source = sourceId;
    r.target = targetId;
    relevantAlignmentRelationshipsMap[r.shortId()] = r;
    return r;
}

function checkAllAlmCardAlignmentsSaved(almCardId) {
    if (numAlignmentsSaved >= numAlignmentsToSave) {
        if (alignmentsToDelete.length == 0) {
            saveNewAndDeletedAlmCardAlignmentsToOwnedFrameworks(almCardId);
        }
        else {
            deleteAlmCardAlignmentsFromServer(almCardId);
        }
    }
}

function saveAlmCardAlignmentsToServerSuccess(almCardId) {
    debugMessage("Alignment saved success");
    numAlignmentsSaved++;
    checkAllAlmCardAlignmentsSaved(almCardId);
}

function saveAlmCardAlignmentsToServerFailure(err, almCardId) {
    debugMessage("!!!!!!!!!!!!!! Alignment saved failed: " + err);
    numAlignmentsSaved++;
    checkAllAlmCardAlignmentsSaved(almCardId);
}

function saveAlmCardAlignmentsToServer(almCardId) {
    numAlignmentsToSave = alignmentsToSave.length;
    numAlignmentsSaved = 0;
    if (alignmentsToSave.length == 0) checkAllAlmCardAlignmentsSaved(almCardId);
    for (var i = 0; i < alignmentsToSave.length; i++) {
        alignmentsToSave[i].save(function () {
                saveAlmCardAlignmentsToServerSuccess(almCardId);
            },
            function (err) {
                saveAlmCardAlignmentsToServerFailure(err, almCardId);
            }, repo);
    }
}

function saveAlignmentCardDataAsNew(cad, almCardId) {
    for (var i = 0; i < cad.sourceCpds.length; i++) {
        for (var j = 0; j < cad.targetCpds.length; j++) {
            var newAlignment = generateEcAlignment(cad.alignmentType, cad.sourceCpds[i].id, cad.targetCpds[j].id);
            alignmentsToSave.push(newAlignment);
            cad.relationIds.push(newAlignment.shortId());
        }
    }
    saveAlmCardAlignmentsToServer(almCardId);
}

function buildCadRelationsSourceIdList(cad) {
    var crsIdList = [];
    for (var i = 0; i < cad.relationIds.length; i++) {
        var sourceId = relevantAlignmentRelationshipsMap[cad.relationIds[i]].source;
        if (!crsIdList.includes(sourceId)) {
            crsIdList.push(sourceId);
        }
    }
    return crsIdList;
}

function buildCadRelationsTargetIdList(cad) {
    var crtIdList = [];
    for (var i = 0; i < cad.relationIds.length; i++) {
        var targetId = relevantAlignmentRelationshipsMap[cad.relationIds[i]].target;
        if (!crtIdList.includes(targetId)) {
            crtIdList.push(targetId);
        }
    }
    return crtIdList;
}

function buildCadCpdsSourceIdList(cad) {
    var ccsIdList = [];
    for (var i = 0; i < cad.sourceCpds.length; i++) {
        ccsIdList.push(cad.sourceCpds[i].id);
    }
    return ccsIdList;
}

function buildCadCpdsTargetIdList(cad) {
    var cctIdList = [];
    for (var i = 0; i < cad.targetCpds.length; i++) {
        cctIdList.push(cad.targetCpds[i].id);
    }
    return cctIdList;
}

function buildNewAlignmentSetForSource(cad, sourceId, alignmentIdsAlreadyOnSaveList) {
    for (var i = 0; i < cad.targetCpds.length; i++) {
        var newAlignment = generateEcAlignment(cad.alignmentType, sourceId, cad.targetCpds[i].id);
        alignmentsToSave.push(newAlignment);
        cad.relationIds.push(newAlignment.shortId());
        alignmentIdsAlreadyOnSaveList.push(newAlignment.shortId());
    }
}

function buildNewAlignmentSetForTarget(cad, targetId, alignmentIdsAlreadyOnSaveList, newSourceList) {
    for (var i = 0; i < cad.sourceCpds.length; i++) {
        //only add for old sources...alignment already built for new sources
        if (!newSourceList.includes(cad.sourceCpds[i].id)) {
            var newAlignment = generateEcAlignment(cad.alignmentType, cad.sourceCpds[i].id, targetId);
            alignmentsToSave.push(newAlignment);
            cad.relationIds.push(newAlignment.shortId());
            alignmentIdsAlreadyOnSaveList.push(newAlignment.shortId());
        }
    }
}

function findNewAlignmentsForExistingDataCard(cad, alignmentIdsAlreadyOnSaveList) {
    var newSourceList = [];
    var crsIdList = buildCadRelationsSourceIdList(cad);
    var crtIdList = buildCadRelationsTargetIdList(cad);
    var ccsIdList = buildCadCpdsSourceIdList(cad);
    var cctIdList = buildCadCpdsTargetIdList(cad);
    //new alignments for new sources
    for (var i = 0; i < ccsIdList.length; i++) {
        if (!crsIdList.includes(ccsIdList[i])) {
            newSourceList.push(ccsIdList[i]);
            buildNewAlignmentSetForSource(cad, ccsIdList[i], alignmentIdsAlreadyOnSaveList);
        }
    }
    //new alignments for new targets
    for (var i = 0; i < cctIdList.length; i++) {
        if (!crtIdList.includes(cctIdList[i])) {
            buildNewAlignmentSetForTarget(cad, cctIdList[i], alignmentIdsAlreadyOnSaveList, newSourceList);
        }
    }
}

function checkForAlignmentTypeUpdateForExistingCard(cad, alignmentIdsAlreadyOnSaveList) {
    for (var i = 0; i < cad.relationIds.length; i++) {
        var r = relevantAlignmentRelationshipsMap[cad.relationIds[i]];
        if (r.relationType != cad.alignmentType && (!alignmentIdsAlreadyOnSaveList.includes(r.shortId()))) {
            r.relationType = cad.alignmentType;
            alignmentsToSave.push(r);
            alignmentIdsAlreadyOnSaveList.push(r.shortId());
        }
    }
}

function buildAlignmentsToSaveListForSaveExisting(cad, almCardId) {
    var alignmentIdsAlreadyOnSaveList = [];
    findNewAlignmentsForExistingDataCard(cad, alignmentIdsAlreadyOnSaveList);
    checkForAlignmentTypeUpdateForExistingCard(cad, alignmentIdsAlreadyOnSaveList);
}

function buildDeleteAlignmentSetForSource(cad, sourceId, alignmentIdsAlreadyOnDeleteList) {
    for (var i = 0; i < cad.relationIds.length; i++) {
        var r = relevantAlignmentRelationshipsMap[cad.relationIds[i]];
        if (r.source == sourceId && (!alignmentIdsAlreadyOnDeleteList.includes(r.shortId()))) {
            alignmentsToDelete.push(r);
            alignmentIdsAlreadyOnDeleteList.push(r.shortId());
        }
    }
}

function buildDeleteAlignmentSetForTarget(cad, targetId, alignmentIdsAlreadyOnDeleteList) {
    for (var i = 0; i < cad.relationIds.length; i++) {
        var r = relevantAlignmentRelationshipsMap[cad.relationIds[i]];
        if (r.target == targetId && (!alignmentIdsAlreadyOnDeleteList.includes(r.shortId()))) {
            alignmentsToDelete.push(r);
            alignmentIdsAlreadyOnDeleteList.push(r.shortId());
        }
    }
}

function buildAlignmentsToDeleteListForSaveExisting(cad, almCardId) {
    var alignmentIdsAlreadyOnDeleteList = [];
    var crsIdList = buildCadRelationsSourceIdList(cad);
    var crtIdList = buildCadRelationsTargetIdList(cad);
    var ccsIdList = buildCadCpdsSourceIdList(cad);
    var cctIdList = buildCadCpdsTargetIdList(cad);
    //delete alignments based on missing sources
    for (var i = 0; i < crsIdList.length; i++) {
        if (!ccsIdList.includes(crsIdList[i])) {
            buildDeleteAlignmentSetForSource(cad, crsIdList[i], alignmentIdsAlreadyOnDeleteList);
        }
    }
    //delete alignments based on missing targets
    for (var i = 0; i < crtIdList.length; i++) {
        if (!cctIdList.includes(crtIdList[i])) {
            buildDeleteAlignmentSetForTarget(cad, crtIdList[i], alignmentIdsAlreadyOnDeleteList);
        }
    }
}

function saveAlignmentCardDataAsExisting(cad, almCardId) {
    buildAlignmentsToSaveListForSaveExisting(cad, almCardId);
    buildAlignmentsToDeleteListForSaveExisting(cad, almCardId);
    saveAlmCardAlignmentsToServer(almCardId);
}

function saveAlignmentCard(almCardId) {
    alignmentsToSave = [];
    alignmentsToDelete = [];
    var cad = almCardIdToCadMap[almCardId];
    if (!cad.sourceCpds || cad.sourceCpds.length == 0 || !cad.targetCpds || cad.targetCpds.length == 0) {
        $(FWK_ALM_INVALID_ALM_WARNING_MODAL).foundation("open");
    }
    else {
        showAlignmentCardAsBusy(almCardId);
        if (cad.relationIds.length == 0) {
            saveAlignmentCardDataAsNew(cad, almCardId);
        }
        else {
            saveAlignmentCardDataAsExisting(cad, almCardId);
        }
    }
}

//**************************************************************************************************
// Alignment Editing View Functions
//**************************************************************************************************

function addFilterLinkToAlignmentListItem(listItemId, filterName, almType, almCount) {
    if ($("#" + listItemId).children("." + FWK_ALM_LIST_FLTR_CLASS).length > 0) {
        removeFilterLinkFromAlignmentListItem(listItemId);
    }
    var filterLink = $("<a/>");
    filterLink.addClass(FWK_ALM_LIST_FLTR_CLASS);
    filterLink.attr("onclick", "filterAlignmentCardsByName('" + escapeSingleQuote(filterName) + "');");
    filterLink.attr("title", "Show alignment(s)");
    filterLink.attr("data-alm-count", almCount);
    filterLink.attr("data-alm-type", almType);
    filterLink.html("<span class='alignment-filter'>" + almCount + "</span>");
    $("#" + listItemId).find("a").eq(0).after(filterLink);
}

function removeFilterLinkFromAlignmentListItem(listItemId) {
    $("#" + listItemId).children("." + FWK_ALM_LIST_FLTR_CLASS).remove();
}

function getAlmTypeDataForCpdLink(cpdId) {
    var cpdCads = cpdToCadMap[cpdId];
    if (cpdCads && cpdCads.length && cpdCads.length > 0) {
        var type = cpdCads[0].alignmentType;
        for (var i = 1; i < cpdCads.length; i++) {
            if (type != cpdCads[i].alignmentType) {
                type = "multi";
                break;
            }
        }
        return type;
    }
    else {
        return "na";
    }
}

function updateEditorFwkListItemFilterLinks() {
    for (var cpdId in cpdToCadMap) {
        if (cpdToCadMap.hasOwnProperty(cpdId)) {
            var almCount = cpdToCadMap[cpdId].length;
            var almType = getAlmTypeDataForCpdLink(cpdId);
            var listElems = cpdToAlignmentListElemMap[cpdId];
            if (listElems && listElems.length) {
                for (var i = 0; i < listElems.length; i++) {
                    if (almCount == 0) removeFilterLinkFromAlignmentListItem(listElems[i]);
                    else {
                        var cpdName = alignmentListElemToCpdMap[listElems[i]].name;
                        addFilterLinkToAlignmentListItem(listElems[i], cpdName, almType, almCount);
                    }
                }
            }
        }
    }
}

function removeCadFromCpdRegister(almCardId, cpdId) {
    if (cpdToCadMap[cpdId] && cpdToCadMap[cpdId].length && cpdToCadMap[cpdId].length > 0) {
        var cpdCads = cpdToCadMap[cpdId];
        var cadIdx = -1;
        for (var i = 0; i < cpdCads.length; i++) {
            if (cpdCads[i].almCardId == almCardId) {
                cadIdx = i;
                break;
            }
        }
        if (cadIdx != -1) {
            if (cadIdx == 0 && cpdToCadMap[cpdId].length == 1) {
                cpdToCadMap[cpdId] = [];
            }
            else {
                cpdToCadMap[cpdId].splice(cadIdx, 1);
            }
        }
    }
}

function removeCadFromAllCardCpds(cad, almCardId) {
    for (var i = 0; i < cad.sourceCpds.length; i++) {
        removeCadFromCpdRegister(almCardId, cad.sourceCpds[i].id);
    }
    for (var i = 0; i < cad.targetCpds.length; i++) {
        removeCadFromCpdRegister(almCardId, cad.targetCpds[i].id);
    }
}


function addCadToCpdRegister(cad, cpdId) {
    if (!cpdToCadMap[cpdId]) {
        cpdToCadMap[cpdId] = [];
    }
    cpdToCadMap[cpdId].push(cad);
}

function addCadToCardCpds(cad) {
    if (cad.sourceCpds && cad.sourceCpds.length > 0) {
        for (var i = 0; i < cad.sourceCpds.length; i++) {
            addCadToCpdRegister(cad, cad.sourceCpds[i].id);
        }
    }
    if (cad.targetCpds && cad.targetCpds.length > 0) {
        for (var i = 0; i < cad.targetCpds.length; i++) {
            addCadToCpdRegister(cad, cad.targetCpds[i].id);
        }
    }
}

function removeAlignmentCardFromView(almCardId) {
    $("#" + almCardId).slideUp("fast");
    $("#" + almCardId).remove();
    var cad = almCardIdToCadMap[almCardId];
    removeCadFromAllCardCpds(cad, almCardId);
    updateEditorFwkListItemFilterLinks();
    delete almCardIdToCadMap[almCardId];
    if (currentAlignmentCard == almCardId) currentAlignmentCard == null;
}

function filterAlignmentCompetencies(filterId, listId) {
    var filterVal = $("#" + filterId).val().toUpperCase();
    var listItems = $("#" + listId).find("li");
    for (i = 0; i < listItems.length; i++) {
        var li = listItems.eq(i);
        if (li.html() && li.html().toUpperCase().indexOf(filterVal) > -1) {
            li.removeClass("hide");
        }
        else li.addClass("hide");
    }
}

function filterAlignmentCardsByName(name) {
    if (name && name.trim() && name.trim().length > 0) {
        $(FWL_ALM_ALM_FLT).val(name);
        filterAlignmentCards();
    }
}

function filterAlignmentCards() {
    var cardSelected = false;
    var filterVal = $(FWL_ALM_ALM_FLT).val().trim().toUpperCase();
    for (var i = 0; i < alignmentCardList.length; i++) {
        var hideCard = true;
        var almcCompNames = almCardToCompNameMap[alignmentCardList[i]];
        if (filterVal == "" && almcCompNames.length == 0) hideCard = false;
        else {
            for (var j = 0; j < almcCompNames.length; j++) {
                if (almcCompNames[j].toUpperCase().indexOf(filterVal) > -1) {
                    hideCard = false;
                    break;
                }
            }
        }
        if (hideCard) $("#" + alignmentCardList[i]).addClass("hide");
        else {
            $("#" + alignmentCardList[i]).removeClass("hide");
            if (!cardSelected) {
                $("#" + alignmentCardList[i]).trigger("click");
                cardSelected = true;
            }
        }
    }
    if (!cardSelected) currentAlignmentCard = null;
}

function showAlignmentCardAsBusy(almCardId) {
    $("#" + buildAlignmentCardSaveButtonId(almCardId)).attr("disabled", "true");
    $("#" + buildAlignmentCardDeleteButtonId(almCardId)).attr("disabled", "true");
    $("#" + buildAlignmentCardFlipDirectionButtonId(almCardId)).attr("disabled", "true");
    $("#" + buildAlignmentCardBusyFinishedImageId(almCardId)).hide();
    $("#" + buildAlignmentCardBusyImageId(almCardId)).show();
    $("#" + buildAlignmentCardBusyContainerId(almCardId)).show();
}

function showAlignmentCardAsNotBusy(almCardId) {
    $("#" + buildAlignmentCardSaveButtonId(almCardId)).removeAttr("disabled");
    $("#" + buildAlignmentCardDeleteButtonId(almCardId)).removeAttr("disabled");
    $("#" + buildAlignmentCardFlipDirectionButtonId(almCardId)).removeAttr("disabled");
    $("#" + buildAlignmentCardBusyImageId(almCardId)).hide();
    $("#" + buildAlignmentCardBusyFinishedImageId(almCardId)).show();
    $("#" + buildAlignmentCardBusyContainerId(almCardId)).fadeOut(FWK_ALM_CARD_BUSY_FADEOUT);
}

function unhighlightEditorFwkListLinksForCpd(cpd) {
    var clla = cpdToAlignmentListElemLinkMap[cpd.id];
    if (clla) {
        for (var j = 0; j < clla.length; j++) {
            $("#" + clla[j]).removeClass("aligned");
            $("#" + clla[j]).removeClass("selected");
        }
    }
}

function highlightEditorFwkListLinksForCpd(cpd) {
    var clla = cpdToAlignmentListElemLinkMap[cpd.id];
    if (clla) {
        for (var j = 0; j < clla.length; j++) {
            $("#" + clla[j]).removeClass("aligned");
            $("#" + clla[j]).addClass("selected");
        }
    }
}

function highlightEditorFwkListLinksForCpdList(cpdList) {
    if (cpdList) {
        for (var i = 0; i < cpdList.length; i++) {
            highlightEditorFwkListLinksForCpd(cpdList[i]);
        }
    }
}

function highlightAlignmentListItemsForCurrentCard() {
    unHighlightAllAlignmentListItems();
    var cad = almCardIdToCadMap[currentAlignmentCard];
    if (cad) {
        highlightEditorFwkListLinksForCpdList(cad.sourceCpds);
        highlightEditorFwkListLinksForCpdList(cad.targetCpds);
    }
}

function setCurrentAlignmentCard(almCardId) {
    if (almCardId) {
        currentAlignmentCard = almCardId;
        highlightAlignmentListItemsForCurrentCard();
    }
}

function getIdForNewAlignmentCard() {
    lastAlignmentCardIdx++;
    var newAlmCardId = FWK_ALM_CRD_ID_PREFIX + "_" + lastAlignmentCardIdx;
    debugMessage("Generating new alignment card ID: " + newAlmCardId);
    alignmentCardList.push(newAlmCardId);
    return newAlmCardId;
}

function buildAlignmentCardCompetencyContainerContentId(contentContainerId, cpdId) {
    return contentContainerId + "_" + buildIDableString(cpdId);
}

function buildAlignmentCardCompetencyContainerId(almCardId, contIdPrefix) {
    return almCardId + "_" + contIdPrefix;
}

function generateAlignmentCardEmptyCompetencyHtml() {
    return "<p class=\"empty-match\">None selected</p>";
}

function generateAlignmentCardCompetencyContentsHtml(almCardId, containerId, cpd) {
    var contentItemId = buildAlignmentCardCompetencyContainerContentId(containerId, cpd.id);
    almCardCompToCpdMap[contentItemId] = cpd;
    almCardToCompNameMap[almCardId].push(cpd.name);
    return "<p id=\"" + contentItemId + "\" class=\"matched\">" +
        " <a title=\"Remove from alignment\" onclick=\"removeCompetencyFromAlignment('" + containerId + "','" + contentItemId + "');\">" +
        " <i class=\"fa fa-times-circle removeAlignmentComp\" aria-hidden=\"true\"></i></a>" +
        " " + cpd.name + "</p>";
}

function createAlignmentCardCompetencyContainer(contClass, almCardId, contIdPrefix, cpdList) {
    var accCont = $("<div/>");
    var accContId = buildAlignmentCardCompetencyContainerId(almCardId, contIdPrefix);
    accCont.attr("id", accContId);
    accCont.addClass(contClass);
    var accContHtml = "";
    if (!cpdList || cpdList.length == 0) {
        accContHtml = generateAlignmentCardEmptyCompetencyHtml();
    }
    else {
        for (var i = 0; i < cpdList.length; i++) {
            var cpd = cpdList[i];
            accContHtml += generateAlignmentCardCompetencyContentsHtml(almCardId, accContId, cpd);
        }
    }
    accCont.html(accContHtml);
    return accCont;
}

function buildAlignmentCardRelationshipMenuButtonId(almCardId) {
    return almCardId + "_" + FWK_ALM_CRD_REL_MENU_BTN_PREFIX;
}

function getAlignmentCardRelationshipMenuButtonClass(alignmentType, dir) {
    var mbc = "relationship-menu-button ";
    switch (alignmentType) {
        case 'isEquivalentTo':
            mbc += "icon-isEquivalentTo";
            break;
        case 'isRelatedTo':
            mbc += "icon-isRelatedTo";
            break;
        case 'narrows':
            mbc += "icon-narrows";
            break;
        case 'desires':
            mbc += "icon-desires";
            break;
        case 'requires':
            mbc += "icon-requires";
            break;
    }
    if (dir == "RTL") mbc += " flipped";
    return mbc;
}

function addAlignmentCardRelationshipMenuChoices(almCardId, relMenuBtn, dir) {
    var relMenuEqBtn = $("<div/>");
    relMenuEqBtn.addClass("relationship-choice icon-isEquivalentTo");
    if (dir == "RTL") relMenuEqBtn.addClass("flipped");
    relMenuEqBtn.attr("data-type", "isEquivalentTo");
    relMenuEqBtn.attr("data-label-text", "Is Equivalent To");
    relMenuEqBtn.attr("data-alm-card-id", almCardId);
    relMenuBtn.append(relMenuEqBtn);
    var relMenuRelBtn = $("<div/>");
    relMenuRelBtn.addClass("relationship-choice icon-isRelatedTo");
    if (dir == "RTL") relMenuRelBtn.addClass("flipped");
    relMenuRelBtn.attr("data-type", "isRelatedTo");
    relMenuRelBtn.attr("data-label-text", "Is Related To");
    relMenuRelBtn.attr("data-alm-card-id", almCardId);
    relMenuBtn.append(relMenuRelBtn);
    var relMenuNarBtn = $("<div/>");
    relMenuNarBtn.addClass("relationship-choice icon-narrows");
    if (dir == "RTL") relMenuNarBtn.addClass("flipped");
    relMenuNarBtn.attr("data-type", "narrows");
    relMenuNarBtn.attr("data-label-text", "Narrows");
    relMenuNarBtn.attr("data-alm-card-id", almCardId);
    relMenuBtn.append(relMenuNarBtn);
    // var relMenuDesBtn = $("<div/>");
    // relMenuDesBtn.addClass("relationship-choice icon-desires");
    // if (dir = "RTL") relMenuDesBtn.addClass("flipped");
    // relMenuDesBtn.attr("data-type","desires");
    // relMenuDesBtn.attr("data-label-text","Desires");
    // relMenuDesBtn.attr("data-alm-card-id",almCardId);
    // relMenuBtn.append(relMenuDesBtn);
    // var relMenuReqBtn = $("<div/>");
    // relMenuReqBtn.addClass("relationship-choice icon-requires");
    // if (dir = "RTL") relMenuReqBtn.addClass("flipped");
    // relMenuReqBtn.attr("data-type","requires");
    // relMenuReqBtn.attr("data-label-text","Requires");
    // relMenuReqBtn.attr("data-alm-card-id",almCardId);
    // relMenuBtn.append(relMenuReqBtn);
}

function createAlignmentCardRelationshipMenu(alignmentType, dir, almCardId) {
    var relMenuCtr = $("<div/>");
    relMenuCtr.addClass("alignment-match-center cell small-3");
    var relMenu = $("<div/>");
    relMenu.addClass("relationship-menu");
    var relMenuBtn = $("<div/>");
    relMenuBtn.attr("id", buildAlignmentCardRelationshipMenuButtonId(almCardId));
    relMenuBtn.addClass(getAlignmentCardRelationshipMenuButtonClass(alignmentType, dir));
    var relMenuBg = $("<div/>");
    relMenuBg.addClass("relationship-menu-background");
    relMenuBtn.append(relMenuBg);
    var relMenuLbl = $("<div/>");
    relMenuLbl.addClass("relationship-menu-label");
    relMenuLbl.html("<i class=\"fa fa-times\" aria-hidden=\"true\"></i>");
    relMenuBtn.append(relMenuLbl);
    addAlignmentCardRelationshipMenuChoices(almCardId, relMenuBtn, dir);
    relMenu.append(relMenuBtn);
    relMenuCtr.append(relMenu);
    return relMenuCtr;
}

function changeAlignmentCardRelationship(almCardId, newRelationshipType) {
    var cad = almCardIdToCadMap[almCardId];
    cad.alignmentType = newRelationshipType;
    setAlignmentCardRelationMenuIconDirection(almCardId, cad.direction);
    updateEditorFwkListItemFilterLinks();
}

function createAlignmentCardCompetencyContainers(alignmentData, almCardId) {
    var acc = $("<div/>");
    acc.addClass("alignment-match-content grid-x grid-padding-x");
    if (alignmentData.direction == "LTR") {
        acc.append(createAlignmentCardCompetencyContainer("alignment-match-left cell auto", almCardId, FWK_ALM_CRD_FW1_CNT_ID_PREFIX, alignmentData.sourceCpds));
        acc.append(createAlignmentCardRelationshipMenu(alignmentData.alignmentType, alignmentData.direction, almCardId));
        acc.append(createAlignmentCardCompetencyContainer("alignment-match-right cell auto", almCardId, FWK_ALM_CRD_FW2_CNT_ID_PREFIX, alignmentData.targetCpds));
    }
    else {
        acc.append(createAlignmentCardCompetencyContainer("alignment-match-left cell auto", almCardId, FWK_ALM_CRD_FW1_CNT_ID_PREFIX, alignmentData.targetCpds));
        acc.append(createAlignmentCardRelationshipMenu(alignmentData.alignmentType, alignmentData.direction, almCardId));
        acc.append(createAlignmentCardCompetencyContainer("alignment-match-right cell auto", almCardId, FWK_ALM_CRD_FW2_CNT_ID_PREFIX, alignmentData.sourceCpds));
    }
    return acc;
}

function buildAlignmentCardSaveButtonId(almCardId) {
    return almCardId + "_" + FWK_ALM_CRD_SAVE_BTN_ID_PREFIX;
}

function buildAlignmentCardDeleteButtonId(almCardId) {
    return almCardId + "_" + FWK_ALM_CRD_DLT_BTN_ID_PREFIX;
}

function buildAlignmentCardFlipDirectionButtonId(almCardId) {
    return almCardId + "_" + FWK_ALM_CRD_REL_SWTCH_DIR_BTN_ID_PREFIX;
}

function setAlignmentCardRelationMenuIconDirection(almCardId, dir) {
    if (dir == "RTL") {
        $("#" + buildAlignmentCardRelationshipMenuButtonId(almCardId)).addClass("flipped");
        $("#" + buildAlignmentCardRelationshipMenuButtonId(almCardId)).find('.relationship-choice').addClass("flipped");
    }
    else {
        $("#" + buildAlignmentCardRelationshipMenuButtonId(almCardId)).removeClass("flipped");
        $("#" + buildAlignmentCardRelationshipMenuButtonId(almCardId)).find('.relationship-choice').removeClass("flipped");
    }
}

function swapAlignmentCabDirection(cad, newDir) {
    var temp = cad.sourceCpds;
    cad.sourceCpds = cad.targetCpds;
    cad.targetCpds = temp;
    cad.direction = newDir;
}

function changeCardDirection(almCardId) {
    var cad = almCardIdToCadMap[almCardId];
    var newDir;
    if (cad.direction == "LTR") newDir = "RTL";
    else newDir = "LTR";
    swapAlignmentCabDirection(cad, newDir);
    setAlignmentCardRelationMenuIconDirection(almCardId, cad.direction);
}

function createAlignmentCardOptionsButtons(almCardId) {
    var optionCellB = $("<div/>");
    optionCellB.addClass("cell shrink");
    var deleteBtn = $("<button/>");
    deleteBtn.attr("title", "Delete alignment(s)");
    deleteBtn.attr("id", buildAlignmentCardDeleteButtonId(almCardId));
    deleteBtn.addClass("alignment-match-deleteCard warning button");
    deleteBtn.attr("onclick", "confirmDeleteAlignmentCard('" + almCardId + "');");
    deleteBtn.html("<i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>");
    optionCellB.append(deleteBtn);
    var switchDirBtn = $("<button/>");
    switchDirBtn.attr("title", "Flip alignment direction");
    switchDirBtn.attr("id", buildAlignmentCardFlipDirectionButtonId(almCardId));
    switchDirBtn.addClass("alignment-match-flipDirection secondary button");
    switchDirBtn.attr("onclick", "changeCardDirection('" + almCardId + "');");
    switchDirBtn.html("<i class=\"fa fa-exchange\" aria-hidden=\"true\"></i>");
    optionCellB.append(switchDirBtn);
    var saveBtn = $("<button/>");
    saveBtn.attr("title", "Save alignment(s)");
    saveBtn.attr("id", buildAlignmentCardSaveButtonId(almCardId));
    saveBtn.addClass("alignment-match-saveCard button");
    saveBtn.attr("onclick", "saveAlignmentCard('" + almCardId + "');");
    saveBtn.html("Save");
    optionCellB.append(saveBtn);
    return optionCellB;
}

function createAlignmentCardOptionsContainer(alignmentData, almCardId) {
    var aco = $("<div/>");
    aco.addClass("alignment-match-options grid-x grid-margin-x");
    var optionCellA = $("<div/>");
    optionCellA.addClass("cell auto");
    aco.append(optionCellA);
    aco.append(createAlignmentCardOptionsButtons(almCardId));
    return aco;
}

function buildAlignmentCardBusyContainerId(almCardId) {
    return almCardId + "_" + FWK_ALM_CRD_BUSY_CTR_ID_PREFIX;
}

function buildAlignmentCardBusyImageId(almCardId) {
    return almCardId + "_" + FWK_ALM_CRD_BUSY_IMG_ID_PREFIX;
}

function buildAlignmentCardBusyFinishedImageId(almCardId) {
    return almCardId + "_" + FWK_ALM_CRD_BUSY_FIN_IMG_ID_PREFIX;
}

function createAlignmentCardBusyContainer(almCardId) {
    var acb = $("<div/>");
    acb.addClass("alignment-match-busy grid-x grid-margin-x");
    acb.attr("style", "display:none");
    acb.attr("id", buildAlignmentCardBusyContainerId(almCardId));
    var busyCell = $("<div/>");
    busyCell.addClass("cell auto");
    var busyImg = $("<img/>");
    busyImg.attr("style", "display:none");
    busyImg.attr("id", buildAlignmentCardBusyImageId(almCardId));
    busyImg.attr("src", FWK_ALM_CARD_BUSY_IMG_SRC);
    busyCell.append(busyImg);
    var busyFin = $("<span/>");
    busyFin.attr("style", "display:none");
    busyFin.attr("id", buildAlignmentCardBusyFinishedImageId(almCardId));
    busyFin.html("<i class=\"" + FWK_ALM_CARD_BUSY_FINISHED_CLASS + "\"></i>");
    busyCell.append(busyFin);
    acb.append(busyCell);
    return acb;
}

function createNewAlignmentCard(alignmentData, setSelected) {
    currentAlignmentCard = null;
    unselectAllAlignmentEditorCards();
    var almCardId = getIdForNewAlignmentCard();
    if (!alignmentData) alignmentData = new customAlignmentData();
    alignmentData.almCardId = almCardId;
    almCardIdToCadMap[almCardId] = alignmentData;
    almCardToCompNameMap[almCardId] = [];
    addCadToCardCpds(alignmentData);
    var newAlmCard = $("<div/>");
    newAlmCard.attr("id", almCardId);
    newAlmCard.addClass("callout");
    newAlmCard.append(createAlignmentCardCompetencyContainers(alignmentData, almCardId));
    newAlmCard.append(createAlignmentCardOptionsContainer(alignmentData, almCardId));
    newAlmCard.append(createAlignmentCardBusyContainer(almCardId));
    if (setSelected) {
        newAlmCard.addClass("selected");
        currentAlignmentCard = almCardId;
    }
    newAlmCard.hide();
    $(FWK_ALM_NEW_CARD_HOOK).after(newAlmCard);
    newAlmCard.slideDown();
}

function addCompetencyToCurrentAlignmentCard(cpd, contIdPrefix) {
    var accContId = buildAlignmentCardCompetencyContainerId(currentAlignmentCard, contIdPrefix);
    var contentItemId = buildAlignmentCardCompetencyContainerContentId(accContId, cpd.id);
    if ($("#" + contentItemId).length) return false;
    var newAccContHtml = generateAlignmentCardCompetencyContentsHtml(currentAlignmentCard, accContId, cpd);
    var accCont = $("#" + accContId);
    accCont.children('.empty-match').remove();
    var oldAccContHtml = accCont.html();
    accCont.html(oldAccContHtml + newAccContHtml);
    return true;
}

function addCompetencyToAlignmentData(cpd, cad, frameworkInd) {
    if ("FW1" == frameworkInd) {
        if (cad.direction == "LTR") {
            cad.sourceCpds.push(cpd);
        }
        else {
            cad.targetCpds.push(cpd);
        }
    }
    else {
        if (cad.direction == "LTR") {
            cad.targetCpds.push(cpd);
        }
        else {
            cad.sourceCpds.push(cpd);
        }
    }
}

function removeCompetencyFromAlignmentData(cpd, cad, frameworkInd) {
    if ("FW1" == frameworkInd) {
        if (cad.direction == "LTR") {
            cad.sourceCpds = removeCpdFromCpdArray(cad.sourceCpds, cpd);
        }
        else {
            cad.targetCpds = removeCpdFromCpdArray(cad.targetCpds, cpd);
        }
    }
    else {
        if (cad.direction == "LTR") {
            cad.targetCpds = removeCpdFromCpdArray(cad.targetCpds, cpd);
        }
        else {
            cad.sourceCpds = removeCpdFromCpdArray(cad.sourceCpds, cpd);
        }
    }
}

function canCompetencyBeAddedToAlignmentCard(almCardId, frameworkInd) {
    if (ALLOW_MANY_TO_MANY_ALM_CARDS) return true;
    var cad = almCardIdToCadMap[almCardId];
    if ("FW1" == frameworkInd) {
        if (cad.direction == "LTR") {
            if (cad.sourceCpds.length == 0) return true;
            else if (cad.targetCpds.length <= 1) return true;
            else return false;
        }
        else {
            if (cad.targetCpds.length == 0) return true;
            else if (cad.sourceCpds.length <= 1) return true;
            else return false;
        }
    }
    else {
        if (cad.direction == "LTR") {
            if (cad.targetCpds.length == 0) return true;
            else if (cad.sourceCpds.length <= 1) return true;
            else return false;
        }
        else {
            if (cad.sourceCpds.length == 0) return true;
            else if (cad.targetCpds.length <= 1) return true;
            else return false;
        }
    }
}

function addCompetencyToAlignment(clickedElemId) {
    var cpd = alignmentListElemToCpdMap[clickedElemId];
    if (!cpd) return;
    showEditorCenterColumn();
    if (!currentAlignmentCard || currentAlignmentCard == null) createNewAlignmentCard(null, true);
    var contIdPrefix;
    var frameworkInd;
    if (clickedElemId.startsWith(FWK_ALM_FW1_SIDE_PREFIX)) {
        contIdPrefix = FWK_ALM_CRD_FW1_CNT_ID_PREFIX;
        frameworkInd = "FW1";
    }
    else {
        contIdPrefix = FWK_ALM_CRD_FW2_CNT_ID_PREFIX;
        frameworkInd = "FW2";
    }
    if (canCompetencyBeAddedToAlignmentCard(currentAlignmentCard, frameworkInd)) {
        if (addCompetencyToCurrentAlignmentCard(cpd, contIdPrefix)) {
            addCompetencyToAlignmentData(cpd, almCardIdToCadMap[currentAlignmentCard], frameworkInd);
            highlightEditorFwkListLinksForCpd(cpd);
            addCadToCpdRegister(almCardIdToCadMap[currentAlignmentCard], cpd.id);
            updateEditorFwkListItemFilterLinks();
        }
    }
}

function removeCompetencyFromAlignment(accContId, clickedElemId) {
    var accCont = $("#" + accContId);
    accCont.children('#' + clickedElemId).remove();
    var cpd = almCardCompToCpdMap[clickedElemId];
    removeStringFromArray(almCardToCompNameMap[currentAlignmentCard], cpd.name);
    if (accCont.children('.matched').length == 0) {
        accCont.html(generateAlignmentCardEmptyCompetencyHtml());
    }
    var frameworkInd;
    if (accContId.indexOf(FWK_ALM_CRD_FW1_CNT_ID_PREFIX) > -1) frameworkInd = "FW1";
    else frameworkInd = "FW2";
    removeCompetencyFromAlignmentData(cpd, almCardIdToCadMap[currentAlignmentCard], frameworkInd);
    unhighlightEditorFwkListLinksForCpd(cpd);
    removeCadFromCpdRegister(currentAlignmentCard, cpd.id);
    updateEditorFwkListItemFilterLinks();
}

//**************************************************************************************************
// Alignment Display Setup
//**************************************************************************************************
function buildIdForFrameworkListItem(elemIdPrefix, parentIdList, childId) {
    return elemIdPrefix + "_" + buildIDableString(parentIdList) + "_" + buildIDableString(childId);
}

function buildIdForFrameworkListItemLink(elemIdPrefix, childId) {
    return elemIdPrefix + "_" + buildIDableString(childId) + "_lnk";
}

function buildAlignmentListItemHtml(cpd, hasChildren, elemId) {
    var alignmentListItemLinkId = buildIdForFrameworkListItemLink(elemId, cpd.id);
    if (!cpdToAlignmentListElemLinkMap[cpd.id]) cpdToAlignmentListElemLinkMap[cpd.id] = [];
    cpdToAlignmentListElemLinkMap[cpd.id].push(alignmentListItemLinkId);
    var retHtml = "";
    if (hasChildren) retHtml += "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>&nbsp;";
    else retHtml += "<i class=\"fa fa-circle\" aria-hidden=\"true\"></i>&nbsp;";
    retHtml += "<a id=\"" + alignmentListItemLinkId + "\" onclick=\"addCompetencyToAlignment('" + elemId + "');\" " +
        " title=\" Add '" + cpd.name + "' to the selected alignment\" class=\"align-competency-title\">" +
        cpd.name + "</a>";
    return retHtml;
}

function addChildToEditorFrameworkList(parentUl, childCpd, elemIdPrefix, parentIdList) {
    var childLi = $("<li/>");
    var childId = childCpd.id;
    var elemId = buildIdForFrameworkListItem(elemIdPrefix, parentIdList, childId);
    childLi.attr("id", elemId);
    alignmentListElemToCpdMap[elemId] = childCpd;
    if (!cpdToAlignmentListElemMap[childCpd.id]) cpdToAlignmentListElemMap[childCpd.id] = [];
    cpdToAlignmentListElemMap[childCpd.id].push(elemId);
    var childHasChildren = childCpd.children && childCpd.children.length > 0;
    childLi.html(buildAlignmentListItemHtml(childCpd, childHasChildren, elemId));
    if (childHasChildren) {
        var childsChildUl = $("<ul/>");
        childsChildUl.addClass("fa-ul");
        $(childCpd.children).each(function (i, cc) {
            addChildToEditorFrameworkList(childsChildUl, cc, elemIdPrefix, parentIdList + "|" + childId);
        });
        childLi.append(childsChildUl);
    }
    parentUl.append(childLi);
}

function buildEditorFrameworkCompetencyList(fwListId, fwD3n, elemIdPrefix, parentIdList) {
    $(fwListId).empty();
    if (!fwD3n || fwD3n == null) return;
    if (fwD3n.children && fwD3n.children.length > 0) {
        fwD3n.children.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        $(fwD3n.children).each(function (i, c) {
            addChildToEditorFrameworkList($(fwListId), c, elemIdPrefix, parentIdList);
        });
    }
}

function removeAllAlignmentCardsForPrep() {
    if (alignmentCardList) {
        for (var i = 0; i < alignmentCardList.length; i++) {
            $("#" + alignmentCardList[i]).remove();
        }
    }
}

function buildAlignmentCardsForCadList(cadList) {
    if (cadList && cadList.length > 0) {
        for (var i = 0; i < cadList.length; i++) {
            createNewAlignmentCard(cadList[i], true);
            unselectAllAlignmentEditorCards();
        }
    }
}

function buildAlignmentCardsForExistingAlignments() {
    buildAlignmentCardsForCadList(initialAlignmentEquivalentToCadsRTL);
    buildAlignmentCardsForCadList(initialAlignmentRelatedToCadsRTL);
    buildAlignmentCardsForCadList(initialAlignmentNarrowsCadsRTL);
    buildAlignmentCardsForCadList(initialAlignmentDesiresCadsRTL);
    buildAlignmentCardsForCadList(initialAlignmentRequiresCadsRTL);
    buildAlignmentCardsForCadList(initialAlignmentEquivalentToCadsLTR);
    buildAlignmentCardsForCadList(initialAlignmentRelatedToCadsLTR);
    buildAlignmentCardsForCadList(initialAlignmentNarrowsCadsLTR);
    buildAlignmentCardsForCadList(initialAlignmentDesiresCadsLTR);
    buildAlignmentCardsForCadList(initialAlignmentRequiresCadsLTR);
    if (alignmentCardList && alignmentCardList.length > 0) showEditorCenterColumn();
    else hideEditorCenterColumn();
    unselectAllAlignmentEditorCards();
    currentAlignmentCard = null;
    updateEditorFwkListItemFilterLinks();
}

function prepAlignmentEditorDisplay() {
    removeAllAlignmentCardsForPrep();
    hideEditorCenterColumn();
    clearAlignmentEditorFilters();
    buildEditorFrameworkCompetencyList(FWK_ALM_FW_LIST1, framework1D3Node, FWK_ALM_FW1_SIDE_PREFIX, "ROOT");
    buildEditorFrameworkCompetencyList(FWK_ALM_FW_LIST2, framework2D3Node, FWK_ALM_FW2_SIDE_PREFIX, "ROOT");
    registerEditorListToggles();
    buildAlignmentCardsForExistingAlignments();
}

function removeLeftoverAlignmentCards() {
    if (alignmentCardList) {
        for (var i=0;i<alignmentCardList.length;i++) {
            $("#" + alignmentCardList[i]).remove();
        }
    }
}

function prepAlignmentFrameworkInitialDisplay() {
    showPageAsBusy("Building framework alignment display...");
    alignmentListElemToCpdMap = {};
    cpdToAlignmentListElemLinkMap = {};
    cpdToAlignmentListElemMap = {};
    removeLeftoverAlignmentCards();
    $(FWK_ALM_VIS_SCREEN).hide();
    $(FWK_ALM_EDIT_SCREEN).hide();
    alignmentCardList = [];
    lastAlignmentCardIdx = 0;
    currentAlignmentCard = null;
    almCardIdToCadMap = {};
    almCardCompToCpdMap = {};
    almCardToCompNameMap = {};
    cpdToCadMap = {};
    prepAlignmentEditorDisplay();
    //showAlignmentEditViewMainContentsScreenInstant();
    showPageMainContentsContainer();
    buildAndShowAlignmentVisualizationCircleGraph();
    enableViewToggleButtons();
    showAllFrameworkAlignmentTools();
}

//**************************************************************************************************
// Initial Card Data/Custom Alignment Data (CAD) Generation and Rollup
//**************************************************************************************************

function generateSimpleCadFromRelation(rel, dir) {
    var scad = new customAlignmentDataSimple();
    scad.relationIds.push(rel.shortId());
    scad.sourceIds.push(rel.source);
    scad.targetIds.push(rel.target);
    scad.alignmentType = rel.relationType;
    scad.direction = dir;
    return scad;
}

function getAlignmentSourceCpd(sourceId, dir) {
    if (dir == "LTR") return framework1CompData.competencyPacketDataMap[sourceId];
    else return framework2CompData.competencyPacketDataMap[sourceId];
}

function getAlignmentTargetCpd(targetId, dir) {
    if (dir == "LTR") return framework2CompData.competencyPacketDataMap[targetId];
    else return framework1CompData.competencyPacketDataMap[targetId];
}

function generateCadFromRelation(rel, dir) {
    var cad = new customAlignmentData();
    cad.relationIds.push(rel.shortId());
    cad.sourceCpds.push(getAlignmentSourceCpd(rel.source, dir));
    cad.targetCpds.push(getAlignmentTargetCpd(rel.target, dir));
    cad.alignmentType = rel.relationType;
    cad.direction = dir;
    return cad;
}

function generateCadFromSimpleCad(scad, dir) {
    var cad = new customAlignmentData();
    cad.relationIds = scad.relationIds.slice(0);
    for (var i = 0; i < scad.sourceIds.length; i++) {
        cad.sourceCpds.push(getAlignmentSourceCpd(scad.sourceIds[i], dir));
    }
    for (var i = 0; i < scad.targetIds.length; i++) {
        cad.targetCpds.push(getAlignmentTargetCpd(scad.targetIds[i], dir));
    }
    cad.alignmentType = scad.alignmentType;
    cad.direction = scad.direction;
    return cad;
}

function buildSimpleCadListFromRelArray(relArray, dir) {
    var simpleCadList = [];
    var simpleCadMap = {};
    for (var i = 0; i < relArray.length; i++) {
        var relSource = relArray[i].source;
        var relTarget = relArray[i].target;
        if (!simpleCadMap[relSource] || simpleCadMap[relSource] == null) {
            var newScad = generateSimpleCadFromRelation(relArray[i], dir);
            simpleCadMap[relSource] = newScad;
            simpleCadList.push(newScad);
        }
        else {
            var exScad = simpleCadMap[relSource];
            exScad.targetIds.push(relTarget);
            exScad.relationIds.push(relArray[i].shortId());
        }
    }
    return simpleCadList;
}

function mergeSimpleCads(simpleCad1, simpleCad2) {
    for (var i = 0; i < simpleCad2.relationIds.length; i++) {
        if (!simpleCad1.relationIds.includes(simpleCad2.relationIds[i])) {
            simpleCad1.relationIds.push(simpleCad2.relationIds[i]);
        }
    }
    for (var i = 0; i < simpleCad2.sourceIds.length; i++) {
        if (!simpleCad1.sourceIds.includes(simpleCad2.sourceIds[i])) {
            simpleCad1.sourceIds.push(simpleCad2.sourceIds[i]);
        }
    }
}

function findSimpleCadMatch(simpleCadList, startingIdx, scad, rolledUpList) {
    if (ALLOW_MANY_TO_MANY_ALM_CARDS || (scad.targetIds.length == 1)) {
        for (var j = startingIdx; j < simpleCadList.length; j++) {
            var isMatch = true;
            if (scad.targetIds.length != simpleCadList[j].targetIds.length) {
                isMatch = false;
            }
            else {
                for (var k = 0; k < simpleCadList[j].targetIds.length; k++) {
                    var targetId = simpleCadList[j].targetIds[k];
                    if (!scad.targetIds.includes(targetId)) {
                        isMatch = false;
                        break;
                    }
                }
            }
            if (isMatch) {
                mergeSimpleCads(scad, simpleCadList[j]);
                rolledUpList.push(simpleCadList[j].sourceIds.toString());
            }
        }
    }
}

function rollupSimpleCadList(simpleCadList) {
    var rolledUpList = [];
    var rscadList = []
    if (!simpleCadList || simpleCadList.length == 0) return rscadList;
    for (var i = 0; i < simpleCadList.length; i++) {
        if (!rolledUpList.includes(simpleCadList[i].sourceIds.toString())) {
            rscadList.push(simpleCadList[i]);
            findSimpleCadMatch(simpleCadList, i + 1, simpleCadList[i], rolledUpList);
        }
    }
    return rscadList;
}

function rollupMultipleRelationsIntoCads(relArray, dir) {
    var cads = [];
    var simpleCadList = buildSimpleCadListFromRelArray(relArray, dir);
    var rscadList = rollupSimpleCadList(simpleCadList);
    for (var i = 0; i < rscadList.length; i++) {
        cads.push(generateCadFromSimpleCad(rscadList[i], dir));
    }
    return cads;
}

function rollupRelationsIntoCads(relArray, dir) {
    var cads = [];
    if (!relArray || relArray.length == 0) {
        return cads;
    }
    else if (relArray.length == 1) {
        cads.push(generateCadFromRelation(relArray[0], dir));
    }
    else cads = rollupMultipleRelationsIntoCads(relArray, dir);
    return cads;
}

function getRelationsOfTypeForAlignment(relArray, relType) {
    var rotArray = [];
    for (var i = 0; i < relArray.length; i++) {
        var r = relArray[i];
        if (r.relationType == relType) rotArray.push(r);
    }
    return rotArray;
}

function buildInitialAlignmentCads() {
    if (relevantAlignmentRelationshipsLTR.length > 0) {
        initialAlignmentEquivalentToCadsLTR = rollupRelationsIntoCads(getRelationsOfTypeForAlignment(relevantAlignmentRelationshipsLTR, "isEquivalentTo"), "LTR");
        initialAlignmentRelatedToCadsLTR = rollupRelationsIntoCads(getRelationsOfTypeForAlignment(relevantAlignmentRelationshipsLTR, "isRelatedTo"), "LTR");
        initialAlignmentNarrowsCadsLTR = rollupRelationsIntoCads(getRelationsOfTypeForAlignment(relevantAlignmentRelationshipsLTR, "narrows"), "LTR");
        initialAlignmentDesiresCadsLTR = rollupRelationsIntoCads(getRelationsOfTypeForAlignment(relevantAlignmentRelationshipsLTR, "desires"), "LTR");
        initialAlignmentRequiresCadsLTR = rollupRelationsIntoCads(getRelationsOfTypeForAlignment(relevantAlignmentRelationshipsLTR, "requires"), "LTR");
    }
    if (relevantAlignmentRelationshipsRTL.length > 0) {
        initialAlignmentEquivalentToCadsRTL = rollupRelationsIntoCads(getRelationsOfTypeForAlignment(relevantAlignmentRelationshipsRTL, "isEquivalentTo"), "RTL");
        initialAlignmentRelatedToCadsRTL = rollupRelationsIntoCads(getRelationsOfTypeForAlignment(relevantAlignmentRelationshipsRTL, "isRelatedTo"), "RTL");
        initialAlignmentNarrowsCadsRTL = rollupRelationsIntoCads(getRelationsOfTypeForAlignment(relevantAlignmentRelationshipsRTL, "narrows"), "RTL");
        initialAlignmentDesiresCadsRTL = rollupRelationsIntoCads(getRelationsOfTypeForAlignment(relevantAlignmentRelationshipsRTL, "desires"), "RTL");
        initialAlignmentRequiresCadsRTL = rollupRelationsIntoCads(getRelationsOfTypeForAlignment(relevantAlignmentRelationshipsRTL, "requires"), "RTL");
    }
}

//**************************************************************************************************
// Relevant Framework Relation
//**************************************************************************************************

function buildRelevantFrameworkAlignmentData(processedAlignmentIds, fwRelationArray) {
    for (var i = 0; i < fwRelationArray.length; i++) {
        var r = fwRelationArray[i];
        if (r.hasOwner(loggedInPk)) {
            var sourceCpd = framework1CompData.competencyPacketDataMap[fwRelationArray[i].source];
            var targetCpd = framework2CompData.competencyPacketDataMap[fwRelationArray[i].target];
            if (sourceCpd && targetCpd) {
                if (!processedAlignmentIds.includes(fwRelationArray[i].shortId())) {
                    processedAlignmentIds.push(fwRelationArray[i].shortId());
                    //debugMessage("LTR Relevant alignment found: ");
                    //debugMessage(fwRelationArray[i]);
                    relevantAlignmentRelationshipsLTR.push(fwRelationArray[i]);
                    relevantAlignmentRelationshipsMap[fwRelationArray[i].shortId()] = fwRelationArray[i];
                }
            }
            else {
                sourceCpd = framework2CompData.competencyPacketDataMap[fwRelationArray[i].source];
                targetCpd = framework1CompData.competencyPacketDataMap[fwRelationArray[i].target];
                if (sourceCpd && targetCpd) {
                    if (!processedAlignmentIds.includes(fwRelationArray[i].shortId())) {
                        processedAlignmentIds.push(fwRelationArray[i].shortId());
                        //debugMessage("RTL Relevant alignment found: ");
                        //debugMessage(fwRelationArray[i]);
                        relevantAlignmentRelationshipsRTL.push(fwRelationArray[i]);
                        relevantAlignmentRelationshipsMap[fwRelationArray[i].shortId()] = fwRelationArray[i];
                    }
                }
            }
        }
    }
}

function buildRelevantAlignmentRelationData() {
    showPageAsBusy("Finding relevant alignment data...");
    currentMergedCgHideLabels = false;
    relevantAlignmentRelationshipsMap = {};
    relevantAlignmentRelationshipsLTR = [];
    relevantAlignmentRelationshipsRTL = [];
    initialAlignmentEquivalentToCadsLTR = [];
    initialAlignmentRelatedToCadsLTR = [];
    initialAlignmentNarrowsCadsLTR = [];
    initialAlignmentDesiresCadsLTR = [];
    initialAlignmentRequiresCadsLTR = [];
    initialAlignmentEquivalentToCadsRTL = [];
    initialAlignmentRelatedToCadsRTL = [];
    initialAlignmentNarrowsCadsRTL = [];
    initialAlignmentDesiresCadsRTL = [];
    initialAlignmentRequiresCadsRTL = [];
    var processedAlignmentIds = [];
    if (!framework1CompData.competencyPacketDataMap || !framework2CompData.competencyPacketDataMap) return false;
    if (framework1Relations && framework1Relations.length > 0) buildRelevantFrameworkAlignmentData(processedAlignmentIds, framework1Relations);
    if (framework2Relations && framework2Relations.length > 0) buildRelevantFrameworkAlignmentData(processedAlignmentIds, framework2Relations);
    buildInitialAlignmentCads();
}

//**************************************************************************************************
// Framework Alignment Setup
//**************************************************************************************************

function handleFetchFramework2RelationDataSuccess(rldArray) {
    debugMessage("Framework 2 relations retrieved:");
    debugMessage(rldArray);
    framework2Relations = parseRemoteLinkedDataArrayIntoRelations(rldArray);
    debugMessage("Framework 2 relations parsed:");
    debugMessage(framework2Relations);
    buildRelevantAlignmentRelationData();
    prepAlignmentFrameworkInitialDisplay();
}

function handleFetchFramework2RelationDataFailure(err) {
    showPageError("Could not retrieve framework relations data (" + framework2Name + "): " + err);
}

function fetchFramework2RelationData() {
    showPageAsBusy("Fetching framework relation data (2/2)...");
    if (!framework2Full.relation || framework2Full.relation.length == 0) {
        debugMessage("Framework 2 has no relations.  Bypassing relation fetch...");
        handleFetchFramework2RelationDataSuccess([]);
    }
    else {
        repo.multiget(framework2Full.relation, handleFetchFramework2RelationDataSuccess, handleFetchFramework2RelationDataFailure, handleFetchFramework2RelationDataSuccess);
    }
}

function handleFetchFramework1RelationDataSuccess(rldArray) {
    debugMessage("Framework 1 relations retrieved:");
    debugMessage(rldArray);
    framework1Relations = parseRemoteLinkedDataArrayIntoRelations(rldArray);
    debugMessage("Framework 1 relations parsed:");
    debugMessage(framework1Relations);
    fetchFramework2RelationData();
}

function handleFetchFramework1RelationDataFailure(err) {
    showPageError("Could not retrieve framework relations data (" + framework1Name + "): " + err);
}

function fetchFramework1RelationData() {
    showPageAsBusy("Fetching framework relation data (1/2)...");
    if (!framework1Full.relation || framework1Full.relation.length == 0) {
        debugMessage("Framework 1 has no relations.  Bypassing relation fetch...");
        handleFetchFramework1RelationDataSuccess([]);
    }
    else {
        repo.multiget(framework1Full.relation, handleFetchFramework1RelationDataSuccess, handleFetchFramework1RelationDataFailure, handleFetchFramework1RelationDataSuccess);
    }
}

function generateFrameworkCompetencyData() {
    showPageAsBusy("Building framework competency data...");
    if (framework1CompData == null) framework1CompData = buildFrameworkCompetencyData(framework1Id,framework1Name,framework1PacketGraph);
    if (framework2CompData == null) framework2CompData = buildFrameworkCompetencyData(framework2Id,framework2Name,framework2PacketGraph);
    framework1D3Node = setUpD3FrameworkNodes(framework1Name, framework1CompData);
    framework2D3Node = setUpD3FrameworkNodes(framework2Name, framework2CompData);
    debugMessage("framework 1 D3 Custom Node:");
    debugMessage(framework1D3Node);
    debugMessage("framework 2 D3 Custom Node:");
    debugMessage(framework2D3Node);
    framework1D3NodeString = buildD3JsonString(framework1D3Node);
    framework2D3NodeString = buildD3JsonString(framework2D3Node);
    fetchFramework1RelationData();
}

function handleCollapseFramework2ForAlignmentSuccess(frameworkId, fnpg) {
    debugMessage("Framework 2 collapsed:" + frameworkId);
    debugMessage(fnpg);
    // if (!frameworkCollapsedCorrectly(fnpg)) {
    //     showPageError("Could not determine framework competencies (" + framework2Name + ").  Check framework permissions.");
    // }
    // else if (doesFrameworkHaveCircularDependency(fnpg)) {
    //     showPageError("Framework (" + framework2Name + ") contains a circular dependency.  Cannot align.");
    // }
    // else {
    framework2PacketGraph = fnpg;
    generateFrameworkCompetencyData();
    // }
}

function handleCollapseFramework2ForAlignmentFailure(err) {
    showPageError("Could not collapse framework (" + framework2Name + "): " + err);
}

function collapseFramework2ForAlignment() {
    showPageAsBusy("Collapsing framework data (2/2)...");
    if (framework2CompData == null) {
        debugMessage("Framework 2 not cached. Collapsing...");
        var fc = new FrameworkCollapser();
        fc.collapseFramework(repo, framework2Full, CREATE_IMPLIED_RELATIONS, handleCollapseFramework2ForAlignmentSuccess, handleCollapseFramework2ForAlignmentFailure);
    }
    else {
        generateFrameworkCompetencyData();
    }
}

function handleCollapseFramework1ForAlignmentSuccess(frameworkId, fnpg) {
    debugMessage("Framework 1 collapsed:" + frameworkId);
    debugMessage(fnpg);
    // if (!frameworkCollapsedCorrectly(fnpg)) {
    //     showPageError("Could not determine framework competencies (" + framework1Name + ").  Check framework permissions.");
    // }
    // else if (doesFrameworkHaveCircularDependency(fnpg)) {
    //     showPageError("Framework (" + framework1Name + ") contains a circular dependency.  Can not align.");
    // }
    // else {
    framework1PacketGraph = fnpg;
    collapseFramework2ForAlignment();
    // }
}

function handleCollapseFramework1ForAlignmentFailure(err) {
    showPageError("Could not collapse framework (" + framework1Name + "): " + err);
}

function collapseFramework1ForAlignment() {
    showPageAsBusy("Collapsing framework data (1/2)...");
    if (framework1CompData == null) {
        debugMessage("Framework 1 not cached. Collapsing...");
        var fc = new FrameworkCollapser();
        fc.collapseFramework(repo, framework1Full, CREATE_IMPLIED_RELATIONS, handleCollapseFramework1ForAlignmentSuccess, handleCollapseFramework1ForAlignmentFailure);
    }
    else {
        collapseFramework2ForAlignment();
    }
}

function handleFetchMissingFramework2DataForAlignmentSuccess(framework) {
    framework2Full = framework;
    collapseFramework1ForAlignment();
}

function handleFetchMissingFramework2DataForAlignmentFailure(err) {
    showPageError("Could not fetch framework (" + framework2Name + "): " + err);
}

function fetchMissingFramework2DataForAlignment() {
    showPageAsBusy("Fetching framework data (2/2)...");
    if (framework2Full == null) {
        debugMessage("Framework 2 not cached. Fetching...");
        EcFramework.get(framework2Id, handleFetchMissingFramework2DataForAlignmentSuccess, handleFetchMissingFramework2DataForAlignmentFailure);
    }
    else {
        collapseFramework1ForAlignment();
    }
}

function handleFetchMissingFramework1DataForAlignmentSuccess(framework) {
    framework1Full = framework;
    fetchMissingFramework2DataForAlignment();
}

function handleFetchMissingFramework1DataForAlignmentFailure(err) {
    showPageError("Could not fetch framework (" + framework1Name + "): " + err);
}

function fetchMissingFramework1DataForAlignment() {
    showPageAsBusy("Fetching framework data (1/2)...");
    if (framework1Full == null) {
        debugMessage("Framework 1 not cached. Fetching...");
        EcFramework.get(framework1Id, handleFetchMissingFramework1DataForAlignmentSuccess, handleFetchMissingFramework1DataForAlignmentFailure);
    }
    else {
        fetchMissingFramework2DataForAlignment();
    }
}

function checkForExistingData() {
    var tempFw1Full = framework1Full;
    var tempFw1Cd = framework1CompData;
    if (framework1Id == framework1Full.shortId()) {
        debugMessage("new framework 1 exists as old framework 1");
    }
    else {
        if (framework1Id == framework2Full.shortId()) {
            debugMessage("new framework 1 exists as old framework 2");
            framework1Full = framework2Full;
            framework1CompData = framework2CompData;
        }
        else {
            debugMessage("new framework 1 needs load");
            framework1Full = null;
            framework1CompData = null;
        }
    }
    if (framework2Id == framework2Full.shortId()) {
        debugMessage("new framework 2 exists as old framework 2");
    }
    else {
        if (framework2Id == tempFw1Full.shortId()) {
            debugMessage("new framework 2 exists as old framework 1");
            framework2Full = tempFw1Full;
            framework2CompData = tempFw1Cd;
        }
        else {
            debugMessage("new framework 2 needs load");
            framework2Full = null;
            framework2CompData = null;
        }
    }
}

function initFrameworkData(forceDataRefresh) {
    if (forceDataRefresh) {
        framework1Full = null;
        framework1CompData = null;
        framework2Full = null;
        framework2CompData = null;
    }
    else checkForExistingData();
}

function buildFrameworkDataForAlignments(fw1Id,fw2Id,forceDataRefresh) {
    debugMessage("building framework data...");
    debugMessage("fw1Id: " + fw1Id);
    debugMessage("fw2Id: " + fw2Id);
    framework1Id = fw1Id;
    framework2Id = fw2Id;
    framework1Name = getFrameworkName(fw1Id);
    framework2Name = getFrameworkName(fw2Id);
    setFrameworkAlignmentNames(framework1Name,framework2Name,framework1Id,framework2Id);
    hideFrameworkAlignmentTools();
    showPageAsBusy("Initializing framework alignment data...");
    currentAlmVisCgView = FWK_ALM_VIS_CG_DIVIDED;
    initFrameworkData(forceDataRefresh);
    fetchMissingFramework1DataForAlignment();
}

//**************************************************************************************************
//Available Framework Fetch
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
    }
}

function handleFetchFrameworksFromRepositorySuccess(arrayOfEcFrameworks) {
    buildFrameworkLists(arrayOfEcFrameworks);
    prepFinishedSuccessCallback();
}

function handleFetchFrameworksFromRepositoryFailure(err) {
    prepFinishedFailureCallback("Could not fetch framework list: " + err);
}

function fetchAvailableFrameworks() {
    disableViewToggleButtons();
    hideFrameworkAlignmentTools();
    showVisualViewMainContentsScreen();
    setFrameworkAlignmentNames("Loading...","Loading...",null,null);
    showPageAsBusy("Loading available frameworks...");
    EcFramework.search(repo, null, handleFetchFrameworksFromRepositorySuccess, handleFetchFrameworksFromRepositoryFailure, {'size':MAX_FWK_SEARCH_SIZE});
}

function initAvailableFrameworks(success,failure) {
    prepFinishedSuccessCallback = success;
    prepFinishedFailureCallback = failure;
    fetchAvailableFrameworks();
}

//**************************************************************************************************
// Page Load
//**************************************************************************************************

setPageColorTheme();
