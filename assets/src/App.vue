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

export default {
  name: "app",
  created() {

   // console.log(this.$store.state.user)
    //getUser();
    //console.log({ddd:this.user});
   // this.$router.push({ name: 'Login' });
  },
  data() {
    return {
        user: {id: 1}
      }
  },
  methods: {
    getUser: function () {
      this.$store.commit('getUser');
      console.log(this.$store.state.user);
    }
  },
  components: {Navbar}
}
</script>

<style scoped>

</style>