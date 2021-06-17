<template>
    <div>
        <v-container>
            <v-card flat>
            
            <v-card-title>
                Fees
            </v-card-title>
            <v-card-text>
                <v-row v-for="i in items" :key="i.id">
                    {{i.name}}
                    <ul>
                    <li v-for="g in i" :key="g.id">
                        
                        {{g.name}} | cost {{g.cost}} | {{g.tractors}} 
                        
                    </li>
                    </ul>
                </v-row>
                
            </v-card-text>
           
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'fees',
    data() {
        return {
            items: [
                {
                    id: 1,
                    name: 'Membership Fees',
                    types: [
                        {
                            id:1,
                            name: 'Household Membership',
                            cost: '$25',
                            tractors: 2
                        },
                        {
                            id:2,
                            name: 'Single Membership',
                            cost: '$15',
                            tractors: 1
                        },
                        {
                            id: 3,
                            name: 'Additional Tractors',
                            cost: '$5'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Hook Fees',
                    types: [
                        {
                            id: 1,
                            name: 'Member',
                            cost: '$15'
                        },
                        {
                            id:2,
                            name: 'Non-member',
                            cost: '$20'
                        }
                    ]
                }
            ]
        }
    },
    props: {feesDialog: Boolean},
    methods: {
    }
}
</script>