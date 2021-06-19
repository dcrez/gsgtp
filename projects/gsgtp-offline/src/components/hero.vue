<template>
    <div>
           <!--<v-carousel
               show-arrows
               height="300px"
               cycle
               hide-delimiters
               continuous
               >
                   <v-carousel-item 
                   v-for="(item,i) in items" 
                   :key="i" 
                   >
                   <v-img :src="item.src" height="300px" gradient="to bottom right, rgba(167,26,26,.55), rgba(244,244,244,.9)" style="object-fit:cover;"></v-img>
                   <img :src="item.src" height="auto">
                   </v-carousel-item> 
               </v-carousel>-->
           <v-card>
               <v-card-title>Welcome to GSGTP</v-card-title>
               <v-card-subtitle>Serving Minnesota and Wisconsin</v-card-subtitle>
               
               <v-card-text>
                 <p>From 2018-2019, GSGTP held <strong>24 events</strong>, had more than 130 tractors participate in 1,849 hooks. Our club specializes in a competitive motor sport called tractor pulling. All vehicles are modified garden tractors, making it a sport that is accessible to everyone.</p>
               </v-card-text>
               
              
        </v-card>
    </div>
</template>
<script>
export default {
    name: 'hero',
    data() {
        return {
            items: [
                
            ]
        }
    }
}
</script>