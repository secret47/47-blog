import axios from 'axios'
import store from '../store/store'


// axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://127.0.0.1:3000';


// request拦截器
axios.interceptors.request.use(
  config => {
    if (store.getters.token) {

      // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
axios.interceptors.response.use(
  response => {
    /**
     * code为非ok是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // console.log(res,'res')
    if (res.code !== 'ok') {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code == 'failed') {
        return Promise.reject(res)
      } else {
        return Promise.reject('error')

      }
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug

    return Promise.reject(error)
  }
)



export default axios
