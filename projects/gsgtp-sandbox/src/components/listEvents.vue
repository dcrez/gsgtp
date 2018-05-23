// listEvents.vue

<template>
<div class="container-fluid">
    <h1>Schedule of Events</h1>
    
    <div>
       <div class="row mt-2" v-for="event of events" :key="event['.key']">
        <div class="col-2">
            {{event.date}} {{event.time}}
        </div>
        <div class="col-3">
            {{event.description}}
        </div>
        <div class="col-1" v-if="event.pointsAwarded">
            Points
        </div>
        <div class="col-1" v-else>
            No Points
        </div>
        <div class="col">{{event.address}}<br>{{event.city}}, {{event.state}}</div>
        <div class="col">{{event.track}}</div>
        <div class="float-right">
            <router-link :to="{name: 'editEvent', params: {id:event['.key']}}" class="btn btn-warning">Edit</router-link>
            <button @click="deleteEvent(event['.key'])" class="btn btn-danger">Delete</button>
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
    }
}
</script>
