<template>
  <div class="login">
    <div class="loginBoxes">
      <div class="left">
        <img src="https://s2.ax1x.com/2019/09/17/n5utWd.png" alt="">
      </div>
      <el-form :model="form" ref="form" :rules="fromRules" label-width="80px" label-position="top" class="loginBox">
        <div class="title">杨小花的博客管理系统</div>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-link class="forget" href="/forget" target="_blank">忘记密码?</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="logBtn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
import { getRole } from "../../api/user.js";
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
      },
      fullscreenLoading: false
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", this.form)
        .then(res => {
          // const loading = this.$loading({
          //   lock: true,
          //   text: "登录中",
          //   spinner: "el-icon-loading",
          //   background: "rgba(0, 0, 0, 0.7)"
          // });
          // setTimeout(() => {
          //   loading.close();
            this.$router.push({
              path: this.redirect || "/dashboard/analysis",
              query: this.otherQuery
            });
          // }, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "http://cdn.repository.webfont.com/webfonts/nomal/91185/47102/5d808c89f629d8109cdbf86d.css";
.login {
  width: 100%;
  height: 100%;
  background: #000;
  .loginBoxes {
    width: 900px;
    height: 500px;
    background: #ffffff;
    position: relative;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    background-size: 100% 100%;
  }
}
.left {
  width: 500px;
  height: 100%;
  position: relative;
  img {
    position: absolute;
    width: 350px;
    height: 600px;
    top: -50px;
    left: 75px;
  }
}
.loginBox {
  width: 340px;
  height: 450px;
  position: relative;
  background: #ffffff;
  padding: 10px;
}
.logBtn {
  width: 100%;
}
.title {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 27px;
  color: #f0d78c;
  font-family: "BigYoungBGB21be34e408916431";
}
.forget {
  text-align: right;
  float: right;
}

// 输入框
.el-input__inner {
  border: 3px solid #f0d78c;
}

// 按钮
.el-button {
  background: transparent;
  border: 2px solid #f0d78c;
  border-radius: 0;
  color: #f0d78c;
  font-weight: 600;
  font-size: 20px;
}
</style>
