<template>
  <div class="leftSide">
    <div class="tab">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="tab_item">
        <router-link :to="{path:'/blog'}" class="curPoint">
          <i class="el-icon-location-outline"></i>
          <span>首页</span>
        </router-link>
      </div>
      <div class="tab_item">
        <router-link :to="{path:'/blog/catalog'}" class="curPoint">
          <i class="el-icon-folder"></i>
          <span>归档</span>
        </router-link>
      </div>
      <div class="tab_item">
        <router-link :to="{path:'/blog/resume'}" class="curPoint">
          <i class="el-icon-document"></i>
          <span>关于</span>
        </router-link>
      </div>
      <div class="tab_item">
        <div class="curPoint">
          <i class="el-icon-search"></i>
          <span>搜索</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.leftSide {
  width: 120px;
  height: 100%;
  background: #ffffff;
  position: fixed;
  top: 100px;
  left: 0;
}
.tab {
  width: 100px;
  height: 600px;
  margin: 0 auto;
}
.logo {
  width: 100%;
  height: 100px;
  text-align: center;
  margin-bottom: 40px;
}
.logo img {
  width: 80px;
  height: 80px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.tab .tab_item {
  width: 100px;
  height: 70px;
  text-align: center;
}
.tab_item span {
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.curPoint {
  position: relative;
  top: 50%;
  /* transform: translateY(-50%); */
  cursor: pointer;
  text-decoration: none;
  color: #000;
}

.curPoint:hover {
  color: #41b883;
}
</style>
