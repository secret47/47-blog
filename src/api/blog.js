import request from "../util/request";
import axios from "axios";

//得到所有文章
export const getArticlesList = (currentPage,pageSize) => {
  return request({
    url: "/blog/getList",
    method: "get",
    params: {
      currentPage,
      pageSize
    }
  });
};

//根据id得到文章
export const getArticle = aid => {
  return request({
    url: "/blog/getArticles",
    method: "get",
    params: {
      aid
    }
  });
};

export const getPre = aid => {
  return request({
    url: "/blog/getPre",
    method: "get",
    params: {
      aid
    }
  });
};

export const getNext = aid => {
  return request({
    url: "/blog/getNext",
    method: "get",
    params: {
      aid
    }
  });
};

export const referRemark = data => {
  return request({
    url: "/blog/referRemark",
    method: "post",
    data
  });
};

export const getRemark = aid => {
  return request({
    url: "/blog/queryRemark",
    method: "get",
    params: {
      aid
    }
  });
};

export const getCataList = () => {
  return request({
    url: "/blog/getAllList",
    method: "get",
    params: {}
  });
};

//得到文章分类
export const getCatalogs = query => {
  return request({
    url: "/articles/getCatalogs",
    method: "get",
    params: query
  });
};
