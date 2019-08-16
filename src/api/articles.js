import request from '../util/request'
import axios from 'axios'


//得到文章分类
export const getCatalogs = (query) => {
    return request({
        url: '/articles/getCatalogs',
        method: 'get',
        params: query
    })
}

export const addCatalog = (data) => {
    return request({
        url: '/articles/addCatalog',
        method: 'post',
        data
    })
}
export const delCatalog = (id) => {
    return request({
        url: '/articles/delCatalog',
        method: 'get',
        params:{
            id:id
        }
    })
}

export const updateCatalogs = (data) => {
    return request({
        url: '/articles/updateCatalog',
        method: 'post',
        data
    })
}

//根据id得到文章
export const getArticle = (aid) => {
    return request({
        url: '/articles/getArticles',
        method: 'get',
        params: {
            aid
        }
    })
}



//新建文章
export const createArticle = (data) => {
    return request({
        url: '/articles/create',
        method: 'post',
        data
    })
}

//更新文章
export const updateArticle = (data) => {
    return request({
        url: '/articles/update',
        method: 'post',
        data
    })
}

//新建标签
export const newTags = (data) => {
    return request({
        url: '/articles/newTags',
        method: 'post',
        data
    })
}

//得到所有标签
export const getTags = (query) => {
    return request({
        url: '/articles/getTags',
        method: 'get',
        params: { query }
    })
}


//删除文章
export const deleteArticles = (data) => {
    return request({
        url: '/articles/del',
        method: 'post',
        data
    })
}

//得到所有文章
export const getArticlesList = (query) => {
    return request({
        url: '/articles/getList',
        method: 'get',
        params: query
    })
}