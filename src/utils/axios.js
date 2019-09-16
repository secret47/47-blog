import axios from 'axios'
import store from '../store/store'
import { MessageBox, Message } from 'element-ui'
import { getToken } from './auth'


let service = axios.create({
    baseURL: 'http://localhost:3000',
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