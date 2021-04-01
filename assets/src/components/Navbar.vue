<template>
  <div v-if="user" id="navbar" class="navbar navbar-default ace-save-state">
    <div class="navbar-container ace-save-state" id="navbar-container">
      <button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
        <span class="sr-only">Toggle sidebar</span>

        <span class="icon-bar"></span>

        <span class="icon-bar"></span>

        <span class="icon-bar"></span>
      </button>

      <div class="navbar-header pull-left">
        <a href="index.html" class="navbar-brand">
          <small>
            <i class="fa fa-leaf"></i>
            Ace Admin {{ user }}
          </small>
        </a>
      </div>

        <NavbarDropDown/>

    </div><!-- /.navbar-container -->
  </div>
</template>

<script>
import NavbarDropDown from "./NavbarDropDown";

export default {
  name: "Navbar",
  props: [
      'user'
  ],
  components: {
    NavbarDropDown
  }
}
</script>

<style scoped>

</style>