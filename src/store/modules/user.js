import { login, getInfo } from '../../api/user'
import { setToken, getToken, removeToken, resetToken } from '../../utils/auth'

const state = {
    token: getToken(),
    roles: [],
    userInfo: [],
}
const mutations = {
    set_roles: (state, roles) => {
        state.roles = roles
    },
    set_token: (state, token) => {
        state.token = token
    },
    set_info: (state, userInfo) => {
        state.userInfo = userInfo
    }
}
const actions = {
    login({ commit }, data) {
        return new Promise((resolve, reject) => {
            login(data).then(res => {
                let { data } = res
                commit('set_token', data.token)
                setToken(data.token)
                localStorage.setItem('uid', data.uid)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    getInfo({ commit }, uid) {
        return new Promise((resolve, reject) => {
            getInfo(uid).then(res => {
                let { data } = res
                commit('set_roles', data.roles)
                commit('set_info', data)
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('set_token', '')
            commit('set_roles', [])
            removeToken()
            resolve()
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('set_roles', [])
            commit('set_token', '')
            removeToken()
            resolve()
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
