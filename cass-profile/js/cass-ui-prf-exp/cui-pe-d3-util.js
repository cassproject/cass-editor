//**************************************************************************************************
// CASS UI Framework Explorer D3 Utility Functions
//**************************************************************************************************

// TODO fix zooming behavior when clicking on text instead of circle

//**************************************************************************************************
// Constants

const EXP_CIRCLE_PACK = "#explorerCirclePack";
const EXP_CIRCLE_PACK_PADDING = 10;
const EXP_CIRCLE_TEXT_LIMIT = 22;
const EXP_CIRCLE_CLASS_PREFIX = "exp_cg_c_";

// Orange = Frameworks
//.range(["rgba(206, 108, 24,0)", "rgba(206, 108, 24,1)"])

// Blue = Competencies & Profile
//.range(["rgba(19,116,153,0)", "rgba(19,116,153,1)"])

// Green
//.range(["rgba(156, 213, 92,0)", "rgba(156, 213, 92,1)"])


/*******************************************************
 Each color section has a 0 - 3 range,
 represented by -1 - 2 in the functions which update. 0 is the background,
 the three other colors cycle through depending on deptch.
 ********************************************************/
/* burgendy pallette contrast reduced 35% */
const BURGENDY_RANGE_0 = "rgba(179,106,121,0)";
const BURGENDY_RANGE_2 = "rgba(151,83,95,1)";
const BURGENDY_RANGE_3 = "rgba(168,128,132,1)";
const BURGENDY_RANGE_1 = "rgba(102,42,54,1)";

/* teal pallette contrast reduced 35% */
const TEAL_RANGE_0 = "rgba(76,193,187,0)";
const TEAL_RANGE_2 = "rgba(58,138,132,1)";
const TEAL_RANGE_3 = "rgba(101,147,148,1)";
const TEAL_RANGE_1 = "rgba(20,63,60,1)";

/* blue pallette, contrast reduced 35% */
const BLUE_RANGE_0 = "rgba(19,109,145, 0)";
const BLUE_RANGE_2 = "rgba(19,109,145, 1)";
const BLUE_RANGE_3 = "rgba(149,190,210, 1)";
const BLUE_RANGE_1 = "rgba(13,78,103,1)"

/* blue pallette, contrast reduced 35% */
const ORANGE_RANGE_0 = "rgba(219,143,98,0)";
const ORANGE_RANGE_2 = "rgba(219,143,98, 1)";
const ORANGE_RANGE_3 = "rgba(227,174,140,1)";
const ORANGE_RANGE_1 = "rgba(199,96,40,1)";

//**************************************************************************************************
// Variables

var competencySearchAutoCompleteMap;

var expSvg = d3.select(EXP_CIRCLE_PACK);
var expCgMargin = 0;
var expCgDiameter = +expSvg.attr("width");
var expCirclePackGraph =   expSvg;

expCirclePackGraph.append("g").attr("transform", "translate(" + expCgDiameter / 2 + "," + expCgDiameter / 2 + ")");
expCirclePackGraph.append("defs");


var expCgView;
var expCgNode;
var expCgCircle;


var expCgColor = d3.scaleQuantize()
    .domain([-1, 2])
    .range(
        [
            getExpColorRangeParm0(),
            getExpColorRangeParm1(),
            getExpColorRangeParm2(),
            getExpColorRangeParm3()
        ]
    );

var expCgPack = d3.pack()
    .size([expCgDiameter - expCgMargin, expCgDiameter - expCgMargin])
    .padding(EXP_CIRCLE_PACK_PADDING);

//**************************************************************************************************
// Graph Functions (For Explorer Circles (Framework and eventually profile))
//**************************************************************************************************

function getExpColorRangeParm0() {
    if (!EXP_CIR_COLOR_RANGE || EXP_CIR_COLOR_RANGE.toLowerCase() == "blue") return BLUE_RANGE_0;
    else if (EXP_CIR_COLOR_RANGE.toLowerCase() == "burgendy") return BURGENDY_RANGE_0;
    else if (EXP_CIR_COLOR_RANGE.toLowerCase() == "green") return TEAL_RANGE_0;
    else return BLUE_RANGE_0;
}

function getExpColorRangeParm1() {
    if (!EXP_CIR_COLOR_RANGE || EXP_CIR_COLOR_RANGE.toLowerCase() == "blue") return BLUE_RANGE_1;
    else if (EXP_CIR_COLOR_RANGE.toLowerCase() == "burgendy") return BURGENDY_RANGE_1;
    else if (EXP_CIR_COLOR_RANGE.toLowerCase() == "green") return TEAL_RANGE_1;
    else return BLUE_RANGE_1;
}

function getExpColorRangeParm2() {
    if (!EXP_CIR_COLOR_RANGE || EXP_CIR_COLOR_RANGE.toLowerCase() == "blue") return BLUE_RANGE_2;
    else if (EXP_CIR_COLOR_RANGE.toLowerCase() == "burgendy") return BURGENDY_RANGE_2;
    else if (EXP_CIR_COLOR_RANGE.toLowerCase() == "green") return TEAL_RANGE_2;
    else return BLUE_RANGE_2;
}
function getExpColorRangeParm3() {
    if (!EXP_CIR_COLOR_RANGE || EXP_CIR_COLOR_RANGE.toLowerCase() == "blue") return BLUE_RANGE_3;
    else if (EXP_CIR_COLOR_RANGE.toLowerCase() == "burgendy") return BURGENDY_RANGE_3;
    else if (EXP_CIR_COLOR_RANGE.toLowerCase() == "green") return TEAL_RANGE_3;
    else return BLUE_RANGE_3;
}

function removeAllExpCgCircleInvalidClasses() {
    $(".expCircleGraph .node").removeClass("invalid");
}

function clearFrameworkExpCircleSvg() {
    var svg2 = d3.select(EXP_CIRCLE_PACK);
    svg2.selectAll("*").remove();
    expCirclePackGraph = svg2.append("g").attr("transform", "translate(" + expCgDiameter / 2 + "," + expCgDiameter / 2 + ")");
}

function zoomExpCircleGraphByAutoComplete(selectedValue) {
    if (!selectedValue || selectedValue == null) {
        return;
    }
    var d3Node = competencySearchAutoCompleteMap[selectedValue];
    if (d3Node && d3Node.data && d3Node.data.name) {
        zoomExpCgByD3NodeId(d3Node.data.name, false);
    }
}

function addExpD3NodeToAutoCompleteMap(d3Node, cd3t) {
    if (cd3t.isFramework) {
        competencySearchAutoCompleteMap[getFrameworkName(cd3t.frameworkId)] = d3Node;
    }
    else {
        var cnp = null;
        if (typeof getCassNodePacket === 'function') cnp = getCassNodePacket(cd3t.id);
        if (!cnp || cnp == null) debugMessage("Cannot locate cass node packet for: " + cd3t.id);
        else {
            if (!cnp.getNodeList() || cnp.getNodeList().length == 0) return;
            var nl = cnp.getNodeList();
            $(nl).each(function (i, n) {
                if (n.name && n.name.trim().length > 0) {
                    competencySearchAutoCompleteMap[n.name.trim()] = d3Node;
                }
            });
        }
    }
}

function registerExpD3DetailNodes(nodes) {
    competencySearchAutoCompleteMap = {};
    $(nodes).each(function (i, n) {
        var compId = n.data.name;
        var cd3t = null;
        if (typeof getCompetencyD3NodeTracker === 'function') cd3t = getCompetencyD3NodeTracker(compId);
        if (!cd3t || cd3t == null) debugMessage("Could not locate tracker for: " + compId);
        else {
            cd3t.d3Node = n;
            addExpD3NodeToAutoCompleteMap(n, cd3t);
        }
    });
}

function isExpD3LeafNode(d3Node) {
    if (!d3Node || !d3Node.children || d3Node.children.length == 0) return true;
    return false;
}

function zoomExpCgByD3NodeId(d3NodeId, clearSearch) {
    if (clearSearch) {
        if (typeof clearAllSearchBars === 'function') clearAllSearchBars();
    }
    if (!d3NodeId || d3NodeId == null) return;
    var compId = d3NodeId.trim();
    var cd3t = null;
    if (typeof getCompetencyD3NodeTracker === 'function') cd3t = getCompetencyD3NodeTracker(compId);
    if (!cd3t || cd3t == null) debugMessage("Cannot locate competency D3 tracker for: " + compId);
    else {
        if (!isExpD3LeafNode(cd3t.d3Node)) {
            zoomExpCg(cd3t.d3Node);
        }
        else {
            if (cd3t.d3Node.parent) zoomExpCg(cd3t.d3Node.parent);
        }
        if (typeof showCircleGraphSidebarDetails === 'function') showCircleGraphSidebarDetails(compId);
        else debugMessage("Cannot find function 'showCircleGraphSidebarDetails'...ignoring");
    }
}

function zoomExpCg(d) {
    var focus0 = focus;
    focus = d;
    var transition = d3.transition()
        .duration(d3.event ? d3.event.altKey ? 7500 : 750 : 750)
        .tween("zoom", function (d) {
            var i = d3.interpolateZoom(expCgView, [focus.x, focus.y, focus.r * 2 + expCgMargin]);
            return function (t) {
                zoomExpCgTo(i(t));
            };
        });
    transition.selectAll("text")
        .filter(function (d) {
            return d.parent === focus || this.style.display === "inline";
        })
        .style("fill-opacity", function (d) {
            return d.parent === focus ? 1 : 0;
        })
        .on("start", function (d) {
            if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
            if (d.parent !== focus) this.style.display = "none";
        });
}

function zoomExpCgTo(v) {
    var k = expCgDiameter / v[2];
    expCgView = v;
    expCgNode.attr("transform", function (d) {
        return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
    });
    expCgCircle.attr("r", function (d) {
        return d.r * k;
    });
}

function truncCircleText(str,textLimit) {
    if (str.length > textLimit) {
        return str.substring(0, textLimit) + "...";
    } else {
        return str;
    }
}

function cleanCircleText(str,textLimit) {
    var retStr = str.trim();
    retStr = truncCircleText(retStr,textLimit);
    return retStr;
}

function generateExpCgCircleExtendedClass(compId) {
    if (compId) return buildIDableString(EXP_CIRCLE_CLASS_PREFIX + compId);
    else return null;
}

/******************************************************************
 Build presentable array of words, first splice all words in title into separate string array elements, combine small words with smallest neighbor and return.
 *******************************************************************/
function getDisplayTitle(d, text) {
    var text = text;
    var cleanWords = text.text().replace(/-/g, " - ").replace(/\//g, " / ").replace(/ +/g," ");
    var wordAttempt = cleanWords.split(/ (?=[A-Za-z-\/])/g);
    var lastLength = 0;
    while (wordAttempt.length != lastLength) {
        var maxLength = 0;
        lastLength = wordAttempt.length;
        for (var i = 0; i < wordAttempt.length; i++)
            maxLength = Math.max(wordAttempt[i].length, maxLength);
        for (var i = 1; i < wordAttempt.length; i++)
            if (wordAttempt[i].length <= 2 || wordAttempt[i - 1].length + wordAttempt[i].length < maxLength) {
                wordAttempt[i - 1] = wordAttempt[i - 1] + " " + wordAttempt[i];
                wordAttempt.splice(i, 1);
            }
    }
    try {
        if (wordAttempt.length > 4) {
            wordAttempt.splice(4, wordAttempt.length - 4);
            wordAttempt[wordAttempt.length-1] += "...";
        }
        return createDisplayTitleSpans(wordAttempt.reverse(), text, d);
    }catch(ex){
        console.error(ex);
        throw ex;
    }
}

/******************************************************************
 Build tspan filled with svg text based on ourput display title
 array.
 *******************************************************************/
function createDisplayTitleSpans(words, text, d) {
    var word;
    var line = [];
    var lineNumber = 0;
    var lineHeight = .9; // ems
    var y = 0;
    var dy = 0;
    var textY = (words.length * lineHeight)/2;
    var tspan = text.text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("dy", dy +"em")
    while (word = words.pop()) {
        line.push(word);
        lineNumber++;
        dy = lineHeight * lineNumber - textY;
        tspan = text
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", dy + "em")
            .text(word);
    }
}

function truncCircleText(str,textLimit) {
    return str;
}

function cleanCircleText(str,textLimit) {
    var retStr = str;
    return retStr;
}

function buildExpGraphCircles(error, root) {

    if (error) throw error;

    root = d3.hierarchy(root)
        .sum(function (d) {
            return d.size;
        })
        .sort(function (a, b) {
            return b.value - a.value;
        });

    var focus = root;
    var nodes = expCgPack(root).descendants();

    registerExpD3DetailNodes(nodes);


    /************************************
     drop shadow filter details
     needed here to apply to expCgCircl
     ************************************/
    var filter = expCirclePackGraph.append("defs:filter")
        .attr("id", "drop-shadow")
        .attr("height", "120%")
        .attr("x", "-10%")
        .attr("y", "-10%")
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 1)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", .5)
        .attr("dy", .5)
        .attr("result", "offsetBlur");  
    var feComponentTransfer = filter.append("feComponentTransfer")
      .attr("in", "offsetBlur")
      .attr("result", "linearSlope");
      feComponentTransfer.append("feFuncA")
          .attr("type", "linear")
          .attr("slope", "0.6");

    //important for opacity reduction on filter
    // important for allowing manipulation of hover
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "linearSlope")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");


  
  
    expCgCircle = expCirclePackGraph.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function (d) {
            var classPrefix = d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
            var classSuffix = "";
            if (d && d.data && d.data.name) classSuffix =  " " + generateExpCgCircleExtendedClass(d.data.name);
            return classPrefix + classSuffix;
        })
        .style("fill", function (d) {
            return d ? expCgColor(d.depth%3) : null;
        })
        .on("click", function (d) {
            if (typeof clearAllSearchBars === 'function') clearAllSearchBars();
            if (d.children) zoomExpCg(d);
            else if (d.parent) zoomExpCg(d.parent);
            if (d.data) {
                if (typeof showCircleGraphSidebarDetails === 'function') showCircleGraphSidebarDetails(d.data.name);
                else debugMessage("Cannot find function 'showCircleGraphSidebarDetails'...ignoring");
            } else(debugMessage("Circle click: d.data is null"));
            d3.event.stopPropagation();
        });


    var text = expCirclePackGraph.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill-opacity", function (d) {
            return d.parent === root ? 1 : 0;
        })
        .style("display", function (d) {
            return d.parent === root ? "inline" : "none";
        })
        .text(function (d) {
            if (typeof getExplorerCgCircleText === 'function') {
                var circleText = getExplorerCgCircleText(d);
                return circleText;
            }
            else return "UNDEFINED getFrameworkExpCgCircleText";
        })
        .attr("name", function (d) {
            if (typeof getExplorerCgCircleText === 'function') {
                var circleText = getExplorerCgCircleText(d);
                return circleText;
            }
            else return "UNDEFINED getFrameworkExpCgCircleText";
        }).each(function(d) {
            var text = d3.select(this);
            getDisplayTitle(d, text);
        });

    expCgNode = expCirclePackGraph.selectAll("circle,text,wrap");

    expSvg
        .style("background", expCgColor(-1))
        .on("click", function () {
            var n = "";
            if (typeof currentFrameworkName != 'undefined' && currentFrameworkName) n = currentFrameworkName;
            if (typeof showCircleGraphSidebarDetails === 'function') showCircleGraphSidebarDetails(n);
            else debugMessage("Cannot find function 'showCircleGraphSidebarDetails'...ignoring");
            zoomExpCg(root);
        });

    zoomExpCgTo([root.x, root.y, root.r * 2 + expCgMargin]);

}
