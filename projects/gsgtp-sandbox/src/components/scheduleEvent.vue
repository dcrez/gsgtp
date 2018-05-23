// scheduleEvent.vue

<template>
    
    <div class="container-fluid">
    <h1>Schedule Event</h1>
        <div class="card border-0">
            
            <div class="card-body">
                <div class="card-title"><h5>Add event</h5></div>
                <form v-on:submit.prevent="scheduleEvent" class="form">
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
                        <input type="submit" class="btn btn-primary" value="Add Event">
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>


<script>
// Connect Firebase to component
import { db } from '../config/db';

export default {
    components: {
        name: 'scheduleEvent'
    },
    firebase: {
        events: db.ref('schedule')
    },
    data () {
        return {
            newEvent: {
                description: '',
                date:'',
                time: '',
                address: '',
                city: '',
                state:'',
                pointsAwarded: '',
                track: ''
            }
        }
    },
    methods: {
        scheduleEvent() {
            this.$firebaseRefs.events.push({
                description: this.newEvent.description,
                date: this.newEvent.date,
                time: this.newEvent.time,
                address: this.newEvent.address,
                city: this.newEvent.city,
                state: this.newEvent.state,
                pointsAwarded: this.newEvent.pointsAwarded,
                track: this.newEvent.track
            })
            this.newEvent.description = '';
            this.newEvent.date='';
            this.newEvent.time='';
            this.newEvent.address='';
            this.newEvent.city = '';
            this.newEvent.state='';
            this.newEvent.pointsAwarded='';
            this.newEvent.track='';
            this.$router.push('/schedule')
        }
    }
}
</script>
