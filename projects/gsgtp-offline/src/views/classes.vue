<template>
     <div id="vehicleClasses">
        <div class="display-1 mt-5 mb-5 font-weight-light">Vehicle Classes 
            <v-btn class="mb-3 float-right" text color="red darken-3" @click="goBack">
      <v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back
    </v-btn>
    </div>
   <v-row>
   <v-col v-for="c in activeClasses" :key="c.id" cols="12" sm="6" md="4">
        <v-btn outlined block @click="classDetails(c)">
        {{c.name}}
        </v-btn>
    </v-col>
   </v-row>
    
    
      

     </div>
</template>
<script>
import {fb,db} from '../../firebaseconfig.js'

export default {
    name: 'classes',
    data() {
        return {
          activeClasses: {},
          color: ['red', 'indigo', 'teal', 'deep-orange']
        }
    },
    firestore() {
      return {
        activeClasses: db.collection('vehicleClasses').where('active', '==', true)
      }
    },
    methods: {
        goBack() {
        this.$router.go(-1)
      },
      classDetails(cv) {
        this.$router.push({
          path: `/class/${cv.id}`
        })}
    },
    components: {
      
    }
}
</script>