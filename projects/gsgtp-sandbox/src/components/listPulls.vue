// listPull.vue

<template>
    <div class="container">
    <router-link :to="{name: 'home'}" class="btn btn-default btn-sm mb-3">Return to homepage</router-link>
    <div class="card mb-4">
    <div class="card-body">
    <h4>Edit and Manage Pulls</h4>
    <small class="text-muted">Use this form to filter hooks.</small>
    <form class="form">
    <div class="form-group row">
    <label class="col-sm-3 col-form-label">Select an event</label>
    <div class="col-sm-9">
    <select class="form-control" id="eventId" v-model="searchEvents"> 
        <option disabled selected>Select an event to filter.</option>
        <option :key="event['.key']" v-for="event in scheduledEvents" :value="event['.key']" >{{event.date}} {{event.description}}</option>
    </select>
    </div>
    </div>
    <div class="form-group row">
    <label class="col-sm-3 col-form-label">Select a vehicle class.</label>
    <div class="col-sm-9">
    <select class="form-control mt-2" id="vehicleClassId" v-model="searchVehicles">
        <option disabled selected>Select a class to filter.</option>
        <option :key="vehicle['.value']" v-for="vehicle in vehicleClasses" :value="vehicle['.value']">{{vehicle['.value']}}</option>
    </select>
    </div>
    </div>
        <router-link :to="{name: 'addPull'}" class="btn btn-primary">Add</router-link>

    </form>
    </div>
    </div>

<h5>Filtered Pulls</h5>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Vehicle Class</th>
                <th scope="col">Vehicle</th>
                <th scope="col">Pull Order</th>
                <th scope="col">Distance</th>
                <th scope="col">Points</th>
                <th scope="col">DQ?</th>
                <th slot="col">Edit</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="hook in hooks" :key="hook['.key']" v-if="hook.scheduledEvent == searchEvents.value && hook.vehicleClass == searchVehicles">
                <th scope="row">{{hook.vehicleClass}}</th>
                <td>{{hook.vehicle}}</td>
                <td>{{hook.pull_order1}}</td>
                <td>{{hook.distance}}</td>
                <td>{{hook.points}}</td>
                <td>{{hook.dq}}</td>
                <td><router-link :to="{name: 'editPull', params: {id:hook['.key']}}" class="badge badge-light"><i class="fas fa-edit"></i></router-link></td>
            </tr>
        </tbody>
    </table>
 <!--  
<h5 class="mt-4">All Pulls</h5>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Vehicle Class</th>
                <th scope="col">Vehicle</th>
                <th scope="col">Pull Order</th>
                <th scope="col">Distance</th>
                <th scope="col">Points</th>
                <th scope="col">DQ?</th>
                <th slot="col">Edit</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="hook in hooks" :key="hook['.key']">
                <th scope="row">{{hook.vehicleClass}}</th>
                <td>{{hook.vehicle}}</td>
                <td>{{hook.pull_order1}}</td>
                <td>{{hook.distance}}</td>
                <td>{{hook.points}}</td>
                <td>{{hook.dq}}</td>
                <td><router-link :to="{name: 'editPull', params: {id:hook['.key']}}" class="badge badge-light"><i class="fas fa-edit"></i></router-link></td>
            </tr>
        </tbody>
    </table>
        -->
       
    </div>
    
</template>


<script>
import {db} from '../config/db';

export default {
    components: {
        name: 'listPull'
    },
    data() {
        return {
            hooks: [],
            hooksObj: {},
            searchEvents: '',
            searchVehicles:''
        }
    },
    firebase: {
        scheduledEvents: db.ref('schedule'),
        vehicleClasses: db.ref('vehicleClasses'),
        hooks: db.ref('hooks').orderByKey(),
        hooksObj: {
            source:db.ref('hooks'),
            asObject:true
        },
    },
    methods: {
        /*deletePull(key) {
            this.$firebase.hooks.child(key).remove();
            this.$firebase.vehicles
        }*/
    }
    
    
    
}
</script>
