<template>
    <div>
        <h1>Update student information</h1>
        
    </div>
</template>
<script>
import updateSchool from '../components/updateSchool'

export default {
    name: 'updateStudent',
    components: {
        updateSchool
    },
    props: {
        userId: { type: String, required: true},
        studentId: {type: String, required: true}
    }
}
</script>