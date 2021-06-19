<template>
<div>
    <v-btn class="mb-3" text color="red darken-3" @click="goBack"><v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back</v-btn>
    <v-card class="mx-auto mt-3" :loading="performingRequest">
        <v-container>
    <v-card-title>
        Schedule a Pull
    </v-card-title>
    <v-card-text>
    <v-alert v-if="form.error">{{form.error}}</v-alert>
    <v-form @submit.prevent id="schedulePull-form">
        <v-row>
            <v-col cols="12" md="3">
                <v-text-field filled v-model="form.date" label="Event Date" v-mask="'####-##-##'" masked="true" placeholder="YYYY-MM-DD"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field filled v-model="form.time" label="Event Time" v-mask="'##:## aa'" masked="true"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
               <v-select filled v-model="form.track"
            :items="trackTypes"
            label="Select a Track Type"
          ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
        v-model="form.points"
        label="Will points be awarded?" filled
        required
      ></v-checkbox>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="form.title" label="Event Title" filled></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-textarea
            dense
            filled
            label="Event Description"
            v-model="form.description"
          ></v-textarea>
            </v-col>

            
            <v-col cols="12" md="4">
                <v-text-field v-model="form.address" filled label="Event Address"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="form.city" label="Event City" filled></v-text-field>
               
            </v-col>
            <v-col cols="12" md="4">
                <v-select :items="states" label="Select a State" v-model="form.state" filled></v-select>
               
            </v-col>
            
        </v-row>
        </v-form>
    </v-card-text>
    <v-card-actions><v-spacer></v-spacer>
        <v-btn text @click="goBack" >Cancel</v-btn>
        <v-btn text @click="addEvent" form="schedulePull-form" color="success" outlined>Add Event</v-btn>
        <transition name="fade">
            <div v-if="performingRequest" class="loading">
                <v-progress-linear
        indeterminate
        color="red darken-2"
      ></v-progress-linear>
            </div>
        </transition>
    </v-card-actions>
        </v-container>
        </v-card>
        
        <v-card class="mt-5">
            <v-card-title>Pulls
            <v-spacer></v-spacer>
            <v-text-field v-model="search" label="search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="pulls" :search="search">

            </v-data-table>
        </v-card>
    
    
</div>
</template>
<script>
const fb = require('../../firebaseconfig.js')
import {db} from '../../firebaseconfig.js'
import { create } from 'domain'


export default {
    name: 'schedulePull',
    data() {
        return {
            search: '',
            form: {
                date: '',
                time: '',
                title: '',
                track: false,
                description: '',
                address: '',
                city: '',
                state: '',
                points: '',
                error: null
            },
            trackTypes : [
                'Dirt', 'Tar','N/A'
            ],
            pulls: {},
            states: ['MN', 'WI'],
            performingRequest: false,
            year: '2021',
            headers: [
                {
                    text: 'Event Date',
                    align: 'left',
                    sortable: true,
                    value: 'date'
                },
                {
                    text: 'Title',
                    value: 'title'
                },
                {
                    text: 'Address',
                    value: 'address'
                },
                {
                    text: 'City',
                    value: 'city'
                },
                {
                    text: 'State',
                    value: 'state'
                },
                {
                    text: 'Points',
                    value: 'points'
                },
                {
                    text: 'Track',
                    value: 'track'
                }
            ]
        }
    },
    firestore() {
            return {
            pulls: db.collection("pulls").orderBy("date", "desc")
            //cities: db.collection("cities")
        }},
    computed: {
        createCityRef() {
              return '/cities/' + this.form.city.toLowerCase().split(' ').join('-') + ',+' +this.form.state.toLowerCase()
            },
        getYear() {
            return this.form.date.substring(0,4)
        }
        },
    methods: {
        goBack: function() {
            this.$router.go(-1)
        },
        addEvent: function() {
            // start transition/loading view
            let pR = this.performingRequest
            pR = true
            //formA = this.form

            // add pull to Firestore
            db.collection("pulls").add({
                date: this.form.date,
                time: this.form.time,
                title: this.form.title,
                track: this.form.track,
                description: this.form.description,
                address: this.form.address,
                city: this.form.city,
                state: this.form.state,
                points: this.form.points,
                year: this.getYear,
                cityRef: this.createCityRef,
                created: new Date()
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id)
            });
            
            // Create City ID for document storage in Firestore
            var cityDoc = (this.form).city.toLowerCase().split(' ').join('-')+',+'+this.form.state.toLowerCase();

            console.log(cityDoc);

            // add city to Firestore
            var cityRef = db.collection("cities").doc(cityDoc);
            return cityRef.update({
                name: this.form.city,
                state: this.form.state,
                track: this.form.track
            }).then(function() {
                console.log("City successfully updated");
                pR = false;

            this.form = {
                date: '',
                time: '',
                title: '',
                track: '',
                description: '',
                address: '',
                city: '',
                state: '',
                points: ''}

            console.log("Process complete! Pull added.")
                
            }).catch(function(error){
                console.error("Error updating document: ", error);
                pR = false
                form.error = error.message
            });

            

        }
            
        },
        components: {
            
        }
    }
    

</script>