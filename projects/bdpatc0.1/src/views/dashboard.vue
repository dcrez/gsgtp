<template>
    <div class="container-fluid">
    <div class="row">
    <div class="col-md-10 mx-auto">
    <h1>Welcome to your BPDA, <span style="color:black;">{{userProfile.name}}</span></h1>
    <p class="">The first step to a career in STEM is knowledge. Get involved with BDPA-TC to broaden the horizons and opportunities for Twin Cities youth today! <span v-if="userProfile.parent">Classes are free for your student, all you need to do is follow the steps below!</span></p>
    <section id="students" class="" v-if="userProfile.parent">
      <div class="row">
    <div class="col-md-6">
        <i class="fad fa-user-astronaut mb-2"></i>
        <div class="h6">Add Student</div>
        <p>Create a profile for your student. You can use this profile to help register your students for classes and events.</p>
    </div>
    <div class="col-md-6">
        <i class="fad fa-chalkboard mb-2"></i>
        <div class="h6">School and Grade Level</div>
        <p>We ask for this information once a school year to determine eligibility for specific classes and programs.</p>
    </div>
    <div class="col-md-6">
        <i class="fad fa-file-signature mb-2"></i>
        <div class="h6">Sign Forms</div>
        <p>We need your permission for students to participate in our classes, and - in some cases - to travel to specific events. You'll need to do this for each student, each school year.</p>
    </div>
    <div class="col-md-6">
        <i class="fad fa-file-signature mb-2"></i>
        <div class="h6">Register for class!</div>
        <p>Some text goes here.</p>
    </div>
    </div>
      <manageStudents v-if="students.length" />
      <div v-else>
          <p class="alert alert-light">Add a student to get started.</p>
        </div>
      <b-button class="mt-3" v-b-toggle.addprompt>Add Student</b-button>
      <b-collapse id="addprompt" class="mt-2" role="tabpanel"><addStudent/></b-collapse>
    </section>
    <section class="classes mt-5" v-if="!students.classes">
      <h2>Classes and Program Registration</h2>
    </section>
    </div>
    </div>
    </div>
</template>
<script>
const fb = require('../firebaseConfig.js');
import addStudent from '../components/addStudent.vue'
import manageStudents from '../components/manageStudents.vue'
import { mapState } from 'vuex';
//import { currentUser } from '../firebaseConfig';

  export default {
    name: 'dashboard',
    data () {
        return {
         
        }
    },
    components: {
        addStudent,
        manageStudents
    },
    computed: {
        ...mapState(['currentUser', 'userProfile', 'students'])    }
  }
</script>