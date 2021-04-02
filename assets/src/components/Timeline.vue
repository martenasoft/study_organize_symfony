<template>
  <div id="timeline-1">
    <div class="row">
      <div class="col-xs-12 col-sm-10 col-sm-offset-1">
        <div v-if="timeline.length > 0">
          <TimelineBlock
              v-for="timelineBlock in timeline"
              v-bind:key="timelineBlock.id",
              v-bind:timelineBlock="timelineBlock",

          />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import TimelineBlock from "./TimelineBlock";

export default {
  name: "Timeline",
  data() {
    return {
      timeline: [
        {
          id:1,
          title: 'Today',
          items: [
            {
              time: '16:22',
              title: 'Susan'
            }
          ]
        }
      ]
    };
  },
  components: {TimelineBlock},
  comments: {
    TimelineBlock
  }
}
</script>

<style scoped>

</style>