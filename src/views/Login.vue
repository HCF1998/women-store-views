<template>
  <div class="background-wrapper">
    <div class="login-wrapper">
      <h3>登 录</h3>
      <!-- 账号密码模块 -->
      <div class="login-wrapper-account" v-show="showModel === 'account'">
        <el-input v-model="account" placeholder="请输入账号" style="margin: 20px 0"></el-input>
        <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
      </div>
      <!-- 短信验证码模块 -->
      <div class="login-wrapper-account" v-show="showModel === 'message'">
        <el-input placeholder="手机号码" v-model="phoneNumber" style="margin: 20px 0" :autofocus="autofocus">
          <template slot="prepend">+86</template>
        </el-input>
        <el-input placeholder="短信验证码" v-model="verificationCode" maxlength="6">
          <el-button slot="append" style="cursor: pointer" v-if="verificationCodeText"
            @click="getVerificationCode">
            获取验证码
          </el-button>
          <el-button slot="append" style="cursor: pointer" v-if="!verificationCodeText">
            重新获取({{count}})
          </el-button>
        </el-input>
        <p v-show="autofocus" class="login-wrapper-account-warning"><i class="el-icon-warning"></i>手机号格式不正确</p>
      </div>
      <!-- 登录按钮和切换按钮 -->
      <el-button type="primary" style="margin: 20px 0; width: 80%;" @click="login">登录</el-button>
      <el-link type="primary" @click="onShowModel" style="marginBottom: 20px;">{{showModelText}}</el-link>
      <div>
        <el-link type="primary" @click="register">立即注册</el-link>
        <el-link type="primary" style="margin: 0 5px;">|</el-link>
        <el-link type="primary" @click="forgotPwd">忘记密码</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import apiData from '@/lib/apiData';
import {mapMutations} from 'vuex';
  export default {
    data() {
      return {
        showModel: 'account', // 展示模块
        showModelText: '手机短信登录/注册',
        account: '15622091887', // 账号
        password: '7258AECBBE28EA7D4E4A46C1AF2087CC', // 密码
        phoneNumber: '', // 手机号
        verificationCode: '', // 验证码
        autofocus: false, // 聚焦
        verificationCodeText: true, // 获取验证码 || 重新获取（60）
        count: '', // 倒计时计数
        timer: null, // 倒计时定时器
      }
    },
    methods: {
      ...mapMutations(['setToken']),
      // 切换账号登录和短信登录
      onShowModel() {
        this.showModel = this.showModel === 'account' ? 'message' : 'account';
        this.showModelText = this.showModel === 'account' ? '手机短信登录/注册' : '用户名密码登录';
      },
      // 获取短信验证码接口
      getVerificationCode() {
        // console.log(this.phoneNumber);
        // 验证手机号码
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if(this.phoneNumber.match(reg)) {
          console.log('验证成功');
          this.autofocus = false;
          this.countdown();
          // 调接口
        } else {
          console.log('验证失败');
          // 聚焦
          this.autofocus = true;
        }
      },
      // 倒计时函数
      countdown() {
        const TIME_COUNT = 60; // 倒计时60s，可从后端接收数据，
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.verificationCodeText = false;
          this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            } else {
            this.verificationCodeText = true;
            clearInterval(this.timer);
            this.timer = null;
            }
          }, 1000)
          }
      },
      // 登录
      login() {
        let data = {
          loginName: this.account,
          passwordMd5: this.password
        }
        this.$axios.post(apiData.login,data).then(res => {
          if(res.resultCode == 200) {
            }
            localStorage.setItem('token', res.data.data);
            setTimeout(() => {
              this.getUserInfo();
            }, 2000)
            this.$router.push({name: 'Home'});
          this.notifySucceed(res.message);
        })
      },
      getUserInfo() {
        this.$axios.get(apiData.getUserInfo).then(res => {
          console.log(res)
        })
      },
      // 立即注册
      register() {
        // 前往注册页
        this.$router.push({name: 'Register'});
      },
      // 忘记密码
      forgotPwd() {
        this.$router.push({name: 'Reset'});
      }
    }
  }
</script>

<style lang="scss" scoped>
.background-wrapper{
  width: 100%;
  height: calc(100vh - 100px);
  background: url('https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/72644d9b8031286de3cc74e151aefd90.jpg') center no-repeat;
  background-size: cover;
  position: relative;
  h3{
    text-align: center;
    margin-top: 40px;
  }
  .login-wrapper{
    background: #fff;
    width: 410px;
    position: absolute;
    right: 8%;
    top: 10%;
    height: 480px;
    text-align: center;
    &-account{
      width: 80%;
      margin: 0 auto;
      &-warning{
        text-align: left;
        font-size: 12px;
        color: #409eff;
      }
    }
  }
}
</style>