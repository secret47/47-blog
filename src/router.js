import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);


export const defaultRouter = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: "用户登录"
    },
    hideMenu: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/User/Login.vue")
  }, {
    path: '/forget',
    name: 'forget',
    meta: {
      title: "忘记密码"
    },
    hideMenu: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/User/forget.vue")
  }
]

export default new Router({
  // mode: 'history', // 默认为'hash'
  routes: defaultRouter
})


export const dynamicRouter = [
  {
    path: "/dashboard",
    name: "/dashboard",
    hideMenu: false,
    component: () =>
      import(/* webpackChunkName: "about" */ "./layouts/BasicLayout.vue"),
    children: [
      {
        path: "/dashboard/analysis",
        name: "analysis",
        meta: { title: "仪表盘", icon: "el-icon-s-home", auth: ['admin', 'user'] },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/Analysis.vue")
      },
      {
        path: "/dashboard/articles",
        name: "articles",
        meta: { title: "文章管理", icon: "el-icon-menu", auth: ['admin', 'user'] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/articles/edit",
            name: "edit",
            meta: { title: "新建文章", auth: ['admin', 'user'] },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/articles/edit.vue")
          },
          {
            path: "/dashboard/articles/list",
            name: "list",
            meta: { title: "文章列表", auth: ['admin'] },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/articles/list.vue")
          },
          {
            path: "/dashboard/articles/catalogs",
            name: "catalogs",
            meta: { title: "分类管理", auth: ['admin'] },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/articles/catalogs.vue")
          }
        ]
      },
      {
        path: "/dashboard/material",
        name: "system",
        meta: { title: "素材管理", icon: "el-icon-picture", auth: ['admin'] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/material/imgs",
            name: "center",
            meta: { title: "图片管理", auth: ['admin'] },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/material/imgs.vue")
          },
          {
            path: "/dashboard/material/demos",
            name: "setting",
            meta: { title: "demo管理", auth: ['admin'] },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/material/demos.vue")
          }
        ]
      }, {
        path: "/dashboard/test",
        name: "system",
        meta: { title: "页面测试", icon: "el-icon-plus", auth: ['user', 'admin'] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/authTest/userTest",
            name: "center",
            meta: { title: "用户权限测试", auth: ['user'] },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/authTest/userTest.vue")
          },
          {
            path: "/dashboard/authTest/adminTest",
            name: "center",
            meta: { title: "管理员权限测试", auth: ['admin'] },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/authTest/adminTest.vue")
          }
        ]
      },
      {
        path: "/dashboard/system",
        name: "system",
        meta: { title: "系统管理", icon: "el-icon-setting", auth: ['admin'] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/system/center",
            name: "center",
            meta: { title: "个人中心", auth: ['admin'] },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/system/center.vue")
          },
          {
            path: "/dashboard/system/setting",
            name: "setting",
            meta: { title: "系统设置", auth: ['admin'] },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/system/setting.vue")
          }
        ]
      },
    ]
  },
]