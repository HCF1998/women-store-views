<template>
  <div class="register-wrapper">
    <div class="register-wrapper-form">
      <img src="@/assets/imgs/logo.png" alt="">
      <h4>注册女人商城账号</h4>
      <p>国家/地区</p>
      <el-select v-model="selectedOption" placeholder="请选择" style="width: 400px;" filterable>
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-option-group>
      </el-select>
      <p>成功注册帐号后，国家/地区将不能被修改</p>
      <p>手机号码</p>
      <el-input placeholder="手机号码" v-model="phoneNumber" style="marginBottom: 20px;">
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
      <el-button type="primary" @click="Register" style="width: 400px;">立即注册</el-button>
    </div>
  </div>
</template>

<script>
import apiData from '@/lib/apiData';
import options from '@/lib/countryAndArea.json'
export default {
    name: 'MyRegister',
    props: ['register'],
    data() {
        // 用户名的校验方法
        let validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入用户名'))
            }
            // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
            const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
            if (userNameRule.test(value)) {
                //判断数据库中是否已经存在该用户名
                this.$axios
                    .post('/api/users/findUserName', {
                        userName: this.RegisterUser.name,
                    })
                    .then((res) => {
                        // “001”代表用户名不存在，可以注册
                        if (res.data.code == '001') {
                            this.$refs.ruleForm.validateField('checkPass')
                            return callback()
                        } else {
                            return callback(new Error(res.data.msg))
                        }
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            } else {
                return callback(new Error('字母开头,长度5-16之间,允许字母数字下划线'))
            }
        }
        // 密码的校验方法
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请输入密码'))
            }
            // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
            const passwordRule = /^[a-zA-Z]\w{5,17}$/
            if (passwordRule.test(value)) {
                this.$refs.ruleForm.validateField('checkPass')
                return callback()
            } else {
                return callback(new Error('字母开头,长度6-18之间,允许字母数字和下划线'))
            }
        }
        // 确认密码的校验方法
        let validateConfirmPass = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请输入确认密码'))
            }
            // 校验是否以密码一致
            if (this.RegisterUser.pass != '' && value === this.RegisterUser.pass) {
                this.$refs.ruleForm.validateField('checkPass')
                return callback()
            } else {
                return callback(new Error('两次输入的密码不一致'))
            }
        }
        return {
            isRegister: true, // 控制注册组件是否显示
            RegisterUser: {
                name: '',
                pass: '',
                confirmPass: '',
            },
            // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
            rules: {
                name: [{ validator: validateName, trigger: 'blur' }],
                pass: [{ validator: validatePass, trigger: 'blur' }],
                confirmPass: [{ validator: validateConfirmPass, trigger: 'blur' }],
            },
            options,    //国家和地区列表
            selectedOption: 'China', // 被选中国家或地区（默认中国）
            phoneNumber: '',  // 注册的手机号
            autofocus: false,
            verificationCode: '', // 验证码
            verificationCodeText: true, // 获取验证码 || 重新获取（60）
            count: '', // 倒计时计数
            timer: null, // 倒计时定时器
        }
    },
    watch: {
        // 监听父组件传过来的register变量，设置this.isRegister的值
        register: function(val) {
            if (val) {
                this.isRegister = val
            }
        },
        // 监听this.isRegister变量的值，更新父组件register变量的值
        isRegister: function(val) {
            if (!val) {
                this.$refs['ruleForm'].resetFields()
                this.$emit('fromChild', val)
            }
        },
    },
    methods: {
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
        Register() {
            // 通过element自定义表单校验规则，校验用户输入的用户信息
            // this.$refs['ruleForm'].validate((valid) => {
                //如果通过校验开始注册
                // if (valid) {
                    this.$http
                        .post(apiData.register, {
                            loginName: this.phoneNumber,
                            password: this.verificationCode,
                        })
                        .then((res) => {
                           console.log(res)
                        })
                        .catch((err) => {
                            return Promise.reject(err)
                        })
                // } else {
                //     return false
                // }
            // })
        },
    },
}
</script>

<style lang="scss" scoped>
.register-wrapper{
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
    p,img{
      margin: 20px 0;
    }
  }
}
</style>
