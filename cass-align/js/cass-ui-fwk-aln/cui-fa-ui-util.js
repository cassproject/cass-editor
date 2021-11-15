//**************************************************************************************************
// CASS UI Framework Alignment UI Utility Functions
//**************************************************************************************************

//**************************************************************************************************
// Constants

const DEBUG_CONSOLE = true;
const DEBUG_ALERT = false;

// Alignment Card
const FWK_ALM_CARD_BUSY_IMG_SRC = "img/CASS-loading-64px.gif";
const FWK_ALM_CARD_BUSY_FINISHED_CLASS = "fa fa-check-circle busyFinished";
const FWK_ALM_CARD_BUSY_FADEOUT = 2000;

// Screens
const FWK_ALM_VIS_SCREEN_SIMPLE = "alignment-visualize-screen";
const FWK_ALM_VIS_SCREEN = "#" + FWK_ALM_VIS_SCREEN_SIMPLE;
const FWK_ALM_EDIT_SCREEN_SIMPLE = "alignment-edit-screen";
const FWK_ALM_EDIT_SCREEN = "#" + FWK_ALM_EDIT_SCREEN_SIMPLE;

// Color Themes
const FRAMEWORK_ALM_THEME_CLASS = "theme-burgendy";

// Various Page Element IDs and Classes
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

const SHOW_ALM_EDIT_VIEW_BTN = "#showAlmEditBtn";
const SHOW_ALM_VIS_VIEW_BTN = "#showAlmVisBtn";

const FWK_ALM_HDR_NAME1 = "#frameworkHeaderAlignmentName1";
const FWK_ALM_HDR_NAME2 = "#frameworkHeaderAlignmentName2";
const FWK_ALM_NAME1 = "#frameworkAlignmentName1";
const FWK_ALM_NAME2 = "#frameworkAlignmentName2";

const FWK_ALM_PAGE_TOOLS = "#page-tools";
const FWK_ALM_FULL_TOOLSET = "#fwkAlnFullToolset";
const FWK_ALM_OPEN_ONLY_TOOLSET = "#fwkAlnOpenFwkOnlyToolset";

const FWK_ALM_FW_FLT1 = "#frameworkAlignmentFwFilter1";
const FWK_ALM_FW_FLT2 = "#frameworkAlignmentFwFilter2";
const FWL_ALM_ALM_FLT = "#frameworkAlignmentAlignFilter";

const FWK_ALM_FW_LIST1 = "#frameworkAlignmentFwList1";
const FWK_ALM_FW_LIST2 = "#frameworkAlignmentFwList2";

const FWK_ALM_MAIN_GRID_CONTAINER = "#alignmentScreenMainGridContainer";
const FWK_ALM_CTR_COLUMN = "#alignment-center-column";
const FWK_ALM_HELP = "#alignment-help";


const FWK_ALM_NEW_CARD_HOOK = "#alignment-matches-container #alignment-NewMatchCard";

const FWK_ALM_LIST_FLTR_CLASS = "fwkAlmItemFilter";

const FWK_ALM_VIS_CG_MERGED_NO_DATA = "#almVisCgMergedNoData";
const FWK_ALM_VIS_CG_MERGED_DATA = "#almVisCgMergedData";
const FWK_ALM_VIS_CG_DIVIDED_CTR = "#almVisCgDividedContainer";
const FWK_ALM_VIS_CG_MERGED_CTR = "#almVisCgMergedContainer";

const FWK_ALM_VIS_CG_MERGED_FW1_TO_FW2_ALM_LIST_CTR = "#almVisCgMergedSidebarFw1ToFw2AlmListContainer";
const FWK_ALM_VIS_CG_MERGED_FW2_TO_FW1_ALM_LIST_CTR = "#almVisCgMergedSidebarFw2ToFw1AlmListContainer";
const FWK_ALM_VIS_CG_MERGED_FW1_TO_FW2_ALM_LIST = "#almVisCgMergedSidebarFw1ToFw2AlmList";
const FWK_ALM_VIS_CG_MERGED_FW2_TO_FW1_ALM_LIST = "#almVisCgMergedSidebarFw2ToFw1AlmList";
const FWK_ALM_VIS_CG_DIVIDED_NO_ALM_CTR = "#almVisCgDividedSidebarNoAlmContainer";
const FWK_ALM_VIS_CG_DIVIDED_COMP_DTLS_SB = "#almVisCgDividedCompDetailsSidebar";
const FWK_ALM_VIS_CG_DIVIDED_FW1_TO_FW2_ALM_LIST_CTR = "#almVisCgDividedSidebarFw1ToFw2AlmListContainer";
const FWK_ALM_VIS_CG_DIVIDED_FW2_TO_FW1_ALM_LIST_CTR = "#almVisCgDividedSidebarFw2ToFw1AlmListContainer";
const FWK_ALM_VIS_CG_DIVIDED_FW1_TO_FW2_ALM_LIST = "#almVisCgDividedSidebarFw1ToFw2AlmList";
const FWK_ALM_VIS_CG_DIVIDED_FW2_TO_FW1_ALM_LIST = "#almVisCgDividedSidebarFw2ToFw1AlmList";
const FWK_ALM_VIS_CG_FW1_ALM_LIST_HDR_CLS = ".almListHdrFw1";
const FWK_ALM_VIS_CG_FW2_ALM_LIST_HDR_CLS = ".almListHdrFw2";
const FWK_ALM_VIS_CG_MERG_ADH_ELEM_ID_PREFIX = "adh_alm_merg_";
const FWK_ALM_VIS_CG_DVD_ADH_ELEM_ID_PREFIX = "adh_alm_dvd_";
const FWK_ALM_VIS_CG_DVD_REL_PATH_ELEM_ID_PREFIX = "rel_path_alm_dvd_";
const FWK_ALM_VIS_CG_FW1_TXT_CLASS = "almCgSbFw1";
const FWK_ALM_VIS_CG_FW2_TXT_CLASS = "almCgSbFw2";
const FWK_ALM_VIS_CG_DVD_CDSB_NAME = "#almVisCgDividedCompDetailsSbName";
const FWK_ALM_VIS_CG_DVD_CDSB_DESC = "#almVisCgDividedCompDetailsSbDesc";
const FWK_ALM_VIS_CG_DVD_CDSB_NO_REL_CTR = "#almVisCgDividedCompDetailsSbNoAlmsCtr";
const FWK_ALM_VIS_CG_DVD_CDSB_REL_CTR = "#almVisCgDividedCompDetailsSbAlmsCtr";
const FWK_ALM_VIS_CG_DVD_CDSB_REL_LIST = "#almVisCgDividedCompDetailsSbAlmsList";

const FWK_ALM_MRG_VIS_MODE_SWITCH = "#mergFwkAlmShowUna";
const FWK_ALM_MRG_LABEL_SWITCH = "#mergFwkAlmShowLabel";

const FWK_ALM_VIS_CG_DIV_REL_PATH_CLASS = "dvdAlmCgRelPath";

// Viewbox Size Settings
const FWK_ALM_VIS_CG_DIV_STANDARD_VIEWBOX = "0 70 500 500";
const FWK_ALM_VIS_CG_DIV_OFFSET_VIEWBOX = "0 40 500 500";
const FWK_ALM_VIS_CG_DIV_SMALL_OFFSET_VIEWBOX = "0 50 500 500";
const FWK_ALM_VIS_CG_DIV_LARGE_OFFSET_VIEWBOX = "0 20 500 500";

// const MANY_ALIGNS
// const FWK_ALM_VIS_CG_DIV_MANY_ALIGNS_OFFSET_VIEWBOX = "0 220 500 500";

const FWK_ALM_VIS_CG_DIV_SMALL_OFFSET_MIN_MUTLI = 2.5;
const FWK_ALM_VIS_CG_DIV_SMALL_OFFSET_MAX = 60;
const FWK_ALM_VIS_CG_DIV_OFFSET_MIN_MUTLI = 7;
const FWK_ALM_VIS_CG_DIV_OFFSET_MAX = 80;
const FWK_ALM_VIS_CG_DIV_LARGE_OFFSET_MIN = 30;
const FWK_ALM_VIS_CG_DIV_LARGE_OFFSET_MAX = 500;

// Relationship 'Arrow' Path Settings (curvature)
const FWK_ALM_VIS_CG_SVG_PATH_HANDLE_X_MULTIPLIER = .33;
const FWK_ALM_VIS_CG_SVG_PATH_HANDLE_Y_MULTIPLIER = 2;

// Framework Align Setup Modal
const FWK_ALM_SETUP_MODAL = "#modal-alignment-setup";
const FWL_ALM_FW1 = "#fwAlmFw1";
const FWL_ALM_FW2 = "#fwAlmFw2";

// Alignment Card Delete Modal
const FWK_ALM_DELETE_CARD_CONFIRM_MODAL = "#modal-alignment-delete-confirm";
const FWK_ALM_DELETE_CARD_CONFRIM_CARD_ID = "#fwkAlmDeleteConfirmCardId";

// Invalid Alignment Modal
const FWK_ALM_INVALID_ALM_WARNING_MODAL = "#modal-alignment-invalid-state-warning";

// Auto Alignment Modal
const FWK_ALM_AUTO_ALM_MODAL = "#modal-alignment-auto";
const FWK_ALM_AUTO_ALM_CONFIRM_CTR = "#fwkAlmAutoAlmConfirmContainer";
const FWK_ALM_AUTO_ALM_RESULTS_CTR = "#fwkAlmAutoAlmResultsContainer";
const FWK_ALM_AUTO_ALM_CONFIRM_BTNS_CTR = "#fwkAlmAutoAlmConfirmBtns";
const FWK_ALM_AUTO_ALM_FW1_NAME = "#fwkAlmAutoAlmFwk1Name";
const FWK_ALM_AUTO_ALM_FW2_NAME = "#fwkAlmAutoAlmFwk2Name";
const FWK_ALM_AUTO_ALM_RESULTS_EMPTY_CTR = "#fwkAlmAutoAlmResultsEmpty";
const FWK_ALM_AUTO_ALM_RESULTS_DISPLAY_CTR = "#fwkAlmAutoAlmResultsDisplay";
const FWK_ALM_AUTO_ALM_RESULTS_LIST_SIMP = "fwkAlmAutoAlmResultsList";
const FWK_ALM_AUTO_ALM_RESULTS_LIST = "#" + FWK_ALM_AUTO_ALM_RESULTS_LIST_SIMP;
const FWK_ALM_AUTO_ALM_RESULTS_BTN_CTR = "#fwkAlmAutoAlmResultsBtnsContainer";
const FWK_ALM_AUTO_ALM_NUM_SEL = "#fwkAlmAutoAlmNumSelected";
const FWK_ALM_AUTO_ALM_NUM_SUG = "#fwkAlmAutoAlmNumSuggestions";
const FWK_ALM_AUTO_ALM_FW1_LST_HDR = "#fwkAlmAutoAlmFwk1ListHdr";
const FWK_ALM_AUTO_ALM_FW2_LST_HDR = "#fwkAlmAutoAlmFwk2ListHdr";
const FWK_ALM_AUTO_ALM_SUG_SEL_CB_PREFIX = "fwk_auto_alm_sug_sel_";

//**************************************************************************************************
// Variables
var currentScreen;
var middleAlignmentColumnShown = false;

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
    showOnlyOpenAlignTool();
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
// Framework Alignment Page UI Functions
//**************************************************************************************************

function setPageColorTheme() {
    debugMessage("setPageColorTheme");
    $('body').addClass(FRAMEWORK_ALM_THEME_CLASS);
}

function showOnlyOpenAlignTool() {
    $(FWK_ALM_FULL_TOOLSET).hide();
    $(FWK_ALM_OPEN_ONLY_TOOLSET).show();
    $(FWK_ALM_PAGE_TOOLS).show();
}

function showAllFrameworkAlignmentTools() {
    $(FWK_ALM_OPEN_ONLY_TOOLSET).hide();
    $(FWK_ALM_FULL_TOOLSET).show();
    $(FWK_ALM_PAGE_TOOLS).show();
}

function hideFrameworkAlignmentTools() {
    $(FWK_ALM_PAGE_TOOLS).hide();
}

function showVisualViewMainContentsScreen() {
    showPageMainContentsContainer();
    showScreen(FWK_ALM_VIS_SCREEN_SIMPLE);
    currentScreen = FWK_ALM_VIS_SCREEN_SIMPLE;
}

function showEditViewMainContentsScreen() {
    showPageMainContentsContainer();
    showScreen(FWK_ALM_EDIT_SCREEN_SIMPLE);
    currentScreen = FWK_ALM_EDIT_SCREEN_SIMPLE;
}

function disableViewToggleButtons() {
    $(SHOW_ALM_EDIT_VIEW_BTN).attr("disabled", "true");
    $(SHOW_ALM_VIS_VIEW_BTN).attr("disabled", "true");
}

function enableViewToggleButtons() {
    $(SHOW_ALM_EDIT_VIEW_BTN).removeAttr("disabled");
    $(SHOW_ALM_VIS_VIEW_BTN).removeAttr("disabled");
}

function setFrameworkAlignmentNames(fw1Name,fw2Name,fw1Id,fw2Id) {
    $(FWK_ALM_HDR_NAME1).html(fw1Name);
    $(FWK_ALM_HDR_NAME2).html(fw2Name);
    $(FWK_ALM_NAME1).html(fw1Name);
    $(FWK_ALM_NAME2).html(fw2Name);
    if (fw1Id && fw1Id.trim().length > 0 && fw2Id && fw2Id.trim().length > 0) {
        $(FWK_ALM_HDR_NAME1).attr("title","Explore '" + escapeSingleQuote(fw1Name) + "'");
        $(FWK_ALM_HDR_NAME1).attr("onclick","openFrameworkExplorer('" + fw1Id + "')");
        $(FWK_ALM_HDR_NAME2).attr("title","Explore '" + escapeSingleQuote(fw2Name) + "'");
        $(FWK_ALM_HDR_NAME2).attr("onclick","openFrameworkExplorer('" + fw2Id + "')");
    }
}

function clearAlignmentEditorFilters() {
    $(FWK_ALM_FW_FLT1).val("");
    $(FWK_ALM_FW_FLT2).val("");
    $(FWL_ALM_ALM_FLT).val("");
}

function showAlignmentEditViewMainContentsScreenInstant() {
    showPageMainContentsContainer();
    $('.screen:visible').hide();
    $(FWK_ALM_EDIT_SCREEN).show();
    currentScreen = FWK_ALM_EDIT_SCREEN_SIMPLE;
}

function showAlignmentVisViewMainContentsScreenInstant() {
    showPageMainContentsContainer();
    $('.screen:visible').hide();
    $(FWK_ALM_VIS_SCREEN).show();
    currentScreen = FWK_ALM_VIS_SCREEN_SIMPLE;
}

function showEditorCenterColumn() {
    if (!middleAlignmentColumnShown) {
        $(FWK_ALM_CTR_COLUMN).removeClass('hide');
        $(FWK_ALM_MAIN_GRID_CONTAINER).addClass('full');
        $(FWK_ALM_HELP).hide();
        middleAlignmentColumnShown = true;
    }
}

function hideEditorCenterColumn() {
    $(FWK_ALM_CTR_COLUMN).addClass('hide');
    $(FWK_ALM_MAIN_GRID_CONTAINER).removeClass('full');
    $(FWK_ALM_HELP).show();
    middleAlignmentColumnShown = false;
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
// Alignment Editing Helpers and Controls
//**************************************************************************************************

$(document).bind('click', function(e) {
    checkForCloseRelationMenu(e);
});

function checkForCloseRelationMenu(e) {
    if (e.target) {
        var jet = $(e.target);
        if (!(jet.hasClass("relationship-menu") || jet.hasClass("relationship-menu-background") || jet.hasClass("relationship-menu-label") || jet.hasClass("relationship-choice"))) {
            $(".relationship-menu").removeClass('active');
        }
    }
}

function unHighlightAllAlignmentListItems() {
    $(".align-competency-title").removeClass("selected");
}

function unselectAllAlignmentEditorCards() {
    $(".relationship-menu").removeClass('active');
    //$('#alignment-left-column .selected, #alignment-right-column .selected').addClass('aligned').removeClass('selected');
    $('#alignment-matches-container .selected').removeClass('selected');
    $('#alignment-matches-container').find('.removeAlignmentComp').addClass("hide");
    $('.alignment-match-options').slideUp('fast');
    unHighlightAllAlignmentListItems();
}

function registerEditorListToggles() {
    // toggle display of list view children
    $('#frameworkAlignmentFwList1 li i.fa, #frameworkAlignmentFwList2 li i.fa').on('click', function (e) {
        if ($(this).hasClass('fa-chevron-down')) {
            // collapse list branch
            $(this).removeClass('fa-chevron-down').addClass('fa-chevron-right');
            $(this).parent('li').children('ul').slideUp('fast');
            checkForCloseRelationMenu(e);
            e.stopPropagation();

        } else if ($(this).hasClass('fa-chevron-right')) {
            // expand list branch
            $(this).removeClass('fa-chevron-right').addClass('fa-chevron-down');
            //$(this).parentsUntil('li').removeClass('collapsed');
            $(this).parent('li').children('ul').slideDown('fast');
            checkForCloseRelationMenu(e);
            e.stopPropagation();
        }
    });
}

// Change relationship via radial menu selection
$('#alignment-center-column').on('click', '.callout.selected .relationship-menu-button', function (e) {
    $(this).closest('.relationship-menu').toggleClass('active');
    $(this).children('.relationship-choice').finish();
    var relationshipChoices = $(this).children('.relationship-choice').toArray();
    var count = relationshipChoices.length;
    var increase = Math.PI * 2 / relationshipChoices.length;
    var radius = 70;

    // Animate and set up menu choices
    $(this).children('.relationship-choice').each(function (i) {
        // Animate choices out from center
        $(this)
            .css({
                top: 0,
                left: 0,
                opacity: 0
            })
            .animate({
                top: Math.sin(-Math.PI / 2 + i * increase) * radius + 'px',
                left: Math.cos(-Math.PI / 2 + i * increase) * radius + 'px',
                opacity: 1
            }, 300);

        // mouseover shows text label. MouseOut shows X icon (fa-times)
        $(this).hover(function () {
            var rolloverText = $(this).data('label-text');
            $(this).siblings('.relationship-menu-label').text(rolloverText);
        }, function () {
            $(this).siblings('.relationship-menu-label').html('<i class="fa fa-times" aria-hidden="true"></i>');
        });

        $(this).off('click');

        $(this).on('click', function (e) {
            // animate selected choice, fade out others.
            $(this)
                .addClass('selected')
                .animate({
                    top: 0,
                    left: 0,
                    opacity: 0
                }, 200, function () {
                    $('.relationship-menu').removeClass('active');
                    $('.relationship-choice').removeClass('selected').finish();
                    $(this).siblings().finish();
                    var newIcon = "icon-" + $(this).data('type');
                    $(this).parents('.relationship-menu-button').attr('class', 'relationship-menu-button');
                    $(this).parents('.relationship-menu-button').addClass(newIcon);
                    if (typeof changeAlignmentCardRelationship === 'function') changeAlignmentCardRelationship($(this).data('alm-card-id'),$(this).data('type'));
                });

            $(this).siblings('.relationship-choice:not(.selected)').animate({
                opacity: 0
            }, 100);

            e.stopPropagation();
        });
    });
    e.stopPropagation();
});

$('#alignment-matches-container').on('click', '.callout:not(#alignment-NewMatchCard)', function () {
    if ($(this).hasClass('selected')) {
        // do nothing
    }
    else {
        unselectAllAlignmentEditorCards();
        var cardId = $(this).attr("id");
        if (typeof setCurrentAlignmentCard === 'function') setCurrentAlignmentCard(cardId);
        $(this).addClass('selected');
        $(this).find('.removeAlignmentComp').removeClass("hide");
        $(this).find('.alignment-match-options').slideDown('fast');
    }
});

//**************************************************************************************************
// Foundation
//**************************************************************************************************

$(document).foundation();
