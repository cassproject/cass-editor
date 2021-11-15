//**************************************************************************************************
// CASS UI Profile Explorer UI Utility Functions
//**************************************************************************************************

//TODO goToDisplayRoot add go to list root

//**************************************************************************************************
// Constants

const DEBUG_CONSOLE = true;
const DEBUG_ALERT = false;

const LIST_VIEW_SCROLL_ITEM_OFFSET = 220;

const EXP_CIR_COLOR_RANGE = "blue";

// Screens
const GRAPH_SCREEN_SIMPLE = "graph-screen";
const GRAPH_SCREEN = "#" + GRAPH_SCREEN_SIMPLE;
const LIST_SCREEN_SIMPLE = "list-screen";
const LIST_SCREEN = "#" + LIST_SCREEN_SIMPLE;

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

const CIR_FCS_DTL_CTR = "#circleFocusDetailsSidebar";
const CIR_FCS_DTL_REL_LIST = "#circleFocusDetailsRelList";
const CIR_FCS_DTL_SING_NAME = "#circleFocusDetailsSingleName";
const CIR_FCS_DTL_SING_DESC = "#circleFocusDetailsSingleDesc";
const CIR_FCS_COMP_TOOLS = "#circleFocusCompTools";
const CIR_FCS_DTL_COMP_DTL_LINK = "#circleFocusCompDetailsLink";
const CIR_FCS_DTL_COMP_CONF = "#circleFocusCompConfIcon";
const CIR_FCS_DTL_ASR_LIST_CTR = "#circleFocusDetailsAssertionListContainer";

const CIR_FCS_SUM_DESC = "#circleFocusSummaryDesc";
const CIR_FCS_SUM_LIST_CTR = "#circleFocusSummaryListContainer";

const CIR_FCS_SUM_ITEM_CLASS_ID = "gpsi";

const SHOW_GRAPH_VIEW_BTN = "#showGraphViewBtn";
const SHOW_LIST_VIEW_BTN = "#showListViewBtn";

const PROF_EXP_MAIN_MENU_CTR = "#ssmStickyCtr";
const PROF_EXP_MAIN_MENU = "#section-sub-menu";
const PROF_EXP_PAGE_TOOLS = "#page-tools";
const PROF_DISP_TOOLS = "#displayedProfileTools";

const PROFILE_NAME = "#profileName";
const PROF_SRCH_CTR = "#profileSearchContainer";
const PROF_SRCH_INPT = "#profileSearchInput";
const PROF_USR_SRCH_CTR = "#profileUserSearchContainer";
const PROF_USR_SRCH_INPT = "#profileUserSearchInput";

//displayed when you search for someone and find no profile data
const PROF_USR_SRCH_NO_ASRS = "#noAssertionsFoundForProfileUserSearch";
//displayed when you do a view my own profile data and find no profile data
const PROF_NO_ASRS_CTR = "#noProfileDataContainer";

const PROF_CONTENTS_LIST = "#list-screen__root";

const COMP_CRED_CTR = "#compCredentialContainer";
const COMP_CRED_BADGE_CTR = "#compCredentialBadgeContainer";
const COMP_CRED_DEG_CERT_CTR = "#compCredentialDegreeCertsContainer";

const FA_CLASS_DEGREE = "fa-graduation-cap";
const FA_CLASS_COURSE = "fa-book";
const FA_CLASS_TRAINING = "fa-bookmark";
const FA_CLASS_BADGE = "fa-sun-o";
const FA_CLASS_SEMINAR = "fa-pencil-square-o";
const FA_CLASS_CERTIFICATION = "fa-trophy";
const FA_CLASS_CERTIFICATE = "fa-certificate";
const FA_CLASS_DEFAULT = "fa-cogs";

// Confidence Classes
const CONF_CLASS_BASE = "badge";
const HIGH_CONF_CLASS = "highConf";
const MID_HIGH_CONF_CLASS = "midHighConf";
const MID_CONF_CLASS = "midConf";
const MID_LOW_CONF_CLASS = "midLowConf";
const LOW_CONF_CLASS = "lowConf";

// Evidence Details Modal
const EV_DTL_MODAL = "#modal-evidence-details";
const EV_DTL_NAME = "#evDetEvName";
const EV_DTL_TYPE = "#evDetEvType";
const EV_DTL_SOURCE = "#evDetEvSource";
const EV_DTL_DATE = "#evDetEvDate";
const EV_DTL_EXP = "#evDetEvExp";
const EV_DTL_ASR_ID = "#evDetAsrId";
const EV_DTL_URL = "#evDetEvUrl";
const EV_DTL_PRV_CTR = "#evDetPrevContainer";

// Assertion Details Modal
const ASR_DTL_MODAL = "#modal-assertion-details";
const ASR_DTL_SOURCE = "#asrDetSource";
const ASR_DTL_SUBJECT = "#asrDetSubject";
const ASR_DTL_FW_CTR = "#asrDetFrameworkContainer";
const ASR_DTL_COMP = "#asrDetCompetency";
const ASR_DTL_LVL_LI = "#asrDetLvlLi";
const ASR_DTL_LVL = "#asrDetLvl";
const ASR_DTL_HOLDS = "#asrDetHolds";
const ASR_DTL_CONF = "#asrDetConf";
const ASR_DTL_DATE = "#asrDetEvDate";
const ASR_DTL_EXP = "#asrDetEvExp";
const ASR_DTL_URL = "#asrDetEvUrl";
const ASR_DTL_EV_LI = "#asrDetEvLi";
const ASR_DTL_EV_LIST = "#asrDetEvList";

// Competency Details Modal
const COMP_DTL_MODAL = "#modal-competency-info";
const COMP_DTL_NAME = "#compDetCompName";
const COMP_DTL_DESC = "#compDetCompDesc";
const COMP_DTL_FRM_NAME = "#compDetFrameworkName";
const COMP_DTL_CONF = "#compDetConfidence";
const COMP_DTL_ASR_CTR = "#compDetAsrContainer";

// Assertion Share Modal
const ASR_SHARE_MODAL = "#modal-share-assertion";
const ASR_SHARE_ASR_DESC = "#asrShareAssertionDesc";
const ASR_SHARE_CREATE_PRTF_CTR = "#asrShareCreatePortfolioContainer";
const ASR_SHARE_CREATE_PRTF_NAME = "#asrShareCreatePortfolioName";
const ASR_SHARE_ASSIGN_PRTF_CTR = "#asrShareAssignPortfolioContainer";
const ASR_SHARE_ASSIGN_PRTF_LIST = "#asrShareAssignPortfolioList";
const ASR_SHARE_PRTF_RDRS_CTR = "#asrSharePortfolioReadersContainer";
const ASR_SHARE_PRTF_RDRS_PRTF_NAME = "#asrSharePortfolioReadersPortfolioName";
const ASR_SHARE_PRTF_RDRS_LIST = "#asrShareAssignPortfolioReadersList";
const ASR_SHARE_PRTF_RDRS_PRTF_TYPE = "#asrShareAssignPortfolioReadersPortfolioType";
const ASR_SHARE_PRTF_RDRS_PRTF_TYPE_LKP = "#asrShareAssignPortfolioReadersPortfolioTypeLookup";
const ASR_SHARE_PRTF_CONTENS_CTR_ID_PREFIX = "asr-share-port-cont-";
const ASR_SHARE_EX_AE_CB_ID_PREFIX = "exAe-";
const ASR_SHARE_NEW_AE_CB_ID_PREFIX = "potAe-idx-";
const ASR_SHARE_ASGN_CONT_CB_ID_PREFIX = "asgn-cont-";

// Assertion Validate Modal
const ASR_VALD_MODAL = "#modal-validate-assertions";
const ASR_VALD_TYPES = "#asrValdTypes";
const ASR_VALD_SETUP_CTR = "#asrValdSetupCtr";
const ASR_VALD_SETUP_BTN_CTR = "#asrValdSetupBtnsCtr";
const ASR_VALD_RESULTS_CTR = "#asrValdResultsCtr";
const ASR_VALD_RESULTS_LIST_CTR = "#asrValdResultsListContainer";
const ASR_VALD_RESULTS_LIST = "#asrValdResultsList";

// Confidence Details Modal
const CONF_DTL_MODAL = "#modal-competency-confidence-info";
const CONF_DTL_COMP_NAME = "#confDetailCompName";
const CONF_DTL_CONF = "#confDetailConf";
const CONF_DTL_EXP = "#confDetailExplanation";
const CONF_DTL_ASR_LIST = "#confDetailList";

// Assertion Source Trust Network Modal
const ASR_SRC_TRST_MODAL = "#modal-asr-source-trust";
const ASR_SRC_TRST_LIST_CTR = "#asrSourceTrustListCtr";
const ASR_SRC_TRST_LIST = "#asrSourceTrustList";


//**************************************************************************************************
// Variables
var currentScreen;

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
    $(CASSUI_MAIN_ERR_CTR).hide();
    $(CASSUI_HIGH_LVL_WARNING).hide();
    hidePageMainContentsContainer();
    $(CASSUI_MAIN_BUSY_TXT).html(text);
    $(CASSUI_MAIN_BUSY_CTR).show();
}

function showPageError(text) {
    $(CASSUI_MAIN_BUSY_CTR).hide();
    $(CASSUI_HIGH_LVL_WARNING).hide();
    hidePageMainContentsContainer();
    $(CASSUI_MAIN_ERR_TXT).html(text);
    $(CASSUI_MAIN_ERR_CTR).show();
    disableViewToggleButtons();
    showOnlyOpenProfileTools();
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
// Profile Explorer Page UI Functions
//**************************************************************************************************

function hideMainMenu() {
    $(PROF_EXP_MAIN_MENU_CTR).hide();
    $(PROF_EXP_MAIN_MENU).hide();
}

function showMainMenu() {
    $(PROF_EXP_MAIN_MENU_CTR).show();
    $(PROF_EXP_MAIN_MENU).show();
}

function showListViewMainContentsScreen() {
    showPageMainContentsContainer();
    showScreen(LIST_SCREEN_SIMPLE);
    currentScreen = LIST_SCREEN_SIMPLE;
}

function showGraphViewMainContentsScreen() {
    showPageMainContentsContainer();
    showScreen(GRAPH_SCREEN_SIMPLE);
    $("html, body").animate({ scrollTop: 0 }, 500);
    currentScreen = GRAPH_SCREEN_SIMPLE;
}

function enableViewToggleButtons() {
    $(SHOW_GRAPH_VIEW_BTN).removeAttr("disabled");
    $(SHOW_LIST_VIEW_BTN).removeAttr("disabled");
}

function disableViewToggleButtons() {
    $(SHOW_GRAPH_VIEW_BTN).attr("disabled", "true");
    $(SHOW_LIST_VIEW_BTN).attr("disabled", "true");
}

function showCircleSidebarDetails() {
    $(CIR_FCS_DTL_CTR).removeClass("hide");
}

function hideCircleSidebarDetails() {
    $(CIR_FCS_DTL_CTR).addClass("hide");
}

function hideProfileSearchBar() {
    $(PROF_SRCH_CTR).hide();
}

function showProfileSearchBar() {
    $(PROF_SRCH_CTR).show();
}

function clearProfileSearchBar() {
    $(PROF_SRCH_INPT).val("");
}

function clearProfileUserSearchBar() {
    $(PROF_USR_SRCH_INPT).val("");
}

function clearAllSearchBars() {
    clearProfileSearchBar();
    clearProfileUserSearchBar();
}

function hideProfileExpTools() {
    $(PROF_EXP_PAGE_TOOLS).hide();
    hideProfileSearchBar();
}

function showOnlyOpenProfileTools() {
    $(PROF_DISP_TOOLS).hide();
    $(PROF_EXP_PAGE_TOOLS).show();
    hideProfileSearchBar();
}

function showAllProfileExpTools() {
    $(PROF_DISP_TOOLS).show();
    $(PROF_EXP_PAGE_TOOLS).show();
    showProfileSearchBar();
}

function hideProfileUserSearchContainer() {
    $(PROF_USR_SRCH_CTR).hide();
}

function showProfileUserSearchContainer() {
    hideMainMenu();
    $(CASSUI_MAIN_BUSY_CTR).hide();
    $(CASSUI_MAIN_ERR_CTR).hide();
    $(PROF_NO_ASRS_CTR).hide();
    $(CASSUI_MAIN_CONTENTS_CTR).hide();
    $(PROF_USR_SRCH_NO_ASRS).hide();
    $(PROF_USR_SRCH_CTR).show();
}

function showNoAssertionsFoundForProfileUserSearchWarning() {
    showOnlyOpenProfileTools();
    showProfileUserSearchContainer();
    $(PROF_USR_SRCH_NO_ASRS).show();
}

function showNoAssertionsFoundForOwnProfileWarning() {
    $(CASSUI_MAIN_BUSY_CTR).hide();
    $(CASSUI_MAIN_ERR_CTR).hide();
    $(CASSUI_MAIN_CONTENTS_CTR).hide();
    $(PROF_NO_ASRS_CTR).show();
}

//TODO implement goToDisplayRoot
function goToDisplayRoot() {
    if (hasFinishedLoading) {
        zoomExpCgByD3NodeId(profileUserName, true);
        //TODO goToDisplayRoot add go to list root
    }
}

function setProfileName(name) {
    $(PROFILE_NAME).html(name);
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
// List Screen Utility Functions
//**************************************************************************************************

// Toggle sorting items
$('#filter-options').on('click', 'li', function () {
    $('#filter-options li').removeClass('active');
    $(this).addClass('active');
});

// Expand or collapse list items and their children
$('#list-screen__root li').on('click', 'h3, h4, .fa-li', function (evt) {
    // keep click event from bubbling up through all nested lists items
    evt.stopPropagation();
    evt.preventDefault();

    // switch between classes: expanded and collapsed
    // switch out list icons for .fa-li items

    var obj = $(this).closest('li');
    var action = 'none';

    if (obj.hasClass('collapsed')) action = "expand";
    if (obj.hasClass('expanded')) action = "collapse";

    $("#profileSearchInput").val("");

    switch (action) {
        case 'expand':
            obj.removeClass('collapsed').addClass('expanded');
            obj.children('.title').children('.fa-li').removeClass('fa-caret-right').addClass('fa-caret-down');
            obj.children('ul').slideDown('fast');
            break;

        case 'collapse':
            obj.removeClass('expanded').addClass('collapsed');
            obj.children('.title').children('.fa-li').addClass('fa-caret-right').removeClass('fa-caret-down');
            obj.children('ul').slideUp('fast');

            break;

        default:
        // not expandable, do nothing.
    }
});

function setCompetencyListViewActions() {
    $('#list-screen__root li').on('click', 'h3, h4, .fa-li', function (evt) {
        // keep click event from bubbling up through all nested lists items
        evt.stopPropagation();
        evt.preventDefault();

        // switch between classes: expanded and collapsed
        // switch out list icons for .fa-li items

        var obj = $(this).closest('li');
        var action = 'none';

        if (obj.hasClass('collapsed')) action = "expand";
        if (obj.hasClass('expanded')) action = "collapse";

        $("#profileSearchInput").val("");

        switch (action) {
            case 'expand':
                obj.removeClass('collapsed').addClass('expanded');
                obj.children('.title').children('.fa-li').removeClass('fa-caret-right').addClass('fa-caret-down');
                obj.children('ul').slideDown('fast');
                break;

            case 'collapse':
                obj.removeClass('expanded').addClass('collapsed');
                obj.children('.title').children('.fa-li').addClass('fa-caret-right').removeClass('fa-caret-down');
                obj.children('ul').slideUp('fast');

                break;

            default:
            // not expandable, do nothing.
        }
    });
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
