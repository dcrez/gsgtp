<template>
    <div>
       
        <v-card class="" flat>
        <v-row class="d-flex align-content-center flex-wrap">
            <v-col>
      <v-card-title>{{pull.title}}</v-card-title>
      <v-card-subtitle>{{pull.date}}</v-card-subtitle>
            </v-col>
            <v-col class="d-flex">
        <v-btn fab text color="error" v-if="userProfile.role == 'admin'"><font-awesome-icon icon="trash-alt"></font-awesome-icon></v-btn>
        <v-btn fab text color="success" v-if="userProfile.role == 'admin'"><font-awesome-icon icon="print">Print</font-awesome-icon></v-btn>
        <v-btn class="float-right" text color="red darken-3">Go back</v-btn>
            </v-col>
        </v-row>
        </v-card>
    
    </div>
</template>

<script>
  import {
    fb,db
  } from '../../firebaseconfig.js'
  import {
    mapState
  } from 'vuex'
import addHook from '@/components/addHooks.vue'

  export default {
    name: 'pullDetailsV2',
    data() {
        return {
            pull: {}
        }
    },
    components: {addHook},
    firestore() {
      let currentPull = this.$route.params.id
      return {
        pull: db.collection('pulls').doc(currentPull),
        sponsors: db.collection('pulls').doc(currentPull).collection("sponsors"),
        hooks: db.collection('hooks').where("pullId", "==", currentPull).orderBy("vehicleClass", "asc")
      }
    },
    computed: {
      ...mapState(['currentUser', 'userProfile'])}
  }

</script>

<style>

@media print {
body {
    overflow: auto;
    height: auto;
}

.pgBreak {
    page-break-after: always;
    margin-top:50px;
}

.no-print {
    display: none !important;
}

.pullDetails {
  position:fixed;
  top:0;
  width: 100%;
}

}

</style>