<template>
    <div class="">
        <div class="display-1 mt-5 mb-5 font-weight-light">
      Host Cities
      <v-btn class="mb-3 float-right" text color="red darken-3" @click="goBack">
      <v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back
    </v-btn></div>
        <v-row>
            <div class="col-xs-12 col-sm-6 col-md-4" v-for="city in cities" v-bind:key="city['.index']">
            <v-card class="mx-auto" @click="cityDetails(city)">
                <v-img class="white--text align-end" height="200px" :src="city.img"></v-img>
                <v-card-title>{{city.name}}, {{city.state}}</v-card-title>
                <v-card-actions>
                    <v-btn @click="deleteCity(city)" v-if="userProfile.admin">Remove</v-btn>
                </v-card-actions>
            </v-card>
            </div>
        </v-row>
    </div>
</template>
<script>
import learnMore from '@/components/learnMore.vue'
import {db} from '../../firebaseconfig.js'

export default {
    name: 'cities',
    data() {
        return {
            cities: {},
            userProfile: {
                admin: false
            }
        }
    },
    firestore() {
        return {
            cities: db.collection('cities').orderBy("name")
        }
    },
    computed: {
        cityRef: function(city) {

        }
    },
    methods: {
       deleteCity (city) {
           db.collection('cities').doc(city.id).delete();
       },
       goBack() {
        this.$router.go(-1)
      },
      cityDetails(city) {
        this.$router.push({
        path: `/host/${city.id}`
        }) }
    }
}
</script>