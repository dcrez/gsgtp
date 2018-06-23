// Home.vue


<template>
<div class="container" style="margin-top:70px;">
  <h1>Welcome to GSGTP Admin</h1>
<p>This portal is available only to GSGTP administrators to edit/manage pulls.</p>
<div class="row">
<div class="col-12 mt-5">
  <h3>Scheduling and managing events</h3>
  <p>Use the buttons below to manage the schedule.</p>
  <div class="btn-group">
    <router-link :to="{name: 'listEvents'}" class="btn btn-primary">View</router-link>
    <router-link :to="{name: 'scheduleEvent'}" class="btn btn-primary">Schedule</router-link>
  </div>

</div>
<div class="col-12 mt-5">
  <h3>Pulls</h3>
  <p>Use the buttons below to create and view hooks.</p>
  <div class="btn-group">
    <router-link :to="{name: 'listPulls'}" class="btn btn-primary">View</router-link>
    <router-link :to="{name: 'addPull'}" class="btn btn-primary">Add</router-link>
  </div>
</div>
</div>
</div>
</template>


<script>
export default {
  components: {
      name: 'home'
  }
}
</script>