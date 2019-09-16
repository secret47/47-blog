import store from '../store/store'
//得到当前的auth
export function getCurrentAuth() {
    return currentAuth
}

//判断当前的auth
export function check(auth) {
    const roles = store.getters.roles;
    let current = new Array();
    current.push(roles)
    return current.some(item => auth.includes(item))
}

export function isLogin() {
    const current = getCurrentAuth();
    return current && current[0] != "user"
}