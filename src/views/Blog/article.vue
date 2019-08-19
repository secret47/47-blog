<template>
  <div class="main">
    <blog-side></blog-side>
    <div class="mainContain">
      <div class="articleInfo">
        <div class="blogtitle">
          {{articles.title}}
        </div>
        <div class="blogtime">
          <i class="el-icon-date icon"></i>{{articles.createDate}}
        </div>
        <div class="saveContent">
          <div>注意：本文为杨小花原创，转载记得联系我哦~</div>
        </div>
        <div class="coverImg" v-if="articles.coverImg">
          <img :src="articles.coverImg" alt="">
        </div>
        <div class="blogcontainer" v-html="articles.content">
        </div>

        <div class="nextPre">
          <div class="pre">
            <p>上一篇:</p>
            <p v-if="preNoData" class="noData">{{preData.message}}</p>
            <router-link :to="{path:'/blog/article',query:{aid:preData.aid}}" v-else>{{preData.title}}</router-link>
          </div>
          <div class="next">
            <p>下一篇:</p>
            <p v-if="nextNoData" class="noData">{{nextData.message}}</p>
            <router-link :to="{path:'/blog/article',query:{aid:nextData.aid}}" v-else>{{nextData.title}}</router-link>
          </div>
        </div>
      </div>
      <div class="comment">
        <p>{{remarkTotal}}条评论</p>
        <el-divider></el-divider>
        <div class="input_Box">
          <el-input type="textarea" v-model="commentValue" rows=5 placeholder="给我一个评论，还你一个么么哒(๑•̀ㅂ•́)و✧" @blur="getBlur" @focus="getFocus">
          </el-input>
          <div class="user com_item" v-show="showConfirm">
            <span>用户名：</span>
            <el-input type="text" v-model="commentUser" placeholder="你叫什么呀">
            </el-input>
          </div>
          <div class="concact com_item" v-show="showConfirm">
            <span>联系方式：</span>
            <el-input type="text" v-model="commentConcat" placeholder="可以给一个联系方式哦">
            </el-input>
          </div>
          <div class="btns com_item" v-show="showConfirm">
            <el-button size="mini" type="primary" @click="postComment">提交</el-button>
          </div>
        </div>
        <el-divider v-if="remarkTotal!=0"></el-divider>
        <div class="remarkBox">
          <div class="remarkItem" v-for="(item,index) in remarkData" :key="index">
            <div class="first">
              <span class="name">{{item.nickname}}</span>
              <span class="date"> 发表于{{item.createDate}}</span>
            </div>
            <div class="remarkCon">{{item.container}}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  getArticle,
  getPre,
  getNext,
  referRemark,
  getRemark
} from "../../api/blog.js";
import moment from "moment";
import blogSide from "../../components/blogSide";

import marked from "marked";
import hljs from "highlight.js";

import "highlight.js/styles/monokai-sublime.css";

export default {
  components: {
    blogSide
  },
  data() {
    return {
      articles: {},
      defaultImg: require("../../assets/default.jpg"),
      preData: {},
      nextData: {},
      preNoData: false,
      nextNoData: false,
      currentId: 0,
      commentValue: "",
      commentUser: "",
      commentConcat: "",
      showConfirm: false,
      remarkData: [],
      remarkTotal: 0
    };
  },
  watch: {
    $route: function(newV, oldV) {
      let aid = newV.query.aid;
      this.currentId = aid;
      this.getDetail(aid);
    }
  },
  created() {},
  mounted() {
    let aid = this.$route.query.aid;
    this.currentId = aid;
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });

    this.getDetail(aid);
  },
  methods: {
    getDetail(aid) {
      getArticle(aid)
        .then(res => {
          let data = res.data;
          data.createDate = moment(data.createDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          let content = data.content;
          data.content = marked(content);
          this.articles = data;

          document.title = data.title + "|你好，我是杨小花";

          this.showDetail = true;

          this.getPreAndNext(aid);
          this.getRemarks(aid);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到上下页
    getPreAndNext(aid) {
      getPre(aid)
        .then(res => {
          if (res.code == "ok") {
            this.preNoData = false;
          }
          this.preData = res.data;
        })
        .catch(err => {
          if (err.code == "failed") {
            this.preNoData = true;
          }
          this.preData = err;
        });
      getNext(aid)
        .then(res => {
          if (res.code == "ok") {
            this.nextNoData = false;
          }
          this.nextData = res.data;
        })
        .catch(err => {
          if (err.code == "failed") {
            this.nextNoData = true;
          }
          this.nextData = err;
        });
    },
    getRemarks(aid) {
      getRemark(aid)
        .then(res => {
          console.log("....", res);
          let remarkData = res.data;
          console.log(remarkData);
          remarkData.forEach(item => {
            item.createDate = moment(item.createDate).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          });
          this.remarkData = remarkData;
          this.remarkTotal = remarkData.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFocus() {
      this.showConfirm = true;
    },
    getBlur() {
      //  this.showConfirm = false;
    },
    //提交评论
    postComment() {
      let contact = this.commentConcat;
      let conatiner = this.commentValue;
      let nickname = this.commentUser;
      let aid = Number(this.currentId);
      if (nickname == "") {
        this.$message.error("还是给我说一下你是谁嘛~");
      }
      if (conatiner == "") {
        this.$message.error("要记得填写评论哦~");
      }

      let data = {
        nickname: nickname,
        aid: aid,
        container: conatiner,
        contact: contact
      };
      console.log(data);
      referRemark(data)
        .then(res => {
          console.log(res);
          if (res.code == "ok") {
            this.$message.success("提交留言成功！");
            let currentId = this.currentId;
            setTimeout(() => {
              console.log(currentId);
              this.getRemarks(currentId);
              this.commentValue = "";
              this.commentUser = "";
              this.commentConcat = "";
            }, 300);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style src="../../markdown.css" scoped></style>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
}
.mainContain {
  width: calc(100% - 120px);
  height: 100%;
  margin-left: 120px;
}
.articleInfo {
  width: 900px;
  margin: 0 auto;
  min-height: 500px;
  margin-top: 40px;
}
.blogtitle {
  height: 50px;
  line-height: 50px;
  font-size: 30px;
}
.blogtime {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #888;
}
.blogcontainer {
  margin-top: 40px;
  min-height: 450px;
  border-bottom: 1px solid #dfdfdf;
}
.nextPre {
  display: flex;
  padding: 30px 0;
}
.pre {
  width: 50%;
  text-align: left;
}
.next {
  width: 50%;
  text-align: right;
}

.nextPre a {
  text-decoration: none;
  color: #8bbabb;
  font-size: 15px;
  height: 50px;
  line-height: 50px;
}
.nextPre .noData {
  color: #8bbabb;
  font-size: 15px;
  height: 50px;
  line-height: 50px;
}

.comment {
  width: 900px;
  margin: 0 auto;
  padding: 0 0 30px 0;
}
.comment .com_item {
  width: 100%;
  height: 50px;
  display: flex;
  margin-top: 20px;
}
.comment .com_item span {
  width: 100px;
  height: 40px;
  line-height: 40px;
}
.comment .com_item input {
  width: 300px;
}
.btns {
  position: relative;
}
.btns button {
  width: 140px;
  padding: 0 !important;
  float: right;
  position: absolute;
  right: 10px;
}
.remarkItem {
  margin: 20px 0;
  background: #f6f6f6;
}
.remarkItem .first {
  width: 97%;
  padding-left: 3%;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
}
.first .name {
  color: #64c4ed;
}
.first .date {
  color: #888;
}
.remarkCon {
  width: 97%;
  padding-left: 3%;
  line-height: 30px;
  padding-bottom: 10px;
  font-size: 15px;
}
.saveContent {
  width: 100%;
  height: 60px;
}
.saveContent div {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  border-left: 5px solid #dedede;
}
</style>
