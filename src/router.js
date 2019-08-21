import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

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
          meta: { title: "仪表盘", icon: "el-icon-s-home" },
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/Analysis.vue")
        },
        {
          path: "/dashboard/articles",
          name: "articles",
          meta: { title: "文章管理", icon: "el-icon-menu" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/articles/edit",
              name: "edit",
              meta: { title: "新建文章" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/articles/edit.vue")
            },
            {
              path: "/dashboard/articles/list",
              name: "list",
              meta: { title: "文章列表" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/articles/list.vue")
            },
            {
              path: "/dashboard/articles/catalogs",
              name: "catalogs",
              meta: { title: "分类管理" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/articles/catalogs.vue")
            }
          ]
        },
        {
          path: "/dashboard/system",
          name: "system",
          meta: { title: "系统管理", icon: "el-icon-setting" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/system/center",
              name: "center",
              meta: { title: "个人中心" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/system/center.vue")
            },
            {
              path: "/dashboard/system/setting",
              name: "setting",
              meta: { title: "系统设置" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Admin/Dashboard/system/setting.vue")
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
      meta: {
        title: "404"
      },
      hideMenu: true,
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/404.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
  NProgress.done();
});

export default router;
