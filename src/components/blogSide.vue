<template>
  <div class="leftSide">
    <div class="tab">
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="tab_item">
        <router-link :to="{ path: '/blog' }" class="curPoint">
          <i class="el-icon-odometer"></i>
          <span>首页</span>
        </router-link>
      </div>
      <div class="tab_item">
        <router-link :to="{ path: '/blog/catalog' }" class="curPoint">
          <i class="el-icon-folder"></i>
          <span>归档</span>
        </router-link>
      </div>
      <div class="tab_item">
        <router-link :to="{ path: '/blog/catalog' }" class="curPoint">
          <i class="el-icon-box"></i>
          <span>分类</span>
        </router-link>
      </div>
      <div class="tab_item">
        <router-link :to="{ path: '/blog/resume' }" class="curPoint">
          <i class="el-icon-document"></i>
          <span>关于</span>
        </router-link>
      </div>
      <div class="tab_item">
        <div class="curPoint" @click="showSearch">
          <i class="el-icon-search"></i>
          <span>搜索</span>
        </div>
      </div>
    </div>
      <el-drawer
        title=""
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <div class="drawContain">
          <div class="searchBox">
          <el-input type="text" placeholder="请输入搜索内容" suffix-icon="el-icon-search"></el-input>
          <el-button type="primary">搜索</el-button>
          </div>
        </div>
      </el-drawer>

  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer:false,
      direction: 'ttb',
    };
  },
  methods: {
    showSearch(){
      this.drawer = true;
    },
    handleClose(){
      this.$confirm('确认关闭？')
          .then(res => {
            console.log(res)
            this.drawer = false
          })
          .catch(_ => {});
    }
  }
};
</script>

<style>
.leftSide {
  width: 120px;
  height: 100%;
  background: #ffffff;
  position: fixed;
  top: 100px;
  left: 0;
}
.tab {
  width: 100px;
  height: 600px;
  margin: 0 auto;
}
.logo {
  width: 100%;
  height: 100px;
  text-align: center;
  /* margin-bottom: 40px; */
}
.logo img {
  width: 80px;
  height: 80px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.tab .tab_item {
  width: 100px;
  height: 70px;
  text-align: center;
}
.tab_item span {
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.curPoint {
  position: relative;
  top: 50%;
  /* transform: translateY(-50%); */
  cursor: pointer;
  text-decoration: none;
  color: #000;
}

.curPoint:hover {
  color: #41b883;
}

.hidenShow{
  position:fixed;
  width:100%;
  height:200px;
  top:-200px;
  left:0;
  background:#ffffff;
}


@-webkit-keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}


.showDisplay{
  position:fixed;
  width:100%;
  height:200px;
  top:0;
  left:0;
  background:#000;
  -webkit-animation-name: slideInDown;
  animation-name: slideInDown;
}

.drawContain{
  width:85%;
  margin:0 auto;
}
.searchBox{
  display:flex
}
.searchBox button{
  width:100px;
  text-align:center;
  margin-left:20px;
}
</style>
