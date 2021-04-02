<template>
  <div class="row">
    <div class="col-xs-12">
      <!-- PAGE CONTENT BEGINS -->
      <div class="row">
        <div class="col-sm-9">
          <div class="space"></div>

          <FullCalendar :options="calendarOptions" />
        </div>

        <div class="col-sm-3">
          <div class="widget-box transparent">
            <div class="widget-header">
              <h4>Draggable events</h4>
            </div>

            <div class="widget-body">
              <div class="widget-main no-padding">
                <div id="external-events">
                  <div class="external-event label-grey" data-class="label-grey">
                    <i class="ace-icon fa fa-arrows"></i>
                    My Event 1
                  </div>

                  <div class="external-event label-success" data-class="label-success">
                    <i class="ace-icon fa fa-arrows"></i>
                    My Event 2
                  </div>

                  <div class="external-event label-danger" data-class="label-danger">
                    <i class="ace-icon fa fa-arrows"></i>
                    My Event 3
                  </div>

                  <div class="external-event label-purple" data-class="label-purple">
                    <i class="ace-icon fa fa-arrows"></i>
                    My Event 4
                  </div>

                  <div class="external-event label-yellow" data-class="label-yellow">
                    <i class="ace-icon fa fa-arrows"></i>
                    My Event 5
                  </div>

                  <div class="external-event label-pink" data-class="label-pink">
                    <i class="ace-icon fa fa-arrows"></i>
                    My Event 6
                  </div>

                  <div class="external-event label-info" data-class="label-info">
                    <i class="ace-icon fa fa-arrows"></i>
                    My Event 7
                  </div>

                  <label>
                    <input type="checkbox" class="ace ace-checkbox" id="drop-remove" />
                    <span class="lbl"> Remove after drop</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PAGE CONTENT ENDS -->
    </div><!-- /.col -->
  </div><!-- /.row -->
</template>

<script>

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
name: "Calendar",
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        select: this.handleSelect,
        selectable: true,
        unselectAuto: true,
        events: [
          { title: 'event 1-4', start: '2021-04-01', end: '2021-04-04'},
          { title: 'event 1', date: '2021-04-01' },
          { title: 'event 2', date: '2021-04-02' }
        ]
      }
    }
  },
  methods: {
    handleSelect: function(start, end, allDay) {
      console.log(start, end, allDay);
    //  this.$refs.


    },
    handleDateClick: function(arg) {
      alert('date click! ' + arg.dateStr);
    }
  }
}
</script>

<style scoped>

</style>