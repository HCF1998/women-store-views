<template>
  <div id="content-wrapper" class="personCenter-wrapper">
    <div style="width: 66%; margin: 0 auto;">
      <h3>个人中心</h3>
      <h4>亲爱的<a href="javascript:;">{{userName}}</a>，填写真实的资料，有助于好友找到你哦。</h4>
      <el-form ref="form" :model="form" label-width="120px" style="margin: 20px auto; border: 1px solid grey; padding: 40px;">
        <el-form-item label="当前头像：">
          <Upload :imageUrl="form.avatar"/>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码：">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="form.confirmPwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="生日：">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择地区：">
          <VDistpicker style="fontSize: 12px;"/>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input placeholder="小区楼栋/乡村名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-wrapper">
        <el-button type="primary">确认更改</el-button>
        <el-button type="primary">取消更改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  const Upload = () => import('@/components/Upload.vue');
  const VDistpicker = () => import('v-distpicker')
  export default {
    components: {
      Upload,
      VDistpicker
    },
    data() {
      return {
        userName: '用户1',
        form: {
          avatar: '', // 头像
          nickName: '', // 昵称
          name: '', // 真实姓名
          password: '', // 密码
          confirmPwd: '', // 确认密码
          sex: '1', // 性别
          date: '' // 生日
        },
      }
    },
    methods: {
      // 获取个人信息
      getPersonInfo() {
        
      }
    }
  }
</script>

<style lang="scss">
.personCenter-wrapper{
  h3{
    font-weight: 700;
    margin-bottom: 20px;
  }
  input{
    width: 400px;
  }
  .btn-wrapper{
    text-align: right;
    button{
      margin-left: 60px;
    }
  }
}
</style>