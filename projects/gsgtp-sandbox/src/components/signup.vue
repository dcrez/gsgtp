// signup.vue

<template>
<div class="container">
    <div class="card">
    <div class="sign-up card-body">
        <h1>Sign Up</h1>
        <p>Create a new account.</p>
        <input type="text" class="form-control" v-model="email" placeholder="Email address, like bob@gsgtp.com"><br>
        <input type="password" class="form-control" v-model="password" placeholder="Interesting and memorable password"><br>
        <button class="btn btn-light">Sign up!</button>
    </div></div></div>
</template>

<script>

import { db } from '../config/db';

export default {
    name: 'signup',
    data: function() {return {email: '', password:''}},
    methods: {
    /*    signUp: function() {
            db.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                function (user) {
                    alert ("Your account has been created!")
                },
                function (err) {
                    alert ("Oops!" + err.message)
                }
            );
        }*/
    }
}
</script>
