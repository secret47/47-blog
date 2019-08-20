<template>
  <el-header class="header">
    <div class="userInfo">
      <div class="headerIcons">
        <i class="el-icon-search"></i>
      </div>
      <div class="headerIcons">
        <i class="el-icon-message"></i>
      </div>
      <el-dropdown trigger="click" class="users">
        <div class="el-dropdown-link userAvatar">
          <div class="items">
            <el-avatar
              class="avatarImg"
              :size="size"
              :src="userInfo.avatarUrl || circleUrl"
            ></el-avatar>
          </div>
          <div class="items">
            <span class="nickname">Hi,{{ userInfo.nickname }}!</span>
          </div>
          <div class="item headerIcons">
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="person">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">系统设置</el-dropdown-item>
          <el-dropdown-item command="logout"> 退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
export default {
  data() {
    let userInfo = localStorage.getItem("userInfo");
    console.log(userInfo);
    userInfo = JSON.parse(userInfo);
    return {
      userInfo,
      size: "medium",
      circleUrl: require("../assets/logo.png")
    };
  },
  mounted() {},
  watch: {},
  methods: {}
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 100px !important;
  background: #ffffff;
}
.userInfo {
  width: 300px;
  float: right;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  height: 50px;
}

.headerIcons {
  width: 50px;
  text-align: center;
  line-height: 50px;
}
.avatarImg {
  width: 30px;
  height: 30px;
  margin-top: 10px;
}
.nickname {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 70px;
  text-align: center;
}
.users {
  width: 130px;
  cursor: pointer;
}
.userAvatar {
  display: flex;
}
</style>
