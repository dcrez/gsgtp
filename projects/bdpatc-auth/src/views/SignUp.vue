<template>
  <div class="sign-up">
    <transition name="fade">
    <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
    </div>
</transition>
     <b-container fluid>
       <b-row align-v="center">
       <b-col class="bv-signuphero" />
       <b-col cols=6>
       <b-card>
        
         <!--<img src="../assets/shutterstock_560431477.jpg">-->
         <b-form class="" @submit.prevent="signUp">
          <h2>Create a Profile</h2>
          <p>Use this form to sign up.</p>
          <b-form-group id="Full Name (Group)" label="Full Name" label-for="fullname">
             <b-form-input id="fullname" v-model="form.fullname" type="text"  placeholder = "Full name (e.g., Joe Davenport)" />
           </b-form-group>
           <b-form-group id="Email (Group)" label="Email Address" label-for="email-address">
             <b-form-input id="email-address" v-model="form.email" type="email" required placeholder = "Enter email (e.g., person@email.com)" />
           </b-form-group>
           <b-form-group id="Password (Group)" label="Password" label-for="password">
             <b-form-input id="password" v-model="form.password" type="password" required placeholder = "Choose a strong password" />
           </b-form-group>
           <b-form-group label="Interests">
      <b-form-checkbox-group
        v-model="form.interests"
        :options="options"
        name="org-interests"
      ></b-form-checkbox-group>
    </b-form-group>

      <b-button type="submit" block>Create Profile</b-button>
      <router-link to="/login" class="btn btn-light btn-block">Already have a profile? Sign in.</router-link>
         </b-form>
       </b-card>
       </b-col>
      
       </b-row>
     </b-container>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
  name: 'SignUp',
  data() {
    return {
      form: {
        fullname: '',
        email: '',
        password: '',
        interests: []
      },
      options: 
      [
        {text: "Parent or Guardian", value: "parentOrGuardian"},
        {text: "Mentor", value: "mentor"},
        {text: "Teacher", value: "teacher"},
        {text: "Volunteer", value: "volunteer"}
      ],
      performingRequest: false
    }
  },
  methods: {
    signUp: function() {
      this.performingRequest = true

      fb.auth.createUserWithEmailAndPassword(this.form.email, this.form.password).then(user => {
        this.$store.commit('setCurrentUser', user)

        // create user obj
        fb.usersCollection.doc(user.uid).set({
            fullname: this.form.fullname,
            interests: this.form.interests
        }).then(() => {
            this.$store.dispatch('fetchUserProfile')
            this.performingRequest = false
            this.$router.push('/dashboard')
        }).catch(err => {
            console.log(err)
            this.performingRequest = false
            this.errorMsg = err.message
        })
    }).catch(err => {
        console.log(err)
        this.performingRequest = false
        this.errorMsg = err.message
    })
    }
  }
}
</script>

<style scoped>

.bv-signuphero {
  background: url("../assets/shutterstock_560431477.jpg") no-repeat center center ; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
}

</style>