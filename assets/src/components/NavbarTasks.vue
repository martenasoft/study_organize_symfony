<template>
  <li v-if="totalItems > 0" id="navbar-tasks" :class="classOpen" class="grey dropdown-modal">
    <a data-toggle="dropdown" class="dropdown-toggle" href="#" v-on:click="clickMenu()">
      <i class="ace-icon fa fa-tasks"></i>
      <span class="badge badge-grey">{{ totalItems }}</span>
    </a>

    <ul class="dropdown-menu-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
      <li class="dropdown-header">
        <i class="ace-icon fa fa-check"></i>
        4 Tasks to complete
      </li>

      <li  class="dropdown-content">
        <ul class="dropdown-menu dropdown-navbar">
          <NavbarTaskItem
              v-for="task in tasks"
              v-bind:key="task.id"
              v-bind:task="task"
          />
        </ul>
      </li>

      <li class="dropdown-footer">
        <a href="#">
          See tasks with details
          <i class="ace-icon fa fa-arrow-right"></i>
        </a>
      </li>
    </ul>
  </li>
</template>

<script>

import NavbarTaskItem from './NavbarTaskItem'

export default {
  name: "NavbarTasks",
  components: {
    NavbarTaskItem
  },

  methods: {
    clickMenu: function () {
      this.classOpen = this.classOpen == '' ? 'open' : '';
    }
  },

  data() {
    return {
      classOpen: '',
      totalItems: 8,
      tasks: [
        {id: 1, name: 'Software Update 1', percent: 65},
        {id: 2, name: 'Software Update 2', percent: 67},
        {id: 3, name: 'Software Update 3', percent: 68},
        {id: 4, name: 'Software Update 4', percent: 69},
      ]
    }
  }
}
</script>

<style scoped>

</style>