// listEvents.vue

<template>
<div class="container-fluid">
    <h1>Schedule of Events</h1>
    <p>The list below includes pulls and other club events. Make sure to check event details before you pack up your tractor!</p>
    <h3 class="mt-3">Future Events</h3>  
    <div class="row">
       <div class="card col-md-4" v-for="event of futureEvents" :key="event['.key']">
                   <div class="card-body">
            <span class="float-right">
            <router-link :to="{name: 'editEvent', params: {id:event['.key']}}" class="badge badge-light"><i class="fas fa-edit"></i></router-link>
            <a @click="deleteEvent(event['.key'])" class="badge badge-dark" href="#"><i class="fas fa-trash"></i></a>
        </span>
            <h5>{{event.date}} {{event.time}}</h5>   
        
        <div>{{event.description}}</div>
        <div class="scheduleLink"><span v-if="event.address">{{event.address}}, </span>{{event.city}}, {{event.state}}</div>
              
        </div>
        <div>
            <span v-if="event.pointsAwarded" class="badge badge-light"> <i class="fas fa-trophy"></i></span>
            <span v-if="event.track === 'Tar'" class="badge badge-light"><i class="fas fa-road"></i></span>
            <span v-if="event.track === 'Dirt'" class="badge badge-light"><i class="far fa-image"></i></span>
        </div>
        </div>
       
    </div>
    <h3 class="mt-3">Past Events</h3>  
    <div class="row">
   
       <div class="card col-md-4" v-for="event of pastEvents" :key="event['.key']">
                   <div class="card-body">
            <span class="float-right">
            <router-link :to="{name: 'editEvent', params: {id:event['.key']}}" class="badge badge-light"><i class="fas fa-edit"></i></router-link>
            <a @click="deleteEvent(event['.key'])" class="badge badge-dark" href="#"><i class="fas fa-trash"></i></a>
        </span>
            <h5>{{event.date}} {{event.time}}</h5>   
        
        <div>{{event.description}}</div>
        <div class="scheduleLink"><span v-if="event.address">{{event.address}}, </span>{{event.city}}, {{event.state}}</div>
              
        </div>
        <div class="float-right"> 
            <span v-if="event.pointsAwarded" class="badge badge-light"> <i class="fas fa-trophy"></i></span>
            <span v-if="event.track === 'Tar'" class="badge badge-light"><i class="fas fa-road"></i></span>
            <span v-if="event.track === 'Dirt'" class="badge badge-light"><i class="far fa-image"></i></span>
        </div>
        </div>
       
    </div>
    
</div>
</template>


<script>
import {db} from '../config/db';

export default {
    components: {
        name: 'listEvents'
    },
    data() {
        return {
            events: []
        }
    },
    firebase: {
      events: db.ref('schedule')
    },
    
    methods: {
        deleteEvent(key) {
            this.$firebaseRefs.events.child(key).remove();
        }
    },
    computed: {
        pastEvents() {
            var today = new Date();
            //var scheduledDay = this.events.event.date
            return this.events.filter(
                function(event){
                    var scheduledDay = new Date(event.date);
                    return scheduledDay < today;
                }
            )
        },
        futureEvents() {
            var today = new Date();
            //var scheduledDay = this.events.event.date
            return this.events.filter(
                function(event){
                    var scheduledDay = new Date(event.date);
                    return scheduledDay >= today;
                }
            )
        }
    }
}
</script>
