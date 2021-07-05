<template>
  <div>
    <div class="display-1 mt-5 mb-5 font-weight-light no-print">
      Pull Details
      <v-btn fab text color="error" v-if="admin == true" @click="deletePull(pull)">
        <font-awesome-icon icon="trash-alt"></font-awesome-icon>
      </v-btn>
      <v-btn fab text color="success" v-if="admin == true" @click="printPullOrder()">
        <font-awesome-icon icon="print">Print</font-awesome-icon>
      </v-btn>
      <!-- Negative days are for days in the future, positive days are for days in the past //&& daysFromNow >= -4  && daysFromNow <= 1-->
    
      <v-btn class="mb-3 float-right" text color="red darken-3" @click="goBack">
        <v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card>

        <v-card-title>
          <span style="color:red" class="mr-3">{{editedItem.pull.title}} </span>
          {{editedItem.vehicleClass}}
        </v-card-title>
        <v-card-subtitle><strong>Vehicle:</strong> {{editedItem.vehicle}}, <strong>Puller:</strong> <span
            v-if="editedItem.pullerName != ''">{{editedItem.pullerName}}</span>
          <span v-else>{{editedItem.member.fullName}}</span>


        </v-card-subtitle>
        <v-banner v-if="editHookErrMessage">{{editHookErrMessage}}</v-banner>
        <v-card-text>
          <v-text-field v-model="editedItem.distance" label="Distance" color="red darken-3"></v-text-field>
           <v-checkbox v-model="editedItem.dq" label="DQ?" color="red darken-3"></v-checkbox>
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click.stop="close">Cancel</v-btn>
          <v-btn color="green" outlined @click.stop="saveItem()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <div class="pullDetails d-none d-print-block">
      <div class="display-1" style="text-transform: uppercase;">{{pull.title}}</div>
      <div class="overline">{{pull.date}} {{pull.time}} </div>
      <div class="overline">{{pull.city}} {{pull.state}} </div>
      
    </div>

    <v-card class="no-print" flat>

      <v-row>
        <v-col cols="12">
          <!--<iframe style="width:100% border:none;" :src="displayMap(pull)" allowfullscreen></iframe>-->
          <v-card-title>{{pull.title}}
            <v-btn text color="success" v-if="admin == true" @click="updatePull(pull)">
              <font-awesome-icon icon="highlighter"></font-awesome-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle>
            {{pull.description}}<br />
            {{pull.date | moment("dddd, MMMM Do YYYY")}} {{pull.time}}<br />
            <span v-if="pull.address != ''">{{pull.address}}, </span> {{pull.city}}, {{pull.state}}<br />
            <v-btn text :href="directions" class="float-right">Directions</v-btn></v-card-subtitle>
        </v-col>
      </v-row>

      <!--<v-sparkline :value="distances" type="trend" auto-line-width="true" show-labels="true"></v-sparkline>-->
      <v-expand-transition>
        <v-card v-if="revealEdit" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">

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
          <v-col v-for="s in sponsors" :key="s.id" class="d-flex align-center align-content-start" xs="12" sm="6"
            md="3">

            <v-img :src="s.logo" max-width="70" class="mx-auto" />
            <div class="">{{s.name}} </div>

          </v-col>
        </v-row>
      </v-container>
      <v-card class="mt-5 no-print">
        <v-toolbar color="grey lighten-4" flat>
          <v-toolbar-title>Registration 
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div v-if="preRegAvailable">Pre-Registration Open </div>
          <div v-else>Pre-Registration Closed</div>
          <v-spacer v-if="preRegAvailable"></v-spacer>
          <v-toolbar-items>
            <v-btn text v-if="preRegAvailable"><router-link :to="{ name: 'register', params: { id: pull.id, date: pull.date }}">Register</router-link></v-btn>
          </v-toolbar-items>
          <template v-slot:extension>
            <v-tabs align-with-title v-model="tab" fixed-tabs show-arrows>
              <v-tabs-slider color="orange"></v-tabs-slider>
              <v-tab href="#finalPullOrder">
                Pull Order
              </v-tab>
              <v-tab href="#winners">
                Winners
              </v-tab>
              <v-tab href="#fees">
                Hook Fees
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card>
   
      <v-tabs-items :value="tab">
      <v-tab-item value="finalPullOrder">
        <v-container>
          <v-row v-if="byVehicleClass.length == 0">
            <v-col cols="12">
            <v-alert type="info" text outlined color="gray lighten-4">No registrations yet.</v-alert>
            </v-col>
          </v-row>
       <v-row v-for="c in byVehicleClass" :key="c.id" class="pgBreak mt-3">
         <v-col cols="12" >
        <div>
          <div class="font-weight-black" style="font-size: 1.3em;">{{c.vehicleClass}}</div>
          <v-simple-table>

            <thead>
              <tr>
                <th class="text-left">Order</th>
                <th class="text-left">Vehicle</th>
                <th class="text-left">Puller</th>
                <th class="text-left">Distance</th>
                <th class="text-left no-print" v-if="admin == true">Update</th>
                <th class="text-left no-print" v-if="admin == true">Delete</th>
              </tr>
            </thead>
            <tbody >
              <tr v-for="hook in c.hooks" :key="hook['.key']">
                
                <td>{{Math.floor(hook.pullOrder)}}</td>
                <td>{{hook.vehicle}} </td>
                <td v-if="hook.person.pullerName != ''">{{hook.person.pullerName}}</td>
                <td v-else>{{hook.person.memberName}} </td>
                <td v-if="hook.paid">
                  <span v-if="hook.dq">DQ</span>
                  <span v-else>{{hook.distance}}</span>
                  </td>
                <td v-else>
                  <font-awesome-icon icon="lock"></font-awesome-icon>
                </td>
            
                <td v-if="admin == true" class="no-print">
                  <font-awesome-icon @click="editItem(hook)" icon="pencil-alt"></font-awesome-icon>
                </td>
                <td v-if="admin == true" class="no-print">
                  <font-awesome-icon @click="deleteItem(hook)" class="ml-3" icon="trash-alt">
                  </font-awesome-icon>

                </td>
              </tr>
            </tbody>

          </v-simple-table>


        </div>
         </v-col>
       </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item value="winners" class="no-print">
        <v-alert type="info" text outlined v-if="winners.length == 0" class="mt-2" color="gray lighten-4">No winners yet!</v-alert>
        <v-row v-for="c in winners" :key="c.id" class="pgBreak mt-3">
         <v-col cols="12" >
           <v-btn @click="pointsCalc">Points</v-btn>
        <div class="mt-2">
          <div class="font-weight-black" style="font-size: 1.3em;">{{c.vehicleClass}}</div>
          <v-simple-table>

            <thead>
              <tr>
                <th class="text-left">Place</th>
                <th class="text-left">Vehicle</th>
                <th class="text-left">Puller</th>
                <th class="text-left">Distance</th>
                <th class="text-left">Points</th>

     </tr>
            </thead>
            <tbody >
              <tr v-for="hook in c.hooks" :key="hook['.key']">
                
                <td>{{c.hooks.indexOf(hook)+1}}</td>
                <td>{{hook.vehicle}} </td>
                <td v-if="hook.person.pullerName != ''">{{hook.person.pullerName}}</td>
                <td v-else>{{hook.person.memberName}} </td>
                <td v-if="hook.paid">
                  <span v-if="hook.dq">DQ</span>
                  <span v-else>{{hook.distance}}</span>
                  </td>
                <td v-else>
                  <font-awesome-icon icon="lock"></font-awesome-icon>
                </td>
            <td v-if="hook.paid">
                  <span v-if="c.hooks.indexOf(hook)>(pointsmax+1)">{{hookpoints}}</span>
                  <span v-else>{{(pointsmax-(c.hooks.indexOf(hook)))+hookpoints}}</span>
                  </td>
                <td v-else>
                  <font-awesome-icon icon="lock"></font-awesome-icon>
                </td>
               
              </tr>
            </tbody>

          </v-simple-table>


        </div>
         </v-col>
       </v-row>
      </v-tab-item>
      <v-tab-item value="fees" class="no-print">
        <v-container>
        <v-alert type="info" text outlined color="gray lighten-4">If fees are not received as of the Driver's Circle, your pull order is not guaranteed.</v-alert>
        <v-row>
        <v-expansion-panels cols=12>
          <v-expansion-panel v-for="p in byPerson" :key="p.id">
            
              <v-expansion-panel-header>
                <v-col cols="1" v-if="feesDue(p.hooks)>0"><font-awesome-icon icon="dollar-sign" color="red"></font-awesome-icon></v-col>
                <v-col cols="1" v-if="feesDue(p.hooks)==0"><font-awesome-icon icon="lock-open" color="gray"></font-awesome-icon></v-col>
                <v-col>
                <v-list-item-title>{{p.person}}</v-list-item-title>
                </v-col>
                <v-col>Hooks: {{countHooks(p.hooks)}}  
                </v-col>
                <v-col>
                  Due: ${{feesDue(p.hooks)}}
                </v-col>
                <v-col v-if="admin">
                  <v-btn @click="payFees(p.hooks)">Pay</v-btn>
                </v-col>
              </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list-item v-for="h in p.hooks" :key="h.id">
              <v-list-item-content>
              {{h.vehicleClass}}
              </v-list-item-content>
            </v-list-item>
          </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        </v-row>
        </v-container>
      </v-tab-item>
      </v-tabs-items>
    </div>
    <v-dialog v-model="addHookDialog">
      <addHook style="background-color:white !important;" :dateRef='pull.date'></addHook>
    </v-dialog>
  </div>



</template>

<script>
  import {
    fb,
    db
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
        pointsmax:10,
        hookpoints:10,
        hooks: {},
        now: new Date(),
        addHookDialog: false,
        editPull: true,
        editedPull: {
          title: '',
          id: '',
          time: '',
          description: '',
          address: '',
          preRegOpen: null,
          preRegClose: null,
        },
        sponsor: {
          name: '',
          logo: '',
        },
        sponsors: {},
        editHookErrMessage: '',
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
        },
        tab: null   
      }
    },
    components: {
      addHook
    },
    firestore() {
      let currentPull = this.$route.params.id
      return {
        pull: db.collection('pulls').doc(currentPull),
        sponsors: db.collection('pulls').doc(currentPull).collection("sponsors"),
        hooks: db.collection('hooks').where("pullId", "==", currentPull).orderBy("vehicleClass", "asc").orderBy(
          "pullOrder", "asc")
      }
    },
    computed: {
      ...mapState(['currentUser', 'userProfile']),
      directions() {
        let API_KEY = 'AIzaSyAW4Mil1SDOZ5r4CwtZbfsuYqpenEZo7VU'
        let place
        let formattedaddress
        let city = this.pull.city
        let state = this.pull.state
        let address = this.pull.address
        if (address != "") {
          formattedaddress = address.toLowerCase();
          formattedaddress = formattedaddress.replace(/ /g, "+") + ","
        }
        return "https://www.google.com/maps/place/"+ formattedaddress + city + "+" +
          state
      },
      byVehicleClass() {
        let vc =  _.chain(this.hooks).groupBy("vehicleClass").map((value, key) => ({vehicleClass:key, hooks:value})).value()
        return vc
      },
      byPerson() {
        let vc =  _.chain(this.hooks).groupBy("person.memberName").map((value, key) => ({person:key, hooks:value})).value()
        return vc
      },
      preRegAvailable(){
        let o
        let c
        if (this.pull.preRegOpen) {
          o = this.pull.preRegOpen
        }
        if (this.pull.pregRegClose) {
          c = this.pull.preRegClose
        }
        let d = new Date()
        if ((o <= d) && (c > d)){
          return true
        } else { return false}
      },
      admin() {
        let admin
        if (this.$store.state.userProfile.role == 'admin') {
          admin = true
        } else {
          admin = false
        }
        return admin
      },
      winners() {
        let ol = _.orderBy(this.hooks, ['distance'],['asc'])
        console.log("ordered list")
        console.log(ol)
        let vc =  _.chain(ol).filter(function(h) {return h.distance > 0 && !h.dq}).groupBy("vehicleClass").map((value, key) => ({vehicleClass:key, hooks:value})).value()
        console.log("winners chain")
        console.log(vc)
        return vc
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      countHooks(h){
        let hv = h.length
        return hv
      },
      feesDue(h){
        let hv = 0
        let j = _.map(h, function(i){
          if (i.paid == true) {
            hv = hv + 0
          } else {hv = hv + i.fee}
        })
        return hv
      },
      pointsCalc() {
        let pointsmax =20
        let m = _.chain(this.hooks).filter(
          function(h) {
            let d
            let y
            let n = (new Date).getFullYear()
            
            
            if (h.person.dues.effectiveStart) {
              d = new Date(h.person.dues.effectiveStart)
              y = d.getFullYear()
            
            }
            return y == n &&  !h.dq && h.distance 
          }
        )
        .groupBy("vehicleClass")
        .map(function(o){
          o.indexOf()
        })
        .value()
        

        
      },
      payFees(p) {
        _.map(p, function(f){
          let hid = f.id
          let hp = f.paid 
          console.log(hid,hp)
          db.collection("hooks").doc(hid).update({paid:true})
        })
      },
      displayMap(pull) {
        let mm = "place"
        let apk = "AIzaSyANRmi0dbGyOuy8wVjTki2gPHm4_JVAjuM"
        let qq = escape(pull.city + ',' + pull.state)
        let m = "https://www.google.com/maps/embed/v1/" + mm + "?key=" + apk + "&q=" + qq
        console.log(m)
        return m
      },
      deletePull(pull) {
        db.collection('pulls').doc(pull.id).delete();
        this.$router.go(-1)
      },
      editItem(hook) {
        this.editedItem = Object.assign({}, hook)
        this.editedItem.id = hook.id
        this.dialog = true
      },
      modifyPull(pull) {
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
        let dq = this.editedItem.dq
        let isMember
        if (this.editedItem.isMember) {
          isMember = this.editedItem.isMember
        } else {
          isMember = false
        }
        // Shorten reference paths for Firestore
        let hooksRef = db.collection('hooks').doc(hookUpdate)

        // What gets updated with a hook
        var hooksData = {
          distance: this.editedItem.distance,
          dq: dq,
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
        return '#' + item.toLowerCase().split(" ").join("-")
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
        }).then(function (docRef) {
          console.log("Sponsor written with ID: ", docRef)
        })
      },
      editPullRecord() {

      },
      printPullOrder() {
        window.print()
      },

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
      margin-top: 50px;
    }

    .no-print {
      display: none !important;
    }

    .pullDetails {
      position: fixed;
      top: 0;
      width: 100%;
    }

  }
</style>