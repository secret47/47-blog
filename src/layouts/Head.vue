<template>
  <el-header class="header">
    <div class="left">
      <i class="el-icon-s-fold folds"></i>
    </div>
    <div class="userInfo">
      <div class="headerIcons">
        <i class="el-icon-search"></i>
      </div>
      <div class="headerIcons">
        <i class="el-icon-message"></i>
      </div>
      <el-dropdown trigger="click" class="users" @command="getClick">
        <div class="el-dropdown-link userAvatar">
          <div class="items">
            <el-avatar class="avatarImg" :size="size" :src="userInfo.avatarUrl || circleUrl"></el-avatar>
          </div>
          <div class="items">
            <span class="nickname">Hi,{{ userInfo.nickname||用户 }}!</span>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      size: "medium",
      circleUrl: require("../assets/logo.png")
    };
  },
  computed: {
    ...mapState({
      userInfo: function(state) {
        return state.user.userInfo;
      }
    })
  },
  watch: {
    userInfo: function(val) {}
  },
  mounted() {},
  watch: {},
  methods: {
    getClick(item) {
      switch (item) {
        case "person":
          this.$router.push("/dashboard/system/center");
          break;
        case "setting":
          this.$router.push("/dashboard/system/setting");
          break;
        case "logout":
          this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          break;
      }
    }
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 100px !important;
  background: #ffffff;
  display: flex;
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

.left {
  width: calc(100% - 300px);
  height: 100px;
}
.left .folds {
  font-size: 30px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
