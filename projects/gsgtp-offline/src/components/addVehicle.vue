<template>
<div>
  <v-card>
         <v-container>
           <v-card-title>Add vehicle</v-card-title>
           <v-card-text>
           <v-form id="addVehicleForm">
            
               <v-text-field label="Vehicle Name" v-model="vehicleForm.name" color="secondary" hint="A unique name for the tractor that is different from all other members."></v-text-field>
               <v-autocomplete 
                v-model="vehicleForm.memberLookup" 
                label="Lookup Member"
                :items="members" 
                hint="Select a member who is primarily responsible for this vehicle."
                item-text="fullName"
                item-value="id"
                persistent-hint
                color="secondary"
                clearable
                return-object
                chips
                >
                </v-autocomplete>
                <v-autocomplete v-model="vehicleForm.vehicleClasses" :items="vehicleClasses" multiple chips return-object item-text="name" item-value="name" color="secondary" label="Choose a vehicle class (or classes)." clearable>
                </v-autocomplete>
                <transition name="fade">
    <div v-if="performingRequest" class="loading">
        <v-progress-linear indeterminate color="info"></v-progress-linear>
    </div>
</transition>
                <!--<v-file-input label="Vehicle Image" hint="(Optional) Upload a picture of the tractor."></v-file-input>-->
               <v-card-actions><v-spacer></v-spacer><v-btn @click="resetForm" text>Clear Form</v-btn><v-btn @click="addVehicle" outlined color="green">Add vehicle</v-btn></v-card-actions>
             
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
  name: 'admin',
  data() {
    return {
      performingRequest: false,
      members: {},
      vehicle: {},
      vehicles: {},
      vehicleClasses: {},
      vehicleForm: {
        name: '',
        memberLookup: '',
        //techPassed: '',
        vehicleClasses: [],
        img: ''
    }
    }
  },
  firestore() {
    return {
      //pull: db.collection('pulls').doc(currentPull),
      members: db.collection('members'),
      vehicles: db.collection('vehicles'),
      vehicleClasses: db.collection('vehicleClasses').orderBy("name").where("active","==",true)
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
    methods: {
      addVehicle: function() {
            // start transition/loading view
            let pf = this.performingRequest
            pf = true
            let form = document.getElementById("addVehicleForm")
            let doc = this.vehicleForm.name.toLowerCase().split(" ").join("-")
            let vf = this.vehicleForm

            // add pull to Firestore
            db.collection("vehicles").doc(doc).set({
                name: this.vehicleForm.name,
                member: this.vehicleForm.memberLookup,
                classes: this.vehicleForm.vehicleClasses,
                created: new Date(),
                createdBy: this.currentUser.uid
            }).then(function(docRef) {
                console.log("Vehicle written with ID: ", docRef)
                pf = false
                vf.name = ''
                vf.memberLookup = '',
                vf.vehicleClasses = '',
                vf.img = ''
      
                
                
            });
      },
      resetForm() { 
          this.vehicleForm.name =  '', this.vehicleForm.memberLookup = null, this.vehicleForm.vehicleClasses = []
    }
  }
}

</script>