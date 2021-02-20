<template>
  <div>
    <el-footer>
      <div class="footer">
          <div class="ng-promise-box">
              <div class="ng-promise">
                  <p class="text">
                      <a class="icon1" href="javascript:;">7天无理由退换货</a>
                      <a class="icon2" href="javascript:;">满99元全场免邮</a>
                      <a class="icon3" style="margin-right: 0" href="javascript:;">100%品质保证</a>
                  </p>
              </div>
          </div>
          <div class="github">
              <a href="https://github.com/root-lucas/vue-xiaomi" target="_blank">
                  <div class="github-but"></div>
              </a>
          </div>
          <div class="mod_help">
              <p>
                  <router-link to="/">首页</router-link>
                  <span>|</span>
                  <router-link :to="{name: 'GoodsList'}">全部商品</router-link>
                  <span>|</span>
                  <router-link to="/about">关于我们</router-link>
              </p>
              <p class="coty">商城版权所有 &copy; 2012-2021</p>
          </div>
      </div>
    </el-footer>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>