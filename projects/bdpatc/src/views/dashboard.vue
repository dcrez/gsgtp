<template>
    <div class="container-fluid">
    <div class="row">
    <div class="col-12">
    <h1>Welcome to your BPDA, {{currentUser.email}}</h1>
    <p>Some paragraph text goes here</p>
    <section id="students">
    <h2>Students</h2>
      <b-nav tabs fill role="tablist">
    <b-nav-item v-b-toggle.manageprompt role="tab" active>Manage Students</b-nav-item>
    <b-nav-item v-b-toggle.addprompt role="tab">Add student</b-nav-item>
  </b-nav>
      <b-collapse id="addprompt" class="mt-2" role="tabpanel"><addStudent/></b-collapse>
      <b-collapse id="manageprompt" class="mt-2" role="tabpanel" visible>
        <div v-if="students.length">
          <div v-for="student in students" class="student">
            <h5>{{student.fullname}}</h5>
          </div>
        </div>
        <div v-else>
          <p>No students to display! Consider adding one.</p>
        </div>
        </b-collapse>
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

  export default {
    name: 'dashboard',
    firestore() {
      students: firebase.firestore().collection("students")
    },
    data () {
        return {
          userProfile: {},
          currentUser: {},
          students: {}
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