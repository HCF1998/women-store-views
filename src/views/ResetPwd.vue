<template>
  <div class="reset-wrapper">
    <div class="reset-wrapper-form">
      <img src="@/assets/imgs/logo.png" alt="">
      <h4>重置密码</h4>
      <p>请输入注册的手机号码或商城帐号：</p>
      <el-input placeholder="手机账号/商城账号"></el-input>
      <el-button type="primary" @click="reset" style="width: 400px;">重置密码</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.reset-wrapper{
  width: 600px;
  margin: 0 auto;
  background: #fff;
  // text-align: center;
  padding: 30px 60px;
  &-form{
    width: 400px;
    margin: 0 auto;
    img{
      width: 160px;
      text-align: center;
    }
    h4{
      margin-bottom: 20px;
      font-size: 26px;
      font-weight: 700;
      text-align: center;
    }
    p,img,button{
      margin: 20px 0;
    }
  }
}
</style>