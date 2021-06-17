<template>
  <div>
    <div class="display-1 mt-5 mb-5 font-weight-light">
{{currentCity.name}}     <v-btn class="mb-3 float-right" text color="red darken-3" @click="goBack">
      <v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back
    </v-btn></div>

    <v-list two-line>
        <v-list-item-group active-class="red--text">
          <v-list-item :key="pull.id" v-for="pull in pulls" @click="pullDetails(pull)">
            <v-list-item-content>
              <v-list-item-title @click="pullDetails(pull)">{{pull.city}}, {{pull.state}} <span v-if="pull.title">-
                  {{pull.title}}</span></v-list-item-title>
              <v-list-item-subtitle class="text--primary">{{pull.date | moment("dddd, MMMM Do YYYY")}} at {{pull.time}}
                | {{pull.date | moment("from", "now")}}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="pull.description">{{pull.description}}</v-list-item-subtitle>

            </v-list-item-content>
            <v-list-item-icon>

              <v-icon v-if="pull.points" color="" class="mr-3">fad fa-trophy-alt</v-icon>
              <v-icon v-if="pull.track == 'N/A'" color="gray lighten-2" class="">fas fa-do-not-enter</v-icon>
              <v-icon v-if="pull.track == 'Tar'">fas fa-road</v-icon>
              <v-icon v-if="pull.track == 'Dirt'">fas fa-digging</v-icon>

            </v-list-item-icon>



          </v-list-item>
        </v-list-item-group>
      </v-list>
  </div>
    </template>
    
<script>
import {fb,db} from '../../firebaseconfig.js'
import {mapState} from 'vuex'

export default {
    name: 'cityDetail',
    data() {
        return {
            pulls: {},
            hooks: {},
            cityRoute: this.$route.params.id,
            currentCity: null,
            pulls: {}
        }
    },
    firestore() {
        let cityId = this.cityRoute
        let cityRef = '/cities/'+cityId
        
        //let cityName = this.currentCity.name
        return {
            currentCity: db.collection('cities').doc(cityId),
            pulls: db.collection('pulls').where('cityRef', '==', cityRef)
        }
    },
    methods: {
        goBack() {
        this.$router.go(-1)
      },
      pullDetails(pull) {
        this.$router.push({
          path: `/pull/${pull.date}/${pull.id}`
        })}
    },
    computed: {

    }
}
</script>