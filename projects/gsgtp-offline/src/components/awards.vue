<template>
    <div>
        <v-container>
            <v-card flat>
            
            <v-card-title>
                Awards
            </v-card-title>
            <v-card-text>
            <p>GSGTP recognizes pullers (members and non-members alike) by offering awards to winners in each class. Monetary awards will be the same for all classes, *contingency winnings will be awarded at the banquet.</p>
<v-row>
<v-col sm="12" md="6">
<ul>
    <li>1st place: $35</li>
    <li>2nd place: $25</li>
    <li>3rd place: $15</li>
    
</ul>
</v-col>
</v-row>
<p>*Points Contingency based on 75% net profit minus estimated startup cost for the next season. Contingency money for paid members receiving points for current season. Off the lawn is excluded from contingency payouts. Contingency payouts will be based on the number of hook points for the current season and checks will be handed out at the season’s awards banquet.</p>
            </v-card-text>
           
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'awards',
    props: {awardsDialog: Boolean},
    methods: {
    }
}
</script>