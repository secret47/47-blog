<template>
  <div class="main">
    <blog-side></blog-side>
    <div class="mainContain">
      <div class="mainInfo">
        <div class="bigTitle">归档</div>
        <div
          class="item_list"
          v-for="(item, index) in articleList"
          :key="index"
        >
          <div class="year">{{ item.year }}</div>
          <el-timeline class="lists">
            <el-timeline-item
              v-for="(item, index) in item.articleList"
              :key="index"
            >
              <span class="date">{{ item.createDate }}</span>
              <router-link
                class="name"
                :to="{ path: '/blog/article', query: { aid: item.aid } }"
                >{{ item.title }}</router-link
              >
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCataList } from "../../api/blog.js";
import blogSide from "../../components/blogSide";
import moment from "moment";

export default {
  components: {
    blogSide
  },
  data() {
    return {
      articleList: []
    };
  },
  mounted() {
    document.title = "归档|你好，我是杨小花";
    this.getList();
  },
  methods: {
    getList() {
      getCataList()
        .then(res => {
          let data = res.data;
          data = data.reverse();
          data.forEach(item => {
            let articleList = item.articleList;
            articleList = articleList.reverse();
            articleList.forEach(e => {
              if (e.createDate) {
                e.createDate = moment(e.createDate).format("MM/DD");
              }
            });
          });
          this.articleList = data;
        })
        .catch();
    }
  }
};
</script>

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
.mainInfo {
  max-width: 900px;
  margin: 0 auto;
}

@media screen and (max-width: 1200px) {
  .mainInfo {
    max-width: 600px;
    margin: 0 auto;
  }
}

.mainInfo .bigTitle {
  height: 100px;
  line-height: 100px;
  font-size: 40px;
}
.item_list {
  display: flex;
  margin-bottom: 20px;
}
.item_list .year {
  width: 100px;
}
.item_list .lists .date {
  width: 70px;
  text-align: center;
  display: inline-block;
}
.item_list .lists .name {
  text-decoration: none;
  font-weight: 800;
  color: #49beb7;
}
.el-timeline {
  width: 100%;
}
.el-timeline-item {
  width: 100%;
}
</style>
