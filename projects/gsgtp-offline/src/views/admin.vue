<template>
  <div>
    <v-card>
    <v-toolbar class="mt-5" color="red" dark @click="btmMembers = !btmMembers">
        <v-toolbar-title>Members</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-icon>fas fa-smile-plus</v-icon>  
    </v-toolbar>
    <v-card-text v-for="value in member" :key="value['.key']"><strong>Last updated:</strong> {{value.firstName}} {{value.lastName}}</v-card-text>
    </v-card>

    <v-card>
    <v-toolbar class="mt-5" color="green" dark @click="btmVehicle = !btmVehicle">
        <v-toolbar-title>Vehicles</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-icon>fad fa-tractor</v-icon>  
    </v-toolbar>
    <v-card-text><strong>Last updated:</strong> {{vehicle}}</v-card-text>
    </v-card>

    <v-card>
    <v-toolbar class="mt-5" color="gray" dark @click="btmHook = !btmHook">
        <v-toolbar-title>Hooks</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-icon>fad fa-compress-alt</v-icon>  
    </v-toolbar>
    <v-card-text><strong>Last updated:</strong> {{hook}}</v-card-text>
    </v-card>
    
    <v-bottom-sheet v-model="btmMembers" fullscreen>
        <v-sheet class="text-center">
            <div class="py-3">
              <v-container>
                <h2>Add member form</h2>
                <v-form>
                  <form id="addMemberForm">
                  <v-row>
                  <v-col cols="12" md="6">
                  <v-text-field v-model="memberForm.firstName" label="First Name" color="secondary" :type="string"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                  <v-text-field v-model="memberForm.lastName" label="Last Name" color="secondary" :type="string"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                  <v-text-field v-model="memberForm.address" label="Address, City, State, Zip" color="secondary" :type="string"></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12">
                  <v-text-field v-model="memberForm.phonenumber" label="Phone Number" color="secondary" :type="tel"></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12">
                  <v-text-field v-model="memberForm.emailAddress" label="Email Address" color="secondary" :type="email"></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12">
                  <v-text-field v-model="memberForm.countTractors" label="Number of Tractors" color="secondary" :type="number"></v-text-field>
                  </v-col>
                  </v-row>
                  <v-row>
                  <v-col cols="12" md="4">  
                  <v-radio-group v-model="memberForm.membershipType" label="Membership Type">
                    <v-radio label="Single" value="single" class="" color="orange darken-3"></v-radio>
                    <v-radio label="Household" value="household" color="orange darken-3"></v-radio>
                  </v-radio-group>
                  </v-col>
                  <v-col cols="12" md="4">
                  <v-text-field v-model="outstandingdues" :type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                  <v-switch inset color="orange darken-3" label="Membership dues paid?" v-model="duesPaid"></v-switch>
                  </v-col>
                  </v-row>
                  <v-btn @click="addMember">Add member</v-btn>
                  </form>
                </v-form>
          
       

              </v-container>
            </div>
        </v-sheet>
    </v-bottom-sheet>
     <v-bottom-sheet v-model="btmVehicle">
       <v-sheet class="text-center">
         <v-container>
           <h1>Add Vehicle</h1>
           <v-form id="addVehicleForm">
            
               <v-text-field label="Vehicle Name" v-model="vehicleForm.name" color="secondary" hint="A unique name for the tractor that is different from all other members."></v-text-field>
               <v-autocomplete 
                v-model="vehicleForm.memberLookup" 
                label="Lookup Member"
                :items="members" 
                hint="Select a member who is primarily responsible for this vehicle."
                item-text="emailAddress"
                item-value="id"
                persistent-hint
                color="secondary"
                return-object
                chips
                >
                </v-autocomplete>
                <v-autocomplete v-model="vehicleForm.vehicleClasses" :items="vehicleClasses" multiple chips return-object item-text="name" item-value="name" color="secondary" label="Choose a vehicle class (or classes).">
                </v-autocomplete>
               <v-btn @click="addVehicle">Add vehicle</v-btn>
             
           </v-form>
         </v-container>
       </v-sheet>
     </v-bottom-sheet>

     <v-bottom-sheet v-model="btmHook">
       <v-sheet class="text-center">
         <v-container>
           <h1>Add Hook</h1>
           <v-form id="addHookForm">
             <v-row>
               <v-col cols="6">
               <v-autocomplete
                v-model="hookForm.pull"
                :items="pulls"
                item-text="date"
                item-value="id"
                return-object
                color="secondary"
                label="Pull Date"
                clearable
                >
               </v-autocomplete> 
               </v-col>
               <v-col cols="6">
            <v-switch v-model="hookMember" label="Member?" color="secondary" inset></v-switch>
               </v-col>
             </v-row>
               <v-text-field label="Vehicle Name" v-model="hookForm.nonMember.vehicle" v-if="!hookMember" color="secondary" hint="A unique name for the tractor that is different from all other members."></v-text-field>
               <v-autocomplete 
                v-model="hookForm.member.vehicle" 
                label="Lookup Vehicle"
                v-if="hookMember"
                :items="vehicles" 
                hint="Select a vehicle"
                item-text="name"
                item-value="id"
                persistent-hint
                color="secondary"
                return-object
                chips
                clearable
                >
                </v-autocomplete>
                <v-autocomplete v-model="hookForm.vehicleClass" :items="vehicleClasses" multiple clearable chips return-object item-text="name" item-value="name" color="secondary" label="Choose a vehicle class (or classes).">
                </v-autocomplete>
               <v-btn @click="addHook">Add hook</v-btn>
             
           </v-form>
         </v-container>
       </v-sheet>
     </v-bottom-sheet>
  </div>
</template>

<script>
import {db} from '../../firebaseconfig.js'
import { mapState } from 'vuex'
export default {
  name: 'admin',
  data() {
    return {
      performingRequest: false,
      pull: {},
      pulls: {},
      btmMembers: false,
      memberForm: {
          firstName: '',
          lastName: '',
          address: '',
          phonenumber: '',
          emailAddress: '',
          membershipType: '',
          countTractors: null,
          duesPaid: false
      },
      membershipCost: {
        single: 15,
        household: 25,
        additionalTractors: 5
      },
      member: {},
      members: {},
      btmVehicle: false,
      vehicle: {},
      vehicles: {},
      vehicleClasses: {},
      vehicleForm: {
        name: '',
        memberLookup: '',
        //techPassed: '',
        vehicleClasses: []
    },
      hook: {},
      btmHook: false,
      hookMember: false,
      hookForm: {
        nonMember: {
        vehicle: '',
        },
        member: {
          vehicle: ''
        },
        distance: '',
        pull: {},
        pullerName: '',
        vehicleClass: ''
      }
    }
  },
  firestore() {
    return {
      //pull: db.collection('pulls').doc(currentPull),
      hook: db.collection('hooks').orderBy("created", "desc").limit(1),
      members: db.collection('members'),
      member: db.collection('members').orderBy("created", "desc").limit(1),
      vehicle: db.collection('vehicles').orderBy("created", "desc").limit(1),
      vehicles: db.collection('vehicles'),
      vehicleClasses: db.collection('vehicleClasses').orderBy("name"),
      pulls: db.collection('pulls').orderBy('date', 'desc')
    }
  },
  computed: {
    outstandingdues() {
      if (this.memberForm.membershipType == "single") {
        return this.membershipCost.single + ((this.memberForm.countTractors -1)*this.membershipCost.additionalTractors)
      }
      else if (this.memberForm.membershipType == "household") {
        return this.membershipCost.household + ((this.memberForm.countTractors -2) * this.membershipCost.additionalTractors)
      }
    },
    ...mapState(['currentUser'])
  },
    methods: {
      addMember: function() {
            // start transition/loading view
            let form = document.getElementById("addMemberForm")

            // add pull to Firestore
            db.collection("members").add({
                firstName: this.memberForm.firstName,
                lastName: this.memberForm.lastName,
                address: this.memberForm.address,
                phonenumber: this.memberForm.phonenumber,
                emailAddress: this.memberForm.emailAddress,
                membershipType: this.memberForm.membershipType,
                countTractors: this.memberForm.countTractors,
                duesPaid: this.memberForm.duesPaid,
                created: new Date(),
                createdBy: this.currentUser.uid
            }).then(function(docRef) {
                console.log("Member written with ID: ", docRef.id)
                btmMembers = false;
                form.reset()
                
            });
      },
      addVehicle: function() {
            // start transition/loading view
           
            let form = document.getElementById("addVehicleForm")
            let doc = this.vehicleForm.name.toLowerCase().split(" ").join("-")

            // add pull to Firestore
            db.collection("vehicles").doc(doc).set({
                name: this.vehicleForm.name,
                member: this.vehicleForm.memberLookup,
                classes: this.vehicleForm.vehicleClasses,
                created: new Date(),
                createdBy: this.currentUser.uid
            }).then(function(docRef) {
                console.log("Vehicle written with ID: ", docRef.id)
                btmVehicle = false;
                form.reset()
                
            });
      },
      addHook: function() {
            // start transition/loading view
           
            let form = document.getElementById("addHook")
            let vehicleName
            //let doc = this.vehicleForm.name.toLowerCase().split(" ").join("-")
            if (this.hookMember = false) {
              vehicleName = this.hookForm.nonMember.vehicle
            }
            else {
              vehicleName = this.hookForm.member.vehicle.name
            }
            // add hook to Firestore
            
            db.collection("hooks").add({
                vehicleName: vehicleName,
                pull: this.hookForm.pull.date,
                pullRef: this.hookForm.pull.cityRef,
                track: this.hookForm.pull.track,
                vehicleClass: this.hookForm.member.vehicleClass.name,
                created: new Date(),
                createdBy: this.currentUser.uid
            }).then(function(docRef) {
                console.log("Hook written with ID: ", docRef.id)
                //btmHook = false;
                //form.reset()
            });
            
      }
    }
  }

</script>