<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="item">
          <div class="header-title">选择顶部大图（博客首页）</div>
          <el-upload class="avatar-uploader" action="http://127.0.0.1:3000/upload/imgs" :show-file-list="false" :on-success="uploadSuccess" :before-upload="beforeAvatarUpload">
            <el-image v-if="imageUrl" :src="imageUrl" class="avatar" fit="contain"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="item">
          <div class="header-title">设置网站标题</div>
          <el-input type="text" class="inputtext" v-model="webTitle"></el-input>
        </div>
        <div class="item">
          <el-button @click="saveInfo">保存设置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { setInfo } from "../../../../api/system.js";
export default {
  data() {
    return {
      value: "",
      imageUrl: "",
      webTitle: ""
    };
  },
  methods: {
    //上传成功
    uploadSuccess(res, file) {
      console.log(res, file);
      this.imageUrl = res.data;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    saveInfo() {
      let topImg = this.imageUrl;
      let title = this.webTitle;
      let data = { topImg, title };
      if (topImg == "" || title == "") {
        this.$message({
          type: "error",
          message: "内容不能为空哦~"
        });
        return;
      }
      console.log(data);
      setInfo(data).then(res => {
        this.$message({
          type: "success",
          message: "设置成功!"
        });
        //设置成功后再清空
        this.webTitle = "";
        this.imageUrl = "";
      });
    }
  }
};
</script>

<style scoped>
.item {
  margin-bottom: 20px;
}
.header-title {
  height: 50px;
  line-height: 50px;
}

.avatar-uploader {
  max-width: 300px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  height: 160px;
  position: relative;
  overflow: hidden;
  text-align:center;
}

.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 160px;
  display: block;
}
.el-upload {
  width: 100%;
}

.coverImg {
  width: 100%;
  height: 200px;
}
.inputtext{
  max-width:300px
}
</style>
