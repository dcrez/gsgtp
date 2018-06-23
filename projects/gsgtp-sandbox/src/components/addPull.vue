// addPull.vue

<template>
  <div class="container-fluid">
    <div class="card">
      
      <div class="card-body">
        <span class="card-title h5">Sign in</span><br>
        <small class="text-muted">Use this form to register your vehicle for today's pulls. Each submission will create 2 hooks for a selected vehicle class.</small>

        <form class="form mt-3" v-on:submit.prevent="addPull">
          <div class="form-group row">
          <label class="col-sm-2 col-form-label">Select event</label>
          <div class="col-sm-10">
          <select v-model="newPull.scheduledPull" class="form-control">
            <option v-for="item in scheduledEvents" v-bind:key="item['.key']" :value="item['.key']">{{item.date}} {{item.description}}</option>
          </select>
          <small id="eventSelectionHelp" class="form-text text-muted">Please select only the current day's pull.</small>
          </div>
          </div>
          <div class="form-group row">
              <label class="col-sm-2 col-form-label">First Name</label>
              <div class="col-sm-10">
              <input class="form-control" type="text" placeholder="Enter your first name" v-model="newPull.puller_firstName">
              </div>
          </div>
          <div class="form-group row">
              <label class="col-sm-2 col-form-label">Last Name</label>
              <div class="col-sm-10">
              <input class="form-control" type="text" placeholder="Enter your last name" v-model="newPull.puller_lastName">
              </div>
          </div>
          <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Membership Status</label>
                      <div class="col-sm-10">
             <select v-model="newPull.member" class="form-control">
              <option selected disabled>Select a membership status.</option>
              <option>Membership status is current (paid)</option>
              <option>Not a member</option>
          </select>
          
                      </div>
          </div>
          <div class="form-group row">
              <label class="col-sm-2 col-form-label">Vehicle Name</label>
              <div class="col-sm-10">
              <input class="form-control" type="text" placeholder="Vehicle Name" v-model="newPull.vehicle">
          </div>
          </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Select a vehicle class</label>
                      <div class="col-sm-10">
             <select v-model="newPull.vehicleClass" class="form-control">
              <option selected disabled>Select a vehicle class.</option>
            <option v-for="vehicle in vehicleClasses" v-bind:key="vehicle['.key']" :value="vehicle['.value']">{{vehicle['.value']}}</option>
          </select>
          
                      </div>
          </div>
           <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Select a second vehicle class</label>
                      <div class="col-sm-10">
             <select v-model="newPull.vehicleClass2" class="form-control">
              <option selected disabled>Optionally select a second vehicle class.</option>
            <option v-for="vehicle in vehicleClasses" v-bind:key="vehicle['.key']" :value="vehicle['.value']">{{vehicle['.value']}}</option>
          </select>
          
                      </div>
          </div>
          <div class="form-group float-left">
           
                        <input type="submit" class="btn btn-success mr-3" value="Add Pull">
            
                        <input type="reset" class="btn btn-default" value="Reset form">
                    </div>
        </form>
      </div>
    </div>
  </div>
  


</template>

<script>
// Connect Firebase to component
import {db} from '../config/db'
//var scheduledRef = db.ref('schedule');

export default {
  components: {
      name: 'addPull'
  },
  firebase: {
    pulls: db.ref('pulls'),
    hooks: db.ref('hooks'),
    vehicleClasses: db.ref('vehicleClasses'),
    scheduledEvents: db.ref('schedule'),
  },
  data () {
    return {
      newPull: {
        scheduledPull: '',
        scheduledPullId: '',
        vehicle: '',
        vehicleClass:'',
        puller_firstName: '',
        puller_lastName:'',
        pull_order: '',
        hooks:''
      }
    }
      },
  methods: {
    addPull() {
        var firstnewHookKey = db.ref().child('hooks').push().key;
        var secondnewHookKey = db.ref().child('hooks').push().key;
        
        var firstPullClass = {
          scheduledPull: this.newPull.scheduledPull,
          vehicle: this.newPull.vehicle,
          vehicleClass: this.newPull.vehicleClass,
          puller_firstName: this.newPull.puller_firstName,
          puller_lastName: this.newPull.puller_lastName,
          pull_order1: Math.floor(Math.random() * 100),
          member:this.newPull.member
        };

        var secondPullClass = {
          scheduledPull: this.newPull.scheduledPull,
          vehicle: this.newPull.vehicle,
          vehicleClass: this.newPull.vehicleClass2,
          puller_firstName: this.newPull.puller_firstName,
          puller_lastName: this.newPull.puller_lastName,
          pull_order1: Math.floor(Math.random() * 100),
          member:this.newPull.member
        
        };

        var updates = {};
        updates['/hooks/'+ firstnewHookKey] = firstPullClass; // add first hook
        updates['vehicles' + '/'+ this.newPull.vehicleClass + '/' + this.newPull.vehicle + '/' + firstnewHookKey] = firstPullClass;
        updates['schedule'+'/'+ this.newPull.scheduledPull +'/vehicleClasses/' + this.newPull.vehicleClass + '/' + firstnewHookKey] = firstPullClass;

        updates['/hooks/'+ secondnewHookKey] = secondPullClass; // add second hook
        updates['vehicles' + '/'+ this.newPull.vehicleClass2 + '/' + this.newPull.vehicle + '/' + secondnewHookKey] = secondPullClass;
        updates['schedule'+'/'+ this.newPull.scheduledPull +'/vehicleClasses/' + this.newPull.vehicleClass2 + '/second-hook/' + secondnewHookKey] = secondPullClass;
        
        return db.ref().update(updates) & alert("Hooks have successfully been added for "+this.newPull.vehicle) & this.$router.push('/pulls')

               
    },
    resetForm() {
       this.newPull.scheduledPull = '',
        this.newPull.vehicle='',
        this.newPull.vehicleClass ='',
        this.newPull.member ='',
        this.newPull.puller_firstName = '',
        this.newPull.puller_lastName = ''
    }
  }
}
</script>