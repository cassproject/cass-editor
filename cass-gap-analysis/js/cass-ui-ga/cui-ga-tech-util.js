//**************************************************************************************************
// CASS UI Gap Analysis Technical Utility Functions
//**************************************************************************************************

EcRepository.caching = true;
EcCrypto.caching = true;

//**************************************************************************************************
// Constants

const GAP_NODE_ROOT_NAME = "GAP_ANALYSIS_ROOT";

//**************************************************************************************************
// Data Structures
//**************************************************************************************************
function competencyPacketData(cassNodePacket) {
    this.id = generateIdFromCassNodePacket(cassNodePacket);
    this.name = generateNameFromCassNodePacket(cassNodePacket);
    this.description = generateDescriptionFromCassNodePacket(cassNodePacket);
    this.cassNodePacket = cassNodePacket;
    this.parents = [];
    this.children = [];
    this.size = -1;
    this.hasAssertion = false;
}

//since the frameworks themselves need to be represented, we just one of these as well
// hence the 'isFramework' flag
function competencyD3NodeTracker(id, isFramework) {
    this.id = id;
    this.isFramework = isFramework;
    this.frameworkId = "";
    this.d3Node = {};
}

function frameworkCompetencyData() {
    this.frameworkCompetencyPacketDataArrayMap = {};
    this.competencyPacketDataMap = {};
    this.competencyD3NodeTrackerMap = {};
}

function d3CustomNode(nodeName) {
    this.id = nodeName;
    this.name = nodeName;
    this.children = [];
}

function gapDisplayHelperDataStrct() {
    this.frameworkHelperMap = {};
    this.gapHelper = new d3CustomNode(GAP_NODE_ROOT_NAME);
}

//**************************************************************************************************
// D3 Nodes Building
//**************************************************************************************************

function addD3Sizing(parentNode) {
    if (!parentNode.children || parentNode.children.length == 0) parentNode.size = 1;
    else {
        var childrenNodes = parentNode.children;
        $(childrenNodes).each(function (i, cn) {
            addD3Sizing(cn);
        })
    }
}
//
// function addRootCompetenciesToD3FrameworkNode(d3Fn,frameworkCompetencyData) {
//     var fcdCompetencyPacketDataMap = frameworkCompetencyData.competencyPacketDataMap;
//     for (var packetId in fcdCompetencyPacketDataMap) {
//         if (fcdCompetencyPacketDataMap.hasOwnProperty(packetId)) {
//             var cpd = fcdCompetencyPacketDataMap[packetId];
//             if (cpd.parents.length <= 0) d3Fn.children.push(cpd);
//         }
//     }
// }

// function setUpD3FrameworkNodes(frameworkName,frameworkCompetencyData) {
//     var d3Fn = new d3CustomNode(frameworkName);
//     addRootCompetenciesToD3FrameworkNode(d3Fn,frameworkCompetencyData);
//     addD3Sizing(d3Fn);
//     return d3Fn;
// }

function buildD3FrameworkNode(frameworkId,frameworkName,fcd) {
    if (frameworkName == null) return null;
    var fd3cn = new d3CustomNode(frameworkName);
    fd3cn.id = frameworkId;
    var cpdArray = fcd.frameworkCompetencyPacketDataArrayMap[frameworkId];
    $(cpdArray).each(function (i, cpd) {
        if (cpd.parents.length <= 0) fd3cn.children.push(cpd);
    });
    addD3Sizing(fd3cn);
    addFrameworkD3NodeTracker(fcd,frameworkId);
    return fd3cn;
}

function setUpD3SelectedFrameworkNodes(fwkMap,fcd) {
    var gdhd = new gapDisplayHelperDataStrct();
    for (var fwkId in fwkMap) {
        if (fwkMap.hasOwnProperty(fwkId)) {
            var fw = fwkMap[fwkId];
            debugMessage("Building D3 framework node for: " + fwkId);
            var d3Fn = buildD3FrameworkNode(fwkId,fw.getName(),fcd);
            if (d3Fn) {
                if (d3Fn.children && d3Fn.children.length > 0) {
                    gdhd.frameworkHelperMap[fw.shortId()] = d3Fn;
                    gdhd.gapHelper.children.push(d3Fn);
                }
            }
        }
    }
    addFrameworkD3NodeTracker(fcd,GAP_NODE_ROOT_NAME);
    return gdhd;
}


function addFrameworkD3NodeTracker(fcd,frameworkName) {
    var fdt = new competencyD3NodeTracker(frameworkName,true);
    fdt.frameworkId = frameworkName;
    fcd.competencyD3NodeTrackerMap[frameworkName] = fdt;
}

//**************************************************************************************************
// Cluster Node Data Building
//**************************************************************************************************

function doesCompetencyHaveAssertion(compId, compAssrMap) {
    if (!compAssrMap || !compAssrMap.hasOwnProperty(compId) || !compAssrMap[compId] || compAssrMap[compId] == null) return false;
    else return true;
}

function cassNodePacketHasAssertion(cassNodePacket, compAssrMap) {
    var nl = cassNodePacket.getNodeList();
    for (var j = 0; j < nl.length; j++) {
        var n = nl[j];
        if (doesCompetencyHaveAssertion(n.getId(),compAssrMap)) {
            return true;
        }
    }
    return false;
}

// function getCompetencyPacketForNodePacket(fcd,nodePacket) {
//     return fcd.competencyPacketDataMap[generateIdFromCassNodePacket(nodePacket)];;
// }
//
// function parseCompetencyNodePacketRelations(fcd,fnpg) {
//     var fnpgRelationList = fnpg.getRelationList();
//     $(fnpgRelationList).each(function (i, fnpgRelation) {
//         var sourcePacketData = getCompetencyPacketForNodePacket(fcd,fnpgRelation.getSource());
//         var targetPacketData = getCompetencyPacketForNodePacket(fcd,fnpgRelation.getTarget());
//         var relType = fnpgRelation.getType();
//         if ("BROADENS" == relType.toString().toUpperCase() || "REQUIRES" == relType.toString().toUpperCase()) {
//             if (!sourcePacketData.children.includes(targetPacketData)) sourcePacketData.children.push(targetPacketData);
//             if (!targetPacketData.parents.includes(sourcePacketData)) targetPacketData.parents.push(sourcePacketData);
//         }
//         else if ("NARROWS" == relType.toString().toUpperCase() || "IS_REQUIRED_BY" == relType.toString().toUpperCase()) {
//             if (!sourcePacketData.parents.includes(targetPacketData)) sourcePacketData.parents.push(targetPacketData);
//             if (!targetPacketData.children.includes(sourcePacketData)) targetPacketData.children.push(sourcePacketData)
//         }
//     });
// }

function getCompetencyPacketForNodePacket(cpdMap, nodePacket) {
    return cpdMap[generateIdFromCassNodePacket(nodePacket)];
}

function addCompetencyPacketDataRelationships(cpdMap, fnpg) {
    var fnpgRelationList = fnpg.getRelationList();
    $(fnpgRelationList).each(function (i, fnpgRelation) {
        var sourcePacketData = getCompetencyPacketForNodePacket(cpdMap, fnpgRelation.getSource());
        var targetPacketData = getCompetencyPacketForNodePacket(cpdMap, fnpgRelation.getTarget());
        var relType = fnpgRelation.getType();
        if ("BROADENS" == relType.toString().toUpperCase() || "REQUIRES" == relType.toString().toUpperCase()) {
            if (!sourcePacketData.children.includes(targetPacketData)) sourcePacketData.children.push(targetPacketData);
            if (!targetPacketData.parents.includes(sourcePacketData)) targetPacketData.parents.push(sourcePacketData);
        } else if ("NARROWS" == relType.toString().toUpperCase() || "IS_REQUIRED_BY" == relType.toString().toUpperCase()) {
            if (!sourcePacketData.parents.includes(targetPacketData)) sourcePacketData.parents.push(targetPacketData);
            if (!targetPacketData.children.includes(sourcePacketData)) targetPacketData.children.push(sourcePacketData)
        }
    });
}

// function parseCompetencyNodePackets(fcd,fnpg,frameworkId,frameworkName,compAssrMap) {
//     var fnpgPacketList = fnpg.getNodePacketList();
//     $(fnpgPacketList).each(function (i, fnpgPacket) {
//         var packetId = generateIdFromCassNodePacket(fnpgPacket);
//         var packetName = generateNameFromCassNodePacket(fnpgPacket);
//         if (packetId && packetId.length > 0 && packetName && packetName.length > 0) {
//             var cpd = new competencyPacketData(fnpgPacket);
//             cpd.hasAssertion = cassNodePacketHasAssertion(fnpgPacket, compAssrMap);
//             fcd.competencyPacketDataMap[packetId] = cpd;
//             var cdt = new competencyD3NodeTracker(packetId,false);
//             cdt.frameworkId = frameworkId;
//             fcd.competencyD3NodeTrackerMap[packetId] = cdt;
//         }
//     });
//     addFrameworkD3NodeTracker(fcd,frameworkName);
// }

function generateCompetencyPacketDataArray(fcd, fnpg, cpdMap, frameworkId, compAssrMap) {
    var cpdArray = [];
    var fnpgNodePacketList = fnpg.getNodePacketList();
    $(fnpgNodePacketList).each(function (i, nodePacket) {
        var packetId = generateIdFromCassNodePacket(nodePacket);
        var packetName = generateNameFromCassNodePacket(nodePacket);
        if (packetId && packetId.length > 0 && packetName && packetName.length > 0) {
            var cpd = new competencyPacketData(nodePacket);
            cpd.hasAssertion = cassNodePacketHasAssertion(nodePacket, compAssrMap);
            cpdArray.push(cpd);
            cpdMap[packetId] = cpd;
            var cdt = new competencyD3NodeTracker(packetId,false);
            cdt.frameworkId = frameworkId;
            fcd.competencyD3NodeTrackerMap[packetId] = cdt;
        }
    });
    return cpdArray;
}

function buildFrameworkCompetencyData(fcd,frameworkId,fnpgMap,compAssrMap,competencyPacketDataMap) {
    var fnpg = fnpgMap[frameworkId];
    if (fnpg && fnpg != null) {
        var cpdArray = generateCompetencyPacketDataArray(fcd, fnpg, competencyPacketDataMap, frameworkId, compAssrMap);
        addCompetencyPacketDataRelationships(competencyPacketDataMap, fnpg);
        fcd.frameworkCompetencyPacketDataArrayMap[frameworkId] = cpdArray;
    }
    else debugMessage("buildFrameworkCompetencyData - nodePacketGraph not found for: " + frameworkId);
}

function buildSelectedFrameworksCompetencyData(fwksMap,fnpgMap,compAssrMap) {
    var cpdm = {};
    var fcd = new frameworkCompetencyData();
    for (var fwId in fwksMap) {
        var fw = fwksMap[fwId];
        debugMessage("building selected framework competency data for: " + fw.shortId());
        buildFrameworkCompetencyData(fcd,fwId,fnpgMap,compAssrMap,cpdm);
        debugMessage("framework competency data built...");
        debugMessage(fcd);
    };
    fcd.competencyPacketDataMap = cpdm;
    return fcd;
    //
    // var fcd = new frameworkCompetencyData();
    // parseCompetencyNodePackets(fcd,fnpg,frameworkId,frameworkName,compAssrMap);
    // parseCompetencyNodePacketRelations(fcd,fnpg);
    // return fcd;
}

//**************************************************************************************************
// Competency Cluster Nodes Utilities
//**************************************************************************************************

function generateDescriptionFromCassNodePacket(cassNodePacket) {
    if (!cassNodePacket) return null;
    else {
        var desc = "";
        if (!cassNodePacket.getNodeList() || cassNodePacket.getNodeList().length == 0) return "";
        var nodePacketNodeList = cassNodePacket.getNodeList();
        $(nodePacketNodeList).each(function (i, n) {
            if (i > 0) desc = desc + ", ";
            desc = desc + n.getDescription();
        });
        return desc.trim();
    }
}


function generateNameFromCassNodePacket(cassNodePacket) {
    if (!cassNodePacket) return null;
    else {
        var name = "";
        if (!cassNodePacket.getNodeList() || cassNodePacket.getNodeList().length == 0) return "";
        var nodePacketNodeList = cassNodePacket.getNodeList();
        $(nodePacketNodeList).each(function (i, n) {
            if (name.indexOf(n.getName()) != -1)
                return;
            if (i > 0) name = name + ", ";
            name = name + n.getName();
        });
        return name.trim();
    }
}

function generateIdFromCassNodePacket(cassNodePacket) {
    if (!cassNodePacket) return null;
    else {
        var id = "";
        var nodePacketNodeList = cassNodePacket.getNodeList();
        $(nodePacketNodeList).each(function (i, n) {
            if (i > 0) id = id + "|";
            id = id + n.getId();
        });
        return id;
    }
}

//**************************************************************************************************
// JSON String Utilities
//**************************************************************************************************

//Build ID based circles instead of named based circles
function JSONStringifyIdBasedName(object) {
    var cache = [];
    var str = JSON.stringify(object,
        function (key, value) {
            if (key == "name") return undefined;
            else if (key == "parents") return undefined;
            else if (key == "createdRelationsMap") return undefined;
            else if (key == "hasAssertion") return undefined;
            else if (key == "size" && value == "-1") return undefined;
            else if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    return value;
                }
                cache.push(value);
            }
            return value;
        });
    cache = null;
    str = str.replaceAll("\"id\":", "\"name\":");
    return str;
};

//Build ID based circles instead of named based circles
function buildD3JsonString(d3n) {
    return JSONStringifyIdBasedName(d3n);
}

//**************************************************************************************************
// General Utilities
//**************************************************************************************************

function buildIDableString(str) {
    return str.replace(/\W+/g, "_");
}

function escapeSingleQuote(str) {
    return str.replace(/'/g, "\\'");
}