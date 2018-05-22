// scheduleEvent.vue

<template>
    
    <div class="container-fluid">
    <h1>Schedule Event</h1>
        <div class="card border-0">
            
            <div class="card-body">
                <div class="card-title"><h5>Add event</h5></div>
                <form v-on:submit.prevent="scheduleEvent" class="form">
                    <div class="form-row">
                    <div class="form-group mr-4">
                        <label class="mr-2">Date of Event</label>
                        <input type="date" class="form-control" />
                    </div>
                    <div class="form-group mr-4">
                        <label class="mr-2">Time</label>
                        <input type="time" class="form-control" placeholder="Event start time." />
                    </div>
                    <div class="form-group mr-4">
                        <label class="mr-2">Description</label>
                        <input type="text" class="form-control" placeholder="Describe the event." />
                    </div>
                    <div class="form-group mr-4">
                        <div class="form-check mt-4">
                        <input class="form-check-input" type="checkbox" id="points">
                        <label>Points?</label>
                        </div>
                    </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group mr-4">
                        <label>Address</label>
                        <input type="text" class="form-control" />
                    </div>
                    <div class="form-group mr-4">
                        <label>City</label>
                        <input type="text" class="form-control"/>
                    </div>
                    <div class="form-group ">
                        <label>State</label>
                        <select class="form-control">
                            <option>Minnesota</option>
                            <option>Wisconsin</option>
                        </select>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>


<script>
export default {
    components: {
        name: 'scheduleEvent'
    }
}
</script>
