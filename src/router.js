import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import findLast from 'lodash/findLast'
import { check, isLogin } from './util/auth'
import { notifaction } from 'element-ui'
import store from "./store/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      name: "blog",
      meta: {
        title: "博客"
      },
      hideMenu: true,
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Blog/home.vue")
    },
    {
      path: "/user",
      name: "/user",
      meta: {
        title: "用户"
      },
      hideMenu: true,
      component: () =>
        import(/* webpackChunkName: "about" */ "./layouts/UserLayout.vue"),
      children: [
        {
          path: "/admin/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/User/Login.vue")
        },
        {
          path: "/admin/reg",
          name: "reg",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/User/Login.vue")
        }
      ]
    },
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
          meta: { title: "文章管理", icon: "el-icon-menu", auth: ['admin'] },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/articles/edit",
              name: "edit",
              meta: { title: "新建文章", auth: ['admin'] },
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
        }, {
          path: "/dashboard/test",
          name: "system",
          meta: { title: "页面测试", icon: "el-icon-setting", auth: ['user', 'admin'] },
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
        }
      ]
    },
    {
      path: "/blog",
      name: "blog",
      meta: {
        title: ""
      },
      hideMenu: true,
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Blog/home.vue"),
      children: [
        {
          path: "/blog",
          name: "blog",
          meta: {
            title: ""
          },
          hideMenu: true,
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Blog/index.vue"),
        },
        {
          path: "/blog/article",
          name: "article",
          meta: {
            title: ""
          },
          hideMenu: true,
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Blog/article.vue")
        },
        {
          path: "/blog/catalog",
          name: "catalog",
          meta: {
            title: ""
          },
          hideMenu: true,
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Blog/catalog.vue")
        },
        {
          path: "/blog/resume",
          name: "resume",
          meta: {
            title: ""
          },
          hideMenu: true,
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Blog/resume.vue")
        }]
    },
    {
      path: "/404",
      name: "404",
      hideMenu: true,
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/404.vue")
    }, {
      path: "/403",
      name: "403",
      hideMenu: true,
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/403.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.auth);
  if (record && check(record.meta.auth)) {
    if (!isLogin() && to.path !== "/admin/login") {
      next({
        path: "/admin/login"
      })
    } else if (to.path === "/403") {
      this.$notify({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning'
      });
      next({
        path: "/403"
      })
      NProgress.done();
    }
    if (store.state.user.userRole === "") {
      store
      .dispatch("getUserRole",localStorage.getItem('uid'))
      .then(res => {})
      .catch(err => {});
    }
    NProgress.start();
  }

  next();
});




router.afterEach(() => {
  window.scrollTo(0, 0);
  NProgress.done();
});

export default router;
