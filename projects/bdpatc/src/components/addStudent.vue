<template class="col-12">
    <div>
    <div class="card card-body col-12">    
    <b-form @submit.prevent>
        <b-form-group id="grp-fullname" label="Full Name" label-for="fullName">
            <b-form-input id="fullname" v-model="form.fullname" type="text" required placeholder="Enter student's full name." class="form-control" />
        </b-form-group>
        <b-form-group id="grp-birthdate" label="Birth Date" label-for="birthdate">
            <b-form-input id="birthdate" v-model="form.birthdate" type="date" placeholder="(###)###-####" class="form-control" />
        </b-form-group>
        <b-form-group id="grp-phone" label="Phone" label-for="phone">
            <b-form-input id="phone" v-model="form.phone" type="tel" placeholder="(###)###-####" class="form-control" />
        </b-form-group>
        <b-form-group id="grp-email" label="Email" label-for="email">
            <b-form-input id="email" v-model="form.emailAddress" type="email" placeholder="student@email.com" class="form-control" />
        </b-form-group>
        <b-form-group id="grp-relationship" label="Relationship" label-for="relationship">
            <b-form-select id="relationship" v-model="form.relationship" class="form-control" :options="relationshipTypes"/>
            <b-form-text id="relationship-help-block">
                Only those with the legal authority to act on the student's behalf may manage their registration with BDPA-TC.
            </b-form-text>
        </b-form-group>
          <b-button block variant="primary" @click="addStudent">Add</b-button>

        
    </b-form>
    </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { currentUser } from '../firebaseConfig'
const fb = require('../firebaseConfig.js')

export default {
    name: 'addStudent',
    computed: {
        ...mapState(['currentUser'])
    },
    data() {
        return {
            form: {
                fullname: '',
                emailAddress: '',
                phone: '',
                relationship: '',
                birthdate: ''
            },
            relationshipTypes: [
                {
                    text: 'Select one',
                    value: null
                },
                'Parent',
                'Grandparent',
                'Legal Guardian',
                'Self (Emancipated Minor)'
            ]
            
        }
    },
    methods: {
        addStudent() {
            fb.studentsCollection.add({
                createdOn: new Date(),
                userId: this.currentUser.uid,
                relationship: this.form.relationship,
                fullname: this.form.fullname,
                phone: this.form.phone,
                email: this.form.emailAddress,
                birthdate: this.form.birthdate
            }).then(ref => {
                this.form.fullName = ''
                this.form.emailAddress = ''
                this.form.phone = ''
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>