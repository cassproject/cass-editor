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

$('#file').on('change', function (e) {
    showFiles(e.target.files);
});
