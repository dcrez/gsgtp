<template>
     <div id="rules">
        <div class="display-1 mt-5 mb-5 font-weight-light">Rules (2020)    
            <v-btn class="mb-3 float-right" text color="red darken-3" @click="goBack">
      <v-icon class="mr-4">fad fa-arrow-circle-left</v-icon> Go back
    </v-btn>
    </div>
    <v-slide-group
    class="pa-4"
    show-arrows>
        <v-slide-item v-slot:default="{ active, toggle }">
            <v-btn href="#el" depressed class="mx-2" :input-value="active" @click="toggle">Eligibility</v-btn>
        </v-slide-item>
        <v-slide-item>
            <v-btn href="#ev" depressed class="mx-2" :input-value="active" @click="toggle">Event Rules</v-btn>
        </v-slide-item>
        <v-slide-item>
            <v-btn href="#disq" depressed class="mx-2" :input-value="active" @click="toggle">Disqualification</v-btn>
        </v-slide-item>
        <v-slide-item>
            <v-btn href="#pen" depressed class="mx-2" :input-value="active" @click="toggle">Penalties</v-btn>
        </v-slide-item>
        <v-slide-item >
            <v-btn href="#prot" depressed class="mx-2" :input-value="active" @click="toggle">Protests</v-btn>
        </v-slide-item>
        <v-slide-item>
            <v-btn href="#genR" depressed class="mx-2" :input-value="active" @click="toggle">General Rules</v-btn>
        </v-slide-item>
    </v-slide-group>
    
    
        <eligibility id="el"/>
        <events id="ev"/>
        <dq id="disq"/>
        <penalties id="pen"/>
        <protests id="prot"/>
        <generalRules id="genR"/>

     </div>
</template>
<script>
// import rules snippets
import dq from '../components/rules/dq.vue'
import eligibility from '../components/rules/eligibility.vue'
import penalties from '../components/rules/penalties.vue'
import generalRules from '../components/rules/generalRules.vue'
import events from '../components/rules/events.vue'
import protests from '../components/rules/protests.vue'


export default {
    name: 'rules',
    data() {
        return {

        }
    },
    methods: {
        goBack() {
        this.$router.go(-1)
      }
    }
}
</script>