<template>
  <el-container class="container">
    <my-side></my-side>
    <el-container>
      <my-header></my-header>
      <el-main class="mainContainer">
        <div class="headBread">
          <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path" v-if="item.meta.title">
              <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <router-view class="mainBox">
        </router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>
<script>
import myHeader from "@/layouts/Head.vue";
import mySide from "@/layouts/Side.vue";
export default {
  components: {
    myHeader,
    mySide
  },
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route(to, from) {
      this.loadBread();
    }
  },
  created() {
    this.loadBread();
  },
  methods: {
    loadBread() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0]; //第一个路由
      // console.log(first);
      if (first && first.name !== "首页") {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      }

      this.levelList = matched;
    }
  }
};
</script>
<style>
.aside {
  background: #545c64;
}
.dashboard {
  height: 100%;
}
.container {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background: transparent;
}
.mainContainer {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}
.bc {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.mainBox {
  width: 100%;
  height: calc(100% - 50px);
}
.headBread {
  height: 40px;
}
.el-breadcrumb{
  position: relative;
  top: 50%;
  transform: translateY(-50%)
}
</style>