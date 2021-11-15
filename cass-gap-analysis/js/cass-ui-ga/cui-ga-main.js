//**************************************************************************************************
// CASS UI Gap Analysis Main Functions
//**************************************************************************************************

//TODO openAdjustGapRulesModal
//TODO checkForGapContentsSearchbarEnter

//TODO multi-node competency clusters....
//TODO addChildToGapSummaryCompList construct list view for multi node competency cluster
//TODO getNumberOfProfilesWithAssertedCompetencyAndParents adjust for multi-node clusters
//TODO getProfilesWithAssertedCompetencyAndParents adjust for multi-node clusters
//TODO getAssertionsForD3NodeInclusive fix for multi node clusters
//TODO getNumberOfCompetencyDescendants adjust for multi-node clusters
//TODO getNumberOfCompetencyDescendants adjust for multi-node clusters

//TODO Handle Same Competency IDs across multiple frameworks

//**************************************************************************************************
// Constants

const CREATE_IMPLIED_RELATIONS_ON_COLLAPSE = true;

const MAX_FWK_SEARCH_SIZE = 10000;
const MAX_ASSR_SEARCH_SIZE = 10000;

const IND_PRF_TYPE = "individuals";
const GRP_PRF_TYPE = "groups";

const TITLE_FWK_FLTR_TYPE = "title";
const DESC_FWK_FLTR_TYPE = "desc";

const INIT_MODE = "init";
const ADD_MODE = "add";

const NA_SEL = "na";

const FWK_REP_TYPE = "fwrt";
const COMP_REP_TYPE = "crt";

const NEW_GRP_ID = "-1";


//**************************************************************************************************
// Variables

var hasFinishedLoading = false;

var currentAddMode = INIT_MODE;
var selectedProfileType;
var selectedProfiles = [];
var selectedGroups = [];
var selectedFrameworks = [];
var selectedFrameworksMap = {};

var haveSelectedFrameworksBeenProcessed = false;
var haveSelectedProfilesBeenProcessed = false;

var availableFrameworkList = [];
var frameworkIdFrameworkMap = {};
var frameworkNameFrameworkMap = {};

var assertionList = [];
var ecAssertionSearchReturnList;
var assertionEnvelopeEcAssertionList;
var assertionEnvelopeList;

var assertionMap;
var assertionNegativeMap;
var profileAssertionsMap;
var competencyAssertionMap;

var selectedFrameworksCompetencyData;
var selectedFrameworksNodePacketGraphMap;
var gapDisplayHelperData;
var gapD3NodeString;

var frameworksToCollapse;
var frameworksCollapsed;
var collapseErrorTriggered;

var sourceNameMap = {};

var editGroupFromWhere;
var currentEditGroupMembers;

//**************************************************************************************************
// Utility Functions
//**************************************************************************************************

function initializeSelectedDataPoints() {
    selectedProfiles = [];
    selectedGroups = [];
    selectedFrameworks = [];
    selectedFrameworksMap = {};
    haveSelectedFrameworksBeenProcessed = false;
    haveSelectedProfilesBeenProcessed = false;
}

function getFrameworkName(frameworkId) {
    var fw = frameworkIdFrameworkMap[frameworkId];
    if (fw) return getStringVal(fw.getName());
    else return "Framework not found";
}

function getFrameworkDescription(frameworkId) {
    var fw = frameworkIdFrameworkMap[frameworkId];
    if (fw) return getStringVal(fw.getDescription());
    else return "Framework not found";
}

function isFrameworkId(id) {
    var x = selectedFrameworksMap[id];
    if (x) return true;
    else return false;
}

function getCompetencyOrFrameworkName(id) {
    if (isFrameworkId(id)) return getFrameworkName(id);
    if (selectedFrameworksCompetencyData.competencyPacketDataMap[id]) {
        return selectedFrameworksCompetencyData.competencyPacketDataMap[id].name;
    }
    else return "";
}

function getCassNodePacket(packetId) {
    if (selectedFrameworksCompetencyData && selectedFrameworksCompetencyData.competencyPacketDataMap &&
        selectedFrameworksCompetencyData.competencyPacketDataMap[packetId]) {
        return selectedFrameworksCompetencyData.competencyPacketDataMap[packetId].cassNodePacket;
    }
    else return null;
}

function getCompetencyD3NodeTracker(trackerId) {
    if (selectedFrameworksCompetencyData && selectedFrameworksCompetencyData.competencyD3NodeTrackerMap &&
        selectedFrameworksCompetencyData.competencyD3NodeTrackerMap[trackerId]) {
        return selectedFrameworksCompetencyData.competencyD3NodeTrackerMap[trackerId];
    }
    else return null;
}

function countTotalNumberOfCompetenciesWithoutCoverage() {
    var total = 0;
    for (var fwId in gapDisplayHelperData.frameworkHelperMap) {
        if (gapDisplayHelperData.frameworkHelperMap.hasOwnProperty(fwId)) {
            total += countNumberOfCpdChildrenWithoutCoverage(gapDisplayHelperData.frameworkHelperMap[fwId].children);
        }
    }
    return total;
}

function getAssertionsForCompetency(compId) {
    if (competencyAssertionMap && competencyAssertionMap.hasOwnProperty(compId) && competencyAssertionMap[compId]) return competencyAssertionMap[compId];
    else return [];
}

//TODO getAssertionsForD3NodeInclusive fix for multi node clusters
function getAssertionsForD3NodeInclusive(d3Node) {
    var d3nt = selectedFrameworksCompetencyData.competencyD3NodeTrackerMap[d3Node.data.name.trim()];
    var asArray = getAssertionsForCompetency(d3nt.id);
    if (!d3nt.d3Node || !d3nt.d3Node.parent || d3nt.d3Node.parent == null) return asArray;
    else return asArray.concat(getAssertionsForD3NodeInclusive(d3nt.d3Node.parent));
}

function getAssertionsForCompetencyPacketDataInclusive(cpd) {
    var asArray = getAssertionsForCompetency(cpd.id);
    var d3nt = selectedFrameworksCompetencyData.competencyD3NodeTrackerMap[cpd.id];
    if (!d3nt || !d3nt.d3Node || !d3nt.d3Node.parent || d3nt.d3Node.parent == null) return asArray;
    else return asArray.concat(getAssertionsForD3NodeInclusive(d3nt.d3Node.parent));
}

function getUniqueProfilesForAssertions(asArray) {
    var upo = {};
    for (var i=0;i<asArray.length;i++) {
        var sp = asArray[i].getSubject().toPem();
        if (selectedProfiles.includes(sp)) {
            if (!upo[sp]) upo[sp] = [];
            upo[sp].push(asArray[i]);
        }
    }
    return upo;
}

//TODO getProfilesWithAssertedCompetencyAndParents adjust for multi-node clusters
function getProfilesWithAssertedCompetencyAndParents(compId) {
    var cpd = selectedFrameworksCompetencyData.competencyPacketDataMap[compId];
    if (!cpd) return [];
    else {
        var asArray =  getAssertionsForCompetencyPacketDataInclusive(cpd);
        if (!asArray || asArray.length == 0) return [];
        else return getUniqueProfilesForAssertions(asArray);
    }
}

//TODO getNumberOfProfilesWithAssertedCompetencyAndParents adjust for multi-node clusters
function getNumberOfProfilesWithAssertedCompetencyAndParents(compId) {
    var cpo = getProfilesWithAssertedCompetencyAndParents(compId);
    if (cpo) return Object.keys(cpo).length;
    else return 0;
}

function doAnyCpdParentsHaveCoverage(cpdArray) {
    if (!cpdArray || cpdArray.length == 0) return false;
    var hasCoverage = false;
    for (var i=0;i<cpdArray.length;i++) {
        var cpd = cpdArray[i];
        if (cpd.hasAssertion) {
            hasCoverage = true;
            break;
        }
        else hasCoverage = doAnyCpdParentsHaveCoverage(cpd.parents);
    }
    return hasCoverage;
}

function getCpdChildrenWithoutCoverage(cpdArray) {
    var cpdsWoCoverage = [];
    for (var i=0;i<cpdArray.length;i++) {
        var cpd = cpdArray[i];
        if (!cpd.hasAssertion) {
            cpdsWoCoverage.push(cpd);
            cpdsWoCoverage = cpdsWoCoverage.concat(getCpdChildrenWithoutCoverage(cpd.children));
        }
    }
    return cpdsWoCoverage;
}

function countNumberOfCpdChildrenWithoutCoverage(cpdArray) {
    var numCompsWoCoverage = 0;
    for (var i=0;i<cpdArray.length;i++) {
        var cpd = cpdArray[i];
        if (!cpd.hasAssertion) {
            numCompsWoCoverage++;
            numCompsWoCoverage += countNumberOfCpdChildrenWithoutCoverage(cpd.children);
        }
    }
    return numCompsWoCoverage;
}

function countNumberOfCompetenciesWithoutCoverage(compId) {
    var numCompsWoCoverage = 0;
    var cpd = selectedFrameworksCompetencyData.competencyPacketDataMap[compId];
    if (cpd.hasAssertion) return 0;
    else {
        numCompsWoCoverage++;
        numCompsWoCoverage += countNumberOfCpdChildrenWithoutCoverage(cpd.children);
    }
    return numCompsWoCoverage;
}

function countNumberOfCpdDescendants(cpdArray) {
    var numDesc = cpdArray.length;
    for (var i=0;i<cpdArray.length;i++) {
        var cpd = cpdArray[i];
        numDesc += countNumberOfCpdDescendants(cpd.children);
    }
    return numDesc;
}

//TODO getNumberOfCompetencyDescendants adjust for multi-node clusters
function getNumberOfCompetencyDescendants(compId) {
    var cpd = selectedFrameworksCompetencyData.competencyPacketDataMap[compId];
    if (cpd) return countNumberOfCpdDescendants(cpd.children);
    return 0;
}

function checkForGapContentsSearchbarEnter(event) {
    if (event.which == 13 || event.keyCode == 13) {
        $(GAP_CONT_SRCH_INPT).autocomplete("close");
        findItemByGapContentsSearchBar($(GAP_CONT_SRCH_INPT).val().trim());
    }
}

function openProfileExplorer(profilePem) {
    sendInitProfileExplorerMessage(profilePem);
}

function registerAssertionSourceName(as) {
    var sPkPem = as.getAgent().toPem();
    if (!sourceNameMap[sPkPem]) {
        sourceNameMap[sPkPem] = as.getAgentName();
    }
}

function getAssertionSourceName(as) {
    var sPkPem = as.getAgent().toPem();
    if (sourceNameMap.hasOwnProperty(sPkPem)) {
        return sourceNameMap[sPkPem];
    }
    else return as.getAgentName();
}

//**************************************************************************************************
// Adjust Gap Rules Modal
//**************************************************************************************************

function openAdjustGapRulesModal() {
    //TODO openAdjustGapRulesModal
}

//**************************************************************************************************
// Edit Group Modal
//**************************************************************************************************

function cancelEditGroups() {
    $(GRP_EDIT_MODAL).foundation('close');
    if (editGroupFromWhere == "profSelModal") openAddProfileModal();
}

function isValidEditGroupInput() {
    var isValid = true;
    var gName = $(GRP_EDIT_GRP_NAME).val();
    var errMsg = [];
    if (!gName || gName.trim() == "") {
        showModalInputAsInvalid(GRP_EDIT_GRP_NAME);
        errMsg.push("Group Name is required");
        isValid = false;
    }
    if (!currentEditGroupMembers || currentEditGroupMembers.length == 0) {
        $(GRP_EDIT_MBR_LIST_CTR).addClass("invalid");
        errMsg.push("Groups must have at least one member");
        isValid = false;
    }
    if (!isValid) showModalError(GRP_EDIT_MODAL,generateBreakHtmlFromArray(errMsg));
    return isValid;
}

function generateNewGroup() {
    var grp = new EcOrganization();
    grp.generateId(repo.selectedServer);
    grp.addOwner(loggedInPk);
    return grp;
}

function saveGroupToServerSuccess(grp,isNew) {
    if (isNew) addDataForGroup(grp);
    profileGroupList.sort(function(a, b) {return a.name.localeCompare(b.name);})
    enableModalInputsAndButtons();
    hideModalBusy(GRP_EDIT_MODAL);
    buildAndShowGroupSelectionList();
}

function saveGroupToServerFailure(errMsg) {
    enableModalInputsAndButtons();
    hideModalBusy(GRP_EDIT_MODAL);
    showModalError(GRP_EDIT_MODAL,"Unable to save group: " + errMsg);
}

function saveGroupToServer(grp,isNew) {
    EcRepository.save(grp,
        function(msg) {
            saveGroupToServerSuccess(grp,isNew);
        },
        saveGroupToServerFailure
    );
}

function syncEditGroupMembers(grp) {
    grp.employee = [];
    for (var i=0;i<currentEditGroupMembers.length;i++) {
        grp.addEmployee(viewableProfileByPersonIdMap[currentEditGroupMembers[i]].person);
    }
}

function saveGroupDetails() {
    hideModalError(GRP_EDIT_MODAL);
    $(GRP_EDIT_MBR_LIST_CTR).removeClass("invalid");
    if (isValidEditGroupInput()) {
        disableModalInputsAndButtons();
        showModalBusy(GRP_EDIT_MODAL,"Saving Group");
        var grp;
        var groupId = $(GRP_EDIT_GRP_ID).val();
        var isNew = (groupId == NEW_GRP_ID);
        if  (isNew) grp = generateNewGroup();
        else grp = profileGroupMap[groupId];
        grp.setName($(GRP_EDIT_GRP_NAME).val());
        syncEditGroupMembers(grp);
        saveGroupToServer(grp,isNew);
    }
}

function cancelGroupDetails() {
    buildAndShowGroupSelectionList();
}

function addNewGroupFromEdit() {
    currentEditGroupMembers = [];
    $(GRP_EDIT_GRP_ID).val(NEW_GRP_ID);
    $(GRP_EDIT_GRP_NAME).val("");
    populateGroupMemberListForEdit();
    populateGroupAvailableMemberListForEdit();
    $(GRP_EDIT_SELECT).hide();
    $(GRP_EDIT_DTLS).show();
}

function addMemberToGroupForEdit(personId) {
    currentEditGroupMembers.push(personId);
    populateGroupMemberListForEdit();
    populateGroupAvailableMemberListForEdit();
}

function removeMemberFromGroupForEdit(personId) {
    var index = currentEditGroupMembers.indexOf(personId);
    if (index !== -1) currentEditGroupMembers.splice(index, 1);
    populateGroupMemberListForEdit();
    populateGroupAvailableMemberListForEdit();
}

function addPersonToMemberList(po,alreadyMember) {
    var mLi = $("<li/>");
    var mLiDiv = $("<div/>");
    mLiDiv.addClass("grid-x");
    var mToolsDiv = $("<div/>");
    mToolsDiv.addClass("cell medium-1");
    if (alreadyMember) {
        mToolsDiv.attr("title","Remove member from group");
        mToolsDiv.html("<a onclick=\"removeMemberFromGroupForEdit('" + po.personId + "')\"><i class=\"fa fa-minus-circle removeGrpMemberBtn\" aria-hidden=\"true\"></i></a>");
    }
    else {
        mToolsDiv.attr("title","Add person to group");
        mToolsDiv.html("<a onclick=\"addMemberToGroupForEdit('" + po.personId + "')\"><i class=\"fa fa-plus-circle addGrpMemberBtn\" aria-hidden=\"true\"></i></a>");
    }
    var mNameDiv = $("<div/>");
    mNameDiv.addClass("cell medium-11");
    mNameDiv.html(po.displayName);
    mLiDiv.append(mToolsDiv);
    mLiDiv.append(mNameDiv);
    mLi.append(mLiDiv);
    if (alreadyMember) $(GRP_EDIT_MBR_LIST).append(mLi);
    else $(GRP_EDIT_AVL_MBR_LIST).append(mLi);
}

function populateGroupMemberListForEdit() {
    $(GRP_EDIT_MBR_LIST).empty();
    for (var i=0;i<currentEditGroupMembers.length;i++) {
        var po = viewableProfileByPersonIdMap[currentEditGroupMembers[i]];
        if (po) addPersonToMemberList(po,true);
    }
}

function populateGroupAvailableMemberListForEdit() {
    $(GRP_EDIT_AVL_MBR_LIST).empty();
    for (var i=0;i<viewableProfileList.length;i++) {
        var po = viewableProfileList[i];
        if (!currentEditGroupMembers.includes(po.personId)) addPersonToMemberList(po,false);
    }
}

function showGroupDetailsEdit(groupId) {
    var pg = profileGroupMap[groupId];
    if (pg) {
        if (pg.employee) currentEditGroupMembers = pg.employee.slice(0);
        else currentEditGroupMembers = [];
        $(GRP_EDIT_GRP_ID).val(groupId);
        $(GRP_EDIT_GRP_NAME).val(pg.getName());
        populateGroupMemberListForEdit();
        populateGroupAvailableMemberListForEdit();
        $(GRP_EDIT_SELECT).hide();
        $(GRP_EDIT_DTLS).show();
    }
}

function buildGroupSelectionList() {
    for (var i=0;i<profileGroupList.length;i++) {
        var pg = profileGroupList[i];
        var gLi = $("<li/>");
        var gLiDiv = $("<div/>");
        gLiDiv.addClass("grid-x");
        if (pg.employee && pg.employee.length > 0) gLiDiv.attr("title",pg.employee.length + " current member(s)");
        else gLiDiv.attr("title","No current members");
        var gToolsDiv = $("<div/>");
        gToolsDiv.addClass("cell medium-1");
        gToolsDiv.attr("title","Edit Group");
        gToolsDiv.html("<a onclick=\"showGroupDetailsEdit('" + pg.shortId() + "')\"><i class=\"fa fa-book\" aria-hidden=\"true\"></i></a>");
        var gNameDiv = $("<div/>");
        gNameDiv.addClass("cell medium-11");
        gNameDiv.html(pg.getName());
        gLiDiv.append(gToolsDiv);
        gLiDiv.append(gNameDiv);
        gLi.append(gLiDiv);
        $(GRP_EDIT_SELECT_LIST).append(gLi);
    }
}

function buildAndShowGroupSelectionList() {
    $(GRP_EDIT_SELECT_LIST).empty();
    if (!profileGroupList || profileGroupList.length == 0) {
        var noGroupsHtml = "<div class=\"callout primary\"><i class=\"fa fa-exclamation-triangle\"></i>  There are no groups available</div>";
        $("<li>").html(noGroupsHtml).appendTo(GRP_EDIT_SELECT_LIST);
    }
    else buildGroupSelectionList();
    $(GRP_EDIT_DTLS).hide();
    $(GRP_EDIT_SELECT).show();
}

function openEditGroupModal(fromWhere) {
    editGroupFromWhere = fromWhere;
    hideModalError(GRP_EDIT_MODAL);
    hideModalBusy(GRP_EDIT_MODAL);
    enableModalInputsAndButtons();
    buildAndShowGroupSelectionList();
    $(GRP_EDIT_MODAL).foundation('open');
}

//**************************************************************************************************
// Add Framework Modal
//**************************************************************************************************

//Right now this only handles a single framework...may need to account for multiple frameworks at some point
function parseSelectedFramework(selectedFwks) {
    selectedFrameworks = [];
    selectedFrameworksMap = {};
    for (var i=0;i<availableFrameworkList.length;i++) {
        var f = availableFrameworkList[i];
        if (selectedFwks.includes(buildIDableString(f.shortId()))) {
            selectedFrameworksMap[f.shortId()] = f;
            selectedFrameworks.push(f);
        }
    }
    selectedFrameworks.sort(function(a, b) {return getStringVal(a.getName()).localeCompare(getStringVal(b.getName()));});
}

function addSelectedFrameworks() {
    hideModalError(ADD_FWK_MODAL);
    var selectedFwks = $(ADD_FWK_RES_SELECT).val();
    if (!selectedFwks || selectedFwks.length == 0) showModalError(ADD_FWK_MODAL,"You must select at least one framework");
    else {
        parseSelectedFramework(selectedFwks);
        haveSelectedFrameworksBeenProcessed = false;
        currentAddMode = ADD_MODE;
        $(ADD_FWK_MODAL).foundation('close');
        buildGapAnalysisData();
    }
}

function filterAddFwkResults() {
    var fwkFltType = $(ADD_FWK_FLTR_TYPE_SELECT).val();
    var filter = $(ADD_FWK_RES_FLTR).val();
    if (!filter || filter.trim().length == 0) {
        //TODO remove filter
        setAddFwkResultsDesc("All Frameworks");
    }
    else {
        //TODO Filter Results
        if (fwkFltType == TITLE_FWK_FLTR_TYPE) {
            setAddFwkResultsDesc("Frameworks with titles containing '" + filter + "'");
        }
        else if (fwkFltType == DESC_FWK_FLTR_TYPE) {
            setAddFwkResultsDesc("Frameworks with descriptions containing '" + filter + "'");
        }
    }
    //TODO filter results
}

function changeAddFwkFilterType() {
    var fwkFltType = $(ADD_FWK_FLTR_TYPE_SELECT).val();
    var filter = $(ADD_FWK_RES_FLTR).val();
    //TODO filter results
}

function fillInAddFwkResults() {
    $(ADD_FWK_RES_SELECT).empty();
    $(ADD_FWK_RES_FLTR).val("");
    setAddFwkResultsDesc("All Frameworks");
    for (var i=0;i<availableFrameworkList.length;i++) {
        var f = availableFrameworkList[i];
        $('<option>').val(buildIDableString(f.shortId())).text(getStringVal(f.getName())).appendTo(ADD_FWK_RES_SELECT);
    }
}

function openAddFrameworkModal() {
    hideModalError(ADD_FWK_MODAL);
    hideModalBusy(ADD_FWK_MODAL);
    enableModalInputsAndButtons();
    $(ADD_FWK_FLTR_TYPE_SELECT).val(TITLE_FWK_FLTR_TYPE);
    fillInAddFwkResults();
    $(ADD_FWK_MODAL).foundation('open');
}

//**************************************************************************************************
// Add Profile Modal
//**************************************************************************************************
function buildSelectedGroupMemberInfo(pkPem, selectedProfileObject,selectedGroupObject) {
    selectedProfileObject[pkPem] = pkPem;
    var gmo = {};
    gmo.name = viewableProfileByPkPemMap[pkPem].displayName;
    gmo.pkPem = pkPem;
    selectedGroupObject.employee.push(gmo);
}

function parseSelectedGroupProfiles(selectedProfs) {
    var spo = {};
    for (var i=0;i<selectedProfs.length;i++) {
        var pg = profileGroupMapByIDableString[selectedProfs[i]];
        if (pg && pg.employee && pg.employee.constructor === Array) {
            var go = {};
            go.name = pg.name;
            go.idable = selectedProfs[i];
            go.employee = [];
            for (var j=0;j<pg.employee.length;j++) {
                if (viewableProfileByPersonIdMap[pg.employee[j]]) {
                    buildSelectedGroupMemberInfo(viewableProfileByPersonIdMap[pg.employee[j]].pkPem,spo,go);
                }
            }
            if (go.employee.length > 0) {
                go.employee.sort(function(a, b) {return a.name.localeCompare(b.name);});
                selectedGroups.push(go);
            }
        }
    }
    selectedGroups.sort(function(a, b) {return a.name.localeCompare(b.name);});
    selectedProfiles = Object.keys(spo);
}

function parseSelectedIndividualProfiles(selectedProfs) {
    for (var i=0;i<viewableProfileList.length;i++) {
        var p = viewableProfileList[i];
        if (selectedProfs.includes(buildIDableString(p.pkPem))) selectedProfiles.push(p.pkPem);
    }
}

function parseSelectedProfiles(selectedProfs) {
    selectedProfiles = [];
    selectedGroups = [];
    selectedProfileType = $(ADD_PRF_TYPE_SELECT).val();
    if (selectedProfileType == IND_PRF_TYPE) parseSelectedIndividualProfiles(selectedProfs);
    else if (selectedProfileType == GRP_PRF_TYPE) parseSelectedGroupProfiles(selectedProfs);
}

function filterNasFromProfileSelection(profSel) {
    var fps = [];
    if (profSel) {
        for (var i=0;i<profSel.length;i++) {
            if (profSel != NA_SEL) fps.push(profSel[i]);
        }
    }
    return fps;
}

function addSelectedProfiles() {
    hideModalError(ADD_PRF_MODAL);
    var selectedProfs = filterNasFromProfileSelection($(ADD_PRF_RES_SELECT).val());
    if (!selectedProfs || selectedProfs.length == 0) showModalError(ADD_PRF_MODAL,"You must select at least one profile");
    else {
        parseSelectedProfiles(selectedProfs);
        if (!selectedProfiles || selectedProfiles.length == 0) showModalError(ADD_PRF_MODAL,"You must select at least one profile");
        else {
            haveSelectedProfilesBeenProcessed = false;
            if (currentAddMode == INIT_MODE) openAddFrameworkModal();
            else {
                $(ADD_PRF_MODAL).foundation('close');
                buildGapAnalysisData();
            }
        }
    }
}

function filterAddProfResults() {
    var profType = $(ADD_PRF_TYPE_SELECT).val();
    var filter = $(ADD_PRF_RES_FLTR).val();
    if (!filter || filter.trim().length == 0) {
        //TODO remove filter
        if (profType == IND_PRF_TYPE) {
            setAddProfResultsDesc("All Individuals");
        }
        else if (profType == GRP_PRF_TYPE) {
            setAddProfResultsDesc("All Groups");
        }
    }
    else {
        //TODO Filter Results
        if (profType == IND_PRF_TYPE) {
            setAddProfResultsDesc("Individuals with names containing '" + filter + "'");
        }
        else if (profType == GRP_PRF_TYPE) {
            setAddProfResultsDesc("Groups with names containing '" + filter + "'");
        }
    }
}

function fillInAddProfIndividualsResults() {
    if (viewableProfileList && viewableProfileList.length > 0) {
        for (var i = 0; i < viewableProfileList.length; i++) {
            var p = viewableProfileList[i];
            $('<option>').val(buildIDableString(p.pkPem)).text(p.displayName).appendTo(ADD_PRF_RES_SELECT);
        }
    }
    else $('<option>').val(NA_SEL).text("There are no individuals available").appendTo(ADD_PRF_RES_SELECT);
}

function fillInAddProfGroupResults() {
    if (profileGroupList && profileGroupList.length > 0) {
        for (var i=0;i<profileGroupList.length;i++) {
            var pg = profileGroupList[i];
            $('<option>').val(buildIDableString(pg.shortId())).text(pg.name).appendTo(ADD_PRF_RES_SELECT);
        }
    }
    else $('<option>').val(NA_SEL).text("There are no groups available").appendTo(ADD_PRF_RES_SELECT);
}

function fillInAddProfResults(profType) {
    $(ADD_PRF_RES_SELECT).empty();
    $(ADD_PRF_RES_FLTR).val("");
    if (profType == IND_PRF_TYPE) {
        setAddProfResultsDesc("All Individuals");
        fillInAddProfIndividualsResults();
    }
    else if (profType == GRP_PRF_TYPE) {
        setAddProfResultsDesc("All Groups");
        fillInAddProfGroupResults();
    }
    else {
        $('<option>').val(NA_SEL).text("Unknown Profile Type").appendTo(ADD_PRF_RES_SELECT);
    }
}

function changeAddProfType() {
    var profType = $(ADD_PRF_TYPE_SELECT).val();
    if (profType) fillInAddProfResults(profType);
}

function openAddProfileModal() {
    hideModalError(ADD_PRF_MODAL);
    hideModalBusy(ADD_PRF_MODAL);
    enableModalInputsAndButtons();
    if (currentAddMode == INIT_MODE) initializeSelectedDataPoints();
    $(ADD_PRF_TYPE_SELECT).val(IND_PRF_TYPE);
    fillInAddProfResults(IND_PRF_TYPE);
    $(ADD_PRF_MODAL).foundation('open');
}

//**************************************************************************************************
// Gap Analysis Report Modal
//**************************************************************************************************

function findProfilesWithCompReport(cpdId) {
    alert("Todo: Find people with competency report: " + cpdId);
}

function setGapRepOutputSpecial(msg) {
    $(GAP_REP_LIST).empty();
    var smLi = $("<li/>");
    smLi.addClass("gapReportOutputSpecial");
    smLi.html(msg);
    $(GAP_REP_LIST).append(smLi);
}

function buildAreaGapCpdArray(type,rd) {
    var noCov = [];
    var processChildren = true;
    if (type == COMP_REP_TYPE) {
        if (!rd.hasAssertion && !doAnyCpdParentsHaveCoverage(rd.parents)) noCov.push(rd);
        else processChildren = false;
    }
    if (rd.children && rd.children.length > 0 && processChildren) {
        var noCovChildren = getCpdChildrenWithoutCoverage(rd.children);
        noCovChildren.sort(function(a, b) {return a.name.localeCompare(b.name);});
        noCov = noCov.concat(noCovChildren);
    }
    return noCov;
}

function getRootDataForGapReport(type,itemId) {
    var rd;
    if (type == FWK_REP_TYPE) rd = gapDisplayHelperData.frameworkHelperMap[itemId];
    else rd = selectedFrameworksCompetencyData.competencyPacketDataMap[itemId];
    return rd;
}

function buildGapReportHeader(type,rd,numNotCovered) {
    var numberRepresented = countNumberOfCpdDescendants(rd.children);
    if (type != FWK_REP_TYPE) numberRepresented++;
    var numCovered = numberRepresented - numNotCovered;
    $(GAP_REP_DESC).html(rd.name);
    if (numberRepresented > 0) {
        $(GAP_REP_COV_SUM).html(numCovered + " of " + numberRepresented + " (" + generatePercentFromNumber(numCovered/numberRepresented) + ") Covered");
    }
    else $(GAP_REP_COV_SUM).html("");
}

function addNonCoveredCpdToReportList(cpd) {
    var ncLi = $("<li/>");
    ncLi.addClass("gapReportAreaGapLineItem");
    var ncDiv = $("<div/>");
    ncDiv.addClass("grid-x");
    var ncNameDiv = $("<div/>");
    ncNameDiv.attr("title",cpd.description);
    ncNameDiv.addClass("cell medium-10 boldText");
    ncNameDiv.html(cpd.name);
    var ncDescDiv = $("<div/>");
    ncDescDiv.addClass("cell medium-6");
    ncDescDiv.html(cpd.description);
    var ncToolsDiv = $("<div/>");
    ncToolsDiv.addClass("cell medium-1 text-center");
    ncToolsDiv.html("<a title=\"Find profiles that cover this area\" " +
        "onclick=\"findProfilesWithCompReport('" + cpd.id + "')\"><i class=\"fa fa-users\" aria-hidden=\"true\"></i></a>");
    ncDiv.append(ncNameDiv);
    //ncDiv.append(ncDescDiv);
    ncDiv.append(ncToolsDiv);
    ncLi.append(ncDiv);
    $(GAP_REP_LIST).append(ncLi);
}

function buildAreaGapReport(type,itemId) {
    $(GAP_REP_LIST).empty();
    var rd = getRootDataForGapReport(type,itemId);
    var noCov = buildAreaGapCpdArray(type,rd);
    buildGapReportHeader(type,rd,noCov.length);
    if (noCov.length == 0) setGapRepOutputSpecial("All areas in this category are covered by the selected profiles.");
    else {
        for (var i=0;i<noCov.length;i++) {
            addNonCoveredCpdToReportList(noCov[i]);
        }
    }
}

function openGapAnalysisReportModal(type,itemId) {
    hideModalError(GAP_REP_MODAL);
    hideModalBusy(GAP_REP_MODAL);
    enableModalInputsAndButtons();
    buildAreaGapReport(type,itemId);
    $(GAP_REP_MODAL).foundation('open');
}

//**************************************************************************************************
// Gap Circle Graph Supporting Functions
//**************************************************************************************************
function getGapCgCircleText(d) {
    if (!d || !d.data || !d.data.name) return "UNDEFINED 'D'";
    else if (selectedFrameworksCompetencyData.competencyD3NodeTrackerMap[d.data.name]) {
        var text = getCompetencyOrFrameworkName(d.data.name);
        if (text == "") text = "UNDEFINED NODE PACKET";
        return text;
    }
    return "UNDEFINED NAME";
}

//**************************************************************************************************
// Graph View Sidebar (Right-Hand Side)
//**************************************************************************************************

function buildSidebarDetailsProfileDisplayNameList(profObj) {
    var dna = [];
    for (var pem in profObj) {
        if (profObj.hasOwnProperty(pem)) {
            var po = {};
            po.name = viewableProfileByPkPemMap[pem].displayName;
            po.pem = pem;
            po.asrs = profObj[pem];
            dna.push(po);
        }
    }
    dna.sort(function(a, b) {return a.name.localeCompare(b.name);});
    return dna;
}

function buildSidebarDetailsProfileAssertionList(asrList) {
    var aul = $("<ul/>");
    for (var i=0;i<asrList.length;i++) {
        var ali = $("<li/>");
        ali.addClass("circleFocusDetailAssertion");
        var aliHtml = "<i class=\"fa fa-circle\" aria-hidden=\"true\"></i> holds <strong>" +
            getCompetencyOrFrameworkName(asrList[i].competency) + "</strong> from <i>" + getAssertionSourceName(asrList[i]) + "</i>";
        ali.html(aliHtml);
        aul.append(ali);
    }
    return aul;
}

function buildSidebarDetailsProfileList(cpd) {
    var profs = getProfilesWithAssertedCompetencyAndParents(cpd.id);
    if (!profs || profs.length == 0) $(CIR_FCS_DTL_PROF_LIST_CTR).hide();
    else {
        $(CIR_FCS_DTL_PROF_LIST).empty();
        var dna = buildSidebarDetailsProfileDisplayNameList(profs);
        for (var i=0;i<dna.length;i++) {
            var pli = $("<li/>");
            pli.html("<a onclick=\"openProfileExplorer('" + escapeSingleQuote(dna[i].pem) + "')\"><i class=\"fa fa-user\"></i> " + dna[i].name + "</a>");
            pli.append(buildSidebarDetailsProfileAssertionList(dna[i].asrs));
            $(CIR_FCS_DTL_PROF_LIST).append(pli);
        }
        $(CIR_FCS_DTL_PROF_LIST_CTR).show();
    }
}

function showGapGraphSidebarFrameworkNodeDetails(frameworkId) {
    $(CIR_FCS_DTL_SING_NAME).html(getFrameworkName(frameworkId));
    $(CIR_FCS_DTL_SING_DESC).html(getFrameworkDescription(frameworkId));
    $(CIR_FCS_DTL_PROF_LIST_CTR).hide();
    //$(CIR_FCS_DTL_COMP_DTL_LINK).hide();
    $(CIR_FCS_GAP_REP_LINK).off("click").click(function () {
        openGapAnalysisReportModal(FWK_REP_TYPE,frameworkId);
    });
    showCircleSidebarDetails();
    scrollFrameworkGapSummary(frameworkId);
}

function showGapGraphSidebarMultiNodePacketDetails(cpd) {
    alert("TODO: Build details for multi competency node package");
}

function showGapGraphSidebarSingleNodePacketDetails(cpd) {
    $(CIR_FCS_DTL_SING_NAME).html(cpd.name);
    $(CIR_FCS_DTL_SING_DESC).html(cpd.description);
    buildSidebarDetailsProfileList(cpd);
    //$(CIR_FCS_DTL_COMP_DTL_LINK).show();
    //TODO enable the details button
    $(CIR_FCS_GAP_REP_LINK).off("click").click(function () {
        openGapAnalysisReportModal(COMP_REP_TYPE,cpd.id);
    });
    showCircleSidebarDetails();
    var compNode = cpd.cassNodePacket.getNodeList()[0];
    scrollCompNodeInGapSummary(compNode);
}

//TODO showCircleGraphSidebarDetails handle multi node packets
function showCircleGraphSidebarDetails(compId) {
    hideCircleSidebarDetails();
    removeAllGapSummaryHighLighting();
    if (!compId || compId == null || compId == GAP_NODE_ROOT_NAME) {
        return;
    }
    else if (isFrameworkId(compId)) showGapGraphSidebarFrameworkNodeDetails(compId);
    else {
        var cpd = selectedFrameworksCompetencyData.competencyPacketDataMap[compId];
        if (!cpd || cpd == null) debugMessage("Cannot locate competency data for: " + compId);
        else {
            if (!cpd.cassNodePacket || cpd.cassNodePacket == null) debugMessage("cpt.cassNodePacket is null: " + compId);
            else if (!cpd.cassNodePacket.getNodeList() || cpd.cassNodePacket.getNodeList() == null) debugMessage("cpt.cassNodePacket.getNodePacketList() is null: " + compId);
            else if (cpd.cassNodePacket.getNodeList().length == 1) showGapGraphSidebarSingleNodePacketDetails(cpd);
            else showGapGraphSidebarMultiNodePacketDetails(cpd);
        }
    }
}

//**************************************************************************************************
// Graph View Summary (Left-Hand Side)
//**************************************************************************************************

function expandGapSummaryToObject(toggleObj) {
    if ((toggleObj.prop("tagName") && (toggleObj.prop("tagName").toLowerCase() == "a")) &&
        toggleObj.find('i:first').hasClass("fa-chevron-right")) {
        toggleGapSummaryCompChild(toggleObj);
    }
    if (toggleObj.parent().hasClass(CIR_FCS_SUM_ITEM_NON_ROOT_COMP_CLASS)) {
        var parentToToggle = toggleObj.parent().parent().parent().find('a:first');
        if (parentToToggle.hasClass(CIR_FCS_SUM_ITEM_TOGGLE_CLASS_ID)) expandGapSummaryToObject(parentToToggle);
    }
}

function removeAllGapSummaryHighLighting() {
    $(".psiItem.active").removeClass("active");
}

function expandGapSummaryToCompNode(compNode) {
    removeAllGapSummaryHighLighting();
    var toggleObj = $("#" + buildGapSummaryItemToggleElementId(compNode));
    var liObject = $("#" + buildGapSummaryCompItemElementId(compNode));
    liObject.addClass("active");
    if (toggleObj.parent().hasClass(CIR_FCS_SUM_ITEM_ROOT_COMP_CLASS)  &&
        (toggleObj.prop("tagName") && (toggleObj.prop("tagName").toLowerCase() == "a")) &&
        toggleObj.find('i:first').hasClass("fa-chevron-right")) {
        toggleGapSummaryCompChild(toggleObj);
    }
    else expandGapSummaryToObject(toggleObj);
}

function expandGapSummaryToFramework(fwId) {
    removeAllGapSummaryHighLighting();
    var toggleObj = $("#" + buildGapSummaryItemToggleElementIdForFwkId(fwId));
    var liObject = $("#" + buildIDableString(fwId) + "_psi");
    liObject.addClass("active");
    if (toggleObj.find('i:first').hasClass("fa-chevron-right")) {
        toggleGapSummaryCompChild(toggleObj);
    }
}

function scrollCompNodeInGapSummary(compNode) {
    if ($("#" + buildGapSummaryCompItemElementId(compNode)).length > 0) {
        expandGapSummaryToCompNode(compNode);
        $(CIR_FCS_SUM_COMP_LIST_CTR).scrollTo("#" + buildGapSummaryCompItemElementId(compNode), 500);
    }
}

function scrollFrameworkGapSummary(fwId) {
    if ($("#" + buildIDableString(fwId) + "_psi").length > 0) {
        expandGapSummaryToFramework(fwId);
        $(CIR_FCS_SUM_COMP_LIST_CTR).scrollTo("#" + buildIDableString(fwId) + "_psi", 500);
    }
}

function buildGapSummaryCompItemElementId(compNode) {
    return buildIDableString(compNode.getId().trim()) + "_psi";
}

function toggleGapSummaryCompChild(ce) {
    if (ce.find('i:first').hasClass("fa-chevron-right")) {
        ce.find('i:first').attr("class", "fa fa-chevron-down");
        ce.parent().find('ul:first').attr("style", "display:block");
    } else {
        ce.find('i:first').attr("class", "fa fa-chevron-right");
        ce.parent().find('ul:first').attr("style", "display:none");
    }
}

function generateCompetencyLineItemHtmlGapSummaryCoverageText(compNode) {
    var numberOfProfsWithComp = getNumberOfProfilesWithAssertedCompetencyAndParents(compNode.getId());
    var numberOfCompsRepresented = getNumberOfCompetencyDescendants(compNode.getId()) +  1;
    var numberOfCompsWithoutCoverage;
    if (numberOfProfsWithComp > 0) numberOfCompsWithoutCoverage = 0;
    else numberOfCompsWithoutCoverage = countNumberOfCompetenciesWithoutCoverage(compNode.getId());
    var numberOfCompsCovered = numberOfCompsRepresented - numberOfCompsWithoutCoverage;
    var cto = {};
    cto["title"] = "This specific area is covered by " + numberOfProfsWithComp + " of the " + selectedProfiles.length + " selected profiles.  " +
        numberOfCompsCovered + " of the " + numberOfCompsRepresented + " areas in this category are covered.";
    cto["details"] = "<span class=\"gapSummaryCompCov\"><i class=\"fa fa-users\"></i> " +
        numberOfProfsWithComp + "/" + selectedProfiles.length +
        "&nbsp;&nbsp;<i class=\"fa fa-book\"></i> " + numberOfCompsCovered + "/" + numberOfCompsRepresented + " </span>";
    return cto;
}

function buildGapSummaryItemToggleElementId(compNode) {
    return buildIDableString(compNode.getId().trim()) + "_psiToggle";
}

function generateCompetencyLineItemHtmlForGapSummaryCompList(compNode, hasChildren) {
    var liHtml = "";
    if (hasChildren) {
        liHtml += "<a class=\"" + CIR_FCS_SUM_ITEM_TOGGLE_CLASS_ID + "\" " +
            " id=\"" + buildGapSummaryItemToggleElementId(compNode) + "\" onclick=\"toggleGapSummaryCompChild($(this))\">" +
            " <i class=\"fa fa-chevron-right " + CIR_FCS_SUM_ITEM_CLASS_ID + "\" aria-hidden=\"true\"></i></a>";
    }
    else {
        liHtml += "<i id=\"" + buildGapSummaryItemToggleElementId(compNode) + "\" class=\"fa fa-circle " + CIR_FCS_SUM_ITEM_CLASS_ID +
            " " + CIR_FCS_SUM_ITEM_TOGGLE_CLASS_ID + "\" aria-hidden=\"true\"></i>";
    }
    var cto = generateCompetencyLineItemHtmlGapSummaryCoverageText(compNode);
    liHtml += "&nbsp;&nbsp;<a title=\"" + cto["title"] + "\" class=\"psiItem\" id=\"" + buildGapSummaryCompItemElementId(compNode) + "\" " +
        "onclick=\"zoomGapCgByD3NodeId('" + escapeSingleQuote(compNode.getId().trim()) + "',true)\">" +
        getStringVal(compNode.getName()).trim() + "&nbsp;&nbsp;" +  cto["details"] + "</a>";
    return liHtml;
}

//TODO addChildToGapSummaryCompList construct list view for multi node competency cluster
function addChildToGapSummaryCompList(parentUl, childCpd, isRootComp, isForMultiFwk) {
    var childLi = $("<li/>");
    if (isRootComp && !isForMultiFwk) childLi.addClass(CIR_FCS_SUM_ITEM_ROOT_COMP_CLASS);
    else childLi.addClass(CIR_FCS_SUM_ITEM_NON_ROOT_COMP_CLASS);
    var cpd = selectedFrameworksCompetencyData.competencyPacketDataMap[childCpd.id];
    var compNode = cpd.cassNodePacket.getNodeList()[0];
    var hasChildren = childCpd.children && childCpd.children.length > 0;
    childLi.html(generateCompetencyLineItemHtmlForGapSummaryCompList(compNode, hasChildren));
    if (hasChildren) {
        childCpd.children.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        var childsChildUl = $("<ul/>");
        childsChildUl.attr("class", "fa-ul gpsiChild");
        childsChildUl.attr("style", "display:none");
        $(childCpd.children).each(function (i, cc) {
            addChildToGapSummaryCompList(childsChildUl, cc, false, isForMultiFwk);
        });
        childLi.append(childsChildUl);
    }
    parentUl.append(childLi);
}

function buildGapSummaryFrameworkCompetencyList(parentElem,cpdArray,ulClass,hideElem,isForMultiFwk) {
    if (cpdArray && cpdArray.length > 0) {
        cpdArray.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        var childUl = $("<ul/>");
        childUl.attr("class", ulClass + " gpsiChild");
        if (hideElem) childUl.attr("style", "display:none");
        $(cpdArray).each(function (i, c) {
            addChildToGapSummaryCompList(childUl, c, true, isForMultiFwk);
        });
        parentElem.append(childUl);
    }
}

function generateFrameworkLineItemHtmlGapSummaryCoverageText(fw) {
    var numberOfFrameworkCompetencies = fw.competency.length;
    var numberOfCompsWithoutCoverage = countNumberOfCpdChildrenWithoutCoverage(gapDisplayHelperData.frameworkHelperMap[fw.shortId()].children);
    var numberOfCompsCovered = numberOfFrameworkCompetencies - numberOfCompsWithoutCoverage;
    var cto = {};
    cto["title"] = numberOfCompsCovered + " of the " + numberOfFrameworkCompetencies + " areas in this framework are covered.";
    cto["details"] = "<span class=\"gapSummaryCompCov\"><i class=\"fa fa-book\"></i> " + numberOfCompsCovered + "/" + numberOfFrameworkCompetencies +
        " (" + generatePercentFromNumber(numberOfCompsCovered/numberOfFrameworkCompetencies) + ") </span>";
    return cto;
}

function buildGapSummaryItemToggleElementIdForFwkId(fwid) {
    return buildIDableString(fwid.trim()) + "_psiToggle";
}

function buildGapSummaryFrameworkItemHtml(fw) {
    var cto = generateFrameworkLineItemHtmlGapSummaryCoverageText(fw);
    var fwLiHtml = "<a class=\"" + CIR_FCS_SUM_ITEM_TOGGLE_CLASS_ID + "\" id=\"" + buildGapSummaryItemToggleElementIdForFwkId(fw.shortId()) + "\" " +
        "onclick=\"toggleGapSummaryCompChild($(this))\">" +
        "<i class=\"fa fa-chevron-right " + CIR_FCS_SUM_ITEM_CLASS_ID + "\" aria-hidden=\"true\"></i></a>" +
        "&nbsp;&nbsp;<a title=\"" + cto["title"] + "\" class=\"psiItem\" id=\"" + buildIDableString(fw.shortId().trim()) + "_psi" + "\" " +
        "onclick=\"zoomGapCgByD3NodeId('" + escapeSingleQuote(fw.shortId().trim()) + "',true)\">" +
        getStringVal(fw.getName()).trim() + "&nbsp;&nbsp;" +  cto["details"] + "</a>";
    return fwLiHtml;
}

function buildGapSummaryMultiSelectedFrameworkCompetencyList() {
    var fwUl = $("<ul/>");
    fwUl.attr("class", "no-bullets gpsiChild");
    $(selectedFrameworks).each(function (i, fw) {
        var fwLi = $("<li/>");
        fwLi.addClass(CIR_FCS_SUM_ITEM_ROOT_COMP_CLASS);
        var fwLiHtml = buildGapSummaryFrameworkItemHtml(fw);
        fwLi.html(fwLiHtml);
        var cpdToDisplay = gapDisplayHelperData.frameworkHelperMap[fw.shortId()].children;
        buildGapSummaryFrameworkCompetencyList(fwLi,cpdToDisplay,"fa-ul",true,true);
        fwUl.append(fwLi);
    });
    $(CIR_FCS_SUM_COMP_LIST_CTR).append(fwUl);
}

function buildGapSummaryCompetencyList() {
    $(CIR_FCS_SUM_COMP_LIST_CTR).empty();
    if (selectedFrameworks.length == 1) {
        var cpdToDisplay = gapDisplayHelperData.gapHelper.children[0].children;
        buildGapSummaryFrameworkCompetencyList($(CIR_FCS_SUM_COMP_LIST_CTR),cpdToDisplay,"no-bullets",false,false);
    }
    else if (selectedFrameworks.length > 1) buildGapSummaryMultiSelectedFrameworkCompetencyList();
}

function buildGapSummaryOverview() {
    var numberOfComps = Object.keys(selectedFrameworksCompetencyData.competencyPacketDataMap).length;
    $(CIR_FCS_SUM_NUM_COMPS).html(numberOfComps);
    var numCompsWithoutCoverage = countTotalNumberOfCompetenciesWithoutCoverage();
    var numberOfCompsCovered = (numberOfComps - numCompsWithoutCoverage);
    $(CIR_FCS_SUM_COV).html(numberOfCompsCovered + "/" + numberOfComps + " (" + generatePercentFromNumber(numberOfCompsCovered/numberOfComps) + ")");
}

function buildSummaryIndividualProfileDisplayListObject() {
    var pdoa = [];
    for (var i=0;i<selectedProfiles.length;i++) {
        var pdo = {};
        pdo.name = viewableProfileByPkPemMap[selectedProfiles[i]].displayName;
        pdo.pem = selectedProfiles[i];
        pdoa.push(pdo);
    }
    pdoa.sort(function (a, b) {return a.name.localeCompare(b.name);});
    return pdoa;
}

function buildIndividualSelectedProfileList() {
    var pdoa = buildSummaryIndividualProfileDisplayListObject();
    for (var i=0;i<pdoa.length;i++) {
        var spLi = $("<li/>");
        spLi.html("<a title=\"View Profile\" onclick=\"openProfileExplorer('" + escapeSingleQuote(pdoa[i].pem) +  "')\">" + pdoa[i].name + "</a>");
        $(CIR_FCS_SUM_SEL_PROF_LIST).append(spLi);
    }
}

function toggleGroupMemDivInd(ce) {
    if (ce.find('i:first').hasClass("fa-chevron-right")) {
        ce.find('i:first').attr("class", "fa fa-chevron-down");
        ce.attr("title", "Hide Group Members");
    }
    else {
        ce.find('i:first').attr("class", "fa fa-chevron-right");
        ce.attr("title", "Show Group Members");
    }
}

function buildGroupMemberListDiv(memDivId,memberList) {
    var memDiv = $("<div/>");
    //evDiv.addClass("cdmAsrEvDiv");
    memDiv.attr("id", memDivId);
    memDiv.attr("style", "display:none");
    var memUl = $("<ul/>");
    $(memberList).each(function (i, m) {
        var memLi = $("<li/>");
        var memLiHtml = "<a title=\"View Profile\" onclick=\"openProfileExplorer('" + escapeSingleQuote(m.pkPem) +  "')\">" + m.name + "</a>";
        memLi.html(memLiHtml);
        memUl.append(memLi);
    });
    memDiv.append(memUl);
    return memDiv;
}

function buildGroupSelectedProfileList() {
    for (var i=0;i<selectedGroups.length;i++) {
        var g = selectedGroups[i];
        var gLi = $("<li/>");
        var memDivId = g.idable + "_mems";
        var gLiHtml  = "<span class=\"circleFocusOverviewGroup\">" + g.name + "</span>";
        gLiHtml += "&nbsp;&nbsp;<a onclick=\"$('#" + memDivId + "').toggle();toggleGroupMemDivInd($(this));\" " +
            "title=\"Show Group Members\" class=\"button tiny groupMemberIndToggle\">" + g.employee.length +
            "&nbsp;&nbsp;<i class=\"fa fa-chevron-right\"></i></a>";
        var memDiv = buildGroupMemberListDiv(memDivId,g.employee);
        gLi.html(gLiHtml);
        gLi.append(memDiv);
        $(CIR_FCS_SUM_SEL_PROF_LIST).append(gLi);
    }
}

function buildSelectedProfileList() {
    $(CIR_FCS_SUM_SEL_PROF_LIST).empty();
    if (selectedProfileType == IND_PRF_TYPE) buildIndividualSelectedProfileList();
    else if (selectedProfileType == GRP_PRF_TYPE) buildGroupSelectedProfileList();
}

function buildSelectedFrameworksList() {
    if (selectedFrameworks.length == 1) {
        setCircleFocusSummaryHeader(getStringVal(selectedFrameworks[0].getName()));
        $(CIR_FCS_SUM_SEL_FWK_LIST_CTR).hide();
    }
    else {
        setCircleFocusSummaryHeader("Multi Framework Gap Analysis");
        $(CIR_FCS_SUM_SEL_FWK_LIST).empty();
        for (var i=0;i<selectedFrameworks.length;i++) {
            var sfLi = $("<li/>");
            sfLi.html("<span class=\"circleFocusOverviewField\">" + getStringVal(selectedFrameworks[i].getName()) + "</span>");
            $(CIR_FCS_SUM_SEL_FWK_LIST).append(sfLi);
        }
        $(CIR_FCS_SUM_SEL_FWK_LIST_CTR).show();
    }
}

function buildGraphProfileSummary() {
    buildSelectedFrameworksList();
    buildSelectedProfileList();
    buildGapSummaryOverview();
    buildGapSummaryCompetencyList();
}

//**************************************************************************************************
// Gap Contents Search Auto Complete
//**************************************************************************************************

function findItemByGapContentsSearchBar(selectedValue) {
    if (competencySearchAutoCompleteMap.hasOwnProperty(selectedValue)) {
        zoomGapCircleGraphByAutoComplete(selectedValue);
    }
}

function buildGapContentsSearchAutoCompleteDataFromAutoCompleteMap() {
    var data = [];
    for (var property in competencySearchAutoCompleteMap) {
        if (competencySearchAutoCompleteMap.hasOwnProperty(property)) {
            if (property != "Framework not found") data.push(property);
        }
    }
    return data;
}

function fillInGapContentsSearchAutoComplete() {
    $(GAP_CONT_SRCH_INPT).autocomplete({
        source: buildGapContentsSearchAutoCompleteDataFromAutoCompleteMap(),
        select: function (event, ui) {
            findItemByGapContentsSearchBar(ui.item.label);
        }
    });
}


//**************************************************************************************************
// Gap Analysis Display
//**************************************************************************************************

function buildGapAnalysisDisplays() {
    showPageAsBusy("Building gap analysis display...");
    clearGapCircleSvg();
    buildGapGraphCircles(null, JSON.parse(gapD3NodeString));
    markGapNodes(gapDisplayHelperData.gapHelper);
    buildGraphProfileSummary();
    hideCircleSidebarDetails();
    showPageMainContentsContainer();
    fillInGapContentsSearchAutoComplete();
    $(GAP_CONT_SRCH_INPT).val("");
    showGapContentsSearchBar();
    enableAddItemButtons();
    showMainMenu();
    showGapAnalysisTools();
}

//**************************************************************************************************
// Gap Analysis Display Prep
//**************************************************************************************************

function prepForGapAnalysisDisplay() {
    showPageAsBusy("Processing gap data...");
    selectedFrameworksCompetencyData = buildSelectedFrameworksCompetencyData(selectedFrameworksMap,selectedFrameworksNodePacketGraphMap,competencyAssertionMap);
    showPageAsBusy("Prepping framework display nodes...");
    gapDisplayHelperData = setUpD3SelectedFrameworkNodes(selectedFrameworksMap,selectedFrameworksCompetencyData);
    gapD3NodeString = buildD3JsonString(gapDisplayHelperData.gapHelper);
    debugMessage("selectedFrameworksCompetencyData");
    debugMessage(selectedFrameworksCompetencyData);
    debugMessage("gapDisplayHelperData:");
    debugMessage(gapDisplayHelperData);
    debugMessage("gapD3NodeString:");
    debugMessage(gapD3NodeString);
    buildGapAnalysisDisplays();
    hasFinishedLoading = true;
}

//**************************************************************************************************
// Gap Analysis Functions
//**************************************************************************************************

function buildGapAnalysisData() {
    hasFinishedLoading = false;
    if (!haveSelectedProfilesBeenProcessed) fetchSelectedProfileAssertions();
    else if (!haveSelectedFrameworksBeenProcessed) collapseSelectedFrameworks();
    else prepForGapAnalysisDisplay();
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

function checkAllSelectedFrameworksCollapsed() {
    if (frameworksCollapsed >= frameworksToCollapse) {
        debugMessage("All frameworks collapsed..");
        debugMessage(selectedFrameworksNodePacketGraphMap);
        haveSelectedFrameworksBeenProcessed = true;
        if (!collapseErrorTriggered) prepForGapAnalysisDisplay();
    }
}

function handleCollapseFrameworkSuccess(frameworkId,fnpg,fwName) {
    frameworksCollapsed++;
    debugMessage("Framework collapsed:" + frameworkId);
    debugMessage(fnpg);
    if (!frameworkCollapsedCorrectly(fnpg)) {
        collapseErrorTriggered = true;
        showPageError("Could not determine framework('" + fwName + "') competencies.  " +
            "Check framework permissions.<br><a onclick=\"openAddFrameworkModal()\">Try a Different Framework?</a>");
        checkAllSelectedFrameworksCollapsed();
    }
    else if (doesFrameworkHaveCircularDependency(fnpg)) {
        collapseErrorTriggered = true;
        showFrameworkHasCircularDependencyWarning();
        checkAllSelectedFrameworksCollapsed();
    }
    else {
        showPageAsBusy("Collapsing selected frameworks...(" + frameworksCollapsed + " of " + frameworksToCollapse + ")");
        selectedFrameworksNodePacketGraphMap[frameworkId] = fnpg;
        checkAllSelectedFrameworksCollapsed();
    }
}

function handleCollapseFrameworkFailure(err,fwName) {
    frameworksCollapsed++;
    collapseErrorTriggered = true;
    debugMessage("handleCollapseFrameworkFailure: " + err);
    showPageError("Could not collapse framework (" + fwName + "): " + err);
    checkAllSelectedFrameworksCollapsed();
}

function collapseSelectedFrameworks() {
    frameworksToCollapse = Object.keys(selectedFrameworksMap).length;
    frameworksCollapsed = 0;
    collapseErrorTriggered = false;
    selectedFrameworksNodePacketGraphMap = {};
    showPageAsBusy("Collapsing selected frameworks...");
    var fc;
    for (var fid in selectedFrameworksMap) {
        if (selectedFrameworksMap.hasOwnProperty(fid)) {
            var fw = selectedFrameworksMap[fid];
            fc = new FrameworkCollapser();
            debugMessage("Collapsing framework: " + fw.shortId());
            fc.collapseFramework(repo, fw, CREATE_IMPLIED_RELATIONS_ON_COLLAPSE,
                function(frameworkId,fnpg) {
                    handleCollapseFrameworkSuccess(frameworkId,fnpg,getStringVal(fw.getName()));
                },
                function(err) {
                    handleCollapseFrameworkFailure(err,getStringVal(fw.getName()));
                }
            );
        }
    }
}

//**************************************************************************************************
// Assertion & Assertion Envelope Fetching
//**************************************************************************************************

function buildAssertionMaps() {
    showPageAsBusy("Processing assertions (step 2 of 2)...");
    $(assertionList).each(function (i, as) {
        var isNegativeAssr = as.getNegative();
        assertionNegativeMap[as.shortId()] = isNegativeAssr;
        if (!isNegativeAssr) { //for right now, just ignore negative assertions
            registerAssertionSourceName(as);
            assertionMap[as.shortId()] = as;
            if (!competencyAssertionMap[as.competency] || competencyAssertionMap[as.competency] == null) {
                competencyAssertionMap[as.competency] = [];
            }
            competencyAssertionMap[as.competency].push(as);
            if (!profileAssertionsMap[as.getSubject().toPem()] || profileAssertionsMap[as.getSubject().toPem()] == null) {
                profileAssertionsMap[as.getSubject().toPem()] = [];
            }
            profileAssertionsMap[as.getSubject().toPem()].push(as);
        }
    });
}

function sortAssertionList() {
    assertionList.sort(function (a, b) {
        return a.getAssertionDate() - b.getAssertionDate();
    });
}

function processRelevantAssertions() {
    assertionMap = {};
    competencyAssertionMap = {};
    profileAssertionsMap = {};
    assertionNegativeMap = {};
    if (assertionList.length > 0) {
        showPageAsBusy("Processing assertions (step 1 of 2)...");
        sortAssertionList();
        debugMessage(assertionList);
        buildAssertionMaps();
    }
    haveSelectedProfilesBeenProcessed = true;
    if (!haveSelectedFrameworksBeenProcessed) collapseSelectedFrameworks();
    else prepForGapAnalysisDisplay();
}

function buildAssertionListFromSearchAndEnvelopes() {
    var ao = {};
    for (var i=0;i<assertionEnvelopeEcAssertionList.length;i++) {
        ao[assertionEnvelopeEcAssertionList[i].shortId()] = assertionEnvelopeEcAssertionList[i];
    }
    for (var i=0;i<ecAssertionSearchReturnList.length;i++) {
        ao[ecAssertionSearchReturnList[i].shortId()] = ecAssertionSearchReturnList[i];
    }
    for (var asid in ao) {
        if (ao.hasOwnProperty(asid)) {
            assertionList.push(ao[asid]);
        }
    }
}

function isEnvelopeOwnedBySelectedProfile(asrEnv) {
    if (!asrEnv.owner || asrEnv.owner == null) return false;
    for (var j=0;j<asrEnv.owner.length;j++) {
        if (selectedProfiles.includes(asrEnv.owner[j])) return true;
    }
    return false;
}

function isEncryptedAssertionEnvelope(asrEnv) {
    if (asrEnv.encryptedType && asrEnv.encryptedType == "AssertionEnvelope") return true;
    return false;
}

function registerAssertionEnvelopeAssertions(asrEnv) {
    if (asrEnv.assertion && asrEnv.assertion != null) {
        for (var i=0;i<asrEnv.assertion.length;i++) {
            var eca = new EcAssertion();
            eca.copyFrom(asrEnv.getAssertion(i));
            assertionEnvelopeEcAssertionList.push(eca);
        }
    }
}

function processPotentialAssertionEnvelope(potAsrEnv) {
    debugMessage("processPotentialAssertionEnvelope: " + potAsrEnv.id);
    if (isEncryptedAssertionEnvelope(potAsrEnv) && isEnvelopeOwnedBySelectedProfile(potAsrEnv)) {
        var nv = new EcEncryptedValue();
        nv.copyFrom(potAsrEnv);
        var aed = nv.decryptIntoObject();
        var realAsrEnv = new AssertionEnvelope();
        realAsrEnv.copyFrom(aed);
        assertionEnvelopeList.push(realAsrEnv);
        registerAssertionEnvelopeAssertions(realAsrEnv);
    }
}

function handleGetAssertionEnvelopesSuccess(ecRldArray) {
    debugMessage("handleGetAssertionEnvelopesSuccess: " + ecRldArray.length);
    if (ecRldArray && ecRldArray != null) {
        for (var i=0;i<ecRldArray.length;i++) {
            processPotentialAssertionEnvelope(ecRldArray[i]);
        }
    }
    buildAssertionListFromSearchAndEnvelopes();
    processRelevantAssertions();
}

function handleGetAssertionEnvelopesFailure(failMsg) {
    debugMessage("handleGetAssertionEnvelopesFailure: " + failMsg);
    showPageError("Portfolio fetch failed: " + failMsg);
}

function fetchAssertionEnvelopes() {
    showPageAsBusy("Fetching selected profile portfolios...");
    repo.searchWithParams(new AssertionEnvelope().getSearchStringByType(),{'size':MAX_ASSR_SEARCH_SIZE},null,handleGetAssertionEnvelopesSuccess,handleGetAssertionEnvelopesFailure);
}

function filterAssertionsBySubject(arrayOfEcAssertions) {
    var filteredEcAssertions = [];
    for (var i = 0; i < arrayOfEcAssertions.length; i++) {
        var ecaSubj = arrayOfEcAssertions[i].getSubject();
        if (ecaSubj && ecaSubj != null) {
            if (selectedProfiles.includes(ecaSubj.toPem())) {
                filteredEcAssertions.push(arrayOfEcAssertions[i]);
            }
        }
    }
    return filteredEcAssertions;
}

function handleGetAssertionsSuccess(arrayOfEcAssertions) {
    debugMessage("handleGetAssertionsSuccess: " + arrayOfEcAssertions.length);
    ecAssertionSearchReturnList = filterAssertionsBySubject(arrayOfEcAssertions);
    debugMessage("ecAssertionSearchReturnList(filtered): " + ecAssertionSearchReturnList.length);
    fetchAssertionEnvelopes();
}

function handleGetAssertionsFailure(failMsg) {
    debugMessage("handleGetAssertionsFailure: " + failMsg);
    showPageError("Assertion fetch failed: " + failMsg);
}

function getAssertionSearchQueryForSelectedProfiles() {
    var searchQuery = "";
    if (selectedProfiles.length > 1) searchQuery = "("
    for (var i=0;i<selectedProfiles.length;i++) {
        if (i > 0) searchQuery += " OR ";
        searchQuery += "(\\*reader:\"" + selectedProfiles[i] + "\" OR \"" + selectedProfiles[i] + "\")";
    }
    if (selectedProfiles.length > 1) searchQuery += ")";
    debugMessage("Assertion search query: " + searchQuery);
    return searchQuery;
}

function fetchSelectedProfileAssertions() {
    showPageAsBusy("Fetching selected profile assertions...");
    assertionList = [];
    ecAssertionSearchReturnList = [];
    assertionEnvelopeEcAssertionList = [];
    assertionEnvelopeList = [];
    EcAssertion.search(repo, getAssertionSearchQueryForSelectedProfiles(), handleGetAssertionsSuccess, handleGetAssertionsFailure, {'size':MAX_ASSR_SEARCH_SIZE});
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
        currentAddMode = INIT_MODE;
        showGapWelcome();
    }
}

function handleFetchFrameworksFromRepositorySuccess(arrayOfEcFrameworks) {
    buildFrameworkLists(arrayOfEcFrameworks);
    //fillInOpenFrameworkSearchAutoComplete();
}

function handleFetchFrameworksFromRepositoryFailure(err) {
    showPageError("Could not fetch framework list: " + err);
}

function fetchAvailableFrameworks() {
    disableAddItemButtons();
    hideGapAnalysisTools();
    hideGapContentsSearchBar();
    showPageAsBusy("Loading available frameworks...");
    EcFramework.search(repo, null, handleFetchFrameworksFromRepositorySuccess, handleFetchFrameworksFromRepositoryFailure, {'size':MAX_FWK_SEARCH_SIZE});
}


//**************************************************************************************************
// Page Load
//**************************************************************************************************

//setPageColorTheme();

function loadPageContents() {
    fetchAvailableFrameworks();
}
