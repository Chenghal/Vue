<!-- Login -->
<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form label-width="0px" :model="loginInfo" :rules="loginFormRules" ref="loginFormRef" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" v-model="loginInfo.username"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-3702mima" v-model="loginInfo.password" type="password">
                    </el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" round @click="login">登录</el-button>
                    <el-button type="info" round @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { loginApi } from '@/api/loginApi.js'
export default {
    data() {
        return {
            loginInfo: {
                username: 'admin',
                password: '123456'
            },
            loginFormRules: {
                // 验证用户名是否合法
                username: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                // 验证密码是否合法
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields()
        },
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return;
                // const { data: res } = await this.$http.post('login', this.loginInfo)
                // console.log(res)
                // if (res.meta.status !== 200) return this.$message.error('登录失败！')
                // this.$message.success('登录成功')
                // window.sessionStorage.setItem('token', res.data.token)
                // this.$router.push('/home')
                const { data: res } = await loginApi(this.loginInfo)
                if (res.meta.status !== 200) return this.$message.error('登录失败！')
                // console.log(res)
                this.$message.success('登录成功')
                // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
                //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
                //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
                window.sessionStorage.setItem('token', res.data.token)
                // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
                this.$router.push('/home')

            })
        }
    }
}



</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.avatar_box {
    height: 130px;
    width: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding-top: 10px;
    box-sizing: border-box;
    box-shadow: 0 0 10px #ddd;
}

img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-end;
}
</style>
