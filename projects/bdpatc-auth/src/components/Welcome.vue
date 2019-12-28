<template>
    <div class="welcome container">
        <h1>Welcome {{ msg }}!</h1>
    </div>
</template>

<script>
export default {
    name: 'Welcome',
    props: {
        msg: String
    }
}
</script>