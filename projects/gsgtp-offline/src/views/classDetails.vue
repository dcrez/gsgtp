<template>
    <div>
        <v-card>
            <v-card-title>{{currentClass.name}}</v-card-title>
        </v-card>
    </div>
</template>

   
<script>
import {fb,db} from '../../firebaseconfig.js'
import {mapState, Store} from 'vuex'

export default {
    name: 'classDetail',
    data() {
        return {
            vehicles: {},
            hooks: {},
            classRoute: this.$route.params.id,
            currentClass: null,
            
        }
    },
    firestore() {
        let vclass = this.classRoute
        
        //            vehicles: db.collection('vehicles').where('classes.name', '==', vcRef)
        return {
            currentClass: db.collection('vehicleClasses').doc(vclass),

        }
    },
    methods: {
        goBack() {
        this.$router.go(-1)
      },
      vehicleDetails(v) {
        this.$router.push({
          path: `/vehicle/${v.id}`
        })}
    },
    computed: {
        pulls() {
            return Store.state.pulls;
        }
    }
}
</script>