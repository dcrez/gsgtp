<template>
  <div>
    <div class="mx-auto">
    </div>
    <v-toolbar class=" mt-5" light flat>
      <v-toolbar-title>Schedule
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/print/schedule" text color="secondary lighten-3">Print</v-btn>
    </v-toolbar>
    
      <v-app-bar dense>
        <v-toolbar-title><small>Legend</small></v-toolbar-title>
        <v-btn text small disabled>
          <font-awesome-icon icon="times-circle"></font-awesome-icon>
          &nbsp; No Tractors
        </v-btn>
        <v-btn text small disabled>
          <font-awesome-icon icon="trophy"></font-awesome-icon>
          &nbsp; Points
        </v-btn>
        <v-btn text small disabled>
          <font-awesome-icon icon="road"></font-awesome-icon>
          &nbsp; Tar 
        </v-btn>
        <v-btn text small disabled>
          <font-awesome-icon icon="seedling"></font-awesome-icon>
          &nbsp; Dirt 
        </v-btn>
        
      </v-app-bar>
  

    <v-card id="currentSchedule">
      <v-card-text>
        <v-list two-line>
          <v-list-item-group active-class="red--text">
            <v-list-item :key="pull.id" v-for="pull in futureEvents" @click="pullDetails(pull)">
              <v-list-item-content v-if="!currentDate(pull)">
                <v-list-item-title>{{dateTime(pull)|moment("dddd, MMMM Do hA")}}</v-list-item-title>
                <v-list-item-subtitle>{{pull.title}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{pull.description}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text>{{dateTime(pull) | moment("from","now", true)}}</v-list-item-action-text>
                  <v-list-item-icon>
                    <font-awesome-icon v-if="pull.points" icon="trophy"></font-awesome-icon>
                    <font-awesome-icon v-if="pull.track == 'N/A'" icon="times-circle"></font-awesome-icon>
                    <font-awesome-icon v-if="pull.track == 'Tar'" icon="road"></font-awesome-icon>
                    <font-awesome-icon v-if="pull.track == 'Dirt'" icon="seedling"></font-awesome-icon>
                  </v-list-item-icon>
                </v-list-item-action>
              



            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>


    <v-card id="olderEvents" class="mt-5" v-if="pastEvents != 0">
      <v-card-text>
        <h3>Past Events</h3>
        <v-list three-line>
          <v-list-item-group active-class="red--text">
            <v-list-item :key="pull.id" v-for="pull in pastEvents" @click="pullDetails(pull)">
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
                <v-list-item-subtitle class="text--primary">{{pull.date | moment("dddd, MMMM Do YYYY")}} at
                  {{pull.time}}
                  | {{pull.date | moment("from", "now")}}</v-list-item-subtitle>
                <v-list-item-subtitle v-if="pull.description">{{pull.description}}</v-list-item-subtitle>

              </v-list-item-content>
              <v-list-item-icon>

                <font-awesome-icon v-if="pull.points" icon="trophy"></font-awesome-icon>
                <font-awesome-icon v-if="pull.track == 'N/A'" icon="times-circle"></font-awesome-icon>
                <font-awesome-icon v-if="pull.track == 'Tar'" icon="road"></font-awesome-icon>
                <font-awesome-icon v-if="pull.track == 'Dirt'" icon="seedling"></font-awesome-icon>

              </v-list-item-icon>



            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>

  </div>
</template>
<script>
  import {
    db
  } from '../../firebaseconfig.js'
  //import moment from 'moment-timezone'


  export default {
    name: 'schedule',
    data() {
      return {
        pulls: {},
        now: new Date().getUTCSeconds(),
        
        currentYear: '2021',
        previousYear: '2019'
      }
    },
    firestore() {
      let current = this.currentYear
      return {
        pulls: db.collection('pulls').orderBy("date", "asc").where('year', '==', current)
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
      dateTime(pull) {
        let t = pull.date + ' ' + pull.time
        return this.$moment(t)
      }
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
      today() {
        let a = new Date() 
        let b = new Date(a)
        let c = b.setDate(b.getDate()+1)
        let d = new Date(c)
        console.log(d)
        return d
      },
      futureEvents() {
        return this.pulls.filter(pull => new Date(pull.date) >= this.today)
      },
      pastEvents() {
        return this.pulls.filter(pull => new Date(pull.date) < this.today)
      }
    }
  }
</script>