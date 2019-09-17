import router from './router'
import store from './store/store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // get token from cookie
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const whiteList = ['/login', '/auth-redirect'];


NProgress.start();
router.beforeEach(async (to, from, next) => {
    if(to.meta && to.meta.title){
        document.title = to.meta.title + ' (ﾉ*･ω･)ﾉ 杨小花的博客管理系统'
    }
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next()
            NProgress.done();

        }
        else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                // get user info
                // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                const { roles } = await store.dispatch('user/getInfo', localStorage.getItem('uid'))
                console.log(roles)
                // generate accessible routes map based on roles
                const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                // dynamically add accessible routes
                router.addRoutes(accessRoutes)

                // hack method to ensure that addRoutes is complete
                // set the replace: true, so the navigation will not leave a history record
                next({ ...to, replace: true })
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`login?redirect=${to.path}`)
        }

    }
})

router.afterEach(() => {
    NProgress.done();
})