<template>
    <div>
        
        <div class="display-1 mt-5 mb-5 font-weight-light">
            Membership Details <v-btn class="mb-3 float-right" text color="red darken-3" @click="goBack">
                <v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back
            </v-btn>

        </div>
        
        <!--<div v-if="viewMember != 'authorized'">
            <v-alert>You're not authorized to view this page. If you think you're viewing this alert in error, please
                try signing in.</v-alert>
        </div>-->
        <div>

            <v-card flat >
                <v-card-text>
                    <div>
                        <v-spacer></v-spacer>
                        <v-btn text small class="float-right d-none" @click="basicsRead = !basicsRead">Edit</v-btn>
                    </div>
                    <div class="overline">Basics</div>
                    <v-list three-line>
                        <v-list-item>
                            <v-list-item-group>
                            <v-list-item-title>{{currentMember.fullName}}</v-list-item-title>
                            <v-list-item-subtitle>{{currentMember.emailAddress}} / {{currentMember.phone}}</v-list-item-subtitle>
                            <v-list-item-content>{{currentMember.address}}, {{currentMember.city}} {{currentMember.state}}</v-list-item-content>
                            
                            </v-list-item-group>
                            <v-spacer></v-spacer>
                            <div hidden>
                            <v-btn class="mt-3" @click="resetPasswordEmail(currentMember.emailAddress)">Reset Password</v-btn>
                            </div>
                        </v-list-item>
                    </v-list>
                    
                </v-card-text>
            </v-card>
            
          
                
            <v-card flat>
                <v-toolbar flat>
                    <v-toolbar-title class="overline">Dues  {{duesCurrent}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items v-if="userProfile.role == 'admin'">

                        <v-btn color="primary" @click="openDuesForm = !openDuesForm" >
                            <font-awesome-icon icon="dollar-sign">
                            </font-awesome-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list two-line class="ml-2" v-if="dues != []">
                    <v-list-item v-for="d in dues" :key="d.id">
                    <v-list-item-group active-class="orange--text">
                        
                            <v-list-item-title>Effective Start Date {{d.effectiveStart}}</v-list-item-title>
                            <v-list-item-subtitle>Paid ${{d.duesPaid}}. {{d.note}}</v-list-item-subtitle>
                        </v-list-item-group>
                        </v-list-item>
                    
                </v-list>
                <div v-if="userProfile.role == 'admin'">
                <v-bottom-sheet v-model="openDuesForm" min-height="200px">
                    <v-sheet min-height="200px">
                        <v-container>
                            <v-col class="col-sm-8 col-12 ml-auto mr-auto">
                            <h3>Add Dues</h3>
                            <v-text-field
                            v-model="duesForm.effectiveStart"
                            label="Date Paid"
                            hint="YYYY-MM-DD format"
                            >
                            <font-awesome-icon></font-awesome-icon>
                            </v-text-field>
                            <v-text-field
                            label="Amount"
                            placeholder="Enter total payment"
                            v-model="duesForm.duesPaid"
                            prefix="$"
                            ></v-text-field>
                            <v-text-field
                            label="Notes"
                            placeholder="Does this fully pay for the cost of membership?"
                            v-model="duesForm.duesNotes"
                            ></v-text-field>
                            <v-btn depressed color="primary" dark @click="addDues(currentMember)">Add</v-btn>
                            </v-col>
                        </v-container>
                    </v-sheet>
                </v-bottom-sheet>  
                    <!--<v-form :hidden="openDuesForm">
                        <v-dialog>
                        <v-row class="mx-auto">
                            
                            <v-col cols="12" md="3">
                                <v-text-field label="Dues Payment" v-model="duesForm.duesPaid"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-menu ref="menu1" v-model="duesForm.eff1" :close-on-content-click="false"
                                    transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="duesForm.effectiveStart" label="Effective Date"
                                            persistent-hint prepend-icon="fal fa-calendar" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="duesForm.effectiveStart" no-title @input="eff1 = false">
                                    </v-date-picker>
                                </v-menu>
                            </v-col>

                            
                        </v-row>
                        <v-row class="">
                            <v-col cols="12" md="6" class="ml-5">
                                <v-text-field label="Notes (Optional)" v-model="duesForm.duesNotes"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-btn depressed color="primary" dark @click="addDues(currentMember)">Add</v-btn>
                            </v-col>
                        </v-row>
                        </v-dialog>
                        
                    </v-form>-->
                </div>
            </v-card>

            <v-toolbar class="mt-5" elevation="0">
                <v-toolbar-title>Vehicles</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click.stop="vehicleForm.addVehicleForm = true">
                        Add <font-awesome-icon icon="plus"></font-awesome-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            
            <v-container>
                <!-- Add vehicle class -->
                <v-dialog v-model="vehicleForm.addVehicleClass" max-width="600px">
                    <v-card>
                        <v-card-title>Add classes to {{vehicleForm.name}}</v-card-title>
                        <v-card-text>
                            <v-autocomplete v-model="vehicleForm.vehicleClasses" :items="vehicleClasses" chips
                                return-object item-text="name" item-value="name" color="secondary"
                                label="Choose a vehicle class (or classes)." clearable>
                            </v-autocomplete>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click.stop="addClass()">Save</v-btn>
                            <v-btn @click.stop="vehicleForm.addVehicleClass = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- Add vehicle -->
                <v-dialog v-model="vehicleForm.addVehicleForm" max-width="600px">
                    <v-card>
                        <v-card-title>Add vehicle</v-card-title>
                        <v-card-text>
                    <v-text-field label="Vehicle Name" v-model="vehicleForm.name" clearable
                        :error-messages="vehicleForm.vehicleError">
                    </v-text-field>
               
                
                    <v-autocomplete v-model="vehicleForm.vehicleClasses" :items="vehicleClasses" multiple chips
                        return-object item-text="name" item-value="name" color="secondary"
                        label="Choose a vehicle class (or classes)." clearable>
                    </v-autocomplete>
                        </v-card-text>
                        <v-card-actions>
                    <v-btn depressed color="primary" dark @click="addVehicle">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-container>
                <div v-for="v in vehicles" :key="v.id" class="mx-auto">

                    <v-row class="mb-2 ml-2">

                        <btn text  @click="vehicleDetails(v)" >{{v.name}}</btn>
                        <v-btn fab x-small class="ml-3" light color="gray" elevation="0"
                            @click.stop="addClassDialog(v)">
                            <font-awesome-icon icon="plus"></font-awesome-icon>
                        </v-btn>
                        
                        <v-chip close class="ml-2 mb-2 overline" v-for="c in v.classes" :key="c.id" dense dark
                            color="primary" @click:close="removeClass(v,c)">{{c.name}}</v-chip>
                        <v-btn fab x-small class="ml-3" light color="gray" elevation="0"
                            @click.stop="deleteItem(v)">
                            <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                        </v-btn>
                    </v-row>
                </div>
                </v-container>
                <!--<v-row>
                
            </v-row>-->
            </v-container>
        </div>
    </div>
</template>

<script>
    import {
        fb,
        db,
        auth
    } from '../../firebaseconfig.js'
    import * as firebase from 'firebase'
    import {
        mapState
    } from 'vuex'
    //import { req } from 'vuelidate/lib/validators'


    export default {
        name: 'memberDetails',
        data() {

            return {
                memberId: this.$route.params.id,
                currentMember: {},
                basicsRead: true,
                contactsRead: true,
                performingRequest: false,
                vehicles: {},
                vehicleClasses: {},
                dues: {},
                openDuesForm: false,
                vehicleForm: {
                    id: '',
                    name: '',
                    vehicleClasses: [],
                    vehicleError: '',
                    addVehicleForm: false,
                    addVehicleClass: false
                },
                duesForm: {
                    eff1: false,
                    effectiveStart: '',
                    duesPaid: null,
                    duesNotes: '',
                    membershipCost: {
                        single: 15,
                        household: 25,
                        additionalTractors: 5
                    }
                }
            }
        },
        firestore() {
            let meh = this.$route.params.id
            let um
            if (this.isMember == true & this.isUser == false) {
                console.log("Not a user!")
                um = "memberId"
            } else {
                console.log("Yay! A user!")
                um = "member.userId"
            }
            return {
                currentMember: db.collection('members').doc(meh),
                vehicleClasses: db.collection('vehicleClasses').where("active", "==", true),
                vehicles: db.collection('vehicles').where(um, "==", meh),
                hv: db.collection('vehicles').where("memberId", "==", meh),
                dues: db.collection('dues').where(um, "==", meh).orderBy("effectiveStart", "desc")
            }
        },
        /*validations: {
            vehicleForm: {
                name: {
                    required,
                    isUnique() {
                        return this.vehicles.name.contains(value)
                    }
                }
            }
        },*/
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            resetPassword(email) {
                var auth = firebase.auth();
                var emailAddress = email

                auth.sendPasswordResetEmail(emailAddress).then(function() {
                    // Email sent
                }).catch(function(error) {
                    // An error happened
                })
            },
            addVehicle: function () {
                // start transition/loading view
                let pf = this.performingRequest
                pf = true
                let form = document.getElementById("addVehicleForm")
                let doc = this.vehicleForm.name.toLowerCase().split(" ").join("-")
                let vf = this.vehicleForm
                this.vehicleForm.vehicleError = ''


                // add pull to Firestore
                let vehicleRef = db.collection("vehicles").doc(doc)

                vehicleRef.get()
                    .then((docSnapshot) => {
                        if (docSnapshot.exists) {
                            console.log("Vehicle already exists!")
                            let vE = "Your vehicle name must be unique. Please give a different name."
                            this.vehicleForm.vehicleError = vE
                            console.log(this.vehicleForm)
                        } else {
                            let r = this.currentMember.id
                            db.collection("vehicles").doc(doc).set({
                                name: this.vehicleForm.name,
                                member: this.currentMember,
                                memberId: r,
                                classes: this.vehicleForm.vehicleClasses,
                                created: new Date(),
                                createdBy: this.currentUser.uid
                            }).then(function (docRef) {
                                console.log("Vehicle written with ID: ", docRef)
                                pf = false
                                vf.name = ''
                                vf.memberLookup = '',
                                    vf.vehicleClasses = '',
                                    vf.img = ''



                            });
                        }
                    })


            },
            vehicleDetails(v) {
                this.$router.push({
                    path: `/vehicle/${v.id}`
                })
            },
            countVehicles(v) {
                return v.length()
            },
            addDues(m) {
                let moo
                if (m.memberId !== 'undefined') {
                    moo = m.id
                    }
                else {
                    moo = m.memberId}
                console.log(moo)

                let currentUser = auth.currentUser;
                let duesRef = db.collection("dues")
                let memberRef = db.collection("members").doc(moo)
                let df = this.duesForm
                let odf = this.openDuesForm
                let effectiveStart = df.effectiveStart
                let duesPaid = df.duesPaid
                let duesNotes = df.duesNotes
                let updateDues = this.addDues

                duesRef.add({
                    member: memberRef,
                    effectiveStart: this.duesForm.effectiveStart,
                    duesPaid: this.duesForm.duesPaid,
                    note: this.duesForm.duesNotes,
                    memberId: moo
                }).then(function(docRef) {
                    console.log("Dues added to log!")
                    console.log("Dues created: ", docRef.id)

                    memberRef.update({
                        currentDues: {
                        effectiveStart: df.effectiveStart,
                        duesPaid: df.duesPaid,
                        }
                    })
                }).then(function(){
                    console.log("Member updated!")
                    odf = false
                })
                
                
            },
            removeClass(v, c) {
                let vehicle = v.id
                let myVehicle = db.collection("vehicles").doc(vehicle)
                myVehicle.update({
                    classes: firebase.firestore.FieldValue.arrayRemove(c)
                })
                //db.collection("vehicles").doc(vehicle).update({"classes": FieldValue.arrayUnion(classArray)})
                //db.FieldValue.arrayRemove({classArray})
            },
            addClassDialog(v) {
                this.vehicleForm.name = v.name
                this.vehicleForm.id = v.id
                this.vehicleForm.addVehicleClass = true
            },
            addClass() {
                let vehicle = this.vehicleForm.id
                let myVehicle = db.collection("vehicles").doc(vehicle)
                let newClasses = this.vehicleForm.vehicleClasses
                let vF = this.vehicleForm
                console.log(newClasses)
                myVehicle.update({
                    classes: firebase.firestore.FieldValue.arrayUnion(newClasses)
                }).then(function () {
                    console.log("Class added!")
                    vF.vehicleClasses = {}
                    vF.vehicleName = ''
                    vF.addVehicleClass = false
                })

            },
            deleteItem(vehicle) {
                console.log(vehicle.id)
                db.collection('vehicles').doc(vehicle.id).delete();
            },
        },
        computed: {
            ...mapState(['currentUser', 'userProfile']),
            isUser(){
                if(this.currentMember.userId != null) {
                    return true
                } else return false
            },
            isMember(){
                if(this.memberId != null) {
                    return true
                } else return false
            },
            duesCurrent(){
                let d = this.dues[0]
                console.log("dues "+ d)
                
            },
            viewMember() {
                let vM
                let userId = this.$route.params.id

                if (this.currentUser = null) {
                    vM = 'unauthorized'
                } else if (userId == auth.currentUser.uid) {
                    vM = 'authorized'
                } else if (this.userProfile.role == 'admin') {
                    vM = 'authorized'
                }
                //else if (this.currentUser.uid != null && this.currentUser.uid == userId)
                // {vM = 'authorized'}
                else {
                    vM = 'unauthorized'
                }
                return vM
            },
            outstandingdues() {
                if (this.currentMember.memberType == "single") {
                    return this.duesForm.membershipCost.single + ((this.vehicles.length - 1) * this.duesForm
                        .membershipCost
                        .additionalTractors)
                } else if (this.currentMember.memberType == "household") {
                    return this.duesForm.membershipCost.household + ((this.vehicles.length - 2) * this.duesForm
                        .membershipCost
                        .additionalTractors)
                }
            },
            effectiveEndDate() {
                if (this.duesForm.effectiveStart != '') {
                    let effS = new Date(this.dues.effectiveStart);
                    console.log(effS)
                    var year = effS.getFullYear();
                    console.log(year)
                    var month = effS.getMonth();
                    var day = effS.getDay();
                    var yearFromDate = new Date(year + 1, month, day);
                    return yearFromDate
                } else {
                    return ''
                }
            },
            saveContacts() {
                return 'saved'
            }
        }
    }
</script>