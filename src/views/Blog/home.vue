<template>
  <div>
    <div class="head">
      <div class="searchBox"></div>
    </div>
    <div class="listBox">
      <div class="currentNews"></div>
      <ul class="list">
        <li v-for="(item,index) in articleList" :key="index" class="list_item">
          <div class="left">
            <img :src="item.coverImg || defaultImg" alt="">
          </div>
          <div class="container">
            <div class="top">
              <router-link :to="{  
                      path: '/blog/article',     
                      query: {  
                        aid: item.aid // orderNum : this.searchData.orderNo
                      }  
                  }">
                <!-- <span class="catalog">{{item.cname}}</span> -->
                {{item.title}}
              </router-link>
              <span class="time">{{item.createDate}}</span>
            </div>
            <div class="desc">
              {{item.description}}
            </div>
            <div class="more">
              <router-link to="">
                ReadMore
              </router-link>
            </div>
          </div>

        </li>
      </ul>
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
      articleList: [],
      defaultImg: require("../../assets/default.jpg")
    };
  },
  mounted() {
    this.getList(this.currentPage, this.pageSize);
    document.title = "杨小花的博客，独一无二";
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
    }
  }
};
</script>

<style>
.head {
  height: 450px;
  background-image: url("https://c-ssl.duitang.com/uploads/item/201903/27/20190327180920_eJRVn.png");
  background-size: 100%;
  background-position: center;
}
.list {
  max-width: 1024px;
  margin: 0 auto;
  list-style: none;
}
.list li {
  width: 100%;
  display: flex;
  height: 100px;
  margin-bottom: 10px;
}
.list li .top a {
  width: calc(100% - 100px);
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  display: block;
  text-decoration: none;
  color: #464159;
}
.list li .left {
  width: 150px;
  text-align: center;
}
.list li .left img {
  width: 100px;
  height: 100px;
  border-radius: 50px 0;
}
.list li .container {
  width: calc(100% - 150px);
  height: 40px;
}

.top {
  width: 100%;
  display: flex;
}
.list li .container .time {
  height: 40px;
  width: 100px;
  font-size: 12px;
  line-height: 40px;
  color: #888;
  text-align: right;
}
.catalog {
  font-size: 13px;
  background: #c7f0db;
}
.desc {
  width: 100%;
  height: 30px;
  font-size: 14px;
  text-indent: 10px;
  line-height: 30px;
}

/* 
  内容
 */

.listBox {
  width: 100%;
  background: #fefefe;
}
.currentNews {
  width: 100%;
  height: 40px;
}
/* 
搜索框
 */
.searchBox {
  max-width: 1024px;
  margin: 0 auto;
}
.more {
  text-align: right;
}
.more a {
  font-size: 12px;
  text-decoration: none;
  background: #464159;
  color: #fefefe;
  padding: 5px 10px;
  border-radius: 2px;
}
</style>
