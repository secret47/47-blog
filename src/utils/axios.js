import axios from 'axios'
import store from '../store/store'
import { MessageBox, Message } from 'element-ui'
import { getToken } from './auth'

let baseUrl;
if (process.env.NODE_ENV == 'development') {
    baseUrl = "http://localhost:3000/api"
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = "http://101.37.173.223:3000/api"
}


let service = axios.create({
    baseURL: baseUrl,
    // timeout: 5000,
})

service.interceptors.request.use(config => {
    if (store.getters.token) {
        // 设置token
        config.headers['token'] = getToken() || store.getters.token// 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code != "200") {
            if (res.code === "888") {
                MessageBox.confirm(res.message, '警告', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(res)
        } else {
            return response.data
        }
    },
    error => {
        return Promise.reject(error)
    }

)

export default service