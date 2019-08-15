import request from '../util/request'
import axios from 'axios'


//得到所有文章
export const getArticlesList = (query) => {
    return request({
        url: '/articles/getList',
        method: 'get',
        params: query
    })
}

//根据id得到文章
export const getArticle = (aid) => {
    return request({
        url: '/blog/getArticles',
        method: 'get',
        params: {
            aid
        }
    })
}

export const getPre = (aid) => {
    return request({
        url: '/blog/getPre',
        method: 'get',
        params: {
            aid
        }
    })
}

export const getNext = (aid) => {
    return request({
        url: '/blog/getNext',
        method: 'get',
        params: {
            aid
        }
    })
}

export const referRemark = (data) => {
    return request({
        url: '/blog/referRemark',
        method: 'post',
        data
    })
}

export const getRemark = (aid) => {
    return request({
        url: '/blog/queryRemark',
        method: 'get',
        params: {
            aid
        }
    })
}