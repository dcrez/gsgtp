<template>
  <div id="app" class="container-fluid">
    <nav class="navbar navbar-expand-sm bg-light fixed-top">
      <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <router-link :to="{name: 'home'}" class="navbar-brand">Home</router-link>
          </li>
          <li class="nav-item">
              <router-link :to="{name: 'addPull'}" class="nav-link">Add Pull</router-link>
          </li>
          
          <li>
              <router-link :to="{name: 'listPulls'}" class="nav-link">List Pulls</router-link>
          </li>
          <li>
           <router-link :to="{name: 'scheduleEvent'}" class="nav-link">Schedule Event</router-link>
            </li>
            
              <li>
                <router-link :to="{name: 'listEvents'}" class="nav-link">List Events</router-link>
                </li>            
        </ul> 
    </nav>
    <router-view></router-view>
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
.nav-link {color:#f30;}
.nav-link:hover {color:black;}
</style>

<style lang="css">
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import url('https://fonts.googleapis.com/css?family=Oswald:300,400');
</style>