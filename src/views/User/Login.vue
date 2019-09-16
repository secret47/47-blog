<template>
  <div class="login">
    <el-form :model="form" ref="form" :rules="fromRules" label-width="80px" label-position="top" class="loginBox">
      <div class="title">登录</div>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password placeholder="请输入密码">
        </el-input>
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
      }
    };
  },
  methods: {
    login() {
      console.log(this.form);
      this.$store
        .dispatch("user/login", this.form)
        .then(res => {
          this.$router.push({
            path: this.redirect || "/dashboard/analysis",
            query: this.otherQuery
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: #ecf4f3;
  margin: 0 auto;
}
.loginBox {
  width: 340px;
  height: 450px;
  margin: 0 auto;
  position: relative;
  background: #ffffff;
  padding: 10px;
  top: 50%;
  border-radius: 10px;
  transform: translateY(-50%);
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
