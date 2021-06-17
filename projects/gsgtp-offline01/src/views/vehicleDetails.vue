<template>
    <div>
        <div class="display-1 mt-5 mb-5 font-weight-light">
            {{currentVehicle.name}} <v-btn class="mb-3 float-right" text color="red darken-3" @click="goBack">
                <v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back
            </v-btn>
        </div>
        
        <div style="margin-top:-1.2em;">Primary puller: {{currentVehicle.member.fullName}}</div>
        
        <div class="container">
      <div v-if="hooks = {}" >
            <v-alert type="warning">Nothing to see here yet! Come to a pull and post a hook as a member of GSGTP to track your vehicle's performance over time.</v-alert>
        </div>
      </div>
        <div v-for="c in currentVehicle.classes" :key="c['.index']">
        
        <v-toolbar class="mt-5 font-weight-black" elevation="0" style="text-transform: uppercase;" >
          <v-toolbar-title>{{c.name}}</v-toolbar-title>
          
          </v-toolbar>
          <div v-if="hooks.vehicleClass = c.name">

            <v-sheet max-width="calc(100%-32px" min-height="100px" dark v-if="hooks.length > 0">
              
    <v-sparkline :value="distances" 
    type="trend" 
    line-width="0.4" 
    label-size="5"
    color= "white"
    gradient="['red','violet', 'purple']"
    gradient-direction="top"
    gradients
    ></v-sparkline>
            </v-sheet> 
        <v-simple-table  dark>
          
          
          <thead>
            <tr>
    
              <th class="text-left">Pull</th>
              <th class="text-left">Track</th>
              <th class="text-left">Distance</th>
              <th class="text-left">Points</th>
              <th class="text-left" v-if="admin == true">Update</th>
              <th class="text-left" v-if="admin == true">Delete</th>
            </tr>
          </thead>
          <tbody v-for="h in hooks" :key="h['.key']">
            <tr v-if="h.vehicleClass == c.name">
              <span hidden>{{h.id}}</span>
              <td>{{h.pull.date}} {{h.pull.title}}</td>
              <td>{{h.track}}</td>
              <td>{{h.distance}}</td>
              <td>{{h.points}}</td>
              
            </tr>
          </tbody>

        </v-simple-table>
          </div>
        

      </div>
      
    </div>
</template>

<script>
    import {fb,db} from '../../firebaseconfig.js'
    import {mapState} from 'vuex'

    export default {
        name: 'vehicleDetails',
        data() {
            return {
                vehicleId: this.$route.params.id,
                hooks: {},
                currentVehicle: {}
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
            }
        },
        computed: {
            ...mapState(['currentUser', 'userProfile']),
            currentName() {
                let vehicleName
                return vehicleName = this.currentVehicle.name
            },
            pastClasses() {
               let pc =  _.groupBy(hooks,vehicleClass)
               return pc
            },
            distanceAvailable() {
                if (this.hooks.distance) {
                    return true
                } else {return false}
            },
            distances() {
      let distance = this.hooks.map(hook => hook.distance)
      console.log(distance)
      let hookNumbers = distance.map(function (x) {return parseInt(x,10)})
      console.log(hookNumbers)
      return hookNumbers
    },
            pullLabels() {
                var result = _.map(this.hooks,'pull.date')
                    return result
                },
        }
    }
</script>