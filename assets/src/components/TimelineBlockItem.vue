<template>
  <div class="timeline-item clearfix">
    <div class="timeline-info">
      <img alt="Susan't Avatar" src="assets/images/avatars/avatar1.png"/>
      <span class="label label-info label-sm">16:22</span>
    </div>

    <div class="widget-box transparent">
      <div class="widget-header widget-header-small">
        <h5 class="widget-title smaller">
          <a href="#" class="blue">{{ title }}</a>
          <span class="grey">reviewed a product</span>
        </h5>

        <span class="widget-toolbar no-border">
																	<i class="ace-icon fa fa-clock-o bigger-110"></i>
																	16:22
																</span>

        <span class="widget-toolbar">
																	<a href="#" data-action="reload">
																		<i class="ace-icon fa fa-refresh"></i>
																	</a>

																	<a href="#" data-action="collapse">
																		<i class="ace-icon fa fa-chevron-up"></i>
																	</a>
																</span>
      </div>

      <div class="widget-body">
        <div class="widget-main">
          Anim pariatur cliche reprehenderit, enim eiusmod
          <span class="red">high life</span>

          accusamus terry richardson ad squid &hellip;
          <div class="space-6"></div>

          <div class="widget-toolbox clearfix">
            <div class="pull-left">
              <i class="ace-icon fa fa-hand-o-right grey bigger-125"></i>
              <a href="#" class="bigger-110">Click to read &hellip;</a>
            </div>

            <div class="pull-right action-buttons">
              <a href="#">
                <i class="ace-icon fa fa-check green bigger-130"></i>
              </a>

              <a href="#">
                <i class="ace-icon fa fa-pencil blue bigger-125"></i>
              </a>

              <a href="#">
                <i class="ace-icon fa fa-times red bigger-125"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimelineBlockItem",
  props: {
    timelineBlock: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>