<template>
  <div class="timeline-container">
    <div class="timeline-label">
													<span class="label label-primary arrowed-in-right label-lg">
														<b>Today</b>
													</span>
    </div>

    <div class="timeline-items">
      <TimelineBlockItem />
    </div><!-- /.timeline-items -->
  </div>
</template>

<script>
import TimelineBlockItem from "./TimelineBlockItem"

export default {
name: "TimelineBlock"
}
</script>

<style scoped>

</style>