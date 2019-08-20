<template>
  <div class="main">
    <blog-side></blog-side>
    <div class="mainContain">
      <div class="mainInfo"></div>
    </div>
  </div>
</template>

<script>
import blogSide from "../../components/blogSide";
export default {
  components: {
    blogSide
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
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
</style>
