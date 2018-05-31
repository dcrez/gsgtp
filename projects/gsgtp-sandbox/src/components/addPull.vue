// addPull.vue

<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h3>Sign in</h3>
      </div>
      <div class="card-body">
        <form class="form" v-on:submit.prevent="addPull">
          <div class="form-group">
              <label>First Name</label>
              <input class="form-control" type="text" placeholder="First name">
          </div>
          <div class="form-group">
              <label>Last Name</label>
              <input class="form-control" type="text" placeholder="Last name">
          </div>
          <div class="form-group">
              <label>Vehicle</label>
              <input class="form-control" type="text" placeholder="Vehicle">
          </div>
          <div class="form-group">
              <label>Hooks</label>
              <input class="form-control" type="number" placeholder="" min="1">
          </div>
        </form>
      </div>
    </div>
  </div>
  


</template>

<script>
export default {
  components: {
      name: 'addPull'
  }
}
</script>np