<template>
    <div class="login d-flex align-items-center justify-content-center" style="margin-top:70px;">
        <div class="card w-50">
        <div class="card-body">
        <h3>Sign In</h3>
        <input type="email" placeholder="bob@email.com" class="form-control" v-model="email"><br>
        <input type="password" placeholder="Password" class="form-control" v-model="password"><br>
        <button v-on:click="login">Connection</button>
        <p>Don't have an account? <router-link to="/signup"> Create one.</router-link></p>
    </div></div></div>
</template>

<script>
import {db} from '../config/db'

export default {
    name: 'login',
    data: function() {
        return {email:'', password:''}
    },
    methods: {
        login: function() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).them(
                function(user) {
                    alert('Well done! You are now connected.')
                    this.$router.replace('/schedule')
                },
                function(err) {
                    alert('Oops' + err.message)
                }
            )
            
        }
    }
}
</script>

<style scoped>
</style>

