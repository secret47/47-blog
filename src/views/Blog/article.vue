<template>
    <div>
        <div class="topHead">
            <!-- 放顶部图片的 -->
            <img :src="articles.coverImg || defaultImg" alt="">
        </div>
    </div>
</template>

<script>
import { getArticle } from "../../api/blog.js";
import moment from "moment";
export default {
  data() {
    return {
      articles: {},
      defaultImg: require("../../assets/default.jpg")
    };
  },
  created() {
    let aid = this.$route.query.aid;
    this.getDetail(aid);
  },
  mounted() {},
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
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
.topHead{
    width: 100%;
}
</style>
