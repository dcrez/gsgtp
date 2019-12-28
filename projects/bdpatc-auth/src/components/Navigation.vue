<template>
    <header>
             <section>
            <b-nav fill justified>
    <b-nav-item to="/dashboard">Dashboard</b-nav-item>
    <b-nav-item @click="logout">Log Out</b-nav-item>
  </b-nav>
                
        </section>
    </header>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
    name: 'Navigation',
    methods: {
        logout() {
            fb.auth.signOut().then(() => {
                this.$store.dispatch('clearData')
                this.$router.push('/login')
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang=scss>

</style>