<template>
  <li>
    <a href="#">
      <div class="clearfix">
        <span class="pull-left">{{ task.name }}</span>
        <span class="pull-right">{{ task.percent }}%</span>
      </div>

      <div class="progress progress-mini">
        <div style="width:65%" class="progress-bar"></div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: "NavbarTaskItem",
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>