<!-- Home -->
<template>
    <div class="">
        <h1>home组件</h1>
        <el-button type="info" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style  scoped>
div {
    background-color: antiquewhite;
}
</style>
