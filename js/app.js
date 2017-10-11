/*
 Copyright 2017 Eduworks Corporation and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

if (queryParams.select == "true")
    $("#selectButton").css("visibility", "visible");
if (queryParams.select != null)
    $("#selectButton").show().text(queryParams.select);

var loading = 0;
var searchCompetencies = [];
var modernBrowser = false;
var droppedFiles = false;

function searchFrameworks() {
    var searchTerm = $("#search").val();
    if (searchTerm == null || searchTerm == "")
        searchTerm = "*";
    hideAll();
    setTimeout(function () {
        $("#frameworks").html("");
        searchCompetencies = [];
        for (var i = 0; i < servers.length; i++) {
            frameworkSearch(servers[i], searchTerm);
            if (searchTerm != "*") {
                frameworkSearchByCompetency(servers[i], searchTerm);
            }
        }
    }, 500);
}

function frameworkSearchByCompetency(server, searchTerm) {
    loading++;
    EcCompetency.search(server, searchTerm, function (competencies) {
        var subSearch = "";
        for (var v = 0; v < competencies.length; v++) {
            searchCompetencies.push(competencies[v].shortId());
            if (subSearch != "")
                subSearch += " OR ";
            subSearch += "competency:\"" + competencies[v].shortId() + "\"";
            if (!EcRepository.shouldTryUrl(competencies[v].id)) {
                if (subSearch != "")
                    subSearch += " OR ";
                var m = forge.md.md5.create();
                m.update(competencies[v].id);
                var md5 = m.digest().toHex();
                subSearch += "competency:\"" + md5 + "\"";
            }
        }
        if (subSearch != "") {
            frameworkSearch(server, subSearch, searchTerm);
        }
        loading--;
        if (loading == 0) {
            if ($("#frameworks").html() == "")
                $("#frameworks").html("<center>No frameworks found.</center>");
            showAll();
        }
    }, console.log, {
        size: 5000
    });
}

function frameworkSearch(server, searchTerm, subsearchTerm) {
    loading++;
    var search = "";
    if (queryParams.filter != null)
        search = "(" + searchTerm + ") AND (" + queryParams.filter + ")";
    else
        search = searchTerm;
    EcFramework.search(server, search, function (frameworks) {
        for (var v = 0; v < frameworks.length; v++) {
            var framework = frameworks[v];
            if (framework.name === undefined || framework.name == null || framework.name == "")
                continue;
            if ($("[id='" + framework.shortId() + "']").length == 0) {
                var p = $("#frameworks").append("<p><a/><span/></p>").children().last();
                p.attr("id", framework.shortId());
                p.attr("subsearch", subsearchTerm);
                p.click(click);
                var title = p.children().first();
                title.text(framework.getName());
                if (subsearchTerm != null)
                    p.prepend("<span style='float:right'>*Matches inside. <span>");
                var desc = p.children().last();
                desc.text(framework.getDescription());
                if (searchTerm != "*" && subsearchTerm == null)
                    p.mark(searchTerm);
            }
        }
        loading--;
        if (loading == 0) {
            if ($("#frameworks").html() == "")
                $("#frameworks").html("<center>No frameworks found.</center>");
            showAll();
        }
    }, console.log, {
        size: 5000
    });
}

function select() {
    var ary = [];
    $("input:checked").parent().each(function (f) {
        ary.push($(this).attr("id"));
    })
    parent.postMessage(ary, queryParams.origin);
}

function click(evt) {
    var subsearchTerm = $(evt.target).attr("subsearch");
    if (subsearchTerm == null)
        subsearchTerm = $(evt.target).parent().attr("subsearch");
    if (subsearchTerm == null)
        subsearchTerm = $(evt.target).parent().parent().attr("subsearch");
    frameworkId = $(evt.target).attr("id");
    if (frameworkId == null)
        frameworkId = $(evt.target).parent().attr("id");
    if (frameworkId == null)
        frameworkId = $(evt.target).parent().parent().attr("id");
    repo = null;
    $("#mainbar").find("#loading").show();
    $("#tree").hide();
    $("#sidebar").hide({
        complete: function () {
            $("#mainbar").show({
                complete: function () {}
            });
        }
    });
    for (var i = 0; i < servers.length; i++)
        if (frameworkId.startsWith(servers[i])) {
            repo = servers[i];
        }
    if (repo == null) {
        repo = servers[0];
    }
    refreshFramework(subsearchTerm);
}

function refreshFramework(subsearch) {
    var me = this;
    $("#tree").html("");
    me.fetches = 0;
    EcFramework.get(frameworkId, function (framework) {
        $("#title").text(framework.getName());
        if (framework.competency == null)
            framework.competency = [];
        if (framework.relation == null)
            framework.relation = [];
        if (queryParams.link == "true")
            $("#frameworkLink").attr("href", framework.shortId()).show();
        repo.precache(framework.competency.concat(framework.relation), function (success) {
            if (framework.competency.length == 0) {
                if ($("#tree").html() == "")
                    $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
                showAll();
            } else {
                me.fetches += framework.competency.length;
                for (var i = 0; i < framework.competency.length; i++) {
                    refreshCompetency(me, framework, i, subsearch);
                }
            }
        });
    }, console.log);
}

function refreshCompetency(me, framework, i, subsearch) {
    EcCompetency.get(framework.competency[i], function (competency) {
        me.fetches--;
        if (subsearch != null)
            if (!EcArray.has(searchCompetencies, competency.shortId())) {
                if (me.fetches == 0) {
                    if ($("#tree").html() == "")
                        $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
                    showAll();
                }
                return;
            }
        var treeNode = $("#tree").append("<li class = 'competency'><ul></ul></li>").children().last();
        treeNode.attr("id", competency.shortId());
        if (competency.description != null && competency.description != "NULL" && competency.description != competency.name)
            treeNode.prepend("<small/>").children().first().text(competency.getDescription());
        treeNode.prepend("<span/>").children().first().text(competency.getName()).click(function (evt) {
            $(evt.target).parent().children("ul").slideToggle();
        });
        if (queryParams.link == "true")
            treeNode.prepend(" <a style='float:right;' target='_blank'>🔗</a>").children().first().attr("href", competency.shortId());
        if (queryParams.select != null)
            treeNode.prepend("<input type='checkbox'>").children().first().click(function (evt) {
                console.log(evt);
                $(evt.target).parent().find("input").prop("checked", evt.target.checked);
            });
        if (subsearch != null)
            treeNode.mark(subsearch);
        if (me.fetches == 0) {
            if (framework.relation != undefined && framework.relation.length > 0) {
                me.fetches += framework.relation.length;
                for (var i = 0; i < framework.relation.length; i++) {
                    EcAlignment.get(framework.relation[i], function (relation) {
                        me.fetches--;
                        if (relation.source !== undefined) {
                            if (relation.relationType == "narrows") {
                                $(".competency[id=\"" + relation.target + "\"]").children().last().append($(".competency[id=\"" + relation.source + "\"]"));
                            }
                            if (me.fetches == 0) {
                                me.fetches += framework.relation.length;
                                for (var i = 0; i < framework.relation.length; i++) {
                                    EcAlignment.get(framework.relation[i], function (relation) {
                                        me.fetches--;
                                        if (relation.source !== undefined) {
                                            if (relation.relationType == "requires") {
                                                if ($(".competency[id=\"" + relation.target + "\"]").prevAll(".competency[id=\"" + relation.source + "\"]").length > 0)
                                                    $(".competency[id=\"" + relation.target + "\"]").insertBefore($(".competency[id=\"" + relation.source + "\"]"));
                                            }
                                        }
                                        if (me.fetches == 0) {
                                            if ($("#tree").html() == "")
                                                $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
                                            showAll();
                                        }
                                    }, console.log);
                                }
                            }
                        }
                    }, console.log);
                }
            } else {
                if ($("#tree").html() == "")
                    $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
                showAll();
            }
        }
    }, console.log);
}

function showAll() {
    var now = 1000 - (new Date().getTime() - ms);
    if (now < 0)
        now = 0;
    $("#mainbar").find("#loading").delay(now).hide({
        complete: function () {
            $("#tree").show({
                complete: function () {
                    $("#mainbar").find("#loading").hide();
                }
            });
        }
    });
    $("#sidebar").find("#loading").delay(now).hide({
        complete: function () {
            $("#frameworks").show({
                complete: function () {
                    $("#sidebar").find("#loading").hide();
                }
            });
        }
    });
}

var ms = 0;

function hideAll() {
    ms = new Date().getTime();
    $("#tree").hide({
        complete: function () {
            $("#sidebar").find("#loading").show({});
        }
    });
    $("#frameworks").hide({
        complete: function () {
            $("#mainbar").find("#loading").show({});
        }
    });
}

function showImportPage() {
    $('#importSection').css('display', 'block');
}

function hideImportPage() {
    $('#importSection').css('display', 'none');
}

function showFiles(files) {
    var input = $('#importFileForm').find('input[type="file"]');
    var label = $('#importFileForm').find('label');

    label.text(files.length > 1 ? (input.attr('data-multiple-caption') || '').replace( '{count}', files.length) : files[0].name);
}

$("#search").keyup(function (event) {
    if (event.keyCode == '13') {
        searchFrameworks();
    }
    return false;
});

$('#importButton').on('click', function() {
    showImportPage();
});

$('#importFileForm').on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
}).on('drop', function(e) {
    droppedFiles = e.originalEvent.dataTransfer.files;
    showFiles(droppedFiles);
});

$('#importFileForm').on('submit', function(e) {
    if ($('#importFileForm')[0].hasAttribute('is-uploading')) {
        return false;
    }

    $('#importFileForm').attr('is-uploading', '');

    if (modernBrowser) {
        e.preventDefault();

        var ajaxData = new FormData($('#importFileForm').get(0));
        if (droppedFiles) {
            $.each(droppedFiles, function(i, file) {
                ajaxData.append($('#file').attr('name'), file);
            });
        }

        $.ajax({
            url: $('#importFileForm').attr('action'),
            type: $('#importFileForm').attr('method'),
            data: ajaxData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            complete: function() {
                $('#importFileForm').removeAttr('is-uploading');
            },
            succes: function(data) {
                $('#importFileForm').attr(data.success == true ? 'is-success' : 'is-error', '');
                if (!data.success) {
                    $errorMsg.text(data.error);
                }
            },
            error: function() {
                console.log('error');
            }
        });
    } else {
        var iframeName = 'uploadiframe' + new Data().getTime();
        var tempIframe = $('<iframe id="tempIframe" name="' + iframeName + '" style="display: none;"></iframe>');

        $('body').append(tempIframe);
        $('#importFileForm').attr('target', iframeName);

        $('#tempIframe').one('load', function() {
            var data = JSON.parse($('#tempIframe').contents().find('body' ).text());
            $('#importFileForm').removeAttr('is-uploading').attr(data.success == true ? 'is-success' : 'is-error', '').removeAttr('target');
            if (!data.success) {
                $errorMsg.text(data.error);
            }
            $('#importFileForm').removeAttr('target');
            $('#tempIframe').remove();
        });
    }
});

$('#file').on('change', function(e) {
    showFiles(e.target.files);
});

$("#sidebar").show({});
searchFrameworks();
