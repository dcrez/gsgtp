<template>
    <div id="dashboard">
        <section>
            <div class="container">
                <div class="profile">
                    <h5>{{ userProfile }}</h5>
                   
                    <div class="manage-students">
                        <p>Manage Students</p>
                        <form @submit.prevent>
                            <textarea></textarea>
                            <button class="button">post</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col2">
                <div>
                    <p class="no-results">There are currently no posts</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    const fb = require('../firebaseConfig.js')
    
   export default {
    data() {
        return {
            post: {
                content: ''
            }
        }
    },
    computed: {
        ...mapState(['userProfile'])
    },
    methods: {
        createPost() {
            fb.postsCollection.add({
                createdOn: new Date(),
                content: this.post.content,
                userId: this.currentUser.uid,
                userName: this.userProfile.name,
                comments: 0,
                likes: 0
            }).then(ref => {
                ref.post.content = ''
            }).catch(err => {
                console.log(err)
            })
        }   
    }
}
</script>