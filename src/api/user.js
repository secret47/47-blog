import request from '../util/request'
import axios from 'axios'



export const login = (username, password) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

//得到用户资料
export const getInfo = (uid) => {
    return request({
        url: '/user/getInfo',
        method: 'get',
        params: {
            uid
        }
    })
}
