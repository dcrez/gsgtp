<template>
    <div class="mt-5">
        
        <div>

        <v-card class="mx-auto mb-5"  color="grey lighten-4" elevation="0">
            <v-card-text>
            <div class="text-overline"><a href="#" @click="memberDetails(memberRef)">Member Details</a></div>
            <div class="font-weight-medium text-h5" >{{memberRef.firstName}} {{memberRef.lastName}}</div>
            <div v-if="vehicles" class="mt-5">
            <v-row>
                <!--<v-btn text class="hidden">Check-in for Pull</v-btn>-->
                <v-btn text disabled>Vehicle(s)</v-btn>
                <div v-for="v in vehicles" :key="v.id">
                    <v-btn text outlined @click="vehicleDetails(v)">{{v.name}}</v-btn>
                </div>    
            </v-row>
            </div>
            </v-card-text>
        </v-card>
       
        <v-alert class="mt-2" type="error" dense text v-if="duesEndDate < today">Not currently earning points. Pay your dues to start earning!</v-alert>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {db} from '../../firebaseconfig.js'
import 'lodash'

export default {
    name: 'member',
    data() {
        return {
            memberRef: {},
            vehicles: {},
            today: new Date()
            
        }
    },
    firestore() {
        let muid = this.currentUser.uid
        console.log(muid)
        return {
            memberRef: db.collection('members').doc(muid),
            vehicles: db.collection('vehicles').where("member.userId", "==", muid)
        }
    },
    computed: {
    ...mapState(['currentUser', 'userProfile']),
    memberStartDate() {},
    duesEndDate() {
        let mR = this.memberRef
        let cD = mR.currentDues
        if (cD != null) {
            return cD.effectiveStart
        } else return false
    }     
  },
  methods: {
      vehicleDetails(v) {
        this.$router.push({
        path: `/vehicle/${v.id}`
        }) },
        memberDetails(m) {
        this.$router.push({
        path: `/member/${m.userId}`
        }) },
  }
}
</script>