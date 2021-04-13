jQuery(function ($) {
    /* initialize the external events
        -----------------------------------------------------------------*/

    if (typeof calendarEvents !== undefined) {

        $('.date-picker').datepicker({
            autoclose: true,
            todayHighlight: true
        });

        $('#calendar_color').colorpicker();

        $('#external-events div.external-event').each(function () {
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };

            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });


        /* initialize the calendar
        -----------------------------------------------------------------*/


        var calendar = $('#calendar').fullCalendar({
            //isRTL: true,
            //firstDay: 1,// >> change first day of week

            buttonHtml: {
                prev: '<i class="ace-icon fa fa-chevron-left"></i>',
                next: '<i class="ace-icon fa fa-chevron-right"></i>'
            },

            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            events: calendarEvents,

            eventResize: function (event, delta, revertFunc) {
                changeData(event.id, event.start.format(), event.end.format());
            },

            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            eventDrop: function(event) {
                changeData(event.id, event.start.format(), event.end.format());
            },
            drop: function (date) { // this function is called when something is dropped


                // retrieve the dropped element's stored Event Object
                var originalEventObject = $(this).data('eventObject');
                var $extraEventClass = $(this).attr('data-class');


                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = $.extend({}, originalEventObject);

                // assign it the date that was reported
                copiedEventObject.start = date;
                copiedEventObject.allDay = false;
                if ($extraEventClass) copiedEventObject['className'] = [$extraEventClass];

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }


            }
            ,
            selectable: true,
            selectHelper: true,
            select: function (start, end, allDay) {
                $("#calendar_start").val(start.format('yyyy-MM-DD'));
                $("#calendar_end").val(end.format('yyyy-MM-DD'));
                $("#btn-submit").removeAttr('disabled').removeClass('disabled');
                //calendar.fullCalendar('unselect');
            }
            ,
            eventClick: function (calEvent, jsEvent, view) {
                redirectToEdit(calEvent.id);


            }

        });
    }

})