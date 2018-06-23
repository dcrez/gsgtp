// editPull.js

<template>
<div class="container">
<div class="card">
<div class="card-body">
<h5>Edit Hook</h5>
<small id="edithookhelp" class="form-text text-muted">Use this form to edit and assign points to a hook.</small>

<form v-on:submit.prevent="updateHook" class="mt-4">
    <div class="form-group row">
          <label class="col-sm-3 col-form-label">Vehicle Class</label>
          <div class="col-sm-9">
          <input class="form-control" v-model="newHook.vehicleClass">
          </div>
          </div>

    <div class="form-group row">
          <label class="col-sm-3 col-form-label">Vehicle</label>
          <div class="col-sm-9">
          <input class="form-control" v-model="newHook.vehicle">
          </div>
          </div>

    <div class="form-group row">
          <label class="col-sm-3 col-form-label">First Name</label>
          <div class="col-sm-9">
          <input type="text" v-model="newHook.puller_firstName" class="form-control">
          </div>
          </div>
    <div class="form-group row">
          <label class="col-sm-3 col-form-label">Last Name</label>
          <div class="col-sm-9">
          <input type="text" v-model="newHook.puller_lastName" class="form-control">
          </div>
          </div>
    <div class="form-group row">
          <label class="col-sm-3 col-form-label">Pull Order</label>
          <div class="col-sm-9">
          <input type="text" v-model="newHook.pull_order1" class="form-control">
          </div>
          </div>
    <div class="form-group row">
          <label class="col-sm-3 col-form-label">Distance</label>
          <div class="col-sm-9">
          <input type="number" v-model="newHook.distance" class="form-control">
          </div>
          </div>
    <div class="form-group row" v-if="newHook.member">
          <label class="col-sm-3 col-form-label">Points</label>
          <div class="col-sm-9">
          <input type="number" v-model="newHook.points" class="form-control">
          </div>
          </div>
    <div class="form-group row">
          <label class="col-sm-3 col-form-label">Award</label>
          <div class="col-sm-9">
          <select class="form-control" v-model="newHook.award">
              <option selected>Hooked</option>
              <option>1st Place</option>
              <option>2nd Place</option>
              <option>3rd Place</option>
              <option>N/A</option>
          </select>
          </div>
          </div>

    <div class="form-group row">
          <label class="col-sm-3 col-form-label">DQ Reason</label>
          <div class="col-sm-9">
          <select class="form-control" v-model="newHook.dq">
              <option selected>N/A</option>
              <option>Out of Bounds</option>
              <option>Equipment</option>
              <option>Safety</option>
              <option>Other</option>
          </select>

          </div>
          </div>

          <div class="form-group float-left">
                <input type="submit" class="btn btn-success mr-3" value="Edit Pull">
            
                <router-link :to="{name:'listPulls'}" class="btn btn-default">Cancel</router-link>
          </div>
</form>
</div>
</div>
</div>
</template>

<script>
import {db} from '../config/db'

export default {
    components: {
        name:'editPull'
    },
    firebase: {
        hooks: db.ref('hooks'),
        hooksObj: {
            source: db.ref('hooks'),
            asObject:true
        }
    },

    data() {
        return {
            newHook: {}
        }
    },
    created() {
        let hookEntry = this.hooksObj[this.$route.params.id]
        this.newHook = {
            vehicleClass: hookEntry.vehicleClass,
            vehicle: hookEntry.vehicle,
            puller_firstName: hookEntry.puller_firstName,
            puller_lastName: hookEntry.puller_lastName,
            pull_order1: hookEntry.pull_order1,
            distance: hookEntry.distance,
            points: hookEntry.points,
            dq: hookEntry.dq,
            award: hookEntry.award,
            member: hookEntry.member,
            scheduledPull: hookEntry.scheduledPull } 
    },
    methods: {
        updateHook() {
            var hookLookup = this.$route.params.id;
            var updates = {};

            var editedHook = {
            vehicleClass: this.newHook.vehicleClass,
            vehicle: this.newHook.vehicle,
            puller_firstName: this.newHook.puller_firstName,
            puller_lastName: this.newHook.puller_lastName,
            pull_order1: this.newHook.pull_order1,
            distance: this.newHook.distance,
            points: this.newHook.points,
            dq: this.newHook.dq,
            award: this.newHook.award,
            member: this.newHook.member,
            scheduledPull: this.newHook.scheduledPull
        }
            
            updates['/hooks/'+ hookLookup] = editedHook //update hook
            updates['vehicles' + '/'+ this.newHook.vehicleClass + '/' + this.newHook.vehicle + '/' + hookLookup] = editedHook;
            updates['schedule'+'/'+ this.newHook.scheduledPull +'/vehicleClasses/' + this.newHook.vehicleClass + '/' + hookLookup] = editedHook;

            return db.ref().update(updates) & alert("Edits made!") & this.$router.push('/pulls')
        }
    }
}
</script>
