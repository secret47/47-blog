<template>
  <div>
    <div class="tabsBox">
      <div class="tabs">
        <ul class="tabItems">
          <li v-for="(item,index) in changeItems" :key="index" :class="item.class" @click="changeItem(index)">{{item.name}}</li>
        </ul>
        <div class="containers">
          <section v-if="currentTab == 0">
            <div class="userAvatar">
              <el-image :src="avatarUrl" :fit="fit" class="imgs"></el-image>
              <el-button>修改头像</el-button>
            </div>
            <div class="info">
              <el-form ref="userInfo" :model="userInfo" label-width="80px">

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
export default {
  data() {
    return {
      userInfo: [],
      avatarUrl: "",
      fit: "fill",
      radio: null,
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
      currentTab: 0
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(JSON.parse(localStorage.getItem("userInfo")));
    this.avatarUrl = JSON.parse(localStorage.getItem("userInfo")).avatarUrl;
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
      console.log(res, "上传");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  top: 50%;
  border-radius: 10px;
  transform: translateY(-50%);
}

.userAvatar .imgs:hover {
  border-radius: 0;
}

.userAvatar button {
  width: 130px;
  height: 40px;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 20px;
}
</style>
