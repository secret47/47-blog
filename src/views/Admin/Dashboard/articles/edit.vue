<template>
  <div>
    <el-row :gutter="24" class="top">
      <el-col :span="8">
        <div class="coverImg">
          <!-- 文章封面图 -->
          <label class="name">封面图:</label>
          <el-upload class="avatar-uploader" action="http://101.37.173.223:3000/upload/imgs" :show-file-list="false" :on-success="uploadSuccess" :before-upload="beforeAvatarUpload">
            <el-image v-if="imageUrl" :src="imageUrl" class="avatar" fit="contain"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <label class="name">分类:</label>
        <el-select v-model="cid" placeholder="请选择" @change="changeCat($event)">
          <el-option v-for="item in options" :key="item.id" :label="item.cname" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <label class="name">标题:</label>
        <el-input placeholder="输入标题" v-model="title" maxlength="50" show-word-limit></el-input>
        <label class="name">摘要:</label>
        <el-input placeholder="输入摘要" v-model="desc" type="textarea" :rows="3" maxlength="140" show-word-limit></el-input>
        <label class="name">标签:</label>
        <!-- <el-input placeholder="输入标签" v-model="tags" ></el-input> -->
        <div class="tagsBox">
          <el-tag :key="tag" v-for="tag in tags" closable :disable-transitions="false" @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <!-- <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"> @blur="handleInputConfirm" 
          </el-input> -->
          <el-autocomplete class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="$event.target.blur" :fetch-suggestions="querySearch" :trigger-on-focus="false" @blur="getInputData" @select="handleSelect">
          </el-autocomplete>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">新建标签</el-button>
        </div>

        <!-- <p class="notice">使用逗号(,)分隔，每个标签不可超过4个字，可不填</p> -->
      </el-col>
    </el-row>
    <div class="editorBox">
      <!-- <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"></quill-editor> -->
      <mavon-editor ref="md" v-model="content" @imgAdd="imgAdd" @imgDel="imgDel" />
    </div>
    <div class="but">
      <el-button>保存草稿</el-button>
      <el-button @click="save">发布</el-button>
    </div>
    <el-dialog title="提示" center :visible.sync="saveDialog" width="30%" :before-close="handleClosed">
      <div>
        <h1>保存成功！</h1>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCatalogs,
  createArticle,
  getArticle,
  newTags,
  getTags,
  addImg
} from "../../../../api/articles.js";

export default {
  data() {
    return {
      content: "",
      editorOption: {
        // something config
      },
      options: [],
      value: "",
      title: "",
      cid: "",
      dynamicTags: [],
      inputVisible: false, //展示输入新标签的输入框
      saveDialog: false,
      imageUrl: "", //封面图地址
      desc: "", //描述摘要
      tags: [],
      inputVisible: false,
      inputValue: "",
      allTags: []
    };
  },
  created() {},
  mounted() {
    let query = this.$route.query;
    let aid = query.aid;
    if (aid) {
      this.getArticles(aid);
      this.currentId = aid;
    }
    this.getCatalogs();
    this.getTag();
  },
  methods: {
    getInputData() {
      setTimeout(() => {
        let input = this.inputValue;
        console.log("得到数据", this.inputValue);
        if (input) {
          this.tags.push(input);
          // console.log("创建标签成功", inputValue);
          let data = {
            name: input
          };
          let allTags = this.allTags;
          let isArray = this.isArray(allTags, input);
          console.log(isArray, "存在");
          if (!isArray) {
            //新建标签的方法;
            newTags(data).then(res => {
              console.log(res);
            });
          }
        }
        this.inputVisible = false;
        this.inputValue = "";
      }, 200);
    },
    //判断当前库里有没有这个标签
    isArray(array, item) {
      let isBoolean = false;
      array.forEach(e => {
        if (e.name == item) {
          isBoolean = true;
        }
      });

      return isBoolean;
    },
    handleSelect(item) {
      console.log(item, "选中");
      this.inputValue = item.name;
    },
    querySearch(queryString, cb) {
      var allTags = this.allTags;
      var results = queryString
        ? allTags.filter(this.createFilter(queryString))
        : allTags;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return allTags => {
        return (
          allTags.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //得到所有标签
    getTag() {
      getTags()
        .then(res => {
          let data = res.data;
          data.forEach(element => {
            element.value = element.name;
          });
          this.allTags = res.data;
        })
        .catch(err => {});
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue);
        // console.log("创建标签成功", inputValue);
        let data = {
          name: inputValue
        };
        let allTags = this.allTags;
        console.log(allTags);
        allTags.forEach(item => {
          console.log();
          let name = item.name;
          if (name === inputValue) {
            console.log(name === inputValue);
            return;
          } else {
            //新建标签的方法;
            // newTags(data).then(res => {
            //   console.log(res);
            // });
            console.log("创建成功", item);
          }
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    //得到文章  在编辑的时候，就是已经保存了的文章
    getArticles(aid) {
      getArticle(aid)
        .then(res => {
          console.log(res);
          let data = res.data;
          this.title = data.title;
          this.value = data.cid;
          this.content = data.content;
          this.desc = data.description;
          this.coverImg = data.coverImg;
          let tagsData = data.tags;
          let tasg = tagsData.split(",");
          this.tags = tasg;
        })
        .catch(err => {});
    },

    //得到分类
    getCatalogs() {
      getCatalogs()
        .then(res => {
          let data = res.data;
          this.options = data;
          this.cid = data[0].id;
        })
        .catch(err => {});
    },
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorReady(editor) {},
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html;
    },
    changeCat(event) {
      console.log("?", event);
    },
    //保存文章
    save: function() {
      let title = this.title; //标题
      let cid = this.cid; //分类
      let content = this.content; //内容
      let desc = this.desc;
      let uid = localStorage.getItem("uid");
      let coverImg = this.coverImg;
      let tags = this.tags; //标签
      tags = tags.toString();
      let data = { title, cid, uid, desc, coverImg, tags, content };
      if (title == "") {
        this.$alert("标题不能为空", "提示", {
          confirmButtonText: "确定",
          center: true
        });
        return;
      }
      if (cid == "") {
        this.$alert("必须要选择分类", "提示", {
          confirmButtonText: "确定",
          center: true
        });
        return;
      }
      console.log(data, "获取的数据");
      let aid = this.currentId;
      console.log(aid);
      if (aid) {
        let data = { title, cid, uid, desc, coverImg, tags, content, aid };
      } else {
        createArticle(data)
          .then(res => {
            console.log(res);
            if (res.code == "200") {
              this.$alert("文章创建成功", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  this.value = "";
                  this.content = "";
                  this.coverImg = "";
                  this.desc = "";
                  this.title = "";
                  this.tags = [];
                }
              });
            }
          })
          .catch(err => {});
      }

      // this.saveDialog = true
    },
    //这是保存成功的那个框框的关闭
    handleClosed(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
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
    //上传图片，md编辑器里面的
    imgAdd(pos, file) {
      var formdata = new FormData();
      formdata.append("file", file);
      // console.log(formdata);
      addImg(formdata)
        .then(res => {
          console.log(res);
          if (res.code == "200") {
            let imgUrl = res.data;
            this.$refs.md.$img2Url(pos, imgUrl);
          }
        })
        .catch(err => {});
    },
    imgDel(pos) {
      delete this.img_file[pos];
    }
  }
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 300px;
}
.mainContainer {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.mainBox {
  width: 100%;
  min-height: calc(100% - 50px);
}
.title {
  width: 100%;
  height: 50px;
  display: flex;
}
.catalog {
  width: 100%;
  height: 50px;
  display: flex;
}
.name {
  height: 40px;
  line-height: 40px;
  display: block;
  font-size: 14px;
}
.editorBox {
  width: 100%;
  min-height: 300px;
}
.but {
  width: 100%;
  height: 80px;
  text-align: right;
}
.but button {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.quill-editor {
  height: 100%;
}
.ql-container {
  height: calc(100% - 70px);
}
.imgs {
  width: 100%;
  height: 100%;
}
.avatar-uploader {
  max-width: 300px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  height: 160px;
  position: relative;
  overflow: hidden;
  text-align: center;
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
.notice {
  font-size: 12px;
  color: #888;
}

/* //标签 */

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.tagsBox {
  height: 40px;
}
</style>
