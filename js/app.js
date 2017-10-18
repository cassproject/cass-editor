/*
 Copyright 2017 Eduworks Corporation and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/
var defaultPage = "#addFrameworkSection";
window.onload = function () {
    if (queryParams.frameworkId != null) {
        loading("Loading framework...");
        EcFramework.get(queryParams.frameworkId, function (f) {
            framework = f;
            populateFramework();
        }, error);
    }
}

function backPage() {
    window.history.back();
}

var error = console.log;

window.onpopstate = function (event) {
    if (event.state == null)
        gotoPage(defaultPage);
    else
        gotoPage(event.state.pageId);
};

function gotoPage(pageId, state) {
    $(".page").hide({
        complete: function () {
            $(pageId).show({
                complete: function () {
                    $(".page").hide();
                    $(pageId).show();
                }
            });
        }
    });
}

function showPage(pageId, state) {
    window.history.pushState({
        pageId: pageId,
        state: state
    }, pageId);
    $(".page").hide({
        complete: function () {
            $(pageId).show({
                complete: function () {
                    $(".page").hide();
                    $(pageId).show();
                }
            })
        }
    });
}

function loading(message) {
    $(".page").hide({
        complete: function () {
            $("#status").text(message);
            $("#loading").show({})
        }
    });
}

function showFiles(files) {
    var input = $('#importFileForm').find('input[type="file"]');
    var label = $('#importFileForm').find('label');

    label.text(files.length > 1 ? (input.attr('data-multiple-caption') || '').replace('{count}', files.length) : files[0].name);
}

$('#importFileForm').on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
}).on('drop', function (e) {
    droppedFiles = e.originalEvent.dataTransfer.files;
    showFiles(droppedFiles);
});

$('#importFileForm').on('submit', function (e) {
    if ($('#importFileForm')[0].hasAttribute('is-uploading')) {
        return false;
    }

    $('#importFileForm').attr('is-uploading', '');
    if (modernBrowser) {
        e.preventDefault();

        var ajaxData = new FormData($('#importFileForm').get(0));
        if (droppedFiles) {
            $.each(droppedFiles, function (i, file) {
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
            complete: function () {
                $('#importFileForm').removeAttr('is-uploading');
            },
            success: function (data) {
                $('#importFileForm').attr(data.success == true ? 'is-success' : 'is-error', '');
                if (!data.success) {
                    $errorMsg.text(data.error);
                }
            },
            error: function () {
                console.log('error');
            }
        });
    } else {
        var iframeName = 'uploadiframe' + new Data().getTime();
        var tempIframe = $('<iframe id="tempIframe" name="' + iframeName + '" style="display: none;"></iframe>');

        $('body').append(tempIframe);
        $('#importFileForm').attr('target', iframeName);

        $('#tempIframe').one('load', function () {
            var data = JSON.parse($('#tempIframe').contents().find('body').text());
            $('#importFileForm').removeAttr('is-uploading').attr(data.success == true ? 'is-success' : 'is-error', '').removeAttr('target');
            if (!data.success) {
                $errorMsg.text(data.error);
            }
            $('#importFileForm').removeAttr('target');
            $('#tempIframe').remove();
        });
    }
});

var framework = null;
var selectedCompetency = null;

createFramework = function () {
    framework = new EcFramework();
    framework.generateId(repo.selectedServer);
    if (EcIdentityManager.ids.length > 0)
        framework.addOwner(EcIdentityManager.ids[0].ppk.toPk());
    loading("Creating framework...");
    EcRepository.save(framework, function () {
        populateFramework();
    }, error);
}

populateFramework = function () {
    var me = this;
    $("#tree").html("");
    me.fetches = 0;
    selectedCompetency = null;
    refreshSidebar();
    $("#editFrameworkSection #frameworkName").text(framework.getName());
    if (framework.competency == null)
        framework.competency = [];
    if (framework.relation == null)
        framework.relation = [];
    if (queryParams.link == "true")
        $("#editFrameworkSection #frameworkLink").attr("href", framework.shortId()).show();
    repo.precache(framework.competency.concat(framework.relation), function (success) {
        if (framework.competency.length == 0) {
            if ($("#tree").html() == "")
                $("#tree").html("<br><br><center><h3>This framework is empty.</h3></center>");
            showAll();
        } else {
            me.fetches += framework.competency.length;
            for (var i = 0; i < framework.competency.length; i++) {
                refreshCompetency(me, framework, i);
            }
        }
    });
}

function refreshCompetency(me, framework, i) {
    EcCompetency.get(framework.competency[i], function (competency) {
        me.fetches--;
        var treeNode = $("#tree").append("<li class = 'competency'><ul></ul></li>").children().last();
        treeNode.click(function (evt) {
            var me = $(this);
            if (!$(this).hasClass("competency"))
                me = $(this).parents("competency");
            selectedCompetency = EcCompetency.getBlocking(me.attr("id"));
            refreshSidebar();
            evt.stopPropagation();
        });
        treeNode.attr("id", competency.shortId());
        if (competency.description != null && competency.description != "NULL" && competency.description != competency.name)
            treeNode.prepend("<small/>").children().first().text(competency.getDescription());
        treeNode.prepend("<span/>").children().first().text(competency.getName());
        if (queryParams.link == "true")
            treeNode.prepend(" <a style='float:right;' target='_blank'>🔗</a>").children().first().attr("href", competency.shortId());
        if (queryParams.select != null)
            treeNode.prepend("<input type='checkbox'>").children().first().click(function (evt) {
                console.log(evt);
                $(evt.target).parent().find("input").prop("checked", evt.target.checked);
            });
        if (me.fetches == 0) {
            if (framework.relation != undefined && framework.relation.length > 0) {
                me.fetches += framework.relation.length;
                for (var i = 0; i < framework.relation.length; i++) {
                    EcAlignment.get(framework.relation[i], function (relation) {
                        me.fetches--;
                        if (relation.source !== undefined) {
                            if (relation.relationType == "narrows") {
                                $(".competency[id=\"" + relation.target + "\"]").children().last().append($(".competency[id=\"" + relation.source + "\"]"));
                                if (!$(".competency[id=\"" + relation.target + "\"]").hasClass("expandable"))
                                    $(".competency[id=\"" + relation.target + "\"]").addClass("expandable").prepend("<span/>").children().first().text("🔽 ").click(function (evt) {
                                        $(evt.target).parent().children("ul").slideToggle();
                                        if ($(this).text() == "🔽 ")
                                            $(this).text("▶️ ");
                                        else
                                            $(this).text("🔽 ");
                                    });
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
                                            showPage("#editFrameworkSection", framework);
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
                showPage("#editFrameworkSection", framework);
            }
        }
    }, console.log);
}

refreshSidebar = function () {
    var thing = framework;
    if (selectedCompetency != null)
        thing = selectedCompetency;
    $("#editFrameworkSection #sidebarName").text(thing.getName());
    $("#editFrameworkSection #sidebarDescription").text(thing.getDescription());
}

$('#file').on('change', function (e) {
    showFiles(e.target.files);
});
