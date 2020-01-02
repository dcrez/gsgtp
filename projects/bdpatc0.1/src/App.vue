<template>
  <div id="app" class="">
    <Header></Header>
    <router-view class=""></router-view>
    <!--<Footer></Footer>-->
  </div>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'
import addStudent from './components/addStudent'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    addStudent
  },
  data () {
    return {
      msg: 'Welcome to BDPA-TC'
    }
  },
    mounted() {
      let fontAwesomeScript = document.createElement('script')
      fontAwesomeScript.setAttribute('src', 'https://kit.fontawesome.com/cb571a3781.js')
      fontAwesomeScript.setAttribute('crossOrigin', "anonymous")
      document.head.appendChild(fontAwesomeScript)
    }
  }

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Bebas+Neue|Roboto&display=swap');

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #212529;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;

}

.bdpa-em {
  color: #0094bd;
  font-weight: 500;
}

label {
  text-transform: uppercase;
  font-size: 0.9em !important;
  font-weight: 700;
  /*color: #8989 !important;*/
}


h1,h2 {
  /*padding-top:0.2em;*/
  font-weight: normal;
  font-family: 'Bebas Neue', cursive;
  color: #0094bd;
}

h1 {
  font-size: 3.25em;
}

h2 {
  color:black;
  font-size: 2.5em;
}

h3 {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-weight: 700;
  /*font-size: 1.5em;*/
}

/*
h1 {
  font-size: 4em;
} */

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 0;
}

a {
  color: #42b983;
}

Footer {
  margin-top:3em;
}

</style>
