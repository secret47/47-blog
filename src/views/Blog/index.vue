<template>
    <div>
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
    </div>
</template>

<script>
import { getArticlesList } from "../../api/blog.js";
import moment from "moment";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      articleList: []
    };
  },
  mounted() {
    this.getList(this.currentPage, this.pageSize);
    document.title = "你好，我是杨小花";
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
</style>
