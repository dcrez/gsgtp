<template>
    <div>
        <v-dialog v-model="techDialog" max-width="400px">
            <v-card>
                <v-card-title color="primary">
                    Tech Details
                </v-card-title>
                <v-card-subtitle>Owner/Puller: {{currentVehicle.member.fullName}}</v-card-subtitle>
                <v-card-text>
                    <v-text-field v-model="techForm.by" label="Inspected by"></v-text-field>
                    <v-switch label="Passed?" v-model="techForm.passed"></v-switch>
                    <v-text-field :mask="dateMask" label="Date of Inspection" hint="Enter in MM/DD/YYYY format"></v-text-field>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="hookDialog" max-width="400px">
            
      <v-card>
        
        <v-card-title>
          <span style="color:red" class="mr-3">{{editedItem.pull.title}} </span>
          {{editedItem.vehicleClass}}
        </v-card-title>
        <v-card-subtitle><strong>Vehicle:</strong> {{editedItem.vehicle}}, <strong>Puller:</strong> <span v-if="editedItem.pullerName != ''">{{editedItem.pullerName}}</span>
        <span v-else>{{editedItem.member.fullName}}</span>


        </v-card-subtitle>
        <v-banner v-if="editHookErrMessage">{{editHookErrMessage}}</v-banner>
        <v-card-text><v-text-field v-model="editedItem.distance" label="Distance" color="red darken-3"></v-text-field>
        <v-text-field v-model="editedItem.place" label="Place" color="red darken-3"></v-text-field>
        <v-text-field v-model="editedItem.points" label="Points" color="red darken-3" type="number" v-if="editedItem.isMember"></v-text-field>
        <v-checkbox v-model="editedItem.dq" label="DQ?" color="red darken-3"></v-checkbox>
        <v-checkbox v-model="editedItem.isMember" label="Member?" color="green darken-3" disabled></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click.stop="close">Cancel</v-btn>
          <v-btn color="green" outlined @click.stop="saveItem()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <div class="display-1 mt-5 mb-5 font-weight-light">
            {{currentVehicle.name}} <v-btn class="mb-3 float-right" text color="red darken-3" @click="goBack">
                <v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back
            </v-btn>
            <v-btn class="float-right" v-if="userProfile.role == 'admin'" text @click="addTech(currentVehicle)">Add Tech
            </v-btn>
        </div>

        <div style="margin-top:-1.2em;">Primary puller: {{currentVehicle.member.firstName}}
            {{currentVehicle.member.lastName}}</div>

        
        <div class="container">
            <div v-if="hooks == {}">
                <v-alert type="warning">Nothing to see here yet! Come to a pull and post a hook as a member of GSGTP to
                    track your vehicle's performance over time.</v-alert>
            </div>
            <div v-else>
                <v-data-iterator :items="currentVehicle.classes" item-key="name" hide-default-footer>
                    <template v-slot:default="props">
                        <v-row>
                            <v-col v-for="item in props.items" :key="item.name" cols="12">
                                <v-card outlined>
                                    <v-card-title class="secondary lighten-5"> {{item.name}}</v-card-title>
                                    <v-card-subtitle class="secondary lighten-5">Points Max Distance</v-card-subtitle>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-left">
                                                        Pull
                                                    </th>
                                                    <th class="text-left">
                                                        Distance
                                                    </th>
                                                    <th class="text-left">
                                                        Points
                                                    </th>
                                                    <th>
                                                        Place
                                                    </th>
                                                    <th>
                                                        Track
                                                    </th>
                                                    <th v-if="userProfile.role=='admin'">Admin</th>

                                                </tr>
                                            </thead>
                                            <tbody v-for="(h) in hooks" :key="h['.key']">
                                                <tr v-if="h.vehicleClass == item.name">
                                                    <td>{{ h.date.date }}<br>
                                                        {{h.date.title}}
                                                    </td>

                                                    <td>{{ h.distance }}</td>
                                                    <td v-if="h.points > 0">{{ h.points }}</td>
                                                    <td v-else>
                                                        <font-awesome-icon icon="lock"></font-awesome-icon>
                                                    </td>
                                                    <td>{{ h.place }}</td>
                                                    <td>{{ h.date.track }}</td>
                                                    <td v-if="userProfile.role=='admin'">
                                                        <font-awesome-icon @click="editItem(h)" icon="pencil-alt" color="green"></font-awesome-icon></td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>

                </v-data-iterator>



            </div>
        </div>



    </div>
</template>

<script>
    import {
        fb,
        db
    } from '../../firebaseconfig.js'
    import {
        mapState
    } from 'vuex'
    import {
        _
    } from 'lodash'
    import {TheMask} from 'vue-the-mask'

    export default {
        name: 'vehicleDetails',
        components: {TheMask},
        data() {
            return {
                vehicleId: this.$route.params.id,
                dateMask: '##/##/####',
                hooks: {},
                currentVehicle: {},
                vehicleClasses: {},
                techDialog: false,
                hookDialog: false,
                techForm: {
                    vehicle: {},
                    passedTech: false,
                    techDate: '',
                    by: ''
                },
                editedItem: {
                    id: '',
                    title: '',
                    distance: null,
                    place: '',
                    points: 0,
                    isMember: '',
                    pull: {},
                    dq: false
                }
            }
        },
        firestore() {
            let veh = this.$route.params.id
            let vref = this.currentName
            return {
                currentVehicle: db.collection('vehicles').doc(veh),
                hooks: db.collection('hooks').where("vehicleId", "==", veh).orderBy('pull', 'desc')
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            pullDetails(pull) {
                this.$router.push({
                    path: `/pull/${pull.date}/${pull.id}`
                })
            },
            editItem(hook) {
                this.editedItem = Object.assign({}, hook)
                this.editedItem.id = hook.id
                this.hookDialog = true
            },
            addTech(vehicle) {
                this.techForm.vehicle = Object.assign({}, vehicle)
                this.techDialog = true
            },
            saveItem() {
        // Declare variables in order to pass Ids to Firestore
       },
                close(d) {
                d = false
      },
        },
        computed: {
            ...mapState(['currentUser', 'userProfile']),
            currentName() {
                let vehicleName
                return vehicleName = this.currentVehicle.name
            },
            maxDistance() {
                let h = this.hooks
                let mx
                if (h == {}) {
                    return {}
                } else {
                    mx = Math.max.apply(Math, h.map(function (o) {
                        return o.distance;
                    }))
                    return mx
                }


            },
            pointsCurrentYear() {
                return 0
            },
            pastClasses() {
                let pc = _.groupBy(hooks, vehicleClass)
                return pc
            },
            distanceAvailable() {
                if (this.hooks.distance) {
                    return true
                } else {
                    return false
                }
            },
            hookClasses() {
                let h = this.hooks
                if (h == {}) {
                    return {}
                } else {
                    let cc = _.mapValues(h, function (o) {
                        return o
                    })
                    return cc
                }
            },
            distances() {
                let distance = this.hooks.map(hook => hook.distance)
                console.log(distance)
                let hookNumbers = distance.map(function (x) {
                    return parseInt(x, 10)
                })
                console.log(hookNumbers)
                return hookNumbers
            },
            pullLabels() {
                var result = _.map(this.hooks, 'pull.date')
                return result
            },
        }
    }
</script>