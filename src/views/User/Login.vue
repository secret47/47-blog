<template>
  <div class="login">
    <el-form :model="form" ref="form" :rules="fromRules" label-width="80px" label-position="top" class="loginBox">
      <div class="title">登录</div>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password placeholder="请输入密码"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-link class="forget" href="#" target="_blank">忘记密码?</el-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="logBtn" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "yang47",
        password: "123456"
      },
      fromRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 18,
            message: "长度在3到18个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      let user = this.form;
      this.$store
        .dispatch("Login", this.form)
        .then(res => {
          console.log(res);
          let data = res.data;
          this.getUserInfo(data.uid);
          this.$router.push({
            path: this.redirect || "/dashboard/analysis"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到用户资料
    getUserInfo(uid) {
      this.$store
        .dispatch("GetUserInfo", uid)
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scope>
#app {
  background: linear-gradient(to right, #c9f4fd, #f7e0ce);
}
.login {
  width: 400px;
  height: 500px;
  background: #ffffff;
  margin: 0 auto;
  border-radius: 10px;
}
.loginBox {
  width: 320px;
  height: 400px;
  margin: 0 auto;
}
.logBtn {
  width: 100%;
}
.title {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 40px;
}
.forget {
  text-align: right;
  float: right;
}
</style>
