// editEvent.vue

<template>
<div class="container-fluid">
    
<div class="card">
<h1 class="card-header">Edit Event</h1>
    <div class="card-body">
    <form v-on:submit.prevent="updateEvent">
        <div class="form-row">
                    <div class="form-group mr-4 col">
                        <label class="mr-2">Date of Event</label>
                        <input type="date" class="form-control" v-model="newEvent.date"/>
                    </div>
                    <div class="form-group mr-4 col">
                        <label class="mr-2">Time</label>
                        <input type="time" class="form-control" placeholder="Event start time." v-model="newEvent.time" />
                    </div>
                    <div class="form-group col">
                        <label class="mr-2">Track</label>
                        <select class="form-control" v-model="newEvent.track">
                            <option disabled selected>Select a track type</option>
                            <option>Dirt</option>
                            <option>Tar</option>
                            <option>No track</option>
                        </select>
                    </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col">
                        <label class="mr-2">Description</label>
                        <input type="text" class="form-control" placeholder="Describe the event." v-model="newEvent.description"/>
                        </div>
                    </div>
        <div class="form-row">
            <div class="form-group mr-4 col">
                        <label>Address</label>
                        <input type="text" class="form-control" v-model="newEvent.address" />
                    </div>
            <div class="form-group mr-4 col">
                        <label>City</label>
                        <input type="text" class="form-control" v-model="newEvent.city"/>
                    </div>
                    <div class="form-group col ">
                        <label>State</label>
                        <select class="form-control" v-model="newEvent.state">
                            <option>Minnesota</option>
                            <option>Wisconsin</option>
                        </select>
                    </div>
                    </div>
        <div class="form-row">
                        <div class="form-group mr-4">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="points" v-model="newEvent.pointsAwarded">
                        <label>Points?</label>
                        </div>
                    </div>
                    </div>
        <div class="form-row">
            <input type="submit" class="btn btn-primary" value="Edit Event">
                    </div>
    </form>
    </div>
    </div>
</div>
</template>


<script>

import { db } from '../config/db';

export default {
    components: {
        name: 'editEvent'
    },
    firebase:{
        events: db.ref('schedule'),
        eventsObj: {
            source: db.ref('schedule'),
            asObject:true
        }
    },
    data() {
        return{
            newEvent: {}
        }
    },
    created() {
        let scheduledEvent = this.eventsObj[this.$route.params.id];
        this.newEvent = {
            date: scheduledEvent.date,
            description: scheduledEvent.description,
            time: scheduledEvent.time,
            address: scheduledEvent.address,
            city: scheduledEvent.city,
            state: scheduledEvent.state,
            pointsAwarded: scheduledEvent.pointsAwarded,
            track: scheduledEvent.track
        }
    },
    methods: {
        updateEvent() {
            this.$firebaseRefs.events.child(this.$route.params.id).set(this.newEvent);
            this.$router.push('/schedule')
        }
    }
}
</script>
