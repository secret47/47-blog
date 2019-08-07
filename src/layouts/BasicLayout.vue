<template>
  <el-container class="container">
    <my-side></my-side>
    <el-container>
      <my-header></my-header>
      <el-main class="mainContainer">

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

    };
  },
  watch: {

  },
  created() {

  },
  methods: {
   
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
</style>