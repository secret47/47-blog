<template>
  <div class="mainInfo">
    <div class="articles">
      <div class="head" :style="{ backgroundImage: 'url(' + bgImg + ')' }"></div>
      <section v-for="item in articleList" :key="item.aid" class="artitem">
        <div class="article-title">
          <img class="notice" src="../../assets/hua.png" alt="" />
          <span class="cur" @click="lookArticle(item.aid)"
            >{{ item.title }}
          </span>
        </div>
        <div class="time">
          <span @click="lookArticle(item.aid)" class="cur">
            <i class="el-icon-date icon"></i>{{ item.createDate }}
          </span>
        </div>
        <div class="articleContains">
          <div class="imgs" v-if="item.coverImg">
            <img
              :src="item.coverImg"
              @click="lookArticle(item.aid)"
              class="cur"
            />
          </div>
          <div class="description">{{ item.description }}</div>
          <router-link
            :to="{ path: '/blog/article', query: { aid: item.aid } }"
            class="readMore"
            >阅读全文(,,•́ . •̀,,)</router-link
          >
        </div>
        <div class="other">
          <div class="classfiy">
            <i class="el-icon-collection-tag icon"></i>
            {{ item.tags }}
          </div>
        </div>
      </section>
      <div class="more">
        查看更多
      </div>
      <div class="footer">
        footer
      </div>
    </div>
  </div>
</template>

<script>
import { getArticlesList } from "../../api/blog.js";
import moment from "moment";
import { getInfo } from "../../api/system.js";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      articleList: [],
      bgImg: ""

    };
  },
  mounted() {
    this.getwebInfo();
    this.getList(this.currentPage, this.pageSize);
  },
  methods: {
    //得到文章列表
    getList(currentPage, pageSize) {
      getArticlesList(currentPage, pageSize)
        .then(res => {
          let data = res.data;
          data.forEach(element => {
            //更改一下时间格式
            let createDate = data.createDate;
            createDate = moment(createDate).format("YYYY-MM-DD");
            element.createDate = createDate;
          });
          this.articleList = data;
        })
        .catch(err => {});
    },
    lookArticle(aid) {
      this.$router.push({
        path: "/blog/article",
        query: {
          aid: aid
        }
      });
    },
      getwebInfo() {
      getInfo()
        .then(res => {
          let webInfo = res.data;
          this.bgImg = webInfo.topImg;
          document.title = webInfo.title;
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
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
.artitem {
  padding: 50px 0;
  border-bottom: 1px solid #efefef;
}
.artitem:nth-last-of-type(1) {
  border-bottom: 0;
}
.more {
  text-align: center;
  height: 40px;
  line-height: 40px;
}

.artitem .article-title {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  position: relative;
  padding: 10px 0;
}

.artitem .article-title:hover {
  color: #8bbabb;
}

.artitem .time {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  color: #888;
}
.artitem .icon {
  padding-right: 10px;
}
.artitem .description {
  font-size: 14px;
  line-height: 40px;
}
.artitem .articleContains {
  margin: 20px 0;
}
.artitem .readMore {
  color: #8bbabb;
  font-size: 15px;
}
.artitem .readMore:hover {
  color: #000;
}

.artitem .other .classfiy {
  font-size: 12px;
  color: #bbded6;
}
.artitem .article-title .notice {
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
