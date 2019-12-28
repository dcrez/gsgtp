<template>
  <div class="home" style="margin-top: 110px;">
    
    <Welcome msg="Parent"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'home',
  components: {
    Welcome
  }
}
</script>
