<template>
  <el-container class="main_container">
    <!--头部-->
    <el-header>
      <!--左边logo-->
      <div class="left_box">
        <span>Women-Store</span>
      </div>
      <!--用户选项-->
      <div class="right_box">
        <el-dropdown>
          <!--        <img src="../../assets/logo.png">-->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-house">系统首页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-ship">交流</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <!--侧边栏-->
    <el-container>
      <el-aside :width="isCollapsed?'64px':'200'">
        <!--展开和收起-->
        <div class="toggle_box" @click="toggleCollapse">
          <el-button type="success">收起</el-button>
        </div>

        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                 @close="handleClose" background-color="#001529" text-color="#fff"
                 active-text-color="#ffd04b" :collapse="isCollapsed" :default-active="activePath"
                 :collapse-transition="false" :unique-opened="true" :router="true">
          <MenuTree :menuList="this.MenuList"></MenuTree>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import MenuTree from '../../components/MenuTree';

  export default {
    name: 'AdminMain',
    data() {
      return {
        activePath:'',
      }
    },
    components:{
      MenuTree
    },
    methods:{

    }
  }
</script>

<style lang="less" scoped>
  //头部
  .el-header {
    background-color: #001529;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    color: #FFFFFf;
    align-items: center;
    font-size: 20px;
    //头部左边
    .left_box {
      display: flex;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
        margin: 0px 0px 10px 15px;
      }

      span {
        margin-left: 15px;
      }
    }

    //头部右边
    .right_box {
      .el-dropdown > img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #eeeeee;
        margin: 0px 15px 0px 0px;
        background-size: contain;
      }
    }
  }

  //内容页
  .main_container {
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
  }

  //侧边栏
  .el-aside {
    background-color: #001529;

    .el-menu {
      border-right: none;
    }

    //展开收起
    .toggle_box {
      background-color: #85ce61;
      font-size: 15px;
      font-weight: bold;
      line-height: 25px;
      color: #FFFFFF;
      letter-spacing: 0.2em;
      text-align: center;
      cursor: pointer;

    }
  }

  //下拉菜单
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

</style>
