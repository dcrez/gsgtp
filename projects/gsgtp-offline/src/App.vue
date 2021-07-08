<template>
    <v-app id="app" style="background-color:white;">
      <v-navigation-drawer v-model="drawer" fixed temporary class="no-print" width="350">
        <v-list class="">
          <v-list-item to="/" >
          <v-img contains src="@/assets/logo.png" contain height="150px" />
          </v-list-item>
          
          <v-divider class="mt-3 mb-3"></v-divider>
          <v-list-item-group class="mb-5">
            <v-list-item>
              <v-list-item-title class="overline">Frequent Activities</v-list-item-title>
            </v-list-item>
            <v-list-item to="/login" v-if="currentUser.email == null">
              <v-list-item-icon><v-icon small>fad fa-sign-in</v-icon></v-list-item-icon>
              <v-list-item-content>Login or Create Profile</v-list-item-content>
            </v-list-item>
            <v-list-item v-else @click="logout">
              <v-list-item-icon><v-icon small>fad fa-sign-out</v-icon></v-list-item-icon>
              <v-list-item-content>Log out</v-list-item-content>
            </v-list-item>

            <v-list-item to="/">
              <v-list-item-icon><v-icon small>fad fa-calendar</v-icon></v-list-item-icon>
              <v-list-item-content>Schedule</v-list-item-content>
            </v-list-item>
            <v-list-item to="/standings">
              <v-list-item-icon><v-icon small>fas fa-trophy-alt</v-icon></v-list-item-icon>
              <v-list-item-content>Points</v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title class="overline">Learn More</v-list-item-title>
            </v-list-item>
            <v-list-item href="/gsgtp-rule-book-2021.pdf" target="_blank">
              <v-list-item-icon><v-icon small>fad fa-ruler-triangle</v-icon></v-list-item-icon>
              <v-list-item-content>Rules</v-list-item-content>
            </v-list-item>
            <v-list-item to="/about">
              <v-list-item-icon><v-icon small>fas fa-address-card</v-icon></v-list-item-icon>
              <v-list-item-content>About Us</v-list-item-content>
            </v-list-item>
           
            <v-list-item to="/classes">
              <v-list-item-icon><v-icon small>fad fa-tractor</v-icon></v-list-item-icon>
              <v-list-item-content>Classes</v-list-item-content>
            </v-list-item>
            
            <v-list-item @click.stop="awardsDialog = !awardsDialog">
              <v-list-item-icon><v-icon small>fas fa-sack-dollar</v-icon></v-list-item-icon>
              <v-list-item-content>Awards</v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="feesDialog = !feesDialog" disabled>
              <v-list-item-icon><v-icon small>fas fa-dollar-sign</v-icon></v-list-item-icon>
              <v-list-item-content>Fees</v-list-item-content>
            </v-list-item>
            <v-list-item to="/host">
              <v-list-item-icon><v-icon small>fad fa-car-building</v-icon></v-list-item-icon>
              <v-list-item-content>Host Cities</v-list-item-content>
            </v-list-item>
          </v-list-item-group>  
<v-divider></v-divider>
            <v-list-item v-if="admin">
              <v-list-item-title class="overline">Admin</v-list-item-title>
            </v-list-item>
          <v-list-item-group v-if="admin == true">
            <v-list-item><v-list-item-avatar><font-awesome-icon icon="calendar-alt" color="pink"></font-awesome-icon></v-list-item-avatar>Add Event</v-list-item>
            <v-list-item><v-list-item-avatar></v-list-item-avatar>members</v-list-item>
          </v-list-item-group>
                </v-list>
      </v-navigation-drawer>
      <v-app-bar
        app
        flat
        class="no-print"
        height="75"
        color="transparent"
        >
  
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" ></v-app-bar-nav-icon>
        <v-img
          height="75"
          src="@/assets/logo.png"
          alt="Gopher State Garden Tractor Pullers logo"
          class="mx"
          contain
          @click.stop="goHome()"
         />

         
  
        
        
      </v-app-bar>
      
      <v-main style="margin-bottom:50px !important;"> 
        <v-container>
          <router-view class=""></router-view>
        </v-container>
     
      </v-main>
      <!--
    <v-container v-if="admin == true">
    <v-speed-dial v-model="adminSpeedy" fixed bottom right>
      <template v-slot:activator>
        <v-btn v-model="adminSpeedy" color="green darken-2" dark fab>
        <font-awesome-icon icon="lock-open" v-if="adminSpeedy" ></font-awesome-icon>
        <font-awesome-icon icon="lock" v-else ></font-awesome-icon>
      
        </v-btn>
      </template>
      <v-btn fab dark small color="pink" to="/addEvent"></font-awesome-icon>
</v-btn>
      <v-btn fab dark small color="indigo" to="/member/add"><font-awesome-icon icon="user" color="white"></font-awesome-icon></v-btn>
      <v-btn fab dark small color="blue" @click.stop="addVehicleDialog = true"><font-awesome-icon icon="tractor" color="white"></font-awesome-icon></v-btn>
      <v-btn fab dark small color="amber" @click.stop="addHookDialog = true"><font-awesome-icon icon="link" color="white"></font-awesome-icon></v-btn>
      <v-btn fab dark small color="deep-orange" to="/members"><font-awesome-icon icon="dollar-sign" color="white"></font-awesome-icon></v-btn>
      </v-speed-dial>
    </v-container>
-->
     
      <v-dialog v-model="addVehicleDialog">
        <addVehicle style="background-color:white;"></addVehicle>
      </v-dialog>
      <v-dialog v-model="addHookDialog">
        <addHook style="background-color:white;"></addHook>
      </v-dialog>
      <v-dialog v-model="awardsDialog" :awardsDialog.sync="awardsDialog" >
        <awards style="background-color:white;"></awards>
      </v-dialog>
      <v-dialog v-model="feesDialog">
        <fees style="background-color:white;"></fees>
      </v-dialog>
  </v-app>

    
</template>

<script>
import {auth, db, users} from '../firebaseconfig.js'
import {mapState} from 'vuex'
import addVehicle from './components/addVehicle.vue'
import addHook from './components/addHooks.vue'
import awards from './components/awards.vue'
import fees from './components/fees.vue'

export default {
  name: 'App',

  components: {
    addVehicle,addHook, awards, fees
  },

  data: () => ({
    drawer: false,
    addMemberDialog: false,
    addVehicleDialog: false,
    addHookDialog:false,
    awardsDialog: false,
    feesDialog: false,
    adminSpeedy: false,
    group: null,
    currentYear: '2021',
    navcolor:'',
    items : [
      
      {icon: '', text: 'About Us', link: '/about'},
      {icon: '', text: 'Classes', link: '/vehicleClasses'},
      {icon: '', text: 'Host Cities', link: '/host'},
      
    ]
    //
  }),
  firestore() {
    return {
      //vehicleClasses: db.collection("vehicleClasses")
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    logout() {
      auth.signOut().then(() => {
        location.reload()
        console.log('auth signed out and page reloaded')
        this.$store.dispatch('clearData')
        console.log('vuex cleared')
      }).catch(err => {
        console.log(err)
      })
    },
    updateDialog(e) {
      awardsDialog = !awardsDialog
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  computed: {
    ...mapState(['currentUser', 'userProfile', 'userRole']),
    admin: function() { 
      let admin 
      if (this.$store.state.userProfile.role == 'admin') {return admin = true} else {return admin = false}
      return admin
      }
  },
  mounted() {
    //let fontawesomescript = document.createElement('script')
    //fontawesomescript.setAttribute('src', 'https://kit.fontawesome.com/be2cd14556.js')
    //document.head.appendChild(fontawesomescript)
  }
};
</script>

<style>
a {
  color: #AF372F !important}

body {
  font-size: 1.5em import !important;
}

body::-webkit-scrollbar {
  width: 0.5em;
}
 
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
body::-webkit-scrollbar-thumb {
  background-color:red;
  outline: 1px solid black;
}


@media print {
  .no-print {
    display: none !important
  }
}

</style>