
import request from '../util/request'
import axios from 'axios'

//更改用户资料
export const setInfo = (data) => {
    return request({
        url: '/systems/setInfo',
        method: 'post',
        data
    })
}


//更改用户资料
export const getInfo = () => {
    return request({
        url: '/systems/getInfo',
        method: 'get',
    })
}


