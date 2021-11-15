//**************************************************************************************************
// CASS UI Framework Explorer UI Utility Functions
//**************************************************************************************************

//**************************************************************************************************
// Constants

const DEBUG_CONSOLE = true;
const DEBUG_ALERT = false;

// Color Themes
const GAP_CIR_COLOR_RANGE = "blue";

// Various Page Element IDs
const CASSUI_MAIN_BUSY_CTR = "#cassUiMainBusyContainer";
const CASSUI_MAIN_BUSY_TXT = "#cassUiMainBusyText";
const CASSUI_MAIN_ERR_CTR = "#cassUiMainErrorContainer";
const CASSUI_MAIN_ERR_TXT = "#cassUiMainErrorText";
const CASSUI_HIGH_LVL_WARNING = ".cassUiHighLevelWarning";
const CASSUI_MAIN_CONTENTS_CTR = "#cassUiMainContentsContainer";

const CASSUI_MODAL_INPUT = ".cassUiModalInput";
const CASSUI_MODAL_BTN = ".cassUiModalButton";
const CASSUI_MODAL_BUSY_CTR = ".cassUiModalBusyCtr";
const CASSUI_MODAL_BUSY_TXT = ".cassUiModalBusyText";
const CASSUI_MODAL_ERROR_CTR = ".cassUiModalErrorCtr";
const CASSUI_MODAL_ERROR_TXT = ".cassUiModalErrorText";

const GAP_MAIN_MENU_CTR = "#ssmStickyCtr";
const GAP_MAIN_MENU = "#section-sub-menu";
const GAP_PAGE_TOOLS = "#page-tools";

const ADD_PROF_BTN = "#addProfBtn";
const ADD_FWK_BTN = "#addFwkBtn";

const GAP_CONT_SRCH_CTR = "#gapContentsSearchContainer";
const GAP_CONT_SRCH_INPT = "#gapContentsSearchInput";

const GAP_WELCOME_CTR = "#gapWelcomeContainer";

//Circle Focus Detail Summary (left-hand side)/ Sidebar (right-hand side)  Items
const CIR_FCS_DTL_CTR = "#circleFocusDetailsSidebar";
const CIR_FCS_DTL_SING_NAME = "#circleFocusDetailsSingleName";
const CIR_FCS_DTL_SING_DESC = "#circleFocusDetailsSingleDesc";
const CIR_FCS_DTL_PROF_LIST_CTR = "#circleFocusDetailsProfListContainer";
const CIR_FCS_DTL_PROF_LIST = "#circleFocusDetailsProfList";
const CIR_FCS_COMP_TOOLS = "#circleFocusCompTools";
const CIR_FCS_DTL_COMP_DTL_LINK = "#circleFocusCompDetailsLink";
const CIR_FCS_GAP_REP_LINK = "#circleFocusGapReportLink";

const CIR_FCS_SUM_HDR = "#circleFocusSummaryHeader";

const CIR_FCS_SUM_SEL_FWK_LIST_CTR = "#circleFocusSummarySelFwkListCtr";
const CIR_FCS_SUM_SEL_FWK_LIST = "#circleFocusSummarySelFwkList";

const CIR_FCS_SUM_SEL_PROF_LIST = "#circleFocusSummarySelProfList";
const CIR_FCS_SUM_NUM_COMPS = "#circleFocusSummaryNumComps";
const CIR_FCS_SUM_COV = "#circleFocusSummaryCoverage";
const CIR_FCS_SUM_COMP_LIST_CTR = "#circleFocusSummaryCompListCtr";

const CIR_FCS_SUM_ITEM_CLASS_ID = "gpsi";
const CIR_FCS_SUM_ITEM_TOGGLE_CLASS_ID = "gpsiToggle";
const CIR_FCS_SUM_ITEM_ROOT_COMP_CLASS = "gpsiRootComp";
const CIR_FCS_SUM_ITEM_NON_ROOT_COMP_CLASS = "gpsiNonRootComp";

//Warning Containers
const NO_FRAMEWORKS_AVAILABLE_CTR = "#noFrameworksAvailableWarningContainer";
const CIRC_DEPEND_WARNING_CTR = "#circularDependencyWarningContainer";

//Add Profiles Modal
const ADD_PRF_MODAL = "#modal-profile-select";
const ADD_PRF_TYPE_SELECT = "#addProfTypeSelect";
const ADD_PRF_RES_FLTR = "#addProfResultsFilter";
const ADD_PRF_RES_SELECT = "#addProfResultsSelect";
const ADD_PRF_RES_DESC = "#addProfResultsDesc";

//Add Frameworks Modal
const ADD_FWK_MODAL = "#modal-framework-select";
const ADD_FWK_FLTR_TYPE_SELECT = "#addFwkFilterTypeSelect";
const ADD_FWK_RES_FLTR = "#addFwkResultsFilter";
const ADD_FWK_RES_SELECT = "#addFwkResultsSelect";
const ADD_FWK_RES_DESC = "#addFwkResultsDesc";

//Gap Analysis Report Modal
const GAP_REP_MODAL = "#modal-gap-report";
const GAP_REP_DESC = "#gapReportDesc";
const GAP_REP_COV_SUM = "#gapReportCovSummary";
const GAP_REP_LIST_CTR = "#gapReportListCtr";
const GAP_REP_LIST = "#gapReportList";

//Competency Details Modal
const COMP_DTL_MODAL = "#modal-competency-inf";
const COMP_DTL_COMP_NAME = "#compDetCompName";

//Group Edit Group Modal
const GRP_EDIT_MODAL = "#modal-group-edit";
const GRP_EDIT_SELECT = "#grpEditGroupSelection";
const GRP_EDIT_SELECT_LIST = "#grpEditGroupSelList";
const GRP_EDIT_DTLS = "#grpEditDetails";
const GRP_EDIT_GRP_ID = "#grpEditGrpId";
const GRP_EDIT_GRP_NAME = "#grpEditGrpName";
const GRP_EDIT_MBR_LIST_CTR = "#grpEditMemberListCtr";
const GRP_EDIT_MBR_LIST = "#grpEditMemberList";
const GRP_EDIT_AVL_MBR_LIST = "#grpEditAvailableMemberList";


//**************************************************************************************************
// Variables


//**************************************************************************************************
// General UI Utility Functions
//**************************************************************************************************

queryParams = function () {
    if (window.document.location.search == null)
        return {};
    var hashSplit = (window.document.location.search.split("?"));
    if (hashSplit.length > 1) {
        var o = {};
        var paramString = hashSplit[1];
        var parts = (paramString).split("&");
        for (var i = 0; i < parts.length; i++)
            o[parts[i].split("=")[0]] = decodeURIComponent(parts[i].replace(parts[i].split("=")[0] + "=", ""));
        return o;
    }
    return {};
};

queryParams = queryParams();

function debugMessage(msg) {
    if (DEBUG_CONSOLE) console.log(msg);
    if (DEBUG_ALERT) alert(msg);
}

function showScreen(newScreen) {
    $('.screen:visible').fadeOut('fast', function () {
        $('#' + newScreen).fadeIn('fast');
    });
}

function showPageMainContentsContainer() {
    hideGapWelcome();
    if (!$(CASSUI_MAIN_CONTENTS_CTR).is(":visible")) {
        $(CASSUI_MAIN_BUSY_CTR).hide();
        $(CASSUI_MAIN_ERR_CTR).hide();
        $(CASSUI_MAIN_CONTENTS_CTR).show();
    }
}

function hidePageMainContentsContainer() {
    $(CASSUI_MAIN_CONTENTS_CTR).hide();
}

function showPageAsBusy(text) {
    hideGapWelcome();
    $(CASSUI_MAIN_ERR_CTR).hide();
    $(CASSUI_HIGH_LVL_WARNING).hide();
    hidePageMainContentsContainer();
    $(CASSUI_MAIN_BUSY_TXT).html(text);
    $(CASSUI_MAIN_BUSY_CTR).show();

}

function showPageError(text) {
    console.error(text);
    hideGapWelcome();
    $(CASSUI_MAIN_BUSY_CTR).hide();
    $(CASSUI_HIGH_LVL_WARNING).hide();
    hidePageMainContentsContainer();
    $(CASSUI_MAIN_ERR_TXT).html(text);
    $(CASSUI_MAIN_ERR_CTR).show();
}

function disableModalInputsAndButtons() {
    $(CASSUI_MODAL_INPUT).attr("disabled", "true");
    $(CASSUI_MODAL_BTN).attr("disabled", "true");
}

function enableModalInputsAndButtons() {
    $(CASSUI_MODAL_INPUT).removeAttr("disabled");
    $(CASSUI_MODAL_BTN).removeAttr("disabled");
}

function showModalBusy(modalId,busyHtml) {
    hideModalError(modalId);
    disableModalInputsAndButtons();
    $(modalId + ' ' + CASSUI_MODAL_BUSY_TXT).html(busyHtml);
    $(modalId + ' ' + CASSUI_MODAL_BUSY_CTR).show();
}

function hideModalBusy(modalId) {
    $(modalId + ' ' + CASSUI_MODAL_BUSY_CTR).hide();
}

function showModalError(modalId,errorHtml) {
    hideModalBusy(modalId);
    enableModalInputsAndButtons();
    $(modalId + ' ' + CASSUI_MODAL_ERROR_TXT).html(errorHtml);
    $(modalId + ' ' + CASSUI_MODAL_ERROR_CTR).show();
}

function hideModalError(modalId) {
    $(modalId + ' ' + CASSUI_MODAL_ERROR_CTR).hide();
    $(CASSUI_MODAL_INPUT).removeClass("invalid");
}

function showModalInputAsInvalid(fieldId) {
    $(fieldId).addClass("invalid");
}

function generateBreakHtmlFromArray(sa) {
    var brhtml = "";
    for (var i=0;i<sa.length;i++) {
        if (i > 0) brhtml += "<br>";
        brhtml += sa[i];
    }
    return brhtml;
}

function generateAnchorLink(href, text, target) {
    return "<a href=\"" + href + "\" target=\"" + target + "\">" + escapeSingleQuote(text) + "</a>";
}

function buildFrameworkHyperlink(frameworkId,frameworkName) {
    return generateAnchorLink("https://cassproject.github.io/cass-editor/?frameworkId=" + frameworkId + "&view=true", frameworkName, frameworkName);
}

function buildFrameworkCompetencyHyperlink(frameworkId,competencyId,competencyName) {
    return generateAnchorLink("https://cassproject.github.io/cass-editor/?frameworkId=" + frameworkId + "&competencyId=" +  + "&view=true", competencyName, competencyName);
}

if ( typeof String.prototype.startsWith != 'function' ) {
    String.prototype.startsWith = function( str ) {
        return str.length > 0 && this.substring( 0, str.length ) === str;
    }
};

if ( typeof String.prototype.endsWith != 'function' ) {
    String.prototype.endsWith = function( str ) {
        return str.length > 0 && this.substring( this.length - str.length, this.length ) === str;
    }
};

function generatePercentFromNumber(n) {
    if (n) {
        if (n == 0) return "0%";
        else {
            var tp = Math.round(n * 100);
            return tp + "%";
        }
    }
    else return "0%";
}

//**************************************************************************************************
// Gap Analysis Page UI Functions
//**************************************************************************************************

function setCircleFocusSummaryHeader(desc) {
    $(CIR_FCS_SUM_HDR).html(desc);
}

function showCircleSidebarDetails() {
    $(CIR_FCS_DTL_CTR).removeClass("hide");
}

function hideCircleSidebarDetails() {
    $(CIR_FCS_DTL_CTR).addClass("hide");
}

function setAddFwkResultsDesc(desc) {
    $(ADD_FWK_RES_DESC).html(desc);
}

function setAddProfResultsDesc(desc) {
    $(ADD_PRF_RES_DESC).html(desc);
}

function hideMainMenu() {
    $(GAP_MAIN_MENU_CTR).hide();
    $(GAP_MAIN_MENU).hide();
}

function showMainMenu() {
    $(GAP_MAIN_MENU_CTR).show();
    $(GAP_MAIN_MENU).show();
}

function showNoFrameworksAvailableWarning() {
    hideGapWelcome();
    $(CASSUI_MAIN_BUSY_CTR).hide();
    $(CASSUI_MAIN_ERR_CTR).hide();
    $(CASSUI_HIGH_LVL_WARNING).hide();
    $(NO_FRAMEWORKS_AVAILABLE_CTR).show();
}

function showFrameworkHasCircularDependencyWarning() {
    hideGapWelcome();
    $(CASSUI_MAIN_BUSY_CTR).hide();
    $(CASSUI_MAIN_ERR_CTR).hide();
    $(CASSUI_HIGH_LVL_WARNING).hide();
    $(CIRC_DEPEND_WARNING_CTR).show();
}

function disableAddItemButtons() {
    $(ADD_PROF_BTN).attr("disabled", "true");
    $(ADD_FWK_BTN).attr("disabled", "true");
}

function enableAddItemButtons() {
    $(ADD_PROF_BTN).removeAttr("disabled");
    $(ADD_FWK_BTN).removeAttr("disabled");
}

function hideGapContentsSearchBar() {
    $(GAP_CONT_SRCH_CTR).hide();
}

function showGapContentsSearchBar() {
    $(GAP_CONT_SRCH_CTR).show();
}

function showGapAnalysisTools() {
    $(GAP_PAGE_TOOLS).show();
}

function hideGapAnalysisTools() {
    $(GAP_PAGE_TOOLS).hide();
}

function hideGapWelcome() {
    $(GAP_WELCOME_CTR).hide();
}

function showGapWelcome() {
    hideMainMenu();
    $(CASSUI_MAIN_BUSY_CTR).hide();
    $(CASSUI_MAIN_ERR_CTR).hide();
    $(CASSUI_MAIN_CONTENTS_CTR).hide();
    $(GAP_WELCOME_CTR).show();
}

function clearAllSearchBars() {
    $(GAP_CONT_SRCH_INPT).val("");
}

function goToDisplayRoot() {
    if (hasFinishedLoading) {
        zoomGapCgByD3NodeId(GAP_NODE_ROOT_NAME, true);
    }
}

function getStringVal(f) {
    if (!f) return "";
    else if (typeof f === 'string' || f instanceof String) return f;
    else if (Array.isArray(f)) {
        if (f.length >= 1) return f[0];
        else return "";
    }
    else return "";
}

//**************************************************************************************************
// JQuery Functions
//**************************************************************************************************

jQuery.fn.scrollTo = function (elem, speed) {
    $(this).animate({
        scrollTop: $(this).scrollTop() - $(this).offset().top + $(elem).offset().top
    }, speed == undefined ? 1000 : speed);
    return this;
};

//**************************************************************************************************
// Foundation
//**************************************************************************************************

$(document).foundation();
