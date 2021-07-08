    <template>
  <div>
         <v-card flat>
         <v-container>
           <v-card-title>
           Register for {{pull.title}} on {{pull.date | moment("calendar")}}
           </v-card-title>
           <v-alert text outlined v-if="currentUser == {}" color="error" dark>  
             You must be signed in to add a hook / register for a pull.
           </v-alert>
           <v-card-text>
             <v-form>
               <!-- Find a pull -->
               <div style="margin-top:-15px">
                {{pull.city}}, {{pull.state}}
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

               
                <v-alert dense outlined type="success" v-if="hookForm.successMessage != ''">{{hookForm.successMessage}}</v-alert>
                <v-alert dense outlined type="error" v-if="hookForm.errorMessage != ''">{{hookForm.errorMessage}}</v-alert>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="dismiss(m)">Cancel</v-btn>
                  <v-btn outlined color="success" v-if="hookMember" @click.stop="addMemberHook" :disabled="currentUser == {}">Add member hook</v-btn>
                  <v-btn outlined color="success" v-if="!hookMember" @click.stop="addGuestHook" :disabled="currentUser == {}">Add guest hook</v-btn>
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
import {router} from 'vue-router'

export default {
  name: 'register',
  props: ['dateRef', 'memberId'],
  data() {
    return {
      pull: {},
      vehicleClasses: {},
      vehicles: {},
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
        pullerName: '',
        vehicleClass: ''
      }
    }
  },
  firestore() {
    let gsgtpmember
    let currentPull = this.$route.params.id 
    let pullDate = this.$route.params.date
    return {
      members: db.collection('members'),
      vehicles: db.collection('vehicles'),
      vehicleClasses: db.collection('vehicleClasses').orderBy("name", "asc").where("active", "==", true),
      pull: db.collection('pulls').doc(currentPull)
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
    }
  },
    methods: {
       pullDetails() {
                this.$router.push({
                    name: 'pullDetails',
                    params: {id: this.pull.id}
                })
            },
      addMemberHook: function() {
        this.hookForm.errorMessage = ''
        this.performingRequest = true
        console.log(this.pull.id)
        let vn = this.hookForm.member.vehicle.name
        let hf = this.hookForm
        let sm = hf.member.selectedMember
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
              pullId: this.pull.id,
              pull: {
                date: this.pull.date,
                track: this.pull.track,
                year:  this.pull.year
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
            }).then((docRef)=> {
                console.log("Hook written with ID: ", docRef.id)
                this.pullDetails()
            }).catch(err => {
              this.hookForm.errorMessage = err.message
            }) 
          
            }
        },
        addGuestHook: function() {
        this.hookForm.errorMessage = ''
        let hf = this.hookForm
        
        // Begin class eval (create multiple hooks)
       let eachClass = this.hookForm.vehicleClass
          for(let i=0, len=eachClass.length; i<len; i++) {  
            let thisClass = eachClass[i].name
            let classId = _.filter(this.vehicleClasses, {'name': thisClass})
            let fees 
            if (thisClass == "Off the Lawn") {
              fees = 15
            } else {fees = 20}

            db.collection('hooks').add({
                vehicle: this.hookForm.nonMember.vehicle,
                vehicleClass: thisClass,
                classId: classId,
                pullOrder: (Math.random() * 100).toFixed(2),
                pullId: this.pull.id,
                pull: {
                  date: this.pull.date,
                  track: this.pull.track,
                  year: this.pull.year
                },
                person: {
                  createdBy: this.currentUser.uid,
                  pullerName: this.hookForm.pullerName
                },
                fee: fees,
                paid: false,
                
                created: new Date()
            }).then(function(docRef) {
                console.log("Hook written with ID: ", docRef.id)
                hf.successMessage = "Hook(s) added successfully!"
                
            }).catch(err => {
              console.log(hf.errorMessage)
              hf.errorMessage = err.message
            }); 
            }

            
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
        this.$router.go(-1)
      }
    }
  }

</script>