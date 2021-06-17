<template>
  <div class="home">
  <hero/>
  <member v-if="isMember" />
  <signup v-else />
  <schedule/>
  
  </div>
</template>

<script>
// @ is an alias to /src
import learnMore from '@/components/learnMore.vue'
import schedule from '@/components/schedule.vue'
import hero from '@/components/hero.vue'
import member from '@/components/member.vue'
import signup from '@/components/signup.vue'

import {mapState} from 'vuex'
import {db} from '../../firebaseconfig.js'


export default {
  name: 'home',
  components: {
    learnMore, schedule, hero, member, signup
  },
  data() {
    return {
    }
  },
  firestore() {},
  computed: {
    ...mapState(['currentUser', 'userProfile']),
    isMember: function() {
      let memberStatus
      if (this.$store.state.userProfile != {}) {
        memberStatus = this.$store.state.userProfile.member
      } else { memberStatus = false}
      return memberStatus
    }
  }
}
</script>
