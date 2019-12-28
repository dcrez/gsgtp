<template>
  <div id="app">
    <b-row align-h="center" class="brand-icon"><img src="./assets/BDPA_Twin-Cities_centered-icon.png" alt="Black Data Processing Associates - Twin Cities" height="80px"></b-row>
    <Navigation></Navigation>
    <router-view/>
  </div>  
    
</template>

<script>
import { mapState } from 'vuex'
import Navigation from './components/Navigation.vue'

export default {
  components: { Navigation },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style>
html {
  font-family: 'Roboto', sans-serif !important;
  
}

p {
  color:#2A313D !important;
}

a {
  color: purple !important;
}

h1,h2,h3 {
  font-family: 'Staatliches', cursive !important;
  color: #3EB5D6;
}

label {
  font-weight: 700 !important;
}

.brand-icon {
  margin-top:1em;
}

</style>

