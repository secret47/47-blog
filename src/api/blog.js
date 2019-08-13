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
        url: '/articles/getArticles',
        method: 'get',
        params: {
            aid
        }
    })
}
