<template>
  <div class="main">
    <blog-side></blog-side>
    <div class="mainContain">
      <div class="articleInfo">
        <div class="title">
          {{articles.title}}
        </div>
        <div class="time">
          <i class="el-icon-date icon"></i>{{articles.createDate}}
        </div>
        <div class="coverImg" v-if="articles.coverImg">
          <img :src="articles.coverImg" alt="">
        </div>
        <div class="container" v-html="articles.content">
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
        <!-- 评论 -->
      </div>
    </div>

  </div>
</template>

<script>
import { getArticle, getPre, getNext } from "../../api/blog.js";
import moment from "moment";
import blogSide from "../../components/blogSide";
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
      currentId: 0
    };
  },
  created() {},
  mounted() {
    let aid = this.$route.query.aid;
    console.log(aid)
    this.currentId = aid;
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
          this.articles = data;
          this.showDetail = true;
          console.log(this.articles);
          this.getPreAndNext(aid);
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    }
  }
};
</script>

<style>
.articleInfo {
  width: 900px;
  margin: 0 auto;
  min-height: 500px;
  margin-top: 40px;
}
.title {
  height: 50px;
  line-height: 50px;
  font-size: 30px;
}
.time {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #888;
}
.container {
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
</style>
