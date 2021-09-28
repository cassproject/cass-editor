//**************************************************************************************************
// CASS UI Framework Explorer Technical Utility Functions
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

function frameworkCompetencyData() {
    this.competencyPacketDataMap = {};
    this.competencyD3NodeTrackerMap = {};
}

function d3CustomNode(nodeName) {
    this.id = nodeName;
    this.name = nodeName;
    this.children = [];
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

function addRootCompetenciesToD3FrameworkNode(d3Fn,frameworkCompetencyData) {
    var fcdCompetencyPacketDataMap = frameworkCompetencyData.competencyPacketDataMap;
    for (var packetId in fcdCompetencyPacketDataMap) {
        if (fcdCompetencyPacketDataMap.hasOwnProperty(packetId)) {
            var cpd = fcdCompetencyPacketDataMap[packetId];
            if (cpd.parents.length <= 0) d3Fn.children.push(cpd);
        }
    }
}

function setUpD3FrameworkNodes(frameworkName,frameworkCompetencyData) {
    var d3Fn = new d3CustomNode(frameworkName);
    addRootCompetenciesToD3FrameworkNode(d3Fn,frameworkCompetencyData);
    addD3Sizing(d3Fn);
    return d3Fn;
}

function addFrameworkD3NodeTracker(fcd,frameworkName) {
    var fdt = new competencyD3NodeTracker(frameworkName,true);
    fdt.frameworkId = frameworkName;
    fcd.competencyD3NodeTrackerMap[frameworkName] = fdt;
}

//**************************************************************************************************
// Cluster Node Data Building
//**************************************************************************************************

function getCompetencyPacketForNodePacket(fcd,nodePacket) {
    return fcd.competencyPacketDataMap[generateIdFromCassNodePacket(nodePacket)];;
}

function parseCompetencyNodePacketRelations(fcd,fnpg) {
    var fnpgRelationList = fnpg.getRelationList();
    $(fnpgRelationList).each(function (i, fnpgRelation) {
        var sourcePacketData = getCompetencyPacketForNodePacket(fcd,fnpgRelation.getSource());
        var targetPacketData = getCompetencyPacketForNodePacket(fcd,fnpgRelation.getTarget());
        var relType = fnpgRelation.getType();
        if ("BROADENS" == relType.toString().toUpperCase() || "REQUIRES" == relType.toString().toUpperCase()) {
            if (!sourcePacketData.children.includes(targetPacketData)) sourcePacketData.children.push(targetPacketData);
            if (!targetPacketData.parents.includes(sourcePacketData)) targetPacketData.parents.push(sourcePacketData);
        }
        else if ("NARROWS" == relType.toString().toUpperCase() || "IS_REQUIRED_BY" == relType.toString().toUpperCase()) {
            if (!sourcePacketData.parents.includes(targetPacketData)) sourcePacketData.parents.push(targetPacketData);
            if (!targetPacketData.children.includes(sourcePacketData)) targetPacketData.children.push(sourcePacketData)
        }
    });
}

function parseCompetencyNodePackets(fcd,fnpg,frameworkId,frameworkName) {
    var fnpgPacketList = fnpg.getNodePacketList();
    $(fnpgPacketList).each(function (i, fnpgPacket) {
        var packetId = generateIdFromCassNodePacket(fnpgPacket);
        var packetName = generateNameFromCassNodePacket(fnpgPacket);
        if (packetId && packetId.length > 0 && packetName && packetName.length > 0) {
            var cpd = new competencyPacketData(fnpgPacket);
            fcd.competencyPacketDataMap[packetId] = cpd;
            var cdt = new competencyD3NodeTracker(packetId,false);
            cdt.frameworkId = frameworkId;
            fcd.competencyD3NodeTrackerMap[packetId] = cdt;
        }
    });
    addFrameworkD3NodeTracker(fcd,frameworkName);
}

function buildFrameworkCompetencyData(frameworkId,frameworkName,fnpg) {
    var fcd = new frameworkCompetencyData();
    parseCompetencyNodePackets(fcd,fnpg,frameworkId,frameworkName);
    parseCompetencyNodePacketRelations(fcd,fnpg);
    return fcd;
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