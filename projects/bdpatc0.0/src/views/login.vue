<template class="">
  <div id="" class="row" style="">
    <transition name="fade">
      <div v-if="performingRequest" class="loading col-12">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
    </transition>

    <div id="registration" class="col-sm-12 col-lg-6 d-flex align-items-center">
      <h1 class="" style="line-height: 0.85em; -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: yellow; font-size:5em; color:black;">Dream big. <br>Start small.</h1>
    </div>
    <section id="login" class="col-lg-6" v-if="showLogin">
      <h2 class="text-center mt-5">Sign in</h2>
      <form @submit.prevent class="pt-2 col-sm-10 mx-auto">
        <p>Use this form to sign-in to your profile with <span class="bdpa-em">Black Data Processing Associates - Twin
            Cities</span>.</p>
        <div class="form-group row">
          <label class="col-md-2 col-12 col-form-label">Email address</label>
          <div class="col-md-10 col-12">
            <input type="email" class="form-control" placeholder="you@email.com" v-model="loginForm.email">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-12 col-form-label">Password</label>
          <div class="col-md-10 col-12">
            <input type="password" class="form-control " placeholder="***************" v-model="loginForm.password">
            <small id="passwordhelp" class="form-text text-muted"><a href="#">Forgot your password?</a></small>
          </div>
        </div>
        <p class="form-row">By using our services, you agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy
            Policy</a>.</p>
        <div class="form-row d-flex">
          <div class="mt-2 col-sm-12 mx-auto"><button class="btn btn-primary btn-block" @click="login">Login</button>
          </div>
          <div class="mt-2 col-sm-12 mx-auto text-center"><a class="text-center" href="#"
              @click="toggleShowCreate">Don't have a profile? Create one.</a></div>
        </div>
      </form>

    </section>
    <section id="createProfile" class="col-lg-6" v-if="showCreate">
      <h2 class="text-center">Create a Profile</h2>
      <form @submit.prevent class="pt-2">
        <p>Use this form to create a profile with <span class="bdpa-em">Black Data Processing Associates - Twin
            Cities</span>.</p>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Full name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="Tom A Adams" v-model.trim="createProfile.fullname">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Phone number</label>
          <div class="col-sm-10">
            <input type="tel" class="form-control" placeholder="(xxx) xxx-xxxx" v-model.trim="createProfile.phone">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Email address</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" placeholder="you@email.com" v-model.trim="createProfile.email">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control " placeholder="***************"
              v-model.trim="createProfile.password">
          </div>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="parent" value="true" v-model.trim="createProfile.parent">
          <label class="form-check-label" for="parent">Parent</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="student" value="true"
            v-model.trim="createProfile.student">
          <label class="form-check-label" for="parent">Student</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="mentor" value="true"
            v-model.trim="createProfile.volunteer">
          <label class="form-check-label" for="parent">Volunteer</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="teacher" value="true"
            v-model.trim="createProfile.teacher">
          <label class="form-check-label" for="parent">Teacher</label>
        </div>
        <p class="form-row">By using our services, you agree to the <a href="#">Terms of Use</a> and <a href="#">
            Privacy Policy</a>.</p>
        <div class="form-row">
          <div class="col-sm-12 col-md-6 mt-2"><button @click="signup" class="btn btn-primary btn-block">Login</button>
          </div>
          <div class="col-sm-12 col-md-6 mt-2"><a href="#" class="text-center" @click="toggleShowLogin">Already have an
              account?</a></div>
        </div>
      </form>

    </section>
    <transition name="fade" class="col-12 alert alert-danger">
      <div v-if="errorMsg !== ''" class="error-msg">
        <p>{{ errorMsg }}</p>
      </div>
    </transition>
  </div>
</template>
<script>
  const fb = require('../firebaseConfig.js');

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          email: '',
          password: ''
        },
        createProfile: {
          fullname: '',
          email: '',
          password: '',
          phone: '',
          parent: false,
          teacher: false,
          volunteer: false,
          student: false
        },
        passwordForm: {
          email: ''
        },
        showLogin: true,
        showCreate: false,
        performingRequest: false,
        errorMsg: '',
      }
    },
    components: {

    },
    methods: {
      toggleShowCreate() {
        this.showLogin = false,
          this.showCreate = true
      },
      toggleShowLogin() {
        this.showCreate = false,
          this.showLogin = true
      },
      login() {
        this.performingRequest = true
        fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.performingRequest = false
          this.$router.push('/dashboard')
        }).catch(err => {
          console.log(err)
          this.performingRequest = false
          this.errorMsg = err.message
        })
      },
      signup() {
        this.performingRequest = true

        fb.auth.createUserWithEmailAndPassword(this.createProfile.email, this.createProfile.password).then(user => {
          this.$store.commit('setCurrentUser', user.user)

          // create user obj
          fb.usersCollection.doc(user.user.uid).set({
            name: this.createProfile.fullname,
            phone: this.createProfile.phone,
            parent: this.createProfile.parent,
            teacher: this.createProfile.teacher,
            volunteer: this.createProfile.volunteer,
            student: this.createProfile.student
          }).then(() => {
            /*this.$store.dispatch('fetchUserProfile')*/
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

<style>
  #registration {
    background-image: url('../assets/shutterstock_1057091489.jpg');
    background-size: cover;
    background-position: top center;
    min-height: 40vh;

  }


  #registration h1 {
    padding-left: 20px;
  }

  #login,
  #createProfile {
    background-color: white;
  }

  @media only screen and (min-width: 800px) {}
</style>