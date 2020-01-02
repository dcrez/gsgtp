<template class="mb-3">
    <div class="mt-3">
     <h2>Students</h2>
        <div v-for="student in students" v-bind:key="student['.key']" class="">
            <div class="student">
                <div class="row">
                    <div class="col-md-4">
                        <div class="studentName">{{student.fullname}}</div>
                        <label>Age:</label> About {{ student.birthdate | moment("from",true)}} old<br>
                    </div>
                    <div class="col-md-4 ml-auto">
                        <label>Relation: </label> {{student.relationship}}<br>
                        
                    </div>
                    <div class="col-md-4 ml-auto d-flex align-items-center">      
                        <!--<label>Attends</label> <span v-if="student.school">{{student.school}}</span><span v-else><a href="#">Add school</a></span><br>
                        <label>Grade</label> <span v-if="student.school">{{student.school}}</span><span v-else><a href="#">Add school</a></span>-->
                        <a class="btn btn-light">Update</a>

                    
                        
                    </div>
                </div>
                <section class="col-12">
<h4>Media Release Form</h4>
<h5>Context</h5>
<p>Throughout the year, the media may visit the BDPA programs to cover special events. The BDPA is a non-profit organization which may also wish to use your child's photograph, voice, likeliness or student work for promotional and educational reasons, such as in publications, posters, brochures, newsletters and videos; on websites; on local cable television channels; or at community events.</p>
<h5>Your Choice</h5>
<p>BDPA may define a student's name and photograph as "Student Information" and thus is public information. As a parent/guardian, you have the right to request that this information not be released without your prior written consent. We ask that you please sign this form whether BPDA and the media have permission to use your child's photograph, voice, likeliness or student work for promotional and education purposes, including BDPA's websites.</p>
<form class="form mt-2">
<p>I, {{userProfile.name}}, 
    <select>
        <option>give</option>
        <option>do not give</option>
    </select> my permission for {{student.fullname}} to be filmed/photographed/interviewed by the media during BDPA sessions and for BDPA to use my child's photograph/voice/likeness/work for promotional and educational purposes, including BDPA's websites.</p>
    <canvas id="signature-pad" class="signature-pad mx-auto" width=400 height=200 style="border: 1 black solid"></canvas>

  <button id="save">Save</button>
  <button id="clear">Clear</button>
</form>
</section>
            </div>
        </div>
    
    
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { currentUser, studentsCollection } from '../firebaseConfig'
const fb = require('../firebaseConfig.js')

export default {
    name: 'manageStudents',
    computed: {
        ...mapState(['currentUser', 'userProfile', 'students'])
    },
    components: {
        mediaRelease
        },
    data() {
        return {
        }
    },
    methods: {
        addSchool() {
            let StudentId = students.student.id

            fb.schoolsCollection.add({
                createdOn: new Date(),
                name: this.schoolForm.name,
                grade: this.schoolForm.grade,
                year: this.schoolForm.schoolYear,
                studentId: this.schoolForm.studentId
            }).then(doc => {
                fb.studentsCollection.doc(StudentId).update({
                    schools: [this.schoolForm]
                })
            })
        }
    }
}
</script>

<style>
i {
    font-size:3em;
    color: #0094BD;
    margin-top:0.25em;
}

.h6 {
    color:#0094BD;
    font-weight: 700;
}

.student {
    border-top-style: solid;
    border-bottom-style: solid;
    border-width: 1px;
    padding-top: .5em;
    padding-bottom: .5em;
    border-color:rgba(90, 202, 230, 0.3);
}

.studentName {
    font-size: 1.15em;
    font-weight: 700;
}
</style>