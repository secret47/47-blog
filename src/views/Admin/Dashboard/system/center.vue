<template>
  <div>
    <el-tabs :tab-position="tabPosition" class="tabs">
      <el-tab-pane label="个人信息">个人信息</el-tab-pane>
      <el-tab-pane label="基本设置">基本设置</el-tab-pane>
      <el-tab-pane label="帐号绑定">帐号绑定</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: [],
      tabPosition: "left"
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }
};
</script>
<style scoped>
.tabs {
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.el-tabs__item{
  width: 150px;
}
</style>
