<template>
  <div>
  <v-card>
  <v-card-title>Members<v-spacer></v-spacer><v-btn to="/member/add" outlined>Add member</v-btn></v-card-title>
  <v-expansion-panels>
   <v-expansion-panel v-for="m in members" :key="m[id]">
  
    <v-expansion-panel-header>
      <v-row>
  <div style="font-size:1.15em;" class="col-11">{{m.firstName}} {{m.lastName}}</div>
  
  <div class="col-1 ml-auto">
    <div v-if="duesCurrent(m) != thisYear">
      <font-awesome-icon icon="lock" color="red"></font-awesome-icon>
    </div>
    <div v-else>
    <font-awesome-icon icon="lock-open" color="green"></font-awesome-icon>  
   
    </div>
  </div>
      </v-row>
    </v-expansion-panel-header>
   <v-expansion-panel-content>
     <v-row>
     <div class="col-10">
     <v-alert v-if="duesCurrent(m) == thisYear" type="success">Dues Paid: ${{m.currentDues.duesPaid}} on {{m.currentDues.effectiveStart}}</v-alert>
     <v-alert v-else type="error">Dues not current. Member's hooks will not count to points' totals until resolved.</v-alert>
     <strong>Address:</strong> {{m.address}}, {{m.city}} {{m.state}} {{m.zip}}<br>
     <strong>Phone: </strong> {{m.phone}} 
     <strong>Email:</strong> {{m.emailAddress}}
     <div class="mt-3">
        <v-btn
          text
          outlined
          color="green"
          @click="memberDetails(m)"
        >
        <font-awesome-icon icon="highlighter"></font-awesome-icon> Edit
        </v-btn>
        <v-btn
       text
       outlined
       color="red"
       @click="deleteMember(m)"
       >
       <font-awesome-icon icon="trash-alt"></font-awesome-icon>
        Delete</v-btn>
     </div>
     </div>
     </v-row>
   </v-expansion-panel-content>
   </v-expansion-panel>
  </v-expansion-panels>
  </v-card>
  

    
   
  

  </div>
</template>
<script>
import {db, currentUser} from '../../firebaseconfig.js'
import { mapState } from 'vuex';
export default {
  name: 'members',
  data() {
    return {
      members: {},
      search: '',
      expanded: [],
      headers: [
        {
          text: 'Member Name',
          align: 'left',
          sortable: true,
          value: 'fullName'
        },
        {
          text: 'Type',
          align: 'left',
          sortable: true,
          value: 'memberType'
        },
        {
          text: 'Dues Start',
          value: 'currentDues.effectiveStart',
          sortable: true
        },
        {
          text: 'Paid',
          value: 'currentDues.duesPaid',
          sortable: true
        },
        
        {
          text: 'Edit',
          value: 'edit',
          sortable: 'false'
        },
        {
          text: 'Delete',
          value: 'delete',
          sortable: 'false'
        }
      ]
    }
  },
  firestore() {
    return {
      members: db.collection('members').orderBy("created", "desc")
    }
  },
    methods: {
       goBack() {
        this.$router.go(-1)
      },
      deleteMember(m) {
          console.log(m.id + " will be deleted!")
           db.collection('members').doc(m.id).delete();
       },
       pullDetails (pull) {
         this.$router.push({path: `/pull/${pull.city}/${pull.id}`}) 
       },
      currentDate(pull) {
        let current = new Date()
        return this.$moment(pull.date).isBefore(current)
      },
      duesStatus(member, value) {
          db.collection('members').doc(member.id).update(
                {
                    duesPaid:value,
                    updatedBy: this.currentUser.uid,
                    updated: new Date()
                }
            )
      },
      memberDetails(m) {
        let mid = m.id
        this.$router.push({
        path: `/member/${mid}`
        }) },
                duesCurrent(m) {
          let duesDate
          let duesYear
          let currentYear
          if (m.currentDues) {
            duesDate = new Date(m.currentDues.effectiveStart)
            duesYear = duesDate.getFullYear()
          }
          
          if (duesYear>0) {
            let d = new Date();
            currentYear = d.getFullYear()
          }

          if (duesYear == currentYear) {
            return duesYear
          }
          else return 'false'
        }
    },
    computed: {
        ...mapState([currentUser]),
        thisYear(){
          let a = new Date()
          a = a.getFullYear()
          return a
        }
    },
    watch: {
        duesPaid(newValue) {
            
        }
    }
  }

</script>