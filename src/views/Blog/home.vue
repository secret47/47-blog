<template>
    <div>
        <ul>
            <li v-for="(item,index) in articleList" :key="index" class="title">
                <router-link to="">{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { getArticlesList } from "../../api/articles.js";
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
            createDate = moment(createDate).format("YYYY-MM-DD HH:mm:ss");
            element.createDate = createDate;
          });
          console.log;
          this.articleList = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
