<template>
  <div>
    <div class="display-1 mt-5 mb-5 font-weight-light no-print">
      Pull Details
      <v-btn class="mb-3 float-right" text color="red darken-3" @click="goBack">
      <v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back
    </v-btn></div>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        
        <v-card-title>
          <span style="color:red" class="mr-3">{{editedItem.pull.title}} </span>
          {{editedItem.vehicleClass}}
        </v-card-title>
        <v-card-subtitle><strong>Vehicle:</strong> {{editedItem.vehicle}}, <strong>Puller:</strong> <span v-if="editedItem.pullerName != ''">{{editedItem.pullerName}}</span>
        <span v-else>{{editedItem.member.fullName}}</span>


        </v-card-subtitle>
        <v-banner v-if="editHookErrMessage">{{editHookErrMessage}}</v-banner>
        <v-card-text><v-text-field v-model="editedItem.distance" label="Distance" color="red darken-3"></v-text-field>
        <v-text-field v-model="editedItem.place" label="Place" color="red darken-3"></v-text-field>
        <v-text-field v-model="editedItem.points" label="Points" color="red darken-3" type="number" v-if="editedItem.isMember"></v-text-field>
        <v-checkbox v-model="editedItem.dq" label="DQ?" color="red darken-3"></v-checkbox>
        <v-checkbox v-model="editedItem.isMember" label="Member?" color="green darken-3" disabled></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click.stop="close">Cancel</v-btn>
          <v-btn color="green" outlined @click.stop="saveItem()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    
    <div
    class="pullDetails d-none d-print-block"
    >
    <div class="display-1" style="text-transform: uppercase;">{{pull.title}}</div>
    <div class="overline">{{pull.date}} {{pull.time}} </div>
    <div class="overline">{{pull.city}} {{pull.state}} </div>
    </div>


    <v-card class="mx-auto no-print">
      <v-img :src="pull.img" height="200" v-if="pull.img"></v-img>
      <!--<iframe style="width:100% border:none;" :src="displayMap(pull)" allowfullscreen></iframe>-->
      <v-card-text>
        <v-list-item-content>
          <div class="text-uppercase">
          {{pull.date | moment("dddd, MMMM Do YYYY")}} {{pull.time}}
        </div>
        <div class="text--primary text-h5 mt-1">
          {{pull.title}}
        </div>
        <div v-if="pull.description" class="mt-2 text--primary">{{pull.description}}</div>
        <div class="text--primary mt-1"><span v-if="pull.address">{{pull.address}}, </span>{{pull.city}}, {{pull.state}}</div>
        
      </v-list-item-content>
      </v-card-text>
      <v-card-actions class="no-print">
        <v-spacer></v-spacer>
        <v-btn fab text color="error" v-if="admin == true" @click="deletePull(pull)"><font-awesome-icon icon="trash-alt"></font-awesome-icon></v-btn>
        <v-btn fab text color="success" v-if="admin == true" @click="updatePull(pull)"><font-awesome-icon icon="highlighter"></font-awesome-icon></v-btn>
        <v-btn fab text color="success" v-if="admin == true" @click="printPullOrder()"><font-awesome-icon icon="print">Print</font-awesome-icon></v-btn>
        <!-- Negative days are for days in the future, positive days are for days in the past //&& daysFromNow >= -4  && daysFromNow <= 1-->
        <v-btn text color="green" v-if="pull.track != 'N/A' && daysFromNow >= -4  && daysFromNow <= 1" @click.stop="addHookDialog = true" >Register</v-btn>
      </v-card-actions>
    <!--<v-sparkline :value="distances" type="trend" auto-line-width="true" show-labels="true"></v-sparkline>-->
    <v-expand-transition>
      <v-card v-if="revealEdit"
      class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >

      <v-container>
        <v-card-title>Edit Pull</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedPull.title" label="Title"></v-text-field>
          <v-text-field v-model="editedPull.description" label="Description (Optional)"></v-text-field>
          <v-text-field v-model="editedPull.address" label="Address"></v-text-field>
          <v-text-field v-model="editedPull.city" label="City"></v-text-field>
          <v-text-field v-model="editedPull.date" label="Date"></v-text-field>
          <v-text-field v-model="editedPull.time" label="Time"></v-text-field>
          <v-text-field v-model="editedPull.img" label="Image URL"></v-text-field>
          <v-row class="sponsors">
            <v-col md="6">
            <v-text-field prepend-icon="fa-tractor" label="Sponsor Name" v-model="sponsor.name">
            </v-text-field>
            </v-col>
            <v-col md="5">
            <v-text-field prepend-icon="fa-tractor" label="Sponsor Logo URL" v-model="sponsor.logo">
            </v-text-field>
            </v-col>
            <v-col md="1">
            <v-btn depressed color="primary" dark @click="addSponsor">Add</v-btn>
            </v-col>
        </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelUpdate">Cancel</v-btn>
          <v-btn color="green" outlined @click="modifyPull(pull)">Save</v-btn>
        </v-card-actions>
      </v-container>
      
      </v-card>
    </v-expand-transition>
    </v-card>

    <div v-if="pull.track == 'N/A'" class="mt-4">
      <v-banner two-line color="green">
        <v-avatar slot="icon" size="60px">
          <v-icon dark>far fa-person-sign</v-icon>
        </v-avatar>
        No tractors necessary! This is an event where we all meet up and talk shop.
      </v-banner>
    </div>
    <div v-else>

<v-container class="mt-5" v-if="sponsors.length > 0">
  
<h2 class="overline">Sponsored by</h2>
<v-row>
<v-col v-for="s in sponsors" :key="s.id" class="d-flex align-center align-content-start" xs="12" sm="6" md="3" >
     
         <v-img :src="s.logo" max-width="70" class="mx-auto"/>
         <div class="">{{s.name}} </div>
        
</v-col>
</v-row>
</v-container>

      <!--<v-slide-group multiple show-arrows>
        <v-slide-item v-for="n in classes" :key="n['.index']">
          <v-btn class="mx-2 mt-5" active-class="primary white--text" depressed :to="classHash(n)">{{n}}</v-btn>
        </v-slide-item>
      </v-slide-group>-->
      <div v-for="c in classes" :key="c['.index']" class="pgBreak">
        
        <v-toolbar class="mt-5 font-weight-black" elevation="0" style="text-transform: uppercase;" >
          <v-toolbar-title v-bind:id="classId(c)">{{c}}</v-toolbar-title>
          
          </v-toolbar>
        <v-simple-table v-if="hooks.vehicleClass = c" dark>
          
          <thead>
            <tr>
              <th class="text-left">Vehicle</th>
              <th class="text-left">Puller</th>
              <th class="text-left">Distance</th>
              <th class="text-left">Points</th>
              <th class="text-left" v-if="admin == true">Update</th>
              <th class="text-left" v-if="admin == true">Delete</th>
            </tr>
          </thead>
          <tbody v-for="(hook) in hooks" :key="hook['.key']">
            <tr v-if="hook.vehicleClass == c">
              <span hidden>{{hook.id}}</span>
              <td>{{hook.vehicle}} </td>
              <td v-if="hook.pullerName != ''">{{hook.pullerName}}</td>
              <td v-else>{{hook.member.fullName}}</td>
              <td>{{hook.distance}}</td>
              <td v-if="hook.isMember && hook.duesPaid && hook.hookFees">{{hook.points}}</td>
              <td v-else><font-awesome-icon icon="lock"></font-awesome-icon></td>
              <td v-if="admin == true">
                <font-awesome-icon @click="editItem(hook)" icon="pencil-alt" color="white"></font-awesome-icon>
              </td>
              <td v-if="admin == true">
                <font-awesome-icon @click="deleteItem(hook)" class="ml-3" color="white" icon="trash-alt"></font-awesome-icon>
                
              </td>
            </tr>
          </tbody>

        </v-simple-table>
       

      </div>
    </div>
     <v-dialog v-model="addHookDialog" >
        <addHook style="background-color:white !important;" :dateRef='pull.date'></addHook>
      </v-dialog>
  </div>



</template>

<script>
  import {
    fb,db
  } from '../../firebaseconfig.js'
  import {
    mapState
  } from 'vuex'
import addHook from '@/components/addHooks.vue'

  export default {
    name: 'pullDetails',
    data() {
      return {
        pull: {},
        hooks: {},
        addHookDialog: false,
        editPull: true,
        editedPull: {
          title: '',
          id: '',
          time: '',
          description: '',
          address: '',
          img: ''
        },
        searchClass: '',
        sponsor: {
          name: '',
          logo: '',
        },
        sponsors: {},
        editHookErrMessage: '',
        graphLabels: [],
        graphValues: [],
        filterHooks: '',
        dialog: false,
        revealEdit: false,
        editedItem: {
          id: '',
          title: '',
          distance: null,
          place: '',
          points: 0,
          isMember: '',
          pull: {},
          dq: false
        }
      }
    },
    components: {addHook},
    firestore() {
      let currentPull = this.$route.params.id
      return {
        pull: db.collection('pulls').doc(currentPull),
        sponsors: db.collection('pulls').doc(currentPull).collection("sponsors"),
        hooks: db.collection('hooks').where("pullId", "==", currentPull).orderBy("vehicleClass", "asc")
      }
    },
    computed: {
      ...mapState(['currentUser', 'userProfile']),  
      byVehicleClass() {
        return _.chain(this.hooks).groupBy("vehicleClass")
      },
      admin: function() { 
      let admin 
      if (this.$store.state.userProfile.role == 'admin') {return admin = true} else {return admin = false}
      return admin
      },
    distances() {
      let distance = this.hooks.map(hook => hook.distance)
      console.log(distance)
      let hookNumbers = distance.map(function (x) {return parseInt(x,10)})
      console.log(hookNumbers)
      return hookNumbers
    },
    classes() {
     const unique = [...new Set(this.hooks.map(hook => hook.vehicleClass))]
      
      return unique
    },
    daysFromNow() {
      var now = new Date();
      var pullDate = new Date(this.pull.date);
      var differenceInTime = now.getTime() - pullDate.getTime()
      var differenceInDays = differenceInTime / (1000*3600*24)
      return differenceInDays
    },
    admin: function() { 
      let admin 
      if (this.$store.state.userProfile.role == 'admin') {return admin = true} else {return admin = false}
      return admin
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      displayMap(pull){
       let mm = "place"
       let apk = "AIzaSyANRmi0dbGyOuy8wVjTki2gPHm4_JVAjuM"
       let qq = escape(pull.city+','+pull.state)
       let m = "https://www.google.com/maps/embed/v1/"+mm+"?key="+apk+"&q="+qq
       console.log(m)
       return m
      },
      deletePull (pull) {
           db.collection('pulls').doc(pull.id).delete();
           this.$router.go(-1)
       },
      editItem(hook) {
        this.editedItem = Object.assign({}, hook)
        this.editedItem.id = hook.id
        this.dialog = true
      },
      modifyPull(pull){
        let pullUpdate = this.editedPull.id
        let pullRef = db.collection("pulls").doc(pullUpdate)

        var pullData = {
          address: this.editedPull.address,
          city: this.editedPull.city,
          date: this.editedPull.date,
          description: this.editedPull.description,
          points: this.editedPull.points,
          state: this.editedPull.state,
          time: this.editedPull.time,
          title: this.editedPull.title,
          track: this.editedPull.track,
          img: this.editedPull.img
        }

        pullRef.update(pullData)
        this.editedPull = !this.editedPull
        this.revealEdit = !this.revealEdit
      },
      updatePull(pull) {
        this.revealEdit = !this.revealEdit
        this.editedPull = Object.assign({}, pull)
        this.editedPull.id = pull.id
        this.editPull = !this.editPull
      },
      cancelUpdate() {
        this.editedPull = {}
        this.editedPull.id = {}
        this.editPull = !this.editPull
        this.revealEdit = !this.revealEdit
      },
      saveItem() {
        // Declare variables in order to pass Ids to Firestore
        let hookUpdate = this.editedItem.id
        let hookClass = this.editedItem.vehicleClass
        let hookVehicle = this.editedItem.vehicleName
        let hookYear = this.editedItem.pointsYear
        let hookDate = this.editedItem.pull
        let isMember
        if (this.editedItem.isMember) {
          isMember = this.editedItem.isMember
        } else {isMember = false}

        // Shorten reference paths for Firestore
        let hooksRef = db.collection('hooks').doc(hookUpdate)
        
        // What gets updated with a hook
        var hooksData = {
          date: this.editedItem.pull,
          distance: this.editedItem.distance,
          place: this.editedItem.place,
          points: parseInt(this.editedItem.points),
          dq: this.editedItem.dq,
          isMember: isMember,
          updatedBy: this.currentUser.uid,
          updated: new Date()
        }

        // What gets overwritten with points
        hooksRef.update(hooksData)
        this.close()
      },
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
        }, 300)
      },
      deleteItem(hook) {
        db.collection('hooks').doc(hook.id).delete();
      },
      sortBy(value) {
        let hooks = _.sortBy(this.hooks, [value, 'desc'])
        return hooks
      },
      classId(item) {
        return item.toLowerCase().split(" ").join("-")
      },
      classHash(item) {
        return '#'+item.toLowerCase().split(" ").join("-")
      },
      addSponsor() {
            // start transition/loading view
            let doc = this.editedPull.id
            
            // add pull to Firestore
            db.collection("pulls").doc(doc).collection("sponsors").add({
                name: this.sponsor.name,
                logo: this.sponsor.logo,
                created: new Date(),
                createdBy: this.currentUser.uid
            }).then(function(docRef) {
                console.log("Sponsor written with ID: ", docRef)
            })},
      editPullRecord() {

      },
      printPullOrder() {
        window.print()
      }
    }
  }
</script>

<style>

@media print {
body {
    overflow: auto;
    height: auto;
}

.pgBreak {
    page-break-after: always;
    margin-top:50px;
}

.no-print {
    display: none !important;
}

.pullDetails {
  position:fixed;
  top:0;
  width: 100%;
}

}

</style>