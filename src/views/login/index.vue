<template>
 <div class="login" id="login-app">
   <div class="login-box">
     <img src="@/assets/login/login-bg.jpg" alt="login-bg" class="login-bg">
     <div class="login-form">
       <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
         <div class="login-form-title">
           <img src="@/assets/login/logo.png" alt="login-title" class="login-title">
         </div>
         <el-form-item class="form-item" prop="username">
           <el-input
             type="text"
             v-model="loginForm.username"
             autocomplete="off"
             placeholder="username"
             prefix-icon="el-icon-user"
             class="form-input"
           />
         </el-form-item>
         <el-form-item class="form-item" prop="password">
           <el-input
             type="password"
             v-model="loginForm.password"
             autocomplete="off"
             placeholder="password"
             prefix-icon="el-icon-lock"
             class="form-input"
             @keyup.enter.native="handleLogin"
           />
         </el-form-item>
         <el-form-item class="form-item">
           <el-button
             class="form-btn"
             :disabled="isLoading"
             :style="isLoading && { 'box-shadow': '0 0',  backgroundColor: '#edd79e!important'}"
             @click="handleLogin"
           >
             <span v-if="!isLoading">登录</span>
             <span v-else>
               <i class="el-icon-loading"></i>
               登录中...
             </span>
           </el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
 </div>
</template>

<script>
import { login } from '@/api/login.js'
import { mapMutations } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      // 表单 用户名 密码
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      isLoading: false,
      // 匹配规则
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          // 匹配密码位数 6 - 16 位
          { pattern: /^\w{6,16}$/, message: '密码位数不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['user/setUserinfo', 'user/setToken']),
    handleLogin: function () {
      this.$refs.loginForm.validate(async isOK => {
        // isOK 验证是否通过
        if (isOK) {
          this.isLoading = true
          // 获取登录信息
          const res = await login(this.loginForm)
          if (res.data.code === 1) {
            this['user/setUserinfo'](JSON.stringify(res.data.data))
            // 跳转至主页
            await this.$router.push('/')
            this.isLoading = false
          } else {
            this.$message.error(res.data.msg)
            this.isLoading = false
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login {
  position: relative;
  background: linear-gradient(-135deg, rgb(225, 142, 69) 10%, rgb(253, 234, 209) 65%);
  width: 100%;
  height: 100%;

  .login-box {
    position: absolute;
    display: flex; // 默认主轴 是 row
    top: 50%;
    left: 50%;
    width: 1000px;
    height: 450px;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    overflow: hidden;

    .login-bg {
      height: 100%;
      user-select: none;
    }

    .login-form {
      background-color: rgb(253, 234, 209);
      flex: 1;

      .login-form-title {
        display: flex;
        justify-content: center;
        margin-top: 73px;
        .login-title {
          width: 140px;
          height: 45px;
          user-select: none;
        }
      }
      .form-item {
        margin-top: 40px;
        padding: 0 50px;

        .form-btn {
          background-color: #fff;
        }
      }
    }
  }
}
/deep/ .el-input__inner {
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid rgba(63, 26, 12, .3);
  border-radius: 0;
}
/deep/ .el-button {
  width: 100%;
  border: 0;
  border-radius: 17px;
  background-color: #edd79e!important;
  color: #251c17;
  letter-spacing: 2px;
  box-shadow: 0 0;
  transition: all .2s;

  &:hover {
    background-color: rgba(237, 215, 158, .8)!important;
    box-shadow: 1px 2px #e0c79f;
    color: #251c17;
  }
}
</style>
