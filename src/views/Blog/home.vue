<template>
  <div class="main">
    <blog-side></blog-side>
    <div class="mainContain">
      <div class="head">
      </div>
      <div class="topNews"></div>
      <div class="articles">
        <section v-for="item in articleList" :key="item.aid" class="item">
          <div class="title">
            <img class="notice" src="../../assets/hua.png" alt="">
            <span class="cur" @click="lookArticle(item.aid)">{{item.title}} </span>
          </div>
          <div class="time">
            <span @click="lookArticle(item.aid)" class="cur">
              <i class="el-icon-date icon"></i>{{item.createDate}}
            </span>
          </div>
          <div class="articleContains">
            <div class="imgs" v-if="item.coverImg">
              <img :src="item.coverImg" @click="lookArticle(item.aid)" class="cur">
            </div>
            <div class="description">{{item.description}}</div>
            <router-link :to="{path:'/blog/article',query:{aid:item.aid}}" class="readMore">阅读全文(,,•́ . •̀,,)</router-link>
          </div>
          <div class="other">
            <div class="classfiy">
              <i class="el-icon-collection-tag icon"></i>
              {{item.tags}}</div>
          </div>
        </section>
        <div class="more">
          查看更多
        </div>
      </div>
      <div class="footers">

      </div>
    </div>
  </div>
</template>

<script>
import { getArticlesList } from "../../api/blog.js";
import moment from "moment";
import blogSide from "../../components/blogSide";
export default {
  components: {
    blogSide
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      articleList: [],
      defaultImg: require("../../assets/default.jpg")
    };
  },
  mounted() {
    this.getList(this.currentPage, this.pageSize);
    document.title = "杨小花的博客，独一无二";
  },
  methods: {
    //得到文章列表
    getList(currentPage, pageSize) {
      getArticlesList(currentPage, pageSize)
        .then(res => {
          console.log(res);
          let data = res.data;
          data.forEach(element => {
            //更改一下时间格式
            let createDate = data.createDate;
            createDate = moment(createDate).format("YYYY-MM-DD");
            element.createDate = createDate;
          });
          console.log;
          this.articleList = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    lookArticle(aid) {
      this.$router.push({
        path: "/blog/article",
        query: {
          aid: aid
        }
      });
    }
  }
};
</script>

<style>
.head {
  height: 500px;
  background-image: url("https://c-ssl.duitang.com/uploads/item/201903/27/20190327180920_eJRVn.png");
  background-size: 100%;
  background-position: center;
}
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
/* 
头部新闻
 */
.topNews {
  width: 100%;
  height: 100px;
}
.articles {
  max-width: 900px;
  margin: 0 auto;
  border-bottom: 1px solid #dfdfdf;
}
.item {
  padding: 50px 0;
  border-bottom: 1px solid #efefef;
}
.item:nth-last-of-type(1) {
  border-bottom: 0;
}
.more {
  text-align: center;
  height: 40px;
  line-height: 40px;
}

.item .title {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  position: relative;
  padding: 10px 0;
}
.item .time {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  color: #888;
}
.item .icon {
  padding-right: 10px;
}
.item .description {
  font-size: 14px;
  line-height: 40px;
}
.item .articleContains {
  margin: 20px 0;
}
.item .readMore {
  color: #8bbabb;
  font-size: 15px;
}
.item .other .classfiy {
  font-size: 12px;
  color: #bbded6;
}
.item .title .notice {
  width: 30px;
  height: 30px;
  position: absolute;
  left: -50px;
}
.footers {
  width: 100%;
  height: 100px;
}
.cur {
  cursor: pointer;
}
</style>
