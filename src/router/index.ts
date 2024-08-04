/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-03 23:30:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-04 16:52:15
 * @FilePath: \blog-front-vue3\src\router\index.ts
 * @Description: 路由配置
 */
import NProgress from "nprogress";
import { judgeDevice } from "@/utils/tools";
import type { RouteRecordRaw, RouterOptions } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

/**
 * 进度条配置
 * 
 * showSpinner 是否显示进度条加载圈
 * */ 
NProgress.configure({ 
  showSpinner: false 
});

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/index.vue"),
    meta: {
      title: "搜索",
    },
  },
  {
    path: "/message",
    name: "message",
    component: () => import("@/views/message/index.vue"),
    meta: {
      title: "留言",
    },
  },
  {
    path: "/site",
    name: "site",
    component: () => import("@/views/web/index.vue"),
    meta: {
      title: "站点",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/about/index.vue"),
    meta: {
      title: "关于",
    },
  },
  {
    path: "/article/:id",
    name: "article",
    component: () => import("@/views/article/index.vue"),
    meta: {
      title: "文章详情",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/notFound/index.vue"),
    meta: {
      title: "not Found",
    },
  },
];

const routerOptions: RouterOptions = {
  history: createWebHashHistory(),
  routes
}

const router = createRouter(routerOptions);

// 路由前置守卫
router.beforeEach(() => {
  NProgress.start();
  if (judgeDevice()) {
    // 移动端访问，跳转到移动端网站, 这里准备了两个项目, 一个是用于 PC 端, 一个是用于移动端, 这里是 PC 端的项目
    location.href = "https://m.fasyncsy.com.cn";
  }
});

// 路由后置守卫
router.afterEach((to) => {
  // 动态设置页面标题
  document.title = `一勺 Blog | ${(to.meta.title as string) || ""}`;
  NProgress.done();
});

export default router;
