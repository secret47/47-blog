<template>
  <div>
    <div class="tabsBox">
      <div class="tabs">
        <ul class="tabItems">
          <li v-for="(item,index) in changeItems" :key="index" :class="item.class" @click="changeItem(index)">{{item.name}}</li>
        </ul>
        <div class="containers">
          <section v-if="currentTab == 0">
            <div class="info">
              <el-form label-position="left" label-width="80px" :model="userInfo" v-if="userInfo">
                <el-form-item class="userAvatar">
                  <el-image :src="userInfo.avatarUrl ||avatarUrl" :fit="fit" class="imgs"></el-image>
                  <el-upload class="avatar-uploader" action="http://127.0.0.1:3000/upload/imgs" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <el-button type="primary">修改头像</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="名称">
                  <el-input v-model="userInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="userInfo.gender" @change="changeGender">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                    <el-radio :label="2">保密</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                  <el-input v-model="userInfo.age"></el-input>
                </el-form-item>
                <el-form-item label="生日">
                  <el-date-picker v-model="userInfo.birthday" type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" row=3 v-model="userInfo.description"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveInfo">保存更新</el-button>
                </el-form-item>
              </el-form>
            </div>
          </section>
          <section v-else-if="currentTab == 1">更多资料</section>
          <section v-else>个人简介</section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      fit: "fill",
      changeItems: [
        {
          id: 0,
          name: "基本信息",
          class: "active"
        },
        {
          id: 1,
          name: "更多资料",
          class: ""
        },
        {
          id: 2,
          name: "个人简介",
          class: ""
        }
      ],
      avatarUrl: require("../../../../assets/logo.png"),
      currentTab: 0,
      userInfo: {}
    };
  },
  watch: {},
  computed: {},
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo = userInfo;
  },
  methods: {
    //切换tab
    changeItem(num) {
      let changeItems = this.changeItems;
      changeItems.forEach(item => {
        if (item.id == num) {
          item.class = "active";
          this.currentTab = item.id;
        } else {
          item.class = "";
        }
      });
      this.changeItems = changeItems;
    },
    handleAvatarSuccess(res, file) {
      let userInfo = this.userInfo;
      userInfo.avatarUrl = res.data;
      console.log(res);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    changeGender(e) {
      console.log(e);
      let userInfo = this.userInfo;
      userInfo.gender = e;
    },
    saveInfo() {
      let userInfo = this.userInfo;
      console.log(userInfo);
    }
  }
};
</script>
<style scoped>
.tabsBox {
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.tabs {
  width: 95%;
  height: 95%;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
}
.tabItems {
  width: 150px;
  list-style: none;
  padding: 0;
  font-size: 14px;
  background: #dedede;
}
.tabItems li {
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 150px;
  cursor: pointer;
}

.active {
  background: #e6f7ff;
  border-right: 5px solid #1890ff;
}
.containers {
  width: calc(100% - 200px);
  height: 100%;
  /* background: pink; */
  margin-left: 20px;
  overflow: auto;
}
/* 
  个人资料
 */
.userAvatar {
  width: 400px;
  height: 150px;
  display: flex;
}
.userAvatar .imgs {
  width: 130px;
  height: 130px;
  position: relative;
  border-radius: 10px;
}

.userAvatar .imgs:hover {
  border-radius: 0;
}

.userAvatar button {
  width: 130px;
  height: 40px;
  text-align: center;
  margin-left: 20px;
}
.info {
  width: 350px;
}
.el-upload{
  width: 100%;
  height: 100%;
}
.avatar-uploader {
  float: right;
  height: 100%;
}
</style>
