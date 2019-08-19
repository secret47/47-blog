<template>
  <div class="main">
    <blog-side></blog-side>
    <div class="mainContain">
      <div class="head" :style="{backgroundImage: 'url(' + (bgImg ) + ')'}">
      </div>
      <blog-index></blog-index>
    </div>
  </div>
</template>
<script>
import blogSide from "../../components/blogSide";
import blogIndex from "../../views/Blog/index";
import { getInfo } from "../../api/system.js";

export default {
  components: {
    blogSide,
    blogIndex
  },
  data() {
    return {
      bgImg: ""
    };
  },
  mounted() {
    this.getwebInfo();
  },
  methods: {
    getwebInfo() {
      getInfo()
        .then(res => {
          let webInfo = res.data;
          this.bgImg = webInfo.topImg;
          document.title = webInfo.title;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.mainContain {
  width: calc(100% - 120px);
  margin-left: 120px;
}
.head {
  height: 500px;
  background-image: url("https://c-ssl.duitang.com/uploads/item/201903/27/20190327180920_eJRVn.png");
  background-size: 100%;
  background-position: center;
}
</style>