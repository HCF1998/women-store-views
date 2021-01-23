<template>
  <!--登录表单的容器-->
  <div class="login_container">
    <!--登录区域-->
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../../assets/logo.png">
      </div>
      <!--表单-->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px"
               class="login_form">

        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    prefix-icon="el-icon-user-solid"/>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock"/>
        </el-form-item>

        <el-form-item prop="verifyCode">
          <div class="verify_box">
            <el-input v-model="loginForm.verifyCode"
                      prefix-icon="el-icon-mobile" class="verify_Code"/>
            <img src="../../assets/img/msFvb6.gif" class="verify_img">
          </div>
        </el-form-item>

        <el-form-item class="login_button">
          <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          verifyCode: ''
        },
        loginRules: {
          username: [
            {required: true, message: '请输入用户名称', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
          ],
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push("/main")
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_container {
    height: 100%;
    background-color: aquamarine;
  }

  .login_box {
    width: 450px;
    height: 370px;
    background-color: #ffffff;
    border-radius: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: -65px auto;
    background-color: #FFFFFF;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #3a8ee6;
    }
  }

  .login_form {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;

    .login_button {
      display: flex;
      justify-content: flex-end;
    }
  }
  .verify_box{
    display: flex;

    .verify_Code {
      width: 60%;
      justify-content: left;
    }
    .verify_img {
      width: 30%;
      height: 45px;
      justify-content: flex-end;
    }
  }

</style>
