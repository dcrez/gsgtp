<template>
<div>
    <h1>Update School</h1>
     <div class="form-group">
                            <label class="">School name</label>
                            <input type="text" v-model="schoolForm.name" class="form-control" placeholder="Enter school name.">
                            </div>
                            <div class="form-group">
                            <label>Current Grade</label>
                            <input type="text" v-model="schoolForm.grade" class="form-control" placeholder="Select a grade.">
                            </div>
                            <div class="form-group">
                            <label>Current School Year</label>
                            <input type="text" v-model="schoolForm.schoolYear" class="form-control" placeholder="Enter school year.">
                            </div>
                            <input hidden :value="student.id">
</div>
</template>

