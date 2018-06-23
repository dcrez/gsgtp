<template>
  <div id="app" class="container-fluid mt-3">
    <!--<div class="float-right mr-3 w-300" onclick="openNav()">
    <span ><i class="fas fa-bars h3"></i></span>
    <img src="./assets/gsgtp-logo.png" style="height: 6em;">
    </div>
    <nav id="gsgtpsidenav" class="sidenav" role="navigation"> 
       <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
   
    </nav>-->

   
  <div class="main">
    <router-view></router-view>
  </div>
    </div>
</template>


<style>
#app {
  font-family: 'Oswald', Helvetica, Arial, sans-serif;
  font-weight: 300;
  color:black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,h2,h3,h4 {
  font-weight: 400;
  text-transform: uppercase;
}
.navbar-brand {color:black;}
.nav-link{color:#f30;}
.scheduleLink {color:#f30;}
.nav-link:hover {color:black;}

</style>

<style lang="css">
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import url('https://fonts.googleapis.com/css?family=Oswald:300,400');
  @import url('https://use.fontawesome.com/releases/v5.0.13/css/all.css')
</style>

<script>
export default {
  methods: {
    openNav() {
        document.getElementById("gsgtpsidenav").style.width = "300px";
    },
    closeNav() {
        document.getElementById("gsgtpsidenav").style.width = "0";
    }  
  }
}
  

</script>

