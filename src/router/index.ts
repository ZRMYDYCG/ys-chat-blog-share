/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-03 23:30:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-03 23:48:34
 * @FilePath: \blog-front-vue3\src\router\index.ts
 * @Description: 路由配置
 */
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import NProgress from "nprogress"; //进度条插件
import { judgeDevice } from "@/utils/tools";

// 关闭进度条加载圈
NProgress.configure({ showSpinner: false });
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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
  if (judgeDevice()) {
    location.href = "https://m.fasyncsy.com.cn";
  }
});
router.afterEach((to) => {
  document.title = `一勺 Blog | ${(to.meta.title as string) || ""}`;
  NProgress.done();
});

export default router;
