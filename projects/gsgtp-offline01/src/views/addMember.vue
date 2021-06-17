<template>
  <div>
    <v-container>
      <v-card flat tile>
        <v-card-title>Add a member</v-card-title>
                <v-card-text>
                <v-form dense>
                  <form id="addMemberForm">
                  <v-row>
                  <v-col cols="12" md="6">
                  <v-text-field v-model="memberForm.firstName" label="First Name" color="secondary"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                  <v-text-field v-model="memberForm.lastName" label="Last Name" color="secondary"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                  <v-text-field v-model="memberForm.address" label="Address, City, State, Zip" color="secondary"></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12">
                  <v-text-field v-model="memberForm.phonenumber" label="Phone Number" color="secondary" type="tel" mask="(###) ###-####" masked="true"></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12">
                  <v-text-field v-model="memberForm.emailAddress" label="Email Address" color="secondary" type="email"></v-text-field>
                  </v-col>
                  
                  </v-row>
                  <v-row>
                  <v-col cols="12" md="4" >  
                  <v-radio-group v-model="memberForm.membershipType" label="Membership Type">
                    <v-radio label="Single" value="single" class="" color="orange darken-3"></v-radio>
                    <v-radio label="Household" value="household" color="orange darken-3"></v-radio>
                  </v-radio-group>
                  </v-col>
                  
                  </v-row>
                  <v-row>
                   <v-alert type="success" v-if="successMessage != null">{{successMessage}}</v-alert>   

                  </v-row>

<v-alert type="success" v-if="successMessage != ''">{{successMessage}}</v-alert>
<v-alert type="error" v-if="errorMessage != ''">{{errorMessage}}</v-alert>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                  <v-btn @click.stop="goBack" text color="secondary">Cancel</v-btn>
                  <v-btn @click="addMember" outlined color="success">Add member</v-btn>
                  
                  </v-card-actions>
                  </form>
                </v-form>
                </v-card-text>
      </v-card>
              </v-container>
   
  </div>
</template>

<script>
import {db} from '../../firebaseconfig.js'
import { mapState } from 'vuex'
export default {
  name: 'addMember',
  data() {
    return {
      performingRequest: false,
      btmMembers: false,
      successMessage:'',
      errorMessage:'',
      memberForm: {
          firstName: '',
          lastName: '',
          address: '',
          phonenumber: '',
          emailAddress: '',
          membershipType: ''
      },
      membershipCost: {
        single: 15,
        household: 25,
        additionalTractors: 5
      },
      member: {},
      members: {},
    
    }
  },
  firestore() {
    return {
      //pull: db.collection('pulls').doc(currentPull),
      member: db.collection('members').orderBy("created", "desc").limit(1),
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
    methods: {
      addMember: function() {
            // start transition/loading view
            let form = document.getElementById("addMemberForm")
            let fullName = this.memberForm.firstName + ' ' + this.memberForm.lastName
            let sm = this.successMessage
            let mid = ''
            let r = this.$router
            // add pull to Firestore
            db.collection("members").add({
                firstName: this.memberForm.firstName,
                lastName: this.memberForm.lastName,
                fullName: fullName,
                address: this.memberForm.address,
                phonenumber: this.memberForm.phonenumber,
                emailAddress: this.memberForm.emailAddress,
                membershipType: this.memberForm.membershipType,
                //countTractors: this.memberForm.countTractors,
                //duesPaid: this.memberForm.duesPaid,
                created: new Date(),
                createdBy: this.currentUser.uid
            }).then(function(docRef) {
                mid = docRef.id
                console.log("Member written with ID: ", docRef.id)
                sm = "Member " + mid + " added!"
                console.log(sm)
                r.push({path:`/member/${mid}`})
                
            }).catch(err => {
              this.errorMessage = err.message
              
            });


      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }

</script>