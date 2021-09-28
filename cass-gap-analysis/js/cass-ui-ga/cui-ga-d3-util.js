//**************************************************************************************************
// CASS UI Gap Analysis D3 Utility Functions
//**************************************************************************************************

//**************************************************************************************************
// Constants

const GAP_CIRCLE_PACK = "#gapCirclePack";
const GAP_CIRCLE_PACK_PADDING = 10;
const GAP_CIRCLE_TEXT_LIMIT = 22;
const GAP_CIRCLE_CLASS_PREFIX = "gap_cg_c_";
const NO_ASSR_CLASS = "gapped";
const FWK_CIR_CLASS = "fwkCircle";

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
const ORANGE_RANGE_2 = "rgba(226,158,117, 1)";
const ORANGE_RANGE_3 = "rgba(294,196,172,1)";
const ORANGE_RANGE_1 = "rgba(197,96,40,1)";

//**************************************************************************************************
// Variables

var competencySearchAutoCompleteMap;

var gapSvg = d3.select(GAP_CIRCLE_PACK);
var gapCgMargin = 0;
var gapCgDiameter = +gapSvg.attr("width");
var gapCirclePackGraph =   gapSvg;

gapCirclePackGraph.append("g").attr("transform", "translate(" + gapCgDiameter / 2 + "," + gapCgDiameter / 2 + ")");
gapCirclePackGraph.append("defs");


var gapCgView;
var gapCgNode;
var gapCgCircle;


var gapCgColor = d3.scaleQuantize()
    .domain([-1, 2])
    .range(
        [
            getGapColorRangeParm0(),
            getGapColorRangeParm1(),
            getGapColorRangeParm2(),
            getGapColorRangeParm3()
        ]
    );

var gapCgGapColor = d3.scaleQuantize()
    .domain([0, 2])
    .range(
        [
            ORANGE_RANGE_1,
            ORANGE_RANGE_3,
            ORANGE_RANGE_2 
        ]
    );

var gapCgPack = d3.pack()
    .size([gapCgDiameter - gapCgMargin, gapCgDiameter - gapCgMargin])
    .padding(GAP_CIRCLE_PACK_PADDING);

//**************************************************************************************************
// Graph Functions (For Gap Circles)
//**************************************************************************************************

function markGapCompetencyNodes(cpdArray) {
    for (var i=0;i<cpdArray.length;i++) {
        var cpd = cpdArray[i];
        if (!cpd.hasAssertion) {
            var cec = generateGapCgCircleExtendedClass(cpd.id);
            if (cec) {
              $("."+cec).addClass(NO_ASSR_CLASS);
              
              d3.selectAll("." + NO_ASSR_CLASS)
               .style("fill", function (d) {
                  return d ? gapCgGapColor(d.depth%3) : null;
              })
              markGapCompetencyNodes(cpd.children);
            }
        }
    }
}

function markGapNodes(gapHelper) {
    for (var i=0;i<gapHelper.children.length;i++) {
        var fcd3n = gapHelper.children[i];
        var fwec = generateGapCgCircleExtendedClass(fcd3n.id);
        if (fwec) {
            $("."+fwec).addClass(FWK_CIR_CLASS);
    
            markGapCompetencyNodes(fcd3n.children);
        }
    }
}

function getGapColorRangeParm0() {
    if (!GAP_CIR_COLOR_RANGE || GAP_CIR_COLOR_RANGE.toLowerCase() == "blue") return BLUE_RANGE_0;
    else if (GAP_CIR_COLOR_RANGE.toLowerCase() == "burgendy") return BURGENDY_RANGE_0;
    else if (GAP_CIR_COLOR_RANGE.toLowerCase() == "green") return TEAL_RANGE_0;
    else return BLUE_RANGE_0;
}

function getGapColorRangeParm1() {
    if (!GAP_CIR_COLOR_RANGE || GAP_CIR_COLOR_RANGE.toLowerCase() == "blue") return BLUE_RANGE_1;
    else if (GAP_CIR_COLOR_RANGE.toLowerCase() == "burgendy") return BURGENDY_RANGE_1;
    else if (GAP_CIR_COLOR_RANGE.toLowerCase() == "green") return TEAL_RANGE_1;
    else return BLUE_RANGE_1;
}

function getGapColorRangeParm2() {
    if (!GAP_CIR_COLOR_RANGE || GAP_CIR_COLOR_RANGE.toLowerCase() == "blue") return BLUE_RANGE_2;
    else if (GAP_CIR_COLOR_RANGE.toLowerCase() == "burgendy") return BURGENDY_RANGE_2;
    else if (GAP_CIR_COLOR_RANGE.toLowerCase() == "green") return TEAL_RANGE_2;
    else return BLUE_RANGE_2;
}
function getGapColorRangeParm3() {
    if (!GAP_CIR_COLOR_RANGE || GAP_CIR_COLOR_RANGE.toLowerCase() == "blue") return BLUE_RANGE_3;
    else if (GAP_CIR_COLOR_RANGE.toLowerCase() == "burgendy") return BURGENDY_RANGE_3;
    else if (GAP_CIR_COLOR_RANGE.toLowerCase() == "green") return TEAL_RANGE_3;
    else return BLUE_RANGE_3;
}

function clearGapCircleSvg() {
    var svg2 = d3.select(GAP_CIRCLE_PACK);
    svg2.selectAll("*").remove();
    gapCirclePackGraph = svg2.append("g").attr("transform", "translate(" + gapCgDiameter / 2 + "," + gapCgDiameter / 2 + ")");
}

function zoomGapCircleGraphByAutoComplete(selectedValue) {
    if (!selectedValue || selectedValue == null) {
        return;
    }
    var d3Node = competencySearchAutoCompleteMap[selectedValue];
    if (d3Node && d3Node.data && d3Node.data.name) {
        zoomGapCgByD3NodeId(d3Node.data.name, false);
    }
}

function addGapD3NodeToAutoCompleteMap(d3Node, cd3t) {
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

function registerGapD3DetailNodes(nodes) {
    competencySearchAutoCompleteMap = {};
    $(nodes).each(function (i, n) {
        var compId = n.data.name;
        var cd3t = null;
        if (typeof getCompetencyD3NodeTracker === 'function') cd3t = getCompetencyD3NodeTracker(compId);
        if (!cd3t || cd3t == null) debugMessage("Could not locate tracker for: " + compId);
        else {
            cd3t.d3Node = n;
            addGapD3NodeToAutoCompleteMap(n, cd3t);
        }
    });
}

function isGapD3LeafNode(d3Node) {
    if (!d3Node || !d3Node.children || d3Node.children.length == 0) return true;
    return false;
}

function zoomGapCgByD3NodeId(d3NodeId, clearSearch) {
    if (clearSearch) {
        if (typeof clearAllSearchBars === 'function') clearAllSearchBars();
    }
    if (!d3NodeId || d3NodeId == null) return;
    var compId = d3NodeId.trim();
    var cd3t = null;
    if (typeof getCompetencyD3NodeTracker === 'function') cd3t = getCompetencyD3NodeTracker(compId);
    if (!cd3t || cd3t == null) debugMessage("Cannot locate competency D3 tracker for: " + compId);
    else {
        if (!isGapD3LeafNode(cd3t.d3Node)) {
            zoomGapCg(cd3t.d3Node);
        }
        else {
            if (cd3t.d3Node.parent) zoomGapCg(cd3t.d3Node.parent);
        }
        if (typeof showCircleGraphSidebarDetails === 'function') showCircleGraphSidebarDetails(compId);
        else debugMessage("Cannot find function 'showCircleGraphSidebarDetails'...ignoring");
    }
}

function zoomGapCg(d) {
    var focus0 = focus;
    focus = d;
    var transition = d3.transition()
        .duration(d3.event ? d3.event.altKey ? 7500 : 750 : 750)
        .tween("zoom", function (d) {
            var i = d3.interpolateZoom(gapCgView, [focus.x, focus.y, focus.r * 2 + gapCgMargin]);
            return function (t) {
                zoomGapCgTo(i(t));
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

function zoomGapCgTo(v) {
    var k = gapCgDiameter / v[2];
    gapCgView = v;
    gapCgNode.attr("transform", function (d) {
        return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
    });
    gapCgCircle.attr("r", function (d) {
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

function generateGapCgCircleExtendedClass(compId) {
    if (compId) return buildIDableString(GAP_CIRCLE_CLASS_PREFIX + compId);
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

function buildGapGraphCircles(error, root) {

    if (error) throw error;

    root = d3.hierarchy(root)
        .sum(function (d) {
            return d.size;
        })
        .sort(function (a, b) {
            return b.value - a.value;
        });

    var focus = root;
    var nodes = gapCgPack(root).descendants();

    registerGapD3DetailNodes(nodes);

  
    /************************************
     drop shadow filter details
     needed here to apply to gapCgCircl
     ************************************/
    var filter = gapCirclePackGraph.append("defs:filter")
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
    gapCgCircle = gapCirclePackGraph.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function (d) {
            var classPrefix = d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
            var classSuffix = "";
            if (d && d.data && d.data.name) classSuffix =  " " + generateGapCgCircleExtendedClass(d.data.name);
            return classPrefix + classSuffix;
        })
        .style("fill", function (d) {
            return d ? gapCgColor(d.depth%3) : null;
        })
        .on("click", function (d) {
            if (typeof clearAllSearchBars === 'function') clearAllSearchBars();
            if (d.children) zoomGapCg(d);
            else if (d.parent) zoomGapCg(d.parent);
            if (d.data) {
                if (typeof showCircleGraphSidebarDetails === 'function') showCircleGraphSidebarDetails(d.data.name);
                else debugMessage("Cannot find function 'showCircleGraphSidebarDetails'...ignoring");
            } else(debugMessage("Circle click: d.data is null"));
            d3.event.stopPropagation();
        });



    var text = gapCirclePackGraph.selectAll("text")
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
            if (typeof getGapCgCircleText === 'function') {
                var circleText = getGapCgCircleText(d);
                return circleText;
            }
            else return "UNDEFINED getGapCgCircleText";
        })
        .attr("name", function (d) {
            if (typeof getGapCgCircleText === 'function') {
                var circleText = getGapCgCircleText(d);
                return circleText;
            }
            else return "UNDEFINED getGapCgCircleText";
        }).each(function(d) {
            var text = d3.select(this);
            getDisplayTitle(d, text);
        });

    gapCgNode = gapCirclePackGraph.selectAll("circle,text,wrap");

    gapSvg
        .style("background", gapCgColor(-1))
        .on("click", function () {
            var n = "";
            if (typeof currentFrameworkName != 'undefined' && currentFrameworkName) n = currentFrameworkName;
            if (typeof showCircleGraphSidebarDetails === 'function') showCircleGraphSidebarDetails(n);
            else debugMessage("Cannot find function 'showCircleGraphSidebarDetails'...ignoring");
            zoomGapCg(root);
        });

    zoomGapCgTo([root.x, root.y, root.r * 2 + gapCgMargin]);

}
