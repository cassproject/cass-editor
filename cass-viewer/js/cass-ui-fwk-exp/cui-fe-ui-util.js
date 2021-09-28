//**************************************************************************************************
// CASS UI Framework Explorer UI Utility Functions
//**************************************************************************************************

//**************************************************************************************************
// Constants

const DEBUG_CONSOLE = true;
const DEBUG_ALERT = false;

const DEFAULT_FRAMEWORK_DESCRIPTION = "The following related elements were found for this competency: ";

const LIST_VIEW_SCROLL_ITEM_OFFSET = 220;

// Screens
const GRAPH_SCREEN_SIMPLE = "graph-screen";
const GRAPH_SCREEN = "#" + GRAPH_SCREEN_SIMPLE;
const LIST_SCREEN_SIMPLE = "list-screen";
const LIST_SCREEN = "#" + LIST_SCREEN_SIMPLE;

// Color Themes
const FRAMEWORK_EXP_THEME_CLASS = "theme-burgendy";
const EXP_CIR_COLOR_RANGE = "burgendy";

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

const SHOW_GRAPH_VIEW_BTN = "#showGraphViewBtn";
const SHOW_LIST_VIEW_BTN = "#showListViewBtn";

const FRAMEWORK_EXP_NAME = "#frameworkExplorerName";

const FWK_CONT_SRCH_CTR = "#frameworkContentsSearchContainer";
const FWK_CONT_SRCH_INPT = "#frameworkContentsSearchInput";

const FWK_CONTENTS_LIST = "#list-screen__root";

const FWK_EXP_PAGE_TOOLS = "#page-tools";
const FWK_EXP_SHARE_TOOL = "#fwkExpShareTool";
const FWK_EXP_PUB_TOOL = "#fwkExpPublishTool";
const FWK_EXP_FULL_TOOLSET = "#fwkExpFullToolset";
const FWK_EXP_OPEN_ONLY_TOOLSET = "#fwkExpOpenFwkOnlyToolset";

//Circle Focus Detail Summary (left-hand side)/ Sidebar (right-hand side)  Items
const CIR_FCS_DTL_CTR = "#circleFocusDetailsSidebar";
const CIR_FCS_DTL_REL_LIST = "#circleFocusDetailsRelList";
const CIR_FCS_DTL_SING_NAME = "#circleFocusDetailsSingleName";
const CIR_FCS_DTL_SING_DESC = "#circleFocusDetailsSingleDesc";
const CIR_FCS_COMP_TOOLS = "#circleFocusCompTools";
const CIR_FCS_DTL_COMP_DTL_LINK = "#circleFocusCompDetailsLink";

const CIR_FCS_SUM_DESC = "#circleFocusSummaryDesc";
const CIR_FCS_SUM_LIST_CTR = "#circleFocusSummaryListContainer";

const CIR_FCS_SUM_ITEM_CLASS_ID = "gpsi";
const CIR_FCS_SUM_ITEM_TOGGLE_CLASS_ID = "gpsiToggle";
const CIR_FCS_SUM_ITEM_ROOT_COMP_CLASS = "gpsiRootComp";
const CIR_FCS_SUM_ITEM_NON_ROOT_COMP_CLASS = "gpsiNonRootComp";


const FWK_REL_FWK_LIST_CTR = "#circleFocusRelatedFwListContainer";
const FWK_REL_FWK_LIST = "#circleFocusRelatedFwList";

//Warning Containers
const NO_FRAMEWORKS_AVAILABLE_CTR = "#noFrameworksAvailableWarningContainer";
const CIRC_DEPEND_WARNING_CTR = "#circularDependencyWarningContainer";

// Modals
// Open Framework Modal
const OPEN_FWK_MODAL = "#modal-open-framework";
const OPEN_FWK_SRCH_INPT = "#openFrameworkSearchInput";

// Competency Info Modal
const COMP_DTL_MODAL = "#modal-competency-info";
const COMP_DTL_NAME = "#compDetCompName";
const COMP_DTL_DESC = "#compDetCompDesc";
const COMP_DTL_COMP_LINK = "#compDetCompLink";
const COMP_DTL_FRM_LINK = "#compDetFrameworkLink";
const COMP_DTL_SAVE_BTN = "#fwkExpCompInfoSaveBtn";

// Framework Share Modal
const FWK_SHARE_MODAL = "#modal-framework-share";
const FWK_SHARE_FWK_NAME = "#fwkShareFwkName";
const FWK_SHARE_SAVE_BTN = "#fwkShareSaveBtn";
const FWK_SHARE_NO_CONT_CTR = "#fwkShareNoContactsContainer";
const FWK_SHARE_CONT_LIST_HDR_CTR = "#fwkShareContactsListHdrContainer";
const FWK_SHARE_CONT_LIST_CTR = "#fwkShareContactsListContainer";
const FWK_SHARE_CONT_LIST = "#fwkShareContactsList";
const FWK_SHARE_CONT_VW_CB_ID_PREFIX = "fwk_share_cont_vw_";
const FWK_SHARE_CONT_ED_CB_ID_PREFIX = "fwk_share_cont_ed_";

// Framework Publish Modal
const FWK_PUBLISH_MODAL = "#modal-framework-publish";
const FWK_PUBLISH_FWK_NAME = "#fwkPublishFwkName";
const FWK_PUBLISH_DEST = "#fwkPublishDestination";

// Framework Align Setup Modal
const FWK_ALM_SETUP_MODAL = "#modal-alignment-setup";
const FWL_ALM_FW1 = "#fwAlmFw1";
const FWL_ALM_FW2 = "#fwAlmFw2";

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
    console.error(text);
    $(CASSUI_MAIN_BUSY_CTR).hide();
    $(CASSUI_HIGH_LVL_WARNING).hide();
    hidePageMainContentsContainer();
    $(CASSUI_MAIN_ERR_TXT).html(text);
    $(CASSUI_MAIN_ERR_CTR).show();
    disableViewToggleButtons();
    showOnlyOpenFrameworkTool();
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

//**************************************************************************************************
// Framework Explorer Page UI Functions
//**************************************************************************************************

function setPageColorTheme() {
    $('body').addClass(FRAMEWORK_EXP_THEME_CLASS);
}

function showOnlyOpenFrameworkTool() {
    $(FWK_EXP_FULL_TOOLSET).hide();
    $(FWK_EXP_OPEN_ONLY_TOOLSET).show();
    $(FWK_EXP_PAGE_TOOLS).show();
}

function hideFrameworkExpTools() {
    $(FWK_EXP_PAGE_TOOLS).hide();
}

function setUpAndShowFrameworkExpTools() {
    if (currentFrameworkFull.hasOwner(loggedInPk)) {
        $(FWK_EXP_SHARE_TOOL).show();
        $(FWK_EXP_PUB_TOOL).show();
    }
    else {
        $(FWK_EXP_SHARE_TOOL).hide();
        $(FWK_EXP_PUB_TOOL).hide();
    }
    $(FWK_EXP_OPEN_ONLY_TOOLSET).hide();
    $(FWK_EXP_FULL_TOOLSET).show();
    $(FWK_EXP_PAGE_TOOLS).show();
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

function showCircleSidebarDetails() {
    $(CIR_FCS_DTL_CTR).removeClass("hide");
}

function hideCircleSidebarDetails() {
    $(CIR_FCS_DTL_CTR).addClass("hide");
}

function disableViewToggleButtons() {
    $(SHOW_GRAPH_VIEW_BTN).attr("disabled", "true");
    $(SHOW_LIST_VIEW_BTN).attr("disabled", "true");
}

function enableViewToggleButtons() {
    $(SHOW_GRAPH_VIEW_BTN).removeAttr("disabled");
    $(SHOW_LIST_VIEW_BTN).removeAttr("disabled");
}

function hideFrameworkContentsSearchBar() {
    $(FWK_CONT_SRCH_CTR).hide();
}

function showFrameworkContentsSearchBar() {
    $(FWK_CONT_SRCH_CTR).show();
}

function clearFrameworkContentsSearchBar() {
    $(FWK_CONT_SRCH_INPT).val("");
}

function clearOpenFrameworkSearchBar() {
    $(OPEN_FWK_SRCH_INPT).val("");
}

function clearAllSearchBars() {
    clearOpenFrameworkSearchBar();
    clearFrameworkContentsSearchBar();
}

function setPageFrameworkExplorerName(name) {
    $(FRAMEWORK_EXP_NAME).html(name);
}

function showNoFrameworksAvailableWarning() {
    $(CASSUI_MAIN_BUSY_CTR).hide();
    $(CASSUI_MAIN_ERR_CTR).hide();
    $(CASSUI_HIGH_LVL_WARNING).hide();
    setPageFrameworkExplorerName("No frameworks available");
    $(NO_FRAMEWORKS_AVAILABLE_CTR).show();
    showOnlyOpenFrameworkTool();
}

function showFrameworkHasCircularDependencyWarning() {
    $(CASSUI_MAIN_BUSY_CTR).hide();
    $(CASSUI_MAIN_ERR_CTR).hide();
    $(CASSUI_HIGH_LVL_WARNING).hide();
    $(CIRC_DEPEND_WARNING_CTR).show();
    showOnlyOpenFrameworkTool();
}

function goToDisplayRoot() {
    if (hasFinishedLoading) {
        //Node ID for a framework is its name..since that is the only node with a name ID, it should be fine...
        zoomExpCgByD3NodeId(currentFrameworkName, true);
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
