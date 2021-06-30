<template>
    <div>
           <v-carousel
               v-model="model"
               show-arrows
               height="150px"
               hide-delimiters
               continuous
               >
                   <v-carousel-item 
                   v-for="(item,i) in items" 
                   :key="i" 
                   transition="fade-transition"
                   >
                   <v-img :src="item.src" height="150px" gradient="to bottom right, rgba(167,26,26,.55), rgba(244,244,244,.7)" style="object-fit:cover;">
                   
                         
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-h2">
              {{item.txt}}
            </div>
          </v-row>
        </v-img>
                   </v-carousel-item> 
               </v-carousel>
           <v-card>
               
               
              
        </v-card>
    </div>
</template>
<script>
export default {
    name: 'hero',
    data() {
        return {
            model: 0,
            items: [
                {
                    src: require('./assets/jeff.jpg'),
                    alt: "Jeff Thron",
                    txt: "GSGTP"
                },
                {
                    src: require('./assets/smoking.jpg')
                },
                {
                    src: require('./assets/lineup.jpg')
                },
                {
                    src: require('./assets/tony.jpg')
                }
            ]
        }
    }
}
</script>