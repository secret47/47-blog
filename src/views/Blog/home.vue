<template>
  <div class="main">
    <blog-side></blog-side>
    <div class="mainContain">
      <blog-index></blog-index>
    </div>
  </div>
</template>

<script>

import blogSide from "../../components/blogSide";
import blogIndex from "../../views/Blog/index";
export default {
  components: {
    blogSide,
    blogIndex
  },
  data() {
    return {
      defaultImg: require("../../assets/default.jpg")
    };
  },
  
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
.footers{
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
