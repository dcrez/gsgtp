<template>
<div>
  <!-- Just an image -->
  <b-navbar>
    <b-navbar-brand href="#" to="/">
      <img src="../assets/BDPA_Twin-Cities_centered-icon.png" alt="Black Data Processing Associates - Twin Cities Logo" class="d-inline-block align-middle" height="70px">
           </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-nav id="nav-collapse" is-nav class="ml-auto">
        <b-dropdown-item href="#" @click="logout" v-if="currentUser">Log Out</b-dropdown-item>
        <b-dropdown-item href="#" to="login" v-else>Login</b-dropdown-item>
    </b-navbar-nav> 
  </b-navbar>
</div>
</template>

<script>
const fb = require('../firebaseConfig.js')

    import { mapState } from 'vuex'
    
    export default {
        name: 'Header',
        components: {
           
        },
        computed: {
          ...mapState(['currentUser'])
        },
        methods: {
          logout() {
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style>
</style>