$(function () {

    $(' #calendar_item_dateStartEnd')
        .daterangepicker({
            'applyClass': 'btn-sm btn-success',
            'cancelClass': 'btn-sm btn-default',
            opens: 'left',
            timePicker: true,
            autoUpdateInput: false,
            locale: {
                format: 'DD/MM/YYYY hh:mm',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
            }
        });

    $('#calendar_item_calendars, #calendar_item_calendar').multiselect({
        enableFiltering: true,
        enableHTML: true,
        buttonClass: 'btn btn-white ',
        templates: {
            button: '<button type="button" class="multiselect dropdown-toggle form-control" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
            ul: '<ul class="multiselect-container dropdown-menu"></ul>',
            filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
            filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
            li: '<li><a tabindex="0"><label></label></a></li>',
            divider: '<li class="multiselect-item divider"></li>',
            liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
        }
    });
});