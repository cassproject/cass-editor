//**************************************************************************************************
// CASS UI Framework Alignment Service Functions
//**************************************************************************************************

//**************************************************************************************************
// Constants

const CASS_SERVICE_HTTPS_URL = "https://sandbox.cassproject.org/cassServices/api/";
const CASS_SERVICE_HTTP_URL = "http://sandbox.cassproject.org:8080/cassServices/api/";

//**************************************************************************************************
// Functions

function generateEcAlignmentFromAutoAlignResponseObject(ro) {
    var sc = new EcCompetency();
    sc.id = ro["source"];
    var tc = new EcCompetency();
    tc.id = ro["target"];
    var eca = new EcAlignment();
    eca.addOwner(EcIdentityManager.ids[0].ppk.toPk());
    eca.generateId(repo.selectedServer);
    eca.relationType = ro["relationType"];
    eca.source = sc.shortId();
    eca.target = tc.shortId();
    return eca;
}

function generateEcAlignmentArrayFromAutoAlignResponse(resp) {
    var ecaa = [];
    if (resp && resp.length && resp.length > 0) {
        for (var i=0;i<resp.length;i++) {
            ecaa.push(generateEcAlignmentFromAutoAlignResponseObject(resp[i]));
        }
    }
    return ecaa;
}

function cassServiceAutoAlign(framework1Id, framework2Id, repo1Server, repo2Server, success, failure) {
    var aaUrl =  CASS_SERVICE_HTTPS_URL + "autoAlign?server1=" + repo1Server + "&server2=" + repo2Server + "&framework1=" + framework1Id + "&framework2=" + framework2Id;
    //var aaUrl = framework1Id;
    $.get(aaUrl, function(resp) {
        //success([]);
        success(generateEcAlignmentArrayFromAutoAlignResponse(resp));
    }).fail(function(err) {
        if (err) failure("Auto Alignment Service failed: (" + err.status + ") " + err.statusText);
        else failure("Auto Alignment Service failed: Undetermined cause...");
    });
}
