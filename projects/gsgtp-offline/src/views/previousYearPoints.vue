<template>
    <div id="standings">
        <div class="display-1 mt-5 mb-5 font-weight-light">Points ({{selectedYear}})
            <v-btn class="mb-3 float-right no-print" text color="red darken-3" @click="goBack">
      <v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back
    </v-btn>
        </div>
        <!--
        <v-card color="red darken-4" dark>
            <v-container>
                <v-card-title> Standings<v-spacer></v-spacer>
                    <v-text-field v-model="selectedYear" label="Year" persistent-hint disabled
                        hint="Year must always be in YYYY format. Data only goes back to 2019."></v-text-field>
                </v-card-title>
            </v-container>
        </v-card>-->

        <div v-if="pointsStats && pointsStats.length < 1" class="mt-4">
      <v-banner two-line color="green">
        <v-avatar slot="icon" size="60px">
          <v-icon dark>far fa-person-sign</v-icon>
        </v-avatar>
        No points yet. Check back after our first pull to get in on the action.
      </v-banner>
      
    </div>
    <div v-else>

        <div v-for="v in pointsStats" :key="v['.index']" class="pgbreak">
            <v-card class="mt-5" light >
                <v-container>
                    <v-card-title>{{v.name}}</v-card-title>
                    <v-card-text>
                        <v-list dense>
                            <v-list-item-group>
                                <v-list-item v-for="(h,index) in v.vehicle" :key="h['.key']" @click="vehicleDetails(h)">
                                  <v-list-item-content>  {{h.name}}</v-list-item-content>
                                  <v-list-item-icon>
                                      <v-icon v-if="index == 0">fad fa-star</v-icon>
                                      {{h.points}}
                                  </v-list-item-icon>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    
                    </v-card-text>
                </v-container>
                   
                
            </v-card>
            
            
            
        </div>

        </div>

    </div>
</template>

<script>
    import {
        db, currentUser
    } from '../../firebaseconfig.js'
    import {
        mapState
    } from 'vuex'

    export default {
        name: 'previousYearPoints',
        data() {
            return {
                hooks: {},
                selectedYear: this.$route.params.year
            }
        },
        firestore() {
            let yearRef = this.$route.params.year
            return {
                hooks: db.collection('hooks').where("pointsYear", "==", yearRef).orderBy('vehicleClass', 'asc')
            }
        },
        methods: {
            goBack() {
        this.$router.go(-1)
      },
      vehicleDetails(v) {
        console.log(v)
        let name = v.name
        let vref = name.toLowerCase().split(" ").join("-")
        this.$router.push({
        path: `/vehicle/${vref}`
        }) 
        }


        },
        computed: {
            vehiclesByClass() {
                var result = _.chain(this.hooks)
                    .filter(['isMember', true])
                    .filter(['dq',false])
                    .groupBy("vehicleClass")
                    .map(function(v,id) {
                        return {
                            name: id,
                            vehicles: (_.groupBy(v,"vehicleName"))
                                
                        }
                    })
                    
                    .value();

                    return result
                     },

                pointsStats() {
                var result = _.chain(this.hooks)
                    .filter(['isMember', true])
                    .filter(['dq',false])
                    .groupBy("vehicleClass")
                    .map(function(v,id) {
                        return {
                            name: id,
                            vehicle: (_.chain(_.groupBy(v,'vehicle'))
                            .map(function(h,k) {
                                return {
                                    name: k,
                                    points: _.sumBy(h,'points')
                                }
                            }).orderBy('points','desc')
                            .value()
                            )}
                    })
                    
                    .value();

                    return result

                /*let vcRef = _.groupBy(this.hooks, "vehicleClass")
                console.log(vcRef)

                let mRef = _.map(vcRef, (function(v, i) {
                    return {
                        i: _.groupBy(v, "vehicleName")
                    }
                
                }))

                return mRef
                */ },
                
        }
        
    }
</script>

<style>
.winner {
    font-size: 1.1em;

}
</style>