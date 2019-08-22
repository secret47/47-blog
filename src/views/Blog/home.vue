<template>
  <div class="main">
    <blog-side></blog-side>
    <div class="mainContain">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import blogSide from "../../components/blogSide";
import blogIndex from "../../views/Blog/index";
import axios from "axios";

export default {
  components: {
    blogSide,
    blogIndex
  },
  data() {
    return {
      showDialog: false
    };
  },
  mounted() {
    this.getIp();
  },
  methods: {
    getIp() {
      var ip = returnCitySN["cip"];
      console.log(ip);
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
