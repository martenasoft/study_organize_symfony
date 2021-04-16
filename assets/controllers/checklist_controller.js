import './../js/bootstrap-tag.min.js';

$(function () {

    $('#checklist_color').ace_colorpicker();

      /*  var tag_input = $('#checklist_title');
        try {
            tag_input.tag(
                {
                    placeholder: tag_input.attr('placeholder'),
                    source: function (query, process) {
                        $.get(getTagDataUrl(query), function (date) {
                            console.log(date);
                        });
                        /!* $.ajax({url: 'remote_source.php?q=' + encodeURIComponent(query)})
                             .done(function (result_items) {
                                 process(result_items);
                             });*!/
                    }
                }
            );

        } catch (e) {
            console.error(e)
        }
*/

});