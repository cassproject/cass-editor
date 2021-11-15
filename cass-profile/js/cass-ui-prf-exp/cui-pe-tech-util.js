//**************************************************************************************************
// CASS UI Profile Explorer Technical Utility Functions
//**************************************************************************************************

EcRepository.caching = true;
EcCrypto.caching = true;

//**************************************************************************************************
// Data Structures
//**************************************************************************************************
function competencyPacketData(cassNodePacket) {
    this.id = generateIdFromCassNodePacket(cassNodePacket);
    this.name = generateNameFromCassNodePacket(cassNodePacket);
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

function profileCompetencyDataStrct() {
    this.frameworkCompetencyPacketDataArrayMap = {};
    this.competencyPacketDataMap = {};
    this.competencyD3NodeTrackerMap = {};
}

function d3CustomNode(nodeName) {
    this.id = nodeName;
    this.name = nodeName;
    this.children = [];
}

function profileDisplayHelperDataStrct(profUserName) {
    this.frameworkHelperMap = {};
    this.profileHelper = new d3CustomNode(profUserName);
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

function addAssertedChildrenToD3FrameworkNode(currentD3FrameworkNode, cpdChild) {
    if (cpdChild.hasAssertion) currentD3FrameworkNode.children.push(cpdChild);
    else {
        for (var j = 0; j < cpdChild.children.length; j++) {
            addAssertedChildrenToD3FrameworkNode(currentD3FrameworkNode, cpdChild.children[j]);
        }
    }
}

function addFrameworkD3NodeTracker(pcd,frameworkId) {
    var fdt = new competencyD3NodeTracker(null,true);
    fdt.frameworkId = frameworkId;
    pcd.competencyD3NodeTrackerMap[frameworkId] = fdt;
}

function buildD3FrameworkNode(frameworkId,frameworkName,pcd) {
    if (frameworkName == null) return null;
    var currentD3FrameworkNode = new d3CustomNode(frameworkName);
    currentD3FrameworkNode.id = frameworkId;
    var cpdArray = pcd.frameworkCompetencyPacketDataArrayMap[frameworkId];
    $(cpdArray).each(function (i, cpd) {
        if (cpd.parents.length <= 0) {
            if (cpd.hasAssertion) currentD3FrameworkNode.children.push(cpd);
            else {
                for (var k = 0; k < cpd.children.length; k++) {
                    addAssertedChildrenToD3FrameworkNode(currentD3FrameworkNode, cpd.children[k]);
                }
            }
        }
    });
    addD3Sizing(currentD3FrameworkNode);
    addFrameworkD3NodeTracker(pcd,frameworkId);
    return currentD3FrameworkNode;
}

function setUpD3ProfileNodes(profUserName,frameworkList,pcd) {
    var pdhd = new profileDisplayHelperDataStrct(profUserName);
    for (var i = 0; i < frameworkList.length; i++) {
        var fw = frameworkList[i];
        debugMessage("Building D3 framework node for: " + fw.shortId());
        var d3Fn = buildD3FrameworkNode(fw.shortId(),fw.getName(),pcd);
        if (d3Fn != null) {
            if (d3Fn.children && d3Fn.children.length > 0) {
                pdhd.frameworkHelperMap[fw.shortId()] = d3Fn;
                pdhd.profileHelper.children.push(d3Fn);
            }
        }
    }
    addFrameworkD3NodeTracker(pcd,profUserName);
    return pdhd;
}

//**************************************************************************************************
// Cluster Node Data Building
//**************************************************************************************************


function doesCompetencyHaveAssertion(compId, compAssrMap) {
    if (!compAssrMap[compId] || compAssrMap[compId] == null) return false;
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

function generateCompetencyPacketDataArray(pcd, fnpg, cpdMap, frameworkId, compAssrMap) {
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
            pcd.competencyD3NodeTrackerMap[packetId] = cdt;
        }
    });
    return cpdArray;
}

function buildFrameworkCompetencyData(pcd,frameworkId,fnpgMap,compAssrMap,competencyPacketDataMap) {
    var fnpg = fnpgMap[frameworkId];
    if (fnpg && fnpg != null) {
        var cpdArray = generateCompetencyPacketDataArray(pcd, fnpg, competencyPacketDataMap, frameworkId, compAssrMap);
        addCompetencyPacketDataRelationships(competencyPacketDataMap, fnpg);
        pcd.frameworkCompetencyPacketDataArrayMap[frameworkId] = cpdArray;
    }
    else debugMessage("buildFrameworkCompetencyData - nodePacketGraph not found for: " + frameworkId);
}

function buildProfileFrameworkCompetencyData(frameworkList,fnpgMap,compAssrMap) {
    var cpdm = {};
    var pcd = new profileCompetencyDataStrct();
    for (var i = 0; i < frameworkList.length; i++) {
        var fw = frameworkList[i];
        debugMessage("building profile framework competency data for: " + fw.shortId());
        buildFrameworkCompetencyData(pcd,fw.shortId(),fnpgMap,compAssrMap,cpdm);
    };
    pcd.competencyPacketDataMap = cpdm;
    return pcd;
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