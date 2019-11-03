<template>
  <div class="home">
    <el-container class="container">
      <!-- 头部 -->
      <el-header class="home-header">
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <img src="../assets/images/bg.png" alt />
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light title">后台管理系统</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple bg-btn">
              <el-button type="info" @click="goLogin" class="btn">退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="home-container">
        <!-- 左侧的 menu 菜单 -->
        <el-aside :width="iscollapse ? '65px' : '200px'">
          <!-- 折叠展开menu的bar -->
          <div class="toggleBar" @click="collapse">|||</div>
          <!-- menu 菜单 -->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            router
            :unique-opened="true"
            :collapse="iscollapse"
            :collapse-transition="false"
            active-text-color="#409EFF"
          >
            <!-- 循环创建一级菜单 -->
            <el-submenu
              :index="item.id + ''"
              v-for="(item, i) in menus"
              :key="item.id"
              :class="iscollapse ? 'el_submenu_small': 'el_submenu_large'"
            >
              <template slot="title">
                <!-- 左侧的小图标 -->
                <i :class="['iconfont', iconlist[i]]"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 循环创建 二级菜单 -->
              <el-menu-item
                :index="'/' + subitem.path"
                v-for="subitem in item.children"
                :key="subitem.id"
              >
                <i class="el-icon-menu"></i>
                {{subitem.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      menus: [],
      iscollapse: false,
      iconlist: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'],
    }
  },
  created() {
    this.getmenus()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    collapse() {
      this.iscollapse = !this.iscollapse
    },
    async getmenus() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取左侧菜单列表失败！')
      this.menus = res.data

    },
    goLogin() {
      localStorage.removeItem('token')
      this.$router.push({ name: 'login' })
    }
  },

}
</script>

<style scoped>
.container {
  height: 100%;
}
.home-header {
  margin: 0;
  padding: 0;
  background: #b3c0d1;
}
.aside {
  background: #d3dce6;
}
.main {
  background: #e9eef3;
}
.home {
  height: 100%;
}
.bg-purple img {
  display: inblock-block;
  width: 200px;
  height: 60px;
}
.el-row {
  height: 60px;
}
.title {
  line-height: 60px;
  font-weight: 500;
  font-size: 26px;
  text-align: center;
}
.bg-btn {
  line-height: 60px;
  text-align: right;
}

.toggleBar {
  color: #fff;
  font-size: 12px;
  line-height: 24px;
  background-color: #4a5064;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  user-select: none;
}

.el-aside {
  background-color: #333744;
  user-select: none;
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 8px;
}

.el_submenu_large {
  width: 200px;
}
.el_submenu_small {
  width: 65px;
}
</style>

