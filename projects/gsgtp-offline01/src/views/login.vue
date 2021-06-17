<template>
<div id="login">
    <section class="login" v-if="login.show">
        <v-card class="mx-auto" max-width="600px" outlined :loading="performingRequest">
            <v-card-title>Login</v-card-title>
            <v-card-subtitle>Use this form if you already have a GSGTP profile.</v-card-subtitle>
            <v-card-text>
                <v-form @submit.prevent>
                  
                  <v-text-field v-model="login.emailAddress" label="E-mail address" color="gray">
                      <v-icon slot="prepend" color="red">fal fa-at</v-icon>
                  </v-text-field>
                 
                  
                  <v-text-field v-model="login.password" label="Password" color="gray" :type="'password'" :error="login.error" :error-messages="login.error">
                      <v-icon slot="prepend" color="red">fal fa-lock</v-icon>
                  </v-text-field>  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="showCreate">Create a profile.</v-btn>
                    <v-btn dark color="red" @click="signin">Login</v-btn><br>
                </v-card-actions>                
                </v-form>
                <a href="#" @click="showReset">Forgot password?</a>
            </v-card-text>
        </v-card>
    </section>
    
    <section class="forgotPassword" v-if="forgotPassword.show">
        <v-card class="mx-auto" max-width="600px" outlined>
            <v-card-title>Forgot password?</v-card-title>
            <v-card-subtitle>Enter your email address, and we'll send you an email to reset your password.</v-card-subtitle>
            <v-card-text>
                <v-form>
                  <v-text-field v-model="forgotPassword.emailAddress" label="E-mail address" color="gray">
                      <v-icon slot="prepend" color="red">fal fa-at</v-icon>
                  </v-text-field>           
                </v-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="showLogin">Cancel</v-btn>
                    <v-btn dark color="red" @click="resetPassword">Reset password</v-btn><br>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </section>
    <section class="createProfile" v-if="createProfile.show">
        <v-card class="mx-auto" max-width="600px;" flat>
        <v-stepper value="1" vertical v-model="cp1" non-linear>
            
            <v-stepper-step step="1" :complete="cp1 > 1" editable>Basic Information
                <small>Provide your email and create a password.</small>
            </v-stepper-step>
            <v-stepper-content step="1">
                <v-form @submit.prevent>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="createProfile.firstName" label="First Name" color="red"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="createProfile.lastName" label="Last Name" color="red"></v-text-field>
                            </v-col>
                        </v-row>
                        <!--<v-text-field v-model="createProfile.address" label="Address" color="red"></v-text-field>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="createProfile.city" label="City" color="red"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="createProfile.zip" label="Zip Code" color="red"></v-text-field>
                            </v-col>
                        </v-row>-->
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="createProfile.emailAddress" label="Email Address" color="red" :type="'email'"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="createProfile.password" label="Password" color="red" :type="'password'"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-btn color="primary" @click="cp1 = 2">Continue</v-btn>
                    </v-container>
                     
                </v-form>
            </v-stepper-content>

            <v-stepper-step step="2" :complete="cp1 > 2" editable>Contact Details
                <small>We use this information to send club communications.</small>
            </v-stepper-step>
            <v-stepper-content step="2">
                <v-form dense>
                  <form id="addMemberForm">
                  <v-row>
                  <v-col cols="12">
                  <v-text-field v-model="memberForm.address" label="Mailing address" color="secondary"></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12">
                  <v-text-field v-model="memberForm.city" label="City" color="secondary"></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12">
                  <v-text-field v-model="memberForm.state" label="State" color="secondary" ></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12">
                  <v-text-field v-model="memberForm.zip" label="Zip" color="secondary"></v-text-field>
                  </v-col>
                  <v-col md="4" cols="12">
                  <v-text-field v-model="memberForm.phonenumber" label="Phone Number" color="secondary" type="tel" mask="(###) ###-####" masked="true"></v-text-field>
                  </v-col>
                  <v-col md="8" cols="12">
                  <v-text-field v-model="createProfile.emailAddress" label="Email Address" color="secondary" disabled></v-text-field>
                  </v-col>
                  
                  <v-alert></v-alert>
                  
                  
                  </v-row>
                  <v-card-actions>
                   
                  <v-btn color="primary" @click="cp1 = 3">Continue</v-btn>
                  
                  </v-card-actions>
                  </form>
                </v-form>
            </v-stepper-content>

            <v-stepper-step step="3" :complete="cp1 > 3" editable>Configure membership</v-stepper-step>
            <v-stepper-content step="3">
                <p>Are you creating a member profile?</p>
                <v-radio-group v-model="memberForm.member" row >
                    <v-radio label="At large (no tractor)" value='false' color="info" />
                    <v-radio label="Member" value='true' color="success" />
                </v-radio-group>
                <div v-if="memberForm.member == 'true'" class="mb-5">What kind of member?
                <v-radio-group v-model="memberForm.memberType" row >
                    <v-radio label="Single (includes 1 tractor)" value='single' color="info" />
                    <v-radio label="Household (includes 2 tractors)" value='household' color="success" />
                </v-radio-group>
                
                <small class="mt-5">You must pay your dues each year for your membership to be active. See the Club Treasurer to pay your dues.</small>
                
                </div>
                <v-card-actions>
                    <v-btn text @click="showLogin">Login instead.</v-btn>
                    <v-btn dark color="red" @click="signup">Create profile</v-btn><br>
                </v-card-actions>
                
            </v-stepper-content>
            
        </v-stepper>
        </v-card>
    </section>
</div>

</template>
<script>
import {db, auth, users, members} from '../../firebaseconfig.js'
import {mapState} from 'vuex'
//const validators = { required, maxLength, email }
//const validationMixin = vuelidate.validationMixin

export default {
    name: 'login',
    //mixins: [validationMixin],
    validations: {
        //name: {required, maxLength:maxLength(10), minLength: minLength(3)},
        //emailAddress: {required, email}
    },
    data() {
        return {
            userId: '',
            cp1: 1,
            performingRequest: false,
            login : {
                emailAddress: '',
                password: '',
                show: true,
                error: null
            },
            createProfile: {
                firstName: '',
                lastName: '',
                emailAddress: '',
                password: '',
                countTractors: null,
                show: false
            },
            forgotPassword: {
                emailAddress: '',
                show: false
            },
            memberForm: {
                address: '',
                phonenumber: '',
                city: '',
                state: '',
                zip: '',
                duesPaid: false,
                member: null,
                memberType: ''
            }
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile']),
    },
    methods: {
        showLogin() {
            this.login.show = true
            this.createProfile.show = false
            this.forgotPassword.show = false
        },
        showCreate() {
            this.login.show = false
            this.createProfile.show = true
            this.forgotPassword.show = false
        },
        showReset() {
            this.login.show = false
            this.createProfile.show = false
            this.forgotPassword.show = true
        },
        signup() {
            this.performingRequest = true
            auth.createUserWithEmailAndPassword(this.createProfile.emailAddress, this.createProfile.password)
            // end auth creation
            .then(
                 user => {
                this.$store.commit('setCurrentUser', user)
                let batch = db.batch()
                let currentUser = auth.currentUser;
                let fullName = this.createProfile.firstName + ' ' + this.createProfile.lastName
                
                let userRef = users.doc(currentUser.uid)
                let memberRef = members.doc(currentUser.uid)

                console.log("Current user: " + currentUser)
                console.log("UserRef: " + userRef)

                batch.set(userRef, {
                    firstName: this.createProfile.firstName,
                    lastName: this.createProfile.lastName,
                    email: this.createProfile.emailAddress,
                    member: this.memberForm.member,
                    role: "N/A"
                })

                batch.set(memberRef, {
                    firstName: this.createProfile.firstName,
                    lastName: this.createProfile.lastName,
                    fullName: fullName,
                    address: this.memberForm.address,
                    city: this.memberForm.city,
                    state: this.memberForm.state,
                    zip: this.memberForm.zip,
                    phone: this.memberForm.phonenumber,
                    emailAddress: this.createProfile.emailAddress,
                    memberType: this.memberForm.memberType,
                    duesPaid: this.memberForm.duesPaid,
                    created: new Date(),
                    createdBy: currentUser.uid,
                    userId: currentUser.uid
                }) 

                batch.commit()
                  
              .then(() => {
                    console.log('Member created!')
                    this.$store.commit('setCurrentUser', user.user)
                    this.$store.dispatch('fetchUserProfile')
                    this.$router.push('/')
                    //this.performingRequest = false
                     }) // end batching after error
                
                }
               ) //end user
                },
        signin() {
            this.performingRequest = true
            this.login.error = null
            auth.signInWithEmailAndPassword(this.login.emailAddress,this.login.password).then(user => {
                console.log(user.user.uid),
                this.$store.commit('setCurrentUser', user.user)
                this.$store.dispatch('fetchUserProfile')
                this.$router.push('/')
                this.performingRequest = false
            }).catch(err => { console.log(err)
            this.performingRequest = false
            this.login.error = err.message
            })
        },
        resetPassword() {
            this.performingRequest = true
            auth.sendPasswordResetEmail(this.forgotPassword.emailAddress).then(() => {
                this.performingRequest = false
                this.passwordResetSuccess = true
                this.forgotPassword.email = ''
            })
        }
    }
}
</script>
