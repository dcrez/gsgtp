<template>
    <div id="login">
        <transition name="fade">
            <div v-if="performingRequest" class="loading">
                <p>Loading...</p>
            </div>
        </transition>
        <section class="container">
            <div class="row mt-3">
                <h1>Changing the Future. One mind at a time.</h1>
            </div>
            <div class="row" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
              <!--<h2>Welcome Back</h2>-->
                <form v-if="showLoginForm" @submit.prevent class="col">
                    <div class="form-group">
                    <label for="email1">Email</label>
                    <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" class="form-control"/>
                    </div>
                    <div class="form-group">
                    <label for="password1">Password</label>
                    <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" class="form-control"/>
                    <small id="forgotPassword" class="form-text text-muted"><a @click="togglePasswordReset" class="">Forgot Password?</a></small>
                    </div>
                    <button @click="login" class="btn btn-primary">Log In</button>

                        
                        <p>Don't have a profile? <a @click="toggleForm">Create one.</a></p>
                    
                </form>
                <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent class="col">
                    <h2>Create a Profile</h2>
                    <div class="form-group">
                    <label for="name">Name</label>
                    <input v-model.trim="signupForm.name" class="form-control" type="text" placeholder="Full name (e.g., John A. Doe)" id="name" />
                    </div>
                    <div class="form-group">
                    <label for="email2">Email</label>
                    <input v-model.trim="signupForm.email" class="form-control" type="text" placeholder="you@email.com" id="email2" />
                    </div>
                    <div class="form-group">
                    <label for="password2">Password</label>
                    <input v-model.trim="signupForm.password" class="form-control" type="password" placeholder="min 6 characters" id="password2" />
                    </div>

                    <div class="form-group pt-3">
                      <h3>How are you looking to get involved?</h3>
                    <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="parent" value="1" v-model="signupForm.parent">
  <label class="form-check-label" for="parent">Parent</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="teacher" value="1" v-model="signupForm.teacher">
  <label class="form-check-label" for="teacher">Teacher</label>
</div>
                    </div>

                    <p>By creating a profile, you agree to our Terms of Use and Privacy Policy.</p>
                    <button @click="signup" class="btn btn-primary btn-block">Sign Up</button>

                    <div class="extras">
                        <a @click="toggleForm">Back to Log In</a>
                        
                    </div>
                </form>
                <form v-if="showForgotPassword" @submit.prevent class="password-reset">
                    <div v-if="!passwordResetSuccess">
                        <h1>Reset Password</h1>
                        <p>We will send you an email to reset your password</p>

                        <label for="email3">Email</label>
                        <input v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3" />

                        <button @click="resetPassword" class="button">Submit</button>

                        <div class="extras">
                            <a @click="togglePasswordReset">Back to Log In</a>
                        </div>
                    </div>
                    <div v-else>
                        <h1>Email Sent</h1>
                        <p>check your email for a link to reset your password</p>
                        <button @click="togglePasswordReset" class="button">Back to login</button>
                    </div>
                </form>
                <transition name="fade">
                    <div v-if="errorMsg !== ''" class="error-msg">
                        <p>{{ errorMsg }}</p>
                    </div>
                </transition>
            </div>
        </section>
    </div>
</template>

<script>
    const fb = require('../firebaseConfig.js')
    export default {
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                signupForm: {
                    name: '',
                    parent: '',
                    teacher: '',
                    email: '',
                    password: ''
                },
                passwordForm: {
                    email: ''
                },
                showLoginForm: true,
                showForgotPassword: false,
                passwordResetSuccess: false,
                performingRequest: false,
                errorMsg: ''
            }
        },
        methods: {
            toggleForm() {
                this.errorMsg = ''
                this.showLoginForm = !this.showLoginForm
            },
            togglePasswordReset() {
                if (this.showForgotPassword) {
                    this.showLoginForm = true
                    this.showForgotPassword = false
                    this.passwordResetSuccess = false
                } else {
                    this.showLoginForm = false
                    this.showForgotPassword = true
                }
            },
            login() {
                this.performingRequest = true
                fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
                    this.$store.commit('setCurrentUser', user)
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
                fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
                    this.$store.commit('setCurrentUser', user)
                    // create user obj
                    fb.usersCollection.doc(user.uid).set({
                        name: this.signupForm.name,
                        email: this.signupForm.email,
                        parent: this.signupForm.parent,
                        teacher: this.signupForm.teacher

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
            },
            resetPassword() {
                this.performingRequest = true
                fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
                    this.performingRequest = false
                    this.passwordResetSuccess = true
                    this.passwordForm.email = ''
                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            }
        }
    }
</script>