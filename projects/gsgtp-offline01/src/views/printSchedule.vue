<template>
  <div>
    <v-toolbar-title dense class="mb-5 mt-5 display-1">GSGTP Schedule
    </v-toolbar-title>
   
      <v-list two-line>
        <v-list-item-group active-class="red--text">
          <v-list-item :key="pull.id" v-for="pull in pulls" @click="pullDetails(pull)">
            <v-list-item-content v-if="!currentDate(pull)">
              <v-list-item-title>{{pull.city}}, {{pull.state}} <span v-if="pull.title">- {{pull.title}}</span>
                <div class="overline mr-3">{{pull.date | moment("dddd, MMMM Do YYYY")}} at {{pull.time}} -
                  {{pull.date | moment("from", "now")}}</div>
              </v-list-item-title>
              <v-list-item-subtitle class="text--primary"> </v-list-item-subtitle>
              <v-list-item-subtitle v-if="pull.description">{{pull.description}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-else>
              <v-list-item-title @click="pullDetails(pull)">{{pull.city}}, {{pull.state}} <span v-if="pull.title">-
                  {{pull.title}}</span></v-list-item-title>
              <v-list-item-subtitle class="text--primary">{{pull.date | moment("dddd, MMMM Do YYYY")}} at {{pull.time}}
                | {{pull.date | moment("from", "now")}}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="pull.description">{{pull.description}}</v-list-item-subtitle>

            </v-list-item-content>
            <v-list-item-icon>

              <v-icon v-if="pull.points" color="" class="mr-3">fad fa-trophy-alt</v-icon>
              <v-icon v-if="pull.track == 'N/A'" color="gray lighten-2" class="">fas fa-do-not-enter</v-icon>
              <v-icon v-if="pull.track == 'Tar'">fas fa-road</v-icon>
              <v-icon v-if="pull.track == 'Dirt'">fas fa-digging</v-icon>

            </v-list-item-icon>



          </v-list-item>
        </v-list-item-group>
      </v-list>
   
  </div>
</template>
<script>
  import {
    db
  } from '../../firebaseconfig.js'
  

  export default {
    name: 'printSchedule',
    data() {
      return {
        pulls: {},
        now: new Date().getUTCSeconds()
      }
    },
    firestore() {
      return {
        pulls: db.collection('pulls').orderBy("date", "desc").where("year","==", "2021")
      }
    },
    methods: {
      deletePull(pull) {
        db.collection('pulls').doc(pull.id).delete();
      },
      pullDetails(pull) {
        this.$router.push({
          path: `/pull/${pull.date}/${pull.id}`
        })
      },
      currentDate(pull) {
        let current = new Date()
        return this.$moment(pull.date).isBefore(current)
      },
      /*saveAsPDF() {
        let pdfName = 'GSGTP Schedule';
        var doc = new jsPDF('p','in','letter')
        var source = document.getElementById('schedulePrint')
        console.log(source)
        doc.html(source, {
          callback: function(doc) {
            doc.save()
          }
        }) 
          }*/
      
    },
    computed: {
      futureEvents() {
        return this.pulls.filter
      }
    }
  }
</script>