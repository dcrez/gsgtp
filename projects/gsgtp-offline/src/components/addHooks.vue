<template>
  <div>
         <v-card :loading="performingRequest">
         <v-container>
           <v-card-title>
           Add Hook
           </v-card-title>
           <v-alert v-if="!currentUser" color="error" dark>  
             You must be signed in to add a hook / register for a pull.
           </v-alert>
           <v-card-text>
             <v-form>
               <!-- Find a pull -->
               

              <v-menu ref="menu" v-model="datePickerMenu" :close-on-content-click="false"
                :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="hookForm.pullDate" label="Choose a pull date" prepend-icon="mdi-calendar" readonly
                    v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="hookForm.pullDate" scrollable :allowed-dates="getAllowedDates(pullDates)" color="green lighten-1"
                  event-color="blue">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="datePickerMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
               <div v-if="selectedPull" style="margin-top:-15px">
                <strong>{{selectedPull.title}}</strong>, {{selectedPull.city}}, {{selectedPull.state}}
                </div> 
               <!-- Determine if hook is for a member -->
               <v-switch
                v-model="hookMember"
                label="Member"
                inset
                color="warning"
               ></v-switch>
               <div v-if="hookMember">
               <v-autocomplete
                v-model="hookForm.member.selectedMember"
                label="Select member"
                :items="members"
                hint="Search for primary member associated to tractor."
                item-text="fullName"
                item-value="userId"
                return-object
                chips
                deletable-chips
               >
               </v-autocomplete>
                <div v-if="hookForm.member.selectedMember != {}">
                  
               <v-autocomplete v-model="hookForm.member.vehicle"
                label="Find vehicle"
                :items="onlineMember"
                hint="Select a vehicle."
                item-text="name"
                item-value="id"
                return-object
                chips
                deletable-chips></v-autocomplete>
                <v-autocomplete
                v-model="hookForm.vehicleClass"
                label="Select vehicle class"
                :items="hookForm.member.vehicle.classes"
                hint="Select a vehicle class"
                item-text="name"
                item-value="name"
                v-if="hookForm.member.vehicle"
                multiple
                return-object
                chips
                deletable-chips
               >
               </v-autocomplete>
                </div>
               </div>
               
               <div v-else>
                 <v-text-field v-model="hookForm.nonMember.vehicle" label="Vehicle" hint="Provide a tractor name."></v-text-field>
                 <v-autocomplete
                v-model="hookForm.vehicleClass"
                label="Select vehicle class"
                :items="vehicleClasses"
                hint="Select a vehicle class"
                item-text="name"
                item-value="name"
                v-if="hookForm.nonMember.vehicle"
                multiple
                return-object
                chips
                deletable-chips
               >
               </v-autocomplete>
               </div>
                            <v-text-field v-model="hookForm.pullerName" label="Puller Name" hint="Required for all guest hooks. "></v-text-field>

               <v-switch v-if="userProfile.role === 'admin'"
                v-model="hookFees"
                inset
                color="info"
                label="Hook Fees"
                >
                </v-switch>
                <v-alert dense outlined type="success" v-if="hookForm.successMessage != ''">{{hookForm.successMessage}}</v-alert>
                <v-alert dense outlined type="error" v-if="hookForm.errorMessage != ''">{{hookForm.errorMessage}}</v-alert>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="dismiss(m)">Cancel</v-btn>
                  <v-btn outlined color="success" v-if="hookMember" @click.stop="addMemberHook">Add member hook</v-btn>
                  <v-btn outlined color="success" v-if="!hookMember" @click.stop="addGuestHook">Add guest hook</v-btn>
                </v-card-actions>
             </v-form>
           </v-card-text>
         </v-container>
           </v-card>
     
  </div>
</template>

<script>
import {db} from '../../firebaseconfig.js'
import { mapState } from 'vuex'


export default {
  name: 'addHooks',
  props: ['dateRef', 'memberId'],
  data() {
    return {
      datePickerMenu: false,
      pulls: {},
      vehicleClasses: {},
      vehicles: {},
      hook: {},
      performingRequest: false,
      btmHook: false,
      hookMember: false,
      hookFees: false,
      hookDues: '',
      hookForm: {
        successMessage: '',
        errorMessage: '',
        pullDate: '',
        nonMember: {
          vehicle: '',
        },
        member: {
          vehicle: '',
          selectedMember: '',
        },
        distance: '',
        dq: false,
        pull: [],
        pullerName: '',
        vehicleClass: ''
      }
    }
  },
  firestore() {
    let gsgtpmember 
    return {
      
      //pull: db.collection('pulls').doc(currentPull),
      hook: db.collection('hooks').orderBy("created", "desc").limit(1),
      members: db.collection('members'),
      vehicles: db.collection('vehicles'),
      vehicleClasses: db.collection('vehicleClasses').orderBy("name", "asc").where("active", "==", true),
      pulls: db.collection('pulls').orderBy("date", "desc").where('year', '==', '2021')
    }
  },
  computed: {
    ...mapState(['currentUser','userProfile']),
  
    onlineMember() {
      let hfsm = this.hookForm.member.selectedMember
      let a = this.vehicles
      let c
      c = _.filter(a, function(o) {return o.member.userId == hfsm.userId})
      console.log(c)
      return c 
    },
    offlineMember() {
      let hfsm = this.hookForm.member.selectedMember
      let a = this.vehicles
      let c
      c = _.filter(a, function(o) {return o.member.memberId == hfsm.memberId})
      console.log(c)
      return c 
    },
    currentYear() {
      var d = new Date();
      var n = d.getFullYear();
      return n
    },
    pullDates() {
      let a = this.pulls
      let mp = a.map(x => x.date);
      //console.log(mp);
      return mp
    },
    selectedPull() {
      if (this.hookForm.pullDate != null) {
        let a = this.pulls
        let b = this.hookForm.pullDate
        let c = _.filter(a, {'date': b})
        let d = c.flat()
        console.log(d)
        return d[0]
        
      } 
    },
    duesPaid() {
      if (this.hookForm.member.selectedMember != '') {
      let mR = this.hookForm.member.selectedMember
        let cD = mR.currentDues
        let effEnd = cD.effectiveStart
        if (mR != null && cD != null) {
            
            return effEnd   
        }}
    },
    duesStatus() {
      let hD = new Date(this.hookForm.pullDate)
      let hookYear = hD.getFullYear()
      let duesYear
      
      if (this.duesPaid) { 
        let dd = new Date(this.duesPaid)
        duesYear = dd.getFullYear()
        }
      if (hD != null && this.duesPaid != null) {
         if (duesYear == hookYear) {
           return true
         } else {return false}
      }
    }
  },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
      getAllowedDates(val) {
        return val => this.pullDates.indexOf(val) !== -1
      },
      addMemberHook: function() {
        this.hookForm.errorMessage = ''
        this.performingRequest = true
        console.log(this.selectedPull.id)
        //let form = document.getElementById("addHookForm")
        let vn = this.hookForm.member.vehicle.name
        let hf = this.hookForm
        let sm = hf.member.selectedMember
        let dS = this.duesStatus
        let pullYear = this.selectedPull.date.substring(0,4)
        console.log('dS:'+ dS)
        let cDS

        if (sm.hasOwnProperty('currentDues')) {
          cDS = sm.currentDues
        }
        
        // Begin class eval (create multiple hooks)
        let eachClass = this.hookForm.vehicleClass
          for(let i=0, len=eachClass.length; i<len; i++) {  
            let thisClass = eachClass[i].name
            let classId = _.filter(this.vehicleClasses, {'name': thisClass})
            db.collection('hooks').add({
              vehicle: vn,
              vehicleRef: '/vehicles/'+hf.member.vehicle.id,
              vehicleClass: thisClass,
              classId: classId,
              pullOrder: (Math.random() * 100).toFixed(2),
              pullId: this.selectedPull.id,
              pull: {
                date: this.selectedPull.date,
                track: this.selectedPull.track,
                year:  pullYear
              },
              person: {
                createdBy: this.currentUser.uid,
                memberId: this.hookForm.member.selectedMember.id,
                memberName: this.hookForm.member.selectedMember.fullName,
                pullerName: this.hookForm.pullerName,
                dues: cDS
              },
              fee: 15,
              paid: false
            }).then(function(docRef) {
                console.log("Hook written with ID: ", docRef.id)
                hf.successMessage = "Hook(s) added successfully!"
                hf.pullerName = '',
                hf.isMember = false,
                hf.vehicleClass = ''
                hf.member.vehicle = '',
                hf.nonMember.vehicle = ''
                hf.member.selectedMember = '',
                hf.hookFees = false  
            }).catch(err => {
              this.hookForm.errorMessage = err.message
              
            }); 
            this.performingRequest = false
            }
        },
        addGuestHook: function() {
        this.hookForm.errorMessage = ''
        this.performingRequest = true
        console.log(this.hookForm.pullerName)
        let form = document.getElementById("addHookForm")
        let vn = this.vehicleName
        let hf = this.hookForm
        let pR = this.performingRequest
        let pullYear = this.selectedPull.date.substring(0,4)
        
        // Begin class eval (create multiple hooks)
        let eachClass = this.hookForm.vehicleClass
          for(let i=0, len=eachClass.length; i<len; i++) {  
            let thisClass = eachClass[i].name

            db.collection('hooks').add({
                vehicle: this.hookForm.nonMember.vehicle,
                pull: this.selectedPull,
                pullRef: this.selectedPull.cityRef,
                pullId: this.selectedPull.id,
                pullerName: this.hookForm.pullerName,
                track: this.selectedPull.track,
                dq: this.hookForm.dq,
                vehicleClass: thisClass,
                pullOrder: (Math.random() * 100),
                created: new Date()
            }).then(function(docRef) {
                console.log("Hook written with ID: ", docRef.id)
                hf.successMessage = "Hook(s) added successfully!"
                
                console.log("progress: "+pR)
                hf.pullerName = '',
                hf.isMember = false,
                hf.vehicleClass = ''
                hf.member.vehicle = '',
                hf.nonMember.vehicle = ''
            }).catch(err => {
              console.log(hf.errorMessage)
              hf.errorMessage = err.message
            }); 
            }

            this.performingRequest = false
        },
      addHook: function() {
            // start transition/loading view
           
            let form = document.getElementById("addHookForm")
            let vn = this.vehicleName
            let hf = this.hookForm
            //let doc = this.vehicleForm.name.toLowerCase().split(" ").join("-")

            // add hook to Firestore
            let pullYear = this.selectedPull.date.substring(0,4)
            let eachClass = this.hookForm.vehicleClass

            for(let i=0, len=eachClass.length; i<len; i++) {
            
            let thisClass = eachClass[i].name
            
            db.collection("hooks").add({
                vehicleName: vn,
                vehicleId: this.hookForm.member.vehicle.id,
                pull: this.selectedPull.date,
                pullRef: this.selectedPull.cityRef,
                pullId: this.selectedPull.id,
                pullerName: this.hookForm.pullerName,
                track: this.selectedPull.track,
                isMember: this.hookMember,
                duesPaid: this.hookDues,
                dq: this.hookForm.dq,
                vehicleClass: thisClass,
                pullOrder: (Math.random() * 100),
                pointsYear: pullYear,
                created: new Date(),
                createdBy: this.currentUser.uid
            }).then(function(docRef) {
                console.log("Hook written with ID: ", docRef.id)
                hf.successMessage = "Hook(s) added successfully!"
                hf.pullerName = '',
                hf.isMember = false,
                hf.vehicleClass = ''
                hf.member.vehicle = '',
                hf.nonMember.vehicle = ''
                this.performingRequest = false
            }).catch(err => {
              this.hookForm.errorMessage = err.message
              this.performingRequest = false
            });
            }
            
      },
      dismiss(m) {
        m = ""
      }
    }
  }

</script>