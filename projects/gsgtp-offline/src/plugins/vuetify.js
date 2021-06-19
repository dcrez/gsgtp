import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#990000',
            secondary: '#666666',
            accent: '#8c9eff',
            error: '#FF0000',
          },
        },
      }
});

