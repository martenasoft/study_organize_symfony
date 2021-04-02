<template>
  <div id="app">

    <Navbar
      v-bind:user="user"
    />
    <div class="main-container ace-save-state" id="main-container">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "app",
  computed: mapGetters(["user"]),
  methods: mapActions(["fetchUser"]),


  mounted() {
    if (this.user === null) {
//      this.fetchUser();
    }

   /* if (this.user === null) {
      this.$route.push('Login');
    }
*/

  },



  components: {Navbar}
}
</script>

<style scoped>

</style>